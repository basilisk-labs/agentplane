import { describe, expect, it } from "vitest";
import { makeTaskFixture } from "@agentplane/testkit/task";

import { buildGithubPrTitle, validateGithubPrTitleContents } from "./review-template.js";

describe("buildGithubPrTitle", () => {
  it("renders unified PR title format for DOING status", () => {
    const task = makeTaskFixture({
      id: "202602111653-2S7HGD",
      title: "Refactor task message commit",
      status: "DOING",
    });

    expect(buildGithubPrTitle(task)).toBe(
      "🚧 2S7HGD task: Refactor task message commit [202602111653-2S7HGD]",
    );
  });

  it("renders unified PR title format for DONE status", () => {
    const task = makeTaskFixture({
      id: "202602111653-3M4N5P",
      title: "Release readiness",
      status: "DONE",
    });

    expect(buildGithubPrTitle(task)).toBe(
      "✅ 3M4N5P task: Release readiness [202602111653-3M4N5P]",
    );
  });

  it("validates a compliant PR title", () => {
    const errors: string[] = [];
    validateGithubPrTitleContents(
      "🧩 C0M1T0 task: Document PR message governance [202603101200-C0M1T0]",
      "202603101200-C0M1T0",
      errors,
    );
    expect(errors).toEqual([]);
  });

  it("flags invalid PR title format", () => {
    const errors: string[] = [];
    validateGithubPrTitleContents("task: bad title format", "202603101200-C0M1T0", errors);
    expect(errors).toContain("Missing task id in GitHub PR title");
  });

  it("flags PR title with mismatched task id", () => {
    const errors: string[] = [];
    validateGithubPrTitleContents(
      "🧩 C0M1T0 task: Document PR message governance [202603101201-C0M1T1]",
      "202603101200-C0M1T0",
      errors,
    );
    expect(errors).toContain("GitHub PR title task id does not match artifact task id");
  });
});
