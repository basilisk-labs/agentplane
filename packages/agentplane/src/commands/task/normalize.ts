import { mapBackendError } from "../../cli/error-map.js";
import { successMessage } from "../../cli/output.js";
import { ensureActionApproved } from "../shared/approval-requirements.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { applyTaskCollectionMutation } from "../shared/task-mutation.js";
import { syncHostedMergedTasks, syncLocallyShippedBranchPrTasks } from "./hosted-merge-sync.js";

export async function cmdTaskNormalize(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
  force: boolean;
  yes?: boolean;
  syncHostedMerges?: boolean;
  syncBranchPrState?: boolean;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    if (opts.force) {
      await ensureActionApproved({
        action: "force_action",
        config: ctx.config,
        yes: opts.yes === true,
        reason: "task normalize --force",
      });
    }
    if (
      ctx.taskBackend.normalizeTasks &&
      opts.syncHostedMerges !== true &&
      opts.syncBranchPrState !== true
    ) {
      const result = await ctx.taskBackend.normalizeTasks();
      if (!opts.quiet) {
        process.stdout.write(
          `${successMessage("normalized tasks", undefined, `scanned=${result.scanned} changed=${result.changed}`)}\n`,
        );
      }
      return 0;
    }

    let syncedHostedMerges = 0;
    let syncedBranchPrState = 0;
    const { result, tasksToWrite } = await applyTaskCollectionMutation({
      ctx,
      build: async (tasks) => {
        let nextTasks = tasks;
        if (opts.syncHostedMerges === true) {
          const synced = await syncHostedMergedTasks({ ctx, tasks });
          nextTasks = synced.tasks;
          syncedHostedMerges = synced.synced;
        }
        if (opts.syncBranchPrState === true) {
          const synced = await syncLocallyShippedBranchPrTasks({ ctx, tasks: nextTasks });
          nextTasks = synced.tasks;
          syncedBranchPrState = synced.synced;
        }
        return {
          result: null,
          tasksToWrite: nextTasks,
        };
      },
    });
    void result;
    if (!opts.quiet) {
      process.stdout.write(
        `${successMessage(
          "normalized tasks",
          undefined,
          `count=${tasksToWrite.length}${
            opts.syncHostedMerges === true ? ` synced_hosted_merges=${syncedHostedMerges}` : ""
          }${
            opts.syncBranchPrState === true ? ` synced_branch_pr_state=${syncedBranchPrState}` : ""
          }`,
        )}\n`,
      );
    }
    return 0;
  } catch (err) {
    throw mapBackendError(err, { command: "task normalize", root: opts.rootOverride ?? null });
  }
}
