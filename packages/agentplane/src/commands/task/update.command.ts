import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskUpdate } from "./update.js";
import { normalizeDependsOnInput } from "./shared.js";

export type TaskUpdateParsed = {
  taskId: string;
  title?: string;
  description?: string;
  priority?: "low" | "normal" | "med" | "high";
  owner?: string;
  tags: string[];
  replaceTags: boolean;
  dependsOn: string[];
  replaceDependsOn: boolean;
  verify: string[];
  replaceVerify: boolean;
};

function toStringList(v: unknown): string[] {
  if (typeof v === "string") return [v];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return [];
}

export const taskUpdateSpec: CommandSpec<TaskUpdateParsed> = {
  id: ["task", "update"],
  group: "Task",
  summary: "Update an existing task.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    { kind: "string", name: "title", valueHint: "<text>", description: "Optional. New title." },
    {
      kind: "string",
      name: "description",
      valueHint: "<text>",
      description: "Optional. New description.",
    },
    {
      kind: "string",
      name: "priority",
      valueHint: "<low|normal|med|high>",
      choices: ["low", "normal", "med", "high"],
      description: "Optional. New priority.",
    },
    { kind: "string", name: "owner", valueHint: "<id>", description: "Optional. New owner id." },
    {
      kind: "string",
      name: "tag",
      valueHint: "<tag>",
      repeatable: true,
      description: "Repeatable. Adds a tag (use --replace-tags to replace).",
    },
    {
      kind: "boolean",
      name: "replace-tags",
      default: false,
      description: "Replace existing tags (instead of merging).",
    },
    {
      kind: "string",
      name: "depends-on",
      valueHint: "<task-id>",
      repeatable: true,
      coerce: (raw) => normalizeDependsOnInput(raw),
      description: "Repeatable. Adds a dependency (use --replace-depends-on to replace).",
    },
    {
      kind: "boolean",
      name: "replace-depends-on",
      default: false,
      description: "Replace existing dependencies (instead of merging).",
    },
    {
      kind: "string",
      name: "verify",
      valueHint: "<command>",
      repeatable: true,
      description: "Repeatable. Adds verification command(s) (use --replace-verify to replace).",
    },
    {
      kind: "boolean",
      name: "replace-verify",
      default: false,
      description: "Replace existing verify commands (instead of merging).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task update 202602030608-F1Q8AB --title "Refactor CLI" --owner CODER',
      why: "Update title and owner.",
    },
    {
      cmd: "agentplane task update 202602030608-F1Q8AB --replace-tags --tag cli --tag code",
      why: "Replace tags.",
    },
    {
      cmd: "agentplane task update 202602030608-F1Q8AB --replace-depends-on --depends-on 202602030608-AAAAAA",
      why: "Replace dependencies.",
    },
  ],
  validateRaw: (raw) => {
    for (const k of ["title", "description", "owner"] as const) {
      const v = raw.opts[k];
      if (typeof v === "string" && v.trim() === "") {
        throw usageError({ spec: taskUpdateSpec, message: `Invalid value for --${k}: empty.` });
      }
    }

    const tags = toStringList(raw.opts.tag);
    if (tags.some((t) => t.trim() === "")) {
      throw usageError({ spec: taskUpdateSpec, message: "Invalid value for --tag: empty." });
    }

    const verify = toStringList(raw.opts.verify);
    if (verify.some((v) => v.trim() === "")) {
      throw usageError({ spec: taskUpdateSpec, message: "Invalid value for --verify: empty." });
    }
  },
  parse: (raw) => {
    const tags = toStringList(raw.opts.tag);
    const dependsOn = toStringList(raw.opts["depends-on"]);
    const verify = toStringList(raw.opts.verify);

    return {
      taskId: String(raw.args["task-id"]),
      title: typeof raw.opts.title === "string" ? raw.opts.title : undefined,
      description: typeof raw.opts.description === "string" ? raw.opts.description : undefined,
      priority: raw.opts.priority as TaskUpdateParsed["priority"],
      owner: typeof raw.opts.owner === "string" ? raw.opts.owner : undefined,
      tags,
      replaceTags: raw.opts["replace-tags"] === true,
      dependsOn,
      replaceDependsOn: raw.opts["replace-depends-on"] === true,
      verify,
      replaceVerify: raw.opts["replace-verify"] === true,
    };
  },
};

export function makeRunTaskUpdateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskUpdateParsed): Promise<number> => {
    return await cmdTaskUpdate({
      ctx: await getCtx("task update"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      title: p.title,
      description: p.description,
      priority: p.priority,
      owner: p.owner,
      tags: p.tags,
      replaceTags: p.replaceTags,
      dependsOn: p.dependsOn,
      replaceDependsOn: p.replaceDependsOn,
      verify: p.verify,
      replaceVerify: p.replaceVerify,
    });
  };
}
