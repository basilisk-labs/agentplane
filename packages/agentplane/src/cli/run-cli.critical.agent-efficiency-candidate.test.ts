import { execFileSync } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const REPO_ROOT = process.cwd();
const CANDIDATE_SHA = "b".repeat(40);
const CANDIDATE_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/bench/capture-agent-efficiency-candidate.mjs"),
).href;
const REPLAY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/agent-efficiency-replay.mjs"),
).href;

type Json = Record<string, unknown>;

function clone<T>(value: T): T {
  return structuredClone(value);
}

function canonical(value: unknown): string {
  const stabilize = (entry: unknown): unknown => {
    if (Array.isArray(entry)) return entry.map((child) => stabilize(child));
    if (entry === null || typeof entry !== "object") return entry;
    return Object.fromEntries(
      Object.entries(entry as Json)
        .toSorted(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, stabilize(child)]),
    );
  };
  return `${JSON.stringify(stabilize(value), null, 2)}\n`;
}

async function loadCandidateFixture() {
  const candidate = (await import(CANDIDATE_URL)) as {
    assertCandidateCaptureConcurrency(concurrency: number): number;
    assertCandidateCaptureMode(options: Json): void;
    buildCandidateMeasurement(input: Json): Json;
    buildCandidateMeasurementFromPinnedBaseline(input: Json): Json;
    captureCandidate(
      options: Json,
      dependencies?: { resolveCodexBinary?: () => string },
    ): Promise<Json>;
    createCandidateHarnessManifest(driver: Json, dependency: Json): Json;
    readPinnedQualificationBaseline(input: Json): Json;
    runCandidateDriverProcess(
      command: string,
      args: string[],
      options: { cwd: string; env: NodeJS.ProcessEnv; timeout: number },
      label: string,
    ): Promise<void>;
    runCandidateCaptureJobs<T, R>(
      jobs: T[],
      concurrency: number,
      worker: (job: T, index: number) => Promise<R>,
    ): Promise<R[]>;
    withDisposableCandidateRepository<T>(
      repositoryPath: string,
      work: () => Promise<T>,
    ): Promise<T>;
    validateCandidatePilotCapture(input: Json): Json;
  };
  const replay = (await import(REPLAY_URL)) as {
    createReplayDriverIdentity(root: string, path: string): Json;
  };
  const baseline = (await import(REPLAY_URL)) as {
    fixtureRegistrySha256(registry: Json): string;
  };
  const registry = JSON.parse(
    await readFile(path.join(REPO_ROOT, "scripts/bench/agent-efficiency-fixtures.json"), "utf8"),
  ) as Json;
  const candidateRegistry = clone(registry);
  (candidateRegistry.provenance as Json).efficiency_anchor_commit = CANDIDATE_SHA;
  const envelopePaths = ["scripts/bench/agent-efficiency-replay-envelopes"];
  const evidenceRoot = path.join(REPO_ROOT, "scripts/bench/agent-efficiency-replay-evidence");
  const envelopeRoot = path.join(REPO_ROOT, envelopePaths[0]);
  const scenarioIds = (registry.scenarios as Json[]).map((scenario) => scenario.id as string);
  const envelopes: Json[] = [];
  const evidence: Json[] = [];
  for (const scenarioId of scenarioIds) {
    for (let run = 1; run <= 5; run += 1) {
      const file = `run-${String(run).padStart(2, "0")}.json`;
      const envelopePath = path.join(envelopeRoot, scenarioId, file);
      const evidencePath = path.join(evidenceRoot, scenarioId, file);
      envelopes.push({
        bytes: "",
        path: `candidate/envelopes/${scenarioId}/${file}`,
        value: JSON.parse(await readFile(envelopePath, "utf8")) as Json,
      });
      evidence.push({
        bytes: await readFile(evidencePath, "utf8"),
        path: `candidate/evidence/${scenarioId}/${file}`,
        value: JSON.parse(await readFile(evidencePath, "utf8")) as Json,
      });
    }
  }
  const driver = replay.createReplayDriverIdentity(
    REPO_ROOT,
    "scripts/bench/run-agent-efficiency-codex-replay.mjs",
  );
  const firstAnchor = (envelopes[0].value as Json).anchor as Json;
  const dependency = {
    capture_executable_sha256: firstAnchor.dependency_capture_executable_sha256,
    capture_platform: firstAnchor.capture_platform,
    capture_receipt_sha256: firstAnchor.dependency_capture_receipt_sha256,
    portable_sha256: firstAnchor.dependency_portable_sha256,
  };
  const harness = candidate.createCandidateHarnessManifest(driver, dependency);
  for (const envelope of envelopes) {
    const value = envelope.value as Json;
    const anchor = value.anchor as Json;
    anchor.driver = clone(driver);
    anchor.subject_sha = CANDIDATE_SHA;
    anchor.fixture_registry_sha256 = baseline.fixtureRegistrySha256(candidateRegistry);
    anchor.harness_sha256 = harness.sha256;
    const evidencePath = (value.evidence_bundle as Json).path as string;
    const suffix = evidencePath.split("/").slice(-2).join("/");
    (value.evidence_bundle as Json).path = `candidate/evidence/${suffix}`;
    envelope.bytes = canonical(value);
  }
  return { candidate, candidateRegistry, dependency, driver, envelopes, evidence, harness };
}

describeCritical("critical: RF-04 candidate measurement", () => {
  it("bounds candidate capture concurrency and preserves declared result order", async () => {
    const fixture = await loadCandidateFixture();
    const jobs = Array.from({ length: 8 }, (_unused, index) => index);
    let active = 0;
    let maximumActive = 0;
    const results = await fixture.candidate.runCandidateCaptureJobs(jobs, 3, async (job) => {
      active += 1;
      maximumActive = Math.max(maximumActive, active);
      await new Promise((resolve) => setTimeout(resolve, job % 2 === 0 ? 8 : 1));
      active -= 1;
      return `run-${job}`;
    });

    expect(maximumActive).toBe(3);
    expect(results).toEqual(jobs.map((job) => `run-${job}`));
    expect(() => fixture.candidate.assertCandidateCaptureConcurrency(0)).toThrow(
      "--concurrency must be an integer >= 1",
    );
    expect(() => fixture.candidate.assertCandidateCaptureConcurrency(Number.NaN)).toThrow(
      "--concurrency must be an integer >= 1",
    );
  });

  it("stops assigning queued provider jobs after the first failure", async () => {
    const fixture = await loadCandidateFixture();
    const started: string[] = [];
    let activeSettled = false;
    await expect(
      fixture.candidate.runCandidateCaptureJobs(["fail", "active", "queued"], 2, async (job) => {
        started.push(job);
        if (job === "fail") throw new Error("provider failed");
        await new Promise((resolve) => setTimeout(resolve, 10));
        activeSettled = true;
        return job;
      }),
    ).rejects.toThrow("provider failed");
    expect(started).toEqual(["fail", "active"]);
    expect(activeSettled).toBe(true);
  });

  it("removes each disposable candidate checkout after success or failure", async () => {
    const fixture = await loadCandidateFixture();
    const root = path.join(
      REPO_ROOT,
      ".agentplane/cache",
      `rf04-disposable-test-${process.pid}-${Date.now()}`,
    );
    const successful = path.join(root, "successful");
    const failed = path.join(root, "failed");
    try {
      await expect(
        fixture.candidate.withDisposableCandidateRepository(successful, () => {
          writeFileSync(path.join(successful, "checkout.txt"), "temporary\n");
          return Promise.resolve("done");
        }),
      ).resolves.toBe("done");
      expect(existsSync(successful)).toBe(false);

      await expect(
        fixture.candidate.withDisposableCandidateRepository(failed, () => {
          writeFileSync(path.join(failed, "checkout.txt"), "temporary\n");
          return Promise.reject(new Error("provider failed"));
        }),
      ).rejects.toThrow("provider failed");
      expect(existsSync(failed)).toBe(false);
    } finally {
      rmSync(root, { force: true, recursive: true });
    }
  });

  it("selects the lowest declared failing provider job regardless of completion order", async () => {
    const fixture = await loadCandidateFixture();

    for (const delays of [
      new Map([
        ["first", 10],
        ["second", 1],
      ]),
      new Map([
        ["first", 1],
        ["second", 10],
      ]),
    ]) {
      const started: string[] = [];
      await expect(
        fixture.candidate.runCandidateCaptureJobs(["first", "second", "queued"], 2, async (job) => {
          started.push(job);
          await new Promise((resolve) => setTimeout(resolve, delays.get(job) ?? 0));
          throw new Error(`${job} provider failed`);
        }),
      ).rejects.toThrow("first provider failed");
      expect(started).toEqual(["first", "second"]);
    }
  });

  it("force-kills a provider driver that ignores SIGTERM at its fixed timeout", async () => {
    const fixture = await loadCandidateFixture();
    const startedAt = Date.now();

    await expect(
      fixture.candidate.runCandidateDriverProcess(
        process.execPath,
        ["-e", "process.on('SIGTERM', () => {}); setInterval(() => {}, 1_000);"],
        { cwd: REPO_ROOT, env: process.env, timeout: 100 },
        "timeout fixture",
      ),
    ).rejects.toThrow("timeout fixture failed to start or exceeded its fixed timeout");
    expect(Date.now() - startedAt).toBeLessThan(3000);
  });

  it("validates one exact candidate pilot envelope and returns bounded telemetry", async () => {
    const fixture = await loadCandidateFixture();
    const envelope = fixture.envelopes.find(
      (record) => (record.value as Json).run_id === "direct/run-01",
    )!;
    const evidencePath = ((envelope?.value as Json).evidence_bundle as Json).path as string;
    const evidence = fixture.evidence.find((record) => record.path === evidencePath)!;

    const pilot = fixture.candidate.validateCandidatePilotCapture({
      anchor: CANDIDATE_SHA,
      dependencyClaim: fixture.dependency,
      driverIdentity: fixture.driver,
      envelopeRecords: [envelope],
      evidenceRecords: [evidence],
      harnessManifest: fixture.harness,
      registry: fixture.candidateRegistry,
      runs: 5,
    }) as Json;

    expect(pilot).toMatchObject({
      episode_count: 1,
      pilot: true,
      run_id: "direct/run-01",
      subject_sha: CANDIDATE_SHA,
    });
    expect((pilot.profile as Json).runtime_version).toBe("0.6.24/0.145.0-alpha.18");
  });

  it("fails closed for candidate pilot mode combinations that could mutate prior evidence", async () => {
    const fixture = await loadCandidateFixture();
    const common = {
      capture: false,
      baselineEvidencePath: null,
      check: false,
      pilot: true,
      replace: false,
      runtimeBridgeVersion: null,
    };

    expect(() => fixture.candidate.assertCandidateCaptureMode({ ...common, check: true })).toThrow(
      "--pilot cannot be combined with --check",
    );
    expect(() =>
      fixture.candidate.assertCandidateCaptureMode({
        ...common,
        runtimeBridgeVersion: "0.146.0-alpha.3.1",
      }),
    ).toThrow("--pilot cannot be combined with --runtime-bridge");
    expect(() =>
      fixture.candidate.assertCandidateCaptureMode({ ...common, replace: true }),
    ).toThrow("--pilot cannot be combined with --replace");
    expect(() =>
      fixture.candidate.assertCandidateCaptureMode({ ...common, pilot: false, capture: true }),
    ).toThrow("--capture requires --runtime-bridge or --baseline-evidence");
    expect(() =>
      fixture.candidate.assertCandidateCaptureMode({
        ...common,
        pilot: false,
        baselineEvidencePath: "scripts/baselines/evidence.json",
        runtimeBridgeVersion: "0.146.0-alpha.3.1",
      }),
    ).toThrow("--runtime-bridge cannot be combined with --baseline-evidence");
    expect(() =>
      fixture.candidate.assertCandidateCaptureMode({
        ...common,
        baselineEvidencePath: "scripts/baselines/evidence.json",
      }),
    ).toThrow("--pilot cannot be combined with --baseline-evidence");
    expect(() =>
      fixture.candidate.assertCandidateCaptureMode({
        ...common,
        pilot: false,
        capture: true,
        check: true,
        runtimeBridgeVersion: "0.146.0-alpha.3.1",
      }),
    ).toThrow("--capture cannot be combined with --check");
  });

  it("cleans failed candidate pilot staging without publishing artifacts", async () => {
    const fixture = await loadCandidateFixture();
    const subject = execFileSync("git", ["rev-parse", "HEAD"], {
      cwd: REPO_ROOT,
      encoding: "utf8",
    }).trim();
    const unique = `${process.pid}-${Date.now()}`;
    const outputRoot = path.join(
      REPO_ROOT,
      ".agentplane/cache/rf04-candidate",
      `pilot-test-${unique}`,
    );
    const driverPath = path.join(
      REPO_ROOT,
      "scripts/bench",
      `.rf04-candidate-pilot-failing-${unique}.mjs`,
    );
    const driverReceiptPath = path.join(
      REPO_ROOT,
      ".agentplane/cache",
      `.rf04-candidate-pilot-receipt-${unique}.txt`,
    );
    writeFileSync(
      driverPath,
      `import { writeFileSync } from "node:fs";\nwriteFileSync(${JSON.stringify(driverReceiptPath)}, process.cwd());\nprocess.stderr.write("RF04_DRIVER_ERROR:CODEX_EXIT\\n");\nprocess.exitCode = 1;\n`,
    );
    let observedCaptureRoot: string | null = null;
    try {
      await expect(
        fixture.candidate.captureCandidate(
          {
            check: false,
            codexCliVersion: "0.146.0-alpha.3.1",
            driverPath,
            outputRoot,
            pilot: true,
            replace: false,
            runs: 5,
            runtimeBridgeVersion: null,
            subject,
          },
          { resolveCodexBinary: () => process.execPath },
        ),
      ).rejects.toThrow("direct/run-01 candidate driver failed with exit 1");
      const driverCwd = await readFile(driverReceiptPath, "utf8");
      observedCaptureRoot = path.resolve(driverCwd, "../../..");
    } finally {
      rmSync(driverPath, { force: true });
      rmSync(driverReceiptPath, { force: true });
      rmSync(outputRoot, { force: true, recursive: true });
    }
    expect(existsSync(outputRoot)).toBe(false);
    expect(path.basename(observedCaptureRoot ?? "")).toMatch(/^rf04-candidate-staging-/);
    expect(existsSync(observedCaptureRoot ?? "")).toBe(false);
  }, 120_000);

  it("compares actual candidate values to the frozen baseline for the reviewed SHA", async () => {
    const fixture = await loadCandidateFixture();
    const measurement = fixture.candidate.buildCandidateMeasurement({
      candidateAnchor: CANDIDATE_SHA,
      candidateDependencyClaim: fixture.dependency,
      candidateDriverIdentity: fixture.driver,
      candidateEnvelopeRecords: fixture.envelopes,
      candidateEvidenceRecords: fixture.evidence,
      candidateHarnessManifest: fixture.harness,
      candidateRegistry: fixture.candidateRegistry,
    }) as Json;

    expect(measurement.verdict).toBe("pass");
    expect((measurement.candidate as Json).subject_sha).toBe(CANDIDATE_SHA);
    expect(((measurement.candidate as Json).actual_values as Json).provider_episodes).toBe(55);
    expect(((measurement.candidate as Json).coverage as Json).replay_runs).toBe(50);
    expect(((measurement.candidate as Json).runtime_profile as Json).runtime_version).toBe(
      "0.6.24/0.145.0-alpha.18",
    );
    expect((measurement.runtime_comparison as Json).profile_match).toBe(true);
    expect(
      (measurement.comparisons as Json[]).some(
        (entry) => entry.id === "provider_tokens.total_tokens",
      ),
    ).toBe(true);
    expect(
      (measurement.comparisons as Json[]).some(
        (entry) => entry.id === "latency.time_to_first_scoped_mutation_ms.mean_ms",
      ),
    ).toBe(true);
  });

  it("rejects the historical anchor as a candidate and fails a count-only latency comparison", async () => {
    const fixture = await loadCandidateFixture();
    expect(() =>
      fixture.candidate.buildCandidateMeasurement({
        candidateAnchor: "1a702e160ba9f0efe7067f2a22fc008defc89ffb",
        candidateDependencyClaim: fixture.dependency,
        candidateDriverIdentity: fixture.driver,
        candidateEnvelopeRecords: fixture.envelopes,
        candidateEvidenceRecords: fixture.evidence,
        candidateHarnessManifest: fixture.harness,
        candidateRegistry: fixture.candidateRegistry,
      }),
    ).toThrow("baseline-only");

    const incomplete = clone(fixture.envelopes);
    const first = incomplete[0].value as Json;
    ((first.diagnostics as Json).latency_ms as Json).time_to_first_scoped_mutation_ms = {
      provenance: { category: "applicability_rule", source: "test.count_only" },
      reason_code: "not_applicable_time_to_first_scoped_mutation_ms",
      resolution: "not_applicable",
    };
    incomplete[0].bytes = canonical(first);
    const measurement = fixture.candidate.buildCandidateMeasurement({
      candidateAnchor: CANDIDATE_SHA,
      candidateDependencyClaim: fixture.dependency,
      candidateDriverIdentity: fixture.driver,
      candidateEnvelopeRecords: incomplete,
      candidateEvidenceRecords: fixture.evidence,
      candidateHarnessManifest: fixture.harness,
      candidateRegistry: fixture.candidateRegistry,
    }) as Json;
    expect(measurement.verdict).toBe("fail");
    expect(measurement.failure_ids as string[]).toContain(
      "latency.time_to_first_scoped_mutation_ms.sample_count",
    );
  });

  it("binds an explicitly declared candidate Codex version to every envelope profile", async () => {
    const fixture = await loadCandidateFixture();
    expect(() =>
      fixture.candidate.buildCandidateMeasurement({
        candidateAnchor: CANDIDATE_SHA,
        candidateCodexCliVersion: "0.146.0-alpha.3.1",
        candidateDependencyClaim: fixture.dependency,
        candidateDriverIdentity: fixture.driver,
        candidateEnvelopeRecords: fixture.envelopes,
        candidateEvidenceRecords: fixture.evidence,
        candidateHarnessManifest: fixture.harness,
        candidateRegistry: fixture.candidateRegistry,
      }),
    ).toThrow("runtime profile does not bind declared Codex CLI version");
  });

  it("rejects a candidate measurement when its runtime profile differs from the baseline", async () => {
    const fixture = await loadCandidateFixture();
    const candidateVersion = "0.146.0-alpha.3.1";
    const crossRuntime = clone(fixture.envelopes);
    for (const record of crossRuntime) {
      const envelope = record.value as Json;
      (envelope.profile as Json).runtime_version = `0.6.24/${candidateVersion}`;
      record.bytes = canonical(envelope);
    }

    const measurement = fixture.candidate.buildCandidateMeasurement({
      candidateAnchor: CANDIDATE_SHA,
      candidateCodexCliVersion: candidateVersion,
      candidateDependencyClaim: fixture.dependency,
      candidateDriverIdentity: fixture.driver,
      candidateEnvelopeRecords: crossRuntime,
      candidateEvidenceRecords: fixture.evidence,
      candidateHarnessManifest: fixture.harness,
      candidateRegistry: fixture.candidateRegistry,
    }) as Json;

    expect(measurement.verdict).toBe("fail");
    expect(measurement.failure_ids as string[]).toEqual(["runtime.profile"]);
    expect((measurement.runtime_comparison as Json).profile_match).toBe(false);
  });

  it("rebuilds a candidate comparison from reviewed Git-tracked runtime baseline evidence", async () => {
    const fixture = await loadCandidateFixture();
    const evidencePath = path.join(
      REPO_ROOT,
      "scripts/baselines/agent-efficiency-v0.7-beta1-candidate.json",
    );
    const pinned = fixture.candidate.readPinnedQualificationBaseline({
      codexCliVersion: "0.146.0-alpha.3.1",
      evidencePath,
    }) as Json;
    const candidateMeasurement = fixture.candidate.buildCandidateMeasurement({
      candidateAnchor: CANDIDATE_SHA,
      candidateDependencyClaim: fixture.dependency,
      candidateDriverIdentity: fixture.driver,
      candidateEnvelopeRecords: fixture.envelopes,
      candidateEvidenceRecords: fixture.evidence,
      candidateHarnessManifest: fixture.harness,
      candidateRegistry: fixture.candidateRegistry,
    }) as Json;
    (candidateMeasurement.candidate as Json).runtime_profile = clone(
      (pinned.baseline as Json).runtime_profile,
    );

    const measurement = fixture.candidate.buildCandidateMeasurementFromPinnedBaseline({
      candidateMeasurement,
      pinnedBaseline: pinned,
    }) as Json;

    expect((measurement.baseline as Json).source).toBe("pinned_runtime_bridge");
    expect((measurement.baseline as Json).pinned_evidence_path).toBe(
      "scripts/baselines/agent-efficiency-v0.7-beta1-candidate.json",
    );
    expect((measurement.runtime_comparison as Json).profile_match).toBe(true);
    expect(
      (measurement.comparisons as Json[]).some((entry) => entry.id === "runtime.profile"),
    ).toBe(true);
    expect(() =>
      fixture.candidate.readPinnedQualificationBaseline({
        codexCliVersion: "0.146.0-alpha.3.2",
        evidencePath,
      }),
    ).toThrow("does not match the declared Codex runtime");
  });
});
