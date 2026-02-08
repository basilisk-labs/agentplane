import type { CommandHandler, CommandSpec, CommandCtx } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

import type { CommandContext } from "../shared/task-backend.js";
import { cmdWorkStart } from "./index.js";

export type WorkStartParsed = {
  taskId: string;
  agent: string;
  slug: string;
  worktree: boolean;
};

export const workStartSpec: CommandSpec<WorkStartParsed> = {
  id: ["work", "start"],
  group: "Work",
  summary: "Create or switch to the task branch (optionally via git worktree).",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>", description: "Existing task id." },
  ],
  options: [
    {
      kind: "string",
      name: "agent",
      valueHint: "<ID>",
      required: true,
      pattern: /^[A-Z0-9_]+$/,
      patternHint: "A–Z, 0–9, underscore",
      description: "Agent id (uppercase letters, numbers, underscore).",
    },
    {
      kind: "string",
      name: "slug",
      valueHint: "<slug>",
      required: true,
      pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      patternHint: "lowercase kebab-case",
      description: "Branch slug (lowercase kebab-case).",
    },
    {
      kind: "boolean",
      name: "worktree",
      default: false,
      description: "Use git worktree for the task branch. Required when workflow_mode=branch_pr.",
    },
  ],
  examples: [
    {
      cmd: "agentplane work start 202602030608-F1Q8AB --agent CODER --slug cli",
      why: "Start work by checking out / creating the branch in-place (direct mode).",
    },
  ],
  notes: [
    "When workflow_mode=branch_pr, --worktree is required and the command must be run on the base branch.",
  ],
  parse: (raw) => ({
    taskId: raw.args["task-id"] as string,
    agent: raw.opts.agent as string,
    slug: raw.opts.slug as string,
    worktree: Boolean(raw.opts.worktree ?? false),
  }),
};

export function makeRunWorkStartHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<WorkStartParsed> {
  return async (ctx: CommandCtx, p: WorkStartParsed) => {
    const commandCtx = await getCtx("work start");
    const mode = commandCtx.config.workflow_mode;
    if (mode === "branch_pr" && !p.worktree) {
      throw usageError({
        spec: workStartSpec,
        message: "--worktree is required when workflow_mode=branch_pr",
        command: "work start",
      });
    }
    if (mode !== "branch_pr" && p.worktree) {
      throw usageError({
        spec: workStartSpec,
        message: `--worktree is only supported when workflow_mode=branch_pr (current: ${mode})`,
        command: "work start",
      });
    }
    return await cmdWorkStart({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      agent: p.agent,
      slug: p.slug,
      worktree: p.worktree,
    });
  };
}
