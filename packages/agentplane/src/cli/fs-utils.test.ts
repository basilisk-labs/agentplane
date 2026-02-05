import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

import { backupPath, fileExists } from "./fs-utils.js";

describe("cli/fs-utils", () => {
  it("backupPath renames file with timestamp suffix", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-fs-utils-"));
    const filePath = path.join(root, "data.txt");
    await writeFile(filePath, "hello", "utf8");

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-05T15:00:00.000Z"));
    try {
      const dest = await backupPath(filePath);
      const stamp = "2026-02-05T150000000Z";
      expect(dest).toBe(`${filePath}.bak-${stamp}`);
      expect(await fileExists(dest)).toBe(true);
      expect(await fileExists(filePath)).toBe(false);
    } finally {
      vi.useRealTimers();
    }
  });

  it("backupPath appends a random suffix when backup already exists", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-fs-utils-"));
    const filePath = path.join(root, "data.txt");
    await writeFile(filePath, "hello", "utf8");

    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-05T15:00:00.000Z"));
    const stamp = "2026-02-05T150000000Z";
    const existing = `${filePath}.bak-${stamp}`;
    await writeFile(existing, "existing", "utf8");

    const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.123_456);
    try {
      const dest = await backupPath(filePath);
      expect(dest).toMatch(new RegExp(String.raw`^${filePath}\.bak-${stamp}-`));
      expect(dest).not.toBe(existing);
      expect(await fileExists(dest)).toBe(true);
      expect(await fileExists(filePath)).toBe(false);
    } finally {
      randomSpy.mockRestore();
      vi.useRealTimers();
    }
  });
});
