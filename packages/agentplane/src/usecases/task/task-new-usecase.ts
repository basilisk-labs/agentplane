import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import type { TaskNewParsed } from "../../commands/task/new.js";
import { runTaskNewParsed } from "../../commands/task/new.js";

import { makeUsecaseContext } from "../context/resolve-context.js";

export async function taskNewUsecase(opts: {
  cli: CommandCtx;
  command: CommandContext;
  parsed: TaskNewParsed;
}): Promise<number> {
  const uctx = makeUsecaseContext(opts.command);
  void uctx.policy.evaluate({
    action: "task_new",
    config: uctx.command.config,
    taskId: "",
    git: { stagedPaths: [] },
  });

  return await runTaskNewParsed({
    ctx: uctx.command,
    cwd: opts.cli.cwd,
    rootOverride: opts.cli.rootOverride,
    parsed: opts.parsed,
  });
}
