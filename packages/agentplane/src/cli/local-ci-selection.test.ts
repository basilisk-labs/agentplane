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
        | "pr"
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

const {
  hasReleaseTagPush,
  isDeleteOnlyPush,
  parsePrePushStdin,
  readChangedFilesForRange,
  selectBranchDiffRange,
} = prePushScopeModule as {
  hasReleaseTagPush: (updates: PrePushUpdate[]) => boolean;
  isDeleteOnlyPush: (updates: PrePushUpdate[]) => boolean;
  parsePrePushStdin: (rawStdin: unknown) => PrePushUpdate[];
  readChangedFilesForRange: (range: { from: string; to: string } | null) => string[];
  selectBranchDiffRange: (
    updates: PrePushUpdate[],
    opts?: { newBranchFallbackRef?: string | null },
  ) => { from: string; to: string } | null;
};

describe("local CI fast selection", () => {
  it("treats docs and policy changes as docs-only", () => {
    const plan = selectFastCiPlan(["docs/user/setup.mdx", ".agentplane/policy/workflow.direct.md"]);
    expect(plan.kind).toBe("docs-only");
    expect(plan.reason).toBe("docs_policy_website_only");
  });

  it("treats isolated task artifacts as docs-only", () => {
    const plan = selectFastCiPlan([
      ".agentplane/tasks/202604070443-T8F4ZZ/README.md",
      ".agentplane/tasks/202604070443-T8F4ZZ/pr/meta.json",
    ]);
    expect(plan.kind).toBe("docs-only");
    expect(plan.reason).toBe("docs_policy_website_only");
  });

  it("treats task artifact-only staged changes as docs-only", () => {
    const plan = selectFastCiPlan([
      ".agentplane/tasks/202604070443-T8F4ZZ/README.md",
      ".agentplane/tasks/202604070443-T8F4ZZ/pr/meta.json",
    ]);
    expect(plan.kind).toBe("docs-only");
    expect(plan.reason).toBe("docs_policy_website_only");
  });

  it("routes isolated task command paths to the task bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/commands/task/shared.ts",
      "packages/agentplane/src/commands/task/finish-command.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("task");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
    );
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
    expect(plan.testFiles).toContain("packages/agentplane/src/backends/task-backend.local.test.ts");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts",
    );
    expect(plan.testFiles).toContain("packages/agentplane/src/backends/task-backend.load.test.ts");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
    );
  });

  it("routes isolated hook and CI routing paths to the hooks bucket", () => {
    const plan = selectFastCiPlan(["scripts/run-local-ci.mjs"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("hooks");
    expect(plan.reason).toBe("hook_and_ci_routing_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.hooks.hook-run.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.hooks.install.test.ts",
    );
  });

  it("routes the pre-commit test-fast decision script to the hooks bucket", () => {
    const plan = selectFastCiPlan(["scripts/run-pre-commit-test-fast.mjs"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("hooks");
    expect(plan.reason).toBe("hook_and_ci_routing_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/pre-commit-test-fast-script.test.ts",
    );
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

  it("routes the CLI docs regression split suite to the cli-help bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-help");
    expect(plan.reason).toBe("cli_help_and_spec_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts");
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

  it("routes split lifecycle suites to the cli-core bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-core");
    expect(plan.reason).toBe("cli_core_execution_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.lifecycle.block-finish.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.lifecycle.verify.test.ts",
    );
  });

  it("routes split pr-flow suites to the cli-core bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-core");
    expect(plan.reason).toBe("cli_core_execution_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.network.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.validation.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-merge.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-validation.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts",
    );
  });

  it("routes isolated PR command paths to the pr bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/commands/pr/internal/sync.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("pr");
    expect(plan.reason).toBe("pr_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/pr/input-validation.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.integrate-failures.test.ts",
    );
  });

  it("ignores task artifacts when routing PR bucket changes", () => {
    const plan = selectFastCiPlan([
      ".agentplane/tasks/202604130750-E2J835/README.md",
      ".agentplane/tasks/202604130750-E2J835/pr/meta.json",
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts",
      "packages/agentplane/src/commands/pr/internal/sync.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("pr");
    expect(plan.reason).toBe("pr_paths_only");
    expect(plan.lintTargets).toEqual([
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.artifacts.test.ts",
      "packages/agentplane/src/commands/pr/internal/sync.ts",
    ]);
  });

  it("routes split branch-meta suites to the cli-core bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.branch-meta.sync-maintenance.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-core");
    expect(plan.reason).toBe("cli_core_execution_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.branch-meta.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.branch-meta.workflow-profile.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.branch-meta.sync-maintenance.test.ts",
    );
  });

  it("routes split task suites to the cli-core bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("cli-core");
    expect(plan.reason).toBe("cli_core_execution_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.tasks.doc-write.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.tasks.scaffold-derive.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts",
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
    const plan = selectFastCiPlan(["packages/agentplane/src/cli/run-cli.core.init.test.ts"]);
    expect(plan.kind).toBe("full-fast");
    expect(plan.reason).toBe("broad_or_infra_sensitive_change");
  });

  it("routes isolated release paths to the release bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/commands/release/apply.command.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("release");
    expect(plan.reason).toBe("release_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/release/apply.preflight.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/release/apply.version-mutation.test.ts",
    );
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
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.upgrade.test.ts");
  });

  it("routes the split backend-sync regression suite to the backend bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("backend");
    expect(plan.reason).toBe("backend_projection_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.backend-sync.test.ts",
    );
  });

  it("routes the split upgrade regression suite to the upgrade bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/cli/run-cli.core.upgrade.test.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("upgrade");
    expect(plan.reason).toBe("upgrade_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.upgrade.test.ts");
  });

  it("routes isolated guard paths to the guard bucket", () => {
    const plan = selectFastCiPlan(["packages/agentplane/src/commands/guard/index.ts"]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("guard");
    expect(plan.reason).toBe("guard_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/run-cli.core.guard.test.ts");
  });

  it("routes the split guard commit-wrapper suite to the guard bucket", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("guard");
    expect(plan.reason).toBe("guard_paths_only");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.refresh.test.ts",
    );
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

  it("detects delete-only branch cleanup pushes", () => {
    const updates = parsePrePushStdin(
      "(delete) 0000000000000000000000000000000000000000 refs/heads/task-close/T-1/abc def\n",
    );
    expect(isDeleteOnlyPush(updates)).toBe(true);
  });

  it("does not treat normal branch publishes as delete-only pushes", () => {
    const updates = parsePrePushStdin(
      "refs/heads/task/T-1 abc refs/heads/task/T-1 0000000000000000000000000000000000000000\n",
    );
    expect(isDeleteOnlyPush(updates)).toBe(false);
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

  it("selects a diff range for new branch pushes when a default base ref is available", () => {
    const updates = parsePrePushStdin(
      "refs/heads/feature abc refs/heads/feature 0000000000000000000000000000000000000000\n",
    );
    expect(selectBranchDiffRange(updates, { newBranchFallbackRef: "origin/main" })).toEqual({
      from: "origin/main",
      to: "abc",
    });
  });

  it("falls back to the default base when the remote old SHA is unavailable locally", () => {
    const updates = parsePrePushStdin(
      "refs/heads/task-close/T-1/abc HEAD refs/heads/task-close/T-1/abc missing-old-sha\n",
    );
    expect(selectBranchDiffRange(updates, { newBranchFallbackRef: "origin/main" })).toEqual({
      from: "origin/main",
      to: "HEAD",
    });
  });

  it("returns an empty changed-file list instead of throwing for invalid diff ranges", () => {
    expect(
      readChangedFilesForRange({
        from: "definitely-missing-old-sha",
        to: "also-missing-new-sha",
      }),
    ).toEqual([]);
  });
});
