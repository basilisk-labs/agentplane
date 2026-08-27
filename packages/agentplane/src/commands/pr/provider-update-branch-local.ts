import { execFileAsync } from "@agentplaneorg/core/process";
import { gitEnv, gitProofEnv } from "@agentplaneorg/core/git";
import type { ProviderUpdateBranchRequest } from "./provider-update-branch.js";

async function git(cwd: string, args: string[], proof = false): Promise<string> {
  const { stdout } = await execFileAsync("git", args, {
    cwd,
    env: proof ? gitProofEnv() : gitEnv(),
  });
  return stdout.trim();
}

function checkout(request: ProviderUpdateBranchRequest): string {
  return request.worktreePath ?? request.gitRoot;
}

function trackingRef(request: ProviderUpdateBranchRequest): string {
  return `refs/remotes/${request.identity.remote}/${request.branch}`;
}

/** Validate only. No local or provider mutation is permitted before this succeeds. */
export async function validateProviderUpdateLocalState(
  request: ProviderUpdateBranchRequest,
  allowedHeads: readonly string[],
): Promise<string | null> {
  const cwd = checkout(request);
  try {
    await git(cwd, ["check-ref-format", `refs/heads/${request.branch}`]);
    await git(cwd, ["check-ref-format", trackingRef(request)]);
    const [branch, head, status, upstream, fetchUrl, pushUrl] = await Promise.all([
      git(cwd, ["symbolic-ref", "--quiet", "HEAD"]),
      git(cwd, ["rev-parse", "--verify", "HEAD"]),
      git(cwd, ["status", "--porcelain", "--untracked-files=all"]),
      git(cwd, ["rev-parse", "--symbolic-full-name", "@{upstream}"]),
      git(cwd, ["remote", "get-url", "--all", request.identity.remote]),
      git(cwd, ["remote", "get-url", "--push", "--all", request.identity.remote]),
    ]);
    if (branch !== `refs/heads/${request.branch}`)
      return "The authoritative checkout is not on the task branch.";
    if (!allowedHeads.includes(head))
      return "The local task head changed outside the authorized update.";
    if (status) return "The task checkout contains uncommitted or untracked work.";
    if (upstream !== trackingRef(request)) return "The task branch tracking identity changed.";
    if (fetchUrl !== request.identity.targetUrl || pushUrl !== request.identity.sourceUrl) {
      return "The task remote URLs changed after provider identity was authorized.";
    }
    const upstreamHead = await git(cwd, ["rev-parse", "--verify", upstream]);
    if (!allowedHeads.includes(upstreamHead))
      return "The task tracking head changed outside the authorized update.";
    return null;
  } catch {
    return "The exact local branch, clean state or tracking identity could not be verified.";
  }
}

/** Adopt only a provider-proven descendant. Never discard or rewrite local history. */
export async function reconcileProviderUpdateLocalHead(
  request: ProviderUpdateBranchRequest,
  observedHead: string,
): Promise<string | null> {
  const cwd = checkout(request);
  const allowedHeads = [request.expectedHeadSha, observedHead];
  const before = await validateProviderUpdateLocalState(request, allowedHeads);
  if (before) return before;
  try {
    // The PR head belongs to the publication source, which can differ from the base remote.
    await git(cwd, [
      "fetch",
      "--no-tags",
      "--no-write-fetch-head",
      "--",
      request.identity.sourceUrl,
      `refs/heads/${request.branch}:${trackingRef(request)}`,
    ]);
    if ((await git(cwd, ["rev-parse", "--verify", trackingRef(request)])) !== observedHead) {
      return "Fetched task branch does not match the ancestry-proven provider head.";
    }
    for (const ancestor of [request.expectedHeadSha, request.expectedBaseSha]) {
      await git(cwd, ["merge-base", "--is-ancestor", ancestor, observedHead], true);
    }
    const beforeMerge = await validateProviderUpdateLocalState(request, allowedHeads);
    if (beforeMerge) return beforeMerge;
    await git(cwd, ["merge", "--ff-only", "--no-edit", "--no-overwrite-ignore", observedHead]);
    const after = await validateProviderUpdateLocalState(request, [observedHead]);
    return after;
  } catch {
    return "Fetching or fast-forwarding the proven provider head failed. Preserve local work and reconcile before any publication.";
  }
}
