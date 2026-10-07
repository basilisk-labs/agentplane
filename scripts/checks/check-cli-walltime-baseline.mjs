import {
  parseBaselineArgs,
  readJson,
  runMeasurement,
  compareMeasurementToBaseline,
} from "../lib/cli-baseline-check.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineCheck, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-cli-walltime-baseline.mjs";
const MODE = "cli_walltime_v1";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_BASELINE_PATH = path.join(
  repoRoot,
  "scripts",
  "baselines",
  "cli-walltime-baseline.json",
);
const MEASURE_SCRIPT_PATH = path.join(repoRoot, "scripts", "measure-cli-walltime.mjs");

const settings = {
  repoRoot,
  baselinePath: DEFAULT_BASELINE_PATH,
  measureScript: MEASURE_SCRIPT_PATH,
  cold: false,
  mode: MODE,
  schemaVersion: 1,
};
const parseArgs = (argv) => parseBaselineArgs(argv, settings);

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    const baseline = readJson(options.baselinePath, "baseline");
    const attempts = options.measurementPath ? 1 : options.attempts;
    let lastFailures = [];
    let lastSummaries = [];

    for (let attempt = 1; attempt <= attempts; attempt++) {
      const measurement = options.measurementPath
        ? readJson(options.measurementPath, "measurement")
        : runMeasurement(options, settings);
      const { failures, summaries } = compareMeasurementToBaseline(measurement, baseline, settings);
      if (failures.length === 0) {
        const retrySuffix = attempt > 1 ? ` after retry ${attempt}/${attempts}` : "";
        stdout.write(`CLI wall-time baseline OK${retrySuffix} (${summaries.join("; ")})\n`);
        return;
      }

      lastFailures = failures;
      lastSummaries = summaries;
    }

    throw new Error(
      [
        `CLI wall-time baseline guard failed after ${attempts} attempt${attempts === 1 ? "" : "s"}.`,
        ...lastFailures.map((failure) => `- ${failure}`),
        ...(lastSummaries.length > 0 ? ["", `Last measurement: ${lastSummaries.join("; ")}`] : []),
      ].join("\n"),
    );
  },
});

runScriptMain(main);
