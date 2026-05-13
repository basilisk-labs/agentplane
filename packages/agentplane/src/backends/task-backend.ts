export {
  BackendError,
  RedmineUnavailable,
  buildTasksExportSnapshotFromTasks,
  extractTaskDoc,
  mergeTaskDoc,
  taskRecordToData,
  toTaskSummaries,
  toTaskSummary,
  type PlanApproval,
  type PlanApprovalState,
  type TaskBackend,
  type TaskBackendBase,
  type TaskBackendCapabilities,
  type TaskBackendDocPort,
  type TaskBackendExportPort,
  type TaskBackendFieldNameDrift,
  type TaskBackendIdentityPort,
  type TaskBackendInspectionResult,
  type TaskBackendInspectionPort,
  type TaskBackendMutationPort,
  type TaskBackendProjectionPort,
  type TaskBackendProjectionReadMode,
  type TaskBackendQueryPort,
  type TaskBackendSyncPort,
  type TaskBackendVisibleField,
  type TaskData,
  type TaskEvent,
  type TaskEventType,
  type TaskOrigin,
  type TaskRunnerExecutionMetrics,
  type TaskRunnerHistoryEntry,
  type TaskRunnerOutcome,
  type TaskRunnerOutcomeStatus,
  type TaskRunnerTarget,
  type TaskProjectionRefreshOptions,
  type TaskSummary,
  type TaskWriteOptions,
  type VerificationResult,
  type VerificationState,
} from "./task-backend/shared.js";

export { LocalBackend } from "./task-backend/local-backend.js";

export { RedmineBackend } from "./task-backend/redmine-backend.js";
export { CloudBackend } from "./task-backend/cloud-backend.js";

export { loadTaskBackend } from "./task-backend/load.js";
