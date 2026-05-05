import { execFileSync } from "node:child_process";

export function parsePrePushStdin(rawStdin) {
  return String(rawStdin ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [localRef = "", localSha = "", remoteRef = "", remoteSha = ""] = line.split(/\s+/);
      return { localRef, localSha, remoteRef, remoteSha };
    });
}

function isAllZeroSha(value) {
  return /^[0]+$/.test(String(value ?? ""));
}

function isBranchRef(ref) {
  return String(ref ?? "").startsWith("refs/heads/");
}

function readGitText(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" }).trim();
  } catch {
    return "";
  }
}

function gitRefExists(ref) {
  return readGitText(["rev-parse", "--verify", "--quiet", ref]).length > 0;
}

export function hasReleaseTagPush(updates) {
  return updates.some((update) => String(update.remoteRef ?? "").startsWith("refs/tags/"));
}

export function isDeleteOnlyPush(updates) {
  return (
    updates.length > 0 &&
    updates.every(
      (update) =>
        isBranchRef(update.remoteRef) && isAllZeroSha(update.localSha) && update.remoteSha,
    )
  );
}

export function resolveDefaultBaseRef() {
  const remoteHead = readGitText([
    "symbolic-ref",
    "--quiet",
    "--short",
    "refs/remotes/origin/HEAD",
  ]);
  if (remoteHead) return remoteHead;
  if (gitRefExists("origin/main")) return "origin/main";
  if (gitRefExists("main")) return "main";
  return null;
}

export function selectBranchDiffRange(updates, opts = {}) {
  const branchUpdates = updates.filter(
    (update) => isBranchRef(update.localRef) && isBranchRef(update.remoteRef),
  );
  if (branchUpdates.length !== 1) return null;
  const [update] = branchUpdates;
  if (!update.localSha || !update.remoteSha) return null;
  if (isAllZeroSha(update.localSha)) return null;
  const fallbackRef =
    typeof opts.newBranchFallbackRef === "string" ? opts.newBranchFallbackRef.trim() : "";
  if (isAllZeroSha(update.remoteSha)) {
    return fallbackRef ? { from: fallbackRef, to: update.localSha } : null;
  }
  if (!gitRefExists(update.remoteSha) && fallbackRef) {
    return { from: fallbackRef, to: update.localSha };
  }
  return { from: update.remoteSha, to: update.localSha };
}

export function readChangedFilesForRange(range) {
  if (!range) return [];
  let output = "";
  try {
    output = execFileSync("git", ["diff", "--name-only", `${range.from}..${range.to}`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
  } catch {
    return [];
  }
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
