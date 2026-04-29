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
