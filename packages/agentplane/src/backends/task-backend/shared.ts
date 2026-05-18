export { DEFAULT_DOC_UPDATED_BY, DOC_VERSION, TASK_ID_RE } from "./shared/constants.js";

export type {
  PlanApproval,
  PlanApprovalState,
  TaskBackend,
  TaskBackendBase,
  TaskBackendCapabilities,
  TaskBackendDocPort,
  TaskBackendFieldNameDrift,
  TaskBackendIdentityPort,
  TaskBackendInspectionResult,
  TaskBackendInspectionPort,
  TaskBackendMutationPort,
  TaskBackendProjectionPort,
  TaskBackendProjectionReadMode,
  TaskBackendQueryPort,
  TaskBackendSyncPort,
  TaskBackendVisibleField,
  TaskCanonicalStateMigrationResult,
  TaskData,
  TaskDocMeta,
  TaskEvent,
  TaskEventType,
  TaskOrigin,
  QualityReviewResult,
  QualityReviewState,
  TaskRunnerExecutionMetrics,
  TaskRunnerHistoryEntry,
  TaskRunnerOutcome,
  TaskRunnerOutcomeStatus,
  TaskRunnerTarget,
  TaskProjectionRefreshOptions,
  TaskSummary,
  TaskWriteOptions,
  VerificationResult,
  VerificationState,
} from "./shared/types.js";

export * from "./shared/concurrency.js";
export * from "./shared/doc.js";
export * from "./shared/errors.js";
export * from "./shared/export.js";
export * from "./shared/id.js";
export {
  defaultPlanApproval,
  normalizeQualityReviewResult,
  normalizeTaskOrigin,
  normalizeTaskRunnerOutcome,
  toTaskSummaries,
  toTaskSummary,
  defaultVerificationResult,
  normalizeDependsOn,
  normalizePriority,
} from "./shared/normalize.js";
export * from "./shared/record.js";
export * from "./shared/strings.js";
