// Test-only compatibility surface. Production entrypoints import advanceTaskStep directly.
export {
  advanceTaskStep as advanceCanonicalTask,
  blockKernelSemanticEpisode,
  kernelPlanApprovalOperatorAction,
} from "./advance-task-step.js";
