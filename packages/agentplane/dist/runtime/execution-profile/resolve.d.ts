import { type AgentplaneConfig } from "@agentplaneorg/core/config";
import type { ExecutionBudgetPhase, ResolvedExecutionProfileRuntime } from "./model.js";
export declare function resolveExecutionProfileRuntime(config: Pick<AgentplaneConfig, "agents" | "execution" | "runner">): ResolvedExecutionProfileRuntime;
export declare function consumeExecutionProfileBudget(opts: {
    runtime: ResolvedExecutionProfileRuntime;
    phase: ExecutionBudgetPhase;
    units?: number;
}): ResolvedExecutionProfileRuntime;
//# sourceMappingURL=resolve.d.ts.map