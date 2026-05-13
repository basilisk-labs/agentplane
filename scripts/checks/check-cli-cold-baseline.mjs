import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defaultConfig, saveConfig } from "../../packages/core/dist/config/index.js";

import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-cli-cold-baseline.mjs";
const MODE = "cli_cold_path_v1";
const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const DEFAULT_BASELINE_PATH = path.join(repoRoot, "scripts", "baselines", "cli-cold-path.json");
const MEASURE_SCRIPT_PATH = path.join(repoRoot, "scripts", "measure-cli-cold-path.mjs");

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
    valueFlags: [
      "baseline",
      "measurement",
      "root",
      "cli",
      "runs",
      "warmups",
      "attempts",
      "timeout-ms",
      "fixture",
    ],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }

  return {
    baselinePath: path.resolve(flags.baseline ?? DEFAULT_BASELINE_PATH),
    measurementPath: flags.measurement ? path.resolve(flags.measurement) : null,
    root: flags.root ? path.resolve(flags.root) : repoRoot,
    cliPath: flags.cli ? path.resolve(flags.cli) : null,
    runs: flags.runs === undefined ? 3 : parsePositiveInt(flags.runs, "runs"),
    warmups: flags.warmups === undefined ? 0 : parseNonNegativeInt(flags.warmups, "warmups"),
    attempts: flags.attempts === undefined ? 1 : parsePositiveInt(flags.attempts, "attempts"),
    timeoutMs:
      flags["timeout-ms"] === undefined ? 0 : parsePositiveInt(flags["timeout-ms"], "timeout-ms"),
    fixture: flags.fixture ? String(flags.fixture) : null,
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
  const args = [MEASURE_SCRIPT_PATH, "--root", options.root, "--runs", String(options.runs)];
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

function defaultCliPath(options) {
  return options.cliPath ?? path.join(repoRoot, "packages", "agentplane", "bin", "agentplane.js");
}

async function createLocalBasicFixture(options) {
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

function normalizeCommandList(payload, label) {
  if (!payload || payload.mode !== MODE || !Array.isArray(payload.commands)) {
    throw new Error(`${label} must be a ${MODE} payload with a commands array`);
  }
  return new Map(payload.commands.map((command) => [String(command.id ?? ""), command]));
}

function assertBaselineShape(baseline) {
  if (!baseline || baseline.schema_version !== 2 || baseline.mode !== MODE) {
    throw new Error(`baseline must use schema_version=2 and mode=${MODE}`);
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
    const maxMedian = Number(expected.max_median_ms);
    const p95 = Number(actual.p95_ms);
    if (!Number.isFinite(median) || !Number.isFinite(maxMedian)) {
      failures.push(`${id}: median_ms/max_median_ms must be numeric`);
      continue;
    }

    const expectedExit = Number(expected.expected_exit_code ?? 0);
    const actualExit = Number(actual.exit_code);
    if (actual.timed_out === true) {
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
          : runMeasurement(options);
        const { failures, summaries } = compareMeasurementToBaseline(measurement, baseline);
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
