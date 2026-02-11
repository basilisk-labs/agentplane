import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdBlock } from "./task/block.js";
import type { BlockParsed } from "./block.spec.js";

export function makeRunBlockHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: BlockParsed): Promise<number> => {
    return await cmdBlock({
      ctx: await getCtx("block"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body: p.body,
      commitFromComment: p.commitFromComment,
      commitEmoji: p.commitEmoji,
      commitAllow: p.commitAllow,
      commitAutoAllow: p.commitAutoAllow,
      commitAllowTasks: p.commitAllowTasks,
      commitRequireClean: p.commitRequireClean,
      confirmStatusCommit: p.confirmStatusCommit,
      force: p.force,
      yes: p.yes,
      quiet: p.quiet,
    });
  };
}
