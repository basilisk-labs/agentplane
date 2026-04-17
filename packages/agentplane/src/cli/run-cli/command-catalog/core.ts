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

import { entry, type CommandEntry } from "./shared.js";

export const CORE_COMMANDS = [
  entry(initSpec, () => import("../commands/init.js").then((m) => m.runInit), {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["init"]),
  }),
  entry(
    upgradeSpec,
    () => import("../../../commands/upgrade.command.js").then((m) => m.runUpgrade),
    {
      needs: "none",
    },
  ),
  entry(
    releaseSpec,
    () => import("../../../commands/release/release.command.js").then((m) => m.runRelease),
    {
      needs: "none",
    },
  ),
  entry(
    releasePlanSpec,
    () => import("../../../commands/release/plan.command.js").then((m) => m.runReleasePlan),
    {
      needs: "project",
    },
  ),
  entry(
    releaseApplySpec,
    () => import("../../../commands/release/apply.command.js").then((m) => m.runReleaseApply),
    {
      needs: "project",
    },
  ),
  entry(
    releaseCandidateSpec,
    () => import("../../../commands/release/apply.command.js").then((m) => m.runReleaseCandidate),
    {
      needs: "project",
    },
  ),
  entry(
    quickstartSpec,
    () => import("../commands/core/quickstart.js").then((m) => m.runQuickstart),
    {
      needs: "none",
      invocation: requireCanonicalCommandInvocation(["quickstart"]),
    },
  ),
  entry(preflightSpec, () => import("../commands/core/preflight.js").then((m) => m.runPreflight), {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["preflight"]),
  }),
  entry(codexSpec, () => import("../commands/codex.js").then((m) => m.runCodex), {
    needs: "none",
  }),
  entry(codexPluginSpec, () => import("../commands/codex.js").then((m) => m.runCodexPlugin), {
    needs: "none",
  }),
  entry(
    codexPluginInstallSpec,
    (deps) => import("../commands/codex.js").then((m) => m.makeRunCodexPluginInstallHandler(deps)),
    {
      needs: "none",
    },
  ),
  entry(
    runtimeSpec,
    () => import("../../../commands/runtime.command.js").then((m) => m.runRuntime),
    {
      needs: "none",
    },
  ),
  entry(
    runtimeExplainSpec,
    () => import("../../../commands/runtime.command.js").then((m) => m.runRuntimeExplain),
    {
      needs: "none",
    },
  ),
  entry(
    incidentsSpec,
    () => import("../../../commands/incidents/incidents.command.js").then((m) => m.runIncidents),
    {
      needs: "none",
    },
  ),
  entry(incidentsCollectSpec, (deps) =>
    import("../../../commands/incidents/collect.command.js").then((m) =>
      m.makeRunIncidentsCollectHandler(deps.getCtx),
    ),
  ),
  entry(incidentsAdviseSpec, (deps) =>
    import("../../../commands/incidents/advise.command.js").then((m) =>
      m.makeRunIncidentsAdviseHandler(deps.getCtx),
    ),
  ),
  entry(roleSpec, () => import("../commands/core/role.js").then((m) => m.runRole), {
    needs: "none",
    invocation: requireCanonicalCommandInvocation(["role"]),
  }),
  entry(
    agentsSpec,
    (deps) => import("../commands/core/agents.js").then((m) => m.makeRunAgentsHandler(deps)),
    {
      needs: "project",
    },
  ),
  entry(
    configShowSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunConfigShowHandler(deps)),
    {
      needs: "project+config",
      invocation: requireCanonicalCommandInvocation(["config", "show"]),
    },
  ),
  entry(
    configSetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunConfigSetHandler(deps)),
    {
      needs: "project+config",
    },
  ),
  entry(
    modeGetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunModeGetHandler(deps)),
    {
      needs: "project+config",
    },
  ),
  entry(
    modeSetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunModeSetHandler(deps)),
    {
      needs: "project+config",
    },
  ),
  entry(
    profileSetSpec,
    (deps) => import("../commands/config.js").then((m) => m.makeRunProfileSetHandler(deps)),
    {
      needs: "project+config",
    },
  ),
  entry(
    ideSyncSpec,
    (deps) => import("../commands/ide.js").then((m) => m.makeRunIdeSyncHandler(deps)),
    {
      needs: "project",
    },
  ),
  entry(doctorSpec, () => import("../../../commands/doctor.run.js").then((m) => m.runDoctor), {
    needs: "project",
  }),
  entry(
    workflowSpec,
    () => import("../../../commands/workflow.command.js").then((m) => m.runWorkflow),
    {
      needs: "none",
    },
  ),
  entry(
    workflowBuildSpec,
    () => import("../../../commands/workflow-build.command.js").then((m) => m.runWorkflowBuild),
    {
      needs: "project",
    },
  ),
  entry(
    workflowRestoreSpec,
    () => import("../../../commands/workflow-restore.command.js").then((m) => m.runWorkflowRestore),
    {
      needs: "project",
    },
  ),
  entry(
    workflowDebugSpec,
    () => import("../../../commands/workflow-playbook.command.js").then((m) => m.runWorkflowDebug),
    {
      needs: "project",
    },
  ),
  entry(
    workflowSyncSpec,
    () => import("../../../commands/workflow-playbook.command.js").then((m) => m.runWorkflowSync),
    {
      needs: "project",
    },
  ),
  entry(
    workflowLandSpec,
    () => import("../../../commands/workflow-playbook.command.js").then((m) => m.runWorkflowLand),
    {
      needs: "project",
    },
  ),
] as const satisfies readonly CommandEntry[];
