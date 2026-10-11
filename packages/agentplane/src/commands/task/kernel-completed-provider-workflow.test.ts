import type * as CoreGit from "@agentplaneorg/core/git";
import { resolveCompletedReviewOwner } from "./kernel-completed-native-review.js";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { executeAdmittedBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";
import type { WorkflowSupervisorOperationResult } from "../shared/workflow-supervisor.js";

type Admission = Parameters<typeof executeAdmittedBranchWorkflowOperation>[0];

const mocks = vi.hoisted(() => ({
  admit: vi.fn(),
  execute: vi.fn(),
  decide: vi.fn(),
  load: vi.fn(),
  common: vi.fn(),
  read: vi.fn(),
  recover: vi.fn(),
  suspend: vi.fn(),
  findWorktree: vi.fn(),
  listWorktrees: vi.fn(),
}));
vi.mock("@agentplaneorg/core/git", async (original) => ({
  ...(await original<typeof CoreGit>()),
  findWorktreeForBranch: mocks.findWorktree,
  listWorktrees: mocks.listWorktrees,
}));
vi.mock("./branch-task-supervisor-operations.js", () => ({
  executeAdmittedBranchWorkflowOperation: mocks.admit,
  executeBranchWorkflowOperation: mocks.execute,
}));
vi.mock("../shared/route-decision.js", () => ({ buildTaskRouteDecision: mocks.decide }));
vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.load,
  resolveCommandGitCommonDir: mocks.common,
}));
vi.mock("../../adapters/task-backend/kernel-record.js", () => ({
  readKernelRecord: mocks.read,
}));
vi.mock("./kernel-controller-handoff.js", () => ({
  recoverCanonicalControllerSuspension: mocks.recover,
  withCanonicalControllerSuspendedForOperation: mocks.suspend,
}));
vi.mock("./kernel-provider-effect-coordinator.js", () => ({
  canonicalWorkflowRequestDigest: (_task: string, decision: TaskRouteDecision) =>
    decision.workflowStep.preconditionFingerprint.digest,
}));

import {
  advanceCompletedProviderWorkflow,
  resolveCompletedWorkflowBase,
} from "./kernel-completed-provider-workflow.js";

const command = { resolvedProject: { gitRoot: "/repo/task" } } as CommandContext;
const target = {
  resolvedProject: { gitRoot: "/repo/base" },
  taskBackend: { getTask: vi.fn().mockResolvedValue({ id: "T-1" }) },
} as unknown as CommandContext;
const record = {
  digest: "sha256:completed",
  repository_identity: "sha256:repository",
  aggregate: { id: "T-1", state: "COMPLETED" },
} as KernelRecord;

function decision(id = "pr.open"): TaskRouteDecision {
  return {
    task: { id: "T-1" },
    workspace: { baseCheckoutPath: "/repo/base", taskWorktreePath: "/repo/task" },
    executionPacket: { mustRunFrom: "/repo/task" },
    workflowStep: {
      id,
      kind: "cli_operation",
      operation: { id, idempotencyKey: "operation:1" },
      preconditionFingerprint: { digest: "sha256:before" },
    },
  } as TaskRouteDecision;
}
const terminal = { workflowStep: { kind: "terminal" } } as TaskRouteDecision;
function persisted(overrides: Record<string, unknown> = {}) {
  return {
    execution: {
      executable: true,
      stop_reason: null,
      result: { status: "succeeded" },
      refreshed_decision: terminal,
      ...overrides,
    },
    journal: {
      digest: "sha256:journal",
      status: "running",
      cursor: { phase: "ready" },
      stop: null,
    },
  };
}
beforeEach(() => {
  vi.clearAllMocks();
  mocks.common.mockResolvedValue("/repo/.git");
  mocks.load.mockResolvedValue(target);
  mocks.read.mockReturnValue({ kind: "canonical", record });
  mocks.execute.mockResolvedValue({ status: "succeeded" });
  mocks.suspend.mockImplementation(
    async ({ run }: { run: () => Promise<WorkflowSupervisorOperationResult> }) => await run(),
  );
  mocks.admit.mockResolvedValue(persisted());
});

describe("completed provider workflow", () => {
  it("preserves the admission boundary and stops on denied authority", async () => {
    mocks.admit.mockResolvedValue(
      persisted({
        executable: false,
        result: null,
        stop_reason: "authority denied",
        refreshed_decision: null,
      }),
    );
    const before = decision();
    const result = await advanceCompletedProviderWorkflow({
      command,
      decision: before,
      task_id: "T-1",
    });
    expect(mocks.admit).toHaveBeenCalledWith(expect.objectContaining({ decision: before }));
    expect(mocks.execute).not.toHaveBeenCalled();
    expect(result).toMatchObject({
      kind: "stop",
      action: { reason: "canonical_workflow_effect_unavailable" },
    });
  });

  it.each(["integration.enqueue", "integration.run_next"])(
    "executes %s from base without changing the frozen decision",
    async (id) => {
      const before = decision(id);
      const snapshot = structuredClone(before);
      mocks.admit.mockImplementation(async (opts: Admission) => {
        if (!opts.execute || before.workflowStep.kind !== "cli_operation")
          throw new Error("fixture");
        await opts.execute(before.workflowStep.operation);
        await opts.refresh();
        return persisted();
      });
      await expect(
        advanceCompletedProviderWorkflow({ command, decision: before, task_id: "T-1" }),
      ).resolves.toEqual({ kind: "progress" });
      expect(mocks.execute).toHaveBeenCalledTimes(1);
      expect(mocks.execute.mock.calls[0]?.[0]).toMatchObject({
        decision: {
          executionPacket: {
            mustRunFrom: "/repo/base",
            authoritativeCheckout: "base_checkout",
          },
        },
      });
      expect(before).toEqual(snapshot);
      expect(mocks.decide).toHaveBeenCalledWith(
        expect.objectContaining({ includeRemote: true, freshHead: true }),
      );
      expect(mocks.recover).toHaveBeenCalledTimes(id === "integration.run_next" ? 1 : 0);
      expect(mocks.suspend).toHaveBeenCalledTimes(id === "integration.run_next" ? 1 : 0);
    },
  );

  it("rejects a base checkout from another repository before execution", async () => {
    mocks.common.mockImplementation((ctx: CommandContext) =>
      Promise.resolve(ctx === target ? "/other/.git" : "/repo/.git"),
    );
    const before = decision("integration.enqueue");
    mocks.admit.mockImplementation(async (opts: Admission) => {
      if (!opts.execute || before.workflowStep.kind !== "cli_operation") throw new Error("fixture");
      return await opts.execute(before.workflowStep.operation);
    });
    await expect(
      advanceCompletedProviderWorkflow({ command, decision: before, task_id: "T-1" }),
    ).rejects.toThrow("outside the repository");
    expect(mocks.execute).not.toHaveBeenCalled();
  });

  it("accepts a recovered ready cursor without inventing an execution result", async () => {
    mocks.admit.mockResolvedValue(persisted({ executable: false, result: null }));
    await expect(
      advanceCompletedProviderWorkflow({ command, decision: decision(), task_id: "T-1" }),
    ).resolves.toEqual({ kind: "progress" });
    expect(mocks.execute).not.toHaveBeenCalled();
  });

  it("stops when a successful operation has no observed postcondition", async () => {
    const before = decision();
    mocks.admit.mockResolvedValue(persisted({ refreshed_decision: before }));
    await expect(
      advanceCompletedProviderWorkflow({ command, decision: before, task_id: "T-1" }),
    ).resolves.toMatchObject({
      kind: "stop",
      action: { reason: "canonical_workflow_effect_no_progress" },
    });
  });

  it("resumes a recovered ready cursor even when its provider request is unchanged", async () => {
    const before = decision();
    mocks.admit.mockResolvedValue(
      persisted({ executable: false, result: null, refreshed_decision: before }),
    );
    await expect(
      advanceCompletedProviderWorkflow({ command, decision: before, task_id: "T-1" }),
    ).resolves.toEqual({ kind: "progress" });
    expect(mocks.execute).not.toHaveBeenCalled();
  });

  it("preserves effect-in-doubt evidence without retrying", async () => {
    const outcome = persisted({
      executable: false,
      result: null,
      stop_reason: "in doubt",
      refreshed_decision: null,
    });
    mocks.admit.mockResolvedValue({
      ...outcome,
      journal: { ...outcome.journal, stop: { reason: "effect_in_doubt" } },
    });
    await expect(
      advanceCompletedProviderWorkflow({ command, decision: decision(), task_id: "T-1" }),
    ).resolves.toMatchObject({
      action: { reason: "effect_in_doubt", evidence_digest: "sha256:journal" },
    });
    expect(mocks.admit).toHaveBeenCalledTimes(1);
  });

  it("does not admit local operations or wait routes as provider effects", async () => {
    await expect(
      advanceCompletedProviderWorkflow({
        command,
        decision: decision("task.pre_merge_close"),
        task_id: "T-1",
      }),
    ).resolves.toBeNull();
    await expect(
      advanceCompletedProviderWorkflow({ command, decision: terminal, task_id: "T-1" }),
    ).resolves.toBeNull();
    expect(mocks.admit).not.toHaveBeenCalled();
  });
});

describe("completed base checkout", () => {
  it("reads the identical completed record without a Kernel mutation", async () => {
    await expect(
      resolveCompletedWorkflowBase({ command, record, base_checkout: "/repo/base" }),
    ).resolves.toBe(target);
    expect(mocks.read).toHaveBeenCalledWith({ id: "T-1" }, record.repository_identity);
  });

  it.each([
    { kind: "legacy_unmigrated" },
    { kind: "canonical", record: { ...record, digest: "sha256:other" } },
  ])("rejects an unproven base record %j", async (read) => {
    mocks.read.mockReturnValue(read);
    await expect(
      resolveCompletedWorkflowBase({ command, record, base_checkout: "/repo/base" }),
    ).rejects.toThrow("exact completed Kernel record");
  });
});

describe("completed review projection owner", () => {
  const task = {
    id: "T-1",
    extensions: {
      task_execution_context: {
        schema_version: 1,
        base_ref: "main",
        base_sha: "a".repeat(40),
        repository_identity: "sha256:" + "b".repeat(64),
      },
    },
  } as Parameters<typeof resolveCompletedReviewOwner>[0]["task"];
  const ownerGetTask = vi.fn().mockResolvedValue(task);
  const owner = {
    resolvedProject: { gitRoot: "/repo/task" },
    taskBackend: { getTask: ownerGetTask },
  } as unknown as CommandContext;
  beforeEach(() => {
    ownerGetTask.mockResolvedValue(task);
    mocks.findWorktree.mockResolvedValue("/repo/base");
    mocks.listWorktrees.mockResolvedValue([{ path: "/repo/base" }, { path: "/repo/task" }]);
    mocks.load.mockImplementation(({ cwd }: { cwd: string }) =>
      Promise.resolve(cwd === "/repo/task" ? owner : target),
    );
  });
  it("requires registered owner/base and exact canonical record", async () => {
    await expect(
      resolveCompletedReviewOwner({ command: target, task, owner_checkout: "/repo/task" }),
    ).resolves.toBe(owner);
  });
  it("rejects a superseded owner review even with the same canonical record", async () => {
    ownerGetTask.mockResolvedValue({
      ...task,
      quality_review: { state: "rework" },
    } as typeof task);
    await expect(
      resolveCompletedReviewOwner({ command: target, task, owner_checkout: "/repo/task" }),
    ).rejects.toThrow("exact completed Kernel record");
  });
  it("rejects missing base registration even when the caller root is process cwd", async () => {
    mocks.findWorktree.mockResolvedValue(null);
    const current = { ...target, resolvedProject: { gitRoot: process.cwd() } } as CommandContext;
    await expect(
      resolveCompletedReviewOwner({ command: current, task, owner_checkout: "/repo/task" }),
    ).rejects.toThrow("registered owner and base");
  });
  it.each(["base", "owner", "repository", "record"])(
    "rejects mismatched %s proof",
    async (kind) => {
      if (kind === "base") mocks.findWorktree.mockResolvedValue("/repo/other");
      if (kind === "owner") mocks.listWorktrees.mockResolvedValue([{ path: "/repo/base" }]);
      if (kind === "repository")
        mocks.common.mockImplementation((c: CommandContext) =>
          Promise.resolve(c === owner ? "/foreign/.git" : "/repo/.git"),
        );
      if (kind === "record")
        mocks.read.mockReturnValueOnce({ kind: "canonical", record }).mockReturnValueOnce({
          kind: "canonical",
          record: { ...record, digest: "sha256:different" },
        });
      await expect(
        resolveCompletedReviewOwner({ command: target, task, owner_checkout: "/repo/task" }),
      ).rejects.toThrow();
    },
  );
});
