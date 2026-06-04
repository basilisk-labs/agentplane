import { describe, expect, it } from "vitest";

import { assessPrArtifactFreshness } from "./freshness.js";

describe("PR artifact freshness", () => {
  it("treats missing meta head as live-head artifacts instead of stale", async () => {
    const freshness = await assessPrArtifactFreshness({
      gitRoot: "/repo",
      workflowDir: ".agentplane/tasks",
      taskId: "202606042157-020DWK",
      branchHeadSha: "abc123",
      metaHeadSha: null,
      metaLastVerifiedSha: null,
      metaDiffstatDigest: null,
      metaLastVerifiedDiffstatDigest: null,
      currentDiffstatDigest: null,
      metaVerifyStatus: "pass",
      taskVerificationState: "ok",
      verifyLogText: null,
      requiresVerify: false,
    });

    expect(freshness.reviewFresh).toBe(true);
  });
});
