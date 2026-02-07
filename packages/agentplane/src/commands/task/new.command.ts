import type { CommandHandler, CommandCtx, CommandSpec } from "../../cli2/spec.js";
import { normalizeDependsOnInput } from "./shared.js";

import type { TaskNewParsed } from "./new.js";
import { runTaskNewParsed } from "./new.js";
import type { CommandContext } from "../shared/task-backend.js";

export const taskNewSpec: CommandSpec<TaskNewParsed> = {
  id: ["task", "new"],
  group: "Task",
  summary: "Create a new task (prints the generated task id).",
  description:
    "Creates a TODO task with doc_version=2 and writes it via the configured task backend.",
  options: [
    {
      kind: "string",
      name: "title",
      valueHint: "<text>",
      required: true,
      description: "Task title.",
    },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      required: true,
      description: "Task description.",
    },
    {
      kind: "string",
      name: "owner",
      valueHint: "<id>",
      required: true,
      description: "Owner id (e.g. CODER).",
    },
    {
      kind: "string",
      name: "priority",
      valueHint: "<low|normal|med|high>",
      choices: ["low", "normal", "med", "high"],
      default: "med",
      description: "Task priority (default: med).",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      minCount: 1,
      description: "Repeatable. Adds a tag (must provide at least one).",
    },
    {
      kind: "string",
      name: "depends-on",
      valueHint: "<task-id>",
      repeatable: true,
      coerce: (raw) => normalizeDependsOnInput(raw),
      description: "Repeatable. Adds a dependency. Special-case: '[]' is treated as empty.",
    },
    {
      kind: "string",
      name: "verify",
      valueHint: "<command>",
      repeatable: true,
      description: "Repeatable. Verification commands/checks to run for this task.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task new --title "Refactor CLI" --description "Improve CLI output" --owner CODER --tag cli',
      why: "Create a new task with one tag.",
    },
  ],
  notes: [
    "This command may emit warnings for tasks that require Verify Steps in the README (config-dependent).",
  ],
  parse: (raw) => ({
    title: raw.opts.title as string,
    description: raw.opts.description as string,
    owner: raw.opts.owner as string,
    priority: (raw.opts.priority ?? "med") as TaskNewParsed["priority"],
    tags: (raw.opts.tag ?? []) as string[],
    dependsOn: (raw.opts["depends-on"] ?? []) as string[],
    verify: (raw.opts.verify ?? []) as string[],
  }),
};

export function makeRunTaskNewHandler(
  getCtx: (commandForErrorContext: string) => Promise<CommandContext>,
): CommandHandler<TaskNewParsed> {
  return async (ctx: CommandCtx, p: TaskNewParsed) => {
    const commandCtx = await getCtx("task new");
    return await runTaskNewParsed({
      ctx: commandCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      parsed: p,
    });
  };
}
