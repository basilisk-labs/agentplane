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
};

const { GITHUB_CI_GATE_JOBS, buildGithubCiCapabilityPlan } = githubCiCapabilitiesModule as {
  GITHUB_CI_GATE_JOBS: readonly string[];
  buildGithubCiCapabilityPlan: (input: {
    changedFiles: string[];
    eventName?: string;
    headRef?: string;
    ref?: string;
    exactShaRecovery?: boolean;
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
  it("runs only docs and the aggregate for docs-only changes", () => {
    const result = plan(["docs/user/setup.mdx"]);

    expect(result.route).toBe("docs-only-fast");
    expect(result.capabilities).toMatchObject({
      core: false,
      docs: true,
      dependency_review: false,
      windows: false,
      coverage: false,
      codeql_javascript: false,
      codeql_actions: false,
    });
    expect(result.expected_jobs).toEqual(["plan", "verify-docs"]);
    expect(result.executing_jobs_count).toBe(3);
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

  it("routes an ordinary AgentPlane implementation through targeted checks plus relevant gates", () => {
    const result = plan(["packages/agentplane/src/runner/adapters/codex.ts"]);

    expect(result.route).toBe("targeted-fast");
    expect(result.capabilities).toMatchObject({
      core: true,
      docs: false,
      codeql_javascript: true,
      package_runtime_core: false,
      package_runtime_recipes: false,
    });
    expect(result.expected_jobs).toContain("verify-routed");
    expect(result.expected_jobs).not.toContain("verify-docs");
    expect(result.expected_jobs).not.toContain("verify-contract");
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

  it("fails closed when GitHub cannot provide a changed-file scope", () => {
    const result = plan([]);

    expect(result.route_reason).toBe("missing_change_scope_full");
    expect(result.executing_jobs_count).toBeLessThanOrEqual(8);
    expect(Object.values(result.capabilities).every((value) => value === true)).toBe(true);
  });

  it("declares every aggregate dependency in the shared gate registry", () => {
    const result = plan([".github/workflows/ci.yml"]);
    for (const job of result.expected_jobs) expect(GITHUB_CI_GATE_JOBS).toContain(job);
  });
});
