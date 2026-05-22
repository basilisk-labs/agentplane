import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

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
        | "context"
        | "pr"
        | "cli-runtime"
        | "release"
        | "upgrade"
        | "guard"
        | "mixed";
      buckets?: string[];
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

const { buildLocalCiExecutionPlan, parseChangedFilesEnv, selectFastCiPlan, shouldRunCliDocsCheck } =
  localCiSelectionModule as {
    buildLocalCiExecutionPlan: (options: {
      mode: "smoke" | "fast" | "full";
      changedFiles: string[];
    }) => {
      mode: string;
      route: string;
      selector: FastCiPlan;
      steps: {
        command: string;
        kind: string;
        label: string;
        reason: string | null;
        skipped: boolean;
      }[];
      skipped_steps: {
        command: string;
        kind: string;
        label: string;
        reason: string | null;
        skipped: boolean;
      }[];
      prerequisites: {
        recipesInventory: boolean;
        workflowLint: boolean;
      };
    };
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
    opts?: { gitCwd?: string; newBranchFallbackRef?: string | null },
  ) => { from: string; to: string } | null;
};

function git(args: string[], options: { cwd?: string } = {}): string {
  return execFileSync("git", args, {
    cwd: options.cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function withTempGitRepo<T>(fn: (repoPath: string) => T): T {
  const repoPath = mkdtempSync(path.join(os.tmpdir(), "agentplane-prepush-scope-"));
  try {
    git(["init", "-b", "main"], { cwd: repoPath });
    git(["config", "user.name", "Test User"], { cwd: repoPath });
    git(["config", "user.email", "test@example.com"], { cwd: repoPath });
    return fn(repoPath);
  } finally {
    rmSync(repoPath, { force: true, recursive: true });
  }
}

function commitFile(repoPath: string, filePath: string, contents: string, message: string): string {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
  git(["add", "."], { cwd: repoPath });
  git(["commit", "-m", message], { cwd: repoPath });
  return git(["rev-parse", "HEAD"], { cwd: repoPath });
}

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

  it("routes context code and neutral task PR artifacts to the context bucket", () => {
    const plan = selectFastCiPlan([
      ".agentplane/tasks/202605201202-KMFQJ8/pr/meta.json",
      "docs/user/local-context.mdx",
      "packages/agentplane/src/blueprints/context-maximum-assimilation.ts",
      "packages/agentplane/src/commands/context/init.ts",
      "packages/agentplane/src/context/ingest-task.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("context");
    expect(plan.reason).toBe("context_paths_only");
    expect(plan.lintTargets).not.toContain(".agentplane/tasks/202605201202-KMFQJ8/pr/meta.json");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/context/release-readiness.test.ts",
    );
    expect(plan.testFiles).toContain("packages/agentplane/src/blueprints/validate.test.ts");
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

  it("routes local CI route registry maintenance to the hooks bucket", () => {
    const plan = selectFastCiPlan([
      "scripts/lib/local-ci-selection.mjs",
      "scripts/lib/local-ci-selection.d.ts",
      "scripts/lib/test-route-registry.mjs",
      "packages/agentplane/src/cli/local-ci-selection.test.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("hooks");
    expect(plan.reason).toBe("hook_and_ci_routing_paths_only");
    expect(plan.testFiles).toContain("packages/agentplane/src/cli/local-ci-selection.test.ts");
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

  it("reports routed CI prerequisites from the selected command plan", () => {
    const contextPlan = buildLocalCiExecutionPlan({
      mode: "fast",
      changedFiles: ["docs/user/local-context.mdx"],
    });
    expect(contextPlan.prerequisites.recipesInventory).toBe(true);
    expect(contextPlan.prerequisites.workflowLint).toBe(false);

    const workflowPlan = buildLocalCiExecutionPlan({
      mode: "fast",
      changedFiles: [".github/workflows/ci.yml"],
    });
    expect(workflowPlan.prerequisites.recipesInventory).toBe(true);
    expect(workflowPlan.prerequisites.workflowLint).toBe(true);
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

  it("routes PR integrate command paths to a narrow integrate bucket", () => {
    const plan = selectFastCiPlan([
      ".agentplane/tasks/202605222225-2B0DJD/README.md",
      ".agentplane/tasks/202605222225-2B0DJD/pr/meta.json",
      "packages/agentplane/src/commands/pr/integrate/cmd.test.ts",
      "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("pr-integrate");
    expect(plan.reason).toBe("pr_integrate_paths_only");
    expect(plan.lintTargets).toEqual([
      "packages/agentplane/src/commands/pr/integrate/cmd.test.ts",
      "packages/agentplane/src/commands/pr/integrate/internal/github-pr-merge.ts",
    ]);
    expect(plan.testFiles).toContain("packages/agentplane/src/commands/pr/integrate/cmd.test.ts");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/pr/integrate/internal/merge.test.ts",
    );
    expect(plan.testFiles).not.toContain(
      "packages/agentplane/src/cli/run-cli.core.pr-flow.pr-validation.test.ts",
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

  it("combines multiple targeted buckets instead of falling back to full-fast", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/commands/task/shared.ts",
      "packages/agentplane/src/commands/pr/check.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("mixed");
    expect(plan.buckets).toEqual(["pr", "task"]);
    expect(plan.reason).toBe("mixed_targeted_paths");
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
    );
    expect(plan.testFiles).toContain(
      "packages/agentplane/src/commands/pr/input-validation.test.ts",
    );
  });

  it("uses forks for mixed targeted plans when any selected bucket requires fork isolation", () => {
    const plan = selectFastCiPlan([
      "packages/agentplane/src/backends/task-backend/redmine-backend.ts",
      "packages/agentplane/src/commands/task/shared.ts",
    ]);
    expect(plan.kind).toBe("targeted");
    expect(plan.bucket).toBe("mixed");
    expect(plan.buckets).toEqual(["backend", "task"]);
    expect(plan.vitestPool).toBe("forks");
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

  it("builds an explainable smoke execution plan for targeted changes", () => {
    const report = buildLocalCiExecutionPlan({
      mode: "smoke",
      changedFiles: ["packages/agentplane/src/commands/task/new.ts"],
    });

    expect(report.route).toBe("targeted-smoke");
    expect(report.selector.kind).toBe("targeted");
    expect(report.selector.bucket).toBe("task");
    expect(report.steps.map((step) => step.label)).toEqual([
      "Format (check)",
      "Lint (targeted:task)",
      "Unit tests (targeted:task)",
    ]);
    expect(report.steps.at(-1)?.command).toContain(
      "packages/agentplane/src/commands/task/finish.validation.unit.test.ts",
    );
  });

  it("marks CLI docs freshness as skipped in explainable non-CLI fast plans", () => {
    const report = buildLocalCiExecutionPlan({
      mode: "fast",
      changedFiles: ["packages/agentplane/src/commands/doctor.run.ts"],
    });

    expect(report.route).toBe("targeted-fast");
    expect(report.skipped_steps).toContainEqual({
      command: "bun run docs:cli:check",
      kind: "check",
      label: "CLI docs freshness (check)",
      reason: "changed files do not touch CLI docs surfaces",
      skipped: true,
    });
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

  it("selects a diff range when pushing HEAD to a branch", () => {
    const updates = parsePrePushStdin("HEAD aaa refs/heads/task/T-1/fix bbb\n");
    expect(selectBranchDiffRange(updates)).toEqual({ from: "bbb", to: "aaa" });
  });

  it("selects task branch push scope from the base ref when a fallback is available", () => {
    const updates = parsePrePushStdin("HEAD aaa refs/heads/task/T-1/fix bbb\n");
    expect(selectBranchDiffRange(updates, { newBranchFallbackRef: "origin/main" })).toEqual({
      from: "origin/main",
      to: "aaa",
    });
  });

  it("keeps fast-forward task branch pushes scoped to outgoing commits", () => {
    withTempGitRepo((repoPath) => {
      const baseSha = commitFile(repoPath, path.join(repoPath, "README.md"), "base\n", "base");
      git(["checkout", "-b", "task/T-1/fix"], { cwd: repoPath });
      const remoteSha = commitFile(repoPath, path.join(repoPath, "src/index.ts"), "one\n", "one");
      const localSha = commitFile(repoPath, path.join(repoPath, "src/index.ts"), "two\n", "two");

      const updates = parsePrePushStdin(`HEAD ${localSha} refs/heads/task/T-1/fix ${remoteSha}\n`);

      expect(
        selectBranchDiffRange(updates, { gitCwd: repoPath, newBranchFallbackRef: baseSha }),
      ).toEqual({
        from: remoteSha,
        to: localSha,
      });
    });
  });

  it("uses base scope for amended task branch force-pushes", () => {
    withTempGitRepo((repoPath) => {
      const baseSha = commitFile(repoPath, path.join(repoPath, "README.md"), "base\n", "base");
      git(["checkout", "-b", "task/T-1/fix"], { cwd: repoPath });
      const remoteSha = commitFile(repoPath, path.join(repoPath, "src/index.ts"), "code\n", "old");
      git(["reset", "--hard", baseSha], { cwd: repoPath });
      const localSha = commitFile(
        repoPath,
        path.join(repoPath, "src/index.ts"),
        "code\n",
        "amended",
      );

      const updates = parsePrePushStdin(`HEAD ${localSha} refs/heads/task/T-1/fix ${remoteSha}\n`);

      expect(
        selectBranchDiffRange(updates, { gitCwd: repoPath, newBranchFallbackRef: baseSha }),
      ).toEqual({
        from: baseSha,
        to: localSha,
      });
    });
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
