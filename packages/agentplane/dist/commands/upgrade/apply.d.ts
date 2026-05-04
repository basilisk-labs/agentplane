import type { UpgradeReviewRecord } from "./types.js";
export declare function cleanupAutoUpgradeArtifacts(opts: {
    upgradeStateDir: string;
    createdBackups: string[];
}): Promise<void>;
export declare function ensureCleanTrackedTreeForUpgrade(gitRoot: string): Promise<void>;
export declare function createUpgradeCommit(opts: {
    gitRoot: string;
    paths: string[];
    tasksPath: string;
    workflowDir: string;
    versionLabel: string;
    source: "local_assets" | "upgrade_bundle" | "repo_tarball";
    additions: number;
    updates: number;
    unchanged: number;
    incidentsAppendedCount: number;
}): Promise<{
    hash: string;
    subject: string;
} | null>;
export declare function applyManagedFiles(opts: {
    gitRoot: string;
    additions: string[];
    updates: string[];
    backup: boolean;
    fileContents: Map<string, Buffer>;
    baselineDir: string;
    createdBackups: string[];
    toBaselineKey: (rel: string) => string | null;
}): Promise<void>;
export declare function persistUpgradeState(opts: {
    agentplaneDir: string;
    rawConfig: Record<string, unknown>;
    normalizedSourceToPersist: string | null;
    expectedCliVersionToPersist: string | null;
    hasManagedMutations: boolean;
    statePath: string;
    upgradeStateDir: string;
    source: "local_assets" | "upgrade_bundle" | "repo_tarball";
    reviewRecords: UpgradeReviewRecord[];
    additions: number;
    updates: number;
    skipped: number;
}): Promise<boolean>;
//# sourceMappingURL=apply.d.ts.map