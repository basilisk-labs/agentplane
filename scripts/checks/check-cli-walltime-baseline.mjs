import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

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

function parsePositiveInt(raw, flag) {
  const value = Number.parseInt(raw, 10);
  if (!Number.isSafeInteger(value) || value < 1 || String(value) !== raw) {
    throw new Error(`--${flag} must be an integer >= 1`);
  }
  return value;
}

function parseNonNegativeInt(raw, flag) {
  const value = Number.parseInt(raw, 10);
  if (!Number.isSafeInteger(value) || value < 0 || String(value) !== raw) {
    throw new Error(`--${flag} must be an integer >= 0`);
  }
  return value;
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["baseline", "measurement", "root", "cli", "suite", "runs", "warmups", "attempts"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }

  return {
    baselinePath: path.resolve(flags.baseline ?? DEFAULT_BASELINE_PATH),
    measurementPath: flags.measurement ? path.resolve(flags.measurement) : null,
    root: flags.root ? path.resolve(flags.root) : repoRoot,
    cliPath: flags.cli ? path.resolve(flags.cli) : null,
    suite: flags.suite ?? "cli_walltime_baseline",
    runs: flags.runs === undefined ? 3 : parsePositiveInt(flags.runs, "runs"),
    warmups: flags.warmups === undefined ? 0 : parseNonNegativeInt(flags.warmups, "warmups"),
    attempts: flags.attempts === undefined ? 1 : parsePositiveInt(flags.attempts, "attempts"),
  };
}

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`failed to read ${label} JSON at ${filePath}: ${message}`);
  }
}

function runMeasurement(options) {
  const args = [
    MEASURE_SCRIPT_PATH,
    "--suite",
    options.suite,
    "--root",
    options.root,
    "--runs",
    String(options.runs),
  ];
  if (options.warmups > 0) args.push("--warmups", String(options.warmups));
  if (options.cliPath) args.push("--cli", options.cliPath);

  try {
    const stdout = execFileSync(process.execPath, args, {
      cwd: repoRoot,
      encoding: "utf8",
      env: {
        ...process.env,
        AGENTPLANE_NO_UPDATE_CHECK: "1",
      },
      maxBuffer: 10 * 1024 * 1024,
    });
    return JSON.parse(stdout);
  } catch (error) {
    const stdout =
      error && typeof error === "object" && typeof error.stdout === "string" ? error.stdout : "";
    if (stdout.trim().length > 0) {
      try {
        return JSON.parse(stdout);
      } catch {
        // fall through to the original error when the failed run did not emit a valid payload.
      }
    }
    throw error;
  }
}

function normalizeCommandList(payload, label) {
  if (!payload || payload.mode !== MODE || !Array.isArray(payload.commands)) {
    throw new Error(`${label} must be a ${MODE} payload with a commands array`);
  }
  return new Map(payload.commands.map((command) => [String(command.id ?? ""), command]));
}

function assertBaselineShape(baseline) {
  if (!baseline || baseline.schema_version !== 1 || baseline.mode !== MODE) {
    throw new Error(`baseline must use schema_version=1 and mode=${MODE}`);
  }
  if (baseline.metric !== "median_ms") {
    throw new Error("baseline metric must be median_ms");
  }
}

function compareMeasurementToBaseline(measurement, baseline) {
  assertBaselineShape(baseline);
  const measuredById = normalizeCommandList(measurement, "measurement");
  const baselineById = normalizeCommandList(baseline, "baseline");
  const failures = [];
  const summaries = [];

  for (const [id, expected] of baselineById) {
    if (!id) continue;
    const actual = measuredById.get(id);
    if (!actual) {
      failures.push(`${id}: missing from measurement`);
      continue;
    }

    const median = Number(actual.median_ms);
    const p95 = Number(actual.p95_ms);
    const maxMedian = Number(expected.max_median_ms);
    const maxP95 = expected.max_p95_ms === undefined ? null : Number(expected.max_p95_ms);
    const expectedExit = Number(expected.expected_exit_code ?? 0);
    const actualExit = Number(actual.exit_code);

    if (!Number.isFinite(median) || !Number.isFinite(maxMedian)) {
      failures.push(`${id}: median_ms/max_median_ms must be numeric`);
      continue;
    }

    if (actualExit !== expectedExit) {
      failures.push(`${id}: exit_code=${actualExit}, expected=${expectedExit}`);
    }
    if (median > maxMedian) {
      failures.push(`${id}: median_ms=${median} exceeds max_median_ms=${maxMedian}`);
    }
    if (maxP95 !== null && Number.isFinite(maxP95)) {
      if (!Number.isFinite(p95)) {
        failures.push(`${id}: p95_ms/max_p95_ms mismatch: p95 is not numeric`);
      } else if (p95 > maxP95) {
        failures.push(`${id}: p95_ms=${p95} exceeds max_p95_ms=${maxP95}`);
      }
    }

    const p95Summary = Number.isFinite(p95) ? `, p95=${p95}ms` : "";
    summaries.push(`${id} median=${median}ms (threshold=${maxMedian}ms${p95Summary})`);
  }

  return { failures, summaries };
}

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
        : runMeasurement(options);
      const { failures, summaries } = compareMeasurementToBaseline(measurement, baseline);
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
