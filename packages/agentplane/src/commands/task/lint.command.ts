import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";

import { cmdTaskLint } from "./lint.js";

export type TaskLintParsed = Record<string, never>;

export const taskLintSpec: CommandSpec<TaskLintParsed> = {
  id: ["task", "lint"],
  group: "Task",
  summary: "Lint the exported tasks JSON file (schema + invariants).",
  examples: [{ cmd: "agentplane task lint", why: "Validate the tasks export file." }],
  parse: () => ({}),
};

export async function runTaskLint(ctx: CommandCtx): Promise<number> {
  return await cmdTaskLint({ cwd: ctx.cwd, rootOverride: ctx.rootOverride });
}
