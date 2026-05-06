import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  hasReleaseTagPush,
  isDeleteOnlyPush,
  parsePrePushStdin,
  readChangedFilesForRange,
  resolveDefaultBaseRef,
  selectBranchDiffRange,
} from "./lib/pre-push-scope.mjs";

function pushUnique(entries, value) {
  const candidate = String(value ?? "").trim();
  if (!candidate || entries.includes(candidate)) return;
  entries.push(candidate);
}

function withPreferredRuntimePath(baseEnv = process.env) {
  const preferredEntries = [];
  pushUnique(preferredEntries, String(baseEnv.NVM_BIN ?? "").trim());
  pushUnique(preferredEntries, path.join(String(baseEnv.VOLTA_HOME ?? "").trim(), "bin"));
  pushUnique(preferredEntries, path.dirname(process.execPath));
  pushUnique(
    preferredEntries,
    path.join(String(baseEnv.HOME ?? os.homedir()).trim(), ".bun", "bin"),
  );

  const currentPath = String(baseEnv.PATH ?? "");
  const pathEntries = currentPath
    .split(path.delimiter)
    .map((entry) => entry.trim())
    .filter(Boolean);
  for (const entry of pathEntries) {
    pushUnique(preferredEntries, entry);
  }

  return {
    ...baseEnv,
    PATH: preferredEntries.join(path.delimiter),
  };
}

function run(command, args) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: withPreferredRuntimePath(process.env),
  });
}

function runWithEnv(command, args, env) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: withPreferredRuntimePath(env),
  });
}

function read(command, args) {
  return execFileSync(command, args, { encoding: "utf8" });
}

function readQuiet(command, args) {
  try {
    return execFileSync(command, args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function trackedChangesShort() {
  return String(read("git", ["status", "--short", "--untracked-files=no"])).trim();
}

function readLocalGitConfigBool(name) {
  try {
    return String(
      execFileSync("git", ["config", "--local", "--get", "--bool", name], {
        encoding: "utf8",
      }),
    ).trim();
  } catch {
    return "";
  }
}

class HookFailure extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = "HookFailure";
    this.details = details;
  }
}

function fail(message, details = []) {
  throw new HookFailure(message, details);
}

function failIfTrackedChanges(message) {
  const changes = trackedChangesShort();
  if (!changes) return;
  fail(message, [changes]);
}

function failIfPollutedReleaseGitConfig() {
  if (readLocalGitConfigBool("core.bare") !== "true") return;
  fail("pre-push blocked: release checks cannot run because local git config has core.bare=true.", [
    "This indicates repository config pollution, not a release payload failure.",
    "Restore the checkout git config before retrying release verification.",
  ]);
}

const TASK_ID_RE = /\b\d{12}-[A-Z0-9]{6}\b/;
const TASK_SUBJECT_RE = /^\S+\s+([A-Z0-9]{6})\s+[a-z][a-z0-9_-]*(?:\/[a-z0-9_-]+)*:\s+.+$/;
const DOC_FILE_RE = /(^|\/)(README|CHANGELOG|CONTRIBUTING|LICENSE)(\.[^/]*)?$/i;
const DOC_EXT_RE = /\.(md|mdx|txt|adoc|rst)$/i;

function isUnder(filePath, prefix) {
  return filePath === prefix || filePath.startsWith(`${prefix}/`);
}

function isDocsOnlyPath(filePath) {
  return (
    DOC_FILE_RE.test(filePath) ||
    DOC_EXT_RE.test(filePath) ||
    isUnder(filePath, "docs") ||
    isUnder(filePath, "website/docs")
  );
}

function isTaskArtifactPath(filePath) {
  return filePath === ".agentplane/tasks.json" || isUnder(filePath, ".agentplane/tasks");
}

function isMutatingPath(filePath) {
  return !isTaskArtifactPath(filePath) && !isDocsOnlyPath(filePath);
}

function taskIdFromSubject(subject) {
  const full = TASK_ID_RE.exec(subject)?.[0] ?? "";
  if (full) return full;
  const suffix = TASK_SUBJECT_RE.exec(subject)?.[1] ?? "";
  if (!suffix) return "";
  const found = readQuiet("find", [
    ".agentplane/tasks",
    "-maxdepth",
    "1",
    "-type",
    "d",
    "-name",
    `*-${suffix}`,
  ])
    .split("\n")
    .map((line) => line.trim().split("/").at(-1) ?? "")
    .filter(Boolean);
  return found.length === 1 ? found[0] : "";
}

function hasEmergencyBackfillEvidence(body) {
  if (!/^Emergency-Hotfix:\s*true\s*$/im.test(body)) return false;
  if (!/^Backfill-Task:\s*\d{12}-[A-Z0-9]{6}\s*$/im.test(body)) return false;
  const evidence = /^Backfill-Evidence:\s*(.+)$/im.exec(body)?.[1]?.trim() ?? "";
  return evidence.length >= 12;
}

function hasManagedUpgradeEvidence(body) {
  const subject =
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? "";
  return /^⬆️\s+upgrade:\s+/u.test(subject) && /^Upgrade-Version:\s*\S+\s*$/im.test(body);
}

function readCommitList(range) {
  if (!range) return [];
  return readQuiet("git", ["log", "--format=%H", `${range.from}..${range.to}`])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readCommitFiles(commit) {
  return readQuiet("git", ["diff-tree", "--no-commit-id", "--name-only", "-r", "-m", commit])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readCommitBody(commit) {
  return readQuiet("git", ["show", "--format=%B", "--no-patch", commit]);
}

function enforceTaskBoundOutgoingCommits(range) {
  const commits = readCommitList(range);
  const failures = [];
  for (const commit of commits) {
    const files = readCommitFiles(commit);
    const mutating = files.filter((filePath) => isMutatingPath(filePath));
    if (mutating.length === 0) continue;

    const body = readCommitBody(commit);
    const subject =
      body
        .split("\n")
        .find((line) => line.trim())
        ?.trim() ?? "";
    if (taskIdFromSubject(subject)) continue;
    if (hasManagedUpgradeEvidence(body)) continue;
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

function main() {
  const stdin = readFileSync(0, "utf8");
  const updates = parsePrePushStdin(stdin);

  const envRelease =
    String(process.env.AGENTPLANE_HOOKS_RELEASE ?? "")
      .trim()
      .toLowerCase() === "1";
  const envFull =
    String(process.env.AGENTPLANE_HOOKS_FULL ?? "")
      .trim()
      .toLowerCase() === "1";
  const isReleasePush = envRelease || envFull || hasReleaseTagPush(updates);
  if (!isReleasePush && isDeleteOnlyPush(updates)) {
    process.stdout.write("Skipping pre-push checks for delete-only remote branch cleanup.\n");
    return;
  }
  const mode = isReleasePush ? "release" : "standard";
  process.stdout.write(`Running pre-push checks in ${mode} mode.\n`);
  if (isReleasePush) failIfPollutedReleaseGitConfig();
  const ciScript = envFull ? "ci:local:full" : "ci:local:fast";
  const changedFiles = readChangedFilesForRange(
    selectBranchDiffRange(updates, {
      newBranchFallbackRef: resolveDefaultBaseRef(),
    }),
  );
  const diffRange = selectBranchDiffRange(updates, {
    newBranchFallbackRef: resolveDefaultBaseRef(),
  });
  enforceTaskBoundOutgoingCommits(diffRange);
  const ciEnv =
    changedFiles.length > 0
      ? { ...process.env, AGENTPLANE_FAST_CHANGED_FILES: changedFiles.join("\n") }
      : process.env;

  process.stdout.write("\n== Format (check) ==\n");
  try {
    run("bun", ["run", "format:check"]);
  } catch {
    failIfTrackedChanges(
      "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
    );
    fail(
      "pre-push blocked: formatting check failed. Run `bun run format`, review the diff, commit it, and push again.",
    );
  }
  failIfTrackedChanges(
    "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
  );

  let ciFailed = false;
  try {
    runWithEnv("bun", ["run", ciScript], ciEnv);
  } catch {
    ciFailed = true;
  }
  failIfTrackedChanges(
    `pre-push blocked: ${ciScript} changed tracked files. Commit or revert those changes and push again.`,
  );
  if (ciFailed) {
    fail(`pre-push blocked: ${ciScript} failed. Fix the reported checks and push again.`);
  }

  if (isReleasePush) {
    run("node", ["scripts/check-release-notes.mjs"]);
    run("bun", ["run", "release:prepublish"]);
  }
}

try {
  main();
} catch (error) {
  if (error instanceof HookFailure) {
    process.stderr.write(`\n${error.message}\n`);
    for (const detail of error.details) {
      if (!detail) continue;
      process.stderr.write(`${detail}\n`);
    }
    process.exitCode = 1;
  } else {
    throw error;
  }
}
