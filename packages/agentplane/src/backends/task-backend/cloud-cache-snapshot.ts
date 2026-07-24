import { createHash } from "node:crypto";
import type { BigIntStats } from "node:fs";
import { lstat, readdir } from "node:fs/promises";
import path from "node:path";

import type { LocalBackend } from "./local-backend.js";
import { cloudTaskProjectionSha256 } from "./cloud-backend-push.js";
import { BackendError, type TaskData } from "./shared.js";
import { validateTaskId } from "./shared/id.js";

export type CloudCacheSnapshotPort = Pick<LocalBackend, "getTask" | "listTasksWithWarnings">;

export async function readStrictCloudCacheTasks(
  cache: CloudCacheSnapshotPort & Pick<LocalBackend, "root">,
  phase: string,
): Promise<TaskData[]> {
  const beforeInventory = await readCloudTaskDirectoryInventory(cache.root, phase);
  const { tasks, warnings } = await cache.listTasksWithWarnings({ writeIndex: false });
  if (warnings.length > 0) {
    throw cloudCacheProjectionInvalidError(phase, warnings);
  }
  const afterInventory = await readCloudTaskDirectoryInventory(cache.root, phase);
  if (!sameCloudTaskDirectoryInventory(beforeInventory, afterInventory)) {
    throw cloudCacheProjectionChangedError(
      `${phase}: task inventory changed during scan`,
      cloudTaskDirectoryInventoryToken(beforeInventory),
      cloudTaskDirectoryInventoryToken(afterInventory),
    );
  }
  for (const task of tasks) {
    const taskDirectory = afterInventory.find((entry) => entry.taskId === task.id);
    if (!taskDirectory?.readme) {
      throw cloudCacheProjectionInvalidError(phase, [`unsafe_task_directory:${task.id}`]);
    }
  }
  return tasks;
}

export async function assertCloudCacheProjectionUnchanged(opts: {
  cache: CloudCacheSnapshotPort & Pick<LocalBackend, "root">;
  expectedProjectionSha256: string;
  phase: string;
}): Promise<void> {
  const currentTasks = await readStrictCloudCacheTasks(opts.cache, opts.phase);
  const actualProjectionSha256 = cloudTaskProjectionSha256(currentTasks);
  if (actualProjectionSha256 !== opts.expectedProjectionSha256) {
    throw cloudCacheProjectionChangedError(
      opts.phase,
      opts.expectedProjectionSha256,
      actualProjectionSha256,
    );
  }
}

export async function assertCloudCacheTaskUnchanged(
  cache: Pick<LocalBackend, "getTask">,
  expectedTask: TaskData | null,
  taskId: string,
  phase: string,
): Promise<void> {
  const currentTask = await cache.getTask(taskId);
  const expectedSha256 = cloudTaskProjectionSha256(expectedTask ? [expectedTask] : []);
  const actualSha256 = cloudTaskProjectionSha256(currentTask ? [currentTask] : []);
  if (actualSha256 !== expectedSha256) {
    throw cloudCacheProjectionChangedError(phase, expectedSha256, actualSha256);
  }
}

export function cloudCacheProjectionChangedError(
  phase: string,
  expectedProjectionSha256: string,
  actualProjectionSha256: string,
): BackendError {
  return new BackendError(
    [
      "Cloud cache projection changed during synchronization.",
      `Why: the canonical cache digest no longer matches the submitted snapshot (${phase}).`,
      `Expected: ${expectedProjectionSha256}`,
      `Actual: ${actualProjectionSha256}`,
      "Fix: review the local task edit, then restart cloud synchronization from a fresh snapshot.",
      "Safe command: agentplane backend inspect cloud --yes",
      "Stop condition: do not clear pending push state, apply remote tasks, or advance freshness from the stale response.",
    ].join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_cache_projection_changed" },
  );
}

function cloudCacheProjectionInvalidError(phase: string, warnings: string[]): BackendError {
  return new BackendError(
    [
      "Cloud cache projection is incomplete or unsafe.",
      `Why: the local task scan reported entries that cannot participate in a canonical snapshot (${phase}).`,
      ...warnings.slice(0, 20).map((warning) => `- ${warning}`),
      warnings.length > 20 ? `- warnings truncated=${warnings.length - 20}` : null,
      "Fix: repair the reported task README or unsafe task-directory entry before synchronizing.",
      "Safe command: agentplane task list",
      "Stop condition: do not push, apply, or advance freshness from a partial local projection.",
    ]
      .filter((line): line is string => line !== null)
      .join("\n"),
    "E_BACKEND",
    { reasonCode: "cloud_cache_projection_invalid" },
  );
}

type CloudPathSnapshot = {
  dev: bigint;
  ino: bigint;
  ctimeNs: bigint;
  mtimeNs: bigint;
  size: bigint;
};

type CloudTaskDirectoryInventoryEntry = {
  taskId: string;
  directory: CloudPathSnapshot;
  readme: CloudPathSnapshot | null;
};

function cloudPathSnapshot(stats: BigIntStats): CloudPathSnapshot {
  return {
    dev: BigInt(stats.dev),
    ino: BigInt(stats.ino),
    ctimeNs: BigInt(stats.ctimeNs),
    mtimeNs: BigInt(stats.mtimeNs),
    size: BigInt(stats.size),
  };
}

function sameCloudPathSnapshot(
  left: CloudPathSnapshot | null,
  right: CloudPathSnapshot | null,
): boolean {
  if (left === null || right === null) return left === right;
  return (
    left.dev === right.dev &&
    left.ino === right.ino &&
    left.ctimeNs === right.ctimeNs &&
    left.mtimeNs === right.mtimeNs &&
    left.size === right.size
  );
}

function sameCloudTaskDirectoryInventory(
  left: readonly CloudTaskDirectoryInventoryEntry[],
  right: readonly CloudTaskDirectoryInventoryEntry[],
): boolean {
  return (
    left.length === right.length &&
    left.every((entry, index) => {
      const candidate = right[index];
      return (
        candidate?.taskId === entry.taskId &&
        sameCloudPathSnapshot(entry.directory, candidate.directory) &&
        sameCloudPathSnapshot(entry.readme, candidate.readme)
      );
    })
  );
}

function cloudTaskDirectoryInventoryToken(
  inventory: readonly CloudTaskDirectoryInventoryEntry[],
): string {
  const canonical = inventory.map((entry) => ({
    taskId: entry.taskId,
    directory: Object.fromEntries(
      Object.entries(entry.directory).map(([key, value]) => [key, value.toString()]),
    ),
    readme: entry.readme
      ? Object.fromEntries(
          Object.entries(entry.readme).map(([key, value]) => [key, value.toString()]),
        )
      : null,
  }));
  return `sha256:${createHash("sha256").update(JSON.stringify(canonical)).digest("hex")}`;
}

async function readCloudTaskDirectoryInventory(
  cacheRoot: string,
  phase: string,
): Promise<CloudTaskDirectoryInventoryEntry[]> {
  const entries = await readdir(cacheRoot, { withFileTypes: true }).catch(
    (error: NodeJS.ErrnoException) => {
      if (error.code === "ENOENT") return [];
      throw error;
    },
  );
  const inventory: CloudTaskDirectoryInventoryEntry[] = [];
  const unsafe: string[] = [];
  for (const entry of entries.toSorted((left, right) => left.name.localeCompare(right.name))) {
    try {
      validateTaskId(entry.name);
    } catch {
      continue;
    }
    const directoryPath = path.join(cacheRoot, entry.name);
    let directoryStats;
    try {
      directoryStats = await lstat(directoryPath, { bigint: true });
    } catch {
      unsafe.push(`changed_task_entry:${entry.name}`);
      continue;
    }
    if (!entry.isDirectory() || directoryStats.isSymbolicLink() || !directoryStats.isDirectory()) {
      unsafe.push(`unsafe_task_entry:${entry.name}`);
      continue;
    }
    const readmePath = path.join(directoryPath, "README.md");
    let readmeStats = null;
    try {
      readmeStats = await lstat(readmePath, { bigint: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "ENOENT") {
        unsafe.push(`unreadable_task_readme:${entry.name}`);
        continue;
      }
    }
    if (readmeStats?.isSymbolicLink() || (readmeStats !== null && !readmeStats.isFile())) {
      unsafe.push(`unsafe_task_readme:${entry.name}`);
      continue;
    }
    inventory.push({
      taskId: entry.name,
      directory: cloudPathSnapshot(directoryStats),
      readme: readmeStats ? cloudPathSnapshot(readmeStats) : null,
    });
  }
  if (unsafe.length > 0) throw cloudCacheProjectionInvalidError(phase, unsafe);
  return inventory;
}
