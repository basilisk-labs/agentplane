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
import { releaseApplySpec } from "../../../commands/release/apply.command.js";
import { releasePlanSpec } from "../../../commands/release/plan.command.js";
import { releaseSpec } from "../../../commands/release/release.command.js";
import {
  configSetSpec,
  configShowSpec,
  modeGetSpec,
  modeSetSpec,
  profileSetSpec,
} from "../commands/config.js";
import { agentsSpec, preflightSpec, quickstartSpec, roleSpec } from "../commands/core.js";
import { ideSyncSpec } from "../commands/ide.js";
import { initSpec } from "../commands/init.js";

import { entry, type CommandEntry } from "./shared.js";

export const CORE_COMMANDS = [
  entry(initSpec, () => import("../commands/init.js").then((m) => m.runInit), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(
    upgradeSpec,
    () => import("../../../commands/upgrade.command.js").then((m) => m.runUpgrade),
    {
      needsProject: false,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    releaseSpec,
    () => import("../../../commands/release/release.command.js").then((m) => m.runRelease),
    {
      needsProject: false,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    releasePlanSpec,
    () => import("../../../commands/release/plan.command.js").then((m) => m.runReleasePlan),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    releaseApplySpec,
    () => import("../../../commands/release/apply.command.js").then((m) => m.runReleaseApply),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(quickstartSpec, () => import("../commands/core.js").then((m) => m.runQuickstart), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(preflightSpec, () => import("../commands/core.js").then((m) => m.runPreflight), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(
    runtimeSpec,
    () => import("../../../commands/runtime.command.js").then((m) => m.runRuntime),
    {
      needsProject: false,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    runtimeExplainSpec,
    () => import("../../../commands/runtime.command.js").then((m) => m.runRuntimeExplain),
    {
      needsProject: false,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(roleSpec, () => import("../commands/core.js").then((m) => m.runRole), {
    needsProject: false,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(
    agentsSpec,
    (deps) => import("../commands/core.js").then((m) => m.makeRunAgentsHandler(deps)),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    configShowSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunConfigShowHandler(deps)),
    {
      needsProject: true,
      needsConfig: true,
      needsTaskContext: false,
    },
  ),
  entry(
    configSetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunConfigSetHandler(deps)),
    {
      needsProject: true,
      needsConfig: true,
      needsTaskContext: false,
    },
  ),
  entry(
    modeGetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunModeGetHandler(deps)),
    {
      needsProject: true,
      needsConfig: true,
      needsTaskContext: false,
    },
  ),
  entry(
    modeSetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunModeSetHandler(deps)),
    {
      needsProject: true,
      needsConfig: true,
      needsTaskContext: false,
    },
  ),
  entry(
    profileSetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunProfileSetHandler(deps)),
    {
      needsProject: true,
      needsConfig: true,
      needsTaskContext: false,
    },
  ),
  entry(
    ideSyncSpec,
    (deps) => import("../commands/ide.js").then((m) => m.makeRunIdeSyncHandler(deps)),
    {
      needsProject: true,
      needsConfig: true,
      needsTaskContext: false,
    },
  ),
  entry(doctorSpec, () => import("../../../commands/doctor.run.js").then((m) => m.runDoctor), {
    needsProject: true,
    needsConfig: false,
    needsTaskContext: false,
  }),
  entry(
    workflowSpec,
    () => import("../../../commands/workflow.command.js").then((m) => m.runWorkflow),
    {
      needsProject: false,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    workflowBuildSpec,
    () => import("../../../commands/workflow-build.command.js").then((m) => m.runWorkflowBuild),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    workflowRestoreSpec,
    () => import("../../../commands/workflow-restore.command.js").then((m) => m.runWorkflowRestore),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    workflowDebugSpec,
    () => import("../../../commands/workflow-playbook.command.js").then((m) => m.runWorkflowDebug),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    workflowSyncSpec,
    () => import("../../../commands/workflow-playbook.command.js").then((m) => m.runWorkflowSync),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
  entry(
    workflowLandSpec,
    () => import("../../../commands/workflow-playbook.command.js").then((m) => m.runWorkflowLand),
    {
      needsProject: true,
      needsConfig: false,
      needsTaskContext: false,
    },
  ),
] as const satisfies readonly CommandEntry[];
