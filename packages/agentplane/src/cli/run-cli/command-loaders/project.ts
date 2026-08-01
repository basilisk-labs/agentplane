import type { CommandContext } from "../../../commands/shared/task-backend.js";
import { commandModule, type RunDeps } from "../command-catalog/kernel.js";
import type { NoContextSession } from "../command-catalog/project-capability-profiles.js";
import type {
  LocalOpsWriteSession,
  ProviderReadSession,
  ProviderWriteSession,
} from "../command-catalog/provider-ops-capability-profiles.js";

async function getProviderReadContext(
  session: ProviderReadSession,
  command: string,
): Promise<CommandContext> {
  await session.require("route.remote", command);
  await session.require("approvals", command);
  return await session.require("provider", command);
}

async function getProviderWriteContext(
  session: ProviderWriteSession,
  command: string,
): Promise<CommandContext> {
  await session.require("git.mutate", command);
  await session.require("route.remote", command);
  await session.require("approvals", command);
  return await session.require("provider", command);
}

function getLocalOpsWriteContext(session: LocalOpsWriteSession) {
  return (command: string) => session.require("git.mutate", command) as Promise<CommandContext>;
}

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
export const fromCommandsEvidenceCommand = commandModule(
  () => import("../../../commands/evidence/evidence.command.js"),
);
export const fromCommandsHermesCommand = commandModule(
  () => import("../../../commands/hermes/hermes.command.js"),
);
export const loadEvidenceBundleSpec = (deps: RunDeps) =>
  import("../../../commands/evidence/evidence.command.js").then((m) =>
    m.makeRunEvidenceBundleHandler(deps.getCtx),
  );
export const loadEvidenceVerifySpec = (deps: RunDeps) =>
  import("../../../commands/evidence/evidence.command.js").then((m) =>
    m.makeRunEvidenceVerifyHandler(deps.getCtx),
  );
export const loadHermesEnqueueSpec = (deps: RunDeps) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesEnqueueHandler(deps.getCtx),
  );
export const loadHermesSuperviseSpec = (deps: RunDeps) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesSuperviseHandler(deps.getCtx),
  );
export const loadHermesReconcileSpec = (deps: RunDeps) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesReconcileHandler(deps.getCtx),
  );
export const loadHermesLifecycleSpec = () =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesLifecycleHandler(),
  );
export const loadHermesDoctorSpec = (deps: RunDeps) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesDoctorHandler(deps.getCtx),
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
export const loadWorkStartSpec = (session: LocalOpsWriteSession) =>
  import("../../../commands/branch/work-start.command.js").then((m) =>
    m.makeRunWorkStartHandler(getLocalOpsWriteContext(session)),
  );
export const loadWorkResumeSpec = (session: LocalOpsWriteSession) =>
  import("../../../commands/branch/work-resume.command.js").then((m) =>
    m.makeRunWorkResumeHandler(getLocalOpsWriteContext(session)),
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
export const loadPrSpec = (_session: NoContextSession) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.runPrGroup);
export const loadPrOpenSpec = (session: ProviderWriteSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrOpenHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadPrUpdateSpec = (session: ProviderWriteSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrUpdateHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadPrCheckSpec = (session: ProviderReadSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrCheckHandler((command) => getProviderReadContext(session, command)),
  );
export const loadPrConflictReworkSpec = (session: ProviderWriteSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrConflictReworkHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadPrFlowStatusSpec = (session: ProviderReadSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrFlowStatusHandler((command) => getProviderReadContext(session, command)),
  );
export const loadPrCloseSpec = (session: ProviderWriteSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrCloseHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadPrCloseSupersededSpec = (session: ProviderWriteSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrCloseSupersededHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadPrNoteSpec = (session: ProviderWriteSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrNoteHandler((command) => getProviderWriteContext(session, command)),
  );
export const fromCommandsFlowCommand = commandModule(
  () => import("../../../commands/flow/flow.command.js"),
);
export const loadFlowRepairSpec = (session: ProviderWriteSession) =>
  import("../../../commands/flow/repair.command.js").then((m) =>
    m.makeRunFlowRepairHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate.command.js").then((m) =>
    m.makeRunIntegrateHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateQueueSpec = (_session: NoContextSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) => m.runIntegrateQueueGroup);
export const loadIntegrateQueueEnqueueSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueEnqueueHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateQueueListSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueListHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateQueueDoctorSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueDoctorHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateQueueClaimSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueClaimHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateQueueReleaseSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueReleaseHandler((command) => getProviderWriteContext(session, command)),
  );
export const loadIntegrateQueueAdoptLegacyProtectedConflictSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler((command) =>
      getProviderWriteContext(session, command),
    ),
  );
export const loadIntegrateQueueRunNextSpec = (session: ProviderWriteSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueRunNextHandler((command) => getProviderWriteContext(session, command)),
  );
