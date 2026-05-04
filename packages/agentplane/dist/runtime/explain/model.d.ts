import type { BehaviorResolutionTrace } from "../behavior/index.js";
import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
import type { TaskIntakeRuntime } from "../task-intake/index.js";
export type ExplainBehaviorInputCategory = "prompt" | "behavior";
export type ExplainBehaviorInput = {
    id: string;
    category: ExplainBehaviorInputCategory;
    source?: string;
    resolution: BehaviorResolutionTrace<Record<string, unknown>>;
};
export type FrameworkExplainPayload = {
    schema_version: 1;
    harness: ResolvedHarnessContract;
    policy: {
        approvals: ResolvedHarnessContract["policy"]["approvals"];
        protected_paths: ResolvedHarnessContract["policy"]["protected_paths"];
        unsafe_actions_requiring_explicit_user_ok: string[];
    };
    capabilities: AgentplaneCapabilityRegistry;
    runtime: {
        execution_profile: ResolvedExecutionProfileRuntime;
        task_intake: TaskIntakeRuntime;
    };
    behavior_inputs: ExplainBehaviorInput[];
};
//# sourceMappingURL=model.d.ts.map