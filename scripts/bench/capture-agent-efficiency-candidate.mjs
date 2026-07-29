import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OUTCOME_FIELDS,
  RF04_SCENARIO_IDS,
  assertFixtureRegistry,
  readFixtureRegistry,
  relativeRepoPath,
  stableJson,
} from "../lib/agent-efficiency-baseline.mjs";
import {
  MINIMUM_REPLAY_RUNS,
  REPLAY_ANCHOR_COMMIT,
  TOKEN_FIELDS,
  assertFrozenReplayBaseline,
  assertReplayEnvelope,
  buildReplayBaseline,
  buildReplayDriverEnvironment,
  createReplayDriverContractEnvironment,
  createReplayDriverIdentity,
  createReplayHarnessManifest,
  fixtureRegistrySha256,
  readReplayEvidenceRecords,
  readReplayEnvelopeRecords,
} from "../lib/agent-efficiency-replay.mjs";
import {
  assertGitCommitAvailable,
  assertRepoPathNoSymlinkEscape,
  installReplayArtifactTransaction,
  replayDriverDiagnosticCode,
} from "../lib/agent-efficiency-replay-safety.mjs";
import {
  defineCheck,
  isDirectRun,
  parseScriptArgs,
  runScriptMain,
} from "../lib/script-runtime.mjs";
import {
  createReplayDependencyManifest,
  replayDependencyClaimFromManifest,
} from "./internal/agent-efficiency-dependency-manifest.mjs";
import {
  initializeAnchorCheckout,
  installFixtureRegistryOverlay,
} from "./internal/agent-efficiency-capture-runtime.mjs";
import {
  CODEX_REPLAY_CLI_VERSION_ENV,
  resolveCodexReplayCliVersion,
} from "./internal/agent-efficiency-codex-runtime.mjs";

const SCRIPT_NAME = "capture-agent-efficiency-candidate.mjs";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const scriptsPath = (...segments) => path.join(repoRoot, "scripts", ...segments);
const DEFAULT_DRIVER_PATH = scriptsPath("bench", "run-agent-efficiency-codex-replay.mjs");
const DEFAULT_BASELINE_PATH = scriptsPath("baselines", "agent-efficiency-pre-v0.7-replay.json");
const DEFAULT_BASELINE_REGISTRY_PATH = scriptsPath("bench", "agent-efficiency-fixtures.json");
const DEFAULT_BASELINE_ENVELOPES = scriptsPath("bench", "agent-efficiency-replay-envelopes");
const DEFAULT_BASELINE_EVIDENCE = scriptsPath("bench", "agent-efficiency-replay-evidence");
const CANDIDATE_CACHE_ROOT = path.join(repoRoot, ".agentplane", "cache", "rf04-candidate");
const CANDIDATE_CAPTURE_SCRIPT = "scripts/bench/capture-agent-efficiency-candidate.mjs";
const REPLAY_DRIVER_TURN_TIMEOUT_MS = 240_000;
const REPLAY_DRIVER_SETUP_TIMEOUT_MS = 5 * 60 * 1000;
const REPLAY_DRIVER_EXIT_GRACE_MS = 60_000;
const REPLAY_DRIVER_MAX_TIMEOUT_MS = 25 * 60 * 1000;
const MAX_INCREASE_RATIO = 0.1;

function sha256(value) {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function canonicalBytes(value) {
  return `${stableJson(value, 2)}\n`;
}

function helpText() {
  return [
    `Usage: node scripts/bench/${SCRIPT_NAME} --subject <sha> [options]`,
    "",
    "Capture and validate RF-04 telemetry for one reviewed candidate SHA.",
    "The historical pre-v0.7 anchor is baseline-only and is rejected as a candidate subject.",
    "",
    "Options:",
    "  --subject <sha>   Required full reviewed candidate commit SHA.",
    "  --codex-version <version>  Required exact Codex CLI version for every candidate episode.",
    `  --runs <count>   Runs per scenario. Minimum/default: ${MINIMUM_REPLAY_RUNS}.`,
    "  --driver <path>   Reviewed local RF-04 provider driver.",
    "  --root <path>     Candidate evidence root under .agentplane/cache/rf04-candidate/.",
    "  --replace         Replace one complete previous candidate capture generation.",
    "  --check           Rebuild and validate an existing capture without provider calls.",
    "  --help            Show this help text.",
    "",
    "The capture writes 10 scenarios x 5 runs, raw provider evidence, actual metric values,",
    "baseline/candidate deltas, declared thresholds, and a pass/fail verdict. A failed comparison",
    "is persisted and exits non-zero; it must not be retried as a successful result.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["subject", "runs", "driver", "root", "codex-version"],
    booleanFlags: ["check", "help", "replace"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  return {
    check: flags.check === true,
    codexCliVersion: flags["codex-version"] ?? "",
    driverPath: path.resolve(flags.driver ?? DEFAULT_DRIVER_PATH),
    help: flags.help === true,
    outputRoot: flags.root ? path.resolve(flags.root) : null,
    replace: flags.replace === true,
    runs: Number.parseInt(flags.runs ?? String(MINIMUM_REPLAY_RUNS), 10),
    subject: flags.subject ?? "",
  };
}

function assertCandidateSubject(subject) {
  if (!/^[a-f0-9]{40}$/u.test(subject)) {
    throw new Error("--subject must be a full 40-character Git commit SHA");
  }
  if (subject === REPLAY_ANCHOR_COMMIT) {
    throw new Error(
      "the historical RF-04 anchor is baseline-only and cannot be a candidate subject",
    );
  }
  return subject;
}

function assertRuns(runs) {
  if (!Number.isInteger(runs) || runs < MINIMUM_REPLAY_RUNS) {
    throw new Error(`--runs must be an integer >= ${MINIMUM_REPLAY_RUNS}`);
  }
  return runs;
}

function assertCandidateCodexCliVersion(value) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error("--codex-version must declare the exact reviewed Codex CLI version");
  }
  return resolveCodexReplayCliVersion({ [CODEX_REPLAY_CLI_VERSION_ENV]: value });
}

function isInside(root, candidate) {
  const relative = path.relative(root, candidate);
  return relative !== "" && !relative.startsWith(`..${path.sep}`) && relative !== "..";
}

function resolveCandidatePaths(subject, outputRoot) {
  const root = path.resolve(outputRoot ?? path.join(CANDIDATE_CACHE_ROOT, subject));
  const allowedRoot = path.resolve(CANDIDATE_CACHE_ROOT);
  if (!isInside(allowedRoot, root)) {
    throw new Error(
      "candidate evidence root must be nested under .agentplane/cache/rf04-candidate",
    );
  }
  assertRepoPathNoSymlinkEscape(repoRoot, root, "candidate evidence root");
  return {
    evidenceDirectory: path.join(root, "evidence"),
    envelopeDirectory: path.join(root, "envelopes"),
    failurePath: path.join(root, "failed-capture.json"),
    markerPath: path.join(root, "capture-transaction.json"),
    measurementPath: path.join(root, "measurement.json"),
    registryPath: path.join(root, "fixture-registry.json"),
    root,
  };
}

function assertCandidatePaths(paths) {
  for (const [label, value, kind] of [
    ["candidate registry", paths.registryPath, "file"],
    ["candidate envelopes", paths.envelopeDirectory, "directory"],
    ["candidate evidence", paths.evidenceDirectory, "directory"],
    ["candidate measurement", paths.measurementPath, "file"],
  ]) {
    assertRepoPathNoSymlinkEscape(repoRoot, value, label, { kind });
  }
  const mutable = [paths.envelopeDirectory, paths.evidenceDirectory, paths.measurementPath].map(
    (value) => path.resolve(value),
  );
  for (let index = 0; index < mutable.length; index += 1) {
    for (let other = index + 1; other < mutable.length; other += 1) {
      if (
        mutable[index] === mutable[other] ||
        isInside(mutable[index], mutable[other]) ||
        isInside(mutable[other], mutable[index])
      ) {
        throw new Error("candidate capture targets must be pairwise disjoint");
      }
    }
  }
}

function expectedRoles(scenario) {
  return [...new Set(scenario.expected_episode_trace)];
}

function replayDriverTimeoutMs(scenario) {
  const episodeCount = scenario?.expected_episode_trace?.length;
  if (!Number.isInteger(episodeCount) || episodeCount < 0) {
    throw new Error("replay scenario must declare a non-negative expected episode trace");
  }
  const timeout =
    REPLAY_DRIVER_SETUP_TIMEOUT_MS +
    episodeCount * REPLAY_DRIVER_TURN_TIMEOUT_MS +
    REPLAY_DRIVER_EXIT_GRACE_MS;
  if (timeout > REPLAY_DRIVER_MAX_TIMEOUT_MS) {
    throw new Error("replay scenario exceeds the bounded parent driver timeout contract");
  }
  return timeout;
}

function runChecked(command, args, options, label) {
  const result = spawnSync(command, args, {
    ...options,
    encoding: null,
    maxBuffer: 128 * 1024 * 1024,
  });
  if (result.error) {
    throw new Error(`${label} failed to start or exceeded its fixed timeout`);
  }
  if (result.status !== 0) {
    const diagnostic = replayDriverDiagnosticCode(result.stderr);
    throw new Error(
      `${label} failed with exit ${result.status}` +
        (diagnostic ? ` (RF04_DRIVER_ERROR:${diagnostic})` : ""),
    );
  }
}

function targetExists(target) {
  return lstatSync(target, { throwIfNoEntry: false }) !== undefined;
}

function writeCandidateRegistry(subject, registryPath) {
  const historical = readFixtureRegistry(DEFAULT_BASELINE_REGISTRY_PATH, {
    historicalBaseline: true,
  });
  const candidate = JSON.parse(stableJson(historical));
  candidate.provenance.efficiency_anchor_commit = subject;
  assertFixtureRegistry(candidate);
  mkdirSync(path.dirname(registryPath), { recursive: true });
  writeFileSync(registryPath, canonicalBytes(candidate), { encoding: "utf8", mode: 0o600 });
  return candidate;
}

function readCandidateRegistry(subject, registryPath) {
  const registry = readFixtureRegistry(registryPath);
  if (registry.provenance.efficiency_anchor_commit !== subject) {
    throw new Error("candidate fixture registry is not bound to the reviewed subject SHA");
  }
  return registry;
}

export function createCandidateHarnessManifest(driverIdentity, dependencyClaim) {
  const base = createReplayHarnessManifest(repoRoot, driverIdentity, { dependencyClaim });
  const capturePath = path.join(repoRoot, CANDIDATE_CAPTURE_SCRIPT);
  const files = [
    ...base.files,
    {
      path: CANDIDATE_CAPTURE_SCRIPT,
      sha256: sha256(readFileSync(capturePath)),
    },
  ]
    .filter(
      (entry, index, all) => all.findIndex((candidate) => candidate.path === entry.path) === index,
    )
    .toSorted((left, right) => left.path.localeCompare(right.path));
  const payload = {
    dependency_claim: dependencyClaim,
    driver_contract_version: driverIdentity.contract_version,
    files,
  };
  return { ...payload, sha256: sha256(canonicalBytes(payload)) };
}

function candidateInputFingerprint({
  codexCliVersion,
  dependencyClaim,
  driverIdentity,
  harnessManifest,
  registry,
}) {
  return {
    codex_cli_version: codexCliVersion,
    dependency_claim: dependencyClaim,
    driver: driverIdentity,
    fixture_registry_sha256: fixtureRegistrySha256(registry),
    harness_sha256: harnessManifest.sha256,
  };
}

function assertCandidateInputsUnchanged(expected, registryPath, driverPath) {
  const registry = readCandidateRegistry(expected.subject, registryPath);
  const driverIdentity = createReplayDriverIdentity(repoRoot, driverPath);
  const dependencyManifest = createReplayDependencyManifest(repoRoot);
  const dependencyClaim = replayDependencyClaimFromManifest(dependencyManifest);
  const harnessManifest = createCandidateHarnessManifest(driverIdentity, dependencyClaim);
  const actual = candidateInputFingerprint({
    codexCliVersion: expected.codexCliVersion,
    dependencyClaim,
    driverIdentity,
    harnessManifest,
    registry,
  });
  if (stableJson(actual) !== stableJson(expected.fingerprint)) {
    throw new Error("candidate RF-04 capture inputs changed during capture");
  }
}

function fixedRuntimeProfile(envelopeRecords, codexCliVersion, label) {
  const profiles = envelopeRecords.map((record) => record.value?.profile);
  const distinct = [...new Set(profiles.map((profile) => stableJson(profile)))];
  if (distinct.length !== 1 || profiles.length === 0) {
    throw new Error(`${label} must use one fixed provider runtime profile`);
  }
  const profile = profiles[0];
  if (
    typeof profile?.runtime_version !== "string" ||
    !profile.runtime_version.endsWith(`/${codexCliVersion}`)
  ) {
    throw new Error(`${label} runtime profile does not bind declared Codex CLI version`);
  }
  return profile;
}

function canonicalRecord(value, label) {
  const bytes = canonicalBytes(value);
  if (typeof value !== "object" || value === null) {
    throw new Error(`${label} must be a JSON object`);
  }
  return bytes;
}

function assertRecords({
  anchor,
  dependencyClaim,
  driverIdentity,
  envelopeRecords,
  evidenceRecords,
  harnessManifest,
  registry,
  runs,
}) {
  const scenarioById = new Map(registry.scenarios.map((scenario) => [scenario.id, scenario]));
  const evidenceByPath = new Map(evidenceRecords.map((record) => [record.path, record]));
  if (evidenceByPath.size !== evidenceRecords.length) {
    throw new Error("candidate evidence contains duplicate paths");
  }
  const grouped = new Map();
  const seenRunIds = new Set();
  for (const record of envelopeRecords) {
    if (record.bytes !== canonicalRecord(record.value, record.path)) {
      throw new Error(`${record.path} must use canonical stable JSON with one trailing newline`);
    }
    assertReplayEnvelope(record.value, {
      allowTestControls: false,
      anchor,
      dependencyClaim,
      driverIdentity,
      evidenceByPath,
      fixtureRegistrySha256: fixtureRegistrySha256(registry),
      harnessSha256: harnessManifest.sha256,
      runs,
      scenarioById,
    });
    if (seenRunIds.has(record.value.run_id)) {
      throw new Error(`candidate capture contains duplicate run ${record.value.run_id}`);
    }
    seenRunIds.add(record.value.run_id);
    const scenarioRuns = grouped.get(record.value.scenario_id) ?? [];
    scenarioRuns.push(record.value);
    grouped.set(record.value.scenario_id, scenarioRuns);
  }
  if (
    stableJson([...grouped.keys()].toSorted()) !== stableJson([...RF04_SCENARIO_IDS].toSorted())
  ) {
    throw new Error("candidate capture must contain exactly the ten RF-04 scenarios");
  }
  for (const scenario of registry.scenarios) {
    const scenarioRuns = (grouped.get(scenario.id) ?? []).toSorted(
      (left, right) => left.run_index - right.run_index,
    );
    const indices = scenarioRuns.map((entry) => entry.run_index);
    const expected = Array.from({ length: runs }, (_, index) => index + 1);
    if (scenarioRuns.length !== runs || stableJson(indices) !== stableJson(expected)) {
      throw new Error(`${scenario.id} must contain exactly ${runs} candidate runs`);
    }
    grouped.set(scenario.id, scenarioRuns);
  }
  return grouped;
}

function observedNumber(cell, label) {
  if (cell?.resolution !== "observed" || !Number.isFinite(cell.value)) {
    throw new Error(`${label} must contain an observed numeric value`);
  }
  return cell.value;
}

function observedBoolean(cell, label) {
  if (cell?.resolution !== "observed" || typeof cell.value !== "boolean") {
    throw new Error(`${label} must contain an observed boolean value`);
  }
  return cell.value;
}

function mean(values, label) {
  if (values.length === 0) throw new Error(`${label} has no comparable observations`);
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function summarizeActualValues(grouped, registry) {
  const totals = { input_tokens: 0, output_tokens: 0, reasoning_tokens: 0 };
  const latency = {
    harness_setup_latency_ms: [],
    time_to_first_scoped_mutation_ms: [],
    time_to_verified_result_ms: [],
  };
  const outcomes = Object.fromEntries(OUTCOME_FIELDS.map((field) => [field, 0]));
  let goldenMismatchCount = 0;
  let providerEpisodes = 0;
  for (const scenario of registry.scenarios) {
    for (const envelope of grouped.get(scenario.id) ?? []) {
      providerEpisodes += observedNumber(
        envelope.metrics.llm_episodes,
        `${envelope.run_id}.llm_episodes`,
      );
      for (const roleUsage of Object.values(envelope.token_usage_by_role)) {
        for (const field of TOKEN_FIELDS) {
          totals[field] += observedNumber(roleUsage[field], `${envelope.run_id}.${field}`);
        }
      }
      for (const [field, samples] of Object.entries(latency)) {
        const cell = envelope.diagnostics.latency_ms[field];
        if (cell?.resolution === "observed")
          samples.push(observedNumber(cell, `${envelope.run_id}.${field}`));
      }
      for (const field of OUTCOME_FIELDS) {
        const value = observedBoolean(
          envelope.resolved_outcomes[field],
          `${envelope.run_id}.${field}`,
        );
        outcomes[field] += value ? 1 : 0;
        if (value !== scenario.expected_outcomes[field]) goldenMismatchCount += 1;
      }
    }
  }
  return {
    golden_mismatch_count: goldenMismatchCount,
    latency_ms: Object.fromEntries(
      Object.entries(latency).map(([field, samples]) => [
        field,
        { mean: mean(samples, field), sample_count: samples.length },
      ]),
    ),
    outcomes,
    provider_episodes: providerEpisodes,
    provider_tokens: {
      ...totals,
      total_tokens: totals.input_tokens + totals.output_tokens + totals.reasoning_tokens,
    },
  };
}

function atMostComparison(id, baseline, candidate, maximumIncreaseRatio = MAX_INCREASE_RATIO) {
  if (!Number.isFinite(baseline) || !Number.isFinite(candidate) || baseline < 0 || candidate < 0) {
    throw new Error(`${id} requires finite non-negative baseline and candidate values`);
  }
  const ceiling = baseline * (1 + maximumIncreaseRatio);
  return {
    baseline,
    candidate,
    delta: candidate - baseline,
    delta_ratio: baseline === 0 ? null : (candidate - baseline) / baseline,
    id,
    maximum: ceiling,
    threshold: { kind: "max_increase_ratio", value: maximumIncreaseRatio },
    verdict: candidate <= ceiling ? "pass" : "fail",
  };
}

function atLeastComparison(id, baseline, candidate) {
  return {
    baseline,
    candidate,
    delta: candidate - baseline,
    id,
    minimum: baseline,
    threshold: { kind: "no_regression", value: 0 },
    verdict: candidate >= baseline ? "pass" : "fail",
  };
}

function exactComparison(id, baseline, candidate) {
  return {
    baseline,
    candidate,
    delta: candidate - baseline,
    id,
    threshold: { kind: "exact", value: baseline },
    verdict: candidate === baseline ? "pass" : "fail",
  };
}

function identityComparison(id, baseline, candidate) {
  return {
    baseline,
    candidate,
    id,
    threshold: { kind: "exact", value: baseline },
    verdict: stableJson(candidate) === stableJson(baseline) ? "pass" : "fail",
  };
}

export function buildCandidateMeasurement({
  candidateAnchor,
  candidateCodexCliVersion,
  candidateDependencyClaim,
  candidateDriverIdentity,
  candidateEnvelopeRecords,
  candidateEvidenceRecords,
  candidateHarnessManifest,
  candidateRegistry,
  runs = MINIMUM_REPLAY_RUNS,
}) {
  const subject = assertCandidateSubject(candidateAnchor);
  const codexCliVersion = resolveCodexReplayCliVersion({
    [CODEX_REPLAY_CLI_VERSION_ENV]: candidateCodexCliVersion,
  });
  assertRuns(runs);
  assertFixtureRegistry(candidateRegistry);
  if (candidateRegistry.provenance.efficiency_anchor_commit !== subject) {
    throw new Error("candidate registry subject SHA does not match the requested candidate");
  }
  const candidateGrouped = assertRecords({
    anchor: subject,
    dependencyClaim: candidateDependencyClaim,
    driverIdentity: candidateDriverIdentity,
    envelopeRecords: candidateEnvelopeRecords,
    evidenceRecords: candidateEvidenceRecords,
    harnessManifest: candidateHarnessManifest,
    registry: candidateRegistry,
    runs,
  });
  const candidateRuntimeProfile = fixedRuntimeProfile(
    candidateEnvelopeRecords,
    codexCliVersion,
    "candidate RF-04 capture",
  );

  const baselineRegistry = readFixtureRegistry(DEFAULT_BASELINE_REGISTRY_PATH, {
    historicalBaseline: true,
  });
  const baselineEnvelopeRecords = readReplayEnvelopeRecords(repoRoot, DEFAULT_BASELINE_ENVELOPES);
  const baselineEvidenceRecords = readReplayEvidenceRecords(repoRoot, DEFAULT_BASELINE_EVIDENCE);
  const frozenBaseline = JSON.parse(readFileSync(DEFAULT_BASELINE_PATH, "utf8"));
  const baselineDriverIdentity = frozenBaseline?.anchor?.driver;
  const baselineHarnessManifest = frozenBaseline?.anchor?.harness;
  const baselineDependencyClaim = baselineHarnessManifest?.dependency_claim;
  if (
    frozenBaseline?.anchor?.subject_sha !== REPLAY_ANCHOR_COMMIT ||
    !baselineDriverIdentity ||
    !baselineHarnessManifest ||
    !baselineDependencyClaim
  ) {
    throw new Error("frozen RF-04 baseline anchor metadata is incomplete or has changed");
  }
  const baseline = buildReplayBaseline({
    driverIdentity: baselineDriverIdentity,
    envelopeRecords: baselineEnvelopeRecords,
    evidenceRecords: baselineEvidenceRecords,
    harnessManifest: baselineHarnessManifest,
    registry: baselineRegistry,
    runs,
  });
  assertFrozenReplayBaseline(frozenBaseline, baseline, "frozen RF-04 replay baseline");
  const baselineRuntimeProfile = fixedRuntimeProfile(
    baselineEnvelopeRecords,
    frozenBaseline.capture_profile.runtime_version.split("/").at(-1),
    "frozen RF-04 baseline",
  );
  const baselineGrouped = assertRecords({
    anchor: REPLAY_ANCHOR_COMMIT,
    dependencyClaim: baselineDependencyClaim,
    driverIdentity: baselineDriverIdentity,
    envelopeRecords: baselineEnvelopeRecords,
    evidenceRecords: baselineEvidenceRecords,
    harnessManifest: baselineHarnessManifest,
    registry: baselineRegistry,
    runs,
  });
  const baselineValues = summarizeActualValues(baselineGrouped, baselineRegistry);
  const candidateValues = summarizeActualValues(candidateGrouped, candidateRegistry);
  const runtimeComparison = {
    baseline: baselineRuntimeProfile.runtime_version,
    candidate: candidateRuntimeProfile.runtime_version,
    profile_match: stableJson(baselineRuntimeProfile) === stableJson(candidateRuntimeProfile),
  };
  const comparisons = [
    ...Object.entries(candidateValues.provider_tokens).map(([field, candidate]) =>
      atMostComparison(
        `provider_tokens.${field}`,
        baselineValues.provider_tokens[field],
        candidate,
      ),
    ),
    ...Object.keys(candidateValues.latency_ms).flatMap((field) => {
      const baselineLatency = baselineValues.latency_ms[field];
      const candidateLatency = candidateValues.latency_ms[field];
      return [
        atLeastComparison(
          `latency.${field}.sample_count`,
          baselineLatency.sample_count,
          candidateLatency.sample_count,
        ),
        atMostComparison(`latency.${field}.mean_ms`, baselineLatency.mean, candidateLatency.mean),
      ];
    }),
    atLeastComparison(
      "outcomes.verified_success",
      baselineValues.outcomes.verified_success,
      candidateValues.outcomes.verified_success,
    ),
    atMostComparison(
      "outcomes.rework_required",
      baselineValues.outcomes.rework_required,
      candidateValues.outcomes.rework_required,
      0,
    ),
    atMostComparison(
      "outcomes.golden_mismatch_count",
      baselineValues.golden_mismatch_count,
      candidateValues.golden_mismatch_count,
      0,
    ),
    exactComparison(
      "provider_episodes",
      baselineValues.provider_episodes,
      candidateValues.provider_episodes,
    ),
    identityComparison("runtime.profile", baselineRuntimeProfile, candidateRuntimeProfile),
  ];
  const failures = comparisons.filter((comparison) => comparison.verdict !== "pass");
  return {
    baseline: {
      actual_values: baselineValues,
      replay_baseline_sha256: sha256(readFileSync(DEFAULT_BASELINE_PATH)),
      runtime_profile: baselineRuntimeProfile,
      subject_sha: REPLAY_ANCHOR_COMMIT,
    },
    candidate: {
      actual_values: candidateValues,
      coverage: {
        replay_runs: candidateEnvelopeRecords.length,
        scenarios: candidateGrouped.size,
      },
      driver: candidateDriverIdentity,
      fixture_registry_sha256: fixtureRegistrySha256(candidateRegistry),
      harness_sha256: candidateHarnessManifest.sha256,
      runtime_profile: candidateRuntimeProfile,
      subject_sha: subject,
    },
    comparisons,
    failure_ids: failures.map((comparison) => comparison.id),
    kind: "agent_efficiency_candidate_measurement_v1",
    runtime_comparison: runtimeComparison,
    schema_version: 1,
    verdict: failures.length === 0 ? "pass" : "fail",
  };
}

function captureCandidate(options) {
  const subject = assertCandidateSubject(options.subject);
  const codexCliVersion = assertCandidateCodexCliVersion(options.codexCliVersion);
  const runs = assertRuns(options.runs);
  assertGitCommitAvailable(repoRoot, subject);
  const paths = resolveCandidatePaths(subject, options.outputRoot);
  const publicationTargets = [
    paths.envelopeDirectory,
    paths.evidenceDirectory,
    paths.measurementPath,
  ];
  const existingTargetCount = publicationTargets.filter((target) => targetExists(target)).length;
  if (existingTargetCount > 0 && !options.replace) {
    throw new Error(
      "candidate envelopes, evidence, or measurement already exist; refusing a retry without --replace",
    );
  }
  if (options.replace && existingTargetCount !== 0 && existingTargetCount !== 3) {
    throw new Error("candidate replacement requires a complete previous three-artifact generation");
  }
  if (targetExists(paths.markerPath)) {
    throw new Error("an unfinished candidate capture transaction requires manual recovery");
  }

  const registry = writeCandidateRegistry(subject, paths.registryPath);
  const driverIdentity = createReplayDriverIdentity(repoRoot, options.driverPath);
  const dependencyManifest = createReplayDependencyManifest(repoRoot);
  const dependencyClaim = replayDependencyClaimFromManifest(dependencyManifest);
  const harnessManifest = createCandidateHarnessManifest(driverIdentity, dependencyClaim);
  const expectedInputs = {
    fingerprint: candidateInputFingerprint({
      codexCliVersion,
      dependencyClaim,
      driverIdentity,
      harnessManifest,
      registry,
    }),
    codexCliVersion,
    subject,
  };
  const cacheRoot = path.join(repoRoot, ".agentplane", "cache");
  mkdirSync(cacheRoot, { recursive: true });
  const captureRoot = mkdtempSync(path.join(cacheRoot, "rf04-candidate-staging-"));
  const stagingEnvelopes = path.join(captureRoot, "envelopes");
  const stagingEvidence = path.join(captureRoot, "evidence");
  const stagingMeasurement = path.join(captureRoot, "measurement.json");
  const isolatedRepository = path.join(captureRoot, "subject");
  const completedRuns = [];
  mkdirSync(stagingEnvelopes, { recursive: true });
  mkdirSync(stagingEvidence, { recursive: true });
  const evidenceLogicalRoot = relativeRepoPath(
    repoRoot,
    paths.evidenceDirectory,
    "candidate evidence directory",
  );

  try {
    for (const scenario of registry.scenarios) {
      for (let runIndex = 1; runIndex <= runs; runIndex += 1) {
        rmSync(isolatedRepository, { force: true, recursive: true });
        mkdirSync(isolatedRepository, { recursive: true });
        initializeAnchorCheckout(repoRoot, isolatedRepository, subject);
        const registryOverlay = installFixtureRegistryOverlay(
          isolatedRepository,
          registry,
          fixtureRegistrySha256(registry),
        );
        const scenarioDirectory = path.join(stagingEnvelopes, scenario.id);
        const evidenceScenarioDirectory = path.join(stagingEvidence, scenario.id);
        mkdirSync(scenarioDirectory, { recursive: true });
        mkdirSync(evidenceScenarioDirectory, { recursive: true });
        const fileName = `run-${String(runIndex).padStart(2, "0")}.json`;
        const outputPath = path.join(scenarioDirectory, fileName);
        const evidenceOutputPath = path.join(evidenceScenarioDirectory, fileName);
        const runId = `${scenario.id}/run-${String(runIndex).padStart(2, "0")}`;
        const contractEnvironment = createReplayDriverContractEnvironment({
          anchor: subject,
          codexCliVersion,
          dependencyClaim,
          driverIdentity,
          evidenceOutputPath,
          evidencePath: path.posix.join(evidenceLogicalRoot, scenario.id, fileName),
          expectedRolesJson: stableJson(expectedRoles(scenario)),
          fixtureRegistryPath: registryOverlay,
          fixtureRegistrySha256: fixtureRegistrySha256(registry),
          harnessSha256: harnessManifest.sha256,
          outputPath,
          runId,
        });
        runChecked(
          process.execPath,
          [
            options.driverPath,
            "--scenario",
            scenario.id,
            "--run-index",
            String(runIndex),
            "--output",
            outputPath,
            "--evidence-output",
            evidenceOutputPath,
          ],
          {
            cwd: isolatedRepository,
            env: buildReplayDriverEnvironment(process.env, contractEnvironment),
            timeout: replayDriverTimeoutMs(scenario),
          },
          `${runId} candidate driver`,
        );
        if (!existsSync(outputPath) || !existsSync(evidenceOutputPath)) {
          throw new Error(`${runId} driver did not write its complete candidate evidence`);
        }
        const envelope = JSON.parse(readFileSync(outputPath, "utf8"));
        const evidence = JSON.parse(readFileSync(evidenceOutputPath, "utf8"));
        if (
          readFileSync(outputPath, "utf8") !== canonicalBytes(envelope) ||
          readFileSync(evidenceOutputPath, "utf8") !== canonicalBytes(evidence)
        ) {
          throw new Error(`${runId} candidate driver output must be canonical stable JSON`);
        }
        completedRuns.push(runId);
        assertCandidateInputsUnchanged(expectedInputs, paths.registryPath, options.driverPath);
      }
    }
    const envelopes = readReplayEnvelopeRecords(repoRoot, stagingEnvelopes, {
      logicalRoot: relativeRepoPath(
        repoRoot,
        paths.envelopeDirectory,
        "candidate envelope directory",
      ),
    });
    const evidence = readReplayEvidenceRecords(repoRoot, stagingEvidence, {
      logicalRoot: evidenceLogicalRoot,
    });
    const measurement = buildCandidateMeasurement({
      candidateAnchor: subject,
      candidateCodexCliVersion: codexCliVersion,
      candidateDependencyClaim: dependencyClaim,
      candidateDriverIdentity: driverIdentity,
      candidateEnvelopeRecords: envelopes,
      candidateEvidenceRecords: evidence,
      candidateHarnessManifest: harnessManifest,
      candidateRegistry: registry,
      runs,
    });
    writeFileSync(stagingMeasurement, canonicalBytes(measurement), {
      encoding: "utf8",
      mode: 0o600,
    });
    installReplayArtifactTransaction(
      [
        { staging: stagingEnvelopes, target: paths.envelopeDirectory },
        { staging: stagingEvidence, target: paths.evidenceDirectory },
        { staging: stagingMeasurement, target: paths.measurementPath },
      ],
      captureRoot,
      {
        markerPath: paths.markerPath,
        validateInstalled() {
          assertCandidateInputsUnchanged(expectedInputs, paths.registryPath, options.driverPath);
          const installed = rebuildCandidateMeasurement({
            codexCliVersion,
            driverPath: options.driverPath,
            paths,
            runs,
            subject,
          });
          if (readFileSync(paths.measurementPath, "utf8") !== canonicalBytes(installed)) {
            throw new Error(
              "installed candidate measurement differs from its raw capture evidence",
            );
          }
        },
      },
    );
    return measurement;
  } catch (error) {
    mkdirSync(paths.root, { recursive: true });
    writeFileSync(
      paths.failurePath,
      canonicalBytes({
        completed_runs: completedRuns,
        failed_at: new Date().toISOString(),
        kind: "agent_efficiency_candidate_capture_failure_v1",
        message: error instanceof Error ? error.message : String(error),
        subject_sha: subject,
      }),
      { encoding: "utf8", mode: 0o600 },
    );
    throw error;
  } finally {
    if (!targetExists(paths.markerPath)) {
      rmSync(captureRoot, { force: true, recursive: true });
    }
  }
}

function rebuildCandidateMeasurement({ codexCliVersion, driverPath, paths, runs, subject }) {
  const registry = readCandidateRegistry(subject, paths.registryPath);
  const candidateEnvelopeRecords = readReplayEnvelopeRecords(repoRoot, paths.envelopeDirectory);
  const candidateEvidenceRecords = readReplayEvidenceRecords(repoRoot, paths.evidenceDirectory);
  const driverIdentity = createReplayDriverIdentity(repoRoot, driverPath);
  const dependencyClaim = replayDependencyClaimFromManifest(
    createReplayDependencyManifest(repoRoot),
  );
  const harnessManifest = createCandidateHarnessManifest(driverIdentity, dependencyClaim);
  return buildCandidateMeasurement({
    candidateAnchor: subject,
    candidateCodexCliVersion: codexCliVersion,
    candidateDependencyClaim: dependencyClaim,
    candidateDriverIdentity: driverIdentity,
    candidateEnvelopeRecords,
    candidateEvidenceRecords,
    candidateHarnessManifest: harnessManifest,
    candidateRegistry: registry,
    runs,
  });
}

export function checkCandidateCapture(options) {
  const subject = assertCandidateSubject(options.subject);
  const codexCliVersion = assertCandidateCodexCliVersion(options.codexCliVersion);
  const runs = assertRuns(options.runs);
  const paths = resolveCandidatePaths(subject, options.outputRoot);
  assertCandidatePaths(paths);
  if (!targetExists(paths.measurementPath)) {
    throw new Error("candidate measurement is absent; run the candidate capture first");
  }
  const rebuilt = rebuildCandidateMeasurement({
    codexCliVersion,
    driverPath: options.driverPath,
    paths,
    runs,
    subject,
  });
  if (readFileSync(paths.measurementPath, "utf8") !== canonicalBytes(rebuilt)) {
    throw new Error("candidate measurement is not the deterministic rebuild of its raw evidence");
  }
  return rebuilt;
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    if (options.help) {
      stdout.write(`${helpText()}\n`);
      return;
    }
    const measurement = options.check ? checkCandidateCapture(options) : captureCandidate(options);
    stdout.write(
      `RF-04 candidate measurement ${options.check ? "validated" : "captured"} ` +
        `(subject=${measurement.candidate.subject_sha}; runs=${measurement.candidate.coverage.replay_runs}; ` +
        `episodes=${measurement.candidate.actual_values.provider_episodes}; verdict=${measurement.verdict})\n`,
    );
    if (measurement.verdict !== "pass") {
      throw new Error(`RF-04 candidate comparison failed: ${measurement.failure_ids.join(", ")}`);
    }
  },
});

if (isDirectRun(import.meta.url)) {
  runScriptMain(main);
}
