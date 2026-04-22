import { describe, expect, it } from "vitest";

import { splitOutputLines, waitForCondition } from "./index.js";

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
});
