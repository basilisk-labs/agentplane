import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { backupPath, fileExists } from "./fs-utils.js";

const REGEXP_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;

function escapeRegExp(value: string): string {
  return value.replaceAll(REGEXP_SPECIAL_CHARS, String.raw`\$&`);
}

describe("cli/fs-utils", () => {
  it("backupPath renames file with timestamp suffix", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-fs-utils-"));
    const filePath = path.join(root, "data.txt");
    await writeFile(filePath, "hello", "utf8");

    const escapedPath = escapeRegExp(filePath);

    const dest = await backupPath(filePath);
    expect(dest).toMatch(new RegExp(String.raw`^${escapedPath}\.bak-\d{4}-\d{2}-\d{2}T\d+Z$`));
    expect(await fileExists(dest)).toBe(true);
    expect(await fileExists(filePath)).toBe(false);
  });

  it("backupPath appends a random suffix when backup already exists", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-fs-utils-"));
    const filePath = path.join(root, "data.txt");
    await writeFile(filePath, "hello", "utf8");

    const originalDateToISOString = vi
      .spyOn(Date.prototype, "toISOString")
      .mockReturnValue("2026-05-12T00:00:00.000Z");
    const original = await backupPath(filePath);
    expect(await fileExists(original)).toBe(true);
    await writeFile(filePath, "second", "utf8");

    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.123_456);
    try {
      const dest = await backupPath(filePath);
      expect(dest).toMatch(new RegExp(String.raw`^${escapeRegExp(original)}-[a-z0-9]{6}$`));
      expect(dest).not.toBe(original);
      expect(await fileExists(dest)).toBe(true);
      expect(await fileExists(filePath)).toBe(false);
    } finally {
      randomSpy.mockRestore();
      originalDateToISOString.mockRestore();
    }
  });
});
