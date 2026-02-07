import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "../config/config.js";
import { atomicWriteFile } from "../fs/atomic-write.js";
import { resolveProject } from "../project/project-root.js";
import { parseTaskReadme, renderTaskReadme } from "./task-readme.js";
import { updateTaskReadmeAtomic } from "./task-readme-io.js";
import { ensureDocSections, setMarkdownSection } from "./task-doc.js";
import { generateTaskId } from "./task-id.js";

export type TaskStatus = "TODO" | "DOING" | "DONE" | "BLOCKED";
export type TaskPriority = "low" | "normal" | "med" | "high";

export type TaskEvent = {
  type: "status" | "comment" | "verify";
  at: string;
  author: string;
  from?: string;
  to?: string;
  state?: string;
  note?: string;
  body?: string;
};

export type TaskFrontmatter = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  owner: string;
  depends_on: string[];
  tags: string[];
  verify: string[];
  plan_approval?: {
    state: "pending" | "approved" | "rejected";
    updated_at: string | null;
    updated_by: string | null;
    note: string | null;
  };
  verification?: {
    state: "pending" | "ok" | "needs_rework";
    updated_at: string | null;
    updated_by: string | null;
    note: string | null;
  };
  comments: { author: string; body: string }[];
  events?: TaskEvent[];
  doc_version: 2;
  doc_updated_at: string;
  doc_updated_by: string;
  description: string;
  commit?: { hash: string; message: string } | null;
};

export type TaskRecord = {
  id: string;
  frontmatter: TaskFrontmatter;
  body: string;
  readmePath: string;
};

function nowIso(): string {
  return new Date().toISOString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function validateTaskDocMetadata(frontmatter: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (frontmatter.doc_version !== 2) errors.push("doc_version must be 2");

  const updatedAt = frontmatter.doc_updated_at;
  if (typeof updatedAt !== "string" || Number.isNaN(Date.parse(updatedAt))) {
    errors.push("doc_updated_at must be an ISO timestamp");
  }

  const updatedBy = frontmatter.doc_updated_by;
  if (typeof updatedBy !== "string" || updatedBy.trim().length === 0) {
    errors.push("doc_updated_by must be a non-empty string");
  }

  return errors;
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await readFile(filePath, "utf8");
    return true;
  } catch {
    return false;
  }
}

export async function getTasksDir(opts: { cwd: string; rootOverride?: string | null }): Promise<{
  gitRoot: string;
  tasksDir: string;
  idSuffixLengthDefault: number;
}> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const tasksDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
  return {
    gitRoot: resolved.gitRoot,
    tasksDir,
    idSuffixLengthDefault: loaded.config.tasks.id_suffix_length_default,
  };
}

export function taskReadmePath(tasksDir: string, taskId: string): string {
  return path.join(tasksDir, taskId, "README.md");
}

function defaultTaskBody(): string {
  return [
    "## Summary",
    "",
    "",
    "## Scope",
    "",
    "",
    "## Plan",
    "",
    "",
    "## Risks",
    "",
    "",
    "## Verification",
    "",
    "",
    "### Plan",
    "",
    "",
    "### Results",
    "",
    "",
    "<!-- BEGIN VERIFICATION RESULTS -->",
    "<!-- END VERIFICATION RESULTS -->",
    "",
    "",
    "## Rollback Plan",
    "",
  ].join("\n");
}

function getLastCommentAuthor(frontmatter: Record<string, unknown>): string | null {
  const comments = frontmatter.comments;
  if (!Array.isArray(comments)) return null;
  const entries: unknown[] = comments;
  for (let i = entries.length - 1; i >= 0; i -= 1) {
    const entry = entries[i];
    if (!isRecord(entry)) continue;
    const author = entry.author;
    if (typeof author === "string") {
      const trimmed = author.trim();
      if (trimmed) return trimmed;
    }
  }
  return null;
}

function resolveDocUpdatedBy(
  frontmatter: Record<string, unknown>,
  updatedBy?: string | null,
): string {
  if (updatedBy != null) {
    const explicit = updatedBy.trim();
    if (explicit.length === 0) {
      throw new Error("doc_updated_by must be a non-empty string");
    }
    return explicit;
  }
  const lastAuthor = getLastCommentAuthor(frontmatter);
  if (lastAuthor) return lastAuthor;
  const existing = frontmatter.doc_updated_by;
  if (typeof existing === "string") {
    const trimmed = existing.trim();
    if (trimmed && trimmed.toLowerCase() !== "agentplane") return trimmed;
  }
  const owner = frontmatter.owner;
  if (typeof owner === "string") {
    const trimmed = owner.trim();
    if (trimmed) return trimmed;
  }
  return "agentplane";
}

export async function createTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  title: string;
  description: string;
  owner: string;
  priority: TaskPriority;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  idGenerator?: typeof generateTaskId;
}): Promise<{ id: string; readmePath: string }> {
  const { tasksDir, idSuffixLengthDefault } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  await mkdir(tasksDir, { recursive: true });

  const suffixLength = idSuffixLengthDefault;
  const id = await (opts.idGenerator ?? generateTaskId)({
    length: suffixLength,
    attempts: 20,
    isAvailable: async (taskId) => !(await fileExists(taskReadmePath(tasksDir, taskId))),
  });

  const readmePath = taskReadmePath(tasksDir, id);
  const frontmatter: TaskFrontmatter = {
    id,
    title: opts.title,
    status: "TODO",
    priority: opts.priority,
    owner: opts.owner,
    depends_on: opts.dependsOn,
    tags: opts.tags,
    verify: opts.verify,
    plan_approval: {
      state: "pending",
      updated_at: null,
      updated_by: null,
      note: null,
    },
    verification: {
      state: "pending",
      updated_at: null,
      updated_by: null,
      note: null,
    },
    comments: [],
    events: [],
    doc_version: 2,
    doc_updated_at: nowIso(),
    doc_updated_by: opts.owner,
    description: opts.description,
  };

  const body = defaultTaskBody();
  const text = renderTaskReadme(frontmatter as unknown as Record<string, unknown>, body);
  await atomicWriteFile(readmePath, text, "utf8");
  return { id, readmePath };
}

export async function setTaskDocSection(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
  section: string;
  text: string;
  updatedBy?: string | null;
}): Promise<{ readmePath: string }> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);

  const allowed = loaded.config.tasks.doc.sections;
  if (!allowed.includes(opts.section)) {
    throw new Error(`Unknown doc section: ${opts.section}`);
  }

  const tasksDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);
  const readmePath = taskReadmePath(tasksDir, opts.taskId);
  await updateTaskReadmeAtomic(readmePath, (parsed) => {
    const updatedBy = resolveDocUpdatedBy(parsed.frontmatter, opts.updatedBy);
    const nextFrontmatter: Record<string, unknown> = {
      ...parsed.frontmatter,
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: updatedBy,
    };
    const baseDoc = ensureDocSections(parsed.body, loaded.config.tasks.doc.required_sections);
    const nextBody = ensureDocSections(
      setMarkdownSection(baseDoc, opts.section, opts.text),
      loaded.config.tasks.doc.required_sections,
    );
    return { frontmatter: nextFrontmatter, body: nextBody };
  });
  return { readmePath };
}

export async function readTask(opts: {
  cwd: string;
  rootOverride?: string | null;
  taskId: string;
}): Promise<TaskRecord> {
  const { tasksDir } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const readmePath = taskReadmePath(tasksDir, opts.taskId);
  const text = await readFile(readmePath, "utf8");
  const parsed = parseTaskReadme(text);
  return {
    id: opts.taskId,
    frontmatter: parsed.frontmatter as unknown as TaskFrontmatter,
    body: parsed.body,
    readmePath,
  };
}

export async function listTasks(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<TaskRecord[]> {
  const { tasksDir } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const entries = await readdir(tasksDir, { withFileTypes: true }).catch(() => []);
  const ids = entries.filter((e) => e.isDirectory()).map((e) => e.name);

  const tasks: TaskRecord[] = [];
  for (const id of ids) {
    const readmePath = taskReadmePath(tasksDir, id);
    try {
      const text = await readFile(readmePath, "utf8");
      const parsed = parseTaskReadme(text);
      tasks.push({
        id,
        frontmatter: parsed.frontmatter as unknown as TaskFrontmatter,
        body: parsed.body,
        readmePath,
      });
    } catch {
      // Skip unreadable/broken tasks for now; lint will handle this later.
    }
  }

  return tasks.toSorted((a, b) => a.id.localeCompare(b.id));
}
