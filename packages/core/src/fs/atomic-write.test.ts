import { chmod, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import type * as NodeCrypto from "node:crypto";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const cryptoMock = vi.hoisted(() => ({
  nextHex: null as string | null,
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

import { atomicWriteFile } from "./atomic-write.js";

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-atomic-write-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  cryptoMock.nextHex = null;
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

  it("keeps temp paths unique across concurrent writes in one process", async () => {
    const dir = await makeTempDir();
    const target = path.join(dir, "concurrent.txt");

    await expect(
      Promise.all([atomicWriteFile(target, "first\n"), atomicWriteFile(target, "second\n")]),
    ).resolves.toBeDefined();

    const contents = await readFile(target, "utf8");
    expect(["first\n", "second\n"]).toContain(contents);
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
