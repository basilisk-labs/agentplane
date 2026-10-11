import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
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

const digest = (bytes: string) => createHash("sha256").update(bytes).digest("hex");

describe("GitHub CI aggregate file transport", () => {
  const script = path.resolve("scripts/checks/evaluate-github-ci.mjs");
  function runFile(input: {
    bytes: string;
    digest?: string;
    write?: boolean;
    results?: Record<string, string>;
  }) {
    const directory = mkdtempSync(path.join(os.tmpdir(), "ci-plan-transport-"));
    try {
      const file = path.join(directory, "plan.json");
      if (input.write !== false) writeFileSync(file, input.bytes);
      return spawnSync(process.execPath, [script], {
        encoding: "utf8",
        maxBuffer: 8 * 1024 * 1024,
        env: {
          ...process.env,
          GITHUB_STEP_SUMMARY: "",
          AGENTPLANE_CI_PLAN_JSON: "",
          AGENTPLANE_CI_PLAN_FILE: file,
          AGENTPLANE_CI_PLAN_SHA256: input.digest ?? digest(input.bytes),
          AGENTPLANE_CI_RESULTS_JSON: JSON.stringify(input.results ?? {}),
        },
      });
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  }
  it("evaluates a complete genuine plan larger than128KiB through a small process environment", () => {
    const plan = buildGithubCiCapabilityPlan({
      changedFiles: Array.from(
        { length: 2000 },
        (_, i) => `packages/agentplane/src/commands/task/large-public-change-${i}.ts`,
      ),
      eventName: "pull_request",
      headRef: "task/large-plan",
    });
    const bytes = JSON.stringify(plan);
    expect(Buffer.byteLength(bytes)).toBeGreaterThan(128 * 1024);
    const result = runFile({ bytes, results: resultsFor(plan.expected_jobs) });
    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    const output = JSON.parse(result.stdout) as { plan: unknown; evaluation: GithubCiEvaluation };
    expect(output.plan).toEqual(plan);
    expect(output.evaluation).toMatchObject({ ok: true, findings: [] });
  });
  it.each([
    ["missing file", { write: false }, "ENOENT"],
    ["missing digest", { digest: "" }, "AGENTPLANE_CI_PLAN_SHA256"],
    ["malformed digest", { digest: "not-a-digest" }, "AGENTPLANE_CI_PLAN_SHA256"],
    ["changed bytes", { digest: "0".repeat(64) }, "digest mismatch"],
    ["malformed JSON", { bytes: "{" }, "JSON"],
  ] as const)("rejects %s before aggregate acceptance", (_name, override, message) => {
    const result = runFile({ bytes: "{}", ...override });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain(message);
  });
  it.each(["failure", "missing"])("keeps the planned-job gate for %s results", (state) => {
    const plan = buildGithubCiCapabilityPlan({
      changedFiles: [".github/workflows/ci.yml"],
      eventName: "pull_request",
    });
    const results = resultsFor(plan.expected_jobs);
    if (state === "missing") delete results["verify-tests"];
    else results["verify-tests"] = state;
    const result = runFile({ bytes: JSON.stringify(plan), results });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain("PR verification failed closed");
  });
});
