import { taskSupervisorBudgetEpochSpec } from "../../../commands/task/supervisor-budget-epoch.command.js";

import { loadTaskSupervisorBudgetEpochSpec } from "../command-loaders/task.js";
import { declareSessionCommand, type CommandEntry } from "./kernel.js";
import { RUNNER_EXECUTION_REQUIREMENTS } from "./runner-hermes-capability-profiles.js";

export const TASK_SUPERVISOR_COMMANDS = [
  declareSessionCommand(taskSupervisorBudgetEpochSpec, {
    load: loadTaskSupervisorBudgetEpochSpec,
    requirements: RUNNER_EXECUTION_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
] as const satisfies readonly CommandEntry[];
