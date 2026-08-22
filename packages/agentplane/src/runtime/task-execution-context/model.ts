import type { TaskExecutionRouteMode } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

export type TaskExecutionRequestedMode = "auto" | TaskExecutionRouteMode;

export type TaskExecutionRouteSource =
  | "execution_contract"
  | "execution_route"
  | "repository_floor"
  | "legacy_migration";

export type AuthoritativeTaskSource =
  | "base_checkout"
  | "task_worktree"
  | "task_branch_snapshot"
  | "backend_projection";

export type TaskExecutionContext = Readonly<{
  schema_version: 1;
  primary_task_id: string;
  task_ids: readonly string[];
  repository_mode: TaskExecutionRouteMode;
  selected_mode: TaskExecutionRouteMode;
  requested_mode: TaskExecutionRequestedMode;
  route_source: TaskExecutionRouteSource;
  reason_codes: readonly string[];
  base_ref: string;
  base_sha: string;
  authoritative_task_source: AuthoritativeTaskSource;
}>;

export type TaskCommandContext = Readonly<{
  command: CommandContext;
  execution: TaskExecutionContext;
  primary_task: TaskData;
  tasks: readonly TaskData[];
}>;
