import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { describe, it } from "node:test";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertQualificationSubjectIdentity,
  buildQualificationReport,
  assertProviderEquivalentChangedPaths,
  qualificationExitCode,
  qualificationEvidenceStatusPathspec,
  readQualificationManifest,
  readQualificationSubjectIdentity,
  selectQualificationScenarios,
  substituteQualificationCommand,
  validateQualificationManifest,
  validateQualificationReport,
} from "./release-qualification.mjs";
import { evaluateEfficiencyMeasurement } from "./check-v0.7.1-efficiency-evidence.mjs";
import {
  assertCompactAgentPacket,
  assertLegacyAdapterRetirementContract,
} from "./check-v0.7.1-product-contract.mjs";
import { blockingCandidateFailureIds } from "../bench/capture-agent-efficiency-candidate.mjs";
import {
  collapseMatchedLatencyReplicates,
  compareMatchedLatencySamples,
  createMatchedLatencyTempRoot,
  matchedInvocationOrder,
  validateMatchedLatencyReport,
} from "./measure-v0.7.1-matched-cli-latency.mjs";
import {
  collapseSupervisorLatencyReplicates,
  compareSupervisorLatencySamples,
  summarizeGitCommandHistogram,
  supervisorInvocationOrder,
  supervisorLatencyMeasurementEnvironment,
  validateSupervisorLatencyReport,
} from "./measure-v0.7.1-supervisor-latency.mjs";
import {
  preflightQualificationProviderRuntime,
  QUALIFICATION_CODEX_CLI_VERSION,
  readQualificationRunSubjectIdentity,
  runQualificationScenarios,
} from "./run-v0.7.1-release-qualification.mjs";
import {
  CODEX_REPLAY_BINARY_ENV,
  CODEX_REPLAY_CLI_VERSION_ENV,
} from "../bench/internal/agent-efficiency-codex-runtime.mjs";
import {
  assertPackagedMixedScopeEvidence,
  PackagedMixedScopeContractError,
} from "./check-packaged-mixed-scope-lifecycle.mjs";

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
  return {
    sample_count: count,
    samples: Array.from({ length: count }, () => 100),
    raw_invocation_count: count * 3,
    raw_invocation_durations_ms: Array.from({ length: count * 3 }, () => 100),
    replicates_per_logical_sample: 3,
    git_subprocess_count: { samples: Array.from({ length: count }, () => 2) },
    git_command_histogram: {
      total_count: count * 2,
      unique_count: 2,
      commands: [
        { command: "rev-parse HEAD", count },
        { command: "status --porcelain", count },
      ],
    },
  };
}

function supervisorLatencySurfaces(count) {
  return ["external_advance", "managed_run_preparation"].map((id) => ({
    id,
    baseline: supervisorLatencySide(count),
    candidate: supervisorLatencySide(count),
  }));
}

function supervisorLatencySample(duration_ms) {
  return {
    duration_ms,
    exit_code: 0,
    git_commands: [],
    logical_subprocess_count: 1,
    git_subprocess_count: 0,
    repository_scan_count: 0,
    git_snapshot_count: 0,
    preparation_cache: {},
    packet_bytes: 1,
    prepared_context_bytes: 1,
    stderr: "",
  };
}

describe("v0.7.1 release qualification contract", () => {
  it("keeps the installed mixed-scope scenario blocking, bounded, and selectable", () => {
    const manifest = readQualificationManifest(manifestPath);
    const scenario = manifest.scenarios.find(
      (candidate) => candidate.id === "packaged-mixed-scope-lifecycle",
    );
    assert.ok(scenario);
    assert.equal(scenario.tier, "full");
    assert.equal(scenario.timeout_ms, 900_000);
    assert.equal(scenario.failure.release_disposition, "block");
    assert.deepEqual(scenario.coverage.workflow_modes, ["direct"]);
    assert.deepEqual(scenario.coverage.supervisor_frontends, ["external_advance"]);
    assert.deepEqual(scenario.coverage.lifecycle_states, [
      "planned",
      "ready",
      "doing",
      "verified",
      "done",
    ]);
    assert.deepEqual(
      selectQualificationScenarios(manifest, {
        profile: "full",
        provider: false,
        scenarioIds: ["packaged-mixed-scope-lifecycle"],
      }).map((candidate) => candidate.id),
      ["packaged-mixed-scope-lifecycle"],
    );
  });

  it("fails the installed mixed-scope contract for every omitted lifecycle proof", () => {
    const fixtureRepo = path.join(tmpdir(), "agentplane-mixed-scope-contract-fixture");
    const valid = {
      plan_bytes: 4_219,
      phase_roles: ["PLANNER", "EXECUTOR", "TESTER:supervisor_owned", "EVALUATOR"],
      fixture_repo: fixtureRepo,
      changed_paths: [".gitignore", "docs/guide.md", "src/greeting.mjs", "test/greeting.test.mjs"],
      verification: { phase: "TESTER", state: "ok" },
      evaluator: { phase: "EVALUATOR", state: "pass" },
      commit: { task_commit: "a".repeat(40) },
      finish: { status: "DONE", terminal: true },
      stale_exchange: { rejected: true },
      access_log: [],
      temp_cleanup: true,
      final_git_status: "",
    };
    assert.equal(assertPackagedMixedScopeEvidence(valid), valid);

    const cases = [
      ["missing_planner", (value) => (value.plan_bytes = 3_072)],
      ["missing_executor", (value) => (value.phase_roles = ["PLANNER", "EVALUATOR"])],
      ["missing_code", (value) => value.changed_paths.splice(2, 1)],
      ["missing_tests", (value) => value.changed_paths.pop()],
      ["missing_docs", (value) => value.changed_paths.splice(1, 1)],
      ["missing_metadata", (value) => value.changed_paths.shift()],
      ["missing_verification", (value) => (value.verification.state = "missing")],
      ["missing_evaluator", (value) => (value.evaluator.state = "missing")],
      ["missing_commit", (value) => (value.commit.task_commit = "")],
      ["missing_finish", (value) => (value.finish.terminal = false)],
      ["stale_exchange_accepted", (value) => (value.stale_exchange.rejected = false)],
      [
        "internal_artifact_access",
        (value) =>
          value.access_log.push({
            operation: "read",
            path: path.join(fixtureRepo, ".agentplane", "tasks", "README.md"),
            purpose: "forbidden",
          }),
      ],
      ["temporary_state_leaked", (value) => (value.temp_cleanup = false)],
    ];
    for (const [expectedCode, mutate] of cases) {
      const incomplete = structuredClone(valid);
      mutate(incomplete);
      assert.throws(
        () => assertPackagedMixedScopeEvidence(incomplete),
        (error) => error instanceof PackagedMixedScopeContractError && error.code === expectedCode,
        expectedCode,
      );
    }
  });

  it("gates supervisor latency on paired ratios instead of unrelated host-load tails", () => {
    const hostLoad = [100, 100, 100, 100, 100, 500, 500, 500, 500, 500];
    const stable = compareSupervisorLatencySamples(
      "managed_run_preparation",
      hostLoad.map((duration) => supervisorLatencySample(duration)),
      hostLoad.map((duration) => supervisorLatencySample(duration * 1.05)),
    );
    const regressed = compareSupervisorLatencySamples(
      "managed_run_preparation",
      hostLoad.map((duration) => supervisorLatencySample(duration)),
      hostLoad.map((duration, index) =>
        supervisorLatencySample(duration * (index === 0 ? 1.05 : 1.15)),
      ),
    );

    assert.equal(stable.verdict, "pass");
    assert.equal(stable.paired_comparison.median_increase_ratio, 0.05);
    assert.equal(stable.paired_comparison.p95_increase_ratio, 0.05);
    assert.equal(regressed.verdict, "fail");
    assert.equal(regressed.paired_comparison.p95_increase_ratio, 0.15);
  });

  it("excludes candidate-only preparation tracing from supervisor latency samples", () => {
    const environment = supervisorLatencyMeasurementEnvironment("/tmp/probe.log", "/tmp/probe");
    assert.equal(environment.AGENTPLANE_TRACE, "0");
    assert.equal(environment.AGENTPLANE_BENCH_PROCESS_LOG, "/tmp/probe.log");
    assert.equal(environment.PATH, "/tmp/probe:/usr/bin:/bin");
  });

  it("uses balanced replicated supervisor samples and fails closed on any invocation", () => {
    const baseline = ["baseline"];
    const candidate = ["candidate"];
    assert.deepEqual(supervisorInvocationOrder(0, 0, baseline, candidate), [baseline, candidate]);
    assert.deepEqual(supervisorInvocationOrder(0, 1, baseline, candidate), [candidate, baseline]);
    assert.deepEqual(supervisorInvocationOrder(1, 0, baseline, candidate), [candidate, baseline]);

    const median = collapseSupervisorLatencyReplicates([
      supervisorLatencySample(100),
      supervisorLatencySample(900),
      supervisorLatencySample(101),
    ]);
    assert.equal(median.duration_ms, 101);
    const failedSample = { ...supervisorLatencySample(102), exit_code: 1, stderr: "boom" };
    assert.equal(
      collapseSupervisorLatencyReplicates([
        supervisorLatencySample(100),
        failedSample,
        supervisorLatencySample(101),
      ]),
      failedSample,
    );
    assert.throws(
      () => collapseSupervisorLatencyReplicates([supervisorLatencySample(100)]),
      /odd number of at least 3 replicates/u,
    );
  });

  it("pins the canonical provider gate to the reviewed Codex runtime", () => {
    const packageJson = JSON.parse(readFileSync(path.join(repoRoot, "package.json"), "utf8"));
    assert.equal(
      packageJson.scripts["e2e:v0.7.1:gate"],
      `node scripts/qualification/run-v0.7.1-release-qualification.mjs --mode gate --profile full --provider --codex-version ${QUALIFICATION_CODEX_CLI_VERSION}`,
    );
  });

  it("runs independent scenarios concurrently while preserving dependency barriers and report order", async () => {
    const scenarios = [
      { id: "slow", tier: "core" },
      { id: "fast", tier: "core" },
      { id: "dependent", tier: "full", depends_on: ["slow"] },
      { id: "provider", tier: "provider" },
    ];
    const events = [];
    let active = 0;
    let maximumActive = 0;
    const delays = { dependent: 1, fast: 5, provider: 1, slow: 20 };
    const results = await runQualificationScenarios(scenarios, {}, "/unused", {
      concurrency: 2,
      async scenarioRunner(scenario) {
        active += 1;
        maximumActive = Math.max(maximumActive, active);
        events.push(`start:${scenario.id}`);
        await new Promise((resolve) => setTimeout(resolve, delays[scenario.id]));
        events.push(`finish:${scenario.id}`);
        active -= 1;
        return scenario.id;
      },
    });

    assert.equal(maximumActive, 2);
    assert.deepEqual(results, ["slow", "fast", "dependent", "provider"]);
    assert.ok(events.indexOf("finish:slow") < events.indexOf("start:dependent"));
    assert.ok(events.indexOf("finish:fast") < events.indexOf("start:provider"));
    assert.ok(events.indexOf("finish:dependent") < events.indexOf("start:provider"));
    await assert.rejects(
      () => runQualificationScenarios(scenarios, {}, "/unused", { concurrency: 0 }),
      /qualification concurrency must be an integer >= 1/u,
    );
  });

  it("runs latency measurements exclusively without disabling other concurrency", async () => {
    const scenarios = [
      { id: "slow", tier: "core", depends_on: [] },
      { id: "fast", tier: "core", depends_on: [] },
      { id: "matched-cli-latency", tier: "full", depends_on: [] },
      { id: "after-a", tier: "full", depends_on: [] },
      { id: "after-b", tier: "full", depends_on: [] },
    ];
    const events = [];
    let active = 0;
    let maximumActive = 0;
    const delays = { "after-a": 5, "after-b": 5, fast: 5, "matched-cli-latency": 5, slow: 20 };
    const results = await runQualificationScenarios(scenarios, {}, "/unused", {
      concurrency: 2,
      async scenarioRunner(scenario) {
        active += 1;
        maximumActive = Math.max(maximumActive, active);
        events.push(`start:${scenario.id}:${active}`);
        await new Promise((resolve) => setTimeout(resolve, delays[scenario.id]));
        events.push(`finish:${scenario.id}:${active}`);
        active -= 1;
        return scenario.id;
      },
    });

    assert.equal(maximumActive, 2);
    assert.deepEqual(
      results,
      scenarios.map((scenario) => scenario.id),
    );
    assert.ok(events.indexOf("finish:slow:1") < events.indexOf("start:matched-cli-latency:1"));
    assert.ok(events.indexOf("finish:fast:2") < events.indexOf("start:matched-cli-latency:1"));
    assert.ok(events.indexOf("finish:matched-cli-latency:1") < events.indexOf("start:after-a:1"));
    assert.ok(events.indexOf("finish:matched-cli-latency:1") < events.indexOf("start:after-b:2"));
  });

  it("does not overlap internally parallel suites with other qualification work", async () => {
    const scenarios = [
      { id: "before-a", tier: "core", depends_on: [] },
      { id: "before-b", tier: "core", depends_on: [] },
      { id: "critical-cli", tier: "full", depends_on: [] },
      { id: "after-a", tier: "full", depends_on: [] },
      { id: "after-b", tier: "full", depends_on: [] },
    ];
    const events = [];
    let active = 0;
    const results = await runQualificationScenarios(scenarios, {}, "/unused", {
      concurrency: 2,
      async scenarioRunner(scenario) {
        active += 1;
        events.push(`start:${scenario.id}:${active}`);
        await new Promise((resolve) => setTimeout(resolve, scenario.id === "before-a" ? 20 : 5));
        events.push(`finish:${scenario.id}:${active}`);
        active -= 1;
        return scenario.id;
      },
    });

    assert.deepEqual(
      results,
      scenarios.map((scenario) => scenario.id),
    );
    assert.ok(events.indexOf("finish:before-a:1") < events.indexOf("start:critical-cli:1"));
    assert.ok(events.indexOf("finish:before-b:2") < events.indexOf("start:critical-cli:1"));
    assert.ok(events.indexOf("finish:critical-cli:1") < events.indexOf("start:after-a:1"));
    assert.ok(events.indexOf("finish:critical-cli:1") < events.indexOf("start:after-b:2"));
  });

  it("does not overlap packaged candidate builds with CLI readers", async () => {
    const scenarios = [
      { id: "reader-before", tier: "core", depends_on: [] },
      { id: "packaged-candidate-flow", tier: "full", depends_on: [] },
      { id: "packaged-mixed-scope-lifecycle", tier: "full", depends_on: [] },
      { id: "reader-after", tier: "core", depends_on: [] },
    ];
    const events = [];
    let active = 0;
    await runQualificationScenarios(scenarios, {}, "/unused", {
      concurrency: 2,
      async scenarioRunner(scenario) {
        active += 1;
        events.push(`start:${scenario.id}:${active}`);
        await new Promise((resolve) => setTimeout(resolve, 5));
        events.push(`finish:${scenario.id}:${active}`);
        active -= 1;
        return scenario.id;
      },
    });

    assert.ok(
      events.indexOf("finish:reader-before:1") < events.indexOf("start:packaged-candidate-flow:1"),
    );
    assert.ok(
      events.indexOf("finish:packaged-candidate-flow:1") < events.indexOf("start:reader-after:1"),
    );
    assert.ok(
      events.indexOf("finish:packaged-candidate-flow:1") <
        events.indexOf("start:packaged-mixed-scope-lifecycle:1"),
    );
    assert.ok(
      events.indexOf("finish:packaged-mixed-scope-lifecycle:1") <
        events.indexOf("start:reader-after:1"),
    );
  });

  it("stops queued work after failure and settles active work without starting dependents", async () => {
    const scenarios = [
      { id: "prerequisite", tier: "core", depends_on: [] },
      { id: "active", tier: "core", depends_on: [] },
      { id: "queued-a", tier: "core", depends_on: [] },
      { id: "queued-b", tier: "core", depends_on: [] },
      { id: "dependent", tier: "full", depends_on: ["prerequisite"] },
      { id: "provider", tier: "provider", depends_on: [] },
    ];
    const started = [];
    let activeSettled = false;

    await assert.rejects(
      () =>
        runQualificationScenarios(scenarios, {}, "/unused", {
          concurrency: 2,
          async scenarioRunner(scenario) {
            started.push(scenario.id);
            if (scenario.id === "prerequisite") {
              await new Promise((resolve) => setTimeout(resolve, 5));
              throw new Error("qualification infrastructure failed");
            }
            await new Promise((resolve) => setTimeout(resolve, 20));
            activeSettled = true;
            return scenario.id;
          },
        }),
      /qualification infrastructure failed/u,
    );

    assert.equal(activeSettled, true);
    assert.deepEqual(started, ["prerequisite", "active"]);
  });

  it("excludes disposable matched-latency fixtures from host indexing", () => {
    const tempRoot = createMatchedLatencyTempRoot(tmpdir());
    try {
      assert.equal(readFileSync(path.join(tempRoot, ".metadata_never_index"), "utf8"), "");
    } finally {
      rmSync(tempRoot, { recursive: true, force: true });
    }
  });

  it("preflights the exact provider runtime only before provider execution", () => {
    const calls = [];
    const baselineCalls = [];
    const verify = (source) => {
      calls.push(source);
      return "0.146.0-alpha.3.1";
    };
    const verifyBaseline = (source) => {
      baselineCalls.push(source);
      return {};
    };
    const base = {
      codexVersion: "0.146.0-alpha.3.1",
      dryRun: false,
      provider: false,
      providerEvidenceSubject: "a".repeat(40),
      subject: "a".repeat(40),
    };
    const localScenarios = [{ id: "typecheck", tier: "full" }];
    const providerScenarios = [{ id: "provider-matrix", tier: "provider" }];

    assert.equal(preflightQualificationProviderRuntime(base, localScenarios, verify), null);
    assert.equal(
      preflightQualificationProviderRuntime(
        { ...base, dryRun: true, provider: true },
        providerScenarios,
        verify,
      ),
      null,
    );
    assert.equal(
      preflightQualificationProviderRuntime({ ...base, provider: true }, localScenarios, verify),
      null,
    );
    assert.equal(
      preflightQualificationProviderRuntime(
        { ...base, provider: true },
        providerScenarios,
        verify,
        verifyBaseline,
      ),
      "0.146.0-alpha.3.1",
    );
    assert.deepEqual(calls, [
      {
        [CODEX_REPLAY_CLI_VERSION_ENV]: "0.146.0-alpha.3.1",
        ...(process.env[CODEX_REPLAY_BINARY_ENV]
          ? { [CODEX_REPLAY_BINARY_ENV]: process.env[CODEX_REPLAY_BINARY_ENV] }
          : {}),
      },
    ]);
    assert.deepEqual(baselineCalls, [
      {
        codexCliVersion: "0.146.0-alpha.3.1",
        evidencePath: path.join(
          repoRoot,
          "scripts",
          "baselines",
          "agent-efficiency-v0.7-beta1-candidate.json",
        ),
      },
    ]);

    const equivalenceCalls = [];
    preflightQualificationProviderRuntime(
      {
        ...base,
        provider: true,
        subject: "b".repeat(40),
        providerEvidenceSubject: "a".repeat(40),
      },
      providerScenarios,
      verify,
      verifyBaseline,
      (...args) => equivalenceCalls.push(args),
    );
    assert.deepEqual(equivalenceCalls, [[repoRoot, "a".repeat(40), "b".repeat(40)]]);

    const mismatch = Object.assign(new Error("CODEX_VERSION_MISMATCH"), {
      code: "CODEX_VERSION_MISMATCH",
    });
    assert.throws(
      () =>
        preflightQualificationProviderRuntime(
          { ...base, provider: true },
          providerScenarios,
          () => {
            throw mismatch;
          },
          verifyBaseline,
        ),
      (error) => error === mismatch,
    );
  });

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

  it("lets the qualification runner ignore only its active nested evidence directory", () => {
    const root = mkdtempSync(path.join(tmpdir(), "agentplane-qualification-clean-"));
    const git = (...args) =>
      execFileSync("git", args, {
        cwd: root,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      }).trim();
    try {
      git("init", "--quiet");
      const sourceDirectory = path.join(root, "packages", "agentplane", "src");
      mkdirSync(sourceDirectory, { recursive: true });
      writeFileSync(path.join(root, "candidate.txt"), "candidate\n", "utf8");
      writeFileSync(path.join(sourceDirectory, "index.ts"), "export {};\n", "utf8");
      git("add", "candidate.txt", "packages/agentplane/src/index.ts");
      git(
        "-c",
        "user.name=AgentPlane",
        "-c",
        "user.email=agentplane@example.invalid",
        "commit",
        "--quiet",
        "-m",
        "candidate",
      );
      const subject = git("rev-parse", "HEAD");
      const evidenceDirectory = path.join(root, ".agentplane", "reports", "qualification");
      mkdirSync(evidenceDirectory, { recursive: true });
      writeFileSync(path.join(evidenceDirectory, "scenario.log"), "evidence\n", "utf8");

      const expected = { commit: subject, tree: git("rev-parse", "HEAD^{tree}"), clean: true };
      assert.deepEqual(
        readQualificationSubjectIdentity(root, subject, { evidenceDirectory }),
        expected,
      );
      assert.deepEqual(
        readQualificationRunSubjectIdentity(root, subject, evidenceDirectory),
        expected,
      );
      writeFileSync(path.join(root, "unrelated.txt"), "dirty\n", "utf8");
      assert.throws(
        () => readQualificationRunSubjectIdentity(root, subject, evidenceDirectory),
        /candidate repository must be clean/u,
      );
      rmSync(path.join(root, "unrelated.txt"), { force: true });
      rmSync(evidenceDirectory, { recursive: true, force: true });

      const taskEvidenceDirectory = path.join(
        root,
        ".agentplane",
        "tasks",
        "202608032207-V8HMV8",
        "evidence",
      );
      mkdirSync(taskEvidenceDirectory, { recursive: true });
      writeFileSync(path.join(taskEvidenceDirectory, "scenario.log"), "evidence\n", "utf8");
      assert.deepEqual(
        readQualificationRunSubjectIdentity(root, subject, taskEvidenceDirectory),
        expected,
      );
      rmSync(taskEvidenceDirectory, { recursive: true, force: true });

      writeFileSync(path.join(sourceDirectory, "index.ts"), "export const dirty = true;\n", "utf8");
      assert.throws(
        () => readQualificationRunSubjectIdentity(root, subject, sourceDirectory),
        /out-dir must use \.agentplane\/reports/u,
      );
      assert.throws(
        () => qualificationEvidenceStatusPathspec(root, root),
        /evidence directory must be nested/u,
      );
      assert.throws(
        () => qualificationEvidenceStatusPathspec(root, path.dirname(root)),
        /evidence directory must be nested/u,
      );
      assert.throws(
        () => readQualificationRunSubjectIdentity(root, subject, root),
        /out-dir must be nested/u,
      );
      assert.throws(
        () => readQualificationRunSubjectIdentity(root, subject, path.dirname(root)),
        /out-dir must be nested/u,
      );
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
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
    const localIds = local.map((scenario) => scenario.id);
    const providerIds = provider.map((scenario) => scenario.id);
    assert.equal(localIds.includes("provider-matrix"), false);
    assert.equal(localIds.includes("efficiency-evidence"), false);
    assert.equal(provider.filter((scenario) => scenario.tier === "provider").length, 1);
    assert.ok(providerIds.indexOf("provider-matrix") < providerIds.indexOf("efficiency-evidence"));
    const providerCommand = provider.find((scenario) => scenario.id === "provider-matrix").command;
    assert.ok(providerCommand.includes("--baseline-evidence"));
    assert.equal(providerCommand.includes("--runtime-bridge"), false);
    assert.ok(providerCommand.includes("{providerAction}"));
    assert.ok(providerCommand.includes("{providerSubject}"));
  });

  it("reuses provider evidence only across explicit provider-runtime-equivalent changes", () => {
    assert.deepEqual(
      assertProviderEquivalentChangedPaths([
        ".github/workflows/publish.yml",
        ".agentplane/tasks/202608041322-M26FS0/README.md",
        "scripts/qualification/check-v0.7.1-efficiency-evidence.mjs",
        "scripts/qualification/release-qualification.test.mjs",
      ]),
      [
        ".agentplane/tasks/202608041322-M26FS0/README.md",
        ".github/workflows/publish.yml",
        "scripts/qualification/check-v0.7.1-efficiency-evidence.mjs",
        "scripts/qualification/release-qualification.test.mjs",
      ],
    );
    assert.throws(
      () => assertProviderEquivalentChangedPaths(["packages/agentplane/src/cli/index.ts"]),
      /runtime-affecting changes/u,
    );
  });

  it("fails closed when an explicit scenario omits its dependency", () => {
    const manifest = readQualificationManifest(manifestPath);
    assert.throws(
      () =>
        selectQualificationScenarios(manifest, {
          profile: "full",
          provider: false,
          scenarioIds: ["efficiency-evidence"],
        }),
      /efficiency-evidence -> provider-matrix.*include each dependency with --scenario/u,
    );
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

  it("keeps RF-04 harness timing diagnostic while gating tokens and outcomes", () => {
    const evidence = JSON.parse(
      readFileSync(
        path.join(repoRoot, "scripts", "baselines", "agent-efficiency-v0.7-beta1-candidate.json"),
        "utf8",
      ),
    );
    const measurement = evidence.measurement;
    const result = evaluateEfficiencyMeasurement(measurement, measurement.candidate.subject_sha);
    assert.equal(result.provider_tokens.total_reduction_ratio > 0.2, true);
    assert.equal(result.verdict, "pass");
    assert.deepEqual(
      result.latency_ms.diagnostics.map((item) => item.metric),
      ["latency.harness_setup_latency_ms.mean", "latency.time_to_verified_result_ms.mean"],
    );
    assert.deepEqual(blockingCandidateFailureIds(measurement, "diagnostic_only_never_gated"), []);
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

  it("rejects verified-success and scope regressions without gating RF-04 harness timing", () => {
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
    const timingResult = evaluateEfficiencyMeasurement(
      timeToVerified,
      timeToVerified.candidate.subject_sha,
    );
    assert.equal(timingResult.verdict, "pass");
    assert.equal(
      timingResult.latency_ms.diagnostics.some(
        (item) => item.metric === "latency.time_to_verified_result_ms.mean",
      ),
      true,
    );

    const timingCoverage = efficiencyMeasurement();
    timingCoverage.candidate.actual_values.latency_ms.time_to_first_scoped_mutation_ms.sample_count =
      timingCoverage.baseline.actual_values.latency_ms.time_to_first_scoped_mutation_ms
        .sample_count - 2;
    const timingCoverageResult = evaluateEfficiencyMeasurement(
      timingCoverage,
      timingCoverage.candidate.subject_sha,
    );
    assert.equal(timingCoverageResult.verdict, "pass");
    assert.equal(
      timingCoverageResult.latency_ms.diagnostics.some(
        (item) => item.metric === "latency.time_to_first_scoped_mutation_ms.sample_count",
      ),
      true,
    );
  });

  it("rejects an agent packet that grows beyond the release limit", () => {
    const oversizedPacket = JSON.stringify({
      schema_version: 1,
      task_id: "202608021231-PACKET",
      transition_id: "tr_test",
      state_fingerprint: `sha256:${"a".repeat(64)}`,
      action: { kind: "agent_episode", instruction: "x".repeat(9000) },
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
    assert.throws(() => assertCompactAgentPacket(oversizedPacket), /maximum is 8192/u);
  });

  it("accepts permanent historical readers without a removal deadline or blocker", () => {
    assert.doesNotThrow(() =>
      assertLegacyAdapterRetirementContract({
        remove_in: null,
        removal_blocker: null,
        retirement_policy: { kind: "permanent_historical_reader" },
      }),
    );
    assert.throws(() =>
      assertLegacyAdapterRetirementContract({
        remove_in: null,
        removal_blocker: null,
        retirement_policy: { kind: "support_window" },
      }),
    );
  });

  it("requires distinct frozen cold and warm sample sets with at least 20 pairs", () => {
    const report = {
      schema_version: 2,
      kind: "agentplane.v0.7.1_matched_cli_latency",
      sample_contract: { invocations_per_side_per_logical_sample: 3 },
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

    const missingReplicates = structuredClone(report);
    delete missingReplicates.sample_contract.invocations_per_side_per_logical_sample;
    assert.throws(
      () => validateMatchedLatencyReport(missingReplicates),
      /requires an odd replicate count >= 3/u,
    );

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
    assert.equal(failing.paired_comparison.confirmed_median_regression, true);
  });

  it("does not block on an unconfirmed sub-noise median movement", () => {
    const baselineDurations = Array.from({ length: 20 }, () => 400);
    const candidateDurations = [
      ...Array.from({ length: 11 }, () => 405),
      ...Array.from({ length: 9 }, () => 395),
    ];
    const comparison = compareMatchedLatencySamples({
      id: "task_next",
      baselineDurations,
      candidateDurations,
      baselineExitCode: 0,
      candidateExitCode: 0,
    });

    assert.equal(comparison.paired_comparison.median_delta_ms, 5);
    assert.equal(comparison.paired_comparison.confirmed_median_regression, false);
    assert.equal(comparison.verdict, "pass");
  });

  it("uses balanced replicated logical samples with a zero paired-median target", () => {
    const baseline = ["baseline"];
    const candidate = ["candidate"];
    assert.deepEqual(matchedInvocationOrder(0, 0, baseline, candidate), [baseline, candidate]);
    assert.deepEqual(matchedInvocationOrder(0, 1, baseline, candidate), [candidate, baseline]);
    assert.deepEqual(matchedInvocationOrder(1, 0, baseline, candidate), [candidate, baseline]);
    assert.deepEqual(matchedInvocationOrder(1, 1, baseline, candidate), [baseline, candidate]);

    assert.deepEqual(
      collapseMatchedLatencyReplicates([
        { duration_ms: 100, exit_code: 0, signal: null, stderr: "" },
        { duration_ms: 900, exit_code: 0, signal: null, stderr: "" },
        { duration_ms: 101, exit_code: 0, signal: null, stderr: "" },
      ]),
      { duration_ms: 101, exit_code: 0, signal: null, stderr: "" },
    );
    const failed = collapseMatchedLatencyReplicates([
      { duration_ms: 100, exit_code: 0, signal: null, stderr: "" },
      { duration_ms: 101, exit_code: 1, signal: null, stderr: "boom" },
      { duration_ms: 102, exit_code: 0, signal: null, stderr: "" },
    ]);
    assert.equal(failed.exit_code, 1);
    assert.equal(failed.stderr, "boom");
    assert.throws(
      () => collapseMatchedLatencyReplicates([{ duration_ms: 100, exit_code: 0 }]),
      /odd number of at least 3 replicates/u,
    );
  });

  it("requires 20 replicated logical samples and 60 raw invocations per supervisor side", () => {
    const report = {
      schema_version: 1,
      kind: "agentplane.v0.7.1_supervisor_latency",
      phases: { cold: supervisorLatencySurfaces(20), warm: supervisorLatencySurfaces(20) },
    };

    assert.equal(validateSupervisorLatencyReport(report), report);
    const insufficientCold = structuredClone(report);
    insufficientCold.phases.cold[0].candidate.sample_count = 10;
    insufficientCold.phases.cold[0].candidate.samples = Array.from({ length: 10 }, () => 100);
    assert.throws(
      () => validateSupervisorLatencyReport(insufficientCold),
      /cold\.external_advance\.candidate requires 20 logical samples/u,
    );
    const insufficient = structuredClone(report);
    insufficient.phases.warm[0].candidate.raw_invocation_count = 59;
    assert.throws(
      () => validateSupervisorLatencyReport(insufficient),
      /warm\.external_advance\.candidate requires at least 60 raw invocations/u,
    );
  });

  it("records deterministic Git command histograms outside duration samples", () => {
    assert.deepEqual(
      summarizeGitCommandHistogram([
        { git_commands: ["status --porcelain", "rev-parse HEAD"] },
        { git_commands: ["rev-parse HEAD", "status --porcelain"] },
      ]),
      {
        total_count: 4,
        unique_count: 2,
        commands: [
          { command: "rev-parse HEAD", count: 2 },
          { command: "status --porcelain", count: 2 },
        ],
      },
    );

    const report = {
      schema_version: 1,
      kind: "agentplane.v0.7.1_supervisor_latency",
      phases: { cold: supervisorLatencySurfaces(60), warm: supervisorLatencySurfaces(60) },
    };
    report.phases.cold[0].candidate.git_command_histogram.total_count -= 1;
    assert.throws(
      () => validateSupervisorLatencyReport(report),
      /cold\.external_advance\.candidate has an inconsistent Git command histogram/u,
    );
  });
});
