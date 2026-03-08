import fs from "node:fs/promises";
import path from "node:path";

import { execFileAsync, gitEnv } from "../shared/git.js";

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

export async function checkDoneTaskCommitInvariants(repoRoot: string): Promise<string[]> {
  const tasksPath = path.join(repoRoot, ".agentplane", "tasks.json");
  let raw = "";
  try {
    raw = await fs.readFile(tasksPath, "utf8");
  } catch {
    return [];
  }

  let parsed: { tasks?: unknown };
  try {
    parsed = JSON.parse(raw) as { tasks?: unknown };
  } catch {
    return [`Invalid JSON snapshot: ${path.relative(repoRoot, tasksPath)}`];
  }
  const all = Array.isArray(parsed.tasks) ? (parsed.tasks as TaskSnapshotRecord[]) : [];
  const done = all.filter((t) => {
    const status = typeof t.status === "string" ? t.status : "";
    return status.toUpperCase() === "DONE";
  });
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
        `DONE task is missing implementation commit hash: ${id} (finish with --commit <hash>).`,
      );
      continue;
    }
    hashes.add(hash);
  }
  if (hashes.size === 0) return problems;

  const subjectByHash = new Map<string, string>();
  for (const hash of hashes) {
    try {
      const { stdout } = await execFileAsync("git", ["show", "-s", "--format=%s", hash], {
        cwd: repoRoot,
        env: gitEnv(),
      });
      subjectByHash.set(hash, String(stdout ?? "").trim());
    } catch {
      subjectByHash.set(hash, "");
    }
  }

  for (const task of done) {
    const id = typeof task.id === "string" ? task.id : "<unknown>";
    const hash = typeof task.commit?.hash === "string" ? task.commit.hash.trim() : "";
    if (!hash) continue;
    const subject = subjectByHash.get(hash) ?? "";
    if (!subject) {
      unknownHashFindings.push({
        id,
        hash,
        severity: classifyUnknownHistoricalHash(task),
      });
      continue;
    }
    if (/\bclose:/iu.test(subject)) {
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
