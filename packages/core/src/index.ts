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
  type AcrConfig,
  type ExecutionProfile,
  type LoadedConfig,
  type ReasoningEffort,
  type TextVerbosity,
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
  ACR_VERSION,
  AGENTPLANE_CONFIG_SCHEMA,
  AgentplaneConfigSchema,
  computeAcrRecordDigest,
  defaultAgentplaneConfig,
  formatAgentplaneConfigIssues,
  listAgentPlaneRunnerHandoffJsonSchemaErrors,
  listAgentPlaneRunnerHandoffSchemaErrors,
  listAcrSchemaErrors,
  listTaskHandoffSchemaErrors,
  listTaskObservationSchemaErrors,
  listTaskPrMetaSchemaErrors,
  listTaskReadmeFrontmatterSchemaErrors,
  listTasksExportSnapshotSchemaErrors,
  renderAgentPlaneRunnerHandoffSchemaJson,
  renderAcrSchemaJson,
  renderAgentplaneConfigSchemaJson,
  renderTaskHandoffSchemaJson,
  renderTaskObservationSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  sanitizeAgentPlaneRunnerHandoff,
  validateAcr,
  validateAgentPlaneRunnerHandoff,
  validateAgentPlaneRunnerHandoffSchemaOnly,
  validateAgentplaneConfig,
  validateTaskHandoff,
  validateTaskObservation,
  validateTaskPrMeta,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
  withTaskReadmeFrontmatterDefaults,
  type AgentPlaneRunnerHandoff,
  type AgentPlaneRunnerHandoffMode,
  type AgentPlaneRunnerHandoffPublic,
  type AgentPlaneRunnerHandoffRepoRef,
  type AgentPlaneRunnerHandoffStatus,
  type AgentPlaneRunnerHandoffValidationOptions,
  type AgentChangeRecord,
  type TaskHandoff,
  type TaskHandoffRoute,
  type TaskHandoffRunnerNextAction,
  type TaskHandoffRunnerState,
  type TaskObservation,
  type TaskPrMeta,
} from "./schemas/index.js";

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
  taskReadmeDocBody,
  type ParsedTaskReadme,
} from "./tasks/task-readme.js";

export { readTaskReadme, updateTaskReadmeAtomic } from "./tasks/task-readme-io.js";

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
  isTaskStatus,
  normalizeTaskStatus,
  parseTaskStatus,
  TASK_STATUS_LABEL,
  TASK_STATUS_VALUES,
  type TaskStatus,
} from "./tasks/task-status.js";

export {
  buildProviderSafeTaskProjection,
  type ProviderSafeAcrProjection,
  type ProviderSafeTaskProjection,
  type ProviderSafeTaskProjectionInput,
} from "./tasks/task-provider-safe-projection.js";

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
  type TaskSyncConflict,
  type TaskSyncConflictPolicy,
  type TaskSyncEnvelope,
  type TaskSyncExternalRef,
  type TaskSyncFieldAuthority,
  type TaskSyncFieldPolicy,
  type TaskSyncFreshness,
  type VerificationResult,
  type VerificationState,
} from "./tasks/task-store.js";

export {
  buildTasksExportSnapshot,
  canonicalTasksPayload,
  canonicalizeJson,
  computeTasksChecksum,
  type TasksExportMeta,
  type TasksExportSnapshot,
  type TasksExportTask,
} from "./tasks/tasks-export.js";

export {
  lintTasksFile,
  lintTasksSnapshot,
  lintTaskVerifyStepsSection,
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
  gitBranchExists,
  gitBranchUpstream,
  gitAddPaths,
  gitConfigGet,
  gitCommit,
  gitCurrentBranch,
  gitEnv,
  gitInitRepo,
  gitIsAncestor,
  gitListBranches,
  gitMergeBase,
  gitRevParse,
  gitStagedPaths,
  GitContext,
  resolveInitBaseBranch,
} from "./git/git-client.js";

export {
  gitAheadBehind,
  gitDiffNames,
  gitDiffNameStatus,
  gitDiffNumstat,
  gitDiffStat,
  gitShowFile,
  toGitPath,
  type GitDiffRange,
  type GitDiffNameStatusEntry,
  type GitDiffNumstatEntry,
} from "./git/git-diff.js";

export {
  DEFAULT_TASK_BRANCH_PREFIX,
  DEFAULT_TASK_CLOSE_BRANCH_PREFIX,
  findWorktreeForBranch,
  gitListBranchesByPrefixes,
  gitListTaskBranches,
  listWorktrees,
  parseTaskIdFromBranch,
  parseTaskIdFromCloseBranch,
  taskBranchName,
  taskCloseBranchName,
} from "./git/git-worktree.js";

export {
  execFileAsync,
  runProcess,
  runProcessSync,
  startProcess,
  type RunProcessOptions,
  type RunProcessResult,
} from "./process/run-process.js";

export {
  buildTaskArtifactRefreshCommitSubject,
  extractTaskSuffix,
  isTaskArtifactRefreshCommitSubject,
  isGenericSubject,
  parseTaskSubjectTemplate,
  validateCommitSubject,
  type CommitPolicyResult,
} from "./commit/commit-policy.js";

export { getStagedFiles, getUnstagedFiles, getUnstagedTrackedFiles } from "./git/git-utils.js";

export {
  createLogger,
  resolveLoggerMode,
  type Logger,
  type LoggerEntry,
  type LoggerMode,
  type LoggerStream,
  type LoggerWriter,
} from "./logger.js";
