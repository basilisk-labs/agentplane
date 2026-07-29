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
  return JSON.parse(JSON.stringify(value)) as T;
}

function canonical(value: unknown): string {
  const stabilize = (entry: unknown): unknown => {
    if (Array.isArray(entry)) return entry.map(stabilize);
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
    buildCandidateMeasurement(input: Json): Json;
    createCandidateHarnessManifest(driver: Json, dependency: Json): Json;
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
});
