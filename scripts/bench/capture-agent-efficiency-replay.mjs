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
  createReplayHarnessManifest,
  fixtureRegistrySha256,
  readReplayEnvelopeRecords,
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
    "Build the additive RF-04 replay baseline from canonical provider-backed envelopes.",
    "The command never estimates tokens and refuses an incomplete or non-authoritative capture.",
    "",
    "Options:",
    `  --anchor <sha>       Exact subject commit. Required value: ${REPLAY_ANCHOR_COMMIT}`,
    `  --runs <count>       Runs per scenario. Minimum/default: ${MINIMUM_REPLAY_RUNS}`,
    "  --registry <path>    RF-04 fixture registry.",
    "  --source-dir <path>  Persisted canonical envelopes directory.",
    "  --output <path>      Replay baseline output path.",
    "  --driver <path>      Explicitly authorized local driver. It runs once per isolated scenario/run.",
    "  --replace            Replace source envelopes only after a complete staged capture validates.",
    "  --help               Show this help text.",
    "",
    "Driver contract:",
    "  argv: --scenario <id> --run-index <n> --output <absolute staging file>",
    "  env: AGENTPLANE_RF04_REPLAY_{ANCHOR,FIXTURE_REGISTRY_SHA256,HARNESS_SHA256,EXPECTED_ROLES,RUN_ID,OUTPUT}",
    "  output: one sanitized replay envelope; provider usage must include explicit reasoning_tokens.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["anchor", "runs", "registry", "source-dir", "output", "driver"],
    booleanFlags: ["replace", "help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  const runs = Number.parseInt(flags.runs ?? String(MINIMUM_REPLAY_RUNS), 10);
  return {
    anchor: flags.anchor ?? REPLAY_ANCHOR_COMMIT,
    driverPath: flags.driver ? path.resolve(flags.driver) : null,
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

function captureWithDriver({
  anchor,
  driverPath,
  fixtureDigest,
  harnessManifest,
  registry,
  replace,
  runs,
  sourceDirectory,
}) {
  assertInsideRepository(driverPath, "replay driver");
  if (!existsSync(driverPath)) throw new Error(`replay driver does not exist: ${driverPath}`);
  assertInsideRepository(sourceDirectory, "replay source directory");
  if (existsSync(sourceDirectory) && !replace) {
    throw new Error(
      `replay source already exists: ${relativeRepoPath(repoRoot, sourceDirectory, "source")}; ` +
        "pass --replace only when intentionally replacing an unpublished capture",
    );
  }

  const cacheRoot = path.join(repoRoot, ".agentplane", "cache");
  mkdirSync(cacheRoot, { recursive: true });
  const captureRoot = path.join(cacheRoot, `rf04-replay-${process.pid}-${Date.now()}`);
  const stagingDirectory = path.join(captureRoot, "envelopes");
  const isolatedRepository = path.join(captureRoot, "subject");
  mkdirSync(stagingDirectory, { recursive: true });

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
        mkdirSync(scenarioDirectory, { recursive: true });
        const outputPath = path.join(
          scenarioDirectory,
          `run-${String(runIndex).padStart(2, "0")}.json`,
        );
        const runId = `${scenario.id}/run-${String(runIndex).padStart(2, "0")}`;
        const driverArgs = [
          driverPath,
          "--scenario",
          scenario.id,
          "--run-index",
          String(runIndex),
          "--output",
          outputPath,
        ];
        runChecked(
          process.execPath,
          driverArgs,
          {
            cwd: isolatedRepository,
            env: {
              ...process.env,
              AGENTPLANE_RF04_REPLAY_ANCHOR: anchor,
              AGENTPLANE_RF04_REPLAY_EXPECTED_ROLES: stableJson(expectedRoles(scenario)),
              AGENTPLANE_RF04_REPLAY_FIXTURE_REGISTRY_SHA256: fixtureDigest,
              AGENTPLANE_RF04_REPLAY_HARNESS_SHA256: harnessManifest.sha256,
              AGENTPLANE_RF04_REPLAY_OUTPUT: outputPath,
              AGENTPLANE_RF04_REPLAY_RUN_ID: runId,
            },
          },
          `${runId} replay driver`,
        );
        if (!existsSync(outputPath)) throw new Error(`${runId} driver did not write its envelope`);
        const parsed = JSON.parse(readFileSync(outputPath, "utf8"));
        writeFileSync(outputPath, `${stableJson(parsed, 2)}\n`, "utf8");
      }
    }

    buildReplayBaseline({
      anchor,
      envelopeRecords: readReplayEnvelopeRecords(repoRoot, stagingDirectory),
      harnessManifest,
      registry,
      runs,
    });
    mkdirSync(path.dirname(sourceDirectory), { recursive: true });
    if (existsSync(sourceDirectory)) rmSync(sourceDirectory, { force: true, recursive: true });
    renameSync(stagingDirectory, sourceDirectory);
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
  assertInsideRepository(options.outputPath, "replay baseline output");
  const registry = readFixtureRegistry(options.registryPath, { historicalBaseline: true });
  const fixtureDigest = fixtureRegistrySha256(registry);
  const harnessManifest = createReplayHarnessManifest(repoRoot);

  if (options.driverPath) {
    captureWithDriver({
      anchor: options.anchor,
      driverPath: options.driverPath,
      fixtureDigest,
      harnessManifest,
      registry,
      replace: options.replace,
      runs: options.runs,
      sourceDirectory: options.sourceDirectory,
    });
  }

  const baseline = buildReplayBaseline({
    anchor: options.anchor,
    envelopeRecords: readReplayEnvelopeRecords(repoRoot, options.sourceDirectory),
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
