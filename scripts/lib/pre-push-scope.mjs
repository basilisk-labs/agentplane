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

export function hasReleaseTagPush(updates) {
  return updates.some((update) => String(update.remoteRef ?? "").startsWith("refs/tags/"));
}

export function selectBranchDiffRange(updates) {
  const branchUpdates = updates.filter(
    (update) => isBranchRef(update.localRef) && isBranchRef(update.remoteRef),
  );
  if (branchUpdates.length !== 1) return null;
  const [update] = branchUpdates;
  if (!update.localSha || !update.remoteSha) return null;
  if (isAllZeroSha(update.localSha) || isAllZeroSha(update.remoteSha)) return null;
  return { from: update.remoteSha, to: update.localSha };
}

export function readChangedFilesForRange(range) {
  if (!range) return [];
  const output = execFileSync("git", ["diff", "--name-only", `${range.from}..${range.to}`], {
    encoding: "utf8",
  });
  return output
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}
