import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { collectHotspotReport } from "./hotspot-report.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const DEFAULT_BASELINE_PATH = path.join(repoRoot, "scripts", "oversized-test-baseline.json");
const DEFAULT_THRESHOLD_LINES = 1000;
const BASELINE_SCHEMA_VERSION = 1;

function printHelp() {
  process.stdout.write(
    [
      "Usage: node scripts/check-oversized-test-baseline.mjs [options]",
      "",
      "Options:",
      "  --root <path>             Repository root to scan. Defaults to this checkout.",
      "  --baseline <path>         Baseline JSON path. Defaults to scripts/oversized-test-baseline.json.",
      `  --threshold-lines <n>     Oversized test threshold. Default: ${DEFAULT_THRESHOLD_LINES}.`,
      "  --help                    Show this help text.",
      "",
    ].join("\n"),
  );
}

function parsePositiveInt(flag, raw) {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Invalid value for ${flag}: ${raw} (expected integer >= 1)`);
  }
  return parsed;
}

export function parseArgs(argv) {
  let root = repoRoot;
  let baselinePath = DEFAULT_BASELINE_PATH;
  let thresholdLines = DEFAULT_THRESHOLD_LINES;

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    switch (arg) {
      case "--help":
      case "-h": {
        return { help: true };
      }
      case "--root": {
        const next = argv[index + 1];
        if (!next) throw new Error("Missing value after --root");
        root = path.resolve(next);
        if (baselinePath === DEFAULT_BASELINE_PATH) {
          baselinePath = path.join(root, "scripts", "oversized-test-baseline.json");
        }
        index++;
        break;
      }
      case "--baseline": {
        const next = argv[index + 1];
        if (!next) throw new Error("Missing value after --baseline");
        baselinePath = path.isAbsolute(next) ? path.resolve(next) : path.resolve(root, next);
        index++;
        break;
      }
      case "--threshold-lines": {
        const next = argv[index + 1];
        if (!next) throw new Error("Missing value after --threshold-lines");
        thresholdLines = parsePositiveInt("--threshold-lines", next);
        index++;
        break;
      }
      default: {
        throw new Error(`Unknown argument: ${arg}`);
      }
    }
  }

  return { help: false, root, baselinePath, thresholdLines };
}

function readBaseline(baselinePath) {
  if (!existsSync(baselinePath)) {
    throw new Error(`Oversized test baseline is missing: ${baselinePath}`);
  }
  const raw = JSON.parse(readFileSync(baselinePath, "utf8"));
  if (raw.schema_version !== BASELINE_SCHEMA_VERSION) {
    throw new Error(
      `Unsupported oversized test baseline schema_version: ${String(raw.schema_version)}`,
    );
  }
  if (!Array.isArray(raw.entries)) {
    throw new TypeError("Invalid oversized test baseline: entries must be an array");
  }
  return {
    thresholdLines: Number(raw.threshold_lines),
    entries: raw.entries.map((entry) => ({
      file: String(entry.file),
      lines: Number(entry.lines),
    })),
  };
}

function collectOversizedTests(root, thresholdLines) {
  const report = collectHotspotReport({
    root,
    runtimeDir: path.join(root, "packages", "agentplane", "src"),
    testDir: path.join(root, "packages"),
    warningLines: 400,
    oversizedLines: 600,
    testWarningLines: thresholdLines,
    oversizedTestLines: 1_000_000,
    allowedOversized: [],
    allowedOversizedTests: [],
  });

  return report.metrics.oversized_test_warnings.modules
    .map((entry) => ({ file: entry.file, lines: entry.lines }))
    .toSorted((left, right) => left.file.localeCompare(right.file));
}

export function validateOversizedTestBaseline({ baseline, current, thresholdLines }) {
  const errors = [];
  const baselineByFile = new Map();
  for (const entry of baseline.entries) {
    if (!Number.isInteger(entry.lines) || entry.lines <= thresholdLines) {
      errors.push(
        `Invalid baseline entry: ${entry.file} has non-oversized line count ${entry.lines}`,
      );
      continue;
    }
    if (baselineByFile.has(entry.file)) {
      errors.push(`Duplicate baseline entry: ${entry.file}`);
      continue;
    }
    baselineByFile.set(entry.file, entry.lines);
  }

  const currentByFile = new Map(current.map((entry) => [entry.file, entry.lines]));
  for (const entry of current) {
    const baselineLines = baselineByFile.get(entry.file);
    if (baselineLines === undefined) {
      errors.push(`New oversized test without baseline: ${entry.file} (${entry.lines} lines)`);
    } else if (entry.lines > baselineLines) {
      errors.push(
        `Oversized test grew beyond baseline: ${entry.file} (${entry.lines} > ${baselineLines} lines)`,
      );
    }
  }

  for (const entry of baseline.entries) {
    if (!currentByFile.has(entry.file)) {
      errors.push(`Stale oversized test baseline entry: ${entry.file}`);
    }
  }

  return errors;
}

export async function main(argv = process.argv.slice(2)) {
  const parsed = parseArgs(argv);
  if (parsed.help) {
    printHelp();
    return 0;
  }

  const baseline = readBaseline(parsed.baselinePath);
  if (baseline.thresholdLines !== parsed.thresholdLines) {
    throw new Error(
      `Baseline threshold mismatch: baseline=${baseline.thresholdLines}, check=${parsed.thresholdLines}`,
    );
  }

  const current = collectOversizedTests(parsed.root, parsed.thresholdLines);
  const errors = validateOversizedTestBaseline({
    baseline,
    current,
    thresholdLines: parsed.thresholdLines,
  });
  if (errors.length > 0) {
    process.stderr.write(
      [
        `Oversized test baseline failed: ${errors.length} issue(s).`,
        ...errors.map((error) => `- ${error}`),
        "",
      ].join("\n"),
    );
    return 1;
  }

  process.stdout.write(
    `Oversized test baseline OK (${current.length} entries, threshold>${parsed.thresholdLines}).\n`,
  );
  return 0;
}

const invokedAsScript =
  typeof process.argv[1] === "string" &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (invokedAsScript) {
  void (async () => {
    try {
      process.exitCode = await main();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      process.stderr.write(`${message}\n`);
      process.exitCode = 1;
    }
  })();
}
