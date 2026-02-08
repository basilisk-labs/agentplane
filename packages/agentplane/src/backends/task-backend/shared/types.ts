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
  description: string;
  status: string;
  priority: string | number;
  owner: string;
  depends_on: string[];
  tags: string[];
  verify: string[];
  plan_approval?: PlanApproval;
  verification?: VerificationResult;
  commit?: { hash: string; message: string } | null;
  comments?: { author: string; body: string }[];
  events?: TaskEvent[];
  doc?: string;
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

export type TaskBackend = {
  id: string;
  listTasks(): Promise<TaskData[]>;
  getTask(taskId: string): Promise<TaskData | null>;
  getTasks?(taskIds: string[]): Promise<(TaskData | null)[]>;
  writeTask(task: TaskData): Promise<void>;
  writeTasks?(tasks: TaskData[]): Promise<void>;
  normalizeTasks?(): Promise<{ scanned: number; changed: number }>;
  exportTasksJson?(outputPath: string): Promise<void>;
  getTaskDoc?(taskId: string): Promise<string>;
  setTaskDoc?(taskId: string, doc: string, updatedBy?: string): Promise<void>;
  touchTaskDocMetadata?(taskId: string, updatedBy?: string): Promise<void>;
  sync?(opts: {
    direction: "push" | "pull";
    conflict: "diff" | "prefer-local" | "prefer-remote" | "fail";
    quiet: boolean;
    confirm: boolean;
  }): Promise<void>;
  generateTaskId?(opts: { length: number; attempts: number }): Promise<string>;
};
