import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { isDirectRun, parseScriptArgs } from "../lib/script-runtime.mjs";

const TOKEN_FIELDS = ["input_tokens", "output_tokens", "reasoning_tokens", "total_tokens"];
const LATENCY_FIELDS = [
  "harness_setup_latency_ms",
  "time_to_first_scoped_mutation_ms",
  "time_to_verified_result_ms",
];
const TIMING_POLICY = "diagnostic_only_never_gated";
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/u;

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["evidence", "subject", "out"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  if (!flags.evidence || !flags.subject || !flags.out) {
    throw new Error("--evidence, --subject, and --out are required");
  }
  if (!/^[a-f0-9]{40}$/u.test(flags.subject)) {
    throw new Error("--subject must be a full 40-character Git commit SHA");
  }
  return {
    evidencePath: path.resolve(flags.evidence),
    outputPath: path.resolve(flags.out),
    subject: flags.subject,
  };
}

function readMeasurement(filePath) {
  const value = JSON.parse(readFileSync(filePath, "utf8"));
  const measurement = value.measurement ?? value;
  if (
    !measurement ||
    measurement.schema_version !== 1 ||
    measurement.kind !== "agent_efficiency_candidate_measurement_v1"
  ) {
    throw new Error("efficiency evidence must contain agent_efficiency_candidate_measurement_v1");
  }
  return measurement;
}

function finite(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function failure(failures, metric, expected, actual) {
  failures.push({ metric, expected, actual });
}

function assertExact(failures, metric, actual, expected) {
  if (actual !== expected) failure(failures, metric, expected, actual);
}

function assertAtMost(failures, metric, actual, maximum) {
  if (!finite(actual) || actual > maximum) failure(failures, metric, `<= ${maximum}`, actual);
}

function assertAtLeast(failures, metric, actual, minimum) {
  if (!finite(actual) || actual < minimum) failure(failures, metric, `>= ${minimum}`, actual);
}

export function evaluateEfficiencyMeasurement(measurement, subject) {
  const failures = [];
  const latencyDiagnostics = [];
  const baseline = measurement.baseline?.actual_values;
  const candidate = measurement.candidate?.actual_values;
  if (!baseline || !candidate)
    throw new Error("efficiency evidence omits actual baseline/candidate values");

  assertExact(failures, "candidate.subject_sha", measurement.candidate?.subject_sha, subject);
  assertAtLeast(
    failures,
    "candidate.coverage.replay_runs",
    measurement.candidate?.coverage?.replay_runs,
    50,
  );
  assertExact(
    failures,
    "candidate.coverage.scenarios",
    measurement.candidate?.coverage?.scenarios,
    10,
  );
  assertExact(failures, "baseline.provider_episodes", baseline.provider_episodes, 55);
  assertExact(failures, "candidate.provider_episodes", candidate.provider_episodes, 55);

  for (const field of TOKEN_FIELDS) {
    const before = baseline.provider_tokens?.[field];
    const after = candidate.provider_tokens?.[field];
    assertAtLeast(failures, `baseline.provider_tokens.${field}`, before, 1);
    assertAtLeast(failures, `candidate.provider_tokens.${field}`, after, 1);
    if (finite(before)) assertAtMost(failures, `provider_tokens.${field}`, after, before);
  }
  const baselineTotal = baseline.provider_tokens?.total_tokens;
  const candidateTotal = candidate.provider_tokens?.total_tokens;
  const tokenReduction =
    finite(baselineTotal) && baselineTotal > 0 && finite(candidateTotal)
      ? (baselineTotal - candidateTotal) / baselineTotal
      : null;
  assertAtLeast(failures, "provider_tokens.total_reduction_ratio", tokenReduction, 0.2);

  assertAtLeast(
    failures,
    "outcomes.verified_success",
    candidate.outcomes?.verified_success,
    baseline.outcomes?.verified_success,
  );
  for (const field of ["rework_required", "scope_violation"]) {
    assertAtMost(
      failures,
      `outcomes.${field}`,
      candidate.outcomes?.[field],
      baseline.outcomes?.[field],
    );
  }
  assertAtMost(
    failures,
    "golden_mismatch_count",
    candidate.golden_mismatch_count,
    baseline.golden_mismatch_count,
  );

  for (const field of LATENCY_FIELDS) {
    const before = baseline.latency_ms?.[field];
    const after = candidate.latency_ms?.[field];
    assertAtLeast(
      failures,
      `latency.${field}.sample_count`,
      after?.sample_count,
      before?.sample_count,
    );
    if (finite(before?.mean) && finite(after?.mean) && after.mean > before.mean) {
      latencyDiagnostics.push({
        metric: `latency.${field}.mean`,
        baseline: before.mean,
        candidate: after.mean,
        delta: after.mean - before.mean,
      });
    }
  }

  for (const [metric, value] of [
    ["baseline.replay_baseline_sha256", measurement.baseline?.replay_baseline_sha256],
    ["candidate.driver.sha256", measurement.candidate?.driver?.sha256],
    ["candidate.fixture_registry_sha256", measurement.candidate?.fixture_registry_sha256],
    ["candidate.harness_sha256", measurement.candidate?.harness_sha256],
  ]) {
    if (!SHA256_PATTERN.test(value ?? "")) failure(failures, metric, "sha256:<64 hex>", value);
  }

  const requiredComparisonIds = [
    ...TOKEN_FIELDS.map((field) => `provider_tokens.${field}`),
    ...LATENCY_FIELDS.flatMap((field) => [
      `latency.${field}.sample_count`,
      `latency.${field}.mean_ms`,
    ]),
    "outcomes.verified_success",
    "outcomes.rework_required",
    "outcomes.golden_mismatch_count",
    "provider_episodes",
    "runtime.profile",
  ];
  const comparisonIds = new Set((measurement.comparisons ?? []).map((comparison) => comparison.id));
  for (const id of requiredComparisonIds) {
    if (!comparisonIds.has(id)) failure(failures, `comparisons.${id}`, "present", "missing");
  }

  return {
    schema_version: 1,
    kind: "agentplane.v0.7.1_efficiency_qualification",
    subject,
    source_subject: measurement.candidate?.subject_sha ?? null,
    coverage: measurement.candidate?.coverage ?? null,
    provider_episodes: candidate.provider_episodes ?? null,
    provider_tokens: {
      baseline: baseline.provider_tokens,
      candidate: candidate.provider_tokens,
      total_reduction_ratio: tokenReduction,
    },
    outcomes: {
      baseline: baseline.outcomes,
      candidate: candidate.outcomes,
      baseline_golden_mismatch_count: baseline.golden_mismatch_count,
      candidate_golden_mismatch_count: candidate.golden_mismatch_count,
    },
    latency_ms: {
      baseline: baseline.latency_ms,
      candidate: candidate.latency_ms,
      policy: TIMING_POLICY,
      diagnostics: latencyDiagnostics,
    },
    failures,
    verdict: failures.length === 0 ? "pass" : "fail",
  };
}

function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const measurement = readMeasurement(options.evidencePath);
  const result = evaluateEfficiencyMeasurement(measurement, options.subject);
  mkdirSync(path.dirname(options.outputPath), { recursive: true });
  writeFileSync(options.outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  process.stdout.write(
    `v0.7.1 efficiency evidence: ${result.verdict}; token_reduction=${
      result.provider_tokens.total_reduction_ratio === null
        ? "n/a"
        : `${(result.provider_tokens.total_reduction_ratio * 100).toFixed(2)}%`
    }; failures=${result.failures.length}; out=${options.outputPath}\n`,
  );
  if (result.failures.length > 0) {
    for (const item of result.failures) {
      process.stderr.write(
        `- ${item.metric}: expected ${String(item.expected)}, got ${String(item.actual)}\n`,
      );
    }
    process.exitCode = 1;
  }
}

if (isDirectRun(import.meta.url)) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`error: ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}
