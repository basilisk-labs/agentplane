import {
  extractTaskSuffix,
  getStagedFiles,
  getUnstagedFiles,
  loadConfig,
  resolveProject,
  validateCommitSubject,
} from "@agentplaneorg/core";

import { mapCoreError } from "../../cli/error-map.js";
import { invalidValueMessage, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { formatCommentBodyForCommit } from "../../shared/comment-format.js";
import { execFileAsync } from "../shared/git.js";
import {
  getProtectedPathOverride,
  protectedPathKindForFile,
} from "../../shared/protected-paths.js";

function pathIsUnder(candidate: string, prefix: string): boolean {
  if (prefix === "." || prefix === "") return true;
  if (candidate === prefix) return true;
  return candidate.startsWith(`${prefix}/`);
}

function normalizeAllowPrefix(prefix: string): string {
  const raw = prefix.trim();
  if (raw === "." || raw === "./" || raw === ".\\") return ".";

  // Normalize user-provided allow prefixes so staging and checks agree.
  // Git paths are treated as repo-relative POSIX paths.
  let p = raw.replaceAll("\\", "/");
  while (p.startsWith("./")) p = p.slice(2);
  p = p.replaceAll(/\/{2,}/g, "/");
  p = p.replaceAll(/\/+$/g, "");
  return p;
}

function parseNullSeparatedPaths(stdout: Buffer | string): string[] {
  const text = Buffer.isBuffer(stdout) ? stdout.toString("utf8") : stdout;
  return text
    .split("\0")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

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
  "Usage: agentplane guard commit <task-id> -m <message> --allow <path> [--allow <path>...] [--auto-allow] [--allow-tasks] [--require-clean] [--quiet]";
export const GUARD_COMMIT_USAGE_EXAMPLE =
  'agentplane guard commit 202602030608-F1Q8AB -m "✨ F1Q8AB update" --allow packages/agentplane';
export const COMMIT_USAGE = "Usage: agentplane commit <task-id> -m <message>";
export const COMMIT_USAGE_EXAMPLE = 'agentplane commit 202602030608-F1Q8AB -m "✨ F1Q8AB update"';

type GuardCommitOptions = {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  message: string;
  allow: string[];
  allowTasks: boolean;
  allowPolicy: boolean;
  allowConfig: boolean;
  allowHooks: boolean;
  allowCI: boolean;
  requireClean: boolean;
  quiet: boolean;
};

async function guardCommitCheck(opts: GuardCommitOptions): Promise<void> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const loaded = await loadConfig(resolved.agentplaneDir);
  const policy = validateCommitSubject({
    subject: opts.message,
    taskId: opts.taskId,
    genericTokens: loaded.config.commit.generic_tokens,
  });
  if (!policy.ok) {
    throw new CliError({ exitCode: 5, code: "E_GIT", message: policy.errors.join("\n") });
  }

  const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  if (staged.length === 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "No staged files (git index empty)",
    });
  }
  if (opts.allow.length === 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "Provide at least one --allow <path> prefix",
    });
  }

  const allow = opts.allow.map((prefix) => normalizeAllowPrefix(prefix));
  const tasksPath = loaded.config.paths.tasks_path;

  if (opts.requireClean) {
    const unstaged = await getUnstagedFiles({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    if (unstaged.length > 0) {
      throw new CliError({ exitCode: 5, code: "E_GIT", message: "Working tree is dirty" });
    }
  }

  for (const filePath of staged) {
    const kind = protectedPathKindForFile({ filePath, tasksPath });
    if (kind === "tasks" && !opts.allowTasks) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Staged file is forbidden by default: ${filePath} (use --allow-tasks to override)`,
      });
    }
    if (kind && kind !== "tasks") {
      const override = getProtectedPathOverride(kind);
      const allowed =
        (kind === "policy" && opts.allowPolicy) ||
        (kind === "config" && opts.allowConfig) ||
        (kind === "hooks" && opts.allowHooks) ||
        (kind === "ci" && opts.allowCI);
      if (!allowed) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message: `Staged file is protected by default: ${filePath} (use ${override.cliFlag} to override)`,
        });
      }
    }
    if (!allow.some((prefix) => pathIsUnder(filePath, prefix))) {
      throw new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: `Staged file is outside allowlist: ${filePath}`,
      });
    }
  }
}

export async function gitStatusChangedPaths(opts: {
  cwd: string;
  rootOverride?: string;
}): Promise<string[]> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });

  const optsExec = {
    cwd: resolved.gitRoot,
    encoding: "buffer" as const,
    maxBuffer: 10 * 1024 * 1024,
  };
  const [unstaged, staged, untracked] = await Promise.all([
    execFileAsync("git", ["diff", "--name-only", "-z"], optsExec),
    execFileAsync("git", ["diff", "--name-only", "--cached", "-z"], optsExec),
    execFileAsync("git", ["ls-files", "--others", "--exclude-standard", "-z"], optsExec),
  ]);

  const files = [
    ...parseNullSeparatedPaths(unstaged.stdout),
    ...parseNullSeparatedPaths(staged.stdout),
    ...parseNullSeparatedPaths(untracked.stdout),
  ];
  return [...new Set(files)].toSorted((a, b) => a.localeCompare(b));
}

export async function ensureGitClean(opts: { cwd: string; rootOverride?: string }): Promise<void> {
  const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
  if (staged.length > 0) {
    throw new CliError({ exitCode: 5, code: "E_GIT", message: "Working tree has staged changes" });
  }
  const unstaged = await getUnstagedFiles({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  if (unstaged.length > 0) {
    throw new CliError({
      exitCode: 5,
      code: "E_GIT",
      message: "Working tree has unstaged changes",
    });
  }
}

async function stageAllowlist(opts: {
  cwd: string;
  rootOverride?: string;
  allow: string[];
  allowTasks: boolean;
}): Promise<string[]> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const changed = await gitStatusChangedPaths({ cwd: opts.cwd, rootOverride: opts.rootOverride });
  if (changed.length === 0) {
    throw new CliError({
      exitCode: 2,
      code: "E_USAGE",
      message: "No changes to stage (working tree clean)",
    });
  }

  const allow = opts.allow.map((prefix) => normalizeAllowPrefix(prefix));
  const denied = new Set<string>();
  if (!opts.allowTasks) denied.add(".agentplane/tasks.json");

  const staged: string[] = [];
  for (const filePath of changed) {
    if (denied.has(filePath)) continue;
    if (allow.some((prefix) => pathIsUnder(filePath, prefix))) {
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
  await execFileAsync("git", ["add", "-A", "--", ...unique], { cwd: resolved.gitRoot });
  return unique;
}

function deriveCommitMessageFromComment(opts: {
  taskId: string;
  body: string;
  emoji: string;
  formattedComment?: string | null;
  config: Awaited<ReturnType<typeof loadConfig>>["config"];
}): string {
  const summary = (opts.formattedComment ?? formatCommentBodyForCommit(opts.body, opts.config))
    .trim()
    .replaceAll(/\s+/g, " ");
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
  return `${prefix} ${suffix} ${summary}`;
}

export async function commitFromComment(opts: {
  cwd: string;
  rootOverride?: string;
  taskId: string;
  commentBody: string;
  formattedComment: string | null;
  emoji: string;
  allow: string[];
  autoAllow: boolean;
  allowTasks: boolean;
  requireClean: boolean;
  quiet: boolean;
  config: Awaited<ReturnType<typeof loadConfig>>["config"];
}): Promise<{ hash: string; message: string; staged: string[] }> {
  let allowPrefixes = opts.allow.map((prefix) => prefix.trim()).filter(Boolean);
  if (opts.autoAllow && allowPrefixes.length === 0) {
    const changed = await gitStatusChangedPaths({ cwd: opts.cwd, rootOverride: opts.rootOverride });
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
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
  });

  const message = deriveCommitMessageFromComment({
    taskId: opts.taskId,
    body: opts.commentBody,
    emoji: opts.emoji,
    formattedComment: opts.formattedComment,
    config: opts.config,
  });

  await guardCommitCheck({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride,
    taskId: opts.taskId,
    message,
    allow: allowPrefixes,
    allowTasks: opts.allowTasks,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: opts.requireClean,
    quiet: opts.quiet,
  });

  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
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
  await execFileAsync("git", ["commit", "-m", message], { cwd: resolved.gitRoot, env });

  const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s"], {
    cwd: resolved.gitRoot,
  });
  const trimmed = stdout.trim();
  const [hash, subject] = trimmed.split(":", 2);
  if (!opts.quiet) {
    process.stdout.write(
      `${successMessage(
        "committed",
        `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim(),
        `staged=${staged.join(", ")}`,
      )}\n`,
    );
  }
  return { hash: hash ?? "", message: subject ?? "", staged };
}

export async function cmdGuardClean(opts: {
  cwd: string;
  rootOverride?: string;
  quiet: boolean;
}): Promise<number> {
  try {
    const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
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
    const staged = await getStagedFiles({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null });
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
      const staged = await getStagedFiles({
        cwd: opts.cwd,
        rootOverride: opts.rootOverride ?? null,
      });
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
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
      message: opts.message,
      allow,
      allowTasks: opts.allowTasks,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
      requireClean: opts.requireClean,
      quiet: opts.quiet,
    });

    const resolved = await resolveProject({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
    });
    const env = buildGitCommitEnv({
      taskId: opts.taskId,
      allowTasks: opts.allowTasks,
      allowBase: opts.allowBase,
      allowPolicy: opts.allowPolicy,
      allowConfig: opts.allowConfig,
      allowHooks: opts.allowHooks,
      allowCI: opts.allowCI,
    });
    await execFileAsync("git", ["commit", "-m", opts.message], { cwd: resolved.gitRoot, env });

    if (!opts.quiet) {
      const { stdout } = await execFileAsync("git", ["log", "-1", "--pretty=%H:%s"], {
        cwd: resolved.gitRoot,
      });
      const trimmed = stdout.trim();
      const [hash, subject] = trimmed.split(":", 2);
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
