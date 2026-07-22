import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  buildAgentEfficiencyMeasurement,
  readFixtureRegistry,
  stableJson,
} from "../lib/agent-efficiency-baseline.mjs";
import {
  defineScript,
  isDirectRun,
  parseScriptArgs,
  runScriptMain,
} from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "measure-agent-efficiency.mjs";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_FIXTURES_PATH = path.join(
  repoRoot,
  "scripts",
  "bench",
  "agent-efficiency-fixtures.json",
);

function helpText() {
  return [
    `Usage: node scripts/bench/${SCRIPT_NAME} [options]`,
    "",
    "Build the deterministic pre-v0.7 agent-efficiency measurement from RF-04 fixtures.",
    "Artifact-backed fields are read from registry paths; the checker verifies their Git anchor.",
    "Expected traces and controls are never converted into observed cost; timing is diagnostic-only.",
    "",
    "Options:",
    "  --fixtures <path>  Fixture registry. Default: scripts/bench/agent-efficiency-fixtures.json",
    "  --out <path>       Write stable JSON to a file instead of stdout.",
    "  --help             Show this help text.",
  ].join("\n");
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["fixtures", "out"],
    booleanFlags: ["help"],
    aliases: { h: "help" },
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  return {
    fixturesPath: path.resolve(flags.fixtures ?? DEFAULT_FIXTURES_PATH),
    outputPath: flags.out ? path.resolve(flags.out) : null,
    help: flags.help === true,
  };
}

export function measureAgentEfficiency(options = {}) {
  const fixturesPath = path.resolve(options.fixturesPath ?? DEFAULT_FIXTURES_PATH);
  const registry = readFixtureRegistry(fixturesPath);
  return buildAgentEfficiencyMeasurement({
    repoRoot,
    registry,
    registryPath: fixturesPath,
  });
}

export async function runAgentEfficiencyMeasure(argv = process.argv.slice(2), streams = {}) {
  const stdout = streams.stdout ?? process.stdout;
  const options = parseArgs(argv);
  if (options.help) {
    stdout.write(`${helpText()}\n`);
    return;
  }

  const measurement = measureAgentEfficiency({ fixturesPath: options.fixturesPath });
  const output = `${stableJson(measurement, 2)}\n`;
  if (options.outputPath) {
    mkdirSync(path.dirname(options.outputPath), { recursive: true });
    writeFileSync(options.outputPath, output, "utf8");
    stdout.write(`agent-efficiency measurement written to ${options.outputPath}\n`);
    return;
  }
  stdout.write(output);
}

const main = defineScript({
  name: SCRIPT_NAME,
  async run({ argv, stdout, stderr }) {
    await runAgentEfficiencyMeasure(argv, { stdout, stderr });
  },
});

if (isDirectRun(import.meta.url)) {
  runScriptMain(main);
}
