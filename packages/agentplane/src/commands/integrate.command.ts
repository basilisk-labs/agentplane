import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";
import { cmdIntegrate } from "./pr/integrate/cmd.js";
import type { IntegrateParsed } from "./integrate.spec.js";

export function makeRunIntegrateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: IntegrateParsed): Promise<number> => {
    return await cmdIntegrate({
      ctx: await getCtx("integrate"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      branch: p.branch ?? undefined,
      base: p.base ?? undefined,
      mergeStrategy: p.mergeStrategy,
      runVerify: p.runVerify,
      dryRun: p.dryRun,
      quiet: p.quiet,
    });
  };
}
