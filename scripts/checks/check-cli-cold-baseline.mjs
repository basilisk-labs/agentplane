import {
  parseBaselineArgs,
  readJson,
  runMeasurement,
  compareMeasurementToBaseline,
} from "../lib/cli-baseline-check.mjs";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { defineCheck, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-cli-cold-baseline.mjs";
const MODE = "cli_cold_path_v1";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_BASELINE_PATH = path.join(repoRoot, "scripts", "baselines", "cli-cold-path.json");
const MEASURE_SCRIPT_PATH = path.join(repoRoot, "scripts", "measure-cli-cold-path.mjs");

const settings = {
  repoRoot,
  baselinePath: DEFAULT_BASELINE_PATH,
  measureScript: MEASURE_SCRIPT_PATH,
  cold: true,
  mode: MODE,
  schemaVersion: 2,
};
const parseArgs = (argv) => parseBaselineArgs(argv, settings);

function defaultCliPath(options) {
  return options.cliPath ?? path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js");
}

async function createLocalBasicFixture(options) {
  const configModulePath = pathToFileURL(
    path.join(repoRoot, "packages", "core", "dist", "config", "index.js"),
  ).href;
  const { defaultConfig, saveConfig } = await import(configModulePath);
  const root = mkdtempSync(path.join(os.tmpdir(), "agentplane-cold-fixture-"));
  execFileSync("git", ["init"], { cwd: root, stdio: "ignore" });
  mkdirSync(path.join(root, ".agentplane"), { recursive: true });
  await saveConfig(path.join(root, ".agentplane"), defaultConfig());
  execFileSync(
    process.execPath,
    [
      defaultCliPath(options),
      "task",
      "new",
      "--title",
      "Cold path benchmark task",
      "--description",
      "Seed one ready task so task next benchmarks a bounded local path.",
      "--owner",
      "CODER",
      "--tag",
      "docs",
      "--root",
      root,
    ],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        AGENTPLANE_NO_UPDATE_CHECK: "1",
      },
      stdio: "ignore",
      maxBuffer: 10 * 1024 * 1024,
    },
  );
  return root;
}

function formatAttemptFailures(attempt, attempts, failures) {
  return [
    `CLI cold-start baseline attempt ${attempt}/${attempts} failed; retrying to classify transient noise.`,
    ...failures.map((failure) => `- ${failure}`),
  ].join("\n");
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    const baseline = readJson(options.baselinePath, "baseline");
    const attempts = options.measurementPath ? 1 : options.attempts;
    let lastFailures = [];
    let lastSummaries = [];
    let fixtureRoot = null;

    if (options.fixture) {
      if (options.fixture !== "local-basic") {
        throw new Error(`unsupported --fixture value: ${options.fixture}`);
      }
      if (options.measurementPath) {
        throw new Error("--fixture cannot be combined with --measurement");
      }
      fixtureRoot = await createLocalBasicFixture(options);
      options.root = fixtureRoot;
    }

    try {
      for (let attempt = 1; attempt <= attempts; attempt++) {
        const measurement = options.measurementPath
          ? readJson(options.measurementPath, "measurement")
          : runMeasurement(options, settings);
        const { failures, summaries } = compareMeasurementToBaseline(
          measurement,
          baseline,
          settings,
        );
        if (failures.length === 0) {
          const retrySuffix = attempt > 1 ? ` after retry ${attempt}/${attempts}` : "";
          const fixtureSuffix = options.fixture ? ` using fixture ${options.fixture}` : "";
          stdout.write(
            `CLI cold-start baseline OK${retrySuffix}${fixtureSuffix} (${summaries.join("; ")})\n`,
          );
          return;
        }
        lastFailures = failures;
        lastSummaries = summaries;
        if (attempt < attempts) {
          process.stderr.write(`${formatAttemptFailures(attempt, attempts, failures)}\n`);
        }
      }
    } finally {
      if (fixtureRoot) {
        rmSync(fixtureRoot, { recursive: true, force: true });
      }
    }

    throw new Error(
      [
        `CLI cold-start baseline guard failed after ${attempts} attempt${attempts === 1 ? "" : "s"}.`,
        ...lastFailures.map((failure) => `- ${failure}`),
        ...(lastSummaries.length > 0 ? ["", `Last measurement: ${lastSummaries.join("; ")}`] : []),
        "",
        "Run bun run bench:cli:cold to inspect current timings. Only raise baseline ceilings after reviewed performance drift.",
      ].join("\n"),
    );
  },
});

runScriptMain(main);
