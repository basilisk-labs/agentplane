import type { TaskData } from "../../backends/task-backend.js";
import { type IncidentAdviceMatch, type IncidentAdviceQuery, type IncidentCollectionPlan, type IncidentRegistry } from "../../runtime/incidents/index.js";
import type { CommandContext } from "../shared/task-backend.js";
type LoadedTaskIncidents = {
    task: TaskData;
    findings: string;
    scope: string | null;
    query: IncidentAdviceQuery;
};
export declare function loadIncidentRegistry(ctx: CommandContext): Promise<{
    registryPath: string;
    registryText: string;
    registry: IncidentRegistry;
}>;
export declare function collectTaskIncidents(opts: {
    ctx: CommandContext;
    taskId: string;
    task?: TaskData | null;
    write: boolean;
    now?: Date;
}): Promise<{
    loaded: LoadedTaskIncidents;
    registryPath: string;
    registryPaths: string[];
    registryText: string;
    registry: IncidentRegistry;
    plan: IncidentCollectionPlan;
    wrote: boolean;
}>;
export declare function inspectTaskIncidents(opts: {
    ctx: CommandContext;
    taskId: string;
    task?: TaskData | null;
    now?: Date;
}): Promise<{
    loaded: LoadedTaskIncidents;
    registryPath: string;
    registryPaths: string[];
    registryText: string;
    registry: IncidentRegistry;
    plan: IncidentCollectionPlan;
}>;
export declare function renderIncidentCollectionPlanOutcome(plan: {
    candidates?: readonly unknown[];
    skipped?: readonly unknown[];
    promotable?: readonly unknown[];
    duplicates?: readonly unknown[];
    issues?: readonly {
        missingFields?: readonly string[];
    }[];
    findingsTextPresent?: boolean;
    structuredFindingCount?: number;
}, opts?: {
    wrote?: boolean;
    context?: "collect" | "verify" | "finish" | "generic";
    promotedIds?: readonly string[];
    registryPaths?: readonly string[];
    taskId?: string | null;
}): string;
export declare function adviseTaskIncidents(opts: {
    ctx: CommandContext;
    taskId: string;
    task?: TaskData | null;
    limit?: number;
}): Promise<{
    loaded: LoadedTaskIncidents;
    matches: IncidentAdviceMatch[];
}>;
export {};
//# sourceMappingURL=shared.d.ts.map