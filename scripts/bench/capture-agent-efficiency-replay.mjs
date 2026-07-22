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
  assertReplayEnvelope,
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
    "  --driver-env <names>  Comma-separated environment fields explicitly allowed for the driver.",
    "  --pilot              Run only direct/run-01, validate it in memory, and persist nothing.",
    "  --replace            Replace envelopes and evidence only after a complete staged capture validates.",
    "  --help               Show this help text.",
    "",
    "Driver contract:",
    "  argv: --scenario <id> --run-index <n> --output <file> --evidence-output <file>",
    "  env: only safe process fields, explicit --driver-env fields, and AGENTPLANE_RF04_REPLAY_* contract fields.",
    "  output: one canonical sanitized envelope plus one canonical content-addressed evidence bundle;",
    "          provider usage must include explicit reasoning_output_tokens mapped to reasoning_tokens.",
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
    booleanFlags: ["replace", "pilot", "help"],
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
    pilot: flags.pilot === true,
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
  const { exposeStderr = true, ...spawnOptions } = options;
  const encoding = Object.hasOwn(spawnOptions, "encoding") ? spawnOptions.encoding : "utf8";
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
    const stderr =
      exposeStderr && typeof result.stderr === "string"
        ? result.stderr.trim()
        : exposeStderr && Buffer.isBuffer(result.stderr)
          ? result.stderr.toString("utf8").trim()
          : "";
    throw new Error(`${label} failed with exit ${result.status}${stderr ? `: ${stderr}` : ""}`);
  }
  return result;
}

export function buildReplayGitEnvironment(source = process.env) {
  return {
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_NOSYSTEM: "1",
    GIT_TERMINAL_PROMPT: "0",
    LANG: source.LANG || "C.UTF-8",
    LC_ALL: source.LC_ALL || "C.UTF-8",
    PATH: "/usr/bin:/bin",
    TZ: "UTC",
  };
}

export function replayAnchorCloneArgs(sourceRoot) {
  return [
    "clone",
    "--quiet",
    "--shared",
    "--no-checkout",
    "--no-tags",
    path.resolve(sourceRoot),
    ".",
  ];
}

function initializeAnchorCheckout(repositoryPath, anchor) {
  const environment = buildReplayGitEnvironment();
  runChecked(
    "/usr/bin/git",
    replayAnchorCloneArgs(repoRoot),
    { cwd: repositoryPath, env: environment, exposeStderr: false },
    "replay anchor local clone",
  );
  runChecked(
    "/usr/bin/git",
    ["config", "core.hooksPath", "/dev/null"],
    { cwd: repositoryPath, env: environment },
    "replay anchor disable hooks",
  );
  runChecked(
    "/usr/bin/git",
    ["config", "gc.auto", "0"],
    { cwd: repositoryPath, env: environment },
    "replay anchor disable gc",
  );
  runChecked(
    "/usr/bin/git",
    ["checkout", "--quiet", "--detach", anchor],
    { cwd: repositoryPath, env: environment },
    "replay anchor checkout",
  );
  const actualHead = runChecked(
    "/usr/bin/git",
    ["rev-parse", "HEAD"],
    { cwd: repositoryPath, env: environment },
    "replay checkout head",
  ).stdout.trim();
  if (actualHead !== anchor) throw new Error("replay checkout does not point at the exact anchor");
  const actualTree = runChecked(
    "/usr/bin/git",
    ["rev-parse", "HEAD^{tree}"],
    { cwd: repositoryPath, env: environment },
    "replay fixture tree",
  ).stdout.trim();
  const expectedTree = runChecked(
    "/usr/bin/git",
    ["rev-parse", `${anchor}^{tree}`],
    { cwd: repoRoot, env: environment },
    "replay anchor tree",
  ).stdout.trim();
  if (actualTree !== expectedTree) {
    throw new Error("replay checkout tree differs from the exact anchor tree");
  }
  runChecked(
    "/usr/bin/git",
    ["remote", "remove", "origin"],
    { cwd: repositoryPath, env: environment },
    "replay checkout remove remote",
  );
  const status = runChecked(
    "/usr/bin/git",
    ["status", "--porcelain", "--untracked-files=no"],
    { cwd: repositoryPath, env: environment },
    "replay checkout status",
  ).stdout;
  if (status !== "") {
    throw new Error("replay checkout is not clean before harness setup");
  }
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
  pilot,
  registry,
  replace,
  runs,
  sourceDirectory,
}) {
  assertInsideRepository(sourceDirectory, "replay source directory");
  assertInsideRepository(evidenceDirectory, "replay evidence directory");
  if (!pilot && (existsSync(sourceDirectory) || existsSync(evidenceDirectory)) && !replace) {
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

  try {
    const pilotScenario = registry.scenarios.find((scenario) => scenario.id === "direct");
    if (pilot && !pilotScenario) throw new Error("RF-04 pilot scenario direct is absent");
    const selectedScenarios = pilot ? [pilotScenario] : registry.scenarios;
    const selectedRuns = pilot ? 1 : runs;
    for (const scenario of selectedScenarios) {
      for (let runIndex = 1; runIndex <= selectedRuns; runIndex += 1) {
        rmSync(isolatedRepository, { force: true, recursive: true });
        mkdirSync(isolatedRepository, { recursive: true });
        initializeAnchorCheckout(isolatedRepository, anchor);
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
    if (pilot) {
      if (envelopeRecords.length !== 1 || evidenceRecords.length !== 1) {
        throw new Error("RF-04 pilot must produce exactly one envelope and evidence bundle");
      }
      const evidenceByPath = new Map(evidenceRecords.map((record) => [record.path, record]));
      const envelope = envelopeRecords[0].value;
      assertReplayEnvelope(envelope, {
        allowTestControls: false,
        anchor,
        driverIdentity,
        evidenceByPath,
        fixtureRegistrySha256: fixtureDigest,
        harnessSha256: harnessManifest.sha256,
        runs,
        scenarioById: new Map(registry.scenarios.map((scenario) => [scenario.id, scenario])),
      });
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
    return null;
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
    const captureResult = captureWithDriver({
      anchor: options.anchor,
      driverEnvNames: options.driverEnvNames,
      driverIdentity: requestedDriverIdentity,
      driverPath: options.driverPath,
      evidenceDirectory: options.evidenceDirectory,
      fixtureDigest,
      harnessManifest: captureHarnessManifest,
      pilot: options.pilot,
      registry,
      replace: options.replace,
      runs: options.runs,
      sourceDirectory: options.sourceDirectory,
    });
    if (options.pilot) return captureResult;
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
    if (baseline?.pilot === true) {
      stdout.write(`${stableJson(baseline, 2)}\n`);
      return;
    }
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
