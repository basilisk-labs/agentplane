import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";

import {
  hasReleaseTagPush,
  isDeleteOnlyPush,
  parsePrePushStdin,
  readChangedFilesForRange,
  resolveDefaultBaseRef,
  selectBranchDiffRange,
} from "../lib/pre-push-scope.mjs";

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

function sanitizeCiEnv(env = process.env) {
  const nextEnv = { ...env };
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

function runWithEnv(command, args, env) {
  execFileSync(command, args, {
    stdio: "inherit",
    env: withPreferredRuntimePath(env),
  });
}

function readPackageScripts() {
  if (!existsSync("package.json")) return {};
  try {
    const parsed = JSON.parse(readFileSync("package.json", "utf8"));
    if (!parsed.scripts || typeof parsed.scripts !== "object" || Array.isArray(parsed.scripts)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(parsed.scripts).filter(([, value]) => typeof value === "string"),
    );
  } catch (error) {
    fail("pre-push blocked: package.json could not be parsed.", [
      error instanceof Error ? error.message : String(error),
      "Fix package.json before relying on optional project-script detection.",
    ]);
  }
}

function runOptionalProjectScript(scripts, name, env, heading = "") {
  if (!Object.hasOwn(scripts, name)) {
    process.stdout.write(`Skipping ${name}: package.json script is not defined.\n`);
    return { exitCode: 0, skipped: true };
  }
  if (heading) process.stdout.write(heading);
  try {
    runWithEnv("bun", ["run", name], env);
    return { exitCode: 0, skipped: false };
  } catch {
    return { exitCode: 1, skipped: false };
  }
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

function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}

function proofPath() {
  const gitDir = readQuiet("git", ["rev-parse", "--git-dir"]);
  if (!gitDir) return "";
  return path.join(gitDir, "agentplane", "pre-push-proof.json");
}

function proofKey({ updates, mode, ciScript, changedFiles }) {
  return {
    schema_version: 1,
    mode,
    ci_script: ciScript,
    updates: updates.map((update) => ({
      local_ref: update.localRef,
      local_sha: update.localSha,
      remote_ref: update.remoteRef,
      remote_sha: update.remoteSha,
    })),
    changed_files_digest: sha256Text(changedFiles.toSorted().join("\n")),
  };
}

function sameProofKey(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

function readReusableProof(key) {
  const filePath = proofPath();
  if (!filePath || !existsSync(filePath)) return null;
  try {
    const payload = JSON.parse(readFileSync(filePath, "utf8"));
    if (payload?.ok !== true) return null;
    if (!sameProofKey(payload.key, key)) return null;
    return payload;
  } catch {
    return null;
  }
}

function writeReusableProof(key) {
  const filePath = proofPath();
  if (!filePath) return;
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(
    filePath,
    `${JSON.stringify(
      {
        schema_version: 1,
        ok: true,
        created_at: new Date().toISOString(),
        key,
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
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

function isBranchRef(ref) {
  return String(ref ?? "").startsWith("refs/heads/");
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

function isReleaseEvidenceOnlyPush(updates, changedFiles) {
  const branchNames = updates
    .filter((update) => isBranchRef(update.remoteRef) && !/^0+$/u.test(update.localSha))
    .map((update) => update.remoteRef.replace(/^refs\/heads\//u, ""));
  return (
    branchNames.length === 1 &&
    branchNames[0].startsWith("task-close/") &&
    changedFiles.length > 0 &&
    changedFiles.every((filePath) =>
      /^\.agentplane\/tasks\/\d{12}-[A-Z0-9]{6}\/README\.md$/u.test(filePath),
    )
  );
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

function hasDeployFixEvidence(body) {
  const subject = commitSubject(body);
  if (!/^🚑\s+deploy-fix:\s+\S+/u.test(subject) && !/^deploy-fix:\s+\S+/u.test(subject)) {
    return false;
  }
  if (!/^Deploy-Fix:\s*true\s*$/im.test(body)) return false;
  const evidence = /^Deploy-Fix-Evidence:\s*(.+)$/im.exec(body)?.[1]?.trim() ?? "";
  return evidence.length >= 12;
}

function commitSubject(body) {
  return (
    body
      .split("\n")
      .find((line) => line.trim())
      ?.trim() ?? ""
  );
}

function hasManagedUpgradeEvidence(body) {
  return (
    /^⬆️\s+upgrade:\s+/u.test(commitSubject(body)) && /^Upgrade-Version:\s*\S+\s*$/im.test(body)
  );
}

function isManagedInstallPath(filePath) {
  return (
    filePath === "AGENTS.md" ||
    filePath === "CLAUDE.md" ||
    filePath === ".gitignore" ||
    filePath === ".env.example" ||
    isUnder(filePath, ".agentplane") ||
    isUnder(filePath, ".cursor") ||
    isUnder(filePath, ".windsurf")
  );
}

function hasManagedInstallEvidence(body, mutatingPaths) {
  if (
    !/^chore:\s+install agentplane \d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(
      commitSubject(body),
    )
  ) {
    return false;
  }
  return (
    mutatingPaths.length > 0 && mutatingPaths.every((filePath) => isManagedInstallPath(filePath))
  );
}

function hasManagedContextBootstrapEvidence(body, mutatingPaths) {
  const hasBootstrapEvidence =
    commitSubject(body) === "✅ CTX1NT task: initialize AgentPlane context" &&
    /^Context-Bootstrap:\s*true\s*$/im.test(body) &&
    /^Context-Bootstrap-Task:\s*202601010101-CTX1NT\s*$/im.test(body) &&
    mutatingPaths.includes(".agentplane/context/manifest.lock.json");
  return (
    hasBootstrapEvidence &&
    mutatingPaths.every(
      (filePath) =>
        filePath === ".gitignore" ||
        isUnder(filePath, ".agentplane/context") ||
        isUnder(filePath, "context"),
    )
  );
}

function readCommitList(range) {
  if (!range) return [];
  return readQuiet("git", ["log", "--format=%H", `${range.from}..${range.to}`])
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function isCommitAncestorOf(ancestor, descendant) {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function readCommitFiles(commit) {
  const parentLine = readQuiet("git", ["rev-list", "--parents", "-n", "1", commit]);
  const parentCount = parentLine.split(/\s+/).filter(Boolean).length - 1;
  const args =
    parentCount > 1
      ? ["diff-tree", "--cc", "--no-commit-id", "--name-only", "-r", commit]
      : ["diff-tree", "--no-commit-id", "--name-only", "-r", commit];
  return readQuiet("git", args)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function readCommitBody(commit) {
  return readQuiet("git", ["show", "--format=%B", "--no-patch", commit]);
}

function enforceTaskBoundOutgoingCommits(range) {
  const commits = readCommitList(range);
  const commitBodies = new Map();
  const commitBodyFor = (commit) => {
    if (commitBodies.has(commit)) return commitBodies.get(commit);
    const body = readCommitBody(commit);
    commitBodies.set(commit, body);
    return body;
  };
  const managedUpgradeCommits = commits.filter((commit) =>
    hasManagedUpgradeEvidence(commitBodyFor(commit)),
  );
  const isPreUpgradeCommit = (commit) =>
    managedUpgradeCommits.some(
      (upgradeCommit) => commit !== upgradeCommit && isCommitAncestorOf(commit, upgradeCommit),
    );
  const failures = [];
  for (const commit of commits) {
    if (isPreUpgradeCommit(commit)) continue;
    const files = readCommitFiles(commit);
    const mutating = files.filter((filePath) => isMutatingPath(filePath));
    if (mutating.length === 0) continue;

    const body = commitBodyFor(commit);
    const subject =
      body
        .split("\n")
        .find((line) => line.trim())
        ?.trim() ?? "";
    if (taskIdFromSubject(subject)) continue;
    if (hasManagedUpgradeEvidence(body)) continue;
    if (hasManagedInstallEvidence(body, mutating)) continue;
    if (hasManagedContextBootstrapEvidence(body, mutating)) continue;
    if (hasEmergencyBackfillEvidence(body)) continue;
    if (hasDeployFixEvidence(body)) continue;

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
      "  4) For tiny deploy-only fixes, use subject `🚑 deploy-fix: ...` plus trailers: Deploy-Fix: true, Deploy-Fix-Evidence: <evidence>.",
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
  const scripts = readPackageScripts();
  const diffRange = selectBranchDiffRange(updates, {
    newBranchFallbackRef: resolveDefaultBaseRef(),
  });
  enforceTaskBoundOutgoingCommits(diffRange);
  const key = proofKey({ updates, mode, ciScript, changedFiles });
  if (!trackedChangesShort()) {
    const proof = readReusableProof(key);
    if (proof) {
      process.stdout.write(
        `Skipping pre-push checks: reusable proof exists for this exact push (${proof.created_at}).\n`,
      );
      return;
    }
  }
  if (!isReleasePush && isReleaseEvidenceOnlyPush(updates, changedFiles)) {
    process.stdout.write("Running lightweight checks for release evidence-only task closure.\n");
    const formatResult = runOptionalProjectScript(
      scripts,
      "format:check",
      sanitizeCiEnv(process.env),
    );
    if (!formatResult.skipped) {
      failIfTrackedChanges(
        "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
      );
    }
    if (formatResult.exitCode !== 0) {
      fail(
        "pre-push blocked: formatting check failed. Run `bun run format`, review the diff, commit it, and push again.",
      );
    }
    writeReusableProof(key);
    return;
  }
  const ciEnv =
    changedFiles.length > 0
      ? sanitizeCiEnv({ ...process.env, AGENTPLANE_FAST_CHANGED_FILES: changedFiles.join("\n") })
      : sanitizeCiEnv(process.env);

  const formatResult = runOptionalProjectScript(
    scripts,
    "format:check",
    sanitizeCiEnv(process.env),
    "\n== Format (check) ==\n",
  );
  if (formatResult.exitCode !== 0) {
    failIfTrackedChanges(
      "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
    );
    fail(
      "pre-push blocked: formatting check failed. Run `bun run format`, review the diff, commit it, and push again.",
    );
  }
  if (!formatResult.skipped) {
    failIfTrackedChanges(
      "pre-push blocked: format:check changed tracked files unexpectedly. Revert or commit those changes and push again.",
    );
  }

  const ciResult = runOptionalProjectScript(scripts, ciScript, ciEnv);
  if (!ciResult.skipped) {
    failIfTrackedChanges(
      `pre-push blocked: ${ciScript} changed tracked files. Commit or revert those changes and push again.`,
    );
  }
  if (ciResult.exitCode !== 0) {
    fail(`pre-push blocked: ${ciScript} failed. Fix the reported checks and push again.`);
  }

  if (isReleasePush) {
    runWithEnv("node", ["scripts/check-release-notes.mjs"], sanitizeCiEnv(process.env));
    runWithEnv("bun", ["run", "release:prepublish"], sanitizeCiEnv(process.env));
  }
  writeReusableProof(key);
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
