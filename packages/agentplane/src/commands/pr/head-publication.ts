import { gitBranchUpstream, gitRevParse } from "../shared/git-ops.js";

type ProviderHeadObservation =
  | { state: "found"; headSha: string | null }
  | { state: "not_found" }
  | { state: "unavailable"; reason: string }
  | null;

type PublicationEvidence = {
  localHeadSha: string;
  upstreamRef: string | null;
  upstreamHeadSha: string | null;
  hostedHeadSha: string | null;
};

export type PrHeadPublicationStatus =
  | ({ state: "aligned" } & PublicationEvidence)
  | ({
      state: "unpublished";
      reason: "missing_upstream" | "upstream_head_mismatch";
    } & PublicationEvidence)
  | ({ state: "hosted_mismatch" } & PublicationEvidence)
  | ({ state: "not_applicable"; reason: "remote_pr_not_found" } & PublicationEvidence)
  | {
      state: "unavailable";
      reason: string;
      localHeadSha: string | null;
      upstreamRef: string | null;
      upstreamHeadSha: string | null;
      hostedHeadSha: string | null;
    };

export async function resolvePrHeadPublicationStatus(opts: {
  gitRoot: string;
  branch: string | null;
  localHeadSha: string | null;
  providerObservation: ProviderHeadObservation;
}): Promise<PrHeadPublicationStatus> {
  if (!opts.branch || !opts.localHeadSha) {
    return {
      state: "unavailable",
      reason: "task branch or local branch head is unavailable",
      localHeadSha: opts.localHeadSha,
      upstreamRef: null,
      upstreamHeadSha: null,
      hostedHeadSha:
        opts.providerObservation?.state === "found" ? opts.providerObservation.headSha : null,
    };
  }

  const upstreamRef = await gitBranchUpstream(opts.gitRoot, opts.branch).catch(() => null);
  const upstreamHeadSha = upstreamRef
    ? await gitRevParse(opts.gitRoot, [upstreamRef]).catch(() => null)
    : null;
  const hostedHeadSha =
    opts.providerObservation?.state === "found" ? opts.providerObservation.headSha : null;
  const evidence = {
    localHeadSha: opts.localHeadSha,
    upstreamRef,
    upstreamHeadSha,
    hostedHeadSha,
  };

  if (!upstreamRef || !upstreamHeadSha) {
    return { state: "unpublished", reason: "missing_upstream", ...evidence };
  }
  if (upstreamHeadSha !== opts.localHeadSha) {
    return { state: "unpublished", reason: "upstream_head_mismatch", ...evidence };
  }
  if (opts.providerObservation?.state === "unavailable") {
    return {
      state: "unavailable",
      reason: opts.providerObservation.reason,
      ...evidence,
    };
  }
  if (opts.providerObservation?.state === "not_found") {
    return { state: "not_applicable", reason: "remote_pr_not_found", ...evidence };
  }
  if (opts.providerObservation?.state === "found") {
    if (!hostedHeadSha) {
      return {
        state: "unavailable",
        reason: "GitHub PR head SHA is unavailable",
        ...evidence,
      };
    }
    if (hostedHeadSha !== opts.localHeadSha) {
      return { state: "hosted_mismatch", ...evidence };
    }
  }
  return { state: "aligned", ...evidence };
}
