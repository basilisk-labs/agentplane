import type { TaskData } from "../../backends/task-backend.js";
import { renderDiagnosticFinding } from "../../shared/diagnostics.js";
import type { CommandContext } from "../shared/task-backend.js";
import { findLocallyShippedBranchPrTasks } from "../task/hosted-merge-sync.js";

export async function checkBranchPrShippedTaskDrift(ctx?: CommandContext): Promise<string[]> {
  if (ctx?.backendId !== "local" || ctx.config.workflow_mode !== "branch_pr") return [];

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
