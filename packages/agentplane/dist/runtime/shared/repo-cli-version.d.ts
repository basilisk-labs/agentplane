import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import type { RuntimeSourceInfo } from "./runtime-source.js";
export type RepoCliVersionState = "unconfigured" | "satisfied" | "older_than_expected" | "active_version_unresolved";
export type RepoCliVersionExpectation = {
    expectedVersion: string | null;
    activeVersion: string | null;
    state: RepoCliVersionState;
    summary: string | null;
    recovery: string | null;
};
export declare function getRepoExpectedCliVersion(config: AgentplaneConfig): string | null;
export declare function evaluateRepoCliVersionExpectation(config: AgentplaneConfig, runtime: RuntimeSourceInfo): RepoCliVersionExpectation;
//# sourceMappingURL=repo-cli-version.d.ts.map