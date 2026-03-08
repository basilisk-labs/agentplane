export type PrePushUpdate = {
  localRef: string;
  localSha: string;
  remoteRef: string;
  remoteSha: string;
};

export function parsePrePushStdin(rawStdin: unknown): PrePushUpdate[];
export function hasReleaseTagPush(updates: PrePushUpdate[]): boolean;
export function selectBranchDiffRange(
  updates: PrePushUpdate[],
): { from: string; to: string } | null;
export function readChangedFilesForRange(range: { from: string; to: string } | null): string[];
