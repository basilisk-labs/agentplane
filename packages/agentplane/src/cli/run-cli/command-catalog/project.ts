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

import { entry, type CommandEntry } from "./shared.js";

export const PROJECT_COMMANDS = [
  entry(workStartSpec, (deps) =>
    import("../../../commands/branch/work-start.command.js").then((m) =>
      m.makeRunWorkStartHandler(deps.getCtx),
    ),
  ),
  entry(
    recipesSpec,
    () => import("../../../commands/recipes/recipes.command.js").then((m) => m.runRecipes),
    {
      needs: "none",
    },
  ),
  entry(
    recipesCacheSpec,
    () => import("../../../commands/recipes/cache.command.js").then((m) => m.runRecipesCache),
    {
      needs: "none",
    },
  ),
  entry(recipesAddSpec, () =>
    import("../../../commands/recipes/add.command.js").then((m) => m.runRecipesAdd),
  ),
  entry(recipesActiveSpec, () =>
    import("../../../commands/recipes/active.command.js").then((m) => m.runRecipesActive),
  ),
  entry(
    recipesListSpec,
    () => import("../../../commands/recipes/list.command.js").then((m) => m.runRecipesList),
    {
      needs: "none",
    },
  ),
  entry(recipesListRemoteSpec, () =>
    import("../../../commands/recipes/list-remote.command.js").then((m) => m.runRecipesListRemote),
  ),
  entry(
    recipesInfoSpec,
    () => import("../../../commands/recipes/info.command.js").then((m) => m.runRecipesInfo),
    {
      needs: "none",
    },
  ),
  entry(recipesExplainSpec, () =>
    import("../../../commands/recipes/explain.command.js").then((m) => m.runRecipesExplain),
  ),
  entry(recipesExplainActiveSpec, () =>
    import("../../../commands/recipes/explain-active.command.js").then(
      (m) => m.runRecipesExplainActive,
    ),
  ),
  entry(recipesEnableSpec, () =>
    import("../../../commands/recipes/enable.command.js").then((m) => m.runRecipesEnable),
  ),
  entry(recipesDisableSpec, () =>
    import("../../../commands/recipes/disable.command.js").then((m) => m.runRecipesDisable),
  ),
  entry(recipesRemoveSpec, () =>
    import("../../../commands/recipes/remove.command.js").then((m) => m.runRecipesRemove),
  ),
  entry(recipesUpdateSpec, () =>
    import("../../../commands/recipes/update.command.js").then((m) => m.runRecipesUpdate),
  ),
  entry(recipesDetachSpec, () =>
    import("../../../commands/recipes/detach.command.js").then((m) => m.runRecipesDetach),
  ),
  entry(recipesCachePruneSpec, () =>
    import("../../../commands/recipes/cache-prune.command.js").then((m) => m.runRecipesCachePrune),
  ),
  entry(
    recipesInstallSpec,
    () => import("../../../commands/recipes/install.run.js").then((m) => m.runRecipesInstall),
    {
      needs: "none",
    },
  ),
  entry(
    branchBaseSpec,
    () => import("../../../commands/branch/base.command.js").then((m) => m.runBranchBase),
    {
      needs: "none",
    },
  ),
  entry(branchBaseGetSpec, () =>
    import("../../../commands/branch/base.command.js").then((m) => m.runBranchBaseGet),
  ),
  entry(branchBaseSetSpec, () =>
    import("../../../commands/branch/base.command.js").then((m) => m.runBranchBaseSet),
  ),
  entry(branchBaseClearSpec, () =>
    import("../../../commands/branch/base.command.js").then((m) => m.runBranchBaseClear),
  ),
  entry(branchBaseExplainSpec, () =>
    import("../../../commands/branch/base.command.js").then((m) => m.runBranchBaseExplain),
  ),
  entry(branchStatusSpec, () =>
    import("../../../commands/branch/status.command.js").then((m) => m.runBranchStatus),
  ),
  entry(branchRemoveSpec, () =>
    import("../../../commands/branch/remove.command.js").then((m) => m.runBranchRemove),
  ),
  entry(
    backendSpec,
    (deps) =>
      import("../../../commands/backend/sync.command.js").then((m) =>
        m.makeRunBackendHandler(deps.getCtx),
      ),
    {
      needs: "none",
    },
  ),
  entry(backendSyncSpec, (deps) =>
    import("../../../commands/backend/sync.command.js").then((m) =>
      m.makeRunBackendSyncHandler(deps.getCtx),
    ),
  ),
  entry(backendInspectSpec, (deps) =>
    import("../../../commands/backend/sync.command.js").then((m) =>
      m.makeRunBackendInspectHandler(deps.getCtx),
    ),
  ),
  entry(backendMigrateCanonicalStateSpec, (deps) =>
    import("../../../commands/backend/sync.command.js").then((m) =>
      m.makeRunBackendMigrateCanonicalStateHandler(deps.getCtx),
    ),
  ),
  entry(syncSpec, (deps) =>
    import("../../../commands/sync.command.js").then((m) => m.makeRunSyncHandler(deps.getCtx)),
  ),
  entry(
    prSpec,
    (deps) =>
      import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrHandler(deps.getCtx)),
    {
      needs: "none",
    },
  ),
  entry(prOpenSpec, (deps) =>
    import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrOpenHandler(deps.getCtx)),
  ),
  entry(prUpdateSpec, (deps) =>
    import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrUpdateHandler(deps.getCtx)),
  ),
  entry(prCheckSpec, (deps) =>
    import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrCheckHandler(deps.getCtx)),
  ),
  entry(prCloseSpec, (deps) =>
    import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrCloseHandler(deps.getCtx)),
  ),
  entry(prCloseSupersededSpec, (deps) =>
    import("../../../commands/pr/pr.command.js").then((m) =>
      m.makeRunPrCloseSupersededHandler(deps.getCtx),
    ),
  ),
  entry(prNoteSpec, (deps) =>
    import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrNoteHandler(deps.getCtx)),
  ),
  entry(integrateSpec, (deps) =>
    import("../../../commands/integrate.command.js").then((m) =>
      m.makeRunIntegrateHandler(deps.getCtx),
    ),
  ),
] as const satisfies readonly CommandEntry[];
