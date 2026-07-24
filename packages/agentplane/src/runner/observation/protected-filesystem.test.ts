import { execFile as execSystemFileCallback } from "node:child_process";
import type { PathLike } from "node:fs";
import {
  lstat,
  mkdir,
  mkdtemp,
  rename,
  rm,
  symlink,
  truncate,
  unlink,
  utimes,
  writeFile,
} from "node:fs/promises";
import type * as NodeFsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it, vi } from "vitest";

const filesystemRaceHooks = vi.hoisted(() => ({
  beforeOpen: null as ((filePath: string) => Promise<void>) | null,
  afterReaddir: null as ((directoryPath: string) => Promise<void>) | null,
}));

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof NodeFsPromises>();
  return {
    ...actual,
    open: async (filePath: PathLike, flags: string | number, mode?: number) => {
      const hook = filesystemRaceHooks.beforeOpen;
      filesystemRaceHooks.beforeOpen = null;
      if (hook) await hook(String(filePath));
      return actual.open(filePath, flags, mode);
    },
    readdir: async (directoryPath: PathLike) => {
      const children = await actual.readdir(directoryPath);
      const hook = filesystemRaceHooks.afterReaddir;
      if (hook) await hook(String(directoryPath));
      return children;
    },
  };
});

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";

import {
  captureProtectedFilesystemSnapshot,
  compareProtectedFilesystemSnapshots,
} from "./protected-filesystem.js";

const tempRoots: string[] = [];
const execSystemFile = promisify(execSystemFileCallback);

afterEach(async () => {
  filesystemRaceHooks.beforeOpen = null;
  filesystemRaceHooks.afterReaddir = null;
  await Promise.all(tempRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

async function writeRepoFile(root: string, relativePath: string, contents: string): Promise<void> {
  const absolutePath = path.join(root, ...relativePath.split("/"));
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, contents, "utf8");
}

async function createRepository(): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-protected-filesystem-"));
  tempRoots.push(root);
  await execFileAsync("git", ["init", "-q", "-b", "main"], { cwd: root, env: gitEnv() });
  await writeRepoFile(root, ".gitignore", "protected/ignored/\n");
  await writeRepoFile(root, "protected/config.txt", "base\n");
  await mkdir(path.join(root, "protected", "existing-empty"), { recursive: true });
  await execFileAsync("git", ["add", "--", ".gitignore", "protected/config.txt"], {
    cwd: root,
    env: gitEnv(),
  });
  return root;
}

function expectSha256(value: string | null): void {
  expect(value).toMatch(/^sha256:[0-9a-f]{64}$/u);
}

describe("protected filesystem observation", () => {
  it("captures a large full tree from metadata without consuming the content-byte budget", async () => {
    const root = await createRepository();
    const largePath = path.join(root, "large.bin");
    await writeFile(largePath, "", "utf8");
    await truncate(largePath, 32 * 1024 * 1024);

    const snapshot = await captureProtectedFilesystemSnapshot({
      repository_root: root,
      protected_prefixes: ["."],
      capture_mode: "metadata_only",
      excluded_roots: [path.join(root, ".git")],
      limits: { max_bytes: 0 },
    });
    const largeEntry = snapshot.entries.find((entry) => entry.path === "large.bin");

    expect(snapshot.state, JSON.stringify(snapshot.errors)).toBe("available");
    expect(snapshot.capture_mode).toBe("metadata_only");
    expect(largeEntry).toMatchObject({
      kind: "file",
      size_bytes: 32 * 1024 * 1024,
      sha256: null,
    });
    expectSha256(largeEntry?.metadata_sha256 ?? null);
  });

  it.skipIf(process.platform === "win32")(
    "detects a same-size replacement with restored mtime through stable metadata identity",
    async () => {
      const root = await createRepository();
      const watchedPath = path.join(root, "watched.txt");
      const replacementPath = path.join(root, "replacement.txt");
      const fixedTime = new Date("2026-01-02T03:04:05.000Z");
      await writeFile(watchedPath, "before\n", "utf8");
      await utimes(watchedPath, fixedTime, fixedTime);
      const originalStats = await lstat(watchedPath, { bigint: true });
      const before = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["watched.txt"],
        capture_mode: "metadata_only",
      });

      await writeFile(replacementPath, "after!\n", "utf8");
      await utimes(replacementPath, fixedTime, fixedTime);
      await rename(replacementPath, watchedPath);
      const replacementStats = await lstat(watchedPath, { bigint: true });
      const after = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["watched.txt"],
        capture_mode: "metadata_only",
      });
      const delta = compareProtectedFilesystemSnapshots({
        repository_root: root,
        before,
        after,
      });

      expect(replacementStats.size).toBe(originalStats.size);
      expect(replacementStats.mtimeNs).toBe(originalStats.mtimeNs);
      expect(replacementStats.ino).not.toBe(originalStats.ino);
      expect(delta.state, JSON.stringify(delta.errors)).toBe("available");
      expect(delta.changed_paths).toEqual(["watched.txt"]);
      expect(before.entries[0]?.sha256).toBeNull();
      expect(after.entries[0]?.sha256).toBeNull();
      expect(after.entries[0]?.metadata_sha256).not.toBe(before.entries[0]?.metadata_sha256);
    },
  );

  it("detects ignored writes and empty directories while excluding supervisor roots", async () => {
    const root = await createRepository();
    const runDir = path.join(root, "protected", "runs", "R-1");
    await mkdir(path.dirname(runDir), { recursive: true });
    const captureInput = {
      repository_root: root,
      protected_prefixes: ["protected", "protected/ignored"],
      excluded_roots: [runDir],
    } as const;
    const before = await captureProtectedFilesystemSnapshot(captureInput);
    const repeatedBefore = await captureProtectedFilesystemSnapshot(captureInput);

    expect(before.state, JSON.stringify(before.errors)).toBe("available");
    expect(before.snapshot_sha256).toBe(repeatedBefore.snapshot_sha256);
    expect(before.protected_prefixes).toEqual(["protected"]);
    expect(before.excluded_paths).toEqual(["protected/runs/R-1"]);
    expect(before.entries.map((entry) => entry.path)).toContain("protected/existing-empty");

    await writeRepoFile(root, "protected/config.txt", "changed\n");
    await writeRepoFile(root, "protected/ignored/secret.txt", "unreported\n");
    await mkdir(path.join(root, "protected", "new-empty"), { recursive: true });
    await rm(path.join(root, "protected", "existing-empty"), { recursive: true });
    await writeRepoFile(root, "protected/runs/R-1/trace.jsonl", "{}\n");

    const { stdout: gitStatus } = await execFileAsync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all"],
      { cwd: root, env: gitEnv() },
    );
    expect(String(gitStatus)).not.toContain("protected/ignored/secret.txt");

    const after = await captureProtectedFilesystemSnapshot(captureInput);
    const repeatedAfter = await captureProtectedFilesystemSnapshot(captureInput);
    const delta = compareProtectedFilesystemSnapshots({
      repository_root: root,
      before,
      after,
    });
    const repeatedDelta = compareProtectedFilesystemSnapshots({
      repository_root: root,
      before,
      after: repeatedAfter,
    });

    expect(after.state, JSON.stringify(after.errors)).toBe("available");
    expect(after.snapshot_sha256).toBe(repeatedAfter.snapshot_sha256);
    expect(delta.state, JSON.stringify(delta.errors)).toBe("available");
    expect(delta.changed_paths).toEqual([
      "protected/config.txt",
      "protected/existing-empty",
      "protected/ignored",
      "protected/ignored/secret.txt",
      "protected/new-empty",
    ]);
    expect(delta.changed_paths).not.toContain("protected/runs/R-1/trace.jsonl");
    expect(delta.sha256).toBe(repeatedDelta.sha256);
    expectSha256(delta.sha256);
  });

  it.skipIf(process.platform === "win32")(
    "fingerprints symlinks without following their targets",
    async () => {
      const root = await createRepository();
      await writeRepoFile(root, "outside-a/value.txt", "a\n");
      await writeRepoFile(root, "outside-b/value.txt", "b\n");
      const linkPath = path.join(root, "protected", "external-link");
      await symlink("../outside-a", linkPath, "dir");

      const before = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
      });
      await writeRepoFile(root, "outside-a/value.txt", "changed outside\n");
      const targetOnlyAfter = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
      });
      const targetOnlyDelta = compareProtectedFilesystemSnapshots({
        repository_root: root,
        before,
        after: targetOnlyAfter,
      });

      expect(targetOnlyDelta.state).toBe("available");
      expect(targetOnlyDelta.changed_paths).toEqual([]);
      expect(targetOnlyAfter.entries.some((entry) => entry.path.includes("value.txt"))).toBe(false);

      await unlink(linkPath);
      await symlink("../outside-b", linkPath, "dir");
      const linkAfter = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
      });
      const linkDelta = compareProtectedFilesystemSnapshots({
        repository_root: root,
        before,
        after: linkAfter,
      });

      expect(linkDelta.changed_paths).toEqual(["protected/external-link"]);
      expect(
        linkAfter.entries.find((entry) => entry.path === "protected/external-link"),
      ).toMatchObject({
        kind: "symlink",
        symlink_target: "../outside-b",
      });
    },
  );

  it.skipIf(process.platform === "win32")(
    "fails closed when a regular file is replaced by a symlink before open",
    async () => {
      const root = await createRepository();
      await writeRepoFile(root, "outside/value.txt", "must not be hashed\n");
      const filePath = path.join(root, "protected", "config.txt");
      filesystemRaceHooks.beforeOpen = async (observedPath) => {
        if (observedPath !== filePath) return;
        await unlink(filePath);
        await symlink("../outside/value.txt", filePath, "file");
      };

      const snapshot = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
      });

      expect(snapshot.state).toBe("unavailable");
      expect(
        snapshot.errors.some(
          (error) =>
            error.operation === "read_file" &&
            error.path === "protected/config.txt" &&
            (error.code === "ELOOP" ||
              error.code === "AP_PROTECTED_FS_ENTRY_CHANGED" ||
              error.code === "AP_PROTECTED_FS_IDENTITY_CHANGED"),
        ),
      ).toBe(true);
      expect(snapshot.entries.some((entry) => entry.path === "protected/config.txt")).toBe(false);
      expect(snapshot.entries.some((entry) => entry.path.includes("outside/value.txt"))).toBe(
        false,
      );
    },
  );

  it.skipIf(process.platform === "win32")(
    "fails closed without blocking when a regular file is replaced by a FIFO before open",
    async () => {
      const root = await createRepository();
      const filePath = path.join(root, "protected", "config.txt");
      filesystemRaceHooks.beforeOpen = async (observedPath) => {
        if (observedPath !== filePath) return;
        await unlink(filePath);
        await execSystemFile("/usr/bin/mkfifo", [filePath], { cwd: root });
      };

      const snapshot = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
      });

      expect(snapshot.state).toBe("unavailable");
      expect(snapshot.errors).toContainEqual(
        expect.objectContaining({
          operation: "read_file",
          path: "protected/config.txt",
          code: "AP_PROTECTED_FS_NOT_REGULAR_FILE",
        }),
      );
      expect(snapshot.entries.some((entry) => entry.path === "protected/config.txt")).toBe(false);
    },
    2000,
  );

  it.skipIf(process.platform === "win32")(
    "fails closed when a directory is replaced by a symlink after readdir",
    async () => {
      const root = await createRepository();
      await writeRepoFile(root, "outside/value.txt", "must not be traversed\n");
      const directoryPath = path.join(root, "protected", "existing-empty");
      filesystemRaceHooks.afterReaddir = async (observedPath) => {
        if (observedPath !== directoryPath) return;
        filesystemRaceHooks.afterReaddir = null;
        await rm(directoryPath, { recursive: true });
        await symlink("../../outside", directoryPath, "dir");
      };

      const snapshot = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
      });

      expect(snapshot.state).toBe("unavailable");
      expect(snapshot.errors).toContainEqual(
        expect.objectContaining({
          operation: "read_directory",
          path: "protected/existing-empty",
          code: "AP_PROTECTED_FS_NOT_DIRECTORY",
        }),
      );
      expect(
        snapshot.entries.some((entry) => entry.path.includes("existing-empty/value.txt")),
      ).toBe(false);
    },
  );

  it.each([
    {
      limits: { max_entries: 0 },
      code: "AP_PROTECTED_FS_MAX_ENTRIES",
    },
    {
      limits: { max_bytes: 0 },
      code: "AP_PROTECTED_FS_MAX_BYTES",
    },
    {
      limits: { timeout_ms: 0 },
      code: "AP_PROTECTED_FS_TIMEOUT",
    },
  ] as const)(
    "returns typed unavailable evidence when $code is exceeded",
    async ({ limits, code }) => {
      const root = await createRepository();
      const snapshot = await captureProtectedFilesystemSnapshot({
        repository_root: root,
        protected_prefixes: ["protected"],
        limits,
      });

      expect(snapshot.state).toBe("unavailable");
      expect(snapshot.snapshot_sha256).toBeNull();
      expect(snapshot.errors).toContainEqual(
        expect.objectContaining({
          operation: "budget",
          code,
        }),
      );
    },
  );

  it("returns typed unavailable evidence instead of throwing on unsafe input and IO errors", async () => {
    const root = await createRepository();
    const unsafe = await captureProtectedFilesystemSnapshot({
      repository_root: root,
      protected_prefixes: ["../outside"],
    });
    const missingRoot = await captureProtectedFilesystemSnapshot({
      repository_root: path.join(root, "missing-repository"),
      protected_prefixes: ["protected"],
    });
    const delta = compareProtectedFilesystemSnapshots({
      repository_root: root,
      before: unsafe,
      after: unsafe,
    });

    expect(unsafe).toMatchObject({
      state: "unavailable",
      snapshot_sha256: null,
      errors: [{ source: "capture", operation: "input", code: null }],
    });
    expect(missingRoot).toMatchObject({
      state: "unavailable",
      snapshot_sha256: null,
      errors: [{ source: "capture", operation: "repository_root", code: "ENOENT" }],
    });
    expect(delta.state).toBe("unavailable");
    expect(delta.changed_paths).toEqual([]);
    expect(delta.sha256).toBeNull();
    expect(delta.errors.some((error) => error.operation === "snapshot_unavailable")).toBe(true);
  });
});
