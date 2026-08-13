import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const CI_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/ci.yml");
const DOCS_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/docs-ci.yml");
const WORKFLOW_LINT_PATH = path.resolve(process.cwd(), ".github/workflows/workflows-lint.yml");
const DEPENDENCY_REVIEW_PATH = path.resolve(
  process.cwd(),
  ".github/workflows/dependency-review.yml",
);
const PREPUBLISH_WORKFLOW_PATH = path.resolve(process.cwd(), ".github/workflows/prepublish.yml");
const PATH_FILTERS_PATH = path.resolve(process.cwd(), ".github/path-filters.yml");
const CODEQL_CONFIG_PATH = path.resolve(process.cwd(), ".github/codeql/codeql-config.yml");

describe("Core CI workflow contract", () => {
  it("routes every relevant capability through one fail-closed PR aggregate", async () => {
    const workflow = await readFile(CI_WORKFLOW_PATH, "utf8");
    const codeqlConfig = await readFile(CODEQL_CONFIG_PATH, "utf8");

    expect(workflow).toContain("node scripts/checks/plan-github-ci.mjs");
    expect(workflow).toContain("github.event.pull_request.head.sha");
    expect(workflow).toContain("bun install --frozen-lockfile --ignore-scripts");
    expect(workflow).toContain("run: bun run bench:compatibility:candidate:check");
    for (const output of [
      "docs",
      "dependency_review",
      "workflow_lint",
      "windows",
      "coverage",
      "cli_critical",
      "real_e2e",
      "package_runtime_core",
      "package_runtime_recipes",
      "security",
      "codeql_languages",
      "expected_jobs",
      "executing_jobs_count",
      "plan_json",
    ]) {
      expect(workflow).toContain(`${output}: \${{ steps.plan.outputs.${output} }}`);
    }
    expect(workflow).toContain("verify-tests:");
    expect(workflow).toContain("run: bun run test:fast:ci");
    expect(workflow).toContain("verify-real-e2e:");
    expect(workflow).toContain("needs.plan.outputs.real_e2e == 'true'");
    expect(workflow).toContain("--fail-on-scenario-failure");
    expect(workflow).toContain(
      "--scenario packaged-candidate-flow,packaged-mixed-scope-lifecycle,hosted-boundary-matrix",
    );
    expect(workflow).toContain("verify-docs:");
    expect(workflow).toContain("verify-security:");
    expect(workflow).not.toContain("verify-unit:");
    expect(workflow).not.toContain("verify-cli-critical:");
    expect(workflow).not.toContain("verify-workflow:");
    expect(workflow).not.toContain("verify-coverage:");
    expect(workflow).toContain("actions/dependency-review-action@v5");
    expect(workflow).toContain("github/codeql-action/init@v4");
    expect(workflow).toContain("github/codeql-action/analyze@v4");
    expect(workflow).toContain("config-file: ./.github/codeql/codeql-config.yml");
    expect(codeqlConfig).toContain("uses: security-extended");
    expect(codeqlConfig).toContain('- "**/*.test.ts"');
    expect(codeqlConfig).toContain('- "**/*.spec.ts"');
    expect(codeqlConfig).not.toContain("query-filters:");
    expect(workflow).toContain("name: PR verification");
    expect(workflow).toContain("AGENTPLANE_CI_PLAN_JSON: ${{ needs.plan.outputs.plan_json }}");
    expect(workflow).toContain('"verify-security":"${{ needs.verify-security.result }}"');
    expect(workflow).toContain('"verify-real-e2e":"${{ needs.verify-real-e2e.result }}"');
    expect(workflow).toContain("run: node scripts/checks/evaluate-github-ci.mjs");
  });

  it("keeps exact-SHA release evidence and release-ready dependencies current", async () => {
    const workflow = await readFile(CI_WORKFLOW_PATH, "utf8");

    expect(workflow).toContain(
      'description: "Exact Git commit SHA to validate for release recovery (preferred over ref)"',
    );
    expect(workflow).toContain("AGENTPLANE_RELEASE_RECOVERY_SHA:");
    expect(workflow).toContain("recovery-validate:");
    expect(workflow).toContain("if: needs.plan.outputs.exact_sha_recovery == 'true'");
    expect(workflow).toContain("name: Release-ready manifest");
    expect(workflow).toContain("needs.plan.outputs.release_ready == 'true'");
    expect(workflow).toContain("needs.verify-tests.result == 'success'");
    expect(workflow).toContain("needs.verify-real-e2e.result == 'success'");
    expect(workflow).toContain("needs.verify-security.result == 'success'");
    expect(workflow).toContain("needs.verify-docs.result == 'success'");
    expect(workflow).toContain("node scripts/manifest.mjs release-ready");
    expect(workflow).toContain('--sha "${{ steps.target.outputs.sha }}"');
    expect(workflow).toContain("name: release-ready-${{ steps.target.outputs.sha }}");
  });

  it("removes duplicate PR workflows while retaining canonical post-merge and manual surfaces", async () => {
    const docsWorkflow = await readFile(DOCS_WORKFLOW_PATH, "utf8");
    const workflowLint = await readFile(WORKFLOW_LINT_PATH, "utf8");

    expect(docsWorkflow).not.toContain("pull_request:");
    expect(docsWorkflow).toContain("push:");
    expect(docsWorkflow).toContain("run: bun run docs:site:check");
    expect(workflowLint).not.toContain("pull_request:");
    expect(workflowLint).not.toContain("push:");
    expect(workflowLint).toContain("workflow_dispatch:");
    await expect(access(DEPENDENCY_REVIEW_PATH)).rejects.toThrow();
  });

  it("preserves the prepublish path contract independently from PR routing", async () => {
    const prepublishWorkflow = await readFile(PREPUBLISH_WORKFLOW_PATH, "utf8");
    const filters = await readFile(PATH_FILTERS_PATH, "utf8");

    expect(prepublishWorkflow).toContain("filters: .github/path-filters.yml");
    expect(prepublishWorkflow).toContain("predicate-quantifier: every");
    expect(prepublishWorkflow).toContain("run: bun run test:fast:ci");
    expect(prepublishWorkflow).toContain('AGENTPLANE_RUN_NETWORK_PACKAGING_TESTS: "1"');
    expect(filters).toContain(".agentplane/**");
    expect(filters).toContain("!.agentplane/tasks/**");
    expect(filters).toContain(".github/workflows/**");
  });
});
