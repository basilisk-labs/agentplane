import { resolveDefaultGithubRepo, runGhApiJson } from "../../internal/gh-api.js";
import { exitCodeForError } from "../../../../cli/exit-codes.js";
import { CliError } from "../../../../shared/errors.js";

type GithubBranchProtection = {
  required_pull_request_reviews?: unknown;
};

export type GithubBasePullRequestProtection =
  | { state: "protected"; baseBranch: string }
  | { state: "unprotected"; baseBranch: string }
  | { state: "unavailable"; baseBranch: string; reason: string };

/**
 * Resolves whether GitHub currently confirms that a base must use the PR merge
 * path. Unlike the compatibility boolean below, callers that must fail closed
 * can distinguish an unprotected base from an unavailable protection lookup.
 */
export async function resolveGithubBasePullRequestProtection(opts: {
  gitRoot: string;
  baseBranch: string;
}): Promise<GithubBasePullRequestProtection> {
  try {
    const repo = await resolveDefaultGithubRepo(opts.gitRoot);
    const branchPath = `repos/${repo}/branches/${encodeURIComponent(opts.baseBranch)}`;
    const branch = await runGhApiJson<{ name?: unknown; protected?: unknown } | null>(
      opts.gitRoot,
      [branchPath],
    );
    if (branch?.name !== opts.baseBranch || typeof branch.protected !== "boolean") {
      throw new Error("GitHub returned an invalid or mismatched branch protection observation.");
    }
    if (!branch.protected) {
      return { state: "unprotected", baseBranch: opts.baseBranch };
    }
    const protection = await runGhApiJson<GithubBranchProtection>(opts.gitRoot, [
      `${branchPath}/protection`,
    ]);
    if (protection.required_pull_request_reviews === undefined) {
      return { state: "unprotected", baseBranch: opts.baseBranch };
    }
    return { state: "protected", baseBranch: opts.baseBranch };
  } catch (err) {
    return {
      state: "unavailable",
      baseBranch: opts.baseBranch,
      reason: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function requiresPullRequestMergePath(opts: {
  gitRoot: string;
  baseBranch: string;
}): Promise<boolean> {
  const protection = await resolveGithubBasePullRequestProtection(opts);
  if (protection.state === "unavailable") {
    throw new CliError({
      exitCode: exitCodeForError("E_HANDOFF"),
      code: "E_HANDOFF",
      message:
        `Cannot determine GitHub protection for ${protection.baseBranch}; ` +
        "refusing to select a local merge path.",
      context: {
        reason_code: "provider_base_protection_unavailable",
        base_branch: protection.baseBranch,
        provider_reason: protection.reason,
      },
    });
  }
  // branch_pr has already established an open provider PR at the exact head.
  // Finalizing an unprotected base with a separate local squash/merge can leave
  // that provider PR OPEN while local task metadata is marked MERGED. Use the
  // provider PR as the sole merge authority for both protected and explicitly
  // unprotected bases.
  return true;
}

/** Strict checks bind server-side merge eligibility to an up-to-date branch.
 * enforce_admins applies those rules to actors who could otherwise bypass them.
 * Rulesets can add restrictions; they cannot relax this classic protection.
 */
export async function requireGithubCurrentBaseMergeProtection(opts: {
  gitRoot: string;
  targetProject: string;
  baseBranch: string;
}): Promise<void> {
  try {
    if (!/^[^/\s]+\/[^/\s]+$/u.test(opts.targetProject) || !opts.baseBranch) {
      throw new Error("Exact hosted repository and base branch are required.");
    }
    const protection = await runGhApiJson<{
      required_status_checks?: { strict?: unknown; contexts?: unknown; checks?: unknown };
      enforce_admins?: { enabled?: unknown };
    }>(opts.gitRoot, [
      `repos/${opts.targetProject}/branches/${encodeURIComponent(opts.baseBranch)}/protection`,
    ]);
    const checks = protection?.required_status_checks;
    if (
      checks?.strict !== true ||
      protection?.enforce_admins?.enabled !== true ||
      !(
        (Array.isArray(checks.contexts) &&
          checks.contexts.some((value) => typeof value === "string" && value.trim().length > 0)) ||
        (Array.isArray(checks.checks) &&
          checks.checks.some(
            (value: unknown) =>
              typeof value === "object" &&
              value !== null &&
              "context" in value &&
              typeof value.context === "string" &&
              value.context.trim().length > 0,
          ))
      )
    ) {
      throw new Error(
        "Strict required status checks enforced for bypass-capable actors are required.",
      );
    }
  } catch (error) {
    throw new CliError({
      code: "E_HANDOFF",
      message: "Cannot qualify GitHub server enforcement of the current integration base.",
      context: {
        reason_code: "provider_current_base_merge_contract_unavailable",
        target_project: opts.targetProject,
        base_branch: opts.baseBranch,
        provider_reason: error instanceof Error ? error.message : String(error),
      },
    });
  }
}
