import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  renderDefectLedger,
  sha256,
  stableJson,
  validateQualificationReport,
} from "../../../../scripts/qualification/release-qualification.mjs";

const EXPECTED_SUBJECT = "de94bf9d91de1a8a854ad358968e8193e9803342";
const EXPECTED_SCENARIOS = 19;
const EXPECTED_PROVIDER_EPISODES = 55;
const EXPECTED_REPLAY_RUNS = 50;
const EXPECTED_REPLAY_SCENARIOS = 10;
const TOKEN_FIELDS = ["input_tokens", "output_tokens", "reasoning_tokens", "total_tokens"];
const OUTCOME_AT_MOST_FIELDS = ["rework_required", "scope_violation"];

const evidenceDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(evidenceDirectory, "../../../..");
const gateDirectory = path.join(evidenceDirectory, "final-de94bf9d9-gate");

function readJson(relativePath) {
  return JSON.parse(readFileSync(path.join(gateDirectory, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertEqual(actual, expected, label) {
  assert(actual === expected, `${label}: expected ${String(expected)}, got ${String(actual)}`);
}

function validateReport() {
  const report = validateQualificationReport(readJson("report.json"));
  assertEqual(report.release, "0.7.1", "report.release");
  assertEqual(report.mode, "gate", "report.mode");
  assertEqual(report.profile, "full", "report.profile");
  assertEqual(report.subject, EXPECTED_SUBJECT, "report.subject");
  assertEqual(report.verdict, "ready", "report.verdict");
  assertEqual(report.release_ready, true, "report.release_ready");
  assertEqual(report.local_ready, true, "report.local_ready");
  assertEqual(report.provider?.requested, true, "report.provider.requested");
  assertEqual(report.provider?.status, "passed", "report.provider.status");
  assertEqual(report.summary?.selected, EXPECTED_SCENARIOS, "report.summary.selected");
  assertEqual(report.summary?.declared, EXPECTED_SCENARIOS, "report.summary.declared");
  assertEqual(report.summary?.blocking, 0, "report.summary.blocking");
  assertEqual(report.summary?.local_selection_complete, true, "local selection completeness");
  assertEqual(
    report.summary?.provider_selection_complete,
    true,
    "provider selection completeness",
  );

  assert(
    report.defects.every((defect) => defect.release_disposition === "advisory"),
    "recorded gate contains a blocking defect",
  );
  assert(
    report.scenarios.some(
      (scenario) =>
        scenario.id === "provider-matrix" &&
        scenario.tier === "provider" &&
        scenario.status === "passed",
    ),
    "provider-matrix pass is missing",
  );
  for (const scenario of report.scenarios) {
    assert(
      typeof scenario.output_tail === "string" && scenario.output_tail.trim().length > 0,
      `missing compact scenario output: ${scenario.id}`,
    );
  }

  const manifestPath = path.join(repositoryRoot, report.manifest.path);
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  assertEqual(report.manifest.sha256, sha256(`${stableJson(manifest)}\n`), "manifest digest");
  assertEqual(
    execFileSync("git", ["rev-parse", `${EXPECTED_SUBJECT}^{tree}`], {
      cwd: repositoryRoot,
      encoding: "utf8",
    }).trim(),
    report.source_identity.tree,
    "frozen subject tree",
  );
  assertEqual(
    readFileSync(path.join(gateDirectory, "defects.md"), "utf8"),
    renderDefectLedger(report),
    "defect ledger",
  );
}

function validateEfficiency() {
  const evidence = readJson("efficiency-evidence.json");
  assertEqual(evidence.schema_version, 1, "efficiency.schema_version");
  assertEqual(evidence.kind, "agentplane.v0.7.1_efficiency_qualification", "efficiency.kind");
  assertEqual(evidence.subject, EXPECTED_SUBJECT, "efficiency.subject");
  assertEqual(evidence.source_subject, EXPECTED_SUBJECT, "efficiency.source_subject");
  assertEqual(evidence.verdict, "pass", "efficiency.verdict");
  assertEqual(evidence.failures?.length, 0, "efficiency.failures");
  assertEqual(evidence.provider_episodes, EXPECTED_PROVIDER_EPISODES, "provider episodes");
  assertEqual(evidence.coverage?.replay_runs, EXPECTED_REPLAY_RUNS, "replay runs");
  assertEqual(evidence.coverage?.scenarios, EXPECTED_REPLAY_SCENARIOS, "replay scenarios");
  assert(
    evidence.provider_tokens?.total_reduction_ratio >= 0.2,
    "total provider token reduction is below 20%",
  );

  const baselineTokens = evidence.provider_tokens?.baseline;
  const candidateTokens = evidence.provider_tokens?.candidate;
  for (const field of TOKEN_FIELDS) {
    assert(candidateTokens?.[field] > 0, `candidate ${field} is missing`);
    assert(candidateTokens[field] <= baselineTokens?.[field], `candidate ${field} regressed`);
  }
  assert(
    evidence.outcomes?.candidate?.verified_success >= evidence.outcomes?.baseline?.verified_success,
    "verified_success regressed",
  );
  for (const field of OUTCOME_AT_MOST_FIELDS) {
    assert(
      evidence.outcomes?.candidate?.[field] <= evidence.outcomes?.baseline?.[field],
      `${field} regressed`,
    );
  }
  assert(
    evidence.outcomes?.candidate_golden_mismatch_count <=
      evidence.outcomes?.baseline_golden_mismatch_count,
    "golden mismatch count regressed",
  );
}

validateReport();
validateEfficiency();
process.stdout.write(
  `recorded v0.7.1 gate: pass; subject=${EXPECTED_SUBJECT}; runs=${EXPECTED_REPLAY_RUNS}; episodes=${EXPECTED_PROVIDER_EPISODES}\n`,
);
