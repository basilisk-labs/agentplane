import type { CommandCtx } from "../../cli/spec/spec.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { GuardCommitParsed } from "./commit.spec.js";

import { cmdGuardCommit } from "./index.js";

export { guardCommitSpec } from "./commit.spec.js";

export function makeRunGuardCommitHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: GuardCommitParsed): Promise<number> => {
    const cmdCtx = await getCtx("guard commit");
    if (p.autoAllow) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "--auto-allow is disabled; pass explicit --allow <path-prefix>.",
      });
    }

    return await cmdGuardCommit({
      ctx: cmdCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      message: p.message,
      allow: p.allow,
      allowBase: p.allowBase,
      allowTasks: p.allowTasks,
      allowPolicy: p.allowPolicy,
      allowConfig: p.allowConfig,
      allowHooks: p.allowHooks,
      allowCI: p.allowCI,
      requireClean: p.requireClean,
      quiet: p.quiet,
    });
  };
}
