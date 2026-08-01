import { commandModule, type CommandSession, type RunDeps } from "../command-catalog/kernel.js";
import type {
  ContextProjectSession,
  ContextTaskReadSession,
  ContextTaskWriteSession,
  EvaluatorExecuteSession,
  EvaluatorReadSession,
  EvaluatorWriteSession,
} from "../command-catalog/context-evaluator-capability-profiles.js";
import type { NoContextSession } from "../command-catalog/project-capability-profiles.js";
import type { CommandHandler } from "../../spec/spec.js";
import type * as ContextCommandModule from "../../../commands/context/context.command.js";

type PrCheckSession = CommandSession<
  | "project"
  | "config"
  | "backend.read"
  | "task.read"
  | "git.head"
  | "git.diff"
  | "route.remote"
  | "policy"
  | "approvals"
  | "provider"
>;

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

export const loadEvaluatorSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorGroup);
export const loadEvaluatorListSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorList);
export const loadEvaluatorShowSpec = (_session: NoContextSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) => m.runEvaluatorShow);
export const loadEvaluatorPrepareSpec = (session: EvaluatorReadSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorPrepareHandler({
      getCommandContext: (_ctx, command) => session.require("task.read", command),
    }),
  );
export const loadEvaluatorApplySpec = (session: EvaluatorWriteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorApplyHandler({
      getCommandContext: (_ctx, command) => session.require("task.write", command),
    }),
  );
export const loadEvaluatorExecuteSpec = (session: EvaluatorExecuteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorExecuteHandler({
      getCommandContext: (_ctx, command) => session.require("provider", command),
    }),
  );
export const loadEvaluatorRunReadSpec = (session: EvaluatorReadSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorRunHandler({
      getCommandContext: (_ctx, command) => session.require("task.read", command),
    }),
  );
export const loadEvaluatorRunWriteSpec = (session: EvaluatorWriteSession) =>
  import("../../../commands/evaluator/evaluator.command.js").then((m) =>
    m.makeRunEvaluatorRunHandler({
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
export const loadWorkStartSpec = (deps: RunDeps) =>
  import("../../../commands/branch/work-start.command.js").then((m) =>
    m.makeRunWorkStartHandler(deps.getCtx),
  );
export const loadWorkResumeSpec = (deps: RunDeps) =>
  import("../../../commands/branch/work-resume.command.js").then((m) =>
    m.makeRunWorkResumeHandler(deps.getCtx),
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
export const loadPrSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrHandler(deps.getCtx));
export const loadPrOpenSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrOpenHandler(deps.getCtx));
export const loadPrUpdateSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) => m.makeRunPrUpdateHandler(deps.getCtx));
export const loadPrCheckSpec = (session: PrCheckSession) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrCheckHandler(async (command) => {
      await session.require("route.remote", command);
      return await session.require("provider", command);
    }),
  );
export const loadPrConflictReworkSpec = (deps: RunDeps) =>
  import("../../../commands/pr/pr.command.js").then((m) =>
    m.makeRunPrConflictReworkHandler(deps.getCtx),
  );
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
export const fromCommandsFlowCommand = commandModule(
  () => import("../../../commands/flow/flow.command.js"),
);
export const loadFlowRepairSpec = (deps: RunDeps) =>
  import("../../../commands/flow/repair.command.js").then((m) =>
    m.makeRunFlowRepairHandler(deps.getCtx),
  );
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
export const loadIntegrateQueueDoctorSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueDoctorHandler(deps.getCtx),
  );
export const loadIntegrateQueueClaimSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueClaimHandler(deps.getCtx),
  );
export const loadIntegrateQueueReleaseSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueReleaseHandler(deps.getCtx),
  );
export const loadIntegrateQueueAdoptLegacyProtectedConflictSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueAdoptLegacyProtectedConflictHandler(deps.getCtx),
  );
export const loadIntegrateQueueRunNextSpec = (deps: RunDeps) =>
  import("../../../commands/integrate-queue.command.js").then((m) =>
    m.makeRunIntegrateQueueRunNextHandler(deps.getCtx),
  );
