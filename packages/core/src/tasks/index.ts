export {
  ACR_VERSION,
  computeAcrRecordDigest,
  listAcrSchemaErrors,
  listTaskObservationSchemaErrors,
  renderAcrSchemaJson,
  renderTaskObservationSchemaJson,
  TASK_OBSERVATION_ACTION_VALUES,
  TASK_OBSERVATION_KIND_VALUES,
  TASK_OBSERVATION_PHASE_VALUES,
  TASK_OBSERVATION_SCHEMA_VERSION,
  TASK_OBSERVATION_SEVERITY_VALUES,
  TASK_OBSERVATION_STATUS_VALUES,
  validateAcr,
  validateTaskObservation,
  type AgentChangeRecord,
  type TaskObservation,
  type TaskObservationAction,
  type TaskObservationKind,
  type TaskObservationPhase,
  type TaskObservationSeverity,
  type TaskObservationStatus,
} from "./task-artifact-schema.js";

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
} from "./task-doc-contract.js";

export {
  applyTaskDocMutations,
  resolveTaskDocUpdatedBy,
  type TaskDocMutation,
  type TaskDocMutationComment,
  type TaskDocMutationResult,
  type TaskDocMutationState,
} from "./task-doc-mutation.js";

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
} from "./task-doc.js";

export { generateTaskId, TASK_ID_ALPHABET, timestampIdPrefix } from "./task-id.js";

export * as taskKernel from "./task-kernel/index.js";

export {
  EXECUTION_GRANT_EXTENSION_KEY,
  computeExecutionScopeDigest,
  computeLogicalCompletionContractDigest,
  computePlanDigest,
  createExecutionGrant,
  createOperationLease,
  createPlanProposal,
  executionGrantDigest,
  executionGrantFromExtensions,
  executionGrantForContextFromExtensions,
  hostUserDecisionDigest,
  isExecutionGrantActive,
  normalizePlanText,
  parseExecutionGrant,
  parseHostUserDecision,
  parseOperationLease,
  parsePlanProposal,
  rebaseExecutionGrantScope,
  type ExecutionGrant,
  type ExecutionGrantCapability,
  type HostUserDecision,
  type OperationLease,
  type PlanApprovalEvidenceKind,
  type PlanProposal,
} from "./plan-execution-grant.js";
export {
  TASK_EXECUTION_CONTEXT_EXTENSION_KEY,
  createTaskExecutionBaseIdentity,
  taskExecutionBaseFromExtensions,
  type TaskExecutionBaseIdentity,
} from "./task-execution-base.js";

export {
  componentForVerificationPath,
  computeVerificationContractKernel,
  computeLegacyVerificationContractKernel,
  isCentralVerificationPath,
  repositoryEffectsForPath,
  type VerificationContractKernelInput,
  type VerificationContractPhase,
  type VerificationContractKernelResult,
} from "./verification-contract.js";

export {
  isTaskStatus,
  migrateLegacyTaskStatus,
  normalizeTaskStatus,
  parseTaskStatus,
  parseTaskStatusStrict,
  TASK_STATUS_LABEL,
  TASK_STATUS_VALUES,
  InvalidTaskStatusError,
  type TaskStatusMigrationReceipt,
  type TaskStatus,
} from "./task-status.js";

export {
  readTaskReadme,
  updateTaskReadmeAtomic,
  withTaskReadmeTransaction,
  type TaskReadmeTransactionOptions,
} from "./task-readme-io.js";

export {
  parseTaskReadme,
  renderTaskFrontmatter,
  renderTaskReadme,
  taskReadmeDocBody,
  type ParsedTaskReadme,
} from "./task-readme.js";

export {
  formatTaskTokenUsageSummary,
  isTaskTokenUsageRenderInput,
  renderTaskTokenUsageBody,
  type TaskTokenUsageRenderInput,
} from "./task-token-usage-render.js";

export {
  buildProviderSafeTaskProjection,
  type ProviderSafeAcrProjection,
  type ProviderSafeTaskProjection,
  type ProviderSafeTaskProjectionInput,
} from "./task-provider-safe-projection.js";

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
  type QualityReviewRecoveryReason,
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
  type TaskTokenUsage,
  type TaskTokenUsageState,
  type TaskExecutionRoute,
  type TaskExecutionRouteMode,
  type TaskExecutionRouteRequest,
  type TaskExecutionContract,
  type TaskExecutionDeclaration,
  type TaskExecutionDeclarationInput,
  type TaskExecutionDeclarationV1,
  type TaskExecutionUncertainty,
  type TaskVerificationObservation,
  type TaskVerificationContract,
  type TaskVerificationContractV1,
  type TaskExternalEffect,
  type TaskRepositoryEffect,
  type TaskSyncConflict,
  type TaskSyncConflictPolicy,
  type TaskSyncEnvelope,
  type TaskSyncExternalRef,
  type TaskSyncFieldAuthority,
  type TaskSyncFieldPolicy,
  type TaskSyncFreshness,
  type VerificationResult,
  type VerificationState,
} from "./task-store.js";

export {
  buildTasksExportSnapshot,
  canonicalTasksPayload,
  canonicalizeJson,
  computeTasksChecksum,
  type TasksExportMeta,
  type TasksExportSnapshot,
  type TasksExportTask,
} from "./tasks-export.js";

export {
  lintTasksFile,
  lintTasksSnapshot,
  lintTaskVerifyStepsSection,
  readTasksExport,
  type TasksLintResult,
} from "./tasks-lint.js";

export * from "./task-centric/index.js";
