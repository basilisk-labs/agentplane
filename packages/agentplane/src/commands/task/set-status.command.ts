import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { toStringList } from "../../cli/spec/parse-utils.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdTaskSetStatus } from "./set-status.js";

export type TaskSetStatusParsed = {
  taskId: string;
  status: string;
  author?: string;
  body?: string;
  commit?: string;
  force: boolean;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
};

export const taskSetStatusSpec: CommandSpec<TaskSetStatusParsed> = {
  id: ["task", "set-status"],
  group: "Task",
  summary: "Change a task status (optionally committing from the comment body).",
  args: [
    { name: "task-id", required: true, valueHint: "<task-id>" },
    { name: "status", required: true, valueHint: "<TODO|DOING|DONE|BLOCKED>" },
  ],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      description: "Optional. Comment/event author (requires --body).",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      description: "Optional. Comment/event body (requires --author).",
    },
    {
      kind: "string",
      name: "commit",
      valueHint: "<hash>",
      description: "Optional. Record an existing commit hash/message into task metadata.",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Allow unsafe transitions (and DONE without using agentplane finish).",
    },
    {
      kind: "boolean",
      name: "commit-from-comment",
      default: false,
      description: "Create a git commit from the provided comment body (requires --body).",
    },
    {
      kind: "string",
      name: "commit-emoji",
      valueHint: "<emoji>",
      description: "Optional. Emoji prefix used for commit-from-comment.",
    },
    {
      kind: "string",
      name: "commit-allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description: "Repeatable. Allowlist prefix for commit-from-comment staging.",
    },
    {
      kind: "boolean",
      name: "commit-auto-allow",
      default: false,
      description: "Auto-derive allowlist prefixes from staged paths (commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "commit-allow-tasks",
      default: true,
      description: "Allow committing under .agentplane/tasks when commit-from-comment is used.",
    },
    {
      kind: "boolean",
      name: "commit-require-clean",
      default: false,
      description: "Require a clean working tree before commit-from-comment.",
    },
    {
      kind: "boolean",
      name: "confirm-status-commit",
      default: false,
      description: "Confirm status-commit when status_commit_policy requires confirmation.",
    },
    {
      kind: "boolean",
      name: "quiet",
      default: false,
      description: "Suppress normal output (still prints errors).",
    },
  ],
  examples: [
    { cmd: "agentplane task set-status 202602030608-F1Q8AB DOING", why: "Mark task as DOING." },
    {
      cmd: 'agentplane task set-status 202602030608-F1Q8AB BLOCKED --author CODER --body "Waiting on upstream fix."',
      why: "Add a status change note.",
    },
    {
      cmd: 'agentplane task set-status 202602030608-F1Q8AB DOING --commit-from-comment --author CODER --body "Start: working on it" --commit-allow packages/agentplane',
      why: "Create a commit from the comment body (subject to policy and allowlist).",
    },
  ],
  validateRaw: (raw) => {
    const author = raw.opts.author;
    const body = raw.opts.body;
    const hasAuthor = typeof author === "string" && author.trim() !== "";
    const hasBody = typeof body === "string" && body.trim() !== "";
    if (hasAuthor !== hasBody) {
      throw usageError({
        spec: taskSetStatusSpec,
        message: "Both --author and --body must be provided together.",
      });
    }

    if (raw.opts["commit-from-comment"] === true && !hasBody) {
      throw usageError({
        spec: taskSetStatusSpec,
        message: "--body is required when using --commit-from-comment.",
      });
    }

    const allow = toStringList(raw.opts["commit-allow"]);
    if (allow.some((p) => p.trim() === "")) {
      throw usageError({
        spec: taskSetStatusSpec,
        message: "Invalid value for --commit-allow: empty.",
      });
    }
  },
  parse: (raw) => {
    const commitAllow = toStringList(raw.opts["commit-allow"]);
    return {
      taskId: String(raw.args["task-id"]),
      status: String(raw.args.status),
      author: typeof raw.opts.author === "string" ? raw.opts.author : undefined,
      body: typeof raw.opts.body === "string" ? raw.opts.body : undefined,
      commit: typeof raw.opts.commit === "string" ? raw.opts.commit : undefined,
      force: raw.opts.force === true,
      commitFromComment: raw.opts["commit-from-comment"] === true,
      commitEmoji:
        typeof raw.opts["commit-emoji"] === "string" ? raw.opts["commit-emoji"] : undefined,
      commitAllow,
      commitAutoAllow: raw.opts["commit-auto-allow"] === true,
      commitAllowTasks: raw.opts["commit-allow-tasks"] !== false,
      commitRequireClean: raw.opts["commit-require-clean"] === true,
      confirmStatusCommit: raw.opts["confirm-status-commit"] === true,
      quiet: raw.opts.quiet === true,
    };
  },
};

export function makeRunTaskSetStatusHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: TaskSetStatusParsed): Promise<number> => {
    return await cmdTaskSetStatus({
      ctx: await getCtx("task set-status"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      status: p.status,
      author: p.author,
      body: p.body,
      commit: p.commit,
      force: p.force,
      commitFromComment: p.commitFromComment,
      commitEmoji: p.commitEmoji,
      commitAllow: p.commitAllow,
      commitAutoAllow: p.commitAutoAllow,
      commitAllowTasks: p.commitAllowTasks,
      commitRequireClean: p.commitRequireClean,
      confirmStatusCommit: p.confirmStatusCommit,
      quiet: p.quiet,
    });
  };
}
