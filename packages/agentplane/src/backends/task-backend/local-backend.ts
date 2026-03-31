import { mkdir, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

import {
  applyTaskDocMutations,
  docChanged,
  parseTaskReadme,
  renderTaskReadme,
  taskDocToSectionMap,
  taskReadmePath,
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
  type TaskDocMutationState,
  type TaskRecord,
} from "@agentplaneorg/core";

import { isRecord } from "../../shared/guards.js";
import {
  assertExpectedTaskDoc,
  assertExpectedTaskSection,
} from "../../shared/task-doc-conflicts.js";
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
  defaultPlanApproval,
  defaultVerificationResult,
  extractTaskDoc,
  generateTaskId,
  invalidLengthMessage,
  mapLimit,
  mergeTaskDoc,
  missingTaskIdMessage,
  normalizeDocVersion,
  nowIso,
  resolveDocUpdatedByFromFrontmatter,
  resolveDocUpdatedByFromTask,
  taskRecordToData,
  validateTaskId,
  writeTasksExportFromTasks,
  BackendError,
  type TaskBackend,
  type TaskData,
  type TaskSummary,
  type TaskWriteOptions,
} from "./shared.js";

function storedRevisionFromFrontmatter(
  frontmatter: Record<string, unknown>,
  fallback: number,
): number {
  return Number.isInteger(frontmatter.revision) &&
    typeof frontmatter.revision === "number" &&
    frontmatter.revision > 0
    ? frontmatter.revision
    : fallback;
}

function assertExpectedRevision(opts: {
  taskId: string;
  expectedRevision?: number;
  currentRevision: number;
}): void {
  if (opts.expectedRevision === undefined) return;
  const expected = Math.trunc(opts.expectedRevision);
  if (expected <= 0 || expected === opts.currentRevision) return;
  throw new BackendError(
    `Task revision changed concurrently: ${opts.taskId} ` +
      `(expected revision ${expected}, current revision ${opts.currentRevision})`,
    "E_BACKEND",
  );
}

function toTaskDocMutationComments(comments: unknown): TaskDocMutationState["comments"] {
  if (!Array.isArray(comments)) return null;
  const normalized = comments.flatMap((entry) => {
    if (!isRecord(entry)) return [];
    return [
      {
        author: typeof entry.author === "string" ? entry.author : undefined,
      },
    ];
  });
  return normalized.length > 0 ? normalized : null;
}

function taskDocStateFromFrontmatter(
  frontmatter: Record<string, unknown>,
  body: string,
): TaskDocMutationState {
  return {
    doc: extractTaskDoc(body),
    doc_version: frontmatter.doc_version,
    doc_updated_by: frontmatter.doc_updated_by,
    owner: frontmatter.owner,
    comments: toTaskDocMutationComments(frontmatter.comments),
  };
}

function taskDocStateFromTask(
  task: Pick<TaskData, "comments" | "doc_updated_by" | "doc_version" | "owner">,
  doc: string,
): TaskDocMutationState {
  return {
    doc,
    doc_version: task.doc_version,
    doc_updated_by: task.doc_updated_by,
    owner: task.owner,
    comments: toTaskDocMutationComments(task.comments),
  };
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
    supports_snapshot_export: true,
  } as const;
  root: string;
  updatedBy: string;
  private lastListWarnings: string[] = [];

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

  private async listTasksInternal(mode: "full"): Promise<TaskData[]>;
  private async listTasksInternal(mode: "projection"): Promise<TaskSummary[]>;
  private async listTasksInternal(
    mode: "full" | "projection",
  ): Promise<TaskData[] | TaskSummary[]> {
    const projectionOnly = mode === "projection";
    const tasks: (TaskData | TaskSummary)[] = [];
    const warnings: string[] = [];
    const entries = await readdir(this.root, { withFileTypes: true }).catch(() => []);
    const indexPath = resolveTaskIndexPath(this.root);
    const cachedIndex = await loadTaskIndex(indexPath);
    const cachedEntryByPath = new Map<string, TaskIndexEntry>();
    if (cachedIndex) {
      for (const [readmePath, taskId] of Object.entries(cachedIndex.byPath)) {
        const entry = cachedIndex.byId[taskId];
        if (entry) cachedEntryByPath.set(readmePath, entry);
      }
    }
    let indexDirty = cachedIndex === null;
    const nextById: Record<string, TaskIndexEntry> = {};
    const nextByPath: Record<string, string> = {};
    const seen = new Set<string>();

    // Deterministic ordering helps both users and tests; keep I/O bounded to avoid storms.
    const dirs = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .toSorted();

    type ListTaskResult = {
      output: TaskData | TaskSummary;
      index: TaskIndexEntry;
    };

    const results = await mapLimit<string, ListTaskResult | null>(dirs, 32, async (dirName) => {
      const readme = path.join(this.root, dirName, "README.md");
      let stats;
      try {
        stats = await stat(readme);
      } catch {
        warnings.push(`skip:${dirName}: missing_or_unreadable_readme`);
        return null;
      }
      if (!stats.isFile()) return null;

      const cached = cachedEntryByPath.get(readme);
      if (projectionOnly && cached?.mtimeMs === stats.mtimeMs) {
        return { output: cached.task, index: cached };
      }
      if (cached?.mtimeMs !== stats.mtimeMs) {
        indexDirty = true;
      }

      let text = "";
      try {
        text = await readFile(readme, "utf8");
      } catch {
        warnings.push(`skip:${dirName}: unreadable_readme`);
        return null;
      }
      let parsed;
      try {
        parsed = parseTaskReadme(text);
      } catch {
        warnings.push(`skip:${dirName}: invalid_readme_frontmatter`);
        return null;
      }
      const fm = parsed.frontmatter;
      if (!isRecord(fm) || Object.keys(fm).length === 0) {
        warnings.push(`skip:${dirName}: empty_or_invalid_frontmatter`);
        return null;
      }
      const fallbackTaskId = (typeof fm.id === "string" ? fm.id : dirName).trim();
      let frontmatter;
      try {
        frontmatter = validateTaskReadmeFrontmatter(
          withTaskReadmeFrontmatterDefaults({
            ...fm,
            id: fallbackTaskId,
          }),
        );
      } catch {
        warnings.push(`skip:${dirName}: invalid_readme_frontmatter`);
        return null;
      }
      const taskId = fallbackTaskId;
      const task = taskRecordToData({
        id: taskId,
        frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
        body: parsed.body,
        readmePath: readme,
      });
      const entry = buildTaskIndexEntry(task, readme, stats.mtimeMs);
      return {
        output: projectionOnly ? entry.task : task,
        index: entry,
      };
    });

    for (const res of results) {
      if (!res) continue;
      const taskId = res.index.task.id.trim();
      if (taskId) {
        validateTaskId(taskId);
        if (seen.has(taskId)) throw new Error(`Duplicate task id in local backend: ${taskId}`);
        seen.add(taskId);
      }
      tasks.push(res.output);
      if (taskId) {
        nextById[taskId] = res.index;
        nextByPath[res.index.readmePath] = taskId;
      }
    }

    if (cachedIndex && indexDirty === false) {
      const cachedPaths = Object.keys(cachedIndex.byPath);
      const nextPaths = Object.keys(nextByPath);
      if (cachedPaths.length === nextPaths.length) {
        for (const readmePath of nextPaths) {
          if (cachedIndex.byPath[readmePath] === nextByPath[readmePath]) {
            continue;
          }
          indexDirty = true;
          break;
        }
      } else {
        indexDirty = true;
      }
    }

    if (indexDirty) {
      try {
        await saveTaskIndex(indexPath, { schema_version: 2, byId: nextById, byPath: nextByPath });
      } catch {
        // Best-effort cache; ignore failures.
      }
    }
    this.lastListWarnings = warnings;
    return tasks;
  }

  async listTasks(): Promise<TaskData[]> {
    return await this.listTasksInternal("full");
  }

  async listProjectionTasks(): Promise<TaskSummary[]> {
    return await this.listTasksInternal("projection");
  }

  getLastListWarnings(): string[] {
    return [...this.lastListWarnings];
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
    const frontmatter = validateTaskReadmeFrontmatter(
      withTaskReadmeFrontmatterDefaults({
        ...parsed.frontmatter,
        id:
          typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
            ? parsed.frontmatter.id
            : taskId,
      }),
    );
    const task = taskRecordToData({
      id: taskId,
      frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
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
    const frontmatter = validateTaskReadmeFrontmatter(
      withTaskReadmeFrontmatterDefaults({
        ...parsed.frontmatter,
        id:
          typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
            ? parsed.frontmatter.id
            : taskId,
      }),
    );
    return (
      taskRecordToData({
        id: taskId,
        frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
        body: parsed.body,
        readmePath: readme,
      }).doc ?? ""
    );
  }

  async writeTask(task: TaskData, opts?: TaskWriteOptions): Promise<void> {
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

    assertExpectedRevision({
      taskId,
      expectedRevision: opts?.expectedRevision,
      currentRevision:
        Object.keys(existingFrontmatter).length > 0
          ? storedRevisionFromFrontmatter(existingFrontmatter, 1)
          : 0,
    });

    const payload: Record<string, unknown> = { ...task };
    delete payload.doc;
    if (
      !Number.isInteger(payload.revision) ||
      typeof payload.revision !== "number" ||
      payload.revision <= 0
    ) {
      payload.revision =
        Number.isInteger(existingFrontmatter.revision) &&
        typeof existingFrontmatter.revision === "number" &&
        existingFrontmatter.revision > 0
          ? existingFrontmatter.revision
          : 1;
    }

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

    const existingDocVersion = normalizeDocVersion(existingFrontmatter.doc_version);
    const requestedDocVersion = normalizeDocVersion(payload.doc_version, existingDocVersion);
    const effectiveDoc = task.doc === undefined ? null : String(task.doc ?? "");
    let nextSections =
      effectiveDoc === null
        ? task.sections && Object.keys(task.sections).length > 0
          ? task.sections
          : existingDoc
            ? taskDocToSectionMap(existingDoc)
            : undefined
        : taskDocToSectionMap(effectiveDoc);

    if (task.doc !== undefined) {
      const docText = String(task.doc ?? "");
      body = mergeTaskDoc(body, docText);
      if (docChanged(existingDoc, docText) || !payload.doc_updated_at) {
        const applied = applyTaskDocMutations(
          taskDocStateFromTask(
            {
              comments: task.comments,
              doc_updated_by:
                typeof payload.doc_updated_by === "string" ? payload.doc_updated_by : undefined,
              doc_version: requestedDocVersion,
              owner: task.owner,
            },
            existingDoc,
          ),
          [
            { kind: "replace-doc", doc: docText },
            {
              kind: "touch-doc-meta",
              updatedBy: resolveDocUpdatedByFromTask(task, this.updatedBy),
              version: requestedDocVersion,
            },
          ],
          { now: nowIso() },
        );
        payload.doc_version = applied.doc_version;
        payload.doc_updated_at = applied.doc_updated_at;
        payload.doc_updated_by = applied.doc_updated_by;
        nextSections = applied.sections;
      }
    }

    if (nextSections && Object.keys(nextSections).length > 0) {
      payload.sections = nextSections;
    }

    payload.doc_version = normalizeDocVersion(payload.doc_version, requestedDocVersion);
    if (payload.doc_updated_at === undefined || payload.doc_updated_at === "") {
      payload.doc_updated_at = nowIso();
    }
    if (payload.doc_updated_by === undefined || payload.doc_updated_by === "") {
      payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
    }

    validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(payload));
    await mkdir(path.dirname(readme), { recursive: true });
    const text = renderTaskReadme(payload, body || "");
    await writeTextIfChanged(readme, text.endsWith("\n") ? text : `${text}\n`);
  }

  async setTaskDoc(
    taskId: string,
    doc: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    assertExpectedRevision({
      taskId,
      expectedRevision: opts?.expectedRevision,
      currentRevision: storedRevisionFromFrontmatter(parsed.frontmatter, 1),
    });
    const docText = String(doc ?? "");
    const currentDoc = extractTaskDoc(parsed.body);
    if (opts?.expectedCurrentDoc !== undefined) {
      assertExpectedTaskDoc({ taskId, currentDoc, expectedDoc: opts.expectedCurrentDoc });
    }
    if (opts?.expectedCurrentText !== undefined) {
      if (!opts.expectedSection) {
        throw new BackendError(
          "expectedSection is required when expectedCurrentText is set",
          "E_BACKEND",
        );
      }
      assertExpectedTaskSection({
        taskId,
        currentDoc,
        section: opts.expectedSection,
        expectedText: opts.expectedCurrentText,
      });
    }
    let body = mergeTaskDoc(parsed.body, docText);
    const frontmatter = {
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : taskId,
    } as Record<string, unknown>;
    const currentDocVersion = normalizeDocVersion(frontmatter.doc_version);
    if (docChanged(currentDoc, docText) || !frontmatter.doc_updated_at) {
      const applied = applyTaskDocMutations(
        taskDocStateFromFrontmatter(frontmatter, parsed.body),
        [
          { kind: "replace-doc", doc: docText },
          {
            kind: "touch-doc-meta",
            updatedBy: resolveDocUpdatedByFromFrontmatter(frontmatter, updatedBy, this.updatedBy),
            version: currentDocVersion,
          },
        ],
        { now: nowIso() },
      );
      body = mergeTaskDoc(parsed.body, applied.doc);
      frontmatter.doc_version = applied.doc_version;
      frontmatter.doc_updated_at = applied.doc_updated_at;
      frontmatter.doc_updated_by = applied.doc_updated_by;
      frontmatter.sections = applied.sections;
    } else {
      frontmatter.sections = taskDocToSectionMap(docText);
    }
    frontmatter.doc_version = normalizeDocVersion(frontmatter.doc_version, currentDocVersion);
    validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(frontmatter));
    const next = renderTaskReadme(frontmatter, body);
    await writeTextIfChanged(readme, next.endsWith("\n") ? next : `${next}\n`);
  }

  async touchTaskDocMetadata(
    taskId: string,
    updatedBy?: string,
    opts?: TaskWriteOptions,
  ): Promise<void> {
    const readme = taskReadmePath(this.root, taskId);
    const text = await readFile(readme, "utf8");
    const parsed = parseTaskReadme(text);
    assertExpectedRevision({
      taskId,
      expectedRevision: opts?.expectedRevision,
      currentRevision: storedRevisionFromFrontmatter(parsed.frontmatter, 1),
    });
    const frontmatter = {
      ...parsed.frontmatter,
      id:
        typeof parsed.frontmatter.id === "string" && parsed.frontmatter.id.trim().length > 0
          ? parsed.frontmatter.id
          : taskId,
    } as Record<string, unknown>;
    const applied = applyTaskDocMutations(
      taskDocStateFromFrontmatter(frontmatter, parsed.body),
      [
        {
          kind: "touch-doc-meta",
          updatedBy: resolveDocUpdatedByFromFrontmatter(frontmatter, updatedBy, this.updatedBy),
          version: normalizeDocVersion(frontmatter.doc_version),
        },
      ],
      { now: nowIso() },
    );
    frontmatter.doc_version = applied.doc_version;
    frontmatter.doc_updated_at = applied.doc_updated_at;
    frontmatter.doc_updated_by = applied.doc_updated_by;
    frontmatter.sections =
      isRecord(frontmatter.sections) && Object.keys(frontmatter.sections).length > 0
        ? frontmatter.sections
        : applied.sections;
    validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(frontmatter));
    const next = renderTaskReadme(frontmatter, parsed.body || "");
    await writeTextIfChanged(readme, next.endsWith("\n") ? next : `${next}\n`);
  }

  async writeTasks(tasks: TaskData[], opts?: TaskWriteOptions): Promise<void> {
    await mapLimit(tasks, 4, async (task) => {
      await this.writeTask(task, opts);
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
        const fallbackTaskId = (typeof fm.id === "string" ? fm.id : dirName).trim();
        let frontmatter;
        try {
          frontmatter = validateTaskReadmeFrontmatter(
            withTaskReadmeFrontmatterDefaults({
              ...fm,
              id: fallbackTaskId,
            }),
          );
        } catch {
          return { taskId: "", scanned: false, changed: false };
        }

        const taskId = fallbackTaskId;
        if (taskId) validateTaskId(taskId);

        const task = taskRecordToData({
          id: taskId,
          frontmatter: frontmatter as unknown as TaskRecord["frontmatter"],
          body: parsed.body,
          readmePath: readme,
        });

        // Render using the same normalization rules as writeTask, but avoid rewriting the file when the
        // rendered output is identical (prevents mtime churn and diff-noise).
        const payload: Record<string, unknown> = { ...task };
        delete payload.doc;
        if (
          !Number.isInteger(payload.revision) ||
          typeof payload.revision !== "number" ||
          payload.revision <= 0
        ) {
          payload.revision =
            Number.isInteger(fm.revision) && typeof fm.revision === "number" && fm.revision > 0
              ? fm.revision
              : 1;
        }
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

        payload.doc_version = normalizeDocVersion(
          payload.doc_version,
          normalizeDocVersion(fm.doc_version),
        );
        if (payload.doc_updated_at === undefined || payload.doc_updated_at === "") {
          payload.doc_updated_at = nowIso();
        }
        if (payload.doc_updated_by === undefined || payload.doc_updated_by === "") {
          payload.doc_updated_by = resolveDocUpdatedByFromTask(task, this.updatedBy);
        }
        if (!payload.sections && task.doc) {
          payload.sections = taskDocToSectionMap(task.doc);
        }

        validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(payload));
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

  async exportProjectionSnapshot(outputPath: string): Promise<void> {
    await this.exportTasksJson(outputPath);
  }
}
