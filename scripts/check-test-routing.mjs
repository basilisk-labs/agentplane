import { pathToFileURL } from "node:url";

import {
  AGGREGATE_TEST_ROUTES,
  PRIMARY_TEST_ROUTES,
  buildTestInventory,
  summarizeTestInventory,
} from "./lib/test-inventory.mjs";

const PRIMARY_ROUTE_SET = new Set(PRIMARY_TEST_ROUTES);
const AGGREGATE_ROUTE_SET = new Set(AGGREGATE_TEST_ROUTES);

function formatList(values) {
  return values.length === 0 ? "<none>" : values.join(", ");
}

export function validateTestRouting(entries) {
  const errors = [];
  const seenFiles = new Set();

  for (const entry of entries) {
    if (seenFiles.has(entry.filePath)) {
      errors.push(`Duplicate inventory entry: ${entry.filePath}`);
      continue;
    }
    seenFiles.add(entry.filePath);

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

  return {
    ok: errors.length === 0,
    errors,
    summary: summarizeTestInventory(entries),
    total: entries.length,
  };
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

function main() {
  const result = validateTestRouting(buildTestInventory());
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
