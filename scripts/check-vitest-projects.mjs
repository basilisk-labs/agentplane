import { readFileSync } from "node:fs";

import { renderTestRoutingReport, validateTestRouting } from "./check-test-routing.mjs";
import { buildTestInventory } from "./lib/test-inventory.mjs";

const source = readFileSync("vitest.workspace.ts", "utf8");

const aggregateProjects = [
  "backend-critical",
  "cli",
  "cli-slow",
  "cli-unit",
  "fast",
  "platform-critical",
  "precommit",
  "release-ci-base",
  "release-critical",
  "release-recovery",
  "release-smoke",
  "significant-coverage",
  "workflow-coverage",
];

const primaryProjects = [
  "agentplane",
  "cli-core",
  "cli-recipes",
  "cli-scenario",
  "cli-smoke",
  "core",
  "critical",
  "guard",
  "recipes",
  "testkit",
];

function projectPattern(name) {
  return new RegExp(String.raw`project\("${name}"`);
}

const invalidProjects = aggregateProjects.filter((name) => projectPattern(name).test(source));
if (invalidProjects.length > 0) {
  throw new Error(
    `Aggregate Vitest project(s) must be implemented by scripts/run-vitest-suite.mjs, not workspace projects: ${invalidProjects.join(", ")}`,
  );
}

const missingProjects = primaryProjects.filter((name) => !projectPattern(name).test(source));
if (missingProjects.length > 0) {
  throw new Error(`Missing primary Vitest project(s): ${missingProjects.join(", ")}`);
}

const routingResult = validateTestRouting(buildTestInventory());
if (!routingResult.ok) {
  throw new Error(renderTestRoutingReport(routingResult).trimEnd());
}

process.stdout.write("vitest workspace projects OK\n");
process.stdout.write(
  `test routing OK (${routingResult.total} tests, ${Object.keys(routingResult.summary).length} primary routes)\n`,
);
