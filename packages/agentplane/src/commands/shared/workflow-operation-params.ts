import type { TaskRepositoryEffect } from "@agentplaneorg/core/tasks";
import type { ProviderUpdateBranchOperationParams } from "./provider-update-branch-route.js";
import type { BaseSyncParams } from "./workflow-step-branch-base-sync-spec.js";

export type WorkflowOperationParams = {
  "candidate.publish": { taskId: string; requestDigest: string };
  "batch.collect_included": { taskId: string };
  "batch.follow_primary": { taskId: string };
  "batch.reconcile_included": { taskId: string };
  "integration.adopt_legacy_protected_conflict": {
    taskId: string;
    expectedAdoptionToken: string;
  };
  "integration.enqueue": { taskId: string; branch: string };
  "integration.adopted_merge": {
    taskId: string;
    prNumber: number;
    headSha: string;
    baseSha: string;
  };
  "task.adopted.finish": {
    taskId: string;
    prNumber: number;
    headSha: string;
    mergeCommit: string;
    mergedAt: string;
  };
  "integration.run_next": { taskId: string };
  "pr.artifacts.update": { taskId: string; includeTaskIds: readonly string[] };
  "pr.existing.adopt": { taskId: string; requestDigest: string };
  "pr.head.publish": {
    taskId: string;
    author: string;
    includeTaskIds: readonly string[];
  };
  "pr.open": { taskId: string; author: string; includeTaskIds: readonly string[] };
  "pr.sync_or_verify": { taskId: string; includeTaskIds: readonly string[] };
  "provider.pr.refresh": { taskId: string };
  "provider.pr.update_branch": ProviderUpdateBranchOperationParams;
  "flow.repair.foreign_task_readme": { taskId: string };
  "route.remote.refresh": { taskId: string };
  "runner.follow":
    | { mode: "reclaim"; taskId: string; author: string; reason: string }
    | { mode: "status"; taskId: string; runId: string | null }
    | { mode: "run"; taskId: string };
  "task.artifacts.commit": { taskId: string };
  "task.branch.sync_base": BaseSyncParams;
  "task.branch.start": { taskId: string; author: string; body: string };
  "task.hosted_close.open": { taskId: string };
  "task.hosted_close.finalize": { taskId: string; base: string };
  "task.pre_merge_close": {
    taskId: string;
    author: string;
    body: string;
    result: string;
    commit: string;
    force: boolean;
  };
  "task.scope.extend": {
    taskId: string;
    requestDigest: string;
    scopeRoots: readonly string[];
    repositoryEffects: readonly TaskRepositoryEffect[];
  };
  "task.start": { taskId: string; author: string; body: string };
  "task.verify.show": { taskId: string };
  "task.worktree.cleanup": { taskId: string; base: string };
  "worktree.prepare": { taskId: string; agent: string; slug: string };
};
