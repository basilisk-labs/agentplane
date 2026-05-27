import { readFile } from "node:fs/promises";
import path from "node:path";

import { extractTaskSuffix, parseTaskSubjectTemplate } from "@agentplaneorg/core/commit";

import type { TaskData } from "../../../backends/task-backend.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";

type NumstatEntry = {
  file: string;
  added: number;
  deleted: number;
  churn: number;
};

function isMissingCommitObjectError(err: unknown): boolean {
  const stderr = (err as { stderr?: unknown }).stderr;
  const text =
    err instanceof Error
      ? [err.message, typeof stderr === "string" ? stderr : ""]
          .filter((part) => part.trim().length > 0)
          .join("\n")
      : String(err);
  return (
    /bad object/i.test(text) || /unknown revision/i.test(text) || /ambiguous argument/i.test(text)
  );
}

function uniqInOrder(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const v of values) {
    if (seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

function isTaskArtifactPath(p: string): boolean {
  const norm = p.replaceAll("\\", "/");
  return norm.startsWith(".agentplane/tasks/") || norm.startsWith("tasks/");
}

function clampList<T>(items: T[], max: number): T[] {
  return items.slice(0, Math.max(0, Math.floor(max)));
}

async function gitNumstatForCommit(gitRoot: string, commit: string): Promise<NumstatEntry[]> {
  let stdout: string | Buffer;
  try {
    ({ stdout } = await execFileAsync("git", ["show", "--numstat", "--format=", commit], {
      cwd: gitRoot,
      env: gitEnv(),
      encoding: "buffer",
      maxBuffer: 10 * 1024 * 1024,
    }));
  } catch (err) {
    if (isMissingCommitObjectError(err)) return [];
    throw err;
  }
  const text = Buffer.isBuffer(stdout) ? stdout.toString("utf8") : String(stdout);
  const entries: NumstatEntry[] = [];
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const parts = trimmed.split("\t");
    if (parts.length < 3) continue;
    const [aRaw, dRaw, fileRaw] = parts;
    const file = String(fileRaw ?? "").trim();
    if (!file) continue;
    const added = aRaw === "-" ? 0 : Number(aRaw);
    const deleted = dRaw === "-" ? 0 : Number(dRaw);
    const churn = (Number.isFinite(added) ? added : 0) + (Number.isFinite(deleted) ? deleted : 0);
    entries.push({
      file,
      added: Number.isFinite(added) ? added : 0,
      deleted: Number.isFinite(deleted) ? deleted : 0,
      churn,
    });
  }
  return entries;
}

function pickKeyFiles(opts: { entries: NumstatEntry[]; limit: number }): string[] {
  const sorted = [...opts.entries].toSorted((a, b) => {
    if (b.churn !== a.churn) return b.churn - a.churn;
    return a.file.localeCompare(b.file);
  });
  const filtered = sorted.map((e) => e.file).filter((f) => !isTaskArtifactPath(f));
  // Preserve churn ordering while still being deterministic and duplicate-free.
  return clampList(uniqInOrder(filtered), opts.limit);
}

function normalizeOneLine(s: string, maxChars = 180): string {
  const trimmed = s.trim().replaceAll(/\s+/g, " ");
  if (!trimmed) return "";
  const max = Math.max(1, Math.floor(maxChars));
  if (trimmed.length <= max) return trimmed;
  const slice = trimmed.slice(0, Math.max(1, max - 1));
  const lastSpace = slice.lastIndexOf(" ");
  const safeSlice = lastSpace > Math.floor(max * 0.65) ? slice.slice(0, lastSpace) : slice;
  return `${safeSlice.trimEnd()}...`;
}

function isNoisyOperationalTitle(value: string): boolean {
  const text = value.trim();
  return (
    text.length === 0 ||
    /merged via pr\s+#?\d+/iu.test(text) ||
    /\bclose:/iu.test(text) ||
    /\bintegrate:/iu.test(text) ||
    /^\p{Emoji_Presentation}/u.test(text) ||
    /^\S+\s+close:/iu.test(text)
  );
}

function isMachineSummary(value: string): boolean {
  const text = value.trim();
  return /^[a-z0-9]+(?:[-_][a-z0-9]+)+$/u.test(text);
}

function stripOperationalNoise(value: string): string {
  return value
    .replaceAll(/^\p{Emoji_Presentation}\s*/gu, "")
    .replaceAll(/\b[A-Z0-9]{4,8}\s+close:\s*/giu, "")
    .replaceAll(/\bclose:\s*/giu, "")
    .replaceAll(/\bMerged via PR\s+#\d+\.?/giu, "")
    .replaceAll(/\(\d{12}-[A-Z0-9]{4,8}\)/giu, "")
    .replaceAll(/\[[a-z0-9_,+\-\s]+\]/giu, "")
    .replaceAll(/\(#\d+\)/gu, "")
    .trim()
    .replaceAll(/\s+/g, " ");
}

function sentence(value: string): string {
  const trimmed = normalizeOneLine(value).replaceAll(/[.。]+$/g, "");
  if (!trimmed) return "";
  return `${trimmed[0]?.toUpperCase() ?? ""}${trimmed.slice(1)}.`;
}

function lowerFirst(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return `${trimmed[0]?.toLowerCase() ?? ""}${trimmed.slice(1)}`;
}

function normalizeSubjectSummary(value: string): string {
  let text = stripOperationalNoise(value)
    .replace(/^add(?:ed)?\s+/iu, "add ")
    .replace(/^implement(?:ed)?\s+/iu, "implement ")
    .replace(/^improve(?:d)?\s+/iu, "improve ")
    .replace(/^update(?:d)?\s+/iu, "update ")
    .replace(/^regenerate(?:d)?\s+/iu, "regenerate ")
    .replace(/^verify(?:ied)?\s+/iu, "verify ");
  text = lowerFirst(text).replaceAll(/[.。]+$/g, "");
  return normalizeOneLine(text, 72);
}

function normalizeScope(opts: {
  scope?: string;
  tags?: string[];
  title?: string;
  files?: string[];
}): string {
  const preferred = [
    "context",
    "codex",
    "runner",
    "cli",
    "docs",
    "release",
    "tests",
    "traces",
    "recipes",
    "cloud",
    "infra",
  ];
  const raw = [opts.scope, ...(opts.tags ?? [])]
    .map((value) => value?.trim().toLowerCase() ?? "")
    .filter(Boolean);
  const rawSet = new Set(raw);
  for (const candidate of preferred) {
    if (rawSet.has(candidate)) return candidate;
  }

  const files = opts.files ?? [];
  const title = opts.title?.toLowerCase() ?? "";
  if (files.some((file) => file.includes("/commands/context/")) || /\bcontext\b/u.test(title)) {
    return "context";
  }
  if (files.length > 0 && files.every((file) => file.startsWith("docs/"))) return "docs";
  if (files.some((file) => /\.(test|spec)\.tsx?$/u.test(file))) return "tests";
  if (files.some((file) => file.startsWith("docs/"))) return "docs";
  if (files.some((file) => file.includes("/cli/") || file.includes("/commands/"))) return "cli";
  if (files.some((file) => file.includes("/release/")) || /\brelease\b/u.test(title)) {
    return "release";
  }
  if (rawSet.has("git")) return "git";
  return "code";
}

function titleFromFileClusters(files: string[]): string {
  if (files.some((file) => file.includes("/commands/context/"))) {
    if (files.some((file) => /v0\.6|release-readiness/iu.test(file))) {
      return "update v0.6 release readiness flow";
    }
    return "update context command workflow";
  }
  if (files.length > 0 && files.every((file) => file.startsWith("docs/"))) {
    return "update documentation";
  }
  if (files.some((file) => /\.(test|spec)\.tsx?$/u.test(file))) {
    return "update test coverage";
  }
  return "";
}

function normalizeSubject(input: MergeMessageInput): string {
  const files = input.keyFiles?.length ? input.keyFiles : (input.changedFiles ?? []);
  const scope = normalizeScope({
    scope: input.scope,
    tags: input.tags,
    title: input.prTitle,
    files,
  });
  const candidates = [input.prTitle, ...(input.summary ?? [])]
    .map((value) => (typeof value === "string" ? value : ""))
    .find((value) => value.trim() && !isNoisyOperationalTitle(value));
  let summary = normalizeSubjectSummary(candidates ?? "");
  if (!summary) summary = titleFromFileClusters(files);
  if (!summary && input.taskId)
    summary = `merge Agentplane task ${extractTaskSuffix(input.taskId)}`;
  if (!summary) summary = "merge Agentplane task";
  const subject = `${scope}: ${summary}`;
  return normalizeOneLine(subject, 88);
}

function splitVerificationText(value: string): string[] {
  const withoutPrefix = value
    .replaceAll(/^Verified:\s*/giu, "")
    .replaceAll(/^Verify:\s*/giu, "")
    .trim();
  const commandMatches = [...withoutPrefix.matchAll(/\bCommand:\s*(.+?)\s*;\s*Result:\s*pass\b/giu)]
    .map((match) => match[1]?.trim() ?? "")
    .filter(Boolean);
  if (commandMatches.length > 0) return commandMatches;

  const colon = /\b(?:passed|checks passed|commands passed):\s*(.+)$/iu.exec(withoutPrefix)?.[1];
  const source = colon ?? withoutPrefix;
  return source
    .split(/[;,]/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeCheckLabel(value: string): string {
  const text = value
    .trim()
    .replaceAll(/\s+/g, " ")
    .replace(/^and\s+/iu, "")
    .replaceAll(/\bResult:\s*pass(?:ed)?\.?/giu, "")
    .replaceAll(/\bEvidence:\s*/giu, "")
    .replaceAll(/\bScope:\s*[^.]+\.?/giu, "")
    .replace(/\s+(?:pass|passed)\.?$/iu, "")
    .replace(/\s+(?:pass|passed)\s+locally\.?$/iu, "")
    .trim()
    .replaceAll(/\s+/g, " ");
  const lower = text.toLowerCase();
  if (lower === "typecheck" || lower === "type check") return "Typecheck";
  if (lower === "lint") return "Lint";
  if (lower === "release:build" || lower === "release build") return "Release build";
  if (lower === "docs generation" || lower === "doc generation") return "Docs generation";
  if (lower === "release parity") return "Release parity checks";
  if (lower === "local and hosted readiness checks") return "Local and hosted readiness checks";
  return `${text[0]?.toUpperCase() ?? ""}${text.slice(1)}`;
}

function normalizeVerification(checks: string[] | undefined): string[] {
  const expanded = (checks ?? []).flatMap((check) => splitVerificationText(check));
  return uniqInOrder(
    expanded
      .map((check) => normalizeCheckLabel(check).replace(/\s+passed$/iu, ""))
      .filter(Boolean)
      .map((check) => {
        const lower = check.toLowerCase();
        if (lower.startsWith("not required")) return `${check}.`;
        if (lower.startsWith("ok ")) return `${check}.`;
        if (lower === "pending" || lower === "needs_rework" || lower === "blocked_external") {
          return `${check}.`;
        }
        return `${check} passed.`;
      }),
  );
}

function buildVerificationInput(task: TaskData, isSpike: boolean): string[] {
  if (isSpike) return ["not required (spike)"];
  const state = task.verification?.state ?? "pending";
  const note = typeof task.verification?.note === "string" ? task.verification.note : "";
  if (state === "ok" && note.trim()) return [note];
  const cmds = Array.isArray(task.verify)
    ? task.verify.filter((c) => typeof c === "string" && c.trim())
    : [];
  if (cmds.length > 0) return cmds;
  if (state === "ok") return ["ok (see task verification note)"];
  return [String(state)];
}

function deriveChanged(files: string[]): string[] {
  const bullets: string[] = [];
  if (files.some((file) => file.includes("/commands/context/"))) {
    bullets.push("Updated context command behavior and coverage.");
  }
  if (files.some((file) => file.includes("release-readiness"))) {
    bullets.push("Updated release-readiness checks.");
  }
  if (files.some((file) => file.startsWith("docs/"))) {
    bullets.push("Updated documentation artifacts.");
  }
  if (files.some((file) => /\.(test|spec)\.tsx?$/u.test(file))) {
    bullets.push("Updated automated test coverage.");
  }
  if (
    bullets.length === 0 &&
    files.some((file) => !isTaskArtifactPath(file) && !file.startsWith("docs/"))
  ) {
    bullets.push("Updated implementation code.");
  }
  return uniqInOrder(bullets);
}

function capBullets(items: string[], max: number, moreText: (count: number) => string): string[] {
  const shown = items.slice(0, max);
  const extra = items.length - shown.length;
  return extra > 0 ? [...shown, moreText(extra)] : shown;
}

function extractPrNumber(value: string | undefined): number | undefined {
  const match = /PR\s+#(\d+)/iu.exec(value ?? "");
  if (!match?.[1]) return undefined;
  const parsed = Number(match[1]);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function shortTaskId(taskId: string | undefined): string | undefined {
  const trimmed = taskId?.trim() ?? "";
  return trimmed ? extractTaskSuffix(trimmed) : undefined;
}

type MaybePrMeta = {
  pr_number?: unknown;
};

async function readPrNumberFromMeta(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<number | undefined> {
  const metaPath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "pr", "meta.json");
  try {
    const parsed = JSON.parse(await readFile(metaPath, "utf8")) as MaybePrMeta;
    const value = parsed.pr_number;
    return typeof value === "number" && Number.isInteger(value) && value > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

function formatSection(title: string, lines: string[]): string[] {
  const cleaned = lines.map((line) => line.trim()).filter(Boolean);
  if (cleaned.length === 0) return [];
  return [`${title}:`, ...cleaned.map((line) => `- ${line}`)];
}

type MergeMessageInput = {
  scope?: string;
  subjectEmoji?: string;
  tags?: string[];
  prTitle?: string;
  prBody?: string;
  sourcePrNumber?: number;
  mergePrNumber?: number;
  taskId?: string;
  runId?: string;
  authorName?: string;
  authorEmail?: string;
  coAuthors?: { name: string; email: string }[];
  summary?: string[];
  why?: string[];
  changed?: string[];
  verification?: string[];
  keyFiles?: string[];
  changedFiles?: string[];
  diffStats?: {
    filesChanged: number;
    insertions?: number;
    deletions?: number;
  };
};

function comparableText(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replaceAll(/[^\p{L}\p{N}\s/-]/gu, " ")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function subjectSummaryFromSubject(subject: string): string {
  const separator = subject.indexOf(":");
  if (separator === -1) return subject.trim();
  return subject.slice(separator + 1).trim();
}

function renderSubjectWithTaskPrefix(input: MergeMessageInput, subject: string): string {
  const emoji = input.subjectEmoji?.trim() ?? "";
  const suffix = shortTaskId(input.taskId);
  if (!emoji || !suffix) return subject;
  return normalizeOneLine(`${emoji} ${suffix} ${subject}`, 96);
}

export function renderMergeMessage(input: MergeMessageInput): string {
  const semanticSubject = normalizeSubject(input);
  const subject = renderSubjectWithTaskPrefix(input, semanticSubject);
  const files = uniqInOrder([...(input.keyFiles ?? []), ...(input.changedFiles ?? [])]);
  const keyFileSource = input.keyFiles ?? input.changedFiles ?? [];
  const keyFiles = capBullets(keyFileSource.slice(0, 20), 8, (count) => `+${count} more files`);
  const verification = capBullets(normalizeVerification(input.verification), 8, (count) => {
    return `+${count} more checks recorded in Agentplane run metadata.`;
  });
  const summaryCandidates = input.summary?.length
    ? input.summary
    : input.prTitle
      ? [input.prTitle]
      : [];
  const subjectSummary = comparableText(subjectSummaryFromSubject(semanticSubject));
  const changed = (input.changed ?? []).map((candidate) => sentence(candidate)).filter(Boolean);
  const derivedChanged = deriveChanged(files);
  const changedLines = changed.length > 0 ? changed : derivedChanged;
  const summary = summaryCandidates
    .map((candidate) => sentence(candidate))
    .filter(Boolean)
    .filter((line) => !isNoisyOperationalTitle(line))
    .filter((line) => comparableText(line) !== subjectSummary);
  const summaryFallback = changedLines.length > 0 ? changedLines : [];
  const summaryLines =
    summary.length > 0
      ? summary
      : summaryFallback.length > 0
        ? summaryFallback
        : input.taskId
          ? [`Merged Agentplane task ${shortTaskId(input.taskId) ?? input.taskId}.`]
          : [];
  const changedSection = changedLines.filter((line) => {
    const normalized = comparableText(line);
    return !summaryLines.some((summaryLine) => comparableText(summaryLine) === normalized);
  });
  const refs = [
    input.sourcePrNumber ? `Source PR: #${input.sourcePrNumber}` : "",
    input.mergePrNumber ? `Merge PR: #${input.mergePrNumber}` : "",
    input.taskId ? `Agentplane task: ${shortTaskId(input.taskId) ?? input.taskId}` : "",
    input.runId ? `Agentplane run: ${input.runId}` : "",
  ].filter(Boolean);

  const body = [
    ...formatSection("Summary", summaryLines),
    ...formatSection("Why", input.why ?? []),
    ...formatSection("Changed", changedSection),
    ...formatSection("Verification", verification),
    ...formatSection("Key files", keyFiles),
    ...formatSection("Refs", refs),
  ];

  return body.length > 0 ? `${subject}\n\n${body.join("\n")}` : subject;
}

export type CloseCommitMessage = {
  subject: string;
  body: string;
};

export async function buildCloseCommitMessage(opts: {
  gitRoot: string;
  task: TaskData;
  keyFilesLimit?: number;
  workflowDir?: string;
}): Promise<CloseCommitMessage> {
  const task = opts.task;
  const tags = Array.isArray(task.tags)
    ? task.tags.filter((t): t is string => typeof t === "string")
    : [];
  const isSpike = tags.includes("spike");

  if (normalizeTaskStatus(task.status) !== "DONE") {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Task is not DONE: ${task.id}`,
    });
  }

  const implCommit = task.commit?.hash?.trim() ?? "";
  if (!implCommit) {
    throw new CliError({
      exitCode: exitCodeForError("E_USAGE"),
      code: "E_USAGE",
      message: `Task is missing recorded commit metadata: ${task.id} (finish with --commit or set commit on the task).`,
    });
  }

  const resultSummary = typeof task.result_summary === "string" ? task.result_summary.trim() : "";
  const entries = await gitNumstatForCommit(opts.gitRoot, implCommit);
  const keyFiles = pickKeyFiles({ entries, limit: opts.keyFilesLimit ?? 8 });

  const notes: string[] = [];
  if (task.breaking === true) notes.push("breaking");
  if (typeof task.risk_level === "string" && task.risk_level.trim())
    notes.push(`risk=${task.risk_level.trim()}`);

  const workflowDir = opts.workflowDir ?? ".agentplane/tasks";
  const prFromMeta = await readPrNumberFromMeta({
    gitRoot: opts.gitRoot,
    workflowDir,
    taskId: task.id,
  });
  const sourcePrNumber = prFromMeta ?? extractPrNumber(resultSummary);
  const title =
    resultSummary && !isNoisyOperationalTitle(resultSummary) && !isMachineSummary(resultSummary)
      ? resultSummary
      : task.title;
  const rendered = renderMergeMessage({
    scope: normalizeScope({ tags, title, files: keyFiles }),
    subjectEmoji: parseTaskSubjectTemplate(task.commit?.message ?? "")?.emoji ?? "🧩",
    tags,
    prTitle: title,
    sourcePrNumber,
    taskId: task.id,
    runId:
      typeof task.origin?.run_id === "string" && task.origin.run_id.trim()
        ? task.origin.run_id.trim()
        : task.id,
    summary: [title],
    changed: deriveChanged(keyFiles),
    verification: buildVerificationInput(task, isSpike),
    keyFiles,
    changedFiles: entries.map((entry) => entry.file).filter((file) => !isTaskArtifactPath(file)),
    diffStats: {
      filesChanged: entries.length,
      insertions: entries.reduce((sum, entry) => sum + entry.added, 0),
      deletions: entries.reduce((sum, entry) => sum + entry.deleted, 0),
    },
    why: notes.length > 0 ? [`Task metadata: ${notes.join("; ")}.`] : [],
  });
  const [subject, ...bodyLines] = rendered.split("\n");
  return { subject: subject ?? "", body: bodyLines.join("\n").trim() };
}

export function taskReadmePathForTask(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): string {
  return path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
}
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";
