import { readFile } from "node:fs/promises";
import path from "node:path";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { successMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import { validateReviewContents } from "./internal/review-template.js";

export async function cmdPrCheck(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, verifyLogPath, reviewPath } =
      await resolvePrPaths({ ...opts, ctx });

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const errors: string[] = [];
    const relPrDir = path.relative(resolved.gitRoot, prDir);
    const relMetaPath = path.relative(resolved.gitRoot, metaPath);
    const relDiffstatPath = path.relative(resolved.gitRoot, diffstatPath);
    const relVerifyLogPath = path.relative(resolved.gitRoot, verifyLogPath);
    const relReviewPath = path.relative(resolved.gitRoot, reviewPath);
    if (!(await fileExists(prDir))) errors.push(`Missing PR directory: ${relPrDir}`);
    if (!(await fileExists(metaPath))) errors.push(`Missing ${relMetaPath}`);
    if (!(await fileExists(diffstatPath))) errors.push(`Missing ${relDiffstatPath}`);
    if (!(await fileExists(verifyLogPath))) errors.push(`Missing ${relVerifyLogPath}`);
    if (!(await fileExists(reviewPath))) errors.push(`Missing ${relReviewPath}`);

    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      try {
        meta = parsePrMeta(await readFile(metaPath, "utf8"), task.id);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(message);
      }
    }

    if (await fileExists(reviewPath)) {
      const review = await readFile(reviewPath, "utf8");
      validateReviewContents(review, errors);
    }

    if (task.verify && task.verify.length > 0) {
      if (meta?.verify?.status !== "pass") {
        errors.push("Verify requirements not satisfied (meta.verify.status != pass)");
      }
      if (!meta?.last_verified_sha || !meta.last_verified_at) {
        errors.push("Verify metadata missing (last_verified_sha/last_verified_at)");
      }
    }

    if (errors.length > 0) {
      throw new CliError({ exitCode: 3, code: "E_VALIDATION", message: errors.join("\n") });
    }

    process.stdout.write(`${successMessage("pr check", path.relative(resolved.gitRoot, prDir))}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr check", root: opts.rootOverride ?? null });
  }
}
