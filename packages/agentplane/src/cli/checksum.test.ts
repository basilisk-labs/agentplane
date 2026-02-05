import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { parseSha256Text, sha256File } from "./checksum.js";

describe("cli/checksum", () => {
  it("sha256File computes a deterministic hash", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "agentplane-hash-test-"));
    const filePath = path.join(tempDir, "file.txt");
    await writeFile(filePath, "data", "utf8");

    const hash = await sha256File(filePath);
    expect(hash).toBe("3a6eb0790f39ac87c94f3856b2dd2c5d110e6811602261a9a923d3bb23adc8b7");

    await rm(tempDir, { recursive: true, force: true });
  });

  it("parseSha256Text returns empty string for blank input", () => {
    expect(parseSha256Text("   ")).toBe("");
  });

  it("parseSha256Text returns first token", () => {
    expect(parseSha256Text("abc123  file.txt")).toBe("abc123");
  });
});
