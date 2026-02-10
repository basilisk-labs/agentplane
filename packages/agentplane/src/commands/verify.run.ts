import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdVerifyParsed } from "./task/verify-record.js";
import type { VerifyParsed } from "./verify.spec.js";

export function makeRunVerifyHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: VerifyParsed): Promise<number> => {
    return await cmdVerifyParsed({
      ctx: await getCtx("verify"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      state: p.state,
      by: p.by,
      note: p.note,
      details: p.details,
      file: p.file,
      quiet: p.quiet,
    });
  };
}
