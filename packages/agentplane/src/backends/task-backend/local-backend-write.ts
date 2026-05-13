import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { TaskRecord } from "@agentplaneorg/core/tasks";
import {
  applyTaskDocMutations,
  docChanged,
  parseTaskReadme,
  renderTaskReadme,
  taskDocToSectionMap,
  taskReadmePath,
} from "@agentplaneorg/core/tasks";
import {
  validateTaskReadmeFrontmatter,
  withTaskReadmeFrontmatterDefaults,
} from "@agentplaneorg/core/schemas";

import { isRecord } from "../../shared/guards.js";
import { writeTextIfChanged } from "../../shared/write-if-changed.js";

import {
  assertExpectedRevision,
  storedRevisionFromFrontmatter,
  taskDocStateFromTask,
  type LocalBackendContext,
} from "./local-backend-state.js";
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
  resolveDocUpdatedByFromTask,
  taskRecordToData,
  validateTaskId,
  type TaskData,
  type TaskWriteOptions,
} from "./shared.js";

export async function generateLocalTaskId(
  context: Pick<LocalBackendContext, "root">,
  opts: { length: number; attempts: number },
): Promise<string> {
  const length = opts.length;
  if (length < 4) throw new Error(invalidLengthMessage(length, 4));
  const attempts = Math.max(1, opts.attempts);
  return await generateTaskId({
    length,
    attempts,
    isAvailable: async (taskId) => {
      const readmePath = taskReadmePath(context.root, taskId);
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

export async function writeLocalTask(
  context: LocalBackendContext,
  task: TaskData,
  opts?: TaskWriteOptions,
): Promise<void> {
  const taskId = task.id.trim();
  if (!taskId) throw new Error(missingTaskIdMessage());
  validateTaskId(taskId);

  const readmePath = taskReadmePath(context.root, taskId);
  let body = "";
  let existingDoc = "";
  let existingFrontmatter: Record<string, unknown> = {};

  try {
    const text = await readFile(readmePath, "utf8");
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
            updatedBy: resolveDocUpdatedByFromTask(
              task,
              context.updatedBy || DEFAULT_DOC_UPDATED_BY,
            ),
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
    payload.doc_updated_by = resolveDocUpdatedByFromTask(
      task,
      context.updatedBy || DEFAULT_DOC_UPDATED_BY,
    );
  }

  validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(payload));
  await mkdir(path.dirname(readmePath), { recursive: true });
  const text = renderTaskReadme(payload, body || "");
  await writeTextIfChanged(readmePath, text.endsWith("\n") ? text : `${text}\n`);
}

export async function writeLocalTasks(
  context: LocalBackendContext,
  tasks: TaskData[],
  opts?: TaskWriteOptions,
): Promise<void> {
  await mapLimit(tasks, 4, async (task) => {
    await writeLocalTask(context, task, opts);
    return null;
  });
}

export async function normalizeLocalTasks(
  context: LocalBackendContext,
): Promise<{ scanned: number; changed: number }> {
  const entries = await readdir(context.root, { withFileTypes: true }).catch(() => []);
  const dirs = entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);

  const results = await mapLimit(
    dirs,
    8,
    async (dirName): Promise<{ taskId: string; scanned: boolean; changed: boolean }> => {
      const readmePath = path.join(context.root, dirName, "README.md");

      let text = "";
      try {
        text = await readFile(readmePath, "utf8");
      } catch {
        return { taskId: "", scanned: false, changed: false };
      }

      let parsed;
      try {
        parsed = parseTaskReadme(text);
      } catch {
        return { taskId: "", scanned: false, changed: false };
      }

      const frontmatter = parsed.frontmatter;
      if (!isRecord(frontmatter) || Object.keys(frontmatter).length === 0) {
        return { taskId: "", scanned: false, changed: false };
      }
      const fallbackTaskId = (typeof frontmatter.id === "string" ? frontmatter.id : dirName).trim();
      let validatedFrontmatter;
      try {
        validatedFrontmatter = validateTaskReadmeFrontmatter(
          withTaskReadmeFrontmatterDefaults({
            ...frontmatter,
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
        frontmatter: validatedFrontmatter as unknown as TaskRecord["frontmatter"],
        body: parsed.body,
        readmePath,
      });

      const payload: Record<string, unknown> = { ...task };
      delete payload.doc;
      if (
        !Number.isInteger(payload.revision) ||
        typeof payload.revision !== "number" ||
        payload.revision <= 0
      ) {
        payload.revision =
          Number.isInteger(frontmatter.revision) &&
          typeof frontmatter.revision === "number" &&
          frontmatter.revision > 0
            ? frontmatter.revision
            : 1;
      }
      for (const [key, value] of Object.entries(payload)) {
        if (value === undefined) delete payload[key];
      }
      for (const key of ["doc_version", "doc_updated_at", "doc_updated_by"]) {
        if (payload[key] === undefined && frontmatter[key] !== undefined) {
          payload[key] = frontmatter[key];
        }
      }
      if (payload.plan_approval === undefined && frontmatter.plan_approval !== undefined) {
        payload.plan_approval = frontmatter.plan_approval;
      }
      if (payload.plan_approval === undefined) payload.plan_approval = defaultPlanApproval();
      if (payload.verification === undefined && frontmatter.verification !== undefined) {
        payload.verification = frontmatter.verification;
      }
      if (payload.verification === undefined) payload.verification = defaultVerificationResult();

      payload.doc_version = normalizeDocVersion(
        payload.doc_version,
        normalizeDocVersion(frontmatter.doc_version),
      );
      if (payload.doc_updated_at === undefined || payload.doc_updated_at === "") {
        payload.doc_updated_at = nowIso();
      }
      if (payload.doc_updated_by === undefined || payload.doc_updated_by === "") {
        payload.doc_updated_by = resolveDocUpdatedByFromTask(
          task,
          context.updatedBy || DEFAULT_DOC_UPDATED_BY,
        );
      }
      if (!payload.sections && task.doc) {
        payload.sections = taskDocToSectionMap(task.doc);
      }

      validateTaskReadmeFrontmatter(withTaskReadmeFrontmatterDefaults(payload));
      const next = renderTaskReadme(payload, parsed.body || "");
      const didWrite = await writeTextIfChanged(
        readmePath,
        next.endsWith("\n") ? next : `${next}\n`,
      );
      return { taskId, scanned: true, changed: didWrite };
    },
  );

  const seen = new Set<string>();
  for (const { taskId } of results) {
    if (!taskId) continue;
    if (seen.has(taskId)) throw new Error(`Duplicate task id in local backend: ${taskId}`);
    seen.add(taskId);
  }

  const scanned = results.reduce((acc, result) => acc + (result.scanned ? 1 : 0), 0);
  const changed = results.reduce((acc, result) => acc + (result.changed ? 1 : 0), 0);
  return { scanned, changed };
}
