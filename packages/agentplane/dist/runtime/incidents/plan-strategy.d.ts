import type { IncidentCollectionPlan, IncidentPromotionTaskContext, IncidentRegistry } from "./types.js";
export declare function planIncidentCollection(opts: {
    task: IncidentPromotionTaskContext;
    findings: string;
    registry: IncidentRegistry;
    now?: Date;
}): IncidentCollectionPlan;
//# sourceMappingURL=plan-strategy.d.ts.map