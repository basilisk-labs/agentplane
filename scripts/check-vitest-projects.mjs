import { readFileSync } from "node:fs";

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

process.stdout.write("vitest workspace projects OK\n");
