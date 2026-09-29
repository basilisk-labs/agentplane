import { beforeEach, describe, expect, it, vi } from "vitest";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";

const mocks = vi.hoisted(() => ({
  supervise: vi.fn(),
}));

vi.mock("../shared/supervisor-execution-episode.js", () => ({
  supervisePersistedWorkflowEpisode: mocks.supervise,
}));

import {
  branchAuthorityCheckout,
  executeAdmittedBranchWorkflowOperation,
} from "./branch-task-supervisor-operations.js";

const operation = {
  id: "pr.open",
  type: "pr_sync",
  params: { taskId: "T-1", author: "CODER", includeTaskIds: [] },
  preconditionFingerprint: { digest: "sha256:route" },
  authorityRef: "authority:user",
  idempotencyKey: "pr.open:T-1:sha256:route",
  expectedPostconditions: [],
  triggersGitHooks: true,
} as unknown as WorkflowOperation;

function decision(baseCheckoutPath = "/repo/base"): TaskRouteDecision {
  return {
    task: { id: "T-1" },
    workflowMode: "branch_pr",
    workspace: {
      baseCheckoutPath,
      taskWorktreePath: "/repo/task",
      baseBranch: "main",
    },
    workflowStep: {
      id: operation.id,
      kind: "cli_operation",
      operation,
    },
  } as unknown as TaskRouteDecision;
}

describe("0.7.11 branch publication coordinator parity", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("binds publication authority to the authoritative base checkout", () => {
    expect(branchAuthorityCheckout(decision())).toBe("/repo/base");
    expect(() => branchAuthorityCheckout(decision(""))).toThrow(
      /task-worktree configuration cannot authorize provider publication/u,
    );
    expect(() => branchAuthorityCheckout(decision("/repo/task"))).toThrow(
      /task-worktree configuration cannot authorize provider publication/u,
    );
  });

  it("delegates the exact operation key to the common durable admission boundary", async () => {
    const before = decision();
    const after = { ...before, workflowStep: { id: "task.done", kind: "terminal" } } as never;
    const execute = vi.fn().mockResolvedValue({
      status: "succeeded",
      observed_postconditions: [],
      detail: "opened PR",
    });
    mocks.supervise.mockImplementationOnce(
      async (opts: {
        decision: TaskRouteDecision;
        execute: (input: { operation: WorkflowOperation }) => Promise<unknown>;
      }) => {
        expect(opts.decision.workflowStep).toMatchObject({
          kind: "cli_operation",
          operation: { idempotencyKey: operation.idempotencyKey },
        });
        const result = await opts.execute({ operation });
        return {
          journal: { digest: "sha256:journal" },
          execution: {
            executable: true,
            result,
            stop_reason: null,
            refreshed_decision: after,
          },
        };
      },
    );

    await executeAdmittedBranchWorkflowOperation({
      decision: before,
      git_root: "/repo/base",
      execute,
      refresh: () => Promise.resolve(after),
    });

    expect(mocks.supervise).toHaveBeenCalledOnce();
    expect(execute).toHaveBeenCalledOnce();
    expect(execute).toHaveBeenCalledWith(operation);
  });

  it("does not repeat publication when durable admission reports a replay", async () => {
    const before = decision();
    const execute = vi.fn();
    mocks.supervise.mockResolvedValue({
      journal: { digest: "sha256:completed" },
      execution: {
        executable: false,
        result: null,
        stop_reason: "operation already completed",
        refreshed_decision: before,
      },
    });

    await executeAdmittedBranchWorkflowOperation({
      decision: before,
      git_root: "/repo/base",
      execute,
      refresh: () => Promise.resolve(before),
    });

    expect(execute).not.toHaveBeenCalled();
  });
});
