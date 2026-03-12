import type { AgentplaneConfig } from "@agentplaneorg/core";

import type { RuntimeSourceInfo } from "./runtime-source.js";
import { compareVersions } from "./version-compare.js";

export type RepoCliVersionState =
  | "unconfigured"
  | "satisfied"
  | "older_than_expected"
  | "active_version_unresolved";

export type RepoCliVersionExpectation = {
  expectedVersion: string | null;
  activeVersion: string | null;
  state: RepoCliVersionState;
  summary: string | null;
  recovery: string | null;
};

export function getRepoExpectedCliVersion(config: AgentplaneConfig): string | null {
  const raw = config.framework.cli.expected_version;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function buildRecovery(runtime: RuntimeSourceInfo, expectedVersion: string): string {
  switch (runtime.mode) {
    case "global-installed": {
      return `Run: npm i -g agentplane@${expectedVersion}. Then verify: agentplane runtime explain`;
    }
    case "global-in-framework":
    case "global-forced-in-framework": {
      const prefix =
        runtime.mode === "global-forced-in-framework"
          ? "Unset AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 if forced global mode is not intentional. "
          : "";
      return (
        `${prefix}Run: scripts/reinstall-global-agentplane.sh. ` +
        "Fallback: node packages/agentplane/bin/agentplane.js runtime explain. " +
        "Then verify: agentplane runtime explain"
      );
    }
    case "repo-local":
    case "repo-local-handoff": {
      return (
        `Sync this framework checkout to agentplane ${expectedVersion} or lower ` +
        "framework.cli.expected_version if the repository intentionally targets an older CLI. " +
        "Then verify: agentplane runtime explain"
      );
    }
  }
}

export function evaluateRepoCliVersionExpectation(
  config: AgentplaneConfig,
  runtime: RuntimeSourceInfo,
): RepoCliVersionExpectation {
  const expectedVersion = getRepoExpectedCliVersion(config);
  const activeVersion = runtime.agentplane.version?.trim() ?? null;
  if (!expectedVersion) {
    return {
      expectedVersion: null,
      activeVersion,
      state: "unconfigured",
      summary: null,
      recovery: null,
    };
  }
  if (!activeVersion) {
    return {
      expectedVersion,
      activeVersion: null,
      state: "active_version_unresolved",
      summary: `Repository expects agentplane ${expectedVersion}, but the active runtime version could not be resolved.`,
      recovery: buildRecovery(runtime, expectedVersion),
    };
  }
  if (compareVersions(activeVersion, expectedVersion) < 0) {
    return {
      expectedVersion,
      activeVersion,
      state: "older_than_expected",
      summary: `Repository expects agentplane ${expectedVersion}, but the active runtime resolves ${activeVersion}.`,
      recovery: buildRecovery(runtime, expectedVersion),
    };
  }
  const relation =
    compareVersions(activeVersion, expectedVersion) === 0 ? "matches" : "is newer than";
  return {
    expectedVersion,
    activeVersion,
    state: "satisfied",
    summary: `Active runtime ${activeVersion} ${relation} the repository expectation ${expectedVersion}.`,
    recovery: null,
  };
}
