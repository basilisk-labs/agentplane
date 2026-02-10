import type { CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";

import type { TaskListFilters } from "./shared.js";
import { toStringList } from "../../cli/spec/parse-utils.js";

export type TaskNextParsed = { filters: TaskListFilters };

export const taskNextSpec: CommandSpec<TaskNextParsed> = {
  id: ["task", "next"],
  group: "Task",
  summary: "List ready tasks (default status=TODO) with optional filters.",
  options: [
    {
      kind: "string",
      name: "status",
      valueHint: "<status>",
      repeatable: true,
      description: "Repeatable. Filter by status (default: TODO).",
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
    { kind: "boolean", name: "quiet", default: false, description: "Suppress summary output." },
  ],
  examples: [
    { cmd: "agentplane task next", why: "List ready TODO tasks." },
    { cmd: "agentplane task next --limit 3", why: "Limit output." },
  ],
  validateRaw: (raw) => {
    for (const key of ["status", "owner", "tag"] as const) {
      const list = toStringList(raw.opts[key]);
      if (list.some((s) => s.trim() === "")) {
        throw usageError({ spec: taskNextSpec, message: `Invalid value for --${key}: empty.` });
      }
    }
    if (raw.opts.limit !== undefined) {
      const limitRaw = raw.opts.limit;
      if (typeof limitRaw !== "string") {
        throw usageError({
          spec: taskNextSpec,
          message: `Invalid value for --limit: ${JSON.stringify(limitRaw)} (expected integer)`,
        });
      }
      const parsed = Number.parseInt(limitRaw, 10);
      if (!Number.isFinite(parsed)) {
        throw usageError({
          spec: taskNextSpec,
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
    },
  }),
};
