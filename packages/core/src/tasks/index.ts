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

export {
  isTaskStatus,
  normalizeTaskStatus,
  parseTaskStatus,
  TASK_STATUS_LABEL,
  TASK_STATUS_VALUES,
  type TaskStatus,
} from "./task-status.js";

export { readTaskReadme, updateTaskReadmeAtomic } from "./task-readme-io.js";

export {
  parseTaskReadme,
  renderTaskFrontmatter,
  renderTaskReadme,
  taskReadmeDocBody,
  type ParsedTaskReadme,
} from "./task-readme.js";

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
  type QualityReviewResult,
  type QualityReviewState,
  type TaskRecord,
  type TaskRunnerEvidence,
  type TaskRunnerExecutionMetrics,
  type TaskRunnerHistoryEntry,
  type TaskRunnerOutcome,
  type TaskRunnerOutcomeStatus,
  type TaskRunnerTarget,
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
  readTasksExport,
  type TasksLintResult,
} from "./tasks-lint.js";
