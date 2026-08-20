import type { GitHostIdentity, GitHostProvider } from "./git-host-identity.js";

export type ChangeRequestMergeability = {
  state: "conflicting" | "not_conflicting" | "pending" | "unknown";
  mergeable: boolean | null;
  providerState: string | null;
};

export type ObservedChangeRequest = {
  provider: GitHostProvider;
  identity: GitHostIdentity;
  prNumber: number;
  prUrl: string | null;
  status: "OPEN" | "CLOSED" | "MERGED";
  mergedAt: string | null;
  mergeCommit: string | null;
  base: string | null;
  headSha: string | null;
  baseSha?: string | null;
  headRef?: string | null;
  mergeability?: ChangeRequestMergeability;
};

export type ChangeRequestLookupResult =
  | { state: "found"; pr: ObservedChangeRequest }
  | { state: "not_found" }
  | { state: "unavailable"; reason: string };

export type ChangeRequestMutationResult = {
  observed: ObservedChangeRequest | null;
  stagedReason: string | null;
  artifactState: "remote_staged" | "remote_failed" | null;
};
