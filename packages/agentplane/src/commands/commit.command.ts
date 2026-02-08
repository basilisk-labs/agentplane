import type { CommandCtx } from "../cli/spec/spec.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdCommit } from "./guard/index.js";

import type { CommitParsed } from "./commit.spec.js";
export { commitSpec } from "./commit.spec.js";

export function makeRunCommitHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: CommitParsed): Promise<number> => {
    return await cmdCommit({
      ctx: await getCtx("commit"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      message: p.message ?? "",
      close: p.close,
      allow: p.allow,
      autoAllow: p.autoAllow,
      allowTasks: p.allowTasks,
      allowBase: p.allowBase,
      allowPolicy: p.allowPolicy,
      allowConfig: p.allowConfig,
      allowHooks: p.allowHooks,
      allowCI: p.allowCI,
      requireClean: p.requireClean,
      quiet: p.quiet,
    });
  };
}
