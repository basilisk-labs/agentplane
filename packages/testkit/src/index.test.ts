import { describe, expect, it } from "vitest";

import { splitOutputLines } from "./index.js";

describe("@agentplane/testkit", () => {
  it("re-exports CLI helpers from the package root", () => {
    expect(splitOutputLines("a\nb\n")).toEqual(["a", "b"]);
  });
});
