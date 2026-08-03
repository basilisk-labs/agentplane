import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertQualificationSubjectIdentity,
  buildQualificationReport,
  qualificationExitCode,
  readQualificationManifest,
  selectQualificationScenarios,
  substituteQualificationCommand,
  validateQualificationManifest,
  validateQualificationReport,
} from "./release-qualification.mjs";
import { evaluateEfficiencyMeasurement } from "./check-v0.7.1-efficiency-evidence.mjs";
import { assertCompactAgentPacket } from "./check-v0.7.1-product-contract.mjs";
import {
  compareMatchedLatencySamples,
  validateMatchedLatencyReport,
} from "./measure-v0.7.1-matched-cli-latency.mjs";
import { validateSupervisorLatencyReport } from "./measure-v0.7.1-supervisor-latency.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const manifestPath = path.join(
  repoRoot,
  "scripts",
  "qualification",
  "v0.7.1-release-qualification.json",
);

function resultFor(scenario, status = "passed") {
  return {
    scenario,
    command: [...scenario.command],
    duration_ms: 1,
    exit_code: status === "passed" ? 0 : 1,
    signal: null,
    timed_out: false,
    status,
    log_path: path.join(repoRoot, ".agentplane", "reports", `${scenario.id}.log`),
    output_tail: "",
  };
}

function reportFor(manifest, results, mode = "audit") {
  return buildQualificationReport({
    manifest,
    manifestPath,
    repoRoot,
    mode,
    profile: "full",
    provider: results.some((result) => result.scenario.tier === "provider"),
    subject: "a".repeat(40),
    startedAt: "2026-08-02T00:00:00.000Z",
    finishedAt: "2026-08-02T00:00:01.000Z",
    results,
    sourceIdentity: { commit: "a".repeat(40), tree: "b".repeat(40), clean: true },
  });
}

function efficiencyMeasurement() {
  const evidence = JSON.parse(
    readFileSync(
      path.join(repoRoot, "scripts", "baselines", "agent-efficiency-v0.7-beta1-candidate.json"),
      "utf8",
    ),
  );
  const measurement = structuredClone(evidence.measurement);
  for (const [field, baseline] of Object.entries(measurement.baseline.actual_values.latency_ms)) {
    measurement.candidate.actual_values.latency_ms[field].mean = baseline.mean;
  }
  return measurement;
}

function matchedPhase(sampleCount = 20, offset = 0) {
  const baselineDurations = Array.from({ length: sampleCount }, (_unused, index) => 100 + index);
  const candidateDurations = baselineDurations.map((value) => value - 10 + offset);
  const command = compareMatchedLatencySamples({
    id: "quickstart",
    baselineDurations,
    candidateDurations,
    baselineExitCode: 0,
    candidateExitCode: 0,
  });
  return {
    commands: [command],
    provider_excluded_time_to_verified: {
      definition: "synthetic deterministic path",
      ...compareMatchedLatencySamples({
        id: "provider_excluded_time_to_verified",
        baselineDurations,
        candidateDurations,
        baselineExitCode: 0,
        candidateExitCode: 0,
      }),
    },
  };
}

function supervisorLatencySide(count) {
  return { sample_count: count, samples: Array.from({ length: count }, () => 100) };
}

function supervisorLatencySurfaces(count) {
  return ["external_advance", "managed_run_preparation"].map((id) => ({
    id,
    baseline: supervisorLatencySide(count),
    candidate: supervisorLatencySide(count),
  }));
}

describe("v0.7.1 release qualification contract", () => {
  it("maps every required dimension to an executable scenario", () => {
    const manifest = readQualificationManifest(manifestPath);
    assert.equal(validateQualificationManifest(manifest, { repoRoot }), manifest);
    assert.ok(manifest.scenarios.every((scenario) => scenario.command.length > 0));
  });

  it("requires every defect owner to be an existing executable task", () => {
    const manifest = readQualificationManifest(manifestPath);
    const pending = structuredClone(manifest);
    pending.scenarios[0].failure.owner_task = "PENDING-v0.7.1-owner";
    assert.throws(
      () => validateQualificationManifest(pending, { repoRoot }),
      /must be an executable AgentPlane task id/u,
    );

    const missing = structuredClone(manifest);
    missing.scenarios[0].failure.owner_task = "209901010000-AAAAAA";
    assert.throws(
      () => validateQualificationManifest(missing, { repoRoot }),
      /owner_task does not exist/u,
    );
  });

  it("binds qualification evidence to the exact clean Git subject", () => {
    const subject = "a".repeat(40);
    assert.deepEqual(
      assertQualificationSubjectIdentity({
        subject,
        head: subject,
        tree: "b".repeat(40),
        statusPorcelain: "",
      }),
      { commit: subject, tree: "b".repeat(40), clean: true },
    );
    assert.throws(
      () =>
        assertQualificationSubjectIdentity({
          subject,
          head: "c".repeat(40),
          tree: "b".repeat(40),
          statusPorcelain: "",
        }),
      /does not match repository HEAD/u,
    );
    assert.throws(
      () =>
        assertQualificationSubjectIdentity({
          subject,
          head: subject,
          tree: "b".repeat(40),
          statusPorcelain: " M packages/agentplane/src/cli.ts",
        }),
      /candidate repository must be clean/u,
    );
  });

  it("rejects an uncovered requirement", () => {
    const manifest = readQualificationManifest(manifestPath);
    const invalid = structuredClone(manifest);
    invalid.required_coverage.context_conditions.push("unknown_future_condition");
    assert.throws(
      () => validateQualificationManifest(invalid),
      /uncovered requirements: context_conditions\.unknown_future_condition/u,
    );
  });

  it("selects provider work only when explicitly requested", () => {
    const manifest = readQualificationManifest(manifestPath);
    const local = selectQualificationScenarios(manifest, {
      profile: "full",
      provider: false,
    });
    const provider = selectQualificationScenarios(manifest, {
      profile: "full",
      provider: true,
    });
    assert.equal(
      local.some((scenario) => scenario.tier === "provider"),
      false,
    );
    assert.equal(provider.filter((scenario) => scenario.tier === "provider").length, 1);
  });

  it("fails closed when a command variable is absent", () => {
    assert.throws(
      () => substituteQualificationCommand(["tool", "{subject}"], {}),
      /requires variable subject/u,
    );
    assert.deepEqual(substituteQualificationCommand(["tool", "{subject}"], { subject: "abc" }), [
      "tool",
      "abc",
    ]);
  });

  it("keeps audit execution successful while emitting a blocking defect", () => {
    const manifest = readQualificationManifest(manifestPath);
    const results = manifest.scenarios
      .filter((scenario) => scenario.tier !== "provider")
      .map((scenario) =>
        resultFor(scenario, scenario.id === "supervisor-frontends" ? "failed" : "passed"),
      );
    const report = reportFor(manifest, results, "audit");
    assert.equal(report.verdict, "blocked");
    assert.equal(report.release_ready, false);
    assert.equal(report.defects.length, 1);
    assert.equal(report.defects[0].owner_task, "202608021231-PZGG3V");
    assert.equal(qualificationExitCode(report), 0);
    assert.equal(validateQualificationReport(report), report);
  });

  it("assigns distinct executable tasks to the confirmed release blockers", () => {
    const manifest = readQualificationManifest(manifestPath);
    const confirmed = new Set([
      "supervisor-frontends",
      "efficiency-evidence",
      "matched-cli-latency",
    ]);
    const results = manifest.scenarios
      .filter((scenario) => scenario.tier !== "provider")
      .map((scenario) => resultFor(scenario, confirmed.has(scenario.id) ? "failed" : "passed"));
    const report = reportFor(manifest, results, "audit");
    const blockingOwners = report.defects
      .filter((defect) => defect.release_disposition === "block")
      .map((defect) => defect.owner_task);

    assert.equal(blockingOwners.length, 3);
    assert.equal(new Set(blockingOwners).size, blockingOwners.length);
    for (const ownerTask of blockingOwners) {
      assert.equal(
        readFileSync(
          path.join(repoRoot, ".agentplane", "tasks", ownerTask, "README.md"),
          "utf8",
        ).includes(`id: "${ownerTask}"`),
        true,
      );
    }
  });

  it("does not claim readiness from a partial successful selection", () => {
    const manifest = readQualificationManifest(manifestPath);
    const report = reportFor(manifest, [resultFor(manifest.scenarios[0])], "audit");
    assert.equal(report.verdict, "incomplete");
    assert.equal(report.local_ready, false);
    assert.equal(report.summary.local_selection_complete, false);
  });

  it("allows a gate pass only after all local and provider scenarios pass", () => {
    const manifest = readQualificationManifest(manifestPath);
    const report = reportFor(
      manifest,
      manifest.scenarios.map((scenario) => resultFor(scenario)),
      "gate",
    );
    assert.equal(report.verdict, "ready");
    assert.equal(report.release_ready, true);
    assert.equal(report.provider.status, "passed");
    assert.equal(qualificationExitCode(report), 0);
  });

  it("requires exact-subject evidence and baseline-or-better lifecycle latency", () => {
    const evidence = JSON.parse(
      readFileSync(
        path.join(repoRoot, "scripts", "baselines", "agent-efficiency-v0.7-beta1-candidate.json"),
        "utf8",
      ),
    );
    const measurement = evidence.measurement;
    const result = evaluateEfficiencyMeasurement(measurement, measurement.candidate.subject_sha);
    assert.equal(result.provider_tokens.total_reduction_ratio > 0.2, true);
    assert.deepEqual(
      result.failures.map((item) => item.metric),
      ["latency.harness_setup_latency_ms.mean", "latency.time_to_verified_result_ms.mean"],
    );

    const passing = structuredClone(measurement);
    for (const [field, baseline] of Object.entries(passing.baseline.actual_values.latency_ms)) {
      passing.candidate.actual_values.latency_ms[field].mean = baseline.mean;
    }
    assert.equal(
      evaluateEfficiencyMeasurement(passing, passing.candidate.subject_sha).verdict,
      "pass",
    );
  });

  it("rejects a token regression even when aggregate evidence is complete", () => {
    const regressed = efficiencyMeasurement();
    regressed.candidate.actual_values.provider_tokens.input_tokens =
      regressed.baseline.actual_values.provider_tokens.input_tokens + 1;
    const result = evaluateEfficiencyMeasurement(regressed, regressed.candidate.subject_sha);
    assert.equal(
      result.failures.some((item) => item.metric === "provider_tokens.input_tokens"),
      true,
    );
  });

  it("rejects verified-success, scope, and provider-independent time regressions", () => {
    const verifiedSuccess = efficiencyMeasurement();
    verifiedSuccess.candidate.actual_values.outcomes.verified_success =
      verifiedSuccess.baseline.actual_values.outcomes.verified_success - 1;
    assert.equal(
      evaluateEfficiencyMeasurement(
        verifiedSuccess,
        verifiedSuccess.candidate.subject_sha,
      ).failures.some((item) => item.metric === "outcomes.verified_success"),
      true,
    );

    const scopeViolation = efficiencyMeasurement();
    scopeViolation.candidate.actual_values.outcomes.scope_violation =
      scopeViolation.baseline.actual_values.outcomes.scope_violation + 1;
    assert.equal(
      evaluateEfficiencyMeasurement(
        scopeViolation,
        scopeViolation.candidate.subject_sha,
      ).failures.some((item) => item.metric === "outcomes.scope_violation"),
      true,
    );

    const timeToVerified = efficiencyMeasurement();
    timeToVerified.candidate.actual_values.latency_ms.time_to_verified_result_ms.mean =
      timeToVerified.baseline.actual_values.latency_ms.time_to_verified_result_ms.mean + 1;
    assert.equal(
      evaluateEfficiencyMeasurement(
        timeToVerified,
        timeToVerified.candidate.subject_sha,
      ).failures.some((item) => item.metric === "latency.time_to_verified_result_ms.mean"),
      true,
    );
  });

  it("rejects an agent packet that grows beyond the release limit", () => {
    const oversizedPacket = JSON.stringify({
      schema_version: 1,
      task_id: "202608021231-PACKET",
      transition_id: "tr_test",
      state_fingerprint: `sha256:${"a".repeat(64)}`,
      action: { kind: "agent_episode", instruction: "x".repeat(2100) },
      authority: {
        role: "CODER",
        mutation: "scoped_write",
        network: "deny",
        required: false,
        reference: null,
      },
      context_refs: [],
      stop: { reason: "semantic_boundary", resume: "request_fresh_packet" },
    });
    assert.throws(() => assertCompactAgentPacket(oversizedPacket), /maximum is 2048/u);
  });

  it("requires distinct frozen cold and warm sample sets with at least 20 pairs", () => {
    const report = {
      schema_version: 2,
      kind: "agentplane.v0.7.1_matched_cli_latency",
      phases: { cold: matchedPhase(20, 0), warm: matchedPhase(20, 1) },
    };
    assert.equal(validateMatchedLatencyReport(report), report);
    assert.notDeepEqual(
      report.phases.cold.commands[0].candidate.samples_ms,
      report.phases.warm.commands[0].candidate.samples_ms,
    );

    const missingWarm = structuredClone(report);
    delete missingWarm.phases.warm;
    assert.throws(() => validateMatchedLatencyReport(missingWarm), /omits warm commands/u);

    const insufficientCold = structuredClone(report);
    insufficientCold.phases.cold = matchedPhase(19);
    assert.throws(() => validateMatchedLatencyReport(insufficientCold), /requires 20 samples/u);
  });

  it("gates matched CLI latency on median and p95", () => {
    const passing = compareMatchedLatencySamples({
      id: "quickstart",
      baselineDurations: [100, 101, 102, 103, 104, 105, 106],
      candidateDurations: [90, 91, 92, 93, 94, 95, 96],
      baselineExitCode: 0,
      candidateExitCode: 0,
    });
    const failing = compareMatchedLatencySamples({
      id: "quickstart",
      baselineDurations: [100, 101, 102, 103, 104, 105, 106],
      candidateDurations: [104, 105, 106, 107, 108, 109, 110],
      baselineExitCode: 0,
      candidateExitCode: 0,
    });
    const failingP95 = compareMatchedLatencySamples({
      id: "quickstart",
      baselineDurations: [100, 101, 102, 103, 104, 105, 106],
      candidateDurations: [90, 91, 92, 93, 94, 95, 130],
      baselineExitCode: 0,
      candidateExitCode: 0,
    });
    assert.equal(passing.verdict, "pass");
    assert.equal(failing.verdict, "fail");
    assert.equal(failingP95.verdict, "fail");
    assert.equal(failing.delta_ms, 4);
  });

  it("requires 10 cold and 30 warm supervisor samples for both public frontends", () => {
    const report = {
      schema_version: 1,
      kind: "agentplane.v0.7.1_supervisor_latency",
      phases: { cold: supervisorLatencySurfaces(10), warm: supervisorLatencySurfaces(30) },
    };

    assert.equal(validateSupervisorLatencyReport(report), report);
    const insufficient = structuredClone(report);
    insufficient.phases.warm[0].candidate.sample_count = 29;
    assert.throws(
      () => validateSupervisorLatencyReport(insufficient),
      /warm\.external_advance\.candidate requires 30 samples/u,
    );
  });
});
