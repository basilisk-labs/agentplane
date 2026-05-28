import path from "node:path";

import { parseTaskSubjectTemplate } from "@agentplaneorg/core/commit";
import { normalizeTaskStatus } from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../../backends/task-backend.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { CliError } from "../../../shared/errors.js";
import { extractPrNumber, gitNumstatForCommit, readPrNumberFromMeta } from "./close-message-git.js";
import {
  buildVerificationInput,
  deriveChanged,
  isMachineSummary,
  isNoisyOperationalTitle,
  isTaskArtifactPath,
  normalizeScope,
  pickKeyFiles,
  renderMergeMessage,
} from "./close-message-render.js";

export { renderMergeMessage } from "./close-message-render.js";

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
  if (typeof task.risk_level === "string" && task.risk_level.trim()) {
    notes.push(`risk=${task.risk_level.trim()}`);
  }

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
  const parsedSubject = parseTaskSubjectTemplate(task.commit?.message ?? "");
  const rendered = renderMergeMessage({
    scope: normalizeScope({ tags, title, files: keyFiles }),
    subjectEmoji: parsedSubject?.emoji,
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
