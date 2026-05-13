import { readFileSync } from "node:fs";
import path from "node:path";

import { defineCheck, parseScriptArgs, runScriptMain } from "../lib/script-runtime.mjs";

const SCRIPT_NAME = "check-depcruise-known-violations.mjs";
const DEFAULT_KNOWN_VIOLATIONS_PATH = ".dependency-cruiser-known-violations.json";
const MAX_KNOWN_VIOLATIONS_TOTAL = 0;
const MAX_KNOWN_VIOLATIONS_BY_RULE = new Map([["no-circular", 0]]);

function parseNonNegativeInteger(value, flagName) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isSafeInteger(parsed) || parsed < 0 || String(parsed) !== value) {
    throw new Error(`--${flagName} must be a non-negative integer`);
  }
  return parsed;
}

function parseArgs(argv, context) {
  const { flags, positionals } = parseScriptArgs(argv, {
    valueFlags: ["known-violations", "max-total"],
  });
  if (positionals.length > 0) {
    throw new Error(`unexpected positional arguments: ${positionals.join(" ")}`);
  }

  return {
    knownViolationsPath: path.resolve(
      context.cwd,
      flags["known-violations"] ?? DEFAULT_KNOWN_VIOLATIONS_PATH,
    ),
    maxTotal:
      flags["max-total"] === undefined
        ? MAX_KNOWN_VIOLATIONS_TOTAL
        : parseNonNegativeInteger(flags["max-total"], "max-total"),
  };
}

function loadKnownViolations(filePath) {
  const parsed = JSON.parse(readFileSync(filePath, "utf8"));
  if (!Array.isArray(parsed)) {
    throw new TypeError(`${path.basename(filePath)} must contain a JSON array`);
  }
  return parsed;
}

function getRuleName(violation) {
  if (
    typeof violation !== "object" ||
    violation === null ||
    !("rule" in violation) ||
    typeof violation.rule !== "object" ||
    violation.rule === null ||
    !("name" in violation.rule) ||
    typeof violation.rule.name !== "string" ||
    violation.rule.name.length === 0
  ) {
    return null;
  }
  return violation.rule.name;
}

function collectRuleCounts(violations) {
  const counts = new Map();
  const invalidIndexes = [];

  for (const [index, violation] of violations.entries()) {
    const ruleName = getRuleName(violation);
    if (ruleName === null) {
      invalidIndexes.push(index);
      continue;
    }
    counts.set(ruleName, (counts.get(ruleName) ?? 0) + 1);
  }

  return { counts, invalidIndexes };
}

function formatRuleCounts(counts) {
  return [...counts.entries()]
    .toSorted(([left], [right]) => left.localeCompare(right))
    .map(([ruleName, count]) => `${ruleName}=${count}`)
    .join(", ");
}

function checkKnownViolations({ knownViolationsPath, maxTotal }) {
  const violations = loadKnownViolations(knownViolationsPath);
  const { counts, invalidIndexes } = collectRuleCounts(violations);
  const failures = [];

  if (invalidIndexes.length > 0) {
    failures.push(
      `invalid known violation entries at indexes: ${invalidIndexes.map(String).join(", ")}`,
    );
  }

  if (violations.length > maxTotal) {
    failures.push(`known violation baseline grew: count=${violations.length}, max=${maxTotal}`);
  }

  for (const [ruleName, count] of counts.entries()) {
    const maxForRule = MAX_KNOWN_VIOLATIONS_BY_RULE.get(ruleName);
    if (maxForRule === undefined) {
      failures.push(`unexpected dependency-cruiser rule in baseline: ${ruleName}`);
      continue;
    }
    if (count > maxForRule) {
      failures.push(
        `known violation baseline grew for ${ruleName}: count=${count}, max=${maxForRule}`,
      );
    }
  }

  if (failures.length > 0) {
    throw new Error(
      [
        "dependency-cruiser known violation guard failed.",
        ...failures,
        "",
        "Remove new architecture violations, or lower/update the baseline only after reviewed debt changes.",
      ].join("\n"),
    );
  }

  return { count: violations.length, counts };
}

const main = defineCheck({
  name: SCRIPT_NAME,
  parseArgs,
  async check({ options, stdout }) {
    const result = checkKnownViolations(options);
    stdout.write(
      `dependency-cruiser known violations OK (count=${result.count}, max=${options.maxTotal}, rules=${formatRuleCounts(
        result.counts,
      )})\n`,
    );
  },
});

runScriptMain(main);
