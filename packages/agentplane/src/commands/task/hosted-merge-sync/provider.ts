import { resolveChangeRequestIdentity } from "../../pr/internal/change-request-provider.js";
import type { RecordedGitHostIdentity } from "../../pr/internal/git-host-identity.js";
import {
  resolveHostedMergedPr as resolveGithubMergedPr,
  resolveHostedMergeTargetFromEvent as resolveGithubMergeTargetFromEvent,
} from "./github.js";
import { resolveGitLabMergedMr, resolveGitLabMergeTargetFromEvent } from "./gitlab.js";
import type { HostedMergedPr, HostedMergeTarget } from "./model.js";

export function resolveHostedMergeTargetFromProviderEvent(opts: {
  event: unknown;
  branchPrefix: string;
}): HostedMergeTarget | null {
  return resolveGithubMergeTargetFromEvent(opts) ?? resolveGitLabMergeTargetFromEvent(opts);
}

export async function resolveHostedMergedChangeRequest(opts: {
  cwd: string;
  branch: string;
  recorded?: RecordedGitHostIdentity | null;
}): Promise<HostedMergedPr | null> {
  // Metadata written before provider snapshots existed can only refer to the
  // legacy GitHub lifecycle. Keep that path independent of new remote identity.
  if (!opts.recorded) return resolveGithubMergedPr(opts);
  const identity = await resolveChangeRequestIdentity({
    gitRoot: opts.cwd,
    branch: opts.branch,
    recorded: opts.recorded,
  });
  return identity.provider === "gitlab"
    ? resolveGitLabMergedMr({ ...opts, identity })
    : resolveGithubMergedPr(opts);
}
