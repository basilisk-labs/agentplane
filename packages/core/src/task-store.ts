import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "./config.js";
import { resolveProject } from "./project-root.js";
import { parseTaskReadme, renderTaskReadme } from "./task-readme.js";

export type TaskStatus = "TODO" | "DOING" | "DONE" | "BLOCKED";
export type TaskPriority = "low" | "normal" | "med" | "high";

export type TaskFrontmatter = {
  id: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  owner: string;
  depends_on: string[];
  tags: string[];
  verify: string[];
  comments: { author: string; body: string }[];
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

const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomSuffix(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += ID_ALPHABET[Math.floor(Math.random() * ID_ALPHABET.length)];
  }
  return out;
}

function timestampIdPrefix(date: Date): string {
  const yyyy = String(date.getUTCFullYear()).padStart(4, "0");
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  const hh = String(date.getUTCHours()).padStart(2, "0");
  const min = String(date.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}${mm}${dd}${hh}${min}`;
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
    "## Risks",
    "",
    "",
    "## Verify Steps",
    "",
    "",
    "## Rollback Plan",
    "",
  ].join("\n");
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
}): Promise<{ id: string; readmePath: string }> {
  const { tasksDir, idSuffixLengthDefault } = await getTasksDir({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  await mkdir(tasksDir, { recursive: true });

  const suffixLength = idSuffixLengthDefault;
  const base = timestampIdPrefix(new Date());

  for (let attempt = 0; attempt < 20; attempt++) {
    const id = `${base}-${randomSuffix(suffixLength)}`;
    const readmePath = taskReadmePath(tasksDir, id);
    if (await fileExists(readmePath)) continue;

    const frontmatter: TaskFrontmatter = {
      id,
      title: opts.title,
      status: "TODO",
      priority: opts.priority,
      owner: opts.owner,
      depends_on: opts.dependsOn,
      tags: opts.tags,
      verify: opts.verify,
      comments: [],
      doc_version: 2,
      doc_updated_at: nowIso(),
      doc_updated_by: "agentplane",
      description: opts.description,
    };

    const body = defaultTaskBody();
    const text = renderTaskReadme(frontmatter as unknown as Record<string, unknown>, body);
    await mkdir(path.dirname(readmePath), { recursive: true });
    await writeFile(readmePath, text, "utf8");
    return { id, readmePath };
  }

  throw new Error("Failed to generate a unique task id");
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
