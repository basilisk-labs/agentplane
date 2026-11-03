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

export function assertGitLabExactBaseMergeCapability(project: {
  merge_method?: string | null;
}): void {
  if (project.merge_method !== "merge") {
    throw new Error("GitLab exact-base merge requires the merge-commit method");
  }
}

export async function runProtectedBaseGitLabMerge(opts: {
  gitRoot: string;
  identity: GitHostIdentity;
  prNumber: number;
  expectedHeadSha: string;
  preMutationGuard: PreMutationGuard;
  exactBaseParentProof?: boolean;
  baseBranch?: string;
  expectedBaseSha?: string;
}): Promise<ProtectedBaseGitLabMergeResult> {
  if (opts.exactBaseParentProof) {
    const project = await runGlabApiJson<{ merge_method?: string | null }>({
      cwd: opts.gitRoot,
      hostname: opts.identity.hostname,
      endpoint: `projects/${encodeURIComponent(opts.identity.targetProject)}`,
    });
    assertGitLabExactBaseMergeCapability(project);
  }
  const directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-gitlab-merge-"));
  const payloadPath = path.join(directory, "payload.json");
  try {
    await writeFile(
      payloadPath,
      `${JSON.stringify(
        {
          sha: opts.expectedHeadSha,
          should_remove_source_branch: false,
          ...(!opts.exactBaseParentProof ? { squash: false } : {}),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    try {
      if (!opts.exactBaseParentProof && (!opts.baseBranch || !opts.expectedBaseSha)) {
        throw new CliError({
          code: "E_VALIDATION",
          message: "Qualified integration base is required before GitLab merge.",
        });
      }
      await opts.preMutationGuard();
      if (!opts.exactBaseParentProof) {
        try {
          const project = await runGlabApiJson<{
            merge_method?: unknown;
            automatic_rebase_enabled?: unknown;
          } | null>({
            cwd: opts.gitRoot,
            hostname: opts.identity.hostname,
            endpoint: `projects/${encodeURIComponent(opts.identity.targetProject)}`,
          });
          // H-only SHA is insufficient for merge commits. A server fast-forward
          // requirement rejects a base that advances beyond the qualified head.
          // Read server policy after the read-only head/base guard so policy
          // changes during that guard cannot use an earlier capability result.
          if (project?.merge_method !== "ff")
            throw new Error("Server fast-forward enforcement is required.");
          if (project.automatic_rebase_enabled !== false) {
            if (Object.hasOwn(project, "automatic_rebase_enabled"))
              throw new Error("Automatic rebase must be explicitly disabled.");
            // Automatic rebase was introduced in GitLab 18.0. Older stable
            // releases omit this field; absence alone is not capability proof.
            const server = await runGlabApiJson<{ version?: unknown } | null>({
              cwd: opts.gitRoot,
              hostname: opts.identity.hostname,
              endpoint: "version",
            });
            const version = server?.version;
            const release =
              typeof version === "string"
                ? /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-(?:ee|ce))?$/u.exec(version)
                : null;
            if (
              !release ||
              release[0] !== version ||
              release.slice(1).some((part) => !Number.isSafeInteger(Number(part))) ||
              Number(release[1]) < 1 ||
              Number(release[1]) >= 18
            )
              throw new Error(
                "Missing automatic_rebase_enabled requires a stable GitLab release older than 18.0.",
              );
          }
        } catch (error) {
          throw new CliError({
            code: "E_HANDOFF",
            message: "Cannot qualify GitLab server enforcement of the current integration base.",
            context: {
              reason_code: "provider_current_base_merge_contract_unavailable",
              target_project: opts.identity.targetProject,
              provider_reason: error instanceof Error ? error.message : String(error),
            },
          });
        }
      }
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
