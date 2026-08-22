import type { TaskExecutionRouteMode } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";

export type AuthoritativeTaskSource =
  | "base_checkout"
  | "backend_projection"
  | "task_branch_snapshot"
  | "task_worktree";

export type TaskExecutionRouteSource =
  | "execution_contract"
  | "execution_route"
  | "legacy_migration"
  | "repository_floor";

export type TaskExecutionRequestedMode = TaskExecutionRouteMode | "auto";

export type TaskExecutionContext = {
  readonly schema_version: 1;
  readonly primary_task_id: string;
  readonly task_ids: readonly string[];
  readonly repository_mode: TaskExecutionRouteMode;
  readonly selected_mode: TaskExecutionRouteMode;
  readonly requested_mode: TaskExecutionRequestedMode;
  readonly route_source: TaskExecutionRouteSource;
  readonly reason_codes: readonly string[];
  readonly base_ref: string;
  readonly base_sha: string;
  readonly authoritative_task_source: AuthoritativeTaskSource;
};

export type TaskCommandContext = {
  readonly command: CommandContext;
  readonly execution: TaskExecutionContext;
  readonly primary_task: TaskData;
  readonly tasks: readonly TaskData[];
};
