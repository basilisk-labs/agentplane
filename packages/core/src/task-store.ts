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

function escapeRegExp(text: string): string {
  return text.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\\$&`);
}

function setMarkdownSection(body: string, section: string, text: string): string {
  const lines = body.replaceAll("\r\n", "\n").split("\n");
  const headingRe = new RegExp(String.raw`^##\s+${escapeRegExp(section)}\s*$`);

  let start = -1;
  let nextHeading = lines.length;

  for (const [i, line] of lines.entries()) {
    if (!line.startsWith("## ")) continue;
    if (start === -1) {
      if (headingRe.test(line)) start = i;
      continue;
    }
    nextHeading = i;
    break;
  }

  const newTextLines = text.replaceAll("\r\n", "\n").split("\n");
  const replacement = ["", ...newTextLines, ""];

  if (start === -1) {
    const out = [...lines];
    if (out.length > 0 && out.at(-1)?.trim() !== "") out.push("");
    out.push(`## ${section}`, ...replacement);
    return `${out.join("\n")}\n`;
  }

  const out = [...lines.slice(0, start + 1), ...replacement, ...lines.slice(nextHeading)];
  return `${out.join("\n")}\n`;
}

function normalizeDocSectionName(section: string): string {
  return section.trim().replaceAll(/\s+/g, " ").toLowerCase();
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

function splitCombinedHeadingLines(doc: string): string[] {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    const trimmed = line.trimStart();
    if (trimmed.startsWith("```")) {
      inFence = !inFence;
      out.push(line);
      continue;
    }

    if (!inFence && line.includes("## ")) {
      const matches = [...line.matchAll(/##\s+/g)];
      if (matches.length > 1 && matches[0]?.index === 0) {
        let start = 0;
        for (let i = 1; i < matches.length; i += 1) {
          const idx = matches[i]?.index ?? 0;
          const chunk = line.slice(start, idx).trimEnd();
          if (chunk) out.push(chunk);
          start = idx;
        }
        const last = line.slice(start).trimEnd();
        if (last) out.push(last);
        continue;
      }
    }

    out.push(line);
  }

  return out;
}

function normalizeDocSections(doc: string, required: string[]): string {
  const lines = splitCombinedHeadingLines(doc);
  const sections = new Map<string, { title: string; lines: string[] }>();
  const order: string[] = [];
  const pendingSeparator = new Set<string>();
  let currentKey: string | null = null;

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      const title = match[1]?.trim() ?? "";
      const key = normalizeDocSectionName(title);
      if (key) {
        const existing = sections.get(key);
        if (existing) {
          if (existing.lines.some((entry) => entry.trim() !== "")) {
            pendingSeparator.add(key);
          }
        } else {
          sections.set(key, { title, lines: [] });
          order.push(key);
        }
        currentKey = key;
        continue;
      }
    }
    if (currentKey) {
      const entry = sections.get(currentKey);
      if (!entry) continue;
      if (pendingSeparator.has(currentKey) && line.trim() !== "") {
        entry.lines.push("");
        pendingSeparator.delete(currentKey);
      }
      entry.lines.push(line);
    }
  }

  const out: string[] = [];
  const seen = new Set(order);

  for (const key of order) {
    const section = sections.get(key);
    if (!section) continue;
    out.push(`## ${section.title}`);
    if (section.lines.length > 0) {
      out.push(...section.lines);
    } else {
      out.push("");
    }
    out.push("");
  }

  for (const requiredSection of required) {
    const requiredKey = normalizeDocSectionName(requiredSection);
    if (seen.has(requiredKey)) continue;
    out.push(`## ${requiredSection}`, "", "");
  }

  return `${out.join("\n").trimEnd()}\n`;
}

function ensureDocSections(doc: string, required: string[]): string {
  const trimmed = doc.trim();
  if (!trimmed) {
    const blocks = required.map((section) => `## ${section}\n`);
    return `${blocks.join("\n").trimEnd()}\n`;
  }
  return normalizeDocSections(doc, required);
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
      doc_updated_by: opts.owner,
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
  const original = await readFile(readmePath, "utf8");
  const parsed = parseTaskReadme(original);

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
  const nextText = renderTaskReadme(nextFrontmatter, nextBody);
  await writeFile(readmePath, nextText, "utf8");
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
