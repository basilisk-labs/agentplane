export const CORE_VERSION = "0.0.0";

export {
  findGitRoot,
  resolveProject,
  type ResolvedProject,
  type ResolveProjectOptions,
} from "./project/project-root.js";

export {
  defaultConfig,
  loadConfig,
  saveConfig,
  setByDottedKey,
  validateConfig,
  type AgentplaneConfig,
  type ExecutionProfile,
  type LoadedConfig,
  type ReasoningEffort,
  type RunnerAdapterId,
  type RunnerCustomConfig,
  type RunnerTimeoutConfig,
  type RunnerTimeoutReason,
  type RunnerTraceConfig,
  type RunnerTraceMode,
  type StatusCommitPolicy,
  type WorkflowMode,
} from "./config/config.js";

export {
  applyExecutionToApprovals,
  buildExecutionProfile,
  EXECUTION_PROFILE_PRESETS,
  type ApprovalSettings,
  resolveExecutionProfilePreset,
} from "./config/execution-profile.js";

export {
  parseTaskReadme,
  renderTaskFrontmatter,
  renderTaskReadme,
  type ParsedTaskReadme,
} from "./tasks/task-readme.js";

export { readTaskReadme, updateTaskReadmeAtomic } from "./tasks/task-readme-io.js";

export {
  listTaskHandoffSchemaErrors,
  listTaskPrMetaSchemaErrors,
  listTaskReadmeFrontmatterSchemaErrors,
  listTasksExportSnapshotSchemaErrors,
  renderTaskHandoffSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  validateTaskHandoff,
  validateTaskPrMeta,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
  withTaskReadmeFrontmatterDefaults,
  type TaskHandoff,
  type TaskHandoffRoute,
  type TaskHandoffRunnerNextAction,
  type TaskHandoffRunnerState,
  type TaskPrMeta,
} from "./tasks/task-artifact-schema.js";

export {
  buildDefaultTaskDoc,
  DEFAULT_TASK_DOC_VERSION,
  getTaskDocContract,
  isIsoUtcTimestamp,
  normalizeTaskDocVersion,
  TASK_DOC_CONTRACTS,
  TASK_DOC_SECTION_ORDER,
  type TaskDocContract,
  type TaskDocSections,
  type TaskDocVersion,
} from "./tasks/task-doc-contract.js";

export {
  applyTaskDocMutations,
  resolveTaskDocUpdatedBy,
  type TaskDocMutation,
  type TaskDocMutationComment,
  type TaskDocMutationResult,
  type TaskDocMutationState,
} from "./tasks/task-doc-mutation.js";

export {
  docChanged,
  ensureDocSections,
  extractTaskDoc,
  mergeTaskDoc,
  normalizeDocSectionName,
  normalizeTaskDoc,
  parseDocSections,
  renderTaskDocFromSections,
  setMarkdownSection,
  splitCombinedHeadingLines,
  taskDocToSectionMap,
} from "./tasks/task-doc.js";

export { atomicWriteFile } from "./fs/atomic-write.js";

export { generateTaskId, timestampIdPrefix, TASK_ID_ALPHABET } from "./tasks/task-id.js";

export {
  createTask,
  getTasksDir,
  listTasks,
  readTask,
  setTaskDocSection,
  taskReadmePath,
  validateTaskDocMetadata,
  type PlanApproval,
  type PlanApprovalState,
  type TaskEvent,
  type TaskEventType,
  type TaskFrontmatter,
  type TaskOrigin,
  type TaskPriority,
  type TaskRecord,
  type TaskRunnerEvidence,
  type TaskRunnerExecutionMetrics,
  type TaskRunnerHistoryEntry,
  type TaskRunnerOutcome,
  type TaskRunnerOutcomeStatus,
  type TaskRunnerTarget,
  type TaskStatus,
  type VerificationResult,
  type VerificationState,
} from "./tasks/task-store.js";

export {
  buildTasksExportSnapshot,
  canonicalTasksPayload,
  canonicalizeJson,
  computeTasksChecksum,
  writeTasksExport,
  type TasksExportMeta,
  type TasksExportSnapshot,
  type TasksExportTask,
} from "./tasks/tasks-export.js";

export {
  lintTasksFile,
  lintTasksSnapshot,
  readTasksExport,
  type TasksLintResult,
} from "./tasks/tasks-lint.js";

export {
  clearPinnedBaseBranch,
  getBaseBranch,
  getPinnedBaseBranch,
  resolveBaseBranch,
  setPinnedBaseBranch,
} from "./git/base-branch.js";

export {
  extractTaskSuffix,
  isGenericSubject,
  validateCommitSubject,
  type CommitPolicyResult,
} from "./commit/commit-policy.js";

export { getStagedFiles, getUnstagedFiles, getUnstagedTrackedFiles } from "./git/git-utils.js";
