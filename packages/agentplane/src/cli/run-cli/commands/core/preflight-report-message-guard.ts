import { readFile } from "node:fs/promises";
import path from "node:path";

import { validateGithubPrTitleContents } from "../../../../commands/pr/internal/review-template.js";

import { normalizeRepoPath } from "./preflight-report-drift.js";

export type MessageFormatGuard = {
  ok: boolean;
  checked_paths: string[];
  errors: string[];
};

export function emptyMessageFormatGuard(): MessageFormatGuard {
  return {
    ok: true,
    checked_paths: [],
    errors: [],
  };
}

export async function validateChangedGithubTitleArtifacts(opts: {
  gitRoot: string;
  changedPaths: string[];
  workflowDir: string;
}): Promise<MessageFormatGuard> {
  const workflowDir = normalizeRepoPath(opts.workflowDir).replace(/\/+$/, "");
  const prefix = `${workflowDir}/`;
  const suffix = "/pr/github-title.txt";
  const checkedPaths = opts.changedPaths
    .map((value) => normalizeRepoPath(value))
    .filter((value) => value.startsWith(prefix) && value.endsWith(suffix))
    .toSorted((a, b) => a.localeCompare(b));
  const errors: string[] = [];
  for (const relPath of checkedPaths) {
    const relative = relPath.slice(prefix.length);
    const taskId = relative.slice(0, -suffix.length);
    if (!taskId || taskId.includes("/")) {
      errors.push(`${relPath}: cannot infer task id from PR title artifact path`);
      continue;
    }
    const title = await readFile(path.join(opts.gitRoot, relPath), "utf8");
    const titleErrors: string[] = [];
    validateGithubPrTitleContents(title, taskId, titleErrors);
    errors.push(...titleErrors.map((message) => `${relPath}: ${message}`));
  }
  return {
    ok: errors.length === 0,
    checked_paths: checkedPaths,
    errors,
  };
}
