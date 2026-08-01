import { commandModule } from "../command-catalog/kernel.js";
import type { CommandContext } from "../../../commands/shared/task-backend.js";
import type {
  NoContextSession,
  ProjectConfigSession,
  ProjectSession,
} from "../command-catalog/project-capability-profiles.js";
import type {
  TaskReadSession,
  TaskWriteSession,
} from "../command-catalog/task-capability-profiles.js";
import type {
  ProviderWriteSession,
  ReleasePlanSession,
  ReleasePublishSession,
} from "../command-catalog/provider-ops-capability-profiles.js";
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
export const loadReleaseSpec = (_session: NoContextSession) =>
  import("../../../commands/release/release.command.js").then((m) => m.runRelease);
export const loadReleasePlanSpec = (session: ReleasePlanSession) =>
  import("../../../commands/release/plan.command.js").then((m) => {
    const handler = m.runReleasePlan;
    return async (...[ctx, parsed]: Parameters<typeof handler>) => {
      await session.require("git.diff", "release plan");
      await session.require("approvals", "release plan");
      const project = await session.require("project", "release plan");
      return await handler({ ...ctx, rootOverride: project.gitRoot }, parsed);
    };
  });
const loadReleasePublishHandler = (session: ReleasePublishSession, kind: "apply" | "candidate") =>
  import("../../../commands/release/apply.command.js").then((m) => {
    const handler = kind === "apply" ? m.runReleaseApply : m.runReleaseCandidate;
    const command = `release ${kind}`;
    return async (...[ctx, parsed]: Parameters<typeof handler>) => {
      await session.require("git.mutate", command);
      await session.require("approvals", command);
      await session.require("provider", command);
      const project = await session.require("project", command);
      return await handler({ ...ctx, rootOverride: project.gitRoot }, parsed);
    };
  });
export const loadReleaseApplySpec = (session: ReleasePublishSession) =>
  loadReleasePublishHandler(session, "apply");
export const loadReleaseCandidateSpec = (session: ReleasePublishSession) =>
  loadReleasePublishHandler(session, "candidate");
export const loadReleaseTasksReconcileSpec = (session: ProviderWriteSession) =>
  import("../../../commands/release/tasks-reconcile.command.js").then((m) =>
    m.makeRunReleaseTasksReconcileHandler(async (command) => {
      await session.require("git.mutate", command);
      await session.require("route.remote", command);
      await session.require("approvals", command);
      return (await session.require("provider", command)) as CommandContext;
    }),
  );
export const fromCommandsCoreQuickstart = commandModule(
  () => import("../commands/core/quickstart.js"),
);
export const loadDemoSpec = (session: TaskWriteSession) =>
  import("../commands/core/demo.js").then((m) =>
    m.makeRunDemoHandler((command) => session.require("task.write", command)),
  );
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
export const loadCodexPluginInstallUserSpec = (_session: NoContextSession) =>
  import("../commands/codex.js").then((m) => m.makeRunCodexPluginInstallHandler(null));
export const loadCodexPluginInstallRepoSpec = (session: ProjectSession) =>
  import("../commands/codex.js").then((m) =>
    m.makeRunCodexPluginInstallHandler({
      getResolvedProject: (command) => session.require("project", command),
    }),
  );
export const loadIncidentsCollectSpec = (session: TaskWriteSession) =>
  import("../../../commands/incidents/collect.command.js").then((m) =>
    m.makeRunIncidentsCollectHandler((command) => session.require("task.write", command)),
  );
export const loadIncidentsAdviseSpec = (session: TaskReadSession) =>
  import("../../../commands/incidents/advise.command.js").then((m) =>
    m.makeRunIncidentsAdviseHandler((command) => session.require("task.read", command)),
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
export const loadInsightsIssueSpec = (session: ProjectConfigSession) =>
  import("../../../commands/insights/insights.command.js").then((m) =>
    m.makeRunInsightsIssueHandler(getProjectConfigDeps(session)),
  );
export const loadIntakeSpec = (session: ProjectConfigSession) =>
  import("../../../commands/intake/intake.command.js").then((m) =>
    m.makeRunIntakeHandler(getProjectConfigDeps(session)),
  );
