import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";

import { cmdTaskLint } from "./lint.js";

export type TaskLintParsed = {
  verifySteps: boolean;
  verifyStepsChanged: boolean;
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
    {
      kind: "boolean",
      name: "verify-steps-changed",
      default: false,
      description:
        "Lint Verify Steps only for changed task README files, so legacy historical pollution does not block strict rollout.",
    },
  ],
  examples: [{ cmd: "agentplane task lint", why: "Validate the tasks export file." }],
  parse: (raw) => ({
    verifySteps: raw.opts["verify-steps"] === true || raw.opts["verify-steps-changed"] === true,
    verifyStepsChanged: raw.opts["verify-steps-changed"] === true,
  }),
};

export async function runTaskLint(ctx: CommandCtx, parsed: TaskLintParsed): Promise<number> {
  return await cmdTaskLint({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    verifySteps: parsed.verifySteps,
    verifyStepsChanged: parsed.verifyStepsChanged,
  });
}
