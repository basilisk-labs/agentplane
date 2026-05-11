export { dedupeStrings } from "../../shared/strings.js";

export {
  decodeEscapedTaskTextNewlines,
  nowIso,
  normalizeTaskDocVersion,
  taskObservationSectionName,
  extractTaskObservationSection,
  VERIFY_STEPS_PLACEHOLDER,
  VERIFICATION_RESULTS_BEGIN,
  VERIFICATION_RESULTS_END,
  extractDocSection,
  assertVerifyStepsFilled,
  isVerifyStepsFilled,
  isDocSectionFilled,
  ensureAgentFilledRequiredDocSections,
  normalizeVerificationSectionLayout,
  resolveWritableDocSections,
} from "./shared/docs.js";
export {
  normalizeDependsOnInput,
  normalizeTaskStatus,
  toStringArray,
  requiresVerify,
  type PrimaryTagResolution,
  type TaskTagPolicy,
  readTaskTagPolicy,
  resolvePrimaryTagFromConfig,
  requiresVerifyStepsByPrimary,
  requiresVerificationByPrimary,
  resolvePrimaryTag,
  warnIfUnknownOwner,
} from "./shared/tags.js";
export {
  type DependencyState,
  dependencyWarningMessages,
  ensureTaskDependsOnGraphIsAcyclic,
  resolveTaskDependencyState,
  buildDependencyState,
  formatTaskLine,
} from "./shared/dependencies.js";
export {
  appendTaskEvent,
  isTransitionAllowed,
  isMajorStatusCommitTransition,
} from "./shared/transition-rules.js";
export {
  ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired,
  ensureCommentCommitAllowed,
  ensureLifecycleCommentCommitLocation,
  emitTransitionWarnings,
  requireStructuredComment,
  type TaskTransitionCommentCommandOptions,
  prepareTaskTransitionComment,
  resolveTaskTransitionExecutorAgent,
  runTaskTransitionCommentCommit,
  runOptionalTaskTransitionCommentCommit,
  enforceStatusCommitPolicy,
  readHeadCommit,
  readCommitInfo,
  defaultCommitEmojiForStatus,
} from "./shared/transitions.js";
export {
  buildTaskStatusTransition,
  executeTaskStatusTransitionRequest,
  buildTaskVerificationTransition,
  executeTaskVerificationTransitionRequest,
  readDeferredTaskTransitionWarnings,
  type TaskTransitionWrite,
  type TaskStatusTransitionDependencyPolicy,
  type TaskStatusTransitionCommentCommitPolicy,
  type ExecuteTaskStatusTransitionRequest,
  type TaskStatusTransitionExecution,
  type ExecuteTaskVerificationTransitionRequest,
  type TaskVerificationTransitionExecution,
} from "./shared/workflow-transition-service.js";
export { applyTaskStatusTransitionCommand } from "./shared/transition-command.js";
export {
  type TaskListFilters,
  parseTaskListFilters,
  handleTaskListWarnings,
  queryTaskProjection,
  type QueryTaskProjectionResult,
  taskTextBlob,
} from "./shared/listing.js";
