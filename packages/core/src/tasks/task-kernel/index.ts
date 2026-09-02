export { EFFECT_STATES, KERNEL_REJECTION_CODES, TASK_STATES, WORK_ITEM_STATES } from "./model.js";
export {
  authorityBindsCurrentState,
  compareExecutionAuthority,
  PROJECTION_SOURCES,
  projectionCannotAuthorize,
  validateWorkItemDefinitions,
} from "./invariants.js";
export type {
  AuthoritySubsetResult,
  AuthoritySubsetViolation,
  ProjectionSource,
} from "./invariants.js";
export {
  EFFECT_OBSERVE_TRANSITION_TABLE,
  isTaskCompletionEligible,
  kernelDigest,
  reduceTaskCommand,
  TASK_ACTION_TRANSITION_TABLE,
  TASK_TRANSITION_TABLE,
  WORK_ITEM_TRANSITION_TABLE,
  workItemResourceConflicts,
} from "./kernel.js";
export type * from "./model.js";

export {
  authorityDigest,
  canonicalAuthorityIssues,
  continuationIssues,
} from "./authority-lineage.js";
