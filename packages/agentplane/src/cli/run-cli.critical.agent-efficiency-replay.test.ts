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
type DependencyClaim = {
  capture_executable_sha256: string;
  capture_platform: { arch: string; libc: string; node_abi: string; platform: string };
  capture_receipt_sha256: string;
  portable_sha256: string;
};
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
  expected_lifecycle_trace: string[];
  expected_outcomes: Record<OutcomeField, boolean> & { outcome: string };
  id: string;
};
type FixtureRegistry = { scenarios: ReplayScenario[] };
type HarnessManifest = {
  dependency_claim: DependencyClaim;
  driver_contract_version: number;
  files: { path: string; sha256: string }[];
  sha256: string;
};
type EvidencePayload = {
  diagnostics: {
    latency_ms: Record<
      | "harness_setup_latency_ms"
      | "time_to_first_scoped_mutation_ms"
      | "time_to_verified_result_ms",
      number
    >;
  };
  evidence: { critical_fixture_receipt: boolean };
  episode_ledger: {
    effect_observation: {
      allowed_paths: string[];
      changed_paths: string[];
      policy: "read_only" | "scoped_write";
      same_content_rewrites: string[];
      unsafe_allowed_paths: string[];
      violation_paths: string[];
    };
    episode_index: number;
    expected_final_status: "blocked" | "done" | "reviewed";
    final_status: "blocked" | "done" | "reviewed";
    provider_usage: {
      cached_input_tokens: number;
      input_tokens: number;
      output_tokens: number;
      reasoning_output_tokens: number;
      turn_completed_events: number;
    };
    role: string;
    status_violation: boolean;
    target_matched_after_episode: boolean | null;
  }[];
  lifecycle_control: {
    call_count: number;
    provenance: "fixture_control";
    trace: string[];
  };
  metrics: Record<MetricField, number>;
  resolved_outcomes: Record<OutcomeField, boolean>;
  provider_usage_by_role: Record<
    string,
    {
      cached_input_tokens: number;
      input_tokens: number;
      output_tokens: number;
      reasoning_output_tokens: number;
    }
  >;
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
    capture_platform: DependencyClaim["capture_platform"];
    dependency_capture_executable_sha256: string;
    dependency_capture_receipt_sha256: string;
    dependency_portable_sha256: string;
    disposable_repository: boolean;
    driver: DriverIdentity;
    external_effects: string;
    fixture_registry_origin: string;
    fixture_registry_sha256: string;
    harness_sha256: string;
    subject_sha: string;
  };
  artifacts: { id: string; kind: string; sha256: string }[];
  diagnostics: {
    captured_at: string;
    host_fingerprint: string;
    latency_ms: Record<
      | "harness_setup_latency_ms"
      | "time_to_first_scoped_mutation_ms"
      | "time_to_verified_result_ms",
      ObservedCell<number>
    >;
  };
  evidence: { id: string; provenance: Provenance }[];
  evidence_bundle: { path: string; sha256: string };
  metrics: Record<MetricField, ObservedCell<number>>;
  mode: string;
  resolved_outcomes: Record<OutcomeField, ObservedCell<boolean>>;
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
    | "resolved_outcome_cells"
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
      resolved_outcomes: Record<
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
    contract: Record<string, string>,
  ): Record<string, string>;
  createReplayDriverIdentity(repoRoot: string, driverPath: string): DriverIdentity;
  createReplayHarnessManifest(
    repoRoot: string,
    driverIdentity: DriverIdentity,
    options: { dependencyClaim: DependencyClaim },
  ): HarnessManifest;
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

const TEST_CAPTURE_PLATFORM = {
  arch: "arm64",
  libc: "not_applicable",
  node_abi: "137",
  platform: "darwin",
};
const TEST_CAPTURE_EXECUTABLE_SHA256 = digest("rf04-test-capture-executable-v1");
const TEST_PORTABLE_DEPENDENCY_SHA256 = digest("rf04-test-portable-dependency-v1");
const TEST_DEPENDENCY_CLAIM: DependencyClaim = {
  capture_executable_sha256: TEST_CAPTURE_EXECUTABLE_SHA256,
  capture_platform: TEST_CAPTURE_PLATFORM,
  capture_receipt_sha256: digest(
    canonical({
      capture_platform: TEST_CAPTURE_PLATFORM,
      executable_sha256: TEST_CAPTURE_EXECUTABLE_SHA256,
      portable_sha256: TEST_PORTABLE_DEPENDENCY_SHA256,
      schema_version: 1,
    }),
  ),
  portable_sha256: TEST_PORTABLE_DEPENDENCY_SHA256,
};

function testContractEnvironment(): Record<string, string> {
  return Object.fromEntries(
    [
      "ANCHOR",
      "DEPENDENCY_CAPTURE_EXECUTABLE_SHA256",
      "DEPENDENCY_CAPTURE_PLATFORM",
      "DEPENDENCY_CAPTURE_RECEIPT_SHA256",
      "DEPENDENCY_PORTABLE_SHA256",
      "DRIVER_CONTRACT_VERSION",
      "DRIVER_PATH",
      "DRIVER_SHA256",
      "EVIDENCE_OUTPUT",
      "EVIDENCE_PATH",
      "EXPECTED_ROLES",
      "FIXTURE_REGISTRY_ORIGIN",
      "FIXTURE_REGISTRY_PATH",
      "FIXTURE_REGISTRY_SHA256",
      "HARNESS_SHA256",
      "OUTPUT",
      "RUN_ID",
    ].map((suffix) => [`AGENTPLANE_RF04_REPLAY_${suffix}`, `fixture-${suffix}`]),
  );
}

function observed<T extends number | boolean>(
  value: T,
  artifactSha256: string,
  source: string,
  category = "test_control",
): ObservedCell<T> {
  return {
    provenance: {
      artifact_id: "critical_fixture_receipt",
      artifact_sha256: artifactSha256,
      category,
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
  const episodeLedger = scenario.expected_episode_trace.map((role, episodeIndex) => ({
    effect_observation: {
      allowed_paths:
        role === "EVALUATOR" || ["missing_knowledge", "adapter_failure"].includes(scenario.id)
          ? []
          : ["work/allowed.txt"],
      changed_paths: [],
      policy:
        role === "EVALUATOR" || ["missing_knowledge", "adapter_failure"].includes(scenario.id)
          ? ("read_only" as const)
          : ("scoped_write" as const),
      same_content_rewrites: [],
      unsafe_allowed_paths: [],
      violation_paths: [],
    },
    episode_index: episodeIndex + 1,
    expected_final_status:
      role === "EVALUATOR"
        ? ("reviewed" as const)
        : ["missing_knowledge", "adapter_failure"].includes(scenario.id)
          ? ("blocked" as const)
          : ("done" as const),
    final_status:
      role === "EVALUATOR"
        ? ("reviewed" as const)
        : ["missing_knowledge", "adapter_failure"].includes(scenario.id)
          ? ("blocked" as const)
          : ("done" as const),
    provider_usage: {
      cached_input_tokens: 40 + runIndex + episodeIndex,
      input_tokens: 100 + runIndex + episodeIndex,
      output_tokens: 20 + runIndex + episodeIndex,
      reasoning_output_tokens: 10 + runIndex + episodeIndex,
      turn_completed_events: 1,
    },
    role,
    status_violation: false,
    target_matched_after_episode: null,
  }));
  metrics.llm_episodes = episodeLedger.length;
  metrics.prompt_count = episodeLedger.length;
  metrics.lifecycle_calls = scenario.expected_lifecycle_trace.length;
  const providerUsageByRole: EvidencePayload["provider_usage_by_role"] = {};
  for (const role of roles) {
    providerUsageByRole[role] = {
      cached_input_tokens: 0,
      input_tokens: 0,
      output_tokens: 0,
      reasoning_output_tokens: 0,
    };
  }
  for (const episode of episodeLedger) {
    const roleUsage = providerUsageByRole[episode.role];
    roleUsage.cached_input_tokens += episode.provider_usage.cached_input_tokens;
    roleUsage.input_tokens += episode.provider_usage.input_tokens;
    roleUsage.output_tokens += episode.provider_usage.output_tokens;
    roleUsage.reasoning_output_tokens += episode.provider_usage.reasoning_output_tokens;
  }
  const outcomes = {} as Record<OutcomeField, boolean>;
  for (const field of OUTCOME_FIELDS) {
    outcomes[field] = outcomeOverride?.[field] ?? scenario.expected_outcomes[field];
  }
  const payload: EvidencePayload = {
    diagnostics: {
      latency_ms: {
        harness_setup_latency_ms: 20 + runIndex + diagnosticOffset,
        time_to_first_scoped_mutation_ms: 30 + runIndex + diagnosticOffset,
        time_to_verified_result_ms: 60 + runIndex + diagnosticOffset,
      },
    },
    evidence: { critical_fixture_receipt: true },
    episode_ledger: episodeLedger,
    lifecycle_control: {
      call_count: scenario.expected_lifecycle_trace.length,
      provenance: "fixture_control",
      trace: scenario.expected_lifecycle_trace,
    },
    metrics,
    resolved_outcomes: outcomes,
    provider_usage_by_role: providerUsageByRole,
    supervisor_receipt: {
      anchor_runtime_integrity: { dependency_claim: TEST_DEPENDENCY_CLAIM },
    },
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
      field === "lifecycle_calls"
        ? observed(
            metrics[field],
            artifactSha256,
            "lifecycle_control.call_count",
            "fixture_control",
          )
        : observed(metrics[field], artifactSha256, `metrics.${field}`),
    ]),
  ) as Record<MetricField, ObservedCell<number>>;
  const outcomeCells = Object.fromEntries(
    OUTCOME_FIELDS.map((field) => [
      field,
      observed(outcomes[field], artifactSha256, `resolved_outcomes.${field}`),
    ]),
  ) as Record<OutcomeField, ObservedCell<boolean>>;
  const tokenCells = Object.fromEntries(
    roles.map((role) => [
      role,
      Object.fromEntries(
        TOKEN_FIELDS.map((field) => [
          field,
          observed(
            field === "reasoning_tokens"
              ? providerUsageByRole[role].reasoning_output_tokens
              : providerUsageByRole[role][field],
            artifactSha256,
            `provider_usage_by_role.${role}.${field === "reasoning_tokens" ? "reasoning_output_tokens" : field}`,
          ),
        ]),
      ),
    ]),
  ) as Record<string, Record<TokenField, ObservedCell<number>>>;
  const envelope: ReplayEnvelope = {
    anchor: {
      capture_platform: TEST_DEPENDENCY_CLAIM.capture_platform,
      dependency_capture_executable_sha256: TEST_DEPENDENCY_CLAIM.capture_executable_sha256,
      dependency_capture_receipt_sha256: TEST_DEPENDENCY_CLAIM.capture_receipt_sha256,
      dependency_portable_sha256: TEST_DEPENDENCY_CLAIM.portable_sha256,
      disposable_repository: true,
      driver: driverIdentity,
      external_effects: "fixture_backed",
      fixture_registry_origin: "fixture_control_overlay_v1",
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
        harness_setup_latency_ms: observed(
          payload.diagnostics.latency_ms.harness_setup_latency_ms,
          artifactSha256,
          "diagnostics.latency_ms.harness_setup_latency_ms",
        ),
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
    resolved_outcomes: outcomeCells,
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
  const harness = replay.createReplayHarnessManifest(REPO_ROOT, driverIdentity, {
    dependencyClaim: TEST_DEPENDENCY_CLAIM,
  });
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
      resolved_outcome_cells: { actual: 70, required: 70 },
      provider_token_cells: { actual: 27, required: 27 },
      replay_runs: { actual: 50, required: 50 },
      resolved_scalar_cells: { actual: 170, required: 170 },
      scenarios: { actual: 10, required: 10 },
    });
    expect(baseline.run_manifest).toHaveLength(50);
    expect(baseline.structural_projection.scenarios).toHaveLength(10);
    expect(baseline.golden_outcome_comparison.verdict).toBe("matches_control");
  });

  it("keeps every registry lifecycle trace explicit as a fixture control", async () => {
    const context = await testContext();

    for (const [scenarioIndex, scenario] of context.registry.scenarios.entries()) {
      const pair = context.pairs[scenarioIndex * context.replay.MINIMUM_REPLAY_RUNS];
      expect(pair.evidence.value.artifacts[0].payload.lifecycle_control).toEqual({
        call_count: scenario.expected_lifecycle_trace.length,
        provenance: "fixture_control",
        trace: scenario.expected_lifecycle_trace,
      });
      expect(pair.envelope.value.metrics.lifecycle_calls).toMatchObject({
        provenance: {
          category: "fixture_control",
          source: "lifecycle_control.call_count",
        },
        value: scenario.expected_lifecycle_trace.length,
      });
    }
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
    expect(direct?.resolved_outcomes.verified_success).toMatchObject({
      false_count: 1,
      golden_mismatch_count: 1,
      true_count: 4,
    });
    expect(direct?.resolved_outcomes.scope_violation).toMatchObject({
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

  it("binds exact repo-local driver bytes and exposes only the fixed driver contract", async () => {
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
        DYLD_INSERT_LIBRARIES: "/malicious/preload.dylib",
        GIT_CONFIG_GLOBAL: "/sensitive/gitconfig",
        HOME: "/Users/operator",
        HTTPS_PROXY: "http://proxy.invalid",
        NODE_OPTIONS: "--require=/malicious/preload.cjs",
        OPENAI_API_KEY: "explicit-secret-value",
        PATH: "/untrusted/bin",
        TMPDIR: "/sensitive/tmp",
        UNRELATED_SECRET: "must-not-pass",
      },
      testContractEnvironment(),
    );
    expect(environment).toMatchObject(testContractEnvironment());
    expect(environment.PATH).toBe(
      "/Applications/ChatGPT.app/Contents/Resources:/opt/homebrew/bin:/usr/bin:/bin",
    );
    for (const forbidden of [
      "DYLD_INSERT_LIBRARIES",
      "GIT_CONFIG_GLOBAL",
      "HOME",
      "HTTPS_PROXY",
      "NODE_OPTIONS",
      "OPENAI_API_KEY",
      "TMPDIR",
      "UNRELATED_SECRET",
    ]) {
      expect(environment).not.toHaveProperty(forbidden);
    }
    expect(() =>
      replay.buildReplayDriverEnvironment({}, { AGENTPLANE_RF04_REPLAY_RUN_ID: "direct/run-01" }),
    ).toThrow("exact reviewed key set");
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

  it("rejects episode count, order, final-event, and role-aggregate drift", async () => {
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

    const missingEpisode = clonedPairs(context.pairs);
    missingEpisode[0].evidence.value.artifacts[0].payload.episode_ledger.pop();
    relinkPair(missingEpisode[0]);
    expect(() => build(missingEpisode)).toThrow("has 0/1 expected episodes");

    const wrongOrder = clonedPairs(context.pairs);
    wrongOrder[5].evidence.value.artifacts[0].payload.episode_ledger[0].role = "EVALUATOR";
    relinkPair(wrongOrder[5]);
    expect(() => build(wrongOrder)).toThrow("must preserve expected trace role CODER");

    const duplicateFinal = clonedPairs(context.pairs);
    duplicateFinal[0].evidence.value.artifacts[0].payload.episode_ledger[0].provider_usage.turn_completed_events = 2;
    relinkPair(duplicateFinal[0]);
    expect(() => build(duplicateFinal)).toThrow(
      "must contain exactly one final turn.completed event",
    );

    const aggregateDrift = clonedPairs(context.pairs);
    aggregateDrift[0].evidence.value.artifacts[0].payload.provider_usage_by_role.CODER.reasoning_output_tokens += 1;
    relinkPair(aggregateDrift[0]);
    expect(() => build(aggregateDrift)).toThrow("must equal the exact episode ledger sum");

    const lifecycleTraceDrift = clonedPairs(context.pairs);
    lifecycleTraceDrift[0].evidence.value.artifacts[0].payload.lifecycle_control.trace.pop();
    relinkPair(lifecycleTraceDrift[0]);
    expect(() => build(lifecycleTraceDrift)).toThrow("must equal the exact registry control");

    const lifecycleProvenanceDrift = clonedPairs(context.pairs);
    lifecycleProvenanceDrift[0].envelope.value.metrics.lifecycle_calls.provenance.category =
      "supervisor_observed";
    lifecycleProvenanceDrift[0].envelope.bytes = canonical(
      lifecycleProvenanceDrift[0].envelope.value,
    );
    expect(() => build(lifecycleProvenanceDrift)).toThrow("must use fixture_control provenance");
  });
});
