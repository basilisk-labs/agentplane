import { readFile, readdir } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";

import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { listWorktrees } from "@agentplaneorg/core/git";

import type { TaskData } from "../../backends/task-backend.js";
import { renderDiagnosticFinding } from "../shared/diagnostics.js";
import { parsePrMeta, resolvePrBatchIncludedTaskIds } from "../shared/pr-meta.js";
import {
  backendUsesLocalTaskStore,
  listTasksMemo,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  findDoneBranchPrTasksWithOpenPrArtifacts,
  findLocallyShippedBranchPrTasks,
} from "../task/hosted-merge-sync.js";
import { resolveLocalMergedPrMeta } from "../task/hosted-merge-sync/pr-meta.js";
import {
  findDuplicateTaskWorktreeRegistrations,
  findNestedWorktreeRegistrations,
} from "../shared/worktree-topology.js";

export async function checkBranchPrWorktreeTopology(ctx?: CommandContext): Promise<string[]> {
  if (ctx?.config.workflow_mode !== "branch_pr") return [];

  let worktrees;
  try {
    worktrees = await listWorktrees(ctx.resolvedProject.gitRoot);
  } catch {
    return [];
  }
  const nested = findNestedWorktreeRegistrations({
    projectRoot: ctx.resolvedProject.gitRoot,
    worktrees,
  });
  const duplicateTasks = findDuplicateTaskWorktreeRegistrations({
    taskPrefix: ctx.config.branch.task_prefix,
    worktrees,
  });
  const findings: string[] = [];

  if (nested.length > 0) {
    findings.push(
      renderDiagnosticFinding({
        severity: "WARN",
        state: "nested task/recovery worktrees are registered in the primary repository",
        likelyCause:
          "an internal recovery or task checkout created another worktree, restoring a historical checkout graph into the shared Git worktree registry",
        nextAction: {
          command: "agentplane cleanup merged --fetch",
          reason:
            "classify provider-proven merged candidates before removing only clean obsolete registrations",
        },
        details: [
          `Affected registrations: ${nested.length}`,
          `Examples: ${nested
            .slice(0, 5)
            .map((entry) => `${entry.path} under ${entry.parentPath}`)
            .join(", ")}`,
        ],
      }),
    );
  }

  if (duplicateTasks.length > 0) {
    findings.push(
      renderDiagnosticFinding({
        severity: "WARN",
        state: "one or more branch_pr tasks own multiple registered worktrees",
        likelyCause:
          "legacy or recovery work-start paths bypassed the one-authoritative-worktree-per-task invariant",
        nextAction: {
          command: "agentplane cleanup merged --fetch",
          reason:
            "inspect merged candidates while preserving active, dirty, open-PR, and ambiguous task state",
        },
        details: [
          `Affected tasks: ${duplicateTasks.length}`,
          `Examples: ${duplicateTasks
            .slice(0, 5)
            .map((entry) => `${entry.taskId}=${entry.worktrees.map((item) => item.path).join("|")}`)
            .join(", ")}`,
        ],
      }),
    );
  }

  return findings;
}

export async function checkBranchPrShippedTaskDrift(ctx?: CommandContext): Promise<string[]> {
  if (!ctx || !backendUsesLocalTaskStore(ctx) || ctx.config.workflow_mode !== "branch_pr") {
    return [];
  }

  let tasks: TaskData[] = [];
  try {
    tasks = await listTasksMemo(ctx);
  } catch {
    return [];
  }
  if (tasks.length === 0) return [];

  const matches = await findLocallyShippedBranchPrTasks({ ctx, tasks });
  if (matches.length === 0) return [];

  const examples = matches
    .slice(0, 5)
    .map(
      (entry) =>
        `${entry.taskId}@${entry.base}:${entry.commitHash.slice(0, 12)} verified_via=${entry.verificationSource}`,
    )
    .join(", ");

  return [
    renderDiagnosticFinding({
      severity: "WARN",
      state: "branch_pr tasks appear shipped on the base branch but remain open",
      likelyCause:
        "the verified task commit already landed on the base branch, but canonical task closure artifacts were never reconciled",
      nextAction: {
        command: "agentplane task normalize --sync-branch-pr-state",
        reason:
          "mark locally shipped branch_pr tasks as DONE in the task projection before committing the reconciled task artifacts on the base branch",
      },
      details: [
        `Affected tasks: ${matches.length}`,
        examples ? `Examples: ${examples}` : "Examples unavailable.",
      ],
    }),
  ];
}

export async function checkBranchPrDoneTaskOpenPrDrift(ctx?: CommandContext): Promise<string[]> {
  if (!ctx || !backendUsesLocalTaskStore(ctx) || ctx.config.workflow_mode !== "branch_pr") {
    return [];
  }

  const tasks = await readDoneTaskSnapshot(ctx);
  if (tasks.length === 0) return [];

  const matches = await findDoneBranchPrTasksWithOpenPrArtifacts({ ctx, tasks });
  if (matches.length === 0) return [];

  const examples = matches
    .slice(0, 5)
    .map(
      (entry) =>
        `${entry.taskId}@${entry.base}:${entry.commitHash.slice(0, 12)} branch=${entry.branch}`,
    )
    .join(", ");

  return [
    renderDiagnosticFinding({
      severity: "WARN",
      state: "DONE branch_pr tasks still have open or unmerged PR artifacts",
      likelyCause:
        "the task was marked DONE, but its branch_pr PR artifacts were never reconciled to MERGED and the task branch still exists",
      nextAction: {
        command: "agentplane task normalize --sync-branch-pr-state --task-id <task-id>",
        reason:
          "reconcile the shipped task's local branch_pr state and PR artifacts to MERGED without scanning unrelated task history",
      },
      details: [
        `Affected tasks: ${matches.length}`,
        examples ? `Examples: ${examples}` : "Examples unavailable.",
      ],
    }),
  ];
}

export async function checkBranchPrBatchIncludedTaskDrift(ctx?: CommandContext): Promise<string[]> {
  if (!ctx || !backendUsesLocalTaskStore(ctx) || ctx.config.workflow_mode !== "branch_pr") {
    return [];
  }

  let tasks: TaskData[] = [];
  try {
    tasks = await listTasksMemo(ctx);
  } catch {
    return [];
  }
  if (tasks.length === 0) return [];

  const byId = new Map(tasks.map((task) => [task.id, task]));
  const matches: string[] = [];
  for (const primary of tasks) {
    if (String(primary.status).toUpperCase() !== "DONE") continue;
    const meta = await readTaskPrMeta(ctx, primary.id);
    if (meta?.status !== "MERGED") continue;
    const includedTaskIds = resolvePrBatchIncludedTaskIds(meta);
    if (includedTaskIds.length === 0) continue;
    const primaryCommit =
      resolveLocalMergedPrMeta(meta)?.mergeCommit ??
      meta.merge_commit?.trim() ??
      primary.commit?.hash?.trim() ??
      meta.head_sha?.trim() ??
      "";
    for (const includedTaskId of includedTaskIds) {
      const included = byId.get(includedTaskId) ?? null;
      const includedStatus = String(included?.status ?? "MISSING").toUpperCase();
      const includedCommit = included?.commit?.hash?.trim() ?? "";
      if (includedStatus === "DONE" && includedCommit === primaryCommit) continue;
      matches.push(
        `${primary.id}->${includedTaskId} primary_commit=${primaryCommit.slice(0, 12) || "-"} included_status=${includedStatus} included_commit=${includedCommit.slice(0, 12) || "-"}`,
      );
    }
  }
  if (matches.length === 0) return [];

  return [
    renderDiagnosticFinding({
      severity: "WARN",
      state: "branch_pr batch included tasks are not closed with their primary PR",
      likelyCause:
        "a primary branch_pr batch PR was closed, but one or more included task ids from pr/meta.json were not reconciled to the same merge commit",
      nextAction: {
        command: "agentplane task hosted-close-pr <primary-task-id>",
        reason:
          "open or recover the hosted task-close PR for the primary batch task, then verify included tasks record the same merge commit",
      },
      details: [
        `Affected included tasks: ${matches.length}`,
        `Examples: ${matches.slice(0, 5).join(", ")}`,
      ],
    }),
  ];
}

async function readDoneTaskSnapshot(ctx: CommandContext): Promise<TaskData[]> {
  let tasks: TaskData[] = [];
  try {
    tasks = await listTasksMemo(ctx);
  } catch {
    tasks = [];
  }
  if (tasks.length > 0) return tasks;
  return await readTaskReadmeSnapshot(ctx);
}

async function readTaskPrMeta(ctx: CommandContext, taskId: string) {
  const metaPath = path.join(
    ctx.resolvedProject.gitRoot,
    ctx.config.paths.workflow_dir,
    taskId,
    "pr",
    "meta.json",
  );
  try {
    return parsePrMeta(await readFile(metaPath, "utf8"), taskId);
  } catch {
    return null;
  }
}

async function readTaskReadmeSnapshot(ctx: CommandContext): Promise<TaskData[]> {
  const tasksDir = path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir);
  let entries: Dirent[];
  try {
    entries = await readdir(tasksDir, { withFileTypes: true });
  } catch {
    return [];
  }

  const tasks: TaskData[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const text = await readFile(path.join(tasksDir, entry.name, "README.md"), "utf8");
      tasks.push(parseTaskReadme(text).frontmatter as TaskData);
    } catch {
      continue;
    }
  }
  return tasks;
}
