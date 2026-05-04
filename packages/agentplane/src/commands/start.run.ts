import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdStart } from "./task/start.js";
import type { StartParsed } from "./start.spec.js";
import { resolveTextPayload } from "./shared/text-payload.js";

export function makeRunStartHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: StartParsed): Promise<number> => {
    const body = await resolveTextPayload({
      cwd: ctx.cwd,
      inline: p.body,
      file: p.bodyFile,
      label: "start body",
    });
    return await cmdStart({
      ctx: await getCtx("start"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body,
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
