import { describe, expect, it } from "vitest";

import * as localCiSelectionModule from "../../../../scripts/lib/local-ci-selection.mjs";
import * as prePushScopeModule from "../../../../scripts/lib/pre-push-scope.mjs";

type FastCiPlan =
  | { kind: "full-fast"; reason: string; files?: string[] }
  | { kind: "docs-only"; reason: string; files: string[] }
  | {
      kind: "targeted";
      bucket:
        | "task"
        | "doctor"
        | "backend"
        | "hooks"
        | "workflow"
        | "cli-help"
        | "cli-core"
        | "cli-runtime"
        | "release"
        | "upgrade"
        | "guard";
      reason: string;
      files: string[];
      lintTargets: string[];
      testFiles: string[];
      vitestPool: "threads" | "forks";
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

  it("routes isolated backend projection paths to the backend bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/backends/task-backend/redmine-backend.ts",
      "packages/agentplane/src/commands/task/migrate-doc.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("backend");
    expect(plan.reason).toBe("backend_projection_paths_only");
    expect(plan.vitestPool).toBe("forks");
    expect(plan.testFiles).toContain("packages/agentplane/src/backends/task-backend.test.ts");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts",
    );
  });

  it("routes isolated hook and CI routing paths to the hooks bucket", () => {
    const plan = selectFastCiPlan(["scripts/run-local-ci.mjs"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("hooks");
    expect(plan.reason).toBe("hook_and_ci_routing_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.hooks.test.ts");
  });

  it("routes isolated workflow lint and command-contract paths to the workflow bucket", () => {
    const plan = selectFastCiPlan([".github/workflows/ci.yml"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("workflow");
    expect(plan.reason).toBe("workflow_contract_paths_only");
    expect(plan.testFiles).toEqual([]);
  });

  it("routes isolated CLI help and spec paths to the cli-help bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/cli/command-guide.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-help");
    expect(plan.reason).toBe("cli_help_and_spec_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/command-guide.test.ts");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.help-snap.test.ts");
  });

  it("routes isolated run-cli execution paths to the cli-core bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/cli/run-cli/globals.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-core");
    expect(plan.reason).toBe("cli_core_execution_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.boot.test.ts");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli/commands/core.unit.test.ts",
    );
  });

  it("routes isolated runtime freshness and handoff paths to the cli-runtime bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/bin/runtime-context.js"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-runtime");
    expect(plan.reason).toBe("cli_runtime_handoff_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/dist-guard.test.ts");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/repo-local-handoff.test.ts");
  });

  it("keeps residual runtime-sensitive CLI paths on the broad fallback", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts",
    ]);
    expect(plan.kind).toBe("full-fast");
    expect(plan.reason).toBe("broad_or_infra_sensitive_change");
  });

  it("routes isolated release paths to the release bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/commands/release/apply.command.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("release");
    expect(plan.reason).toBe("release_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/commands/release/apply.test.ts");
  });

  it("routes isolated release recovery test paths to the release bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/cli/release-recovery-script.test.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("release");
    expect(plan.reason).toBe("release_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/release-recovery-script.test.ts");
  });

  it("routes isolated upgrade paths to the upgrade bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/commands/upgrade.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("upgrade");
    expect(plan.reason).toBe("upgrade_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/commands/upgrade.merge.test.ts");
  });

  it("routes isolated guard paths to the guard bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/commands/guard/index.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("guard");
    expect(plan.reason).toBe("guard_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.guard.test.ts");
  });

  it("falls back to full fast for broader infra-sensitive changes", () => {
    const plan = selectFastCiPlan(["package.json"]);
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
