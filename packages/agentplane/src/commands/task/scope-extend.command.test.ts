import { validateSupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import type * as Testkit from "@agentplane/testkit";
import type { AgentActionPacket } from "./agent-action-packet.js";
import {
  readExternalAgentWorkOrder,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";
type Packet = { action: { kind: string }; exchange: NonNullable<AgentActionPacket["exchange"]> };
import * as commitOwner from "../guard/impl/commit.js";
import { CliError } from "../../shared/errors.js";
import { readFile, writeFile, mkdir, symlink, rename, readdir, chmod } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as proof from "../../adapters/task-backend/completed-scope-admission.js";
import * as writes from "../../shared/write-if-changed.js";
import { applyTaskMutation } from "../shared/task-mutation.js";
import { tryAcquireSupervisorExecutionLease } from "../shared/supervisor-execution-episode.js";
import path from "node:path";
import { captureStdIO, installRunCliIntegrationHarness } from "@agentplane/testkit";
import { runCli } from "../../cli/run-cli.js";
import { fixture, git } from "./kernel-completed-external-rework.testkit.js";
import { parseTaskScopeExtensionRequestState } from "../shared/task-scope-extension-request.js";
import type * as PrFlowModule from "../pr/flow-status.js";

vi.mock("@agentplane/testkit", async (original) => {
  const actual = await original<typeof Testkit>();
  return {
    ...actual,
    mkGitRepoRootWithBranch: async (...args: Parameters<typeof actual.mkGitRepoRootWithBranch>) => {
      const root = await actual.mkGitRepoRootWithBranch(...args);
      // Seed the same tracked gateway projection before the fixture's frozen base.
      // Missing gateway policy must not be hidden by weakening the successor check.
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
  ...(await original<typeof PrFlowModule>()),
  resolvePrFlowStatus: async (opts: { ctx: taskBackend.CommandContext; taskId: string }) => {
    const task = (await opts.ctx.taskBackend.getTask(opts.taskId))!;
    const head = git(opts.ctx.resolvedProject.gitRoot, "rev-parse", "HEAD");
    return {
      task: { id: task.id, status: task.status, verification: task.verification?.state ?? null },
      branch: {
        name: git(opts.ctx.resolvedProject.gitRoot, "branch", "--show-current"),
        headSha: head,
        metaHeadSha: null,
      },
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
      hostedChecks: { checked: false, reason: "No provider effects in fixture" },
      reviewThreads: { checked: false, reason: "No provider effects in fixture" },
      queue: { present: false },
      handoff: { present: false },
      nextAction: "Review source",
    } satisfies PrFlowModule.PrFlowStatusReport;
  },
}));
installRunCliIntegrationHarness();
async function invoke(root: string, args: string[]) {
  const io = captureStdIO();
  try {
    const code = await runCli([...args, "--root", root]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

import { afterEach, describe, expect, it, vi } from "vitest";
import * as taskBackend from "../shared/task-backend.js";
import * as kernelRuntime from "./kernel-runtime-context.js";
import {
  TASK_KERNEL_EXTENSION,
  readKernelRecord,
  type KernelRecord,
} from "../../adapters/task-backend/kernel-record.js";
import { cmdTaskScopeExtend, extendBlockedTaskExecutionContract } from "./scope-extend.js";
import { parseCommandArgv } from "../../cli/spec/parse.js";
import { taskScopeExtendSpec } from "./scope-extend.command.js";

const REQUEST_DIGEST = `sha256:${"1".repeat(64)}`;
const STATE_SCOPE_DIGEST = `sha256:${"2".repeat(64)}`;
const STATE_FINGERPRINT = `sha256:${"3".repeat(64)}`;

afterEach(() => vi.restoreAllMocks());

describe("canonical scope grant ownership", () => {
  it("uses the resolved owner context without changing the approval binding", async () => {
    const ctx = {
      taskBackend: {
        getTask: vi
          .fn()
          .mockResolvedValue({ id: "T-1", extensions: { [TASK_KERNEL_EXTENSION]: {} } }),
      },
    } as unknown as taskBackend.CommandContext;
    const owner = { ...ctx, backendId: "authoritative-test-backend" };
    const resolve = vi
      .spyOn(taskBackend, "resolveTaskOwnerCommandContext")
      .mockResolvedValue(owner);
    const approveDelta = vi.fn().mockResolvedValue({ kind: "committed" });
    const create = vi.spyOn(kernelRuntime, "createKernelRuntime").mockResolvedValue({
      authority: { approveDelta },
    } as never);
    await expect(
      cmdTaskScopeExtend({
        ctx,
        taskId: "T-1",
        scopeRoots: ["source.ts"],
        repositoryEffects: ["source_code"],
        requestDigest: REQUEST_DIGEST,
        stateScopeDigest: REQUEST_DIGEST,
        by: "USER",
        quiet: true,
      }),
    ).resolves.toBe(0);
    expect(resolve).toHaveBeenCalledWith({ ctx, taskId: "T-1" });
    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        command: owner,
        approval: { kind: "manual_operator", actor_id: "USER", invocation_id: REQUEST_DIGEST },
      }),
    );
    expect(approveDelta).toHaveBeenCalledWith(
      expect.objectContaining({
        task_id: "T-1",
        scope_roots: ["source.ts"],
        repository_effects: ["source_code"],
        request_digest: REQUEST_DIGEST,
      }),
    );
  });

  it.each([
    { by: "EXECUTOR", stateScopeDigest: REQUEST_DIGEST },
    { by: "USER", stateScopeDigest: STATE_SCOPE_DIGEST },
  ])(
    "rejects invalid authority before resolving writable storage: $by $stateScopeDigest",
    async (approval) => {
      const ctx = {
        taskBackend: {
          getTask: vi
            .fn()
            .mockResolvedValue({ id: "T-1", extensions: { [TASK_KERNEL_EXTENSION]: {} } }),
        },
      } as unknown as taskBackend.CommandContext;
      const resolve = vi.spyOn(taskBackend, "resolveTaskOwnerCommandContext");
      const create = vi.spyOn(kernelRuntime, "createKernelRuntime");
      await expect(
        cmdTaskScopeExtend({
          ctx,
          taskId: "T-1",
          scopeRoots: ["source.ts"],
          repositoryEffects: ["source_code"],
          requestDigest: REQUEST_DIGEST,
          ...approval,
          quiet: true,
        }),
      ).rejects.toThrow("Canonical authority delta");
      expect(resolve).not.toHaveBeenCalled();
      expect(create).not.toHaveBeenCalled();
    },
  );
});

describe("task scope extend command parsing", () => {
  it.each(
    [
      { option: "--state-scope-digest", value: STATE_SCOPE_DIGEST, key: "stateScopeDigest" },
      { option: "--state-fingerprint", value: STATE_FINGERPRINT, key: "stateFingerprint" },
    ].flatMap((binding) => [false, true].map((padded) => ({ ...binding, padded }))),
  )(
    "preserves scalar $option after normalization (padded=$padded)",
    ({ option, value, key, padded }) => {
      expect(
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          padded ? `  ${value}  ` : value,
          "--by",
          "USER",
        ]),
      ).toMatchObject({
        parsed: {
          taskId: "T-1",
          scopeRoots: ["packages/agentplane"],
          requestDigest: REQUEST_DIGEST,
          by: "USER",
          [key]: value,
        },
      });
    },
  );

  it("continues to reject a missing state binding", () => {
    const base = [
      "T-1",
      "--scope-root",
      "packages/agentplane",
      "--request-digest",
      REQUEST_DIGEST,
      "--by",
      "USER",
    ];

    expect(() => parseCommandArgv(taskScopeExtendSpec, base)).toThrow(
      "One of --state-scope-digest or --state-fingerprint is required.",
    );
  });

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "treats whitespace-only %s as missing",
    (option) => {
      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [
          "T-1",
          "--scope-root",
          "packages/agentplane",
          "--request-digest",
          REQUEST_DIGEST,
          option,
          "   ",
          "--by",
          "USER",
        ]),
      ).toThrow("One of --state-scope-digest or --state-fingerprint is required.");
    },
  );

  it.each(["--state-scope-digest", "--state-fingerprint"] as const)(
    "continues to reject malformed %s",
    (option) => {
      const base = [
        "T-1",
        "--scope-root",
        "packages/agentplane",
        "--request-digest",
        REQUEST_DIGEST,
        "--by",
        "USER",
      ];

      expect(() =>
        parseCommandArgv(taskScopeExtendSpec, [...base, option, "sha256:not-a-digest"]),
      ).toThrow(`${option} must be an exact sha256:<64 lowercase hex> digest.`);
    },
  );
});

async function completedScopeFixture(authenticatedReview = false, historicalScope = false) {
  const f = await fixture("branch_pr", false, authenticatedReview, historicalScope);
  const issued = await invoke(f.root, ["task", "advance", f.id, "--agent-json"]);
  expect(issued.code, issued.stdout + issued.stderr).toBe(0);
  const packet = JSON.parse(issued.stdout) as Packet;
  const order = await readExternalAgentWorkOrder(
    path.join(packet.exchange.directory, "work-order.json"),
  );
  expect(order.role).toBe("EXECUTOR");
  const payload = {
    work_order_id: order.work_order_id,
    status: "blocked",
    summary: "Need helper",
    findings: [],
    uncertainty: [],
    blocker: {
      summary: "Helper absent",
      scope_extension_request: {
        schema_version: 1,
        rationale: "Fix helper behavior",
        scope_roots: ["helper.txt"],
        repository_effects: [],
      },
    },
  };
  await writeFile(packet.exchange.result_path, JSON.stringify(payload));
  const returned = await invoke(f.root, [
    "task",
    "advance",
    f.id,
    "--result",
    packet.exchange.result_path,
    "--agent-json",
  ]);
  expect(returned.code, returned.stdout + returned.stderr).toBe(0);
  expect((JSON.parse(returned.stdout) as Packet).action.kind).toBe("human_input_required");
  const command = await taskBackend.loadCommandContext({ cwd: f.root, rootOverride: null });
  const before = (await command.taskBackend.getTask(f.id))!;
  const pending = parseTaskScopeExtensionRequestState(before)!;
  expect(pending.status).toBe("pending");
  const head = git(f.root, "rev-parse", "HEAD");
  const args = [
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
  ];
  return { f, packet, payload, command, before, pending, head, args };
}

function coldProcess(root: string, id: string) {
  const backend = fileURLToPath(new URL("../shared/task-backend.ts", import.meta.url));
  const kernel = fileURLToPath(
    new URL("../../adapters/task-backend/kernel-record.ts", import.meta.url),
  );
  const script = `const b=await import(${JSON.stringify(backend)});const k=await import(${JSON.stringify(kernel)});
    const c=await b.loadCommandContext({cwd:${JSON.stringify(root)},rootOverride:null});
    const t=await c.taskBackend.getTask(${JSON.stringify(id)});
    const all=await c.taskBackend.getTasks([t.id]);const list=await c.taskBackend.listTasks();
    const projected=await c.taskBackend.listProjectionTasks();
    const classify=t=>k.readKernelRecord(t,t.extensions.task_kernel.repository_identity).kind;
    console.log(JSON.stringify({pid:process.pid,one:classify(t),batch:classify(all[0]),list:classify(list.find(x=>x.id===t.id)),projection:classify(projected.find(x=>x.id===t.id))}));`;
  return JSON.parse(
    execFileSync("bun", ["--eval", script], { cwd: root, encoding: "utf8", timeout: 30_000 }),
  ) as {
    pid: number;
    one: string;
    batch: string;
    list: string;
    projection: string;
  };
}

describe("completed native repair prospective scope admission", { timeout: 120_000 }, () => {
  it("authenticates the consumed blocker, admits exact scope, and preserves terminal history", async () => {
    const { f, packet, payload, command, before, args } = await completedScopeFixture(true, true);
    const admitted = await invoke(f.root, args);
    expect(admitted.code, admitted.stdout + admitted.stderr).toBe(0);
    const observation6 = await command.taskBackend.getTask(f.id);
    const after = observation6!;
    expect(after.status).toBe("DONE");
    expect(after.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    expect(after.commit).toEqual(before.commit);
    expect(after.quality_review).toEqual(before.quality_review);
    expect(after.extensions?.task_execution_context).toEqual(
      before.extensions?.task_execution_context,
    );
    expect(after.execution_contract?.authority.writable_roots).toContain("helper.txt");
    expect(parseTaskScopeExtensionRequestState(after)).toMatchObject({
      status: "applied",
      applied_by: "USER",
    });
    expect(before.execution_contract?.authority.allowed_capabilities).toEqual(["repository_write"]);
    expect(after.execution_contract?.authority.allowed_capabilities).toEqual(["repository_write"]);
    expect(Object.hasOwn(after.execution_contract!.authority, "allowed_resources")).toBe(true);
    expect(after.execution_contract?.observed.verification_results).toEqual(
      before.execution_contract?.observed.verification_results,
    );
    const historical = before.extensions?.task_kernel as KernelRecord;
    expect(
      historical.aggregate.authority_lineage?.some(
        (entry) => entry.observation?.kind === "prospective_scope_request",
      ),
    ).toBe(true);
    const identity = historical.repository_identity;
    const authenticateBlocker = vi.fn(() => Promise.resolve());
    await expect(
      proof.authenticateCompletedScopeTask({
        task: structuredClone(after),
        source: {
          git_root: f.root,
          common_git_dir: await taskBackend.resolveCommandGitCommonDir(command),
          repository_identity: identity,
          readme_path: path.join(f.root, "copied", f.id, "README.md"),
          raw: await readFile(
            path.join(f.root, command.config.paths.workflow_dir, f.id, "README.md"),
            "utf8",
          ),
        },
        authenticate_blocker: authenticateBlocker,
      }),
    ).rejects.toThrow(/source/u);
    expect(authenticateBlocker).not.toHaveBeenCalled();
    const serialized = JSON.stringify(after);
    const decoded = JSON.parse(serialized) as TaskData;
    for (const copied of [{ ...after }, structuredClone(after), decoded])
      expect(readKernelRecord(copied, identity)).toMatchObject({
        kind: "malformed",
        reason: "completed_scope_admission_unproven",
      });
    expect(
      readKernelRecord(
        proof.transferCompletedScopePermit(after, { ...after, doc: "Metadata projection" }),
        identity,
      ).kind,
    ).toBe("canonical");
    const changed = structuredClone(after);
    changed.execution_contract!.authority.writable_roots.push("unapproved.txt");
    expect(
      readKernelRecord(proof.transferCompletedScopePermit(after, changed), identity).kind,
    ).toBe("malformed");
    const changedBase = structuredClone(after);
    changedBase.extensions!.task_execution_context = {
      ...(changedBase.extensions!.task_execution_context as object),
      base_sha: "0".repeat(40),
    };
    expect(
      readKernelRecord(proof.transferCompletedScopePermit(after, changedBase), identity).kind,
    ).toBe("malformed");
    const replayHead = git(f.root, "rev-parse", "HEAD");
    const replay = await invoke(f.root, args);
    expect(replay.code, replay.stdout + replay.stderr).toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(replayHead);
    expect(await readFile(packet.exchange.result_path, "utf8")).toBe(JSON.stringify(payload));
    expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
    const next = await invoke(f.root, ["task", "advance", f.id, "--agent-json", "--remote"]);
    expect(next.code, next.stdout + next.stderr).toBe(0);
    let successor = JSON.parse(next.stdout) as Packet;
    expect(successor.action.kind, next.stdout).toBe("agent_episode");
    let fresh = await readExternalAgentWorkOrder(
      path.join(successor.exchange.directory, "work-order.json"),
    );
    if (fresh.role === "EVALUATOR") {
      // Scope admission changes review authority. Complete the required fresh
      // fixture assessment, rather than skipping independent evaluation.
      expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
      await writeFile(
        successor.exchange.result_path,
        JSON.stringify({
          work_order_id: fresh.work_order_id,
          status: "completed",
          summary: "Fixture helper implementation is unavailable for behavior assessment.",
          findings: ["The fixture still contains before, so implementation rework is required."],
          uncertainty: [],
          review: {
            verdict: "blocked",
            missing_tests: [],
            hidden_assumptions: [],
            residual_risks: [],
            recovery_context: "Implement the admitted helper.",
          },
        }),
      );
      const reviewed = await invoke(f.root, successor.exchange.resume_argv.slice(1));
      expect(reviewed.code, reviewed.stdout + reviewed.stderr).toBe(0);
      successor = JSON.parse(reviewed.stdout) as Packet;
      expect(successor.action.kind, reviewed.stdout).toBe("agent_episode");
      fresh = await readExternalAgentWorkOrder(
        path.join(successor.exchange.directory, "work-order.json"),
      );
    }
    expect(fresh.role).toBe("EXECUTOR");
    expect(fresh.authority.writable_roots.some((root: string) => root.endsWith("helper.txt"))).toBe(
      true,
    );
    expect(fresh.state_fingerprint.components.policy.state).toBe("present");
    expect(fresh.stop_rules.join(" ")).not.toContain("task_kind_incompatible");
    expect(fresh.stop_rules.join(" ")).not.toContain("Execution profile release is incompatible");
    const observation7 = await command.taskBackend.getTask(f.id);
    expect(observation7?.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    // A second genuine blocker extends the same immutable completed Kernel.
    await writeFile(
      successor.exchange.result_path,
      JSON.stringify({
        ...payload,
        work_order_id: fresh.work_order_id,
        blocker: {
          ...payload.blocker,
          scope_extension_request: {
            ...payload.blocker.scope_extension_request,
            scope_roots: ["second.txt"],
          },
        },
      }),
    );
    const blockedAgain = await invoke(f.root, successor.exchange.resume_argv.slice(1));
    expect(blockedAgain.code, blockedAgain.stdout + blockedAgain.stderr).toBe(0);
    const second = parseTaskScopeExtensionRequestState((await command.taskBackend.getTask(f.id))!)!;
    const secondArgs = args.map((arg, index) =>
      index === 5 ? "second.txt" : index === 7 || index === 9 ? second.request_digest : arg,
    );
    const extended = await invoke(f.root, secondArgs);
    expect(extended.code, extended.stdout + extended.stderr).toBe(0);
    const twice = (await command.taskBackend.getTask(f.id))!;
    expect(proof.completedScopeAdmissionIds(twice)).toHaveLength(2);
    expect(twice.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    const expectedCold = {
      one: "canonical",
      batch: "canonical",
      list: "canonical",
      projection: "canonical",
    };
    const cold = coldProcess(f.root, f.id);
    expect(cold).toMatchObject(expectedCold);
    expect(cold.pid).not.toBe(process.pid);
    const oldBase = (before.extensions!.task_execution_context as { base_sha: string }).base_sha;
    const main = path.join(f.root, ".agentplane/worktrees/cold-main");
    git(f.root, "worktree", "add", main, "main");
    git(main, "merge", "--ff-only", git(f.root, "branch", "--show-current"));
    expect(coldProcess(main, f.id)).toMatchObject(expectedCold);
    const compact = path.join(f.root, ".agentplane/worktrees/cold-history");
    git(f.root, "worktree", "add", "--detach", compact, oldBase);
    await mkdir(path.join(compact, ".agentplane/tasks"), { recursive: true });
    git(f.root, "config", "extensions.worktreeConfig", "true");
    git(compact, "config", "--worktree", "agentplane.compactTaskHistory", "true");
    expect(coldProcess(compact, f.id)).toMatchObject(expectedCold);
    const snapshot = await taskBackend.loadCommandContext({ cwd: main, rootOverride: null });
    snapshot.memo.taskWorktreeInventory = Promise.resolve([]);
    const historicalTask = await taskBackend.loadTaskFromBranchSnapshot({
      ctx: snapshot,
      taskId: f.id,
      readmePath: path.join(main, snapshot.config.paths.workflow_dir, f.id, "README.md"),
      branch: git(f.root, "branch", "--show-current"),
      requireWorktree: false,
    });
    expect(readKernelRecord(historicalTask, identity).kind).toBe("canonical");
  });
});

it(
  "refuses source edits reverted after the consumed scope blocker",
  { timeout: 120_000 },
  async () => {
    const { f, args, command, before } = await completedScopeFixture();
    await writeFile(path.join(f.root, "source.txt"), "changed");
    git(f.root, "add", "source.txt");
    git(f.root, "commit", "-m", "source drift");
    await writeFile(path.join(f.root, "source.txt"), "before\n");
    git(f.root, "add", "source.txt");
    git(f.root, "commit", "-m", "restore bytes");
    const head = git(f.root, "rev-parse", "HEAD");
    const observation3 = await invoke(f.root, args);
    expect(observation3.code).not.toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    const observation8 = await command.taskBackend.getTask(f.id);
    expect(observation8?.execution_contract).toEqual(before.execution_contract);
  },
);

it.each([
  { sourceDrift: true, reverted: false },
  { sourceDrift: true, reverted: true },
  { sourceDrift: false, reverted: false },
])(
  "checks merge history with log.diffMerges=off (sourceDrift=$sourceDrift, reverted=$reverted)",
  { timeout: 120_000 },
  async ({ sourceDrift, reverted }) => {
    const { f, args, command, before } = await completedScopeFixture();
    git(f.root, "config", "--local", "log.diffMerges", "off");
    const branch = git(f.root, "branch", "--show-current");
    const readme = `.agentplane/tasks/${f.id}/README.md`;
    const original = await readFile(path.join(f.root, readme), "utf8");
    git(f.root, "checkout", "-b", "readme-only-side");
    await writeFile(path.join(f.root, readme), `${original}\nSide metadata.\n`);
    git(f.root, "add", readme);
    git(f.root, "commit", "-m", "side metadata only");
    git(f.root, "checkout", branch);
    await writeFile(path.join(f.root, readme), `${original}\nMain metadata.\n`);
    git(f.root, "add", readme);
    git(f.root, "commit", "-m", "main metadata only");
    git(f.root, "merge", "readme-only-side", "--no-ff", "--no-commit", "-s", "ours");
    await writeFile(path.join(f.root, readme), original);
    if (sourceDrift)
      await writeFile(path.join(f.root, "source.txt"), "merge-resolution source drift\n");
    git(f.root, "add", readme, "source.txt");
    git(f.root, "commit", "-m", "merge with source resolution");
    if (reverted) {
      await writeFile(path.join(f.root, "source.txt"), "before\n");
      git(f.root, "add", "source.txt");
      git(f.root, "commit", "-m", "restore source bytes");
    }
    const head = git(f.root, "rev-parse", "HEAD");
    const result = await invoke(f.root, args);
    const after = (await command.taskBackend.getTask(f.id))!;
    expect(after.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    if (sourceDrift) {
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain("Completed repair scope requires");
      expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      expect(after.execution_contract).toEqual(before.execution_contract);
      expect(parseTaskScopeExtensionRequestState(after)).toMatchObject({ status: "pending" });
    } else {
      expect(result.code, result.stdout + result.stderr).toBe(0);
      expect(after.execution_contract?.authority.writable_roots).toContain("helper.txt");
      expect(parseTaskScopeExtensionRequestState(after)).toMatchObject({ status: "applied" });
      expect(after.commit).toEqual(before.commit);
      expect(after.quality_review).toEqual(before.quality_review);
      expect(after.extensions?.task_execution_context).toEqual(
        before.extensions?.task_execution_context,
      );
      expect(await readFile(path.join(f.root, "source.txt"), "utf8")).toBe("before\n");
    }
  },
);

it(
  "preserves one admitted scope after interrupted metadata commit without replaying approval",
  { timeout: 120_000 },
  async () => {
    const { f, args, command, before } = await completedScopeFixture();
    const stop = vi.spyOn(commitOwner, "cmdCommit").mockRejectedValueOnce(
      new CliError({
        code: "E_VALIDATION",
        message: "Injected commit interruption after scope persistence",
      }),
    );
    try {
      const observation4 = await invoke(f.root, args);
      expect(observation4.code).not.toBe(0);
    } finally {
      stop.mockRestore();
    }
    const observation9 = await command.taskBackend.getTask(f.id);
    const admitted = observation9!;
    expect(parseTaskScopeExtensionRequestState(admitted)).toMatchObject({
      status: "applied",
      applied_by: "USER",
    });
    expect(admitted.execution_contract?.authority.writable_roots).toContain("helper.txt");
    expect(admitted.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    const comments = admitted.comments?.filter((comment) =>
      comment.body.startsWith("Approved state-bound execution scope extension:"),
    );
    expect(comments).toHaveLength(1);
    const observation5 = await invoke(f.root, args);
    expect(observation5.code, observation5.stdout + observation5.stderr).toBe(0);
    const observation10 = await command.taskBackend.getTask(f.id);
    const replayed = observation10!;
    expect(replayed.comments).toEqual(admitted.comments);
    expect(replayed.execution_contract).toEqual(admitted.execution_contract);
    expect(replayed.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
  },
);

it(
  "refuses invalid scope, altered exchange and dirty source before admission",
  { timeout: 120_000 },
  async () => {
    const { f, packet, command, before, head, args } = await completedScopeFixture();
    for (const [index, value] of [
      [5, "expanded.txt"],
      [7, REQUEST_DIGEST],
      [11, "EXECUTOR"],
    ] as const) {
      const wrong = [...args];
      wrong[index] = value;
      const refused = await invoke(f.root, wrong);
      expect(refused.code, refused.stdout + refused.stderr).not.toBe(0);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    }
    const exchangeFile = path.join(packet.exchange.directory, "exchange.json");
    const retained = await readFile(exchangeFile, "utf8");
    for (const change of [
      { purpose: "implementation" },
      { status: "issued" },
      { transition_id: "tr_" + "0".repeat(32) },
    ]) {
      await writeFile(
        exchangeFile,
        JSON.stringify({ ...(JSON.parse(retained) as ExternalAgentExchange), ...change }),
      );
      const observation1 = await invoke(f.root, args);
      expect(observation1.code).not.toBe(0);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
      await writeFile(exchangeFile, retained);
    }
    await writeFile(path.join(f.root, "source.txt"), "dirty source");
    const observation2 = await invoke(f.root, args);
    expect(observation2.code).not.toBe(0);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    await writeFile(path.join(f.root, "source.txt"), "before\n");

    const after = await command.taskBackend.getTask(f.id);
    expect(after?.execution_contract).toEqual(before.execution_contract);
    expect(after?.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    expect(parseTaskScopeExtensionRequestState(after!)).toMatchObject({ status: "pending" });
  },
);

it.each([false, true])(
  "reconciles the same protected intent after a write interruption (written=%s)",
  { timeout: 120_000 },
  async (written) => {
    const { f, args, command, before } = await completedScopeFixture(false, true);
    const file = path.join(f.root, command.config.paths.workflow_dir, f.id, "README.md");
    const original = writes.writeTextIfChanged;
    let interrupt = true;
    const stop = vi.spyOn(writes, "writeTextIfChanged").mockImplementation(async (...call) => {
      if (call[0] === file && interrupt) {
        interrupt = false;
        if (written) await original(...call);
        throw new Error("Injected interruption at Task publication");
      }
      return await original(...call);
    });
    const failed = await invoke(f.root, args);
    stop.mockRestore();
    expect(failed.code).not.toBe(0);
    const common = await taskBackend.resolveCommandGitCommonDir(command);
    const parent = path.join(common, "agentplane/completed-scope", f.id);
    const entries = await readdir(parent);
    expect(entries).toHaveLength(1);
    const journal = path.join(parent, entries[0]!, "journal.json");
    const intent = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(journal, "utf8")),
    );
    expect(intent.operations).toHaveLength(1);
    expect(intent.cursor.phase).toBe("intent_recorded");
    const retained = await proof.readCompletedScopeAdmission(common, f.id, `sha256:${entries[0]!}`);
    proof.validatePreparedCompletedScope(retained);
    expect(
      readKernelRecord(
        retained.after,
        (before.extensions!.task_kernel as KernelRecord).repository_identity,
      ).kind,
    ).toBe("malformed");
    if (written) await expect(command.taskBackend.getTask(f.id)).rejects.toThrow();
    else {
      const unchanged = await command.taskBackend.getTask(f.id);
      expect(unchanged?.execution_contract).toEqual(before.execution_contract);
    }
    const resumed = await invoke(f.root, args);
    expect(resumed.code, resumed.stdout + resumed.stderr).toBe(0);
    const completed = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(journal, "utf8")),
    );
    expect(completed.operations).toHaveLength(1);
    expect(completed.operations[0].operation_key).toBe(intent.operations[0].operation_key);
    expect(completed.cursor.phase).toBe("completed");
    const after = (await command.taskBackend.getTask(f.id))!;
    expect(after.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    expect(
      after.comments?.filter((comment) =>
        comment.body.startsWith("Approved state-bound execution scope extension:"),
      ),
    ).toHaveLength(1);
  },
);

it(
  "rejects escaping proof storage, a competing writer, missing and forged native proof",
  { timeout: 120_000 },
  async () => {
    const { f, args, command, before, head } = await completedScopeFixture(false, true);
    const common = await taskBackend.resolveCommandGitCommonDir(command);
    const proofRoot = path.join(common, "agentplane/completed-scope");
    const escaped = path.join(common, "escaped-proof");
    await mkdir(escaped);
    await symlink(escaped, proofRoot);
    const escapedResult = await invoke(f.root, args);
    expect(escapedResult.code).not.toBe(0);
    expect(await readdir(escaped)).toEqual([]);
    await rename(proofRoot, `${proofRoot}.symlink-retained`);
    const lease = await tryAcquireSupervisorExecutionLease({
      journal_path: path.join(common, "agentplane/supervisor/episodes", f.id, "journal.json"),
    });
    expect(lease).not.toBeNull();
    try {
      const busy = await invoke(f.root, args);
      expect(busy.code).not.toBe(0);
    } finally {
      await lease!.release();
    }
    expect(git(f.root, "rev-parse", "HEAD")).toBe(head);
    const unchanged = await command.taskBackend.getTask(f.id);
    expect(unchanged?.execution_contract).toEqual(before.execution_contract);
    const admitted = await invoke(f.root, args);
    expect(admitted.code, admitted.stdout + admitted.stderr).toBe(0);
    const task = (await command.taskBackend.getTask(f.id))!;
    const dir = proof.completedScopeProofDirectory(
      common,
      f.id,
      proof.completedScopeAdmissionIds(task)[0]!,
    );
    const stableHead = git(f.root, "rev-parse", "HEAD");
    for (const name of ["intent.json", "result.json", "journal.json"]) {
      const file = path.join(dir, name),
        raw = await readFile(file, "utf8");
      await rename(file, `${file}.retained`);
      await expect(command.taskBackend.getTask(f.id)).rejects.toThrow();
      for (const argv of [
        ["task", "show", f.id],
        ["task", "list", "--all"],
        ["task", "resume-context", f.id, "--json"],
      ]) {
        const missing = await invoke(f.root, argv);
        expect(missing.code, name).not.toBe(0);
      }
      await writeFile(
        file,
        JSON.stringify({ ...(JSON.parse(raw) as Record<string, unknown>), forged: true }),
        { mode: 0o600 },
      );
      await expect(command.taskBackend.listTasks()).rejects.toThrow();
      await expect(command.taskBackend.listProjectionTasks!()).rejects.toThrow();
      await rename(file, `${file}.forged-retained`);
      await rename(`${file}.retained`, file);
      const restored = await command.taskBackend.getTask(f.id);
      expect(restored?.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
      expect(git(f.root, "rev-parse", "HEAD")).toBe(stableHead);
    }
    await chmod(dir, 0o755);
    await expect(command.taskBackend.getTask(f.id)).rejects.toThrow("directory owner/mode");
    await chmod(dir, 0o700);
    const restored = await command.taskBackend.getTask(f.id);
    expect(restored?.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
  },
);

it(
  "recovers only the exact typed legacy partial and retains all original evidence",
  { timeout: 120_000 },
  async () => {
    const { f, command, before, pending, head, args } = await completedScopeFixture(false, true);
    const relative = `${command.config.paths.workflow_dir}/${f.id}/README.md`;
    const file = path.join(f.root, relative),
      beforeRaw = await readFile(file, "utf8");
    const kernel = before.extensions!.task_kernel as KernelRecord;
    const legacyContract = extendBlockedTaskExecutionContract({
      command,
      task: before,
      scope_roots: pending.request.scope_roots,
      repository_effects: pending.request.repository_effects,
      request_digest: pending.request_digest,
      by: "USER",
      completedRework: true,
    });
    const appliedAt = new Date().toISOString();
    await applyTaskMutation({
      ctx: command,
      taskId: f.id,
      allowCanonicalProjection: true,
      build: (current) => ({
        nextTask: {
          ...current,
          doc: undefined,
          doc_updated_at: appliedAt,
          doc_updated_by: "USER",
          execution_contract: legacyContract,
          extensions: {
            ...current.extensions,
            ["agentplane.scope_extension_request"]: {
              ...pending,
              status: "applied",
              applied_at: appliedAt,
              applied_by: "USER",
            },
          },
          comments: [
            ...(current.comments ?? []),
            proof.completedScopeApprovalComment(
              pending.request.scope_roots,
              pending.request.repository_effects,
            ),
          ],
        },
      }),
    });
    const partialRaw = await readFile(file, "utf8");
    await expect(command.taskBackend.getTask(f.id)).rejects.toThrow(
      "scope_request_intake_projection",
    );
    const untyped = await invoke(f.root, args);
    expect(untyped.code).not.toBe(0);
    const common = await taskBackend.resolveCommandGitCommonDir(command);
    const journalPath = path.join(common, "agentplane/supervisor/episodes", f.id, "journal.json");
    const originalJournal = await readFile(journalPath, "utf8");
    const requestFile = path.join(common, "legacy-reconcile-request.json");
    const request = {
      schema_version: 1,
      kind: "completed_scope_admission_reconcile",
      task_id: f.id,
      repository_identity: kernel.repository_identity,
      kernel_digest: kernel.digest,
      head_sha: head,
      before_commit: head,
      before_readme_digest: proof.completedScopeBytesDigest(beforeRaw),
      partial_readme_digest: proof.completedScopeBytesDigest(partialRaw),
      request_digest: pending.request_digest,
    };
    const recoverArgs = async (value: object) => {
      const raw = JSON.stringify(value) + "\n";
      await writeFile(requestFile, raw, { mode: 0o600 });
      return [
        ...args.map((arg, index) => (index === 9 ? proof.completedScopeBytesDigest(raw) : arg)),
        "--reconcile-request",
        requestFile,
      ];
    };
    for (const invalid of [
      { ...request, extra: true },
      { ...request, kernel_digest: REQUEST_DIGEST },
      { ...request, head_sha: "1".repeat(40) },
      { ...request, before_readme_digest: REQUEST_DIGEST },
      { ...request, partial_readme_digest: REQUEST_DIGEST },
    ]) {
      const refused = await invoke(f.root, await recoverArgs(invalid));
      expect(refused.code).not.toBe(0);
      expect(await readFile(file, "utf8")).toBe(partialRaw);
      expect(await readFile(journalPath, "utf8")).toBe(originalJournal);
    }
    const recover = await recoverArgs(request);
    const result = await invoke(f.root, recover);
    expect(result.code, result.stdout + result.stderr).toBe(0);
    const after = (await command.taskBackend.getTask(f.id))!;
    expect(after.extensions?.task_kernel).toEqual(before.extensions?.task_kernel);
    expect(after.execution_contract?.authority.allowed_capabilities).toEqual(
      before.execution_contract?.authority.allowed_capabilities,
    );
    expect(after.execution_contract?.observed.verification_results).toEqual(
      before.execution_contract?.observed.verification_results,
    );
    expect(after.execution_contract?.verification.contract?.selected_checks).toEqual(
      expect.arrayContaining(before.execution_contract!.verification.contract!.selected_checks),
    );
    const dir = proof.completedScopeProofDirectory(
      common,
      f.id,
      proof.completedScopeAdmissionIds(after)[0]!,
    );
    const evidence = await proof.readCompletedScopeAdmission(
      common,
      f.id,
      proof.completedScopeAdmissionIds(after)[0]!,
    );
    expect(evidence.before_readme).toBe(beforeRaw);
    expect(evidence.partial_readme).toBe(partialRaw);
    expect(await readFile(journalPath, "utf8")).toBe(originalJournal);
    const replayHead = git(f.root, "rev-parse", "HEAD"),
      afterRaw = await readFile(file, "utf8");
    const replay = await invoke(f.root, recover);
    expect(replay.code).toBe(0);
    expect(await readFile(file, "utf8")).toBe(afterRaw);
    expect(git(f.root, "rev-parse", "HEAD")).toBe(replayHead);
    const finalJournal = validateSupervisorExecutionEpisodeJournal(
      JSON.parse(await readFile(path.join(dir, "journal.json"), "utf8")),
    );
    expect(finalJournal.operations).toHaveLength(1);
  },
);
