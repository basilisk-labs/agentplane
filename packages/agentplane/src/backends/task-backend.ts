export {
  BackendError,
  RedmineUnavailable,
  buildTasksExportSnapshotFromTasks,
  extractTaskDoc,
  mergeTaskDoc,
  taskRecordToData,
  writeTasksExportFromTasks,
  type PlanApproval,
  type PlanApprovalState,
  type TaskBackend,
  type TaskBackendCapabilities,
  type TaskBackendFieldNameDrift,
  type TaskBackendInspectionResult,
  type TaskBackendVisibleField,
  type TaskData,
  type TaskEvent,
  type TaskEventType,
  type TaskProjectionRefreshOptions,
  type TaskWriteOptions,
  type VerificationResult,
  type VerificationState,
} from "./task-backend/shared.js";

export { LocalBackend } from "./task-backend/local-backend.js";

export { RedmineBackend } from "./task-backend/redmine-backend.js";

export { loadTaskBackend } from "./task-backend/load.js";
