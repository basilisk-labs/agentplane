import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

export const AGENT_EFFICIENCY_MODE = "agent_efficiency_v2";
export const AGENT_EFFICIENCY_FIXTURE_MODE = "agent_efficiency_fixture_registry_v2";
export const AGENT_EFFICIENCY_SCHEMA_VERSION = 2;
export const STRUCTURAL_COST_MAX_GROWTH_RATIO = 0.1;
export const PRE_V07_OBSERVABILITY_GAP = "not_observed_at_pre_v0.7_main_anchor";

export const RF04_SCENARIO_IDS = Object.freeze([
  "direct",
  "branch_pr",
  "context_assimilation",
  "stale_state",
  "approval_required",
  "missing_knowledge",
  "evaluator_rework",
  "scope_violation",
  "adapter_failure",
  "hermes_one_step",
]);

export const SCALAR_TELEMETRY_FIELDS = Object.freeze([
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
]);

export const STRUCTURAL_COST_FIELDS = Object.freeze([
  "prompt_count",
  "bundle_bytes",
  "bootstrap_bytes",
  "prompt_boilerplate_bytes",
  "stdout_bytes",
  "stderr_bytes",
  "duplicate_input_bytes",
  "llm_episodes",
  "lifecycle_calls",
  "retrieval_gaps",
]);

const TOKEN_FIELDS = Object.freeze(["input_tokens", "output_tokens", "reasoning_tokens"]);
const EVIDENCE_PROVENANCE_VALUES = Object.freeze(["observed", "agent_claimed", "human_supplied"]);
const EVIDENCE_PROVENANCE_RANK = Object.freeze({
  agent_claimed: 0,
  human_supplied: 1,
  observed: 2,
});
const QUALITY_DIRECTIONS = Object.freeze({
  verified_success: "higher",
  rework_required: "lower",
  blocked: "lower",
  context_gap: "lower",
  scope_violation: "lower",
  approval_respected: "higher",
  adapter_failure: "lower",
});
export const OUTCOME_FIELDS = Object.freeze(Object.keys(QUALITY_DIRECTIONS));

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertObject(value, label) {
  if (!isObject(value)) throw new Error(`${label} must be an object`);
  return value;
}

function assertString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}

function assertBoolean(value, label) {
  if (typeof value !== "boolean") throw new Error(`${label} must be a boolean`);
  return value;
}

function nullableNonNegativeNumber(value, label) {
  if (value === null || value === undefined) return null;
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be null or a finite number >= 0`);
  }
  return value;
}

export function relativeRepoPath(repoRoot, filePath, label) {
  const relative = path.relative(repoRoot, path.resolve(repoRoot, filePath));
  if (relative === "" || relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`${label} must resolve to a file inside the repository`);
  }
  return relative.split(path.sep).join("/");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sortForStableJson(value) {
  if (Array.isArray(value)) return value.map((item) => sortForStableJson(item));
  if (!isObject(value)) return value;
  return Object.fromEntries(
    Object.keys(value)
      .toSorted()
      .map((key) => [key, sortForStableJson(value[key])]),
  );
}

export function stableJson(value, space = 0) {
  return JSON.stringify(sortForStableJson(value), null, space);
}

export function structuralProjectionBytes(payload) {
  assertMeasurement(payload, "measurement");
  return `${stableJson(payload.structural_projection, 2)}\n`;
}

function readJsonFile(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`failed to read ${label} at ${filePath}: ${message}`);
  }
}

export function readFixtureRegistry(filePath) {
  const registry = readJsonFile(filePath, "agent-efficiency fixture registry");
  assertFixtureRegistry(registry);
  return registry;
}

export function readAgentEfficiencyMeasurement(
  filePath,
  label = "agent-efficiency measurement",
  options = {},
) {
  const measurement = readJsonFile(filePath, label);
  assertMeasurement(measurement, label, options);
  return measurement;
}

function assertExpectedOutcomes(value, label) {
  const outcomes = assertObject(value, label);
  assertString(outcomes.outcome, `${label}.outcome`);
  for (const field of Object.keys(QUALITY_DIRECTIONS)) {
    assertBoolean(outcomes[field], `${label}.${field}`);
  }
  return outcomes;
}

export function assertFixtureRegistry(registry) {
  assertObject(registry, "fixture registry");
  if (
    registry.schema_version !== AGENT_EFFICIENCY_SCHEMA_VERSION ||
    registry.mode !== AGENT_EFFICIENCY_FIXTURE_MODE
  ) {
    throw new Error(
      `fixture registry must use schema_version=${AGENT_EFFICIENCY_SCHEMA_VERSION} and mode=${AGENT_EFFICIENCY_FIXTURE_MODE}`,
    );
  }

  const provenance = assertObject(registry.provenance, "fixture registry provenance");
  assertString(provenance.compatibility_release, "provenance.compatibility_release");
  const anchor = assertString(
    provenance.efficiency_anchor_commit,
    "provenance.efficiency_anchor_commit",
  );
  if (!/^[0-9a-f]{40}$/u.test(anchor)) {
    throw new Error("provenance.efficiency_anchor_commit must be a full Git commit SHA");
  }
  assertString(provenance.explanation, "provenance.explanation");
  assertString(provenance.observability_gap, "provenance.observability_gap");

  if (!Array.isArray(registry.scenarios)) {
    throw new TypeError("fixture registry scenarios must be an array");
  }
  const ids = registry.scenarios.map((scenario) => scenario?.id);
  if (stableJson(ids) !== stableJson(RF04_SCENARIO_IDS)) {
    throw new Error(
      `fixture registry must contain exactly the ten RF-04 scenarios in order: ${RF04_SCENARIO_IDS.join(", ")}`,
    );
  }

  for (const [index, scenario] of registry.scenarios.entries()) {
    const label = `scenarios[${index}] (${scenario.id})`;
    assertString(scenario.label, `${label}.label`);
    assertString(scenario.description, `${label}.description`);
    assertExpectedOutcomes(scenario.expected_outcomes, `${label}.expected_outcomes`);

    for (const field of [
      "expected_lifecycle_trace",
      "expected_episode_trace",
      "evidence_controls",
    ]) {
      if (!Array.isArray(scenario[field])) throw new Error(`${label}.${field} must be an array`);
    }
    for (const [traceIndex, call] of scenario.expected_lifecycle_trace.entries()) {
      assertString(call, `${label}.expected_lifecycle_trace[${traceIndex}]`);
    }
    for (const [episodeIndex, role] of scenario.expected_episode_trace.entries()) {
      assertString(role, `${label}.expected_episode_trace[${episodeIndex}]`);
    }
    for (const [evidenceIndex, evidence] of scenario.evidence_controls.entries()) {
      const evidenceLabel = `${label}.evidence_controls[${evidenceIndex}]`;
      assertString(evidence?.id, `${evidenceLabel}.id`);
      if (!EVIDENCE_PROVENANCE_VALUES.includes(evidence?.provenance)) {
        throw new Error(
          `${evidenceLabel}.provenance must be one of ${EVIDENCE_PROVENANCE_VALUES.join(", ")}`,
        );
      }
      if (evidence.provenance === "observed") {
        assertString(evidence.source, `${evidenceLabel}.source`);
        if (scenario.runner_artifact === null) {
          throw new Error(`${evidenceLabel} cannot be observed without a runner artifact source`);
        }
      }
    }

    if (scenario.runner_artifact !== null) {
      const artifact = assertObject(scenario.runner_artifact, `${label}.runner_artifact`);
      for (const field of ["run_state_path", "bundle_path", "bootstrap_path"]) {
        assertString(artifact[field], `${label}.runner_artifact.${field}`);
      }
      assertString(artifact.relevance, `${label}.runner_artifact.relevance`);
    }
  }

  return registry;
}

function collectRepeatedStrings(value, counts) {
  if (typeof value === "string") {
    const normalized = value.replaceAll("\r\n", "\n");
    const bytes = Buffer.byteLength(normalized, "utf8");
    if (bytes >= 32) {
      const current = counts.get(normalized) ?? { bytes, count: 0 };
      current.count += 1;
      counts.set(normalized, current);
    }
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectRepeatedStrings(item, counts);
    return;
  }
  if (isObject(value)) {
    for (const item of Object.values(value)) collectRepeatedStrings(item, counts);
  }
}

export function duplicateInputBytes(bundle) {
  const counts = new Map();
  collectRepeatedStrings(bundle, counts);
  let duplicateBytes = 0;
  for (const entry of counts.values()) {
    if (entry.count > 1) duplicateBytes += entry.bytes * (entry.count - 1);
  }
  return duplicateBytes;
}

function gapCell(gap) {
  return { value: null, provenance: null, observability_gap: gap };
}

function knownCell(value, provenance) {
  return { value, provenance, observability_gap: null };
}

function metricCell(value, provenance, gap) {
  return value === null || value === undefined ? gapCell(gap) : knownCell(value, provenance);
}

function outcomeCell(value, provenance, gap) {
  if (value === null || value === undefined) return gapCell(gap);
  if (typeof value !== "boolean") throw new Error("observed outcome value must be boolean or null");
  return knownCell(value, provenance);
}

function metricSource(pathPrefix, fieldPath) {
  return `${pathPrefix}#${fieldPath}`;
}

function readMetric(source, field, label) {
  return nullableNonNegativeNumber(source?.[field], label);
}

function readTokenUsageByRole(resultMetrics, runStatePath, gap) {
  const raw = resultMetrics.token_usage_by_role;
  if (!isObject(raw)) return { roles: {}, gap };
  const roles = {};
  for (const role of Object.keys(raw).toSorted()) {
    const usage = assertObject(raw[role], `result.metrics.token_usage_by_role.${role}`);
    roles[role] = Object.fromEntries(
      TOKEN_FIELDS.map((field) => {
        const value = readMetric(usage, field, `token_usage_by_role.${role}.${field}`);
        return [
          field,
          metricCell(
            value,
            metricSource(runStatePath, `result.metrics.token_usage_by_role.${role}.${field}`),
            gap,
          ),
        ];
      }),
    );
  }
  return { roles, gap };
}

function readObservedOutcomes(runState, runStatePath, gap) {
  const raw = isObject(runState.result?.outcomes) ? runState.result.outcomes : {};
  return Object.fromEntries(
    OUTCOME_FIELDS.map((field) => [
      field,
      outcomeCell(raw[field], metricSource(runStatePath, `result.outcomes.${field}`), gap),
    ]),
  );
}

function readRunnerArtifact(repoRoot, fixture, scenarioLabel, gap) {
  if (fixture === null) return null;

  const runStatePath = relativeRepoPath(
    repoRoot,
    fixture.run_state_path,
    `${scenarioLabel}.runner_artifact.run_state_path`,
  );
  const bundlePath = relativeRepoPath(
    repoRoot,
    fixture.bundle_path,
    `${scenarioLabel}.runner_artifact.bundle_path`,
  );
  const bootstrapPath = relativeRepoPath(
    repoRoot,
    fixture.bootstrap_path,
    `${scenarioLabel}.runner_artifact.bootstrap_path`,
  );
  const runStateText = readFileSync(path.join(repoRoot, runStatePath), "utf8");
  const bundleText = readFileSync(path.join(repoRoot, bundlePath), "utf8");
  const bootstrapText = readFileSync(path.join(repoRoot, bootstrapPath), "utf8");
  const runState = JSON.parse(runStateText);
  const bundle = JSON.parse(bundleText);
  const prepared = assertObject(
    runState.prepared_metadata,
    `${scenarioLabel} artifact prepared_metadata`,
  );
  const resultMetrics = isObject(runState.result?.metrics) ? runState.result.metrics : {};

  const promptCount = readMetric(
    prepared,
    "prompt_count",
    `${scenarioLabel} prepared_metadata.prompt_count`,
  );
  const bundleBytes = readMetric(
    prepared,
    "bundle_bytes",
    `${scenarioLabel} prepared_metadata.bundle_bytes`,
  );
  const bootstrapBytes = readMetric(
    prepared,
    "bootstrap_bytes",
    `${scenarioLabel} prepared_metadata.bootstrap_bytes`,
  );
  const actualBundleBytes = Buffer.byteLength(bundleText, "utf8");
  const actualBootstrapBytes = Buffer.byteLength(bootstrapText, "utf8");
  if (bundleBytes !== actualBundleBytes) {
    throw new Error(
      `${scenarioLabel} bundle_bytes=${bundleBytes} does not match tracked bundle size ${actualBundleBytes}`,
    );
  }
  if (bootstrapBytes !== actualBootstrapBytes) {
    throw new Error(
      `${scenarioLabel} bootstrap_bytes=${bootstrapBytes} does not match tracked bootstrap size ${actualBootstrapBytes}`,
    );
  }

  const definitions = {
    prompt_count: [promptCount, "prepared_metadata.prompt_count"],
    bundle_bytes: [bundleBytes, "prepared_metadata.bundle_bytes"],
    bootstrap_bytes: [bootstrapBytes, "prepared_metadata.bootstrap_bytes"],
    prompt_boilerplate_bytes: [
      readMetric(prepared, "prompt_boilerplate_bytes", `${scenarioLabel} prompt_boilerplate_bytes`),
      "prepared_metadata.prompt_boilerplate_bytes",
    ],
    stdout_bytes: [
      readMetric(resultMetrics, "stdout_bytes", `${scenarioLabel} result.metrics.stdout_bytes`),
      "result.metrics.stdout_bytes",
    ],
    stderr_bytes: [
      readMetric(resultMetrics, "stderr_bytes", `${scenarioLabel} result.metrics.stderr_bytes`),
      "result.metrics.stderr_bytes",
    ],
    duplicate_input_bytes: [duplicateInputBytes(bundle), null],
    llm_episodes: [
      readMetric(resultMetrics, "llm_episodes", `${scenarioLabel} result.metrics.llm_episodes`),
      "result.metrics.llm_episodes",
    ],
    lifecycle_calls: [
      readMetric(
        resultMetrics,
        "lifecycle_calls",
        `${scenarioLabel} result.metrics.lifecycle_calls`,
      ),
      "result.metrics.lifecycle_calls",
    ],
    preparation_latency_ms: [
      readMetric(prepared, "preparation_latency_ms", `${scenarioLabel} preparation_latency_ms`),
      "prepared_metadata.preparation_latency_ms",
    ],
    context_search_latency_ms: [
      readMetric(
        prepared,
        "context_search_latency_ms",
        `${scenarioLabel} context_search_latency_ms`,
      ),
      "prepared_metadata.context_search_latency_ms",
    ],
    retrieval_hits: [
      readMetric(prepared, "retrieval_hits", `${scenarioLabel} retrieval_hits`),
      "prepared_metadata.retrieval_hits",
    ],
    retrieval_gaps: [
      readMetric(prepared, "retrieval_gaps", `${scenarioLabel} retrieval_gaps`),
      "prepared_metadata.retrieval_gaps",
    ],
    retrieval_recall_proxy: [
      readMetric(prepared, "retrieval_recall_proxy", `${scenarioLabel} retrieval_recall_proxy`),
      "prepared_metadata.retrieval_recall_proxy",
    ],
    evidence_observed_count: [
      readMetric(
        resultMetrics,
        "evidence_observed_count",
        `${scenarioLabel} evidence_observed_count`,
      ),
      "result.metrics.evidence_observed_count",
    ],
    evidence_claimed_count: [
      readMetric(
        resultMetrics,
        "evidence_claimed_count",
        `${scenarioLabel} evidence_claimed_count`,
      ),
      "result.metrics.evidence_claimed_count",
    ],
    evidence_observed_to_claimed_ratio: [
      readMetric(
        resultMetrics,
        "evidence_observed_to_claimed_ratio",
        `${scenarioLabel} evidence_observed_to_claimed_ratio`,
      ),
      "result.metrics.evidence_observed_to_claimed_ratio",
    ],
  };
  const metrics = Object.fromEntries(
    SCALAR_TELEMETRY_FIELDS.map((field) => {
      const [value, fieldPath] = definitions[field];
      const provenance =
        field === "duplicate_input_bytes"
          ? `${bundlePath}#repeated_utf8_string_leaves_v1`
          : metricSource(runStatePath, fieldPath);
      return [field, metricCell(value, provenance, gap)];
    }),
  );
  const durationMs = readMetric(
    resultMetrics,
    "duration_ms",
    `${scenarioLabel} result.metrics.duration_ms`,
  );

  return {
    paths: { run_state: runStatePath, bundle: bundlePath, bootstrap: bootstrapPath },
    sha256: {
      run_state: sha256(runStateText),
      bundle: sha256(bundleText),
      bootstrap: sha256(bootstrapText),
    },
    relevance: fixture.relevance,
    metrics,
    observed_outcomes: readObservedOutcomes(runState, runStatePath, gap),
    token_usage_by_role: readTokenUsageByRole(resultMetrics, runStatePath, gap),
    duration_ms: metricCell(
      durationMs,
      metricSource(runStatePath, "result.metrics.duration_ms"),
      gap,
    ),
  };
}

function tokenUsageControls(expectedRoles, artifactUsage, gap) {
  const roles = new Set([...expectedRoles, ...Object.keys(artifactUsage?.roles ?? {})]);
  return Object.fromEntries(
    [...roles]
      .toSorted()
      .map((role) => [
        role,
        artifactUsage?.roles[role] ??
          Object.fromEntries(TOKEN_FIELDS.map((field) => [field, gapCell(gap)])),
      ]),
  );
}

function summarizeTimingSamples(samples) {
  if (samples.length === 0) {
    return {
      samples: [],
      sample_count: 0,
      statistics: null,
      sufficient_for_comparison: false,
      status: "not_observed",
    };
  }
  const sorted = [...samples].toSorted((a, b) => a - b);
  const sum = sorted.reduce((total, value) => total + value, 0);
  const mean = sum / sorted.length;
  const variance = sorted.reduce((total, value) => total + (value - mean) ** 2, 0) / sorted.length;
  const median =
    sorted.length % 2 === 1
      ? sorted[(sorted.length - 1) / 2]
      : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  const p95 = sorted[Math.max(0, Math.ceil(sorted.length * 0.95) - 1)];
  return {
    samples: sorted,
    sample_count: sorted.length,
    statistics: {
      min: sorted[0],
      median,
      p95,
      max: sorted.at(-1),
      mean: Number(mean.toFixed(3)),
      stddev: Number(Math.sqrt(variance).toFixed(3)),
    },
    sufficient_for_comparison: false,
    status: sorted.length < 5 ? "insufficient_samples" : "diagnostic_only",
  };
}

function buildScenarioProjection(repoRoot, registryPath, scenario, gap) {
  const runnerArtifact = readRunnerArtifact(repoRoot, scenario.runner_artifact, scenario.id, gap);
  const metrics = Object.fromEntries(
    SCALAR_TELEMETRY_FIELDS.map((field) => [field, runnerArtifact?.metrics[field] ?? gapCell(gap)]),
  );
  const roles = [...new Set(scenario.expected_episode_trace)];
  const durationCell = runnerArtifact?.duration_ms ?? gapCell(gap);

  return {
    projection: {
      id: scenario.id,
      label: scenario.label,
      expected_outcomes: scenario.expected_outcomes,
      expected_lifecycle_trace: scenario.expected_lifecycle_trace,
      expected_episode_trace: scenario.expected_episode_trace,
      evidence_controls: scenario.evidence_controls,
      metrics,
      observed_outcomes:
        runnerArtifact?.observed_outcomes ??
        Object.fromEntries(OUTCOME_FIELDS.map((field) => [field, gapCell(gap)])),
      token_usage_by_role: tokenUsageControls(roles, runnerArtifact?.token_usage_by_role, gap),
      source_artifact: runnerArtifact
        ? {
            paths: runnerArtifact.paths,
            sha256: runnerArtifact.sha256,
            relevance: runnerArtifact.relevance,
          }
        : null,
    },
    timing: {
      id: scenario.id,
      duration_ms: summarizeTimingSamples(durationCell.value === null ? [] : [durationCell.value]),
      provenance: durationCell.provenance,
      observability_gap: durationCell.observability_gap,
    },
  };
}

export function buildAgentEfficiencyMeasurement({ repoRoot, registry, registryPath }) {
  assertFixtureRegistry(registry);
  const relativeRegistryPath = relativeRepoPath(
    repoRoot,
    registryPath,
    "agent-efficiency fixture registry path",
  );
  const gap = registry.provenance.observability_gap;
  const built = registry.scenarios.map((scenario) =>
    buildScenarioProjection(repoRoot, relativeRegistryPath, scenario, gap),
  );
  const structuralProjection = {
    schema_version: AGENT_EFFICIENCY_SCHEMA_VERSION,
    scenario_count: RF04_SCENARIO_IDS.length,
    scenarios: built.map((entry) => entry.projection),
  };
  const structuralBytes = `${stableJson(structuralProjection, 2)}\n`;

  return {
    schema_version: AGENT_EFFICIENCY_SCHEMA_VERSION,
    mode: AGENT_EFFICIENCY_MODE,
    provenance: registry.provenance,
    fixture_registry: relativeRegistryPath,
    fixture_registry_sha256: `sha256:${sha256(`${stableJson(registry, 2)}\n`)}`,
    scenario_count: RF04_SCENARIO_IDS.length,
    comparison_policy: {
      quality_control: "regressions_fail_improvements_non_comparable_exact_compares_cost",
      structural_cost_max_growth_ratio: STRUCTURAL_COST_MAX_GROWTH_RATIO,
      timing: "diagnostic_only_never_gated",
    },
    duplicate_input_metric: {
      algorithm: "repeated_utf8_string_leaves_v1",
      minimum_string_bytes: 32,
      formula: "sum((occurrences - 1) * utf8_bytes) for identical normalized string leaves",
    },
    structural_projection: structuralProjection,
    structural_projection_sha256: `sha256:${sha256(structuralBytes)}`,
    timing_diagnostics: {
      field: "duration_ms",
      comparison: "diagnostic_only",
      scenarios: built.map((entry) => entry.timing),
    },
  };
}

function assertMetricCell(cell, label, options = {}) {
  const value = assertObject(cell, label);
  const numeric = nullableNonNegativeNumber(value.value, `${label}.value`);
  if (numeric === null) {
    if (value.provenance !== null) throw new Error(`${label}.provenance must be null when unknown`);
    assertString(value.observability_gap, `${label}.observability_gap`);
    if (
      options.historicalBaseline === true &&
      value.observability_gap !== PRE_V07_OBSERVABILITY_GAP
    ) {
      throw new Error(
        `${label}.observability_gap must be ${PRE_V07_OBSERVABILITY_GAP} for the historical baseline`,
      );
    }
  } else {
    assertString(value.provenance, `${label}.provenance`);
    if (value.observability_gap !== null) {
      throw new Error(`${label}.observability_gap must be null when measured`);
    }
  }
  return value;
}

function assertOutcomeCell(cell, label, options = {}) {
  const value = assertObject(cell, label);
  if (value.value === null) {
    if (value.provenance !== null) throw new Error(`${label}.provenance must be null when unknown`);
    assertString(value.observability_gap, `${label}.observability_gap`);
    if (
      options.historicalBaseline === true &&
      value.observability_gap !== PRE_V07_OBSERVABILITY_GAP
    ) {
      throw new Error(
        `${label}.observability_gap must be ${PRE_V07_OBSERVABILITY_GAP} for the historical baseline`,
      );
    }
  } else {
    assertBoolean(value.value, `${label}.value`);
    assertString(value.provenance, `${label}.provenance`);
    if (value.observability_gap !== null) {
      throw new Error(`${label}.observability_gap must be null when observed`);
    }
  }
  return value;
}

function assertSourceArtifact(source, label) {
  if (source === null) return;
  const artifact = assertObject(source, label);
  const paths = assertObject(artifact.paths, `${label}.paths`);
  const hashes = assertObject(artifact.sha256, `${label}.sha256`);
  for (const field of ["run_state", "bundle", "bootstrap"]) {
    const sourcePath = assertString(paths[field], `${label}.paths.${field}`);
    if (sourcePath.startsWith("../") || path.isAbsolute(sourcePath)) {
      throw new Error(`${label}.paths.${field} must be repository-relative`);
    }
    if (!/^[0-9a-f]{64}$/u.test(hashes[field])) {
      throw new Error(`${label}.sha256.${field} must be a sha256 hex digest`);
    }
  }
  assertString(artifact.relevance, `${label}.relevance`);
}

export function assertMeasurement(payload, label = "measurement", options = {}) {
  assertObject(payload, label);
  if (
    payload.schema_version !== AGENT_EFFICIENCY_SCHEMA_VERSION ||
    payload.mode !== AGENT_EFFICIENCY_MODE
  ) {
    throw new Error(
      `${label} must use schema_version=${AGENT_EFFICIENCY_SCHEMA_VERSION} and mode=${AGENT_EFFICIENCY_MODE}`,
    );
  }
  if (payload.scenario_count !== RF04_SCENARIO_IDS.length) {
    throw new Error(`${label}.scenario_count must be ${RF04_SCENARIO_IDS.length}`);
  }
  assertString(payload.fixture_registry, `${label}.fixture_registry`);
  if (!/^sha256:[0-9a-f]{64}$/u.test(payload.fixture_registry_sha256)) {
    throw new Error(`${label}.fixture_registry_sha256 must be a sha256 digest`);
  }
  const projection = assertObject(payload.structural_projection, `${label}.structural_projection`);
  if (!Array.isArray(projection.scenarios)) {
    throw new TypeError(`${label}.structural_projection.scenarios must be an array`);
  }
  const ids = projection.scenarios.map((scenario) => scenario?.id);
  if (stableJson(ids) !== stableJson(RF04_SCENARIO_IDS)) {
    throw new Error(`${label} must contain exactly the ten RF-04 scenarios in order`);
  }
  for (const scenario of projection.scenarios) {
    const scenarioLabel = `${label}.${scenario.id}`;
    assertExpectedOutcomes(scenario.expected_outcomes, `${scenarioLabel}.expected_outcomes`);
    for (const field of [
      "expected_lifecycle_trace",
      "expected_episode_trace",
      "evidence_controls",
    ]) {
      if (!Array.isArray(scenario[field]))
        throw new Error(`${scenarioLabel}.${field} must be an array`);
    }
    const metrics = assertObject(scenario.metrics, `${scenarioLabel}.metrics`);
    for (const field of SCALAR_TELEMETRY_FIELDS) {
      assertMetricCell(metrics[field], `${scenarioLabel}.metrics.${field}`, options);
    }
    const observedOutcomes = assertObject(
      scenario.observed_outcomes,
      `${scenarioLabel}.observed_outcomes`,
    );
    for (const field of OUTCOME_FIELDS) {
      assertOutcomeCell(
        observedOutcomes[field],
        `${scenarioLabel}.observed_outcomes.${field}`,
        options,
      );
    }
    const tokenUsage = assertObject(
      scenario.token_usage_by_role,
      `${scenarioLabel}.token_usage_by_role`,
    );
    for (const [role, usage] of Object.entries(tokenUsage)) {
      const usageObject = assertObject(usage, `${scenarioLabel}.token_usage_by_role.${role}`);
      for (const field of TOKEN_FIELDS) {
        assertMetricCell(
          usageObject[field],
          `${scenarioLabel}.token_usage_by_role.${role}.${field}`,
          options,
        );
      }
    }
    assertSourceArtifact(scenario.source_artifact, `${scenarioLabel}.source_artifact`);
  }
  const expectedHash = `sha256:${sha256(`${stableJson(projection, 2)}\n`)}`;
  if (payload.structural_projection_sha256 !== expectedHash) {
    throw new Error(
      `${label}.structural_projection_sha256 does not match its structural projection`,
    );
  }
  if (payload.comparison_policy?.timing !== "diagnostic_only_never_gated") {
    throw new Error(`${label} timing policy must be diagnostic_only_never_gated`);
  }
  if (
    payload.comparison_policy?.structural_cost_max_growth_ratio !== STRUCTURAL_COST_MAX_GROWTH_RATIO
  ) {
    throw new Error(
      `${label} structural cost max growth ratio must be ${STRUCTURAL_COST_MAX_GROWTH_RATIO}`,
    );
  }
  const timing = payload.timing_diagnostics?.scenarios;
  if (!Array.isArray(timing))
    throw new Error(`${label}.timing_diagnostics.scenarios must be an array`);
  if (stableJson(timing.map((entry) => entry?.id)) !== stableJson(RF04_SCENARIO_IDS)) {
    throw new Error(`${label}.timing_diagnostics must contain exactly the ten RF-04 scenarios`);
  }
  for (const entry of timing) {
    if (entry.duration_ms?.sufficient_for_comparison !== false) {
      throw new Error(`${label}.${entry.id}.duration_ms must remain diagnostic-only`);
    }
  }
  return payload;
}

function classifyQuality(actual, expected) {
  const regressions = [];
  const improvements = [];
  for (const [field, direction] of Object.entries(QUALITY_DIRECTIONS)) {
    if (actual[field] === expected[field]) continue;
    const improved = direction === "higher" ? actual[field] === true : actual[field] === false;
    (improved ? improvements : regressions).push(field);
  }
  return { regressions, improvements };
}

function classifyEvidence(actualEvidence, expectedEvidence) {
  const regressions = [];
  const improvements = [];
  const actualById = new Map(actualEvidence.map((entry) => [entry.id, entry]));
  const expectedById = new Map(expectedEvidence.map((entry) => [entry.id, entry]));
  for (const [id, expected] of expectedById) {
    const actual = actualById.get(id);
    if (!actual) {
      regressions.push(`${id}:missing`);
      continue;
    }
    const delta =
      EVIDENCE_PROVENANCE_RANK[actual.provenance] - EVIDENCE_PROVENANCE_RANK[expected.provenance];
    if (delta < 0) regressions.push(`${id}:${expected.provenance}->${actual.provenance}`);
    if (delta > 0) improvements.push(`${id}:${expected.provenance}->${actual.provenance}`);
  }
  for (const [id, actual] of actualById) {
    if (!expectedById.has(id)) improvements.push(`${id}:new_${actual.provenance}`);
  }
  return { regressions, improvements };
}

function compareMetricCell({ actual, expected, label, cost, failures, summaries }) {
  if (expected.value === null) {
    if (actual.value !== null)
      summaries.push(`${label}: newly observed; no historical ceiling exists`);
    return 0;
  }
  if (actual.value === null) {
    failures.push(`${label}: known baseline value became unobserved`);
    return 0;
  }
  if (!cost) return 0;
  const ceiling = expected.value * (1 + STRUCTURAL_COST_MAX_GROWTH_RATIO);
  if (actual.value > ceiling) {
    failures.push(
      `${label}: ${actual.value} exceeds 10% ratchet ceiling ${Number(ceiling.toFixed(3))} from baseline ${expected.value}`,
    );
  }
  return 1;
}

function classifyObservedOutcomes(actual, expected) {
  const regressions = [];
  const improvements = [];
  const newlyObserved = [];
  for (const [field, direction] of Object.entries(QUALITY_DIRECTIONS)) {
    const actualCell = actual[field];
    const expectedCell = expected[field];
    if (expectedCell.value === null) {
      if (actualCell.value !== null) newlyObserved.push(field);
      continue;
    }
    if (actualCell.value === null) {
      regressions.push(`${field}:known_to_unobserved`);
      continue;
    }
    if (actualCell.value === expectedCell.value) continue;
    const improved =
      direction === "higher" ? actualCell.value === true : actualCell.value === false;
    (improved ? improvements : regressions).push(
      `${field}:${expectedCell.value}->${actualCell.value}`,
    );
  }
  return { regressions, improvements, newlyObserved };
}

export function compareAgentEfficiencyMeasurements(candidate, baseline) {
  assertMeasurement(candidate, "candidate");
  assertMeasurement(baseline, "baseline", { historicalBaseline: true });
  const failures = [];
  const summaries = [];
  const candidateById = new Map(
    candidate.structural_projection.scenarios.map((scenario) => [scenario.id, scenario]),
  );
  let comparedMetricCount = 0;

  for (const expected of baseline.structural_projection.scenarios) {
    const actual = candidateById.get(expected.id);
    const quality = classifyQuality(actual.expected_outcomes, expected.expected_outcomes);
    const evidence = classifyEvidence(actual.evidence_controls, expected.evidence_controls);
    const observedQuality = classifyObservedOutcomes(
      actual.observed_outcomes,
      expected.observed_outcomes,
    );
    const outcomeLabelChanged =
      actual.expected_outcomes.outcome !== expected.expected_outcomes.outcome;
    const protocolControlsChanged =
      stableJson(actual.expected_lifecycle_trace) !==
        stableJson(expected.expected_lifecycle_trace) ||
      stableJson(actual.expected_episode_trace) !== stableJson(expected.expected_episode_trace);
    if (quality.regressions.length > 0) {
      failures.push(`${expected.id}: quality regressions: ${quality.regressions.join(", ")}`);
    }
    if (evidence.regressions.length > 0) {
      failures.push(`${expected.id}: evidence regressions: ${evidence.regressions.join(", ")}`);
    }
    if (observedQuality.regressions.length > 0) {
      failures.push(
        `${expected.id}: observed quality regressions: ${observedQuality.regressions.join(", ")}`,
      );
    }
    const nonComparable =
      quality.regressions.length > 0 ||
      evidence.regressions.length > 0 ||
      observedQuality.regressions.length > 0 ||
      quality.improvements.length > 0 ||
      evidence.improvements.length > 0 ||
      observedQuality.improvements.length > 0 ||
      observedQuality.newlyObserved.length > 0 ||
      outcomeLabelChanged ||
      protocolControlsChanged;
    if (
      quality.improvements.length > 0 ||
      evidence.improvements.length > 0 ||
      observedQuality.improvements.length > 0
    ) {
      summaries.push(
        `${expected.id}: quality/evidence improved; structural costs are non-comparable (${[
          ...quality.improvements,
          ...evidence.improvements,
          ...observedQuality.improvements,
        ].join(", ")})`,
      );
    }
    if (observedQuality.newlyObserved.length > 0) {
      summaries.push(
        `${expected.id}: quality outcomes newly observed; structural costs are non-comparable (${observedQuality.newlyObserved.join(", ")})`,
      );
    }
    if (outcomeLabelChanged || protocolControlsChanged) {
      summaries.push(
        `${expected.id}: expected scenario controls changed; structural costs are non-comparable`,
      );
    }

    for (const field of SCALAR_TELEMETRY_FIELDS) {
      comparedMetricCount += compareMetricCell({
        actual: actual.metrics[field],
        expected: expected.metrics[field],
        label: `${expected.id}.${field}`,
        cost: !nonComparable && STRUCTURAL_COST_FIELDS.includes(field),
        failures,
        summaries,
      });
    }
    const allRoles = new Set([
      ...Object.keys(expected.token_usage_by_role),
      ...Object.keys(actual.token_usage_by_role),
    ]);
    for (const role of [...allRoles].toSorted()) {
      for (const field of TOKEN_FIELDS) {
        const expectedCell =
          expected.token_usage_by_role[role]?.[field] ?? gapCell(PRE_V07_OBSERVABILITY_GAP);
        const actualCell =
          actual.token_usage_by_role[role]?.[field] ??
          gapCell(candidate.provenance.observability_gap);
        comparedMetricCount += compareMetricCell({
          actual: actualCell,
          expected: expectedCell,
          label: `${expected.id}.token_usage_by_role.${role}.${field}`,
          cost: !nonComparable,
          failures,
          summaries,
        });
      }
    }
  }

  return {
    failures,
    summaries,
    compared_metric_count: comparedMetricCount,
    timing_compared: false,
  };
}

export function fixtureArtifactPaths(registry) {
  assertFixtureRegistry(registry);
  const paths = [];
  for (const scenario of registry.scenarios) {
    if (!scenario.runner_artifact) continue;
    paths.push(
      scenario.runner_artifact.run_state_path,
      scenario.runner_artifact.bundle_path,
      scenario.runner_artifact.bootstrap_path,
    );
  }
  return [...new Set(paths)].toSorted();
}
