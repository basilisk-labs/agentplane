import { resolveProject } from "@agentplaneorg/core/project";
import { runProcessSync } from "@agentplaneorg/core/process";
import fs from "node:fs";
import path from "node:path";

import { fileExists } from "../../cli/fs-utils.js";
import { resolveAgentplaneRepoScriptPath } from "../../shared/package-paths.js";
import {
  resolvePreferredNodeExecutable,
  withPreferredRuntimePath,
} from "../../shared/runtime-env.js";
import type { HooksRunOptions } from "./run.js";

function resolveBundledPrePushHookScriptPath(): string {
  return resolveAgentplaneRepoScriptPath("run-pre-push-hook.mjs");
}

type PrePushUpdate = {
  localRef: string;
  localSha: string;
  remoteRef: string;
  remoteSha: string;
};

type PackageScripts = Record<string, string>;

class HookFailure extends Error {
  constructor(
    message: string,
    readonly details: string[] = [],
  ) {
    super(message);
    this.name = "HookFailure";
  }
}

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

function parsePrePushStdin(rawStdin: string): PrePushUpdate[] {
  return rawStdin
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [localRef = "", localSha = "", remoteRef = "", remoteSha = ""] = line.split(/\s+/);
      return { localRef, localSha, remoteRef, remoteSha };
    });
}

function isAllZeroSha(value: string): boolean {
  return /^[0]+$/.test(value);
}

function isBranchRef(ref: string): boolean {
  return ref.startsWith("refs/heads/");
}

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

function sanitizeCiEnv(env: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
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

function readPackageScripts(gitRoot: string): PackageScripts {
  try {
    const parsed = JSON.parse(fs.readFileSync(path.join(gitRoot, "package.json"), "utf8")) as {
      scripts?: unknown;
    };
    if (!parsed.scripts || typeof parsed.scripts !== "object" || Array.isArray(parsed.scripts)) {
      return {};
    }
    const scripts: PackageScripts = {};
    for (const [name, value] of Object.entries(parsed.scripts)) {
      if (typeof value === "string") scripts[name] = value;
    }
    return scripts;
  } catch {
    return {};
  }
}

function hasProjectScript(scripts: PackageScripts, name: string): boolean {
  return Object.hasOwn(scripts, name);
}

function runOptionalProjectScript(
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

function trackedChangesShort(gitRoot: string): string {
  return readGitText(gitRoot, ["status", "--short", "--untracked-files=no"]);
}

function readLocalGitConfigBool(gitRoot: string, name: string): string {
  return readGitText(gitRoot, ["config", "--local", "--get", "--bool", name]);
}

function fail(message: string, details: string[] = []): never {
  throw new HookFailure(message, details);
}

function failIfTrackedChanges(gitRoot: string, message: string): void {
  const changes = trackedChangesShort(gitRoot);
  if (!changes) return;
  fail(message, [changes]);
}

function failIfPollutedReleaseGitConfig(gitRoot: string): void {
  if (readLocalGitConfigBool(gitRoot, "core.bare") !== "true") return;
  fail("pre-push blocked: release checks cannot run because local git config has core.bare=true.", [
    "This indicates repository config pollution, not a release payload failure.",
    "Restore the checkout git config before retrying release verification.",
  ]);
}

const TASK_ID_RE = /\b\d{12}-[A-Z0-9]{6}\b/;
const TASK_SUBJECT_RE = /^\S+\s+([A-Z0-9]{6})\s+[a-z][a-z0-9_-]*(?:\/[a-z0-9_-]+)*:\s+.+$/;
const DOC_FILE_RE = /(^|\/)(README|CHANGELOG|CONTRIBUTING|LICENSE)(\.[^/]*)?$/i;
const DOC_EXT_RE = /\.(md|mdx|txt|adoc|rst)$/i;

function gitPathIsUnder(filePath: string, prefix: string): boolean {
  return filePath === prefix || filePath.startsWith(`${prefix}/`);
}

function isDocsOnlyPath(filePath: string): boolean {
  return (
    DOC_FILE_RE.test(filePath) ||
    DOC_EXT_RE.test(filePath) ||
    gitPathIsUnder(filePath, "docs") ||
    gitPathIsUnder(filePath, "website/docs")
  );
}

function isTaskArtifactPath(filePath: string): boolean {
  return filePath === ".agentplane/tasks.json" || gitPathIsUnder(filePath, ".agentplane/tasks");
}

function isMutatingPath(filePath: string): boolean {
  return !isTaskArtifactPath(filePath) && !isDocsOnlyPath(filePath);
}

function taskIdFromSubject(gitRoot: string, subject: string): string {
  const full = TASK_ID_RE.exec(subject)?.[0] ?? "";
  if (full) return full;
  const suffix = TASK_SUBJECT_RE.exec(subject)?.[1] ?? "";
  if (!suffix) return "";
  try {
    const taskRoot = path.join(gitRoot, ".agentplane", "tasks");
    const matches = fs
      .readdirSync(taskRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .filter((name) => name.toLowerCase().endsWith(`-${suffix.toLowerCase()}`));
    return matches.length === 1 ? (matches[0] ?? "") : "";
  } catch {
    return "";
  }
}

function hasEmergencyBackfillEvidence(body: string): boolean {
  if (!/^Emergency-Hotfix:\s*true\s*$/im.test(body)) return false;
  if (!/^Backfill-Task:\s*\d{12}-[A-Z0-9]{6}\s*$/im.test(body)) return false;
  const evidence = /^Backfill-Evidence:\s*(.+)$/im.exec(body)?.[1]?.trim() ?? "";
  return evidence.length >= 12;
}

function hasManagedUpgradeEvidence(body: string): boolean {
  const subject =
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? "";
  return /^⬆️\s+upgrade:\s+/u.test(subject) && /^Upgrade-Version:\s*\S+\s*$/im.test(body);
}

function isManagedInstallPath(filePath: string): boolean {
  return (
    filePath === "AGENTS.md" ||
    filePath === "CLAUDE.md" ||
    filePath === ".gitignore" ||
    filePath === ".env.example" ||
    gitPathIsUnder(filePath, ".agentplane") ||
    gitPathIsUnder(filePath, ".cursor") ||
    gitPathIsUnder(filePath, ".windsurf")
  );
}

function hasManagedInstallEvidence(body: string, mutatingPaths: readonly string[]): boolean {
  const subject =
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? "";
  if (
    !/^chore:\s+install agentplane \d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(
      subject,
    )
  ) {
    return false;
  }
  return (
    mutatingPaths.length > 0 && mutatingPaths.every((filePath) => isManagedInstallPath(filePath))
  );
}

function isManagedContextBootstrapPath(filePath: string): boolean {
  return (
    filePath === ".gitignore" ||
    gitPathIsUnder(filePath, ".agentplane/context") ||
    gitPathIsUnder(filePath, "context")
  );
}

function hasManagedContextBootstrapEvidence(
  body: string,
  mutatingPaths: readonly string[],
): boolean {
  const subject =
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? "";
  if (subject !== "✅ CTX1NT task: initialize AgentPlane context") return false;
  return (
    mutatingPaths.length > 0 &&
    mutatingPaths.every((filePath) => isManagedContextBootstrapPath(filePath))
  );
}

function readCommitList(gitRoot: string, range: { from: string; to: string } | null): string[] {
  if (!range) return [];
  return readGitText(gitRoot, ["log", "--format=%H", `${range.from}..${range.to}`])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readCommitFiles(gitRoot: string, commit: string): string[] {
  return readGitText(gitRoot, ["diff-tree", "--no-commit-id", "--name-only", "-r", "-m", commit])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readCommitBody(gitRoot: string, commit: string): string {
  return readGitText(gitRoot, ["show", "--format=%B", "--no-patch", commit]);
}

function enforceTaskBoundOutgoingCommits(
  gitRoot: string,
  range: { from: string; to: string } | null,
): void {
  const failures: string[] = [];
  for (const commit of readCommitList(gitRoot, range)) {
    const mutating = readCommitFiles(gitRoot, commit).filter((filePath) =>
      isMutatingPath(filePath),
    );
    if (mutating.length === 0) continue;

    const body = readCommitBody(gitRoot, commit);
    const subject =
      body
        .split("\n")
        .find((line) => line.trim())
        ?.trim() ?? "";
    if (taskIdFromSubject(gitRoot, subject)) continue;
    if (hasManagedUpgradeEvidence(body)) continue;
    if (hasManagedInstallEvidence(body, mutating)) continue;
    if (hasManagedContextBootstrapEvidence(body, mutating)) continue;
    if (hasEmergencyBackfillEvidence(body)) continue;

    failures.push(
      [
        `${commit.slice(0, 12)} ${subject || "(empty subject)"}`,
        `  mutating_paths=${mutating.slice(0, 6).join(", ")}${mutating.length > 6 ? ", ..." : ""}`,
      ].join("\n"),
    );
  }
  if (failures.length === 0) return;
  fail(
    "pre-push blocked: mutating commits require a valid task id or emergency backfill evidence.",
    [
      ...failures,
      "Fix:",
      "  1) Reword the commit subject to include a valid task suffix/id from .agentplane/tasks.",
      "  2) Or commit from task/<task-id>/<slug> / AGENTPLANE_TASK_ID through AgentPlane.",
      "  3) For emergency hotfixes, add trailers: Emergency-Hotfix: true, Backfill-Task: <task-id>, Backfill-Evidence: <evidence>.",
    ],
  );
}

function gitRefExists(gitRoot: string, ref: string): boolean {
  return readGitText(gitRoot, ["rev-parse", "--verify", "--quiet", ref]).length > 0;
}

function hasReleaseTagPush(updates: readonly PrePushUpdate[]): boolean {
  return updates.some((update) => update.remoteRef.startsWith("refs/tags/"));
}

function isDeleteOnlyPush(updates: readonly PrePushUpdate[]): boolean {
  return (
    updates.length > 0 &&
    updates.every(
      (update) =>
        isBranchRef(update.remoteRef) && isAllZeroSha(update.localSha) && Boolean(update.remoteSha),
    )
  );
}

function resolveDefaultBaseRef(gitRoot: string): string | null {
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

function selectBranchDiffRange(
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

function readChangedFilesForRange(
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

function fileExistsSync(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function isTruthyHookEnv(name: string): boolean {
  return (
    String(process.env[name] ?? "")
      .trim()
      .toLowerCase() === "1"
  );
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
      const releaseNotesScript = path.join(gitRoot, "scripts", "check-release-notes.mjs");
      if (fileExistsSync(releaseNotesScript)) {
        const notesExitCode = runHookCommand(gitRoot, resolvePreferredNodeExecutable(process.env), [
          "scripts/check-release-notes.mjs",
        ]);
        if (notesExitCode !== 0) return notesExitCode;
      } else {
        process.stdout.write(
          "Skipping release notes check: scripts/check-release-notes.mjs is not defined.\n",
        );
      }
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
