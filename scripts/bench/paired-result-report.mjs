import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { PAIRED_CAMPAIGN_ARMS } from "./paired-production-driver.mjs";

const DIGEST_PATTERN = /^sha256:[a-f0-9]{64}$/u;
const TOKEN_USAGE_STATES = new Set(["observed", "partial", "unavailable"]);
const TOKEN_FIELDS = [
  "input_tokens",
  "cached_input_tokens",
  "output_tokens",
  "reasoning_tokens",
  "total_tokens",
];

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function assertTokenUsage(value, label) {
  if (!isRecord(value) || !TOKEN_USAGE_STATES.has(value.state)) {
    throw new Error(`${label} has invalid token usage state.`);
  }
  for (const field of TOKEN_FIELDS) {
    if (value[field] !== null && (!Number.isSafeInteger(value[field]) || value[field] < 0)) {
      throw new Error(`${label} has invalid ${field}.`);
    }
  }
  const observedFields = TOKEN_FIELDS.filter((field) => value[field] !== null);
  if (
    (value.state === "observed" && observedFields.length !== TOKEN_FIELDS.length) ||
    (value.state === "partial" && observedFields.length === 0) ||
    (value.state === "unavailable" && observedFields.length > 0)
  ) {
    throw new Error(`${label} token fields do not match state=${value.state}.`);
  }
  if (
    (value.state === "observed" && value.reason !== undefined) ||
    (value.state !== "observed" && (typeof value.reason !== "string" || value.reason.length === 0))
  ) {
    throw new Error(`${label} has invalid token usage reason.`);
  }
  if (
    value.cached_input_tokens !== null &&
    value.input_tokens !== null &&
    value.cached_input_tokens > value.input_tokens
  ) {
    throw new Error(`${label} cached input exceeds input tokens.`);
  }
  if (
    value.reasoning_tokens !== null &&
    value.output_tokens !== null &&
    value.reasoning_tokens > value.output_tokens
  ) {
    throw new Error(`${label} reasoning exceeds output tokens.`);
  }
  if (
    value.input_tokens !== null &&
    value.output_tokens !== null &&
    value.total_tokens !== null &&
    value.total_tokens < value.input_tokens + value.output_tokens
  ) {
    throw new Error(`${label} total is lower than input plus output tokens.`);
  }
  if (
    value.total_tokens_source !== undefined &&
    !["provider", "derived_input_plus_output"].includes(value.total_tokens_source)
  ) {
    throw new Error(`${label} has invalid total token source.`);
  }
  if (
    value.total_tokens_source === "derived_input_plus_output" &&
    (value.input_tokens === null ||
      value.output_tokens === null ||
      value.total_tokens !== value.input_tokens + value.output_tokens)
  ) {
    throw new Error(`${label} derived total does not match its components.`);
  }
}

function wilsonInterval(successes, total, z = 1.96) {
  if (total === 0) return { lower: null, upper: null };
  const probability = successes / total;
  const z2 = z * z;
  const denominator = 1 + z2 / total;
  const center = (probability + z2 / (2 * total)) / denominator;
  const margin =
    (z / denominator) *
    Math.sqrt((probability * (1 - probability)) / total + z2 / (4 * total * total));
  return { lower: Math.max(0, center - margin), upper: Math.min(1, center + margin) };
}

function assertAttempt(attempt, index) {
  const label = `attempts[${index}]`;
  if (
    !isRecord(attempt) ||
    typeof attempt.id !== "string" ||
    typeof attempt.pair_id !== "string" ||
    !PAIRED_CAMPAIGN_ARMS.includes(attempt.arm) ||
    !["managed", "external"].includes(attempt.transport) ||
    !isRecord(attempt.agent) ||
    !["completed", "failed", "blocked"].includes(attempt.agent.status) ||
    !Array.isArray(attempt.agent.violations) ||
    attempt.agent.violations.some((entry) => typeof entry !== "string") ||
    !Array.isArray(attempt.agent.stages) ||
    !isRecord(attempt.oracle) ||
    typeof attempt.oracle.verified !== "boolean" ||
    !DIGEST_PATTERN.test(attempt.oracle.outcome_digest)
  ) {
    throw new Error(`${label} does not satisfy the paired evidence contract.`);
  }
  assertTokenUsage(attempt.token_usage, label);
  for (const stage of attempt.agent.stages) {
    if (
      !isRecord(stage) ||
      typeof stage.id !== "string" ||
      typeof stage.duration_ms !== "number" ||
      !Number.isFinite(stage.duration_ms) ||
      stage.duration_ms < 0
    ) {
      throw new Error(`${label} has invalid stage evidence.`);
    }
  }
  return attempt;
}

function attemptSucceeded(attempt) {
  return (
    attempt.agent.status === "completed" &&
    attempt.oracle.verified === true &&
    attempt.agent.violations.length === 0
  );
}

function attemptLatency(attempt) {
  return (
    attempt.agent.stages.reduce((sum, stage) => sum + stage.duration_ms, 0) +
    (typeof attempt.oracle.duration_ms === "number" ? attempt.oracle.duration_ms : 0)
  );
}

function stageDistribution(attempts) {
  const stages = new Map();
  for (const attempt of attempts) {
    for (const stage of attempt.agent.stages) {
      const values = stages.get(stage.id) ?? [];
      values.push(stage.duration_ms);
      stages.set(stage.id, values);
    }
  }
  return Object.fromEntries(
    [...stages.entries()]
      .toSorted(([left], [right]) => left.localeCompare(right))
      .map(([id, values]) => [
        id,
        {
          observations: values.length,
          min_ms: Math.min(...values),
          max_ms: Math.max(...values),
          mean_ms: values.reduce((sum, value) => sum + value, 0) / values.length,
        },
      ]),
  );
}

function summarizeArm(attempts) {
  const successes = attempts.filter((attempt) => attemptSucceeded(attempt)).length;
  const violations = attempts.filter((attempt) => attempt.agent.violations.length > 0).length;
  const observedAttempts = attempts.filter((attempt) => attempt.token_usage.state === "observed");
  const partialAttempts = attempts.filter((attempt) => attempt.token_usage.state === "partial");
  const observedTotals = Object.fromEntries(
    TOKEN_FIELDS.map((field) => [
      field,
      attempts.reduce((sum, attempt) => sum + (attempt.token_usage[field] ?? 0), 0),
    ]),
  );
  const complete = observedAttempts.length === attempts.length;
  return {
    attempts: attempts.length,
    verified_successes: successes,
    failures: attempts.length - successes,
    success_rate: attempts.length === 0 ? null : successes / attempts.length,
    success_rate_wilson_95: wilsonInterval(successes, attempts.length),
    violation_attempts: violations,
    violation_rate: attempts.length === 0 ? null : violations / attempts.length,
    violation_rate_wilson_95: wilsonInterval(violations, attempts.length),
    token_usage: {
      complete,
      observed_attempts: observedAttempts.length,
      partial_attempts: partialAttempts.length,
      unavailable_attempts: attempts.length - observedAttempts.length - partialAttempts.length,
      observed_totals: observedTotals,
      total_tokens: complete ? observedTotals.total_tokens : null,
      tokens_per_verified_success:
        complete && successes > 0 ? observedTotals.total_tokens / successes : null,
      subset_semantics: {
        cached_input_tokens: "subset_of_input_tokens",
        reasoning_tokens: "subset_of_output_tokens",
      },
    },
    stages: stageDistribution(attempts),
  };
}

function pairedOutcomes(attempts, transport) {
  const byPair = new Map();
  for (const attempt of attempts) {
    const selected = byPair.get(attempt.pair_id) ?? [];
    selected.push(attempt);
    byPair.set(attempt.pair_id, selected);
  }
  const accepted = [];
  const rejected = [];
  for (const [pairId, pair] of [...byPair.entries()].toSorted(([left], [right]) =>
    left.localeCompare(right),
  )) {
    const byArm = new Map(pair.map((attempt) => [attempt.arm, attempt]));
    if (pair.length !== PAIRED_CAMPAIGN_ARMS.length || byArm.size !== PAIRED_CAMPAIGN_ARMS.length) {
      rejected.push({ pair_id: pairId, reason: "arm_coverage_incomplete" });
      continue;
    }
    if (pairedArmMismatch(byArm)) {
      rejected.push({ pair_id: pairId, reason: "not_all_arms_verified" });
      continue;
    }
    const outcomeDigests = new Set(
      PAIRED_CAMPAIGN_ARMS.map((arm) => byArm.get(arm).oracle.outcome_digest),
    );
    if (outcomeDigests.size !== 1) {
      rejected.push({ pair_id: pairId, reason: "outcome_digest_mismatch" });
      continue;
    }
    accepted.push({
      pair_id: pairId,
      transport,
      outcome_digest: [...outcomeDigests][0],
      latency_ms_by_arm: Object.fromEntries(
        PAIRED_CAMPAIGN_ARMS.map((arm) => [arm, attemptLatency(byArm.get(arm))]),
      ),
    });
  }
  return { accepted, rejected };
}

function pairedArmMismatch(byArm) {
  return PAIRED_CAMPAIGN_ARMS.some((arm) => {
    const attempt = byArm.get(arm);
    return !attempt || !attemptSucceeded(attempt);
  });
}

function efficiencyAssessment(strata, claimPolicy, safetyVerdict) {
  if (!isRecord(claimPolicy)) {
    return { verdict: "not_established", reasons: ["claim_policy_missing"], strata: {} };
  }
  const minimumPairs = claimPolicy.minimum_paired_successes;
  const maximumPreviousRatio = claimPolicy.max_candidate_to_previous_token_ratio;
  if (
    !Number.isSafeInteger(minimumPairs) ||
    minimumPairs < 1 ||
    typeof maximumPreviousRatio !== "number" ||
    !Number.isFinite(maximumPreviousRatio) ||
    maximumPreviousRatio <= 0 ||
    typeof claimPolicy.require_candidate_better_than_minimal !== "boolean"
  ) {
    throw new Error("claim_policy is invalid.");
  }
  if (safetyVerdict !== "pass") {
    return { verdict: "fail", reasons: ["safety_gate_failed"], strata: {} };
  }
  const assessments = {};
  for (const [transport, stratum] of Object.entries(strata)) {
    const armTokenCosts = Object.fromEntries(
      PAIRED_CAMPAIGN_ARMS.map((arm) => [
        arm,
        stratum.arms[arm].token_usage.tokens_per_verified_success,
      ]),
    );
    const complete = PAIRED_CAMPAIGN_ARMS.every(
      (arm) =>
        stratum.arms[arm].token_usage.complete &&
        stratum.arms[arm].verified_successes > 0 &&
        Number.isFinite(armTokenCosts[arm]),
    );
    if (!complete || stratum.paired_outcomes.accepted.length < minimumPairs) {
      assessments[transport] = {
        verdict: "not_established",
        reason: complete ? "paired_coverage_insufficient" : "incomplete_tokens_or_zero_success",
        tokens_per_verified_success: armTokenCosts,
      };
      continue;
    }
    const previousRatio = armTokenCosts.candidate / armTokenCosts.previous_release;
    const minimalRatio = armTokenCosts.candidate / armTokenCosts.minimal_agent;
    if (!Number.isFinite(previousRatio) || !Number.isFinite(minimalRatio)) {
      assessments[transport] = {
        verdict: "not_established",
        reason: "comparison_denominator_not_positive",
        tokens_per_verified_success: armTokenCosts,
      };
      continue;
    }
    const previousPass = previousRatio <= maximumPreviousRatio;
    const minimalPass = !claimPolicy.require_candidate_better_than_minimal || minimalRatio < 1;
    assessments[transport] = {
      verdict:
        previousPass && minimalPass ? "pass" : previousPass || minimalPass ? "mixed" : "fail",
      candidate_to_previous_ratio: previousRatio,
      candidate_to_minimal_ratio: minimalRatio,
      tokens_per_verified_success: armTokenCosts,
    };
  }
  const verdicts = Object.values(assessments).map((assessment) => assessment.verdict);
  const verdict =
    verdicts.length === 0 || verdicts.includes("not_established")
      ? "not_established"
      : verdicts.every((value) => value === "pass")
        ? "pass"
        : verdicts.every((value) => value === "fail")
          ? "fail"
          : "mixed";
  return { verdict, reasons: [], strata: assessments };
}

function activationAssessment(value) {
  if (!isRecord(value)) {
    return { verdict: "not_established", reasons: ["independent_activation_evidence_missing"] };
  }
  const complete =
    value.qualified === true &&
    value.independently_reviewed === true &&
    DIGEST_PATTERN.test(value.class_digest) &&
    DIGEST_PATTERN.test(value.oracle_digest);
  return complete
    ? { verdict: "pass", reasons: [] }
    : { verdict: "not_established", reasons: ["independent_activation_evidence_incomplete"] };
}

export function buildPairedResultReport(value) {
  if (
    !isRecord(value) ||
    value.schema_version !== 1 ||
    value.kind !== "agentplane.paired_production_campaign_evidence" ||
    typeof value.campaign_id !== "string" ||
    !Array.isArray(value.attempts)
  ) {
    throw new Error("Paired result report requires campaign evidence v1.");
  }
  const attempts = value.attempts.map((attempt, index) => assertAttempt(attempt, index));
  const ids = new Set(attempts.map((attempt) => attempt.id));
  if (ids.size !== attempts.length) throw new Error("Paired attempt IDs must be unique.");
  const strata = {};
  for (const transport of ["managed", "external"]) {
    const selected = attempts.filter((attempt) => attempt.transport === transport);
    if (selected.length === 0) continue;
    const arms = {};
    for (const arm of PAIRED_CAMPAIGN_ARMS) {
      const armAttempts = selected.filter((attempt) => attempt.arm === arm);
      if (armAttempts.length === 0) {
        throw new Error(`${transport} evidence is missing arm ${arm}.`);
      }
      arms[arm] = summarizeArm(armAttempts);
    }
    strata[transport] = {
      attempts: selected.length,
      arms,
      paired_outcomes: pairedOutcomes(selected, transport),
    };
  }
  const violations = attempts.flatMap((attempt) =>
    attempt.agent.violations.map((violation) => ({ attempt_id: attempt.id, violation })),
  );
  const safety = {
    verdict: violations.length === 0 ? "pass" : "fail",
    violations,
  };
  const activation = activationAssessment(value.activation_evidence);
  const partialTokenAttempts = attempts
    .filter((attempt) => attempt.token_usage.state === "partial")
    .map((attempt) => attempt.id);
  const unavailableTokenAttempts = attempts
    .filter((attempt) => attempt.token_usage.state === "unavailable")
    .map((attempt) => attempt.id);
  const incompleteTokenAttempts = [...partialTokenAttempts, ...unavailableTokenAttempts];
  const derivedTotalTokenAttempts = attempts
    .filter((attempt) => attempt.token_usage.total_tokens_source === "derived_input_plus_output")
    .map((attempt) => attempt.id);
  const numericTokenClaimComplete = attempts.length > 0 && incompleteTokenAttempts.length === 0;
  const efficiency = efficiencyAssessment(strata, value.claim_policy, safety.verdict);
  const payload = {
    schema_version: 1,
    kind: "agentplane.paired_tokens_per_verified_result_report",
    campaign_id: value.campaign_id,
    evidence_digest: value.digest ?? null,
    coverage: {
      attempts: attempts.length,
      token_usage_observed: attempts.length - incompleteTokenAttempts.length,
      token_usage_partial: partialTokenAttempts.length,
      token_usage_unavailable: unavailableTokenAttempts.length,
      incomplete_token_attempt_ids: incompleteTokenAttempts,
      derived_total_token_attempt_ids: derivedTotalTokenAttempts,
      transports: Object.fromEntries(
        Object.entries(strata).map(([transport, stratum]) => [transport, stratum.attempts]),
      ),
    },
    strata,
    gates: {
      safety,
      activation,
      efficiency,
    },
    numeric_token_claim_complete: numericTokenClaimComplete,
    uncertainty: {
      rate_interval: "Wilson score interval, 95%",
      paired_population:
        "Only pairs where every arm independently passes the same oracle outcome are included.",
      token_usage: numericTokenClaimComplete
        ? derivedTotalTokenAttempts.length === 0
          ? "Every attempt has complete provider-observed token usage."
          : "Every attempt has complete token usage. total_tokens is derived exactly as input_tokens plus output_tokens where the Codex event omits it."
        : "Partial or unavailable provider token usage prevents a complete numeric token claim.",
      subset_accounting:
        "total_tokens is the primary cost. cached_input_tokens and reasoning_tokens are reported as subsets and are not added again.",
    },
  };
  return { ...payload, digest: sha256(canonicalBytes(payload)) };
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["input", "output"],
    booleanFlags: ["help"],
  });
  if (flags.help === true) return { help: true };
  if (positionals.length > 0)
    throw new Error("Paired report does not accept positional arguments.");
  if (!flags.input || !flags.output) throw new Error("--input and --output are required.");
  return { help: false, input: path.resolve(flags.input), output: path.resolve(flags.output) };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(
      "Usage: node scripts/bench/paired-result-report.mjs --input <campaign-evidence.json> --output <report.json>\n",
    );
    return;
  }
  const report = buildPairedResultReport(JSON.parse(readFileSync(options.input, "utf8")));
  writeFileSync(options.output, canonicalBytes(report), { encoding: "utf8", mode: 0o600 });
  process.stdout.write(`${report.digest}\n`);
}

if (isDirectRun(import.meta.url)) runScriptMain(main);
