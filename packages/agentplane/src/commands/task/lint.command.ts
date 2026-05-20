import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";

import { cmdTaskLint } from "./lint.js";

export type TaskLintParsed = {
  verifySteps: boolean;
};

export const taskLintSpec: CommandSpec<TaskLintParsed> = {
  id: ["task", "lint"],
  group: "Task",
  summary: "Lint the exported tasks JSON file (schema + invariants).",
  options: [
    {
      kind: "boolean",
      name: "verify-steps",
      default: false,
      description:
        "Also lint task README Verify Steps for executed output or empty Run commands. Useful before enabling strict rollout.",
    },
  ],
  examples: [{ cmd: "agentplane task lint", why: "Validate the tasks export file." }],
  parse: (raw) => ({ verifySteps: raw.opts["verify-steps"] === true }),
};

export async function runTaskLint(ctx: CommandCtx, parsed: TaskLintParsed): Promise<number> {
  return await cmdTaskLint({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    verifySteps: parsed.verifySteps,
  });
}
