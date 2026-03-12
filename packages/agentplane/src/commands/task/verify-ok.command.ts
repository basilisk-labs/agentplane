import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskVerifyOk } from "./verify-record.js";
import {
  parseVerifyCommonOptions,
  validateVerifyDetailsFileExclusive,
  validateVerifyNonEmptyInput,
  verifyCommonOptions,
  type VerifyCommonParsed,
} from "./verify-command-shared.js";

export type TaskVerifyOkParsed = VerifyCommonParsed & {
  taskId: string;
};

export const taskVerifyOkSpec: CommandSpec<TaskVerifyOkParsed> = {
  id: ["task", "verify", "ok"],
  group: "Task",
  summary: "Record verification as OK (updates Verification section and verification frontmatter).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: verifyCommonOptions,
  examples: [
    {
      cmd: 'agentplane task verify ok 202602030608-F1Q8AB --by REVIEWER --note "Looks good"',
      why: "Record an OK verification.",
    },
  ],
  validateRaw: (raw) => {
    validateVerifyDetailsFileExclusive(raw, taskVerifyOkSpec, {
      message: "Provide at most one of --details or --file.",
    });
    validateVerifyNonEmptyInput(raw, taskVerifyOkSpec, "by");
    validateVerifyNonEmptyInput(raw, taskVerifyOkSpec, "note");
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    ...parseVerifyCommonOptions(raw),
  }),
};

export function makeRunTaskVerifyOkHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskVerifyOkParsed): Promise<number> => {
    return await cmdTaskVerifyOk({
      ctx: await getCtx("task verify ok"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      by: p.by,
      note: p.note,
      details: p.details,
      file: p.file,
      quiet: p.quiet,
    });
  };
}
