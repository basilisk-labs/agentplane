import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskDocSet } from "./doc.js";

export type TaskDocSetParsed = {
  taskId: string;
  section?: string;
  text?: string;
  file?: string;
  updatedBy?: string;
  fullDoc: boolean;
};

export const taskDocSetSpec: CommandSpec<TaskDocSetParsed> = {
  id: ["task", "doc", "set"],
  group: "Task",
  summary: "Update a task README section.",
  synopsis: [
    "agentplane task doc set <task-id> --section <name> (--text <text> | --file <path>) [--updated-by <id>]",
    "agentplane task doc set <task-id> --full-doc (--text <text> | --file <path>) [--updated-by <id>]",
  ],
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "section",
      valueHint: "<name>",
      description:
        "Target section heading (must be one of config.tasks.doc.sections). Required unless --full-doc is set.",
    },
    {
      kind: "boolean",
      name: "full-doc",
      default: false,
      description: "Treat the provided text/file as the full task README payload.",
    },
    {
      kind: "string",
      name: "text",
      valueHint: "<text>",
      description: String.raw`Section content (mutually exclusive with --file). Literal escaped newlines (\n) are normalized for inline text.`,
    },
    {
      kind: "string",
      name: "file",
      valueHint: "<path>",
      description: "Read section content from a file (mutually exclusive with --text).",
    },
    {
      kind: "string",
      name: "updated-by",
      valueHint: "<id>",
      description: "Optional. Override doc_updated_by metadata (must be non-empty).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane task doc set 202602030608-F1Q8AB --section Summary --text "New summary."',
      why: "Update one section using inline text.",
    },
    {
      cmd: "agentplane task doc set 202602030608-F1Q8AB --section Plan --file ./plan.md",
      why: "Update one section using a file.",
    },
    {
      cmd: "agentplane task doc set 202602030608-F1Q8AB --full-doc --file ./task-readme.md",
      why: "Replace the full task README payload explicitly.",
    },
  ],
  validateRaw: (raw) => {
    const fullDoc = raw.opts["full-doc"] === true;
    const section = typeof raw.opts.section === "string" ? raw.opts.section.trim() : "";
    if (fullDoc && section) {
      throw usageError({
        spec: taskDocSetSpec,
        message: "Use either --section or --full-doc (not both).",
      });
    }
    if (!fullDoc && !section) {
      throw usageError({
        spec: taskDocSetSpec,
        message: "Missing required option: --section (or pass --full-doc).",
      });
    }
    if (typeof raw.opts.section === "string" && section === "") {
      throw usageError({ spec: taskDocSetSpec, message: "Invalid value for --section: empty." });
    }
    const hasText = typeof raw.opts.text === "string";
    const hasFile = typeof raw.opts.file === "string";
    if (hasText === hasFile) {
      throw usageError({
        spec: taskDocSetSpec,
        message: "Exactly one of --text or --file is required.",
      });
    }
    const updatedBy = raw.opts["updated-by"];
    if (typeof updatedBy === "string" && updatedBy.trim() === "") {
      throw usageError({ spec: taskDocSetSpec, message: "--updated-by must be non-empty." });
    }
  },
  parse: (raw) => {
    return {
      taskId: String(raw.args["task-id"]),
      section: typeof raw.opts.section === "string" ? raw.opts.section : undefined,
      text: typeof raw.opts.text === "string" ? raw.opts.text : undefined,
      file: typeof raw.opts.file === "string" ? raw.opts.file : undefined,
      updatedBy: typeof raw.opts["updated-by"] === "string" ? raw.opts["updated-by"] : undefined,
      fullDoc: raw.opts["full-doc"] === true,
    };
  },
};

export function makeRunTaskDocSetHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskDocSetParsed): Promise<number> => {
    return await cmdTaskDocSet({
      ctx: await getCtx("task doc set"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      section: p.section,
      text: p.text,
      file: p.file,
      updatedBy: p.updatedBy,
      fullDoc: p.fullDoc,
    });
  };
}
