import type { AgentplaneConfig } from "@agentplaneorg/core";

import {
  evaluateRepoCliVersionExpectation,
  type RepoCliVersionExpectation,
} from "../../shared/repo-cli-version.js";
import { describeRuntimeMode, resolveRuntimeSourceInfo } from "../../shared/runtime-source.js";

function renderCliVersionFacts(expectation: RepoCliVersionExpectation): string[] {
  if (!expectation.expectedVersion) return [];
  if (
    expectation.state === "older_than_expected" ||
    expectation.state === "active_version_unresolved"
  ) {
    return [
      `[WARN] ${expectation.summary}`,
      ...(expectation.recovery ? [`[WARN] Recovery: ${expectation.recovery}`] : []),
    ];
  }
  return [
    `[INFO] Repository expected agentplane CLI: ${expectation.expectedVersion}`,
    ...(expectation.summary ? [`[INFO] ${expectation.summary}`] : []),
  ];
}

export function checkRuntimeSourceFacts(cwd: string, config?: AgentplaneConfig): string[] {
  const report = resolveRuntimeSourceInfo({ cwd, entryModuleUrl: import.meta.url });
  const cliVersionFacts = config
    ? renderCliVersionFacts(evaluateRepoCliVersionExpectation(config, report))
    : [];
  if (!report.framework.inFrameworkCheckout) {
    return cliVersionFacts;
  }

  const warning =
    report.mode === "global-in-framework"
      ? "[WARN] Framework checkout detected but the active runtime is still a global installed binary. " +
        "Update or reinstall agentplane to pick up repo-local handoff, or run the repo-local binary directly."
      : report.mode === "global-forced-in-framework"
        ? "[WARN] Framework checkout is forcing the global installed binary via AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1."
        : null;

  return [
    ...(warning ? [warning] : []),
    ...cliVersionFacts,
    `[INFO] Runtime mode: ${report.mode} (${describeRuntimeMode(report.mode)})`,
    `[INFO] Active binary: ${report.activeBinaryPath ?? "unresolved"}`,
    ...(report.handoffFromBinaryPath
      ? [`[INFO] Handoff source binary: ${report.handoffFromBinaryPath}`]
      : []),
    `[INFO] Resolved agentplane: ${report.agentplane.version ?? "unknown"} @ ${report.agentplane.packageRoot ?? "unresolved"}`,
    `[INFO] Resolved @agentplaneorg/core: ${report.core.version ?? "unknown"} @ ${report.core.packageRoot ?? "unresolved"}`,
    `[INFO] Framework repo root: ${report.frameworkSources.repoRoot ?? "unresolved"}`,
    `[INFO] Framework agentplane root: ${report.frameworkSources.agentplaneRoot ?? "unresolved"}`,
    `[INFO] Framework core root: ${report.frameworkSources.coreRoot ?? "unresolved"}`,
  ];
}

export function findingSeverity(problem: string): "ERROR" | "WARN" | "INFO" {
  const normalized = problem.trimStart();
  if (normalized.startsWith("[WARN]")) return "WARN";
  if (normalized.startsWith("[INFO]")) return "INFO";
  if (normalized.startsWith("[ERROR]")) return "ERROR";
  return "ERROR";
}
