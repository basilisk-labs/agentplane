export { dedupeStrings } from "../../shared/strings.js";

export {
  nowIso,
  VERIFY_STEPS_PLACEHOLDER,
  extractDocSection,
  isVerifyStepsFilled,
  isDocSectionFilled,
  ensureAgentFilledRequiredDocSections,
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
  defaultCommitEmojiForAgentId,
} from "./shared/transitions.js";
export {
  type TaskListFilters,
  parseTaskListFilters,
  handleTaskListWarnings,
  taskTextBlob,
} from "./shared/listing.js";
