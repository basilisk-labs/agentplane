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

import {
  declareCommand,
  declareConditionalSessionCommand,
  declareSessionCommand,
  type CommandEntry,
} from "./kernel.js";
import {
  NO_CONTEXT_REQUIREMENTS,
  PROJECT_CONFIG_REQUIREMENTS,
  PROJECT_REQUIREMENTS,
} from "./project-capability-profiles.js";
import { INSIGHTS_READ_REQUIREMENTS } from "./runner-hermes-capability-profiles.js";
import {
  PROVIDER_WRITE_REQUIREMENTS,
  RELEASE_PLAN_REQUIREMENTS,
  RELEASE_PUBLISH_REQUIREMENTS,
} from "./provider-ops-capability-profiles.js";
import { TASK_READ_REQUIREMENTS, TASK_WRITE_REQUIREMENTS } from "./task-capability-profiles.js";
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
  loadInsightsSpec,
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
  loadCodexPluginInstallRepoSpec,
  loadCodexPluginInstallUserSpec,
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
    requirements: NO_CONTEXT_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["init"]),
  }),
  fromCommandsUpgradeCommand(upgradeSpec, "runUpgrade", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
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
    requirements: NO_CONTEXT_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["quickstart"]),
  }),
  declareCommand(demoSpec, {
    load: loadDemoSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["demo"]),
  }),
  fromCommandsCorePreflight(preflightSpec, "runPreflight", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    invocation: requireCanonicalCommandInvocation(["preflight"]),
  }),
  fromCommandsCodex(codexSpec, "runCodex", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsCodex(codexPluginSpec, "runCodexPlugin", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  declareConditionalSessionCommand(codexPluginInstallSpec, {
    default: {
      load: loadCodexPluginInstallUserSpec,
      requirements: NO_CONTEXT_REQUIREMENTS,
    },
    selected: {
      when: (parsed) => parsed.scope === "repo",
      load: loadCodexPluginInstallRepoSpec,
      requirements: PROJECT_REQUIREMENTS,
    },
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
  declareSessionCommand(insightsSpec, {
    load: loadInsightsSpec,
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareSessionCommand(insightsReportSpec, {
    load: loadInsightsReportSpec,
    requirements: INSIGHTS_READ_REQUIREMENTS,
  }),
  declareSessionCommand(insightsTriageSpec, {
    load: loadInsightsTriageSpec,
    requirements: INSIGHTS_READ_REQUIREMENTS,
  }),
  declareCommand(insightsIssueSpec, {
    load: loadInsightsIssueSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  declareCommand(intakeSpec, {
    load: loadIntakeSpec,
    requirements: PROJECT_CONFIG_REQUIREMENTS,
  }),
  fromCommandsDoctorGitLocksCommand(doctorGitLocksSpec, "runDoctorGitLocks", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromCommandsIncidentsIncidentsCommand(incidentsSpec, "runIncidents", {
    requirements: NO_CONTEXT_REQUIREMENTS,
  }),
  declareCommand(incidentsCollectSpec, {
    load: loadIncidentsCollectSpec,
    requirements: TASK_WRITE_REQUIREMENTS,
  }),
  declareCommand(incidentsAdviseSpec, {
    load: loadIncidentsAdviseSpec,
    requirements: TASK_READ_REQUIREMENTS,
  }),
  fromCommandsCoreRole(roleSpec, "runRole", {
    requirements: NO_CONTEXT_REQUIREMENTS,
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
  fromCommandsDoctorRun(doctorSpec, "runDoctor", { requirements: PROJECT_REQUIREMENTS }),
  fromCommandsWorkflowCommand(workflowSpec, "runWorkflow", {
    requirements: NO_CONTEXT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowBuildCommand(workflowBuildSpec, "runWorkflowBuild", {
    requirements: PROJECT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowRestoreCommand(workflowRestoreSpec, "runWorkflowRestore", {
    requirements: PROJECT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowMigrateCommand(workflowMigrateSpec, "runWorkflowMigrate", {
    requirements: PROJECT_REQUIREMENTS,
  }),
  fromCommandsWorkflowPlaybookCommand(workflowDebugSpec, "runWorkflowDebug", {
    requirements: PROJECT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowPlaybookCommand(workflowSyncSpec, "runWorkflowSync", {
    requirements: PROJECT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
  fromCommandsWorkflowPlaybookCommand(workflowLandSpec, "runWorkflowLand", {
    requirements: PROJECT_REQUIREMENTS,
    surface: "framework",
    helpGroup: "Framework Dev",
  }),
] as const satisfies readonly CommandEntry[];
