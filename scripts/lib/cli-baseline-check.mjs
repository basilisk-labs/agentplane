import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { parseScriptArgs } from "./script-runtime.mjs";

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

export function parseBaselineArgs(argv, { repoRoot, baselinePath, cold }) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: [
      "baseline",
      "measurement",
      "root",
      "cli",
      "runs",
      "warmups",
      "attempts",
      ...(cold ? ["timeout-ms", "fixture"] : ["suite"]),
    ],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }

  return {
    baselinePath: path.resolve(flags.baseline ?? baselinePath),
    measurementPath: flags.measurement ? path.resolve(flags.measurement) : null,
    root: flags.root ? path.resolve(flags.root) : repoRoot,
    cliPath: flags.cli ? path.resolve(flags.cli) : null,
    runs: flags.runs === undefined ? 3 : parsePositiveInt(flags.runs, "runs"),
    warmups: flags.warmups === undefined ? 0 : parseNonNegativeInt(flags.warmups, "warmups"),
    attempts: flags.attempts === undefined ? 1 : parsePositiveInt(flags.attempts, "attempts"),
    ...(cold
      ? {
          timeoutMs:
            flags["timeout-ms"] === undefined
              ? 0
              : parsePositiveInt(flags["timeout-ms"], "timeout-ms"),
          fixture: flags.fixture ? String(flags.fixture) : null,
        }
      : { suite: flags.suite ?? "cli_walltime_baseline" }),
  };
}

export function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, "utf8"));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`failed to read ${label} JSON at ${filePath}: ${message}`);
  }
}

export function runMeasurement(options, { repoRoot, measureScript, cold }) {
  const args = [
    measureScript,
    ...(cold ? [] : ["--suite", options.suite]),
    "--root",
    options.root,
    "--runs",
    String(options.runs),
  ];
  if (options.warmups > 0) args.push("--warmups", String(options.warmups));
  if (options.timeoutMs > 0) args.push("--timeout-ms", String(options.timeoutMs));
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

function normalizeCommandList(payload, label, mode) {
  if (!payload || payload.mode !== mode || !Array.isArray(payload.commands)) {
    throw new Error(`${label} must be a ${mode} payload with a commands array`);
  }
  return new Map(payload.commands.map((command) => [String(command.id ?? ""), command]));
}

function assertBaselineShape(baseline, mode, schemaVersion) {
  if (!baseline || baseline.schema_version !== schemaVersion || baseline.mode !== mode) {
    throw new Error(`baseline must use schema_version=${schemaVersion} and mode=${mode}`);
  }
  if (baseline.metric !== "median_ms") {
    throw new Error("baseline metric must be median_ms");
  }
}

export function compareMeasurementToBaseline(measurement, baseline, { mode, schemaVersion, cold }) {
  assertBaselineShape(baseline, mode, schemaVersion);
  const measuredById = normalizeCommandList(measurement, "measurement", mode);
  const baselineById = normalizeCommandList(baseline, "baseline", mode);
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
    const maxMedian = Number(expected.max_median_ms);
    const p95 = Number(actual.p95_ms);
    if (!Number.isFinite(median) || !Number.isFinite(maxMedian)) {
      failures.push(`${id}: median_ms/max_median_ms must be numeric`);
      continue;
    }

    const expectedExit = Number(expected.expected_exit_code ?? 0);
    const actualExit = Number(actual.exit_code);
    if (cold && actual.timed_out === true) {
      const timeoutMs = Number(actual.timeout_ms);
      const timeoutSummary =
        Number.isFinite(timeoutMs) && timeoutMs > 0 ? ` after ${timeoutMs}ms` : "";
      failures.push(`${id}: timed out${timeoutSummary}`);
    }
    if (actualExit !== expectedExit) {
      failures.push(`${id}: exit_code=${actualExit}, expected=${expectedExit}`);
    }
    if (median > maxMedian) {
      failures.push(`${id}: median_ms=${median} exceeds max_median_ms=${maxMedian}`);
    }
    const maxP95 = expected.max_p95_ms === undefined ? null : Number(expected.max_p95_ms);
    if (!cold && maxP95 !== null && Number.isFinite(maxP95)) {
      if (!Number.isFinite(p95))
        failures.push(`${id}: p95_ms/max_p95_ms mismatch: p95 is not numeric`);
      else if (p95 > maxP95) failures.push(`${id}: p95_ms=${p95} exceeds max_p95_ms=${maxP95}`);
    }
    const p95Summary = Number.isFinite(p95) ? `, p95=${p95}ms` : "";
    summaries.push(`${id} median=${median}ms (threshold=${maxMedian}ms${p95Summary})`);
  }

  return { failures, summaries };
}
