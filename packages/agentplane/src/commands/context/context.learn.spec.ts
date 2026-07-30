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
  }),
};

export const contextLearnChangesSpec: CommandSpec<{
  dryRun: boolean;
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
  ],
  examples: [
    {
      cmd: "agentplane context learn changes",
      why: "Create a CURATOR task from changed local context sources.",
    },
  ],
  parse: (raw) => ({
    dryRun: raw.opts["dry-run"] === true,
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
  batchBytes: string;
  dryRun: boolean;
  format: "text" | "json";
}> = {
  id: ["context", "learn", "tasks"],
  group: "Context",
  summary:
    "Collect completed-task knowledge proposals; select one task to create a CURATOR work order.",
  description:
    "Collects source-backed, unpublished knowledge proposals from completed task README/ACR evidence. An exact single --task selection also creates one CURATOR semantic work order. This command never writes wiki, facts, or graph artifacts directly.",
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
      description:
        "Explicit task id filter. Exactly one id selects that proposal for a CURATOR semantic work order.",
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
      description: "Continue after a previously proposed task id.",
    },
    {
      kind: "string",
      name: "limit",
      valueHint: "<n>",
      description: "Maximum number of oldest matching proposals to collect.",
    },
    {
      kind: "string",
      name: "batch-size",
      default: "25",
      valueHint: "<n>",
      description: "Legacy compatibility option. A selected work order always contains one task.",
    },
    {
      kind: "string",
      name: "batch-bytes",
      default: "131072",
      valueHint: "<bytes>",
      description:
        "Maximum UTF-8 bytes of the selected task source pack. An oversized source remains isolated.",
    },
    {
      kind: "boolean",
      name: "dry-run",
      default: false,
      description: "Preview candidate proposals without writing records or creating a work order.",
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
      why: "Collect source-backed, unpublished proposals from the oldest completed release tasks.",
    },
    {
      cmd: "agentplane context learn tasks --task 202605100837-PJZW2E",
      why: "Select one proposal and create its CURATOR semantic work order.",
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
    batchBytes: typeof raw.opts["batch-bytes"] === "string" ? raw.opts["batch-bytes"] : "131072",
    dryRun: raw.opts["dry-run"] === true,
    format: (raw.opts.format as "text" | "json") ?? "text",
  }),
};
