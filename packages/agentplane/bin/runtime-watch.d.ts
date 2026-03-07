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

export function getWatchedRuntimePathsForPackage(packageName: string): string[];
export function collectWatchedRuntimeSnapshot(
  packageDir: string,
  watchedPaths: string[],
): Promise<WatchedRuntimeSnapshot>;
