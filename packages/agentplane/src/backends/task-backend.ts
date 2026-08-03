export {
  BackendError,
  buildTasksExportSnapshotFromTasks,
  extractTaskDoc,
  mergeTaskDoc,
  taskRecordToData,
  toTaskSummaries,
  toTaskSummary,
  type PlanApprovalState,
  type TaskBackend,
  type TaskBackendCapabilities,
  type TaskBackendProjectionObservation,
  type TaskBackendProjectionTransition,
  type TaskData,
  type TaskEvent,
  type TaskOrigin,
  type TaskRunnerHistoryEntry,
  type TaskRunnerOutcome,
  type TaskRunnerOutcomeStatus,
  type TaskRunnerTarget,
  type TaskSummary,
  type TaskWriteResult,
  type TaskWriteOptions,
} from "./task-backend/shared.js";

export { LocalBackend } from "./task-backend/local-backend.js";

export { CloudBackend } from "./task-backend/cloud-backend.js";

export { loadTaskBackend } from "./task-backend/load.js";
