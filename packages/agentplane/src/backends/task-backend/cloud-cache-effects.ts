import path from "node:path";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import type { LocalBackend } from "./local-backend.js";
import {
  assertCloudCacheProjectionUnchanged,
  assertCloudCacheTaskUnchanged,
  cloudCacheProjectionChangedError,
  readStrictCloudCacheTasks,
  type CloudCacheSnapshotPort,
} from "./cloud-cache-snapshot.js";
import { cloudTaskProjectionSha256 } from "./cloud-backend-push.js";
import { compareCodeUnits } from "./cloud-backend-utils.js";
import {
  assertCloudProjectionDirectoryUnchanged,
  ensureContainedCloudProjectionDirectory,
} from "./cloud-projection-lock.js";
import type { TaskData } from "./shared.js";

export type CloudCacheEffectsPort = CloudCacheSnapshotPort &
  Pick<LocalBackend, "deleteTaskWithPublicationGuard" | "root" | "writeTaskWithReceipt">;

export async function applyCloudCacheEffects(opts: {
  cache: CloudCacheEffectsPort;
  expectedTasks: TaskData[];
  writes: TaskData[];
  removedIds: string[];
  repositoryRoot: string;
}): Promise<TaskData[]> {
  let expectedTasks = opts.expectedTasks;
  for (const task of opts.writes.toSorted((left, right) => compareCodeUnits(left.id, right.id))) {
    expectedTasks = await applyCloudTaskWrite({ ...opts, expectedTasks, task });
  }
  for (const taskId of opts.removedIds.toSorted(compareCodeUnits)) {
    expectedTasks = await applyCloudTaskDelete({ ...opts, expectedTasks, taskId });
  }
  return expectedTasks;
}

async function applyCloudTaskWrite(opts: {
  cache: CloudCacheEffectsPort;
  expectedTasks: TaskData[];
  repositoryRoot: string;
  task: TaskData;
}): Promise<TaskData[]> {
  await assertCloudCacheProjectionUnchanged({
    cache: opts.cache,
    expectedProjectionSha256: cloudTaskProjectionSha256(opts.expectedTasks),
    phase: `before writing task ${opts.task.id}`,
  });
  const expectedTask =
    opts.expectedTasks.find((candidate) => candidate.id === opts.task.id) ?? null;
  await assertCloudCacheTaskUnchanged(opts.cache, expectedTask, opts.task.id, "before write");
  const taskDirectoryChain = await ensureContainedCloudProjectionDirectory({
    directoryPath: path.join(opts.cache.root, opts.task.id),
    label: `cloud cache task directory ${opts.task.id}`,
    repositoryRoot: opts.repositoryRoot,
  });
  const assertTaskDirectoryUnchanged = async () => {
    await assertCloudProjectionDirectoryUnchanged(
      taskDirectoryChain,
      `cloud cache task directory ${opts.task.id}`,
    );
  };
  const writtenReceipt = await opts.cache.writeTaskWithReceipt(
    opts.task,
    { expectedRevision: expectedTask?.revision ?? 0 },
    assertTaskDirectoryUnchanged,
  );
  await assertTaskDirectoryUnchanged();
  assertWrittenTaskMatchesRequest(
    opts.task,
    writtenReceipt.task,
    expectedTask,
    writtenReceipt.changed,
  );
  return await readCloudCacheAfterTaskEffect({
    cache: opts.cache,
    previousTasks: opts.expectedTasks,
    taskId: opts.task.id,
    expectedTask: writtenReceipt.task,
    phase: "write",
  });
}

async function applyCloudTaskDelete(opts: {
  cache: CloudCacheEffectsPort;
  expectedTasks: TaskData[];
  repositoryRoot: string;
  taskId: string;
}): Promise<TaskData[]> {
  await assertCloudCacheProjectionUnchanged({
    cache: opts.cache,
    expectedProjectionSha256: cloudTaskProjectionSha256(opts.expectedTasks),
    phase: `before deleting task ${opts.taskId}`,
  });
  const expectedTask = opts.expectedTasks.find((candidate) => candidate.id === opts.taskId) ?? null;
  await assertCloudCacheTaskUnchanged(opts.cache, expectedTask, opts.taskId, "before delete");
  const taskDirectoryChain = await ensureContainedCloudProjectionDirectory({
    directoryPath: path.join(opts.cache.root, opts.taskId),
    label: `cloud cache task directory ${opts.taskId}`,
    repositoryRoot: opts.repositoryRoot,
  });
  await opts.cache.deleteTaskWithPublicationGuard(
    opts.taskId,
    { expectedRevision: expectedTask?.revision ?? 0 },
    async () => {
      await assertCloudProjectionDirectoryUnchanged(
        taskDirectoryChain,
        `cloud cache task directory ${opts.taskId}`,
      );
    },
  );
  return await readCloudCacheAfterTaskEffect({
    cache: opts.cache,
    previousTasks: opts.expectedTasks,
    taskId: opts.taskId,
    expectedTask: null,
    phase: "delete",
  });
}

async function readCloudCacheAfterTaskEffect(opts: {
  cache: CloudCacheEffectsPort;
  previousTasks: TaskData[];
  taskId: string;
  expectedTask: TaskData | null;
  phase: string;
}): Promise<TaskData[]> {
  const currentTasks = await readStrictCloudCacheTasks(
    opts.cache,
    `after task ${opts.phase} ${opts.taskId}`,
  );
  const previousOthers = opts.previousTasks.filter((task) => task.id !== opts.taskId);
  const currentOthers = currentTasks.filter((task) => task.id !== opts.taskId);
  const currentTask = currentTasks.find((task) => task.id === opts.taskId) ?? null;
  const expectedOthersSha256 = cloudTaskProjectionSha256(previousOthers);
  const currentOthersSha256 = cloudTaskProjectionSha256(currentOthers);
  const expectedTaskSha256 = cloudTaskProjectionSha256(
    opts.expectedTask ? [opts.expectedTask] : [],
  );
  const currentTaskSha256 = cloudTaskProjectionSha256(currentTask ? [currentTask] : []);
  if (expectedOthersSha256 !== currentOthersSha256 || expectedTaskSha256 !== currentTaskSha256) {
    throw cloudCacheProjectionChangedError(
      `after task ${opts.phase} ${opts.taskId}`,
      cloudTaskProjectionSha256([
        ...previousOthers,
        ...(opts.expectedTask ? [opts.expectedTask] : []),
      ]),
      cloudTaskProjectionSha256(currentTasks),
    );
  }
  return currentTasks;
}

function assertWrittenTaskMatchesRequest(
  requested: TaskData,
  written: TaskData,
  previous: TaskData | null,
  changed: boolean,
): void {
  const mismatchedField = Object.entries(requested).find(
    ([key, value]) =>
      key !== "revision" &&
      value !== undefined &&
      JSON.stringify(canonicalizeJson(written[key as keyof TaskData])) !==
        JSON.stringify(canonicalizeJson(value)),
  )?.[0];
  const previousRevision = previous?.revision ?? 0;
  const requestedRevision =
    Number.isInteger(requested.revision) &&
    typeof requested.revision === "number" &&
    requested.revision > 0
      ? requested.revision
      : 1;
  const expectedRevision =
    previous === null ? requestedRevision : changed ? previousRevision + 1 : previousRevision;
  if (!mismatchedField && written.revision === expectedRevision) return;
  throw cloudCacheProjectionChangedError(
    `write receipt for task ${requested.id}`,
    cloudTaskProjectionSha256([requested]),
    cloudTaskProjectionSha256([written]),
  );
}
