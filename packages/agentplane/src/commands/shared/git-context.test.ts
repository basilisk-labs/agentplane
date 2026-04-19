import { describe, expect, it } from "vitest";

import { GitContext as CoreGitContext } from "@agentplaneorg/core";

import { GitContext } from "./git-context.js";

describe("commands/shared/git-context", () => {
  it("re-exports the canonical core GitContext", () => {
    expect(GitContext).toBe(CoreGitContext);
  });
});
