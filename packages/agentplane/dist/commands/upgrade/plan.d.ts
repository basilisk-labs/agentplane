import type { FrameworkManifest, UpgradeReviewRecord } from "./types.js";
export type ManagedUpgradePlan = {
    additions: string[];
    updates: string[];
    skipped: string[];
    merged: string[];
    fileContents: Map<string, Buffer>;
    reviewRecords: UpgradeReviewRecord[];
    incidentsAppendedCount: number;
};
export declare function planManagedUpgrade(opts: {
    gitRoot: string;
    manifest: FrameworkManifest;
    bundleRoot: string;
    baselineDirNew: string;
    baselineDirLegacy: string;
}): Promise<ManagedUpgradePlan>;
//# sourceMappingURL=plan.d.ts.map