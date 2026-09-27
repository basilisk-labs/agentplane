import { taskScopeExtendSpec } from "../../../commands/task/scope-extend.command.js";
import { taskWorkItemResumeSpec } from "../../../commands/task/kernel-work-item-resume.command.js";
import { loadTaskScopeExtendSpec, loadTaskWorkItemResumeSpec } from "../command-loaders/task.js";
import { declareSessionCommand, type CommandEntry } from "./kernel.js";
import { TASK_LIFECYCLE_REQUIREMENTS } from "./task-capability-profiles.js";

export const TASK_RECOVERY_COMMANDS = [
  declareSessionCommand(taskScopeExtendSpec, {
    load: loadTaskScopeExtendSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskWorkItemResumeSpec, {
    load: loadTaskWorkItemResumeSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
] as const satisfies readonly CommandEntry[];
