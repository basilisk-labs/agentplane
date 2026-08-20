import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";
import type { GitHostIdentity } from "../../internal/git-host-identity.js";
import { normalizeGlabTransportError, runGlabApiJson } from "../../internal/glab-api.js";

type PreMutationGuard = () => Promise<void>;

class PreMutationGuardFailure extends Error {
  readonly original: unknown;

  constructor(original: unknown) {
    super(original instanceof Error ? original.message : String(original));
    this.name = "PreMutationGuardFailure";
    this.original = original;
  }
}

type GitLabMergeReceipt = {
  state?: string | null;
  merged_at?: string | null;
  merge_commit_sha?: string | null;
  squash_commit_sha?: string | null;
};

export type ProtectedBaseGitLabMergeResult = {
  status: "merged";
  detail: string;
};

export async function runProtectedBaseGitLabMerge(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  prNumber: number;
  expectedHeadSha: string;
  preMutationGuard: PreMutationGuard;
}): Promise<ProtectedBaseGitLabMergeResult> {
  const directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-gitlab-merge-"));
  const payloadPath = path.join(directory, "payload.json");
  try {
    await writeFile(
      payloadPath,
      `${JSON.stringify(
        {
          sha: opts.expectedHeadSha,
          should_remove_source_branch: true,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    try {
      await opts.preMutationGuard();
    } catch (error) {
      throw new PreMutationGuardFailure(error);
    }
    const receipt = await runGlabApiJson<GitLabMergeReceipt>({
      cwd: opts.gitRoot,
      hostname: opts.identity.hostname,
      endpoint: `projects/${encodeURIComponent(opts.identity.targetProject)}/merge_requests/${opts.prNumber}/merge`,
      method: "PUT",
      inputPath: payloadPath,
    });
    if (
      receipt.state?.trim().toLowerCase() !== "merged" ||
      !(receipt.merge_commit_sha?.trim() || receipt.squash_commit_sha?.trim())
    ) {
      throw new CliError({
        exitCode: exitCodeForError("E_HANDOFF"),
        code: "E_HANDOFF",
        message: `GitLab MR !${opts.prNumber} merge was not confirmed by the provider receipt`,
        context: { reason_code: "gitlab_merge_receipt_unconfirmed", pr_number: opts.prNumber },
      });
    }
    return {
      status: "merged",
      detail: `GitLab MR !${opts.prNumber} merged immediately through glab api --hostname ${opts.identity.hostname}`,
    };
  } catch (error) {
    if (error instanceof PreMutationGuardFailure) throw error.original;
    if (error instanceof CliError) throw error;
    const message = normalizeGlabTransportError(error);
    if (/\b409\b|sha does not match|head.*changed/i.test(message)) {
      throw new CliError({
        code: "E_GIT_RACE",
        message:
          `GitLab refused MR !${opts.prNumber} because the expected head changed: ` +
          `expected=${opts.expectedHeadSha}; ${message}`,
        context: { reason_code: "gitlab_merge_head_changed", pr_number: opts.prNumber },
      });
    }
    throw new CliError({
      exitCode: exitCodeForError("E_HANDOFF"),
      code: "E_HANDOFF",
      message: `Unable to merge GitLab MR !${opts.prNumber}: ${message || "glab api failed"}`,
      context: { reason_code: "gitlab_merge_unavailable", pr_number: opts.prNumber },
    });
  } finally {
    await rm(directory, { recursive: true, force: true }).catch(() => null);
  }
}
