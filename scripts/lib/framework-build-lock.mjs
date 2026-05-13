import fs from "node:fs";
import os from "node:os";
import path from "node:path";

export const FRAMEWORK_BUILD_LOCK_ENV = "AGENTPLANE_FRAMEWORK_BUILD_LOCK_PATH";
export const FRAMEWORK_BUILD_LOCK_DIR = path.join(
  ".agentplane",
  "cache",
  "framework-dev-bootstrap.lock",
);

function lockPathForRepo(repoRoot) {
  return path.join(repoRoot, FRAMEWORK_BUILD_LOCK_DIR);
}

function readOwner(lockDir) {
  try {
    return JSON.parse(fs.readFileSync(path.join(lockDir, "owner.json"), "utf8"));
  } catch {
    return null;
  }
}

function formatOwner(owner) {
  if (!owner || typeof owner !== "object") return "owner=<unknown>";
  const pid = "pid" in owner ? owner.pid : "<unknown>";
  const operation = "operation" in owner ? owner.operation : "<unknown>";
  const acquiredAt = "acquired_at" in owner ? owner.acquired_at : "<unknown>";
  return `pid=${pid} operation=${operation} acquired_at=${acquiredAt}`;
}

function isLiveOwner(owner) {
  if (!owner || typeof owner !== "object" || typeof owner.pid !== "number") return true;
  try {
    process.kill(owner.pid, 0);
    return true;
  } catch (error) {
    return error?.code === "EPERM";
  }
}

export function withFrameworkBuildLock(repoRoot, operation, run) {
  const lockDir = lockPathForRepo(repoRoot);
  const inheritedLock = path.resolve(String(process.env[FRAMEWORK_BUILD_LOCK_ENV] ?? ""));
  if (inheritedLock && inheritedLock === path.resolve(lockDir)) {
    return run({ lockDir, inherited: true });
  }

  fs.mkdirSync(path.dirname(lockDir), { recursive: true });
  try {
    fs.mkdirSync(lockDir);
  } catch (error) {
    if (error?.code !== "EEXIST") throw error;
    const owner = readOwner(lockDir);
    if (isLiveOwner(owner)) {
      throw new Error(
        [
          "Another framework dev build is already running.",
          `Lock: ${path.relative(repoRoot, lockDir)}`,
          `Owner: ${formatOwner(owner)}`,
          "Retry after the active bootstrap/build/pre-push lane finishes.",
        ].join("\n"),
      );
    }
    fs.rmSync(lockDir, { recursive: true, force: true });
    fs.mkdirSync(lockDir);
  }

  if (!fs.existsSync(lockDir)) {
    fs.mkdirSync(lockDir);
  }

  const owner = readOwner(lockDir);
  if (owner && isLiveOwner(owner)) {
    throw new Error(
      [
        "Another framework dev build is already running.",
        `Lock: ${path.relative(repoRoot, lockDir)}`,
        `Owner: ${formatOwner(owner)}`,
        "Retry after the active bootstrap/build/pre-push lane finishes.",
      ].join("\n"),
    );
  }

  fs.writeFileSync(
    path.join(lockDir, "owner.json"),
    JSON.stringify(
      {
        pid: process.pid,
        host: os.hostname(),
        operation,
        acquired_at: new Date().toISOString(),
        repo_root: repoRoot,
      },
      null,
      2,
    ) + "\n",
    "utf8",
  );

  const previousLock = process.env[FRAMEWORK_BUILD_LOCK_ENV];
  process.env[FRAMEWORK_BUILD_LOCK_ENV] = lockDir;
  try {
    return run({ lockDir, inherited: false });
  } finally {
    if (previousLock === undefined) {
      delete process.env[FRAMEWORK_BUILD_LOCK_ENV];
    } else {
      process.env[FRAMEWORK_BUILD_LOCK_ENV] = previousLock;
    }
    fs.rmSync(lockDir, { recursive: true, force: true });
  }
}
