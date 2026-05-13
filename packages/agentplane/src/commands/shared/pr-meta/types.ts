import type { TaskPrMeta } from "@agentplaneorg/core/schemas";

export type PrMeta = TaskPrMeta;
export type PrBatchMeta = NonNullable<PrMeta["batch"]>;

export type ObservedGithubPrState = {
  prNumber: number;
  prUrl: string | null;
  status: "OPEN" | "CLOSED" | "MERGED";
  mergedAt?: string | null;
  mergeCommit?: string | null;
  base?: string | null;
  headSha?: string | null;
};

export type PrArtifactStateKind = "open" | "merged" | "handoff" | "remote_staged" | "remote_failed";

export type PrArtifactLifecycleState =
  | { kind: "open"; remoteStatus?: ObservedGithubPrState["status"] | null }
  | { kind: "merged"; mergeCommit?: string | null; mergedAt?: string | null }
  | { kind: "handoff"; reason: string }
  | { kind: "remote_staged"; reason: string }
  | { kind: "remote_failed"; reason: string };

export type PrArtifactTextState = {
  diffstatText: string | null;
  verifyLogText: string | null;
  reviewText: string | null;
};

export type PrArtifactState = PrArtifactTextState & {
  meta: PrMeta;
  lifecycle: PrArtifactLifecycleState;
};
