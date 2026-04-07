import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskNormalize } from "./normalize.js";

export type TaskNormalizeParsed = {
  quiet: boolean;
  force: boolean;
  yes: boolean;
  syncHostedMerges: boolean;
  syncBranchPrState: boolean;
  taskIds: string[];
};

export const taskNormalizeSpec: CommandSpec<TaskNormalizeParsed> = {
  id: ["task", "normalize"],
  group: "Task",
  summary: "Normalize tasks in the configured backend (stable ordering and formatting).",
  options: [
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Accepted for parity; currently has no additional checks in the node CLI.",
    },
    {
      kind: "boolean",
      name: "yes",
      default: false,
      description: "Auto-approve force-action approval checks when required.",
    },
    {
      kind: "boolean",
      name: "sync-hosted-merges",
      default: false,
      description:
        "Query GitHub for merged hosted PRs referenced by local PR artifacts and reconcile stale branch_pr task state before normalization.",
    },
    {
      kind: "boolean",
      name: "sync-branch-pr-state",
      default: false,
      description:
        "Reconcile stale local branch_pr task state when verified task commits already landed on the base branch.",
    },
    {
      kind: "string",
      name: "task-id",
      valueHint: "<task-id>",
      repeatable: true,
      description:
        "Repeatable. Limit reconcile modes to explicit task ids instead of scanning every task.",
    },
  ],
  examples: [
    { cmd: "agentplane task normalize", why: "Normalize tasks and print a short summary." },
    { cmd: "agentplane task normalize --quiet", why: "Normalize tasks without printing output." },
    {
      cmd: "agentplane task normalize --sync-hosted-merges",
      why: "Reconcile stale branch_pr task state from hosted PR merges, then normalize the local projection.",
    },
    {
      cmd: "agentplane task normalize --sync-branch-pr-state",
      why: "Reconcile locally shipped branch_pr task state when task commits already reached the base branch.",
    },
    {
      cmd: "agentplane task normalize --sync-hosted-merges --task-id 202604071853-XGX2YJ",
      why: "Reconcile only known stale tasks instead of scanning unrelated historical PR metadata.",
    },
  ],
  validateRaw: (raw) => {
    const taskIds = (raw.opts["task-id"] as string[] | undefined) ?? [];
    if (
      taskIds.length > 0 &&
      raw.opts["sync-hosted-merges"] !== true &&
      raw.opts["sync-branch-pr-state"] !== true
    ) {
      throw usageError({
        spec: taskNormalizeSpec,
        message: "--task-id requires --sync-hosted-merges and/or --sync-branch-pr-state.",
      });
    }
    for (const taskId of taskIds) {
      if (typeof taskId !== "string" || taskId.trim().length === 0) {
        throw usageError({
          spec: taskNormalizeSpec,
          message: "Invalid value for --task-id: empty.",
        });
      }
    }
  },
  parse: (raw) => ({
    quiet: raw.opts.quiet === true,
    force: raw.opts.force === true,
    yes: raw.opts.yes === true,
    syncHostedMerges: raw.opts["sync-hosted-merges"] === true,
    syncBranchPrState: raw.opts["sync-branch-pr-state"] === true,
    taskIds: ((raw.opts["task-id"] as string[] | undefined) ?? []).map((taskId) => taskId.trim()),
  }),
};

export function makeRunTaskNormalizeHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskNormalizeParsed): Promise<number> => {
    return await cmdTaskNormalize({
      ctx: await getCtx("task normalize"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      quiet: p.quiet,
      force: p.force,
      yes: p.yes,
      syncHostedMerges: p.syncHostedMerges,
      syncBranchPrState: p.syncBranchPrState,
      taskIds: p.taskIds,
    });
  };
}
