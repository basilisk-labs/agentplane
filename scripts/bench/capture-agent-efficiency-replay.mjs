import { spawnSync } from "node:child_process";
import {
  existsSync,
  lstatSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  readFixtureRegistry,
  relativeRepoPath,
  stableJson,
} from "../lib/agent-efficiency-baseline.mjs";
import {
  MINIMUM_REPLAY_RUNS,
  REPLAY_ANCHOR_COMMIT,
  assertFrozenReplayBaseline,
  assertReplayEnvelope,
  buildReplayBaseline,
  buildReplayDriverEnvironment,
  createReplayDriverIdentity,
  createReplayHarnessManifest,
  fixtureRegistrySha256,
  readReplayEvidenceRecords,
  readReplayEnvelopeRecords,
  replayDependencyClaimFromEnvelopeRecords,
  replayDriverIdentityFromEnvelopeRecords,
  replayBaselineBytes,
} from "../lib/agent-efficiency-replay.mjs";
import {
  assertGitCommitAvailable,
  assertRepoPathNoSymlinkEscape,
  assertReplayCaptureTargets,
  installReplayArtifactTransaction,
  replayDriverDiagnosticCode,
} from "../lib/agent-efficiency-replay-safety.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";
import {
  assertReplayDependencyClaim,
  createReplayDependencyManifest,
  replayDependencyClaimFromManifest,
} from "./internal/agent-efficiency-dependency-manifest.mjs";
import {
  assertReplayCaptureInputsUnchanged,
  initializeAnchorCheckout,
  installFixtureRegistryOverlay,
} from "./internal/agent-efficiency-capture-runtime.mjs";

export { buildReplayGitEnvironment } from "../lib/agent-efficiency-replay-safety.mjs";
export { replayAnchorCloneArgs } from "./internal/agent-efficiency-capture-runtime.mjs";

const SCRIPT_NAME = "capture-agent-efficiency-replay.mjs";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const scriptsPath = (...segments) => path.join(repoRoot, "scripts", ...segments);
const DEFAULT_REGISTRY_PATH = scriptsPath("bench", "agent-efficiency-fixtures.json");
const DEFAULT_SOURCE_DIRECTORY = scriptsPath("bench", "agent-efficiency-replay-envelopes");
const DEFAULT_EVIDENCE_DIRECTORY = scriptsPath("bench", "agent-efficiency-replay-evidence");
const DEFAULT_OUTPUT_PATH = scriptsPath("baselines", "agent-efficiency-pre-v0.7-replay.json");
export const REPLAY_DRIVER_TURN_TIMEOUT_MS = 240_000;
const REPLAY_DRIVER_SETUP_TIMEOUT_MS = 5 * 60 * 1000;
const REPLAY_DRIVER_EXIT_GRACE_MS = 60_000;
const REPLAY_DRIVER_MAX_TIMEOUT_MS = 25 * 60 * 1000;

export function replayDriverTimeoutMs(scenario) {
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

function helpText() {
  return [
    `Usage: node scripts/bench/${SCRIPT_NAME} [options]`,
    "",
    "Build the additive RF-04 replay baseline from canonical provider-backed envelopes and evidence.",
    "The command never estimates tokens and refuses an incomplete or non-authoritative capture.",
    "",
    "Options:",
    `  --anchor <sha>       Exact subject commit. Required value: ${REPLAY_ANCHOR_COMMIT}`,
    `  --runs <count>       Runs per scenario. Minimum/default: ${MINIMUM_REPLAY_RUNS}`,
    "  --registry <path>    RF-04 fixture registry.",
    "  --source-dir <path>  Persisted canonical envelopes directory.",
    "  --evidence-dir <path> Persisted canonical sanitized evidence bundles directory.",
    "  --output <path>      Replay baseline output path.",
    "  --driver <path>      Explicitly authorized local driver. It runs once per isolated scenario/run.",
    "  --pilot              Run only direct/run-01, validate it in memory, and persist nothing.",
    "  --replace            Replace envelopes, evidence, and baseline as one validated transaction.",
    "  --help               Show this help text.",
    "",
    "Driver contract:",
    "  argv: --scenario <id> --run-index <n> --output <file> --evidence-output <file>",
    "  env: only fixed safe process fields and the exact AGENTPLANE_RF04_REPLAY_* contract fields.",
    "  output: one canonical sanitized envelope plus one canonical content-addressed evidence bundle;",
    "          provider usage must include explicit reasoning_output_tokens mapped to reasoning_tokens.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["anchor", "runs", "registry", "source-dir", "evidence-dir", "output", "driver"],
    booleanFlags: ["replace", "pilot", "help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  const runs = Number.parseInt(flags.runs ?? String(MINIMUM_REPLAY_RUNS), 10);
  return {
    anchor: flags.anchor ?? REPLAY_ANCHOR_COMMIT,
    driverPath: flags.driver ? path.resolve(flags.driver) : null,
    evidenceDirectory: path.resolve(flags["evidence-dir"] ?? DEFAULT_EVIDENCE_DIRECTORY),
    help: flags.help === true,
    outputPath: path.resolve(flags.output ?? DEFAULT_OUTPUT_PATH),
    pilot: flags.pilot === true,
    registryPath: path.resolve(flags.registry ?? DEFAULT_REGISTRY_PATH),
    replace: flags.replace === true,
    runs,
    sourceDirectory: path.resolve(flags["source-dir"] ?? DEFAULT_SOURCE_DIRECTORY),
  };
}

function assertInsideRepository(filePath, label, kind = null) {
  return assertRepoPathNoSymlinkEscape(repoRoot, filePath, label, { kind });
}

function expectedRoles(scenario) {
  return [...new Set(scenario.expected_episode_trace)];
}

export function runChecked(command, args, options, label) {
  const { exposeStderr = true, ...spawnOptions } = options;
  const encoding = exposeStderr
    ? Object.hasOwn(spawnOptions, "encoding")
      ? spawnOptions.encoding
      : "utf8"
    : null;
  const result = spawnSync(command, args, {
    ...spawnOptions,
    encoding,
    maxBuffer: spawnOptions.maxBuffer ?? 128 * 1024 * 1024,
  });
  if (result.error) {
    throw new Error(
      exposeStderr
        ? `${label} failed to start: ${result.error.message}`
        : `${label} failed to start or exceeded its fixed timeout`,
    );
  }
  if (result.status !== 0) {
    const diagnosticCode = exposeStderr ? null : replayDriverDiagnosticCode(result.stderr);
    const stderr =
      exposeStderr && typeof result.stderr === "string"
        ? result.stderr.trim()
        : exposeStderr && Buffer.isBuffer(result.stderr)
          ? result.stderr.toString("utf8").trim()
          : "";
    const diagnostic = diagnosticCode ? `; diagnostic=${diagnosticCode}` : "";
    throw new Error(
      `${label} failed with exit ${result.status}${stderr ? `: ${stderr}` : ""}${diagnostic}`,
    );
  }
  return result;
}

function targetExists(target) {
  return lstatSync(target, { throwIfNoEntry: false }) !== undefined;
}

function captureWithDriver({
  anchor,
  dependencyManifest,
  driverIdentity,
  driverPath,
  evidenceDirectory,
  fixtureDigest,
  harnessManifest,
  outputPath,
  pilot,
  registry,
  registryPath,
  replace,
  runs,
  sourceDirectory,
}) {
  assertInsideRepository(sourceDirectory, "replay source directory");
  assertInsideRepository(evidenceDirectory, "replay evidence directory");
  const dependencyClaim = replayDependencyClaimFromManifest(dependencyManifest);
  const publicationTargets = [sourceDirectory, evidenceDirectory, outputPath];
  const existingTargetCount = publicationTargets.filter((target) => targetExists(target)).length;
  if (!pilot && existingTargetCount > 0 && !replace) {
    throw new Error(
      "replay envelopes, evidence, or baseline already exist; " +
        "pass --replace only when intentionally replacing an unpublished capture",
    );
  }
  if (!pilot && replace && existingTargetCount !== 0 && existingTargetCount !== 3) {
    throw new Error("RF-04 replacement requires a complete existing three-artifact generation");
  }
  if (!pilot && replace && existingTargetCount === 3) {
    const existingEnvelopeRecords = readReplayEnvelopeRecords(repoRoot, sourceDirectory);
    const existingEvidenceRecords = readReplayEvidenceRecords(repoRoot, evidenceDirectory);
    const existingDriver = replayDriverIdentityFromEnvelopeRecords(
      repoRoot,
      existingEnvelopeRecords,
    );
    const existingDependencyClaim =
      replayDependencyClaimFromEnvelopeRecords(existingEnvelopeRecords);
    assertReplayDependencyClaim(repoRoot, existingDependencyClaim);
    const existingHarness = createReplayHarnessManifest(repoRoot, existingDriver, {
      dependencyClaim: existingDependencyClaim,
    });
    const rebuilt = buildReplayBaseline({
      anchor,
      driverIdentity: existingDriver,
      envelopeRecords: existingEnvelopeRecords,
      evidenceRecords: existingEvidenceRecords,
      harnessManifest: existingHarness,
      registry,
      runs,
    });
    const frozenBytes = readFileSync(outputPath, "utf8");
    const frozen = JSON.parse(frozenBytes);
    if (frozenBytes !== replayBaselineBytes(frozen)) {
      throw new Error("existing RF-04 baseline is not canonical JSON");
    }
    assertFrozenReplayBaseline(frozen, rebuilt, "existing RF-04 replacement generation");
  }

  const cacheRoot = path.join(repoRoot, ".agentplane", "cache");
  mkdirSync(cacheRoot, { recursive: true });
  assertInsideRepository(cacheRoot, "RF-04 capture cache", "directory");
  const markerPath = path.join(cacheRoot, "rf04-replay-transaction.json");
  if (lstatSync(markerPath, { throwIfNoEntry: false })) {
    throw new Error("an unfinished RF-04 capture transaction requires manual recovery");
  }
  const captureRoot = mkdtempSync(path.join(cacheRoot, "rf04-replay-"));
  const stagingDirectory = path.join(captureRoot, "envelopes");
  const stagingEvidenceDirectory = path.join(captureRoot, "evidence");
  const isolatedRepository = path.join(captureRoot, "subject");
  const stagingBaselinePath = path.join(captureRoot, "baseline.json");
  mkdirSync(stagingDirectory, { recursive: true });
  mkdirSync(stagingEvidenceDirectory, { recursive: true });
  const sourceLogicalRoot = relativeRepoPath(repoRoot, sourceDirectory, "replay source directory");
  const evidenceLogicalRoot = relativeRepoPath(
    repoRoot,
    evidenceDirectory,
    "replay evidence directory",
  );
  const assertInputsUnchanged = () =>
    assertReplayCaptureInputsUnchanged({
      dependencyManifest,
      driverIdentity,
      driverPath,
      fixtureDigest,
      harnessManifest,
      registry,
      registryPath,
      repoRoot,
    });

  try {
    const pilotScenario = registry.scenarios.find((scenario) => scenario.id === "direct");
    if (pilot && !pilotScenario) throw new Error("RF-04 pilot scenario direct is absent");
    const selectedScenarios = pilot ? [pilotScenario] : registry.scenarios;
    const selectedRuns = pilot ? 1 : runs;
    for (const scenario of selectedScenarios) {
      for (let runIndex = 1; runIndex <= selectedRuns; runIndex += 1) {
        rmSync(isolatedRepository, { force: true, recursive: true });
        mkdirSync(isolatedRepository, { recursive: true });
        initializeAnchorCheckout(repoRoot, isolatedRepository, anchor);
        const registryOverlay = installFixtureRegistryOverlay(
          isolatedRepository,
          registry,
          fixtureDigest,
        );
        const scenarioDirectory = path.join(stagingDirectory, scenario.id);
        const evidenceScenarioDirectory = path.join(stagingEvidenceDirectory, scenario.id);
        mkdirSync(scenarioDirectory, { recursive: true });
        mkdirSync(evidenceScenarioDirectory, { recursive: true });
        const fileName = `run-${String(runIndex).padStart(2, "0")}.json`;
        const outputPath = path.join(scenarioDirectory, fileName);
        const evidenceOutputPath = path.join(evidenceScenarioDirectory, fileName);
        const runId = `${scenario.id}/run-${String(runIndex).padStart(2, "0")}`;
        const driverArgs = [
          driverPath,
          "--scenario",
          scenario.id,
          "--run-index",
          String(runIndex),
          "--output",
          outputPath,
          "--evidence-output",
          evidenceOutputPath,
        ];
        const contractEnvironment = {
          AGENTPLANE_RF04_REPLAY_ANCHOR: anchor,
          AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_EXECUTABLE_SHA256:
            dependencyClaim.capture_executable_sha256,
          AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_PLATFORM: stableJson(
            dependencyClaim.capture_platform,
          ),
          AGENTPLANE_RF04_REPLAY_DEPENDENCY_CAPTURE_RECEIPT_SHA256:
            dependencyClaim.capture_receipt_sha256,
          AGENTPLANE_RF04_REPLAY_DEPENDENCY_PORTABLE_SHA256: dependencyClaim.portable_sha256,
          AGENTPLANE_RF04_REPLAY_DRIVER_CONTRACT_VERSION: String(driverIdentity.contract_version),
          AGENTPLANE_RF04_REPLAY_DRIVER_PATH: driverIdentity.path,
          AGENTPLANE_RF04_REPLAY_DRIVER_SHA256: driverIdentity.sha256,
          AGENTPLANE_RF04_REPLAY_EVIDENCE_OUTPUT: evidenceOutputPath,
          AGENTPLANE_RF04_REPLAY_EVIDENCE_PATH: path.posix.join(
            evidenceLogicalRoot,
            scenario.id,
            fileName,
          ),
          AGENTPLANE_RF04_REPLAY_EXPECTED_ROLES: stableJson(expectedRoles(scenario)),
          AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256: fixtureDigest,
          AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_ORIGIN: "fixture_control_overlay_v1",
          AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_PATH: registryOverlay,
          AGENTPLANE_RF04_REPLAY_HARNESS_SHA256: harnessManifest.sha256,
          AGENTPLANE_RF04_REPLAY_OUTPUT: outputPath,
          AGENTPLANE_RF04_REPLAY_RUN_ID: runId,
        };
        runChecked(
          process.execPath,
          driverArgs,
          {
            cwd: isolatedRepository,
            env: buildReplayDriverEnvironment(process.env, contractEnvironment),
            exposeStderr: false,
            timeout: replayDriverTimeoutMs(scenario),
          },
          `${runId} replay driver`,
        );
        if (!existsSync(outputPath)) throw new Error(`${runId} driver did not write its envelope`);
        if (!existsSync(evidenceOutputPath)) {
          throw new Error(`${runId} driver did not write its evidence bundle`);
        }
        const envelopeBytes = readFileSync(outputPath, "utf8");
        const evidenceBytes = readFileSync(evidenceOutputPath, "utf8");
        const envelope = JSON.parse(envelopeBytes);
        const evidence = JSON.parse(evidenceBytes);
        if (envelopeBytes !== `${stableJson(envelope, 2)}\n`) {
          throw new Error(`${runId} driver envelope must be canonical stable JSON`);
        }
        if (evidenceBytes !== `${stableJson(evidence, 2)}\n`) {
          throw new Error(`${runId} driver evidence must be canonical stable JSON`);
        }
      }
    }

    const envelopeRecords = readReplayEnvelopeRecords(repoRoot, stagingDirectory, {
      logicalRoot: sourceLogicalRoot,
    });
    const evidenceRecords = readReplayEvidenceRecords(repoRoot, stagingEvidenceDirectory, {
      logicalRoot: evidenceLogicalRoot,
    });
    if (pilot) {
      if (envelopeRecords.length !== 1 || evidenceRecords.length !== 1) {
        throw new Error("RF-04 pilot must produce exactly one envelope and evidence bundle");
      }
      const evidenceByPath = new Map(evidenceRecords.map((record) => [record.path, record]));
      const envelope = envelopeRecords[0].value;
      assertReplayEnvelope(envelope, {
        allowTestControls: false,
        anchor,
        dependencyClaim,
        driverIdentity,
        evidenceByPath,
        fixtureRegistrySha256: fixtureDigest,
        harnessSha256: harnessManifest.sha256,
        runs,
        scenarioById: new Map(registry.scenarios.map((scenario) => [scenario.id, scenario])),
      });
      assertInputsUnchanged();
      return {
        driver_sha256: driverIdentity.sha256,
        episode_count: envelope.metrics.llm_episodes.value,
        pilot: true,
        profile: envelope.profile,
        provider_usage_by_role: Object.fromEntries(
          Object.entries(envelope.token_usage_by_role).map(([role, usage]) => [
            role,
            Object.fromEntries(Object.entries(usage).map(([field, cell]) => [field, cell.value])),
          ]),
        ),
        run_id: envelope.run_id,
      };
    }
    assertInputsUnchanged();
    const baseline = buildReplayBaseline({
      anchor,
      driverIdentity,
      envelopeRecords,
      evidenceRecords,
      harnessManifest,
      registry,
      runs,
    });
    writeFileSync(stagingBaselinePath, replayBaselineBytes(baseline), {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });
    installReplayArtifactTransaction(
      [
        { staging: stagingDirectory, target: sourceDirectory },
        { staging: stagingEvidenceDirectory, target: evidenceDirectory },
        { staging: stagingBaselinePath, target: outputPath },
      ],
      captureRoot,
      {
        markerPath,
        validateInstalled() {
          assertInputsUnchanged();
          const installedEnvelopeRecords = readReplayEnvelopeRecords(repoRoot, sourceDirectory);
          const installedEvidenceRecords = readReplayEvidenceRecords(repoRoot, evidenceDirectory);
          const installed = buildReplayBaseline({
            anchor,
            driverIdentity,
            envelopeRecords: installedEnvelopeRecords,
            evidenceRecords: installedEvidenceRecords,
            harnessManifest,
            registry,
            runs,
          });
          if (
            readFileSync(outputPath, "utf8") !== replayBaselineBytes(installed) ||
            replayBaselineBytes(installed) !== replayBaselineBytes(baseline)
          ) {
            throw new Error("installed RF-04 generation differs from staged canonical bytes");
          }
        },
      },
    );
    return baseline;
  } catch (error) {
    let inputFailure = null;
    try {
      assertInputsUnchanged();
    } catch (inputError) {
      inputFailure = inputError;
    }
    if (inputFailure) {
      throw new AggregateError(
        [error, inputFailure],
        "RF-04 capture failed and reviewed capture inputs also drifted",
      );
    }
    throw error;
  } finally {
    if (!lstatSync(markerPath, { throwIfNoEntry: false })) {
      rmSync(captureRoot, { force: true, recursive: true });
    }
  }
}

function writeAtomic(filePath, bytes) {
  assertInsideRepository(filePath, "replay baseline output", "file");
  mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  try {
    writeFileSync(temporaryPath, bytes, { encoding: "utf8", flag: "wx", mode: 0o600 });
    renameSync(temporaryPath, filePath);
  } finally {
    rmSync(temporaryPath, { force: true });
  }
}

export function captureAgentEfficiencyReplay(options) {
  if (options.anchor !== REPLAY_ANCHOR_COMMIT) {
    throw new Error(`--anchor must remain exact commit ${REPLAY_ANCHOR_COMMIT}`);
  }
  if (!Number.isInteger(options.runs) || options.runs < MINIMUM_REPLAY_RUNS) {
    throw new Error(`--runs must be an integer >= ${MINIMUM_REPLAY_RUNS}`);
  }
  assertGitCommitAvailable(repoRoot, options.anchor);
  const registry = readFixtureRegistry(options.registryPath, { historicalBaseline: true });
  const fixtureDigest = fixtureRegistrySha256(registry);
  let requestedDriverIdentity = null;
  const testTargetRoot =
    options.allowTestTargets === true
      ? path.join(repoRoot, ".agentplane/cache/rf04-test-targets")
      : null;
  assertReplayCaptureTargets({
    driverPath: options.driverPath,
    evidenceDirectory: options.evidenceDirectory,
    outputPath: options.outputPath,
    registryPath: options.registryPath,
    repoRoot,
    sourceDirectory: options.sourceDirectory,
    testTargetRoot,
  });

  if (options.driverPath) {
    requestedDriverIdentity = createReplayDriverIdentity(repoRoot, options.driverPath);
    const dependencyManifest = createReplayDependencyManifest(repoRoot);
    const dependencyClaim = replayDependencyClaimFromManifest(dependencyManifest);
    const captureHarnessManifest = createReplayHarnessManifest(repoRoot, requestedDriverIdentity, {
      dependencyClaim,
    });
    assertReplayCaptureTargets({
      driverPath: options.driverPath,
      evidenceDirectory: options.evidenceDirectory,
      harnessPaths: captureHarnessManifest.files.map((entry) => path.join(repoRoot, entry.path)),
      outputPath: options.outputPath,
      registryPath: options.registryPath,
      repoRoot,
      sourceDirectory: options.sourceDirectory,
      testTargetRoot,
    });
    const captureResult = captureWithDriver({
      anchor: options.anchor,
      dependencyManifest,
      driverIdentity: requestedDriverIdentity,
      driverPath: options.driverPath,
      evidenceDirectory: options.evidenceDirectory,
      fixtureDigest,
      harnessManifest: captureHarnessManifest,
      outputPath: options.outputPath,
      pilot: options.pilot,
      registry,
      registryPath: options.registryPath,
      replace: options.replace,
      runs: options.runs,
      sourceDirectory: options.sourceDirectory,
    });
    return captureResult;
  } else if (options.pilot) {
    throw new Error("--pilot requires an explicit reviewed --driver");
  }

  const envelopeRecords = readReplayEnvelopeRecords(repoRoot, options.sourceDirectory);
  const driverIdentity = replayDriverIdentityFromEnvelopeRecords(repoRoot, envelopeRecords);
  if (
    requestedDriverIdentity &&
    stableJson(requestedDriverIdentity) !== stableJson(driverIdentity)
  ) {
    throw new Error("captured driver identity differs from the explicitly selected driver bytes");
  }
  const dependencyClaim = replayDependencyClaimFromEnvelopeRecords(envelopeRecords);
  assertReplayDependencyClaim(repoRoot, dependencyClaim);
  const harnessManifest = createReplayHarnessManifest(repoRoot, driverIdentity, {
    dependencyClaim,
  });
  const baseline = buildReplayBaseline({
    anchor: options.anchor,
    driverIdentity,
    envelopeRecords,
    evidenceRecords: readReplayEvidenceRecords(repoRoot, options.evidenceDirectory),
    harnessManifest,
    registry,
    runs: options.runs,
  });
  writeAtomic(options.outputPath, replayBaselineBytes(baseline));
  return baseline;
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    if (options.help) {
      stdout.write(`${helpText()}\n`);
      return;
    }
    const baseline = captureAgentEfficiencyReplay(options);
    if (baseline?.pilot === true) {
      stdout.write(`${stableJson(baseline, 2)}\n`);
      return;
    }
    stdout.write(
      `RF-04 replay baseline captured (${baseline.coverage.replay_runs.actual} runs; ` +
        `${baseline.coverage.resolved_outcome_cells.actual}/70 outcomes; ` +
        `${baseline.coverage.provider_token_cells.actual}/27 provider token cells; ` +
        `${baseline.coverage.resolved_scalar_cells.actual}/170 scalar cells; ` +
        `structural_sha256=${baseline.structural_projection_sha256})\n`,
    );
  },
});

runScriptMain(main);
