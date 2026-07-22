import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { expect, it } from "vitest";

import { describeCritical } from "@agentplane/testkit";

const REPO_ROOT = process.cwd();
const REPLAY_LIBRARY_URL = pathToFileURL(
  path.join(REPO_ROOT, "scripts/lib/agent-efficiency-replay.mjs"),
).href;
const REGISTRY_PATH = path.join(REPO_ROOT, "scripts/bench/agent-efficiency-fixtures.json");
const TEST_DRIVER_PATH = "scripts/bench/capture-agent-efficiency-replay.mjs";

const METRIC_FIELDS = [
  "prompt_count",
  "bundle_bytes",
  "bootstrap_bytes",
  "prompt_boilerplate_bytes",
  "stdout_bytes",
  "stderr_bytes",
  "duplicate_input_bytes",
  "llm_episodes",
  "lifecycle_calls",
  "preparation_latency_ms",
  "context_search_latency_ms",
  "retrieval_hits",
  "retrieval_gaps",
  "retrieval_recall_proxy",
  "evidence_observed_count",
  "evidence_claimed_count",
  "evidence_observed_to_claimed_ratio",
] as const;
const OUTCOME_FIELDS = [
  "verified_success",
  "rework_required",
  "blocked",
  "context_gap",
  "scope_violation",
  "approval_respected",
  "adapter_failure",
] as const;
const TOKEN_FIELDS = ["input_tokens", "output_tokens", "reasoning_tokens"] as const;

type MetricField = (typeof METRIC_FIELDS)[number];
type OutcomeField = (typeof OUTCOME_FIELDS)[number];
type TokenField = (typeof TOKEN_FIELDS)[number];
type DriverIdentity = { contract_version: number; path: string; sha256: string };
type Provenance = {
  artifact_id: string;
  artifact_sha256: string;
  category: string;
  source: string;
};
type ObservedCell<T extends number | boolean> = {
  provenance: Provenance;
  resolution: "observed";
  value: T;
};
type ReplayScenario = {
  expected_episode_trace: string[];
  expected_outcomes: Record<OutcomeField, boolean> & { outcome: string };
  id: string;
};
type FixtureRegistry = { scenarios: ReplayScenario[] };
type HarnessManifest = {
  driver_contract_version: number;
  files: { path: string; sha256: string }[];
  sha256: string;
};
type EvidencePayload = {
  diagnostics: {
    latency_ms: Record<"time_to_first_scoped_mutation_ms" | "time_to_verified_result_ms", number>;
  };
  evidence: { critical_fixture_receipt: boolean };
  metrics: Record<MetricField, number>;
  observed_outcomes: Record<OutcomeField, boolean>;
  token_usage_by_role: Record<string, Record<TokenField, number>>;
  [key: string]: unknown;
};
type EvidenceBundle = {
  artifacts: {
    id: string;
    kind: string;
    payload: EvidencePayload;
    sha256: string;
  }[];
  mode: string;
  run_id: string;
  schema_version: number;
};
type ReplayEnvelope = {
  anchor: {
    disposable_repository: boolean;
    driver: DriverIdentity;
    external_effects: string;
    fixture_registry_sha256: string;
    harness_sha256: string;
    subject_sha: string;
  };
  artifacts: { id: string; kind: string; sha256: string }[];
  diagnostics: {
    captured_at: string;
    host_fingerprint: string;
    latency_ms: Record<
      "time_to_first_scoped_mutation_ms" | "time_to_verified_result_ms",
      ObservedCell<number>
    >;
  };
  evidence: { id: string; provenance: Provenance }[];
  evidence_bundle: { path: string; sha256: string };
  metrics: Record<MetricField, ObservedCell<number>>;
  mode: string;
  observed_outcomes: Record<OutcomeField, ObservedCell<boolean>>;
  profile: Record<
    | "adapter_id"
    | "cache_mode"
    | "model_id"
    | "provider_id"
    | "reasoning_effort"
    | "runtime_id"
    | "runtime_version"
    | "sandbox_mode",
    string
  >;
  run_id: string;
  run_index: number;
  scenario_id: string;
  schema_version: number;
  token_usage_by_role: Record<string, Record<TokenField, ObservedCell<number>>>;
};
type EnvelopeRecord = { bytes: string; path: string; value: ReplayEnvelope };
type EvidenceRecord = { bytes: string; path: string; value: EvidenceBundle };
type ReplayBaseline = {
  coverage: Record<
    | "observed_outcome_cells"
    | "provider_token_cells"
    | "replay_runs"
    | "resolved_scalar_cells"
    | "scenarios",
    { actual: number; required: number }
  >;
  diagnostics_sha256: string;
  golden_outcome_comparison: {
    golden_match_count: number;
    golden_mismatch_count: number;
    mismatches: unknown[];
    verdict: string;
  };
  run_manifest: unknown[];
  status: string;
  structural_projection: {
    golden_outcome_comparison: ReplayBaseline["golden_outcome_comparison"];
    scenarios: {
      id: string;
      observed_outcomes: Record<
        OutcomeField,
        { false_count: number; golden_mismatch_count: number; true_count: number }
      >;
    }[];
  };
  structural_projection_sha256: string;
};
type BuildOptions = {
  allowTestControls?: boolean;
  driverIdentity: DriverIdentity;
  envelopeRecords: EnvelopeRecord[];
  evidenceRecords: EvidenceRecord[];
  harnessManifest: HarnessManifest;
  registry: FixtureRegistry;
};
type ReplayModule = {
  MINIMUM_REPLAY_RUNS: number;
  REPLAY_ANCHOR_COMMIT: string;
  assertFrozenReplayBaseline(frozen: ReplayBaseline, rebuilt: ReplayBaseline): void;
  buildReplayBaseline(options: BuildOptions): ReplayBaseline;
  buildReplayDriverEnvironment(
    source: Record<string, string>,
    requested: string[],
    contract: Record<string, string>,
  ): Record<string, string>;
  createReplayDriverIdentity(repoRoot: string, driverPath: string): DriverIdentity;
  createReplayHarnessManifest(repoRoot: string, driverIdentity: DriverIdentity): HarnessManifest;
  fixtureRegistrySha256(registry: FixtureRegistry): string;
};
type RecordPair = { envelope: EnvelopeRecord; evidence: EvidenceRecord };

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map((entry) => stableValue(entry));
  if (value === null || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, stableValue(entry)]),
  );
}

function canonical(value: unknown): string {
  return `${JSON.stringify(stableValue(value), null, 2)}\n`;
}

function digest(value: string): string {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function observed<T extends number | boolean>(
  value: T,
  artifactSha256: string,
  source: string,
): ObservedCell<T> {
  return {
    provenance: {
      artifact_id: "critical_fixture_receipt",
      artifact_sha256: artifactSha256,
      category: "test_control",
      source,
    },
    resolution: "observed",
    value,
  };
}

function makeRecordPair(options: {
  anchor: string;
  diagnosticOffset: number;
  driverIdentity: DriverIdentity;
  fixtureDigest: string;
  harnessDigest: string;
  outcomeOverride?: Partial<Record<OutcomeField, boolean>>;
  runIndex: number;
  scenario: ReplayScenario;
}): RecordPair {
  const {
    anchor,
    diagnosticOffset,
    driverIdentity,
    fixtureDigest,
    harnessDigest,
    outcomeOverride,
    runIndex,
    scenario,
  } = options;
  const roles = [...new Set<string>(scenario.expected_episode_trace)];
  const metrics = {} as Record<MetricField, number>;
  for (const [fieldIndex, field] of METRIC_FIELDS.entries()) {
    const base = field.includes("ratio") || field.includes("recall") ? 0.5 : runIndex + fieldIndex;
    metrics[field] =
      field === "preparation_latency_ms" || field === "context_search_latency_ms"
        ? base + diagnosticOffset
        : base;
  }
  const tokenUsage: Record<string, Record<TokenField, number>> = {};
  for (const [roleIndex, role] of roles.entries()) {
    tokenUsage[role] = {
      input_tokens: 100 + runIndex + roleIndex,
      output_tokens: 20 + runIndex + roleIndex,
      reasoning_tokens: 10 + runIndex + roleIndex,
    };
  }
  const outcomes = {} as Record<OutcomeField, boolean>;
  for (const field of OUTCOME_FIELDS) {
    outcomes[field] = outcomeOverride?.[field] ?? scenario.expected_outcomes[field];
  }
  const payload: EvidencePayload = {
    diagnostics: {
      latency_ms: {
        time_to_first_scoped_mutation_ms: 30 + runIndex + diagnosticOffset,
        time_to_verified_result_ms: 60 + runIndex + diagnosticOffset,
      },
    },
    evidence: { critical_fixture_receipt: true },
    metrics,
    observed_outcomes: outcomes,
    token_usage_by_role: tokenUsage,
  };
  const artifactSha256 = digest(canonical(payload));
  const runId = `${scenario.id}/run-${String(runIndex).padStart(2, "0")}`;
  const evidencePath = `scripts/bench/agent-efficiency-replay-evidence/${runId}.json`;
  const bundle: EvidenceBundle = {
    artifacts: [
      {
        id: "critical_fixture_receipt",
        kind: "test_control",
        payload,
        sha256: artifactSha256,
      },
    ],
    mode: "agent_efficiency_replay_evidence_v1",
    run_id: runId,
    schema_version: 1,
  };
  const evidenceBytes = canonical(bundle);
  const metricsCells = Object.fromEntries(
    METRIC_FIELDS.map((field) => [
      field,
      observed(metrics[field], artifactSha256, `metrics.${field}`),
    ]),
  ) as Record<MetricField, ObservedCell<number>>;
  const outcomeCells = Object.fromEntries(
    OUTCOME_FIELDS.map((field) => [
      field,
      observed(outcomes[field], artifactSha256, `observed_outcomes.${field}`),
    ]),
  ) as Record<OutcomeField, ObservedCell<boolean>>;
  const tokenCells = Object.fromEntries(
    roles.map((role) => [
      role,
      Object.fromEntries(
        TOKEN_FIELDS.map((field) => [
          field,
          observed(tokenUsage[role][field], artifactSha256, `token_usage_by_role.${role}.${field}`),
        ]),
      ),
    ]),
  ) as Record<string, Record<TokenField, ObservedCell<number>>>;
  const envelope: ReplayEnvelope = {
    anchor: {
      disposable_repository: true,
      driver: driverIdentity,
      external_effects: "fixture_backed",
      fixture_registry_sha256: fixtureDigest,
      harness_sha256: harnessDigest,
      subject_sha: anchor,
    },
    artifacts: [
      {
        id: "critical_fixture_receipt",
        kind: "test_control",
        sha256: artifactSha256,
      },
    ],
    diagnostics: {
      captured_at: `2026-01-${String(runIndex).padStart(2, "0")}T00:00:00.000Z`,
      host_fingerprint: digest(`host-${runIndex}`),
      latency_ms: {
        time_to_first_scoped_mutation_ms: observed(
          payload.diagnostics.latency_ms.time_to_first_scoped_mutation_ms,
          artifactSha256,
          "diagnostics.latency_ms.time_to_first_scoped_mutation_ms",
        ),
        time_to_verified_result_ms: observed(
          payload.diagnostics.latency_ms.time_to_verified_result_ms,
          artifactSha256,
          "diagnostics.latency_ms.time_to_verified_result_ms",
        ),
      },
    },
    evidence: [
      {
        id: "critical_fixture_receipt",
        provenance: {
          artifact_id: "critical_fixture_receipt",
          artifact_sha256: artifactSha256,
          category: "test_control",
          source: "evidence.critical_fixture_receipt",
        },
      },
    ],
    evidence_bundle: { path: evidencePath, sha256: digest(evidenceBytes) },
    metrics: metricsCells,
    mode: "agent_efficiency_replay_v1",
    observed_outcomes: outcomeCells,
    profile: {
      adapter_id: "fixture-adapter",
      cache_mode: "cold",
      model_id: "fixture-model",
      provider_id: "fixture-provider",
      reasoning_effort: "fixture",
      runtime_id: "node",
      runtime_version: process.versions.node,
      sandbox_mode: "isolated-fixture",
    },
    run_id: runId,
    run_index: runIndex,
    scenario_id: scenario.id,
    schema_version: 1,
    token_usage_by_role: tokenCells,
  };
  return {
    envelope: {
      bytes: canonical(envelope),
      path: `scripts/bench/agent-efficiency-replay-envelopes/${runId}.json`,
      value: envelope,
    },
    evidence: { bytes: evidenceBytes, path: evidencePath, value: bundle },
  };
}

function relinkPair(pair: RecordPair): void {
  const artifact = pair.evidence.value.artifacts[0];
  artifact.sha256 = digest(canonical(artifact.payload));
  pair.envelope.value.artifacts[0].sha256 = artifact.sha256;
  const visit = (value: unknown): void => {
    if (Array.isArray(value)) {
      for (const item of value) visit(item);
      return;
    }
    if (value === null || typeof value !== "object") return;
    const record = value as Record<string, unknown>;
    if (record.artifact_id === artifact.id) record.artifact_sha256 = artifact.sha256;
    for (const child of Object.values(record)) visit(child);
  };
  visit(pair.envelope.value);
  pair.evidence.bytes = canonical(pair.evidence.value);
  pair.envelope.value.evidence_bundle.sha256 = digest(pair.evidence.bytes);
  pair.envelope.bytes = canonical(pair.envelope.value);
}

async function testContext(
  options: {
    diagnosticOffset?: number;
    firstOutcomeOverride?: Partial<Record<OutcomeField, boolean>>;
  } = {},
): Promise<{
  baseline: ReplayBaseline;
  driverIdentity: DriverIdentity;
  envelopeRecords: EnvelopeRecord[];
  evidenceRecords: EvidenceRecord[];
  harness: HarnessManifest;
  pairs: RecordPair[];
  registry: FixtureRegistry;
  replay: ReplayModule;
}> {
  const replay = (await import(REPLAY_LIBRARY_URL)) as ReplayModule;
  const registry = JSON.parse(await readFile(REGISTRY_PATH, "utf8")) as FixtureRegistry;
  const driverIdentity = replay.createReplayDriverIdentity(
    REPO_ROOT,
    path.join(REPO_ROOT, TEST_DRIVER_PATH),
  );
  const harness = replay.createReplayHarnessManifest(REPO_ROOT, driverIdentity);
  const fixtureDigest = replay.fixtureRegistrySha256(registry);
  const pairs = registry.scenarios.flatMap((scenario, scenarioIndex) =>
    Array.from({ length: replay.MINIMUM_REPLAY_RUNS }, (_, index) =>
      makeRecordPair({
        anchor: replay.REPLAY_ANCHOR_COMMIT,
        diagnosticOffset: options.diagnosticOffset ?? 0,
        driverIdentity,
        fixtureDigest,
        harnessDigest: harness.sha256,
        outcomeOverride:
          scenarioIndex === 0 && index === 0 ? options.firstOutcomeOverride : undefined,
        runIndex: index + 1,
        scenario,
      }),
    ),
  );
  const envelopeRecords = pairs.map((pair) => pair.envelope);
  const evidenceRecords = pairs.map((pair) => pair.evidence);
  const baseline = replay.buildReplayBaseline({
    allowTestControls: true,
    driverIdentity,
    envelopeRecords,
    evidenceRecords,
    harnessManifest: harness,
    registry,
  });
  return {
    baseline,
    driverIdentity,
    envelopeRecords,
    evidenceRecords,
    harness,
    pairs,
    registry,
    replay,
  };
}

function clonedPairs(pairs: RecordPair[]): RecordPair[] {
  return structuredClone(pairs);
}

describeCritical("critical: RF-04 anchored replay telemetry", () => {
  it("resolves the complete 10x5 outcome, provider-token, and scalar contract", async () => {
    const { baseline } = await testContext();

    expect(baseline.status).toBe("complete");
    expect(baseline.coverage).toEqual({
      observed_outcome_cells: { actual: 70, required: 70 },
      provider_token_cells: { actual: 27, required: 27 },
      replay_runs: { actual: 50, required: 50 },
      resolved_scalar_cells: { actual: 170, required: 170 },
      scenarios: { actual: 10, required: 10 },
    });
    expect(baseline.run_manifest).toHaveLength(50);
    expect(baseline.structural_projection.scenarios).toHaveLength(10);
    expect(baseline.golden_outcome_comparison.verdict).toBe("matches_control");
  });

  it("keeps timestamps, hosts, and latency samples outside the structural digest", async () => {
    const original = await testContext();
    const changed = await testContext({ diagnosticOffset: 1000 });

    expect(changed.baseline.structural_projection_sha256).toBe(
      original.baseline.structural_projection_sha256,
    );
    expect(changed.baseline.diagnostics_sha256).not.toBe(original.baseline.diagnostics_sha256);
  });

  it("retains failed, rework, and safety outcomes and reports golden mismatches", async () => {
    const { baseline } = await testContext({
      firstOutcomeOverride: { scope_violation: true, verified_success: false },
    });

    expect(baseline.run_manifest).toHaveLength(50);
    expect(baseline.golden_outcome_comparison).toMatchObject({
      golden_mismatch_count: 2,
      verdict: "regression_observed",
    });
    expect(baseline.golden_outcome_comparison.mismatches).toHaveLength(2);
    const direct = baseline.structural_projection.scenarios.find(
      (scenario) => scenario.id === "direct",
    );
    expect(direct?.observed_outcomes.verified_success).toMatchObject({
      false_count: 1,
      golden_mismatch_count: 1,
      true_count: 4,
    });
    expect(direct?.observed_outcomes.scope_violation).toMatchObject({
      false_count: 4,
      golden_mismatch_count: 1,
      true_count: 1,
    });
  });

  it("recomputes artifact and bundle hashes from committed sanitized bytes", async () => {
    const context = await testContext();
    const build = (pairs: RecordPair[]) =>
      context.replay.buildReplayBaseline({
        allowTestControls: true,
        driverIdentity: context.driverIdentity,
        envelopeRecords: pairs.map((pair) => pair.envelope),
        evidenceRecords: pairs.map((pair) => pair.evidence),
        harnessManifest: context.harness,
        registry: context.registry,
      });

    const sourceTamper = clonedPairs(context.pairs);
    sourceTamper[0].envelope.value.token_usage_by_role.CODER.input_tokens.value += 1;
    sourceTamper[0].envelope.bytes = canonical(sourceTamper[0].envelope.value);
    expect(() => build(sourceTamper)).toThrow(
      "source value differs from the committed evidence payload",
    );

    const artifactTamper = clonedPairs(context.pairs);
    artifactTamper[0].evidence.value.artifacts[0].payload.metrics.prompt_count += 1;
    artifactTamper[0].evidence.bytes = canonical(artifactTamper[0].evidence.value);
    artifactTamper[0].envelope.value.evidence_bundle.sha256 = digest(
      artifactTamper[0].evidence.bytes,
    );
    artifactTamper[0].envelope.bytes = canonical(artifactTamper[0].envelope.value);
    expect(() => build(artifactTamper)).toThrow("sha256 differs from sanitized payload bytes");

    const nonCanonical = clonedPairs(context.pairs);
    nonCanonical[0].evidence.bytes += " ";
    nonCanonical[0].envelope.value.evidence_bundle.sha256 = digest(nonCanonical[0].evidence.bytes);
    nonCanonical[0].envelope.bytes = canonical(nonCanonical[0].envelope.value);
    expect(() => build(nonCanonical)).toThrow("must use canonical stable JSON");
  });

  it("rejects anchor, provenance, run-count, and envelope artifact tampering", async () => {
    const context = await testContext();
    const build = (pairs: RecordPair[]) =>
      context.replay.buildReplayBaseline({
        allowTestControls: true,
        driverIdentity: context.driverIdentity,
        envelopeRecords: pairs.map((pair) => pair.envelope),
        evidenceRecords: pairs.map((pair) => pair.evidence),
        harnessManifest: context.harness,
        registry: context.registry,
      });

    const anchorTamper = clonedPairs(context.pairs);
    anchorTamper[0].envelope.value.anchor.subject_sha = "a".repeat(40);
    anchorTamper[0].envelope.bytes = canonical(anchorTamper[0].envelope.value);
    expect(() => build(anchorTamper)).toThrow("anchor must be exact commit");

    const provenanceTamper = clonedPairs(context.pairs);
    provenanceTamper[0].envelope.value.token_usage_by_role.CODER.reasoning_tokens.provenance.category =
      "agent_claimed";
    provenanceTamper[0].envelope.bytes = canonical(provenanceTamper[0].envelope.value);
    expect(() => build(provenanceTamper)).toThrow("must use provider_reported provenance");

    expect(() => build(context.pairs.slice(1))).toThrow("has 4/5 required replay runs");

    const artifactTamper = clonedPairs(context.pairs);
    artifactTamper[0].envelope.value.artifacts[0].sha256 = digest("changed-artifact");
    artifactTamper[0].envelope.bytes = canonical(artifactTamper[0].envelope.value);
    expect(() => build(artifactTamper)).toThrow("differs from the committed evidence bundle");
  });

  it("recursively rejects embedded host paths, credentials, and sensitive keys", async () => {
    const context = await testContext();
    const buildFirstMutation = (mutate: (payload: EvidencePayload) => void) => {
      const pairs = clonedPairs(context.pairs);
      mutate(pairs[0].evidence.value.artifacts[0].payload);
      relinkPair(pairs[0]);
      return () =>
        context.replay.buildReplayBaseline({
          allowTestControls: true,
          driverIdentity: context.driverIdentity,
          envelopeRecords: pairs.map((pair) => pair.envelope),
          evidenceRecords: pairs.map((pair) => pair.evidence),
          harnessManifest: context.harness,
          registry: context.registry,
        });
    };

    expect(
      buildFirstMutation((payload) => {
        payload.failure = { nested: "error at /custom/root/project/file.ts:10" };
      }),
    ).toThrow("absolute host path");
    expect(
      buildFirstMutation((payload) => {
        payload.failure = { nested: "C:\\Users\\name\\project\\file.ts" };
      }),
    ).toThrow("absolute host path");
    expect(
      buildFirstMutation((payload) => {
        payload.failure = { nested: "Bearer abcdefghijklmnopqrstuvwxyz" };
      }),
    ).toThrow("credential-like value");
    expect(
      buildFirstMutation((payload) => {
        payload.api_key = "opaque-value-without-known-prefix";
      }),
    ).toThrow("forbidden because it can contain a credential");
  });

  it("binds exact repo-local driver bytes and exposes only an explicit environment allowlist", async () => {
    const { driverIdentity, replay } = await testContext();
    expect(driverIdentity).toMatchObject({ contract_version: 1, path: TEST_DRIVER_PATH });
    expect(() =>
      replay.createReplayDriverIdentity(REPO_ROOT, "/tmp/outside-agentplane-driver.mjs"),
    ).toThrow("inside the repository");
    expect(() =>
      replay.createReplayDriverIdentity(
        REPO_ROOT,
        path.join(REPO_ROOT, "docs/internal/v0.7-agent-efficiency-baseline.md"),
      ),
    ).toThrow("reviewed scripts/bench task scope");

    const environment = replay.buildReplayDriverEnvironment(
      {
        HOME: "/Users/operator",
        OPENAI_API_KEY: "explicit-secret-value",
        PATH: "/usr/bin",
        UNRELATED_SECRET: "must-not-pass",
      },
      ["OPENAI_API_KEY"],
      { AGENTPLANE_RF04_REPLAY_RUN_ID: "direct/run-01" },
    );
    expect(environment).toEqual({
      AGENTPLANE_RF04_REPLAY_RUN_ID: "direct/run-01",
      OPENAI_API_KEY: "explicit-secret-value",
      PATH: "/usr/bin",
    });
    expect(() =>
      replay.buildReplayDriverEnvironment({ HOME: "/Users/operator" }, ["HOME"], {
        AGENTPLANE_RF04_REPLAY_RUN_ID: "direct/run-01",
      }),
    ).toThrow("environment field is forbidden: HOME");
    expect(() =>
      replay.buildReplayDriverEnvironment({}, ["AGENTPLANE_RF04_REPLAY_ESCAPE"], {
        AGENTPLANE_RF04_REPLAY_RUN_ID: "direct/run-01",
      }),
    ).toThrow("environment field is forbidden");
  });

  it("does not accept estimated or agent-claimed reasoning usage", async () => {
    const context = await testContext();
    const pairs = clonedPairs(context.pairs);
    pairs[0].envelope.value.token_usage_by_role.CODER.reasoning_tokens.provenance.category =
      "agent_claimed";
    pairs[0].envelope.bytes = canonical(pairs[0].envelope.value);

    expect(() =>
      context.replay.buildReplayBaseline({
        allowTestControls: true,
        driverIdentity: context.driverIdentity,
        envelopeRecords: pairs.map((pair) => pair.envelope),
        evidenceRecords: pairs.map((pair) => pair.evidence),
        harnessManifest: context.harness,
        registry: context.registry,
      }),
    ).toThrow("must use provider_reported provenance");
  });
});
