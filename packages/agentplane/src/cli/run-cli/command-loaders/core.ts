import { commandModule, type RunDeps } from "../command-catalog/kernel.js";
import type {
  NoContextSession,
  ProjectConfigSession,
  ProjectSession,
} from "../command-catalog/project-capability-profiles.js";
import type { InsightsReadSession } from "../command-catalog/runner-hermes-capability-profiles.js";

function getProjectDeps(session: ProjectSession) {
  return {
    getResolvedProject: (command: string) => session.require("project", command),
  };
}

function getProjectConfigDeps(session: ProjectConfigSession) {
  return {
    getResolvedProject: (command: string) => session.require("project", command),
    getLoadedConfig: (command: string) => session.require("config", command),
  };
}

export const fromCommandsInit = commandModule(() => import("../commands/init/spec.js"));
export const fromCommandsUpgradeCommand = commandModule(
  () => import("../../../commands/upgrade.command.js"),
);
export const fromCommandsReleaseReleaseCommand = commandModule(
  () => import("../../../commands/release/release.command.js"),
);
export const fromCommandsReleasePlanCommand = commandModule(
  () => import("../../../commands/release/plan.command.js"),
);
export const fromCommandsReleaseApplyCommand = commandModule(
  () => import("../../../commands/release/apply.command.js"),
);
export const loadReleaseTasksReconcileSpec = (deps: RunDeps) =>
  import("../../../commands/release/tasks-reconcile.command.js").then((m) =>
    m.makeRunReleaseTasksReconcileHandler(deps.getCtx),
  );
export const fromCommandsCoreQuickstart = commandModule(
  () => import("../commands/core/quickstart.js"),
);
export const loadDemoSpec = (deps: RunDeps) =>
  import("../commands/core/demo.js").then((m) => m.makeRunDemoHandler(deps.getCtx));
export const fromCommandsCorePreflight = commandModule(
  () => import("../commands/core/preflight.js"),
);
export const fromCommandsCodex = commandModule(() => import("../commands/codex.js"));
export const loadRuntimeSpec = (_session: NoContextSession) =>
  import("../../../commands/runtime.command.js").then((m) => m.runRuntime);
export const loadRuntimeExplainSpec = (session: ProjectConfigSession) =>
  import("../../../commands/runtime.command.js").then((m) =>
    m.makeRunRuntimeExplainHandler({
      getLoadedConfig: (command) => session.require("config", command),
    }),
  );
export const loadInsightsSpec = (_session: NoContextSession) =>
  import("../../../commands/insights/insights.command.js").then((m) => m.runInsights);
export const fromCommandsIncidentsIncidentsCommand = commandModule(
  () => import("../../../commands/incidents/incidents.command.js"),
);
export const fromCommandsCoreRole = commandModule(() => import("../commands/core/role.js"));
export const loadPlatformSpec = (_session: NoContextSession) =>
  import("../commands/platform.js").then((m) => m.runPlatform);
export const loadPlatformListSpec = (_session: NoContextSession) =>
  import("../commands/platform.js").then((m) => m.runPlatformList);
export const loadPlatformExplainSpec = (_session: NoContextSession) =>
  import("../commands/platform.js").then((m) => m.runPlatformExplain);
export const loadPlatformDoctorSpec = (_session: NoContextSession) =>
  import("../commands/platform.js").then((m) => m.runPlatformDoctor);
export const fromCommandsDoctorRun = commandModule(() => import("../../../commands/doctor.run.js"));
export const fromCommandsDoctorGitLocksCommand = commandModule(
  () => import("../../../commands/doctor-git-locks.run.js"),
);
export const fromCommandsWorkflowCommand = commandModule(
  () => import("../../../commands/workflow.command.js"),
);
export const fromCommandsWorkflowBuildCommand = commandModule(
  () => import("../../../commands/workflow-build.command.js"),
);
export const fromCommandsWorkflowRestoreCommand = commandModule(
  () => import("../../../commands/workflow-restore.command.js"),
);
export const fromCommandsWorkflowMigrateCommand = commandModule(
  () => import("../../../commands/workflow-migrate.command.js"),
);
export const fromCommandsWorkflowPlaybookCommand = commandModule(
  () => import("../../../commands/workflow-playbook.command.js"),
);
export const loadCodexPluginInstallSpec = (deps: RunDeps) =>
  import("../commands/codex.js").then((m) => m.makeRunCodexPluginInstallHandler(deps));
export const loadIncidentsCollectSpec = (deps: RunDeps) =>
  import("../../../commands/incidents/collect.command.js").then((m) =>
    m.makeRunIncidentsCollectHandler(deps.getCtx),
  );
export const loadIncidentsAdviseSpec = (deps: RunDeps) =>
  import("../../../commands/incidents/advise.command.js").then((m) =>
    m.makeRunIncidentsAdviseHandler(deps.getCtx),
  );
export const loadAgentsSpec = (session: ProjectSession) =>
  import("../commands/core/agents.js").then((m) =>
    m.makeRunAgentsHandler({
      getResolvedProject: (command) => session.require("project", command),
    }),
  );
export const loadConfigShowSpec = (session: ProjectConfigSession) =>
  import("../commands/config.js").then((m) =>
    m.makeRunConfigShowHandler({
      getLoadedConfig: (command) => session.require("config", command),
    }),
  );
export const loadConfigSetSpec = (session: ProjectConfigSession) =>
  import("../commands/config.js").then((m) =>
    m.makeRunConfigSetHandler(getProjectConfigDeps(session)),
  );
export const loadModeGetSpec = (session: ProjectConfigSession) =>
  import("../commands/config.js").then((m) =>
    m.makeRunModeGetHandler(getProjectConfigDeps(session)),
  );
export const loadModeSetSpec = (session: ProjectConfigSession) =>
  import("../commands/config.js").then((m) =>
    m.makeRunModeSetHandler(getProjectConfigDeps(session)),
  );
export const loadProfileSetSpec = (session: ProjectConfigSession) =>
  import("../commands/config.js").then((m) =>
    m.makeRunProfileSetHandler(getProjectConfigDeps(session)),
  );
export const loadIdeSyncSpec = (session: ProjectSession) =>
  import("../commands/ide.js").then((m) => m.makeRunIdeSyncHandler(getProjectDeps(session)));
export const loadPlatformSyncSpec = (session: ProjectSession) =>
  import("../commands/platform.js").then((m) =>
    m.makeRunPlatformSyncHandler(getProjectDeps(session)),
  );
export const loadInsightsReportSpec = (session: InsightsReadSession) =>
  import("../../../commands/insights/insights.command.js").then((m) =>
    m.makeRunInsightsReportHandler(getProjectConfigDeps(session)),
  );
export const loadInsightsTriageSpec = (session: InsightsReadSession) =>
  import("../../../commands/insights/insights.command.js").then((m) =>
    m.makeRunInsightsTriageHandler(getProjectConfigDeps(session)),
  );
export const loadInsightsIssueSpec = (deps: RunDeps) =>
  import("../../../commands/insights/insights.command.js").then((m) =>
    m.makeRunInsightsIssueHandler(deps),
  );
export const loadIntakeSpec = (deps: RunDeps) =>
  import("../../../commands/intake/intake.command.js").then((m) => m.makeRunIntakeHandler(deps));
