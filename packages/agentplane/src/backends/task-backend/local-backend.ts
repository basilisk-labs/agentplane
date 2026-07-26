import path from "node:path";
import { rm } from "node:fs/promises";
import {
  parseTaskReadme,
  taskReadmePath,
  withTaskReadmeTransaction,
} from "@agentplaneorg/core/tasks";

import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
  type ContainedPathChainIdentity,
} from "../../shared/contained-stable-file.js";
import {
  DEFAULT_DOC_UPDATED_BY,
  type TaskBackend,
  type TaskData,
  type TaskSummary,
  type TaskWriteResult,
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
  writeLocalTaskWithReceipt,
  writeLocalTasks,
  type LocalTaskWriteReceipt,
} from "./local-backend-write.js";
import { assertExpectedRevision, storedRevisionFromFrontmatter } from "./local-backend-state.js";

const TASK_README_MAX_BYTES = 256 * 1024 * 1024;

async function captureTaskDeletionPathIfPresent(opts: {
  tasksRoot: string;
  readmePath: string;
  label: string;
}): Promise<ContainedPathChainIdentity | null> {
  try {
    return await captureContainedPathChainIdentity({
      repository_root: opts.tasksRoot,
      file_path: opts.readmePath,
      label: opts.label,
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException | null)?.code === "ENOENT") return null;
    throw error;
  }
}

async function assertTaskDeletionPathUnchanged(opts: {
  expected: ContainedPathChainIdentity | null;
  tasksRoot: string;
  readmePath: string;
  label: string;
}): Promise<boolean> {
  if (opts.expected) {
    await assertContainedPathChainIdentityUnchanged(opts.expected, opts.label);
    return true;
  }
  const observed = await captureTaskDeletionPathIfPresent(opts);
  if (!observed) return false;
  throw new Error(`Refusing changed ${opts.label} path: ${opts.readmePath}`);
}

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
    const result = await this.listTasksWithWarnings();
    return result.tasks;
  }

  async listTasksWithWarnings(opts?: {
    writeIndex?: boolean;
  }): Promise<{ tasks: TaskData[]; warnings: string[] }> {
    let requestWarnings: string[] = [];
    const context = {
      root: this.root,
      updatedBy: this.updatedBy,
      setLastListWarnings: (warnings: string[]) => {
        requestWarnings = [...warnings];
        this.lastListWarnings = [...warnings];
      },
    };
    const tasks = (await listLocalTasks(context, "full", opts)) as TaskData[];
    return { tasks, warnings: requestWarnings };
  }

  async listProjectionTasks(opts?: { status?: readonly string[] }): Promise<TaskSummary[]> {
    return (await listLocalTasks(this.backendContext(), "projection", {
      writeIndex: false,
      status: opts?.status,
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
    await this.writeTaskWithResult(task, opts);
  }

  async writeTaskWithResult(task: TaskData, opts?: TaskWriteOptions): Promise<TaskWriteResult> {
    const receipt = await writeLocalTaskWithReceipt(this.backendContext(), task, opts);
    return {
      ...receipt,
      artifact_paths: [taskReadmePath(this.root, receipt.task.id)],
    };
  }

  async writeTaskWithReceipt(
    task: TaskData,
    opts: TaskWriteOptions | undefined,
    beforePublication: () => Promise<void>,
  ): Promise<LocalTaskWriteReceipt> {
    return await writeLocalTaskWithReceipt(this.backendContext(), task, opts, beforePublication);
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

  async deleteTask(
    taskId: string,
    opts?: Pick<TaskWriteOptions, "expectedRevision">,
  ): Promise<void> {
    await this.deleteTaskWithPublicationGuard(taskId, opts);
  }

  async deleteTaskWithPublicationGuard(
    taskId: string,
    opts?: Pick<TaskWriteOptions, "expectedRevision">,
    beforeDeletion?: () => Promise<void>,
  ): Promise<void> {
    const readmePath = taskReadmePath(this.root, taskId);
    await withTaskReadmeTransaction(readmePath, async () => {
      const label = `task README ${taskId}`;
      const deletionPath = await captureTaskDeletionPathIfPresent({
        tasksRoot: this.root,
        readmePath,
        label,
      });
      let currentRevision = 0;
      try {
        const parsed = parseTaskReadme(
          await readContainedStableTextNoFollow({
            repository_root: this.root,
            file_path: readmePath,
            label,
            max_bytes: TASK_README_MAX_BYTES,
          }),
        );
        currentRevision = storedRevisionFromFrontmatter(parsed.frontmatter, 1);
      } catch (error) {
        if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") throw error;
      }
      assertExpectedRevision({
        taskId,
        expectedRevision: opts?.expectedRevision,
        currentRevision,
      });
      await beforeDeletion?.();
      const deletionPathIsAnchored = await assertTaskDeletionPathUnchanged({
        expected: deletionPath,
        tasksRoot: this.root,
        readmePath,
        label,
      });
      if (!deletionPathIsAnchored) return;
      await rm(path.join(this.root, taskId), { recursive: true, force: true });
    });
  }

  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    return await normalizeLocalTasks(this.backendContext());
  }
}
