import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";

import type { PolicyContext } from "../model.js";
import { stagedMutationRequiresTaskRule } from "./task-bound-mutation.js";

function makeDocsContext(stagedPaths: string[]): PolicyContext {
  return {
    action: "guard_commit",
    config: defaultConfig(),
    taskId: "202608012339-30YX9C",
    git: { stagedPaths },
    commit: {
      subject: "docs: update the documentation site",
      taskIntent: {
        taskKind: "docs",
        mutationScope: "docs",
        blueprintRequest: "docs.change",
      },
    },
  };
}

describe("stagedMutationRequiresTaskRule", () => {
  it("allows canonical documentation-site navigation files", () => {
    const result = stagedMutationRequiresTaskRule(
      makeDocsContext(["website/docusaurus.config.ts", "website/sidebars.ts"]),
    );

    expect(result.ok).toBe(true);
  });

  it("still blocks implementation files for a documentation-only task", () => {
    const result = stagedMutationRequiresTaskRule(
      makeDocsContext(["website/src/theme/DocItem/Layout/index.tsx"]),
    );

    expect(result.ok).toBe(false);
    expect(result.errors.map((error) => error.message).join("\n")).toContain(
      "not allowed to commit implementation-mutating paths",
    );
  });
});
