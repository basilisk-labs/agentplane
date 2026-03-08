import { describe, expect, it } from "vitest";

import * as preCommitModule from "../../../../scripts/lib/pre-commit-staged-files.mjs";

const { eslintTargets, prettierTargets } = preCommitModule as {
  eslintTargets: (files: string[]) => string[];
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
});
