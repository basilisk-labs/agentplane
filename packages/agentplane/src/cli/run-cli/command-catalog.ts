import type { CommandHandler, CommandSpec } from "../spec/spec.js";
import type { HelpJson } from "../spec/help-render.js";

import { initSpec } from "./commands/init.js";
import { agentsSpec, quickstartSpec, roleSpec } from "./commands/core.js";
import { configSetSpec, configShowSpec, modeGetSpec, modeSetSpec } from "./commands/config.js";
import { ideSyncSpec } from "./commands/ide.js";

import { taskNewSpec } from "../../commands/task/new.spec.js";
import { taskListSpec } from "../../commands/task/list.command.js";
import { taskNextSpec } from "../../commands/task/next.command.js";
import { taskSearchSpec } from "../../commands/task/search.command.js";
import { taskShowSpec } from "../../commands/task/show.command.js";
import { taskAddSpec } from "../../commands/task/add.command.js";
import { taskUpdateSpec } from "../../commands/task/update.command.js";
import { taskCommentSpec } from "../../commands/task/comment.command.js";
import { taskSetStatusSpec } from "../../commands/task/set-status.command.js";
import { taskDocSpec } from "../../commands/task/doc.command.js";
import { taskDocShowSpec } from "../../commands/task/doc-show.command.js";
import { taskDocSetSpec } from "../../commands/task/doc-set.command.js";
import { taskScrubSpec } from "../../commands/task/scrub.command.js";
import { taskScaffoldSpec } from "../../commands/task/scaffold.command.js";
import { taskNormalizeSpec } from "../../commands/task/normalize.command.js";
import { taskExportSpec } from "../../commands/task/export.command.js";
import { taskLintSpec } from "../../commands/task/lint.command.js";
import { taskMigrateSpec } from "../../commands/task/migrate.command.js";
import { taskMigrateDocSpec } from "../../commands/task/migrate-doc.command.js";
import { taskDeriveSpec } from "../../commands/task/derive.command.js";
import { taskPlanSetSpec } from "../../commands/task/plan-set.command.js";
import { taskPlanApproveSpec } from "../../commands/task/plan-approve.command.js";
import { taskPlanRejectSpec } from "../../commands/task/plan-reject.command.js";
import { taskVerifySpec } from "../../commands/task/verify.command.js";
import { taskVerifyOkSpec } from "../../commands/task/verify-ok.command.js";
import { taskVerifyReworkSpec } from "../../commands/task/verify-rework.command.js";
import { taskVerifyShowSpec } from "../../commands/task/verify-show.command.js";

import { workStartSpec } from "../../commands/branch/work-start.command.js";
import {
  branchBaseClearSpec,
  branchBaseExplainSpec,
  branchBaseGetSpec,
  branchBaseSetSpec,
  branchBaseSpec,
} from "../../commands/branch/base.command.js";
import { branchStatusSpec } from "../../commands/branch/status.command.js";
import { branchRemoveSpec } from "../../commands/branch/remove.command.js";

import { recipesInstallSpec } from "../../commands/recipes/install.command.js";
import { recipesListSpec } from "../../commands/recipes/list.command.js";
import { recipesListRemoteSpec } from "../../commands/recipes/list-remote.command.js";
import { recipesInfoSpec } from "../../commands/recipes/info.command.js";
import { recipesExplainSpec } from "../../commands/recipes/explain.command.js";
import { recipesRemoveSpec } from "../../commands/recipes/remove.command.js";
import { recipesCachePruneSpec } from "../../commands/recipes/cache-prune.command.js";
import { recipesSpec } from "../../commands/recipes/recipes.command.js";
import { recipesCacheSpec } from "../../commands/recipes/cache.command.js";

import { upgradeSpec } from "../../commands/upgrade.command.js";
import { backendSpec, backendSyncSpec } from "../../commands/backend/sync.command.js";
import { syncSpec } from "../../commands/sync.command.js";

import { scenarioListSpec } from "../../commands/scenario/list.command.js";
import { scenarioInfoSpec } from "../../commands/scenario/info.command.js";
import { scenarioRunSpec } from "../../commands/scenario/run.command.js";
import { scenarioSpec } from "../../commands/scenario/scenario.command.js";

import {
  prCheckSpec,
  prNoteSpec,
  prOpenSpec,
  prSpec,
  prUpdateSpec,
} from "../../commands/pr/pr.command.js";
import { integrateSpec } from "../../commands/integrate.command.js";

import { commitSpec } from "../../commands/commit.spec.js";
import { startSpec } from "../../commands/start.command.js";
import { blockSpec } from "../../commands/block.command.js";
import { verifySpec } from "../../commands/verify.command.js";
import { finishSpec } from "../../commands/finish.command.js";
import { readySpec } from "../../commands/ready.command.js";

import { docsCliSpec } from "../../commands/docs/cli.command.js";
import { hooksSpec } from "../../commands/hooks/hooks.command.js";
import { hooksInstallSpec } from "../../commands/hooks/install.command.js";
import { hooksUninstallSpec } from "../../commands/hooks/uninstall.command.js";
import { hooksRunSpec } from "../../commands/hooks/run.command.js";
import { cleanupMergedSpec, cleanupSpec } from "../../commands/cleanup/merged.command.js";
import { guardSpec } from "../../commands/guard/guard.command.js";
import { guardCleanSpec } from "../../commands/guard/clean.command.js";
import { guardSuggestAllowSpec } from "../../commands/guard/suggest-allow.command.js";
import { guardCommitSpec } from "../../commands/guard/commit.command.js";

import type { CommandContext } from "../../commands/shared/task-backend.js";

export type RunDeps = {
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>;
  getHelpJsonForDocs: () => readonly HelpJson[];
};

export type CommandEntry = {
  spec: CommandSpec<unknown>;
  load: (deps: RunDeps) => Promise<CommandHandler<unknown>>;
  needsProject: boolean;
  needsConfig: boolean;
  needsTaskContext: boolean;
};

function entry<TParsed>(
  spec: CommandSpec<TParsed>,
  load: (deps: RunDeps) => Promise<CommandHandler<TParsed>>,
  meta?: Partial<Pick<CommandEntry, "needsProject" | "needsConfig" | "needsTaskContext">>,
): CommandEntry {
  return {
    spec: spec as CommandSpec<unknown>,
    load: (deps) => load(deps) as Promise<CommandHandler<unknown>>,
    needsProject: meta?.needsProject ?? true,
    needsConfig: meta?.needsConfig ?? meta?.needsProject ?? true,
    needsTaskContext: meta?.needsTaskContext ?? true,
  };
}

export const COMMANDS = [
  entry(initSpec, () => import("./commands/init.js").then((m) => m.runInit), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(upgradeSpec, () => import("../../commands/upgrade.command.js").then((m) => m.runUpgrade), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(quickstartSpec, () => import("./commands/core.js").then((m) => m.runQuickstart), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(roleSpec, () => import("./commands/core.js").then((m) => m.runRole), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(agentsSpec, () => import("./commands/core.js").then((m) => m.runAgents), {
    needsProject: true,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(configShowSpec, () => import("./commands/config.js").then((m) => m.runConfigShow), {
    needsProject: true,
    needsConfig: true,
    needsTaskContext: false,
  }),
  entry(configSetSpec, () => import("./commands/config.js").then((m) => m.runConfigSet), {
    needsProject: true,
    needsConfig: true,
    needsTaskContext: false,
  }),
  entry(modeGetSpec, () => import("./commands/config.js").then((m) => m.runModeGet), {
    needsProject: true,
    needsConfig: true,
    needsTaskContext: false,
  }),
  entry(modeSetSpec, () => import("./commands/config.js").then((m) => m.runModeSet), {
    needsProject: true,
    needsConfig: true,
    needsTaskContext: false,
  }),
  entry(ideSyncSpec, () => import("./commands/ide.js").then((m) => m.runIdeSync), {
    needsProject: true,
    needsConfig: true,
    needsTaskContext: false,
  }),

  entry(taskListSpec, (deps) =>
    import("../../commands/task/list.command.js").then((m) =>
      m.makeRunTaskListHandler(deps.getCtx),
    ),
  ),
  entry(taskNextSpec, (deps) =>
    import("../../commands/task/next.command.js").then((m) =>
      m.makeRunTaskNextHandler(deps.getCtx),
    ),
  ),
  entry(taskSearchSpec, (deps) =>
    import("../../commands/task/search.command.js").then((m) =>
      m.makeRunTaskSearchHandler(deps.getCtx),
    ),
  ),
  entry(taskShowSpec, (deps) =>
    import("../../commands/task/show.command.js").then((m) =>
      m.makeRunTaskShowHandler(deps.getCtx),
    ),
  ),
  entry(taskNewSpec, (deps) =>
    import("../../commands/task/new.command.js").then((m) => m.makeRunTaskNewHandler(deps.getCtx)),
  ),
  entry(taskDeriveSpec, (deps) =>
    import("../../commands/task/derive.command.js").then((m) =>
      m.makeRunTaskDeriveHandler(deps.getCtx),
    ),
  ),
  entry(taskAddSpec, (deps) =>
    import("../../commands/task/add.command.js").then((m) => m.makeRunTaskAddHandler(deps.getCtx)),
  ),
  entry(taskUpdateSpec, (deps) =>
    import("../../commands/task/update.command.js").then((m) =>
      m.makeRunTaskUpdateHandler(deps.getCtx),
    ),
  ),
  entry(taskCommentSpec, (deps) =>
    import("../../commands/task/comment.command.js").then((m) =>
      m.makeRunTaskCommentHandler(deps.getCtx),
    ),
  ),
  entry(taskSetStatusSpec, (deps) =>
    import("../../commands/task/set-status.command.js").then((m) =>
      m.makeRunTaskSetStatusHandler(deps.getCtx),
    ),
  ),
  entry(taskDocSpec, () => import("../../commands/task/doc.command.js").then((m) => m.runTaskDoc)),
  entry(taskDocShowSpec, (deps) =>
    import("../../commands/task/doc-show.command.js").then((m) =>
      m.makeRunTaskDocShowHandler(deps.getCtx),
    ),
  ),
  entry(taskDocSetSpec, (deps) =>
    import("../../commands/task/doc-set.command.js").then((m) =>
      m.makeRunTaskDocSetHandler(deps.getCtx),
    ),
  ),
  entry(taskScrubSpec, (deps) =>
    import("../../commands/task/scrub.command.js").then((m) =>
      m.makeRunTaskScrubHandler(deps.getCtx),
    ),
  ),
  entry(taskScaffoldSpec, (deps) =>
    import("../../commands/task/scaffold.command.js").then((m) =>
      m.makeRunTaskScaffoldHandler(deps.getCtx),
    ),
  ),
  entry(taskNormalizeSpec, (deps) =>
    import("../../commands/task/normalize.command.js").then((m) =>
      m.makeRunTaskNormalizeHandler(deps.getCtx),
    ),
  ),
  entry(taskExportSpec, (deps) =>
    import("../../commands/task/export.command.js").then((m) =>
      m.makeRunTaskExportHandler(deps.getCtx),
    ),
  ),
  entry(taskLintSpec, () =>
    import("../../commands/task/lint.command.js").then((m) => m.runTaskLint),
  ),
  entry(taskMigrateSpec, (deps) =>
    import("../../commands/task/migrate.command.js").then((m) =>
      m.makeRunTaskMigrateHandler(deps.getCtx),
    ),
  ),
  entry(taskMigrateDocSpec, () =>
    import("../../commands/task/migrate-doc.command.js").then((m) => m.runTaskMigrateDoc),
  ),
  entry(taskPlanSetSpec, (deps) =>
    import("../../commands/task/plan-set.command.js").then((m) =>
      m.makeRunTaskPlanSetHandler(deps.getCtx),
    ),
  ),
  entry(taskPlanApproveSpec, (deps) =>
    import("../../commands/task/plan-approve.command.js").then((m) =>
      m.makeRunTaskPlanApproveHandler(deps.getCtx),
    ),
  ),
  entry(taskPlanRejectSpec, (deps) =>
    import("../../commands/task/plan-reject.command.js").then((m) =>
      m.makeRunTaskPlanRejectHandler(deps.getCtx),
    ),
  ),
  entry(taskVerifySpec, () =>
    import("../../commands/task/verify.command.js").then((m) => m.runTaskVerify),
  ),
  entry(taskVerifyOkSpec, (deps) =>
    import("../../commands/task/verify-ok.command.js").then((m) =>
      m.makeRunTaskVerifyOkHandler(deps.getCtx),
    ),
  ),
  entry(taskVerifyReworkSpec, (deps) =>
    import("../../commands/task/verify-rework.command.js").then((m) =>
      m.makeRunTaskVerifyReworkHandler(deps.getCtx),
    ),
  ),
  entry(taskVerifyShowSpec, (deps) =>
    import("../../commands/task/verify-show.command.js").then((m) =>
      m.makeRunTaskVerifyShowHandler(deps.getCtx),
    ),
  ),

  entry(workStartSpec, (deps) =>
    import("../../commands/branch/work-start.command.js").then((m) =>
      m.makeRunWorkStartHandler(deps.getCtx),
    ),
  ),

  entry(recipesSpec, () =>
    import("../../commands/recipes/recipes.command.js").then((m) => m.runRecipes),
  ),
  entry(recipesCacheSpec, () =>
    import("../../commands/recipes/cache.command.js").then((m) => m.runRecipesCache),
  ),
  entry(recipesListSpec, () =>
    import("../../commands/recipes/list.command.js").then((m) => m.runRecipesList),
  ),
  entry(recipesListRemoteSpec, () =>
    import("../../commands/recipes/list-remote.command.js").then((m) => m.runRecipesListRemote),
  ),
  entry(recipesInfoSpec, () =>
    import("../../commands/recipes/info.command.js").then((m) => m.runRecipesInfo),
  ),
  entry(recipesExplainSpec, () =>
    import("../../commands/recipes/explain.command.js").then((m) => m.runRecipesExplain),
  ),
  entry(recipesRemoveSpec, () =>
    import("../../commands/recipes/remove.command.js").then((m) => m.runRecipesRemove),
  ),
  entry(recipesCachePruneSpec, () =>
    import("../../commands/recipes/cache-prune.command.js").then((m) => m.runRecipesCachePrune),
  ),
  entry(recipesInstallSpec, () =>
    import("../../commands/recipes/install.command.js").then((m) => m.runRecipesInstall),
  ),

  entry(scenarioSpec, () =>
    import("../../commands/scenario/scenario.command.js").then((m) => m.runScenario),
  ),
  entry(scenarioListSpec, () =>
    import("../../commands/scenario/list.command.js").then((m) => m.runScenarioList),
  ),
  entry(scenarioInfoSpec, () =>
    import("../../commands/scenario/info.command.js").then((m) => m.runScenarioInfo),
  ),
  entry(scenarioRunSpec, () =>
    import("../../commands/scenario/run.command.js").then((m) => m.runScenarioRun),
  ),

  entry(branchBaseSpec, () =>
    import("../../commands/branch/base.command.js").then((m) => m.runBranchBase),
  ),
  entry(branchBaseGetSpec, () =>
    import("../../commands/branch/base.command.js").then((m) => m.runBranchBaseGet),
  ),
  entry(branchBaseSetSpec, () =>
    import("../../commands/branch/base.command.js").then((m) => m.runBranchBaseSet),
  ),
  entry(branchBaseClearSpec, () =>
    import("../../commands/branch/base.command.js").then((m) => m.runBranchBaseClear),
  ),
  entry(branchBaseExplainSpec, () =>
    import("../../commands/branch/base.command.js").then((m) => m.runBranchBaseExplain),
  ),
  entry(branchStatusSpec, () =>
    import("../../commands/branch/status.command.js").then((m) => m.runBranchStatus),
  ),
  entry(branchRemoveSpec, () =>
    import("../../commands/branch/remove.command.js").then((m) => m.runBranchRemove),
  ),

  entry(backendSpec, (deps) =>
    import("../../commands/backend/sync.command.js").then((m) =>
      m.makeRunBackendHandler(deps.getCtx),
    ),
  ),
  entry(backendSyncSpec, (deps) =>
    import("../../commands/backend/sync.command.js").then((m) =>
      m.makeRunBackendSyncHandler(deps.getCtx),
    ),
  ),
  entry(syncSpec, (deps) =>
    import("../../commands/sync.command.js").then((m) => m.makeRunSyncHandler(deps.getCtx)),
  ),

  entry(prSpec, (deps) =>
    import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrHandler(deps.getCtx)),
  ),
  entry(prOpenSpec, (deps) =>
    import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrOpenHandler(deps.getCtx)),
  ),
  entry(prUpdateSpec, (deps) =>
    import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrUpdateHandler(deps.getCtx)),
  ),
  entry(prCheckSpec, (deps) =>
    import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrCheckHandler(deps.getCtx)),
  ),
  entry(prNoteSpec, (deps) =>
    import("../../commands/pr/pr.command.js").then((m) => m.makeRunPrNoteHandler(deps.getCtx)),
  ),
  entry(integrateSpec, (deps) =>
    import("../../commands/integrate.command.js").then((m) =>
      m.makeRunIntegrateHandler(deps.getCtx),
    ),
  ),

  entry(commitSpec, (deps) =>
    import("../../commands/commit.command.js").then((m) => m.makeRunCommitHandler(deps.getCtx)),
  ),
  entry(startSpec, (deps) =>
    import("../../commands/start.command.js").then((m) => m.makeRunStartHandler(deps.getCtx)),
  ),
  entry(blockSpec, (deps) =>
    import("../../commands/block.command.js").then((m) => m.makeRunBlockHandler(deps.getCtx)),
  ),
  entry(verifySpec, (deps) =>
    import("../../commands/verify.command.js").then((m) => m.makeRunVerifyHandler(deps.getCtx)),
  ),
  entry(finishSpec, (deps) =>
    import("../../commands/finish.command.js").then((m) => m.makeRunFinishHandler(deps.getCtx)),
  ),
  entry(readySpec, (deps) =>
    import("../../commands/ready.command.js").then((m) => m.makeRunReadyHandler(deps.getCtx)),
  ),

  entry(docsCliSpec, (deps) =>
    import("../../commands/docs/cli.command.js").then((m) =>
      m.makeRunDocsCliHandler(deps.getHelpJsonForDocs),
    ),
  ),

  entry(hooksSpec, () => import("../../commands/hooks/hooks.command.js").then((m) => m.runHooks)),
  entry(hooksInstallSpec, () =>
    import("../../commands/hooks/install.command.js").then((m) => m.runHooksInstall),
  ),
  entry(hooksUninstallSpec, () =>
    import("../../commands/hooks/uninstall.command.js").then((m) => m.runHooksUninstall),
  ),
  entry(hooksRunSpec, () =>
    import("../../commands/hooks/run.command.js").then((m) => m.runHooksRun),
  ),

  entry(cleanupSpec, () =>
    import("../../commands/cleanup/merged.command.js").then((m) => m.runCleanup),
  ),
  entry(cleanupMergedSpec, (deps) =>
    import("../../commands/cleanup/merged.command.js").then((m) =>
      m.makeRunCleanupMergedHandler(deps.getCtx),
    ),
  ),

  entry(guardSpec, () => import("../../commands/guard/guard.command.js").then((m) => m.runGuard)),
  entry(guardCleanSpec, () =>
    import("../../commands/guard/clean.command.js").then((m) => m.runGuardClean),
  ),
  entry(guardSuggestAllowSpec, () =>
    import("../../commands/guard/suggest-allow.command.js").then((m) => m.runGuardSuggestAllow),
  ),
  entry(guardCommitSpec, (deps) =>
    import("../../commands/guard/commit.command.js").then((m) =>
      m.makeRunGuardCommitHandler(deps.getCtx),
    ),
  ),
] as const satisfies readonly CommandEntry[];
