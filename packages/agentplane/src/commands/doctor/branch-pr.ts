import { readFile } from "node:fs/promises";
import path from "node:path";

import type { TaskData } from "../../backends/task-backend.js";
import { renderDiagnosticFinding } from "../../shared/diagnostics.js";
import { backendUsesLocalTaskStore, type CommandContext } from "../shared/task-backend.js";
import {
  findDoneBranchPrTasksWithOpenPrArtifacts,
  findLocallyShippedBranchPrTasks,
} from "../task/hosted-merge-sync.js";

export async function checkBranchPrShippedTaskDrift(ctx?: CommandContext): Promise<string[]> {
  if (!ctx || !backendUsesLocalTaskStore(ctx) || ctx.config.workflow_mode !== "branch_pr") {
    return [];
  }

  let tasks: TaskData[] = [];
  try {
    tasks = await ctx.taskBackend.listTasks();
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

async function readDoneTaskSnapshot(ctx: CommandContext): Promise<TaskData[]> {
  try {
    const tasks = await ctx.taskBackend.listTasks();
    if (tasks.length > 0) {
      return tasks;
    }
  } catch {
    // Fall back to the legacy export snapshot when the live backend read is unavailable.
  }

  const tasksJsonPath = path.join(ctx.resolvedProject.agentplaneDir, "tasks.json");
  try {
    const raw = await readFile(tasksJsonPath, "utf8");
    const parsed = JSON.parse(raw) as { tasks?: unknown };
    if (!Array.isArray(parsed.tasks)) return [];
    return parsed.tasks.filter((task): task is TaskData => isTaskDataLike(task));
  } catch {
    return [];
  }
}

function isTaskDataLike(value: unknown): value is TaskData {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === "string" && typeof record.status === "string";
}
