import type { TaskData } from "../shared/types.js";
export type RedmineCanonicalState = {
    revision?: number;
    origin?: TaskData["origin"];
    runner?: TaskData["runner"];
    sections?: Record<string, string>;
    plan_approval?: TaskData["plan_approval"];
    verification?: TaskData["verification"];
    events?: TaskData["events"];
};
type BuildRedmineCanonicalStateOptions = {
    base?: RedmineCanonicalState | null;
    revision?: number | null;
};
export declare function parseRedmineCanonicalState(value: unknown): RedmineCanonicalState | null;
export declare function buildRedmineCanonicalState(task: TaskData): RedmineCanonicalState | null;
export declare function buildRedmineCanonicalStateWithOptions(task: TaskData, opts?: BuildRedmineCanonicalStateOptions): RedmineCanonicalState | null;
export {};
//# sourceMappingURL=state.d.ts.map