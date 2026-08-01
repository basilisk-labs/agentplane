import { taskAddSpec } from "../../../commands/task/add.command.js";
import { taskActiveSpec } from "../../../commands/task/active.command.js";
import { taskAnswerSpec } from "../../../commands/task/answer.command.js";
import { taskAuthorityGrantSpec } from "../../../commands/task/authority-grant.command.js";
import { taskAskSpec } from "../../../commands/task/ask.command.js";
import { taskCloseDuplicateSpec } from "../../../commands/task/close-duplicate.command.js";
import { taskCloseNoopSpec } from "../../../commands/task/close-noop.command.js";
import { taskCommentSpec } from "../../../commands/task/comment.command.js";
import { taskDeriveSpec } from "../../../commands/task/derive.command.js";
import { taskEvidenceCheckSpec } from "../../../commands/task/evidence-check.command.js";
import { taskFindingsAddSpec } from "../../../commands/task/findings-add.command.js";
import { taskFindingsSpec } from "../../../commands/task/findings.command.js";
import {
  taskObservationsAddSpec,
  taskObservationsCheckSpec,
  taskObservationsHarvestSpec,
  taskObservationsListSpec,
  taskObservationsSpec,
  taskObservationsTriageSpec,
} from "../../../commands/task/observations.command.js";
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
import { taskBeginSpec } from "../../../commands/task/begin.command.js";
import { taskBriefSpec } from "../../../commands/task/brief.command.js";
import { taskCompleteSpec } from "../../../commands/task/complete.command.js";
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
import {
  taskRunInspectSpec,
  taskRunLogsSpec,
  taskRunReconcileSpec,
  taskRunResolveEffectSpec,
  taskRunResumeEffectSpec,
  taskRunSpec,
  taskRunStatusSpec,
} from "../../../commands/task/run.command.js";
import { taskRunToolSpec } from "../../../commands/task/run-tool.command.js";
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

import {
  declareCommand,
  declareConditionalSessionCommand,
  declareMultiSessionCommand,
  declareSessionCommand,
  defineCommandSessionSelection,
  type CommandEntry,
} from "./kernel.js";
import {
  TASK_LIFECYCLE_REQUIREMENTS,
  TASK_READ_REQUIREMENTS,
  TASK_ROUTE_LOCAL_REQUIREMENTS,
  TASK_ROUTE_LIFECYCLE_REQUIREMENTS,
  TASK_ROUTE_REQUIREMENTS,
  TASK_WRITE_REQUIREMENTS,
} from "./task-capability-profiles.js";
import { PROVIDER_WRITE_REQUIREMENTS } from "./provider-ops-capability-profiles.js";
import {
  RUNNER_EXECUTION_REQUIREMENTS,
  RUNNER_PREPARATION_REQUIREMENTS,
  RUNNER_READ_REQUIREMENTS,
  RUNNER_WRITE_REQUIREMENTS,
} from "./runner-hermes-capability-profiles.js";
import { NO_CONTEXT_REQUIREMENTS, PROJECT_REQUIREMENTS } from "./project-capability-profiles.js";
import {
  fromCommandsTaskTaskCommand,
  fromCommandsTaskHandoffCommand,
  fromCommandsTaskHandoffRecordCommand,
  fromCommandsTaskFindingsCommand,
  fromCommandsTaskObservationsCommand,
  fromCommandsTaskDocCommand,
  fromCommandsTaskLintCommand,
  fromCommandsTaskMigrateDocCommand,
  fromCommandsTaskVerifyCommand,
  fromCommandsTaskResumeContextCommand,
  fromTaskHandoffShowSpec,
  loadTaskHostedCloseSpec,
  loadTaskHostedClosePrSpec,
  loadTaskActiveSpec,
  loadTaskAnswerSpec,
  loadTaskAuthorityGrantSpec,
  loadTaskAskSpec,
  loadTaskListSpec,
  loadTaskNextSpec,
  loadTaskSearchSpec,
  loadTaskShowSpec,
  loadTaskStatusSpec,
  loadTaskNextActionSpec,
  loadTaskNewSpec,
  loadTaskBeginSpec,
  loadTaskBriefSpec,
  loadTaskRunInspectSpec,
  loadTaskRunLogsSpec,
  loadTaskRunReconcileSpec,
  loadTaskRunResolveEffectSpec,
  loadTaskRunResumeEffectSpec,
  loadTaskRunPreparationSpec,
  loadTaskRunSpec,
  loadTaskRunToolSpec,
  loadTaskRunStatusSpec,
  loadTaskCompleteSpec,
  loadTaskDeriveSpec,
  loadTaskEvidenceCheckSpec,
  loadTaskCloseDuplicateSpec,
  loadTaskStartReadySpec,
  loadTaskCloseNoopSpec,
  loadTaskAddSpec,
  loadTaskUpdateSpec,
  loadTaskCommentSpec,
  loadTaskSetStatusSpec,
  loadTaskFindingsAddSpec,
  loadTaskObservationsAddSpec,
  loadTaskObservationsCheckSpec,
  loadTaskObservationsHarvestSpec,
  loadTaskObservationsListSpec,
  loadTaskObservationsTriageSpec,
  loadTaskDocShowSpec,
  loadTaskDocSetSpec,
  loadTaskScrubSpec,
  loadTaskScaffoldSpec,
  loadTaskNormalizeLifecycleSpec,
  loadTaskNormalizeProviderSpec,
  loadTaskNormalizeWriteSpec,
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
  fromCommandsTaskTaskCommand(taskSpec, "runTask", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsTaskHandoffCommand(taskHandoffSpec, "runTaskHandoff", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskHandoffRecordCommand(taskHandoffRecordSpec, "runTaskHandoffRecord", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromTaskHandoffShowSpec(taskHandoffShowSpec, "runTaskHandoffShow", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskHostedCloseSpec, {
    load: loadTaskHostedCloseSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskHostedClosePrSpec, {
    load: loadTaskHostedClosePrSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskActiveSpec, {
    load: loadTaskActiveSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareSessionCommand(taskAskSpec, {
    load: loadTaskAskSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(taskAnswerSpec, {
    load: loadTaskAnswerSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(taskAuthorityGrantSpec, {
    load: loadTaskAuthorityGrantSpec,
    requirements: TASK_ROUTE_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskListSpec, {
    load: loadTaskListSpec,
    requirements: TASK_READ_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "list"]),
  }),
  declareSessionCommand(taskNextSpec, {
    load: loadTaskNextSpec,
    requirements: TASK_READ_REQUIREMENTS,
  }),
  declareSessionCommand(taskSearchSpec, {
    load: loadTaskSearchSpec,
    requirements: TASK_READ_REQUIREMENTS,
  }),
  declareSessionCommand(taskShowSpec, {
    load: loadTaskShowSpec,
    requirements: TASK_READ_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "show"]),
  }),
  declareSessionCommand(taskStatusSpec, {
    load: loadTaskStatusSpec,
    requirements: TASK_ROUTE_REQUIREMENTS,
  }),
  declareSessionCommand(taskNextActionSpec, {
    load: loadTaskNextActionSpec,
    requirements: TASK_ROUTE_REQUIREMENTS,
  }),
  declareSessionCommand(taskNewSpec, {
    load: loadTaskNewSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "new"]),
  }),
  declareSessionCommand(taskBeginSpec, {
    load: loadTaskBeginSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(taskBriefSpec, {
    load: loadTaskBriefSpec,
    requirements: TASK_ROUTE_REQUIREMENTS,
  }),
  declareSessionCommand(taskRunStatusSpec, {
    load: loadTaskRunStatusSpec,
    requirements: RUNNER_READ_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskRunInspectSpec, {
    load: loadTaskRunInspectSpec,
    requirements: RUNNER_READ_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskRunReconcileSpec, {
    load: loadTaskRunReconcileSpec,
    requirements: RUNNER_WRITE_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskRunResolveEffectSpec, {
    load: loadTaskRunResolveEffectSpec,
    requirements: RUNNER_WRITE_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskRunResumeEffectSpec, {
    load: loadTaskRunResumeEffectSpec,
    requirements: RUNNER_EXECUTION_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskRunLogsSpec, {
    load: loadTaskRunLogsSpec,
    requirements: RUNNER_READ_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareConditionalSessionCommand(taskRunSpec, {
    default: {
      load: loadTaskRunPreparationSpec,
      requirements: RUNNER_PREPARATION_REQUIREMENTS,
    },
    selected: {
      when: (parsed) => !parsed.dryRun,
      load: loadTaskRunSpec,
      requirements: RUNNER_EXECUTION_REQUIREMENTS,
    },
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskRunToolSpec, {
    load: loadTaskRunToolSpec,
    requirements: PROJECT_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskCompleteSpec, {
    load: loadTaskCompleteSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(taskDeriveSpec, {
    load: loadTaskDeriveSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskEvidenceCheckSpec, {
    load: loadTaskEvidenceCheckSpec,
    requirements: TASK_READ_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskCloseDuplicateSpec, {
    load: loadTaskCloseDuplicateSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskStartReadySpec, {
    load: loadTaskStartReadySpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "start-ready"]),
  }),
  declareSessionCommand(taskCloseNoopSpec, {
    load: loadTaskCloseNoopSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskAddSpec, {
    load: loadTaskAddSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskUpdateSpec, {
    load: loadTaskUpdateSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskCommentSpec, {
    load: loadTaskCommentSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(taskSetStatusSpec, {
    load: loadTaskSetStatusSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskFindingsCommand(taskFindingsSpec, "runTaskFindings", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskFindingsAddSpec, {
    load: loadTaskFindingsAddSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskObservationsCommand(taskObservationsSpec, "runTaskObservations", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskObservationsAddSpec, {
    load: loadTaskObservationsAddSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskObservationsListSpec, {
    load: loadTaskObservationsListSpec,
    requirements: TASK_READ_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskObservationsCheckSpec, {
    load: loadTaskObservationsCheckSpec,
    requirements: TASK_READ_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskObservationsTriageSpec, {
    load: loadTaskObservationsTriageSpec,
    requirements: TASK_READ_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskObservationsHarvestSpec, {
    load: loadTaskObservationsHarvestSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskDocCommand(taskDocSpec, "runTaskDoc", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(taskDocShowSpec, {
    load: loadTaskDocShowSpec,
    requirements: TASK_READ_REQUIREMENTS,
  }),
  declareSessionCommand(taskDocSetSpec, {
    load: loadTaskDocSetSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(taskScrubSpec, {
    load: loadTaskScrubSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareSessionCommand(taskScaffoldSpec, {
    load: loadTaskScaffoldSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareMultiSessionCommand(taskNormalizeSpec, {
    default: defineCommandSessionSelection({
      load: loadTaskNormalizeWriteSpec,
      requirements: TASK_WRITE_REQUIREMENTS,
    }),
    variants: [
      {
        when: (parsed) => parsed.syncHostedMerges,
        selection: defineCommandSessionSelection({
          load: loadTaskNormalizeProviderSpec,
          requirements: PROVIDER_WRITE_REQUIREMENTS,
        }),
      },
      {
        when: (parsed) => parsed.syncBranchPrState,
        selection: defineCommandSessionSelection({
          load: loadTaskNormalizeLifecycleSpec,
          requirements: TASK_LIFECYCLE_REQUIREMENTS,
        }),
      },
    ],
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareCommand(taskObsidianSpec, {
    load: loadTaskObsidianSpec,
    requirements: TASK_READ_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareCommand(taskObsidianCleanSpec, {
    load: loadTaskObsidianCleanSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskLintCommand(taskLintSpec, "runTaskLint", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  declareSessionCommand(taskMigrateSpec, {
    load: loadTaskMigrateSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  fromCommandsTaskMigrateDocCommand(taskMigrateDocSpec, "runTaskMigrateDoc", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  fromTaskPlanSpec(taskPlanSpec, "runTaskPlan", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(taskPlanSetSpec, {
    load: loadTaskPlanSetSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "plan", "set"]),
  }),
  declareSessionCommand(taskPlanApproveSpec, {
    load: loadTaskPlanApproveSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "plan", "approve"]),
  }),
  declareSessionCommand(taskPlanRejectSpec, {
    load: loadTaskPlanRejectSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromCommandsTaskVerifyCommand(taskVerifySpec, "runTaskVerify", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(taskVerifyOkSpec, {
    load: loadTaskVerifyOkSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(taskVerifyReworkSpec, {
    load: loadTaskVerifyReworkSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareSessionCommand(taskVerifyShowSpec, {
    load: loadTaskVerifyShowSpec,
    requirements: TASK_READ_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["task", "verify-show"]),
  }),
  declareSessionCommand(taskRebuildIndexSpec, {
    load: loadTaskRebuildIndexSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  fromCommandsTaskResumeContextCommand(taskResumeContextSpec, "runTaskResumeContext", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
  fromTaskReclaimSpec(taskReclaimSpec, "runTaskReclaim", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "advanced",
    helpGroup: "Advanced",
  }),
] as const satisfies readonly CommandEntry[];
