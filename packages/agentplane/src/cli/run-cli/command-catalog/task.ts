import { taskAddSpec } from "../../../commands/task/add.command.js";
import { taskCloseDuplicateSpec } from "../../../commands/task/close-duplicate.command.js";
import { taskCloseNoopSpec } from "../../../commands/task/close-noop.command.js";
import { taskCommentSpec } from "../../../commands/task/comment.command.js";
import { taskDeriveSpec } from "../../../commands/task/derive.command.js";
import { taskFindingsAddSpec } from "../../../commands/task/findings-add.command.js";
import { taskFindingsSpec } from "../../../commands/task/findings.command.js";
import { taskDocSetSpec } from "../../../commands/task/doc-set.command.js";
import { taskDocShowSpec } from "../../../commands/task/doc-show.command.js";
import { taskDocSpec } from "../../../commands/task/doc.command.js";
import { taskHandoffRecordSpec } from "../../../commands/task/handoff-record.command.js";
import { taskHandoffShowSpec } from "../../../commands/task/handoff-show.command.js";
import { taskHandoffSpec } from "../../../commands/task/handoff.command.js";
import { taskHostedCloseSpec } from "../../../commands/task/hosted-close.spec.js";
import { taskHostedClosePrSpec } from "../../../commands/task/hosted-close-pr.command.js";
import { taskLintSpec } from "../../../commands/task/lint.command.js";
import { taskListSpec } from "../../../commands/task/list.spec.js";
import { taskMigrateDocSpec } from "../../../commands/task/migrate-doc.command.js";
import { taskMigrateSpec } from "../../../commands/task/migrate.command.js";
import { taskNewSpec } from "../../../commands/task/new.spec.js";
import { taskNextSpec } from "../../../commands/task/next.spec.js";
import {
  taskObsidianCleanSpec,
  taskObsidianSpec,
} from "../../../commands/task/obsidian.command.js";
import { taskNormalizeSpec } from "../../../commands/task/normalize.command.js";
import { taskPlanApproveSpec } from "../../../commands/task/plan-approve.command.js";
import { taskPlanRejectSpec } from "../../../commands/task/plan-reject.command.js";
import { taskPlanSetSpec } from "../../../commands/task/plan-set.command.js";
import { taskPlanSpec } from "../../../commands/task/plan.command.js";
import { taskRebuildIndexSpec } from "../../../commands/task/rebuild-index.command.js";
import { taskReclaimSpec } from "../../../commands/task/reclaim.command.js";
import { taskResumeContextSpec } from "../../../commands/task/resume-context.command.js";
import { taskRunSpec } from "../../../commands/task/run.spec.js";
import { taskRunCancelSpec } from "../../../commands/task/run-cancel.spec.js";
import { taskRunResumeSpec } from "../../../commands/task/run-resume.spec.js";
import { taskRunRetrySpec } from "../../../commands/task/run-retry.spec.js";
import { taskRunShowSpec } from "../../../commands/task/run-show.spec.js";
import { taskRunTailSpec } from "../../../commands/task/run-tail.spec.js";
import { taskRunTraceSpec } from "../../../commands/task/run-trace.spec.js";
import { taskScaffoldSpec } from "../../../commands/task/scaffold.command.js";
import { taskScrubSpec } from "../../../commands/task/scrub.command.js";
import { taskSearchSpec } from "../../../commands/task/search.spec.js";
import { taskSetStatusSpec } from "../../../commands/task/set-status.command.js";
import { taskShowSpec } from "../../../commands/task/show.spec.js";
import { taskSpec } from "../../../commands/task/task.command.js";
import { taskStartReadySpec } from "../../../commands/task/start-ready.command.js";
import { taskNextActionSpec } from "../../../commands/task/next-action.command.js";
import { taskStatusSpec } from "../../../commands/task/status.command.js";
import { taskUpdateSpec } from "../../../commands/task/update.command.js";
import { taskVerifyOkSpec } from "../../../commands/task/verify-ok.command.js";
import { taskVerifyReworkSpec } from "../../../commands/task/verify-rework.command.js";
import { taskVerifyShowSpec } from "../../../commands/task/verify-show.command.js";
import { taskVerifySpec } from "../../../commands/task/verify.command.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { declareCommand, type CommandEntry } from "./kernel.js";
import {
  fromCommandsTaskTaskCommand,
  fromCommandsTaskHandoffCommand,
  fromCommandsTaskHandoffRecordCommand,
  fromCommandsTaskRunShowCommand,
  fromCommandsTaskRunTailCommand,
  fromCommandsTaskRunCancelCommand,
  fromCommandsTaskRunRetryCommand,
  fromCommandsTaskFindingsCommand,
  fromCommandsTaskDocCommand,
  fromCommandsTaskLintCommand,
  fromCommandsTaskMigrateDocCommand,
  fromCommandsTaskVerifyCommand,
  fromCommandsTaskResumeContextCommand,
  fromTaskHandoffShowSpec,
  loadTaskHostedCloseSpec,
  loadTaskHostedClosePrSpec,
  loadTaskListSpec,
  loadTaskNextSpec,
  loadTaskSearchSpec,
  loadTaskShowSpec,
  loadTaskStatusSpec,
  loadTaskNextActionSpec,
  fromTaskRunTraceSpec,
  fromTaskRunSpec,
  fromTaskRunResumeSpec,
  loadTaskNewSpec,
  loadTaskDeriveSpec,
  loadTaskCloseDuplicateSpec,
  loadTaskStartReadySpec,
  loadTaskCloseNoopSpec,
  loadTaskAddSpec,
  loadTaskUpdateSpec,
  loadTaskCommentSpec,
  loadTaskSetStatusSpec,
  loadTaskFindingsAddSpec,
  loadTaskDocShowSpec,
  loadTaskDocSetSpec,
  loadTaskScrubSpec,
  loadTaskScaffoldSpec,
  loadTaskNormalizeSpec,
  loadTaskObsidianCleanSpec,
  loadTaskObsidianSpec,
  loadTaskMigrateSpec,
  fromTaskPlanSpec,
  loadTaskPlanSetSpec,
  loadTaskPlanApproveSpec,
  loadTaskPlanRejectSpec,
  loadTaskVerifyOkSpec,
  loadTaskVerifyReworkSpec,
  loadTaskVerifyShowSpec,
  loadTaskRebuildIndexSpec,
  fromTaskReclaimSpec,
} from "../command-loaders/task.js";

export const TASK_COMMANDS = [
  fromCommandsTaskTaskCommand(taskSpec, "runTask", { needs: "none" }),
  fromCommandsTaskHandoffCommand(taskHandoffSpec, "runTaskHandoff", {
    needs: "none",
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskHandoffRecordCommand(taskHandoffRecordSpec, "runTaskHandoffRecord", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromTaskHandoffShowSpec(taskHandoffShowSpec, "runTaskHandoffShow", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskHostedCloseSpec, {
    load: loadTaskHostedCloseSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskHostedClosePrSpec, {
    load: loadTaskHostedClosePrSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskListSpec, {
    load: loadTaskListSpec,
    invocation: requireCanonicalCommandInvocation(["task", "list"]),
  }),
  declareCommand(taskNextSpec, { load: loadTaskNextSpec }),
  declareCommand(taskSearchSpec, { load: loadTaskSearchSpec }),
  declareCommand(taskShowSpec, {
    load: loadTaskShowSpec,
    invocation: requireCanonicalCommandInvocation(["task", "show"]),
  }),
  declareCommand(taskStatusSpec, { load: loadTaskStatusSpec }),
  declareCommand(taskNextActionSpec, { load: loadTaskNextActionSpec }),
  fromCommandsTaskRunShowCommand(taskRunShowSpec, "runTaskRunShow", {}),
  fromTaskRunTraceSpec(taskRunTraceSpec, "runTaskRunTrace", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskRunTailCommand(taskRunTailSpec, "runTaskRunTail", {}),
  fromTaskRunSpec(taskRunSpec, "runTaskRun"),
  fromCommandsTaskRunCancelCommand(taskRunCancelSpec, "runTaskRunCancel", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromTaskRunResumeSpec(taskRunResumeSpec, "runTaskRunResume", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskRunRetryCommand(taskRunRetrySpec, "runTaskRunRetry", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskNewSpec, {
    load: loadTaskNewSpec,
    invocation: requireCanonicalCommandInvocation(["task", "new"]),
  }),
  declareCommand(taskDeriveSpec, {
    load: loadTaskDeriveSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskCloseDuplicateSpec, {
    load: loadTaskCloseDuplicateSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskStartReadySpec, {
    load: loadTaskStartReadySpec,
    invocation: requireCanonicalCommandInvocation(["task", "start-ready"]),
  }),
  declareCommand(taskCloseNoopSpec, {
    load: loadTaskCloseNoopSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskAddSpec, {
    load: loadTaskAddSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskUpdateSpec, {
    load: loadTaskUpdateSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskCommentSpec, { load: loadTaskCommentSpec }),
  declareCommand(taskSetStatusSpec, {
    load: loadTaskSetStatusSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskFindingsCommand(taskFindingsSpec, "runTaskFindings", {
    needs: "none",
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskFindingsAddSpec, {
    load: loadTaskFindingsAddSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskDocCommand(taskDocSpec, "runTaskDoc", { needs: "none" }),
  declareCommand(taskDocShowSpec, { load: loadTaskDocShowSpec }),
  declareCommand(taskDocSetSpec, { load: loadTaskDocSetSpec }),
  declareCommand(taskScrubSpec, {
    load: loadTaskScrubSpec,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareCommand(taskScaffoldSpec, {
    load: loadTaskScaffoldSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskNormalizeSpec, {
    load: loadTaskNormalizeSpec,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareCommand(taskObsidianSpec, {
    load: loadTaskObsidianSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskObsidianCleanSpec, {
    load: loadTaskObsidianCleanSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskLintCommand(taskLintSpec, "runTaskLint", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskMigrateSpec, {
    load: loadTaskMigrateSpec,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  fromCommandsTaskMigrateDocCommand(taskMigrateDocSpec, "runTaskMigrateDoc", {
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  fromTaskPlanSpec(taskPlanSpec, "runTaskPlan", { needs: "none" }),
  declareCommand(taskPlanSetSpec, {
    load: loadTaskPlanSetSpec,
    invocation: requireCanonicalCommandInvocation(["task", "plan", "set"]),
  }),
  declareCommand(taskPlanApproveSpec, {
    load: loadTaskPlanApproveSpec,
    invocation: requireCanonicalCommandInvocation(["task", "plan", "approve"]),
  }),
  declareCommand(taskPlanRejectSpec, {
    load: loadTaskPlanRejectSpec,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskVerifyCommand(taskVerifySpec, "runTaskVerify", { needs: "none" }),
  declareCommand(taskVerifyOkSpec, { load: loadTaskVerifyOkSpec }),
  declareCommand(taskVerifyReworkSpec, { load: loadTaskVerifyReworkSpec }),
  declareCommand(taskVerifyShowSpec, {
    load: loadTaskVerifyShowSpec,
    invocation: requireCanonicalCommandInvocation(["task", "verify-show"]),
  }),
  declareCommand(taskRebuildIndexSpec, {
    load: loadTaskRebuildIndexSpec,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  fromCommandsTaskResumeContextCommand(taskResumeContextSpec, "runTaskResumeContext", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromTaskReclaimSpec(taskReclaimSpec, "runTaskReclaim", {
    surface: "advanced",
    helpGroup: "Advanced",
  }),
] as const satisfies readonly CommandEntry[];
