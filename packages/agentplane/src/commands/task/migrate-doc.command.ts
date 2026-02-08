import type { CommandCtx, CommandSpec, ParsedRaw } from "../../cli2/spec.js";
import { usageError } from "../../cli2/errors.js";

import { cmdTaskMigrateDoc } from "./migrate-doc.js";

export type TaskMigrateDocParsed = {
  all: boolean;
  quiet: boolean;
  taskIds: string[];
};

function normalizeTaskIdsArg(raw: ParsedRaw): string[] {
  const value = raw.args["task-id"];
  if (Array.isArray(value))
    return value.filter((v) => typeof v === "string" && v.trim().length > 0);
  if (typeof value === "string" && value.trim().length > 0) return [value];
  return [];
}

export const taskMigrateDocSpec: CommandSpec<TaskMigrateDocParsed> = {
  id: ["task", "migrate-doc"],
  group: "Task",
  summary: "Migrate task README docs to the current template/metadata format.",
  args: [{ name: "task-id", required: false, variadic: true, valueHint: "<task-id>" }],
  options: [
    { kind: "boolean", name: "all", default: false, description: "Migrate all task READMEs." },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
  ],
  examples: [
    { cmd: "agentplane task migrate-doc --all", why: "Migrate all task READMEs." },
    {
      cmd: "agentplane task migrate-doc 202602030608-F1Q8AB 202602030609-ABCDEF",
      why: "Migrate specific task READMEs.",
    },
  ],
  validateRaw: (raw) => {
    const all = raw.opts.all === true;
    const taskIds = normalizeTaskIdsArg(raw);
    const hasIds = taskIds.length > 0;
    if (all && hasIds) {
      throw usageError({
        spec: taskMigrateDocSpec,
        message: "Invalid arguments: use either --all or <task-id>..., not both.",
      });
    }
    if (!all && !hasIds) {
      throw usageError({
        spec: taskMigrateDocSpec,
        message: "Missing task ids (provide <task-id>... or use --all).",
      });
    }
  },
  parse: (raw) => {
    return {
      all: raw.opts.all === true,
      quiet: raw.opts.quiet === true,
      taskIds: normalizeTaskIdsArg(raw),
    };
  },
};

export async function runTaskMigrateDoc(ctx: CommandCtx, p: TaskMigrateDocParsed): Promise<number> {
  return await cmdTaskMigrateDoc({
    cwd: ctx.cwd,
    rootOverride: ctx.rootOverride,
    all: p.all,
    quiet: p.quiet,
    taskIds: p.taskIds,
  });
}
