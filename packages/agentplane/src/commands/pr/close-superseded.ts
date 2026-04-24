import { readFile } from "node:fs/promises";

import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { fileExists } from "../../cli/fs-utils.js";
import { CliError } from "../../shared/errors.js";
import {
  deleteCloseRemoteHeadBranch,
  ensureBranchPrCloseWorkflowMode,
  resolveCloseGithubOwner,
  resolveCloseGithubRepo,
  type CloseRemoteBranchAction,
} from "../shared/close-precheck.js";
import {
  loadBackendTask,
  loadCommandContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { parsePrMetaForwardCompatible } from "../shared/pr-meta.js";

import { cmdPrClose } from "./close.js";
import { runGhApiJson } from "./internal/gh-api.js";
import { resolvePrPaths } from "./internal/pr-paths.js";

type GithubPullRecord = {
  number?: number;
  state?: string;
  html_url?: string;
};

export async function cmdPrCloseSuperseded(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  taskId: string;
  deleteRemoteBranch: boolean;
}): Promise<number> {
  try {
    const output = createCliEmitter();
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const { task } = await loadBackendTask({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      taskId: opts.taskId,
    });
    if (
      String(task.status ?? "")
        .trim()
        .toUpperCase() !== "DONE"
    ) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Task ${opts.taskId} must be DONE before closing superseded PRs.`,
      });
    }

    const { config, metaPath, resolved } = await resolvePrPaths({ ...opts, ctx });
    ensureBranchPrCloseWorkflowMode(config.workflow_mode);
    if (!(await fileExists(metaPath))) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Missing PR metadata: ${metaPath}`,
      });
    }

    const meta = parsePrMetaForwardCompatible(await readFile(metaPath, "utf8"), opts.taskId);
    const branch = meta.branch?.trim() ?? "";
    if (!branch) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Missing PR branch for ${opts.taskId}`,
      });
    }

    const repo = await resolveCloseGithubRepo({ gitRoot: resolved.gitRoot, repoOverride: null });
    const owner = resolveCloseGithubOwner(repo);

    const openPrs = await runGhApiJson<GithubPullRecord[]>(resolved.gitRoot, [
      `repos/${repo}/pulls?head=${encodeURIComponent(`${owner}:${branch}`)}&state=open&per_page=100`,
    ]);
    if (openPrs.length === 0) {
      const remoteBranchAction: CloseRemoteBranchAction | "skipped" = opts.deleteRemoteBranch
        ? await deleteCloseRemoteHeadBranch({ cwd: resolved.gitRoot, repo, branch })
        : "skipped";
      output.report(
        [
          { label: "task", value: opts.taskId },
          { label: "branch", value: branch },
          { label: "state", value: "skipped" },
          { label: "reason", value: "no open task PR found" },
          { label: "remote_branch_action", value: remoteBranchAction },
        ],
        { header: infoMessage(`pr close-superseded ${opts.taskId}`) },
      );
      return 0;
    }
    if (openPrs.length > 1) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Multiple open PRs match task ${opts.taskId} branch ${branch}: ${openPrs
          .map((pr) => pr.number)
          .filter(
            (value): value is number =>
              typeof value === "number" && Number.isInteger(value) && value > 0,
          )
          .map((value) => `#${value}`)
          .join(", ")}`,
      });
    }

    const prNumber = Number(openPrs[0]?.number ?? 0);
    if (!Number.isInteger(prNumber) || prNumber <= 0) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `Could not determine open PR number for task ${opts.taskId}.`,
      });
    }

    return await cmdPrClose({
      ctx,
      cwd: opts.cwd,
      rootOverride: opts.rootOverride,
      prNumber,
      comment: `Superseded by protected-main closure of task ${opts.taskId}.`,
      deleteRemoteBranch: opts.deleteRemoteBranch,
    });
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, {
      command: "pr close-superseded",
      root: opts.rootOverride ?? null,
    });
  }
}
