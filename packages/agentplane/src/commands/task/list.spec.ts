import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

import type { TaskListFilters } from "./shared.js";
import { toStringList } from "../../cli/spec/parse-utils.js";

export type TaskListParsed = { filters: TaskListFilters };

export const taskListSpec: CommandSpec<TaskListParsed> = {
  id: ["task", "list"],
  group: "Task",
  summary: "List tasks with compact resolved blueprint route hints.",
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
    {
      kind: "boolean",
      name: "strict-read",
      default: false,
      description: "Fail if task scan skips malformed/unreadable task files.",
    },
    { kind: "string", name: "limit", valueHint: "<n>", description: "Max rows to print." },
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
    if (raw.opts.limit !== undefined) {
      const limitRaw = raw.opts.limit;
      if (typeof limitRaw !== "string") {
        throw usageError({
          spec: taskListSpec,
          message: `Invalid value for --limit: ${JSON.stringify(limitRaw)} (expected integer)`,
        });
      }
      const parsed = Number.parseInt(limitRaw, 10);
      if (!Number.isFinite(parsed)) {
        throw usageError({
          spec: taskListSpec,
          message: `Invalid value for --limit: ${limitRaw} (expected integer)`,
        });
      }
    }
  },
  parse: (raw) => ({
    filters: {
      status: toStringList(raw.opts.status),
      owner: toStringList(raw.opts.owner),
      tag: toStringList(raw.opts.tag),
      limit: typeof raw.opts.limit === "string" ? Number.parseInt(raw.opts.limit, 10) : undefined,
      quiet: raw.opts.quiet === true,
      strictRead: raw.opts["strict-read"] === true,
    },
  }),
};
