import type { CommandCtx } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdFinish } from "./task/finish.js";
import { finishSpec, type FinishParsed } from "./finish.spec.js";

export function makeRunFinishHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: FinishParsed): Promise<number> => {
    if (p.taskIds.length === 0) {
      throw usageError({
        spec: finishSpec,
        command: "finish",
        message: "Missing required argument: task-id",
      });
    }
    return await cmdFinish({
      ctx: await getCtx("finish"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskIds: p.taskIds,
      author: p.author,
      body: p.body,
      result: p.result,
      risk: p.risk,
      breaking: p.breaking,
      commit: p.commit,
      force: p.force,
      yes: p.yes,
      commitFromComment: p.commitFromComment,
      commitEmoji: p.commitEmoji,
      commitAllow: p.commitAllow,
      commitAutoAllow: p.commitAutoAllow,
      commitAllowTasks: p.commitAllowTasks,
      commitRequireClean: p.commitRequireClean,
      statusCommit: p.statusCommit,
      statusCommitEmoji: p.statusCommitEmoji,
      statusCommitAllow: p.statusCommitAllow,
      statusCommitAutoAllow: p.statusCommitAutoAllow,
      statusCommitRequireClean: p.statusCommitRequireClean,
      confirmStatusCommit: p.confirmStatusCommit,
      closeCommit: p.closeCommit,
      closeUnstageOthers: p.closeUnstageOthers,
      quiet: p.quiet,
    });
  };
}
