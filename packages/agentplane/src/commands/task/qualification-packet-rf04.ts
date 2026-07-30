import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import { execFileAsync } from "@agentplaneorg/core/process";

import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import type { VerificationCheckDetail } from "../shared/verification-details.js";
import {
  asNumber,
  asString,
  readJson,
  recordValue,
  type JsonRecord,
} from "./qualification-packet-json.js";
import { readArtifactAtReviewedSha } from "./qualification-packet-artifacts.js";

export type QualificationRf04Comparison = {
  main_baseline: {
    path: string;
    sha256: `sha256:${string}`;
    scenario_count: number;
    observed_scalar_cells: number;
    structural_projection_sha256: string | null;
    comparison_policy: JsonRecord;
  };
  replay_comparison: {
    baseline: ReplayMetricSnapshot;
    current_rebuild: ReplayMetricSnapshot;
    status: "exact_frozen_rebuild";
    verified_by_checks: string[];
    live_provider_measurement: "not_run_by_packet_builder";
  };
  candidate_measurement: QualificationRf04CandidateMeasurement;
};

export type QualificationRf04CandidateMeasurement = {
  path: string;
  sha256: `sha256:${string}`;
  source: {
    task_id: string;
    task_artifact_commit: string;
    measurement_source_sha256: `sha256:${string}`;
    measurement_canonical_sha256: `sha256:${string}`;
  };
  subject_sha: string;
  baseline_subject_sha: string;
  runtime_profile: JsonRecord;
  baseline_runtime_profile: JsonRecord;
  coverage: {
    replay_runs: number;
    scenarios: number;
    provider_episodes: number;
  };
  verdict: "pass" | "fail";
  failure_ids: string[];
  comparisons: JsonRecord[];
  qualification_decision: "eligible" | "do_not_publish";
};

type ReplayMetricSnapshot = {
  path: string;
  sha256: `sha256:${string}`;
  structural_projection_sha256: string | null;
  diagnostics_sha256: string | null;
  coverage: JsonRecord;
  golden_outcomes: {
    verdict: string | null;
    match_count: number | null;
    mismatch_count: number | null;
    resolved_cells: number | null;
    values: {
      scenario_id: string;
      outcome: string;
      golden_expected: boolean | null;
      true_count: number | null;
      false_count: number | null;
      golden_match_count: number | null;
      golden_mismatch_count: number | null;
    }[];
  };
  provider_tokens: {
    scenario_id: string;
    role: string;
    input_tokens: JsonRecord | null;
    output_tokens: JsonRecord | null;
    reasoning_tokens: JsonRecord | null;
  }[];
  latency: { scenario_id: string; values: JsonRecord }[];
};

const RF04_CURRENT_REBUILD_FILE = "rf04-current-rebuild.v1.json";
const RF04_CAPTURE_SCRIPT = "scripts/bench/capture-agent-efficiency-replay.mjs";
const RF04_CANDIDATE_EVIDENCE_FILE =
  "scripts/baselines/agent-efficiency-v0.7-beta1-candidate.json";
const RF04_CANDIDATE_EVIDENCE_KIND = "agentplane.rf04.qualification_candidate_evidence";
const SHA1_PATTERN = /^[a-f0-9]{40}$/u;
const SHA256_PATTERN = /^sha256:[a-f0-9]{64}$/u;

function sha256(value: string | Buffer): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalSha256(value: unknown): `sha256:${string}` {
  return sha256(JSON.stringify(canonicalizeJson(value)));
}

function relative(gitRoot: string, filePath: string): string {
  return path.relative(gitRoot, filePath).replaceAll("\\\\", "/");
}

function countObservedScalarCells(value: JsonRecord): number {
  const projection = recordValue(value.structural_projection);
  const scenarios = Array.isArray(projection.scenarios) ? projection.scenarios : [];
  let count = 0;
  for (const scenario of scenarios) {
    const metrics = recordValue(recordValue(scenario).metrics);
    for (const metric of Object.values(metrics)) {
      const cell = recordValue(metric);
      if (cell.value !== null && cell.value !== undefined) count += 1;
    }
  }
  return count;
}

function requiredRecord(value: unknown, label: string): JsonRecord {
  if (!isRecord(value)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `RF-04 candidate evidence requires ${label} to be an object.`,
    });
  }
  return value;
}

function requiredString(value: unknown, label: string): string {
  const text = asString(value);
  if (!text) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `RF-04 candidate evidence requires ${label}.`,
    });
  }
  return text;
}

function requiredSha1(value: unknown, label: string): string {
  const text = requiredString(value, label);
  if (!SHA1_PATTERN.test(text)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `RF-04 candidate evidence has an invalid ${label}.`,
    });
  }
  return text;
}

function requiredSha256(value: unknown, label: string): `sha256:${string}` {
  const text = requiredString(value, label);
  if (!SHA256_PATTERN.test(text)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `RF-04 candidate evidence has an invalid ${label}.`,
    });
  }
  return text as `sha256:${string}`;
}

function requiredNumber(value: unknown, label: string): number {
  const number = asNumber(value);
  if (number === null) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `RF-04 candidate evidence requires numeric ${label}.`,
    });
  }
  return number;
}

function requiredStringArray(value: unknown, label: string): string[] {
  if (!Array.isArray(value) || value.some((entry) => !asString(entry))) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `RF-04 candidate evidence requires ${label} to be a string array.`,
    });
  }
  return value.map((entry) => String(entry)).toSorted();
}

function sameJson(left: unknown, right: unknown): boolean {
  return JSON.stringify(canonicalizeJson(left)) === JSON.stringify(canonicalizeJson(right));
}

function sameStrings(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((entry, index) => entry === right[index]);
}

function parseCandidateEvidence(raw: string): JsonRecord {
  try {
    const value: unknown = JSON.parse(raw);
    return requiredRecord(value, "the evidence document");
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "RF-04 candidate evidence is invalid JSON" +
        ` (${error instanceof Error ? error.message : String(error)}).`,
    });
  }
}

export async function readQualificationRf04CandidateMeasurement(opts: {
  gitRoot: string;
  reviewedSha: string;
}): Promise<QualificationRf04CandidateMeasurement> {
  const evidencePath = path.join(opts.gitRoot, RF04_CANDIDATE_EVIDENCE_FILE);
  const evidence = await readArtifactAtReviewedSha({
    gitRoot: opts.gitRoot,
    reviewedSha: opts.reviewedSha,
    filePath: evidencePath,
    label: "RF-04 candidate evidence",
  });
  const document = parseCandidateEvidence(evidence.raw);
  if (
    document.schema_version !== 1 ||
    document.kind !== RF04_CANDIDATE_EVIDENCE_KIND
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence has an unsupported schema or kind.",
    });
  }
  const source = requiredRecord(document.source, "source");
  const measurement = requiredRecord(document.measurement, "measurement");
  const sourceTaskId = requiredString(source.task_id, "source.task_id");
  const sourceTaskArtifactCommit = requiredSha1(
    source.task_artifact_commit,
    "source.task_artifact_commit",
  );
  const measurementSourceSha256 = requiredSha256(
    source.measurement_source_sha256,
    "source.measurement_source_sha256",
  );
  const measurementCanonicalSha256 = requiredSha256(
    source.measurement_canonical_sha256,
    "source.measurement_canonical_sha256",
  );
  if (canonicalSha256(measurement) !== measurementCanonicalSha256) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence canonical measurement digest does not match.",
    });
  }
  if (
    measurement.schema_version !== 1 ||
    measurement.kind !== "agent_efficiency_candidate_measurement_v1"
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence measurement has an unsupported schema or kind.",
    });
  }
  const candidate = requiredRecord(measurement.candidate, "measurement.candidate");
  const baseline = requiredRecord(measurement.baseline, "measurement.baseline");
  const candidateActual = requiredRecord(candidate.actual_values, "candidate actual values");
  const candidateCoverage = requiredRecord(candidate.coverage, "candidate coverage");
  const candidateProfile = requiredRecord(candidate.runtime_profile, "candidate runtime profile");
  const baselineProfile = requiredRecord(baseline.runtime_profile, "baseline runtime profile");
  const runtimeComparison = requiredRecord(
    measurement.runtime_comparison,
    "runtime comparison",
  );
  const subjectSha = requiredSha1(candidate.subject_sha, "candidate.subject_sha");
  const baselineSubjectSha = requiredSha1(baseline.subject_sha, "baseline.subject_sha");
  const replayRuns = requiredNumber(candidateCoverage.replay_runs, "candidate coverage replay_runs");
  const scenarios = requiredNumber(candidateCoverage.scenarios, "candidate coverage scenarios");
  const providerEpisodes = requiredNumber(
    candidateActual.provider_episodes,
    "candidate actual provider_episodes",
  );
  if (replayRuns !== 50 || scenarios !== 10 || providerEpisodes !== 55) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "RF-04 candidate evidence must preserve the approved 50-run, 10-scenario, 55-episode coverage.",
    });
  }
  if (
    runtimeComparison.profile_match !== true ||
    runtimeComparison.candidate !== candidateProfile.runtime_version ||
    runtimeComparison.baseline !== baselineProfile.runtime_version ||
    !sameJson(candidateProfile, baselineProfile)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence requires an exact matched runtime profile.",
    });
  }
  if (baseline.source !== "runtime_bridge") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence requires a matched runtime-bridge baseline.",
    });
  }
  if (!Array.isArray(measurement.comparisons)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence requires comparison results.",
    });
  }
  const comparisons = measurement.comparisons.map((value) => requiredRecord(value, "comparison"));
  const comparisonFailures = comparisons
    .filter((comparison) => comparison.verdict === "fail")
    .map((comparison) => requiredString(comparison.id, "comparison.id"))
    .toSorted();
  const failureIds = requiredStringArray(measurement.failure_ids, "measurement.failure_ids");
  if (!sameStrings(failureIds, comparisonFailures)) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence failure IDs do not match failed comparisons.",
    });
  }
  const verdict = requiredString(measurement.verdict, "measurement.verdict");
  if (
    (verdict !== "pass" && verdict !== "fail") ||
    (verdict === "pass" && failureIds.length > 0) ||
    (verdict === "fail" && failureIds.length === 0)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "RF-04 candidate evidence verdict is inconsistent with failed comparisons.",
    });
  }
  return {
    path: evidence.path,
    sha256: sha256(evidence.raw),
    source: {
      task_id: sourceTaskId,
      task_artifact_commit: sourceTaskArtifactCommit,
      measurement_source_sha256: measurementSourceSha256,
      measurement_canonical_sha256: measurementCanonicalSha256,
    },
    subject_sha: subjectSha,
    baseline_subject_sha: baselineSubjectSha,
    runtime_profile: candidateProfile,
    baseline_runtime_profile: baselineProfile,
    coverage: {
      replay_runs: replayRuns,
      scenarios,
      provider_episodes: providerEpisodes,
    },
    verdict,
    failure_ids: failureIds,
    comparisons,
    qualification_decision: verdict === "pass" ? "eligible" : "do_not_publish",
  };
}

function buildReplayMetricSnapshot(opts: {
  path: string;
  raw: string;
  replay: JsonRecord;
}): ReplayMetricSnapshot {
  const projection = recordValue(opts.replay.structural_projection);
  const scenarios = Array.isArray(projection.scenarios) ? projection.scenarios : [];
  const outcomes: ReplayMetricSnapshot["golden_outcomes"]["values"] = [];
  const providerTokens: ReplayMetricSnapshot["provider_tokens"] = [];
  for (const scenarioValue of scenarios) {
    const scenario = recordValue(scenarioValue);
    const scenarioId = asString(scenario.id) ?? "unknown";
    const resolvedOutcomes = recordValue(scenario.resolved_outcomes);
    for (const outcome of Object.keys(resolvedOutcomes).toSorted()) {
      const values = recordValue(resolvedOutcomes[outcome]);
      outcomes.push({
        scenario_id: scenarioId,
        outcome,
        golden_expected:
          typeof values.golden_expected === "boolean" ? values.golden_expected : null,
        true_count: asNumber(values.true_count),
        false_count: asNumber(values.false_count),
        golden_match_count: asNumber(values.golden_match_count),
        golden_mismatch_count: asNumber(values.golden_mismatch_count),
      });
    }
    const roles = recordValue(scenario.token_usage_by_role);
    for (const role of Object.keys(roles).toSorted()) {
      const metrics = recordValue(roles[role]);
      providerTokens.push({
        scenario_id: scenarioId,
        role,
        input_tokens: isRecord(metrics.input_tokens) ? metrics.input_tokens : null,
        output_tokens: isRecord(metrics.output_tokens) ? metrics.output_tokens : null,
        reasoning_tokens: isRecord(metrics.reasoning_tokens) ? metrics.reasoning_tokens : null,
      });
    }
  }
  const diagnostics = recordValue(opts.replay.diagnostics);
  const latency = (Array.isArray(diagnostics.scenarios) ? diagnostics.scenarios : []).map(
    (scenarioValue) => {
      const scenario = recordValue(scenarioValue);
      return {
        scenario_id: asString(scenario.id) ?? "unknown",
        values: recordValue(scenario.latency_ms),
      };
    },
  );
  const comparison = recordValue(opts.replay.golden_outcome_comparison);
  return {
    path: opts.path,
    sha256: sha256(opts.raw),
    structural_projection_sha256: asString(opts.replay.structural_projection_sha256),
    diagnostics_sha256: asString(opts.replay.diagnostics_sha256),
    coverage: recordValue(opts.replay.coverage),
    golden_outcomes: {
      verdict: asString(comparison.verdict),
      match_count: asNumber(comparison.golden_match_count),
      mismatch_count: asNumber(comparison.golden_mismatch_count),
      resolved_cells: asNumber(comparison.resolved_run_outcome_cells),
      values: outcomes,
    },
    provider_tokens: providerTokens,
    latency,
  };
}

function replayMeasurements(
  snapshot: ReplayMetricSnapshot,
): Omit<ReplayMetricSnapshot, "path" | "sha256"> {
  const { path: _path, sha256: _sha256, ...measurements } = snapshot;
  return measurements;
}

async function captureCurrentReplaySnapshot(opts: {
  gitRoot: string;
  taskId: string;
  workflowDir: string;
}): Promise<ReplayMetricSnapshot> {
  const outputPath = path.join(
    opts.gitRoot,
    opts.workflowDir,
    opts.taskId,
    "evidence",
    RF04_CURRENT_REBUILD_FILE,
  );
  await mkdir(path.dirname(outputPath), { recursive: true });
  await execFileAsync(
    process.execPath,
    [path.join(opts.gitRoot, RF04_CAPTURE_SCRIPT), "--output", outputPath],
    {
      cwd: opts.gitRoot,
    },
  );
  const current = await readJson(outputPath, "RF-04 current replay rebuild");
  return buildReplayMetricSnapshot({
    path: relative(opts.gitRoot, outputPath),
    raw: current.raw,
    replay: current.value,
  });
}

export async function buildQualificationRf04Comparison(opts: {
  gitRoot: string;
  checks: readonly VerificationCheckDetail[];
  taskId: string;
  workflowDir: string;
  reviewedSha: string;
}): Promise<QualificationRf04Comparison> {
  const mainPath = path.join(opts.gitRoot, "scripts/baselines/agent-efficiency-pre-v0.7-main.json");
  const replayPath = path.join(
    opts.gitRoot,
    "scripts/baselines/agent-efficiency-pre-v0.7-replay.json",
  );
  const [main, replay, candidateMeasurement] = await Promise.all([
    readJson(mainPath, "RF-04 main baseline"),
    readJson(replayPath, "RF-04 replay baseline"),
    readQualificationRf04CandidateMeasurement({
      gitRoot: opts.gitRoot,
      reviewedSha: opts.reviewedSha,
    }),
  ]);
  const replaySnapshot = buildReplayMetricSnapshot({
    path: relative(opts.gitRoot, replayPath),
    raw: replay.raw,
    replay: replay.value,
  });
  const currentRebuild = await captureCurrentReplaySnapshot(opts);
  if (
    JSON.stringify(replayMeasurements(currentRebuild)) !==
    JSON.stringify(replayMeasurements(replaySnapshot))
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification packet requires the current RF-04 replay rebuild to match every frozen replay measurement.",
    });
  }
  const verifiedByChecks = opts.checks
    .filter(
      (check) =>
        check.result === "pass" &&
        (check.command.includes("ci:contract") || check.command.includes("agent-efficiency")),
    )
    .map((check) => check.command);
  if (verifiedByChecks.length === 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Qualification packet requires a passing ci:contract or agent-efficiency verification check before it can claim an exact RF-04 rebuild.",
    });
  }
  return {
    main_baseline: {
      path: relative(opts.gitRoot, mainPath),
      sha256: sha256(main.raw),
      scenario_count: asNumber(main.value.scenario_count) ?? 0,
      observed_scalar_cells: countObservedScalarCells(main.value),
      structural_projection_sha256: asString(main.value.structural_projection_sha256),
      comparison_policy: recordValue(main.value.comparison_policy),
    },
    replay_comparison: {
      baseline: replaySnapshot,
      current_rebuild: currentRebuild,
      status: "exact_frozen_rebuild",
      verified_by_checks: verifiedByChecks,
      live_provider_measurement: "not_run_by_packet_builder",
    },
    candidate_measurement: candidateMeasurement,
  };
}
