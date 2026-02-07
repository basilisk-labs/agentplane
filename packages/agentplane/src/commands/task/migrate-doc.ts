import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import {
  atomicWriteFile,
  ensureDocSections,
  extractTaskDoc,
  loadConfig,
  mergeTaskDoc,
  normalizeTaskDoc,
  parseTaskReadme,
  renderTaskReadme,
  resolveProject,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { fileExists, getPathKind } from "../../cli/fs-utils.js";
import { successMessage, usageMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";

export const TASK_MIGRATE_DOC_USAGE =
  "Usage: agentplane task migrate-doc [<task-id> ...] [--all] [--quiet]";
export const TASK_MIGRATE_DOC_USAGE_EXAMPLE = "agentplane task migrate-doc --all";

type TaskMigrateDocFlags = { all: boolean; quiet: boolean; taskIds: string[] };

function parseTaskMigrateDocFlags(args: string[]): TaskMigrateDocFlags {
  const out: TaskMigrateDocFlags = { all: false, quiet: false, taskIds: [] };
  for (const arg of args) {
    if (!arg) continue;
    if (arg === "--all") {
      out.all = true;
      continue;
    }
    if (arg === "--quiet") {
      out.quiet = true;
      continue;
    }
    if (arg.startsWith("--")) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: usageMessage(TASK_MIGRATE_DOC_USAGE, TASK_MIGRATE_DOC_USAGE_EXAMPLE),
      });
    }
    out.taskIds.push(arg);
  }
  if (!out.all && out.taskIds.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_MIGRATE_DOC_USAGE, TASK_MIGRATE_DOC_USAGE_EXAMPLE),
    });
  }
  if (out.all && out.taskIds.length > 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: usageMessage(TASK_MIGRATE_DOC_USAGE, TASK_MIGRATE_DOC_USAGE_EXAMPLE),
    });
  }
  return out;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function ensurePlanApprovalFrontmatter(frontmatter: Record<string, unknown>): void {
  const raw = frontmatter.plan_approval;
  if (isRecord(raw) && typeof raw.state === "string") return;
  frontmatter.plan_approval = {
    state: "pending",
    updated_at: null,
    updated_by: null,
    note: null,
  };
}

function ensureVerificationFrontmatter(frontmatter: Record<string, unknown>): void {
  const raw = frontmatter.verification;
  if (isRecord(raw) && typeof raw.state === "string") return;
  frontmatter.verification = {
    state: "pending",
    updated_at: null,
    updated_by: null,
    note: null,
  };
}

const DATE_ONLY_ON_RE = /\bon (\d{4}-\d{2}-\d{2})(?!T)\b/g;

function isIsoTimestamp(value: string): boolean {
  if (!value.includes("T") || !value.endsWith("Z")) return false;
  const ms = Date.parse(value);
  return Number.isFinite(ms);
}

function normalizeNoteTimestamp(opts: { note: string; updatedAt: string }): string {
  if (!isIsoTimestamp(opts.updatedAt)) return opts.note;
  const updatedDate = opts.updatedAt.slice(0, 10);
  return opts.note.replaceAll(DATE_ONLY_ON_RE, (match, date: string) => {
    if (date !== updatedDate) return match;
    return `on ${opts.updatedAt}`;
  });
}

function normalizeFrontmatterNoteTimestamps(frontmatter: Record<string, unknown>): void {
  const plan = frontmatter.plan_approval;
  if (isRecord(plan) && typeof plan.note === "string" && typeof plan.updated_at === "string") {
    plan.note = normalizeNoteTimestamp({ note: plan.note, updatedAt: plan.updated_at });
  }

  const verification = frontmatter.verification;
  if (
    isRecord(verification) &&
    typeof verification.note === "string" &&
    typeof verification.updated_at === "string"
  ) {
    verification.note = normalizeNoteTimestamp({
      note: verification.note,
      updatedAt: verification.updated_at,
    });
  }
}

async function migrateTaskReadmeDoc(opts: {
  readmePath: string;
  config: AgentplaneConfig;
}): Promise<{ changed: boolean }> {
  const originalRaw = await readFile(opts.readmePath, "utf8");
  const original = originalRaw.endsWith("\n") ? originalRaw : `${originalRaw}\n`;
  const parsed = parseTaskReadme(original);

  const frontmatter = { ...parsed.frontmatter };
  ensurePlanApprovalFrontmatter(frontmatter);
  ensureVerificationFrontmatter(frontmatter);
  normalizeFrontmatterNoteTimestamps(frontmatter);

  const required = opts.config.tasks.doc.required_sections;
  const extracted = extractTaskDoc(parsed.body);
  const baseDoc = extracted || parsed.body;
  const nextDoc = normalizeTaskDoc(ensureDocSections(baseDoc, required));
  const nextBody = extracted ? mergeTaskDoc(parsed.body, nextDoc) : nextDoc;

  const rendered = renderTaskReadme(frontmatter, nextBody);
  const next = rendered.endsWith("\n") ? rendered : `${rendered}\n`;
  if (next === original) return { changed: false };

  await atomicWriteFile(opts.readmePath, next, "utf8");
  return { changed: true };
}

async function resolveReadmePaths(opts: {
  tasksDir: string;
  flags: TaskMigrateDocFlags;
}): Promise<string[]> {
  if (!opts.flags.all) {
    return opts.flags.taskIds.map((taskId) => path.join(opts.tasksDir, taskId, "README.md"));
  }
  if ((await getPathKind(opts.tasksDir)) !== "dir") return [];
  const entries = await readdir(opts.tasksDir, { withFileTypes: true });
  const out: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const readmePath = path.join(opts.tasksDir, entry.name, "README.md");
    if (await fileExists(readmePath)) out.push(readmePath);
  }
  return out;
}

export async function cmdTaskMigrateDoc(opts: {
  cwd: string;
  rootOverride?: string;
  args: string[];
}): Promise<number> {
  const flags = parseTaskMigrateDocFlags(opts.args);
  try {
    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const loaded = await loadConfig(resolved.agentplaneDir);
    const tasksDir = path.join(resolved.gitRoot, loaded.config.paths.workflow_dir);

    const readmePaths = await resolveReadmePaths({ tasksDir, flags });
    if (!flags.all) {
      for (const readmePath of readmePaths) {
        if (!(await fileExists(readmePath))) {
          const taskId = path.basename(path.dirname(readmePath));
          throw new CliError({
            exitCode: 5,
            code: "E_IO",
            message: `Task README not found: ${taskId}`,
          });
        }
      }
    }

    let changed = 0;
    for (const readmePath of readmePaths) {
      const res = await migrateTaskReadmeDoc({ readmePath, config: loaded.config });
      if (res.changed) changed += 1;
    }

    if (!flags.quiet) {
      process.stdout.write(
        `${successMessage("migrated task docs", undefined, `changed=${changed}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "task migrate-doc", root: opts.rootOverride ?? null });
  }
}
