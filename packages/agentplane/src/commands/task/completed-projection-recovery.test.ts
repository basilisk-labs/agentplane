import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFile, writeFile, mkdir, symlink } from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import type * as Testkit from "@agentplane/testkit";
import { captureStdIO, installRunCliIntegrationHarness, tempRepo } from "@agentplane/testkit";
import { taskKernel as k, parseTaskReadme, renderTaskReadme } from "@agentplaneorg/core/tasks";
import { gitShowFile } from "@agentplaneorg/core/git";
import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
import { runCli } from "../../cli/run-cli.js";
import { CliError } from "../../shared/errors.js";
import { recordDirectImplementationEvidence } from "./direct-task-finalization.js";
import { fixture, git } from "./kernel-completed-external-rework.testkit.js";
import { recordFailedFixtureVerification } from "./completed-fixture-verification.testkit.js";
import { loadCommandContext, resolveCommandGitCommonDir } from "../shared/task-backend.js";
import { parseTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import * as observations from "./task-execution-contract-observation.js";
import {
  readExternalAgentWorkOrder,
  readExternalAgentExchange,
} from "./external-agent-exchange.js";
import {
  completedScopeBytesDigest as bytesDigest,
  completedScopeProofDirectory,
  decodeCompletedScopeTask,
} from "../../adapters/task-backend/completed-scope-admission.js";
import {
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { LocalTaskByteStore } from "../../backends/task-backend/local-task-byte-store.js";
import type * as PrFlow from "../pr/flow-status.js";
import { recoverCompletedProjection } from "./completed-projection-recovery.js";

vi.mock("@agentplane/testkit", async (original) => {
  const actual = await original<typeof Testkit>();
  return {
    ...actual,
    mkGitRepoRootWithBranch: async (...args: Parameters<typeof actual.mkGitRepoRootWithBranch>) => {
      const root = await actual.mkGitRepoRootWithBranch(...args);
      await mkdir(path.join(root, "packages/agentplane/assets"), { recursive: true });
      await writeFile(
        path.join(root, "packages/agentplane/assets/AGENTS.md"),
        "# Fixture policy\nPreserve native authority and independent review.\n",
      );
      await symlink("packages/agentplane/assets/AGENTS.md", path.join(root, "AGENTS.md"));
      return root;
    },
  };
});
vi.mock("../pr/flow-status.js", async (original) => ({
  ...(await original<typeof PrFlow>()),
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
      closeTail: { state: "not_applicable", reason: "Fixture PR" },
      hostedChecks: { checked: false, reason: "Fixture has no provider effects" },
      reviewThreads: { checked: false, reason: "Fixture has no provider effects" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "Review source",
    } satisfies PrFlow.PrFlowStatusReport;
  },
}));
installRunCliIntegrationHarness();
afterEach(() => vi.restoreAllMocks());

async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

async function issued(root: string, id: string) {
  const response = await invoke(root, ["task", "advance", id, "--agent-json"]);
  expect(response.code, response.stdout + response.stderr).toBe(0);
  const packet = JSON.parse(response.stdout) as {
    action: { kind: string };
    exchange: { directory: string; result_path: string };
  };
  expect(packet.action.kind, response.stdout + response.stderr).toBe("agent_episode");
  return {
    packet,
    order: await readExternalAgentWorkOrder(
      path.join(packet.exchange.directory, "work-order.json"),
    ),
  };
}

async function interruptedObservationFixture() {
  const f = await fixture("branch_pr", false, true, true, true);
  await recordFailedFixtureVerification(f.root, f.id);
  git(f.root, "add", `.agentplane/tasks/${f.id}`);
  git(f.root, "commit", "-m", "retain actual failed fixture verification");
  let command = await loadCommandContext({ cwd: f.root });
  // Seed a real earlier native Git observation, as retained by the interrupted case.
  await recordDirectImplementationEvidence({
    command,
    cwd: f.root,
    task_id: f.id,
    execution_base_commit: git(f.root, "rev-parse", "HEAD^"),
    implementation_commit: git(f.root, "rev-parse", "HEAD"),
    execution_baseline_status: { command: "git status --short --untracked-files=all", lines: [] },
  });
  git(f.root, "add", `.agentplane/tasks/${f.id}`);
  git(f.root, "commit", "-m", "retain actual native baseline Git evidence");
  const first = await issued(f.root, f.id);
  await writeFile(
    first.packet.exchange.result_path,
    JSON.stringify({
      work_order_id: first.order.work_order_id,
      status: "blocked",
      summary: "Need helper",
      findings: [],
      uncertainty: [],
      blocker: {
        summary: "Helper absent",
        scope_extension_request: {
          schema_version: 1,
          rationale: "Repair helper behavior",
          scope_roots: ["helper.txt"],
          repository_effects: [],
        },
      },
    }),
  );
  const blocked = await invoke(f.root, [
    "task",
    "advance",
    f.id,
    "--result",
    first.packet.exchange.result_path,
    "--agent-json",
  ]);
  expect(blocked.code, blocked.stdout + blocked.stderr).toBe(0);
  command = await loadCommandContext({ cwd: f.root });
  const pending = parseTaskScopeExtensionRequestState((await command.taskBackend.getTask(f.id))!)!;
  const admitted = await invoke(f.root, [
    "task",
    "scope",
    "extend",
    f.id,
    "--scope-root",
    "helper.txt",
    "--request-digest",
    pending.request_digest,
    "--state-scope-digest",
    pending.request_digest,
    "--by",
    "USER",
  ]);
  expect(admitted.code, admitted.stdout + admitted.stderr).toBe(0);
  const active = await issued(f.root, f.id);
  expect(active.order.role).toBe("EXECUTOR");
  await writeFile(path.join(f.root, "source.txt"), "after\n");
  await writeFile(path.join(f.root, "helper.txt"), "revised helper\n");
  await writeFile(
    active.packet.exchange.result_path,
    JSON.stringify({
      work_order_id: active.order.work_order_id,
      status: "completed",
      summary: "Repair helper",
      findings: [],
      uncertainty: [],
    }),
  );
  const fault = vi
    .spyOn(observations, "recordObservedTaskExecutionContract")
    .mockImplementationOnce(async (opts) => {
      const mutation = await applyTaskMutation({
        ctx: opts.command,
        taskId: opts.task.id,
        allowCanonicalProjection: true,
        writeOptions: { expectedRevision: opts.task.revision },
        build: (current) => {
          const initial = resolveTaskExecutionContract({
            config: opts.command.config,
            task: current,
            requestedMode: current.execution_contract!.selected_mode,
            declaration: current.execution_contract!.declaration,
          });
          const projected = observations.projectObservedTaskExecutionContract({
            ...opts,
            workflow_dir: opts.command.config.paths.workflow_dir,
            task: {
              ...current,
              execution_contract: {
                ...current.execution_contract!,
                verification: initial.verification,
              },
            },
          });
          expect(projected.nextTask!.execution_route).toEqual(current.execution_route);
          expect(
            projected.nextTask!.execution_contract!.authority,
            "fault projection authority",
          ).toEqual(current.execution_contract!.authority);
          expect(
            projected.nextTask!.execution_contract!.declaration,
            "fault projection declaration",
          ).toEqual(current.execution_contract!.declaration);
          return { nextTask: projected.nextTask! };
        },
      });
      await opts.command.taskBackend.getTask(mutation.task.id);
      throw new Error("The legacy projection must fail protected source authentication");
    });
  try {
    const failed = await invoke(f.root, [
      "task",
      "advance",
      f.id,
      "--result",
      active.packet.exchange.result_path,
      "--agent-json",
    ]);
    expect(failed.code, failed.stdout + failed.stderr).not.toBe(0);
    expect(failed.stderr).toContain("verification floor");
  } finally {
    fault.mockRestore();
  }
  const actualStatus = execFileSync("git", ["status", "--short", "--untracked-files=all"], {
    cwd: f.root,
    encoding: "utf8",
  });
  const allowedDirty = new Set([
    `.agentplane/tasks/${f.id}/README.md`,
    `.agentplane/tasks/${f.id}/supervision/implementation-evidence.json`,
  ]);
  expect(
    actualStatus
      .split("\n")
      .filter(Boolean)
      .filter((line) => !line.startsWith(" M") || !allowedDirty.has(line.slice(3))),
    "unexpected interrupted fixture changes",
  ).toEqual([]);
  command = await loadCommandContext({ cwd: f.root });
  const common = await resolveCommandGitCommonDir(command);
  const readme = path.join(f.root, ".agentplane/tasks", f.id, "README.md");
  const source = await readFile(readme, "utf8");
  const beforeRaw = await gitShowFile(f.root, "HEAD", `.agentplane/tasks/${f.id}/README.md`);
  const before = decodeCompletedScopeTask(beforeRaw, readme, f.id);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: f.root,
    common_git_dir: common,
    task_id: f.id,
  });
  const journalRaw = await readFile(journalPath, "utf8");
  const exchange = (await readExternalAgentExchange(
    path.join(active.packet.exchange.directory, "exchange.json"),
  ))!;
  const request = {
    schema_version: 1,
    kind: "completed_scope_projection_recovery",
    task_id: f.id,
    repository_root: f.root,
    repository_identity: (before.extensions!.task_kernel as { repository_identity: string })
      .repository_identity,
    config_digest: k.kernelDigest(command.config),
    head_sha: git(f.root, "rev-parse", "HEAD"),
    baseline_sha: exchange.baseline.head!,
    current_readme_digest: bytesDigest(source),
    baseline_readme_digest: bytesDigest(beforeRaw),
    kernel_digest: (before.extensions!.task_kernel as { digest: string }).digest,
    journal_digest: bytesDigest(journalRaw),
    work_order_id: active.order.work_order_id,
    result_digest: exchange.result_digest!,
    by: "USER",
    note: "Fixture operator approved the exact source-bound floor repair.",
  };
  const requestPath = path.join(common, `fixture-projection-request-${f.id}.json`);
  await writeFile(requestPath, JSON.stringify(request), { mode: 0o600 });
  return {
    ...f,
    command,
    common,
    request,
    requestPath,
    readme,
    source,
    before,
    journalPath,
    journalRaw,
  };
}

function recoveryArgs(f: Awaited<ReturnType<typeof interruptedObservationFixture>>) {
  return [
    "task",
    "advance",
    f.id,
    "--workflow-recovery",
    f.requestPath,
    "--remote",
    "--agent-json",
  ];
}

describe("completed native projection recovery", () => {
  let active: Awaited<ReturnType<typeof interruptedObservationFixture>>;
  beforeEach(async () => {
    active = await interruptedObservationFixture();
  }, 120_000);
  it(
    "repairs one exact legacy projection and durably replays without changing Kernel or old journal",
    { timeout: 120_000 },
    async () => {
      const f = active;
      const cli = fileURLToPath(new URL("../../../bin/agentplane.js", import.meta.url));
      const response = execFileSync("node", [cli, ...recoveryArgs(f), "--root", f.root], {
        cwd: f.root,
        encoding: "utf8",
        timeout: 30_000,
        maxBuffer: 4 * 1024 * 1024,
        env: {
          ...process.env,
          AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK: "1",
          AGENTPLANE_DEV_AUTO_BOOTSTRAP: "0",
          AGENTPLANE_NO_UPDATE_CHECK: "1",
          AGENTPLANE_HOOK_RUNNER: cli,
        },
      });
      expect(JSON.parse(response) as unknown).toMatchObject({ status: "projection_recovered" });
      const fresh = await loadCommandContext({ cwd: f.root });
      const current = (await fresh.taskBackend.getTask(f.id))!;
      expect(current.extensions?.task_kernel).toEqual(f.kernel);
      expect(current.extensions?.task_execution_context).toEqual(
        f.before.extensions?.task_execution_context,
      );
      expect(current.quality_review).toEqual(f.before.quality_review);
      expect(current.verification).toEqual(f.before.verification);
      expect(current.execution_contract!.verification.contract!.selected_checks).toContain(
        "docs_contract",
      );
      expect(current.execution_contract!.authority).toEqual(f.before.execution_contract!.authority);
      expect(await readFile(f.journalPath, "utf8")).toBe(f.journalRaw);
      const repaired = await readFile(f.readme, "utf8");
      const repeated = await invoke(f.root, recoveryArgs(f));
      expect(repeated.code, repeated.stdout + repeated.stderr).toBe(0);
      expect(await readFile(f.readme, "utf8")).toBe(repaired);
      const dir = completedScopeProofDirectory(f.common, f.id, k.kernelDigest(f.request));
      const journal = validateSupervisorExecutionEpisodeJournal(
        JSON.parse(await readFile(path.join(dir, "projection-recovery-journal.json"), "utf8")),
      );
      expect(journal.operations).toHaveLength(1);
      expect(journal.operations[0]?.status).toBe("completed");
      const recovered = JSON.parse(response) as { resume_argv: string[] };
      const resumed = await invoke(f.root, recovered.resume_argv.slice(1));
      expect(resumed.code, resumed.stdout + resumed.stderr).toBe(0);
      expect(JSON.parse(resumed.stdout) as unknown).toMatchObject({
        action: { kind: "agent_episode" },
        authority: { role: "EVALUATOR" },
      });
    },
  );

  it(
    "refuses stale source, journal, received result and WorkOrder bindings",
    { timeout: 120_000 },
    async () => {
      const f = active;
      for (const field of [
        "head_sha",
        "journal_digest",
        "current_readme_digest",
        "result_digest",
        "work_order_id",
      ] as const) {
        const request = {
          ...f.request,
          [field]:
            field === "head_sha"
              ? "0".repeat(40)
              : field === "work_order_id"
                ? "unknown-order"
                : `sha256:${"0".repeat(64)}`,
        };
        await writeFile(f.requestPath, JSON.stringify(request));
        const response = await invoke(f.root, recoveryArgs(f));
        expect(response.code, field).not.toBe(0);
        expect(await readFile(f.readme, "utf8"), field).toBe(f.source);
        expect(await readFile(f.journalPath, "utf8"), field).toBe(f.journalRaw);
      }
    },
  );

  it("refuses a user-pinned but unrelated metadata edit", { timeout: 120_000 }, async () => {
    const f = active;
    const parsed = parseTaskReadme(f.source);
    const tampered = renderTaskReadme(parsed.frontmatter, parsed.body + "\nUnrelated note.\n");
    await writeFile(f.readme, tampered);
    await writeFile(
      f.requestPath,
      JSON.stringify({ ...f.request, current_readme_digest: bytesDigest(tampered) }),
    );
    const response = await invoke(f.root, recoveryArgs(f));
    expect(response.code).not.toBe(0);
    expect(response.stderr).toContain("exact interrupted legacy projection");
    expect(await readFile(f.readme, "utf8")).toBe(tampered);
  });

  it(
    "resumes after a real source CAS interruption without a second write",
    { timeout: 120_000 },
    async () => {
      const f = active;
      const store = new LocalTaskByteStore({
        root: path.join(f.root, f.command.config.paths.workflow_dir),
      });
      const cas = store.compareAndSwap.bind(store);
      const fault = vi
        .spyOn(LocalTaskByteStore.prototype, "compareAndSwap")
        .mockImplementationOnce(async (...args) => {
          const written = await cas(...args);
          expect(written).toBe(true);
          throw new CliError({
            code: "E_VALIDATION",
            message: "Injected interruption after source CAS",
          });
        });
      try {
        const interrupted = await invoke(f.root, recoveryArgs(f));
        expect(interrupted.code).not.toBe(0);
      } finally {
        fault.mockRestore();
      }
      const after = await readFile(f.readme, "utf8");
      expect(after).not.toBe(f.source);
      const repeated = await invoke(f.root, recoveryArgs(f));
      expect(repeated.code, repeated.stdout + repeated.stderr).toBe(0);
      expect(await readFile(f.readme, "utf8")).toBe(after);
      expect(await readFile(f.journalPath, "utf8")).toBe(f.journalRaw);
    },
  );

  it("refuses a competing writer and leaves its fence intact", { timeout: 120_000 }, async () => {
    const f = active;
    const lease = await tryAcquireSupervisorExecutionLease({ journal_path: f.journalPath });
    expect(lease).not.toBeNull();
    try {
      const response = await invoke(f.root, recoveryArgs(f));
      expect(response.code).not.toBe(0);
      expect(response.stderr).toContain("lease is busy");
      expect(await readFile(f.readme, "utf8")).toBe(f.source);
    } finally {
      await lease?.release();
    }
  });
});

it.each(["regular", "symlink"] as const)(
  "leaves existing large %s workflow recovery input to its native dispatcher",
  async (sourceKind) => {
    const repo = await tempRepo({ withDefaultConfig: true, branch: "main" });
    const command = await loadCommandContext({ cwd: repo.root });
    const source = path.join(repo.root, "legacy-recovery.json");
    await writeFile(
      source,
      JSON.stringify({
        kind: "integration_effect_resolution",
        evidence: [{ content: "retained native integration evidence ".repeat(3000) }],
      }),
    );
    const input = sourceKind === "symlink" ? path.join(repo.root, "legacy-link.json") : source;
    if (input !== source) await symlink(source, input);
    await expect(
      recoverCompletedProjection({
        command,
        task_id: "LEGACY",
        input_path: input,
      }),
    ).resolves.toBeNull();
  },
);

it.each(["missing", "malformed", "primitive"] as const)(
  "leaves %s legacy input validation and phase ordering to the existing dispatcher",
  async (sourceKind) => {
    const repo = await tempRepo({ withDefaultConfig: true, branch: "main" });
    const command = await loadCommandContext({ cwd: repo.root });
    const input = path.join(repo.root, "legacy-recovery.json");
    if (sourceKind !== "missing")
      await writeFile(input, sourceKind === "malformed" ? "{invalid JSON" : "42");
    await expect(
      recoverCompletedProjection({ command, task_id: "LEGACY", input_path: input }),
    ).resolves.toBeNull();
  },
);

it("keeps new projection recovery requests subject to stable no-follow reads", async () => {
  const repo = await tempRepo({ withDefaultConfig: true, branch: "main" });
  const command = await loadCommandContext({ cwd: repo.root });
  const source = path.join(repo.root, "projection.json");
  await writeFile(source, JSON.stringify({ kind: "completed_scope_projection_recovery" }));
  const input = path.join(repo.root, "projection-link.json");
  await symlink(source, input);
  await expect(
    recoverCompletedProjection({
      command,
      task_id: "LEGACY",
      input_path: input,
    }),
  ).rejects.toThrow(/non-regular/u);
});
