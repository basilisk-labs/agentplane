import { beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";

const mocks = vi.hoisted(() => ({
  cmdFinish: vi.fn(),
  runNext: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  cmdCleanupMerged: vi.fn(),
}));

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));

vi.mock("./finish-command.js", () => ({
  cmdFinish: mocks.cmdFinish,
}));

vi.mock("../branch/cleanup-merged.js", () => ({
  cmdCleanupMerged: mocks.cmdCleanupMerged,
}));

vi.mock("../integrate-queue.command.js", () => ({
  makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler: vi.fn(),
  makeRunIntegrateQueueEnqueueHandler: vi.fn(),
  makeRunIntegrateQueueRunNextHandler: () => mocks.runNext,
}));

function preMergeCloseOperation(): Extract<WorkflowOperation, { id: "task.pre_merge_close" }> {
  return {
    id: "task.pre_merge_close",
    type: "task_record_result",
    params: {
      taskId: "202607221852-71SCSW",
      author: "CODER",
      body: "Verified: pre-merge closure packet is ready.",
      result: "pre-merge closure",
      commit: "artifact-head",
      force: false,
    },
    preconditionFingerprint: {
      schema_version: 1,
      kind: "state_fingerprint",
      observed_by: "agentplane",
      task_id: "202607221852-71SCSW",
      task_revision: 1,
      git_head: "artifact-head",
      worktree: "/repo/task",
      components: {},
      digest: "sha256:fingerprint",
    },
    authorityRef: "authority:test",
    idempotencyKey: "task.pre_merge_close:test",
    expectedPostconditions: [],
    triggersGitHooks: true,
  };
}

function routeDecision(operation: WorkflowOperation): TaskRouteDecision {
  return {
    executionPacket: { mustRunFrom: "/repo/task" },
    task: { id: "202607221852-71SCSW" },
    workflowStep: { id: operation.id, kind: "cli_operation", operation },
  } as unknown as TaskRouteDecision;
}

function runNextOperation(): Extract<WorkflowOperation, { id: "integration.run_next" }> {
  return {
    id: "integration.run_next",
    type: "integration_run_next",
    params: { taskId: "202607221852-71SCSW" },
    preconditionFingerprint: preMergeCloseOperation().preconditionFingerprint,
    authorityRef: "route:test",
    idempotencyKey: "integration.run_next:test",
    expectedPostconditions: [],
    triggersGitHooks: false,
  };
}

describe("branch task supervisor operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.loadCommandContext.mockResolvedValue({
      config: { workflow_mode: "branch_pr" },
      resolvedProject: { gitRoot: "/repo" },
    } as CommandContext);
    mocks.loadTaskFromContext.mockResolvedValue({
      execution_route: { selected_mode: "branch_pr" },
    });
    mocks.cmdFinish.mockResolvedValue(0);
    mocks.runNext.mockResolvedValue(0);
    mocks.cmdCleanupMerged.mockResolvedValue(0);
  });

  it("lets finish resolve the reviewed implementation behind a task-artifact head", async () => {
    const operation = preMergeCloseOperation();

    const result = await executeBranchWorkflowOperation({
      decision: routeDecision(operation),
      operation,
    });

    expect(result.status).toBe("succeeded");
    expect(mocks.cmdFinish).toHaveBeenCalledOnce();
    const options = mocks.cmdFinish.mock.calls[0]?.[0] as Record<string, unknown>;
    expect(options).toMatchObject({
      commit: "artifact-head",
      preMergeClosure: true,
      taskIds: ["202607221852-71SCSW"],
    });
    expect(options).not.toHaveProperty("implementationCommit");
  });

  it("runs one hosted foreground queue cycle without repeating local verification", async () => {
    const operation = runNextOperation();

    const result = await executeBranchWorkflowOperation({
      decision: routeDecision(operation),
      operation,
    });

    expect(result.status).toBe("succeeded");
    expect(mocks.runNext).toHaveBeenCalledOnce();
    expect(mocks.runNext.mock.calls[0]?.[1]).toEqual({
      worker: null,
      leaseMs: null,
      pollIntervalMs: null,
      timeoutMs: null,
      runVerify: false,
      dryRun: false,
      quiet: true,
      drain: false,
      wait: true,
      hosted: true,
      stablePolls: null,
      hostedPollIntervalMs: null,
      hostedTimeoutMs: null,
      requiredChecks: [],
    });
  });

  it.each(["protected_base_auto_merge_enabled", "protected_base_github_merge_completed"])(
    "completes the worker cycle for expected provider handoff %s",
    async (reasonCode) => {
      const operation = runNextOperation();
      mocks.runNext.mockRejectedValueOnce(
        new CliError({
          code: "E_HANDOFF",
          message: "provider owns the protected-base completion",
          context: { reason_code: reasonCode },
        }),
      );

      const result = await executeBranchWorkflowOperation({
        decision: routeDecision(operation),
        operation,
      });

      expect(result.status).toBe("succeeded");
      expect(result.exit_code).toBe(0);
      expect(result.detail).toContain("provider handoff remains durable");
    },
  );

  it("does not hide an unrecognized queue handoff", async () => {
    const operation = runNextOperation();
    const handoff = new CliError({ code: "E_HANDOFF", message: "queue reservation lost" });
    mocks.runNext.mockRejectedValueOnce(handoff);

    await expect(
      executeBranchWorkflowOperation({ decision: routeDecision(operation), operation }),
    ).rejects.toBe(handoff);
  });

  it.each(["task.hosted_close.finalize", "task.worktree.cleanup"] as const)(
    "applies deterministic cleanup for %s instead of stopping at a dry-run",
    async (id) => {
      const operation = {
        id,
        type: "cleanup",
        params: { taskId: "202607221852-71SCSW", base: "main" },
        preconditionFingerprint: preMergeCloseOperation().preconditionFingerprint,
        authorityRef: "route:test",
        idempotencyKey: `${id}:test`,
        expectedPostconditions: [],
        triggersGitHooks: false,
      } as WorkflowOperation;

      const result = await executeBranchWorkflowOperation({
        decision: routeDecision(operation),
        operation,
      });

      expect(result.status).toBe("succeeded");
      expect(mocks.cmdCleanupMerged).toHaveBeenCalledWith(
        expect.objectContaining({
          taskIds: ["202607221852-71SCSW"],
          base: "main",
          finalize: true,
          yes: true,
          deleteRemoteBranches: true,
        }),
      );
    },
  );
});
