import { describe, expect, it } from "vitest";

import type { WorkflowRouteStateInput } from "./workflow-step-fingerprint.js";
import { observeWorkflowPolicyScope } from "./workflow-step-policy-scope.js";

describe("workflow policy scope", () => {
  it("reuses dirty paths from the authoritative Git snapshot", async () => {
    const state = {
      workflowMode: "direct",
      task: {
        id: "202608040031-POLICY",
        status: "TODO",
        extensions: {},
      },
      resume: {},
      taskWorktree: null,
      prFlow: null,
    } as WorkflowRouteStateInput;

    await expect(
      observeWorkflowPolicyScope({
        repositoryRoot: "/path/that/is/not/a/repository",
        state,
        preobservedDirtyPaths: ["docs/guide.md", "./docs/guide.md"],
      }),
    ).resolves.toEqual({
      state: "present",
      changedPaths: ["docs/guide.md"],
      sources: ["working_tree"],
    });
  });
});
