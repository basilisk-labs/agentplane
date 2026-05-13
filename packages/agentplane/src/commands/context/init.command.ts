import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextInit } from "./init.js";
import type { ContextInitParsed } from "./context.spec.js";
import { contextInitSpec } from "./context.spec.js";

export { contextInitSpec } from "./context.spec.js";

export function makeRunContextInitHandler(
  getCtx: (commandForError: string) => Promise<CommandContext>,
) {
  return async (ctx: CommandCtx, parsed: ContextInitParsed): Promise<number> => {
    const commandCtx = await getCtx("context init");
    return cmdContextInit({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      parsed,
    });
  };
}
