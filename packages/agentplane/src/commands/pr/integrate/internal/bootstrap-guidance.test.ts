import { describe, expect, it } from "vitest";

import {
  renderPostIntegrateBootstrapGuidance,
  shouldRecommendPostIntegrateBootstrap,
} from "./bootstrap-guidance.js";

describe("pr/integrate/internal/bootstrap-guidance", () => {
  it("recommends bootstrap when watched runtime sources changed", () => {
    expect(
      shouldRecommendPostIntegrateBootstrap(["packages/agentplane/src/cli.ts", "docs/readme.md"]),
    ).toBe(true);
    expect(
      shouldRecommendPostIntegrateBootstrap(["packages/agentplane/bin/stale-dist-policy.js"]),
    ).toBe(true);
    expect(shouldRecommendPostIntegrateBootstrap(["packages/core/src/runtime.ts"])).toBe(true);
  });

  it("ignores non-runtime changes and test-only source churn", () => {
    expect(
      shouldRecommendPostIntegrateBootstrap([
        "packages/agentplane/src/cli.test.ts",
        "docs/readme.md",
      ]),
    ).toBe(false);
    expect(
      shouldRecommendPostIntegrateBootstrap(["packages/agentplane/tests/integration.test.ts"]),
    ).toBe(false);
  });

  it("renders explicit bootstrap guidance", () => {
    expect(renderPostIntegrateBootstrapGuidance()).toContain("bun run framework:dev:bootstrap");
    expect(renderPostIntegrateBootstrapGuidance()).toContain("repo-local build stays current");
  });
});
