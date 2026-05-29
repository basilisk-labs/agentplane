export type HostedCloseOutcome =
  | { outcome: "noop"; detail: string }
  | { outcome: "closed"; taskId: string; mergeHash: string }
  | { outcome: "meta-only"; taskId: string; mergeHash: string };
