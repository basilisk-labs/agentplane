import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import type { CommandSpec } from "../../cli/spec/spec.js";

export const contextCheckSpec: CommandSpec<{ fix: boolean }> = {
  id: ["context", "check"],
  group: "Context",
  summary: "Check context workspace health.",
  description:
    "Runs the human-facing context health check. Use ap context graph validate for the lower-level graph validator.",
  options: [
    {
      kind: "boolean",
      name: "fix",
      default: false,
      description: "Repair missing context directories where safe.",
    },
  ],
  parse: (raw) => ({ fix: raw.opts.fix === true }),
};

export const contextLearnSpec: CommandSpec<GroupCommandParsed> = {
  id: ["context", "learn"],
  group: "Context",
  summary: "Create context processing tasks from files, changes, or completed tasks.",
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  parse: (raw) => parseGroupCommand(raw),
};

export const contextLearnFilesSpec: CommandSpec<{
  sources: string[];
  dryRun: boolean;
  includePrivate: boolean;
}> = {
  id: ["context", "learn", "files"],
  group: "Context",
  summary: "Create a context assimilation task from explicit files or paths.",
  args: [{ name: "sources", required: true, variadic: true, valueHint: "<path>" }],
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Preview only; do not create a task.",
    },
    {
      kind: "boolean",
      name: "include-private",
      default: false,
      description: "Include context/raw/private sources in the source set.",
    },
  ],
  examples: [
    {
      cmd: "agentplane context learn files docs/research.md context/raw/customer-notes.md",
      why: "Create a CURATOR task from explicit external context files.",
    },
  ],
  parse: (raw) => ({
    sources: toStringList(raw.args.sources),
    dryRun: raw.opts["dry-run"] === true,
    includePrivate: raw.opts["include-private"] === true,
  }),
};

export const contextLearnChangesSpec: CommandSpec<{
  dryRun: boolean;
  includePrivate: boolean;
}> = {
  id: ["context", "learn", "changes"],
  group: "Context",
  summary: "Create a context assimilation task from changed context sources.",
  options: [
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Preview only; do not create a task.",
    },
    {
      kind: "boolean",
      name: "include-private",
      default: false,
      description: "Include context/raw/private sources in the source set.",
    },
  ],
  examples: [
    {
      cmd: "agentplane context learn changes",
      why: "Create a CURATOR task from changed local context sources.",
    },
  ],
  parse: (raw) => ({
    dryRun: raw.opts["dry-run"] === true,
    includePrivate: raw.opts["include-private"] === true,
  }),
};

export const contextLearnTasksSpec: CommandSpec<{
  status: string[];
  tag: string[];
  task: string[];
  since: string;
  until: string;
  afterTask: string;
  limit: string;
  batchSize: string;
  dryRun: boolean;
  format: "text" | "json";
}> = {
  id: ["context", "learn", "tasks"],
  group: "Context",
  summary: "Create CURATOR extraction tasks from completed task history.",
  description:
    "Selects completed tasks oldest-first and creates standard CURATOR tasks for semantic extraction from task README/ACR sources. It does not write wiki proposals or promote pages directly.",
  options: [
    {
      kind: "string",
      name: "status",
      repeatable: true,
      valueHint: "<status>",
      description: "Repeatable task status filter. Defaults to DONE.",
    },
    {
      kind: "string",
      name: "tag",
      repeatable: true,
      valueHint: "<tag>",
      description: "Repeatable tag filter. Matches tasks with any listed tag.",
    },
    {
      kind: "string",
      name: "task",
      repeatable: true,
      valueHint: "<task-id>",
      description: "Repeatable explicit task id filter.",
    },
    {
      kind: "string",
      name: "since",
      valueHint: "<YYYY-MM-DD|YYYYMMDDHHmm>",
      description: "Only include tasks at or after this task-id timestamp prefix.",
    },
    {
      kind: "string",
      name: "until",
      valueHint: "<YYYY-MM-DD|YYYYMMDDHHmm>",
      description: "Only include tasks at or before this task-id timestamp prefix.",
    },
    {
      kind: "string",
      name: "after-task",
      valueHint: "<task-id>",
      description: "Continue after a previously queued task id.",
    },
    {
      kind: "string",
      name: "limit",
      valueHint: "<n>",
      description: "Maximum number of oldest matching tasks to queue.",
    },
    {
      kind: "string",
      name: "batch-size",
      default: "25",
      valueHint: "<n>",
      description: "Number of selected completed tasks per generated extraction task.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Preview batches without creating tasks.",
    },
    {
      kind: "string",
      name: "format",
      choices: ["text", "json"],
      default: "text",
      valueHint: "<text|json>",
      description: "Output format.",
    },
  ],
  examples: [
    {
      cmd: "agentplane context learn tasks --tag release --limit 25",
      why: "Create bounded CURATOR tasks from the oldest completed release tasks.",
    },
    {
      cmd: "agentplane context learn tasks --tag branch_pr --batch-size 25 --dry-run",
      why: "Preview task-history extraction batches without mutating task state.",
    },
  ],
  parse: (raw) => ({
    status: toStringList(raw.opts.status),
    tag: toStringList(raw.opts.tag),
    task: toStringList(raw.opts.task),
    since: typeof raw.opts.since === "string" ? raw.opts.since : "",
    until: typeof raw.opts.until === "string" ? raw.opts.until : "",
    afterTask: typeof raw.opts["after-task"] === "string" ? raw.opts["after-task"] : "",
    limit: typeof raw.opts.limit === "string" ? raw.opts.limit : "",
    batchSize: typeof raw.opts["batch-size"] === "string" ? raw.opts["batch-size"] : "25",
    dryRun: raw.opts["dry-run"] === true,
    format: (raw.opts.format as "text" | "json") ?? "text",
  }),
};
