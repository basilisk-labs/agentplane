import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import type { TaskListFilters } from "./shared.js";
import { taskListUsecase } from "../../usecases/task/task-list-usecase.js";
import { toStringList } from "../../cli/spec/parse-utils.js";

export type TaskListParsed = { filters: TaskListFilters };

export const taskListSpec: CommandSpec<TaskListParsed> = {
  id: ["task", "list"],
  group: "Task",
  summary: "List tasks (optionally filtered by status/owner/tag).",
  options: [
    {
      kind: "string",
      name: "status",
      valueHint: "<status>",
      repeatable: true,
      description: "Repeatable. Filter by status.",
    },
    {
      kind: "string",
      name: "owner",
      valueHint: "<owner>",
      repeatable: true,
      description: "Repeatable. Filter by owner id.",
    },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Repeatable. Filter by tag.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress summary output." },
  ],
  examples: [
    { cmd: "agentplane task list", why: "List all tasks." },
    { cmd: "agentplane task list --status TODO --owner CODER", why: "List filtered tasks." },
  ],
  validateRaw: (raw) => {
    for (const key of ["status", "owner", "tag"] as const) {
      const list = toStringList(raw.opts[key]);
      if (list.some((s) => s.trim() === "")) {
        throw usageError({ spec: taskListSpec, message: `Invalid value for --${key}: empty.` });
      }
    }
  },
  parse: (raw) => ({
    filters: {
      status: toStringList(raw.opts.status),
      owner: toStringList(raw.opts.owner),
      tag: toStringList(raw.opts.tag),
      quiet: raw.opts.quiet === true,
    },
  }),
};

export function makeRunTaskListHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskListParsed): Promise<number> => {
    return await taskListUsecase({
      cli: ctx,
      command: await getCtx("task list"),
      filters: p.filters,
    });
  };
}
