import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { loadConfig } from "../config/config.js";
import { atomicWriteFile } from "../fs/atomic-write.js";
import { resolveProject } from "../project/project-root.js";
import { listTasks } from "./task-store.js";

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function canonicalizeJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((v) => canonicalizeJson(v));

  if (isRecord(value)) {
    const out: Record<string, unknown> = {};
    const keys = Object.keys(value).toSorted((a, b) => a.localeCompare(b));
    for (const key of keys) out[key] = canonicalizeJson(value[key]);
    return out;
  }

  return value;
}

export type TasksExportMeta = {
  schema_version: 1;
  managed_by: string;
  checksum_algo: "sha256";
  checksum: string;
};

export type TasksExportTask = {
  id: string;
  title: string;
  status: string;
  priority: string;
  owner: string;
  depends_on: string[];
  tags: string[];
  verify: string[];
  commit: { hash: string; message: string } | null;
  comments: { author: string; body: string }[];
  events?: {
    type: string;
    at: string;
    author: string;
    from?: string;
    to?: string;
    state?: string;
    note?: string;
    body?: string;
  }[];
  doc_version: 2;
  doc_updated_at: string;
  doc_updated_by: string;
  description: string;
  dirty: boolean;
  id_source: string;
};

export type TasksExportSnapshot = {
  tasks: TasksExportTask[];
  meta: TasksExportMeta;
};

export function canonicalTasksPayload(tasks: TasksExportTask[]): string {
  return JSON.stringify(canonicalizeJson({ tasks }));
}

export function computeTasksChecksum(tasks: TasksExportTask[]): string {
  const payload = canonicalTasksPayload(tasks);
  return createHash("sha256").update(payload, "utf8").digest("hex");
}

export async function buildTasksExportSnapshot(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<TasksExportSnapshot> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  await loadConfig(resolved.agentplaneDir);

  const tasks = await listTasks({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const exportTasks: TasksExportTask[] = tasks.map((t) => {
    const fm = t.frontmatter as unknown as Record<string, unknown>;

    const dependsOn = Array.isArray(fm.depends_on)
      ? fm.depends_on.filter((v): v is string => typeof v === "string")
      : [];
    const tags = Array.isArray(fm.tags)
      ? fm.tags.filter((v): v is string => typeof v === "string")
      : [];
    const verify = Array.isArray(fm.verify)
      ? fm.verify.filter((v): v is string => typeof v === "string")
      : [];

    const commit =
      isRecord(fm.commit) &&
      typeof fm.commit.hash === "string" &&
      typeof fm.commit.message === "string" &&
      fm.commit.hash.length > 0 &&
      fm.commit.message.length > 0
        ? { hash: fm.commit.hash, message: fm.commit.message }
        : null;

    const comments = Array.isArray(fm.comments)
      ? fm.comments
          .filter((c) => isRecord(c))
          .filter(
            (c): c is { author: string; body: string } =>
              typeof c.author === "string" && typeof c.body === "string",
          )
          .map((c) => ({ author: c.author, body: c.body }))
      : [];
    const events = Array.isArray(fm.events)
      ? fm.events
          .filter((event) => isRecord(event))
          .filter(
            (
              event,
            ): event is {
              type: string;
              at: string;
              author: string;
              from?: string;
              to?: string;
              state?: string;
              note?: string;
              body?: string;
            } =>
              typeof event.type === "string" &&
              typeof event.at === "string" &&
              typeof event.author === "string",
          )
          .map((event) => ({
            type: event.type,
            at: event.at,
            author: event.author,
            from: typeof event.from === "string" ? event.from : undefined,
            to: typeof event.to === "string" ? event.to : undefined,
            state: typeof event.state === "string" ? event.state : undefined,
            note: typeof event.note === "string" ? event.note : undefined,
            body: typeof event.body === "string" ? event.body : undefined,
          }))
      : [];

    const base = {
      id: typeof fm.id === "string" ? fm.id : t.id,
      title: typeof fm.title === "string" ? fm.title : "",
      status: typeof fm.status === "string" ? fm.status : "",
      priority: typeof fm.priority === "string" ? fm.priority : "",
      owner: typeof fm.owner === "string" ? fm.owner : "",
      depends_on: dependsOn,
      tags,
      verify,
      commit,
      comments,
      doc_version: 2,
      doc_updated_at: typeof fm.doc_updated_at === "string" ? fm.doc_updated_at : "",
      doc_updated_by: typeof fm.doc_updated_by === "string" ? fm.doc_updated_by : "",
      description: typeof fm.description === "string" ? fm.description : "",
      dirty: false,
      id_source: "generated",
    } satisfies TasksExportTask;

    if (events.length > 0) {
      return { ...base, events };
    }
    return base;
  });

  const sorted = exportTasks.toSorted((a, b) => a.id.localeCompare(b.id));
  const checksum = computeTasksChecksum(sorted);

  return {
    tasks: sorted,
    meta: {
      schema_version: 1,
      managed_by: "agentplane",
      checksum_algo: "sha256",
      checksum,
    },
  };
}

export async function writeTasksExport(opts: {
  cwd: string;
  rootOverride?: string | null;
}): Promise<{ path: string; snapshot: TasksExportSnapshot }> {
  const resolved = await resolveProject({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const outPath = path.join(resolved.gitRoot, loaded.config.paths.tasks_path);

  const snapshot = await buildTasksExportSnapshot(opts);

  await mkdir(path.dirname(outPath), { recursive: true });
  await atomicWriteFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`);

  return { path: outPath, snapshot };
}
