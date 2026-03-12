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
  isVerifyStepsFilled,
  isDocSectionFilled,
  ensureAgentFilledRequiredDocSections,
  normalizeVerificationSectionLayout,
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
  ensureTaskDependsOnGraphIsAcyclic,
  resolveTaskDependencyState,
  buildDependencyState,
  formatTaskLine,
} from "./shared/dependencies.js";
export {
  appendTaskEvent,
  ensurePlanApprovedIfRequired,
  ensureVerificationSatisfiedIfRequired,
  isTransitionAllowed,
  ensureStatusTransitionAllowed,
  ensureCommentCommitAllowed,
  requireStructuredComment,
  enforceStatusCommitPolicy,
  isMajorStatusCommitTransition,
  readHeadCommit,
  readCommitInfo,
  defaultCommitEmojiForStatus,
  defaultCommitEmojiForTask,
} from "./shared/transitions.js";
export {
  type TaskListFilters,
  parseTaskListFilters,
  handleTaskListWarnings,
  taskTextBlob,
} from "./shared/listing.js";
