import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskVerifyRework } from "./verify-record.js";
import {
  parseVerifyCommonOptions,
  validateVerifyDetailsFileExclusive,
  validateVerifyNonEmptyInput,
  verifyCommonOptions,
  type VerifyCommonParsed,
} from "./verify-command-shared.js";

export type TaskVerifyReworkParsed = VerifyCommonParsed & {
  taskId: string;
};

export const taskVerifyReworkSpec: CommandSpec<TaskVerifyReworkParsed> = {
  id: ["task", "verify", "rework"],
  group: "Task",
  summary:
    "Record verification as needs rework (resets commit, sets status to DOING, updates Verification).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: verifyCommonOptions,
  examples: [
    {
      cmd: 'agentplane task verify rework 202602030608-F1Q8AB --by REVIEWER --note "Needs changes"',
      why: "Record a needs-rework verification.",
    },
  ],
  validateRaw: (raw) => {
    validateVerifyDetailsFileExclusive(raw, taskVerifyReworkSpec, {
      message: "Provide at most one of --details or --file.",
    });
    validateVerifyNonEmptyInput(raw, taskVerifyReworkSpec, "by");
    validateVerifyNonEmptyInput(raw, taskVerifyReworkSpec, "note");
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    ...parseVerifyCommonOptions(raw),
  }),
};

export function makeRunTaskVerifyReworkHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskVerifyReworkParsed): Promise<number> => {
    return await cmdTaskVerifyRework({
      ctx: await getCtx("task verify rework"),
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
