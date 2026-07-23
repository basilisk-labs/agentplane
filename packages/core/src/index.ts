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
  AGENT_SEMANTIC_RESULT_CLAIMED_CHECK_STATUS_VALUES,
  AGENT_SEMANTIC_RESULT_KIND,
  AGENT_SEMANTIC_RESULT_SCHEMA_VERSION,
  AGENT_SEMANTIC_RESULT_STATUS_VALUES,
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURE,
  AGENT_SEMANTIC_RESULT_V2_VALID_FIXTURES,
  AGENT_SEMANTIC_RESULT_V2_INVALID_FIXTURES,
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENTPLANE_CONFIG_SCHEMA,
  AgentplaneConfigSchema,
  EXECUTION_RECEIPT_ARTIFACT_STATE_VALUES,
  EXECUTION_RECEIPT_CHECK_STATUS_VALUES,
  EXECUTION_RECEIPT_COLLECTION_STATUS_VALUES,
  EXECUTION_RECEIPT_GIT_CHANGE_VALUES,
  EXECUTION_RECEIPT_GIT_STATE_VALUES,
  EXECUTION_RECEIPT_KIND,
  EXECUTION_RECEIPT_OBSERVER,
  EXECUTION_RECEIPT_PROCESS_OUTCOME_VALUES,
  EXECUTION_RECEIPT_PROVENANCE,
  EXECUTION_RECEIPT_SCHEMA_VERSION,
  EXECUTION_RECEIPT_SUCCESS_POLICY_OUTCOME_VALUES,
  EXECUTION_RECEIPT_V1_VALID_FIXTURE,
  EXECUTION_RECEIPT_ZOD_SCHEMA,
  RUNNER_RESULT_MANIFEST_V1_LEGACY_FIXTURE,
  buildAgentSemanticResultV2ValidFixtures,
  computeAcrRecordDigest,
  defaultAgentplaneConfig,
  formatAgentplaneConfigIssues,
  listAgentSemanticResultSchemaErrors,
  listExecutionReceiptSchemaErrors,
  listAgentPlaneRunnerHandoffJsonSchemaErrors,
  listAgentPlaneRunnerHandoffSchemaErrors,
  listAcrSchemaErrors,
  listTaskHandoffSchemaErrors,
  listTaskObservationSchemaErrors,
  listTaskPrMetaSchemaErrors,
  listTaskReadmeFrontmatterSchemaErrors,
  listTasksExportSnapshotSchemaErrors,
  renderAgentPlaneRunnerHandoffSchemaJson,
  renderAgentSemanticResultSchemaJson,
  renderAgentSemanticResultV2ValidFixtureJson,
  renderAcrSchemaJson,
  renderAgentplaneConfigSchemaJson,
  renderExecutionReceiptSchemaJson,
  renderExecutionReceiptV1ValidFixtureJson,
  renderTaskHandoffSchemaJson,
  renderTaskObservationSchemaJson,
  renderTaskPrMetaSchemaJson,
  renderTaskReadmeFrontmatterSchemaJson,
  renderTasksExportSchemaJson,
  renderRunnerResultManifestV1LegacyFixtureJson,
  sanitizeAgentPlaneRunnerHandoff,
  validateAgentSemanticResult,
  validateAcr,
  validateAgentPlaneRunnerHandoff,
  validateAgentPlaneRunnerHandoffSchemaOnly,
  validateAgentplaneConfig,
  validateExecutionReceipt,
  validateTaskHandoff,
  validateTaskObservation,
  validateTaskPrMeta,
  validateTaskReadmeFrontmatter,
  validateTasksExportSnapshot,
  withTaskReadmeFrontmatterDefaults,
  type AgentSemanticResult,
  type AgentSemanticResultBlocker,
  type AgentSemanticResultClaimedCheck,
  type AgentSemanticResultKnowledgeRequest,
  type AgentSemanticResultStatus,
  type ExecutionReceipt,
  type ExecutionReceiptArtifactObservation,
  type ExecutionReceiptCollection,
  type ExecutionReceiptGitDelta,
  type ExecutionReceiptGitDeltaEntry,
  type ExecutionReceiptGitObservation,
  type ExecutionReceiptGitSnapshot,
  type ExecutionReceiptObservedCheck,
  type ExecutionReceiptProcessObservation,
  type ExecutionReceiptScopeEvaluation,
  type ExecutionReceiptSuccessPolicy,
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
  type QualityReviewProvenance,
  type QualityReviewResult,
  type QualityReviewState,
  type TaskRecord,
  type TaskRunnerEvidence,
  type TaskRunnerExecutionReceiptRef,
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
