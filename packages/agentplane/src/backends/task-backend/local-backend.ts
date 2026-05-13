import path from "node:path";

import {
  DEFAULT_DOC_UPDATED_BY,
  type TaskBackend,
  type TaskData,
  type TaskSummary,
  type TaskWriteOptions,
} from "./shared.js";
import { setLocalTaskDoc, touchLocalTaskDocMetadata } from "./local-backend-doc.js";
import {
  getLocalTask,
  getLocalTaskDoc,
  getLocalTasks,
  listLocalTasks,
} from "./local-backend-read.js";
import {
  generateLocalTaskId,
  normalizeLocalTasks,
  writeLocalTask,
  writeLocalTasks,
} from "./local-backend-write.js";

export class LocalBackend implements TaskBackend {
  id = "local";
  capabilities = {
    canonical_source: "local",
    projection: "canonical",
    projection_read_mode: "native",
    reads_from_projection_by_default: true,
    writes_task_readmes: true,
    supports_task_revisions: true,
    supports_revision_guarded_writes: true,
    may_access_network_on_read: false,
    may_access_network_on_write: false,
    supports_projection_refresh: false,
    supports_push_sync: false,
    supports_snapshot_export: false,
  } as const;
  root: string;
  updatedBy: string;
  private lastListWarnings: string[] = [];

  constructor(settings?: { dir?: string; updatedBy?: string }) {
    this.root = path.resolve(settings?.dir ?? ".agentplane/tasks");
    this.updatedBy = settings?.updatedBy ?? DEFAULT_DOC_UPDATED_BY;
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    return await generateLocalTaskId(this.backendContext(), opts);
  }

  private backendContext() {
    return {
      root: this.root,
      updatedBy: this.updatedBy,
      setLastListWarnings: (warnings: string[]) => {
        this.lastListWarnings = warnings;
      },
    };
  }

  async listTasks(): Promise<TaskData[]> {
    return (await listLocalTasks(this.backendContext(), "full")) as TaskData[];
  }

  async listProjectionTasks(): Promise<TaskSummary[]> {
    return (await listLocalTasks(this.backendContext(), "projection", {
      writeIndex: false,
    })) as TaskSummary[];
  }

  getLastListWarnings(): string[] {
    return [...this.lastListWarnings];
  }

  async getTask(taskId: string): Promise<TaskData | null> {
    return await getLocalTask(this.backendContext(), taskId);
  }

  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    return await getLocalTasks(this.backendContext(), taskIds);
  }

  async getTaskDoc(taskId: string): Promise<string> {
    return await getLocalTaskDoc(this.backendContext(), taskId);
  }

  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
    await writeLocalTask(this.backendContext(), task, opts);
  }

  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await setLocalTaskDoc(this.backendContext(), taskId, doc, updatedBy, opts);
  }

  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    await touchLocalTaskDocMetadata(this.backendContext(), taskId, updatedBy, opts);
  }

  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await writeLocalTasks(this.backendContext(), tasks, opts);
  }

  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    return await normalizeLocalTasks(this.backendContext());
  }

}
