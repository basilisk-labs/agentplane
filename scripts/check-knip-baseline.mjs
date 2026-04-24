import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

import { defineCheck, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const SCRIPT_NAME = "check-knip-baseline.mjs";
const DEFAULT_CONFIG_PATH = "knip.json";

const BASELINE_LIMITS = {
  files: 5,
  exports: 239,
  types: 333,
  enumMembers: 0,
  namespaceMembers: 0,
  total: 577,
};

function parseNonNegativeInteger(value, flagName) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || String(parsed) !== value) {
    throw new Error(`--${flagName} must be a non-negative integer`);
  }
  return parsed;
}

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: [
      "config",
      "max-files",
      "max-exports",
      "max-types",
      "max-enum-members",
      "max-namespace-members",
      "max-total",
    ],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }

  return {
    configPath: flags.config ?? DEFAULT_CONFIG_PATH,
    limits: {
      files:
        flags["max-files"] === undefined
          ? BASELINE_LIMITS.files
          : parseNonNegativeInteger(flags["max-files"], "max-files"),
      exports:
        flags["max-exports"] === undefined
          ? BASELINE_LIMITS.exports
          : parseNonNegativeInteger(flags["max-exports"], "max-exports"),
      types:
        flags["max-types"] === undefined
          ? BASELINE_LIMITS.types
          : parseNonNegativeInteger(flags["max-types"], "max-types"),
      enumMembers:
        flags["max-enum-members"] === undefined
          ? BASELINE_LIMITS.enumMembers
          : parseNonNegativeInteger(flags["max-enum-members"], "max-enum-members"),
      namespaceMembers:
        flags["max-namespace-members"] === undefined
          ? BASELINE_LIMITS.namespaceMembers
          : parseNonNegativeInteger(flags["max-namespace-members"], "max-namespace-members"),
      total:
        flags["max-total"] === undefined
          ? BASELINE_LIMITS.total
          : parseNonNegativeInteger(flags["max-total"], "max-total"),
    },
  };
}

function runKnipJson(configPath) {
  const localKnipBin = path.join(
    process.cwd(),
    "node_modules",
    ".bin",
    process.platform === "win32" ? "knip.cmd" : "knip",
  );
  const command = existsSync(localKnipBin) ? localKnipBin : "bunx";
  const args = existsSync(localKnipBin)
    ? ["--config", configPath, "--no-exit-code", "--reporter", "json"]
    : ["knip", "--config", configPath, "--no-exit-code", "--reporter", "json"];

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
        `knip exited with code ${result.status ?? "unknown"}`,
        result.stderr.trim(),
        result.stdout.trim(),
      ]
        .filter(Boolean)
        .join("\n"),
    );
  }

  return JSON.parse(result.stdout);
}

function countIssueItems(report) {
  const counts = {
    files: 0,
    exports: 0,
    types: 0,
    enumMembers: 0,
    namespaceMembers: 0,
    total: 0,
  };

  if (!report || !Array.isArray(report.issues)) {
    throw new TypeError("knip JSON reporter returned an unexpected payload");
  }

  for (const issue of report.issues) {
    for (const key of ["files", "exports", "types", "enumMembers", "namespaceMembers"]) {
      const value = issue[key];
      if (!Array.isArray(value)) continue;
      counts[key] += value.length;
      counts.total += value.length;
    }
  }

  return counts;
}

function formatCounts(counts, limits) {
  return [
    `files=${counts.files}/${limits.files}`,
    `exports=${counts.exports}/${limits.exports}`,
    `types=${counts.types}/${limits.types}`,
    `enumMembers=${counts.enumMembers}/${limits.enumMembers}`,
    `namespaceMembers=${counts.namespaceMembers}/${limits.namespaceMembers}`,
    `total=${counts.total}/${limits.total}`,
  ].join(", ");
}

function assertWithinBaseline(counts, limits) {
  const failures = Object.entries(limits)
    .filter(([key, limit]) => counts[key] > limit)
    .map(([key, limit]) => `${key} baseline grew: count=${counts[key]}, max=${limit}`);

  if (failures.length > 0) {
    throw new Error(
      [
        "Knip unused-code baseline guard failed.",
        ...failures,
        "",
        "Remove newly introduced unused files/exports, or lower/update the baseline only after reviewed debt changes.",
      ].join("\n"),
    );
  }
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    const report = runKnipJson(options.configPath);
    const counts = countIssueItems(report);
    assertWithinBaseline(counts, options.limits);
    stdout.write(`Knip unused-code baseline OK (${formatCounts(counts, options.limits)})\n`);
  },
});

runScriptMain(main);
