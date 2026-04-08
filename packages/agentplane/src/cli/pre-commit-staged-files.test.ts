import { describe, expect, it } from "vitest";

import * as preCommitModule from "../../../../scripts/lib/pre-commit-staged-files.mjs";

const { eslintTargets, policyMirrorOnlyTargets, prettierTargets } = preCommitModule as {
  eslintTargets: (files: string[]) => string[];
  policyMirrorOnlyTargets: (files: string[]) => string[];
  prettierTargets: (files: string[]) => string[];
};

describe("pre-commit staged file selection", () => {
  it("keeps declaration files for prettier", () => {
    expect(prettierTargets(["types/runtime.d.ts", "README.md"])).toEqual([
      "types/runtime.d.ts",
      "README.md",
    ]);
  });

  it("excludes declaration files from eslint targets", () => {
    expect(
      eslintTargets(["types/runtime.d.ts", "packages/agentplane/src/cli/run-cli.ts", "README.md"]),
    ).toEqual(["packages/agentplane/src/cli/run-cli.ts"]);
  });

  it("keeps ordinary lintable source files in eslint targets", () => {
    expect(eslintTargets(["scripts/run-local-ci.mjs", "website/src/theme/Root.tsx"])).toEqual([
      "scripts/run-local-ci.mjs",
      "website/src/theme/Root.tsx",
    ]);
  });

  it("flags policy mirror edits that are missing a staged canonical asset twin", () => {
    expect(
      policyMirrorOnlyTargets([".agentplane/policy/workflow.branch_pr.md", "README.md"]),
    ).toEqual([".agentplane/policy/workflow.branch_pr.md"]);
  });

  it("allows policy mirror edits when the matching canonical asset is staged too", () => {
    expect(
      policyMirrorOnlyTargets([
        ".agentplane/policy/workflow.branch_pr.md",
        "packages/agentplane/assets/policy/workflow.branch_pr.md",
      ]),
    ).toEqual([]);
  });
});
