import type { CommandCtx, CommandHandler, CommandSpec } from "../../cli/spec/spec.js";
import { usageError } from "../../cli/spec/errors.js";
import { suggestOne } from "../../cli/spec/suggest.js";
import type { CommandContext } from "../shared/task-backend.js";

import { cmdPrCheck, cmdPrNote, cmdPrOpen, cmdPrUpdate } from "./index.js";

type PrGroupParsed = { cmd: string[] };

export const prSpec: CommandSpec<PrGroupParsed> = {
  id: ["pr"],
  group: "PR",
  summary: "Manage local PR artifacts for a task (branch_pr workflow).",
  synopsis: ["agentplane pr <open|update|check|note> <task-id> [options]"],
  args: [{ name: "cmd", required: false, variadic: true, valueHint: "<cmd>" }],
  examples: [
    { cmd: "agentplane pr open 202602030608-F1Q8AB --author CODER", why: "Create PR artifacts." },
    { cmd: "agentplane pr update 202602030608-F1Q8AB", why: "Refresh diffstat and summary." },
    { cmd: "agentplane pr check 202602030608-F1Q8AB", why: "Validate PR artifacts." },
    {
      cmd: 'agentplane pr note 202602030608-F1Q8AB --author REVIEWER --body "Looks good"',
      why: "Append a handoff note.",
    },
  ],
  parse: (raw) => ({ cmd: (raw.args.cmd ?? []) as string[] }),
};

export type PrOpenParsed = { taskId: string; author: string; branch: string | null };

export const prOpenSpec: CommandSpec<PrOpenParsed> = {
  id: ["pr", "open"],
  group: "PR",
  summary: "Create PR artifacts for a task.",
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
  ],
  examples: [{ cmd: "agentplane pr open 202602030608-F1Q8AB --author CODER", why: "Open." }],
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
  }),
};

export type PrUpdateParsed = { taskId: string };

export const prUpdateSpec: CommandSpec<PrUpdateParsed> = {
  id: ["pr", "update"],
  group: "PR",
  summary: "Update PR artifacts (diffstat and auto summary).",
  args: [{ name: "task-id", required: true, valueHint: "<task-id>" }],
  examples: [{ cmd: "agentplane pr update 202602030608-F1Q8AB", why: "Update artifacts." }],
  parse: (raw) => ({ taskId: String(raw.args["task-id"]) }),
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

export type PrNoteParsed = { taskId: string; author: string; body: string };

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
      required: true,
      description: "Note body text.",
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
    const body = typeof raw.opts.body === "string" ? raw.opts.body.trim() : "";
    if (!author) {
      throw usageError({ spec: prNoteSpec, message: "Invalid value for --author: empty." });
    }
    if (!body) {
      throw usageError({ spec: prNoteSpec, message: "Invalid value for --body: empty." });
    }
  },
  parse: (raw) => ({
    taskId: String(raw.args["task-id"]),
    author: String(raw.opts.author),
    body: String(raw.opts.body),
  }),
};

function runPrRootGroup(_ctx: CommandCtx, p: PrGroupParsed): Promise<number> {
  const input = p.cmd.join(" ");
  const candidates = ["open", "update", "check", "note"];
  const suggestion = suggestOne(input, candidates);
  const suffix = suggestion ? ` Did you mean: ${suggestion}?` : "";
  const msg = p.cmd.length === 0 ? "Missing subcommand." : `Unknown subcommand: ${p.cmd[0]}.`;
  throw usageError({
    spec: prSpec,
    command: "pr",
    message: `${msg}${suffix}`,
    context: { command: "pr" },
  });
}

export function makeRunPrHandler(
  _getCtx: (cmd: string) => Promise<CommandContext>,
): CommandHandler<PrGroupParsed> {
  return runPrRootGroup;
}

export function makeRunPrOpenHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrOpenParsed): Promise<number> => {
    return await cmdPrOpen({
      ctx: await getCtx("pr open"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      branch: p.branch ?? undefined,
    });
  };
}

export function makeRunPrUpdateHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrUpdateParsed): Promise<number> => {
    return await cmdPrUpdate({
      ctx: await getCtx("pr update"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
    });
  };
}

export function makeRunPrCheckHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrCheckParsed): Promise<number> => {
    return await cmdPrCheck({
      ctx: await getCtx("pr check"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
    });
  };
}

export function makeRunPrNoteHandler(getCtx: (cmd: string) => Promise<CommandContext>) {
  return async (ctx: CommandCtx, p: PrNoteParsed): Promise<number> => {
    return await cmdPrNote({
      ctx: await getCtx("pr note"),
      cwd: ctx.cwd,
      rootOverride: ctx.rootOverride,
      taskId: p.taskId,
      author: p.author,
      body: p.body,
    });
  };
}
