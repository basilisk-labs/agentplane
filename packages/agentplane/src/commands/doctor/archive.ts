import fs from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv } from "@agentplaneorg/core/git";
import { normalizeTaskStatus, parseTaskReadme } from "@agentplaneorg/core/tasks";

import type { CommandContext } from "../shared/task-backend.js";
import { listTasksMemo } from "../shared/task-backend.js";

const DEFAULT_RECENT_DONE_TASK_LIMIT = 200;

type TaskSnapshotRecord = {
  id?: unknown;
  title?: unknown;
  status?: unknown;
  owner?: unknown;
  tags?: unknown;
  result_summary?: unknown;
  verification?: { note?: unknown; state?: unknown } | null;
  comments?: { body?: unknown }[] | null;
  commit?: { hash?: unknown; message?: unknown } | null;
};

type HistoricalCommitFinding = {
  id: string;
  hash: string;
  subject?: string;
  severity: "WARN" | "INFO";
};

type CommitSummary = {
  subject: string;
  body: string;
};

function pluralize(count: number, singular: string, plural = `${singular}s`): string {
  return count === 1 ? singular : plural;
}

function formatIdExamples(ids: string[], maxExamples = 3): string {
  const shown = ids.slice(0, maxExamples);
  const remainder = ids.length - shown.length;
  return remainder > 0 ? `${shown.join(", ")}; +${remainder} more` : shown.join(", ");
}

function taskShortId(taskId: string): string {
  const shortId = taskId.split("-").at(-1) ?? taskId;
  return shortId.trim().toUpperCase();
}

function textOrEmpty(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function collectTaskEvidenceText(task: TaskSnapshotRecord): string {
  const chunks = [
    textOrEmpty(task.title),
    textOrEmpty(task.result_summary),
    textOrEmpty(task.verification?.note),
    textOrEmpty(task.commit?.message),
    ...(Array.isArray(task.comments)
      ? task.comments.map((entry) => textOrEmpty(entry?.body)).filter(Boolean)
      : []),
    ...(Array.isArray(task.tags) ? task.tags.filter((tag) => typeof tag === "string") : []),
  ];
  return chunks.filter(Boolean).join("\n");
}

function escapeRegExp(input: string): string {
  return input.replaceAll(/[.*+?^${}()|[\]\\]/g, String.raw`\$&`);
}

function taskRefsBody(body: string, taskId: string): boolean {
  const shortId = taskShortId(taskId);
  return new RegExp(
    String.raw`^\s*-\s*Agentplane task:\s*(?:${escapeRegExp(taskId)}|${escapeRegExp(shortId)})\s*$`,
    "imu",
  ).test(body);
}

function isCloseCommitReference(task: TaskSnapshotRecord, subject: string, body: string): boolean {
  if (/\bclose:/iu.test(subject)) return true;
  if (typeof task.id !== "string") return false;
  return /\nRefs:\n/iu.test(`\n${body}`) && taskRefsBody(body, task.id);
}

function classifyUnknownHistoricalHash(task: TaskSnapshotRecord): "INFO" {
  void task;
  return "INFO";
}

function classifyCloseCommitReference(task: TaskSnapshotRecord, subject: string): "WARN" | "INFO" {
  if (/\bclose:\s*record task doc\b/iu.test(subject)) {
    return "INFO";
  }

  const evidence = collectTaskEvidenceText(task);
  if (
    /(no-op|already implemented|already fixed|already present|without changes|task deemed not актуальна|obsolete|no changes)/iu.test(
      evidence,
    )
  ) {
    return "INFO";
  }

  const subjectTaskId = /^\s*✅\s+([A-Z0-9]{6})\s+close:/u.exec(subject)?.[1] ?? "";
  const currentTaskId = typeof task.id === "string" ? taskShortId(task.id) : "";
  if (subjectTaskId && currentTaskId && subjectTaskId !== currentTaskId) {
    return "INFO";
  }

  if (/\b(epic|roadmap|spike|meta)\b/iu.test(evidence)) {
    return "INFO";
  }

  return "WARN";
}

function summarizeHistoricalFindings(
  findings: HistoricalCommitFinding[],
  opts: {
    singlePrefix: string;
    groupLabel: string;
    summaryLabel: string;
    includeSubject: boolean;
    severity: "WARN" | "INFO";
  },
): string[] {
  if (findings.length === 0) return [];
  const prefix = `[${opts.severity}]`;
  if (findings.length === 1) {
    const [finding] = findings;
    const subjectSuffix = opts.includeSubject && finding.subject ? ` (${finding.subject})` : "";
    return [`${prefix} ${opts.singlePrefix}: ${finding.id} -> ${finding.hash}${subjectSuffix}`];
  }

  const grouped = new Map<string, { hash: string; ids: string[]; subject?: string }>();
  for (const finding of findings) {
    const existing = grouped.get(finding.hash);
    if (existing) {
      existing.ids.push(finding.id);
      if (!existing.subject && finding.subject) existing.subject = finding.subject;
      continue;
    }
    grouped.set(finding.hash, {
      hash: finding.hash,
      ids: [finding.id],
      subject: finding.subject,
    });
  }

  const groups = [...grouped.values()].toSorted((left, right) => {
    const countDelta = right.ids.length - left.ids.length;
    if (countDelta !== 0) return countDelta;
    return left.hash.localeCompare(right.hash);
  });
  const exampleGroups = groups.slice(0, 3).map((group) => {
    const subjectSuffix = opts.includeSubject && group.subject ? `; subject: ${group.subject}` : "";
    return `${group.hash} (${group.ids.length} ${pluralize(group.ids.length, "task")}: ${formatIdExamples(group.ids)}${subjectSuffix})`;
  });
  const remainingGroups = groups.length - exampleGroups.length;
  const groupedSuffix = remainingGroups > 0 ? `; +${remainingGroups} more hash groups` : "";

  return [
    `${prefix} Historical task archive contains ${findings.length} DONE tasks with ${opts.summaryLabel} across ${groups.length} distinct commit ${opts.groupLabel}. Examples: ${exampleGroups.join("; ")}${groupedSuffix}`,
  ];
}

async function readTaskReadmeSnapshots(repoRoot: string): Promise<TaskSnapshotRecord[]> {
  const tasksDir = path.join(repoRoot, ".agentplane", "tasks");
  let entries: Dirent[];
  try {
    entries = await fs.readdir(tasksDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const tasks: TaskSnapshotRecord[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const text = await fs.readFile(path.join(tasksDir, entry.name, "README.md"), "utf8");
      tasks.push(parseTaskReadme(text).frontmatter as TaskSnapshotRecord);
    } catch {
      continue;
    }
  }
  return tasks;
}

export async function checkDoneTaskCommitInvariants(
  repoRoot: string,
  opts: { ctx?: CommandContext; fullArchive?: boolean } = {},
): Promise<string[]> {
  let all: TaskSnapshotRecord[] = [];
  if (opts.ctx) {
    try {
      all = await listTasksMemo(opts.ctx);
    } catch {
      all = [];
    }
  }
  if (all.length === 0) all = await readTaskReadmeSnapshots(repoRoot);
  const allDone = all.filter((t) => {
    return normalizeTaskStatus(t.status) === "DONE";
  });
  const done = opts.fullArchive ? allDone : allDone.slice(-DEFAULT_RECENT_DONE_TASK_LIMIT);
  if (done.length === 0) return [];

  const problems: string[] = [];
  const unknownHashFindings: HistoricalCommitFinding[] = [];
  const closeCommitWarnFindings: HistoricalCommitFinding[] = [];
  const closeCommitInfoFindings: HistoricalCommitFinding[] = [];
  const hashes = new Set<string>();
  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) {
      problems.push(
        `[WARN] DONE task is missing implementation commit hash: ${id} (finish with --commit <hash>).`,
      );
      continue;
    }
    hashes.add(hash);
  }
  if (hashes.size === 0) return problems;

  const commitByHash = await resolveCommitSummaries(repoRoot, [...hashes]);

  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) continue;
    const commit = commitByHash.get(hash);
    const subject = commit?.subject ?? "";
    if (!subject) {
      unknownHashFindings.push({
        id,
        hash,
        severity: classifyUnknownHistoricalHash(task),
      });
      continue;
    }
    if (isCloseCommitReference(task, subject, commit?.body ?? "")) {
      const severity = classifyCloseCommitReference(task, subject);
      const finding = { id, hash, subject, severity };
      if (severity === "WARN") closeCommitWarnFindings.push(finding);
      else closeCommitInfoFindings.push(finding);
    }
  }

  problems.push(
    ...summarizeHistoricalFindings(unknownHashFindings, {
      singlePrefix: "DONE task references unknown historical commit hash",
      groupLabel: "hashes",
      summaryLabel: "unknown implementation commit hashes",
      includeSubject: false,
      severity: "INFO",
    }),
    ...summarizeHistoricalFindings(closeCommitInfoFindings, {
      singlePrefix:
        "DONE task implementation commit resolves to a historical close commit reference",
      groupLabel: "hashes",
      summaryLabel:
        "historical close-commit references that were classified as non-actionable archive records",
      includeSubject: true,
      severity: "INFO",
    }),
    ...summarizeHistoricalFindings(closeCommitWarnFindings, {
      singlePrefix: "DONE task implementation commit points to a close commit",
      groupLabel: "hashes",
      summaryLabel: "implementation commits that point to close commits",
      includeSubject: true,
      severity: "WARN",
    }),
  );

  return problems;
}

async function resolveCommitSummaries(
  repoRoot: string,
  hashes: string[],
): Promise<Map<string, CommitSummary>> {
  const commitByHash = new Map<string, CommitSummary>();
  if (hashes.length === 0) return commitByHash;

  for (const chunk of chunked(hashes, 200)) {
    try {
      const { stdout } = await execFileAsync(
        "git",
        ["show", "-s", "--no-patch", "--format=%H%x00%s%x00%b%x00", "--ignore-missing", ...chunk],
        {
          cwd: repoRoot,
          env: gitEnv(),
        },
      );
      const parts = String(stdout ?? "").split("\u0000");
      for (let i = 0; i + 2 < parts.length; i += 3) {
        const hash = parts[i]?.trim() ?? "";
        const subject = parts[i + 1]?.trim() ?? "";
        const body = parts[i + 2]?.trim() ?? "";
        if (!hash) continue;
        commitByHash.set(hash, { subject, body });
      }
    } catch {
      // Preserve old behavior: unknown/unreadable hashes are reported later as empty subject.
    }
  }

  return commitByHash;
}

function chunked<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
