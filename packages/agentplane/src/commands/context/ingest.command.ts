/* eslint-disable @typescript-eslint/no-unused-vars */
import type { CommandCtx } from "../../cli/spec/spec.js";
import { makeReadOnlyExecutionContext } from "../../runtime/execution-context.js";
import type { CommandContext } from "../shared/task-backend.js";
import { cmdContextIngest, type ContextIngestParsed } from "./ingest.js";
import { contextIngestSpec } from "./ingest.spec.js";

export { contextIngestSpec } from "./ingest.spec.js";

export function makeRunContextIngestHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, parsed: ContextIngestParsed): Promise<number> => {
    const commandCtx = await getCtx("context ingest");
    const execution = await makeReadOnlyExecutionContext(commandCtx);
    void execution.policy.evaluate({
      action: "task_new",
      config: execution.config,
      taskId: "",
      git: { stagedPaths: [] },
    });
    return await cmdContextIngest({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      parsed,
    });
  };
}
