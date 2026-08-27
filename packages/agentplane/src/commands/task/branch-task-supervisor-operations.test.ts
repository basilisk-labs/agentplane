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
  loadTaskCommandContext: vi.fn(),
  cmdWorkStart: vi.fn(),
  enqueue: vi.fn(),
  cmdCleanupMerged: vi.fn(),
  updateProviderBranch: vi.fn(),
}));

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
}));

vi.mock("../../runtime/task-execution-context/index.js", () => ({
  loadTaskCommandContext: mocks.loadTaskCommandContext,
}));

vi.mock("../branch/work-start.js", () => ({
  cmdWorkStart: mocks.cmdWorkStart,
}));

vi.mock("./finish-command.js", () => ({
  cmdFinish: mocks.cmdFinish,
}));

vi.mock("../branch/cleanup-merged.js", () => ({
  cmdCleanupMerged: mocks.cmdCleanupMerged,
}));

vi.mock("../pr/provider-update-branch.js", () => ({
  updateProviderBranch: mocks.updateProviderBranch,
}));

vi.mock("../integrate-queue.command.js", () => ({
  makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler: vi.fn(),
  makeRunIntegrateQueueEnqueueHandler: () => mocks.enqueue,
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
    workflowMode: "branch_pr",
    workspace: { baseBranch: "main" },
    workflowStep: { id: operation.id, kind: "cli_operation", operation },
  } as unknown as TaskRouteDecision;
}

function worktreePrepareOperation(): Extract<WorkflowOperation, { id: "worktree.prepare" }> {
  return {
    id: "worktree.prepare",
    type: "worktree_prepare",
    params: {
      taskId: "202607221852-71SCSW",
      agent: "CODER",
      slug: "frozen-base",
    },
    preconditionFingerprint: preMergeCloseOperation().preconditionFingerprint,
    authorityRef: "route:test",
    idempotencyKey: "worktree.prepare:test",
    expectedPostconditions: [],
    triggersGitHooks: false,
  };
}

function enqueueOperation(): Extract<WorkflowOperation, { id: "integration.enqueue" }> {
  return {
    id: "integration.enqueue",
    type: "integration_enqueue",
    params: {
      taskId: "202607221852-71SCSW",
      branch: "task/202607221852-71SCSW/frozen-base",
    },
    preconditionFingerprint: preMergeCloseOperation().preconditionFingerprint,
    authorityRef: "route:test",
    idempotencyKey: "integration.enqueue:test",
    expectedPostconditions: [],
    triggersGitHooks: false,
  };
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

function updateBranchOperation(): Extract<WorkflowOperation, { id: "provider.pr.update_branch" }> {
  return {
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params: {
      taskId: "202607221852-71SCSW",
      identity: {
        provider: "github",
        hostname: "github.com",
        remote: "origin",
        sourceProject: "owner/repo",
        targetProject: "owner/repo",
        sourceUrl: "git@github.com:owner/repo.git",
        targetUrl: "https://github.com/owner/repo.git",
      },
      prNumber: 42,
      branch: "task/202607221852-71SCSW/frozen-base",
      baseBranch: "main",
      expectedHeadSha: "b".repeat(40),
      expectedBaseSha: "a".repeat(40),
    },
    preconditionFingerprint: preMergeCloseOperation().preconditionFingerprint,
    authorityRef: "route:test",
    idempotencyKey: "provider.pr.update_branch:test",
    expectedPostconditions: [
      { id: "provider_branch_updated", subject: "provider", expected: "updated" },
      { id: "provider_state_observed", subject: "provider", expected: "observed" },
      { id: "route_state_recomputed", subject: "route", expected: "recomputed" },
    ],
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
    mocks.loadTaskCommandContext.mockResolvedValue({
      command: { resolvedProject: { gitRoot: "/repo" } },
      execution: {
        selected_mode: "branch_pr",
        base_ref: "typescript",
        base_sha: "a".repeat(40),
      },
    });
    mocks.cmdWorkStart.mockResolvedValue(0);
    mocks.enqueue.mockResolvedValue(0);
    mocks.cmdFinish.mockResolvedValue(0);
    mocks.runNext.mockResolvedValue(0);
    mocks.cmdCleanupMerged.mockResolvedValue(0);
    mocks.updateProviderBranch.mockResolvedValue({
      state: "updated",
      effect: "applied",
      observed: {},
      evidence: {
        observedHeadSha: "c".repeat(40),
      },
    });
  });

  it.each([false, true])(
    "executes the exact provider update operation with reconciliation-only mode: %s",
    async (reconcile) => {
      const operation = updateBranchOperation();
      if (reconcile) operation.params.reconcileHeadSha = "c".repeat(40);

      const result = await executeBranchWorkflowOperation({
        decision: routeDecision(operation),
        operation,
      });

      expect(result.status).toBe("succeeded");
      expect(result.observed_postconditions).toContain("provider_branch_updated");
      expect(mocks.updateProviderBranch).toHaveBeenCalledWith({
        gitRoot: "/repo",
        worktreePath: "/repo/task",
        identity: operation.params.identity,
        prNumber: 42,
        branch: operation.params.branch,
        baseBranch: "main",
        expectedHeadSha: "b".repeat(40),
        expectedBaseSha: "a".repeat(40),
        ...(reconcile ? { reconcileHeadSha: "c".repeat(40) } : {}),
      });
    },
  );

  it("requires a distinct supervisor operation after a pre-effect provider failure", async () => {
    const operation = updateBranchOperation();
    mocks.updateProviderBranch.mockResolvedValueOnce({
      state: "not_applied",
      reason: "head_drift",
      detail: "provider head changed",
      observed: null,
    });

    const result = await executeBranchWorkflowOperation({
      decision: routeDecision(operation),
      operation,
    });

    expect(result.status).toBe("failed");
    expect(result.detail).toContain("stopped before a proven effect");
    expect(result.detail).toContain("distinct fresh supervisor operation");
    expect(mocks.updateProviderBranch).toHaveBeenCalledOnce();
  });

  it("stops effect-in-doubt without repeating the provider mutation", async () => {
    const operation = updateBranchOperation();
    mocks.updateProviderBranch.mockResolvedValueOnce({
      state: "effect_in_doubt",
      reason: "readback_unproven",
      detail: "provider ancestry is not yet conclusive",
      observed: null,
    });

    const result = await executeBranchWorkflowOperation({
      decision: routeDecision(operation),
      operation,
    });

    expect(result.status).toBe("failed");
    expect(result.detail).toContain("effect-in-doubt");
    expect(result.detail).toContain("do not repeat the effect blindly");
    expect(mocks.updateProviderBranch).toHaveBeenCalledOnce();
  });

  it("routes worktree creation and integration through the frozen task base", async () => {
    const worktree = worktreePrepareOperation();
    const enqueue = enqueueOperation();

    await expect(
      executeBranchWorkflowOperation({ decision: routeDecision(worktree), operation: worktree }),
    ).resolves.toMatchObject({ status: "succeeded" });
    expect(mocks.cmdWorkStart).toHaveBeenCalledWith(
      expect.objectContaining({ base: "typescript", baseSha: "a".repeat(40) }),
    );

    await expect(
      executeBranchWorkflowOperation({ decision: routeDecision(enqueue), operation: enqueue }),
    ).resolves.toMatchObject({ status: "succeeded" });
    expect(mocks.enqueue).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ base: "typescript" }),
    );
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
