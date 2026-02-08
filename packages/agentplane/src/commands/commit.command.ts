import type { CommandCtx, CommandSpec } from "../cli/spec/spec.js";
import { usageError } from "../cli/spec/errors.js";
import type { CommandContext } from "./shared/task-backend.js";

import { cmdCommit } from "./guard/index.js";

export type CommitParsed = {
  taskId: string;
  message?: string;
  close: boolean;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  allowBase: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  requireClean: boolean;
  quiet: boolean;
};

export const commitSpec: CommandSpec<CommitParsed> = {
  id: ["commit"],
  group: "Guard",
  summary: "Create a git commit after validating policy and allowlist against staged changes.",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "message",
      short: "m",
      valueHint: "<message>",
      description: "Commit subject (must follow policy). Required unless --close is used.",
    },
    {
      kind: "boolean",
      name: "close",
      default: false,
      description:
        "Generate a deterministic close commit message from task snapshot + verification + recorded implementation commit; stages only the task README.",
    },
    {
      kind: "string",
      name: "allow",
      valueHint: "<path-prefix>",
      repeatable: true,
      description: "Repeatable. Allowed path prefix (git-path).",
    },
    {
      kind: "boolean",
      name: "auto-allow",
      default: false,
      description:
        "Infer --allow prefixes from staged paths (only when no explicit --allow is provided).",
    },
    {
      kind: "boolean",
      name: "allow-tasks",
      default: false,
      description: "Allow task workflow artifacts (tasks/ and .agentplane/tasks/).",
    },
    {
      kind: "boolean",
      name: "allow-base",
      default: false,
      description: "Allow base branch edits.",
    },
    {
      kind: "boolean",
      name: "allow-policy",
      default: false,
      description: "Allow policy edits (e.g. AGENTS.md).",
    },
    { kind: "boolean", name: "allow-config", default: false, description: "Allow config edits." },
    { kind: "boolean", name: "allow-hooks", default: false, description: "Allow hooks edits." },
    { kind: "boolean", name: "allow-ci", default: false, description: "Allow CI workflow edits." },
    {
      kind: "boolean",
      name: "require-clean",
      default: false,
      description: "Fail if tracked files have unstaged changes (untracked is ignored).",
    },
    { kind: "boolean", name: "quiet", default: false, description: "Reduce output noise." },
  ],
  examples: [
    {
      cmd: 'agentplane commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard" --allow packages/agentplane',
      why: "Create a commit after validating allowlist and subject policy.",
    },
    {
      cmd: 'agentplane commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard" --auto-allow',
      why: "Infer allowlist prefixes from staged paths.",
    },
    {
      cmd: "agentplane commit 202602030608-F1Q8AB --close",
      why: "Create a close commit for the task README using a deterministic message builder.",
    },
  ],
  validateRaw: (raw) => {
    const close = raw.opts.close === true;
    const msg = typeof raw.opts.message === "string" ? raw.opts.message.trim() : "";
    if (!close && !msg) {
      throw usageError({
        spec: commitSpec,
        message: "Missing required --message (or use --close).",
      });
    }
    if (raw.opts.message !== undefined && !msg) {
      throw usageError({ spec: commitSpec, message: "Invalid value for --message: empty." });
    }
    if (close && raw.opts.message !== undefined) {
      throw usageError({
        spec: commitSpec,
        message: "Use either --message or --close (not both).",
      });
    }
    const allow = raw.opts.allow;
    if (Array.isArray(allow) && allow.some((s) => typeof s === "string" && s.trim() === "")) {
      throw usageError({ spec: commitSpec, message: "Invalid value for --allow: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    message: typeof raw.opts.message === "string" ? String(raw.opts.message) : undefined,
    close: raw.opts.close === true,
    allow: Array.isArray(raw.opts.allow)
      ? (raw.opts.allow as string[])
      : typeof raw.opts.allow === "string"
        ? [raw.opts.allow]
        : [],
    autoAllow: raw.opts["auto-allow"] === true,
    allowTasks: raw.opts["allow-tasks"] === true,
    allowBase: raw.opts["allow-base"] === true,
    allowPolicy: raw.opts["allow-policy"] === true,
    allowConfig: raw.opts["allow-config"] === true,
    allowHooks: raw.opts["allow-hooks"] === true,
    allowCI: raw.opts["allow-ci"] === true,
    requireClean: raw.opts["require-clean"] === true,
    quiet: raw.opts.quiet === true,
  }),
};

export function makeRunCommitHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: CommitParsed): Promise<number> => {
    return await cmdCommit({
      ctx: await getCtx("commit"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      message: p.message ?? "",
      close: p.close,
      allow: p.allow,
      autoAllow: p.autoAllow,
      allowTasks: p.allowTasks,
      allowBase: p.allowBase,
      allowPolicy: p.allowPolicy,
      allowConfig: p.allowConfig,
      allowHooks: p.allowHooks,
      allowCI: p.allowCI,
      requireClean: p.requireClean,
      quiet: p.quiet,
    });
  };
}
