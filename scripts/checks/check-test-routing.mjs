import { pathToFileURL } from "node:url";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import {
  AGGREGATE_TEST_ROUTES,
  PRIMARY_TEST_ROUTES,
  buildTestInventory,
  listLocalCiTargetTestFiles,
  listVitestSuiteFiles,
  summarizeTestInventory,
} from "../lib/test-route-registry.mjs";

const PRIMARY_ROUTE_SET = new Set(PRIMARY_TEST_ROUTES);
const AGGREGATE_ROUTE_SET = new Set(AGGREGATE_TEST_ROUTES);

function formatList(values) {
  return values.length === 0 ? "<none>" : values.join(", ");
}

const TEST_TITLE_PATTERN = /\b(?:it|test)\s*\(\s*(["'`])([^\n]*?)\1/gu;

export function findDuplicateTestTitles(source) {
  const counts = new Map();
  for (const match of source.matchAll(TEST_TITLE_PATTERN)) {
    const title = match[2].trim();
    if (title === "") continue;
    counts.set(title, (counts.get(title) ?? 0) + 1);
  }
  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([title, count]) => ({ title, count }))
    .toSorted((left, right) => left.title.localeCompare(right.title));
}

export function validateTestRouting(entries) {
  const errors = [];
  const seenFiles = new Set();
  const inventoryFiles = new Set(entries.map((entry) => entry.filePath));

  for (const entry of entries) {
    if (seenFiles.has(entry.filePath)) {
      errors.push(`Duplicate inventory entry: ${entry.filePath}`);
      continue;
    }
    seenFiles.add(entry.filePath);

    const duplicateTitles = existsSync(entry.filePath)
      ? findDuplicateTestTitles(readFileSync(entry.filePath, "utf8"))
      : [];
    for (const duplicate of duplicateTitles) {
      errors.push(
        `${entry.filePath}: duplicate test title (${duplicate.count}x): ${duplicate.title}`,
      );
    }

    const unknownPrimaryRoutes = entry.primaryRoutes.filter(
      (route) => !PRIMARY_ROUTE_SET.has(route),
    );
    if (unknownPrimaryRoutes.length > 0) {
      errors.push(
        `${entry.filePath}: unknown primary route(s): ${formatList(unknownPrimaryRoutes)}`,
      );
    }

    if (entry.primaryRoutes.length === 0) {
      errors.push(`${entry.filePath}: missing primary route`);
    } else if (entry.primaryRoutes.length > 1) {
      errors.push(
        `${entry.filePath}: duplicate primary routes: ${formatList(entry.primaryRoutes)}`,
      );
    }

    const unknownAggregateRoutes = entry.aggregateRoutes.filter(
      (route) => !AGGREGATE_ROUTE_SET.has(route),
    );
    if (unknownAggregateRoutes.length > 0) {
      errors.push(
        `${entry.filePath}: unknown aggregate route(s): ${formatList(unknownAggregateRoutes)}`,
      );
    }
  }

  for (const error of validateTargetedTestFiles(
    "vitest suite",
    listVitestSuiteFiles(),
    inventoryFiles,
  )) {
    errors.push(error);
  }
  for (const error of validateTargetedTestFiles(
    "local CI selector",
    listLocalCiTargetTestFiles(),
    inventoryFiles,
  )) {
    errors.push(error);
  }

  return {
    ok: errors.length === 0,
    errors,
    summary: summarizeTestInventory(entries),
    total: entries.length,
  };
}

export function validateTargetedTestFiles(sourceLabel, groups, inventoryFiles) {
  const errors = [];
  for (const [groupName, files] of Object.entries(groups)) {
    const seenTargets = new Set();
    for (const filePath of files) {
      if (seenTargets.has(filePath)) {
        errors.push(`${sourceLabel} ${groupName}: duplicate target ${filePath}`);
        continue;
      }
      seenTargets.add(filePath);
      if (!inventoryFiles.has(filePath)) {
        errors.push(
          `${sourceLabel} ${groupName}: target is missing from test inventory: ${filePath}`,
        );
      }
    }
  }
  return errors;
}

export function renderTestRoutingReport(result) {
  const lines = [`test routing ${result.ok ? "OK" : "FAILED"}`, `total tests: ${result.total}`];
  for (const [route, count] of Object.entries(result.summary)) {
    lines.push(`  ${route}: ${count}`);
  }
  if (!result.ok) {
    lines.push("errors:");
    for (const error of result.errors) {
      lines.push(`  - ${error}`);
    }
  }
  return `${lines.join("\n")}\n`;
}

function parseReportJsonArg(argv) {
  const index = argv.indexOf("--report-json");
  const assignment = argv.find((arg) => arg.startsWith("--report-json="));
  const hasSeparateValue = index !== -1;
  let value = null;
  if (hasSeparateValue) {
    value = argv[index + 1] ?? "";
  } else if (assignment) {
    value = assignment.slice("--report-json=".length);
  }
  if (value === "") throw new Error("--report-json requires an output path");
  const consumed = new Set(hasSeparateValue ? [index, index + 1] : []);
  const unsupported = argv.filter(
    (arg, argIndex) => !consumed.has(argIndex) && !arg.startsWith("--report-json="),
  );
  if (unsupported.length > 0) {
    throw new Error(`unsupported test routing argument: ${unsupported.join(" ")}`);
  }
  return value;
}

function main(argv = process.argv.slice(2)) {
  const reportJson = parseReportJsonArg(argv);
  const result = validateTestRouting(buildTestInventory());
  if (reportJson) {
    const reportPath = path.resolve(reportJson);
    mkdirSync(path.dirname(reportPath), { recursive: true });
    writeFileSync(
      reportPath,
      `${JSON.stringify(
        {
          schema_version: 1,
          kind: "agentplane.test_routing_and_duplication_report",
          ...result,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
  }
  const report = renderTestRoutingReport(result);
  if (result.ok) {
    process.stdout.write(report);
    return;
  }

  process.stderr.write(report);
  process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
