import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdTaskNormalize } from "../task/normalize.js";

export type ReleaseTasksReconcileParsed = {
  taskIds: string[];
  quiet: boolean;
};

export const releaseTasksReconcileSpec: CommandSpec<ReleaseTasksReconcileParsed> = {
  id: ["release", "tasks", "reconcile"],
  group: "Release",
  summary: "Reconcile release-blocking branch_pr task closure metadata.",
  options: [
    {
      kind: "string",
      name: "task-id",
      valueHint: "<task-id>",
      repeatable: true,
      description: "Repeatable. Limit reconciliation to explicit release-blocking task ids.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: "agentplane release tasks reconcile --task-id 202605281707-6MNB2K",
      why: "Reconcile a known verified branch_pr task whose landed commit reached the base branch.",
    },
  ],
  validateRaw: (raw) => {
    const taskIds = (raw.opts["task-id"] as string[] | undefined) ?? [];
    for (const taskId of taskIds) {
      if (typeof taskId !== "string" || taskId.trim().length === 0) {
        throw usageError({
          spec: releaseTasksReconcileSpec,
          message: "Invalid value for --task-id: empty.",
        });
      }
    }
  },
  parse: (raw) => ({
    taskIds: ((raw.opts["task-id"] as string[] | undefined) ?? []).map((taskId) => taskId.trim()),
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunReleaseTasksReconcileHandler(
  getCtx: (cmd: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, p: ReleaseTasksReconcileParsed): Promise<number> => {
    return await cmdTaskNormalize({
      ctx: await getCtx("release tasks reconcile"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      quiet: p.quiet,
      force: false,
      yes: false,
      syncHostedMerges: true,
      syncBranchPrState: true,
      taskIds: p.taskIds,
    });
  };
}
