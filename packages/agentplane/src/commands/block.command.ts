import type { CommandCtx, CommandSpec } from "../cli2/spec.js";
import { usageError } from "../cli2/errors.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdBlock } from "./task/block.js";

export type BlockParsed = {
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji?: string;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  quiet: boolean;
};

function toStringList(v: unknown): string[] {
  if (typeof v === "string") return [v];
  if (Array.isArray(v)) return v.filter((x): x is string => typeof x === "string");
  return [];
}

export const blockSpec: CommandSpec<BlockParsed> = {
  id: ["block"],
  group: "Lifecycle",
  summary: "Transition a task to BLOCKED and record a structured Blocked comment.",
  args: [
    {
      name: "task-id",
      required: true,
      valueHint: "<task-id>",
      description: "Existing task id.",
    },
  ],
  options: [
    {
      kind: "string",
      name: "author",
      valueHint: "<id>",
      required: true,
      description: "Comment author id (e.g. CODER).",
    },
    {
      kind: "string",
      name: "body",
      valueHint: "<text>",
      required: true,
      description: "Structured comment body (must match the configured Blocked: prefix).",
    },
    {
      kind: "boolean",
      name: "commit-from-comment",
      default: false,
      description: "Create a status commit using the comment body.",
    },
    {
      kind: "string",
      name: "commit-emoji",
      valueHint: "<emoji>",
      description: "Override the status commit emoji (used with --commit-from-comment).",
    },
    {
      kind: "string",
      name: "commit-allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description:
        "Repeatable. Allowlist path prefixes to stage for the status commit (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "commit-auto-allow",
      default: false,
      description:
        "Auto-allow inferred allowlist paths if none are provided (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "commit-allow-tasks",
      default: true,
      hidden: true,
      description: "Deprecated. Tasks are always allowed for status commits.",
      deprecated: "no-op",
    },
    {
      kind: "boolean",
      name: "commit-require-clean",
      default: false,
      description:
        "Require a clean working tree for the status commit (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "confirm-status-commit",
      default: false,
      description:
        "Confirm status commit creation when status_commit_policy=confirm (used with --commit-from-comment).",
    },
    {
      kind: "boolean",
      name: "force",
      default: false,
      description: "Override status transition restrictions.",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Suppress output." },
  ],
  examples: [
    {
      cmd: 'agentplane block 202602030608-F1Q8AB --author CODER --body "Blocked: waiting for review"',
      why: "Block work on a task.",
    },
    {
      cmd: 'agentplane block 202602030608-F1Q8AB --author CODER --body "Blocked: waiting for review" --commit-from-comment --commit-allow packages/agentplane/src',
      why: "Block work and create a status commit from the comment.",
    },
  ],
  validateRaw: (raw) => {
    const author = typeof raw.opts.author === "string" ? raw.opts.author.trim() : "";
    const body = typeof raw.opts.body === "string" ? raw.opts.body.trim() : "";
    if (!author)
      throw usageError({ spec: blockSpec, message: "Invalid value for --author: empty." });
    if (!body) throw usageError({ spec: blockSpec, message: "Invalid value for --body: empty." });
  },
  parse: (raw) => ({
    taskId: typeof raw.args["task-id"] === "string" ? raw.args["task-id"] : "",
    author: raw.opts.author as string,
    body: raw.opts.body as string,
    commitFromComment: raw.opts["commit-from-comment"] === true,
    commitEmoji: raw.opts["commit-emoji"] as string | undefined,
    commitAllow: toStringList(raw.opts["commit-allow"]),
    commitAutoAllow: raw.opts["commit-auto-allow"] === true,
    commitAllowTasks: raw.opts["commit-allow-tasks"] !== false,
    commitRequireClean: raw.opts["commit-require-clean"] === true,
    confirmStatusCommit: raw.opts["confirm-status-commit"] === true,
    force: raw.opts.force === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunBlockHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: BlockParsed): Promise<number> => {
    return await cmdBlock({
      ctx: await getCtx("block"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body: p.body,
      commitFromComment: p.commitFromComment,
      commitEmoji: p.commitEmoji,
      commitAllow: p.commitAllow,
      commitAutoAllow: p.commitAutoAllow,
      commitAllowTasks: p.commitAllowTasks,
      commitRequireClean: p.commitRequireClean,
      confirmStatusCommit: p.confirmStatusCommit,
      force: p.force,
      quiet: p.quiet,
    });
  };
}
