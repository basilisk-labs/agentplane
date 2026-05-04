import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { type PolicyActionDescriptor } from "./taxonomy.js";
import type { PolicyAction, PolicyContext, PolicyProblem } from "./model.js";
export type PolicyDecision = {
    ok: boolean;
    action: PolicyActionDescriptor;
    violations: PolicyViolation[];
};
export type PolicyViolation = {
    level: "error" | "warning";
    code: PolicyProblem["code"];
    exitCode: number;
    message: string;
};
export type ActionId = PolicyAction | (string & {});
export type PolicyEngineContext = Omit<PolicyContext, "action"> & {
    action: ActionId;
    config: AgentplaneConfig;
};
export declare class PolicyEngine {
    evaluate(ctx: PolicyEngineContext): PolicyDecision;
}
//# sourceMappingURL=engine.d.ts.map