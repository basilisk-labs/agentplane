import { assertGitPath, compareText, sortIndexEntries, sortStatusEntries } from "./common.js";
import type { GitCommitPathChange, GitIndexEntry, GitStatusEntry } from "./model.js";

export function isRenameStatus(entry: GitStatusEntry): boolean {
  return (
    entry.original_path !== null &&
    (entry.index_status === "R" ||
      entry.index_status === "C" ||
      entry.worktree_status === "R" ||
      entry.worktree_status === "C")
  );
}

export function parsePorcelainStatus(output: Buffer): GitStatusEntry[] {
  const tokens = output.toString("utf8").split("\0");
  const entries: GitStatusEntry[] = [];
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index] ?? "";
    if (token.length === 0) continue;
    if (token.length < 4 || token[2] !== " ") {
      throw new Error(`invalid porcelain status entry: ${JSON.stringify(token)}`);
    }
    const indexStatus = token[0] ?? " ";
    const worktreeStatus = token[1] ?? " ";
    const entryPath = assertGitPath(token.slice(3));
    const isRename =
      indexStatus === "R" ||
      indexStatus === "C" ||
      worktreeStatus === "R" ||
      worktreeStatus === "C";
    let originalPath: string | null = null;
    if (isRename) {
      const original = tokens[index + 1] ?? "";
      if (original.length === 0) {
        throw new Error(`rename/copy status is missing original path for ${entryPath}`);
      }
      originalPath = assertGitPath(original);
      index += 1;
    }
    entries.push({
      index_status: indexStatus,
      worktree_status: worktreeStatus,
      path: entryPath,
      original_path: originalPath,
    });
  }
  return sortStatusEntries(entries);
}

export function parseIndexEntries(output: Buffer): GitIndexEntry[] {
  const entries: GitIndexEntry[] = [];
  for (const token of output.toString("utf8").split("\0")) {
    if (token.length === 0) continue;
    const match = /^([0-9]{6}) ([0-9a-f]{40,64}) ([0-3])\t([\s\S]+)$/u.exec(token);
    if (!match) {
      throw new Error(`invalid Git index entry: ${JSON.stringify(token)}`);
    }
    entries.push({
      mode: match[1] ?? "",
      object_id: match[2] ?? "",
      stage: Number.parseInt(match[3] ?? "0", 10),
      path: assertGitPath(match[4] ?? ""),
    });
  }
  return sortIndexEntries(entries);
}

export function parseNameStatus(output: Buffer): GitCommitPathChange[] {
  const tokens = output.toString("utf8").split("\0");
  const entries: GitCommitPathChange[] = [];
  let index = 0;
  while (index < tokens.length) {
    let statusCode = tokens[index] ?? "";
    index += 1;
    if (statusCode.length === 0) continue;

    let embeddedPath: string | null = null;
    const tabIndex = statusCode.indexOf("\t");
    if (tabIndex !== -1) {
      embeddedPath = statusCode.slice(tabIndex + 1);
      statusCode = statusCode.slice(0, tabIndex);
    }
    const kind = statusCode[0] ?? "";
    if (kind === "R" || kind === "C") {
      const originalPath = assertGitPath(embeddedPath ?? tokens[index] ?? "");
      if (embeddedPath === null) index += 1;
      const entryPath = assertGitPath(tokens[index] ?? "");
      index += 1;
      entries.push({
        status_code: statusCode,
        path: entryPath,
        original_path: originalPath,
      });
      continue;
    }
    const entryPath = assertGitPath(embeddedPath ?? tokens[index] ?? "");
    if (embeddedPath === null) index += 1;
    entries.push({
      status_code: statusCode,
      path: entryPath,
      original_path: null,
    });
  }
  return entries.toSorted((left, right) => {
    const pathOrder = compareText(left.path, right.path);
    return pathOrder === 0
      ? compareText(left.original_path ?? "", right.original_path ?? "")
      : pathOrder;
  });
}
