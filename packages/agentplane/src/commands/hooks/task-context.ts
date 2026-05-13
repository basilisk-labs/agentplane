import { parseTaskSubjectTemplate, type CommitTaskIntent } from "@agentplaneorg/core/commit";
import { parseTaskIdFromBranch, parseTaskIdFromCloseBranch } from "@agentplaneorg/core/git";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { gitCurrentBranch } from "../shared/git-ops.js";

const TASK_KIND_VALUES = new Set([
  "analysis",
  "content",
  "docs",
  "code",
  "release",
  "ops",
  "context",
]);
const MUTATION_SCOPE_VALUES = new Set([
  "none",
  "docs",
  "code",
  "release",
  "ops",
  "context",
  "unknown",
]);
const BLUEPRINT_REQUEST_VALUES = new Set([
  "analysis.light",
  "content.light",
  "docs.change",
  "code.direct",
  "code.branch_pr",
  "performance.benchmark",
  "quality.regression",
  "context.assimilation",
  "runner.execution",
  "post_run.improvement_review",
  "release.strict",
  "ops.approval",
]);

function stringValue<T extends string>(value: unknown, allowed: Set<string>): T | undefined {
  return typeof value === "string" && allowed.has(value) ? (value as T) : undefined;
}

export function envFlag(name: string): boolean {
  return (process.env[name] ?? "").trim() === "1";
}

export function inferTaskIdFromBranch(branch: string | undefined, taskPrefix: string): string {
  const value = (branch ?? "").trim();
  if (!value) return "";
  return parseTaskIdFromBranch(taskPrefix, value) ?? parseTaskIdFromCloseBranch(value) ?? "";
}

export async function currentBranchOrUndefined(gitRoot: string): Promise<string | undefined> {
  try {
    return await gitCurrentBranch(gitRoot);
  } catch {
    return undefined;
  }
}

export async function inferTaskIdFromCurrentBranch(opts: {
  gitRoot: string;
  taskPrefix: string;
}): Promise<string> {
  return inferTaskIdFromBranch(await currentBranchOrUndefined(opts.gitRoot), opts.taskPrefix);
}

export async function inferTaskIdFromSubjectSuffix(opts: {
  gitRoot: string;
  workflowDir: string;
  subject: string;
}): Promise<string> {
  const suffix = parseTaskSubjectTemplate(opts.subject)?.suffix?.trim() ?? "";
  if (!suffix) return "";
  try {
    const entries = await readdir(path.join(opts.gitRoot, opts.workflowDir), {
      withFileTypes: true,
    });
    const matches = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => name.toLowerCase().endsWith(`-${suffix.toLowerCase()}`));
    return matches.length === 1 ? (matches[0] ?? "") : "";
  } catch {
    return "";
  }
}

export async function readTaskIntent(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}): Promise<CommitTaskIntent | undefined> {
  const taskReadmePath = path.join(opts.gitRoot, opts.workflowDir, opts.taskId, "README.md");
  let parsed;
  try {
    parsed = parseTaskReadme(await readFile(taskReadmePath, "utf8"));
  } catch {
    return undefined;
  }
  const fm = parsed.frontmatter;
  const intent: CommitTaskIntent = {
    taskKind: stringValue(fm.task_kind, TASK_KIND_VALUES),
    mutationScope: stringValue(fm.mutation_scope, MUTATION_SCOPE_VALUES),
    blueprintRequest: stringValue(fm.blueprint_request, BLUEPRINT_REQUEST_VALUES),
    tags: Array.isArray(fm.tags) ? fm.tags.filter((tag) => typeof tag === "string") : undefined,
  };
  return intent.taskKind || intent.mutationScope || intent.blueprintRequest || intent.tags?.length
    ? intent
    : undefined;
}
