import assert from "node:assert/strict";
import test from "node:test";

import { getVitestWorkspaceProjects } from "./test-route-registry.mjs";

test("the agentplane project admits only roadmap run-cli characterizations", () => {
  const project = getVitestWorkspaceProjects().find((candidate) => candidate.name === "agentplane");

  assert.ok(project);
  assert.deepEqual(project.test.exclude, [
    "**/cli-smoke.test.ts",
    "**/run-cli!(*.roadmap-*).test.ts",
  ]);
});
