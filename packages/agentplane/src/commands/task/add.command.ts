import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskAdd } from "./add.js";
import { normalizeDependsOnInput } from "./shared.js";

export type TaskAddParsed = {
  taskIds: string[];
  title: string;
  description: string;
  status: "TODO" | "DOING" | "DONE" | "BLOCKED";
  priority: "low" | "normal" | "med" | "high";
  owner: string;
  tags: string[];
  dependsOn: string[];
  verify: string[];
  commentAuthor: string | null;
  commentBody: string | null;
};

export const taskAddSpec: CommandSpec<TaskAddParsed> = {
  id: ["task", "add"],
  group: "Task",
  summary: "Create one or more tasks with explicit ids (prints the created task ids).",
  args: [{ name: "task-id", required: true, variadic: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "title", valueHint: "<text>", required: true, description: "Title." },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      required: true,
      description: "Description.",
    },
    {
      kind: "string",
      name: "status",
      valueHint: "<TODO|DOING|DONE|BLOCKED>",
      choices: ["TODO", "DOING", "DONE", "BLOCKED"],
      default: "TODO",
      description: "Initial status (default: TODO).",
    },
    {
      kind: "string",
      name: "priority",
      valueHint: "<low|normal|med|high>",
      choices: ["low", "normal", "med", "high"],
      required: true,
      description: "Task priority.",
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
    {
      kind: "string",
      name: "comment-author",
      valueHint: "<id>",
      description: "Optional. Adds a comment author (requires --comment-body).",
    },
    {
      kind: "string",
      name: "comment-body",
      valueHint: "<text>",
      description: "Optional. Adds a comment body (requires --comment-author).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task add 202602030608-F1Q8AB --title "Refactor CLI" --description "Spec-driven CLI" --priority med --owner CODER --tag cli',
      why: "Create a task with an explicit id.",
    },
    {
      cmd: 'agentplane task add 202602030608-F1Q8AB 202602030608-ZZZZZZ --title "Refactor CLI" --description "Spec-driven CLI" --priority med --owner CODER --tag cli',
      why: "Create multiple tasks with shared metadata.",
    },
  ],
  validateRaw: (raw) => {
    for (const k of ["title", "description", "owner"] as const) {
      const v = raw.opts[k];
      if (typeof v === "string" && v.trim() === "") {
        throw usageError({ spec: taskAddSpec, message: `Invalid value for --${k}: empty.` });
      }
    }

    const tags = toStringList(raw.opts.tag);
    if (tags.some((t) => t.trim() === "")) {
      throw usageError({ spec: taskAddSpec, message: "Invalid value for --tag: empty." });
    }

    const commentAuthor = raw.opts["comment-author"];
    const commentBody = raw.opts["comment-body"];
    const hasAuthor = typeof commentAuthor === "string" && commentAuthor.trim() !== "";
    const hasBody = typeof commentBody === "string" && commentBody.trim() !== "";
    if (hasAuthor !== hasBody) {
      throw usageError({
        spec: taskAddSpec,
        message: "Both --comment-author and --comment-body must be provided together.",
      });
    }
  },
  parse: (raw) => {
    const taskIds = Array.isArray(raw.args["task-id"]) ? raw.args["task-id"].map(String) : [];
    const tags = toStringList(raw.opts.tag);
    const dependsOn = toStringList(raw.opts["depends-on"]);
    const verify = toStringList(raw.opts.verify);
    const commentAuthor =
      typeof raw.opts["comment-author"] === "string" ? raw.opts["comment-author"] : null;
    const commentBody =
      typeof raw.opts["comment-body"] === "string" ? raw.opts["comment-body"] : null;

    return {
      taskIds,
      title: String(raw.opts.title),
      description: String(raw.opts.description),
      status: (raw.opts.status ?? "TODO") as TaskAddParsed["status"],
      priority: raw.opts.priority as TaskAddParsed["priority"],
      owner: String(raw.opts.owner),
      tags,
      dependsOn,
      verify,
      commentAuthor,
      commentBody,
    };
  },
};

export function makeRunTaskAddHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskAddParsed): Promise<number> => {
    return await cmdTaskAdd({
      ctx: await getCtx("task add"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskIds: p.taskIds,
      title: p.title,
      description: p.description,
      status: p.status,
      priority: p.priority,
      owner: p.owner,
      tags: p.tags,
      dependsOn: p.dependsOn,
      verify: p.verify,
      commentAuthor: p.commentAuthor,
      commentBody: p.commentBody,
    });
  };
}
