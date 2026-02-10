import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskSearch } from "./search.js";
import type { TaskListFilters } from "./shared.js";
import { toStringList } from "../../cli/spec/parse-utils.js";

export type TaskSearchParsed = {
  query: string;
  regex: boolean;
  filters: TaskListFilters;
};

export const taskSearchSpec: CommandSpec<TaskSearchParsed> = {
  id: ["task", "search"],
  group: "Task",
  summary: "Search tasks by text or regex with optional filters.",
  args: [{ name: "query", required: true, valueHint: "<query>" }],
  options: [
    { kind: "boolean", name: "regex", default: false, description: "Treat query as a regex." },
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
    { kind: "string", name: "limit", valueHint: "<n>", description: "Max rows to print." },
  ],
  examples: [
    { cmd: "agentplane task search cli", why: "Search tasks by substring." },
    { cmd: "agentplane task search 'CLI.*' --regex", why: "Search tasks by regex." },
  ],
  validateRaw: (raw) => {
    const q = String(raw.args.query ?? "").trim();
    if (!q) {
      throw usageError({
        spec: taskSearchSpec,
        message: "Missing query (expected non-empty text)",
      });
    }
    for (const key of ["status", "owner", "tag"] as const) {
      const list = toStringList(raw.opts[key]);
      if (list.some((s) => s.trim() === "")) {
        throw usageError({ spec: taskSearchSpec, message: `Invalid value for --${key}: empty.` });
      }
    }
    if (raw.opts.limit !== undefined) {
      const limitRaw = raw.opts.limit;
      if (typeof limitRaw !== "string") {
        throw usageError({
          spec: taskSearchSpec,
          message: `Invalid value for --limit: ${JSON.stringify(limitRaw)} (expected integer)`,
        });
      }
      const parsed = Number.parseInt(limitRaw, 10);
      if (Number.isFinite(parsed)) {
        // ok
      } else {
        throw usageError({
          spec: taskSearchSpec,
          message: `Invalid value for --limit: ${limitRaw} (expected integer)`,
        });
      }
    }
  },
  parse: (raw) => ({
    query: String(raw.args.query),
    regex: raw.opts.regex === true,
    filters: {
      status: toStringList(raw.opts.status),
      owner: toStringList(raw.opts.owner),
      tag: toStringList(raw.opts.tag),
      limit: typeof raw.opts.limit === "string" ? Number.parseInt(raw.opts.limit, 10) : undefined,
      quiet: true,
    },
  }),
};

export function makeRunTaskSearchHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskSearchParsed): Promise<number> => {
    return await cmdTaskSearch({
      ctx: await getCtx("task search"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      query: p.query,
      regex: p.regex,
      filters: p.filters,
    });
  };
}
