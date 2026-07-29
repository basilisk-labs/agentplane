import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { measureDuplicateExecutorContextBytes } from "./direct-task-supervision-measurement.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map(async (dir) => await rm(dir, { recursive: true })),
  );
});

describe("duplicate executor context measurement", () => {
  it("counts only repeated JSON string leaves at or above the baseline threshold", async () => {
    const dir = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-measurement-"));
    temporaryDirectories.push(dir);
    const bundlePath = path.join(dir, "bundle.json");
    const repeated = "The direct executor receives this context once.";
    await writeFile(
      bundlePath,
      `${JSON.stringify({ prompt: repeated, nested: { copied_prompt: repeated }, short: ["tiny", "tiny"] })}\n`,
      "utf8",
    );

    await expect(measureDuplicateExecutorContextBytes(bundlePath)).resolves.toBe(
      Buffer.byteLength(repeated, "utf8"),
    );
  });

  it("fails closed when the bundle cannot be read", async () => {
    await expect(measureDuplicateExecutorContextBytes("/missing/bundle.json")).resolves.toBeNull();
  });
});
