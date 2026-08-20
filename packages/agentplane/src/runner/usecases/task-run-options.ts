import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { TaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import type {
  RunnerDangerFullAccessAuthority,
  RunnerExecutionContract,
  RunnerRecipeContext,
  RunnerTarget,
} from "../types.js";

export type PrepareTaskRunnerExecutionOptions = {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string | null;
  task_id: string;
  mode: RunnerExecutionContract["mode"];
  run_id?: string;
  recipe?: RunnerRecipeContext;
  target?: RunnerTarget;
  danger_authority?: RunnerDangerFullAccessAuthority | null;
  execution_role?: string;
  include_remote?: boolean;
  include_route_runner_state?: boolean;
  sandbox_override?: string;
  effect_source_run_id?: string | null;
  resolved_not_applied_source?: boolean;
  task_execution?: TaskExecutionContext;
};
