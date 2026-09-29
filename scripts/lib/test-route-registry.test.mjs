import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  discoverPackageTestFiles,
  getVitestWorkspaceProjects,
  listRepoFiles,
} from "./test-route-registry.mjs";

test("the agentplane project admits only roadmap run-cli characterizations", () => {
  const project = getVitestWorkspaceProjects().find((candidate) => candidate.name === "agentplane");

  assert.ok(project);
  assert.deepEqual(project.test.exclude, [
    "**/cli-smoke.test.ts",
    "**/run-cli!(*.roadmap-*).test.ts",
  ]);
});

test("package discovery excludes generated output and dependencies but retains source directories", () => {
  const repoRoot = mkdtempSync(path.join(os.tmpdir(), "agentplane-test-discovery-"));
  try {
    const sourceFiles = [
      "packages/example/src/feature.test.ts",
      "packages/example/src/dist/retained.test.ts",
    ];
    for (const file of [
      ...sourceFiles,
      "packages/example/dist/src/generated.test.ts",
      "packages/example/node_modules/dependency/src/dependency.test.ts",
      "packages/example/node_modules/.cache/transient.test.ts",
    ]) {
      const absolute = path.join(repoRoot, file);
      mkdirSync(path.dirname(absolute), { recursive: true });
      writeFileSync(absolute, "");
    }

    assert.deepEqual(
      listRepoFiles("packages", { repoRoot }),
      sourceFiles.toSorted((a, b) => a.localeCompare(b)),
    );
    assert.deepEqual(
      discoverPackageTestFiles({ repoRoot }),
      sourceFiles.toSorted((a, b) => a.localeCompare(b)),
    );
    assert.throws(() => listRepoFiles("packages/missing/src", { repoRoot }), { code: "ENOENT" });
  } finally {
    rmSync(repoRoot, { recursive: true, force: true });
  }
});
