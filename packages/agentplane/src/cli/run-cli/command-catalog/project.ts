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
  integrateQueueClaimSpec,
  integrateQueueDoctorSpec,
  integrateQueueEnqueueSpec,
  integrateQueueListSpec,
  integrateQueueReleaseSpec,
  integrateQueueRunNextSpec,
  integrateQueueSpec,
} from "../../../commands/integrate-queue.spec.js";
import {
  prCheckSpec,
  prCloseSpec,
  prCloseSupersededSpec,
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
import { contextIngestSpec } from "../../../commands/context/ingest.spec.js";
import {
  contextCapabilityDiscoverSpec,
  contextCapabilitySearchSpec,
  contextCapabilitySpec,
  contextCapabilityValidateSpec,
  contextDoctorSpec,
  contextExtractionApplySpec,
  contextGraphNeighborsSpec,
  contextGraphExportSpec,
  contextGraphShowSpec,
  contextGraphSpec,
  contextGraphSummarySpec,
  contextGraphValidateSpec,
  contextHarvestSpec,
  contextHarvestTasksSpec,
  contextInitSpec,
  contextReindexSpec,
  contextSearchSpec,
  contextShowSpec,
  contextSpec,
  contextVerifyTaskSpec,
  contextWikiExplainSpec,
  contextWikiIndexSpec,
  contextWikiLinkSpec,
  contextWikiLintSpec,
  contextWikiNewSpec,
  contextWikiSpec,
} from "../../../commands/context/context.spec.js";
import {
  contextCheckSpec,
  contextLearnChangesSpec,
  contextLearnFilesSpec,
  contextLearnSpec,
  contextLearnTasksSpec,
} from "../../../commands/context/context.learn.spec.js";
import {
  evaluatorListSpec,
  evaluatorRunSpec,
  evaluatorShowSpec,
  evaluatorSpec,
} from "../../../commands/evaluator/evaluator.command.js";

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
  loadPrCloseSpec,
  loadPrCloseSupersededSpec,
  loadPrFlowStatusSpec,
  loadPrNoteSpec,
  fromCommandsFlowCommand,
  loadFlowRepairSpec,
  loadIntegrateSpec,
  loadIntegrateQueueSpec,
  loadIntegrateQueueEnqueueSpec,
  loadIntegrateQueueListSpec,
  loadIntegrateQueueClaimSpec,
  loadIntegrateQueueDoctorSpec,
  loadIntegrateQueueReleaseSpec,
  loadIntegrateQueueRunNextSpec,
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
  fromCommandsEvaluatorCommand,
  fromCommandsBlueprintsCommand,
  loadContextIngestSpec,
  fromCommandsContextCommand,
} from "../command-loaders/project.js";

export const PROJECT_COMMANDS = [
  declareCommand(acrSpec, { load: loadAcrSpec, needs: "none" }),
  declareCommand(acrSchemaSpec, { load: loadAcrSchemaSpec, needs: "none" }),
  declareCommand(acrGenerateSpec, { load: loadAcrGenerateSpec }),
  declareCommand(acrValidateSpec, { load: loadAcrValidateSpec }),
  declareCommand(acrCheckSpec, { load: loadAcrCheckSpec }),
  declareCommand(acrExplainSpec, { load: loadAcrExplainSpec }),
  fromCommandsEvidenceCommand(evidenceSpec, "runEvidenceGroup", { needs: "none" }),
  declareCommand(evidenceBundleSpec, { load: loadEvidenceBundleSpec }),
  declareCommand(evidenceVerifySpec, { load: loadEvidenceVerifySpec }),
  declareCommand(blueprintSpec, { load: loadBlueprintSpec, needs: "none" }),
  declareCommand(blueprintListSpec, { load: loadBlueprintListSpec, needs: "none" }),
  declareCommand(blueprintExamplesSpec, { load: loadBlueprintExamplesSpec, needs: "none" }),
  declareCommand(blueprintExplainSpec, { load: loadBlueprintExplainSpec }),
  declareCommand(blueprintSnapshotSpec, { load: loadBlueprintSnapshotSpec }),
  declareCommand(blueprintDriftSpec, { load: loadBlueprintDriftSpec }),
  declareCommand(blueprintReportSpec, { load: loadBlueprintReportSpec, needs: "none" }),
  declareCommand(blueprintScaffoldSpec, { load: loadBlueprintScaffoldSpec, needs: "none" }),
  declareCommand(blueprintValidateSpec, { load: loadBlueprintValidateSpec, needs: "none" }),
  fromCommandsEvaluatorCommand(evaluatorSpec, "runEvaluatorGroup", { needs: "none" }),
  fromCommandsEvaluatorCommand(evaluatorListSpec, "runEvaluatorList", { needs: "none" }),
  fromCommandsEvaluatorCommand(evaluatorShowSpec, "runEvaluatorShow", { needs: "none" }),
  fromCommandsEvaluatorCommand(evaluatorRunSpec, "runEvaluatorRun"),
  fromCommandsBlueprintsCommand(blueprintsSpec, "runBlueprints", { needs: "none" }),
  fromCommandsBlueprintsCommand(blueprintsCatalogSpec, "runBlueprintsCatalog", { needs: "none" }),
  fromCommandsBlueprintsCommand(blueprintsCatalogRefreshSpec, "runBlueprintsCatalogRefresh", {
    needs: "none",
  }),
  fromCommandsBlueprintsCommand(blueprintsCatalogListSpec, "runBlueprintsCatalogList", {
    needs: "none",
  }),
  fromCommandsBlueprintsCommand(blueprintsCatalogInfoSpec, "runBlueprintsCatalogInfo", {
    needs: "none",
  }),
  fromCommandsBlueprintsCommand(blueprintsInstallSpec, "runBlueprintsInstall", {}),
  declareCommand(workStartSpec, { load: loadWorkStartSpec }),
  declareCommand(workResumeSpec, { load: loadWorkResumeSpec }),
  fromCommandsFlowCommand(flowSpec, "runFlow", { needs: "none" }),
  declareCommand(flowRepairSpec, { load: loadFlowRepairSpec }),
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
  fromCommandsContextCommand(contextSpec, "runContextGroup"),
  declareCommand(contextIngestSpec, { load: loadContextIngestSpec, surface: "advanced" }),
  fromCommandsContextCommand(contextInitSpec, "runContextInit", { needs: "none" }),
  fromCommandsContextCommand(contextLearnSpec, "runContextLearnGroup"),
  fromCommandsContextCommand(contextLearnFilesSpec, "runContextLearnFiles"),
  fromCommandsContextCommand(contextLearnChangesSpec, "runContextLearnChanges"),
  fromCommandsContextCommand(contextLearnTasksSpec, "runContextLearnTasks"),
  fromCommandsContextCommand(contextCheckSpec, "runContextCheck"),
  fromCommandsContextCommand(contextReindexSpec, "runContextReindex", { surface: "advanced" }),
  fromCommandsContextCommand(contextSearchSpec, "runContextSearch"),
  fromCommandsContextCommand(contextShowSpec, "runContextShow"),
  fromCommandsContextCommand(contextWikiSpec, "runContextWikiGroup"),
  fromCommandsContextCommand(contextWikiNewSpec, "runContextWikiNew"),
  fromCommandsContextCommand(contextWikiLintSpec, "runContextWikiLint"),
  fromCommandsContextCommand(contextWikiExplainSpec, "runContextWikiExplain"),
  fromCommandsContextCommand(contextWikiLinkSpec, "runContextWikiLink"),
  fromCommandsContextCommand(contextWikiIndexSpec, "runContextWikiIndex"),
  fromCommandsContextCommand(contextDoctorSpec, "runContextDoctor", { surface: "advanced" }),
  fromCommandsContextCommand(contextVerifyTaskSpec, "runContextVerifyTask", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextHarvestSpec, "runContextHarvestGroup", { surface: "advanced" }),
  fromCommandsContextCommand(contextHarvestTasksSpec, "runContextHarvestTasks", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextGraphSpec, "runContextGraphGroup", { surface: "advanced" }),
  fromCommandsContextCommand(contextGraphSummarySpec, "runContextGraphSummary", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextGraphShowSpec, "runContextGraphShow", { surface: "advanced" }),
  fromCommandsContextCommand(contextGraphNeighborsSpec, "runContextGraphNeighbors", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextGraphValidateSpec, "runContextGraphValidate", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextGraphExportSpec, "runContextGraphExport", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextExtractionApplySpec, "runContextExtractionApply", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextCapabilitySpec, "runContextCapabilityGroup", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextCapabilityValidateSpec, "runContextCapabilityValidate", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextCapabilitySearchSpec, "runContextCapabilitySearch", {
    surface: "advanced",
  }),
  fromCommandsContextCommand(contextCapabilityDiscoverSpec, "runContextCapabilityDiscover", {
    surface: "advanced",
  }),
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
  declareCommand(backendMigrateCanonicalStateSpec, {
    load: loadBackendMigrateCanonicalStateSpec,
    surface: "internal",
    helpGroup: "Maintenance",
  }),
  declareCommand(syncSpec, { load: loadSyncSpec }),
  declareCommand(prSpec, { load: loadPrSpec, needs: "none" }),
  declareCommand(prOpenSpec, { load: loadPrOpenSpec }),
  declareCommand(prUpdateSpec, { load: loadPrUpdateSpec }),
  declareCommand(prCheckSpec, { load: loadPrCheckSpec }),
  declareCommand(prFlowStatusSpec, { load: loadPrFlowStatusSpec }),
  declareCommand(prCloseSpec, { load: loadPrCloseSpec }),
  declareCommand(prCloseSupersededSpec, { load: loadPrCloseSupersededSpec }),
  declareCommand(prNoteSpec, { load: loadPrNoteSpec }),
  declareCommand(integrateSpec, { load: loadIntegrateSpec }),
  declareCommand(integrateQueueSpec, { load: loadIntegrateQueueSpec, needs: "none" }),
  declareCommand(integrateQueueEnqueueSpec, { load: loadIntegrateQueueEnqueueSpec }),
  declareCommand(integrateQueueListSpec, { load: loadIntegrateQueueListSpec }),
  declareCommand(integrateQueueDoctorSpec, { load: loadIntegrateQueueDoctorSpec }),
  declareCommand(integrateQueueClaimSpec, { load: loadIntegrateQueueClaimSpec }),
  declareCommand(integrateQueueReleaseSpec, { load: loadIntegrateQueueReleaseSpec }),
  declareCommand(integrateQueueRunNextSpec, { load: loadIntegrateQueueRunNextSpec }),
] as const satisfies readonly CommandEntry[];
