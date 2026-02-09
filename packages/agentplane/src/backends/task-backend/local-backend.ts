import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  docChanged,
  parseTaskReadme,
  renderTaskReadme,
  taskReadmePath,
  type TaskRecord,
} from "@agentplaneorg/core";

import { isRecord } from "../../shared/guards.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";
import {
  buildTaskIndexEntry,
  loadTaskIndex,
  resolveTaskIndexPath,
  saveTaskIndex,
  type TaskIndexEntry,
} from "../task-index.js";

import {
  DEFAULT_DOC_UPDATED_BY,
  DOC_VERSION,
  defaultPlanApproval,
  defaultVerificationResult,
  extractTaskDoc,
  generateTaskId,
  invalidLengthMessage,
  mapLimit,
  mergeTaskDoc,
  missingTaskIdMessage,
  nowIso,
  resolveDocUpdatedByFromFrontmatter,
  resolveDocUpdatedByFromTask,
  taskRecordToData,
  validateTaskId,
  writeTasksExportFromTasks,
  type TaskBackend,
  type TaskData,
} from "./shared.js";

export class LocalBackend implements TaskBackend {
  id = "local";
  root: string;
  updatedBy: string;

  constructor(settings?: { dir?: string; updatedBy?: string }) {
    this.root = path.resolve(settings?.dir ?? ".agentplane/tasks");
    this.updatedBy = settings?.updatedBy ?? DEFAULT_DOC_UPDATED_BY;
  }

  async generateTaskId(opts: { length: number; attempts: number }): Promise<string> {
    const length = opts.length;
    if (length < 4) throw new Error(invalidLengthMessage(length, 4));
    const attempts = Math.max(1, opts.attempts);
    return await generateTaskId({
      length,
      attempts,
      isAvailable: async (taskId) => {
        const readmePath = taskReadmePath(this.root, taskId);
        try {
          await readFile(readmePath, "utf8");
          return false;
        } catch (err) {
          const code = (err as { code?: string } | null)?.code;
          if (code === "ENOENT") return true;
          throw err;
        }
      },
    });
  }

  async listTasks(): Promise<TaskData[]> {
    const tasks: TaskData[] = [];
    const entries = await readdir(this.root, { withFileTypes: true }).catch(() => []);
    const indexPath = resolveTaskIndexPath(this.root);
    const cachedIndex = await loadTaskIndex(indexPath);
    const cachedByPath = new Map<string, TaskIndexEntry>();
    if (cachedIndex) {
      for (const [readmePath, taskId] of Object.entries(cachedIndex.byPath)) {
        const entry = cachedIndex.byId[taskId];
        if (entry) cachedByPath.set(readmePath, entry);
      }
    }
    const nextById: Record<string, TaskIndexEntry> = {};
    const nextByPath: Record<string, string> = {};
    const seen = new Set<string>();

    // Deterministic ordering helps both users and tests; keep I/O bounded to avoid storms.
    const dirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .toSorted();

    type ListTaskResult = {
      task: TaskData;
      index: TaskIndexEntry | null;
      mtimeMs: number;
      readme: string;
    };

    const results = await mapLimit<string, ListTaskResult | null>(dirs, 32, async (dirName) => {
      const readme = path.join(this.root, dirName, "README.md");
      let stats;
      try {
        stats = await stat(readme);
      } catch {
        return null;
      }
      if (!stats.isFile()) return null;

      const cached = cachedByPath.get(readme);
      if (cached?.mtimeMs === stats.mtimeMs) {
        return { task: cached.task, index: cached, mtimeMs: stats.mtimeMs, readme };
      }

      let text = "";
      try {
        text = await readFile(readme, "utf8");
      } catch {
        return null;
      }
      let parsed;
      try {
        parsed = parseTaskReadme(text);
      } catch {
        return null;
      }
      const fm = parsed.frontmatter;
      if (!isRecord(fm) || Object.keys(fm).length === 0) return null;
      const taskId = (typeof fm.id === "string" ? fm.id : dirName).trim();
      const task = taskRecordToData({
        id: taskId,
        frontmatter: fm as unknown as TaskRecord["frontmatter"],
        body: parsed.body,
        readmePath: readme,
      });
      return { task, index: null, mtimeMs: stats.mtimeMs, readme };
    });

    for (const res of results) {
      if (!res) continue;
      const taskId = res.task.id.trim();
      if (taskId) {
        validateTaskId(taskId);
        if (seen.has(taskId)) throw new Error(`Duplicate task id in local backend: ${taskId}`);
        seen.add(taskId);
      }
      tasks.push(res.task);
      if (taskId) {
        const entry = res.index ?? buildTaskIndexEntry(res.task, res.readme, res.mtimeMs);
        nextById[taskId] = entry;
        nextByPath[entry.readmePath] = taskId;
      }
    }
    try {
      await saveTaskIndex(indexPath, { schema_version: 2, byId: nextById, byPath: nextByPath });
    } catch {
      // Best-effort cache; ignore failures.
    }
    return tasks;
  }

  async getTask(taskId: string): Promise<TaskData | null> {
    const readme = taskReadmePath(this.root, taskId);
    let text = "";
    try {
      text = await readFile(readme, "utf8");
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code === "ENOENT") return null;
      throw err;
    }
    const parsed = parseTaskReadme(text);
    const task = taskRecordToData({
      id: taskId,
      frontmatter: parsed.frontmatter as unknown as TaskRecord["frontmatter"],
      body: parsed.body,
      readmePath: readme,
    });
    return task;
  }

  async getTasks(taskIds: string[]): Promise<(TaskData | null)[]> {
    // Keep ordering stable for callers; use limited parallelism to avoid IO storms.
    return await mapLimit(taskIds, 8, async (taskId) => await this.getTask(taskId));
  }

  async getTaskDoc(taskId: string): Promise<string> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    return extractTaskDoc(parsed.body);
  }

  async writeTask(task: TaskData): Promise<void> {
    const taskId = task.id.trim();
    if (!taskId) throw new Error(missingTaskIdMessage());
    validateTaskId(taskId);

    const readme = taskReadmePath(this.root, taskId);
    let body = "";
    let existingDoc = "";
    let existingFrontmatter: Record<string, unknown> = {};

    try {
      const text = await readFile(readme, "utf8");
      const parsed = parseTaskReadme(text);
      body = parsed.body;
      existingDoc = extractTaskDoc(parsed.body);
      existingFrontmatter = parsed.frontmatter;
    } catch (err) {
      const code = (err as { code?: string } | null)?.code;
      if (code !== "ENOENT") throw err;
    }

    const payload: Record<string, unknown> = { ...task };
    delete payload.doc;

    for (const [key, value] of Object.entries(payload)) {
      if (value === undefined) delete payload[key];
    }

    for (const key of ["doc_version", "doc_updated_at", "doc_updated_by"]) {
      if (payload[key] === undefined && existingFrontmatter[key] !== undefined) {
        payload[key] = existingFrontmatter[key];
      }
    }

    if (payload.plan_approval === undefined && existingFrontmatter.plan_approval !== undefined) {
      payload.plan_approval = existingFrontmatter.plan_approval;
    }
    if (payload.plan_approval === undefined) {
      payload.plan_approval = defaultPlanApproval();
    }

    if (payload.verification === undefined && existingFrontmatter.verification !== undefined) {
      payload.verification = existingFrontmatter.verification;
    }
    if (payload.verification === undefined) {
      payload.verification = defaultVerificationResult();
    }

    if (task.doc !== undefined) {
      const docText = String(task.doc ?? "");
      body = mergeTaskDoc(body, docText);
      if (docChanged(existingDoc, docText)) {
        payload.doc_version = DOC_VERSION;
        payload.doc_updated_at = nowIso();
        payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
      }
    }

    if (payload.doc_version !== DOC_VERSION) {
      payload.doc_version = DOC_VERSION;
    }
    if (payload.doc_updated_at === undefined || payload.doc_updated_at === "") {
      payload.doc_updated_at = nowIso();
    }
    if (payload.doc_updated_by === undefined || payload.doc_updated_by === "") {
      payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
    }

    await mkdir(path.dirname(readme), { recursive: true });
    const text = renderTaskReadme(payload, body || "");
    await writeTextIfChanged(readme, text.endsWith("\n") ? text : `${text}\n`);
  }

  async setTaskDoc(taskId: string, doc: string, updatedBy?: string): Promise<void> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    const docText = String(doc ?? "");
    const body = mergeTaskDoc(parsed.body, docText);
    const frontmatter = { ...parsed.frontmatter } as Record<string, unknown>;
    if (docChanged(extractTaskDoc(parsed.body), docText) || !frontmatter.doc_updated_at) {
      frontmatter.doc_version = DOC_VERSION;
      frontmatter.doc_updated_at = nowIso();
      frontmatter.doc_updated_by = resolveDocUpdatedByFromFrontmatter(
        frontmatter,
        updatedBy,
        this.updatedBy,
      );
    }
    if (frontmatter.doc_version !== DOC_VERSION) {
      frontmatter.doc_version = DOC_VERSION;
    }
    const next = renderTaskReadme(frontmatter, body);
    await writeTextIfChanged(readme, next.endsWith("\n") ? next : `${next}\n`);
  }

  async touchTaskDocMetadata(taskId: string, updatedBy?: string): Promise<void> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    const frontmatter = { ...parsed.frontmatter } as Record<string, unknown>;
    frontmatter.doc_version = DOC_VERSION;
    frontmatter.doc_updated_at = nowIso();
    frontmatter.doc_updated_by = resolveDocUpdatedByFromFrontmatter(
      frontmatter,
      updatedBy,
      this.updatedBy,
    );
    const next = renderTaskReadme(frontmatter, parsed.body || "");
    await writeTextIfChanged(readme, next.endsWith("\n") ? next : `${next}\n`);
  }

  async writeTasks(tasks: TaskData[]): Promise<void> {
    await mapLimit(tasks, 4, async (task) => {
      await this.writeTask(task);
      return null;
    });
  }

  async normalizeTasks(): Promise<{ scanned: number; changed: number }> {
    const entries = await readdir(this.root, { withFileTypes: true }).catch(() => []);
    const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

    const results = await mapLimit(
      dirs,
      8,
      async (dirName): Promise<{ taskId: string; scanned: boolean; changed: boolean }> => {
        const readme = path.join(this.root, dirName, "README.md");

        let text = "";
        try {
          text = await readFile(readme, "utf8");
        } catch {
          return { taskId: "", scanned: false, changed: false };
        }

        let parsed;
        try {
          parsed = parseTaskReadme(text);
        } catch {
          return { taskId: "", scanned: false, changed: false };
        }

        const fm = parsed.frontmatter;
        if (!isRecord(fm) || Object.keys(fm).length === 0) {
          return { taskId: "", scanned: false, changed: false };
        }

        const taskId = (typeof fm.id === "string" ? fm.id : dirName).trim();
        if (taskId) validateTaskId(taskId);

        const task = taskRecordToData({
          id: taskId,
          frontmatter: fm as unknown as TaskRecord["frontmatter"],
          body: parsed.body,
          readmePath: readme,
        });

        // Render using the same normalization rules as writeTask, but avoid rewriting the file when the
        // rendered output is identical (prevents mtime churn and diff-noise).
        const payload: Record<string, unknown> = { ...task };
        delete payload.doc;
        for (const [key, value] of Object.entries(payload)) {
          if (value === undefined) delete payload[key];
        }
        for (const key of ["doc_version", "doc_updated_at", "doc_updated_by"]) {
          if (payload[key] === undefined && fm[key] !== undefined) payload[key] = fm[key];
        }
        if (payload.plan_approval === undefined && fm.plan_approval !== undefined) {
          payload.plan_approval = fm.plan_approval;
        }
        if (payload.plan_approval === undefined) payload.plan_approval = defaultPlanApproval();
        if (payload.verification === undefined && fm.verification !== undefined) {
          payload.verification = fm.verification;
        }
        if (payload.verification === undefined) payload.verification = defaultVerificationResult();

        if (payload.doc_version !== DOC_VERSION) payload.doc_version = DOC_VERSION;
        if (payload.doc_updated_at === undefined || payload.doc_updated_at === "") {
          payload.doc_updated_at = nowIso();
        }
        if (payload.doc_updated_by === undefined || payload.doc_updated_by === "") {
          payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
        }

        const next = renderTaskReadme(payload, parsed.body || "");
        const didWrite = await writeTextIfChanged(readme, next.endsWith("\n") ? next : `${next}\n`);
        return { taskId, scanned: true, changed: didWrite };
      },
    );

    const seen = new Set<string>();
    for (const { taskId } of results) {
      if (!taskId) continue;
      if (seen.has(taskId)) throw new Error(`Duplicate task id in local backend: ${taskId}`);
      seen.add(taskId);
    }

    const scanned = results.reduce((acc, r) => acc + (r.scanned ? 1 : 0), 0);
    const changed = results.reduce((acc, r) => acc + (r.changed ? 1 : 0), 0);
    return { scanned, changed };
  }

  async exportTasksJson(outputPath: string): Promise<void> {
    const tasks = await this.listTasks();
    await writeTasksExportFromTasks({ outputPath, tasks });
  }
}
