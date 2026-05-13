import { readFileSync } from "node:fs";

import { renderTestRoutingReport, validateTestRouting } from "./check-test-routing.mjs";
import {
  DISALLOWED_WORKSPACE_TEST_ROUTES,
  PRIMARY_TEST_ROUTES,
  buildTestInventory,
  getVitestWorkspaceProjects,
} from "../lib/test-route-registry.mjs";

const source = readFileSync("vitest.workspace.ts", "utf8");
if (!source.includes("getVitestWorkspaceProjects")) {
  throw new Error("vitest.workspace.ts must load project routes from test-route-registry.mjs");
}

const workspaceProjectNames = new Set(getVitestWorkspaceProjects().map((route) => route.name));

const invalidProjects = DISALLOWED_WORKSPACE_TEST_ROUTES.filter((name) =>
  workspaceProjectNames.has(name),
);
if (invalidProjects.length > 0) {
  throw new Error(
    `Aggregate Vitest project(s) must be implemented by scripts/run-vitest-suite.mjs, not workspace projects: ${invalidProjects.join(", ")}`,
  );
}

const missingProjects = PRIMARY_TEST_ROUTES.filter((name) => !workspaceProjectNames.has(name));
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
