import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-clone-baseline.mjs";
const DEFAULT_BASELINE_PATH = "scripts/baselines/clone-baseline.json";
const DEFAULT_REPORT_DIR = ".agentplane/tmp/clone-report";
const DEFAULT_MIN_LINES = 8;
const DEFAULT_MIN_TOKENS = 80;
const DEFAULT_MODE = "mild";
const DEFAULT_PATHS = [
  "packages/agentplane/src",
  "packages/core/src",
  "packages/recipes/src",
  "packages/testkit/src",
  "scripts",
];
const DEFAULT_IGNORES = [
  "**/*.test.ts",
  "**/*.test.tsx",
  "**/*.spec.ts",
  "**/*.spec.tsx",
  "**/__snapshots__/**",
  "**/node_modules/**",
  "**/dist/**",
  "**/*.generated.ts",
  "scripts/baselines/**",
];

function parsePositiveInt(flag, raw) {
  const parsed = Number.parseInt(String(raw), 10);
  if (!Number.isInteger(parsed) || parsed < 1) {
    throw new Error(`Invalid value for --${flag}: ${raw} (expected integer >= 1)`);
  }
  return parsed;
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["baseline", "report-dir", "min-lines", "min-tokens"],
    booleanFlags: ["report", "update-baseline", "keep-report"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }
  if (flags.report === true && flags["update-baseline"] === true) {
    throw new Error("--report and --update-baseline are mutually exclusive");
  }

  return {
    baselinePath: flags.baseline ?? DEFAULT_BASELINE_PATH,
    reportDir: flags["report-dir"] ?? DEFAULT_REPORT_DIR,
    minLines:
      flags["min-lines"] === undefined
        ? DEFAULT_MIN_LINES
        : parsePositiveInt("min-lines", flags["min-lines"]),
    minTokens:
      flags["min-tokens"] === undefined
        ? DEFAULT_MIN_TOKENS
        : parsePositiveInt("min-tokens", flags["min-tokens"]),
    reportOnly: flags.report === true,
    updateBaseline: flags["update-baseline"] === true,
    keepReport: flags["keep-report"] === true || flags.report === true,
  };
}

function localJscpdBin() {
  return path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "jscpd.cmd" : "jscpd",
  );
}

function runJscpd(opts) {
  const reportDir = path.resolve(process.cwd(), opts.reportDir);
  rmSync(reportDir, { recursive: true, force: true });
  mkdirSync(reportDir, { recursive: true });

  const localBin = localJscpdBin();
  const command = existsSync(localBin) ? localBin : "bunx";
  const args = existsSync(localBin) ? [] : ["jscpd"];

  args.push(
    ...DEFAULT_PATHS,
    "--pattern",
    "**/*.{ts,tsx,js,mjs}",
    "--reporters",
    "json",
    "--output",
    reportDir,
    "--min-lines",
    String(opts.minLines),
    "--min-tokens",
    String(opts.minTokens),
    "--mode",
    DEFAULT_MODE,
    "--format",
    "typescript,javascript",
    "--noSymlinks",
    "--silent",
    "--exitCode",
    "0",
    "--ignore",
    DEFAULT_IGNORES.join(","),
  );

  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    encoding: "utf8",
    env: process.env,
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(
      [
        `jscpd exited with code ${result.status ?? "unknown"}`,
        result.stderr.trim(),
        result.stdout.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  const reportPath = path.join(reportDir, "jscpd-report.json");
  return {
    reportPath,
    report: JSON.parse(readFileSync(reportPath, "utf8")),
  };
}

function normalizeMetrics(report) {
  const total = report?.statistics?.total;
  if (!total || typeof total !== "object") {
    throw new TypeError("jscpd JSON report has no statistics.total object");
  }
  return {
    sources: Number(total.sources ?? 0),
    lines: Number(total.lines ?? 0),
    tokens: Number(total.tokens ?? 0),
    clones: Number(total.clones ?? 0),
    duplicatedLines: Number(total.duplicatedLines ?? 0),
    duplicatedTokens: Number(total.duplicatedTokens ?? 0),
    percentage: Number(total.percentage ?? 0),
    percentageTokens: Number(total.percentageTokens ?? 0),
  };
}

function duplicateSummaryKey(duplicate) {
  const first = duplicate.firstFile ?? {};
  const second = duplicate.secondFile ?? {};
  return [
    String(first.path ?? first.name ?? ""),
    Number(first.start ?? 0),
    String(second.path ?? second.name ?? ""),
    Number(second.start ?? 0),
    Number(duplicate.lines ?? 0),
  ].join("\0");
}

function normalizeDuplicateSummaries(report, limit = 50) {
  const duplicates = Array.isArray(report?.duplicates) ? report.duplicates : [];
  return duplicates
    .map((duplicate) => ({
      lines: Number(duplicate.lines ?? 0),
      tokens: Number(duplicate.tokens ?? 0),
      firstFile: {
        path: String(duplicate.firstFile?.name ?? ""),
        start: Number(duplicate.firstFile?.start ?? 0),
        end: Number(duplicate.firstFile?.end ?? 0),
      },
      secondFile: {
        path: String(duplicate.secondFile?.name ?? ""),
        start: Number(duplicate.secondFile?.start ?? 0),
        end: Number(duplicate.secondFile?.end ?? 0),
      },
    }))
    .filter((entry) => entry.firstFile.path && entry.secondFile.path)
    .toSorted(
      (left, right) =>
        right.lines - left.lines ||
        duplicateSummaryKey(left).localeCompare(duplicateSummaryKey(right)),
    )
    .slice(0, limit);
}

function buildBaseline(report, opts) {
  return {
    schema_version: 1,
    generated_by: SCRIPT_NAME,
    tool: "jscpd",
    config: {
      paths: DEFAULT_PATHS,
      pattern: "**/*.{ts,tsx,js,mjs}",
      ignores: DEFAULT_IGNORES,
      min_lines: opts.minLines,
      min_tokens: opts.minTokens,
      mode: DEFAULT_MODE,
      formats: ["typescript", "javascript"],
      compare_contract:
        "current metrics must not exceed baseline clones, duplicatedLines, or duplicatedTokens",
    },
    metrics: normalizeMetrics(report),
    top_duplicates: normalizeDuplicateSummaries(report),
  };
}

function readBaseline(baselinePath) {
  const raw = JSON.parse(readFileSync(baselinePath, "utf8"));
  if (!raw || raw.schema_version !== 1 || raw.tool !== "jscpd" || !raw.metrics) {
    throw new TypeError(`Invalid clone baseline schema: ${baselinePath}`);
  }
  return raw;
}

function writeBaseline(baselinePath, baseline) {
  mkdirSync(path.dirname(baselinePath), { recursive: true });
  writeFileSync(baselinePath, `${JSON.stringify(baseline, null, 2)}\n`, "utf8");
}

function formatMetrics(metrics) {
  return [
    `sources=${metrics.sources}`,
    `clones=${metrics.clones}`,
    `duplicatedLines=${metrics.duplicatedLines}`,
    `duplicatedTokens=${metrics.duplicatedTokens}`,
    `percentage=${metrics.percentage}`,
  ].join(", ");
}

function compareMetrics(current, baseline) {
  return [
    ["clones", current.clones, baseline.clones],
    ["duplicatedLines", current.duplicatedLines, baseline.duplicatedLines],
    ["duplicatedTokens", current.duplicatedTokens, baseline.duplicatedTokens],
  ].filter(([, currentValue, baselineValue]) => currentValue > baselineValue);
}

function printTopDuplicates(duplicates) {
  if (duplicates.length === 0) return;
  process.stdout.write("Top clone clusters:\n");
  for (const entry of duplicates.slice(0, 10)) {
    process.stdout.write(
      `- ${entry.lines} lines: ${entry.firstFile.path}:${entry.firstFile.start} <-> ` +
        `${entry.secondFile.path}:${entry.secondFile.start}\n`,
    );
  }
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options }) {
    const baselinePath = path.resolve(process.cwd(), options.baselinePath);
    const { reportPath, report } = runJscpd(options);
    const currentBaseline = buildBaseline(report, options);
    const currentMetrics = currentBaseline.metrics;

    if (options.updateBaseline) {
      writeBaseline(baselinePath, currentBaseline);
      process.stdout.write(`Clone baseline updated: ${options.baselinePath}\n`);
      process.stdout.write(`Clone metrics: ${formatMetrics(currentMetrics)}\n`);
      return;
    }

    if (options.reportOnly) {
      process.stdout.write(`Clone report: ${path.relative(process.cwd(), reportPath)}\n`);
      process.stdout.write(`Clone metrics: ${formatMetrics(currentMetrics)}\n`);
      printTopDuplicates(currentBaseline.top_duplicates);
      return;
    }

    const baseline = readBaseline(baselinePath);
    const failures = compareMetrics(currentMetrics, baseline.metrics);
    if (failures.length > 0) {
      throw new Error(
        [
          "Clone baseline guard failed.",
          `Current: ${formatMetrics(currentMetrics)}`,
          `Baseline: ${formatMetrics(baseline.metrics)}`,
          "Worsened metrics:",
          ...failures.map(
            ([name, currentValue, baselineValue]) =>
              `- ${name}: ${currentValue} > ${baselineValue}`,
          ),
          `Report: ${path.relative(process.cwd(), reportPath)}`,
          "Update intentionally with: bun run clone:baseline:update",
        ].join("\n"),
      );
    }

    if (!options.keepReport) {
      rmSync(path.resolve(process.cwd(), options.reportDir), { recursive: true, force: true });
    }
    process.stdout.write(
      `Clone baseline OK (${formatMetrics(currentMetrics)}; baseline ${formatMetrics(
        baseline.metrics,
      )})\n`,
    );
  },
});

runScriptMain(main);
