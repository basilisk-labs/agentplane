import type { PlanChange, ReleaseVersionPlan } from "./apply.types.js";
export declare function fileExists(p: string): Promise<boolean>;
export declare function readJsonFile<T>(p: string): Promise<T>;
export declare function parseVersionPlan(raw: unknown): ReleaseVersionPlan;
export declare function findLatestPlanDir(gitRoot: string): Promise<string>;
export declare function loadReleasePlan(opts: {
    gitRoot: string;
    planOverride?: string;
}): Promise<{
    planDir: string;
    versionJsonPath: string;
    plan: ReleaseVersionPlan;
    changes: PlanChange[];
    minBullets: number;
}>;
//# sourceMappingURL=apply.preflight.plan.d.ts.map