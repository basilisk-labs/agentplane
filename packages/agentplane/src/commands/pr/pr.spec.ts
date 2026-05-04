import { parseGroupCommand, type GroupCommandParsed } from "../../cli/group-command.js";
import { usageError } from "../../cli/spec/errors.js";
import type { CommandSpec } from "../../cli/spec/spec.js";
import { validateTextPayloadSource } from "../shared/text-payload.js";

export type PrGroupParsed = GroupCommandParsed;

export const prSpec: CommandSpec<PrGroupParsed> = {
  id: ["pr"],
  group: "PR",
  summary:
    "Manage local PR review and GitHub publication artifacts for a task (branch_pr workflow).",
  synopsis: [
    "agentplane pr <open|update|check|note|close|close-superseded> <task-id|pr-number> [options]",
  ],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane pr open 202602030608-F1Q8AB --author CODER", why: "Create PR artifacts." },
    {
      cmd: "agentplane pr update 202602030608-F1Q8AB",
      why: "Refresh review.md plus github-title/body projections.",
    },
    { cmd: "agentplane pr check 202602030608-F1Q8AB", why: "Validate PR artifacts." },
    {
      cmd: 'agentplane pr note 202602030608-F1Q8AB --author REVIEWER --body "Looks good"',
      why: "Append a handoff note.",
    },
    {
      cmd: 'agentplane pr close 123 --comment "Superseded by #456" --delete-remote-branch',
      why: "Close a stale GitHub PR through REST and optionally delete its remote head branch.",
    },
    {
      cmd: "agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch",
      why: "Close a superseded task PR from task artifacts after protected-main closure.",
    },
  ],
  parse: (raw) => parseGroupCommand(raw),
};

export type PrOpenParsed = {
  taskId: string;
  author: string;
  branch: string | null;
  includeTaskIds: string[];
  syncOnly: boolean;
};

export const prOpenSpec: CommandSpec<PrOpenParsed> = {
  id: ["pr", "open"],
  group: "PR",
  summary:
    "Create PR artifacts for a task and, unless --sync-only is set, publish/link the remote GitHub PR.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Author id (e.g. CODER).",
    },
    {
      kind: "string",
      name: "branch",
      valueHint: "<name>",
      description: "Branch name (default: current branch).",
    },
    {
      kind: "string",
      name: "include-task",
      valueHint: "<task-id>",
      repeatable: true,
      description: "Repeatable. Record an additional related task id on this primary PR.",
    },
    {
      kind: "boolean",
      name: "sync-only",
      default: false,
      description: "Only write local PR artifacts; do not create a remote GitHub PR.",
    },
  ],
  examples: [
    {
      cmd: "agentplane pr open 202602030608-F1Q8AB --author CODER",
      why: "Sync local artifacts, publish the task branch to origin if needed, and create/link the GitHub PR.",
    },
  ],
  validateRaw: (raw) => {
    const author = typeof raw.opts.author === "string" ? raw.opts.author.trim() : "";
    if (!author) {
      throw usageError({ spec: prOpenSpec, message: "Invalid value for --author: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author),
    branch: typeof raw.opts.branch === "string" ? raw.opts.branch : null,
    includeTaskIds: Array.isArray(raw.opts["include-task"])
      ? raw.opts["include-task"].map(String)
      : typeof raw.opts["include-task"] === "string"
        ? [String(raw.opts["include-task"])]
        : [],
    syncOnly: Boolean(raw.opts["sync-only"]),
  }),
};

export type PrUpdateParsed = { taskId: string; includeTaskIds: string[] };

export const prUpdateSpec: CommandSpec<PrUpdateParsed> = {
  id: ["pr", "update"],
  group: "PR",
  summary: "Update PR artifacts (review packet, diffstat, and GitHub projections).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "include-task",
      valueHint: "<task-id>",
      repeatable: true,
      description: "Repeatable. Record an additional related task id on this primary PR.",
    },
  ],
  examples: [{ cmd: "agentplane pr update 202602030608-F1Q8AB", why: "Update artifacts." }],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    includeTaskIds: Array.isArray(raw.opts["include-task"])
      ? raw.opts["include-task"].map(String)
      : typeof raw.opts["include-task"] === "string"
        ? [String(raw.opts["include-task"])]
        : [],
  }),
};

export type PrCheckParsed = { taskId: string };

export const prCheckSpec: CommandSpec<PrCheckParsed> = {
  id: ["pr", "check"],
  group: "PR",
  summary: "Check that PR artifacts are present and valid.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  examples: [{ cmd: "agentplane pr check 202602030608-F1Q8AB", why: "Check artifacts." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]) }),
};

export type PrNoteParsed = { taskId: string; author: string; body?: string; bodyFile?: string };

export const prNoteSpec: CommandSpec<PrNoteParsed> = {
  id: ["pr", "note"],
  group: "PR",
  summary: "Append a handoff note into PR review.md.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Author id (e.g. REVIEWER).",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Note body text. Use --body-file for Markdown or shell-sensitive text.",
    },
    {
      kind: "string",
      name: "body-file",
      valueHint: "<path>",
      description: "Read the note body from a file path (mutually exclusive with --body).",
    },
  ],
  examples: [
    {
      cmd: 'agentplane pr note 202602030608-F1Q8AB --author REVIEWER --body "LGTM"',
      why: "Add note.",
    },
  ],
  validateRaw: (raw) => {
    const author = typeof raw.opts.author === "string" ? raw.opts.author.trim() : "";
    if (!author) {
      throw usageError({ spec: prNoteSpec, message: "Invalid value for --author: empty." });
    }
    validateTextPayloadSource(
      raw,
      prNoteSpec,
      { inline: "body", file: "body-file", label: "PR note body" },
      { required: true },
    );
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author),
    body: typeof raw.opts.body === "string" ? raw.opts.body : undefined,
    bodyFile: typeof raw.opts["body-file"] === "string" ? raw.opts["body-file"] : undefined,
  }),
};

export type PrCloseParsed = {
  prNumber: number;
  repo?: string;
  comment?: string;
  deleteRemoteBranch: boolean;
};

export const prCloseSpec: CommandSpec<PrCloseParsed> = {
  id: ["pr", "close"],
  group: "PR",
  summary: "Close a GitHub PR through REST with optional remote head-branch deletion.",
  args: [{ name: "pr-number", required: true, valueHint: "<pr-number>" }],
  options: [
    {
      kind: "string",
      name: "repo",
      valueHint: "<owner/name>",
      description: "Optional. GitHub owner/repo override (defaults to origin remote).",
    },
    {
      kind: "string",
      name: "comment",
      valueHint: "<text>",
      description: "Optional. Add a close comment before closing the PR.",
    },
    {
      kind: "boolean",
      name: "delete-remote-branch",
      default: false,
      description:
        "Delete the remote head branch after a successful close when it belongs to the target repo.",
    },
  ],
  examples: [
    {
      cmd: 'agentplane pr close 123 --comment "Superseded by #456" --delete-remote-branch',
      why: "Close a stale PR and remove its remote head branch when it belongs to the same repo.",
    },
  ],
  validateRaw: (raw) => {
    const prNumber = Number.parseInt(String(raw.args["pr-number"] ?? ""), 10);
    if (!Number.isInteger(prNumber) || prNumber <= 0) {
      throw usageError({ spec: prCloseSpec, message: "Invalid value for <pr-number>." });
    }
    if (typeof raw.opts.repo === "string" && raw.opts.repo.trim() === "") {
      throw usageError({ spec: prCloseSpec, message: "Invalid value for --repo: empty." });
    }
    if (typeof raw.opts.comment === "string" && raw.opts.comment.trim() === "") {
      throw usageError({ spec: prCloseSpec, message: "Invalid value for --comment: empty." });
    }
  },
  parse: (raw) => ({
    prNumber: Number.parseInt(String(raw.args["pr-number"]), 10),
    repo: typeof raw.opts.repo === "string" ? raw.opts.repo : undefined,
    comment: typeof raw.opts.comment === "string" ? raw.opts.comment : undefined,
    deleteRemoteBranch: raw.opts["delete-remote-branch"] === true,
  }),
};

export type PrCloseSupersededParsed = {
  taskId: string;
  deleteRemoteBranch: boolean;
};

export const prCloseSupersededSpec: CommandSpec<PrCloseSupersededParsed> = {
  id: ["pr", "close-superseded"],
  group: "PR",
  summary: "Close a superseded task PR using task artifacts.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "boolean",
      name: "delete-remote-branch",
      default: false,
      description:
        "Delete the remote head branch after a successful close when it belongs to the task repo.",
    },
  ],
  examples: [
    {
      cmd: "agentplane pr close-superseded 202604072308-A1XE27 --delete-remote-branch",
      why: "Repair a stale task PR after the task has already been merged to main.",
    },
  ],
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    deleteRemoteBranch: raw.opts["delete-remote-branch"] === true,
  }),
};
