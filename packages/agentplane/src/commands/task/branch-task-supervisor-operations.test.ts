import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as CoreGit from "@agentplaneorg/core/git";

import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";
import type * as SideEffectAuthority from "../shared/side-effect-authority.js";
import { executeBranchWorkflowOperation } from "./branch-task-supervisor-operations.js";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", { value: <T>(factory: () => T): T => factory() });
}

const mocks = vi.hoisted(() => ({
  retainProof: vi.fn().mockResolvedValue(undefined),
  cmdFinish: vi.fn(),
  runNext: vi.fn(),
  loadCommandContext: vi.fn(),
  loadTaskFromContext: vi.fn(),
  loadBackendTask: vi.fn(),
  loadTaskCommandContext: vi.fn(),
  cmdWorkStart: vi.fn(),
  enqueue: vi.fn(),
  cmdCleanupMerged: vi.fn(),
  updateProviderBranch: vi.fn(),
  synchronizeTaskBranchBase: vi.fn(),
  resolveCanonicalWorktreePreparationRoot: vi.fn(),
  resolveAdoptionControlRoot: vi.fn().mockResolvedValue("/repo"),
  readAdoption: vi.fn().mockResolvedValue(null),
  recordUpdatedHead: vi.fn().mockResolvedValue(undefined),
  freshHostedReadback: vi.fn(),
  evaluateAuthority: vi.fn(),
  readMerged: vi.fn(),
  flowStatus: vi.fn(),
  findWorktree: vi.fn(),
  taskBranch: vi.fn(),
  verification: vi.fn(),
  readiness: vi.fn(),
  identityMatch: vi.fn(),
  runtime: vi.fn(),
  transfer: vi.fn(),
}));

vi.mock("../pr/provider-update-verification-proof.js", () => ({
  retainProviderUpdateVerificationProof: mocks.retainProof,
}));
vi.mock("@agentplaneorg/core/git", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreGit>()),
  findWorktreeForBranch: mocks.findWorktree,
}));

vi.mock("../pr/adoption-store.js", () => ({
  resolveAdoptionControlRoot: mocks.resolveAdoptionControlRoot,
  createExistingPrAdoptionStore: () => ({
    readTask: mocks.readAdoption,
    readMerged: mocks.readMerged,
    recordUpdatedHead: mocks.recordUpdatedHead,
  }),
}));
vi.mock("../pr/flow-status.js", () => ({ resolvePrFlowStatus: mocks.flowStatus }));
vi.mock("../pr/adoption-task-authority.js", () => ({
  assertAdoptedPrMergeReadiness: mocks.readiness,
}));
vi.mock("../pr/adoption-identity.js", () => ({ matchesAdoptedPrObservation: mocks.identityMatch }));
vi.mock("../pr/adoption-verification.js", () => ({
  hasExactAdoptedVerificationRecord: mocks.verification,
}));
vi.mock("./kernel-runtime-context.js", () => ({ createKernelRuntime: mocks.runtime }));
vi.mock("./kernel-controller-handoff.js", () => ({
  transferCanonicalControllerToBase: mocks.transfer,
}));
vi.mock("./kernel-hosted-readback.js", () => ({
  freshHostedPrReadback: () => mocks.freshHostedReadback,
}));

vi.mock("../shared/worktree-topology.js", () => ({
  resolveCanonicalWorktreePreparationRoot: mocks.resolveCanonicalWorktreePreparationRoot,
}));

vi.mock("../shared/task-backend.js", () => ({
  loadCommandContext: mocks.loadCommandContext,
  loadTaskFromContext: mocks.loadTaskFromContext,
  loadBackendTask: mocks.loadBackendTask,
  resolveTaskBranchFromContext: mocks.taskBranch,
}));
vi.mock("../shared/side-effect-authority.js", async (importOriginal) => ({
  ...(await importOriginal<typeof SideEffectAuthority>()),
  evaluateWorkflowOperationAuthority: mocks.evaluateAuthority,
}));
vi.mock("../shared/side-effect-authority-store.js", () => ({
  hydrateTaskSideEffectAuthority: ({ task }: { task: unknown }) => Promise.resolve(task),
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

vi.mock("../branch/sync-task-base.js", () => ({
  synchronizeTaskBranchBase: mocks.synchronizeTaskBranchBase,
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
    workspace: { baseBranch: "typescript", baseCheckoutPath: "/repo/task" },
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

function syncBaseOperation(): Extract<WorkflowOperation, { id: "task.branch.sync_base" }> {
  return {
    id: "task.branch.sync_base",
    type: "task_branch_base_sync",
    params: {
      taskId: "202607221852-71SCSW",
      branch: "task/202607221852-71SCSW/frozen-base",
      baseBranch: "main",
      expectedHeadSha: "b".repeat(40),
      expectedBaseSha: "a".repeat(40),
    },
    preconditionFingerprint: preMergeCloseOperation().preconditionFingerprint,
    authorityRef: "route:test",
    idempotencyKey: "task.branch.sync_base:test",
    expectedPostconditions: [
      { id: "task_branch_contains_base", subject: "task", expected: "contains base" },
      { id: "route_state_recomputed", subject: "route", expected: "recomputed" },
    ],
    triggersGitHooks: true,
  };
}

describe("branch task supervisor operations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.readAdoption.mockResolvedValue(null);
    mocks.loadBackendTask.mockResolvedValue({ task: { extensions: {} } });
    mocks.evaluateAuthority.mockReturnValue({ state: "allowed", authority: { actor: "USER" } });
    mocks.identityMatch.mockReturnValue(true);
    mocks.verification.mockResolvedValue(true);
    mocks.taskBranch.mockResolvedValue("task/T-adopted/controller");
    mocks.findWorktree.mockResolvedValue("/repo/task");
    mocks.freshHostedReadback.mockResolvedValue({ current_head: "c".repeat(40) });
    mocks.loadCommandContext.mockResolvedValue({
      config: {
        workflow_mode: "branch_pr",
        paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
      },
      resolvedProject: { gitRoot: "/repo" },
    } as CommandContext);
    mocks.loadTaskFromContext.mockResolvedValue({
      execution_route: { selected_mode: "branch_pr" },
    });
    mocks.loadTaskCommandContext.mockResolvedValue({
      command: { resolvedProject: { gitRoot: "/repo" } },
      execution: {
        selected_mode: "branch_pr",
        primary_task_id: "202607221852-71SCSW",
        base_ref: "typescript",
        base_sha: "a".repeat(40),
      },
    });
    mocks.cmdWorkStart.mockResolvedValue(0);
    mocks.resolveCanonicalWorktreePreparationRoot.mockResolvedValue("/repo");
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
    mocks.synchronizeTaskBranchBase.mockResolvedValue({
      state: "updated",
      headSha: "c".repeat(40),
    });
  });

  it("executes exact supervisor-owned task branch base synchronization", async () => {
    const operation = syncBaseOperation();
    const result = await executeBranchWorkflowOperation({
      decision: routeDecision(operation),
      operation,
    });

    expect(result).toMatchObject({
      status: "succeeded",
      observed_postconditions: ["task_branch_contains_base"],
    });
    expect(mocks.synchronizeTaskBranchBase).toHaveBeenCalledWith({
      gitRoot: "/repo",
      worktreePath: "/repo/task",
      workflowDir: ".agentplane/tasks",
      tasksPath: ".agentplane/tasks.json",
      taskId: operation.params.taskId,
      branch: operation.params.branch,
      baseBranch: operation.params.baseBranch,
      expectedHeadSha: operation.params.expectedHeadSha,
      expectedBaseSha: operation.params.expectedBaseSha,
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
      expect(mocks.retainProof).toHaveBeenCalledWith(
        expect.objectContaining({
          observed_head_sha: "c".repeat(40),
          completion: {
            status: "succeeded",
            observed_postconditions: result.observed_postconditions,
            exit_code: 0,
          },
        }),
      );
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

  it("records an adopted update only after a second exact provider readback", async () => {
    const operation = updateBranchOperation();
    mocks.readAdoption.mockResolvedValue({
      schema_version: 1,
      task_id: operation.params.taskId,
      provider: "github",
      hostname: "github.com",
      remote: "origin",
      source_project: "owner/repo",
      target_project: "owner/repo",
      pr_number: 42,
      head_ref: operation.params.branch,
      base_ref: "main",
      head_sha: operation.params.expectedHeadSha,
      base_sha: operation.params.expectedBaseSha,
    });
    await expect(
      executeBranchWorkflowOperation({
        decision: routeDecision(operation),
        operation,
      }),
    ).resolves.toMatchObject({ status: "succeeded" });
    expect(mocks.recordUpdatedHead).toHaveBeenCalledWith(
      operation.params.taskId,
      operation.params.expectedHeadSha,
      "c".repeat(40),
    );
    mocks.freshHostedReadback.mockResolvedValueOnce({ current_head: "d".repeat(40) });
    await expect(
      executeBranchWorkflowOperation({
        decision: routeDecision(operation),
        operation,
      }),
    ).rejects.toThrow("changed before durable readback");
    expect(mocks.recordUpdatedHead).toHaveBeenCalledTimes(1);
  });

  it("transfers a provider-merged adopted task to primary and requires DONE readback", async () => {
    const taskId = "T-adopted";
    const headSha = "b".repeat(40);
    const mergeCommit = "d".repeat(40);
    const mergedAt = "2026-10-27T10:00:00Z";
    const operation = {
      ...preMergeCloseOperation(),
      id: "task.adopted.finish",
      type: "task_adopted_finish",
      params: { taskId, prNumber: 42, headSha, mergeCommit, mergedAt },
    } as Extract<WorkflowOperation, { id: "task.adopted.finish" }>;
    const decision = routeDecision(operation);
    decision.workspace.taskWorktreePath = "/repo/task";
    const adoption = { task_id: taskId, pr_number: 42 };
    mocks.readAdoption.mockResolvedValue(adoption);
    mocks.readMerged.mockResolvedValue({ headSha, mergeCommit, mergedAt });
    mocks.flowStatus.mockResolvedValue({
      providerObservation: {
        state: "found",
        pr: { status: "MERGED", headSha, mergeCommit, mergedAt },
      },
    });
    mocks.loadBackendTask.mockResolvedValue({
      task: { id: taskId, status: "DONE", extensions: {} },
    });
    const base = {
      resolvedProject: { gitRoot: "/repo" },
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
    } as CommandContext;
    const source = { ...base, resolvedProject: { gitRoot: "/repo/task" } } as CommandContext;
    mocks.loadCommandContext.mockResolvedValueOnce(base).mockResolvedValueOnce(source);
    mocks.runtime.mockResolvedValue({ adapter: {} });
    const getTask = vi.fn().mockResolvedValue({ status: "DONE" });
    mocks.transfer.mockResolvedValue({ taskBackend: { getTask } });

    await expect(executeBranchWorkflowOperation({ decision, operation })).resolves.toMatchObject({
      status: "succeeded",
    });
    expect(mocks.transfer).toHaveBeenCalledWith(
      expect.objectContaining({
        command: source,
        task_id: taskId,
        base_checkout: "/repo",
      }),
    );
    expect(getTask).toHaveBeenCalledWith(taskId);

    mocks.loadCommandContext.mockResolvedValueOnce(base).mockResolvedValueOnce(source);
    getTask.mockResolvedValueOnce({ status: "DOING" });
    await expect(executeBranchWorkflowOperation({ decision, operation })).rejects.toThrow(
      "not persisted in the base checkout",
    );
  });

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
    expect(mocks.retainProof).not.toHaveBeenCalled();
    expect(result.observed_postconditions).toEqual([]);
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
    expect(mocks.retainProof).not.toHaveBeenCalled();
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
      expect.objectContaining({
        cwd: "/repo",
        base: "typescript",
        baseSha: "a".repeat(40),
      }),
    );
    expect(mocks.resolveCanonicalWorktreePreparationRoot).toHaveBeenCalledWith({
      routedCheckout: "/repo/task",
      registeredBaseCheckout: "/repo/task",
      baseBranch: "typescript",
    });
    expect(mocks.loadCommandContext).toHaveBeenCalledWith({ cwd: "/repo", rootOverride: null });

    await expect(
      executeBranchWorkflowOperation({ decision: routeDecision(enqueue), operation: enqueue }),
    ).resolves.toMatchObject({ status: "succeeded" });
    expect(mocks.enqueue).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ base: "typescript" }),
    );
  });

  it("rejects a mismatched routed task before any worktree mutation", async () => {
    const operation = worktreePrepareOperation();
    const decision = routeDecision(operation);
    decision.task.id = "other-task";
    await expect(executeBranchWorkflowOperation({ decision, operation })).rejects.toMatchObject({
      context: { reason_code: "worktree_preparation_task_base_mismatch" },
    });
    expect(mocks.resolveCanonicalWorktreePreparationRoot).not.toHaveBeenCalled();
    expect(mocks.cmdWorkStart).not.toHaveBeenCalled();
  });

  it("does not report success or create a worktree for foreign topology", async () => {
    const operation = worktreePrepareOperation();
    mocks.resolveCanonicalWorktreePreparationRoot.mockRejectedValueOnce(
      new CliError({
        code: "E_GIT",
        message: "The primary belongs to a foreign repository.",
        context: { reason_code: "worktree_preparation_foreign_repository" },
      }),
    );
    await expect(
      executeBranchWorkflowOperation({ decision: routeDecision(operation), operation }),
    ).rejects.toMatchObject({
      context: { reason_code: "worktree_preparation_foreign_repository" },
    });
    expect(mocks.cmdWorkStart).not.toHaveBeenCalled();
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
