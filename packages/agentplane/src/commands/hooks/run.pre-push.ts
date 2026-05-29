import { resolveProject } from "@agentplaneorg/core/project";
import { runProcessSync } from "@agentplaneorg/core/process";
import path from "node:path";

import { fileExists } from "../../cli/fs-utils.js";
import { resolveAgentplaneRepoScriptPath } from "../../shared/package-paths.js";
import {
  enforceTaskBoundOutgoingCommits,
  fail,
  failIfPollutedReleaseGitConfig,
  failIfTrackedChanges,
  hasReleaseTagPush,
  HookFailure,
  isDeleteOnlyPush,
  isTruthyHookEnv,
  parsePrePushStdin,
  readChangedFilesForRange,
  readPackageScripts,
  resolveDefaultBaseRef,
  runOptionalProjectScript,
  runReleaseNotesCheck,
  sanitizeCiEnv,
  selectBranchDiffRange,
} from "./run.pre-push.helpers.js";
import type { HooksRunOptions } from "./run.js";

const resolveBundledPrePushHookScriptPath = (): string =>
  resolveAgentplaneRepoScriptPath("run-pre-push-hook.mjs");

export async function resolvePrePushHookScriptPath(
  gitRoot: string,
  opts: { bundledScriptPath?: string } = {},
): Promise<string | null> {
  const repoScriptPath = path.join(gitRoot, "scripts", "run-pre-push-hook.mjs");
  if (await fileExists(repoScriptPath)) return repoScriptPath;
  const bundledScriptPath = opts.bundledScriptPath ?? resolveBundledPrePushHookScriptPath();
  if (await fileExists(bundledScriptPath)) return bundledScriptPath;
  return null;
}

function runInternalPrePushHook(gitRoot: string, stdin: string): number {
  try {
    const updates = parsePrePushStdin(stdin);
    const envRelease = isTruthyHookEnv("AGENTPLANE_HOOKS_RELEASE");
    const envFull = isTruthyHookEnv("AGENTPLANE_HOOKS_FULL");
    const isReleasePush = envRelease || envFull || hasReleaseTagPush(updates);
    if (!isReleasePush && isDeleteOnlyPush(updates)) {
      process.stdout.write("Skipping pre-push checks for delete-only remote branch cleanup.\n");
      return 0;
    }

    const mode = isReleasePush ? "release" : "standard";
    process.stdout.write(`Running pre-push checks in ${mode} mode.\n`);
    if (isReleasePush) failIfPollutedReleaseGitConfig(gitRoot);
    const ciScript = envFull ? "ci:local:full" : "ci:local:fast";
    const scripts = readPackageScripts(gitRoot);
    const diffRange = selectBranchDiffRange(updates, {
      newBranchFallbackRef: resolveDefaultBaseRef(gitRoot),
    });
    const changedFiles = readChangedFilesForRange(gitRoot, diffRange);
    enforceTaskBoundOutgoingCommits(gitRoot, diffRange);
    const ciEnv =
      changedFiles.length > 0
        ? sanitizeCiEnv({ ...process.env, AGENTPLANE_FAST_CHANGED_FILES: changedFiles.join("\n") })
        : sanitizeCiEnv(process.env);

    const formatResult = runOptionalProjectScript(gitRoot, scripts, "format:check", {
      env: sanitizeCiEnv(process.env),
      heading: "\n== Format (check) ==\n",
    });
    if (formatResult.exitCode !== 0) {
      failIfTrackedChanges(
        gitRoot,
        "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
      );
      fail(
        "pre-push blocked: formatting check failed. Run `bun run format`, review the diff, commit it, and push again.",
      );
    }
    if (!formatResult.skipped) {
      failIfTrackedChanges(
        gitRoot,
        "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
      );
    }

    const ciResult = runOptionalProjectScript(gitRoot, scripts, ciScript, { env: ciEnv });
    if (!ciResult.skipped) {
      failIfTrackedChanges(
        gitRoot,
        `pre-push blocked: ${ciScript} changed tracked files. Commit or revert those changes and push again.`,
      );
    }
    if (ciResult.exitCode !== 0) {
      fail(`pre-push blocked: ${ciScript} failed. Fix the reported checks and push again.`);
    }

    if (isReleasePush) {
      const notesExitCode = runReleaseNotesCheck(gitRoot);
      if (notesExitCode !== null && notesExitCode !== 0) return notesExitCode;
      return runOptionalProjectScript(gitRoot, scripts, "release:prepublish", {
        env: sanitizeCiEnv(process.env),
      }).exitCode;
    }
    return 0;
  } catch (error) {
    if (error instanceof HookFailure) {
      process.stderr.write(`\n${error.message}\n`);
      for (const detail of error.details) {
        if (!detail) continue;
        process.stderr.write(`${detail}\n`);
      }
      return 1;
    }
    throw error;
  }
}

async function readHookStdinUtf8(timeoutMs = 25): Promise<string> {
  if (process.stdin.isTTY) return "";

  const chunks: Buffer[] = [];
  const consume = (): void => {
    let chunk = process.stdin.read() as string | Buffer | null;
    while (chunk !== null) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
      chunk = process.stdin.read() as string | Buffer | null;
    }
  };

  consume();
  if (chunks.length > 0 || process.stdin.readableEnded) {
    return Buffer.concat(chunks).toString("utf8");
  }

  await new Promise<void>((resolve) => {
    const finish = (): void => {
      clearTimeout(timer);
      process.stdin.off("readable", onReadable);
      process.stdin.off("end", onEnd);
      resolve();
    };
    const onReadable = (): void => {
      consume();
      finish();
    };
    const onEnd = (): void => {
      consume();
      finish();
    };
    const timer = setTimeout(finish, timeoutMs);
    process.stdin.on("readable", onReadable);
    process.stdin.on("end", onEnd);
    process.stdin.resume();
  });

  consume();
  return Buffer.concat(chunks).toString("utf8");
}

export async function runPrePushHook(opts: HooksRunOptions): Promise<number> {
  const resolved = await resolveProject({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
  });
  const stdin = await readHookStdinUtf8();
  const scriptPath = await resolvePrePushHookScriptPath(resolved.gitRoot);
  if (!scriptPath) {
    return runInternalPrePushHook(resolved.gitRoot, stdin);
  }
  const result = runProcessSync({
    command: "node",
    args: [scriptPath],
    cwd: resolved.gitRoot,
    env: process.env,
    encoding: "utf8",
    input: stdin,
    stdin: "pipe",
    stdout: "inherit",
    stderr: "inherit",
    reject: false,
  });
  return result.exitCode ?? (result.signal ? 1 : 0);
}
