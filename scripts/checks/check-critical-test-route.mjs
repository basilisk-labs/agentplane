import { readFileSync } from "node:fs";
import path from "node:path";

import { defineScript, runScriptMain } from "../lib/script-runtime.mjs";
import { getVitestWorkspaceProjects } from "../lib/test-route-registry.mjs";

const CRITICAL_TIMEOUT_MINUTES = 10;
const CRITICAL_VITEST_TIMEOUT_MS = 60_000;
const VITEST_TIMEOUT_LITERAL = "60_000";
const TEST_CRITICAL_SCRIPT = "node scripts/checks/run-vitest-suite.mjs critical-cli";

const WORKFLOW_FILES = [".github/workflows/ci.yml", ".github/workflows/prepublish.yml"];

function readRepoFile(relPath) {
  return readFileSync(path.join(process.cwd(), relPath), "utf8");
}

function assertIncludes(source, needle, label) {
  if (!source.includes(needle)) {
    throw new Error(`${label} is missing required text: ${needle}`);
  }
}

function assertWorkflowCriticalStep(workflowPath) {
  const source = readRepoFile(workflowPath);
  assertIncludes(source, "run: bun run test:critical", workflowPath);

  const stepMatch = source.match(
    / {6}- name: CLI E2E \([Cc]ritical\)\n[\s\S]*?(?=\n {6}- name: |\n\n {2}[a-zA-Z_-]+:|\n?$)/,
  );
  const step = stepMatch?.[0] ?? "";
  if (
    !step.includes(`timeout-minutes: ${CRITICAL_TIMEOUT_MINUTES}`) ||
    !step.includes("run: bun run test:critical")
  ) {
    throw new Error(
      `${workflowPath} must run the critical Vitest route with timeout-minutes: ${CRITICAL_TIMEOUT_MINUTES}.`,
    );
  }
}

function assertPackageScript() {
  const pkg = JSON.parse(readRepoFile("package.json"));
  const actual = pkg.scripts?.["test:critical"];
  if (actual !== TEST_CRITICAL_SCRIPT) {
    throw new Error(`package.json test:critical must be exactly: ${TEST_CRITICAL_SCRIPT}`);
  }
}

function assertVitestProject() {
  const source = readRepoFile("vitest.workspace.ts");
  assertIncludes(source, "getVitestWorkspaceProjects", "vitest.workspace.ts");

  const criticalProject = getVitestWorkspaceProjects().find(
    (project) => project.name === "critical",
  );
  if (!criticalProject) {
    throw new Error("test-route-registry.mjs must define the critical Vitest route.");
  }

  const criticalInclude = criticalProject.test.include ?? [];
  if (!criticalInclude.includes("packages/agentplane/src/cli/run-cli.critical.*.test.ts")) {
    throw new Error(
      "critical Vitest route must include packages/agentplane/src/cli/run-cli.critical.*.test.ts.",
    );
  }
  if (
    criticalProject.test.hookTimeout !== CRITICAL_VITEST_TIMEOUT_MS ||
    criticalProject.test.testTimeout !== CRITICAL_VITEST_TIMEOUT_MS
  ) {
    throw new Error(
      `critical Vitest route must keep hookTimeout and testTimeout at ${VITEST_TIMEOUT_LITERAL}.`,
    );
  }
}

function checkCriticalRoute() {
  assertPackageScript();
  assertVitestProject();
  for (const workflowPath of WORKFLOW_FILES) {
    assertWorkflowCriticalStep(workflowPath);
  }
  process.stdout.write("critical Vitest route OK\n");
}

const main = defineScript({
  name: "check-critical-test-route.mjs",
  async run() {
    checkCriticalRoute();
  },
});

runScriptMain(main);
