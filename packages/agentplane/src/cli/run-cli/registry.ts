import { CommandRegistry } from "../spec/registry.js";
import { helpSpec, makeHelpHandler } from "../spec/help.js";

import { initSpec, runInit } from "./commands/init.js";
import {
  agentsSpec,
  quickstartSpec,
  roleSpec,
  runAgents,
  runQuickstart,
  runRole,
} from "./commands/core.js";
import {
  configSetSpec,
  configShowSpec,
  modeGetSpec,
  modeSetSpec,
  runConfigSet,
  runConfigShow,
  runModeGet,
  runModeSet,
} from "./commands/config.js";
import { ideSyncSpec, runIdeSync } from "./commands/ide.js";

import { taskNewSpec, makeRunTaskNewHandler } from "../../commands/task/new.command.js";
import { taskListSpec, makeRunTaskListHandler } from "../../commands/task/list.command.js";
import { taskNextSpec, makeRunTaskNextHandler } from "../../commands/task/next.command.js";
import { taskSearchSpec, makeRunTaskSearchHandler } from "../../commands/task/search.command.js";
import { taskShowSpec, makeRunTaskShowHandler } from "../../commands/task/show.command.js";
import { taskAddSpec, makeRunTaskAddHandler } from "../../commands/task/add.command.js";
import { taskUpdateSpec, makeRunTaskUpdateHandler } from "../../commands/task/update.command.js";
import { taskCommentSpec, makeRunTaskCommentHandler } from "../../commands/task/comment.command.js";
import {
  taskSetStatusSpec,
  makeRunTaskSetStatusHandler,
} from "../../commands/task/set-status.command.js";
import { taskDocSpec, runTaskDoc } from "../../commands/task/doc.command.js";
import {
  taskDocShowSpec,
  makeRunTaskDocShowHandler,
} from "../../commands/task/doc-show.command.js";
import { taskDocSetSpec, makeRunTaskDocSetHandler } from "../../commands/task/doc-set.command.js";
import { taskScrubSpec, makeRunTaskScrubHandler } from "../../commands/task/scrub.command.js";
import {
  taskScaffoldSpec,
  makeRunTaskScaffoldHandler,
} from "../../commands/task/scaffold.command.js";
import {
  taskNormalizeSpec,
  makeRunTaskNormalizeHandler,
} from "../../commands/task/normalize.command.js";
import { taskExportSpec, makeRunTaskExportHandler } from "../../commands/task/export.command.js";
import { taskLintSpec, runTaskLint } from "../../commands/task/lint.command.js";
import { taskMigrateSpec, makeRunTaskMigrateHandler } from "../../commands/task/migrate.command.js";
import { taskMigrateDocSpec, runTaskMigrateDoc } from "../../commands/task/migrate-doc.command.js";
import { taskDeriveSpec, makeRunTaskDeriveHandler } from "../../commands/task/derive.command.js";
import {
  taskPlanSetSpec,
  makeRunTaskPlanSetHandler,
} from "../../commands/task/plan-set.command.js";
import {
  taskPlanApproveSpec,
  makeRunTaskPlanApproveHandler,
} from "../../commands/task/plan-approve.command.js";
import {
  taskPlanRejectSpec,
  makeRunTaskPlanRejectHandler,
} from "../../commands/task/plan-reject.command.js";
import { taskVerifySpec, runTaskVerify } from "../../commands/task/verify.command.js";
import {
  taskVerifyOkSpec,
  makeRunTaskVerifyOkHandler,
} from "../../commands/task/verify-ok.command.js";
import {
  taskVerifyReworkSpec,
  makeRunTaskVerifyReworkHandler,
} from "../../commands/task/verify-rework.command.js";
import {
  taskVerifyShowSpec,
  makeRunTaskVerifyShowHandler,
} from "../../commands/task/verify-show.command.js";

import {
  workStartSpec,
  makeRunWorkStartHandler,
} from "../../commands/branch/work-start.command.js";
import {
  branchBaseClearSpec,
  branchBaseExplainSpec,
  branchBaseGetSpec,
  branchBaseSetSpec,
  branchBaseSpec,
  runBranchBase,
  runBranchBaseClear,
  runBranchBaseExplain,
  runBranchBaseGet,
  runBranchBaseSet,
} from "../../commands/branch/base.command.js";
import { branchStatusSpec, runBranchStatus } from "../../commands/branch/status.command.js";
import { branchRemoveSpec, runBranchRemove } from "../../commands/branch/remove.command.js";

import { recipesInstallSpec, runRecipesInstall } from "../../commands/recipes/install.command.js";
import { recipesListSpec, runRecipesList } from "../../commands/recipes/list.command.js";
import {
  recipesListRemoteSpec,
  runRecipesListRemote,
} from "../../commands/recipes/list-remote.command.js";
import { recipesInfoSpec, runRecipesInfo } from "../../commands/recipes/info.command.js";
import { recipesExplainSpec, runRecipesExplain } from "../../commands/recipes/explain.command.js";
import { recipesRemoveSpec, runRecipesRemove } from "../../commands/recipes/remove.command.js";
import {
  recipesCachePruneSpec,
  runRecipesCachePrune,
} from "../../commands/recipes/cache-prune.command.js";
import { recipesSpec, runRecipes } from "../../commands/recipes/recipes.command.js";
import { recipesCacheSpec, runRecipesCache } from "../../commands/recipes/cache.command.js";

import { upgradeSpec, runUpgrade } from "../../commands/upgrade.command.js";
import {
  backendSpec,
  backendSyncSpec,
  makeRunBackendHandler,
  makeRunBackendSyncHandler,
} from "../../commands/backend/sync.command.js";
import { syncSpec, makeRunSyncHandler } from "../../commands/sync.command.js";

import { scenarioListSpec, runScenarioList } from "../../commands/scenario/list.command.js";
import { scenarioInfoSpec, runScenarioInfo } from "../../commands/scenario/info.command.js";
import { scenarioRunSpec, runScenarioRun } from "../../commands/scenario/run.command.js";
import { scenarioSpec, runScenario } from "../../commands/scenario/scenario.command.js";

import {
  makeRunPrCheckHandler,
  makeRunPrHandler,
  makeRunPrNoteHandler,
  makeRunPrOpenHandler,
  makeRunPrUpdateHandler,
  prCheckSpec,
  prNoteSpec,
  prOpenSpec,
  prSpec,
  prUpdateSpec,
} from "../../commands/pr/pr.command.js";
import { integrateSpec, makeRunIntegrateHandler } from "../../commands/integrate.command.js";

import { commitSpec, makeRunCommitHandler } from "../../commands/commit.command.js";
import { startSpec, makeRunStartHandler } from "../../commands/start.command.js";
import { blockSpec, makeRunBlockHandler } from "../../commands/block.command.js";
import { verifySpec, makeRunVerifyHandler } from "../../commands/verify.command.js";
import { finishSpec, makeRunFinishHandler } from "../../commands/finish.command.js";
import { readySpec, makeRunReadyHandler } from "../../commands/ready.command.js";

import {
  docsCliSpec,
  makeHelpJsonFromSpecs,
  makeRunDocsCliHandler,
} from "../../commands/docs/cli.command.js";
import { hooksSpec, runHooks } from "../../commands/hooks/hooks.command.js";
import { hooksInstallSpec, runHooksInstall } from "../../commands/hooks/install.command.js";
import { hooksUninstallSpec, runHooksUninstall } from "../../commands/hooks/uninstall.command.js";
import { hooksRunSpec, runHooksRun } from "../../commands/hooks/run.command.js";
import {
  cleanupMergedSpec,
  cleanupSpec,
  makeRunCleanupMergedHandler,
  runCleanup,
} from "../../commands/cleanup/merged.command.js";
import { guardSpec, runGuard } from "../../commands/guard/guard.command.js";
import { guardCleanSpec, runGuardClean } from "../../commands/guard/clean.command.js";
import {
  guardSuggestAllowSpec,
  runGuardSuggestAllow,
} from "../../commands/guard/suggest-allow.command.js";
import { guardCommitSpec, makeRunGuardCommitHandler } from "../../commands/guard/commit.command.js";

import { agentLintSpec, runAgentLint } from "../../commands/agent/lint.command.js";

import type { CommandContext } from "../../commands/shared/task-backend.js";

const helpNoop = () => Promise.resolve(0);

export function buildHelpFastRegistry(): CommandRegistry {
  const registry = new CommandRegistry();
  registry.register(initSpec, helpNoop);
  registry.register(upgradeSpec, helpNoop);
  registry.register(quickstartSpec, helpNoop);
  registry.register(roleSpec, helpNoop);
  registry.register(agentsSpec, helpNoop);
  registry.register(agentLintSpec, helpNoop);
  registry.register(configShowSpec, helpNoop);
  registry.register(configSetSpec, helpNoop);
  registry.register(modeGetSpec, helpNoop);
  registry.register(modeSetSpec, helpNoop);
  registry.register(ideSyncSpec, helpNoop);
  registry.register(recipesSpec, helpNoop);
  registry.register(recipesCacheSpec, helpNoop);
  registry.register(recipesListSpec, helpNoop);
  registry.register(recipesListRemoteSpec, helpNoop);
  registry.register(recipesInfoSpec, helpNoop);
  registry.register(recipesExplainSpec, helpNoop);
  registry.register(recipesRemoveSpec, helpNoop);
  registry.register(recipesCachePruneSpec, helpNoop);
  registry.register(scenarioListSpec, helpNoop);
  registry.register(scenarioInfoSpec, helpNoop);
  registry.register(scenarioRunSpec, helpNoop);
  registry.register(scenarioSpec, helpNoop);
  registry.register(branchBaseSpec, helpNoop);
  registry.register(branchBaseGetSpec, helpNoop);
  registry.register(branchBaseSetSpec, helpNoop);
  registry.register(branchBaseClearSpec, helpNoop);
  registry.register(branchBaseExplainSpec, helpNoop);
  registry.register(branchStatusSpec, helpNoop);
  registry.register(branchRemoveSpec, helpNoop);
  registry.register(backendSpec, helpNoop);
  registry.register(backendSyncSpec, helpNoop);
  registry.register(syncSpec, helpNoop);
  registry.register(prSpec, helpNoop);
  registry.register(prOpenSpec, helpNoop);
  registry.register(prUpdateSpec, helpNoop);
  registry.register(prCheckSpec, helpNoop);
  registry.register(prNoteSpec, helpNoop);
  registry.register(integrateSpec, helpNoop);
  registry.register(commitSpec, helpNoop);
  registry.register(startSpec, helpNoop);
  registry.register(blockSpec, helpNoop);
  registry.register(verifySpec, helpNoop);
  registry.register(finishSpec, helpNoop);
  registry.register(readySpec, helpNoop);
  registry.register(docsCliSpec, helpNoop);
  registry.register(hooksSpec, helpNoop);
  registry.register(hooksInstallSpec, helpNoop);
  registry.register(hooksUninstallSpec, helpNoop);
  registry.register(hooksRunSpec, helpNoop);
  registry.register(cleanupSpec, helpNoop);
  registry.register(cleanupMergedSpec, helpNoop);
  registry.register(guardSpec, helpNoop);
  registry.register(guardCleanSpec, helpNoop);
  registry.register(guardSuggestAllowSpec, helpNoop);
  registry.register(guardCommitSpec, helpNoop);
  registry.register(taskListSpec, helpNoop);
  registry.register(taskNextSpec, helpNoop);
  registry.register(taskSearchSpec, helpNoop);
  registry.register(taskShowSpec, helpNoop);
  registry.register(taskNewSpec, helpNoop);
  registry.register(taskDeriveSpec, helpNoop);
  registry.register(taskAddSpec, helpNoop);
  registry.register(taskUpdateSpec, helpNoop);
  registry.register(taskCommentSpec, helpNoop);
  registry.register(taskSetStatusSpec, helpNoop);
  registry.register(taskDocSpec, helpNoop);
  registry.register(taskDocShowSpec, helpNoop);
  registry.register(taskDocSetSpec, helpNoop);
  registry.register(taskScrubSpec, helpNoop);
  registry.register(taskScaffoldSpec, helpNoop);
  registry.register(taskNormalizeSpec, helpNoop);
  registry.register(taskExportSpec, helpNoop);
  registry.register(taskLintSpec, helpNoop);
  registry.register(taskMigrateSpec, helpNoop);
  registry.register(taskMigrateDocSpec, helpNoop);
  registry.register(taskPlanSetSpec, helpNoop);
  registry.register(taskPlanApproveSpec, helpNoop);
  registry.register(taskPlanRejectSpec, helpNoop);
  registry.register(taskVerifySpec, helpNoop);
  registry.register(taskVerifyOkSpec, helpNoop);
  registry.register(taskVerifyReworkSpec, helpNoop);
  registry.register(taskVerifyShowSpec, helpNoop);
  registry.register(workStartSpec, helpNoop);
  registry.register(recipesInstallSpec, helpNoop);
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}

export function buildRegistry(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandRegistry {
  const registry = new CommandRegistry();
  const getHelpJsonForDocs = () => makeHelpJsonFromSpecs(registry.list().map((e) => e.spec));
  registry.register(initSpec, runInit);
  registry.register(upgradeSpec, runUpgrade);
  registry.register(quickstartSpec, runQuickstart);
  registry.register(roleSpec, runRole);
  registry.register(agentsSpec, runAgents);
  registry.register(agentLintSpec, runAgentLint);
  registry.register(configShowSpec, runConfigShow);
  registry.register(configSetSpec, runConfigSet);
  registry.register(modeGetSpec, runModeGet);
  registry.register(modeSetSpec, runModeSet);
  registry.register(ideSyncSpec, runIdeSync);
  registry.register(taskListSpec, makeRunTaskListHandler(getCtx));
  registry.register(taskNextSpec, makeRunTaskNextHandler(getCtx));
  registry.register(taskSearchSpec, makeRunTaskSearchHandler(getCtx));
  registry.register(taskShowSpec, makeRunTaskShowHandler(getCtx));
  registry.register(taskNewSpec, makeRunTaskNewHandler(getCtx));
  registry.register(taskDeriveSpec, makeRunTaskDeriveHandler(getCtx));
  registry.register(taskAddSpec, makeRunTaskAddHandler(getCtx));
  registry.register(taskUpdateSpec, makeRunTaskUpdateHandler(getCtx));
  registry.register(taskCommentSpec, makeRunTaskCommentHandler(getCtx));
  registry.register(taskSetStatusSpec, makeRunTaskSetStatusHandler(getCtx));
  registry.register(taskDocSpec, runTaskDoc);
  registry.register(taskDocShowSpec, makeRunTaskDocShowHandler(getCtx));
  registry.register(taskDocSetSpec, makeRunTaskDocSetHandler(getCtx));
  registry.register(taskScrubSpec, makeRunTaskScrubHandler(getCtx));
  registry.register(taskScaffoldSpec, makeRunTaskScaffoldHandler(getCtx));
  registry.register(taskNormalizeSpec, makeRunTaskNormalizeHandler(getCtx));
  registry.register(taskExportSpec, makeRunTaskExportHandler(getCtx));
  registry.register(taskLintSpec, runTaskLint);
  registry.register(taskMigrateSpec, makeRunTaskMigrateHandler(getCtx));
  registry.register(taskMigrateDocSpec, runTaskMigrateDoc);
  registry.register(taskPlanSetSpec, makeRunTaskPlanSetHandler(getCtx));
  registry.register(taskPlanApproveSpec, makeRunTaskPlanApproveHandler(getCtx));
  registry.register(taskPlanRejectSpec, makeRunTaskPlanRejectHandler(getCtx));
  registry.register(taskVerifySpec, runTaskVerify);
  registry.register(taskVerifyOkSpec, makeRunTaskVerifyOkHandler(getCtx));
  registry.register(taskVerifyReworkSpec, makeRunTaskVerifyReworkHandler(getCtx));
  registry.register(taskVerifyShowSpec, makeRunTaskVerifyShowHandler(getCtx));
  registry.register(workStartSpec, makeRunWorkStartHandler(getCtx));
  registry.register(recipesSpec, runRecipes);
  registry.register(recipesCacheSpec, runRecipesCache);
  registry.register(recipesListSpec, runRecipesList);
  registry.register(recipesListRemoteSpec, runRecipesListRemote);
  registry.register(recipesInfoSpec, runRecipesInfo);
  registry.register(recipesExplainSpec, runRecipesExplain);
  registry.register(recipesRemoveSpec, runRecipesRemove);
  registry.register(recipesCachePruneSpec, runRecipesCachePrune);
  registry.register(recipesInstallSpec, runRecipesInstall);
  registry.register(scenarioSpec, runScenario);
  registry.register(scenarioListSpec, runScenarioList);
  registry.register(scenarioInfoSpec, runScenarioInfo);
  registry.register(scenarioRunSpec, runScenarioRun);
  registry.register(branchBaseSpec, runBranchBase);
  registry.register(branchBaseGetSpec, runBranchBaseGet);
  registry.register(branchBaseSetSpec, runBranchBaseSet);
  registry.register(branchBaseClearSpec, runBranchBaseClear);
  registry.register(branchBaseExplainSpec, runBranchBaseExplain);
  registry.register(branchStatusSpec, runBranchStatus);
  registry.register(branchRemoveSpec, runBranchRemove);
  registry.register(backendSpec, makeRunBackendHandler(getCtx));
  registry.register(backendSyncSpec, makeRunBackendSyncHandler(getCtx));
  registry.register(syncSpec, makeRunSyncHandler(getCtx));
  registry.register(prSpec, makeRunPrHandler(getCtx));
  registry.register(prOpenSpec, makeRunPrOpenHandler(getCtx));
  registry.register(prUpdateSpec, makeRunPrUpdateHandler(getCtx));
  registry.register(prCheckSpec, makeRunPrCheckHandler(getCtx));
  registry.register(prNoteSpec, makeRunPrNoteHandler(getCtx));
  registry.register(integrateSpec, makeRunIntegrateHandler(getCtx));
  registry.register(commitSpec, makeRunCommitHandler(getCtx));
  registry.register(startSpec, makeRunStartHandler(getCtx));
  registry.register(blockSpec, makeRunBlockHandler(getCtx));
  registry.register(verifySpec, makeRunVerifyHandler(getCtx));
  registry.register(finishSpec, makeRunFinishHandler(getCtx));
  registry.register(readySpec, makeRunReadyHandler(getCtx));
  registry.register(docsCliSpec, makeRunDocsCliHandler(getHelpJsonForDocs));
  registry.register(hooksSpec, runHooks);
  registry.register(hooksInstallSpec, runHooksInstall);
  registry.register(hooksUninstallSpec, runHooksUninstall);
  registry.register(hooksRunSpec, runHooksRun);
  registry.register(cleanupSpec, runCleanup);
  registry.register(cleanupMergedSpec, makeRunCleanupMergedHandler(getCtx));
  registry.register(guardSpec, runGuard);
  registry.register(guardCleanSpec, runGuardClean);
  registry.register(guardSuggestAllowSpec, runGuardSuggestAllow);
  registry.register(guardCommitSpec, makeRunGuardCommitHandler(getCtx));
  registry.register(helpSpec, makeHelpHandler(registry));
  return registry;
}
