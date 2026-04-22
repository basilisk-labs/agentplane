import { access } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import { createRecipeArchive, resetRecipeArchiveCache } from "./recipe-archives.js";

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

describe("recipe archive fixtures", () => {
  it("reuses archives within a test and resets cached temp roots explicitly", async () => {
    const first = await createRecipeArchive();
    const second = await createRecipeArchive();

    expect(second.archivePath).toBe(first.archivePath);
    expect(await pathExists(first.archivePath)).toBe(true);

    await resetRecipeArchiveCache();

    expect(await pathExists(first.archivePath)).toBe(false);

    const next = await createRecipeArchive();
    expect(next.archivePath).not.toBe(first.archivePath);

    await resetRecipeArchiveCache();
  });
});
