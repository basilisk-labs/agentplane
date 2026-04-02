import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../../cli/error-map.js";
import { exitCodeForError } from "../../../cli/exit-codes.js";
import { fileExists } from "../../../cli/fs-utils.js";
import { workflowModeMessage } from "../../../cli/output.js";
import { CliError } from "../../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../../shared/write-if-changed.js";
import { execFileAsync, gitEnv } from "../../shared/git.js";
import { gitCurrentBranch } from "../../shared/git-ops.js";
import {
  buildOpenedPrMeta,
  buildUpdatedPrMeta,
  parsePrMeta,
  type PrMeta,
} from "../../shared/pr-meta.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../../shared/task-backend.js";

import { resolvePrPaths } from "./pr-paths.js";
import { readPrHandoffNotes } from "./note-store.js";
import { renderPrAutoSummary, renderPrReviewDocument } from "./review-template.js";

function nowIso(): string {
  return new Date().toISOString();
}

type PrSyncMode = "open" | "update";

export async function syncPrArtifacts(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  mode: PrSyncMode;
  author?: string;
  branch?: string;
}): Promise<{
  prDir: string;
  resolved: { gitRoot: string };
}> {
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
    const {
      resolved,
      config,
      prDir,
      metaPath,
      diffstatPath,
      notesPath,
      verifyLogPath,
      reviewPath,
    } = await resolvePrPaths({ ...opts, ctx });

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

    const metaExists = await fileExists(metaPath);
    const reviewExists = await fileExists(reviewPath);
    if (opts.mode === "update" && (!metaExists || !reviewExists)) {
      const missing: string[] = [];
      if (!metaExists) missing.push(path.relative(resolved.gitRoot, metaPath));
      if (!reviewExists) missing.push(path.relative(resolved.gitRoot, reviewPath));
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `PR artifacts missing: ${missing.join(", ")} (run \`agentplane pr open\`)`,
      });
    }

    await mkdir(prDir, { recursive: true });

    const existingMeta =
      metaExists && (await fileExists(metaPath))
        ? parsePrMeta(await readFile(metaPath, "utf8"), task.id)
        : null;
    const existingReview = reviewExists ? await readFile(reviewPath, "utf8") : null;
    const handoffNotes = await readPrHandoffNotes(notesPath);
    const now = nowIso();
    const createdAt = existingMeta?.created_at ?? now;

    if (opts.mode === "open") {
      const nextMeta: PrMeta = buildOpenedPrMeta({
        taskId: task.id,
        branch,
        at: now,
        previousMeta: existingMeta,
      });
      const nextReview = renderPrReviewDocument({
        existingReview,
        author: opts.author,
        createdAt,
        branch,
        handoffNotes,
      });
      await writeJsonStableIfChanged(metaPath, nextMeta);
      if (!(await fileExists(diffstatPath))) {
        await writeTextIfChanged(diffstatPath, "");
      }
      if (!(await fileExists(notesPath))) {
        await writeTextIfChanged(notesPath, "");
      }
      if (!(await fileExists(verifyLogPath))) {
        await writeTextIfChanged(verifyLogPath, "");
      }
      await writeTextIfChanged(reviewPath, nextReview);
      return { prDir, resolved };
    }

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set`).",
      });
    }

    const { stdout: diffStatOut } = await execFileAsync(
      "git",
      ["diff", "--stat", `${baseBranch}...HEAD`],
      { cwd: resolved.gitRoot, env: gitEnv() },
    );
    const diffstat = diffStatOut.trimEnd();
    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: resolved.gitRoot,
      env: gitEnv(),
    });
    const headSha = headOut.trim();

    const nextMeta: PrMeta = buildUpdatedPrMeta({
      meta: existingMeta!,
      branch,
      at: now,
      base: baseBranch,
      headSha,
    });
    const nextReview = renderPrReviewDocument({
      existingReview,
      createdAt,
      branch,
      handoffNotes,
      autoSummary: renderPrAutoSummary({
        updatedAt: nextMeta.updated_at,
        branch,
        headSha,
        diffstat,
      }),
    });

    await writeTextIfChanged(diffstatPath, diffstat ? `${diffstat}\n` : "");
    await writeTextIfChanged(reviewPath, nextReview);
    await writeJsonStableIfChanged(metaPath, nextMeta);
    return { prDir, resolved };
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr sync", root: opts.rootOverride ?? null });
  }
}
