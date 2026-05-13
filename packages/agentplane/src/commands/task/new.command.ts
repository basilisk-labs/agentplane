import type { CommandHandler, CommandCtx } from "../../cli/spec/spec.js";
import { makeExecutionContext } from "../../runtime/execution-context.js";
import { throwIfPolicyDecisionDenied } from "../shared/policy-deny.js";

import type { TaskNewParsed } from "./new.js";
import type { CommandContext } from "../shared/task-backend.js";
import { runTaskNewParsed } from "./new.js";

export { taskNewSpec } from "./new.spec.js";

export function makeRunTaskNewHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<TaskNewParsed> {
  return async (ctx: CommandCtx, p: TaskNewParsed) => {
    const command = await getCtx("task new");
    const execution = await makeExecutionContext(command);
    throwIfPolicyDecisionDenied(
      execution.policy.evaluate({
        action: "task_new",
        phase: "plan",
        config: execution.config,
        taskId: "",
        git: { stagedPaths: [] },
      }),
    );

    return await runTaskNewParsed({
      ctx: execution.command,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      parsed: p,
    });
  };
}
