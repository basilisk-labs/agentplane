import path from "node:path";

import {
  assertCloudProjectionDirectoryUnchanged,
  assertCloudProjectionPathContained,
  ensureContainedCloudProjectionDirectory,
  withCloudProjectionLock,
} from "./cloud-projection-lock.js";
import {
  cloudBackendStateFromSyncCheckpoint,
  cloudBackendSyncCheckpointToken,
  cloudProjectionCheckpointChangedError,
  readContainedCloudBackendSyncCheckpoint,
  writeContainedCloudBackendState,
  type CloudBackendState,
  type CloudBackendSyncCheckpoint,
} from "./cloud-backend-state.js";

const cloudProjectionOperationTails = new Map<string, Promise<void>>();

export async function withProjectionLock<T>(
  opts: {
    cacheRoot: string;
    operation: string;
    repositoryRoot: string;
    statePath: string;
  },
  run: () => Promise<T>,
): Promise<T> {
  assertCloudProjectionPathContained({
    label: "cloud cache root",
    repositoryRoot: opts.repositoryRoot,
    targetPath: opts.cacheRoot,
  });
  assertCloudProjectionPathContained({
    label: "cloud backend projection state",
    repositoryRoot: opts.repositoryRoot,
    targetPath: opts.statePath,
  });
  return await withInProcessCloudProjectionLock(opts.repositoryRoot, async () => {
    return await withCloudProjectionLock(opts, async () => {
      const cacheChain = await ensureContainedCloudProjectionDirectory({
        directoryPath: opts.cacheRoot,
        label: "cloud cache root",
        repositoryRoot: opts.repositoryRoot,
      });
      const stateChain = await ensureContainedCloudProjectionDirectory({
        directoryPath: path.dirname(opts.statePath),
        label: "cloud backend projection state directory",
        repositoryRoot: opts.repositoryRoot,
      });
      const result = await run();
      await assertCloudProjectionDirectoryUnchanged(cacheChain, "cloud cache root");
      await assertCloudProjectionDirectoryUnchanged(
        stateChain,
        "cloud backend projection state directory",
      );
      return result;
    });
  });
}

async function withInProcessCloudProjectionLock<T>(
  repositoryRoot: string,
  run: () => Promise<T>,
): Promise<T> {
  const previous = cloudProjectionOperationTails.get(repositoryRoot) ?? Promise.resolve();
  let release!: () => void;
  const current = new Promise<void>((resolve) => {
    release = resolve;
  });
  cloudProjectionOperationTails.set(repositoryRoot, current);
  await previous;
  try {
    return await run();
  } finally {
    release();
    if (cloudProjectionOperationTails.get(repositoryRoot) === current) {
      cloudProjectionOperationTails.delete(repositoryRoot);
    }
  }
}

export function createCloudSyncCheckpointGuard(opts: {
  initialCheckpoint: CloudBackendSyncCheckpoint;
  repositoryRoot: string;
  statePath: string;
}) {
  let expectedCheckpoint = opts.initialCheckpoint;
  const assertCheckpointUnchanged = async () => {
    const current = await readContainedCloudBackendSyncCheckpoint(opts);
    if (
      cloudBackendSyncCheckpointToken(current) !==
      cloudBackendSyncCheckpointToken(expectedCheckpoint)
    ) {
      throw cloudProjectionCheckpointChangedError();
    }
  };
  const commitState = async (
    state: CloudBackendState,
    commitOpts?: { beforePublicationCheck?: () => Promise<void> },
  ) => {
    await writeContainedCloudBackendState({
      ...opts,
      expectedCheckpoint,
      state,
      beforePublicationGuard: commitOpts?.beforePublicationCheck,
    });
    expectedCheckpoint = { kind: "valid", state };
  };
  return { assertCheckpointUnchanged, commitState };
}

export async function commitCloudBackendStateUpdate(
  opts: {
    repositoryRoot: string;
    statePath: string;
  },
  update: (state: CloudBackendState) => CloudBackendState | null,
): Promise<boolean> {
  const initialCheckpoint = await readContainedCloudBackendSyncCheckpoint(opts);
  const state = update(cloudBackendStateFromSyncCheckpoint(initialCheckpoint));
  if (state === null) return false;
  await createCloudSyncCheckpointGuard({
    ...opts,
    initialCheckpoint,
  }).commitState(state);
  return true;
}
