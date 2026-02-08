import type { CommandHandler, CommandSpec } from "../spec/spec.js";
import type { HelpJson } from "../spec/help-render.js";

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

import { taskNewSpec } from "../../commands/task/new.spec.js";
import { makeRunTaskNewHandler } from "../../commands/task/new.command.js";
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

import { commitSpec } from "../../commands/commit.spec.js";
import { makeRunCommitHandler } from "../../commands/commit.command.js";
import { startSpec, makeRunStartHandler } from "../../commands/start.command.js";
import { blockSpec, makeRunBlockHandler } from "../../commands/block.command.js";
import { verifySpec, makeRunVerifyHandler } from "../../commands/verify.command.js";
import { finishSpec, makeRunFinishHandler } from "../../commands/finish.command.js";
import { readySpec, makeRunReadyHandler } from "../../commands/ready.command.js";

import { docsCliSpec, makeRunDocsCliHandler } from "../../commands/docs/cli.command.js";
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

import type { CommandContext } from "../../commands/shared/task-backend.js";

export type RunDeps = {
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>;
  getHelpJsonForDocs: () => readonly HelpJson[];
};

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  run: (deps: RunDeps) => CommandHandler<unknown>;
};

function entry<TParsed>(
  spec: CommandSpec<TParsed>,
  run: (deps: RunDeps) => CommandHandler<TParsed>,
): CommandEntry {
  return {
    spec: spec as CommandSpec<unknown>,
    run: (deps) => run(deps) as CommandHandler<unknown>,
  };
}

export const COMMANDS = [
  entry(initSpec, () => runInit),
  entry(upgradeSpec, () => runUpgrade),
  entry(quickstartSpec, () => runQuickstart),
  entry(roleSpec, () => runRole),
  entry(agentsSpec, () => runAgents),
  entry(configShowSpec, () => runConfigShow),
  entry(configSetSpec, () => runConfigSet),
  entry(modeGetSpec, () => runModeGet),
  entry(modeSetSpec, () => runModeSet),
  entry(ideSyncSpec, () => runIdeSync),

  entry(taskListSpec, ({ getCtx }) => makeRunTaskListHandler(getCtx)),
  entry(taskNextSpec, ({ getCtx }) => makeRunTaskNextHandler(getCtx)),
  entry(taskSearchSpec, ({ getCtx }) => makeRunTaskSearchHandler(getCtx)),
  entry(taskShowSpec, ({ getCtx }) => makeRunTaskShowHandler(getCtx)),
  entry(taskNewSpec, ({ getCtx }) => makeRunTaskNewHandler(getCtx)),
  entry(taskDeriveSpec, ({ getCtx }) => makeRunTaskDeriveHandler(getCtx)),
  entry(taskAddSpec, ({ getCtx }) => makeRunTaskAddHandler(getCtx)),
  entry(taskUpdateSpec, ({ getCtx }) => makeRunTaskUpdateHandler(getCtx)),
  entry(taskCommentSpec, ({ getCtx }) => makeRunTaskCommentHandler(getCtx)),
  entry(taskSetStatusSpec, ({ getCtx }) => makeRunTaskSetStatusHandler(getCtx)),
  entry(taskDocSpec, () => runTaskDoc),
  entry(taskDocShowSpec, ({ getCtx }) => makeRunTaskDocShowHandler(getCtx)),
  entry(taskDocSetSpec, ({ getCtx }) => makeRunTaskDocSetHandler(getCtx)),
  entry(taskScrubSpec, ({ getCtx }) => makeRunTaskScrubHandler(getCtx)),
  entry(taskScaffoldSpec, ({ getCtx }) => makeRunTaskScaffoldHandler(getCtx)),
  entry(taskNormalizeSpec, ({ getCtx }) => makeRunTaskNormalizeHandler(getCtx)),
  entry(taskExportSpec, ({ getCtx }) => makeRunTaskExportHandler(getCtx)),
  entry(taskLintSpec, () => runTaskLint),
  entry(taskMigrateSpec, ({ getCtx }) => makeRunTaskMigrateHandler(getCtx)),
  entry(taskMigrateDocSpec, () => runTaskMigrateDoc),
  entry(taskPlanSetSpec, ({ getCtx }) => makeRunTaskPlanSetHandler(getCtx)),
  entry(taskPlanApproveSpec, ({ getCtx }) => makeRunTaskPlanApproveHandler(getCtx)),
  entry(taskPlanRejectSpec, ({ getCtx }) => makeRunTaskPlanRejectHandler(getCtx)),
  entry(taskVerifySpec, () => runTaskVerify),
  entry(taskVerifyOkSpec, ({ getCtx }) => makeRunTaskVerifyOkHandler(getCtx)),
  entry(taskVerifyReworkSpec, ({ getCtx }) => makeRunTaskVerifyReworkHandler(getCtx)),
  entry(taskVerifyShowSpec, ({ getCtx }) => makeRunTaskVerifyShowHandler(getCtx)),

  entry(workStartSpec, ({ getCtx }) => makeRunWorkStartHandler(getCtx)),

  entry(recipesSpec, () => runRecipes),
  entry(recipesCacheSpec, () => runRecipesCache),
  entry(recipesListSpec, () => runRecipesList),
  entry(recipesListRemoteSpec, () => runRecipesListRemote),
  entry(recipesInfoSpec, () => runRecipesInfo),
  entry(recipesExplainSpec, () => runRecipesExplain),
  entry(recipesRemoveSpec, () => runRecipesRemove),
  entry(recipesCachePruneSpec, () => runRecipesCachePrune),
  entry(recipesInstallSpec, () => runRecipesInstall),

  entry(scenarioSpec, () => runScenario),
  entry(scenarioListSpec, () => runScenarioList),
  entry(scenarioInfoSpec, () => runScenarioInfo),
  entry(scenarioRunSpec, () => runScenarioRun),

  entry(branchBaseSpec, () => runBranchBase),
  entry(branchBaseGetSpec, () => runBranchBaseGet),
  entry(branchBaseSetSpec, () => runBranchBaseSet),
  entry(branchBaseClearSpec, () => runBranchBaseClear),
  entry(branchBaseExplainSpec, () => runBranchBaseExplain),
  entry(branchStatusSpec, () => runBranchStatus),
  entry(branchRemoveSpec, () => runBranchRemove),

  entry(backendSpec, ({ getCtx }) => makeRunBackendHandler(getCtx)),
  entry(backendSyncSpec, ({ getCtx }) => makeRunBackendSyncHandler(getCtx)),
  entry(syncSpec, ({ getCtx }) => makeRunSyncHandler(getCtx)),

  entry(prSpec, ({ getCtx }) => makeRunPrHandler(getCtx)),
  entry(prOpenSpec, ({ getCtx }) => makeRunPrOpenHandler(getCtx)),
  entry(prUpdateSpec, ({ getCtx }) => makeRunPrUpdateHandler(getCtx)),
  entry(prCheckSpec, ({ getCtx }) => makeRunPrCheckHandler(getCtx)),
  entry(prNoteSpec, ({ getCtx }) => makeRunPrNoteHandler(getCtx)),
  entry(integrateSpec, ({ getCtx }) => makeRunIntegrateHandler(getCtx)),

  entry(commitSpec, ({ getCtx }) => makeRunCommitHandler(getCtx)),
  entry(startSpec, ({ getCtx }) => makeRunStartHandler(getCtx)),
  entry(blockSpec, ({ getCtx }) => makeRunBlockHandler(getCtx)),
  entry(verifySpec, ({ getCtx }) => makeRunVerifyHandler(getCtx)),
  entry(finishSpec, ({ getCtx }) => makeRunFinishHandler(getCtx)),
  entry(readySpec, ({ getCtx }) => makeRunReadyHandler(getCtx)),

  entry(docsCliSpec, ({ getHelpJsonForDocs }) => makeRunDocsCliHandler(getHelpJsonForDocs)),

  entry(hooksSpec, () => runHooks),
  entry(hooksInstallSpec, () => runHooksInstall),
  entry(hooksUninstallSpec, () => runHooksUninstall),
  entry(hooksRunSpec, () => runHooksRun),

  entry(cleanupSpec, () => runCleanup),
  entry(cleanupMergedSpec, ({ getCtx }) => makeRunCleanupMergedHandler(getCtx)),

  entry(guardSpec, () => runGuard),
  entry(guardCleanSpec, () => runGuardClean),
  entry(guardSuggestAllowSpec, () => runGuardSuggestAllow),
  entry(guardCommitSpec, ({ getCtx }) => makeRunGuardCommitHandler(getCtx)),
] as const satisfies readonly CommandEntry[];
