import { commandModule, type RunDeps } from "./command-catalog/shared.js";

export const fromCommandsInit = commandModule(() => import("./commands/init.js"));
export const fromCommandsUpgradeCommand = commandModule(
  () => import("../../commands/upgrade.command.js"),
);
export const fromCommandsReleaseReleaseCommand = commandModule(
  () => import("../../commands/release/release.command.js"),
);
export const fromCommandsReleasePlanCommand = commandModule(
  () => import("../../commands/release/plan.command.js"),
);
export const fromCommandsReleaseApplyCommand = commandModule(
  () => import("../../commands/release/apply.command.js"),
);
export const fromCommandsCoreQuickstart = commandModule(
  () => import("./commands/core/quickstart.js"),
);
export const fromCommandsCorePreflight = commandModule(
  () => import("./commands/core/preflight.js"),
);
export const fromCommandsCodex = commandModule(() => import("./commands/codex.js"));
export const fromCommandsRuntimeCommand = commandModule(
  () => import("../../commands/runtime.command.js"),
);
export const fromCommandsIncidentsIncidentsCommand = commandModule(
  () => import("../../commands/incidents/incidents.command.js"),
);
export const fromCommandsCoreRole = commandModule(() => import("./commands/core/role.js"));
export const fromCommandsDoctorRun = commandModule(() => import("../../commands/doctor.run.js"));
export const fromCommandsWorkflowCommand = commandModule(
  () => import("../../commands/workflow.command.js"),
);
export const fromCommandsWorkflowBuildCommand = commandModule(
  () => import("../../commands/workflow-build.command.js"),
);
export const fromCommandsWorkflowRestoreCommand = commandModule(
  () => import("../../commands/workflow-restore.command.js"),
);
export const fromCommandsWorkflowPlaybookCommand = commandModule(
  () => import("../../commands/workflow-playbook.command.js"),
);
export const loadCodexPluginInstallSpec = (deps: RunDeps) =>
  import("./commands/codex.js").then((m) => m.makeRunCodexPluginInstallHandler(deps));
export const loadIncidentsCollectSpec = (deps: RunDeps) =>
  import("../../commands/incidents/collect.command.js").then((m) =>
    m.makeRunIncidentsCollectHandler(deps.getCtx),
  );
export const loadIncidentsAdviseSpec = (deps: RunDeps) =>
  import("../../commands/incidents/advise.command.js").then((m) =>
    m.makeRunIncidentsAdviseHandler(deps.getCtx),
  );
export const loadAgentsSpec = (deps: RunDeps) =>
  import("./commands/core/agents.js").then((m) => m.makeRunAgentsHandler(deps));
export const loadConfigShowSpec = (deps: RunDeps) =>
  import("./commands/config.js").then((m) => m.makeRunConfigShowHandler(deps));
export const loadConfigSetSpec = (deps: RunDeps) =>
  import("./commands/config.js").then((m) => m.makeRunConfigSetHandler(deps));
export const loadModeGetSpec = (deps: RunDeps) =>
  import("./commands/config.js").then((m) => m.makeRunModeGetHandler(deps));
export const loadModeSetSpec = (deps: RunDeps) =>
  import("./commands/config.js").then((m) => m.makeRunModeSetHandler(deps));
export const loadProfileSetSpec = (deps: RunDeps) =>
  import("./commands/config.js").then((m) => m.makeRunProfileSetHandler(deps));
export const loadIdeSyncSpec = (deps: RunDeps) =>
  import("./commands/ide.js").then((m) => m.makeRunIdeSyncHandler(deps));
export const fromCommandsTaskTaskCommand = commandModule(
  () => import("../../commands/task/task.command.js"),
);
export const fromCommandsTaskHandoffCommand = commandModule(
  () => import("../../commands/task/handoff.command.js"),
);
export const fromCommandsTaskHandoffRecordCommand = commandModule(
  () => import("../../commands/task/handoff-record.command.js"),
);
export const fromCommandsTaskRunShowCommand = commandModule(
  () => import("../../commands/task/run-show.command.js"),
);
export const fromCommandsTaskRunTailCommand = commandModule(
  () => import("../../commands/task/run-tail.command.js"),
);
export const fromCommandsTaskRunCancelCommand = commandModule(
  () => import("../../commands/task/run-cancel.command.js"),
);
export const fromCommandsTaskRunRetryCommand = commandModule(
  () => import("../../commands/task/run-retry.command.js"),
);
export const fromCommandsTaskFindingsCommand = commandModule(
  () => import("../../commands/task/findings.command.js"),
);
export const fromCommandsTaskDocCommand = commandModule(
  () => import("../../commands/task/doc.command.js"),
);
export const fromCommandsTaskLintCommand = commandModule(
  () => import("../../commands/task/lint.command.js"),
);
export const fromCommandsTaskMigrateDocCommand = commandModule(
  () => import("../../commands/task/migrate-doc.command.js"),
);
export const fromCommandsTaskVerifyCommand = commandModule(
  () => import("../../commands/task/verify.command.js"),
);
export const fromCommandsTaskResumeContextCommand = commandModule(
  () => import("../../commands/task/resume-context.command.js"),
);
export const fromTaskHandoffShowSpec = commandModule(
  () => import("../../commands/task/handoff-show.command.js"),
);
export const loadTaskHostedCloseSpec = (deps: RunDeps) =>
  import("../../commands/task/hosted-close.command.js").then((m) =>
    m.makeRunTaskHostedCloseHandler(deps.getCtx),
  );
export const loadTaskHostedClosePrSpec = (deps: RunDeps) =>
  import("../../commands/task/hosted-close-pr.command.js").then((m) =>
    m.makeRunTaskHostedClosePrHandler(deps.getCtx),
  );
export const loadTaskListSpec = (deps: RunDeps) =>
  import("../../commands/task/list.run.js").then((m) => m.makeRunTaskListHandler(deps.getCtx));
export const loadTaskNextSpec = (deps: RunDeps) =>
  import("../../commands/task/next.run.js").then((m) => m.makeRunTaskNextHandler(deps.getCtx));
export const loadTaskSearchSpec = (deps: RunDeps) =>
  import("../../commands/task/search.run.js").then((m) => m.makeRunTaskSearchHandler(deps.getCtx));
export const loadTaskShowSpec = (deps: RunDeps) =>
  import("../../commands/task/show.run.js").then((m) => m.makeRunTaskShowHandler(deps.getCtx));
export const fromTaskRunTraceSpec = commandModule(
  () => import("../../commands/task/run-trace.command.js"),
);
export const fromTaskRunSpec = commandModule(() => import("../../commands/task/run.command.js"));
export const fromTaskRunResumeSpec = commandModule(
  () => import("../../commands/task/run-resume.command.js"),
);
export const loadTaskNewSpec = (deps: RunDeps) =>
  import("../../commands/task/new.command.js").then((m) => m.makeRunTaskNewHandler(deps.getCtx));
export const loadTaskDeriveSpec = (deps: RunDeps) =>
  import("../../commands/task/derive.command.js").then((m) =>
    m.makeRunTaskDeriveHandler(deps.getCtx),
  );
export const loadTaskCloseDuplicateSpec = (deps: RunDeps) =>
  import("../../commands/task/close-duplicate.command.js").then((m) =>
    m.makeRunTaskCloseDuplicateHandler(deps.getCtx),
  );
export const loadTaskStartReadySpec = (deps: RunDeps) =>
  import("../../commands/task/start-ready.command.js").then((m) =>
    m.makeRunTaskStartReadyHandler(deps.getCtx),
  );
export const loadTaskCloseNoopSpec = (deps: RunDeps) =>
  import("../../commands/task/close-noop.command.js").then((m) =>
    m.makeRunTaskCloseNoopHandler(deps.getCtx),
  );
export const loadTaskAddSpec = (deps: RunDeps) =>
  import("../../commands/task/add.command.js").then((m) => m.makeRunTaskAddHandler(deps.getCtx));
export const loadTaskUpdateSpec = (deps: RunDeps) =>
  import("../../commands/task/update.command.js").then((m) =>
    m.makeRunTaskUpdateHandler(deps.getCtx),
  );
export const loadTaskCommentSpec = (deps: RunDeps) =>
  import("../../commands/task/comment.command.js").then((m) =>
    m.makeRunTaskCommentHandler(deps.getCtx),
  );
export const loadTaskSetStatusSpec = (deps: RunDeps) =>
  import("../../commands/task/set-status.command.js").then((m) =>
    m.makeRunTaskSetStatusHandler(deps.getCtx),
  );
export const loadTaskFindingsAddSpec = (deps: RunDeps) =>
  import("../../commands/task/findings-add.command.js").then((m) =>
    m.makeRunTaskFindingsAddHandler(deps.getCtx),
  );
export const loadTaskDocShowSpec = (deps: RunDeps) =>
  import("../../commands/task/doc-show.command.js").then((m) =>
    m.makeRunTaskDocShowHandler(deps.getCtx),
  );
export const loadTaskDocSetSpec = (deps: RunDeps) =>
  import("../../commands/task/doc-set.command.js").then((m) =>
    m.makeRunTaskDocSetHandler(deps.getCtx),
  );
export const loadTaskScrubSpec = (deps: RunDeps) =>
  import("../../commands/task/scrub.command.js").then((m) =>
    m.makeRunTaskScrubHandler(deps.getCtx),
  );
export const loadTaskScaffoldSpec = (deps: RunDeps) =>
  import("../../commands/task/scaffold.command.js").then((m) =>
    m.makeRunTaskScaffoldHandler(deps.getCtx),
  );
export const loadTaskNormalizeSpec = (deps: RunDeps) =>
  import("../../commands/task/normalize.command.js").then((m) =>
    m.makeRunTaskNormalizeHandler(deps.getCtx),
  );
export const loadTaskExportSpec = (deps: RunDeps) =>
  import("../../commands/task/export.command.js").then((m) =>
    m.makeRunTaskExportHandler(deps.getCtx),
  );
export const loadTaskMigrateSpec = (deps: RunDeps) =>
  import("../../commands/task/migrate.command.js").then((m) =>
    m.makeRunTaskMigrateHandler(deps.getCtx),
  );
export const fromTaskPlanSpec = commandModule(() => import("../../commands/task/plan.command.js"));
export const loadTaskPlanSetSpec = (deps: RunDeps) =>
  import("../../commands/task/plan-set.command.js").then((m) =>
    m.makeRunTaskPlanSetHandler(deps.getCtx),
  );
export const loadTaskPlanApproveSpec = (deps: RunDeps) =>
  import("../../commands/task/plan-approve.command.js").then((m) =>
    m.makeRunTaskPlanApproveHandler(deps.getCtx),
  );
export const loadTaskPlanRejectSpec = (deps: RunDeps) =>
  import("../../commands/task/plan-reject.command.js").then((m) =>
    m.makeRunTaskPlanRejectHandler(deps.getCtx),
  );
export const loadTaskVerifyOkSpec = (deps: RunDeps) =>
  import("../../commands/task/verify-ok.command.js").then((m) =>
    m.makeRunTaskVerifyOkHandler(deps.getCtx),
  );
export const loadTaskVerifyReworkSpec = (deps: RunDeps) =>
  import("../../commands/task/verify-rework.command.js").then((m) =>
    m.makeRunTaskVerifyReworkHandler(deps.getCtx),
  );
export const loadTaskVerifyShowSpec = (deps: RunDeps) =>
  import("../../commands/task/verify-show.command.js").then((m) =>
    m.makeRunTaskVerifyShowHandler(deps.getCtx),
  );
export const loadTaskRebuildIndexSpec = (deps: RunDeps) =>
  import("../../commands/task/rebuild-index.command.js").then((m) =>
    m.makeRunTaskRebuildIndexHandler(deps.getCtx),
  );
export const fromTaskReclaimSpec = commandModule(
  () => import("../../commands/task/reclaim.command.js"),
);
export const fromCommandsRecipesRecipesCommand = commandModule(
  () => import("../../commands/recipes/recipes.command.js"),
);
export const fromCommandsRecipesCacheCommand = commandModule(
  () => import("../../commands/recipes/cache.command.js"),
);
export const fromCommandsRecipesAddCommand = commandModule(
  () => import("../../commands/recipes/add.command.js"),
);
export const fromCommandsRecipesListCommand = commandModule(
  () => import("../../commands/recipes/list.command.js"),
);
export const fromCommandsRecipesListRemoteCommand = commandModule(
  () => import("../../commands/recipes/list-remote.command.js"),
);
export const fromCommandsRecipesExplainCommand = commandModule(
  () => import("../../commands/recipes/explain.command.js"),
);
export const fromCommandsRecipesEnableCommand = commandModule(
  () => import("../../commands/recipes/enable.command.js"),
);
export const fromCommandsRecipesRemoveCommand = commandModule(
  () => import("../../commands/recipes/remove.command.js"),
);
export const fromCommandsRecipesDetachCommand = commandModule(
  () => import("../../commands/recipes/detach.command.js"),
);
export const fromCommandsRecipesInstallRun = commandModule(
  () => import("../../commands/recipes/install.run.js"),
);
export const fromCommandsBranchBaseCommand = commandModule(
  () => import("../../commands/branch/base.command.js"),
);
export const fromCommandsBranchStatusCommand = commandModule(
  () => import("../../commands/branch/status.command.js"),
);
export const loadWorkStartSpec = (deps: RunDeps) =>
  import("../../commands/branch/work-start.command.js").then((m) =>
    m.makeRunWorkStartHandler(deps.getCtx),
  );
export const fromRecipesActiveSpec = commandModule(
  () => import("../../commands/recipes/active.command.js"),
);
export const fromRecipesInfoSpec = commandModule(
  () => import("../../commands/recipes/info.command.js"),
);
export const loadRecipesExplainActiveSpec = () =>
  import("../../commands/recipes/explain-active.command.js").then((m) => m.runRecipesExplainActive);
export const fromRecipesDisableSpec = commandModule(
  () => import("../../commands/recipes/disable.command.js"),
);
export const fromRecipesUpdateSpec = commandModule(
  () => import("../../commands/recipes/update.command.js"),
);
export const fromRecipesCachePruneSpec = commandModule(
  () => import("../../commands/recipes/cache-prune.command.js"),
);
export const fromBranchBaseSetSpec = commandModule(
  () => import("../../commands/branch/base.command.js"),
);
export const fromBranchBaseExplainSpec = commandModule(
  () => import("../../commands/branch/base.command.js"),
);
export const fromBranchRemoveSpec = commandModule(
  () => import("../../commands/branch/remove.command.js"),
);
export const loadBackendSpec = (deps: RunDeps) =>
  import("../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendHandler(deps.getCtx),
  );
export const loadBackendSyncSpec = (deps: RunDeps) =>
  import("../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendSyncHandler(deps.getCtx),
  );
export const loadBackendInspectSpec = (deps: RunDeps) =>
  import("../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendInspectHandler(deps.getCtx),
  );
export const loadBackendMigrateCanonicalStateSpec = (deps: RunDeps) =>
  import("../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendMigrateCanonicalStateHandler(deps.getCtx),
  );
export const loadSyncSpec = (deps: RunDeps) =>
  import("../../commands/sync.command.js").then((m) => m.makeRunSyncHandler(deps.getCtx));
export const loadPrSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrHandler(deps.getCtx));
export const loadPrOpenSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrOpenHandler(deps.getCtx));
export const loadPrUpdateSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrUpdateHandler(deps.getCtx));
export const loadPrCheckSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrCheckHandler(deps.getCtx));
export const loadPrCloseSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrCloseHandler(deps.getCtx));
export const loadPrCloseSupersededSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrCloseSupersededHandler(deps.getCtx),
  );
export const loadPrNoteSpec = (deps: RunDeps) =>
  import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrNoteHandler(deps.getCtx));
export const loadIntegrateSpec = (deps: RunDeps) =>
  import("../../commands/integrate.command.js").then((m) => m.makeRunIntegrateHandler(deps.getCtx));
export const fromCommandsHooksHooksCommand = commandModule(
  () => import("../../commands/hooks/hooks.command.js"),
);
export const fromCommandsHooksInstallCommand = commandModule(
  () => import("../../commands/hooks/install.command.js"),
);
export const fromCommandsHooksRunCommand = commandModule(
  () => import("../../commands/hooks/run.command.js"),
);
export const fromCommandsGuardGuardCommand = commandModule(
  () => import("../../commands/guard/guard.command.js"),
);
export const fromCommandsGuardCleanCommand = commandModule(
  () => import("../../commands/guard/clean.command.js"),
);
export const loadCommitSpec = (deps: RunDeps) =>
  import("../../commands/commit.command.js").then((m) => m.makeRunCommitHandler(deps.getCtx));
export const loadStartSpec = (deps: RunDeps) =>
  import("../../commands/start.run.js").then((m) => m.makeRunStartHandler(deps.getCtx));
export const loadBlockSpec = (deps: RunDeps) =>
  import("../../commands/block.run.js").then((m) => m.makeRunBlockHandler(deps.getCtx));
export const loadVerifySpec = (deps: RunDeps) =>
  import("../../commands/verify.run.js").then((m) => m.makeRunVerifyHandler(deps.getCtx));
export const loadFinishSpec = (deps: RunDeps) =>
  import("../../commands/finish.run.js").then((m) => m.makeRunFinishHandler(deps.getCtx));
export const loadReadySpec = (deps: RunDeps) =>
  import("../../commands/ready.command.js").then((m) => m.makeRunReadyHandler(deps.getCtx));
export const loadDocsCliSpec = (deps: RunDeps) =>
  import("../../commands/docs/cli.command.js").then((m) =>
    m.makeRunDocsCliHandler(deps.getHelpJsonForDocs),
  );
export const fromHooksUninstallSpec = commandModule(
  () => import("../../commands/hooks/uninstall.command.js"),
);
export const fromCleanupSpec = commandModule(
  () => import("../../commands/cleanup/merged.command.js"),
);
export const loadCleanupMergedSpec = (deps: RunDeps) =>
  import("../../commands/cleanup/merged.command.js").then((m) =>
    m.makeRunCleanupMergedHandler(deps.getCtx),
  );
export const fromGuardSuggestAllowSpec = commandModule(
  () => import("../../commands/guard/suggest-allow.command.js"),
);
export const loadGuardCommitSpec = (deps: RunDeps) =>
  import("../../commands/guard/commit.command.js").then((m) =>
    m.makeRunGuardCommitHandler(deps.getCtx),
  );
