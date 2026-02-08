import type { CommandCtx, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { CliError } from "../../shared/errors.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdGuardCommit, suggestAllowPrefixes } from "./index.js";

export type GuardCommitParsed = {
  taskId: string;
  message: string;
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

export const guardCommitSpec: CommandSpec<GuardCommitParsed> = {
  id: ["guard", "commit"],
  group: "Guard",
  summary: "Validate commit policy and allowlist for staged changes (no commit is created).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  options: [
    {
      kind: "string",
      name: "message",
      short: "m",
      valueHint: "<message>",
      required: true,
      description: "Commit subject (must follow policy).",
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
      cmd: 'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard" --allow packages/agentplane',
      why: "Validate staged changes are covered by allowlist and policy.",
    },
    {
      cmd: 'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard" --auto-allow',
      why: "Infer allowlist prefixes from staged paths.",
    },
  ],
  validateRaw: (raw) => {
    const msg = typeof raw.opts.message === "string" ? raw.opts.message.trim() : "";
    if (raw.opts.message !== undefined && !msg) {
      throw usageError({ spec: guardCommitSpec, message: "Invalid value for --message: empty." });
    }
    const allow = raw.opts.allow;
    if (Array.isArray(allow) && allow.some((s) => typeof s === "string" && s.trim() === "")) {
      throw usageError({ spec: guardCommitSpec, message: "Invalid value for --allow: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    message: String(raw.opts.message),
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

export function makeRunGuardCommitHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: GuardCommitParsed): Promise<number> => {
    const cmdCtx = await getCtx("guard commit");

    let allow = p.allow;
    if (p.autoAllow && allow.length === 0) {
      const staged = await cmdCtx.git.statusStagedPaths();
      const prefixes = suggestAllowPrefixes(staged);
      if (prefixes.length === 0) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: "No staged files (git index empty)",
        });
      }
      allow = prefixes;
    }

    return await cmdGuardCommit({
      ctx: cmdCtx,
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      message: p.message,
      allow,
      allowBase: p.allowBase,
      allowTasks: p.allowTasks,
      allowPolicy: p.allowPolicy,
      allowConfig: p.allowConfig,
      allowHooks: p.allowHooks,
      allowCI: p.allowCI,
      requireClean: p.requireClean,
      quiet: p.quiet,
    });
  };
}
