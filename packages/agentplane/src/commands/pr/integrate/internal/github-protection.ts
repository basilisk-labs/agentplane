import { resolveDefaultGithubRepo, runGhApiJson } from "../../internal/gh-api.js";

type GithubBranchProtection = {
  required_pull_request_reviews?: unknown;
};

export async function requiresPullRequestMergePath(opts: {
  gitRoot: string;
  baseBranch: string;
}): Promise<boolean> {
  try {
    const repo = await resolveDefaultGithubRepo(opts.gitRoot);
    const protection = await runGhApiJson<GithubBranchProtection>(opts.gitRoot, [
      `repos/${repo}/branches/${opts.baseBranch}/protection`,
    ]);
    return protection.required_pull_request_reviews !== undefined;
  } catch {
    return false;
  }
}
