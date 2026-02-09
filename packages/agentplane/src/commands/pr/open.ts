import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { fileExists } from "../../cli/fs-utils.js";
import { successMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import { renderPrReviewTemplate } from "./internal/review-template.js";

function nowIso(): string {
  return new Date().toISOString();
}

export async function cmdPrOpen(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author: string;
  branch?: string;
}): Promise<number> {
  try {
    const author = opts.author.trim();
    if (!author) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid value for --author.",
      });
    }

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
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    const branch = (opts.branch ?? (await gitCurrentBranch(resolved.gitRoot))).trim();
    if (!branch) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Branch could not be resolved (use --branch).",
      });
    }

    await mkdir(prDir, { recursive: true });

    const now = nowIso();
    let meta: PrMeta | null = null;
    if (await fileExists(metaPath)) {
      const raw = await readFile(metaPath, "utf8");
      meta = parsePrMeta(raw, task.id);
    }
    const createdAt = meta?.created_at ?? now;
    const nextMeta: PrMeta = {
      schema_version: 1,
      task_id: task.id,
      branch,
      created_at: createdAt,
      updated_at: now,
      last_verified_sha: meta?.last_verified_sha ?? null,
      last_verified_at: meta?.last_verified_at ?? null,
      verify: meta?.verify ?? { status: "skipped" },
    };
    await writeJsonStableIfChanged(metaPath, nextMeta);

    await writeTextIfChanged(diffstatPath, "");
    await writeTextIfChanged(verifyLogPath, "");
    if (!(await fileExists(reviewPath))) {
      const review = renderPrReviewTemplate({ author, createdAt, branch });
      await atomicWriteFile(reviewPath, review, "utf8");
    }

    process.stdout.write(`${successMessage("pr open", path.relative(resolved.gitRoot, prDir))}\n`);
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr open", root: opts.rootOverride ?? null });
  }
}
