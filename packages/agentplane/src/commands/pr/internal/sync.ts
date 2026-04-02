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
import { parseTaskIdFromBranch } from "../../shared/git-worktree.js";
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

function isUnknownRevisionError(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  return /unknown revision or path not in the working tree/i.test(message);
}

async function resolveBranchHeadSha(opts: {
  gitRoot: string;
  branch: string;
}): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync("git", ["rev-parse", opts.branch], {
      cwd: opts.gitRoot,
      env: gitEnv(),
    });
    return stdout.trim() || null;
  } catch (err) {
    if (!isUnknownRevisionError(err)) throw err;
    return null;
  }
}

type PrSyncMode = "open" | "update";

type ResolvedPrSyncBranch = {
  branch: string | null;
  source: "explicit" | "meta" | "current" | "none";
};

async function resolvePrSyncBranch(opts: {
  resolved: { gitRoot: string };
  metaPath: string;
  taskId: string;
  branch?: string;
}): Promise<ResolvedPrSyncBranch> {
  const explicitBranch = opts.branch?.trim() ?? "";
  if (explicitBranch) {
    return { branch: explicitBranch, source: "explicit" };
  }

  if (await fileExists(opts.metaPath)) {
    const metaBranch =
      parsePrMeta(await readFile(opts.metaPath, "utf8"), opts.taskId).branch?.trim() ?? "";
    if (metaBranch) {
      return { branch: metaBranch, source: "meta" };
    }
  }

  const currentBranchValue = await gitCurrentBranch(opts.resolved.gitRoot);
  const currentBranch = currentBranchValue.trim();
  if (currentBranch) {
    return { branch: currentBranch, source: "current" };
  }

  return { branch: null, source: "none" };
}

export async function ensurePrArtifactsSynced(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  author?: string;
  branch?: string;
}): Promise<{
  branch: string;
  prDir: string;
  resolved: { gitRoot: string };
} | null> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const { resolved, config, metaPath } = await resolvePrPaths({ ...opts, ctx });
  if (config.workflow_mode !== "branch_pr") return null;

  const resolvedBranch = await resolvePrSyncBranch({
    resolved,
    metaPath,
    taskId: opts.taskId,
    branch: opts.branch,
  });
  const branch = resolvedBranch.branch?.trim() ?? "";
  if (!branch) return null;
  if (
    resolvedBranch.source === "current" &&
    parseTaskIdFromBranch(config.branch.task_prefix, branch) !== opts.taskId
  ) {
    return null;
  }

  const baseBranch = await resolveBaseBranch({
    cwd: opts.cwd,
    rootOverride: opts.rootOverride ?? null,
    cliBaseOpt: null,
    mode: config.workflow_mode,
  });
  if (resolvedBranch.source === "current" && baseBranch && branch === baseBranch) {
    return null;
  }

  await syncPrArtifacts({
    ...opts,
    ctx,
    mode: "open",
    author: opts.author,
    branch,
  });
  const result = await syncPrArtifacts({
    ...opts,
    ctx,
    mode: "update",
    branch,
  });
  return { ...result, branch };
}

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

    const resolvedBranch = await resolvePrSyncBranch({
      resolved,
      metaPath,
      taskId: task.id,
      branch: opts.branch,
    });
    const branch = resolvedBranch.branch?.trim() ?? "";
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
    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: config.workflow_mode,
    });
    const headSha = await resolveBranchHeadSha({ gitRoot: resolved.gitRoot, branch });

    if (opts.mode === "open") {
      const nextMeta: PrMeta = buildOpenedPrMeta({
        taskId: task.id,
        branch,
        at: now,
        previousMeta: existingMeta,
        base: baseBranch,
        headSha,
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

    if (!baseBranch) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set`).",
      });
    }

    let diffstat = "";
    try {
      const { stdout: diffStatOut } = await execFileAsync(
        "git",
        ["diff", "--stat", `${baseBranch}...${branch}`],
        { cwd: resolved.gitRoot, env: gitEnv() },
      );
      diffstat = diffStatOut.trimEnd();
    } catch (err) {
      if (!isUnknownRevisionError(err)) throw err;
    }
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
