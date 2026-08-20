import { normalizeGlabTransportError, runGlabApiJson } from "../../internal/glab-api.js";

export type GitLabBaseMergeRequestProtection =
  | { state: "protected"; baseBranch: string }
  | { state: "unprotected"; baseBranch: string }
  | { state: "unavailable"; baseBranch: string; reason: string };

type GitLabProtectedBranch = {
  name?: string | null;
  merge_access_levels?: unknown[] | null;
};

export async function resolveGitLabBaseMergeRequestProtection(opts: {
  gitRoot: string;
  identity: { hostname: string; targetProject: string };
  baseBranch: string;
}): Promise<GitLabBaseMergeRequestProtection> {
  try {
    const record = await runGlabApiJson<GitLabProtectedBranch>({
      cwd: opts.gitRoot,
      hostname: opts.identity.hostname,
      endpoint: `projects/${encodeURIComponent(opts.identity.targetProject)}/protected_branches/${encodeURIComponent(opts.baseBranch)}`,
    });
    return record.name?.trim() === opts.baseBranch
      ? { state: "protected", baseBranch: opts.baseBranch }
      : { state: "unprotected", baseBranch: opts.baseBranch };
  } catch (error) {
    const reason = normalizeGlabTransportError(error);
    if (/\b404\b|not found/i.test(reason)) {
      return { state: "unprotected", baseBranch: opts.baseBranch };
    }
    return {
      state: "unavailable",
      baseBranch: opts.baseBranch,
      reason: reason || "GitLab protected-branch lookup failed without diagnostic output",
    };
  }
}
