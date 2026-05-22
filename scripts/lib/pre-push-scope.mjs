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

function isAgentPlaneTaskBranchRef(ref) {
  const branch = String(ref ?? "").replace(/^refs\/heads\//, "");
  return branch.startsWith("task/") || branch.startsWith("task-close/");
}

function readGitText(args, cwd) {
  try {
    return execFileSync("git", args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function gitRefExists(ref, cwd) {
  return readGitText(["rev-parse", "--verify", "--quiet", ref], cwd).length > 0;
}

function isAncestorRef(ancestorRef, descendantRef, cwd) {
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", ancestorRef, descendantRef], {
      cwd,
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

function resolveMergeBase(baseRef, headRef, cwd) {
  if (!baseRef || !headRef) return "";
  return readGitText(["merge-base", baseRef, headRef], cwd);
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
    (update) => !isAllZeroSha(update.localSha) && isBranchRef(update.remoteRef),
  );
  if (branchUpdates.length !== 1) return null;
  const [update] = branchUpdates;
  if (!update.localSha || !update.remoteSha) return null;
  if (isAllZeroSha(update.localSha)) return null;
  const fallbackRef =
    typeof opts.newBranchFallbackRef === "string" ? opts.newBranchFallbackRef.trim() : "";
  const gitCwd = typeof opts.gitCwd === "string" && opts.gitCwd.trim() ? opts.gitCwd : undefined;
  if (isAllZeroSha(update.remoteSha)) {
    return fallbackRef ? { from: fallbackRef, to: update.localSha } : null;
  }
  const remoteRefExists = gitRefExists(update.remoteSha, gitCwd);
  if (
    fallbackRef &&
    isAgentPlaneTaskBranchRef(update.remoteRef) &&
    remoteRefExists &&
    !isAncestorRef(update.remoteSha, update.localSha, gitCwd)
  ) {
    return {
      from: resolveMergeBase(fallbackRef, update.localSha, gitCwd) || fallbackRef,
      to: update.localSha,
    };
  }
  if (!remoteRefExists && fallbackRef) {
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
