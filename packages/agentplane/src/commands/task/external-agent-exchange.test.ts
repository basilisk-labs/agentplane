import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveExternalAgentExchangePaths } from "./external-agent-exchange.js";

describe("resolveExternalAgentExchangePaths", () => {
  it("reuses a preobserved common Git directory", async () => {
    const commonGitDir = path.resolve("/repo/.git");
    const fingerprint = `sha256:${"a".repeat(64)}`;

    const paths = await resolveExternalAgentExchangePaths({
      git_root: "/not-a-repository",
      common_git_dir: commonGitDir,
      task_id: "202608040001-EXCHAN",
      transition_id: "tr_0123456789abcdef0123456789abcdef",
      state_fingerprint: fingerprint,
    });

    expect(paths.directory).toBe(
      path.join(
        commonGitDir,
        "agentplane",
        "external-agent",
        "202608040001-EXCHAN",
        "tr_0123456789abcdef0123456789abcdef",
        "a".repeat(64),
      ),
    );
  });
});
