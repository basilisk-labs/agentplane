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

import { entry, type CommandEntry } from "./shared.js";

export const TASK_COMMANDS = [
  entry(taskSpec, () => import("../../../commands/task/task.command.js").then((m) => m.runTask), {
    needsProject: false,
    needsLoadedConfig: false,
    needsTaskContext: false,
  }),
  entry(
    taskHandoffSpec,
    () => import("../../../commands/task/handoff.command.js").then((m) => m.runTaskHandoff),
    {
      needsProject: false,
      needsLoadedConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(taskHandoffRecordSpec, () =>
    import("../../../commands/task/handoff-record.command.js").then((m) => m.runTaskHandoffRecord),
  ),
  entry(taskHandoffShowSpec, () =>
    import("../../../commands/task/handoff-show.command.js").then((m) => m.runTaskHandoffShow),
  ),
  entry(taskHostedCloseSpec, (deps) =>
    import("../../../commands/task/hosted-close.command.js").then((m) =>
      m.makeRunTaskHostedCloseHandler(deps.getCtx),
    ),
  ),
  entry(taskHostedClosePrSpec, (deps) =>
    import("../../../commands/task/hosted-close-pr.command.js").then((m) =>
      m.makeRunTaskHostedClosePrHandler(deps.getCtx),
    ),
  ),
  entry(
    taskListSpec,
    (deps) =>
      import("../../../commands/task/list.run.js").then((m) =>
        m.makeRunTaskListHandler(deps.getCtx),
      ),
    { invocation: requireCanonicalCommandInvocation(["task", "list"]) },
  ),
  entry(taskNextSpec, (deps) =>
    import("../../../commands/task/next.run.js").then((m) => m.makeRunTaskNextHandler(deps.getCtx)),
  ),
  entry(taskSearchSpec, (deps) =>
    import("../../../commands/task/search.run.js").then((m) =>
      m.makeRunTaskSearchHandler(deps.getCtx),
    ),
  ),
  entry(
    taskShowSpec,
    (deps) =>
      import("../../../commands/task/show.run.js").then((m) =>
        m.makeRunTaskShowHandler(deps.getCtx),
      ),
    { invocation: requireCanonicalCommandInvocation(["task", "show"]) },
  ),
  entry(taskRunShowSpec, () =>
    import("../../../commands/task/run-show.command.js").then((m) => m.runTaskRunShow),
  ),
  entry(taskRunTraceSpec, () =>
    import("../../../commands/task/run-trace.command.js").then((m) => m.runTaskRunTrace),
  ),
  entry(taskRunTailSpec, () =>
    import("../../../commands/task/run-tail.command.js").then((m) => m.runTaskRunTail),
  ),
  entry(taskRunSpec, () =>
    import("../../../commands/task/run.command.js").then((m) => m.runTaskRun),
  ),
  entry(taskRunCancelSpec, () =>
    import("../../../commands/task/run-cancel.command.js").then((m) => m.runTaskRunCancel),
  ),
  entry(taskRunResumeSpec, () =>
    import("../../../commands/task/run-resume.command.js").then((m) => m.runTaskRunResume),
  ),
  entry(taskRunRetrySpec, () =>
    import("../../../commands/task/run-retry.command.js").then((m) => m.runTaskRunRetry),
  ),
  entry(
    taskNewSpec,
    (deps) =>
      import("../../../commands/task/new.command.js").then((m) =>
        m.makeRunTaskNewHandler(deps.getCtx),
      ),
    {
      invocation: requireCanonicalCommandInvocation(["task", "new"]),
    },
  ),
  entry(taskDeriveSpec, (deps) =>
    import("../../../commands/task/derive.command.js").then((m) =>
      m.makeRunTaskDeriveHandler(deps.getCtx),
    ),
  ),
  entry(taskCloseDuplicateSpec, (deps) =>
    import("../../../commands/task/close-duplicate.command.js").then((m) =>
      m.makeRunTaskCloseDuplicateHandler(deps.getCtx),
    ),
  ),
  entry(
    taskStartReadySpec,
    (deps) =>
      import("../../../commands/task/start-ready.command.js").then((m) =>
        m.makeRunTaskStartReadyHandler(deps.getCtx),
      ),
    {
      invocation: requireCanonicalCommandInvocation(["task", "start-ready"]),
    },
  ),
  entry(taskCloseNoopSpec, (deps) =>
    import("../../../commands/task/close-noop.command.js").then((m) =>
      m.makeRunTaskCloseNoopHandler(deps.getCtx),
    ),
  ),
  entry(taskAddSpec, (deps) =>
    import("../../../commands/task/add.command.js").then((m) =>
      m.makeRunTaskAddHandler(deps.getCtx),
    ),
  ),
  entry(taskUpdateSpec, (deps) =>
    import("../../../commands/task/update.command.js").then((m) =>
      m.makeRunTaskUpdateHandler(deps.getCtx),
    ),
  ),
  entry(taskCommentSpec, (deps) =>
    import("../../../commands/task/comment.command.js").then((m) =>
      m.makeRunTaskCommentHandler(deps.getCtx),
    ),
  ),
  entry(taskSetStatusSpec, (deps) =>
    import("../../../commands/task/set-status.command.js").then((m) =>
      m.makeRunTaskSetStatusHandler(deps.getCtx),
    ),
  ),
  entry(
    taskFindingsSpec,
    () => import("../../../commands/task/findings.command.js").then((m) => m.runTaskFindings),
    {
      needsProject: false,
      needsLoadedConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(taskFindingsAddSpec, (deps) =>
    import("../../../commands/task/findings-add.command.js").then((m) =>
      m.makeRunTaskFindingsAddHandler(deps.getCtx),
    ),
  ),
  entry(
    taskDocSpec,
    () => import("../../../commands/task/doc.command.js").then((m) => m.runTaskDoc),
    {
      needsProject: false,
      needsLoadedConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(taskDocShowSpec, (deps) =>
    import("../../../commands/task/doc-show.command.js").then((m) =>
      m.makeRunTaskDocShowHandler(deps.getCtx),
    ),
  ),
  entry(taskDocSetSpec, (deps) =>
    import("../../../commands/task/doc-set.command.js").then((m) =>
      m.makeRunTaskDocSetHandler(deps.getCtx),
    ),
  ),
  entry(taskScrubSpec, (deps) =>
    import("../../../commands/task/scrub.command.js").then((m) =>
      m.makeRunTaskScrubHandler(deps.getCtx),
    ),
  ),
  entry(taskScaffoldSpec, (deps) =>
    import("../../../commands/task/scaffold.command.js").then((m) =>
      m.makeRunTaskScaffoldHandler(deps.getCtx),
    ),
  ),
  entry(taskNormalizeSpec, (deps) =>
    import("../../../commands/task/normalize.command.js").then((m) =>
      m.makeRunTaskNormalizeHandler(deps.getCtx),
    ),
  ),
  entry(taskExportSpec, (deps) =>
    import("../../../commands/task/export.command.js").then((m) =>
      m.makeRunTaskExportHandler(deps.getCtx),
    ),
  ),
  entry(taskLintSpec, () =>
    import("../../../commands/task/lint.command.js").then((m) => m.runTaskLint),
  ),
  entry(taskMigrateSpec, (deps) =>
    import("../../../commands/task/migrate.command.js").then((m) =>
      m.makeRunTaskMigrateHandler(deps.getCtx),
    ),
  ),
  entry(taskMigrateDocSpec, () =>
    import("../../../commands/task/migrate-doc.command.js").then((m) => m.runTaskMigrateDoc),
  ),
  entry(
    taskPlanSpec,
    () => import("../../../commands/task/plan.command.js").then((m) => m.runTaskPlan),
    {
      needsProject: false,
      needsLoadedConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    taskPlanSetSpec,
    (deps) =>
      import("../../../commands/task/plan-set.command.js").then((m) =>
        m.makeRunTaskPlanSetHandler(deps.getCtx),
      ),
    { invocation: requireCanonicalCommandInvocation(["task", "plan", "set"]) },
  ),
  entry(
    taskPlanApproveSpec,
    (deps) =>
      import("../../../commands/task/plan-approve.command.js").then((m) =>
        m.makeRunTaskPlanApproveHandler(deps.getCtx),
      ),
    { invocation: requireCanonicalCommandInvocation(["task", "plan", "approve"]) },
  ),
  entry(taskPlanRejectSpec, (deps) =>
    import("../../../commands/task/plan-reject.command.js").then((m) =>
      m.makeRunTaskPlanRejectHandler(deps.getCtx),
    ),
  ),
  entry(
    taskVerifySpec,
    () => import("../../../commands/task/verify.command.js").then((m) => m.runTaskVerify),
    {
      needsProject: false,
      needsLoadedConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(taskVerifyOkSpec, (deps) =>
    import("../../../commands/task/verify-ok.command.js").then((m) =>
      m.makeRunTaskVerifyOkHandler(deps.getCtx),
    ),
  ),
  entry(taskVerifyReworkSpec, (deps) =>
    import("../../../commands/task/verify-rework.command.js").then((m) =>
      m.makeRunTaskVerifyReworkHandler(deps.getCtx),
    ),
  ),
  entry(
    taskVerifyShowSpec,
    (deps) =>
      import("../../../commands/task/verify-show.command.js").then((m) =>
        m.makeRunTaskVerifyShowHandler(deps.getCtx),
      ),
    { invocation: requireCanonicalCommandInvocation(["task", "verify-show"]) },
  ),
  entry(taskRebuildIndexSpec, (deps) =>
    import("../../../commands/task/rebuild-index.command.js").then((m) =>
      m.makeRunTaskRebuildIndexHandler(deps.getCtx),
    ),
  ),
  entry(taskResumeContextSpec, () =>
    import("../../../commands/task/resume-context.command.js").then((m) => m.runTaskResumeContext),
  ),
  entry(taskReclaimSpec, () =>
    import("../../../commands/task/reclaim.command.js").then((m) => m.runTaskReclaim),
  ),
] as const satisfies readonly CommandEntry[];
