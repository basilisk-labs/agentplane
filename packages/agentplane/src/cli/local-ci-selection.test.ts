import { describe, expect, it } from "vitest";

import * as localCiSelectionModule from "../../../../scripts/lib/local-ci-selection.mjs";
import * as prePushScopeModule from "../../../../scripts/lib/pre-push-scope.mjs";

type FastCiPlan =
  | { kind: "full-fast"; reason: string; files?: string[] }
  | { kind: "docs-only"; reason: string; files: string[] }
  | {
      kind: "targeted";
      bucket: "task" | "doctor";
      reason: string;
      files: string[];
      lintTargets: string[];
      testFiles: string[];
    };

type PrePushUpdate = {
  localRef: string;
  localSha: string;
  remoteRef: string;
  remoteSha: string;
};

const { parseChangedFilesEnv, selectFastCiPlan, shouldRunCliDocsCheck } =
  localCiSelectionModule as {
    parseChangedFilesEnv: (rawValue: unknown) => string[];
    selectFastCiPlan: (changedFiles: string[]) => FastCiPlan;
    shouldRunCliDocsCheck: (changedFiles: string[]) => boolean;
  };

const { hasReleaseTagPush, parsePrePushStdin, selectBranchDiffRange } = prePushScopeModule as {
  hasReleaseTagPush: (updates: PrePushUpdate[]) => boolean;
  parsePrePushStdin: (rawStdin: unknown) => PrePushUpdate[];
  selectBranchDiffRange: (updates: PrePushUpdate[]) => { from: string; to: string } | null;
};

describe("local CI fast selection", () => {
  it("treats docs and policy changes as docs-only", () => {
    const plan = selectFastCiPlan(["docs/user/setup.mdx", ".agentplane/policy/workflow.direct.md"]);
    expect(plan.kind).toBe("docs-only");
    expect(plan.reason).toBe("docs_policy_website_only");
  });

  it("routes isolated task command paths to the task bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/commands/task/shared.ts",
      "packages/agentplane/src/commands/task/finish.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("task");
    expect(plan.testFiles).toContain("packages/agentplane/src/commands/task/finish.unit.test.ts");
  });

  it("routes isolated doctor paths to the doctor bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/commands/doctor.run.ts",
      "packages/agentplane/src/commands/doctor/archive.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("doctor");
  });

  it("falls back to full fast for infra-sensitive changes", () => {
    const plan = selectFastCiPlan(["scripts/run-local-ci.mjs"]);
    expect(plan.kind).toBe("full-fast");
    expect(plan.reason).toBe("broad_or_infra_sensitive_change");
  });

  it("parses newline-delimited changed files from env", () => {
    expect(parseChangedFilesEnv("docs/a.mdx\n\nwebsite/b.tsx\n")).toEqual([
      "docs/a.mdx",
      "website/b.tsx",
    ]);
  });

  it("skips CLI docs freshness for non-CLI buckets", () => {
    expect(shouldRunCliDocsCheck(["packages/agentplane/src/commands/doctor.run.ts"])).toBe(false);
    expect(shouldRunCliDocsCheck(["docs/help/troubleshooting.mdx"])).toBe(false);
  });

  it("keeps CLI docs freshness for CLI/help surfaces and no-scope runs", () => {
    expect(shouldRunCliDocsCheck([])).toBe(true);
    expect(shouldRunCliDocsCheck(["packages/agentplane/src/cli/run-cli.ts"])).toBe(true);
    expect(shouldRunCliDocsCheck(["docs/user/cli-reference.generated.mdx"])).toBe(true);
  });
});

describe("pre-push scope selection", () => {
  it("detects release tag pushes", () => {
    const updates = parsePrePushStdin(
      "refs/heads/main abc refs/heads/main def\nrefs/tags/v0.3.3 abc refs/tags/v0.3.3 def\n",
    );
    expect(hasReleaseTagPush(updates)).toBe(true);
  });

  it("selects a diff range for a single branch update", () => {
    const updates = parsePrePushStdin("refs/heads/main aaa refs/heads/main bbb\n");
    expect(selectBranchDiffRange(updates)).toEqual({ from: "bbb", to: "aaa" });
  });

  it("does not select a diff range for new branch pushes", () => {
    const updates = parsePrePushStdin(
      "refs/heads/feature abc refs/heads/feature 0000000000000000000000000000000000000000\n",
    );
    expect(selectBranchDiffRange(updates)).toBeNull();
  });
});
