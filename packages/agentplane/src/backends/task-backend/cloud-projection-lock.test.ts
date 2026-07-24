import { execFile as execFileCallback } from "node:child_process";
import { access, mkdir, mkdtemp, readdir, symlink, writeFile } from "node:fs/promises";
import os, { hostname } from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { withProjectionLock } from "./cloud-backend-coordination.js";
import { withCloudProjectionLock } from "./cloud-projection-lock.js";

const execFile = promisify(execFileCallback);
const LOCK_RELATIVE = ".agentplane/cache/cloud-projection-lock/projection-operation.lock";

async function makeRoot(): Promise<string> {
  return await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-projection-lock-"));
}

describe("cloud projection operation lock", () => {
  it("rejects an external cache root before entering the projection operation", async () => {
    const root = await makeRoot();
    const outside = await makeRoot();
    let entered = false;

    await expect(
      withProjectionLock(
        {
          cacheRoot: path.join(outside, "tasks"),
          operation: "external-cache",
          repositoryRoot: root,
          statePath: path.join(root, ".agentplane", "backends", "cloud", "state.json"),
        },
        () => {
          entered = true;
          return Promise.resolve();
        },
      ),
    ).rejects.toThrow("cloud cache root outside the repository");

    expect(entered).toBe(false);
  });

  it("rejects a symlinked cache-root ancestor before entering the projection operation", async () => {
    const root = await makeRoot();
    const outside = await makeRoot();
    const cacheRoot = path.join(root, ".agentplane", "cloud-cache");
    await mkdir(path.dirname(cacheRoot), { recursive: true });
    await symlink(outside, cacheRoot, "dir");
    let entered = false;

    await expect(
      withProjectionLock(
        {
          cacheRoot,
          operation: "symlinked-cache",
          repositoryRoot: root,
          statePath: path.join(root, ".agentplane", "backends", "cloud", "state.json"),
        },
        () => {
          entered = true;
          return Promise.resolve();
        },
      ),
    ).rejects.toThrow("symlinked or non-directory cloud cache root");

    expect(entered).toBe(false);
  });

  it("removes the lock after success and permits the next operation", async () => {
    const root = await makeRoot();
    const calls: string[] = [];

    await withCloudProjectionLock({ operation: "first", repositoryRoot: root }, () => {
      calls.push("first");
      return Promise.resolve();
    });
    await expect(access(path.join(root, LOCK_RELATIVE))).rejects.toMatchObject({ code: "ENOENT" });

    await withCloudProjectionLock({ operation: "second", repositoryRoot: root }, () => {
      calls.push("second");
      return Promise.resolve();
    });
    await expect(access(path.join(root, LOCK_RELATIVE))).rejects.toMatchObject({ code: "ENOENT" });
    expect(calls).toEqual(["first", "second"]);
  });

  it("refuses a second live owner without entering its critical section", async () => {
    const root = await makeRoot();
    let releaseFirst!: () => void;
    let markStarted!: () => void;
    const started = new Promise<void>((resolve) => {
      markStarted = resolve;
    });
    const gate = new Promise<void>((resolve) => {
      releaseFirst = resolve;
    });
    const first = withCloudProjectionLock({ operation: "held", repositoryRoot: root }, async () => {
      markStarted();
      await gate;
    });
    await started;

    let secondEntered = false;
    await expect(
      withCloudProjectionLock({ operation: "contender", repositoryRoot: root }, () => {
        secondEntered = true;
        return Promise.resolve();
      }),
    ).rejects.toThrow("Another cloud projection operation is already in progress");
    expect(secondEntered).toBe(false);

    releaseFirst();
    await first;
  });

  it("recovers a fully published same-host lock whose owner process is gone", async () => {
    const root = await makeRoot();
    const lockPath = path.join(root, LOCK_RELATIVE);
    await mkdir(path.dirname(lockPath), { recursive: true });
    await writeFile(
      lockPath,
      `${JSON.stringify({
        acquired_at: "2026-07-24T00:00:00.000Z",
        host: hostname(),
        nonce: "abandoned",
        operation: "crashed",
        pid: 99_999_999,
      })}\n`,
      "utf8",
    );

    let entered = false;
    await withCloudProjectionLock({ operation: "recovery", repositoryRoot: root }, () => {
      entered = true;
      return Promise.resolve();
    });

    expect(entered).toBe(true);
    await expect(access(lockPath)).rejects.toMatchObject({ code: "ENOENT" });
    await expect(readdir(path.dirname(lockPath))).resolves.toEqual([]);
  });

  it("serializes competing recovery attempts without splitting the critical section", async () => {
    const root = await makeRoot();
    const lockPath = path.join(root, LOCK_RELATIVE);
    await mkdir(path.dirname(lockPath), { recursive: true });
    await writeFile(
      lockPath,
      `${JSON.stringify({
        acquired_at: "2026-07-24T00:00:00.000Z",
        host: hostname(),
        nonce: "abandoned-race",
        operation: "crashed",
        pid: 99_999_999,
      })}\n`,
      "utf8",
    );
    let active = 0;
    let maxActive = 0;
    let markEntered!: () => void;
    const entered = new Promise<void>((resolve) => {
      markEntered = resolve;
    });
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });
    const contender = (operation: string) =>
      withCloudProjectionLock({ operation, repositoryRoot: root }, async () => {
        active += 1;
        maxActive = Math.max(maxActive, active);
        markEntered();
        await gate;
        active -= 1;
      });

    const attempts = [contender("reaper-a"), contender("reaper-b")];
    const observedAttempts = attempts.map(async (attempt) => {
      try {
        await attempt;
        return "fulfilled";
      } catch {
        return "rejected";
      }
    });
    await entered;
    await expect(Promise.race(observedAttempts)).resolves.toBe("rejected");
    release();
    const results = await Promise.allSettled(attempts);

    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    expect(results.filter((result) => result.status === "rejected")).toHaveLength(1);
    expect(maxActive).toBe(1);
    await withCloudProjectionLock({ operation: "after-recovery", repositoryRoot: root }, () => {
      expect(active).toBe(0);
      return Promise.resolve();
    });
  });

  it("keeps a live lock outside the Git snapshot through the runtime cache ignore", async () => {
    const root = await makeRoot();
    await writeFile(path.join(root, ".gitignore"), ".agentplane/cache\n", "utf8");
    await execFile("git", ["init", "-q"], { cwd: root });
    await execFile("git", ["add", ".gitignore"], { cwd: root });
    await execFile(
      "git",
      [
        "-c",
        "user.name=AgentPlane",
        "-c",
        "user.email=agentplane@example.com",
        "commit",
        "-qm",
        "fixture",
      ],
      {
        cwd: root,
      },
    );

    await withCloudProjectionLock(
      { operation: "git-observation", repositoryRoot: root },
      async () => {
        const { stdout } = await execFile(
          "git",
          ["status", "--porcelain", "--untracked-files=all"],
          {
            cwd: root,
          },
        );
        expect(stdout).toBe("");
      },
    );
  });
});
