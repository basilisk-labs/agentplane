import { commandModule, type RunDeps } from "../command-catalog/kernel.js";

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
export const fromCommandsCoreQuickstart = commandModule(
  () => import("../commands/core/quickstart.js"),
);
export const fromCommandsCorePreflight = commandModule(
  () => import("../commands/core/preflight.js"),
);
export const fromCommandsCodex = commandModule(() => import("../commands/codex.js"));
export const fromCommandsRuntimeCommand = commandModule(
  () => import("../../../commands/runtime.command.js"),
);
export const fromCommandsIncidentsIncidentsCommand = commandModule(
  () => import("../../../commands/incidents/incidents.command.js"),
);
export const fromCommandsCoreRole = commandModule(() => import("../commands/core/role.js"));
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
export const loadAgentsSpec = (deps: RunDeps) =>
  import("../commands/core/agents.js").then((m) => m.makeRunAgentsHandler(deps));
export const loadConfigShowSpec = (deps: RunDeps) =>
  import("../commands/config.js").then((m) => m.makeRunConfigShowHandler(deps));
export const loadConfigSetSpec = (deps: RunDeps) =>
  import("../commands/config.js").then((m) => m.makeRunConfigSetHandler(deps));
export const loadModeGetSpec = (deps: RunDeps) =>
  import("../commands/config.js").then((m) => m.makeRunModeGetHandler(deps));
export const loadModeSetSpec = (deps: RunDeps) =>
  import("../commands/config.js").then((m) => m.makeRunModeSetHandler(deps));
export const loadProfileSetSpec = (deps: RunDeps) =>
  import("../commands/config.js").then((m) => m.makeRunProfileSetHandler(deps));
export const loadIdeSyncSpec = (deps: RunDeps) =>
  import("../commands/ide.js").then((m) => m.makeRunIdeSyncHandler(deps));
