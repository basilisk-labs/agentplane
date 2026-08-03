export { DEFAULT_DOC_UPDATED_BY } from "./shared/constants.js";

export type {
  PlanApprovalState,
  TaskBackend,
  TaskBackendCapabilities,
  TaskBackendInspectionResult,
  TaskBackendProjectionObservation,
  TaskBackendProjectionTransition,
  TaskBackendProjectionTransitionHooks,
  TaskData,
  TaskEvent,
  TaskOrigin,
  TaskRunnerHistoryEntry,
  TaskRunnerOutcome,
  TaskRunnerOutcomeStatus,
  TaskRunnerTarget,
  TaskSummary,
  TaskWriteResult,
  TaskWriteOptions,
} from "./shared/types.js";

export * from "./shared/concurrency.js";
export * from "./shared/doc.js";
export * from "./shared/errors.js";
export * from "./shared/export.js";
export * from "./shared/id.js";
export {
  defaultPlanApproval,
  toTaskSummaries,
  toTaskSummary,
  defaultVerificationResult,
} from "./shared/normalize.js";
export * from "./shared/record.js";
export * from "./shared/strings.js";
