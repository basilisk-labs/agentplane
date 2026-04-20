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
import { taskExportSpec } from "../../../commands/task/export.command.js";
import { taskHandoffRecordSpec } from "../../../commands/task/handoff-record.command.js";
import { taskHandoffShowSpec } from "../../../commands/task/handoff-show.command.js";
import { taskHandoffSpec } from "../../../commands/task/handoff.command.js";
import { taskHostedCloseSpec } from "../../../commands/task/hosted-close.command.js";
import { taskHostedClosePrSpec } from "../../../commands/task/hosted-close-pr.command.js";
import { taskLintSpec } from "../../../commands/task/lint.command.js";
import { taskListSpec } from "../../../commands/task/list.spec.js";
import { taskMigrateDocSpec } from "../../../commands/task/migrate-doc.command.js";
import { taskMigrateSpec } from "../../../commands/task/migrate.command.js";
import { taskNewSpec } from "../../../commands/task/new.spec.js";
import { taskNextSpec } from "../../../commands/task/next.spec.js";
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
import { taskUpdateSpec } from "../../../commands/task/update.command.js";
import { taskVerifyOkSpec } from "../../../commands/task/verify-ok.command.js";
import { taskVerifyReworkSpec } from "../../../commands/task/verify-rework.command.js";
import { taskVerifyShowSpec } from "../../../commands/task/verify-show.command.js";
import { taskVerifySpec } from "../../../commands/task/verify.command.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { commandModule, declareCommand, type CommandEntry } from "./shared.js";

const fromCommandsTaskTaskCommand = commandModule(
  () => import("../../../commands/task/task.command.js"),
);
const fromCommandsTaskHandoffCommand = commandModule(
  () => import("../../../commands/task/handoff.command.js"),
);
const fromCommandsTaskHandoffRecordCommand = commandModule(
  () => import("../../../commands/task/handoff-record.command.js"),
);
const fromCommandsTaskRunShowCommand = commandModule(
  () => import("../../../commands/task/run-show.command.js"),
);
const fromCommandsTaskRunTailCommand = commandModule(
  () => import("../../../commands/task/run-tail.command.js"),
);
const fromCommandsTaskRunCancelCommand = commandModule(
  () => import("../../../commands/task/run-cancel.command.js"),
);
const fromCommandsTaskRunRetryCommand = commandModule(
  () => import("../../../commands/task/run-retry.command.js"),
);
const fromCommandsTaskFindingsCommand = commandModule(
  () => import("../../../commands/task/findings.command.js"),
);
const fromCommandsTaskDocCommand = commandModule(
  () => import("../../../commands/task/doc.command.js"),
);
const fromCommandsTaskLintCommand = commandModule(
  () => import("../../../commands/task/lint.command.js"),
);
const fromCommandsTaskMigrateDocCommand = commandModule(
  () => import("../../../commands/task/migrate-doc.command.js"),
);
const fromCommandsTaskVerifyCommand = commandModule(
  () => import("../../../commands/task/verify.command.js"),
);
const fromCommandsTaskResumeContextCommand = commandModule(
  () => import("../../../commands/task/resume-context.command.js"),
);

export const TASK_COMMANDS = [
  fromCommandsTaskTaskCommand(taskSpec, "runTask", { needs: "none" }),
  fromCommandsTaskHandoffCommand(taskHandoffSpec, "runTaskHandoff", { needs: "none" }),
  fromCommandsTaskHandoffRecordCommand(taskHandoffRecordSpec, "runTaskHandoffRecord", {}),
  declareCommand(taskHandoffShowSpec, {
    module: () => import("../../../commands/task/handoff-show.command.js"),
    runExport: "runTaskHandoffShow",
  }),
  declareCommand(taskHostedCloseSpec, {
    load: (deps) =>
      import("../../../commands/task/hosted-close.command.js").then((m) =>
        m.makeRunTaskHostedCloseHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskHostedClosePrSpec, {
    load: (deps) =>
      import("../../../commands/task/hosted-close-pr.command.js").then((m) =>
        m.makeRunTaskHostedClosePrHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskListSpec, {
    load: (deps) =>
      import("../../../commands/task/list.run.js").then((m) =>
        m.makeRunTaskListHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "list"]),
  }),
  declareCommand(taskNextSpec, {
    load: (deps) =>
      import("../../../commands/task/next.run.js").then((m) =>
        m.makeRunTaskNextHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskSearchSpec, {
    load: (deps) =>
      import("../../../commands/task/search.run.js").then((m) =>
        m.makeRunTaskSearchHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskShowSpec, {
    load: (deps) =>
      import("../../../commands/task/show.run.js").then((m) =>
        m.makeRunTaskShowHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "show"]),
  }),
  fromCommandsTaskRunShowCommand(taskRunShowSpec, "runTaskRunShow", {}),
  declareCommand(taskRunTraceSpec, {
    module: () => import("../../../commands/task/run-trace.command.js"),
    runExport: "runTaskRunTrace",
  }),
  fromCommandsTaskRunTailCommand(taskRunTailSpec, "runTaskRunTail", {}),
  declareCommand(taskRunSpec, {
    module: () => import("../../../commands/task/run.command.js"),
    runExport: "runTaskRun",
  }),
  fromCommandsTaskRunCancelCommand(taskRunCancelSpec, "runTaskRunCancel", {}),
  declareCommand(taskRunResumeSpec, {
    module: () => import("../../../commands/task/run-resume.command.js"),
    runExport: "runTaskRunResume",
  }),
  fromCommandsTaskRunRetryCommand(taskRunRetrySpec, "runTaskRunRetry", {}),
  declareCommand(taskNewSpec, {
    load: (deps) =>
      import("../../../commands/task/new.command.js").then((m) =>
        m.makeRunTaskNewHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "new"]),
  }),
  declareCommand(taskDeriveSpec, {
    load: (deps) =>
      import("../../../commands/task/derive.command.js").then((m) =>
        m.makeRunTaskDeriveHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskCloseDuplicateSpec, {
    load: (deps) =>
      import("../../../commands/task/close-duplicate.command.js").then((m) =>
        m.makeRunTaskCloseDuplicateHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskStartReadySpec, {
    load: (deps) =>
      import("../../../commands/task/start-ready.command.js").then((m) =>
        m.makeRunTaskStartReadyHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "start-ready"]),
  }),
  declareCommand(taskCloseNoopSpec, {
    load: (deps) =>
      import("../../../commands/task/close-noop.command.js").then((m) =>
        m.makeRunTaskCloseNoopHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskAddSpec, {
    load: (deps) =>
      import("../../../commands/task/add.command.js").then((m) =>
        m.makeRunTaskAddHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskUpdateSpec, {
    load: (deps) =>
      import("../../../commands/task/update.command.js").then((m) =>
        m.makeRunTaskUpdateHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskCommentSpec, {
    load: (deps) =>
      import("../../../commands/task/comment.command.js").then((m) =>
        m.makeRunTaskCommentHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskSetStatusSpec, {
    load: (deps) =>
      import("../../../commands/task/set-status.command.js").then((m) =>
        m.makeRunTaskSetStatusHandler(deps.getCtx),
      ),
  }),
  fromCommandsTaskFindingsCommand(taskFindingsSpec, "runTaskFindings", { needs: "none" }),
  declareCommand(taskFindingsAddSpec, {
    load: (deps) =>
      import("../../../commands/task/findings-add.command.js").then((m) =>
        m.makeRunTaskFindingsAddHandler(deps.getCtx),
      ),
  }),
  fromCommandsTaskDocCommand(taskDocSpec, "runTaskDoc", { needs: "none" }),
  declareCommand(taskDocShowSpec, {
    load: (deps) =>
      import("../../../commands/task/doc-show.command.js").then((m) =>
        m.makeRunTaskDocShowHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskDocSetSpec, {
    load: (deps) =>
      import("../../../commands/task/doc-set.command.js").then((m) =>
        m.makeRunTaskDocSetHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskScrubSpec, {
    load: (deps) =>
      import("../../../commands/task/scrub.command.js").then((m) =>
        m.makeRunTaskScrubHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskScaffoldSpec, {
    load: (deps) =>
      import("../../../commands/task/scaffold.command.js").then((m) =>
        m.makeRunTaskScaffoldHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskNormalizeSpec, {
    load: (deps) =>
      import("../../../commands/task/normalize.command.js").then((m) =>
        m.makeRunTaskNormalizeHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskExportSpec, {
    load: (deps) =>
      import("../../../commands/task/export.command.js").then((m) =>
        m.makeRunTaskExportHandler(deps.getCtx),
      ),
  }),
  fromCommandsTaskLintCommand(taskLintSpec, "runTaskLint", {}),
  declareCommand(taskMigrateSpec, {
    load: (deps) =>
      import("../../../commands/task/migrate.command.js").then((m) =>
        m.makeRunTaskMigrateHandler(deps.getCtx),
      ),
  }),
  fromCommandsTaskMigrateDocCommand(taskMigrateDocSpec, "runTaskMigrateDoc", {}),
  declareCommand(taskPlanSpec, {
    module: () => import("../../../commands/task/plan.command.js"),
    runExport: "runTaskPlan",
    needs: "none",
  }),
  declareCommand(taskPlanSetSpec, {
    load: (deps) =>
      import("../../../commands/task/plan-set.command.js").then((m) =>
        m.makeRunTaskPlanSetHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "plan", "set"]),
  }),
  declareCommand(taskPlanApproveSpec, {
    load: (deps) =>
      import("../../../commands/task/plan-approve.command.js").then((m) =>
        m.makeRunTaskPlanApproveHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "plan", "approve"]),
  }),
  declareCommand(taskPlanRejectSpec, {
    load: (deps) =>
      import("../../../commands/task/plan-reject.command.js").then((m) =>
        m.makeRunTaskPlanRejectHandler(deps.getCtx),
      ),
  }),
  fromCommandsTaskVerifyCommand(taskVerifySpec, "runTaskVerify", { needs: "none" }),
  declareCommand(taskVerifyOkSpec, {
    load: (deps) =>
      import("../../../commands/task/verify-ok.command.js").then((m) =>
        m.makeRunTaskVerifyOkHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskVerifyReworkSpec, {
    load: (deps) =>
      import("../../../commands/task/verify-rework.command.js").then((m) =>
        m.makeRunTaskVerifyReworkHandler(deps.getCtx),
      ),
  }),
  declareCommand(taskVerifyShowSpec, {
    load: (deps) =>
      import("../../../commands/task/verify-show.command.js").then((m) =>
        m.makeRunTaskVerifyShowHandler(deps.getCtx),
      ),
    invocation: requireCanonicalCommandInvocation(["task", "verify-show"]),
  }),
  declareCommand(taskRebuildIndexSpec, {
    load: (deps) =>
      import("../../../commands/task/rebuild-index.command.js").then((m) =>
        m.makeRunTaskRebuildIndexHandler(deps.getCtx),
      ),
  }),
  fromCommandsTaskResumeContextCommand(taskResumeContextSpec, "runTaskResumeContext", {}),
  declareCommand(taskReclaimSpec, {
    module: () => import("../../../commands/task/reclaim.command.js"),
    runExport: "runTaskReclaim",
  }),
] as const satisfies readonly CommandEntry[];
