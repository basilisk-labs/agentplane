import { mapCoreError } from "../../../cli/error-map.js";
import { successMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { loadCommandContext, type CommandContext } from "../../shared/task-backend.js";

import { suggestAllowPrefixes } from "./allow.js";
import { buildGitCommitEnv } from "./env.js";
import { guardCommitCheck, type GuardCommitOptions } from "./policy.js";

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
