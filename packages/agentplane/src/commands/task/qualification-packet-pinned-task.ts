import path from "node:path";

import { parseTaskReadme, type TaskRecord } from "@agentplaneorg/core/tasks";

import { taskRecordToData, type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";

import { readArtifactAtReviewedSha } from "./qualification-packet-artifacts.js";

export async function loadQualificationTaskAtReviewedSha(opts: {
  gitRoot: string;
  workflowDir: string;
  reviewedSha: string;
  taskId: string;
}): Promise<{ task: TaskData; readme: { path: string; raw: string } }> {
  const readmePath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
  const readme = await readArtifactAtReviewedSha({
    gitRoot: opts.gitRoot,
    reviewedSha: opts.reviewedSha,
    filePath: readmePath,
    label: `Qualification dependency task ${opts.taskId} document`,
  });
  try {
    const parsed = parseTaskReadme(readme.raw);
    const task = taskRecordToData({
      id: opts.taskId,
      frontmatter: parsed.frontmatter as unknown as TaskRecord["frontmatter"],
      body: parsed.body,
      readmePath,
    });
    if (task.id !== opts.taskId) throw new Error("frontmatter id does not match directory");
    return { task, readme };
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        `Qualification dependency task ${opts.taskId} has an invalid task document at the reviewed implementation SHA` +
        ` (${error instanceof Error ? error.message : String(error)}).`,
    });
  }
}

export async function readPassingQualityReportAtReviewedSha(opts: {
  gitRoot: string;
  workflowDir: string;
  task: TaskData;
  reviewedSha: string;
  sha256: (value: string) => `sha256:${string}`;
}): Promise<{ path: string; sha256: `sha256:${string}` }> {
  const evaluatedSha = opts.task.quality_review?.evaluated_sha;
  if (typeof evaluatedSha !== "string" || !/^[a-f0-9]{40}$/u.test(evaluatedSha)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Qualification leaf ${opts.task.id} lacks a current evaluator reviewed SHA.`,
    });
  }
  const taskPrefix = `${opts.workflowDir.replaceAll(/\/+$/gu, "")}/${opts.task.id}/quality/`;
  const candidates = (opts.task.quality_review?.evidence_refs ?? [])
    .filter(
      (reference) => reference.startsWith(taskPrefix) && reference.endsWith("/quality-report.json"),
    )
    .toSorted();
  for (const candidate of candidates) {
    const report = await readArtifactAtReviewedSha({
      gitRoot: opts.gitRoot,
      reviewedSha: opts.reviewedSha,
      filePath: path.resolve(opts.gitRoot, candidate),
      label: "Qualification quality report",
    });
    try {
      const value: unknown = JSON.parse(report.raw);
      if (
        isRecord(value) &&
        value.task_id === opts.task.id &&
        value.verdict === "pass" &&
        value.evaluated_sha === evaluatedSha
      ) {
        return { path: report.path, sha256: opts.sha256(report.raw) };
      }
    } catch {
      continue;
    }
  }
  throw new CliError({
    code: "E_VALIDATION",
    message:
      `Qualification leaf ${opts.task.id} lacks a passing quality-report artifact ` +
      "bound to its current evaluator reviewed SHA.",
  });
}
