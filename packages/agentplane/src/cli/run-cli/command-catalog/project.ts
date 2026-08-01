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
  evidenceBundleSpec,
  evidenceSpec,
  evidenceVerifySpec,
} from "../../../commands/evidence/evidence.command.js";
import {
  blueprintDriftSpec,
  blueprintExamplesSpec,
  blueprintExplainSpec,
  blueprintListSpec,
  blueprintReportSpec,
  blueprintSnapshotSpec,
  blueprintScaffoldSpec,
  blueprintSpec,
  blueprintValidateSpec,
} from "../../../commands/blueprint/blueprint.command.js";
import {
  blueprintsCatalogInfoSpec,
  blueprintsCatalogListSpec,
  blueprintsCatalogRefreshSpec,
  blueprintsCatalogSpec,
  blueprintsInstallSpec,
  blueprintsSpec,
} from "../../../commands/blueprints/blueprints.command.js";
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
import { flowRepairSpec } from "../../../commands/flow/repair.command.js";
import { flowSpec } from "../../../commands/flow/flow.command.js";
import { workStartSpec } from "../../../commands/branch/work-start.command.js";
import { workResumeSpec } from "../../../commands/branch/work-resume.command.js";
import { integrateSpec } from "../../../commands/integrate.spec.js";
import {
  prCheckSpec,
  prCloseSpec,
  prCloseSupersededSpec,
  prConflictReworkSpec,
  prFlowStatusSpec,
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
import { declareCommand, declareSessionCommand, type CommandEntry } from "./kernel.js";
import { CONTEXT_COMMANDS, EVALUATOR_COMMANDS } from "./context-evaluator.js";
import { HERMES_COMMANDS } from "./hermes.js";
import { INTEGRATION_QUEUE_COMMANDS } from "./integration-queue.js";
import {
  NO_CONTEXT_REQUIREMENTS,
  PROJECT_CONFIG_REQUIREMENTS,
  PROJECT_REQUIREMENTS,
} from "./project-capability-profiles.js";
import {
  TASK_LIFECYCLE_REQUIREMENTS,
  TASK_READ_REQUIREMENTS,
  TASK_ROUTE_LOCAL_REQUIREMENTS,
  TASK_WRITE_REQUIREMENTS,
} from "./task-capability-profiles.js";
import {
  LOCAL_OPS_WRITE_REQUIREMENTS,
  PROVIDER_READ_REQUIREMENTS,
  PROVIDER_WRITE_REQUIREMENTS,
} from "./provider-ops-capability-profiles.js";
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
  loadWorkResumeSpec,
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
  loadPrConflictReworkSpec,
  loadPrCloseSpec,
  loadPrCloseSupersededSpec,
  loadPrFlowStatusSpec,
  loadPrNoteSpec,
  fromCommandsFlowCommand,
  loadFlowRepairSpec,
  loadIntegrateSpec,
  loadAcrSpec,
  loadAcrSchemaSpec,
  loadAcrGenerateSpec,
  loadAcrValidateSpec,
  loadAcrCheckSpec,
  loadAcrExplainSpec,
  fromCommandsEvidenceCommand,
  loadEvidenceBundleSpec,
  loadEvidenceVerifySpec,
  loadBlueprintSpec,
  loadBlueprintListSpec,
  loadBlueprintExamplesSpec,
  loadBlueprintDriftSpec,
  loadBlueprintExplainSpec,
  loadBlueprintSnapshotSpec,
  loadBlueprintReportSpec,
  loadBlueprintValidateSpec,
  loadBlueprintScaffoldSpec,
  fromCommandsBlueprintsCommand,
} from "../command-loaders/project.js";

export const PROJECT_COMMANDS = [
  declareCommand(acrSpec, {
    load: loadAcrSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(acrSchemaSpec, {
    load: loadAcrSchemaSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(acrGenerateSpec, {
    load: loadAcrGenerateSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareCommand(acrValidateSpec, {
    load: loadAcrValidateSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareCommand(acrCheckSpec, {
    load: loadAcrCheckSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareCommand(acrExplainSpec, {
    load: loadAcrExplainSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  fromCommandsEvidenceCommand(evidenceSpec, "runEvidenceGroup", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(evidenceBundleSpec, {
    load: loadEvidenceBundleSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareCommand(evidenceVerifySpec, {
    load: loadEvidenceVerifySpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  ...HERMES_COMMANDS,
  declareCommand(blueprintSpec, {
    load: loadBlueprintSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(blueprintListSpec, {
    load: loadBlueprintListSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(blueprintExamplesSpec, {
    load: loadBlueprintExamplesSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(blueprintExplainSpec, {
    load: loadBlueprintExplainSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareCommand(blueprintSnapshotSpec, {
    load: loadBlueprintSnapshotSpec,
    requirements: TASK_LIFECYCLE_REQUIREMENTS,
  }),
  declareCommand(blueprintDriftSpec, {
    load: loadBlueprintDriftSpec,
    requirements: TASK_ROUTE_LOCAL_REQUIREMENTS,
  }),
  declareCommand(blueprintReportSpec, {
    load: loadBlueprintReportSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(blueprintScaffoldSpec, {
    load: loadBlueprintScaffoldSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(blueprintValidateSpec, {
    load: loadBlueprintValidateSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  ...EVALUATOR_COMMANDS,
  fromCommandsBlueprintsCommand(blueprintsSpec, "runBlueprints", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsBlueprintsCommand(blueprintsCatalogSpec, "runBlueprintsCatalog", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsBlueprintsCommand(blueprintsCatalogRefreshSpec, "runBlueprintsCatalogRefresh", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsBlueprintsCommand(blueprintsCatalogListSpec, "runBlueprintsCatalogList", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsBlueprintsCommand(blueprintsCatalogInfoSpec, "runBlueprintsCatalogInfo", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsBlueprintsCommand(blueprintsInstallSpec, "runBlueprintsInstall", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(workStartSpec, {
    load: loadWorkStartSpec,
    requirements: LOCAL_OPS_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(workResumeSpec, {
    load: loadWorkResumeSpec,
    requirements: LOCAL_OPS_WRITE_REQUIREMENTS,
  }),
  fromCommandsFlowCommand(flowSpec, "runFlow", { requirements: NO_CONTEXT_REQUIREMENTS }),
  declareSessionCommand(flowRepairSpec, {
    load: loadFlowRepairSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  fromCommandsRecipesRecipesCommand(recipesSpec, "runRecipes", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsRecipesCacheCommand(recipesCacheSpec, "runRecipesCache", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsRecipesAddCommand(recipesAddSpec, "runRecipesAdd", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromRecipesActiveSpec(recipesActiveSpec, "runRecipesActive", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromCommandsRecipesListCommand(recipesListSpec, "runRecipesList", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsRecipesListRemoteCommand(recipesListRemoteSpec, "runRecipesListRemote", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromRecipesInfoSpec(recipesInfoSpec, "runRecipesInfo", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsRecipesExplainCommand(recipesExplainSpec, "runRecipesExplain", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  declareCommand(recipesExplainActiveSpec, {
    load: loadRecipesExplainActiveSpec,
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromCommandsRecipesEnableCommand(recipesEnableSpec, "runRecipesEnable", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromRecipesDisableSpec(recipesDisableSpec, "runRecipesDisable", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromCommandsRecipesRemoveCommand(recipesRemoveSpec, "runRecipesRemove", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromRecipesUpdateSpec(recipesUpdateSpec, "runRecipesUpdate", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromCommandsRecipesDetachCommand(recipesDetachSpec, "runRecipesDetach", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromRecipesCachePruneSpec(recipesCachePruneSpec, "runRecipesCachePrune", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromCommandsRecipesInstallRun(recipesInstallSpec, "runRecipesInstall", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  ...CONTEXT_COMMANDS,
  fromCommandsBranchBaseCommand(branchBaseSpec, "runBranchBase", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  fromCommandsBranchBaseCommand(branchBaseGetSpec, "runBranchBaseGet", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromBranchBaseSetSpec(branchBaseSetSpec, "runBranchBaseSet", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromCommandsBranchBaseCommand(branchBaseClearSpec, "runBranchBaseClear", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromBranchBaseExplainSpec(branchBaseExplainSpec, "runBranchBaseExplain", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromCommandsBranchStatusCommand(branchStatusSpec, "runBranchStatus", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromBranchRemoveSpec(branchRemoveSpec, "runBranchRemove", {
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  declareCommand(backendSpec, {
    load: loadBackendSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(backendSyncSpec, {
    load: loadBackendSyncSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareCommand(backendInspectSpec, {
    load: loadBackendInspectSpec,
    requirements: TASK_READ_REQUIREMENTS,
  }),
  declareCommand(backendConnectSpec, {
    load: loadBackendConnectSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareCommand(backendMigrateCanonicalStateSpec, {
    load: loadBackendMigrateCanonicalStateSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareCommand(syncSpec, {
    load: loadSyncSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(prSpec, {
    load: loadPrSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(prOpenSpec, {
    load: loadPrOpenSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(prUpdateSpec, {
    load: loadPrUpdateSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(prCheckSpec, {
    load: loadPrCheckSpec,
    requirements: PROVIDER_READ_REQUIREMENTS,
  }),
  declareSessionCommand(prConflictReworkSpec, {
    load: loadPrConflictReworkSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(prFlowStatusSpec, {
    load: loadPrFlowStatusSpec,
    requirements: PROVIDER_READ_REQUIREMENTS,
  }),
  declareSessionCommand(prCloseSpec, {
    load: loadPrCloseSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(prCloseSupersededSpec, {
    load: loadPrCloseSupersededSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(prNoteSpec, {
    load: loadPrNoteSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  declareSessionCommand(integrateSpec, {
    load: loadIntegrateSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
  }),
  ...INTEGRATION_QUEUE_COMMANDS,
] as const satisfies readonly CommandEntry[];
