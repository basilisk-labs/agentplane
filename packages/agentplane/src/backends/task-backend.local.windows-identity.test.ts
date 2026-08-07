import type { PathLike } from "node:fs";
import { realpath, rm } from "node:fs/promises";
import type * as NodeFsPromises from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const ntfsIdentityMock = vi.hoisted(() => ({
  filePaths: [] as string[],
  dev: 18_014_398_509_481_985n,
  ino: 25_000_000_000_000_001n,
  lstatHits: 0,
  handleStatHits: 0,
}));

function withNtfsIdentity<T>(stats: T): T {
  return Object.assign(stats as object, {
    dev: ntfsIdentityMock.dev,
    ino: ntfsIdentityMock.ino,
  }) as T;
}

function matchesNtfsPath(filePath: PathLike): boolean {
  return ntfsIdentityMock.filePaths.includes(String(filePath));
}

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof NodeFsPromises>();
  return {
    ...actual,
    lstat: async (filePath: PathLike, options?: { bigint?: boolean }) => {
      const stats = await actual.lstat(filePath, options as { bigint: true });
      if (
        matchesNtfsPath(filePath) &&
        typeof stats.dev === "bigint" &&
        typeof stats.ino === "bigint"
      ) {
        ntfsIdentityMock.lstatHits += 1;
        return withNtfsIdentity(stats);
      }
      return stats;
    },
    open: async (filePath: PathLike, flags: string | number, mode?: number) => {
      const handle = await actual.open(filePath, flags, mode);
      if (!matchesNtfsPath(filePath)) return handle;
      return new Proxy(handle, {
        get(target, property) {
          if (property === "stat") {
            return async (options?: { bigint?: boolean }) => {
              const stats = await target.stat(options as { bigint: true });
              ntfsIdentityMock.handleStatHits += 1;
              return withNtfsIdentity(stats);
            };
          }
          const value = Reflect.get(target, property, target) as unknown;
          if (typeof value !== "function") return value;
          const callable = value as (...args: unknown[]) => unknown;
          return (...args: unknown[]): unknown => Reflect.apply(callable, target, args) as unknown;
        },
      });
    },
  };
});

import { mkTempDir, silenceStdIO } from "@agentplane/testkit";
import { LocalBackend, type TaskData } from "./task-backend.js";

describe("LocalBackend Windows file identity", () => {
  let tempDir = "";
  let restoreStdIO: (() => void) | null = null;

  beforeEach(async () => {
    restoreStdIO = silenceStdIO();
    tempDir = await mkTempDir();
  });

  afterEach(async () => {
    ntfsIdentityMock.filePaths = [];
    ntfsIdentityMock.lstatHits = 0;
    ntfsIdentityMock.handleStatHits = 0;
    restoreStdIO?.();
    restoreStdIO = null;
    await rm(tempDir, { recursive: true, force: true });
  });

  it("preserves NTFS-style README file ids through the stable scan reader", async () => {
    expect(BigInt(Number(ntfsIdentityMock.dev))).not.toBe(ntfsIdentityMock.dev);
    expect(BigInt(Number(ntfsIdentityMock.ino))).not.toBe(ntfsIdentityMock.ino);

    const backend = new LocalBackend({ dir: tempDir, updatedBy: "tester" });
    const task: TaskData = {
      id: "202608061925-NTF5",
      title: "NTFS identity",
      description: "Exact scan identity",
      status: "TODO",
      priority: "high",
      owner: "TESTER",
      depends_on: [],
      tags: ["windows"],
      verify: [],
      doc: "## Summary\n\nNTFS identity regression",
    };
    await backend.writeTask(task);
    const readmePath = path.join(tempDir, task.id, "README.md");
    ntfsIdentityMock.filePaths = [readmePath, await realpath(readmePath)];

    const tasks = await backend.listTasks();

    expect({
      ids: tasks.map((entry) => entry.id),
      warnings: backend.getLastListWarnings(),
      lstatHits: ntfsIdentityMock.lstatHits,
      handleStatHits: ntfsIdentityMock.handleStatHits,
    }).toEqual({
      ids: [task.id],
      warnings: [],
      lstatHits: 5,
      handleStatHits: 2,
    });
  });
});
