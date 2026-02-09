import { CliError } from "../../shared/errors.js";
import { exitCodeForError } from "../exit-codes.js";
import { usageMessage } from "../output.js";

export type UsageStrings = {
  usage: string;
  example: string;
};

export type ParsedStart = {
  taskId: string;
  author: string;
  body: string;
  commitFromComment: boolean;
  commitEmoji: string | undefined;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  confirmStatusCommit: boolean;
  force: boolean;
  quiet: boolean;
};

export type ParsedBlock = ParsedStart;

export type ParsedVerify = {
  taskId: string;
  args: string[];
};

export type ParsedFinish = {
  taskIds: string[];
  author: string;
  body: string;
  commit: string | undefined;
  force: boolean;
  commitFromComment: boolean;
  commitEmoji: string | undefined;
  commitAllow: string[];
  commitAutoAllow: boolean;
  commitAllowTasks: boolean;
  commitRequireClean: boolean;
  statusCommit: boolean;
  statusCommitEmoji: string | undefined;
  statusCommitAllow: string[];
  statusCommitAutoAllow: boolean;
  statusCommitRequireClean: boolean;
  confirmStatusCommit: boolean;
  quiet: boolean;
};

function usageError(u: UsageStrings): CliError {
  return new CliError({
    exitCode: exitCodeForError("E_USAGE"),
    code: "E_USAGE",
    message: usageMessage(u.usage, u.example),
  });
}

function requireTaskId(taskIdToken: string | undefined, u: UsageStrings): string {
  if (!taskIdToken || taskIdToken.startsWith("-")) throw usageError(u);
  return taskIdToken;
}

function parseLifecycleLike(opts: {
  taskIdToken: string | undefined;
  args: string[];
  usage: UsageStrings;
}): ParsedStart {
  const taskId = requireTaskId(opts.taskIdToken, opts.usage);

  let author = "";
  let body = "";
  let commitFromComment = false;
  let commitEmoji: string | undefined;
  const commitAllow: string[] = [];
  let commitAutoAllow = false;
  let commitAllowTasks = true;
  let commitRequireClean = false;
  let confirmStatusCommit = false;
  let force = false;
  let quiet = false;

  for (let i = 0; i < opts.args.length; i++) {
    const arg = opts.args[i];
    if (!arg) continue;
    if (arg === "--author") {
      const next = opts.args[i + 1];
      if (!next) throw usageError(opts.usage);
      author = next;
      i++;
      continue;
    }
    if (arg === "--body") {
      const next = opts.args[i + 1];
      if (!next) throw usageError(opts.usage);
      body = next;
      i++;
      continue;
    }
    if (arg === "--commit-from-comment") {
      commitFromComment = true;
      continue;
    }
    if (arg === "--commit-emoji") {
      const next = opts.args[i + 1];
      if (!next) throw usageError(opts.usage);
      commitEmoji = next;
      i++;
      continue;
    }
    if (arg === "--commit-allow") {
      const next = opts.args[i + 1];
      if (!next) throw usageError(opts.usage);
      commitAllow.push(next);
      i++;
      continue;
    }
    if (arg === "--commit-auto-allow") {
      commitAutoAllow = true;
      continue;
    }
    if (arg === "--commit-allow-tasks") {
      commitAllowTasks = true;
      continue;
    }
    if (arg === "--commit-require-clean") {
      commitRequireClean = true;
      continue;
    }
    if (arg === "--confirm-status-commit") {
      confirmStatusCommit = true;
      continue;
    }
    if (arg === "--force") {
      force = true;
      continue;
    }
    if (arg === "--quiet") {
      quiet = true;
      continue;
    }
    if (arg.startsWith("--")) throw usageError(opts.usage);
  }

  if (!author || !body) throw usageError(opts.usage);

  return {
    taskId,
    author,
    body,
    commitFromComment,
    commitEmoji,
    commitAllow,
    commitAutoAllow,
    commitAllowTasks,
    commitRequireClean,
    confirmStatusCommit,
    force,
    quiet,
  };
}

export function parseStart(opts: {
  taskIdToken: string | undefined;
  args: string[];
  usage: UsageStrings;
}): ParsedStart {
  return parseLifecycleLike(opts);
}

export function parseBlock(opts: {
  taskIdToken: string | undefined;
  args: string[];
  usage: UsageStrings;
}): ParsedBlock {
  return parseLifecycleLike(opts);
}

export function parseVerify(opts: {
  taskIdToken: string | undefined;
  args: string[];
  usage: UsageStrings;
}): ParsedVerify {
  const taskId = requireTaskId(opts.taskIdToken, opts.usage);
  return { taskId, args: opts.args };
}

export function parseFinish(opts: {
  commandToken: string | undefined;
  args: string[];
  usage: UsageStrings;
}): ParsedFinish {
  let finishArgs = opts.args;
  const taskIds: string[] = [];
  if (opts.commandToken && !opts.commandToken.startsWith("--")) {
    taskIds.push(opts.commandToken);
  } else if (opts.commandToken?.startsWith("-")) {
    finishArgs = [opts.commandToken, ...opts.args];
  }

  let argIndex = 0;
  while (argIndex < finishArgs.length) {
    const arg = finishArgs[argIndex];
    if (!arg || arg.startsWith("--")) break;
    taskIds.push(arg);
    argIndex += 1;
  }
  const flagArgs = finishArgs.slice(argIndex);

  if (taskIds.length === 0) throw usageError(opts.usage);

  let author = "";
  let body = "";
  let commit: string | undefined;
  let force = false;
  let commitFromComment = false;
  let commitEmoji: string | undefined;
  const commitAllow: string[] = [];
  let commitAutoAllow = false;
  let commitAllowTasks = true;
  let commitRequireClean = false;
  let statusCommit = false;
  let statusCommitEmoji: string | undefined;
  const statusCommitAllow: string[] = [];
  let statusCommitAutoAllow = false;
  let statusCommitRequireClean = false;
  let confirmStatusCommit = false;
  let quiet = false;

  for (let i = 0; i < flagArgs.length; i++) {
    const arg = flagArgs[i];
    if (!arg) continue;
    if (arg === "--author") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      author = next;
      i++;
      continue;
    }
    if (arg === "--body") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      body = next;
      i++;
      continue;
    }
    if (arg === "--commit") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      commit = next;
      i++;
      continue;
    }
    if (arg === "--force") {
      force = true;
      continue;
    }
    if (arg === "--commit-from-comment") {
      commitFromComment = true;
      continue;
    }
    if (arg === "--commit-emoji") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      commitEmoji = next;
      i++;
      continue;
    }
    if (arg === "--commit-allow") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      commitAllow.push(next);
      i++;
      continue;
    }
    if (arg === "--commit-auto-allow") {
      commitAutoAllow = true;
      continue;
    }
    if (arg === "--commit-allow-tasks") {
      commitAllowTasks = true;
      continue;
    }
    if (arg === "--commit-require-clean") {
      commitRequireClean = true;
      continue;
    }
    if (arg === "--status-commit") {
      statusCommit = true;
      continue;
    }
    if (arg === "--status-commit-emoji") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      statusCommitEmoji = next;
      i++;
      continue;
    }
    if (arg === "--status-commit-allow") {
      const next = flagArgs[i + 1];
      if (!next) throw usageError(opts.usage);
      statusCommitAllow.push(next);
      i++;
      continue;
    }
    if (arg === "--status-commit-auto-allow") {
      statusCommitAutoAllow = true;
      continue;
    }
    if (arg === "--status-commit-require-clean") {
      statusCommitRequireClean = true;
      continue;
    }
    if (arg === "--confirm-status-commit") {
      confirmStatusCommit = true;
      continue;
    }
    if (arg === "--quiet") {
      quiet = true;
      continue;
    }
    if (arg.startsWith("--")) throw usageError(opts.usage);
  }

  if (!author || !body) throw usageError(opts.usage);

  return {
    taskIds,
    author,
    body,
    commit,
    force,
    commitFromComment,
    commitEmoji,
    commitAllow,
    commitAutoAllow,
    commitAllowTasks,
    commitRequireClean,
    statusCommit,
    statusCommitEmoji,
    statusCommitAllow,
    statusCommitAutoAllow,
    statusCommitRequireClean,
    confirmStatusCommit,
    quiet,
  };
}
