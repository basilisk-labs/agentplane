import { execFileSync } from "node:child_process";
import { lstatSync, readFileSync } from "node:fs";
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
  buildReplayBaseline,
  createReplayHarnessManifest,
  readReplayEnvelopeRecords,
  replayBaselineBytes,
} from "../lib/agent-efficiency-replay.mjs";
import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-agent-efficiency-replay.mjs";
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
const DEFAULT_BASELINE_PATH = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "agent-efficiency-pre-v0.7-replay.json",
);

function helpText() {
  return [
    `Usage: node scripts/checks/${SCRIPT_NAME} [options]`,
    "",
    "Offline rebuild and provenance check for the additive RF-04 replay baseline.",
    "No provider call is made. Missing reasoning-token telemetry is a hard failure.",
    "",
    "Options:",
    "  --registry <path>    RF-04 fixture registry.",
    "  --source-dir <path>  Canonical replay envelopes.",
    "  --baseline <path>    Frozen replay baseline.",
    `  --runs <count>       Runs per scenario. Minimum/default: ${MINIMUM_REPLAY_RUNS}`,
    "  --help               Show this help text.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["registry", "source-dir", "baseline", "runs"],
    booleanFlags: ["help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  return {
    baselinePath: path.resolve(flags.baseline ?? DEFAULT_BASELINE_PATH),
    help: flags.help === true,
    registryPath: path.resolve(flags.registry ?? DEFAULT_REGISTRY_PATH),
    runs: Number.parseInt(flags.runs ?? String(MINIMUM_REPLAY_RUNS), 10),
    sourceDirectory: path.resolve(flags["source-dir"] ?? DEFAULT_SOURCE_DIRECTORY),
  };
}

function assertInsideRepository(filePath, label) {
  relativeRepoPath(repoRoot, filePath, label);
  return filePath;
}

function assertAnchorAvailable() {
  let type;
  try {
    type = execFileSync("git", ["cat-file", "-t", REPLAY_ANCHOR_COMMIT], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch {
    throw new Error(`replay anchor is unavailable in Git: ${REPLAY_ANCHOR_COMMIT}`);
  }
  if (type !== "commit") {
    throw new Error(`replay anchor must resolve to a commit, got ${type}`);
  }
}

function readFrozenBaseline(filePath) {
  const stats = lstatSync(filePath, { throwIfNoEntry: false });
  if (!stats?.isFile()) {
    throw new Error(
      "RF-04 replay baseline is not captured. Run the capture command with an explicitly " +
        "authorized provider driver that reports input, output, and reasoning tokens; estimates are forbidden.",
    );
  }
  const bytes = readFileSync(filePath, "utf8");
  const value = JSON.parse(bytes);
  if (bytes !== replayBaselineBytes(value)) {
    throw new Error(
      "RF-04 replay baseline must use canonical stable JSON with one trailing newline",
    );
  }
  return value;
}

export function checkAgentEfficiencyReplay(options) {
  if (!Number.isInteger(options.runs) || options.runs < MINIMUM_REPLAY_RUNS) {
    throw new Error(`--runs must be an integer >= ${MINIMUM_REPLAY_RUNS}`);
  }
  assertAnchorAvailable();
  assertInsideRepository(options.registryPath, "RF-04 fixture registry");
  assertInsideRepository(options.sourceDirectory, "replay source directory");
  assertInsideRepository(options.baselinePath, "replay baseline");
  const registry = readFixtureRegistry(options.registryPath, { historicalBaseline: true });
  const harnessManifest = createReplayHarnessManifest(repoRoot);
  const records = readReplayEnvelopeRecords(repoRoot, options.sourceDirectory);
  const first = buildReplayBaseline({
    envelopeRecords: records,
    harnessManifest,
    registry,
    runs: options.runs,
  });
  const second = buildReplayBaseline({
    envelopeRecords: records,
    harnessManifest,
    registry,
    runs: options.runs,
  });
  if (stableJson(first) !== stableJson(second)) {
    throw new Error("RF-04 replay rebuild is not byte-deterministic across identical envelopes");
  }
  if (first.structural_projection_sha256 !== second.structural_projection_sha256) {
    throw new Error("RF-04 structural projection digest is not deterministic");
  }
  const frozen = readFrozenBaseline(options.baselinePath);
  assertFrozenReplayBaseline(frozen, first, "frozen RF-04 replay baseline");
  return first;
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    if (options.help) {
      stdout.write(`${helpText()}\n`);
      return;
    }
    const baseline = checkAgentEfficiencyReplay(options);
    stdout.write(
      `RF-04 replay baseline OK (${baseline.coverage.replay_runs.actual} runs; ` +
        `${baseline.coverage.observed_outcome_cells.actual}/70 outcomes; ` +
        `${baseline.coverage.provider_token_cells.actual}/27 provider token cells; ` +
        `${baseline.coverage.resolved_scalar_cells.actual}/170 scalar cells; ` +
        `structural_sha256=${baseline.structural_projection_sha256}; diagnostics_sha256=${baseline.diagnostics_sha256})\n`,
    );
  },
});

runScriptMain(main);
