export type WatchedRuntimeSnapshotFile = {
  path: string;
  sha256: string;
  size_bytes: number;
};

export type WatchedRuntimeSnapshot = {
  watchedPaths: string[];
  files: WatchedRuntimeSnapshotFile[];
  snapshotHash: string;
};

export type WatchedRuntimeSnapshotComparison = {
  ok: boolean;
  changedPaths: string[];
};

export function getWatchedRuntimePathsForPackage(packageName: string): string[];
export function collectWatchedRuntimeSnapshot(
  packageDir: string,
  watchedPaths: string[],
): Promise<WatchedRuntimeSnapshot>;
export function compareWatchedRuntimeSnapshots(
  recordedSnapshot: WatchedRuntimeSnapshot,
  currentSnapshot: WatchedRuntimeSnapshot,
): WatchedRuntimeSnapshotComparison;
