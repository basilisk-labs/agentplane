import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { atomicWriteFile } from "./atomic-write.js";

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-atomic-write-"));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
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
});
