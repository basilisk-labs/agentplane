import { resolveDefaultGithubRepo, runGhApiJson } from "../../internal/gh-api.js";

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
    const protection = await runGhApiJson<GithubBranchProtection>(opts.gitRoot, [
      `repos/${repo}/branches/${opts.baseBranch}/protection`,
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
  return protection.state === "protected";
}
