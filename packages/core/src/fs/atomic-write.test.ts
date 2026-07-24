import { chmod, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import type * as NodeCrypto from "node:crypto";
import type * as NodeFsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const cryptoMock = vi.hoisted(() => ({
  nextHex: null as string | null,
}));

type RenameHook = (
  source: string,
  destination: string,
  publish: () => Promise<void>,
) => Promise<void>;

const fsMock = vi.hoisted(() => ({
  onRename: null as RenameHook | null,
}));

vi.mock("node:crypto", async (importOriginal) => {
  const actual = await importOriginal<typeof NodeCrypto>();
  return {
    ...actual,
    randomBytes: (size: number) => {
      const fixed = cryptoMock.nextHex;
      cryptoMock.nextHex = null;
      return fixed === null ? actual.randomBytes(size) : Buffer.from(fixed, "hex");
    },
  };
});

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof NodeFsPromises>();
  return {
    ...actual,
    rename: async (source: string, destination: string) => {
      const hook = fsMock.onRename;
      if (hook === null) {
        return actual.rename(source, destination);
      }
      return hook(source, destination, () => actual.rename(source, destination));
    },
  };
});

import { atomicWriteFile } from "./atomic-write.js";

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-atomic-write-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  cryptoMock.nextHex = null;
  fsMock.onRename = null;
  while (tempDirs.length > 0) {
    const dir = tempDirs.pop();
    if (!dir) continue;
    await rm(dir, { recursive: true, force: true });
  }
});

describe("atomicWriteFile", () => {
  it("writes the file contents via temp rename", async () => {
    const dir = await makeTempDir();
    const target = path.join(dir, "output.json");
    await atomicWriteFile(target, '{\n  "ok": true\n}\n');
    const contents = await readFile(target, "utf8");
    expect(contents).toContain('"ok": true');
  });

  it("does not corrupt an existing file if the atomic write fails before rename", async () => {
    const dir = await makeTempDir();
    const target = path.join(dir, "config.json");
    await writeFile(target, "old\n", "utf8");

    await chmod(dir, 0o555);
    try {
      await expect(atomicWriteFile(target, "new\n", "utf8")).rejects.toBeTruthy();
    } finally {
      // Ensure cleanup works even if the test fails mid-way.
      await chmod(dir, 0o755);
    }

    const contents = await readFile(target, "utf8");
    expect(contents).toBe("old\n");
  });

  it("uses the last published value when a later writer replaces the target", async () => {
    const dir = await makeTempDir();
    const target = path.join(dir, "concurrent.txt");
    let resolveFirstPublished: (() => void) | undefined;
    const firstPublished = new Promise<void>((resolve) => {
      resolveFirstPublished = resolve;
    });
    let releaseFirstWriter: (() => void) | undefined;
    const firstWriterMayReturn = new Promise<void>((resolve) => {
      releaseFirstWriter = resolve;
    });
    let publicationCount = 0;
    fsMock.onRename = async (_source, _destination, publish) => {
      publicationCount += 1;
      if (publicationCount === 1) {
        await publish();
        resolveFirstPublished?.();
        await firstWriterMayReturn;
        return;
      }
      try {
        await publish();
      } finally {
        releaseFirstWriter?.();
      }
    };

    const firstWrite = atomicWriteFile(target, "first\n");
    await firstPublished;
    const secondWrite = atomicWriteFile(target, "second\n");
    await expect(Promise.all([firstWrite, secondWrite])).resolves.toBeDefined();

    const contents = await readFile(target, "utf8");
    expect(publicationCount).toBe(2);
    expect(contents).toBe("second\n");
  });

  it.skipIf(process.platform === "win32")(
    "does not follow a pre-planted temp-file symlink",
    async () => {
      const dir = await makeTempDir();
      const target = path.join(dir, "secure.json");
      const victim = path.join(dir, "victim.txt");
      await writeFile(victim, "sentinel\n", "utf8");
      const fixedHex = "ab".repeat(16);
      cryptoMock.nextHex = fixedHex;
      await symlink(victim, `${target}.tmp-${fixedHex}`, "file");

      await atomicWriteFile(target, "safe\n", "utf8");

      expect(await readFile(target, "utf8")).toBe("safe\n");
      expect(await readFile(victim, "utf8")).toBe("sentinel\n");
    },
  );
});
