import { mapCoreError } from "../../../cli/error-map.js";
import { successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";
import { loadTaskFromContext } from "../../shared/task-backend.js";
import { execFileAsync, gitEnv } from "../../shared/git.js";

import { suggestAllowPrefixes } from "./allow.js";
import { buildCloseCommitMessage, taskReadmePathForTask } from "./close-message.js";
import { buildGitCommitEnv } from "./env.js";
import { guardCommitCheck, type GuardCommitOptions } from "./policy.js";

type ExecFileLikeError = Error & {
  cmd?: unknown;
  code?: unknown;
  stdout?: unknown;
  stderr?: unknown;
};

function readText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Buffer.isBuffer(value)) return value.toString("utf8");
  return "";
}

function summarizeOutput(raw: string): string[] {
  const lines = raw
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0)
    .map((line) => (line.length > 180 ? `${line.slice(0, 180)} [truncated]` : line));

  if (lines.length <= 12) return lines;
  const head = lines.slice(0, 6);
  const tail = lines.slice(-6);
  return [...head, `[${lines.length - 12} lines omitted]`, ...tail];
}

function asCommitFailure(err: unknown): CliError | null {
  if (err instanceof Error) {
    const e = err as ExecFileLikeError;
    const cmd = typeof e.cmd === "string" ? e.cmd : "";
    if (cmd.startsWith("git commit")) {
      const output = [readText(e.stderr), readText(e.stdout)]
        .filter((part) => part.length > 0)
        .join("\n");
      const summary = summarizeOutput(output);
      const code = typeof e.code === "number" ? e.code : null;
      const lines = ["git commit failed (hook or commit policy).", `command: ${cmd}`];
      if (typeof code === "number") {
        lines.push(`exit_code: ${code}`);
      }
      if (summary.length > 0) lines.push("output_summary:");
      lines.push(...summary.map((line) => `  ${line}`));

      return new CliError({
        exitCode: 5,
        code: "E_GIT",
        message: lines.join("\n"),
      });
    }
    return null;
  }
  return null;
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
  closeUnstageOthers: boolean;
  closeCheckOnly: boolean;
}): Promise<number> {
  try {
    if (opts.close) {
      const ctx =
        opts.ctx ??
        (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));

      // Make the close commit deterministic: start from a clean index unless --unstage-others is used.
      let staged = await ctx.git.statusStagedPaths();
      if (staged.length > 0 && opts.closeUnstageOthers) {
        if (!opts.closeCheckOnly) {
          await execFileAsync("git", ["restore", "--staged", "--", "."], {
            cwd: ctx.resolvedProject.gitRoot,
            env: gitEnv(),
          });
        }
        staged = opts.closeCheckOnly ? staged : await ctx.git.statusStagedPaths();
      }
      if (staged.length > 0 && !opts.closeUnstageOthers) {
        throw new CliError({
          exitCode: 5,
          code: "E_GIT",
          message:
            "Staged files exist (close commit requires an empty index; rerun with --unstage-others to auto-unstage).",
        });
      }

      const task = await loadTaskFromContext({ ctx, taskId: opts.taskId });
      const msg = await buildCloseCommitMessage({ gitRoot: ctx.resolvedProject.gitRoot, task });
      const readmeAbs = taskReadmePathForTask({
        gitRoot: ctx.resolvedProject.gitRoot,
        workflowDir: ctx.config.paths.workflow_dir,
        taskId: opts.taskId,
      });
      const readmeRel = readmeAbs.startsWith(ctx.resolvedProject.gitRoot)
        ? readmeAbs.slice(ctx.resolvedProject.gitRoot.length + 1)
        : readmeAbs;
      if (opts.closeCheckOnly) {
        if (!opts.quiet) {
          const stagedCount = staged.length;
          const suffix =
            stagedCount > 0 && opts.closeUnstageOthers
              ? `; would unstage ${stagedCount} path(s)`
              : "";
          process.stdout.write(
            `${successMessage("close preflight", opts.taskId, `subject=${msg.subject}${suffix}`)}\n`,
          );
        }
        return 0;
      }
      await ctx.git.stage([readmeRel]);

      // Close commits should not require manual --allow flags:
      // the command stages exactly one task README under workflow_dir.
      const allow = [ctx.config.paths.workflow_dir];
      await guardCommitCheck({
        ctx,
        cwd: opts.cwd,
        rootOverride: opts.rootOverride,
        taskId: opts.taskId,
        message: msg.subject,
        allow,
        allowBase: false,
        allowTasks: true,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
        requireClean: true,
        quiet: opts.quiet,
      });

      const env = buildGitCommitEnv({
        taskId: opts.taskId,
        allowTasks: true,
        allowBase: false,
        allowPolicy: false,
        allowConfig: false,
        allowHooks: false,
        allowCI: false,
      });
      await ctx.git.commit({ message: msg.subject, body: msg.body, env });

      if (!opts.quiet) {
        const { hash, subject } = await ctx.git.headHashSubject();
        process.stdout.write(
          `${successMessage("committed", `${hash?.slice(0, 12) ?? ""} ${subject ?? ""}`.trim())}\n`,
        );
      }
      return 0;
    }

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
    const commitFailure = asCommitFailure(err);
    if (commitFailure) throw commitFailure;
    throw mapCoreError(err, { command: "commit", root: opts.rootOverride ?? null });
  }
}
