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
  renderTaskDocFromSections,
  renderTaskReadme,
  resolveProject,
  setMarkdownSection,
  taskDocToSectionMap,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists, getPathKind } from "../../cli/fs-utils.js";
import { successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import {
  exportTaskProjectionSnapshot,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  extractDocSection,
  extractTaskObservationSection,
  decodeEscapedTaskTextNewlines,
  normalizeTaskDocVersion,
  normalizeVerificationSectionLayout,
  type TaskDocVersion,
} from "./shared/docs.js";
import { defaultTaskDocV3 } from "./doc-template.js";

type TaskMigrateDocParams = { all: boolean; quiet: boolean; taskIds: string[] };
type MarkdownSection = { title: string; text: string };
export type TaskDocMigrationResult = {
  changed: number;
  changedPaths: string[];
};
const V3_CANONICAL_ORDER = [
  "Summary",
  "Scope",
  "Plan",
  "Verify Steps",
  "Verification",
  "Rollback Plan",
  "Findings",
] as const;
const HUMAN_TEXT_SECTIONS = new Set(["summary", "context", "scope", "plan", "findings", "notes"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function normalizeRevision(value: unknown): number | null {
  return Number.isInteger(value) && typeof value === "number" && value > 0 ? value : null;
}

function normalizeCanonicalSections(value: unknown): Record<string, string> | null {
  if (!isRecord(value)) return null;
  const out: Record<string, string> = {};
  for (const [title, text] of Object.entries(value)) {
    const normalizedTitle = title.trim();
    if (!normalizedTitle || typeof text !== "string") continue;
    out[normalizedTitle] = text.replaceAll("\r\n", "\n").trimEnd();
  }
  return Object.keys(out).length > 0 ? out : null;
}

function normalizeSectionKey(section: string): string {
  return section.trim().replaceAll(/\s+/g, " ").toLowerCase();
}

function parseMarkdownSections(doc: string): MarkdownSection[] {
  const lines = doc.replaceAll("\r\n", "\n").split("\n");
  const sections: MarkdownSection[] = [];
  let current: MarkdownSection | null = null;

  for (const line of lines) {
    const match = /^##\s+(.*)$/.exec(line.trim());
    if (match) {
      if (current) {
        current.text = current.text.trimEnd();
        sections.push(current);
      }
      current = { title: (match[1] ?? "").trim(), text: "" };
      continue;
    }

    if (current) {
      current.text = current.text.length > 0 ? `${current.text}\n${line}` : line;
    }
  }

  if (current) {
    current.text = current.text.trimEnd();
    sections.push(current);
  }

  return sections;
}

function renderMarkdownSections(sections: MarkdownSection[]): string {
  return sections
    .map((section) => {
      const text = section.text.trimEnd();
      return text ? `## ${section.title}\n\n${text}` : `## ${section.title}\n`;
    })
    .join("\n\n")
    .trimEnd();
}

function normalizeLiteralNewlinesInHumanSection(title: string, text: string): string {
  if (!HUMAN_TEXT_SECTIONS.has(normalizeSectionKey(title))) return text.trimEnd();
  return decodeEscapedTaskTextNewlines(text).trimEnd();
}

function firstSectionText(sections: MarkdownSection[], title: string): string | null {
  const target = normalizeSectionKey(title);
  return sections.find((section) => normalizeSectionKey(section.title) === target)?.text ?? null;
}

function mergeObservationText(doc: string, version: TaskDocVersion): string {
  const preferred = extractTaskObservationSection(doc, version)?.trim() ?? "";
  const notes = extractDocSection(doc, "Notes")?.trim() ?? "";
  const findings = extractDocSection(doc, "Findings")?.trim() ?? "";
  const out: string[] = [];
  for (const candidate of [preferred, findings, notes]) {
    if (!candidate) continue;
    if (out.includes(candidate)) continue;
    out.push(candidate);
  }
  return out.join("\n\n").trim();
}

function migrateDocToV3(opts: { title: string; description: string; doc: string }): string {
  const currentSections = parseMarkdownSections(opts.doc);
  const defaultSections = parseMarkdownSections(
    defaultTaskDocV3({ title: opts.title, description: opts.description }),
  );
  const emitted = new Set<string>();
  const nextSections: MarkdownSection[] = [];
  const observationText = mergeObservationText(opts.doc, 2);

  for (const title of V3_CANONICAL_ORDER) {
    const key = normalizeSectionKey(title);
    const currentText = firstSectionText(currentSections, title);
    const defaultText = firstSectionText(defaultSections, title) ?? "";

    let nextText: string | null = currentText ?? defaultText;
    if (title === "Verification") {
      nextText = normalizeVerificationSectionLayout(currentText ?? defaultText, 3);
    }
    if (title === "Findings") {
      nextText = observationText || defaultText;
    }
    if (nextText === null) continue;
    nextText = normalizeLiteralNewlinesInHumanSection(title, nextText);

    nextSections.push({ title, text: nextText.trimEnd() });
    emitted.add(key);
    if (title === "Findings") emitted.add("notes");
  }

  for (const section of currentSections) {
    const key = normalizeSectionKey(section.title);
    if (emitted.has(key)) continue;
    nextSections.push({ title: section.title, text: section.text.trimEnd() });
    emitted.add(key);
  }

  return renderMarkdownSections(nextSections);
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
  const canonicalSections = normalizeCanonicalSections(frontmatter.sections);

  const required = opts.config.tasks.doc.required_sections;
  const extracted = extractTaskDoc(parsed.body);
  const baseDoc =
    canonicalSections === null
      ? extracted || parsed.body
      : renderTaskDocFromSections(canonicalSections);
  let nextDoc = normalizeTaskDoc(ensureDocSections(baseDoc, required));
  const docVersion = normalizeTaskDocVersion(frontmatter.doc_version);
  if (docVersion === 2) {
    frontmatter.doc_version = 3;
    nextDoc = migrateDocToV3({
      title: typeof frontmatter.title === "string" ? frontmatter.title : "",
      description: typeof frontmatter.description === "string" ? frontmatter.description : "",
      doc: nextDoc,
    });
  } else {
    const verificationSection = extractDocSection(nextDoc, "Verification");
    const normalizedVerification = normalizeVerificationSectionLayout(
      verificationSection,
      docVersion,
    );
    nextDoc = setMarkdownSection(nextDoc, "Verification", normalizedVerification);
    for (const sectionTitle of ["Summary", "Context", "Scope", "Plan", "Findings", "Notes"]) {
      const sectionText = extractDocSection(nextDoc, sectionTitle);
      if (sectionText == null) continue;
      nextDoc = setMarkdownSection(
        nextDoc,
        sectionTitle,
        normalizeLiteralNewlinesInHumanSection(sectionTitle, sectionText),
      );
    }
  }
  const nextBody = extracted ? mergeTaskDoc(parsed.body, nextDoc) : nextDoc;
  frontmatter.sections = taskDocToSectionMap(nextDoc);
  frontmatter.revision = normalizeRevision(frontmatter.revision) ?? 1;

  const rendered = renderTaskReadme(frontmatter, nextBody);
  const next = rendered.endsWith("\n") ? rendered : `${rendered}\n`;
  if (next === original) return { changed: false };

  await atomicWriteFile(opts.readmePath, next, "utf8");
  return { changed: true };
}

async function resolveReadmePaths(opts: {
  tasksDir: string;
  params: TaskMigrateDocParams;
}): Promise<string[]> {
  if (!opts.params.all) {
    return opts.params.taskIds.map((taskId) => path.join(opts.tasksDir, taskId, "README.md"));
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

async function exportProjectionSnapshotIfChanged(opts: {
  ctx: CommandContext;
  resolvedGitRoot: string;
  tasksPath: string;
}): Promise<string[]> {
  if (!(opts.ctx.taskBackend.exportProjectionSnapshot || opts.ctx.taskBackend.exportTasksJson)) {
    return [];
  }
  const relOutputPath = opts.tasksPath.replaceAll("\\", "/");
  const outputPath = path.join(opts.resolvedGitRoot, relOutputPath);
  let before: string | null = null;
  try {
    before = await readFile(outputPath, "utf8");
  } catch {
    before = null;
  }
  await exportTaskProjectionSnapshot({ ctx: opts.ctx, outputPath });
  let after: string | null = null;
  try {
    after = await readFile(outputPath, "utf8");
  } catch {
    after = null;
  }
  if (before === after) return [];
  return (await canStageGitPath(opts.resolvedGitRoot, relOutputPath)) ? [relOutputPath] : [];
}

async function canStageGitPath(gitRoot: string, relPath: string): Promise<boolean> {
  try {
    await execFileAsync("git", ["ls-files", "--error-unmatch", "--", relPath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return true;
  } catch {
    // Continue below: untracked paths may still be stageable when they are not ignored.
  }

  try {
    await execFileAsync("git", ["check-ignore", "--quiet", "--", relPath], {
      cwd: gitRoot,
      env: gitEnv(),
    });
    return false;
  } catch {
    return true;
  }
}

export async function migrateTaskDocsInWorkspace(opts: {
  cwd: string;
  rootOverride?: string | null;
  all: boolean;
  taskIds: string[];
  resolvedProject?: Awaited<ReturnType<typeof resolveProject>>;
  config?: AgentplaneConfig;
  ctx?: CommandContext;
}): Promise<TaskDocMigrationResult> {
  const resolved =
    opts.resolvedProject ??
    (await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    }));
  let config = opts.config;
  if (!config) {
    const loadedConfig = await loadConfig(resolved.agentplaneDir);
    config = loadedConfig.config;
  }
  const ctx =
    opts.ctx ??
    (await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      resolvedProject: resolved,
      config,
    }));
  const params: TaskMigrateDocParams = { all: opts.all, quiet: false, taskIds: opts.taskIds };
  const tasksDir = path.join(resolved.gitRoot, config.paths.workflow_dir);

  const readmePaths = await resolveReadmePaths({ tasksDir, params });
  if (!opts.all) {
    for (const readmePath of readmePaths) {
      if (!(await fileExists(readmePath))) {
        const taskId = path.basename(path.dirname(readmePath));
        throw new CliError({
          exitCode: exitCodeForError("E_IO"),
          code: "E_IO",
          message: `Task README not found: ${taskId}`,
        });
      }
    }
  }

  let changed = 0;
  const changedPaths: string[] = [];
  for (const readmePath of readmePaths) {
    const res = await migrateTaskReadmeDoc({ readmePath, config });
    if (!res.changed) continue;
    changed += 1;
    const relReadmePath = path.relative(resolved.gitRoot, readmePath).replaceAll("\\", "/");
    if (await canStageGitPath(resolved.gitRoot, relReadmePath)) {
      changedPaths.push(relReadmePath);
    }
  }

  if (changed > 0) {
    changedPaths.push(
      ...(await exportProjectionSnapshotIfChanged({
        ctx,
        resolvedGitRoot: resolved.gitRoot,
        tasksPath: config.paths.tasks_path,
      })),
    );
  }

  return { changed, changedPaths: [...new Set(changedPaths)] };
}

export async function cmdTaskMigrateDoc(opts: {
  cwd: string;
  rootOverride?: string;
  all: boolean;
  quiet: boolean;
  taskIds: string[];
}): Promise<number> {
  const params: TaskMigrateDocParams = { all: opts.all, quiet: opts.quiet, taskIds: opts.taskIds };
  try {
    const result = await migrateTaskDocsInWorkspace({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      all: params.all,
      taskIds: params.taskIds,
    });

    if (!params.quiet) {
      process.stdout.write(
        `${successMessage("migrated task docs", undefined, `changed=${result.changed}`)}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "task migrate-doc", root: opts.rootOverride ?? null });
  }
}
