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
  depends_on: string[];
  tags: string[];
  verify: string[];
  plan_approval?: PlanApproval;
  verification?: VerificationResult;
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
