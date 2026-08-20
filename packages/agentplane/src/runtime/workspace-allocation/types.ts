import type { TaskExecutionContext } from "../task-execution-context/index.js";

export type WorkspaceLease = Readonly<{
  schema_version: 1;
  task_id: string;
  generation: string;
  owner_pid: number;
  acquired_at: string;
  allocation_identity: `sha256:${string}`;
  workspace_root: string;
  lease_path: string;
}>;

export type WorkspaceAllocationContext = Readonly<{
  schema_version: 1;
  task_id: string;
  task_ids: readonly string[];
  allocation_kind: "direct_workspace" | "existing_task_worktree";
  repository_root: string;
  workspace_root: string;
  branch: string;
  base_ref: string;
  base_sha: string;
  identity: `sha256:${string}`;
  execution: TaskExecutionContext;
  lease: WorkspaceLease;
}>;
