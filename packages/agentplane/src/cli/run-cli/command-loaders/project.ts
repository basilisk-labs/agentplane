import { commandModule, type RunDeps } from "../command-catalog/kernel.js";

export const loadAcrSpec = (deps: RunDeps) =>
  import("../../../commands/acr/acr.command.js").then((m) => m.makeRunAcrHandler(deps.getCtx));
export const loadAcrSchemaSpec = () =>
  import("../../../commands/acr/acr.command.js").then((m) => m.makeRunAcrSchemaHandler());
export const loadAcrGenerateSpec = (deps: RunDeps) =>
  import("../../../commands/acr/acr.command.js").then((m) =>
    m.makeRunAcrGenerateHandler(deps.getCtx),
  );
export const loadAcrValidateSpec = (deps: RunDeps) =>
  import("../../../commands/acr/acr.command.js").then((m) =>
    m.makeRunAcrValidateHandler(deps.getCtx),
  );
export const loadAcrCheckSpec = (deps: RunDeps) =>
  import("../../../commands/acr/acr.command.js").then((m) => m.makeRunAcrCheckHandler(deps.getCtx));
export const loadAcrExplainSpec = (deps: RunDeps) =>
  import("../../../commands/acr/acr.command.js").then((m) =>
    m.makeRunAcrExplainHandler(deps.getCtx),
  );

export const loadBlueprintSpec = (deps: RunDeps) =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) =>
    m.makeRunBlueprintHandler(deps.getCtx),
  );
export const loadBlueprintListSpec = () =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) => m.runBlueprintList);
export const loadBlueprintExamplesSpec = () =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) => m.runBlueprintExamples);
export const loadBlueprintExplainSpec = (deps: RunDeps) =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) =>
    m.makeRunBlueprintExplainHandler(deps.getCtx),
  );
export const loadBlueprintSnapshotSpec = (deps: RunDeps) =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) =>
    m.makeRunBlueprintSnapshotHandler(deps.getCtx),
  );
export const loadBlueprintDriftSpec = (deps: RunDeps) =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) =>
    m.makeRunBlueprintDriftHandler(deps.getCtx),
  );
export const loadBlueprintReportSpec = () =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) => m.runBlueprintReport);
export const loadBlueprintValidateSpec = () =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) => m.runBlueprintValidate);
export const loadBlueprintScaffoldSpec = () =>
  import("../../../commands/blueprint/blueprint.command.js").then((m) => m.runBlueprintScaffold);

export const fromCommandsEvaluatorCommand = commandModule(
  () => import("../../../commands/evaluator/evaluator.command.js"),
);

export const fromCommandsBlueprintsCommand = commandModule(
  () => import("../../../commands/blueprints/blueprints.command.js"),
);

export const fromCommandsRecipesRecipesCommand = commandModule(
  () => import("../../../commands/recipes/recipes.command.js"),
);
export const fromCommandsRecipesCacheCommand = commandModule(
  () => import("../../../commands/recipes/cache.command.js"),
);
export const fromCommandsRecipesAddCommand = commandModule(
  () => import("../../../commands/recipes/add.command.js"),
);
export const fromCommandsRecipesListCommand = commandModule(
  () => import("../../../commands/recipes/list.command.js"),
);
export const fromCommandsRecipesListRemoteCommand = commandModule(
  () => import("../../../commands/recipes/list-remote.command.js"),
);
export const fromCommandsRecipesExplainCommand = commandModule(
  () => import("../../../commands/recipes/explain.command.js"),
);
export const fromCommandsRecipesEnableCommand = commandModule(
  () => import("../../../commands/recipes/enable.command.js"),
);
export const fromCommandsRecipesRemoveCommand = commandModule(
  () => import("../../../commands/recipes/remove.command.js"),
);
export const fromCommandsRecipesDetachCommand = commandModule(
  () => import("../../../commands/recipes/detach.command.js"),
);
export const fromCommandsRecipesInstallRun = commandModule(
  () => import("../../../commands/recipes/install.run.js"),
);
export const fromCommandsBranchBaseCommand = commandModule(
  () => import("../../../commands/branch/base.command.js"),
);
export const fromCommandsBranchStatusCommand = commandModule(
  () => import("../../../commands/branch/status.command.js"),
);
export const loadWorkStartSpec = (deps: RunDeps) =>
  import("../../../commands/branch/work-start.command.js").then((m) =>
    m.makeRunWorkStartHandler(deps.getCtx),
  );
export const fromRecipesActiveSpec = commandModule(
  () => import("../../../commands/recipes/active.command.js"),
);
export const fromRecipesInfoSpec = commandModule(
  () => import("../../../commands/recipes/info.command.js"),
);
export const loadRecipesExplainActiveSpec = () =>
  import("../../../commands/recipes/explain-active.command.js").then(
    (m) => m.runRecipesExplainActive,
  );
export const fromRecipesDisableSpec = commandModule(
  () => import("../../../commands/recipes/disable.command.js"),
);
export const fromRecipesUpdateSpec = commandModule(
  () => import("../../../commands/recipes/update.command.js"),
);
export const fromRecipesCachePruneSpec = commandModule(
  () => import("../../../commands/recipes/cache-prune.command.js"),
);
export const fromBranchBaseSetSpec = commandModule(
  () => import("../../../commands/branch/base.command.js"),
);
export const fromBranchBaseExplainSpec = commandModule(
  () => import("../../../commands/branch/base.command.js"),
);
export const fromBranchRemoveSpec = commandModule(
  () => import("../../../commands/branch/remove.command.js"),
);
export const loadBackendSpec = (deps: RunDeps) =>
  import("../../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendHandler(deps.getCtx),
  );
export const fromCommandsContextCommand = commandModule(
  () => import("../../../commands/context/context.command.js"),
);
export const loadBackendSyncSpec = (deps: RunDeps) =>
  import("../../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendSyncHandler(deps.getCtx),
  );
export const loadBackendInspectSpec = (deps: RunDeps) =>
  import("../../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendInspectHandler(deps.getCtx),
  );
export const loadBackendConnectSpec = (deps: RunDeps) =>
  import("../../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendConnectHandler(deps.getCtx),
  );
export const loadBackendMigrateCanonicalStateSpec = (deps: RunDeps) =>
  import("../../../commands/backend/sync.command.js").then((m) =>
    m.makeRunBackendMigrateCanonicalStateHandler(deps.getCtx),
  );
export const loadSyncSpec = (deps: RunDeps) =>
  import("../../../commands/sync.command.js").then((m) => m.makeRunSyncHandler(deps.getCtx));
export const loadContextIngestSpec = (deps: RunDeps) =>
  import("../../../commands/context/ingest.command.js").then((m) =>
    m.makeRunContextIngestHandler(deps.getCtx),
  );
export const loadPrSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrHandler(deps.getCtx));
export const loadPrOpenSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrOpenHandler(deps.getCtx));
export const loadPrUpdateSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrUpdateHandler(deps.getCtx));
export const loadPrCheckSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrCheckHandler(deps.getCtx));
export const loadPrFlowStatusSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrFlowStatusHandler(deps.getCtx),
  );
export const loadPrCloseSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrCloseHandler(deps.getCtx));
export const loadPrCloseSupersededSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrCloseSupersededHandler(deps.getCtx),
  );
export const loadPrNoteSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrNoteHandler(deps.getCtx));
export const loadIntegrateSpec = (deps: RunDeps) =>
  import("../../../commands/integrate.command.js").then((m) =>
    m.makeRunIntegrateHandler(deps.getCtx),
  );
export const loadIntegrateQueueSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueHandler(deps.getCtx),
  );
export const loadIntegrateQueueEnqueueSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueEnqueueHandler(deps.getCtx),
  );
export const loadIntegrateQueueListSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueListHandler(deps.getCtx),
  );
export const loadIntegrateQueueClaimSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueClaimHandler(deps.getCtx),
  );
export const loadIntegrateQueueReleaseSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueReleaseHandler(deps.getCtx),
  );
export const loadIntegrateQueueRunNextSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueRunNextHandler(deps.getCtx),
  );
