import { access } from "node:fs/promises";
import { describe, expect, it, onTestFinished } from "vitest";

import { mkTempDir, splitOutputLines, waitForCondition } from "./index.js";

describe("@agentplane/testkit", () => {
  it("re-exports CLI helpers from the package root", () => {
    expect(splitOutputLines("a\nb\n")).toEqual(["a", "b"]);
  });

  it("re-exports deterministic wait helpers from the package root", async () => {
    let calls = 0;

    const value = await waitForCondition({
      description: "counter to reach two",
      timeoutMs: 100,
      pollMs: 1,
      read: () => {
        calls += 1;
        return Promise.resolve(calls);
      },
      predicate: (count) => count >= 2,
    });

    expect(value).toBe(2);
  });

  it("cleans helper-owned roots without opt-in lifecycle registration", async () => {
    const root = await mkTempDir();
    await expect(access(root)).resolves.toBeUndefined();

    onTestFinished(async () => {
      await expect(access(root)).rejects.toMatchObject({ code: "ENOENT" });
    });
  });
});
