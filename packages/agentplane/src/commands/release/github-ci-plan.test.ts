import { describe, expect, it } from "vitest";

import * as githubCiCapabilitiesModule from "../../../../../scripts/lib/github-ci-capabilities.mjs";

type GithubCiCapabilities = Record<
  | "core"
  | "docs"
  | "dependency_review"
  | "workflow_lint"
  | "windows"
  | "coverage"
  | "cli_critical"
  | "real_e2e"
  | "package_runtime_core"
  | "package_runtime_recipes"
  | "codeql_javascript"
  | "codeql_actions",
  boolean
>;

type GithubCiPlan = {
  route: string;
  route_reason: string;
  release_ready: boolean;
  capabilities: GithubCiCapabilities;
  expected_jobs: string[];
  executing_jobs_count: number;
  lifecycle_only_head: boolean;
  reuse_sha: string;
  semantic_effect_parse_errors: string[];
  verification_contract: {
    phase: string;
    requires_full_regression: boolean;
    requires_real_e2e: boolean;
  };
};

const { GITHUB_CI_GATE_JOBS, buildGithubCiCapabilityPlan } = githubCiCapabilitiesModule as {
  GITHUB_CI_GATE_JOBS: readonly string[];
  buildGithubCiCapabilityPlan: (input: {
    changedFiles: string[];
    eventName?: string;
    headRef?: string;
    ref?: string;
    exactShaRecovery?: boolean;
    lifecycleOnlyHead?: boolean;
    reuseSha?: string;
    semanticEffects?: {
      declaredRepositoryEffects?: string[];
      declaredExternalEffects?: string[];
      observedRepositoryEffects?: string[];
      observedExternalEffects?: string[];
      parseErrors?: string[];
    };
  }) => GithubCiPlan;
};

function plan(changedFiles: string[], options: { headRef?: string } = {}) {
  return buildGithubCiCapabilityPlan({
    changedFiles,
    eventName: "pull_request",
    headRef: options.headRef ?? "task/example",
  });
}

describe("GitHub CI capability planning", () => {
  it("requires full regression on every PR even for localized source", () => {
    const result = plan(["packages/testkit/src/helper.test.ts"]);
    expect(result.route).toBe("full-fast");
    expect(result.route_reason).toBe("pr_full_regression_floor");
    expect(result.verification_contract).toMatchObject({
      phase: "pr",
      requires_full_regression: true,
    });
  });

  it("adds real E2E only when the semantic execution contract requires it", () => {
    const ordinary = plan(["packages/testkit/src/helper.test.ts"]);
    expect(ordinary.capabilities.real_e2e).toBe(false);
    expect(ordinary.expected_jobs).not.toContain("verify-real-e2e");

    const external = buildGithubCiCapabilityPlan({
      changedFiles: ["packages/testkit/src/helper.test.ts"],
      eventName: "pull_request",
      semanticEffects: { declaredExternalEffects: ["deploy"] },
    });
    expect(external.capabilities.real_e2e).toBe(true);
    expect(external.expected_jobs).toContain("verify-real-e2e");
    expect(external.verification_contract).toMatchObject({ requires_real_e2e: true });
  });

  it("fails closed when the structured execution contract cannot be parsed", () => {
    const result = buildGithubCiCapabilityPlan({
      changedFiles: ["packages/testkit/src/helper.test.ts"],
      eventName: "pull_request",
      semanticEffects: { parseErrors: ["task README: invalid external_effects list"] },
    });
    expect(result.semantic_effect_parse_errors).toHaveLength(1);
    expect(result.verification_contract).toMatchObject({
      requires_full_regression: true,
      requires_real_e2e: true,
    });
    expect(result.expected_jobs).toContain("verify-real-e2e");
  });

  it("routes lifecycle-only heads to verified-parent reuse", () => {
    const parent = "a".repeat(40);
    const result = buildGithubCiCapabilityPlan({
      changedFiles: [
        "packages/agentplane/src/shared/write-if-changed.ts",
        ".agentplane/tasks/202608112259-T3ZDDM/README.md",
      ],
      eventName: "pull_request",
      lifecycleOnlyHead: true,
      reuseSha: parent,
    });
    expect(result).toMatchObject({
      route: "reuse-verified-parent",
      route_reason: "lifecycle_only_head_reuses_verified_parent",
      lifecycle_only_head: true,
      reuse_sha: parent,
    });
    expect(result.expected_jobs).toEqual(["plan", "verify-routed"]);
  });

  it("keeps the PR full-regression floor for docs-only changes", () => {
    const result = plan(["docs/user/setup.mdx"]);

    expect(result.route).toBe("full-fast");
    expect(result.capabilities).toMatchObject({
      core: true,
      docs: true,
      dependency_review: false,
      windows: false,
      coverage: true,
      codeql_javascript: false,
      codeql_actions: false,
    });
    expect(result.expected_jobs).toEqual(
      expect.arrayContaining(["plan", "verify-contract", "verify-static", "verify-tests"]),
    );
  });

  it("keeps task-lifecycle artifacts neutral", () => {
    const result = plan([".agentplane/tasks/202608102115-7XGP97/README.md"]);

    expect(result.capabilities.core).toBe(false);
    expect(Object.values(result.capabilities).every((value) => value === false)).toBe(true);
    expect(result.expected_jobs).toEqual(["plan"]);
  });

  it.each([
    ["workflow", [".github/workflows/ci.yml"]],
    ["dependency", ["bun.lock"]],
    ["core", ["packages/core/src/git/index.ts"]],
    ["recipes", ["packages/recipes/src/index.ts"]],
    ["unknown", ["tools/unclassified-input.xyz"]],
  ])("keeps a broad %s route at or below eight executing jobs", (_label, changedFiles) => {
    const result = plan(changedFiles);

    expect(result.route).toBe("full-fast");
    expect(result.executing_jobs_count).toBeLessThanOrEqual(8);
    expect(result.expected_jobs).toContain("verify-contract");
    expect(result.expected_jobs).toContain("verify-static");
    expect(result.expected_jobs).toContain("verify-tests");
  });

  it("runs full regression for an ordinary AgentPlane implementation PR", () => {
    const result = plan(["packages/agentplane/src/runner/adapters/codex.ts"]);

    expect(result.route).toBe("full-fast");
    expect(result.capabilities).toMatchObject({
      core: true,
      docs: false,
      codeql_javascript: true,
      package_runtime_core: false,
      package_runtime_recipes: false,
    });
    expect(result.expected_jobs).toContain("verify-tests");
    expect(result.expected_jobs).not.toContain("verify-docs");
    expect(result.expected_jobs).toContain("verify-contract");
    expect(result.expected_jobs).not.toContain("verify-package-node-runtime");
  });

  it("forces release refs and CI routing changes through the fail-closed full route", () => {
    const release = plan(["docs/release-notes.mdx"], { headRef: "release/v0.7.6" });
    const routing = plan(["scripts/checks/plan-github-ci.mjs"]);

    for (const result of [release, routing]) {
      expect(result.route).toBe("full-fast");
      expect(result.capabilities).toMatchObject({
        docs: true,
        dependency_review: true,
        workflow_lint: true,
        windows: true,
        coverage: true,
        package_runtime_core: true,
        package_runtime_recipes: true,
        codeql_javascript: true,
        codeql_actions: true,
      });
    }
    expect(release.expected_jobs).toContain("release-ready");
  });

  it("keeps exact-SHA recovery isolated from development gates", () => {
    const result = buildGithubCiCapabilityPlan({
      changedFiles: [],
      eventName: "workflow_dispatch",
      exactShaRecovery: true,
    });

    expect(result.route).toBe("recovery");
    expect(result.expected_jobs).toEqual(["plan", "recovery-validate", "release-ready"]);
    expect(result.executing_jobs_count).toBe(4);
  });

  it("does not rerun release evidence for an ordinary main push", () => {
    const result = buildGithubCiCapabilityPlan({
      changedFiles: ["packages/agentplane/src/index.ts"],
      eventName: "push",
      ref: "refs/heads/main",
    });

    expect(result.release_ready).toBe(false);
    expect(result.expected_jobs).not.toContain("release-ready");
  });

  it("restores release-ready evidence for a release package set merged to main", () => {
    const result = buildGithubCiCapabilityPlan({
      changedFiles: [
        "packages/agentplane/package.json",
        "packages/core/package.json",
        "packages/recipes/package.json",
        "packages/testkit/package.json",
      ],
      eventName: "push",
      ref: "refs/heads/main",
    });

    expect(result.route).toBe("full-fast");
    expect(result.release_ready).toBe(true);
    expect(result.expected_jobs).toContain("release-ready");
  });

  it("fails closed when GitHub cannot provide a changed-file scope", () => {
    const result = plan([]);

    expect(result.route_reason).toBe("missing_change_scope_full");
    expect(result.executing_jobs_count).toBeLessThanOrEqual(8);
    expect(result.capabilities).toMatchObject({
      core: true,
      docs: true,
      dependency_review: true,
      workflow_lint: true,
      windows: true,
      coverage: true,
      cli_critical: true,
      real_e2e: false,
      package_runtime_core: true,
      package_runtime_recipes: true,
      codeql_javascript: true,
      codeql_actions: true,
    });
  });

  it("declares every aggregate dependency in the shared gate registry", () => {
    const result = plan([".github/workflows/ci.yml"]);
    for (const job of result.expected_jobs) expect(GITHUB_CI_GATE_JOBS).toContain(job);
  });
});
