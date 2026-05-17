import { doctorSpec } from "../../../commands/doctor.spec.js";
import { doctorGitLocksSpec } from "../../../commands/doctor-git-locks.spec.js";
import { runtimeExplainSpec, runtimeSpec } from "../../../commands/runtime.spec.js";
import {
  insightsIssueSpec,
  insightsReportSpec,
  insightsSpec,
} from "../../../commands/insights/insights.spec.js";
import { upgradeSpec } from "../../../commands/upgrade.spec.js";
import { workflowBuildSpec } from "../../../commands/workflow-build.command.js";
import { workflowSpec } from "../../../commands/workflow.command.js";
import {
  workflowDebugSpec,
  workflowLandSpec,
  workflowSyncSpec,
} from "../../../commands/workflow-playbook.spec.js";
import { workflowRestoreSpec } from "../../../commands/workflow-restore.command.js";
import { incidentsAdviseSpec } from "../../../commands/incidents/advise.command.js";
import { incidentsCollectSpec } from "../../../commands/incidents/collect.command.js";
import { incidentsSpec } from "../../../commands/incidents/incidents.command.js";
import { releaseApplySpec, releaseCandidateSpec } from "../../../commands/release/apply.spec.js";
import { releasePlanSpec } from "../../../commands/release/plan.spec.js";
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
import { demoSpec } from "../commands/core/demo.js";
import { preflightSpec } from "../commands/core/preflight.js";
import { quickstartSpec } from "../commands/core/quickstart.js";
import { roleSpec } from "../commands/core/role.js";
import { ideSyncSpec } from "../commands/ide.js";
import { initSpec } from "../commands/init/spec.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { declareCommand, type CommandEntry } from "./kernel.js";
import {
  fromCommandsInit,
  fromCommandsUpgradeCommand,
  fromCommandsReleaseReleaseCommand,
  fromCommandsReleasePlanCommand,
  fromCommandsReleaseApplyCommand,
  fromCommandsCoreQuickstart,
  fromCommandsCorePreflight,
  fromCommandsCodex,
  fromCommandsRuntimeCommand,
  fromCommandsInsightsCommand,
  fromCommandsIncidentsIncidentsCommand,
  fromCommandsCoreRole,
  fromCommandsDoctorRun,
  fromCommandsDoctorGitLocksCommand,
  fromCommandsWorkflowCommand,
  fromCommandsWorkflowBuildCommand,
  fromCommandsWorkflowRestoreCommand,
  fromCommandsWorkflowPlaybookCommand,
  loadCodexPluginInstallSpec,
  loadIncidentsCollectSpec,
  loadIncidentsAdviseSpec,
  loadAgentsSpec,
  loadConfigShowSpec,
  loadConfigSetSpec,
  loadModeGetSpec,
  loadModeSetSpec,
  loadProfileSetSpec,
  loadIdeSyncSpec,
  loadInsightsIssueSpec,
  loadInsightsReportSpec,
  loadDemoSpec,
} from "../command-loaders/core.js";

export const CORE_COMMANDS = [
  fromCommandsInit(initSpec, "runInit", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["init"]),
  }),
  fromCommandsUpgradeCommand(upgradeSpec, "runUpgrade", { needs: "none" }),
  fromCommandsReleaseReleaseCommand(releaseSpec, "runRelease", {
    needs: "none",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsReleasePlanCommand(releasePlanSpec, "runReleasePlan", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsReleaseApplyCommand(releaseApplySpec, "runReleaseApply", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsReleaseApplyCommand(releaseCandidateSpec, "runReleaseCandidate", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsCoreQuickstart(quickstartSpec, "runQuickstart", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["quickstart"]),
  }),
  declareCommand(demoSpec, {
    load: loadDemoSpec,
    needs: "project+config+task",
    invocation: requireCanonicalCommandInvocation(["demo"]),
  }),
  fromCommandsCorePreflight(preflightSpec, "runPreflight", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["preflight"]),
  }),
  fromCommandsCodex(codexSpec, "runCodex", {
    needs: "none",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsCodex(codexPluginSpec, "runCodexPlugin", {
    needs: "none",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  declareCommand(codexPluginInstallSpec, {
    load: loadCodexPluginInstallSpec,
    needs: "none",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsRuntimeCommand(runtimeSpec, "runRuntime", { needs: "none" }),
  fromCommandsRuntimeCommand(runtimeExplainSpec, "runRuntimeExplain", { needs: "none" }),
  fromCommandsInsightsCommand(insightsSpec, "runInsights", { needs: "none" }),
  declareCommand(insightsReportSpec, {
    load: loadInsightsReportSpec,
    needs: "project+config",
  }),
  declareCommand(insightsIssueSpec, {
    load: loadInsightsIssueSpec,
    needs: "project+config",
  }),
  fromCommandsDoctorGitLocksCommand(doctorGitLocksSpec, "runDoctorGitLocks", {
    needs: "project",
  }),
  fromCommandsIncidentsIncidentsCommand(incidentsSpec, "runIncidents", { needs: "none" }),
  declareCommand(incidentsCollectSpec, { load: loadIncidentsCollectSpec }),
  declareCommand(incidentsAdviseSpec, { load: loadIncidentsAdviseSpec }),
  fromCommandsCoreRole(roleSpec, "runRole", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["role"]),
  }),
  declareCommand(agentsSpec, { load: loadAgentsSpec, needs: "project" }),
  declareCommand(configShowSpec, {
    load: loadConfigShowSpec,
    needs: "project+config",
    invocation: requireCanonicalCommandInvocation(["config", "show"]),
  }),
  declareCommand(configSetSpec, { load: loadConfigSetSpec, needs: "project+config" }),
  declareCommand(modeGetSpec, { load: loadModeGetSpec, needs: "project+config" }),
  declareCommand(modeSetSpec, { load: loadModeSetSpec, needs: "project+config" }),
  declareCommand(profileSetSpec, { load: loadProfileSetSpec, needs: "project+config" }),
  declareCommand(ideSyncSpec, { load: loadIdeSyncSpec, needs: "project" }),
  fromCommandsDoctorRun(doctorSpec, "runDoctor", { needs: "project" }),
  fromCommandsWorkflowCommand(workflowSpec, "runWorkflow", {
    needs: "none",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowBuildCommand(workflowBuildSpec, "runWorkflowBuild", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowRestoreCommand(workflowRestoreSpec, "runWorkflowRestore", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowPlaybookCommand(workflowDebugSpec, "runWorkflowDebug", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowPlaybookCommand(workflowSyncSpec, "runWorkflowSync", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowPlaybookCommand(workflowLandSpec, "runWorkflowLand", {
    needs: "project",
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
] as const satisfies readonly CommandEntry[];
