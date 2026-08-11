import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";

const mocks = vi.hoisted(() => ({
  cmdFinish: vi.fn(),
  runNext: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
}));

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));

vi.mock("./finish-command.js", () => ({
  cmdFinish: mocks.cmdFinish,
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
});
