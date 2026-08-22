import type { TaskExecutionContext } from "../task-execution-context/index.js";

export type WorkspaceLease = {
  readonly schema_version: 1;
  readonly task_id: string;
  readonly generation: string;
  readonly owner_pid: number;
  readonly acquired_at: string;
  readonly allocation_identity: `sha256:${string}`;
  readonly workspace_root: string;
  readonly lease_path: string;
};

export type WorkspaceAllocationContext = {
  readonly schema_version: 1;
  readonly task_id: string;
  readonly task_ids: readonly string[];
  readonly allocation_kind: "direct_workspace" | "existing_task_worktree";
  readonly repository_root: string;
  readonly workspace_root: string;
  readonly branch: string;
  readonly base_ref: string;
  readonly base_sha: string;
  readonly identity: `sha256:${string}`;
  readonly execution: TaskExecutionContext;
  readonly lease: WorkspaceLease;
};
