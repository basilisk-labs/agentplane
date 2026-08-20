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
    ) {
      return localMergeBase;
    }

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

export async function renderActualDiff(
  gitRoot: string,
  evaluatedSha: string | null,
  diffBaseSha: string | null,
  taskArtifactRoot?: string,
): Promise<string> {
  if (!evaluatedSha) return "No committed task work unit is available for semantic evaluation.\n";
  try {
    const artifactRoot = taskArtifactRoot?.trim().replaceAll("\\", "/").replaceAll(/\/+$/gu, "");
    // The task document, blueprint, checks, and policy are frozen as separate evidence. Exclude
    // only this task's generated subtree so it cannot recursively inflate the implementation diff.
    const taskArtifactExclude = artifactRoot
      ? ["--", ".", `:(exclude,glob)${artifactRoot}/**`]
      : [];
    const { stdout } = await execFileAsync(
      "git",
      [
        ...(diffBaseSha
          ? ["diff", "--no-ext-diff", "--find-renames", diffBaseSha, evaluatedSha]
          : ["show", "--format=", "--root", "--find-renames", evaluatedSha]),
        ...taskArtifactExclude,
      ],
      { cwd: gitRoot, maxBuffer: 16 * 1024 * 1024 },
    );
    return stdout || "No file diff was recorded for the evaluated commit.\n";
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
