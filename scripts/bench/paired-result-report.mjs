import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { stableJson } from "../lib/agent-efficiency-baseline.mjs";
import { isDirectRun, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import { PAIRED_CAMPAIGN_ARMS } from "./paired-production-driver.mjs";

const DIGEST_PATTERN = /^sha256:[a-f0-9]{64}$/u;

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
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
    !DIGEST_PATTERN.test(attempt.oracle.outcome_digest) ||
    !isRecord(attempt.raw_cost) ||
    !["observed", "unknown"].includes(attempt.raw_cost.state) ||
    !DIGEST_PATTERN.test(attempt.raw_cost.basis_digest) ||
    typeof attempt.raw_cost.currency !== "string"
  ) {
    throw new Error(`${label} does not satisfy the paired evidence contract.`);
  }
  if (
    attempt.raw_cost.state === "observed" &&
    (typeof attempt.raw_cost.amount !== "number" ||
      !Number.isFinite(attempt.raw_cost.amount) ||
      attempt.raw_cost.amount < 0)
  ) {
    throw new Error(`${label} has invalid observed raw cost.`);
  }
  if (
    attempt.raw_cost.state === "unknown" &&
    (attempt.raw_cost.amount !== null ||
      typeof attempt.raw_cost.reason !== "string" ||
      attempt.raw_cost.reason.length === 0)
  ) {
    throw new Error(`${label} has invalid unknown raw cost.`);
  }
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
  const successes = attempts.filter(attemptSucceeded).length;
  const violations = attempts.filter((attempt) => attempt.agent.violations.length > 0).length;
  const observedCosts = attempts.filter((attempt) => attempt.raw_cost.state === "observed");
  const currencies = new Set(attempts.map((attempt) => attempt.raw_cost.currency));
  const bases = new Set(attempts.map((attempt) => attempt.raw_cost.basis_digest));
  const rawCostComplete =
    observedCosts.length === attempts.length && currencies.size === 1 && bases.size === 1;
  const observedSubtotal = observedCosts.reduce((sum, attempt) => sum + attempt.raw_cost.amount, 0);
  return {
    attempts: attempts.length,
    verified_successes: successes,
    failures: attempts.length - successes,
    success_rate: attempts.length === 0 ? null : successes / attempts.length,
    success_rate_wilson_95: wilsonInterval(successes, attempts.length),
    violation_attempts: violations,
    violation_rate: attempts.length === 0 ? null : violations / attempts.length,
    violation_rate_wilson_95: wilsonInterval(violations, attempts.length),
    raw_cost: {
      complete: rawCostComplete,
      observed_attempts: observedCosts.length,
      unknown_attempts: attempts.length - observedCosts.length,
      observed_subtotal: observedSubtotal,
      total: rawCostComplete ? observedSubtotal : null,
      currency: currencies.size === 1 ? [...currencies][0] : null,
      basis_digest: bases.size === 1 ? [...bases][0] : null,
      cost_per_verified_success:
        rawCostComplete && successes > 0 ? observedSubtotal / successes : null,
    },
    stages: stageDistribution(attempts),
  };
}

function rawCostIdentity(attempts) {
  const currencies = new Set(attempts.map((attempt) => attempt.raw_cost.currency));
  const bases = new Set(attempts.map((attempt) => attempt.raw_cost.basis_digest));
  return {
    consistent: currencies.size === 1 && bases.size === 1,
    currency: currencies.size === 1 ? [...currencies][0] : null,
    basis_digest: bases.size === 1 ? [...bases][0] : null,
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

function efficiencyAssessment(strata, claimPolicy, safetyVerdict, campaignCostIdentity) {
  if (!isRecord(claimPolicy)) {
    return { verdict: "not_established", reasons: ["claim_policy_missing"], strata: {} };
  }
  const minimumPairs = claimPolicy.minimum_paired_successes;
  const maximumPreviousRatio = claimPolicy.max_candidate_to_previous_cost_ratio;
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
  if (!campaignCostIdentity.consistent) {
    return { verdict: "not_established", reasons: ["raw_cost_identity_mismatch"], strata: {} };
  }
  const assessments = {};
  for (const [transport, stratum] of Object.entries(strata)) {
    const armCosts = Object.fromEntries(
      PAIRED_CAMPAIGN_ARMS.map((arm) => [
        arm,
        stratum.arms[arm].raw_cost.cost_per_verified_success,
      ]),
    );
    const complete = PAIRED_CAMPAIGN_ARMS.every(
      (arm) =>
        stratum.arms[arm].raw_cost.complete &&
        stratum.arms[arm].verified_successes > 0 &&
        Number.isFinite(armCosts[arm]),
    );
    if (
      !complete ||
      !stratum.raw_cost_identity.consistent ||
      stratum.paired_outcomes.accepted.length < minimumPairs
    ) {
      assessments[transport] = {
        verdict: "not_established",
        reason: !complete
          ? "incomplete_cost_or_zero_success"
          : !stratum.raw_cost_identity.consistent
            ? "raw_cost_identity_mismatch"
            : "paired_coverage_insufficient",
        cost_per_verified_success: armCosts,
      };
      continue;
    }
    const previousRatio = armCosts.candidate / armCosts.previous_release;
    const minimalRatio = armCosts.candidate / armCosts.minimal_agent;
    if (!Number.isFinite(previousRatio) || !Number.isFinite(minimalRatio)) {
      assessments[transport] = {
        verdict: "not_established",
        reason: "comparison_denominator_not_positive",
        cost_per_verified_success: armCosts,
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
      cost_per_verified_success: armCosts,
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
  const attempts = value.attempts.map(assertAttempt);
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
      raw_cost_identity: rawCostIdentity(selected),
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
  const unknownCostAttempts = attempts
    .filter((attempt) => attempt.raw_cost.state !== "observed")
    .map((attempt) => attempt.id);
  const campaignCostIdentity = rawCostIdentity(attempts);
  const numericCostClaimComplete =
    attempts.length > 0 && unknownCostAttempts.length === 0 && campaignCostIdentity.consistent;
  const efficiency = efficiencyAssessment(
    strata,
    value.claim_policy,
    safety.verdict,
    campaignCostIdentity,
  );
  const payload = {
    schema_version: 1,
    kind: "agentplane.paired_cost_per_verified_result_report",
    campaign_id: value.campaign_id,
    evidence_digest: value.digest ?? null,
    coverage: {
      attempts: attempts.length,
      raw_cost_observed: attempts.length - unknownCostAttempts.length,
      raw_cost_unknown: unknownCostAttempts.length,
      unknown_cost_attempt_ids: unknownCostAttempts,
      raw_cost_identity: campaignCostIdentity,
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
    numeric_cost_claim_complete: numericCostClaimComplete,
    uncertainty: {
      rate_interval: "Wilson score interval, 95%",
      paired_population:
        "Only pairs where every arm independently passes the same oracle outcome are included.",
      raw_cost: numericCostClaimComplete
        ? "Every attempt has observed raw cost."
        : unknownCostAttempts.length > 0
          ? "Unknown raw cost prevents a complete numeric cost claim."
          : "Inconsistent raw cost currency or basis prevents a complete numeric cost claim.",
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
