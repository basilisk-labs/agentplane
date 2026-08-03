export { dedupeStrings } from "../../shared/strings.js";

export {
  decodeEscapedTaskTextNewlines,
  nowIso,
  normalizeTaskDocVersion,
  taskObservationSectionName,
  extractTaskObservationSection,
  VERIFY_STEPS_PLACEHOLDER,
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
  readTaskTagPolicy,
  requiresVerifyStepsByPrimary,
  resolvePrimaryTag,
  warnIfUnknownOwner,
} from "./shared/tags.js";
export {
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
  ensureLifecycleCommentCommitLocation,
  requireStructuredComment,
  type TaskTransitionCommentCommandOptions,
  prepareTaskTransitionComment,
  runTaskTransitionCommentCommit,
  runOptionalTaskTransitionCommentCommit,
  enforceStatusCommitPolicy,
  readCommitInfo,
  defaultCommitEmojiForStatus,
} from "./shared/transitions.js";
export {
  executeTaskStatusTransitionRequest,
  executeTaskVerificationTransitionRequest,
} from "./shared/workflow-transition-service.js";
export { applyTaskStatusTransitionCommand } from "./shared/transition-command.js";
export {
  type TaskListFilters,
  parseTaskListFilters,
  handleTaskListWarnings,
  queryTaskProjection,
  taskTextBlob,
} from "./shared/listing.js";
