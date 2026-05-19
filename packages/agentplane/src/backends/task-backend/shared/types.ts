import type {
  PlanApproval,
  TaskDocSections,
  TaskDocVersion,
  TaskEvent,
  TaskOrigin,
  TaskRunnerOutcome,
  QualityReviewResult,
  VerificationResult,
} from "@agentplaneorg/core/tasks";
export {
  PlanApproval,
  PlanApprovalState,
  TaskEvent,
  TaskEventType,
  TaskOrigin,
  TaskRunnerEvidence,
  TaskRunnerExecutionMetrics,
  TaskRunnerHistoryEntry,
  TaskRunnerOutcome,
  TaskRunnerOutcomeStatus,
  TaskRunnerTarget,
  QualityReviewResult,
  VerificationState,
  VerificationResult,
} from "@agentplaneorg/core/tasks";

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
  task_kind?: "analysis" | "content" | "docs" | "code" | "release" | "ops" | "context";
  mutation_scope?: "none" | "docs" | "code" | "release" | "ops" | "context" | "unknown";
  risk_flags?: (
    | "network"
    | "credentials"
    | "deploy"
    | "publish"
    | "merge"
    | "security"
    | "external_system"
  )[];
  blueprint_request?:
    | "analysis.light"
    | "content.light"
    | "docs.change"
    | "code.direct"
    | "code.branch_pr"
    | "performance.benchmark"
    | "quality.regression"
    | "context.assimilation"
    | "context.maximum_assimilation"
    | "post_run.improvement_review"
    | "release.strict"
    | "ops.approval";
  verify: string[];
  plan_approval?: PlanApproval;
  verification?: VerificationResult;
  quality_review?: QualityReviewResult;
  runner?: TaskRunnerOutcome;
  commit?: { hash: string; message: string } | null;
  comments?: { author: string; body: string }[];
  events?: TaskEvent[];
  doc?: string;
  sections?: TaskDocSections;
  extensions?: Record<string, unknown>;
  doc_version?: TaskDocVersion;
  doc_updated_at?: string;
  doc_updated_by?: string;
  dirty?: boolean;
  id_source?: string;
};

export type TaskSummary = Omit<TaskData, "doc" | "sections" | "events">;

export type TaskDocMeta = Pick<
  TaskData,
  "doc" | "doc_version" | "doc_updated_at" | "doc_updated_by"
>;

export type TaskWriteOptions = {
  expectedRevision?: number;
  expectedCurrentDoc?: string | null;
  expectedCurrentText?: string | null;
  expectedSection?: string;
};

export type TaskBackendProjectionReadMode = "native" | "fallback";

export type TaskBackendCapabilities = {
  canonical_source: "local" | "remote";
  projection: "canonical" | "cache";
  projection_read_mode: TaskBackendProjectionReadMode;
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
  connection?: {
    endpoint: string | null;
    projectId: string | null;
    connected: boolean;
    missing: string[];
    provider?: string | null;
    envOverrides?: {
      key: string;
      configured: string | null;
      effective: string;
    }[];
    syncState?: {
      unavailable: boolean;
      degraded: boolean | null;
      reason: string | null;
      failedJobs: number | null;
      queuedJobs: number | null;
      runningJobs: number | null;
      delayedJobs: number | null;
      pullCursor: string | null;
      openConflicts: number;
      latestJob: {
        id: string | null;
        type: string | null;
        status: string | null;
        error: string | null;
      } | null;
    } | null;
  };
  freshness?: {
    lastCheckedAt: string | null;
    staleAfterSeconds: number | null;
    stale: boolean;
    statePath?: string | null;
    pendingPush?: {
      failed_at: string;
      reason: string;
    } | null;
  };
};

export type TaskBackendBase = {
  id: string;
  capabilities: TaskBackendCapabilities;
};

export type TaskBackendQueryPort = {
  listTasks(): Promise<TaskData[]>;
  getTask(taskId: string): Promise<TaskData | null>;
  getTasks?(taskIds: string[]): Promise<(TaskData | null)[]>;
};

export type TaskBackendProjectionPort = {
  listProjectionTasks?(): Promise<TaskSummary[]>;
  getLastListWarnings?(): string[];
};

export type TaskBackendMutationPort = {
  assertLocalMutationReady?(): Promise<void>;
  writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void>;
  writeTasks?(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void>;
  normalizeTasks?(): Promise<{ scanned: number; changed: number }>;
};

export type TaskBackendSyncPort = {
  refreshProjection?(opts: TaskProjectionRefreshOptions): Promise<void>;
  refreshProjectionBeforeTaskStart?(): Promise<void>;
  migrateCanonicalState?(): Promise<TaskCanonicalStateMigrationResult>;
  sync?(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void>;
};

export type TaskBackendInspectionPort = {
  inspectConfiguration?(): Promise<TaskBackendInspectionResult>;
};

export type TaskBackendDocPort = {
  getTaskDoc?(taskId: string): Promise<string>;
  setTaskDoc?(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void>;
  touchTaskDocMetadata?(taskId: string, updatedBy?: string, opts?: TaskWriteOptions): Promise<void>;
};

export type TaskBackendIdentityPort = {
  generateTaskId?(opts: { length: number; attempts: number }): Promise<string>;
};

export type TaskBackend = TaskBackendBase &
  TaskBackendQueryPort &
  TaskBackendProjectionPort &
  TaskBackendMutationPort &
  TaskBackendSyncPort &
  TaskBackendInspectionPort &
  TaskBackendDocPort &
  TaskBackendIdentityPort;
