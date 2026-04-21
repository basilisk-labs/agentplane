import { describe, expect, it } from "vitest";
import { GitContext as CoreGitContext, GitContext } from "@agentplaneorg/core/git";

describe("commands/shared/git-context", () => {
  it("re-exports the canonical core GitContext", () => {
    expect(GitContext).toBe(CoreGitContext);
  });
});
