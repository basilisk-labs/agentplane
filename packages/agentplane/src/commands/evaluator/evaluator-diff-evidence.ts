import { readFile } from "node:fs/promises";
import path from "node:path";
import { gitMergeBase, gitRevParse, resolveBaseBranch } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { parsePrMetaForwardCompatible } from "../shared/pr-meta.js";
import type { CommandContext } from "../shared/task-backend.js";

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
    const parent = await gitRevParse(opts.gitRoot, [`${opts.evaluatedSha}^`]).catch(() => null);
    if (!parent) return null;
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Unable to freeze the actual diff for evaluator review: task base branch is unavailable.",
    });
  }
  try {
    return await gitMergeBase(opts.gitRoot, baseRef, opts.evaluatedSha);
  } catch (error) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `Unable to resolve the evaluator diff base from ${baseRef}: ${
        error instanceof Error ? error.message : String(error)
      }`,
    });
  }
}

export async function resolveEvaluatorDiffBaseRef(opts: {
  ctx: CommandContext;
  taskId: string;
}): Promise<string | null> {
  const gitRoot = opts.ctx.resolvedProject.gitRoot;
  const metaPath = path.join(
    gitRoot,
    opts.ctx.config.paths.workflow_dir,
    opts.taskId,
    "pr",
    "meta.json",
  );
  try {
    const meta = parsePrMetaForwardCompatible(await readFile(metaPath, "utf8"), opts.taskId);
    if (meta.base?.trim()) return meta.base.trim();
  } catch (error) {
    if (
      (error as NodeJS.ErrnoException | null)?.code !== "ENOENT" &&
      opts.ctx.config.workflow_mode === "branch_pr"
    ) {
      throw new CliError({
        code: "E_VALIDATION",
        message: `Unable to read the evaluator diff base from task PR metadata: ${
          error instanceof Error ? error.message : String(error)
        }`,
      });
    }
  }
  const base = await resolveBaseBranch({
    cwd: gitRoot,
    rootOverride: gitRoot,
    cliBaseOpt: null,
    mode: opts.ctx.config.workflow_mode,
  }).catch(() => null);
  return base?.trim() ?? null;
}

export async function renderActualDiff(
  gitRoot: string,
  evaluatedSha: string | null,
  diffBaseSha: string | null,
): Promise<string> {
  if (!evaluatedSha) return "No committed task work unit is available for semantic evaluation.\n";
  try {
    const { stdout } = await execFileAsync(
      "git",
      diffBaseSha
        ? ["diff", "--no-ext-diff", "--find-renames", "--binary", diffBaseSha, evaluatedSha]
        : ["show", "--format=", "--root", "--find-renames", "--binary", evaluatedSha],
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
