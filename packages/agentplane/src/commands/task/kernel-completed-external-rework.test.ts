import type * as BlockedResultModule from "./external-agent-blocked-result.js";
import type * as ObligationsModule from "../../runtime/task-obligations/resolve.js";
import type * as ProtectedPathsModule from "../../runner/usecases/agent-work-order-protected-paths.js";
import type * as BlockerModule from "./kernel-completed-external-blocker.js";
import type { ExternalAgentExchange } from "./external-agent-exchange.js";
import {
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  completeSupervisorExecutionEpisode,
  validateAgentWorkOrderV2,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { describe, expect, it, vi } from "vitest";
import {
  captureStdIO,
  commitAll,
  configureGitUser,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  writeConfig,
} from "@agentplane/testkit";
import { makeTaskBackendDouble } from "@agentplane/testkit/task";
import { defaultConfig } from "@agentplaneorg/core/config";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskData } from "../../backends/task-backend.js";
import { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelReplayJourney } from "../../adapters/task-backend/kernel-replay-journey.test-fixtures.js";
import { loadCommandContext } from "../shared/task-backend.js";
import { resolveLogicalRepositoryIdentity } from "./execution-authority-context.js";
import { resolveExplicitExecutionContract } from "./execution-contract-intake.js";
import { buildOpenedPrMeta, buildObservedChangeRequestMeta } from "../shared/pr-meta/builders.js";
import type * as PrFlowModule from "../pr/flow-status.js";
import type { AgentActionPacket } from "./agent-action-packet.js";
import { runCli } from "../../cli/run-cli.js";

import { cmdVerifyParsed } from "./verify-record.js";
import { projectKernelOperationalEvidence } from "./kernel-operational-projection.js";

const previousRuntime = vi.hoisted(() => ({ enabled: false }));
vi.mock("../../runtime/task-obligations/resolve.js", async (original) => {
  const actual = await original<typeof ObligationsModule>();
  return {
    ...actual,
    resolveNativeTaskObligations: (
      input: Parameters<typeof actual.resolveNativeTaskObligations>[0],
    ) => {
      // Before R3, security selected exactly the same ops branch as credentials.
      return actual.resolveNativeTaskObligations(
        previousRuntime.enabled &&
          input.task_kind === "code" &&
          input.risk_flags?.includes("security")
          ? {
              ...input,
              risk_flags: input.risk_flags.map((risk) =>
                risk === "security" ? "credentials" : risk,
              ),
            }
          : input,
      );
    },
  };
});
vi.mock("../../runner/usecases/agent-work-order-protected-paths.js", async (original) => {
  const actual = await original<typeof ProtectedPathsModule>();
  return {
    ...actual,
    workOrderProtectedPaths: (opts: Parameters<typeof actual.workOrderProtectedPaths>[0]) =>
      previousRuntime.enabled
        ? [...new Set(Object.values(opts.context.harness.policy.protected_paths).flat())].toSorted()
        : actual.workOrderProtectedPaths(opts),
  };
});

const blockerCrash = vi.hoisted(() => ({
  phase: "none" as "none" | "before" | "after" | "after_commit",
}));
vi.mock("./kernel-completed-external-blocker.js", async (original) => {
  const actual = await original<typeof BlockerModule>();
  return {
    ...actual,
    canonicalBlockerProjection: async (
      opts: Parameters<typeof actual.canonicalBlockerProjection>[0],
    ) => {
      if (opts.persist && blockerCrash.phase === "before") {
        blockerCrash.phase = "none";
        throw new Error("Injected old handler failure before projection");
      }
      const result = await actual.canonicalBlockerProjection(opts);
      if (opts.persist && blockerCrash.phase === "after") {
        blockerCrash.phase = "none";
        throw new Error("Injected interruption after canonical projection");
      }
      return result;
    },
  };
});

vi.mock("./external-agent-blocked-result.js", async (original) => {
  const actual = await original<typeof BlockedResultModule>();
  return {
    ...actual,
    recordExternalBlockedResult: async (
      opts: Parameters<typeof actual.recordExternalBlockedResult>[0],
    ) => {
      await actual.recordExternalBlockedResult(opts);
      if (blockerCrash.phase === "after_commit") {
        blockerCrash.phase = "none";
        throw new Error("Injected interruption after native blocker commit");
      }
    },
  };
});

vi.mock("./branch-task-supervisor-episodes.js", () => ({
  executeProductionBranchEpisode: () => {
    throw new Error("Managed runner must not be invoked by external rework");
  },
}));
// Only the provider observation boundary is doubled. CLI routing, fingerprinting,
// exchange admission, Git publication and verification use their production owners.
vi.mock("../pr/flow-status.js", async (importOriginal) => ({
  ...(await importOriginal<typeof PrFlowModule>()),
  resolvePrFlowStatus: async (opts: {
    ctx: Awaited<ReturnType<typeof loadCommandContext>>;
    taskId: string;
  }) => {
    const task = (await opts.ctx.taskBackend.getTask(opts.taskId))!;
    const root = opts.ctx.resolvedProject.gitRoot;
    const head = git(root, "rev-parse", "HEAD");
    return {
      task: { id: task.id, status: task.status, verification: task.verification?.state ?? null },
      branch: { name: git(root, "branch", "--show-current"), headSha: head, metaHeadSha: null },
      pr: {
        provider: "github",
        state: "OPEN",
        source: "lookup",
        prNumber: 12,
        prUrl: "https://github.com/owner/project/pull/12",
        base: "main",
        headSha: head,
        mergeCommit: null,
      },
      closeTail: { state: "not_applicable", reason: "Fixture implementation PR is open" },
      hostedChecks: { checked: false, reason: "Not relevant to independent review dispatch" },
      reviewThreads: { checked: false, reason: "Not relevant to independent review dispatch" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "Review source",
    } satisfies PrFlowModule.PrFlowStatusReport;
  },
}));
installRunCliIntegrationHarness();
type Packet = Pick<AgentActionPacket, "authority"> & {
  action: { kind: string; reason?: string };
  exchange: NonNullable<AgentActionPacket["exchange"]>;
};
function parsePacket(text: string): Packet {
  return JSON.parse(text) as Packet;
}
async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}
function git(root: string, ...args: string[]) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
async function fixture(
  repositoryMode: "direct" | "branch_pr" = "branch_pr",
  securityCi = false,
  leaveReviewDirty = false,
) {
  const root = await mkGitRepoRootWithBranch("main");
  await configureGitUser(root);
  const config = defaultConfig();
  config.workflow_mode = repositoryMode;
  config.agents.approvals.require_plan = false;
  await writeConfig(root, config);
  await mkdir(path.join(root, ".agentplane/policy"), { recursive: true });
  for (const name of ["dod.code.md", "dod.core.md", "security.must.md", "workflow.branch_pr.md"]) {
    await writeFile(
      path.join(root, ".agentplane/policy", name),
      "# Fixture policy\nPreserve task authority and require independent review.\n",
    );
  }
  await writeFile(
    path.join(root, ".gitignore"),
    ".agentplane/context/\n.agentplane/cache/\n.agentplane/cache.sqlite\n.agentplane/cache.sqlite-wal\n.agentplane/cache.sqlite-shm\n",
  );
  await writeFile(path.join(root, "source.txt"), "before\n");
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({ private: true, scripts: { test: "node check.mjs" } }),
  );
  await writeFile(
    path.join(root, "check.mjs"),
    "import assert from 'node:assert/strict'; import fs from 'node:fs'; assert.equal(fs.readFileSync('source.txt','utf8'),'after\\n');\n",
  );
  await commitAll(root, "seed");
  const base = git(root, "rev-parse", "HEAD");
  const journey = kernelReplayJourney("direct");
  const id = journey.task.id;
  git(root, "config", "agentplane.baseBranch", "main");
  git(root, "checkout", "-b", `task/${id}/repair`);
  const identity = (await resolveLogicalRepositoryIdentity({
    git_root: root,
    task: {},
  })) as k.Sha256Digest;
  let saved: TaskData | null = null;
  const backend = makeTaskBackendDouble({
    capabilities: {
      ...makeTaskBackendDouble().capabilities,
      canonical_source: "remote",
      atomic_task_record: true,
    },
    getTask: () => Promise.resolve(saved),
    writeTask: (next) => {
      saved = next;
      return Promise.resolve();
    },
  });
  const adapter = new KernelBackendAdapter(backend, identity);
  for (const [index, step] of journey.steps.entries()) {
    const input = structuredClone(step.input);
    input.authority = { ...input.authority!, repository_identity: identity };
    const result =
      index === 0 ? await adapter.create(journey.task, input) : await adapter.execute(input);
    expect(result.kind, JSON.stringify(result)).toBe("committed");
  }
  const task = saved! as TaskData;
  task.execution_contract = resolveExplicitExecutionContract({
    config,
    parsed: {
      route: "branch_pr",
      verify: ["git diff --check"],
      scopeRoots: securityCi ? ["source.txt", ".github"] : ["source.txt"],
      repositoryEffects: securityCi ? ["source_code", "ci"] : ["source_code"],
    },
    intent: { taskKind: "code", mutationScope: "code" },
  });
  task.execution_route = {
    requested_mode: "branch_pr",
    selected_mode: "branch_pr",
    repository_mode: repositoryMode,
    schema_version: 1,
    reason_codes: ["explicit_branch_pr"],
    frozen: true,
  };
  task.verify = ["git diff --check"];
  task.task_kind = "code";
  if (securityCi) task.risk_flags = ["security", "merge", "network"];
  task.mutation_scope = "code";
  task.extensions = {
    ...task.extensions,
    task_execution_context: {
      schema_version: 1,
      base_ref: "main",
      base_sha: base,
      repository_identity: identity,
    },
    implementation_commit: { hash: base },
  };
  task.plan_approval = {
    state: "approved",
    updated_at: "2026-10-06T00:00:00.000Z",
    updated_by: "USER",
    note: "Fixture approved",
  };
  task.verification = {
    state: "ok",
    updated_at: "2026-10-06T00:00:00.000Z",
    updated_by: "SUPERVISOR",
    note: "Previous implementation checked",
  };
  task.quality_review = {
    state: "rework",
    provenance: "evaluator_supplied",
    updated_at: "2026-10-06T01:00:00.000Z",
    updated_by: "EVALUATOR",
    note: "Repair source",
    evaluated_sha: base,
    evidence_refs: [`.agentplane/tasks/${id}/quality/review/quality-report.json`],
    findings: ["Repair source"],
  };
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  task.doc =
    "## Summary\nRepair source.\n\n## Plan\nRepair the approved source.\n\n## Verify Steps\n- git diff --check\n\n## Verification\nPrevious checks passed.\n";
  await command.taskBackend.writeTask(task);
  const prDir = path.join(root, ".agentplane", "tasks", id, "pr");
  await mkdir(prDir, { recursive: true });
  const at = "2026-10-06T00:00:00.000Z";
  const meta = buildObservedChangeRequestMeta({
    meta: buildOpenedPrMeta({
      taskId: id,
      branch: git(root, "branch", "--show-current"),
      base: "main",
      at,
      previousMeta: null,
    }),
    observed: {
      prNumber: 12,
      prUrl: "https://github.com/owner/project/pull/12",
      status: "OPEN",
      base: "main",
      headSha: base,
      mergedAt: null,
      mergeCommit: null,
    },
    at,
  });
  await writeFile(path.join(prDir, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  await commitAll(root, "task fixture");
  const implementation = git(root, "rev-parse", "HEAD");
  if (leaveReviewDirty) {
    // Model the native operational projection already present in completed tasks.
    // The dirty independent REWORK review below must survive metadata persistence.
    const repository = {
      schema_version: 1 as const,
      kind: "canonical_repository_evidence" as const,
      task_id: id,
      work_item_id: "implementation",
      task_revision: task.revision ?? 0,
      work_order_id: k.kernelDigest("fixture implementation order"),
      checkout: root,
      branch: git(root, "branch", "--show-current"),
      base_commit: base,
      implementation_commit: implementation,
      implementation_tree: git(root, "rev-parse", "HEAD^{tree}"),
      changed_paths: [] as string[],
      evaluator_target: implementation,
      implementation_evidence: {
        artifact_path: ".agentplane/tasks/fixture/implementation.json",
        implementation_commit: implementation,
        changed_paths: [] as string[],
      },
    };
    await projectKernelOperationalEvidence({
      command,
      task_id: id,
      repository_evidence: { ...repository, digest: k.kernelDigest(repository) },
      verification_evidence_digest: k.kernelDigest("fixture verification"),
      review_identity_digest: k.kernelDigest("fixture passing review"),
      evidence_refs: [],
      findings: ["Previous implementation passed"],
      projected_at: at,
    });
  }
  const current = (await command.taskBackend.getTask(id))!;
  await command.taskBackend.writeTask({
    ...current,
    commit: { hash: implementation, message: "Fixture implementation" },
    quality_review: { ...task.quality_review!, evaluated_sha: implementation },
  });
  if (leaveReviewDirty) {
    git(root, "diff", "--check");
    expect(
      await cmdVerifyParsed({
        ctx: command,
        cwd: root,
        rootOverride: undefined,
        taskId: id,
        state: "ok",
        by: "SUPERVISOR",
        note: "Native fixture verification passed.",
        details: ["affected_unit_integration", "critical_paths", "task_outcome"]
          .map(
            (check) =>
              `Check: ${check}\nCommand: git diff --check\nResult: pass\nEvidence: actual fixture Git check passed\nScope: task implementation`,
          )
          .join("\n\n"),
        quiet: true,
        allowCanonicalProjection: true,
      }),
    ).toBe(0);
  } else await commitAll(root, "record review");
  const persisted = (await command.taskBackend.getTask(id))!;
  return { root, id, kernel: persisted.extensions?.task_kernel };
}

async function seedFailure(
  f: Awaited<ReturnType<typeof fixture>>,
  inDoubt = false,
  maxEpisodes = 10,
) {
  const ctx = await loadCommandContext({ cwd: f.root, rootOverride: null });
  const d = await buildTaskRouteDecision({
    ctx,
    cwd: f.root,
    rootOverride: null,
    taskId: f.id,
    includeRemote: false,
  });
  const fp = d.workflowStep.preconditionFingerprint;
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: f.id,
    task_revision: null,
    state_fingerprint_digest: fp.digest,
    budget: {
      max_episodes: maxEpisodes,
      max_agent_runs: maxEpisodes,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    },
  });
  const identity = {
    id: "managed.executor",
    type: "agent_episode",
    params: { taskId: f.id },
    preconditionFingerprint: fp,
    authorityRef: "fixture-managed",
    idempotencyKey: "fixture-managed",
    expectedPostconditions: [],
    triggersGitHooks: false,
  };
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "agent_episode",
    operation_identity: identity,
    precondition_fingerprint_digest: fp.digest,
    authority_ref: identity.authorityRef,
    authority_digest: fp.digest,
    effect_ref: identity.idempotencyKey,
  });
  if (started.status !== "started") throw new Error("Fixture must start");
  const journal = inDoubt
    ? started.journal
    : completeSupervisorExecutionEpisode({
        journal: started.journal,
        operation_key: started.operation_key,
        result: { reason: "runner requires DOING; current DONE" },
        failed: true,
      });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: f.root,
    task_id: f.id,
  });
  await createSupervisorEpisodeStore(journalPath).write(journal);
  return { journal, journalPath };
}

async function issue(f: Awaited<ReturnType<typeof fixture>>) {
  const result = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
  expect(result.code, result.stderr + result.stdout).toBe(0);
  const packet = parsePacket(result.stdout);
  expect(packet.action.kind).toBe("agent_episode");
  const order = validateAgentWorkOrderV2(
    JSON.parse(
      await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
    ),
  );
  return { packet, order };
}
async function returnResult(
  f: Awaited<ReturnType<typeof fixture>>,
  issued: Awaited<ReturnType<typeof issue>>,
  extra: Record<string, unknown> = {},
) {
  await writeFile(
    issued.packet.exchange.result_path,
    JSON.stringify({
      work_order_id: issued.order.work_order_id,
      status: "completed",
      summary: "Repaired source",
      findings: [],
      uncertainty: [],
      ...extra,
    }),
  );
  return invoke(f.root, [
    "task",
    "advance",
    f.id,
    "--result",
    issued.packet.exchange.result_path,
    "--agent-json",
  ]);
}
async function expectTerminalHistory(f: Awaited<ReturnType<typeof fixture>>) {
  const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
  const task = await command.taskBackend.getTask(f.id);
  expect(task?.status).toBe("DONE");
  expect(task?.extensions?.task_kernel).toEqual(f.kernel);
  expect(task?.extensions?.["agentplane.task_centric"]).toBeUndefined();
  expect(JSON.stringify(task?.extensions?.task_kernel)).toBe(JSON.stringify(f.kernel));
  return task;
}

describe("completed canonical external rework", { timeout: 120_000 }, () => {
  it("retains a blocked canonical result without reopening and replays it exactly", async () => {
    const f = await fixture();
    const issued = await issue(f);
    const returned = await returnResult(f, issued, {
      status: "blocked",
      summary: "Operator must resolve the execution profile",
      blocker: {
        summary: "Execution profile is incompatible",
        recommended_action: "Resolve the profile before another episode",
      },
    });
    expect(returned.code, returned.stderr + returned.stdout).toBe(0);
    expect(parsePacket(returned.stdout).action.kind).toBe("human_input_required");
    const task = await expectTerminalHistory(f);
    expect(task?.comments?.at(-1)?.body).toContain("execution profile");
    const head = git(f.root, "rev-parse", "HEAD");
    const replay = await invoke(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      issued.packet.exchange.result_path,
      "--agent-json",
    ]);
    expect(replay.code, replay.stderr + replay.stdout).toBe(0);
    expect(parsePacket(replay.stdout).action.kind).toBe("human_input_required");
    expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    const fresh = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
    expect(fresh.code, fresh.stderr + fresh.stdout).toBe(0);
    expect(parsePacket(fresh.stdout).action.kind).toBe("human_input_required");
    await expectTerminalHistory(f);
  });

  it.each(["before", "after", "after_commit"] as const)(
    "recovers exact received BLOCKED result after %s projection failure",
    async (phase) => {
      const f = await fixture();
      const prior = await seedFailure(f);
      const started = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--replacement",
        "--agent-json",
      ]);
      expect(started.code, started.stderr + started.stdout).toBe(0);
      const packet = parsePacket(started.stdout);
      const order = validateAgentWorkOrderV2(
        JSON.parse(
          await readFile(
            path.join(packet.exchange.directory, packet.exchange.work_order_ref),
            "utf8",
          ),
        ),
      );
      const issued = { packet, order };
      const beforeTask = await expectTerminalHistory(f);
      blockerCrash.phase = phase;
      const failed = await returnResult(f, issued, {
        status: "blocked",
        summary: "Need an operator decision",
        blocker: {
          summary: "Scoped CI authority is missing",
          scope_extension_request: {
            schema_version: 1,
            rationale: "Repair requires CI",
            scope_roots: [".github/workflows"],
            repository_effects: ["ci"],
          },
        },
      });
      expect(failed.code).not.toBe(0);
      const exchangeFile = path.join(packet.exchange.directory, "exchange.json");
      const received = JSON.parse(await readFile(exchangeFile, "utf8")) as ExternalAgentExchange;
      expect(received.status).toBe("result_received");
      const pending = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(prior.journalPath, "utf8")),
      );
      expect(pending.operations.at(-1)?.result_digest).toBeNull();
      expect(pending.operations.at(-1)?.status).toBe("intent");
      const rawResult = await readFile(packet.exchange.result_path, "utf8");
      const returned = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--result",
        packet.exchange.result_path,
        "--agent-json",
      ]);
      expect(returned.code, returned.stderr + returned.stdout).toBe(0);
      expect(parsePacket(returned.stdout).action.kind).toBe("human_input_required");
      expect(await readFile(packet.exchange.result_path, "utf8")).toBe(rawResult);
      const task = await expectTerminalHistory(f);
      expect(
        task?.comments?.filter((item) => item.body.includes("Need an operator decision")),
      ).toHaveLength(1);
      expect(order.authority.writable_roots).not.toContain(".github/workflows");
      expect(task?.execution_contract).toEqual(beforeTask?.execution_contract);
      expect(task?.extensions?.["agentplane.scope_extension_request"]).toMatchObject({
        status: "pending",
        request: { scope_roots: [".github/workflows"], repository_effects: ["ci"] },
      });
      const consumed = JSON.parse(await readFile(exchangeFile, "utf8")) as ExternalAgentExchange;
      expect(consumed.status).toBe("consumed");
    },
  );

  it.each(["source", "committed-source", "config", "review", "artifact", "result"] as const)(
    "rejects %s tampering after a received blocker projection",
    async (tamper) => {
      const f = await fixture();
      const issued = await issue(f);
      blockerCrash.phase = "after";
      const failed = await returnResult(f, issued, {
        status: "blocked",
        summary: "Need operator recovery",
        blocker: { summary: "Authority mismatch" },
      });
      expect(failed.code).not.toBe(0);
      if (tamper === "source")
        await writeFile(path.join(f.root, "source.txt"), "unauthorized change\n");
      if (tamper === "committed-source") {
        await writeFile(path.join(f.root, "source.txt"), "committed unauthorized change\n");
        await commitAll(f.root, "unrelated source mutation");
      }
      if (tamper === "config")
        await writeFile(
          path.join(f.root, ".agentplane", "config.json"),
          JSON.stringify({ ...defaultConfig(), workflow_mode: "direct" }),
        );
      if (tamper === "review") {
        const file = path.join(f.root, ".agentplane", "tasks", f.id, "README.md");
        const previousReadme = await readFile(file, "utf8");
        await writeFile(file, previousReadme.replaceAll("Repair source", "Forged review"));
      }
      if (tamper === "artifact")
        await writeFile(path.join(f.root, ".agentplane", "tasks", f.id, "pr", "meta.json"), "{}\n");
      if (tamper === "result") {
        const result = JSON.parse(
          await readFile(issued.packet.exchange.result_path, "utf8"),
        ) as Record<string, unknown>;
        await writeFile(
          issued.packet.exchange.result_path,
          JSON.stringify({ ...result, summary: "Different result" }),
        );
      }
      const returned = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--result",
        issued.packet.exchange.result_path,
        "--agent-json",
      ]);
      expect(returned.code).not.toBe(0);
      await expectTerminalHistory(f);
    },
  );

  it("accepts the retained old ops/protected-CI blocker after a runtime-only correction", async () => {
    previousRuntime.enabled = true;
    const f = await fixture("branch_pr", true);
    try {
      const issued = await issue(f);
      expect(issued.order.authority.protected_paths).toContain(".github/workflows");
      expect(JSON.stringify(issued.order)).toContain(
        "Execution profile ops is incompatible with task kind code",
      );
      blockerCrash.phase = "before";
      const failed = await returnResult(f, issued, {
        status: "blocked",
        summary: "Old runtime contradicts issued CI scope",
        blocker: { summary: "ops/code mismatch and protected CI" },
      });
      expect(failed.code).not.toBe(0);
      const raw = await readFile(issued.packet.exchange.result_path, "utf8");
      previousRuntime.enabled = false;
      const returned = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--result",
        issued.packet.exchange.result_path,
        "--agent-json",
      ]);
      expect(returned.code, returned.stderr + returned.stdout).toBe(0);
      expect(parsePacket(returned.stdout).action.kind).toBe("human_input_required");
      expect(await readFile(issued.packet.exchange.result_path, "utf8")).toBe(raw);
      await expectTerminalHistory(f);
    } finally {
      previousRuntime.enabled = false;
    }
  });

  it.each([false, true])(
    "preserves external transport after native metadata persistence (remote=%s)",
    async (remote) => {
      const f = await fixture("branch_pr", false, true);
      const beforeHead = git(f.root, "rev-parse", "HEAD");
      const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
      const before = await buildTaskRouteDecision({
        ctx: command,
        cwd: f.root,
        rootOverride: null,
        taskId: f.id,
        includeRemote: remote,
      });
      expect(before.workflowStep.id).toBe("agent.task_worktree_resolution");
      const result = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        ...(remote ? ["--remote"] : []),
        "--agent-json",
      ]);
      expect(result.code, result.stderr + result.stdout).toBe(0);
      const packet = parsePacket(result.stdout);
      expect(packet.action.kind, result.stdout).toBe("agent_episode");
      expect(packet.authority.role).toBe("EXECUTOR");
      const afterHead = git(f.root, "rev-parse", "HEAD");
      expect(afterHead).not.toBe(beforeHead);
      expect(git(f.root, "log", "-1", "--format=%s")).toContain("persist canonical completion");
      expect(
        git(f.root, "diff", "--name-only", `${beforeHead}..${afterHead}`)
          .split("\n")
          .every((entry) => entry.startsWith(`.agentplane/tasks/${f.id}/`)),
      ).toBe(true);
      const order = validateAgentWorkOrderV2(
        JSON.parse(
          await readFile(
            path.join(packet.exchange.directory, packet.exchange.work_order_ref),
            "utf8",
          ),
        ),
      );
      expect(order.state_fingerprint.git_head).toBe(afterHead);
      const persisted = await expectTerminalHistory(f);
      expect(order.task.revision).toBe(persisted?.revision);
      expect(git(f.root, "status", "--short")).toBe("");
    },
  );

  it("issues a real external packet without reopening the terminal kernel", async () => {
    const f = await fixture("direct");
    const failed = await seedFailure(f);
    const result = await invoke(f.root, ["task", "advance", f.id, "--replacement", "--agent-json"]);
    expect(result.code, result.stderr + result.stdout).toBe(0);
    const packet = parsePacket(result.stdout);
    expect(packet.action.kind, result.stdout).toBe("agent_episode");
    expect(packet.exchange).toBeTruthy();
    const order = validateAgentWorkOrderV2(
      JSON.parse(
        await readFile(
          path.join(packet.exchange.directory, packet.exchange.work_order_ref),
          "utf8",
        ),
      ),
    );
    expect(order.task.work_item_id).toBeNull();
    await writeFile(path.join(f.root, "source.txt"), "after\n");
    await writeFile(
      packet.exchange.result_path,
      JSON.stringify({
        work_order_id: order.work_order_id,
        status: "completed",
        summary: "Repaired source",
        findings: [],
        uncertainty: [],
      }),
    );
    const returned = await invoke(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      packet.exchange.result_path,
      "--agent-json",
    ]);
    expect(
      returned.code,
      returned.stderr +
        returned.stdout +
        git(f.root, "diff", "--", ".gitignore") +
        git(f.root, "status", "--short"),
    ).toBe(0);
    expect(parsePacket(returned.stdout).action.kind).toBe("approval_required");
    const replay = await invoke(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      packet.exchange.result_path,
      "--agent-json",
    ]);
    expect(replay.code, replay.stderr).toBe(0);
    // A local return does not bypass the native provider-observation boundary.
    const reviewedRoute = await invoke(f.root, [
      "task",
      "advance",
      f.id,
      "--remote",
      "--agent-json",
    ]);
    expect(reviewedRoute.code, reviewedRoute.stderr + reviewedRoute.stdout).toBe(0);
    const next = parsePacket(reviewedRoute.stdout);
    expect(next.action.kind, reviewedRoute.stdout).toBe("agent_episode");
    expect(next.authority.mutation).toBe("read_only");
    expect(next.authority.role).toBe("EVALUATOR");
    const journal = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(failed.journalPath, "utf8")),
    );
    expect(journal.operations[0]).toEqual(failed.journal.operations[0]);
    await expectTerminalHistory(f);
  });
  it.each([
    ["foreign WorkOrder", { work_order_id: `sha256:${"f".repeat(64)}` }],
    ["forged WorkItem", { canonical_binding: { work_item_id: "forged" } }],
    ["Plan refinement", { plan_refinement: { proposal: {} } }],
    ["canonical Plan", { canonical_plan: { work_items: [] } }],
  ])("rejects %s before changing terminal history", async (_label, extra) => {
    const f = await fixture();
    const issued = await issue(f);
    const before = git(f.root, "rev-parse", "HEAD");
    await writeFile(path.join(f.root, "source.txt"), "after\n");
    const result = await returnResult(f, issued, extra);
    expect(result.code, result.stdout).not.toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(before);
    await expectTerminalHistory(f);
  });
  it("rejects changes outside the issued source authority", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await writeFile(path.join(f.root, "source.txt"), "after\n");
    await writeFile(path.join(f.root, "unapproved.txt"), "outside scope\n");
    const result = await returnResult(f, issued);
    expect(result.code, result.stdout).not.toBe(0);
    await expectTerminalHistory(f);
  });
  it.each(["review", "authority", "source"] as const)("rejects stale %s binding", async (kind) => {
    const f = await fixture();
    const issued = await issue(f);
    if (kind === "source") {
      await writeFile(path.join(f.root, "source.txt"), "intervening source\n");
      await commitAll(f.root, "intervening source");
    } else if (kind === "authority") {
      const filename = path.join(
        issued.packet.exchange.directory,
        issued.packet.exchange.work_order_ref,
      );
      await writeFile(
        filename,
        JSON.stringify({
          ...issued.order,
          authority: { ...issued.order.authority, network: "allowed" },
        }),
      );
    } else {
      const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
      const task = (await command.taskBackend.getTask(f.id))!;
      await command.taskBackend.writeTask({
        ...task,
        quality_review: { ...task.quality_review!, findings: ["Different review"] },
      });
    }
    await writeFile(path.join(f.root, "source.txt"), "after\n");
    const result = await returnResult(f, issued);
    expect(result.code, result.stdout).not.toBe(0);
    await expectTerminalHistory(f);
  });
  it("records failed native checks without a passing review or reopening the kernel", async () => {
    const f = await fixture();
    const issued = await issue(f);
    await writeFile(path.join(f.root, "source.txt"), "incorrect\n");
    await returnResult(f, issued);
    const task = await expectTerminalHistory(f);
    expect(task?.verification?.state).toBe("needs_rework");
    expect(task?.quality_review?.state).not.toBe("pass");
  });
  it("preserves the native verification evidence recovery boundary", async () => {
    const f = await fixture();
    const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
    const task = (await command.taskBackend.getTask(f.id))!;
    await command.taskBackend.writeTask({
      ...task,
      verification: undefined,
      quality_review: undefined,
    });
    await commitAll(f.root, "fixture requires native verification");
    const result = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
    expect(result.code, result.stderr).toBe(0);
    const packet = parsePacket(result.stdout);
    expect(packet.action.kind).toBe("human_required");
    expect(packet.action.reason).toBe("canonical_operational_projection_recovery_required");
    expect(packet.exchange).toBeUndefined();
    await expectTerminalHistory(f);
  });
  it("preserves supervisor budget fields and failed operation during replacement", async () => {
    const f = await fixture();
    const stopped = await seedFailure(f, false, 1);
    const result = await invoke(f.root, ["task", "advance", f.id, "--replacement", "--agent-json"]);
    expect(result.code, result.stderr).toBe(0);
    expect(parsePacket(result.stdout).action.kind).toBe("agent_episode");
    const journal = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(stopped.journalPath, "utf8")),
    );
    expect(journal.operations[0]).toEqual(stopped.journal.operations[0]);
    expect(journal.budget).toEqual(stopped.journal.budget);
    await expectTerminalHistory(f);
  });
  it("refuses replacement of an uncompleted intent", async () => {
    const f = await fixture();
    const stopped = await seedFailure(f, true);
    const r = await invoke(f.root, ["task", "advance", f.id, "--replacement", "--agent-json"]);
    expect(r.code).not.toBe(0);
    expect(JSON.parse(await readFile(stopped.journalPath, "utf8"))).toEqual(stopped.journal);
  });
});
