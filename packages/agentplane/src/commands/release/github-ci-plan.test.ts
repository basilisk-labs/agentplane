import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as githubCiCapabilitiesModule from "../../../../../scripts/lib/github-ci-capabilities.mjs";
import * as lifecycleArtifactReuseModule from "../../../../../scripts/lib/lifecycle-artifact-reuse.mjs";

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
const { evaluateLifecycleArtifactReuse } = lifecycleArtifactReuseModule as {
  evaluateLifecycleArtifactReuse: (input: {
    cwd: string;
    parentSha: string;
    currentSha: string;
  }) => { eligible: boolean; reason: string; changed_files: string[] };
};

function git(cwd: string, args: string[]): string {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

function taskReadme({
  title = "Lifecycle task",
  status,
  parentSha = null,
  implementationSha = parentSha,
}: {
  title?: string;
  status: "DOING" | "DONE";
  parentSha?: string | null;
  implementationSha?: string | null;
}): string {
  const terminal = status === "DONE";
  return `---
id: "202608131200-ABC123"
title: "${title}"
status: "${status}"
revision: ${terminal ? 2 : 1}
verification: ${terminal ? '{ state: "ok" }' : '{ state: "pending" }'}
quality_review: ${terminal ? `{ state: "pass", evaluated_sha: "${implementationSha}", evidence_refs: [".agentplane/tasks/202608131200-ABC123/quality/final/quality-report.json", ".agentplane/tasks/202608131200-ABC123/verification/result.json"] }` : '{ state: "pending" }'}
commit: ${terminal ? `{ hash: "${parentSha}" }` : "null"}
extensions: { ${terminal ? `implementation_commit: { hash: "${implementationSha}" }, ` : ""}"agentplane.human_input": { openQuestion: null, history: [{ id: "owner-review", question: "Approve effects?", askedAt: "2026-08-13T12:00:00Z", askedBy: "EVALUATOR", answeredAt: "2026-08-13T12:01:00Z", answeredBy: "USER", answer: "Approved.", previousStatus: "DONE" }] } }
execution_contract:
  schema_version: 1
  source: "agent_declaration"
  declaration: { repository_effects: ["source_code"] }
  selected_mode: "branch_pr"
  repository_mode: "branch_pr"
  reason_codes: ["agent_preferred_branch_pr"]
  authority: {}
  safety: {}
  observed:
    repository_effects: []
    external_effects: []
    changed_paths: []
    changed_components: []
    authority_violations: []
    verification_results: []
  verification:
    required_evidence: ["task_outcome"]
    contract:
      schema_version: 2
      kind: "verification_contract"
      source: "execution_contract"
      phase: "task"
      declared:
        repository_effects: ["source_code"]
        external_effects: []
        components: []
        risk: { requirements_uncertainty: "bounded", implementation_uncertainty: "bounded", reversibility: "reversible" }
        evidence_requirements: ["task_outcome"]
      observed: { repository_effects: [], external_effects: [], changed_components: [], changed_files: [] }
      policy_floor: { pr_full_regression: true, unknown_or_central_full_regression: true, monotonic_strengthening: true }
      selector: { kind: "semantic", reason: "execution_declaration", execution_mode: "semantic", bucket: null, buckets: [], lint_targets: [], vitest_pool: "forks", run_cli_docs_check: false, selected_test_files: [] }
      selected_checks: ["task_outcome"]
      execution_groups: ["core"]
      escalation_reasons: []
      requires_full_regression: false
      requires_real_e2e: false
      digest: "sha256:${"a".repeat(64)}"
---
## Summary

Stable semantic task body.

## Verification

${terminal ? "<!-- BEGIN VERIFICATION RESULTS -->\npass\n<!-- END VERIFICATION RESULTS -->" : "<!-- BEGIN VERIFICATION RESULTS -->\n<!-- END VERIFICATION RESULTS -->"}
`;
}

function withLifecycleRepo(
  mutate: (repo: string, parentSha: string, readmePath: string) => void,
): ReturnType<typeof evaluateLifecycleArtifactReuse> {
  const repo = mkdtempSync(path.join(os.tmpdir(), "agentplane-lifecycle-reuse-"));
  try {
    git(repo, ["init", "-b", "main"]);
    git(repo, ["config", "user.name", "CI Test"]);
    git(repo, ["config", "user.email", "ci@example.com"]);
    const readmePath = ".agentplane/tasks/202608131200-ABC123/README.md";
    mkdirSync(path.join(repo, path.dirname(readmePath)), { recursive: true });
    writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DOING" }));
    git(repo, ["add", "."]);
    git(repo, ["commit", "-m", "implementation"]);
    const parentSha = git(repo, ["rev-parse", "HEAD"]);
    mutate(repo, parentSha, readmePath);
    git(repo, ["add", "."]);
    git(repo, ["commit", "-m", "lifecycle"]);
    return evaluateLifecycleArtifactReuse({
      cwd: repo,
      parentSha,
      currentSha: git(repo, ["rev-parse", "HEAD"]),
    });
  } finally {
    rmSync(repo, { recursive: true, force: true });
  }
}

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

  it("reuses only semantically valid lifecycle artifacts", () => {
    const result = withLifecycleRepo((repo, parentSha, readmePath) => {
      writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DONE", parentSha }));
      const evidencePath = path.join(
        repo,
        ".agentplane/tasks/202608131200-ABC123/verification/result.json",
      );
      mkdirSync(path.dirname(evidencePath), { recursive: true });
      writeFileSync(
        evidencePath,
        `${JSON.stringify({
          schema_version: 2,
          task_id: "202608131200-ABC123",
          result: "ok",
          implementation_sha: parentSha,
          input: { digest: `sha256:${"b".repeat(64)}` },
        })}\n`,
      );
      const qualityPath = path.join(
        repo,
        ".agentplane/tasks/202608131200-ABC123/quality/final/quality-report.json",
      );
      mkdirSync(path.dirname(qualityPath), { recursive: true });
      writeFileSync(
        qualityPath,
        `${JSON.stringify({
          schema_version: 1,
          task_id: "202608131200-ABC123",
          evaluated_sha: parentSha,
          verdict: "pass",
        })}\n`,
      );
      const historicalQuality = path.join(
        repo,
        ".agentplane/tasks/202608131200-ABC123/quality/review/quality-report.json",
      );
      mkdirSync(path.dirname(historicalQuality), { recursive: true });
      writeFileSync(
        historicalQuality,
        `${JSON.stringify({
          schema_version: 1,
          task_id: "202608131200-ABC123",
          evaluated_sha: parentSha,
          verdict: "human_review",
        })}\n`,
      );
      writeFileSync(
        path.join(path.dirname(historicalQuality), "evaluator-work-order.json"),
        `${JSON.stringify({
          schema_version: 1,
          kind: "evaluator_work_order",
          task: { id: "202608131200-ABC123" },
          evaluated_sha: parentSha,
        })}\n`,
      );
      writeFileSync(
        path.join(path.dirname(historicalQuality), "evaluator-result.json"),
        `${JSON.stringify({
          schema_version: 1,
          kind: "evaluator_result",
          verdict: "human_review",
        })}\n`,
      );
    });

    expect(result).toMatchObject({
      eligible: true,
      reason: "semantic_lifecycle_drift_only",
    });
  });

  it("reuses verification across consecutive lifecycle-only closure commits", () => {
    const repo = mkdtempSync(path.join(os.tmpdir(), "agentplane-lifecycle-chain-"));
    try {
      git(repo, ["init", "-b", "main"]);
      git(repo, ["config", "user.name", "CI Test"]);
      git(repo, ["config", "user.email", "ci@example.com"]);
      const taskRoot = ".agentplane/tasks/202608131200-ABC123";
      const readmePath = `${taskRoot}/README.md`;
      mkdirSync(path.join(repo, taskRoot), { recursive: true });
      writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DOING" }));
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "implementation"]);
      const implementationSha = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({ status: "DONE", parentSha: implementationSha, implementationSha }),
      );
      const verificationPath = path.join(repo, taskRoot, "verification/result.json");
      mkdirSync(path.dirname(verificationPath), { recursive: true });
      writeFileSync(
        verificationPath,
        `${JSON.stringify({ task_id: "202608131200-ABC123", result: "ok", implementation_sha: implementationSha, input: { digest: `sha256:${"b".repeat(64)}` } })}\n`,
      );
      const qualityPath = path.join(repo, taskRoot, "quality/final/quality-report.json");
      mkdirSync(path.dirname(qualityPath), { recursive: true });
      writeFileSync(
        qualityPath,
        `${JSON.stringify({ task_id: "202608131200-ABC123", evaluated_sha: implementationSha, verdict: "pass" })}\n`,
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "first lifecycle closure"]);
      const verifiedParentSha = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({
          status: "DONE",
          parentSha: verifiedParentSha,
          implementationSha,
        }).replace("revision: 2", "revision: 3"),
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "second lifecycle closure"]);

      expect(
        evaluateLifecycleArtifactReuse({
          cwd: repo,
          parentSha: verifiedParentSha,
          currentSha: git(repo, ["rev-parse", "HEAD"]),
        }),
      ).toMatchObject({
        eligible: true,
        reason: "semantic_lifecycle_drift_only",
        implementation_sha: implementationSha,
      });
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });

  it("rotates the frozen implementation identity to an exact new code parent", () => {
    const repo = mkdtempSync(path.join(os.tmpdir(), "agentplane-lifecycle-rotation-"));
    try {
      git(repo, ["init", "-b", "main"]);
      git(repo, ["config", "user.name", "CI Test"]);
      git(repo, ["config", "user.email", "ci@example.com"]);
      const taskRoot = ".agentplane/tasks/202608131200-ABC123";
      const readmePath = `${taskRoot}/README.md`;
      mkdirSync(path.join(repo, taskRoot), { recursive: true });
      writeFileSync(path.join(repo, "feature.js"), "export const value = 1;\n");
      writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DOING" }));
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "initial implementation"]);
      const oldImplementationSha = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(path.join(repo, "feature.js"), "export const value = 2;\n");
      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({
          status: "DOING",
        }).replace(
          'extensions: { "agentplane.human_input"',
          `extensions: { implementation_commit: { hash: "${oldImplementationSha}" }, "agentplane.human_input"`,
        ),
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "new implementation"]);
      const newImplementationSha = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({ status: "DOING" })
          .replace(
            'extensions: { "agentplane.human_input"',
            `extensions: { implementation_commit: { hash: "${oldImplementationSha}" }, "agentplane.human_input"`,
          )
          .replace("revision: 1", "revision: 2"),
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "verification artifacts"]);
      const verifiedLifecycleParent = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({
          status: "DONE",
          parentSha: verifiedLifecycleParent,
          implementationSha: newImplementationSha,
        }),
      );
      const verificationPath = path.join(repo, taskRoot, "verification/result.json");
      mkdirSync(path.dirname(verificationPath), { recursive: true });
      writeFileSync(
        verificationPath,
        `${JSON.stringify({ task_id: "202608131200-ABC123", result: "ok", implementation_sha: newImplementationSha, input: { digest: `sha256:${"b".repeat(64)}` } })}\n`,
      );
      const qualityPath = path.join(repo, taskRoot, "quality/final/quality-report.json");
      mkdirSync(path.dirname(qualityPath), { recursive: true });
      writeFileSync(
        qualityPath,
        `${JSON.stringify({ task_id: "202608131200-ABC123", evaluated_sha: newImplementationSha, verdict: "pass" })}\n`,
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "lifecycle closure"]);

      expect(
        evaluateLifecycleArtifactReuse({
          cwd: repo,
          parentSha: verifiedLifecycleParent,
          currentSha: git(repo, ["rev-parse", "HEAD"]),
        }),
      ).toMatchObject({
        eligible: true,
        implementation_sha: newImplementationSha,
      });
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
  });

  it("rejects semantic README drift and malformed managed evidence", () => {
    const semanticDrift = withLifecycleRepo((repo, parentSha, readmePath) => {
      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({ title: "Changed task scope", status: "DONE", parentSha }),
      );
    });
    expect(semanticDrift).toMatchObject({ eligible: false, reason: "semantic_readme_drift" });

    const malformedEvidence = withLifecycleRepo((repo, parentSha, readmePath) => {
      writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DONE", parentSha }));
      const evidencePath = path.join(
        repo,
        ".agentplane/tasks/202608131200-ABC123/verification/result.json",
      );
      mkdirSync(path.dirname(evidencePath), { recursive: true });
      writeFileSync(evidencePath, "{not-json\n");
    });
    expect(malformedEvidence).toMatchObject({
      eligible: false,
      reason: "malformed_managed_artifact",
    });

    const unboundEvidence = withLifecycleRepo((repo, parentSha, readmePath) => {
      writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DONE", parentSha }));
      const evidencePath = path.join(
        repo,
        ".agentplane/tasks/202608131200-ABC123/verification/result.json",
      );
      mkdirSync(path.dirname(evidencePath), { recursive: true });
      writeFileSync(
        evidencePath,
        `${JSON.stringify({
          schema_version: 2,
          task_id: "202608131200-ABC123",
          result: "ok",
          implementation_sha: "f".repeat(40),
          input: { digest: `sha256:${"b".repeat(64)}` },
        })}\n`,
      );
    });
    expect(unboundEvidence).toMatchObject({
      eligible: false,
      reason: "invalid_verification_evidence",
    });
  });

  it("rejects switching the implementation identity in a lifecycle-only descendant", () => {
    const switchedIdentity = withLifecycleRepo((repo, parentSha, readmePath) => {
      const wrongIdentity = "f".repeat(40);
      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({ status: "DONE", parentSha, implementationSha: wrongIdentity }),
      );
    });
    expect(switchedIdentity).toMatchObject({
      eligible: false,
      reason: "semantic_readme_drift",
    });
  });

  it("rejects rotating implementation identity across task-artifact-only history", () => {
    const repo = mkdtempSync(path.join(os.tmpdir(), "agentplane-lifecycle-task-only-"));
    try {
      git(repo, ["init", "-b", "main"]);
      git(repo, ["config", "user.name", "CI Test"]);
      git(repo, ["config", "user.email", "ci@example.com"]);
      const readmePath = ".agentplane/tasks/202608131200-ABC123/README.md";
      mkdirSync(path.join(repo, path.dirname(readmePath)), { recursive: true });
      writeFileSync(path.join(repo, readmePath), taskReadme({ status: "DOING" }));
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "implementation"]);
      const implementationSha = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({ status: "DOING" }).replace(
          'extensions: { "agentplane.human_input"',
          `extensions: { implementation_commit: { hash: "${implementationSha}" }, "agentplane.human_input"`,
        ),
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "task artifact only"]);
      const taskOnlyParent = git(repo, ["rev-parse", "HEAD"]);

      writeFileSync(
        path.join(repo, readmePath),
        taskReadme({
          status: "DONE",
          parentSha: taskOnlyParent,
          implementationSha: taskOnlyParent,
        }),
      );
      git(repo, ["add", "."]);
      git(repo, ["commit", "-m", "invalid rotation"]);

      expect(
        evaluateLifecycleArtifactReuse({
          cwd: repo,
          parentSha: taskOnlyParent,
          currentSha: git(repo, ["rev-parse", "HEAD"]),
        }),
      ).toMatchObject({ eligible: false, reason: "semantic_readme_drift" });
    } finally {
      rmSync(repo, { recursive: true, force: true });
    }
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
