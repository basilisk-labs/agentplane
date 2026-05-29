import { runProcessSync } from "@agentplaneorg/core/process";
import fs from "node:fs";
import path from "node:path";

import {
  resolvePreferredNodeExecutable,
  withPreferredRuntimePath,
} from "../../shared/runtime-env.js";
import { findTaskBoundOutgoingCommitFailures } from "./pre-push-task-binding.js";

export type PrePushUpdate = {
  localRef: string;
  localSha: string;
  remoteRef: string;
  remoteSha: string;
};

type PackageScripts = Record<string, string>;

export class HookFailure extends Error {
  constructor(
    message: string,
    readonly details: string[] = [],
  ) {
    super(message);
    this.name = "HookFailure";
  }
}

export function parsePrePushStdin(rawStdin: string): PrePushUpdate[] {
  return rawStdin
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [localRef = "", localSha = "", remoteRef = "", remoteSha = ""] = line.split(/\s+/);
      return { localRef, localSha, remoteRef, remoteSha };
    });
}

const isAllZeroSha = (value: string): boolean => /^[0]+$/.test(value);

const isBranchRef = (ref: string): boolean => ref.startsWith("refs/heads/");

function runHookCommand(gitRoot: string, command: string, args: readonly string[]): number {
  const result = runProcessSync({
    command,
    args,
    cwd: gitRoot,
    env: withPreferredRuntimePath(process.env),
    stdout: "inherit",
    stderr: "inherit",
    reject: false,
  });
  return result.exitCode ?? (result.signal ? 1 : 0);
}

function runHookCommandWithEnv(
  gitRoot: string,
  command: string,
  args: readonly string[],
  env: NodeJS.ProcessEnv,
): number {
  const result = runProcessSync({
    command,
    args,
    cwd: gitRoot,
    env,
    stdout: "inherit",
    stderr: "inherit",
    reject: false,
  });
  return result.exitCode ?? (result.signal ? 1 : 0);
}

export function sanitizeCiEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const nextEnv: NodeJS.ProcessEnv = { ...env };
  delete nextEnv.GIT_DIR;
  delete nextEnv.GIT_WORK_TREE;
  delete nextEnv.GIT_COMMON_DIR;
  delete nextEnv.GIT_INDEX_FILE;
  delete nextEnv.GIT_OBJECT_DIRECTORY;
  delete nextEnv.GIT_ALTERNATE_OBJECT_DIRECTORIES;
  delete nextEnv.GIT_PREFIX;
  delete nextEnv.AGENTPLANE_TASK_ID;
  delete nextEnv.AGENTPLANE_ALLOW_BASE;
  delete nextEnv.AGENTPLANE_ALLOW_TASKS;
  delete nextEnv.AGENTPLANE_ALLOW_POLICY;
  delete nextEnv.AGENTPLANE_ALLOW_CONFIG;
  delete nextEnv.AGENTPLANE_ALLOW_HOOKS;
  delete nextEnv.AGENTPLANE_ALLOW_CI;
  delete nextEnv.AGENTPLANE_ALLOW_UPGRADE;
  return nextEnv;
}

function readGitText(gitRoot: string, args: readonly string[]): string {
  const result = runProcessSync({
    command: "git",
    args,
    cwd: gitRoot,
    encoding: "utf8",
    reject: false,
  });
  if (result.exitCode !== 0) return "";
  return String(result.stdout ?? "").trim();
}

export function readPackageScripts(gitRoot: string): PackageScripts {
  const packagePath = path.join(gitRoot, "package.json");
  if (!fs.existsSync(packagePath)) return {};
  try {
    const parsed = JSON.parse(fs.readFileSync(packagePath, "utf8")) as { scripts?: unknown };
    if (!parsed.scripts || typeof parsed.scripts !== "object" || Array.isArray(parsed.scripts)) {
      return {};
    }
    const scripts: PackageScripts = {};
    for (const [name, value] of Object.entries(parsed.scripts)) {
      if (typeof value === "string") scripts[name] = value;
    }
    return scripts;
  } catch (error) {
    throw new HookFailure("pre-push blocked: package.json could not be parsed.", [
      error instanceof Error ? error.message : String(error),
      "Fix package.json before relying on optional project-script detection.",
    ]);
  }
}

const hasProjectScript = (scripts: PackageScripts, name: string): boolean =>
  Object.hasOwn(scripts, name);

export function runOptionalProjectScript(
  gitRoot: string,
  scripts: PackageScripts,
  name: string,
  opts: { env?: NodeJS.ProcessEnv; heading?: string } = {},
): { exitCode: number; skipped: boolean } {
  if (!hasProjectScript(scripts, name)) {
    process.stdout.write(`Skipping ${name}: package.json script is not defined.\n`);
    return { exitCode: 0, skipped: true };
  }
  if (opts.heading) process.stdout.write(opts.heading);
  const exitCode = opts.env
    ? runHookCommandWithEnv(gitRoot, "bun", ["run", name], opts.env)
    : runHookCommand(gitRoot, "bun", ["run", name]);
  return { exitCode, skipped: false };
}

const trackedChangesShort = (gitRoot: string): string =>
  readGitText(gitRoot, ["status", "--short", "--untracked-files=no"]);

const readLocalGitConfigBool = (gitRoot: string, name: string): string =>
  readGitText(gitRoot, ["config", "--local", "--get", "--bool", name]);

export const fail = (message: string, details: string[] = []): never => {
  throw new HookFailure(message, details);
};

export function failIfTrackedChanges(gitRoot: string, message: string): void {
  const changes = trackedChangesShort(gitRoot);
  if (!changes) return;
  fail(message, [changes]);
}

export function failIfPollutedReleaseGitConfig(gitRoot: string): void {
  if (readLocalGitConfigBool(gitRoot, "core.bare") !== "true") return;
  fail("pre-push blocked: release checks cannot run because local git config has core.bare=true.", [
    "This indicates repository config pollution, not a release payload failure.",
    "Restore the checkout git config before retrying release verification.",
  ]);
}

export function enforceTaskBoundOutgoingCommits(
  gitRoot: string,
  range: { from: string; to: string } | null,
): void {
  const failures = findTaskBoundOutgoingCommitFailures(gitRoot, range);
  if (failures.length === 0) return;
  fail(
    "pre-push blocked: mutating commits require a valid task id or emergency backfill evidence.",
    [
      ...failures,
      "Fix:",
      "  1) Reword the commit subject to include a valid task suffix/id from .agentplane/tasks.",
      "  2) Or commit from task/<task-id>/<slug> / AGENTPLANE_TASK_ID through AgentPlane.",
      "  3) For emergency hotfixes, add trailers: Emergency-Hotfix: true, Backfill-Task: <task-id>, Backfill-Evidence: <evidence>.",
      "  4) For tiny deploy-only fixes, use subject `🚑 deploy-fix: ...` plus trailers: Deploy-Fix: true, Deploy-Fix-Evidence: <evidence>.",
    ],
  );
}

const gitRefExists = (gitRoot: string, ref: string): boolean =>
  readGitText(gitRoot, ["rev-parse", "--verify", "--quiet", ref]).length > 0;

export const hasReleaseTagPush = (updates: readonly PrePushUpdate[]): boolean =>
  updates.some((update) => update.remoteRef.startsWith("refs/tags/"));

export function isDeleteOnlyPush(updates: readonly PrePushUpdate[]): boolean {
  return (
    updates.length > 0 &&
    updates.every(
      (update) =>
        isBranchRef(update.remoteRef) && isAllZeroSha(update.localSha) && Boolean(update.remoteSha),
    )
  );
}

export function resolveDefaultBaseRef(gitRoot: string): string | null {
  const remoteHead = readGitText(gitRoot, [
    "symbolic-ref",
    "--quiet",
    "--short",
    "refs/remotes/origin/HEAD",
  ]);
  if (remoteHead) return remoteHead;
  if (gitRefExists(gitRoot, "origin/main")) return "origin/main";
  if (gitRefExists(gitRoot, "main")) return "main";
  return null;
}

export function selectBranchDiffRange(
  updates: readonly PrePushUpdate[],
  opts: { newBranchFallbackRef?: string | null } = {},
): { from: string; to: string } | null {
  const branchUpdates = updates.filter(
    (update) => isBranchRef(update.localRef) && isBranchRef(update.remoteRef),
  );
  if (branchUpdates.length !== 1) return null;
  const [update] = branchUpdates;
  if (!update?.localSha || !update.remoteSha) return null;
  if (isAllZeroSha(update.localSha)) return null;
  if (isAllZeroSha(update.remoteSha)) {
    const fallbackRef =
      typeof opts.newBranchFallbackRef === "string" ? opts.newBranchFallbackRef.trim() : "";
    return fallbackRef ? { from: fallbackRef, to: update.localSha } : null;
  }
  return { from: update.remoteSha, to: update.localSha };
}

export function readChangedFilesForRange(
  gitRoot: string,
  range: { from: string; to: string } | null,
): string[] {
  if (!range) return [];
  const output = readGitText(gitRoot, ["diff", "--name-only", `${range.from}..${range.to}`]);
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export function isTruthyHookEnv(name: string): boolean {
  return (
    String(process.env[name] ?? "")
      .trim()
      .toLowerCase() === "1"
  );
}

export function runReleaseNotesCheck(gitRoot: string): number | null {
  const releaseNotesScript = path.join(gitRoot, "scripts", "check-release-notes.mjs");
  if (!fs.existsSync(releaseNotesScript)) {
    process.stdout.write(
      "Skipping release notes check: scripts/check-release-notes.mjs is not defined.\n",
    );
    return null;
  }
  return runHookCommand(gitRoot, resolvePreferredNodeExecutable(process.env), [
    "scripts/check-release-notes.mjs",
  ]);
}
