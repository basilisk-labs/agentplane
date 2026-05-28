import { loadConfig } from "@agentplaneorg/core/config";
import { resolveProject } from "@agentplaneorg/core/project";

import { createCliEmitter } from "../cli/output.js";
import type { CommandHandler } from "../cli/spec/spec.js";
import {
  loadDirectSubcommandNames,
  throwGroupCommandUsage,
  type GroupCommandParsed,
} from "../cli/group-command.js";
import {
  evaluateRepoCliVersionExpectation,
  type RepoCliVersionExpectation,
} from "../runtime/shared/repo-cli-version.js";
import {
  FRAMEWORK_DEV_BOOTSTRAP_COMMAND,
  FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE,
  FRAMEWORK_DEV_GLOBAL_VERIFY_COMMAND,
  FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS,
  FRAMEWORK_DEV_REINSTALL_SCRIPT,
  FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND,
} from "../../bin/framework-dev-contract.js";
import {
  describeRuntimeMode,
  resolveRuntimeSourceInfo,
  type RuntimeSourceInfo,
} from "../runtime/shared/runtime-source.js";
import {
  inspectPromptGraphForCwd,
  renderPromptGraphExplainText,
  type PromptGraphInspection,
} from "./shared/prompt-graph-diagnostics.js";
import { runtimeSpec, type RuntimeExplainParsed } from "./runtime.spec.js";

const output = createCliEmitter();

export type FrameworkDevWorkflow = {
  available: boolean;
  bootstrapCommand: string;
  manualRepairCommands: string[];
  repoLocalVerifyCommand: string;
  reinstallScript: string;
  globalVerifyCommand: string;
  forceGlobalExample: string;
  recommendation: string | null;
};

export type RuntimeExplainPayload = RuntimeSourceInfo & {
  frameworkDev: FrameworkDevWorkflow;
  repoCliExpectation: RepoCliVersionExpectation;
  promptGraph: PromptGraphInspection;
  promptDiagnosticsCompact?: {
    artifact_state: string;
    active_recipes: string[];
    module_count: number;
    repo_override_count: number;
    diagnostic_count: number;
    winning_fragments: {
      fragment_id: string;
      address: string;
      owner: string;
      source_kind: string;
      source_ref: string;
      recipe_id: string | null;
    }[];
    diagnostics: { severity: string; code: string; message: string }[];
  };
};

export { runtimeExplainSpec, runtimeSpec } from "./runtime.spec.js";

function renderPath(value: string | null): string {
  return value ?? "unresolved";
}

export function buildFrameworkDevWorkflow(report: RuntimeSourceInfo): FrameworkDevWorkflow {
  const available = report.framework.inFrameworkCheckout;
  if (!available) {
    return {
      available,
      bootstrapCommand: FRAMEWORK_DEV_BOOTSTRAP_COMMAND,
      manualRepairCommands: [...FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS],
      repoLocalVerifyCommand: FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND,
      reinstallScript: FRAMEWORK_DEV_REINSTALL_SCRIPT,
      globalVerifyCommand: FRAMEWORK_DEV_GLOBAL_VERIFY_COMMAND,
      forceGlobalExample: FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE,
      recommendation: null,
    };
  }

  const recommendation =
    report.mode === "repo-local" || report.mode === "repo-local-handoff"
      ? "Run the framework bootstrap after fresh clones or dependency drift; use the reinstall helper only when the global PATH command itself should resolve this checkout."
      : report.mode === "global-in-framework"
        ? "Bootstrap the framework checkout first so the installed wrapper can hand off cleanly to the repo-local runtime."
        : report.mode === "global-forced-in-framework"
          ? "Unset AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 unless you intentionally need the global installed CLI inside the framework checkout."
          : "Use the framework bootstrap command first, then verify the repo-local runtime and global wrapper explicitly.";

  return {
    available,
    bootstrapCommand: FRAMEWORK_DEV_BOOTSTRAP_COMMAND,
    manualRepairCommands: [...FRAMEWORK_DEV_MANUAL_REPAIR_COMMANDS],
    repoLocalVerifyCommand: FRAMEWORK_DEV_REPO_LOCAL_VERIFY_COMMAND,
    reinstallScript: FRAMEWORK_DEV_REINSTALL_SCRIPT,
    globalVerifyCommand: FRAMEWORK_DEV_GLOBAL_VERIFY_COMMAND,
    forceGlobalExample: FRAMEWORK_DEV_FORCE_GLOBAL_EXAMPLE,
    recommendation,
  };
}

function buildRuntimeExplainPayload(
  report: RuntimeSourceInfo,
  promptGraph: PromptGraphInspection,
): RuntimeExplainPayload {
  return {
    ...report,
    frameworkDev: buildFrameworkDevWorkflow(report),
    repoCliExpectation: {
      expectedVersion: null,
      activeVersion: report.agentplane.version,
      state: "unconfigured",
      summary: null,
      recovery: null,
    },
    promptGraph,
  };
}

function buildCompactPromptDiagnostics(promptGraph: PromptGraphInspection) {
  return {
    artifact_state: promptGraph.artifactState,
    active_recipes: promptGraph.activeRecipeIds,
    module_count: promptGraph.summary?.moduleCount ?? promptGraph.modules.length,
    repo_override_count: promptGraph.summary?.repoOverrideCount ?? 0,
    diagnostic_count: promptGraph.diagnostics.length,
    winning_fragments: promptGraph.modules
      .filter((module) => module.fragmentId)
      .map((module) => ({
        fragment_id: module.fragmentId!,
        address: module.address,
        owner: module.ownerLabel,
        source_kind: module.sourceKind,
        source_ref: module.sourceRef,
        recipe_id: module.recipeId,
      })),
    diagnostics: promptGraph.diagnostics.map((diagnostic) => ({
      severity: diagnostic.severity,
      code: diagnostic.code,
      message: diagnostic.message,
    })),
  };
}

export function renderRuntimeExplainText(
  report: RuntimeSourceInfo,
  repoCliExpectation: RepoCliVersionExpectation,
  promptGraph?: PromptGraphInspection,
): string {
  const frameworkDev = buildFrameworkDevWorkflow(report);
  const lines = [
    `Mode: ${report.mode} (${describeRuntimeMode(report.mode)})`,
    `Active binary: ${renderPath(report.activeBinaryPath)}`,
    `Current cwd: ${report.cwd}`,
    `Framework checkout: ${report.framework.inFrameworkCheckout ? "yes" : "no"}`,
    `Framework repo root: ${renderPath(report.frameworkSources.repoRoot)}`,
    `Framework agentplane root: ${renderPath(report.frameworkSources.agentplaneRoot)}`,
    `Framework core root: ${renderPath(report.frameworkSources.coreRoot)}`,
    `Resolved agentplane: ${report.agentplane.version ?? "unknown"} @ ${renderPath(report.agentplane.packageRoot)}`,
    `Resolved @agentplaneorg/core: ${report.core.version ?? "unknown"} @ ${renderPath(report.core.packageRoot)}`,
  ];
  if (repoCliExpectation.expectedVersion) {
    lines.push(`Repository expected agentplane CLI: ${repoCliExpectation.expectedVersion}`);
    if (repoCliExpectation.summary) {
      lines.push(`Repository CLI status: ${repoCliExpectation.summary}`);
    }
    if (repoCliExpectation.recovery) {
      lines.push(`Recovery: ${repoCliExpectation.recovery}`);
    }
  }
  if (report.handoffFromBinaryPath) {
    lines.push(`Handoff from: ${report.handoffFromBinaryPath}`);
  }
  if (frameworkDev.available) {
    lines.push(
      "",
      "Framework dev workflow:",
      "1. Canonical bootstrap:",
      `   - ${frameworkDev.bootstrapCommand}`,
      "2. Manual fallback:",
      ...frameworkDev.manualRepairCommands.map((command) => `   - ${command}`),
      "3. Verify the repo-local runtime directly:",
      `   - ${frameworkDev.repoLocalVerifyCommand}`,
      "4. If the global PATH install should resolve this checkout:",
      `   - ${frameworkDev.reinstallScript}`,
      "5. Re-verify the global wrapper:",
      `   - ${frameworkDev.globalVerifyCommand}`,
      "6. Optional: force the global installed CLI inside this checkout:",
      `   - ${frameworkDev.forceGlobalExample}`,
    );
    if (frameworkDev.recommendation) {
      lines.push(`Recommendation: ${frameworkDev.recommendation}`);
    }
  }
  if (promptGraph) {
    lines.push("", renderPromptGraphExplainText(promptGraph));
  }
  return lines.join("\n");
}

async function resolveRepoCliExpectation(opts: {
  cwd: string;
  rootOverride?: string | null;
  report: RuntimeSourceInfo;
}): Promise<RepoCliVersionExpectation> {
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    return evaluateRepoCliVersionExpectation(loaded.config, opts.report);
  } catch {
    return {
      expectedVersion: null,
      activeVersion: opts.report.agentplane.version,
      state: "unconfigured",
      summary: null,
      recovery: null,
    };
  }
}

export const runRuntime: CommandHandler<GroupCommandParsed> = async (_ctx, p) => {
  throwGroupCommandUsage({
    spec: runtimeSpec,
    cmd: p.cmd,
    subcommands: await loadDirectSubcommandNames(["runtime"]),
    command: "runtime",
    contextCommand: "runtime",
  });
};

export const runRuntimeExplain: CommandHandler<RuntimeExplainParsed> = (ctx, p) => {
  const report = resolveRuntimeSourceInfo({
    cwd: ctx.cwd,
    entryModuleUrl: import.meta.url,
  });
  return Promise.all([
    resolveRepoCliExpectation({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
      report,
    }),
    inspectPromptGraphForCwd({
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride ?? null,
    }),
  ]).then(([repoCliExpectation, promptGraph]) => {
    const payload = {
      ...buildRuntimeExplainPayload(report, promptGraph),
      repoCliExpectation,
      ...(p.compact
        ? { promptDiagnosticsCompact: buildCompactPromptDiagnostics(promptGraph) }
        : {}),
    };
    if (p.json) {
      output.json(payload);
      return 0;
    }
    output.line(renderRuntimeExplainText(report, repoCliExpectation, promptGraph));
    return 0;
  });
};
