import { access, mkdir, mkdtemp, readFile, symlink, utimes, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import {
  createOwnedVitestTempRoot,
  installOwnedVitestTempRoot,
  recoverStaleVitestTempRoots,
  removeTempRoot,
  TEMP_ROOT_CLEANUP_OPTIONS,
  VITEST_TEMP_ROOT_MARKER,
  VITEST_TEMP_ROOT_PREFIX,
  VITEST_TEMP_ROOT_STALE_MS,
} from "./temp-root-cleanup.js";

async function mkOwnedTestDir(): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), "agentplane-temp-root-test-"));
}

async function pathExists(target: string): Promise<boolean> {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function writeMarker(
  root: string,
  ownerPid: number,
  createdAt: Date,
  rootName = path.basename(root),
): Promise<void> {
  await writeFile(
    path.join(root, VITEST_TEMP_ROOT_MARKER),
    `${JSON.stringify({
      schema_version: 1,
      root_name: rootName,
      owner_pid: ownerPid,
      created_at: createdAt.toISOString(),
    })}\n`,
    "utf8",
  );
}

describe("testkit temporary-root cleanup", () => {
  it("uses bounded retries for transient cross-platform filesystem locks", async () => {
    const remover = vi.fn(() => Promise.resolve());

    await removeTempRoot("temporary-root", remover);

    expect(remover).toHaveBeenCalledWith("temporary-root", {
      force: true,
      maxRetries: 5,
      recursive: true,
      retryDelay: 100,
    });
    expect(TEMP_ROOT_CLEANUP_OPTIONS.maxRetries).toBeGreaterThan(0);
  });

  it("installs an owned root and restores the original temp environment during cleanup", async () => {
    const parent = await mkOwnedTestDir();
    const original = {
      TMPDIR: process.env.TMPDIR,
      TMP: process.env.TMP,
      TEMP: process.env.TEMP,
    };

    const cleanup = await installOwnedVitestTempRoot({ parent, recoverStale: false });
    const root = process.env.TMPDIR;
    expect(root).toBeTruthy();
    expect(root).toBe(process.env.TMP);
    expect(root).toBe(process.env.TEMP);
    expect(path.dirname(root!)).toBe(parent);
    expect(path.basename(root!)).toMatch(new RegExp(`^${VITEST_TEMP_ROOT_PREFIX}`));
    expect(
      JSON.parse(await readFile(path.join(root!, VITEST_TEMP_ROOT_MARKER), "utf8")),
    ).toMatchObject({
      schema_version: 1,
      root_name: path.basename(root!),
      owner_pid: process.pid,
    });

    await cleanup();

    expect(await pathExists(root!)).toBe(false);
    expect(process.env.TMPDIR).toBe(original.TMPDIR);
    expect(process.env.TMP).toBe(original.TMP);
    expect(process.env.TEMP).toBe(original.TEMP);
  });

  it("recovers only marked stale roots whose owner is dead", async () => {
    const parent = await mkOwnedTestDir();
    const nowMs = Date.now();
    const oldDate = new Date(nowMs - VITEST_TEMP_ROOT_STALE_MS - 60_000);
    const youngDate = new Date(nowMs - 60_000);

    const stale = await createOwnedVitestTempRoot(parent, oldDate);
    const active = path.join(parent, `${VITEST_TEMP_ROOT_PREFIX}active`);
    const young = path.join(parent, `${VITEST_TEMP_ROOT_PREFIX}young`);
    const unmarked = path.join(parent, `${VITEST_TEMP_ROOT_PREFIX}unmarked`);
    const malformed = path.join(parent, `${VITEST_TEMP_ROOT_PREFIX}malformed`);
    const unrelated = path.join(parent, "unrelated-test-data");
    await Promise.all([active, young, unmarked, malformed, unrelated].map((root) => mkdir(root)));
    await writeMarker(active, 111, oldDate);
    await writeMarker(young, 222, youngDate);
    await writeFile(path.join(malformed, VITEST_TEMP_ROOT_MARKER), "{not-json", "utf8");
    await Promise.all(
      [stale, active, young, unmarked, malformed, unrelated].map((root) =>
        utimes(root, oldDate, oldDate),
      ),
    );

    await recoverStaleVitestTempRoots(parent, {
      nowMs,
      isProcessAlive: (pid) => pid === 111,
    });

    expect(await pathExists(stale)).toBe(false);
    await expect(
      Promise.all(
        [active, young, unmarked, malformed, unrelated].map((target) => pathExists(target)),
      ),
    ).resolves.toEqual([true, true, true, true, true]);
  });

  it("preserves a prefixed symlink even when its target contains a valid stale marker", async () => {
    const parent = await mkOwnedTestDir();
    const outside = await mkOwnedTestDir();
    const oldDate = new Date(Date.now() - VITEST_TEMP_ROOT_STALE_MS - 60_000);
    const link = path.join(parent, `${VITEST_TEMP_ROOT_PREFIX}symlink`);
    await writeMarker(outside, 222, oldDate, path.basename(link));
    await utimes(outside, oldDate, oldDate);
    await symlink(outside, link, process.platform === "win32" ? "junction" : "dir");

    await recoverStaleVitestTempRoots(parent, {
      nowMs: Date.now(),
      isProcessAlive: () => false,
    });

    expect(await pathExists(link)).toBe(true);
    expect(await pathExists(path.join(outside, VITEST_TEMP_ROOT_MARKER))).toBe(true);
  });
});
