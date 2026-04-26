import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { defineCheck, parseScriptArgs, runScriptMain } from "./lib/script-runtime.mjs";

const SCRIPT_NAME = "check-knip-baseline.mjs";
const DEFAULT_CONFIG_PATH = "knip.json";
const DEFAULT_BASELINE_PATH = "scripts/baselines/knip-baseline.json";
const ISSUE_KEYS = ["files", "exports", "types", "enumMembers", "namespaceMembers"];

function parseArgs(argv) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["config", "baseline"],
    booleanFlags: ["update-baseline"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }

  return {
    configPath: flags.config ?? DEFAULT_CONFIG_PATH,
    baselinePath: flags.baseline ?? DEFAULT_BASELINE_PATH,
    updateBaseline: flags["update-baseline"] === true,
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

function normalizeIssueItem(item) {
  if (!item || typeof item !== "object") {
    throw new TypeError("knip JSON reporter returned an invalid issue item");
  }
  const name = String(item.name ?? "").trim();
  if (!name) {
    throw new TypeError("knip JSON reporter returned an issue item without a name");
  }
  return {
    name,
    ...(Number.isInteger(item.line) ? { line: item.line } : {}),
    ...(Number.isInteger(item.col) ? { col: item.col } : {}),
  };
}

function normalizeIssueEntries(report) {
  if (!report || !Array.isArray(report.issues)) {
    throw new TypeError("knip JSON reporter returned an unexpected payload");
  }

  return report.issues
    .map((issue) => {
      const file = String(issue.file ?? "").trim();
      if (!file) {
        throw new TypeError("knip JSON reporter returned an issue without a file");
      }
      const entry = { file };
      for (const key of ISSUE_KEYS) {
        const value = issue[key];
        if (!Array.isArray(value) || value.length === 0) continue;
        entry[key] = value.map(normalizeIssueItem).sort(compareIssueItems);
      }
      return entry;
    })
    .filter((entry) => ISSUE_KEYS.some((key) => Array.isArray(entry[key]) && entry[key].length > 0))
    .sort((left, right) => left.file.localeCompare(right.file));
}

function compareIssueItems(left, right) {
  return (
    left.name.localeCompare(right.name) ||
    Number(left.line ?? 0) - Number(right.line ?? 0) ||
    Number(left.col ?? 0) - Number(right.col ?? 0)
  );
}

function buildBaseline(entries) {
  return {
    schema_version: 1,
    generated_by: SCRIPT_NAME,
    entries,
    counts: countEntries(entries),
  };
}

function readBaseline(baselinePath) {
  const raw = JSON.parse(readFileSync(baselinePath, "utf8"));
  if (!raw || raw.schema_version !== 1 || !Array.isArray(raw.entries)) {
    throw new TypeError(`Invalid Knip baseline schema: ${baselinePath}`);
  }
  return {
    ...raw,
    entries: normalizeIssueEntries({ issues: raw.entries }),
  };
}

function writeBaseline(baselinePath, entries) {
  mkdirSync(path.dirname(baselinePath), { recursive: true });
  writeFileSync(baselinePath, `${JSON.stringify(buildBaseline(entries), null, 2)}\n`, "utf8");
}

function countEntries(entries) {
  const counts = {
    files: 0,
    exports: 0,
    types: 0,
    enumMembers: 0,
    namespaceMembers: 0,
    total: 0,
  };

  for (const entry of entries) {
    for (const key of ISSUE_KEYS) {
      const value = entry[key];
      if (!Array.isArray(value)) continue;
      counts[key] += value.length;
      counts.total += value.length;
    }
  }

  return counts;
}

function itemKey(file, key, item) {
  return `${file}\0${key}\0${item.name}`;
}

function entryLabel(file, key, item) {
  const location =
    Number.isInteger(item.line) && Number.isInteger(item.col) ? `:${item.line}:${item.col}` : "";
  return `${key}: ${file}${location} ${item.name}`;
}

function flattenEntries(entries) {
  const items = new Map();
  for (const entry of entries) {
    for (const key of ISSUE_KEYS) {
      const value = entry[key];
      if (!Array.isArray(value)) continue;
      for (const item of value) {
        items.set(itemKey(entry.file, key, item), entryLabel(entry.file, key, item));
      }
    }
  }
  return items;
}

function diffEntries(currentEntries, baselineEntries) {
  const current = flattenEntries(currentEntries);
  const baseline = flattenEntries(baselineEntries);
  return {
    added: [...current.entries()]
      .filter(([key]) => !baseline.has(key))
      .map(([, label]) => label)
      .sort(),
    removed: [...baseline.entries()]
      .filter(([key]) => !current.has(key))
      .map(([, label]) => label)
      .sort(),
  };
}

function formatCounts(currentCounts, baselineCounts) {
  return [
    `files=${currentCounts.files}/${baselineCounts.files}`,
    `exports=${currentCounts.exports}/${baselineCounts.exports}`,
    `types=${currentCounts.types}/${baselineCounts.types}`,
    `enumMembers=${currentCounts.enumMembers}/${baselineCounts.enumMembers}`,
    `namespaceMembers=${currentCounts.namespaceMembers}/${baselineCounts.namespaceMembers}`,
    `total=${currentCounts.total}/${baselineCounts.total}`,
  ].join(", ");
}

function formatDiffList(title, entries) {
  if (entries.length === 0) return [];
  return [title, ...entries.slice(0, 30).map((entry) => `- ${entry}`)];
}

function assertMatchesBaseline(currentEntries, baselineEntries) {
  const diff = diffEntries(currentEntries, baselineEntries);
  if (diff.added.length > 0 || diff.removed.length > 0) {
    throw new Error(
      [
        "Knip unused-code baseline guard failed.",
        ...formatDiffList("New unused-code entries:", diff.added),
        ...formatDiffList("Stale baseline entries:", diff.removed),
        "",
        "Remove newly introduced unused code, or run with --update-baseline only after reviewed debt changes.",
      ].join("\n"),
    );
  }
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    const report = runKnipJson(options.configPath);
    const currentEntries = normalizeIssueEntries(report);
    if (options.updateBaseline) {
      writeBaseline(options.baselinePath, currentEntries);
      const counts = countEntries(currentEntries);
      stdout.write(`Knip unused-code baseline updated (${formatCounts(counts, counts)})\n`);
      return;
    }

    const baseline = readBaseline(options.baselinePath);
    assertMatchesBaseline(currentEntries, baseline.entries);
    stdout.write(
      `Knip unused-code baseline OK (${formatCounts(
        countEntries(currentEntries),
        countEntries(baseline.entries),
      )})\n`,
    );
  },
});

runScriptMain(main);
