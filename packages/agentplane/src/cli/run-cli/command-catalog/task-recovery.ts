import { taskScopeApproveRequestSpec } from "../../../commands/task/scope-approve-request.command.js";
import { taskFinalTimingExceptionSpec } from "../../../commands/task/final-timing-exception.command.js";
import { taskWorkItemRestoreCompletionSpec } from "../../../commands/task/kernel-work-item-restore-completion.command.js";
import {
  loadTaskScopeApproveRequestSpec,
  loadTaskFinalTimingExceptionSpec,
  loadTaskScopeExtendSpec,
  loadTaskWorkItemResumeSpec,
  loadTaskWorkItemRestoreCompletionSpec,
} from "../command-loaders/task.js";
import { taskScopeExtendSpec } from "../../../commands/task/scope-extend.command.js";
import { taskWorkItemResumeSpec } from "../../../commands/task/kernel-work-item-resume.command.js";
import { declareSessionCommand, type CommandEntry } from "./kernel.js";
import { TASK_LIFECYCLE_REQUIREMENTS } from "./task-capability-profiles.js";

export const TASK_RECOVERY_COMMANDS = [
  declareSessionCommand(taskFinalTimingExceptionSpec, {
    load: loadTaskFinalTimingExceptionSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskWorkItemRestoreCompletionSpec, {
    load: loadTaskWorkItemRestoreCompletionSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskScopeApproveRequestSpec, {
    load: loadTaskScopeApproveRequestSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
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
