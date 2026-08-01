import { doctorSpec } from "../../../commands/doctor.spec.js";
import { doctorGitLocksSpec } from "../../../commands/doctor-git-locks.spec.js";
import { runtimeExplainSpec, runtimeSpec } from "../../../commands/runtime.spec.js";
import {
  insightsIssueSpec,
  insightsReportSpec,
  insightsSpec,
  insightsTriageSpec,
} from "../../../commands/insights/insights.spec.js";
import { intakeSpec } from "../../../commands/intake/intake.command.js";
import { upgradeSpec } from "../../../commands/upgrade.spec.js";
import { workflowBuildSpec } from "../../../commands/workflow-build.command.js";
import { workflowSpec } from "../../../commands/workflow.command.js";
import {
  workflowDebugSpec,
  workflowLandSpec,
  workflowSyncSpec,
} from "../../../commands/workflow-playbook.spec.js";
import { workflowRestoreSpec } from "../../../commands/workflow-restore.command.js";
import { workflowMigrateSpec } from "../../../commands/workflow-migrate.command.js";
import { incidentsAdviseSpec } from "../../../commands/incidents/advise.command.js";
import { incidentsCollectSpec } from "../../../commands/incidents/collect.command.js";
import { incidentsSpec } from "../../../commands/incidents/incidents.command.js";
import { releaseApplySpec, releaseCandidateSpec } from "../../../commands/release/apply.spec.js";
import { releasePlanSpec } from "../../../commands/release/plan.spec.js";
import { releaseSpec } from "../../../commands/release/release.command.js";
import { releaseTasksReconcileSpec } from "../../../commands/release/tasks-reconcile.command.js";
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
import {
  platformDoctorSpec,
  platformExplainSpec,
  platformListSpec,
  platformSpec,
  platformSyncSpec,
} from "../commands/platform.js";
import { initSpec } from "../commands/init/spec.js";
import { requireCanonicalCommandInvocation } from "../../command-invocations.js";

import { declareCommand, declareSessionCommand, type CommandEntry } from "./kernel.js";
import {
  NO_CONTEXT_REQUIREMENTS,
  PROJECT_CONFIG_REQUIREMENTS,
  PROJECT_REQUIREMENTS,
} from "./project-capability-profiles.js";
import {
  PROVIDER_WRITE_REQUIREMENTS,
  RELEASE_PLAN_REQUIREMENTS,
  RELEASE_PUBLISH_REQUIREMENTS,
} from "./provider-ops-capability-profiles.js";
import {
  fromCommandsInit,
  fromCommandsUpgradeCommand,
  loadReleaseSpec,
  loadReleasePlanSpec,
  loadReleaseApplySpec,
  loadReleaseCandidateSpec,
  fromCommandsCoreQuickstart,
  fromCommandsCorePreflight,
  fromCommandsCodex,
  loadRuntimeSpec,
  loadRuntimeExplainSpec,
  fromCommandsInsightsCommand,
  fromCommandsIncidentsIncidentsCommand,
  fromCommandsCoreRole,
  loadPlatformSpec,
  loadPlatformListSpec,
  loadPlatformExplainSpec,
  loadPlatformDoctorSpec,
  fromCommandsDoctorRun,
  fromCommandsDoctorGitLocksCommand,
  fromCommandsWorkflowCommand,
  fromCommandsWorkflowBuildCommand,
  fromCommandsWorkflowRestoreCommand,
  fromCommandsWorkflowMigrateCommand,
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
  loadPlatformSyncSpec,
  loadInsightsIssueSpec,
  loadInsightsReportSpec,
  loadInsightsTriageSpec,
  loadIntakeSpec,
  loadDemoSpec,
  loadReleaseTasksReconcileSpec,
} from "../command-loaders/core.js";

export const CORE_COMMANDS = [
  fromCommandsInit(initSpec, "runInit", {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["init"]),
  }),
  fromCommandsUpgradeCommand(upgradeSpec, "runUpgrade", { needs: "none" }),
  declareSessionCommand(releaseSpec, {
    load: loadReleaseSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  declareSessionCommand(releasePlanSpec, {
    load: loadReleasePlanSpec,
    requirements: RELEASE_PLAN_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  declareSessionCommand(releaseApplySpec, {
    load: loadReleaseApplySpec,
    requirements: RELEASE_PUBLISH_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  declareSessionCommand(releaseCandidateSpec, {
    load: loadReleaseCandidateSpec,
    requirements: RELEASE_PUBLISH_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  declareSessionCommand(releaseTasksReconcileSpec, {
    load: loadReleaseTasksReconcileSpec,
    requirements: PROVIDER_WRITE_REQUIREMENTS,
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
  declareSessionCommand(runtimeSpec, {
    load: loadRuntimeSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(runtimeExplainSpec, {
    load: loadRuntimeExplainSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromCommandsInsightsCommand(insightsSpec, "runInsights", { needs: "none" }),
  declareCommand(insightsReportSpec, {
    load: loadInsightsReportSpec,
    needs: "project+config",
  }),
  declareCommand(insightsTriageSpec, {
    load: loadInsightsTriageSpec,
    needs: "project+config",
  }),
  declareCommand(insightsIssueSpec, {
    load: loadInsightsIssueSpec,
    needs: "project+config",
  }),
  declareCommand(intakeSpec, {
    load: loadIntakeSpec,
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
  declareSessionCommand(platformSpec, {
    load: loadPlatformSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(platformListSpec, {
    load: loadPlatformListSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(platformSyncSpec, {
    load: loadPlatformSyncSpec,
    requirements: PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(platformExplainSpec, {
    load: loadPlatformExplainSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(platformDoctorSpec, {
    load: loadPlatformDoctorSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(agentsSpec, {
    load: loadAgentsSpec,
    requirements: PROJECT_REQUIREMENTS,
  }),
  declareSessionCommand(configShowSpec, {
    load: loadConfigShowSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["config", "show"]),
  }),
  declareSessionCommand(configSetSpec, {
    load: loadConfigSetSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  declareSessionCommand(modeGetSpec, {
    load: loadModeGetSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  declareSessionCommand(modeSetSpec, {
    load: loadModeSetSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  declareSessionCommand(profileSetSpec, {
    load: loadProfileSetSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  declareSessionCommand(ideSyncSpec, {
    load: loadIdeSyncSpec,
    requirements: PROJECT_REQUIREMENTS,
  }),
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
  fromCommandsWorkflowMigrateCommand(workflowMigrateSpec, "runWorkflowMigrate", {
    needs: "project",
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
