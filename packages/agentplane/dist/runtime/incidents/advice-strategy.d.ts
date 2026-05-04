import type { IncidentAdviceMatch, IncidentAdviceQuery, IncidentRegistry } from "./types.js";
export declare function buildIncidentAdviceQueryFromTask(opts: {
    taskId: string;
    title: string;
    description: string;
    scope?: string | null;
    tags: readonly string[];
}): IncidentAdviceQuery;
export declare function resolveIncidentAdviceMatches(opts: {
    query: IncidentAdviceQuery;
    registry: IncidentRegistry;
    limit?: number;
}): IncidentAdviceMatch[];
export declare function renderIncidentAdvice(matches: readonly IncidentAdviceMatch[]): string;
//# sourceMappingURL=advice-strategy.d.ts.map