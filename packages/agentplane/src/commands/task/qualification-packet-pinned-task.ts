import { readFile } from "node:fs/promises";
import path from "node:path";

import { parseTaskReadme, type TaskRecord } from "@agentplaneorg/core/tasks";

import { taskRecordToData, type TaskData } from "../../backends/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import { taskReadmesHaveOnlyLifecycleDrift } from "../shared/quality-review-target.js";

import {
  readArtifactAtReviewedSha,
  readFileAtGitCommit,
  relativeToGitRoot,
} from "./qualification-packet-artifacts.js";

function parseQualificationTask(opts: {
  taskId: string;
  readmePath: string;
  raw: string;
  label: string;
}): TaskData {
  try {
    const parsed = parseTaskReadme(opts.raw);
    const task = taskRecordToData({
      id: opts.taskId,
      frontmatter: parsed.frontmatter as unknown as TaskRecord["frontmatter"],
      body: parsed.body,
      readmePath: opts.readmePath,
    });
    if (task.id !== opts.taskId) throw new Error("frontmatter id does not match directory");
    return task;
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        `${opts.label} has an invalid task document at the reviewed implementation SHA` +
        ` (${error instanceof Error ? error.message : String(error)}).`,
    });
  }
}

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
  return {
    task: parseQualificationTask({
      taskId: opts.taskId,
      readmePath,
      raw: readme.raw,
      label: `Qualification dependency task ${opts.taskId}`,
    }),
    readme,
  };
}

export async function loadQualificationRootAtReviewedSha(opts: {
  gitRoot: string;
  workflowDir: string;
  reviewedSha: string;
  taskId: string;
}): Promise<{ task: TaskData; readme: { path: string; raw: string } }> {
  const readmePath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
  const label = `Qualification root task ${opts.taskId} document`;
  const [current, reviewed] = await Promise.all([
    readFile(readmePath, "utf8"),
    readFileAtGitCommit({
      gitRoot: opts.gitRoot,
      commit: opts.reviewedSha,
      filePath: readmePath,
      label,
    }),
  ]);
  if (!taskReadmesHaveOnlyLifecycleDrift(reviewed, current)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `${label} may differ from the reviewed implementation SHA only in lifecycle-managed fields.`,
    });
  }
  return {
    task: parseQualificationTask({ taskId: opts.taskId, readmePath, raw: reviewed, label }),
    readme: { path: relativeToGitRoot(opts.gitRoot, readmePath), raw: reviewed },
  };
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
