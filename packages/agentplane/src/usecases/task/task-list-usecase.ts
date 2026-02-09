import type { CommandCtx } from "../../cli/spec/spec.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { cmdTaskList } from "../../commands/task/list.js";

import { makeUsecaseContext } from "../context/resolve-context.js";

export async function taskListUsecase(opts: {
  cli: CommandCtx;
  command: CommandContext;
  filters: Parameters<typeof cmdTaskList>[0]["filters"];
}): Promise<number> {
  const uctx = makeUsecaseContext(opts.command);
  void uctx.policy.evaluate({
    action: "task_list",
    config: uctx.command.config,
    taskId: "",
    git: { stagedPaths: [] },
  });

  return await cmdTaskList({
    ctx: uctx.command,
    cwd: opts.cli.cwd,
    rootOverride: opts.cli.rootOverride,
    filters: opts.filters,
  });
}
