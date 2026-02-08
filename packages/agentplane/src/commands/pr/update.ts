import { readFile } from "node:fs/promises";
import path from "node:path";

import { resolveBaseBranch } from "@agentplaneorg/core";

import { mapBackendError } from "../../cli/error-map.js";
import { fileExists } from "../../cli/fs-utils.js";
import { successMessage, workflowModeMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import { writeJsonStableIfChanged, writeTextIfChanged } from "../../shared/write-if-changed.js";
import { execFileAsync, gitEnv } from "../shared/git.js";
import { gitCurrentBranch } from "../shared/git-ops.js";
import { parsePrMeta, type PrMeta } from "../shared/pr-meta.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";

import { resolvePrPaths } from "./internal/pr-paths.js";
import { updateAutoSummaryBlock } from "./internal/review-template.js";

function nowIso(): string {
  return new Date().toISOString();
}

export async function cmdPrUpdate(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
}): Promise<number> {
  try {
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    const { resolved, config, prDir, metaPath, diffstatPath, reviewPath } = await resolvePrPaths({
      ...opts,
      ctx,
    });

    if (config.workflow_mode !== "branch_pr") {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: workflowModeMessage(config.workflow_mode, "branch_pr"),
      });
    }

    if (!(await fileExists(metaPath)) || !(await fileExists(reviewPath))) {
      const missing: string[] = [];
      if (!(await fileExists(metaPath))) missing.push(path.relative(resolved.gitRoot, metaPath));
      if (!(await fileExists(reviewPath)))
        missing.push(path.relative(resolved.gitRoot, reviewPath));
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `PR artifacts missing: ${missing.join(", ")} (run \`agentplane pr open\`)`,
      });
    }

    const baseBranch = await resolveBaseBranch({
      cwd: opts.cwd,
      rootOverride: opts.rootOverride ?? null,
      cliBaseOpt: null,
      mode: config.workflow_mode,
    });
    if (!baseBranch) {
      throw new CliError({
        exitCode: 2,
        code: "E_USAGE",
        message: "Base branch could not be resolved (use `agentplane branch base set`).",
      });
    }
    const branch = await gitCurrentBranch(resolved.gitRoot);
    const { stdout: diffStatOut } = await execFileAsync(
      "git",
      ["diff", "--stat", `${baseBranch}...HEAD`],
      { cwd: resolved.gitRoot, env: gitEnv() },
    );
    const diffstat = diffStatOut.trimEnd();
    await writeTextIfChanged(diffstatPath, diffstat ? `${diffstat}\n` : "");

    const { stdout: headOut } = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: resolved.gitRoot,
      env: gitEnv(),
    });
    const headSha = headOut.trim();
    const summaryLines = [
      `- Updated: ${nowIso()}`,
      `- Branch: ${branch}`,
      `- Head: ${headSha.slice(0, 12)}`,
      "- Diffstat:",
      "```",
      diffstat || "No changes detected.",
      "```",
    ];
    const reviewText = await readFile(reviewPath, "utf8");
    const nextReview = updateAutoSummaryBlock(reviewText, summaryLines.join("\n"));
    await writeTextIfChanged(reviewPath, nextReview);

    const rawMeta = await readFile(metaPath, "utf8");
    const meta = parsePrMeta(rawMeta, opts.taskId);
    const nextMeta: PrMeta = {
      ...meta,
      branch,
      updated_at: nowIso(),
      last_verified_sha: meta.last_verified_sha ?? null,
      last_verified_at: meta.last_verified_at ?? null,
    };
    await writeJsonStableIfChanged(metaPath, nextMeta);

    process.stdout.write(
      `${successMessage("pr update", path.relative(resolved.gitRoot, prDir))}\n`,
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapBackendError(err, { command: "pr update", root: opts.rootOverride ?? null });
  }
}
