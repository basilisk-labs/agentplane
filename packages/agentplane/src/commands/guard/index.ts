import {
  extractTaskSuffix,
  resolveBaseBranch,
  resolveProject,
  type AgentplaneConfig,
} from "@agentplaneorg/core";

import { evaluatePolicy } from "../../policy/evaluate.js";
import { mapCoreError } from "../../cli/error-map.js";
import { invalidValueMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  formatCommentBodyForCommit,
  normalizeCommentBodyForCommit,
} from "../../shared/comment-format.js";
import { gitPathIsUnderPrefix, normalizeGitPathPrefix } from "../../shared/git-path.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { GitContext } from "../shared/git-context.js";
import { protectedPathKindForFile } from "../../shared/protected-paths.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { throwIfPolicyDenied } from "../shared/policy-deny.js";

export function buildGitCommitEnv(opts: {
  taskId: string;
  allowTasks: boolean;
  allowBase: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
}): NodeJS.ProcessEnv {
  return {
    ...process.env,
    AGENTPLANE_TASK_ID: opts.taskId,
    AGENTPLANE_ALLOW_TASKS: opts.allowTasks ? "1" : "0",
    AGENTPLANE_ALLOW_BASE: opts.allowBase ? "1" : "0",
    AGENTPLANE_ALLOW_POLICY: opts.allowPolicy ? "1" : "0",
    AGENTPLANE_ALLOW_CONFIG: opts.allowConfig ? "1" : "0",
    AGENTPLANE_ALLOW_HOOKS: opts.allowHooks ? "1" : "0",
    AGENTPLANE_ALLOW_CI: opts.allowCI ? "1" : "0",
  };
}

export function suggestAllowPrefixes(paths: string[]): string[] {
  const out = new Set<string>();
  for (const filePath of paths) {
    if (!filePath) continue;
    const idx = filePath.lastIndexOf("/");
    if (idx <= 0) out.add(filePath);
    else out.add(filePath.slice(0, idx));
  }
  return [...out].toSorted((a, b) => a.localeCompare(b));
}

export const GUARD_COMMIT_USAGE =
  "Usage: agentplane guard commit <task-id> -m <message> --allow <path> [--allow <path>...] [--auto-allow] [--allow-tasks] [--allow-base] [--allow-policy] [--allow-config] [--allow-hooks] [--allow-ci] [--require-clean] [--quiet]";
export const GUARD_COMMIT_USAGE_EXAMPLE =
  'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard" --allow packages/agentplane';
export const COMMIT_USAGE = "Usage: agentplane commit <task-id> -m <message>";
export const COMMIT_USAGE_EXAMPLE =
  'agentplane commit 202602030608-F1Q8AB -m "✨ F1Q8AB task: implement allowlist guard"';

type GuardCommitOptions = {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  message: string;
  allow: string[];
  allowBase: boolean;
  allowTasks: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  requireClean: boolean;
  quiet: boolean;
};

async function guardCommitCheck(opts: GuardCommitOptions): Promise<void> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

  const staged = await ctx.git.statusStagedPaths();
  const unstagedTrackedPaths = opts.requireClean ? await ctx.git.statusUnstagedTrackedPaths() : [];

  const inBranchPr = ctx.config.workflow_mode === "branch_pr";
  const baseBranch = inBranchPr
    ? await resolveBaseBranch({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
        cliBaseOpt: null,
        mode: ctx.config.workflow_mode,
      })
    : null;
  const currentBranch = inBranchPr
    ? await gitCurrentBranch(ctx.resolvedProject.gitRoot)
    : undefined;

  const res = evaluatePolicy({
    action: "guard_commit",
    config: ctx.config,
    taskId: opts.taskId,
    git: {
      stagedPaths: staged,
      unstagedTrackedPaths: unstagedTrackedPaths,
      currentBranch,
      baseBranch,
    },
    commit: { subject: opts.message },
    allow: {
      prefixes: opts.allow,
      allowTasks: opts.allowTasks,
      allowBase: opts.allowBase,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
    },
    requireClean: opts.requireClean,
  });
  throwIfPolicyDenied(res);
}

export async function gitStatusChangedPaths(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<string[]> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const git = new GitContext({ gitRoot: resolved.gitRoot });
  return await git.statusChangedPaths();
}

export async function ensureGitClean(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
}): Promise<void> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const staged = await ctx.git.statusStagedPaths();
  if (staged.length > 0) {
    throw new CliError({ exitCode: 5, code: "E_GIT", message: "Working tree has staged changes" });
  }
  // Policy-defined "clean" ignores untracked files.
  const unstaged = await ctx.git.statusUnstagedTrackedPaths();
  if (unstaged.length > 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "Working tree has unstaged changes",
    });
  }
}

async function stageAllowlist(opts: {
  ctx: CommandContext;
  allow: string[];
  allowTasks: boolean;
  tasksPath: string;
}): Promise<string[]> {
  const changed = await opts.ctx.git.statusChangedPaths();
  if (changed.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "No changes to stage (working tree clean)",
    });
  }

  const allow = opts.allow.map((prefix) => normalizeGitPathPrefix(prefix));
  const denied = new Set<string>();
  if (!opts.allowTasks) denied.add(opts.tasksPath);

  const staged: string[] = [];
  for (const filePath of changed) {
    if (denied.has(filePath)) continue;
    if (allow.some((prefix) => gitPathIsUnderPrefix(filePath, prefix))) {
      staged.push(filePath);
    }
  }

  const unique = [...new Set(staged)].toSorted((a, b) => a.localeCompare(b));
  if (unique.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message:
        "No changes matched allowed prefixes (use --commit-auto-allow or update --commit-allow)",
    });
  }

  // `git add <pathspec>` is not reliable for staging deletes/renames across versions/configs.
  // `-A -- <pathspec...>` makes the allowlist staging semantics deterministic.
  await opts.ctx.git.stage(unique);
  return unique;
}

function deriveCommitMessageFromComment(opts: {
  taskId: string;
  body: string;
  emoji: string;
  formattedComment?: string | null;
  config: AgentplaneConfig;
}): string {
  const raw = (opts.formattedComment ?? formatCommentBodyForCommit(opts.body, opts.config))
    .trim()
    .replaceAll(/\s+/g, " ");
  if (!raw) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Comment body is required to build a commit message from the task comment",
    });
  }
  const summary = raw.replace(/^(start|blocked|verified):\s+/i, "").trim();
  if (!summary) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Comment body is required to build a commit message from the task comment",
    });
  }
  const prefix = opts.emoji.trim();
  if (!prefix) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Emoji prefix is required when deriving commit messages from task comments",
    });
  }
  const suffix = extractTaskSuffix(opts.taskId);
  if (!suffix) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: invalidValueMessage("task id", opts.taskId, "valid task id"),
    });
  }
  return `${prefix} ${suffix} task: ${summary}`;
}

function deriveCommitBodyFromComment(opts: {
  taskId: string;
  author?: string;
  statusFrom?: string;
  statusTo?: string;
  commentBody: string;
  formattedComment: string;
}): string {
  const lines = [
    `Task: ${opts.taskId}`,
    ...(opts.author ? [`Agent: ${opts.author}`] : []),
    ...(opts.statusFrom && opts.statusTo ? [`Status: ${opts.statusFrom} -> ${opts.statusTo}`] : []),
    `Comment: ${normalizeCommentBodyForCommit(opts.formattedComment || opts.commentBody)}`,
  ];

  return lines.join("\n").trimEnd();
}

export async function commitFromComment(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author?: string;
  statusFrom?: string;
  statusTo?: string;
  commentBody: string;
  formattedComment: string | null;
  emoji: string;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  requireClean: boolean;
  quiet: boolean;
  config: AgentplaneConfig;
}): Promise<{ hash: string; message: string; staged: string[] }> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  let allowPrefixes = opts.allow.map((prefix) => prefix.trim()).filter(Boolean);
  if (opts.autoAllow && allowPrefixes.length === 0) {
    const changed = await ctx.git.statusChangedPaths();
    const tasksPath = opts.config.paths.tasks_path;
    // Auto-allow is for ergonomic status commits. It must never silently
    // broaden into policy/config/CI changes (those require explicit intent).
    const eligible = changed.filter((filePath) => {
      const kind = protectedPathKindForFile({ filePath, tasksPath });
      if (!kind) return true;
      if (kind === "tasks") return opts.allowTasks;
      return false;
    });
    allowPrefixes = suggestAllowPrefixes(eligible);
  }
  if (allowPrefixes.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "Provide at least one --commit-allow prefix or enable --commit-auto-allow",
    });
  }

  const staged = await stageAllowlist({
    ctx,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
    tasksPath: opts.config.paths.tasks_path,
  });

  const message = deriveCommitMessageFromComment({
    taskId: opts.taskId,
    body: opts.commentBody,
    emoji: opts.emoji,
    formattedComment: opts.formattedComment,
    config: opts.config,
  });
  const formattedComment =
    opts.formattedComment ?? formatCommentBodyForCommit(opts.commentBody, opts.config);
  const body = deriveCommitBodyFromComment({
    taskId: opts.taskId,
    author: opts.author,
    statusFrom: opts.statusFrom,
    statusTo: opts.statusTo,
    commentBody: opts.commentBody,
    formattedComment,
  });

  await guardCommitCheck({
    ctx,
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    message,
    allow: allowPrefixes,
    allowBase: false,
    allowTasks: opts.allowTasks,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: opts.requireClean,
    quiet: opts.quiet,
  });

  // Never allow base-branch code commits implicitly from comment-driven commits.
  // Base overrides must be explicit via the `commit` command's --allow-base flag.
  const env = buildGitCommitEnv({
    taskId: opts.taskId,
    allowTasks: opts.allowTasks,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
  });
  await ctx.git.commit({ message, body, env });

  const { hash, subject } = await ctx.git.headHashSubject();
  if (!opts.quiet) {
    process.stdout.write(
      `${successMessage(
        "committed",
        `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim(),
        `staged=${staged.join(", ")}`,
      )}\n`,
    );
  }
  return { hash, message: subject, staged };
}

export async function cmdGuardClean(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const ctx = await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const staged = await ctx.git.statusStagedPaths();
    if (staged.length > 0) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: "Staged files exist",
      });
    }
    if (!opts.quiet) {
      process.stdout.write(`${successMessage("index clean", undefined, "no staged files")}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "guard clean", root: opts.rootOverride ?? null });
  }
}

export async function cmdGuardSuggestAllow(opts: {
  cwd: string;
  rootOverride?: string;
  format: "lines" | "args";
}): Promise<number> {
  try {
    const ctx = await loadCommandContext({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const staged = await ctx.git.statusStagedPaths();
    if (staged.length === 0) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "No staged files (git index empty)",
      });
    }
    const prefixes = suggestAllowPrefixes(staged);
    if (opts.format === "args") {
      const args = prefixes.map((p) => `--allow ${p}`).join(" ");
      process.stdout.write(`${args}\n`);
    } else {
      for (const prefix of prefixes) process.stdout.write(`${prefix}\n`);
    }
    return 0;
  } catch (err) {
    throw mapCoreError(err, { command: "guard suggest-allow", root: opts.rootOverride ?? null });
  }
}

export async function cmdGuardCommit(opts: GuardCommitOptions): Promise<number> {
  try {
    await guardCommitCheck(opts);
    if (!opts.quiet) process.stdout.write("OK\n");
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "guard commit", root: opts.rootOverride ?? null });
  }
}

export async function cmdCommit(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
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
}): Promise<number> {
  try {
    let allow = opts.allow;
    if (opts.autoAllow && allow.length === 0) {
      const ctx =
        opts.ctx ??
        (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
      const staged = await ctx.git.statusStagedPaths();
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

    await guardCommitCheck({
      ctx: opts.ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      message: opts.message,
      allow,
      allowBase: opts.allowBase,
      allowTasks: opts.allowTasks,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
      requireClean: opts.requireClean,
      quiet: opts.quiet,
    });

    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const env = buildGitCommitEnv({
      taskId: opts.taskId,
      allowTasks: opts.allowTasks,
      allowBase: opts.allowBase,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
    });
    await ctx.git.commit({ message: opts.message, env });

    if (!opts.quiet) {
      const { hash, subject } = await ctx.git.headHashSubject();
      process.stdout.write(
        `${successMessage("committed", `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim())}\n`,
      );
    }
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "commit", root: opts.rootOverride ?? null });
  }
}
