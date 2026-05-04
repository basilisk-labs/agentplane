import type { FrameworkManifest, UpgradeReviewRecord } from "./types.js";
export declare function printUpgradeDryRun(opts: {
    additions: string[];
    updates: string[];
    skipped: string[];
    merged: string[];
}): void;
export declare function writeUpgradeAgentReview(opts: {
    gitRoot: string;
    runRoot: string;
    manifest: FrameworkManifest;
    additions: string[];
    updates: string[];
    skipped: string[];
    merged: string[];
    reviewRecords: UpgradeReviewRecord[];
}): Promise<{
    relRunDir: string;
    needsReviewCount: number;
}>;
//# sourceMappingURL=report.d.ts.map