import { readFile } from "node:fs/promises";
import path from "node:path";

import type { AgentplaneConfig } from "./config.js";
import { loadConfig } from "./config.js";
import { resolveProject } from "./project-root.js";
import {
  computeTasksChecksum,
  type TasksExportSnapshot,
  type TasksExportTask,
} from "./tasks-export.js";

export type TasksLintResult = {
  errors: string[];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string" && v.trim().length > 0);
}

function isCommentsArray(value: unknown): value is { author: string; body: string }[] {
  return (
    Array.isArray(value) &&
    value.every(
      (v) =>
        isRecord(v) &&
        typeof v.author === "string" &&
        v.author.trim().length > 0 &&
        typeof v.body === "string" &&
        v.body.trim().length > 0,
    )
  );
}

function hasCycle(dependsOn: Map<string, string[]>): string[] | null {
  const visiting = new Set<string>();
  const visited = new Set<string>();

  const stack: string[] = [];

  function dfs(id: string): string[] | null {
    if (visited.has(id)) return null;
    if (visiting.has(id)) {
      const idx = stack.indexOf(id);
      return idx === -1 ? [id] : [...stack.slice(idx), id];
    }
    visiting.add(id);
    stack.push(id);

    const deps = dependsOn.get(id) ?? [];
    for (const dep of deps) {
      const cycle = dfs(dep);
      if (cycle) return cycle;
    }

    stack.pop();
    visiting.delete(id);
    visited.add(id);
    return null;
  }

  for (const id of dependsOn.keys()) {
    const cycle = dfs(id);
    if (cycle) return cycle;
  }

  return null;
}

export function lintTasksSnapshot(
  snapshot: TasksExportSnapshot,
  config: AgentplaneConfig,
): TasksLintResult {
  const errors: string[] = [];

  if (!isRecord(snapshot) || !Array.isArray(snapshot.tasks) || !isRecord(snapshot.meta)) {
    return { errors: ["tasks.json must have { tasks: [], meta: {} }"] };
  }

  if (snapshot.meta.schema_version !== 1) errors.push("tasks.json meta.schema_version must be 1");
  if (typeof snapshot.meta.managed_by !== "string" || snapshot.meta.managed_by.length === 0) {
    errors.push("tasks.json meta.managed_by must be non-empty");
  }
  if (snapshot.meta.checksum_algo !== "sha256") {
    errors.push("tasks.json meta.checksum_algo must be 'sha256'");
  }
  if (typeof snapshot.meta.checksum !== "string" || snapshot.meta.checksum.length === 0) {
    errors.push("tasks.json meta.checksum is missing/empty");
  } else {
    const expected = computeTasksChecksum(snapshot.tasks);
    if (snapshot.meta.checksum !== expected) {
      errors.push("tasks.json meta.checksum does not match tasks payload (manual edit?)");
    }
  }

  const byId = new Map<string, TasksExportTask>();
  for (const t of snapshot.tasks) {
    if (!isRecord(t)) {
      errors.push("tasks.json tasks[] items must be objects");
      continue;
    }

    const id = t.id;
    if (typeof id !== "string" || id.length === 0) {
      errors.push("tasks.json task.id must be non-empty");
      continue;
    }
    if (byId.has(id)) {
      errors.push(`duplicate task id: ${id}`);
      continue;
    }
    byId.set(id, t as unknown as TasksExportTask);

    if (typeof t.title !== "string" || t.title.length === 0)
      errors.push(`${id}: title must be non-empty`);
    if (!["TODO", "DOING", "DONE", "BLOCKED"].includes(String(t.status))) {
      errors.push(`${id}: status must be TODO|DOING|DONE|BLOCKED`);
    }
    if (!["low", "normal", "med", "high"].includes(String(t.priority))) {
      errors.push(`${id}: priority must be low|normal|med|high`);
    }
    if (typeof t.owner !== "string" || t.owner.trim().length === 0)
      errors.push(`${id}: owner must be non-empty`);
    if (!isStringArray(t.depends_on)) errors.push(`${id}: depends_on must be a string[]`);
    if (!isStringArray(t.tags)) errors.push(`${id}: tags must be a string[]`);
    if (
      !Array.isArray(t.verify) ||
      t.verify.some((v) => typeof v !== "string" || v.trim().length === 0)
    ) {
      errors.push(`${id}: verify must be a string[]`);
    }
    if (!isCommentsArray(t.comments)) errors.push(`${id}: comments must be {author,body}[]`);
    if (t.doc_version !== 2) errors.push(`${id}: doc_version must be 2`);
    if (typeof t.doc_updated_at !== "string" || Number.isNaN(Date.parse(t.doc_updated_at))) {
      errors.push(`${id}: doc_updated_at must be ISO date-time`);
    }
    if (typeof t.doc_updated_by !== "string" || t.doc_updated_by.trim().length === 0) {
      errors.push(`${id}: doc_updated_by must be non-empty`);
    }
    if (typeof t.description !== "string") errors.push(`${id}: description must be string`);
    if (typeof t.dirty !== "boolean") errors.push(`${id}: dirty must be boolean`);
    if (typeof t.id_source !== "string" || t.id_source.trim().length === 0) {
      errors.push(`${id}: id_source must be non-empty`);
    }

    if (
      String(t.status) === "DONE" &&
      (!isRecord(t.commit) ||
        typeof t.commit.hash !== "string" ||
        typeof t.commit.message !== "string")
    ) {
      errors.push(`${id}: DONE tasks must have commit {hash,message}`);
    }

    const requiredTags = new Set(config.tasks.verify.required_tags);
    const tagList = Array.isArray(t.tags) ? t.tags : [];
    const needsVerify = tagList.some((tag) => requiredTags.has(tag));
    if (needsVerify) {
      const verifyList = Array.isArray(t.verify) ? t.verify : [];
      if (verifyList.length === 0)
        errors.push(`${id}: verify is required for tags: ${[...requiredTags].join(", ")}`);
    }
  }

  // Depends-on must reference known tasks (only after tasks parsed).
  for (const [id, t] of byId.entries()) {
    const deps = Array.isArray(t.depends_on) ? t.depends_on : [];
    for (const dep of deps) {
      if (!byId.has(dep)) errors.push(`${id}: depends_on references missing task: ${dep}`);
    }
  }

  const depMap = new Map<string, string[]>();
  for (const [id, t] of byId.entries()) {
    depMap.set(id, Array.isArray(t.depends_on) ? t.depends_on : []);
  }
  const cycle = hasCycle(depMap);
  if (cycle) errors.push(`depends_on cycle detected: ${cycle.join(" -> ")}`);

  return { errors };
}

export async function readTasksExport(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{ snapshot: TasksExportSnapshot; path: string; config: AgentplaneConfig }> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const filePath = path.join(resolved.gitRoot, loaded.config.paths.tasks_path);
  const raw = await readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as TasksExportSnapshot;
  return { snapshot: parsed, path: filePath, config: loaded.config };
}

export async function lintTasksFile(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<TasksLintResult> {
  const { snapshot, config } = await readTasksExport(opts);
  return lintTasksSnapshot(snapshot, config);
}
