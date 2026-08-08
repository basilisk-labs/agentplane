import type { ProjectConfigSession } from "../command-catalog/project-capability-profiles.js";
import type { LocalOpsWriteSession } from "../command-catalog/provider-ops-capability-profiles.js";
import type { TaskRouteLocalSession } from "../command-catalog/task-capability-profiles.js";
import { commandModule } from "../command-catalog/kernel.js";

export const fromCommandsEvidenceCommand = commandModule(
  () => import("../../../commands/evidence/evidence.command.js"),
);

export const loadEvidenceBundleSpec = (session: TaskRouteLocalSession) =>
  import("../../../commands/evidence/evidence.command.js").then((module) =>
    module.makeRunEvidenceBundleHandler((command) => session.require("route.local", command)),
  );

export const loadEvidenceVerifySpec = (session: TaskRouteLocalSession) =>
  import("../../../commands/evidence/evidence.command.js").then((module) =>
    module.makeRunEvidenceVerifyHandler((command) => session.require("route.local", command)),
  );

const getProjectConfigMaintenanceContext = (session: ProjectConfigSession) => ({
  getResolvedProject: (command: string) => session.require("project", command),
  getLoadedConfig: (command: string) => session.require("config", command),
});

export const loadEvidenceStatsSpec = (session: ProjectConfigSession) =>
  import("../../../commands/evidence/evidence-maintenance.command.js").then((module) =>
    module.makeRunEvidenceStatsHandler(getProjectConfigMaintenanceContext(session)),
  );

const getMutationMaintenanceContext = (session: LocalOpsWriteSession) => ({
  getResolvedProject: (command: string) => session.require("project", command),
  getLoadedConfig: (command: string) => session.require("config", command),
  getMutationContext: (command: string) => session.require("git.mutate", command),
});

export const loadEvidenceCompactSpec = (session: LocalOpsWriteSession) =>
  import("../../../commands/evidence/evidence-maintenance.command.js").then((module) =>
    module.makeRunEvidenceCompactHandler(getMutationMaintenanceContext(session)),
  );

export const loadEvidenceGcSpec = (session: LocalOpsWriteSession) =>
  import("../../../commands/evidence/evidence-maintenance.command.js").then((module) =>
    module.makeRunEvidenceGcHandler(getMutationMaintenanceContext(session)),
  );
