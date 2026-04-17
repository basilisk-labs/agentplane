import { describe, expect, it } from "vitest";

import { cleanGitEnv, splitOutputLines } from "./cli.js";

describe("@agentplane/testkit/cli", () => {
  it("exports CLI harness helpers", () => {
    expect(cleanGitEnv).toBeTypeOf("function");
    expect(splitOutputLines("a\nb\n")).toEqual(["a", "b"]);
  });
});
