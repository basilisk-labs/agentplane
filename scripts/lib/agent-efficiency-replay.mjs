import { createHash } from "node:crypto";
import { lstatSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import {
  OUTCOME_FIELDS,
  PRE_V07_EFFICIENCY_ANCHOR_COMMIT,
  RF04_SCENARIO_IDS,
  SCALAR_TELEMETRY_FIELDS,
  assertFixtureRegistry,
  stableJson,
} from "./agent-efficiency-baseline.mjs";

export const AGENT_EFFICIENCY_REPLAY_MODE = "agent_efficiency_replay_v1";
export const AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION = 1;
export const MINIMUM_REPLAY_RUNS = 5;
export const REPLAY_ANCHOR_COMMIT = PRE_V07_EFFICIENCY_ANCHOR_COMMIT;
export const TOKEN_FIELDS = Object.freeze(["input_tokens", "output_tokens", "reasoning_tokens"]);
export const DIAGNOSTIC_LATENCY_FIELDS = Object.freeze([
  "time_to_first_scoped_mutation_ms",
  "time_to_verified_result_ms",
]);
export const REPLAY_HARNESS_FILES = Object.freeze([
  "scripts/lib/agent-efficiency-replay.mjs",
  "scripts/bench/capture-agent-efficiency-replay.mjs",
  "scripts/checks/check-agent-efficiency-replay.mjs",
]);

const LATENCY_SCALAR_FIELDS = new Set(["preparation_latency_ms", "context_search_latency_ms"]);
const RATIO_FIELDS = new Set(["retrieval_recall_proxy", "evidence_observed_to_claimed_ratio"]);
const NON_INTEGER_FIELDS = new Set([...LATENCY_SCALAR_FIELDS, ...RATIO_FIELDS]);
const PROVENANCE_CATEGORIES = new Set([
  "provider_reported",
  "supervisor_observed",
  "artifact_observed",
  "agent_claimed",
  "human_supplied",
  "applicability_rule",
  "test_control",
]);
const OBSERVED_CELL_CATEGORIES = new Set(["supervisor_observed", "artifact_observed"]);
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/;
const SECRET_PATTERN =
  /(?:sk-[A-Za-z0-9_-]{16,}|gh[pousr]_[A-Za-z0-9]{16,}|-----BEGIN [A-Z ]+PRIVATE KEY-----)/;
const ABSOLUTE_WINDOWS_PATH = /^[A-Za-z]:[\\/]/;
const FORBIDDEN_PAYLOAD_KEYS = new Set([
  "chain_of_thought",
  "hostname",
  "prompt",
  "prompt_text",
  "raw_trace",
  "reasoning",
  "reasoning_text",
]);

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function object(value, label) {
  if (!isObject(value)) throw new Error(`${label} must be an object`);
  return value;
}

function nonEmptyString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function exactKeys(value, keys, label) {
  const actual = Object.keys(object(value, label)).toSorted();
  const expected = [...keys].toSorted();
  if (stableJson(actual) !== stableJson(expected)) {
    throw new Error(`${label} must contain exactly: ${expected.join(", ")}`);
  }
}

export function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function prefixedSha256(value) {
  return `sha256:${sha256(value)}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function assertSha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    throw new Error(`${label} must be a lowercase sha256:<64 hex> digest`);
  }
  return value;
}

function assertSafeString(value, label) {
  nonEmptyString(value, label);
  if (value.startsWith("/") || ABSOLUTE_WINDOWS_PATH.test(value)) {
    throw new Error(`${label} must not contain an absolute host path`);
  }
  if (SECRET_PATTERN.test(value)) {
    throw new Error(`${label} contains a credential-like value`);
  }
}

function assertSanitized(value, label = "replay envelope") {
  if (typeof value === "string") {
    if (SECRET_PATTERN.test(value)) throw new Error(`${label} contains a credential-like value`);
    if (value.startsWith("/") || ABSOLUTE_WINDOWS_PATH.test(value)) {
      throw new Error(`${label} contains an absolute host path`);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const [index, item] of value.entries()) {
      assertSanitized(item, `${label}[${index}]`);
    }
    return;
  }
  if (!isObject(value)) return;
  for (const [key, child] of Object.entries(value)) {
    if (FORBIDDEN_PAYLOAD_KEYS.has(key)) {
      throw new Error(
        `${label}.${key} is forbidden; prompts and hidden reasoning are not telemetry`,
      );
    }
    assertSanitized(child, `${label}.${key}`);
  }
}

function assertRelativePath(value, label) {
  assertSafeString(value, label);
  const normalized = path.posix.normalize(value.replaceAll("\\", "/"));
  if (normalized === "." || normalized.startsWith("../") || normalized.includes("/../")) {
    throw new Error(`${label} must remain inside the replay artifact root`);
  }
  return normalized;
}

function assertProvenance(value, label, options = {}) {
  const provenance = object(value, label);
  exactKeys(
    provenance,
    provenance.category === "applicability_rule"
      ? ["category", "source"]
      : ["artifact_sha256", "category", "source"],
    label,
  );
  const category = nonEmptyString(provenance.category, `${label}.category`);
  if (!PROVENANCE_CATEGORIES.has(category)) {
    throw new Error(`${label}.category is not an allowed provenance category: ${category}`);
  }
  if (category === "test_control" && options.allowTestControls !== true) {
    throw new Error(`${label}.category=test_control is forbidden in a persisted replay baseline`);
  }
  assertSafeString(provenance.source, `${label}.source`);
  if (category !== "applicability_rule") {
    assertSha256(provenance.artifact_sha256, `${label}.artifact_sha256`);
  }
  return provenance;
}

function assertObservedCell(value, label, options = {}) {
  const cell = object(value, label);
  exactKeys(cell, ["provenance", "resolution", "value"], label);
  if (cell.resolution !== "observed") throw new Error(`${label}.resolution must be observed`);
  const provenance = assertProvenance(cell.provenance, `${label}.provenance`, options);
  return { cell, provenance };
}

function assertOutcomeCell(value, label, expected, artifactHashes, options = {}) {
  const { cell, provenance } = assertObservedCell(value, label, options);
  if (typeof cell.value !== "boolean") throw new Error(`${label}.value must be a boolean`);
  if (
    !OBSERVED_CELL_CATEGORIES.has(provenance.category) &&
    provenance.category !== "test_control"
  ) {
    throw new Error(`${label} must come from supervisor_observed or artifact_observed evidence`);
  }
  if (cell.value !== expected) {
    throw new Error(`${label}.value=${cell.value} does not match frozen RF-04 control ${expected}`);
  }
  if (!artifactHashes.has(provenance.artifact_sha256)) {
    throw new Error(`${label}.provenance artifact is absent from envelope.artifacts`);
  }
}

function assertNumber(value, label, field) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label}.value must be a finite number >= 0`);
  }
  if (!NON_INTEGER_FIELDS.has(field) && !Number.isInteger(value)) {
    throw new Error(`${label}.value must be an integer`);
  }
  if (RATIO_FIELDS.has(field) && value > 1) {
    throw new Error(`${label}.value must be between 0 and 1`);
  }
}

function assertScalarCell(value, label, field, artifactHashes, options = {}) {
  const cell = object(value, label);
  if (cell.resolution === "not_applicable") {
    exactKeys(cell, ["provenance", "reason_code", "resolution"], label);
    assertSafeString(cell.reason_code, `${label}.reason_code`);
    const provenance = assertProvenance(cell.provenance, `${label}.provenance`, options);
    if (provenance.category !== "applicability_rule") {
      throw new Error(`${label}.provenance.category must be applicability_rule`);
    }
    return;
  }
  const observed = assertObservedCell(cell, label, options);
  assertNumber(observed.cell.value, label, field);
  if (
    !OBSERVED_CELL_CATEGORIES.has(observed.provenance.category) &&
    observed.provenance.category !== "test_control"
  ) {
    throw new Error(`${label} must use supervisor_observed or artifact_observed provenance`);
  }
  if (!artifactHashes.has(observed.provenance.artifact_sha256)) {
    throw new Error(`${label}.provenance artifact is absent from envelope.artifacts`);
  }
}

function assertTokenCell(value, label, artifactHashes, options = {}) {
  const { cell, provenance } = assertObservedCell(value, label, options);
  if (!Number.isInteger(cell.value) || cell.value < 0) {
    throw new Error(`${label}.value must be a provider-reported integer >= 0`);
  }
  const allowed =
    provenance.category === "provider_reported" ||
    (options.allowTestControls === true && provenance.category === "test_control");
  if (!allowed) throw new Error(`${label} must use provider_reported provenance`);
  if (!artifactHashes.has(provenance.artifact_sha256)) {
    throw new Error(`${label}.provenance artifact is absent from envelope.artifacts`);
  }
}

function expectedRoles(scenario) {
  return [...new Set(scenario.expected_episode_trace)];
}

function assertProfile(value, label) {
  const profile = object(value, label);
  exactKeys(
    profile,
    [
      "adapter_id",
      "cache_mode",
      "model_id",
      "provider_id",
      "reasoning_effort",
      "runtime_id",
      "runtime_version",
      "sandbox_mode",
    ],
    label,
  );
  for (const [key, item] of Object.entries(profile)) assertSafeString(item, `${label}.${key}`);
  return profile;
}

function assertArtifacts(value, label) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must contain at least one hashed evidence artifact`);
  }
  const ids = new Set();
  const hashes = new Set();
  for (const [index, raw] of value.entries()) {
    const artifact = object(raw, `${label}[${index}]`);
    exactKeys(artifact, ["id", "path", "sha256"], `${label}[${index}]`);
    assertSafeString(artifact.id, `${label}[${index}].id`);
    if (ids.has(artifact.id)) throw new Error(`${label} contains duplicate id ${artifact.id}`);
    ids.add(artifact.id);
    assertRelativePath(artifact.path, `${label}[${index}].path`);
    hashes.add(assertSha256(artifact.sha256, `${label}[${index}].sha256`));
  }
  return hashes;
}

function assertEvidence(value, label, artifactHashes, options = {}) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must contain at least one evidence item`);
  }
  const ids = new Set();
  for (const [index, raw] of value.entries()) {
    const item = object(raw, `${label}[${index}]`);
    exactKeys(item, ["id", "provenance"], `${label}[${index}]`);
    assertSafeString(item.id, `${label}[${index}].id`);
    if (ids.has(item.id)) throw new Error(`${label} contains duplicate id ${item.id}`);
    ids.add(item.id);
    const provenance = assertProvenance(item.provenance, `${label}[${index}].provenance`, options);
    if (
      provenance.category !== "human_supplied" &&
      provenance.category !== "agent_claimed" &&
      provenance.category !== "applicability_rule" &&
      !artifactHashes.has(provenance.artifact_sha256)
    ) {
      throw new Error(`${label}[${index}] references an artifact absent from envelope.artifacts`);
    }
  }
}

function assertDiagnostics(value, label, artifactHashes, options = {}) {
  const diagnostics = object(value, label);
  exactKeys(diagnostics, ["captured_at", "host_fingerprint", "latency_ms"], label);
  const capturedAt = nonEmptyString(diagnostics.captured_at, `${label}.captured_at`);
  if (!Number.isFinite(Date.parse(capturedAt))) {
    throw new TypeError(`${label}.captured_at must be an ISO timestamp`);
  }
  assertSha256(diagnostics.host_fingerprint, `${label}.host_fingerprint`);
  exactKeys(diagnostics.latency_ms, DIAGNOSTIC_LATENCY_FIELDS, `${label}.latency_ms`);
  for (const field of DIAGNOSTIC_LATENCY_FIELDS) {
    assertScalarCell(
      diagnostics.latency_ms[field],
      `${label}.latency_ms.${field}`,
      field,
      artifactHashes,
      options,
    );
  }
}

export function fixtureRegistrySha256(registry) {
  return prefixedSha256(canonicalBytes(registry));
}

export function createReplayHarnessManifest(repoRoot, files = REPLAY_HARNESS_FILES) {
  const entries = files.map((relativePath) => {
    const normalized = assertRelativePath(relativePath, "harness file path");
    return {
      path: normalized,
      sha256: prefixedSha256(readFileSync(path.join(repoRoot, normalized))),
    };
  });
  return {
    files: entries,
    sha256: prefixedSha256(canonicalBytes(entries)),
  };
}

export function assertReplayEnvelope(envelope, context) {
  assertSanitized(envelope);
  const value = object(envelope, "replay envelope");
  exactKeys(
    value,
    [
      "anchor",
      "artifacts",
      "diagnostics",
      "evidence",
      "metrics",
      "mode",
      "observed_outcomes",
      "profile",
      "run_id",
      "run_index",
      "scenario_id",
      "schema_version",
      "token_usage_by_role",
    ],
    "replay envelope",
  );
  if (value.mode !== AGENT_EFFICIENCY_REPLAY_MODE) {
    throw new Error(`replay envelope.mode must be ${AGENT_EFFICIENCY_REPLAY_MODE}`);
  }
  if (value.schema_version !== AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION) {
    throw new Error(
      `replay envelope.schema_version must be ${AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION}`,
    );
  }
  const scenario = context.scenarioById.get(value.scenario_id);
  if (!scenario) throw new Error(`unknown RF-04 scenario: ${value.scenario_id}`);
  if (!Number.isInteger(value.run_index) || value.run_index < 1 || value.run_index > context.runs) {
    throw new Error(`replay envelope.run_index must be between 1 and ${context.runs}`);
  }
  const expectedRunId = `${value.scenario_id}/run-${String(value.run_index).padStart(2, "0")}`;
  if (value.run_id !== expectedRunId) {
    throw new Error(`replay envelope.run_id must be ${expectedRunId}`);
  }
  exactKeys(
    value.anchor,
    [
      "disposable_repository",
      "external_effects",
      "fixture_registry_sha256",
      "harness_sha256",
      "subject_sha",
    ],
    "replay envelope.anchor",
  );
  if (value.anchor.subject_sha !== context.anchor) {
    throw new Error(`replay envelope anchor must be exact commit ${context.anchor}`);
  }
  if (value.anchor.fixture_registry_sha256 !== context.fixtureRegistrySha256) {
    throw new Error("replay envelope fixture registry digest does not match the capture registry");
  }
  if (value.anchor.harness_sha256 !== context.harnessSha256) {
    throw new Error("replay envelope harness digest does not match the capture harness");
  }
  if (value.anchor.disposable_repository !== true) {
    throw new Error("replay envelope must come from a disposable repository");
  }
  if (value.anchor.external_effects !== "fixture_backed") {
    throw new Error("replay envelope external effects must be fixture_backed");
  }

  const profile = assertProfile(value.profile, "replay envelope.profile");
  const artifactHashes = assertArtifacts(value.artifacts, "replay envelope.artifacts");
  assertEvidence(value.evidence, "replay envelope.evidence", artifactHashes, context);

  exactKeys(value.observed_outcomes, OUTCOME_FIELDS, "replay envelope.observed_outcomes");
  for (const field of OUTCOME_FIELDS) {
    assertOutcomeCell(
      value.observed_outcomes[field],
      `replay envelope.observed_outcomes.${field}`,
      scenario.expected_outcomes[field],
      artifactHashes,
      context,
    );
  }

  exactKeys(value.metrics, SCALAR_TELEMETRY_FIELDS, "replay envelope.metrics");
  for (const field of SCALAR_TELEMETRY_FIELDS) {
    assertScalarCell(
      value.metrics[field],
      `replay envelope.metrics.${field}`,
      field,
      artifactHashes,
      context,
    );
  }

  const roles = expectedRoles(scenario);
  exactKeys(value.token_usage_by_role, roles, "replay envelope.token_usage_by_role");
  for (const role of roles) {
    exactKeys(
      value.token_usage_by_role[role],
      TOKEN_FIELDS,
      `replay envelope.token_usage_by_role.${role}`,
    );
    for (const field of TOKEN_FIELDS) {
      assertTokenCell(
        value.token_usage_by_role[role][field],
        `replay envelope.token_usage_by_role.${role}.${field}`,
        artifactHashes,
        context,
      );
    }
  }
  assertDiagnostics(value.diagnostics, "replay envelope.diagnostics", artifactHashes, context);
  return { profile, scenario };
}

function valuesForCells(envelopes, selector) {
  return envelopes.map((envelope) => selector(envelope));
}

function round(value) {
  return Number(value.toFixed(6));
}

function distribution(values) {
  if (values.length === 0) return null;
  const sorted = [...values].toSorted((left, right) => left - right);
  const mean = sorted.reduce((sum, value) => sum + value, 0) / sorted.length;
  const variance = sorted.reduce((sum, value) => sum + (value - mean) ** 2, 0) / sorted.length;
  return {
    count: sorted.length,
    max: sorted.at(-1),
    mean: round(mean),
    median:
      sorted.length % 2 === 1
        ? sorted[(sorted.length - 1) / 2]
        : round((sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2),
    min: sorted[0],
    p95: sorted[Math.max(0, Math.ceil(sorted.length * 0.95) - 1)],
    standard_deviation: round(Math.sqrt(variance)),
  };
}

function resolutionProjection(cells, label, options = {}) {
  const resolutions = [...new Set(cells.map((cell) => cell.resolution))];
  if (resolutions.length !== 1) throw new Error(`${label} mixes observed and not_applicable runs`);
  const provenanceCategories = [
    ...new Set(cells.map((cell) => cell.provenance.category)),
  ].toSorted();
  if (resolutions[0] === "not_applicable") {
    const rules = [
      ...new Set(cells.map((cell) => `${cell.reason_code}:${cell.provenance.source}`)),
    ].toSorted();
    if (rules.length !== 1) throw new Error(`${label} uses inconsistent applicability rules`);
    return {
      applicability_rule: rules[0],
      provenance_categories: provenanceCategories,
      resolution: "not_applicable",
    };
  }
  return {
    ...(options.diagnosticOnly === true
      ? { diagnostic_only: true }
      : { distribution: distribution(cells.map((cell) => cell.value)) }),
    provenance_categories: provenanceCategories,
    resolution: "observed",
  };
}

function evidenceProjection(envelopes) {
  const counts = {};
  for (const envelope of envelopes) {
    for (const item of envelope.evidence) {
      const category = item.provenance.category;
      counts[category] = (counts[category] ?? 0) + 1;
    }
  }
  return Object.fromEntries(
    Object.entries(counts).toSorted(([left], [right]) => left.localeCompare(right)),
  );
}

function scenarioProjection(scenario, envelopes) {
  const outcomes = {};
  for (const field of OUTCOME_FIELDS) {
    const cells = valuesForCells(envelopes, (envelope) => envelope.observed_outcomes[field]);
    const values = [...new Set(cells.map((cell) => cell.value))];
    if (values.length !== 1) throw new Error(`${scenario.id}.${field} differs across replay runs`);
    outcomes[field] = {
      provenance_categories: [...new Set(cells.map((cell) => cell.provenance.category))].toSorted(),
      value: values[0],
    };
  }

  const metrics = {};
  for (const field of SCALAR_TELEMETRY_FIELDS) {
    metrics[field] = resolutionProjection(
      valuesForCells(envelopes, (envelope) => envelope.metrics[field]),
      `${scenario.id}.metrics.${field}`,
      { diagnosticOnly: LATENCY_SCALAR_FIELDS.has(field) },
    );
  }

  const tokenUsage = {};
  for (const role of expectedRoles(scenario)) {
    tokenUsage[role] = {};
    for (const field of TOKEN_FIELDS) {
      tokenUsage[role][field] = resolutionProjection(
        valuesForCells(envelopes, (envelope) => envelope.token_usage_by_role[role][field]),
        `${scenario.id}.token_usage_by_role.${role}.${field}`,
        { diagnosticOnly: true },
      );
    }
  }

  return {
    evidence_provenance_counts: evidenceProjection(envelopes),
    id: scenario.id,
    metrics,
    observed_outcomes: outcomes,
    run_count: envelopes.length,
    token_usage_by_role: tokenUsage,
  };
}

function scenarioDiagnostics(scenario, envelopes) {
  const metricDistributions = {};
  for (const field of SCALAR_TELEMETRY_FIELDS) {
    const cells = valuesForCells(envelopes, (envelope) => envelope.metrics[field]);
    metricDistributions[field] =
      cells[0].resolution === "observed" ? distribution(cells.map((cell) => cell.value)) : null;
  }
  const tokenDistributions = {};
  for (const role of expectedRoles(scenario)) {
    tokenDistributions[role] = {};
    for (const field of TOKEN_FIELDS) {
      tokenDistributions[role][field] = distribution(
        envelopes.map((envelope) => envelope.token_usage_by_role[role][field].value),
      );
    }
  }
  const latencyDistributions = {};
  for (const field of DIAGNOSTIC_LATENCY_FIELDS) {
    const cells = envelopes.map((envelope) => envelope.diagnostics.latency_ms[field]);
    latencyDistributions[field] =
      cells[0].resolution === "observed" ? distribution(cells.map((cell) => cell.value)) : null;
  }
  return {
    id: scenario.id,
    latency_ms: latencyDistributions,
    metrics: metricDistributions,
    token_usage_by_role: tokenDistributions,
  };
}

function coverageFor(registry, grouped, runs) {
  let outcomes = 0;
  let scalars = 0;
  let tokens = 0;
  for (const scenario of registry.scenarios) {
    const envelopes = grouped.get(scenario.id) ?? [];
    if (envelopes.length !== runs) continue;
    outcomes += OUTCOME_FIELDS.length;
    scalars += SCALAR_TELEMETRY_FIELDS.length;
    tokens += expectedRoles(scenario).length * TOKEN_FIELDS.length;
  }
  return {
    observed_outcome_cells: { actual: outcomes, required: 70 },
    provider_token_cells: { actual: tokens, required: 27 },
    replay_runs: {
      actual: [...grouped.values()].flat().length,
      required: registry.scenarios.length * runs,
    },
    resolved_scalar_cells: { actual: scalars, required: 170 },
    scenarios: { actual: grouped.size, required: RF04_SCENARIO_IDS.length },
  };
}

function assertCoverage(coverage) {
  for (const [label, value] of Object.entries(coverage)) {
    if (value.actual !== value.required) {
      throw new Error(`${label} coverage is ${value.actual}/${value.required}`);
    }
  }
}

export function buildReplayBaseline({
  registry,
  envelopeRecords,
  harnessManifest,
  anchor = REPLAY_ANCHOR_COMMIT,
  runs = MINIMUM_REPLAY_RUNS,
  allowTestControls = false,
}) {
  assertFixtureRegistry(registry, { historicalBaseline: true });
  if (anchor !== REPLAY_ANCHOR_COMMIT) {
    throw new Error(`replay anchor must remain exact commit ${REPLAY_ANCHOR_COMMIT}`);
  }
  if (!Number.isInteger(runs) || runs < MINIMUM_REPLAY_RUNS) {
    throw new Error(`replay requires at least ${MINIMUM_REPLAY_RUNS} runs per scenario`);
  }
  const scenarioById = new Map(registry.scenarios.map((scenario) => [scenario.id, scenario]));
  const registryDigest = fixtureRegistrySha256(registry);
  const grouped = new Map();
  let fixedProfile = null;
  const runManifest = [];
  const seenRunIds = new Set();

  for (const record of envelopeRecords) {
    const envelope = record.value;
    const canonical = canonicalBytes(envelope);
    if (record.bytes !== canonical) {
      throw new Error(`${record.path} must use canonical stable JSON with one trailing newline`);
    }
    const { profile } = assertReplayEnvelope(envelope, {
      allowTestControls,
      anchor,
      fixtureRegistrySha256: registryDigest,
      harnessSha256: harnessManifest.sha256,
      runs,
      scenarioById,
    });
    if (seenRunIds.has(envelope.run_id))
      throw new Error(`duplicate replay run: ${envelope.run_id}`);
    seenRunIds.add(envelope.run_id);
    const profileText = stableJson(profile);
    if (fixedProfile === null) fixedProfile = profileText;
    if (profileText !== fixedProfile) {
      throw new Error(`${envelope.run_id} does not use the fixed replay model/runtime profile`);
    }
    const scenarioRuns = grouped.get(envelope.scenario_id) ?? [];
    scenarioRuns.push(envelope);
    grouped.set(envelope.scenario_id, scenarioRuns);
    runManifest.push({
      path: assertRelativePath(record.path, "replay envelope path"),
      run_id: envelope.run_id,
      sha256: prefixedSha256(record.bytes),
    });
  }

  for (const scenario of registry.scenarios) {
    const envelopes = (grouped.get(scenario.id) ?? []).toSorted(
      (left, right) => left.run_index - right.run_index,
    );
    if (envelopes.length !== runs) {
      throw new Error(`${scenario.id} has ${envelopes.length}/${runs} required replay runs`);
    }
    const indices = envelopes.map((envelope) => envelope.run_index);
    const expected = Array.from({ length: runs }, (_, index) => index + 1);
    if (stableJson(indices) !== stableJson(expected)) {
      throw new Error(`${scenario.id} replay indices must be exactly 1..${runs}`);
    }
    grouped.set(scenario.id, envelopes);
  }

  const coverage = coverageFor(registry, grouped, runs);
  assertCoverage(coverage);
  const profile = JSON.parse(fixedProfile);
  const structuralProjection = {
    anchor_commit: anchor,
    fixture_registry_sha256: registryDigest,
    harness_sha256: harnessManifest.sha256,
    mode: AGENT_EFFICIENCY_REPLAY_MODE,
    profile_sha256: prefixedSha256(canonicalBytes(profile)),
    scenarios: registry.scenarios.map((scenario) =>
      scenarioProjection(scenario, grouped.get(scenario.id)),
    ),
    schema_version: AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
  };
  const diagnostics = {
    captured_at: {
      first: envelopeRecords.map((record) => record.value.diagnostics.captured_at).toSorted()[0],
      last: envelopeRecords
        .map((record) => record.value.diagnostics.captured_at)
        .toSorted()
        .at(-1),
    },
    host_fingerprints: [
      ...new Set(envelopeRecords.map((record) => record.value.diagnostics.host_fingerprint)),
    ].toSorted(),
    scenarios: registry.scenarios.map((scenario) =>
      scenarioDiagnostics(scenario, grouped.get(scenario.id)),
    ),
  };
  const sortedManifest = runManifest.toSorted((left, right) =>
    left.run_id.localeCompare(right.run_id),
  );
  return {
    anchor: {
      fixture_registry_sha256: registryDigest,
      harness: harnessManifest,
      subject_sha: anchor,
    },
    capture_profile: profile,
    coverage,
    diagnostics,
    diagnostics_sha256: prefixedSha256(canonicalBytes(diagnostics)),
    mode: AGENT_EFFICIENCY_REPLAY_MODE,
    run_manifest: sortedManifest,
    run_manifest_sha256: prefixedSha256(canonicalBytes(sortedManifest)),
    schema_version: AGENT_EFFICIENCY_REPLAY_SCHEMA_VERSION,
    status: "complete",
    structural_projection: structuralProjection,
    structural_projection_sha256: prefixedSha256(canonicalBytes(structuralProjection)),
  };
}

export function assertFrozenReplayBaseline(frozen, rebuilt, label = "replay baseline") {
  if (stableJson(frozen) !== stableJson(rebuilt)) {
    throw new Error(
      `${label} is not the deterministic rebuild of its canonical envelopes; ` +
        "changed usage, outcome, provenance, run count, or artifact hashes are rejected",
    );
  }
}

function collectJsonFiles(directory) {
  const result = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...collectJsonFiles(fullPath));
    else if (entry.isSymbolicLink())
      throw new Error(`replay source must not contain symlink: ${fullPath}`);
    else if (entry.isFile() && entry.name.endsWith(".json")) result.push(fullPath);
  }
  return result;
}

export function readReplayEnvelopeRecords(repoRoot, sourceDirectory) {
  const stats = lstatSync(sourceDirectory, { throwIfNoEntry: false });
  if (!stats?.isDirectory()) {
    throw new Error(
      "authoritative replay capture is absent: provide canonical envelopes or an explicitly " +
        "authorized driver whose provider events expose input_tokens, output_tokens, and reasoning_tokens",
    );
  }
  const files = collectJsonFiles(sourceDirectory).toSorted();
  return files.map((filePath) => {
    const bytes = readFileSync(filePath, "utf8");
    return {
      bytes,
      path: path.relative(repoRoot, filePath).split(path.sep).join("/"),
      value: JSON.parse(bytes),
    };
  });
}

export function replayBaselineBytes(value) {
  return canonicalBytes(value);
}
