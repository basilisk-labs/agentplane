import {
  authorizeCompletedNativeReviewPreparation,
  hasAuthenticatedCompletedNativeReview,
} from "./kernel-completed-native-review.js";
import type * as SupervisorStoreModule from "../shared/supervisor-execution-episode.js";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { recoverKernelOperationalProjection } from "./kernel-operational-projection-recovery.js";
import { readKernelOperationalProjection } from "./kernel-operational-projection.js";
import {
  fixture,
  git,
  recordFixtureVerification,
} from "./kernel-completed-external-rework.testkit.js";
import type * as BlockedResultModule from "./external-agent-blocked-result.js";
import type * as RecoveryModule from "./external-agent-supervisor-recovery.js";
import type * as BranchEpisodesModule from "./branch-task-supervisor-episodes.js";
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
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";
import { captureStdIO, commitAll, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { defaultConfig } from "@agentplaneorg/core/config";
import { loadCommandContext } from "../shared/task-backend.js";
import type * as PrFlowModule from "../pr/flow-status.js";
import type { AgentActionPacket } from "./agent-action-packet.js";
import { runCli } from "../../cli/run-cli.js";

const reviewCrash = vi.hoisted(() => ({ phase: "none" as "none" | "before" | "after" }));
vi.mock("../shared/supervisor-execution-episode.js", async (original) => {
  const actual = await original<typeof SupervisorStoreModule>();
  return {
    ...actual,
    createSupervisorEpisodeStore: (file: string) => {
      const store = actual.createSupervisorEpisodeStore(file);
      return {
        ...store,
        compareAndSwap: async (...args: Parameters<typeof store.compareAndSwap>) => {
          const operation = args[1].operations.at(-1);
          if (
            reviewCrash.phase !== "none" &&
            operation?.role === "EVALUATOR" &&
            operation.status === "completed"
          ) {
            const phase = reviewCrash.phase;
            reviewCrash.phase = "none";
            if (phase === "after") await store.compareAndSwap(...args);
            throw new Error(`Injected native review interruption ${phase} journal completion`);
          }
          return store.compareAndSwap(...args);
        },
      };
    },
  };
});

const previousRuntime = vi.hoisted(() => ({ enabled: false }));
const rejectedResultInterruption = vi.hoisted(() => ({ enabled: false }));
vi.mock("./external-agent-supervisor-recovery.js", async (original) => {
  const actual = await original<typeof RecoveryModule>();
  return {
    ...actual,
    failRejectedExternalAgentResult: async (
      opts: Parameters<typeof actual.failRejectedExternalAgentResult>[0],
    ) => {
      if (rejectedResultInterruption.enabled) {
        rejectedResultInterruption.enabled = false;
        // Model an interruption after durable result receipt but before retirement.
        throw opts.error;
      }
      return actual.failRejectedExternalAgentResult(opts);
    },
  };
});
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

vi.mock("./branch-task-supervisor-episodes.js", async (original) => {
  const actual = await original<typeof BranchEpisodesModule>();
  return {
    ...actual,
    executeProductionBranchEpisode: (
      opts: Parameters<typeof actual.executeProductionBranchEpisode>[0],
    ) => {
      const step = opts.decision.workflowStep;
      if (step.kind !== "agent_episode" || step.episode.purpose !== "verification") {
        throw new Error("Managed runner must not be invoked by external rework");
      }
      return actual.executeProductionBranchEpisode(opts);
    },
  };
});
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
  it.each([false, true])(
    "retires stale pending implementation before successor dispatch (committed=%s)",
    async (committed) => {
      const f = await fixture("branch_pr", false, true);
      const issued = await issue(f);
      const command = await loadCommandContext({ cwd: f.root, rootOverride: null });
      const task = (await command.taskBackend.getTask(f.id))!;
      const review = task.quality_review;
      await writeFile(path.join(f.root, "source.txt"), "after\n");
      await recordFixtureVerification(f.root, f.id);
      const reverified = (await command.taskBackend.getTask(f.id))!;
      expect(reverified.quality_review).toEqual(review);
      rejectedResultInterruption.enabled = true;
      const rejected = await returnResult(f, issued);
      expect(rejected.code).not.toBe(0);
      expect(rejected.stderr + rejected.stdout).toContain("stale against current task authority");
      if (committed) await commitAll(f.root, "operator preserves reviewed repair");
      const resultBytes = await readFile(issued.packet.exchange.result_path, "utf8");
      const journalPath = await resolveSupervisorExecutionEpisodePath({
        git_root: f.root,
        task_id: f.id,
      });
      const before = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(journalPath, "utf8")),
      );
      expect(before.operations.at(-1)?.status).toBe("intent");
      const route = await buildTaskRouteDecision({
        ctx: command,
        cwd: f.root,
        rootOverride: null,
        taskId: f.id,
        includeRemote: false,
      });
      expect(route.workflowStep.id).toBe(
        committed ? "agent.verification" : "agent.task_worktree_resolution",
      );
      const recovery = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
      expect(recovery.code, recovery.stdout + recovery.stderr).not.toBe(0);
      expect(recovery.stderr + recovery.stdout).toContain("AgentPlane retired the stale result");
      expect(recovery.stderr + recovery.stdout).toContain("--replacement --agent-json");
      const after = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(journalPath, "utf8")),
      );
      expect(after.operations).toHaveLength(before.operations.length);
      expect(after.operations.slice(0, -1)).toEqual(before.operations.slice(0, -1));
      expect(after.operations.at(-1)?.status).toBe("failed");
      expect(await readFile(issued.packet.exchange.result_path, "utf8")).toBe(resultBytes);
      const exchangeFile = path.join(issued.packet.exchange.directory, "exchange.json");
      const retired = await readFile(exchangeFile, "utf8");
      expect((JSON.parse(retired) as ExternalAgentExchange).status).toBe("retired");
      const retry = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
      expect(retry.stderr + retry.stdout).not.toContain("unresolved operation intent");
      expect(await readFile(journalPath, "utf8")).toBe(JSON.stringify(after, null, 2) + "\n");
      expect(await readFile(exchangeFile, "utf8")).toBe(retired);
      const replacement = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--replacement",
        "--agent-json",
      ]);
      expect(replacement.code, replacement.stdout + replacement.stderr).toBe(0);
      const fresh = parsePacket(replacement.stdout);
      if (!committed) {
        expect(fresh.exchange.directory).not.toBe(issued.packet.exchange.directory);
        expect(fresh.authority.mutation).toBe("read_only");
      }
      const successor = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(journalPath, "utf8")),
      );
      expect(successor.operations.slice(0, after.operations.length)).toEqual(after.operations);
      expect(successor.operations.length).toBeGreaterThan(after.operations.length);
      expect(await readFile(issued.packet.exchange.result_path, "utf8")).toBe(resultBytes);
      expect(await readFile(exchangeFile, "utf8")).toBe(retired);
      await expectTerminalHistory(f);
    },
  );

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
      if (!remote) {
        const original = (await command.taskBackend.getTask(f.id))!;
        const identity = (
          original.extensions!.task_execution_context as { repository_identity: k.Sha256Digest }
        ).repository_identity;
        const record = readKernelRecord(original, identity);
        if (record.kind !== "canonical") throw new Error("Expected completed canonical fixture");
        const intact = await recoverKernelOperationalProjection(command, record.record, original);
        expect(intact.kind).toBe("unchanged");
        for (const tamper of ["verdict", "time", "historical-pass"] as const) {
          const changed = structuredClone(original);
          const receipt = changed.extensions!["agentplane.completed_native_review"] as Record<
            string,
            unknown
          >;
          if (tamper === "time") changed.quality_review!.updated_at = "2000-01-01T00:00:00.000Z";
          else if (tamper === "verdict")
            changed.quality_review = {
              ...changed.quality_review!,
              state: "pass",
              note: "Forged approval",
              findings: [],
            };
          else {
            const projection = readKernelOperationalProjection(changed.extensions)!;
            changed.quality_review = {
              state: "pass",
              provenance: "evaluator_supplied",
              updated_at: projection.projected_at,
              updated_by: "EVALUATOR",
              note: "Canonical EVALUATOR review passed.",
              evaluated_sha: projection.implementation_commit,
              review_identity_digest: projection.review_identity_digest,
              evidence_refs: [...projection.evidence_refs],
              findings: [...projection.findings],
            };
          }
          receipt.quality_digest = k.kernelDigest(changed.quality_review);
          receipt.applied_at = changed.quality_review!.updated_at;
          await command.taskBackend.writeTask(changed);
          const beforeRejected = (await command.taskBackend.getTask(f.id))!;
          const rejected = await recoverKernelOperationalProjection(
            command,
            record.record,
            beforeRejected,
          );
          expect(rejected.kind, tamper).toBe("stop");
          expect(await command.taskBackend.getTask(f.id)).toEqual(beforeRejected);
          await command.taskBackend.writeTask(original);
        }
      }
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

  it.each(["none", "before", "after"] as const)(
    "issues a real external packet without reopening the terminal kernel (%s journal interruption)",
    async (crashPhase) => {
      const f = await fixture("direct");
      const failed = await seedFailure(f);
      const result = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--replacement",
        "--agent-json",
      ]);
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
      const reviewOrder = validateAgentWorkOrderV2(
        JSON.parse(
          await readFile(path.join(next.exchange.directory, next.exchange.work_order_ref), "utf8"),
        ),
      );
      expect(reviewOrder.authority).toMatchObject({
        mutation_scope: "none",
        writable_roots: [],
        external_side_effects: [],
        sandbox: "read-only",
      });
      const reviewCommand = await loadCommandContext({ cwd: f.root, rootOverride: null });
      const reviewTask = (await reviewCommand.taskBackend.getTask(f.id))!;
      await expect(
        authorizeCompletedNativeReviewPreparation(reviewCommand, reviewTask, {
          ...reviewOrder,
          authority: { ...reviewOrder.authority, expires_at: "2000-01-01T00:00:00.000Z" },
        }),
      ).rejects.toThrow("expired");
      await expect(
        authorizeCompletedNativeReviewPreparation(reviewCommand, reviewTask, {
          ...reviewOrder,
          authority: { ...reviewOrder.authority, writable_roots: [f.root] },
        }),
      ).rejects.toThrow("read-only");
      await writeFile(
        next.exchange.result_path,
        JSON.stringify({
          work_order_id: reviewOrder.work_order_id,
          status: "completed",
          summary: "Independent repair review passed",
          findings: ["Repair verified"],
          uncertainty: [],
          review: {
            verdict: "pass",
            missing_tests: [],
            hidden_assumptions: [],
            residual_risks: [],
          },
        }),
      );
      reviewCrash.phase = crashPhase;
      const acceptedReview = await invoke(f.root, [
        "task",
        "advance",
        f.id,
        "--result",
        next.exchange.result_path,
        "--remote",
        "--agent-json",
      ]);
      if (crashPhase === "none")
        expect(acceptedReview.code, acceptedReview.stderr + acceptedReview.stdout).toBe(0);
      else {
        expect(acceptedReview.code).not.toBe(0);
        expect(acceptedReview.stderr).toContain("Injected native review interruption");
        const currentReview = (await reviewCommand.taskBackend.getTask(f.id))!;
        if (crashPhase === "before") {
          await expect(
            hasAuthenticatedCompletedNativeReview(reviewCommand, currentReview),
          ).rejects.toThrow("completed journal receipt");
          const pendingReplay = await invoke(f.root, [
            "task",
            "advance",
            f.id,
            "--result",
            next.exchange.result_path,
            "--remote",
            "--agent-json",
          ]);
          expect(pendingReplay.code).not.toBe(0);
          expect(await reviewCommand.taskBackend.getTask(f.id)).toEqual(currentReview);
        } else {
          const completedReplay = await invoke(f.root, [
            "task",
            "advance",
            f.id,
            "--result",
            next.exchange.result_path,
            "--remote",
            "--agent-json",
          ]);
          expect(completedReplay.code, completedReplay.stderr + completedReplay.stdout).toBe(0);
          expect(
            await hasAuthenticatedCompletedNativeReview(
              reviewCommand,
              (await reviewCommand.taskBackend.getTask(f.id))!,
            ),
          ).toBe(true);
        }
      }
      const journal = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(failed.journalPath, "utf8")),
      );
      expect(journal.operations[0]).toEqual(failed.journal.operations[0]);
      await expectTerminalHistory(f);
    },
  );
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
