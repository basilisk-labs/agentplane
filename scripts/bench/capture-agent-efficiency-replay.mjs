import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
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
  buildReplayBaseline,
  buildReplayDriverEnvironment,
  createReplayDriverIdentity,
  createReplayHarnessManifest,
  fixtureRegistrySha256,
  readReplayEvidenceRecords,
  readReplayEnvelopeRecords,
  replayDriverIdentityFromEnvelopeRecords,
  replayBaselineBytes,
} from "../lib/agent-efficiency-replay.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "capture-agent-efficiency-replay.mjs";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_REGISTRY_PATH = path.join(
  repoRoot,
  "scripts",
  "bench",
  "agent-efficiency-fixtures.json",
);
const DEFAULT_SOURCE_DIRECTORY = path.join(
  repoRoot,
  "scripts",
  "bench",
  "agent-efficiency-replay-envelopes",
);
const DEFAULT_EVIDENCE_DIRECTORY = path.join(
  repoRoot,
  "scripts",
  "bench",
  "agent-efficiency-replay-evidence",
);
const DEFAULT_OUTPUT_PATH = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "agent-efficiency-pre-v0.7-replay.json",
);

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
    "  --driver-env <names>  Comma-separated environment fields explicitly allowed for the driver.",
    "  --replace            Replace envelopes and evidence only after a complete staged capture validates.",
    "  --help               Show this help text.",
    "",
    "Driver contract:",
    "  argv: --scenario <id> --run-index <n> --output <file> --evidence-output <file>",
    "  env: only safe process fields, explicit --driver-env fields, and AGENTPLANE_RF04_REPLAY_* contract fields.",
    "  output: one canonical sanitized envelope plus one canonical content-addressed evidence bundle;",
    "          provider usage must include explicit reasoning_tokens.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: [
      "anchor",
      "runs",
      "registry",
      "source-dir",
      "evidence-dir",
      "output",
      "driver",
      "driver-env",
    ],
    booleanFlags: ["replace", "help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  const runs = Number.parseInt(flags.runs ?? String(MINIMUM_REPLAY_RUNS), 10);
  return {
    anchor: flags.anchor ?? REPLAY_ANCHOR_COMMIT,
    driverEnvNames: flags["driver-env"]
      ? [
          ...new Set(
            flags["driver-env"]
              .split(",")
              .map((name) => name.trim())
              .filter(Boolean),
          ),
        ]
      : [],
    driverPath: flags.driver ? path.resolve(flags.driver) : null,
    evidenceDirectory: path.resolve(flags["evidence-dir"] ?? DEFAULT_EVIDENCE_DIRECTORY),
    help: flags.help === true,
    outputPath: path.resolve(flags.output ?? DEFAULT_OUTPUT_PATH),
    registryPath: path.resolve(flags.registry ?? DEFAULT_REGISTRY_PATH),
    replace: flags.replace === true,
    runs,
    sourceDirectory: path.resolve(flags["source-dir"] ?? DEFAULT_SOURCE_DIRECTORY),
  };
}

function assertCommit(anchor) {
  let type;
  try {
    type = execFileSync("git", ["cat-file", "-t", anchor], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error(`replay anchor is not available in Git: ${anchor}`);
  }
  if (type !== "commit") throw new Error(`replay anchor must be a commit, got ${type}: ${anchor}`);
}

function assertInsideRepository(filePath, label) {
  relativeRepoPath(repoRoot, filePath, label);
  return filePath;
}

function expectedRoles(scenario) {
  return [...new Set(scenario.expected_episode_trace)];
}

function runChecked(command, args, options, label) {
  const encoding = Object.hasOwn(options, "encoding") ? options.encoding : "utf8";
  const result = spawnSync(command, args, {
    ...options,
    encoding,
    maxBuffer: options.maxBuffer ?? 128 * 1024 * 1024,
  });
  if (result.error) throw new Error(`${label} failed to start: ${result.error.message}`);
  if (result.status !== 0) {
    const stderr =
      typeof result.stderr === "string"
        ? result.stderr.trim()
        : Buffer.isBuffer(result.stderr)
          ? result.stderr.toString("utf8").trim()
          : "";
    throw new Error(`${label} failed with exit ${result.status}${stderr ? `: ${stderr}` : ""}`);
  }
  return result;
}

const SENSITIVE_ENV_NAME = /(?:AUTH|CREDENTIAL|KEY|PASS|SECRET|TOKEN)/i;

function assertRequestedEnvironmentNotPersisted(values, environment, names, label) {
  const serialized = stableJson(values);
  for (const name of names) {
    const secret = environment[name];
    if (
      SENSITIVE_ENV_NAME.test(name) &&
      typeof secret === "string" &&
      secret.length >= 8 &&
      serialized.includes(secret)
    ) {
      throw new Error(`${label} persisted the value of explicitly allowed sensitive field ${name}`);
    }
  }
}

function installStagedDirectories(pairs, captureRoot) {
  const backups = [];
  const installed = [];
  try {
    for (const [index, pair] of pairs.entries()) {
      mkdirSync(path.dirname(pair.target), { recursive: true });
      if (existsSync(pair.target)) {
        const backup = path.join(captureRoot, `previous-${index}`);
        renameSync(pair.target, backup);
        backups.push({ backup, target: pair.target });
      }
    }
    for (const pair of pairs) {
      renameSync(pair.staging, pair.target);
      installed.push(pair.target);
    }
  } catch (error) {
    for (const target of installed.toReversed()) {
      rmSync(target, { force: true, recursive: true });
    }
    for (const { backup, target } of backups.toReversed()) {
      if (existsSync(backup)) renameSync(backup, target);
    }
    throw error;
  }
}

function captureWithDriver({
  anchor,
  driverEnvNames,
  driverIdentity,
  driverPath,
  evidenceDirectory,
  fixtureDigest,
  harnessManifest,
  registry,
  replace,
  runs,
  sourceDirectory,
}) {
  assertInsideRepository(sourceDirectory, "replay source directory");
  assertInsideRepository(evidenceDirectory, "replay evidence directory");
  if ((existsSync(sourceDirectory) || existsSync(evidenceDirectory)) && !replace) {
    throw new Error(
      "replay envelopes or evidence already exist; " +
        "pass --replace only when intentionally replacing an unpublished capture",
    );
  }

  const cacheRoot = path.join(repoRoot, ".agentplane", "cache");
  mkdirSync(cacheRoot, { recursive: true });
  const captureRoot = path.join(cacheRoot, `rf04-replay-${process.pid}-${Date.now()}`);
  const stagingDirectory = path.join(captureRoot, "envelopes");
  const stagingEvidenceDirectory = path.join(captureRoot, "evidence");
  const isolatedRepository = path.join(captureRoot, "subject");
  mkdirSync(stagingDirectory, { recursive: true });
  mkdirSync(stagingEvidenceDirectory, { recursive: true });
  const sourceLogicalRoot = relativeRepoPath(repoRoot, sourceDirectory, "replay source directory");
  const evidenceLogicalRoot = relativeRepoPath(
    repoRoot,
    evidenceDirectory,
    "replay evidence directory",
  );

  const archive = runChecked(
    "git",
    ["archive", "--format=tar", anchor],
    { cwd: repoRoot, encoding: null },
    "git archive for replay subject",
  ).stdout;

  try {
    for (const scenario of registry.scenarios) {
      for (let runIndex = 1; runIndex <= runs; runIndex += 1) {
        rmSync(isolatedRepository, { force: true, recursive: true });
        mkdirSync(isolatedRepository, { recursive: true });
        runChecked(
          "tar",
          ["-xf", "-", "-C", isolatedRepository],
          { cwd: repoRoot, encoding: null, input: archive },
          `${scenario.id} run ${runIndex} archive extraction`,
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
          AGENTPLANE_RF04_REPLAY_HARNESS_SHA256: harnessManifest.sha256,
          AGENTPLANE_RF04_REPLAY_OUTPUT: outputPath,
          AGENTPLANE_RF04_REPLAY_RUN_ID: runId,
        };
        runChecked(
          process.execPath,
          driverArgs,
          {
            cwd: isolatedRepository,
            env: buildReplayDriverEnvironment(
              process.env,
              driverEnvNames ?? [],
              contractEnvironment,
            ),
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
        assertRequestedEnvironmentNotPersisted(
          [envelope, evidence],
          process.env,
          driverEnvNames ?? [],
          runId,
        );
      }
    }

    const envelopeRecords = readReplayEnvelopeRecords(repoRoot, stagingDirectory, {
      logicalRoot: sourceLogicalRoot,
    });
    const evidenceRecords = readReplayEvidenceRecords(repoRoot, stagingEvidenceDirectory, {
      logicalRoot: evidenceLogicalRoot,
    });
    buildReplayBaseline({
      anchor,
      driverIdentity,
      envelopeRecords,
      evidenceRecords,
      harnessManifest,
      registry,
      runs,
    });
    installStagedDirectories(
      [
        { staging: stagingDirectory, target: sourceDirectory },
        { staging: stagingEvidenceDirectory, target: evidenceDirectory },
      ],
      captureRoot,
    );
  } finally {
    rmSync(captureRoot, { force: true, recursive: true });
  }
}

function writeAtomic(filePath, bytes) {
  assertInsideRepository(filePath, "replay baseline output");
  mkdirSync(path.dirname(filePath), { recursive: true });
  const temporaryPath = `${filePath}.tmp-${process.pid}`;
  writeFileSync(temporaryPath, bytes, "utf8");
  renameSync(temporaryPath, filePath);
}

export function captureAgentEfficiencyReplay(options) {
  if (options.anchor !== REPLAY_ANCHOR_COMMIT) {
    throw new Error(`--anchor must remain exact commit ${REPLAY_ANCHOR_COMMIT}`);
  }
  if (!Number.isInteger(options.runs) || options.runs < MINIMUM_REPLAY_RUNS) {
    throw new Error(`--runs must be an integer >= ${MINIMUM_REPLAY_RUNS}`);
  }
  assertCommit(options.anchor);
  assertInsideRepository(options.registryPath, "RF-04 fixture registry");
  assertInsideRepository(options.sourceDirectory, "replay source directory");
  assertInsideRepository(options.evidenceDirectory, "replay evidence directory");
  assertInsideRepository(options.outputPath, "replay baseline output");
  if (path.resolve(options.sourceDirectory) === path.resolve(options.evidenceDirectory)) {
    throw new Error("replay envelope and evidence directories must be distinct");
  }
  const registry = readFixtureRegistry(options.registryPath, { historicalBaseline: true });
  const fixtureDigest = fixtureRegistrySha256(registry);
  let requestedDriverIdentity = null;

  if (options.driverPath) {
    requestedDriverIdentity = createReplayDriverIdentity(repoRoot, options.driverPath);
    const captureHarnessManifest = createReplayHarnessManifest(repoRoot, requestedDriverIdentity);
    captureWithDriver({
      anchor: options.anchor,
      driverEnvNames: options.driverEnvNames,
      driverIdentity: requestedDriverIdentity,
      driverPath: options.driverPath,
      evidenceDirectory: options.evidenceDirectory,
      fixtureDigest,
      harnessManifest: captureHarnessManifest,
      registry,
      replace: options.replace,
      runs: options.runs,
      sourceDirectory: options.sourceDirectory,
    });
  }

  const envelopeRecords = readReplayEnvelopeRecords(repoRoot, options.sourceDirectory);
  const driverIdentity = replayDriverIdentityFromEnvelopeRecords(repoRoot, envelopeRecords);
  if (
    requestedDriverIdentity &&
    stableJson(requestedDriverIdentity) !== stableJson(driverIdentity)
  ) {
    throw new Error("captured driver identity differs from the explicitly selected driver bytes");
  }
  const harnessManifest = createReplayHarnessManifest(repoRoot, driverIdentity);
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
    stdout.write(
      `RF-04 replay baseline captured (${baseline.coverage.replay_runs.actual} runs; ` +
        `${baseline.coverage.observed_outcome_cells.actual}/70 outcomes; ` +
        `${baseline.coverage.provider_token_cells.actual}/27 provider token cells; ` +
        `${baseline.coverage.resolved_scalar_cells.actual}/170 scalar cells; ` +
        `structural_sha256=${baseline.structural_projection_sha256})\n`,
    );
  },
});

runScriptMain(main);
