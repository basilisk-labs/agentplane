import { mapCoreError } from "../../cli/error-map.js";
import { exitCodeForError } from "../../cli/exit-codes.js";
import { createCliEmitter, successMessage } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  deleteCloseRemoteHeadBranch,
  ensureNonEmptyCloseFlag,
  resolveCloseGithubRepo,
  type CloseRemoteBranchAction,
} from "../shared/close-precheck.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";
import { runGhApiJson, runGhApiNoOutput } from "./internal/gh-api.js";

type GithubPullResponse = {
  number: number;
  state?: string;
  html_url?: string;
  head?: {
    ref?: string;
    repo?: {
      full_name?: string;
    } | null;
  } | null;
};

type PrCloseResult = {
  repo: string;
  prNumber: number;
  url: string | null;
  state: string;
  comment: "added" | "skipped";
  remoteBranch: string | null;
  remoteBranchAction: CloseRemoteBranchAction | "skipped" | "skipped-fork" | "skipped-missing-head";
};

export async function cmdPrClose(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  prNumber: number;
  repo?: string;
  comment?: string;
  deleteRemoteBranch: boolean;
}): Promise<number> {
  try {
    if (!Number.isInteger(opts.prNumber) || opts.prNumber <= 0) {
      throw new CliError({
        exitCode: exitCodeForError("E_USAGE"),
        code: "E_USAGE",
        message: "Invalid PR number.",
      });
    }

    const output = createCliEmitter();
    const ctx =
      opts.ctx ??
      (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
    const commandCwd = ctx.resolvedProject.gitRoot;
    const repo = opts.repo
      ? ensureNonEmptyCloseFlag("repo", opts.repo)
      : await resolveCloseGithubRepo({ gitRoot: commandCwd, repoOverride: null });
    const comment = opts.comment?.trim() ? ensureNonEmptyCloseFlag("comment", opts.comment) : null;
    const pr = await runGhApiJson<GithubPullResponse>(commandCwd, [
      `repos/${repo}/pulls/${opts.prNumber}`,
    ]);

    if (!pr.number) {
      throw new CliError({
        exitCode: exitCodeForError("E_VALIDATION"),
        code: "E_VALIDATION",
        message: `GitHub pull request #${opts.prNumber} was not found in ${repo}.`,
      });
    }

    if (comment) {
      await runGhApiNoOutput(commandCwd, [
        `repos/${repo}/issues/${opts.prNumber}/comments`,
        "-X",
        "POST",
        "-f",
        `body=${comment}`,
      ]);
    }

    const closed = await runGhApiJson<GithubPullResponse>(commandCwd, [
      `repos/${repo}/pulls/${opts.prNumber}`,
      "-X",
      "PATCH",
      "-f",
      "state=closed",
    ]);

    const headRepo =
      closed.head?.repo?.full_name?.trim() ?? pr.head?.repo?.full_name?.trim() ?? null;
    const headRef = closed.head?.ref?.trim() ?? pr.head?.ref?.trim() ?? null;
    let remoteBranchAction: PrCloseResult["remoteBranchAction"] = "skipped";
    if (opts.deleteRemoteBranch) {
      if (!headRef) {
        remoteBranchAction = "skipped-missing-head";
      } else if (headRepo && headRepo !== repo) {
        remoteBranchAction = "skipped-fork";
      } else {
        remoteBranchAction = await deleteCloseRemoteHeadBranch({
          cwd: commandCwd,
          repo,
          branch: headRef,
        });
      }
    }

    const result: PrCloseResult = {
      repo,
      prNumber: opts.prNumber,
      url: closed.html_url?.trim() ?? pr.html_url?.trim() ?? null,
      state: closed.state?.trim() ?? pr.state?.trim() ?? "closed",
      comment: comment ? "added" : "skipped",
      remoteBranch: headRef,
      remoteBranchAction,
    };
    output.report(
      [
        { label: "repo", value: result.repo },
        { label: "state", value: result.state },
        { label: "url", value: result.url ?? "unknown" },
        { label: "comment", value: result.comment },
        { label: "remote_branch", value: result.remoteBranch ?? "unknown" },
        { label: "remote_branch_action", value: result.remoteBranchAction },
      ],
      {
        header: successMessage("pr close", `#${result.prNumber}`),
      },
    );
    return 0;
  } catch (err) {
    if (err instanceof CliError) throw err;
    throw mapCoreError(err, { command: "pr close", root: opts.rootOverride ?? null });
  }
}
