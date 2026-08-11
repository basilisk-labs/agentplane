import { describe, expect, it } from "vitest";

import * as githubCiCapabilitiesModule from "../../../../../scripts/lib/github-ci-capabilities.mjs";

type GithubCiPlan = {
  expected_jobs: string[];
};

type GithubCiEvaluation = {
  ok: boolean;
  findings: string[];
};

const { GITHUB_CI_GATE_JOBS, buildGithubCiCapabilityPlan, evaluateGithubCiAggregate } =
  githubCiCapabilitiesModule as {
    GITHUB_CI_GATE_JOBS: readonly string[];
    buildGithubCiCapabilityPlan: (input: {
      changedFiles: string[];
      eventName?: string;
      headRef?: string;
      exactShaRecovery?: boolean;
    }) => GithubCiPlan;
    evaluateGithubCiAggregate: (input: {
      plan: GithubCiPlan;
      jobResults: Record<string, string>;
    }) => GithubCiEvaluation;
  };

function resultsFor(expectedJobs: string[]): Record<string, string> {
  const expected = new Set(expectedJobs);
  return Object.fromEntries(
    GITHUB_CI_GATE_JOBS.map((job) => [job, expected.has(job) ? "success" : "skipped"]),
  );
}

describe("GitHub CI aggregate verification", () => {
  it("passes only when every planned gate succeeds and every unplanned gate skips", () => {
    const plan = buildGithubCiCapabilityPlan({
      changedFiles: ["packages/agentplane/src/runner/adapters/codex.ts"],
      eventName: "pull_request",
      headRef: "task/example",
    });

    expect(
      evaluateGithubCiAggregate({ plan, jobResults: resultsFor(plan.expected_jobs) }),
    ).toMatchObject({ ok: true, findings: [] });
  });

  it.each(["failure", "cancelled", "skipped"])(
    "fails closed when a planned gate reports %s",
    (result) => {
      const plan = buildGithubCiCapabilityPlan({
        changedFiles: [".github/workflows/ci.yml"],
        eventName: "pull_request",
        headRef: "task/ci",
      });
      const jobResults = resultsFor(plan.expected_jobs);
      jobResults["verify-security"] = result;

      const evaluation = evaluateGithubCiAggregate({ plan, jobResults });
      expect(evaluation.ok).toBe(false);
      expect(evaluation.findings).toContain(
        `verify-security: expected success, observed ${result}`,
      );
    },
  );

  it("fails closed when an unplanned job unexpectedly runs and fails", () => {
    const plan = buildGithubCiCapabilityPlan({
      changedFiles: ["docs/user/setup.mdx"],
      eventName: "pull_request",
      headRef: "docs/example",
    });
    const jobResults = resultsFor(plan.expected_jobs);
    jobResults["test-windows"] = "failure";

    const evaluation = evaluateGithubCiAggregate({ plan, jobResults });
    expect(evaluation.ok).toBe(false);
    expect(evaluation.findings).toContain("test-windows: expected skipped, observed failure");
  });

  it("requires only exact-SHA recovery and release evidence for recovery dispatches", () => {
    const plan = buildGithubCiCapabilityPlan({
      changedFiles: [],
      eventName: "workflow_dispatch",
      exactShaRecovery: true,
    });
    const jobResults = resultsFor(plan.expected_jobs);

    expect(evaluateGithubCiAggregate({ plan, jobResults }).ok).toBe(true);
    jobResults["release-ready"] = "skipped";
    expect(evaluateGithubCiAggregate({ plan, jobResults }).ok).toBe(false);
  });
});
