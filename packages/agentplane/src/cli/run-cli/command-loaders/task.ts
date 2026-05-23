import { commandModule, type RunDeps } from "../command-catalog/kernel.js";

export const fromCommandsTaskTaskCommand = commandModule(
  () => import("../../../commands/task/task.command.js"),
);
export const fromCommandsTaskHandoffCommand = commandModule(
  () => import("../../../commands/task/handoff.command.js"),
);
export const fromCommandsTaskHandoffRecordCommand = commandModule(
  () => import("../../../commands/task/handoff-record.command.js"),
);
export const fromCommandsTaskFindingsCommand = commandModule(
  () => import("../../../commands/task/findings.command.js"),
);
export const fromCommandsTaskObservationsCommand = commandModule(
  () => import("../../../commands/task/observations.command.js"),
);
export const fromCommandsTaskDocCommand = commandModule(
  () => import("../../../commands/task/doc.command.js"),
);
export const fromCommandsTaskLintCommand = commandModule(
  () => import("../../../commands/task/lint.command.js"),
);
export const fromCommandsTaskMigrateDocCommand = commandModule(
  () => import("../../../commands/task/migrate-doc.command.js"),
);
export const fromCommandsTaskVerifyCommand = commandModule(
  () => import("../../../commands/task/verify.command.js"),
);
export const fromCommandsTaskResumeContextCommand = commandModule(
  () => import("../../../commands/task/resume-context.command.js"),
);
export const fromTaskHandoffShowSpec = commandModule(
  () => import("../../../commands/task/handoff-show.command.js"),
);
export const loadTaskHostedCloseSpec = (deps: RunDeps) =>
  import("../../../commands/task/hosted-close.command.js").then((m) =>
    m.makeRunTaskHostedCloseHandler(deps.getCtx),
  );
export const loadTaskHostedClosePrSpec = (deps: RunDeps) =>
  import("../../../commands/task/hosted-close-pr.command.js").then((m) =>
    m.makeRunTaskHostedClosePrHandler(deps.getCtx),
  );
export const loadTaskListSpec = (deps: RunDeps) =>
  import("../../../commands/task/list.run.js").then((m) => m.makeRunTaskListHandler(deps.getCtx));
export const loadTaskNextSpec = (deps: RunDeps) =>
  import("../../../commands/task/next.run.js").then((m) => m.makeRunTaskNextHandler(deps.getCtx));
export const loadTaskSearchSpec = (deps: RunDeps) =>
  import("../../../commands/task/search.run.js").then((m) =>
    m.makeRunTaskSearchHandler(deps.getCtx),
  );
export const loadTaskShowSpec = (deps: RunDeps) =>
  import("../../../commands/task/show.run.js").then((m) => m.makeRunTaskShowHandler(deps.getCtx));
export const loadTaskStatusSpec = (deps: RunDeps) =>
  import("../../../commands/task/status.command.js").then((m) =>
    m.makeRunTaskStatusHandler(deps.getCtx),
  );
export const loadTaskNextActionSpec = (deps: RunDeps) =>
  import("../../../commands/task/next-action.command.js").then((m) =>
    m.makeRunTaskNextActionHandler(deps.getCtx),
  );
export const loadTaskNewSpec = (deps: RunDeps) =>
  import("../../../commands/task/new.command.js").then((m) => m.makeRunTaskNewHandler(deps.getCtx));
export const loadTaskBeginSpec = (deps: RunDeps) =>
  import("../../../commands/task/begin.command.js").then((m) =>
    m.makeRunTaskBeginHandler(deps.getCtx),
  );
export const loadTaskBriefSpec = (deps: RunDeps) =>
  import("../../../commands/task/brief.command.js").then((m) =>
    m.makeRunTaskBriefHandler(deps.getCtx),
  );
export const loadTaskCompleteSpec = (deps: RunDeps) =>
  import("../../../commands/task/complete.command.js").then((m) =>
    m.makeRunTaskCompleteHandler(deps.getCtx),
  );
export const loadTaskDeriveSpec = (deps: RunDeps) =>
  import("../../../commands/task/derive.command.js").then((m) =>
    m.makeRunTaskDeriveHandler(deps.getCtx),
  );
export const loadTaskEvidenceCheckSpec = (deps: RunDeps) =>
  import("../../../commands/task/evidence-check.command.js").then((m) =>
    m.makeRunTaskEvidenceCheckHandler(deps.getCtx),
  );
export const loadTaskCloseDuplicateSpec = (deps: RunDeps) =>
  import("../../../commands/task/close-duplicate.command.js").then((m) =>
    m.makeRunTaskCloseDuplicateHandler(deps.getCtx),
  );
export const loadTaskStartReadySpec = (deps: RunDeps) =>
  import("../../../commands/task/start-ready.command.js").then((m) =>
    m.makeRunTaskStartReadyHandler(deps.getCtx),
  );
export const loadTaskCloseNoopSpec = (deps: RunDeps) =>
  import("../../../commands/task/close-noop.command.js").then((m) =>
    m.makeRunTaskCloseNoopHandler(deps.getCtx),
  );
export const loadTaskAddSpec = (deps: RunDeps) =>
  import("../../../commands/task/add.command.js").then((m) => m.makeRunTaskAddHandler(deps.getCtx));
export const loadTaskUpdateSpec = (deps: RunDeps) =>
  import("../../../commands/task/update.command.js").then((m) =>
    m.makeRunTaskUpdateHandler(deps.getCtx),
  );
export const loadTaskCommentSpec = (deps: RunDeps) =>
  import("../../../commands/task/comment.command.js").then((m) =>
    m.makeRunTaskCommentHandler(deps.getCtx),
  );
export const loadTaskSetStatusSpec = (deps: RunDeps) =>
  import("../../../commands/task/set-status.command.js").then((m) =>
    m.makeRunTaskSetStatusHandler(deps.getCtx),
  );
export const loadTaskFindingsAddSpec = (deps: RunDeps) =>
  import("../../../commands/task/findings-add.command.js").then((m) =>
    m.makeRunTaskFindingsAddHandler(deps.getCtx),
  );
export const loadTaskObservationsAddSpec = (deps: RunDeps) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsAddHandler(deps.getCtx),
  );
export const loadTaskObservationsListSpec = (deps: RunDeps) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsListHandler(deps.getCtx),
  );
export const loadTaskObservationsCheckSpec = (deps: RunDeps) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsCheckHandler(deps.getCtx),
  );
export const loadTaskObservationsTriageSpec = (deps: RunDeps) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsTriageHandler(deps.getCtx),
  );
export const loadTaskObservationsHarvestSpec = (deps: RunDeps) =>
  import("../../../commands/task/observations.command.js").then((m) =>
    m.makeRunTaskObservationsHarvestHandler(deps.getCtx),
  );
export const loadTaskDocShowSpec = (deps: RunDeps) =>
  import("../../../commands/task/doc-show.command.js").then((m) =>
    m.makeRunTaskDocShowHandler(deps.getCtx),
  );
export const loadTaskDocSetSpec = (deps: RunDeps) =>
  import("../../../commands/task/doc-set.command.js").then((m) =>
    m.makeRunTaskDocSetHandler(deps.getCtx),
  );
export const loadTaskScrubSpec = (deps: RunDeps) =>
  import("../../../commands/task/scrub.command.js").then((m) =>
    m.makeRunTaskScrubHandler(deps.getCtx),
  );
export const loadTaskScaffoldSpec = (deps: RunDeps) =>
  import("../../../commands/task/scaffold.command.js").then((m) =>
    m.makeRunTaskScaffoldHandler(deps.getCtx),
  );
export const loadTaskNormalizeSpec = (deps: RunDeps) =>
  import("../../../commands/task/normalize.command.js").then((m) =>
    m.makeRunTaskNormalizeHandler(deps.getCtx),
  );
export const loadTaskObsidianSpec = (deps: RunDeps) =>
  import("../../../commands/task/obsidian.command.js").then((m) =>
    m.makeRunTaskObsidianHandler(deps.getCtx),
  );
export const loadTaskObsidianCleanSpec = () =>
  import("../../../commands/task/obsidian.command.js").then((m) =>
    m.makeRunTaskObsidianCleanHandler(),
  );
export const loadTaskMigrateSpec = (deps: RunDeps) =>
  import("../../../commands/task/migrate.command.js").then((m) =>
    m.makeRunTaskMigrateHandler(deps.getCtx),
  );
export const fromTaskPlanSpec = commandModule(
  () => import("../../../commands/task/plan.command.js"),
);
export const loadTaskPlanSetSpec = (deps: RunDeps) =>
  import("../../../commands/task/plan-set.command.js").then((m) =>
    m.makeRunTaskPlanSetHandler(deps.getCtx),
  );
export const loadTaskPlanApproveSpec = (deps: RunDeps) =>
  import("../../../commands/task/plan-approve.command.js").then((m) =>
    m.makeRunTaskPlanApproveHandler(deps.getCtx),
  );
export const loadTaskPlanRejectSpec = (deps: RunDeps) =>
  import("../../../commands/task/plan-reject.command.js").then((m) =>
    m.makeRunTaskPlanRejectHandler(deps.getCtx),
  );
export const loadTaskVerifyOkSpec = (deps: RunDeps) =>
  import("../../../commands/task/verify-ok.command.js").then((m) =>
    m.makeRunTaskVerifyOkHandler(deps.getCtx),
  );
export const loadTaskVerifyReworkSpec = (deps: RunDeps) =>
  import("../../../commands/task/verify-rework.command.js").then((m) =>
    m.makeRunTaskVerifyReworkHandler(deps.getCtx),
  );
export const loadTaskVerifyShowSpec = (deps: RunDeps) =>
  import("../../../commands/task/verify-show.command.js").then((m) =>
    m.makeRunTaskVerifyShowHandler(deps.getCtx),
  );
export const loadTaskRebuildIndexSpec = (deps: RunDeps) =>
  import("../../../commands/task/rebuild-index.command.js").then((m) =>
    m.makeRunTaskRebuildIndexHandler(deps.getCtx),
  );
export const fromTaskReclaimSpec = commandModule(
  () => import("../../../commands/task/reclaim.command.js"),
);
