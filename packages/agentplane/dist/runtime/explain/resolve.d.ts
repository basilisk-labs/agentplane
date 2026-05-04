import type { AgentplaneCapabilityRegistry } from "../capabilities/index.js";
import type { ResolvedExecutionProfileRuntime } from "../execution-profile/index.js";
import type { ResolvedHarnessContract } from "../harness/index.js";
import type { TaskIntakeRuntime } from "../task-intake/index.js";
import type { ExplainBehaviorInput, FrameworkExplainPayload } from "./model.js";
export declare function buildFrameworkExplainPayload(opts: {
    harness: ResolvedHarnessContract;
    capabilities: AgentplaneCapabilityRegistry;
    execution_profile: ResolvedExecutionProfileRuntime;
    task_intake: TaskIntakeRuntime;
    behavior_inputs?: readonly ExplainBehaviorInput[];
}): FrameworkExplainPayload;
export declare function appendFrameworkExplainBehaviorInputs(payload: FrameworkExplainPayload, behavior_inputs: readonly ExplainBehaviorInput[]): FrameworkExplainPayload;
//# sourceMappingURL=resolve.d.ts.map