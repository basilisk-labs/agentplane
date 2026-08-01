import type { CommandContext } from "../../../commands/shared/task-backend.js";
import { commandModule, type CommandSession, type RunDeps } from "../command-catalog/kernel.js";
import type {
  IntegrationQueueExecutionSession,
  IntegrationQueueListSession,
  IntegrationQueueProviderReadSession,
  IntegrationQueueTaskProviderReadSession,
  LocalOpsWriteSession,
  ProviderReadSession,
  ProviderWriteSession,
} from "../command-catalog/provider-ops-capability-profiles.js";
import type {
  HermesLocalExecutionSession,
  HermesProjectionSession,
  HermesRemoteExecutionSession,
  HermesRemotePreparationSession,
} from "../command-catalog/runner-hermes-capability-profiles.js";
import type {
  NoContextSession,
  ProjectConfigSession,
} from "../command-catalog/project-capability-profiles.js";
import type {
  ContextProjectSession,
  ContextTaskReadSession,
  ContextTaskWriteSession,
  EvaluatorExecuteSession,
  EvaluatorPrepareSession,
  EvaluatorWriteSession,
} from "../command-catalog/context-evaluator-capability-profiles.js";
import type { CommandHandler } from "../../spec/spec.js";
import type * as ContextCommandModule from "../../../commands/context/context.command.js";

async function getProviderReadContext(
  session: ProviderReadSession,
  command: string,
): Promise<CommandContext> {
  await session.require("route.remote", command);
  await session.require("approvals", command);
  return await session.require("provider", command);
}

async function getIntegrationQueueProviderReadContext(
  session: IntegrationQueueProviderReadSession,
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
export const loadEvidenceBundleSpec = (deps: RunDeps) =>
  import("../../../commands/evidence/evidence.command.js").then((m) =>
    m.makeRunEvidenceBundleHandler(deps.getCtx),
  );
export const loadEvidenceVerifySpec = (deps: RunDeps) =>
  import("../../../commands/evidence/evidence.command.js").then((m) =>
    m.makeRunEvidenceVerifyHandler(deps.getCtx),
  );
export const loadHermesSpec = (_session: NoContextSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) => m.runHermesGroup);
export const loadHermesEnqueueSpec = (session: HermesProjectionSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesEnqueueHandler((command) => session.require("context.search", command)),
  );
export const loadHermesSuperviseLocalPreparationSpec = (session: HermesProjectionSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesSuperviseHandler(async (command) => {
      await session.require("route.local", command);
      await session.require("context.search", command);
      return await session.require("context.search", command);
    }),
  );
export const loadHermesSuperviseRemotePreparationSpec = (session: HermesRemotePreparationSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesSuperviseHandler(async (command) => {
      await session.require("route.local", command);
      await session.require("context.search", command);
      return await session.require("route.remote", command);
    }),
  );
export const loadHermesSuperviseLocalExecutionSpec = (session: HermesLocalExecutionSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesSuperviseHandler(async (command) => {
      await session.require("route.local", command);
      await session.require("git.mutate", command);
      await session.require("context.search", command);
      return await session.require("provider", command);
    }),
  );
export const loadHermesSuperviseRemoteExecutionSpec = (session: HermesRemoteExecutionSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesSuperviseHandler(async (command) => {
      await session.require("route.local", command);
      await session.require("git.mutate", command);
      await session.require("context.search", command);
      await session.require("route.remote", command);
      return await session.require("provider", command);
    }),
  );
export const loadHermesReconcileSpec = (session: HermesProjectionSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesReconcileHandler({
      getProjectConfig: async (command) => ({
        project: await session.require("project", command),
        config: await session.require("config", command),
      }),
      getProjectionContext: (command) => session.require("context.search", command),
    }),
  );
export const loadHermesLifecycleSpec = (_session: NoContextSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesLifecycleHandler(),
  );
export const loadHermesDoctorSpec = (session: ProjectConfigSession) =>
  import("../../../commands/hermes/hermes.command.js").then((m) =>
    m.makeRunHermesDoctorHandler({
      getResolvedProject: (command) => session.require("project", command),
      getLoadedConfig: (command) => session.require("config", command),
    }),
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

export const loadEvaluatorSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorGroup);
export const loadEvaluatorListSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorList);
export const loadEvaluatorShowSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorShow);
export const loadEvaluatorPrepareSpec = (session: EvaluatorPrepareSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorPrepareHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
    }),
  );
export const loadEvaluatorApplySpec = (session: EvaluatorWriteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorApplyHandler({
      getCommandContext: async (_ctx, command) => {
        await session.require("evaluator.artifacts.write", command);
        return await session.require("task.write", command);
      },
    }),
  );
export const loadEvaluatorExecuteSpec = (session: EvaluatorExecuteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorExecuteHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
      getCommandContext: async (_ctx, command) => {
        await session.require("task.write", command);
        return await session.require("provider", command);
      },
    }),
  );
export const loadEvaluatorRunPrepareSpec = (session: EvaluatorPrepareSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorRunPrepareHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
    }),
  );
export const loadEvaluatorRunWriteSpec = (session: EvaluatorWriteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorRunHandler({
      getEvaluatorArtifactPort: (_ctx, command) =>
        session.require("evaluator.artifacts.write", command),
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
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
type ContextCommandExport = Extract<keyof typeof ContextCommandModule, `runContext${string}`>;

async function loadContextNoContextHandler(
  exportName: ContextCommandExport,
): Promise<CommandHandler<unknown>> {
  const module = await import("../../../commands/context/context.command.js");
  return module[exportName] as CommandHandler<unknown>;
}

async function loadContextProjectHandler(
  session: ContextProjectSession,
  exportName: ContextCommandExport,
  command: string,
): Promise<CommandHandler<unknown>> {
  const handler = await loadContextNoContextHandler(exportName);
  return async (ctx, parsed) => {
    const project = await session.require("project", command);
    return await handler({ ...ctx, rootOverride: project.gitRoot }, parsed);
  };
}

export const loadContextGroupSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextGroup");
export const loadContextInitSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextInit");
export const loadContextLearnGroupSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextLearnGroup");
export const loadContextWikiGroupSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextWikiGroup");
export const loadContextHarvestGroupSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextHarvestGroup");
export const loadContextGraphGroupSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextGraphGroup");
export const loadContextCapabilityGroupSpec = (_session: NoContextSession) =>
  loadContextNoContextHandler("runContextCapabilityGroup");

const projectContextLoader =
  (exportName: ContextCommandExport, command: string) => (session: ContextProjectSession) =>
    loadContextProjectHandler(session, exportName, command);
export const loadContextMigrateSpec = projectContextLoader("runContextMigrate", "context migrate");
export const loadContextCheckSpec = projectContextLoader("runContextCheck", "context check");
export const loadContextReindexSpec = projectContextLoader("runContextReindex", "context reindex");
export const loadContextSearchSpec = projectContextLoader("runContextSearch", "context search");
export const loadContextDashboardSpec = projectContextLoader(
  "runContextDashboard",
  "context dashboard",
);
export const loadContextShowSpec = projectContextLoader("runContextShow", "context show");
export const loadContextWikiNewSpec = projectContextLoader("runContextWikiNew", "context wiki new");
export const loadContextWikiLintSpec = projectContextLoader(
  "runContextWikiLint",
  "context wiki lint",
);
export const loadContextWikiExplainSpec = projectContextLoader(
  "runContextWikiExplain",
  "context wiki explain",
);
export const loadContextWikiLinkSpec = projectContextLoader(
  "runContextWikiLink",
  "context wiki link",
);
export const loadContextWikiIndexSpec = projectContextLoader(
  "runContextWikiIndex",
  "context wiki index",
);
export const loadContextWikiReportSpec = projectContextLoader(
  "runContextWikiReport",
  "context wiki report",
);
export const loadContextDoctorSpec = projectContextLoader("runContextDoctor", "context doctor");
export const loadContextFinalizeTaskSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextFinalizeTaskHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
export const loadContextVerifyTaskSpec = (session: ContextTaskReadSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextVerifyTaskHandler({
      getCommandContext: (_ctx, command) => session.require("task.read", command),
    }),
  );
export const loadContextGraphSummarySpec = projectContextLoader(
  "runContextGraphSummary",
  "context graph summary",
);
export const loadContextGraphShowSpec = projectContextLoader(
  "runContextGraphShow",
  "context graph show",
);
export const loadContextGraphNeighborsSpec = projectContextLoader(
  "runContextGraphNeighbors",
  "context graph neighbors",
);
export const loadContextGraphValidateSpec = projectContextLoader(
  "runContextGraphValidate",
  "context graph validate",
);
export const loadContextGraphExportSpec = projectContextLoader(
  "runContextGraphExport",
  "context graph export",
);
export const loadContextExtractionApplySpec = projectContextLoader(
  "runContextExtractionApply",
  "context extraction apply",
);
export const loadContextCapabilityValidateSpec = projectContextLoader(
  "runContextCapabilityValidate",
  "context capability validate",
);
export const loadContextCapabilitySearchSpec = projectContextLoader(
  "runContextCapabilitySearch",
  "context capability search",
);
export const loadContextCapabilityDiscoverSpec = projectContextLoader(
  "runContextCapabilityDiscover",
  "context capability discover",
);
export const loadContextLearnFilesSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextLearnFilesHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
export const loadContextLearnChangesSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextLearnChangesHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
export const loadContextLearnTasksSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextLearnTasksHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
export const loadContextHarvestTasksSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextHarvestTasksHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
export const loadContextSuperviseTaskSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/context.command.js").then((m) =>
    m.makeRunContextSuperviseTaskHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
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
export const loadContextIngestSpec = (session: ContextTaskWriteSession) =>
  import("../../../commands/context/ingest.command.js").then((m) =>
    m.makeRunContextIngestHandler((command) => session.require("task.write", command)),
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
export const loadIntegrateQueueEnqueueSpec = (session: IntegrationQueueTaskProviderReadSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueEnqueueHandler((command) => getProviderReadContext(session, command)),
  );
export const loadIntegrateQueueListSpec = (session: IntegrationQueueListSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueListHandler(
      async (command) => (await session.require("project", command)).gitRoot,
    ),
  );
export const loadIntegrateQueueDoctorSpec = (session: IntegrationQueueTaskProviderReadSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueDoctorHandler((command) => getProviderReadContext(session, command)),
  );
export const loadIntegrateQueueClaimSpec = (session: IntegrationQueueProviderReadSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueClaimHandler((command) =>
      getIntegrationQueueProviderReadContext(session, command),
    ),
  );
export const loadIntegrateQueueReleaseLocalSpec = (session: IntegrationQueueListSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueReleaseHandler({
      getGitRoot: async (command) => (await session.require("project", command)).gitRoot,
    }),
  );
export const loadIntegrateQueueReleaseProviderSpec = (
  session: IntegrationQueueTaskProviderReadSession,
) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueReleaseHandler({
      getGitRoot: async (command) =>
        (await getProviderReadContext(session, command)).resolvedProject.gitRoot,
      getCtx: (command) => getProviderReadContext(session, command),
    }),
  );
export const loadIntegrateQueueAdoptLegacyProtectedConflictSpec = (
  session: IntegrationQueueTaskProviderReadSession,
) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler((command) =>
      getProviderReadContext(session, command),
    ),
  );
export const loadIntegrateQueueRunNextPreparationSpec = (
  session: IntegrationQueueTaskProviderReadSession,
) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueRunNextHandler((command) => getProviderReadContext(session, command)),
  );
export const loadIntegrateQueueRunNextSpec = (session: IntegrationQueueExecutionSession) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueRunNextHandler((command) => getProviderWriteContext(session, command)),
  );
