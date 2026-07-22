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

type MetricField = (typeof METRIC_FIELDS)[number];
type OutcomeField = (typeof OUTCOME_FIELDS)[number];
type TokenField = "input_tokens" | "output_tokens" | "reasoning_tokens";
type Provenance = {
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
  files: { path: string; sha256: string }[];
  sha256: string;
};
type ReplayEnvelope = {
  anchor: {
    disposable_repository: boolean;
    external_effects: string;
    fixture_registry_sha256: string;
    harness_sha256: string;
    subject_sha: string;
  };
  artifacts: { id: string; path: string; sha256: string }[];
  diagnostics: {
    captured_at: string;
    host_fingerprint: string;
    latency_ms: Record<
      "time_to_first_scoped_mutation_ms" | "time_to_verified_result_ms",
      ObservedCell<number>
    >;
  };
  evidence: { id: string; provenance: Provenance }[];
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
  run_manifest: unknown[];
  status: string;
  structural_projection: { scenarios: unknown[] };
  structural_projection_sha256: string;
};
type BuildOptions = {
  allowTestControls?: boolean;
  envelopeRecords: EnvelopeRecord[];
  harnessManifest: HarnessManifest;
  registry: FixtureRegistry;
};
type ReplayModule = {
  MINIMUM_REPLAY_RUNS: number;
  REPLAY_ANCHOR_COMMIT: string;
  buildReplayBaseline(options: BuildOptions): ReplayBaseline;
  assertFrozenReplayBaseline(frozen: ReplayBaseline, rebuilt: ReplayBaseline): void;
  createReplayHarnessManifest(repoRoot: string): HarnessManifest;
  fixtureRegistrySha256(registry: FixtureRegistry): string;
};

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

function observed<T extends number | boolean>(value: T, artifactSha256: string): ObservedCell<T> {
  return {
    provenance: {
      artifact_sha256: artifactSha256,
      category: "test_control",
      source: "critical_fixture",
    },
    resolution: "observed",
    value,
  };
}

function makeEnvelope(options: {
  anchor: string;
  fixtureDigest: string;
  harnessDigest: string;
  runIndex: number;
  scenario: ReplayScenario;
}): ReplayEnvelope {
  const { anchor, fixtureDigest, harnessDigest, runIndex, scenario } = options;
  const artifactSha256 = digest(`${scenario.id}:${runIndex}:critical-fixture`);
  const roles = [...new Set<string>(scenario.expected_episode_trace)];
  const metrics = {} as Record<MetricField, ObservedCell<number>>;
  for (const [fieldIndex, field] of METRIC_FIELDS.entries()) {
    metrics[field] = observed(
      field.includes("ratio") || field.includes("recall") ? 0.5 : runIndex + fieldIndex,
      artifactSha256,
    );
  }
  const tokenUsage: Record<string, Record<TokenField, ObservedCell<number>>> = {};
  for (const [roleIndex, role] of roles.entries()) {
    tokenUsage[role] = {
      input_tokens: observed(100 + runIndex + roleIndex, artifactSha256),
      output_tokens: observed(20 + runIndex + roleIndex, artifactSha256),
      reasoning_tokens: observed(10 + runIndex + roleIndex, artifactSha256),
    };
  }
  const outcomes = {} as Record<OutcomeField, ObservedCell<boolean>>;
  for (const field of OUTCOME_FIELDS) {
    outcomes[field] = observed(scenario.expected_outcomes[field], artifactSha256);
  }
  return {
    anchor: {
      disposable_repository: true,
      external_effects: "fixture_backed",
      fixture_registry_sha256: fixtureDigest,
      harness_sha256: harnessDigest,
      subject_sha: anchor,
    },
    artifacts: [
      {
        id: "critical_fixture_receipt",
        path: `artifacts/${scenario.id}/run-${String(runIndex).padStart(2, "0")}.json`,
        sha256: artifactSha256,
      },
    ],
    diagnostics: {
      captured_at: `2026-01-${String(runIndex).padStart(2, "0")}T00:00:00.000Z`,
      host_fingerprint: digest(`host-${runIndex}`),
      latency_ms: {
        time_to_first_scoped_mutation_ms: observed(30 + runIndex, artifactSha256),
        time_to_verified_result_ms: observed(60 + runIndex, artifactSha256),
      },
    },
    evidence: [
      {
        id: "critical_fixture_receipt",
        provenance: {
          artifact_sha256: artifactSha256,
          category: "test_control",
          source: "critical_fixture",
        },
      },
    ],
    metrics,
    mode: "agent_efficiency_replay_v1",
    observed_outcomes: outcomes,
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
    run_id: `${scenario.id}/run-${String(runIndex).padStart(2, "0")}`,
    run_index: runIndex,
    scenario_id: scenario.id,
    schema_version: 1,
    token_usage_by_role: tokenUsage,
  };
}

async function testContext(): Promise<{
  baseline: ReplayBaseline;
  records: EnvelopeRecord[];
  registry: FixtureRegistry;
  replay: ReplayModule;
  harness: HarnessManifest;
}> {
  const replay = (await import(REPLAY_LIBRARY_URL)) as ReplayModule;
  const registry = JSON.parse(await readFile(REGISTRY_PATH, "utf8")) as FixtureRegistry;
  const harness = replay.createReplayHarnessManifest(REPO_ROOT);
  const fixtureDigest = replay.fixtureRegistrySha256(registry);
  const records = registry.scenarios.flatMap((scenario) =>
    Array.from({ length: replay.MINIMUM_REPLAY_RUNS }, (_, index) => {
      const value = makeEnvelope({
        anchor: replay.REPLAY_ANCHOR_COMMIT,
        fixtureDigest,
        harnessDigest: harness.sha256,
        runIndex: index + 1,
        scenario,
      });
      return {
        bytes: canonical(value),
        path: `scripts/bench/agent-efficiency-replay-envelopes/${scenario.id}/run-${String(index + 1).padStart(2, "0")}.json`,
        value,
      };
    }),
  );
  const baseline = replay.buildReplayBaseline({
    allowTestControls: true,
    envelopeRecords: records,
    harnessManifest: harness,
    registry,
  });
  return { baseline, records, registry, replay, harness };
}

function clonedRecords(records: EnvelopeRecord[]): EnvelopeRecord[] {
  return structuredClone(records).map((record) => ({
    ...record,
    bytes: canonical(record.value),
  }));
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
  });

  it("keeps timestamps, hosts, and latency samples outside the structural digest", async () => {
    const { baseline, records, registry, replay, harness } = await testContext();
    const changed = clonedRecords(records);
    for (const [index, record] of changed.entries()) {
      record.value.diagnostics.captured_at = "2030-01-01T00:00:00.000Z";
      record.value.diagnostics.host_fingerprint = digest(`different-host-${index}`);
      record.value.diagnostics.latency_ms.time_to_first_scoped_mutation_ms.value += 1000;
      record.value.diagnostics.latency_ms.time_to_verified_result_ms.value += 1000;
      record.value.metrics.preparation_latency_ms.value += 1000;
      record.value.metrics.context_search_latency_ms.value += 1000;
      record.bytes = canonical(record.value);
    }
    const rebuilt = replay.buildReplayBaseline({
      allowTestControls: true,
      envelopeRecords: changed,
      harnessManifest: harness,
      registry,
    });

    expect(rebuilt.structural_projection_sha256).toBe(baseline.structural_projection_sha256);
    expect(rebuilt.diagnostics_sha256).not.toBe(baseline.diagnostics_sha256);
  });

  it("rejects anchor, usage, outcome, provenance, run-count, and artifact tampering", async () => {
    const { baseline, records, registry, replay, harness } = await testContext();
    const build = (candidate: EnvelopeRecord[]) =>
      replay.buildReplayBaseline({
        allowTestControls: true,
        envelopeRecords: candidate,
        harnessManifest: harness,
        registry,
      });

    const anchorTamper = clonedRecords(records);
    anchorTamper[0].value.anchor.subject_sha = "a".repeat(40);
    anchorTamper[0].bytes = canonical(anchorTamper[0].value);
    expect(() => build(anchorTamper)).toThrow("anchor must be exact commit");

    const usageTamper = clonedRecords(records);
    usageTamper[0].value.token_usage_by_role.CODER.input_tokens.value += 1;
    usageTamper[0].bytes = canonical(usageTamper[0].value);
    const usageRebuild = build(usageTamper);
    expect(() => replay.assertFrozenReplayBaseline(baseline, usageRebuild)).toThrow(
      "changed usage, outcome, provenance, run count, or artifact hashes are rejected",
    );

    const outcomeTamper = clonedRecords(records);
    outcomeTamper[0].value.observed_outcomes.verified_success.value =
      !outcomeTamper[0].value.observed_outcomes.verified_success.value;
    outcomeTamper[0].bytes = canonical(outcomeTamper[0].value);
    expect(() => build(outcomeTamper)).toThrow("does not match frozen RF-04 control");

    const provenanceTamper = clonedRecords(records);
    provenanceTamper[0].value.token_usage_by_role.CODER.reasoning_tokens.provenance.category =
      "agent_claimed";
    provenanceTamper[0].bytes = canonical(provenanceTamper[0].value);
    expect(() => build(provenanceTamper)).toThrow("must use provider_reported provenance");

    expect(() => build(records.slice(1))).toThrow("has 4/5 required replay runs");

    const artifactTamper = clonedRecords(records);
    artifactTamper[0].value.artifacts[0].sha256 = digest("changed-artifact");
    artifactTamper[0].bytes = canonical(artifactTamper[0].value);
    expect(() => build(artifactTamper)).toThrow("artifact absent from envelope.artifacts");
  });

  it("does not accept estimated or agent-claimed reasoning usage", async () => {
    const { records, registry, replay, harness } = await testContext();
    const candidate = clonedRecords(records);
    candidate[0].value.token_usage_by_role.CODER.reasoning_tokens.provenance.category =
      "artifact_observed";
    candidate[0].bytes = canonical(candidate[0].value);

    expect(() =>
      replay.buildReplayBaseline({
        envelopeRecords: candidate,
        harnessManifest: harness,
        registry,
      }),
    ).toThrow();
  });
});
