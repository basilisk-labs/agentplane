export type PlanApprovalState = "pending" | "approved" | "rejected";
export type PlanApproval = {
  state: PlanApprovalState;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
};

export type VerificationState = "pending" | "ok" | "needs_rework";
export type VerificationResult = {
  state: VerificationState;
  updated_at: string | null;
  updated_by: string | null;
  note: string | null;
};

export type TaskRunnerOutcomeStatus = "prepared" | "running" | "success" | "failed" | "cancelled";

export type TaskRunnerExecutionMetrics = {
  duration_ms?: number;
  stdout_bytes?: number;
  stderr_bytes?: number;
  output_last_message_bytes?: number | null;
};

export type TaskRunnerTarget = {
  kind: "task" | "recipe_scenario";
  task_id?: string;
  recipe_id?: string;
  scenario_id?: string;
};

export type TaskRunnerHistoryEntry = {
  run_id: string;
  status: TaskRunnerOutcomeStatus;
  adapter_id: string;
  mode: "execute" | "dry_run";
  updated_at: string;
  started_at?: string;
  ended_at?: string;
  exit_code: number | null;
  target: TaskRunnerTarget;
  output_paths?: string[];
  stdout_summary?: string;
  stderr_summary?: string;
  metrics?: TaskRunnerExecutionMetrics;
};

export type TaskRunnerOutcome = TaskRunnerHistoryEntry & {
  history?: TaskRunnerHistoryEntry[];
};

export type TaskOrigin = {
  system: string;
  issue_id?: string;
  url?: string;
  recipe_id?: string;
  scenario_id?: string;
  recipe_version?: string;
  run_id?: string;
  [key: string]: string | undefined;
};

export type TaskEventType = "status" | "comment" | "verify";
export type TaskEvent = {
  type: TaskEventType;
  at: string;
  author: string;
  from?: string;
  to?: string;
  state?: string;
  note?: string;
  body?: string;
};

export type TaskData = {
  id: string;
  title: string;
  result_summary?: string;
  risk_level?: "low" | "med" | "high";
  breaking?: boolean;
  description: string;
  status: string;
  priority: string | number;
  owner: string;
  revision?: number;
  origin?: TaskOrigin | null;
  depends_on: string[];
  tags: string[];
  verify: string[];
  plan_approval?: PlanApproval;
  verification?: VerificationResult;
  runner?: TaskRunnerOutcome;
  commit?: { hash: string; message: string } | null;
  comments?: { author: string; body: string }[];
  events?: TaskEvent[];
  doc?: string;
  sections?: Record<string, string>;
  doc_version?: number;
  doc_updated_at?: string;
  doc_updated_by?: string;
  dirty?: boolean;
  id_source?: string;
};

export type TaskDocMeta = Pick<
  TaskData,
  "doc" | "doc_version" | "doc_updated_at" | "doc_updated_by"
>;

export type TaskWriteOptions = {
  expectedRevision?: number;
};

export type TaskBackendCapabilities = {
  canonical_source: "local" | "remote";
  projection: "canonical" | "cache";
  reads_from_projection_by_default: boolean;
  writes_task_readmes?: boolean;
  supports_task_revisions: boolean;
  supports_revision_guarded_writes: boolean;
  may_access_network_on_read: boolean;
  may_access_network_on_write: boolean;
  supports_projection_refresh: boolean;
  supports_push_sync: boolean;
  supports_snapshot_export: boolean;
};

export type TaskProjectionRefreshOptions = {
  allowNetwork: boolean;
  quiet?: boolean;
  conflict?: "diff" | "prefer-local" | "prefer-remote" | "fail";
};

export type TaskCanonicalStateMigrationResult = {
  scanned: number;
  migrated: string[];
  skippedStructured: string[];
  skippedNoDoc: string[];
  failed: { taskId: string; reason: string }[];
};

export type TaskBackendVisibleField = {
  id: number;
  name: string;
  nonEmptyCount: number;
};

export type TaskBackendFieldNameDrift = {
  key: string;
  configuredId: number;
  visibleName: string;
};

export type TaskBackendInspectionResult = {
  backendId: string;
  visibleCustomFields: TaskBackendVisibleField[];
  canonicalState: {
    configuredFieldId: number | null;
    visibleFieldId: number | null;
  };
  configuredFieldNameDrift: TaskBackendFieldNameDrift[];
};

export type TaskBackend = {
  id: string;
  capabilities: TaskBackendCapabilities;
  listTasks(): Promise<TaskData[]>;
  listProjectionTasks?(): Promise<TaskData[]>;
  getLastListWarnings?(): string[];
  getTask(taskId: string): Promise<TaskData | null>;
  getTasks?(taskIds: string[]): Promise<(TaskData | null)[]>;
  writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
  writeTasks?(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void>;
  normalizeTasks?(): Promise<{ scanned: number; changed: number }>;
  refreshProjection?(opts: TaskProjectionRefreshOptions): Promise<void>;
  migrateCanonicalState?(): Promise<TaskCanonicalStateMigrationResult>;
  inspectConfiguration?(): Promise<TaskBackendInspectionResult>;
  exportProjectionSnapshot?(outputPath: string): Promise<void>;
  exportTasksJson?(outputPath: string): Promise<void>;
  getTaskDoc?(taskId: string): Promise<string>;
  setTaskDoc?(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void>;
  touchTaskDocMetadata?(taskId: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
  sync?(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void>;
  generateTaskId?(opts: { length: number; attempts: number }): Promise<string>;
};
