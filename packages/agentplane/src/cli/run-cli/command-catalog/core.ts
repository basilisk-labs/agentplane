import { doctorSpec } from "../../../commands/doctor.spec.js";
import { runtimeExplainSpec, runtimeSpec } from "../../../commands/runtime.command.js";
import { upgradeSpec } from "../../../commands/upgrade.command.js";
import { workflowBuildSpec } from "../../../commands/workflow-build.command.js";
import { workflowSpec } from "../../../commands/workflow.command.js";
import {
  workflowDebugSpec,
  workflowLandSpec,
  workflowSyncSpec,
} from "../../../commands/workflow-playbook.command.js";
import { workflowRestoreSpec } from "../../../commands/workflow-restore.command.js";
import { incidentsAdviseSpec } from "../../../commands/incidents/advise.command.js";
import { incidentsCollectSpec } from "../../../commands/incidents/collect.command.js";
import { incidentsSpec } from "../../../commands/incidents/incidents.command.js";
import { releaseApplySpec, releaseCandidateSpec } from "../../../commands/release/apply.command.js";
import { releasePlanSpec } from "../../../commands/release/plan.command.js";
import { releaseSpec } from "../../../commands/release/release.command.js";
import {
  configSetSpec,
  configShowSpec,
  modeGetSpec,
  modeSetSpec,
  profileSetSpec,
} from "../commands/config.js";
import { agentsSpec } from "../commands/core/agents.js";
import { codexPluginInstallSpec, codexPluginSpec, codexSpec } from "../commands/codex.js";
import { preflightSpec } from "../commands/core/preflight.js";
import { quickstartSpec } from "../commands/core/quickstart.js";
import { roleSpec } from "../commands/core/role.js";
import { ideSyncSpec } from "../commands/ide.js";
import { initSpec } from "../commands/init.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { commandModule, declareCommand, type CommandEntry } from "./shared.js";

const fromCommandsInit = commandModule(() => import("../commands/init.js"));
const fromCommandsUpgradeCommand = commandModule(
  () => import("../../../commands/upgrade.command.js"),
);
const fromCommandsReleaseReleaseCommand = commandModule(
  () => import("../../../commands/release/release.command.js"),
);
const fromCommandsReleasePlanCommand = commandModule(
  () => import("../../../commands/release/plan.command.js"),
);
const fromCommandsReleaseApplyCommand = commandModule(
  () => import("../../../commands/release/apply.command.js"),
);
const fromCommandsCoreQuickstart = commandModule(() => import("../commands/core/quickstart.js"));
const fromCommandsCorePreflight = commandModule(() => import("../commands/core/preflight.js"));
const fromCommandsCodex = commandModule(() => import("../commands/codex.js"));
const fromCommandsRuntimeCommand = commandModule(
  () => import("../../../commands/runtime.command.js"),
);
const fromCommandsIncidentsIncidentsCommand = commandModule(
  () => import("../../../commands/incidents/incidents.command.js"),
);
const fromCommandsCoreRole = commandModule(() => import("../commands/core/role.js"));
const fromCommandsDoctorRun = commandModule(() => import("../../../commands/doctor.run.js"));
const fromCommandsWorkflowCommand = commandModule(
  () => import("../../../commands/workflow.command.js"),
);
const fromCommandsWorkflowBuildCommand = commandModule(
  () => import("../../../commands/workflow-build.command.js"),
);
const fromCommandsWorkflowRestoreCommand = commandModule(
  () => import("../../../commands/workflow-restore.command.js"),
);
const fromCommandsWorkflowPlaybookCommand = commandModule(
  () => import("../../../commands/workflow-playbook.command.js"),
);

export const CORE_COMMANDS = [
  fromCommandsInit(initSpec, "runInit", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["init"]),
  }),
  fromCommandsUpgradeCommand(upgradeSpec, "runUpgrade", { needs: "none" }),
  fromCommandsReleaseReleaseCommand(releaseSpec, "runRelease", { needs: "none" }),
  fromCommandsReleasePlanCommand(releasePlanSpec, "runReleasePlan", { needs: "project" }),
  fromCommandsReleaseApplyCommand(releaseApplySpec, "runReleaseApply", { needs: "project" }),
  fromCommandsReleaseApplyCommand(releaseCandidateSpec, "runReleaseCandidate", {
    needs: "project",
  }),
  fromCommandsCoreQuickstart(quickstartSpec, "runQuickstart", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["quickstart"]),
  }),
  fromCommandsCorePreflight(preflightSpec, "runPreflight", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["preflight"]),
  }),
  fromCommandsCodex(codexSpec, "runCodex", { needs: "none" }),
  fromCommandsCodex(codexPluginSpec, "runCodexPlugin", { needs: "none" }),
  declareCommand(codexPluginInstallSpec, {
    load: (deps) =>
      import("../commands/codex.js").then((m) => m.makeRunCodexPluginInstallHandler(deps)),
    needs: "none",
  }),
  fromCommandsRuntimeCommand(runtimeSpec, "runRuntime", { needs: "none" }),
  fromCommandsRuntimeCommand(runtimeExplainSpec, "runRuntimeExplain", { needs: "none" }),
  fromCommandsIncidentsIncidentsCommand(incidentsSpec, "runIncidents", { needs: "none" }),
  declareCommand(incidentsCollectSpec, {
    load: (deps) =>
      import("../../../commands/incidents/collect.command.js").then((m) =>
        m.makeRunIncidentsCollectHandler(deps.getCtx),
      ),
  }),
  declareCommand(incidentsAdviseSpec, {
    load: (deps) =>
      import("../../../commands/incidents/advise.command.js").then((m) =>
        m.makeRunIncidentsAdviseHandler(deps.getCtx),
      ),
  }),
  fromCommandsCoreRole(roleSpec, "runRole", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["role"]),
  }),
  declareCommand(agentsSpec, {
    load: (deps) => import("../commands/core/agents.js").then((m) => m.makeRunAgentsHandler(deps)),
    needs: "project",
  }),
  declareCommand(configShowSpec, {
    load: (deps) => import("../commands/config.js").then((m) => m.makeRunConfigShowHandler(deps)),
    needs: "project+config",
    invocation: requireCanonicalCommandInvocation(["config", "show"]),
  }),
  declareCommand(configSetSpec, {
    load: (deps) => import("../commands/config.js").then((m) => m.makeRunConfigSetHandler(deps)),
    needs: "project+config",
  }),
  declareCommand(modeGetSpec, {
    load: (deps) => import("../commands/config.js").then((m) => m.makeRunModeGetHandler(deps)),
    needs: "project+config",
  }),
  declareCommand(modeSetSpec, {
    load: (deps) => import("../commands/config.js").then((m) => m.makeRunModeSetHandler(deps)),
    needs: "project+config",
  }),
  declareCommand(profileSetSpec, {
    load: (deps) => import("../commands/config.js").then((m) => m.makeRunProfileSetHandler(deps)),
    needs: "project+config",
  }),
  declareCommand(ideSyncSpec, {
    load: (deps) => import("../commands/ide.js").then((m) => m.makeRunIdeSyncHandler(deps)),
    needs: "project",
  }),
  fromCommandsDoctorRun(doctorSpec, "runDoctor", { needs: "project" }),
  fromCommandsWorkflowCommand(workflowSpec, "runWorkflow", { needs: "none" }),
  fromCommandsWorkflowBuildCommand(workflowBuildSpec, "runWorkflowBuild", { needs: "project" }),
  fromCommandsWorkflowRestoreCommand(workflowRestoreSpec, "runWorkflowRestore", {
    needs: "project",
  }),
  fromCommandsWorkflowPlaybookCommand(workflowDebugSpec, "runWorkflowDebug", { needs: "project" }),
  fromCommandsWorkflowPlaybookCommand(workflowSyncSpec, "runWorkflowSync", { needs: "project" }),
  fromCommandsWorkflowPlaybookCommand(workflowLandSpec, "runWorkflowLand", { needs: "project" }),
] as const satisfies readonly CommandEntry[];
