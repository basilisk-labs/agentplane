import { syncSpec } from "../../../commands/sync.command.js";
import {
  acrCheckSpec,
  acrExplainSpec,
  acrGenerateSpec,
  acrSchemaSpec,
  acrSpec,
  acrValidateSpec,
} from "../../../commands/acr/acr.command.js";
import {
  blueprintDriftSpec,
  blueprintExplainSpec,
  blueprintListSpec,
  blueprintReportSpec,
  blueprintSnapshotSpec,
  blueprintScaffoldSpec,
  blueprintSpec,
  blueprintValidateSpec,
} from "../../../commands/blueprint/blueprint.command.js";
import {
  backendInspectSpec,
  backendConnectSpec,
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
import { integrateSpec } from "../../../commands/integrate.spec.js";
import {
  prCheckSpec,
  prCloseSpec,
  prCloseSupersededSpec,
  prNoteSpec,
  prOpenSpec,
  prSpec,
  prUpdateSpec,
} from "../../../commands/pr/pr.spec.js";
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

import { declareCommand, type CommandEntry } from "./kernel.js";
import {
  fromCommandsRecipesRecipesCommand,
  fromCommandsRecipesCacheCommand,
  fromCommandsRecipesAddCommand,
  fromCommandsRecipesListCommand,
  fromCommandsRecipesListRemoteCommand,
  fromCommandsRecipesExplainCommand,
  fromCommandsRecipesEnableCommand,
  fromCommandsRecipesRemoveCommand,
  fromCommandsRecipesDetachCommand,
  fromCommandsRecipesInstallRun,
  fromCommandsBranchBaseCommand,
  fromCommandsBranchStatusCommand,
  loadWorkStartSpec,
  fromRecipesActiveSpec,
  fromRecipesInfoSpec,
  loadRecipesExplainActiveSpec,
  fromRecipesDisableSpec,
  fromRecipesUpdateSpec,
  fromRecipesCachePruneSpec,
  fromBranchBaseSetSpec,
  fromBranchBaseExplainSpec,
  fromBranchRemoveSpec,
  loadBackendSpec,
  loadBackendSyncSpec,
  loadBackendInspectSpec,
  loadBackendConnectSpec,
  loadBackendMigrateCanonicalStateSpec,
  loadSyncSpec,
  loadPrSpec,
  loadPrOpenSpec,
  loadPrUpdateSpec,
  loadPrCheckSpec,
  loadPrCloseSpec,
  loadPrCloseSupersededSpec,
  loadPrNoteSpec,
  loadIntegrateSpec,
  loadAcrSpec,
  loadAcrSchemaSpec,
  loadAcrGenerateSpec,
  loadAcrValidateSpec,
  loadAcrCheckSpec,
  loadAcrExplainSpec,
  loadBlueprintSpec,
  loadBlueprintListSpec,
  loadBlueprintDriftSpec,
  loadBlueprintExplainSpec,
  loadBlueprintSnapshotSpec,
  loadBlueprintReportSpec,
  loadBlueprintValidateSpec,
  loadBlueprintScaffoldSpec,
} from "../command-loaders/project.js";

export const PROJECT_COMMANDS = [
  declareCommand(acrSpec, { load: loadAcrSpec, needs: "none" }),
  declareCommand(acrSchemaSpec, { load: loadAcrSchemaSpec, needs: "none" }),
  declareCommand(acrGenerateSpec, { load: loadAcrGenerateSpec }),
  declareCommand(acrValidateSpec, { load: loadAcrValidateSpec }),
  declareCommand(acrCheckSpec, { load: loadAcrCheckSpec }),
  declareCommand(acrExplainSpec, { load: loadAcrExplainSpec }),
  declareCommand(blueprintSpec, { load: loadBlueprintSpec, needs: "none" }),
  declareCommand(blueprintListSpec, { load: loadBlueprintListSpec, needs: "none" }),
  declareCommand(blueprintExplainSpec, { load: loadBlueprintExplainSpec }),
  declareCommand(blueprintSnapshotSpec, { load: loadBlueprintSnapshotSpec }),
  declareCommand(blueprintDriftSpec, { load: loadBlueprintDriftSpec }),
  declareCommand(blueprintReportSpec, { load: loadBlueprintReportSpec, needs: "none" }),
  declareCommand(blueprintScaffoldSpec, { load: loadBlueprintScaffoldSpec, needs: "none" }),
  declareCommand(blueprintValidateSpec, { load: loadBlueprintValidateSpec, needs: "none" }),
  declareCommand(workStartSpec, { load: loadWorkStartSpec }),
  fromCommandsRecipesRecipesCommand(recipesSpec, "runRecipes", { needs: "none" }),
  fromCommandsRecipesCacheCommand(recipesCacheSpec, "runRecipesCache", { needs: "none" }),
  fromCommandsRecipesAddCommand(recipesAddSpec, "runRecipesAdd", {}),
  fromRecipesActiveSpec(recipesActiveSpec, "runRecipesActive"),
  fromCommandsRecipesListCommand(recipesListSpec, "runRecipesList", { needs: "none" }),
  fromCommandsRecipesListRemoteCommand(recipesListRemoteSpec, "runRecipesListRemote", {}),
  fromRecipesInfoSpec(recipesInfoSpec, "runRecipesInfo", { needs: "none" }),
  fromCommandsRecipesExplainCommand(recipesExplainSpec, "runRecipesExplain", {}),
  declareCommand(recipesExplainActiveSpec, { load: loadRecipesExplainActiveSpec }),
  fromCommandsRecipesEnableCommand(recipesEnableSpec, "runRecipesEnable", {}),
  fromRecipesDisableSpec(recipesDisableSpec, "runRecipesDisable"),
  fromCommandsRecipesRemoveCommand(recipesRemoveSpec, "runRecipesRemove", {}),
  fromRecipesUpdateSpec(recipesUpdateSpec, "runRecipesUpdate"),
  fromCommandsRecipesDetachCommand(recipesDetachSpec, "runRecipesDetach", {}),
  fromRecipesCachePruneSpec(recipesCachePruneSpec, "runRecipesCachePrune"),
  fromCommandsRecipesInstallRun(recipesInstallSpec, "runRecipesInstall", { needs: "none" }),
  fromCommandsBranchBaseCommand(branchBaseSpec, "runBranchBase", { needs: "none" }),
  fromCommandsBranchBaseCommand(branchBaseGetSpec, "runBranchBaseGet", {}),
  fromBranchBaseSetSpec(branchBaseSetSpec, "runBranchBaseSet"),
  fromCommandsBranchBaseCommand(branchBaseClearSpec, "runBranchBaseClear", {}),
  fromBranchBaseExplainSpec(branchBaseExplainSpec, "runBranchBaseExplain"),
  fromCommandsBranchStatusCommand(branchStatusSpec, "runBranchStatus", {}),
  fromBranchRemoveSpec(branchRemoveSpec, "runBranchRemove"),
  declareCommand(backendSpec, { load: loadBackendSpec, needs: "none" }),
  declareCommand(backendSyncSpec, { load: loadBackendSyncSpec }),
  declareCommand(backendInspectSpec, { load: loadBackendInspectSpec }),
  declareCommand(backendConnectSpec, { load: loadBackendConnectSpec }),
  declareCommand(backendMigrateCanonicalStateSpec, { load: loadBackendMigrateCanonicalStateSpec }),
  declareCommand(syncSpec, { load: loadSyncSpec }),
  declareCommand(prSpec, { load: loadPrSpec, needs: "none" }),
  declareCommand(prOpenSpec, { load: loadPrOpenSpec }),
  declareCommand(prUpdateSpec, { load: loadPrUpdateSpec }),
  declareCommand(prCheckSpec, { load: loadPrCheckSpec }),
  declareCommand(prCloseSpec, { load: loadPrCloseSpec }),
  declareCommand(prCloseSupersededSpec, { load: loadPrCloseSupersededSpec }),
  declareCommand(prNoteSpec, { load: loadPrNoteSpec }),
  declareCommand(integrateSpec, { load: loadIntegrateSpec }),
] as const satisfies readonly CommandEntry[];
