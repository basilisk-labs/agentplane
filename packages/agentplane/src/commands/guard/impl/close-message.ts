import path from "node:path";

import { extractTaskSuffix } from "@agentplaneorg/core";

import type { TaskData } from "../../../backends/task-backend.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";

import { execFileAsync, gitEnv } from "../../shared/git.js";

type NumstatEntry = {
  file: string;
  added: number;
  deleted: number;
  churn: number;
};

function uniqSorted(values: string[]): string[] {
  return [...new Set(values)].toSorted((a, b) => a.localeCompare(b));
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

function normalizeResultFallback(title: string): string {
  const trimmed = title.trim().replaceAll(/\s+/g, " ");
  return trimmed.length > 90 ? `${trimmed.slice(0, 87)}...` : trimmed;
}

function clampList<T>(items: T[], max: number): T[] {
  return items.slice(0, Math.max(0, Math.floor(max)));
}

async function gitNumstatForCommit(gitRoot: string, commit: string): Promise<NumstatEntry[]> {
  const { stdout } = await execFileAsync("git", ["show", "--numstat", "--format=", commit], {
    cwd: gitRoot,
    env: gitEnv(),
    encoding: "buffer",
    maxBuffer: 10 * 1024 * 1024,
  });
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

function formatTagsForSubject(tags: string[]): string {
  const norm = uniqSorted(tags.map((t) => t.trim()).filter(Boolean));
  const filtered = norm.filter((t) => t !== "spike");
  const max = 4;
  const shown = filtered.slice(0, max);
  const extra = filtered.length - shown.length;
  if (shown.length === 0) return "";
  const base = shown.join(",");
  return extra > 0 ? `[${base},+${extra}]` : `[${base}]`;
}

function formatTagsForBody(tags: string[]): string {
  const norm = uniqSorted(tags.map((t) => t.trim()).filter(Boolean));
  return norm.join(", ");
}

function normalizeOneLine(s: string, maxChars: number): string {
  const trimmed = s.trim().replaceAll(/\s+/g, " ");
  if (!trimmed) return "";
  const max = Math.max(1, Math.floor(maxChars));
  return trimmed.length > max ? `${trimmed.slice(0, Math.max(1, max - 3))}...` : trimmed;
}

function buildVerifySummary(task: TaskData, isSpike: boolean): string {
  if (isSpike) return "not required (spike)";
  const state = task.verification?.state ?? "pending";
  const note = typeof task.verification?.note === "string" ? task.verification.note : "";
  if (state === "ok" && note.trim()) return normalizeOneLine(note, 120);
  const cmds = Array.isArray(task.verify)
    ? task.verify.filter((c) => typeof c === "string" && c.trim())
    : [];
  if (cmds.length > 0) return cmds.join("; ");
  if (state === "ok") return "ok (see task verification note)";
  return String(state);
}

export type CloseCommitMessage = {
  subject: string;
  body: string;
};

export async function buildCloseCommitMessage(opts: {
  gitRoot: string;
  task: TaskData;
  keyFilesLimit?: number;
}): Promise<CloseCommitMessage> {
  const task = opts.task;
  const tags = Array.isArray(task.tags)
    ? task.tags.filter((t): t is string => typeof t === "string")
    : [];
  const isSpike = tags.includes("spike");

  if (String(task.status || "").toUpperCase() !== "DONE") {
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

  const suffix = extractTaskSuffix(task.id);
  const resultSummary = typeof task.result_summary === "string" ? task.result_summary.trim() : "";
  const result = resultSummary
    ? normalizeResultFallback(resultSummary)
    : `${normalizeResultFallback(task.title)} (no result_summary)`;

  const tagBracket = formatTagsForSubject(tags);
  const emoji = isSpike ? "🧪" : "✅";
  // CommitPolicy requires scope to match: [a-z][a-z0-9_-]* (no punctuation like parentheses).
  // Include the task id as part of the summary for scanability.
  const subject = `${emoji} ${suffix} close: ${result} (${task.id})${tagBracket ? ` ${tagBracket}` : ""}`;

  const verifySummary = buildVerifySummary(task, isSpike);
  const entries = await gitNumstatForCommit(opts.gitRoot, implCommit);
  const keyFiles = pickKeyFiles({ entries, limit: opts.keyFilesLimit ?? 5 });
  const keyFilesText = keyFiles.length > 0 ? keyFiles.join(", ") : "(none)";

  const notes: string[] = [];
  if (task.breaking === true) notes.push("breaking");
  if (typeof task.risk_level === "string" && task.risk_level.trim())
    notes.push(`risk=${task.risk_level.trim()}`);

  const bodyLines = [
    `Scope: ${formatTagsForBody(tags) || "(none)"}`,
    `Verify: ${verifySummary}`,
    `Key files: ${keyFilesText}`,
    notes.length > 0 ? `Notes: ${notes.join("; ")}` : null,
  ].filter((l): l is string => typeof l === "string");

  return { subject, body: bodyLines.join("\n") };
}

export function taskReadmePathForTask(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): string {
  return path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
}
