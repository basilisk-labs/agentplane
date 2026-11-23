import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { gitEnv, gitIsAncestor, gitMergeBase, gitRevParse } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";

const execFileNative = promisify(execFile);

function assertGitObjectId(value: string): void {
  if (!/^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(value)) {
    throw new Error(`expected a full Git object ID, received: ${value}`);
  }
}

export async function resolveEvaluatorDiffBase(opts: {
  gitRoot: string;
  evaluatedSha: string | null;
  baseRef: string | null;
  allowSingleCommitFallback?: boolean;
}): Promise<string | null> {
  if (!opts.evaluatedSha) return null;
  const baseRef = opts.baseRef?.trim();
  if (!baseRef) {
    if (opts.allowSingleCommitFallback) {
      return await gitRevParse(opts.gitRoot, [`${opts.evaluatedSha}^`]).catch(() => null);
    }
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Unable to freeze the actual diff for evaluator review: task base branch is unavailable.",
    });
  }
  try {
    const localMergeBase = await gitMergeBase(opts.gitRoot, baseRef, opts.evaluatedSha);
    const upstreamCommit = await gitRevParse(opts.gitRoot, [
      `${baseRef}@{upstream}^{commit}`,
    ]).catch(() => null);
    if (!upstreamCommit) return localMergeBase;

    const upstreamMergeBase = await gitMergeBase(
      opts.gitRoot,
      upstreamCommit,
      opts.evaluatedSha,
    ).catch(() => null);
    if (
      !upstreamMergeBase ||
      upstreamMergeBase === localMergeBase ||
      !(await gitIsAncestor(opts.gitRoot, localMergeBase, upstreamMergeBase))
    )
      return localMergeBase;

    // A squash-merged base update can leave the checked-out local base on a
    // content-equivalent sibling commit. Prefer its newer tracking ref so the
    // evaluator does not attribute already-merged base changes to the task.
    return upstreamMergeBase;
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Unable to resolve the evaluator diff base from ${baseRef}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}

const ACTUAL_DIFF_MAX_BUFFER_BYTES = 512 * 1024 * 1024;
/** One file diff above this size is summarized instead of embedded. */
export const ACTUAL_DIFF_FILE_LIMIT_BYTES = 64 * 1024;
/** Embedded hunks stop after this total; later file diffs are summarized. */
export const ACTUAL_DIFF_TOTAL_LIMIT_BYTES = 1024 * 1024;

function diffSectionPath(header: string): string {
  const match = /^diff --git a\/(.+?) b\//u.exec(header);
  return match?.[1] ?? header.slice("diff --git ".length);
}

/**
 * Evaluator diff format v2. Generated corpora, snapshots, and other Task
 * records can make one implementation diff many megabytes. An evaluator cannot
 * review such hunks, and every copy is committed as Task evidence. File diffs
 * above the per-file limit, or after the total limit, keep their Git header
 * (including full blob IDs from `--full-index`) and are replaced by one summary
 * line, so the exact content stays recoverable from Git objects.
 */
export function compactActualDiff(diff: string, opts: { reproduce: string }): string {
  const sections = diff.split(/^(?=diff --git )/mu);
  let embedded = 0;
  let summarized = 0;
  const output: string[] = [];
  for (const section of sections) {
    if (!section.startsWith("diff --git ")) {
      output.push(section);
      continue;
    }
    const bytes = Buffer.byteLength(section, "utf8");
    const reason =
      bytes > ACTUAL_DIFF_FILE_LIMIT_BYTES
        ? "file diff exceeds the per-file limit"
        : embedded + bytes > ACTUAL_DIFF_TOTAL_LIMIT_BYTES
          ? "total diff limit reached"
          : null;
    if (!reason) {
      embedded += bytes;
      output.push(section);
      continue;
    }
    summarized += 1;
    const lines = section.split("\n");
    const headerEnd = lines.findIndex(
      (line, index) =>
        index > 0 &&
        (line.startsWith("--- ") || line.startsWith("@@") || line.startsWith("Binary files ")),
    );
    const header = lines.slice(0, headerEnd === -1 ? lines.length : headerEnd).filter(Boolean);
    const filePath = diffSectionPath(lines[0] ?? "");
    output.push(
      `${header.join("\n")}\n# agentplane: hunks omitted (${bytes} bytes, ${lines.length - 1} lines; ${reason}); reproduce with: ${opts.reproduce} -- ${JSON.stringify(filePath)}\n`,
    );
  }
  if (summarized === 0) return diff;
  return `# agentplane actual-diff v2: ${summarized} file diff(s) summarized; full diff: ${opts.reproduce}\n${output.join("")}`;
}

export async function renderActualDiff(
  gitRoot: string,
  evaluatedSha: string | null,
  diffBaseSha: string | null,
  taskArtifactRoot?: string,
): Promise<string> {
  if (!evaluatedSha) return "No committed task work unit is available for semantic evaluation.\n";
  try {
    const artifactRoot = taskArtifactRoot?.trim().replaceAll("\\", "/").replaceAll(/\/+$/gu, "");
    // The task document, native identity, checks, and policy are frozen as separate evidence. Exclude
    // only this task's generated subtree so it cannot recursively inflate the implementation diff.
    const taskArtifactExclude = artifactRoot
      ? ["--", ".", `:(exclude,glob)${artifactRoot}/**`]
      : [];
    const { stdout } = await execFileAsync(
      "git",
      [
        ...(diffBaseSha
          ? ["diff", "--no-ext-diff", "--full-index", "--find-renames", diffBaseSha, evaluatedSha]
          : ["show", "--format=", "--root", "--full-index", "--find-renames", evaluatedSha]),
        ...taskArtifactExclude,
      ],
      { cwd: gitRoot, maxBuffer: ACTUAL_DIFF_MAX_BUFFER_BYTES },
    );
    if (!stdout) return "No file diff was recorded for the evaluated commit.\n";
    return compactActualDiff(String(stdout), {
      reproduce: diffBaseSha
        ? `git diff --full-index --find-renames ${diffBaseSha} ${evaluatedSha}`
        : `git show --format= --root --full-index --find-renames ${evaluatedSha}`,
    });
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Unable to freeze the actual diff for evaluator review: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}

export async function resolveActualDiffNames(
  gitRoot: string,
  evaluatedSha: string | null,
  diffBaseSha: string | null,
): Promise<string[]> {
  if (!evaluatedSha) return [];
  try {
    assertGitObjectId(evaluatedSha);
    if (diffBaseSha) assertGitObjectId(diffBaseSha);
    const { stdout } = await execFileNative(
      "git",
      diffBaseSha
        ? ["diff", "--name-only", "--find-renames", diffBaseSha, evaluatedSha]
        : ["show", "--name-only", "--format=", "--root", "--find-renames", evaluatedSha],
      { cwd: gitRoot, env: gitEnv(), encoding: "utf8" },
    );
    return [
      ...new Set(
        stdout
          .split(/\r?\n/u)
          .map((entry) => entry.trim())
          .filter(Boolean),
      ),
    ].toSorted();
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Unable to resolve the evaluated diff paths: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}
