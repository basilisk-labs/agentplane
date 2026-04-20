import { syncSpec } from "../../../commands/sync.command.js";
import {
  backendInspectSpec,
  backendMigrateCanonicalStateSpec,
  backendSpec,
  backendSyncSpec,
} from "../../../commands/backend/sync.command.js";
import {
  branchBaseClearSpec,
  branchBaseExplainSpec,
  branchBaseGetSpec,
  branchBaseSetSpec,
  branchBaseSpec,
} from "../../../commands/branch/base.command.js";
import { branchRemoveSpec } from "../../../commands/branch/remove.command.js";
import { branchStatusSpec } from "../../../commands/branch/status.command.js";
import { workStartSpec } from "../../../commands/branch/work-start.command.js";
import { integrateSpec } from "../../../commands/integrate.command.js";
import {
  prCheckSpec,
  prCloseSpec,
  prCloseSupersededSpec,
  prNoteSpec,
  prOpenSpec,
  prSpec,
  prUpdateSpec,
} from "../../../commands/pr/pr.command.js";
import { recipesAddSpec } from "../../../commands/recipes/add.command.js";
import { recipesActiveSpec } from "../../../commands/recipes/active.command.js";
import { recipesCachePruneSpec } from "../../../commands/recipes/cache-prune.command.js";
import { recipesCacheSpec } from "../../../commands/recipes/cache.command.js";
import { recipesDetachSpec } from "../../../commands/recipes/detach.command.js";
import { recipesDisableSpec } from "../../../commands/recipes/disable.command.js";
import { recipesExplainSpec } from "../../../commands/recipes/explain.command.js";
import { recipesExplainActiveSpec } from "../../../commands/recipes/explain-active.command.js";
import { recipesEnableSpec } from "../../../commands/recipes/enable.command.js";
import { recipesInfoSpec } from "../../../commands/recipes/info.command.js";
import { recipesInstallSpec } from "../../../commands/recipes/install.spec.js";
import { recipesListRemoteSpec } from "../../../commands/recipes/list-remote.command.js";
import { recipesListSpec } from "../../../commands/recipes/list.command.js";
import { recipesRemoveSpec } from "../../../commands/recipes/remove.command.js";
import { recipesSpec } from "../../../commands/recipes/recipes.command.js";
import { recipesUpdateSpec } from "../../../commands/recipes/update.command.js";

import { commandModule, declareCommand, type CommandEntry } from "./shared.js";

const fromCommandsRecipesRecipesCommand = commandModule(
  () => import("../../../commands/recipes/recipes.command.js"),
);
const fromCommandsRecipesCacheCommand = commandModule(
  () => import("../../../commands/recipes/cache.command.js"),
);
const fromCommandsRecipesAddCommand = commandModule(
  () => import("../../../commands/recipes/add.command.js"),
);
const fromCommandsRecipesListCommand = commandModule(
  () => import("../../../commands/recipes/list.command.js"),
);
const fromCommandsRecipesListRemoteCommand = commandModule(
  () => import("../../../commands/recipes/list-remote.command.js"),
);
const fromCommandsRecipesExplainCommand = commandModule(
  () => import("../../../commands/recipes/explain.command.js"),
);
const fromCommandsRecipesEnableCommand = commandModule(
  () => import("../../../commands/recipes/enable.command.js"),
);
const fromCommandsRecipesRemoveCommand = commandModule(
  () => import("../../../commands/recipes/remove.command.js"),
);
const fromCommandsRecipesDetachCommand = commandModule(
  () => import("../../../commands/recipes/detach.command.js"),
);
const fromCommandsRecipesInstallRun = commandModule(
  () => import("../../../commands/recipes/install.run.js"),
);
const fromCommandsBranchBaseCommand = commandModule(
  () => import("../../../commands/branch/base.command.js"),
);
const fromCommandsBranchStatusCommand = commandModule(
  () => import("../../../commands/branch/status.command.js"),
);

export const PROJECT_COMMANDS = [
  declareCommand(workStartSpec, {
    load: (deps) =>
      import("../../../commands/branch/work-start.command.js").then((m) =>
        m.makeRunWorkStartHandler(deps.getCtx),
      ),
  }),
  fromCommandsRecipesRecipesCommand(recipesSpec, "runRecipes", { needs: "none" }),
  fromCommandsRecipesCacheCommand(recipesCacheSpec, "runRecipesCache", { needs: "none" }),
  fromCommandsRecipesAddCommand(recipesAddSpec, "runRecipesAdd", {}),
  declareCommand(recipesActiveSpec, {
    module: () => import("../../../commands/recipes/active.command.js"),
    runExport: "runRecipesActive",
  }),
  fromCommandsRecipesListCommand(recipesListSpec, "runRecipesList", { needs: "none" }),
  fromCommandsRecipesListRemoteCommand(recipesListRemoteSpec, "runRecipesListRemote", {}),
  declareCommand(recipesInfoSpec, {
    module: () => import("../../../commands/recipes/info.command.js"),
    runExport: "runRecipesInfo",
    needs: "none",
  }),
  fromCommandsRecipesExplainCommand(recipesExplainSpec, "runRecipesExplain", {}),
  declareCommand(recipesExplainActiveSpec, {
    load: () =>
      import("../../../commands/recipes/explain-active.command.js").then(
        (m) => m.runRecipesExplainActive,
      ),
  }),
  fromCommandsRecipesEnableCommand(recipesEnableSpec, "runRecipesEnable", {}),
  declareCommand(recipesDisableSpec, {
    module: () => import("../../../commands/recipes/disable.command.js"),
    runExport: "runRecipesDisable",
  }),
  fromCommandsRecipesRemoveCommand(recipesRemoveSpec, "runRecipesRemove", {}),
  declareCommand(recipesUpdateSpec, {
    module: () => import("../../../commands/recipes/update.command.js"),
    runExport: "runRecipesUpdate",
  }),
  fromCommandsRecipesDetachCommand(recipesDetachSpec, "runRecipesDetach", {}),
  declareCommand(recipesCachePruneSpec, {
    module: () => import("../../../commands/recipes/cache-prune.command.js"),
    runExport: "runRecipesCachePrune",
  }),
  fromCommandsRecipesInstallRun(recipesInstallSpec, "runRecipesInstall", { needs: "none" }),
  fromCommandsBranchBaseCommand(branchBaseSpec, "runBranchBase", { needs: "none" }),
  fromCommandsBranchBaseCommand(branchBaseGetSpec, "runBranchBaseGet", {}),
  declareCommand(branchBaseSetSpec, {
    module: () => import("../../../commands/branch/base.command.js"),
    runExport: "runBranchBaseSet",
  }),
  fromCommandsBranchBaseCommand(branchBaseClearSpec, "runBranchBaseClear", {}),
  declareCommand(branchBaseExplainSpec, {
    module: () => import("../../../commands/branch/base.command.js"),
    runExport: "runBranchBaseExplain",
  }),
  fromCommandsBranchStatusCommand(branchStatusSpec, "runBranchStatus", {}),
  declareCommand(branchRemoveSpec, {
    module: () => import("../../../commands/branch/remove.command.js"),
    runExport: "runBranchRemove",
  }),
  declareCommand(backendSpec, {
    load: (deps) =>
      import("../../../commands/backend/sync.command.js").then((m) =>
        m.makeRunBackendHandler(deps.getCtx),
      ),
    needs: "none",
  }),
  declareCommand(backendSyncSpec, {
    load: (deps) =>
      import("../../../commands/backend/sync.command.js").then((m) =>
        m.makeRunBackendSyncHandler(deps.getCtx),
      ),
  }),
  declareCommand(backendInspectSpec, {
    load: (deps) =>
      import("../../../commands/backend/sync.command.js").then((m) =>
        m.makeRunBackendInspectHandler(deps.getCtx),
      ),
  }),
  declareCommand(backendMigrateCanonicalStateSpec, {
    load: (deps) =>
      import("../../../commands/backend/sync.command.js").then((m) =>
        m.makeRunBackendMigrateCanonicalStateHandler(deps.getCtx),
      ),
  }),
  declareCommand(syncSpec, {
    load: (deps) =>
      import("../../../commands/sync.command.js").then((m) => m.makeRunSyncHandler(deps.getCtx)),
  }),
  declareCommand(prSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrHandler(deps.getCtx)),
    needs: "none",
  }),
  declareCommand(prOpenSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrOpenHandler(deps.getCtx)),
  }),
  declareCommand(prUpdateSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) =>
        m.makeRunPrUpdateHandler(deps.getCtx),
      ),
  }),
  declareCommand(prCheckSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) =>
        m.makeRunPrCheckHandler(deps.getCtx),
      ),
  }),
  declareCommand(prCloseSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) =>
        m.makeRunPrCloseHandler(deps.getCtx),
      ),
  }),
  declareCommand(prCloseSupersededSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) =>
        m.makeRunPrCloseSupersededHandler(deps.getCtx),
      ),
  }),
  declareCommand(prNoteSpec, {
    load: (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrNoteHandler(deps.getCtx)),
  }),
  declareCommand(integrateSpec, {
    load: (deps) =>
      import("../../../commands/integrate.command.js").then((m) =>
        m.makeRunIntegrateHandler(deps.getCtx),
      ),
  }),
] as const satisfies readonly CommandEntry[];
