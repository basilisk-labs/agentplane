import { readFileSync } from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import * as matrixModule from "../../../../../scripts/lib/installed-migration-matrix.mjs";

const { INSTALLED_MIGRATION_MATRIX, validateInstalledMigrationMatrixCoverage } = matrixModule as {
  INSTALLED_MIGRATION_MATRIX: Array<{
    id: string;
    kind: "fresh" | "upgrade" | "workflow_migration";
    workflowMode: "direct" | "branch_pr";
    workflowVersion: 1 | 2;
    taskDocVersion: 2 | 3;
    activeTask: boolean;
    sourceTag: "v0.6.24" | "v0.6.26" | null;
  }>;
  validateInstalledMigrationMatrixCoverage: (
    scenarios: Array<{
      id: string;
      kind: "fresh" | "upgrade" | "workflow_migration";
      workflowMode: "direct" | "branch_pr";
      workflowVersion: 1 | 2;
      taskDocVersion: 2 | 3;
      activeTask: boolean;
      sourceTag: "v0.6.24" | "v0.6.26" | null;
    }>,
  ) => {
    scenarioCount: number;
    workflowModes: string[];
    workflowVersions: number[];
    taskDocVersions: number[];
    sourceTags: string[];
  };
};

describe("installed migration matrix", () => {
  it("covers the supported pairwise migration and fresh-install surfaces", () => {
    expect(INSTALLED_MIGRATION_MATRIX.map((scenario) => scenario.id)).toEqual([
      "fresh-direct-v2-doc3",
      "fresh-branch-pr-v2-doc3",
      "upgrade-0.6.24-direct-v2-doc2-active",
      "upgrade-0.6.24-branch-pr-v2-doc3-active",
      "upgrade-0.6.26-direct-v2-doc3-active",
      "upgrade-0.6.26-branch-pr-v2-doc3-active",
      "workflow-v1-direct-rollback",
      "workflow-v1-branch-pr-rollback",
    ]);

    expect(validateInstalledMigrationMatrixCoverage(INSTALLED_MIGRATION_MATRIX)).toEqual({
      scenarioCount: 8,
      workflowModes: ["branch_pr", "direct"],
      workflowVersions: [1, 2],
      taskDocVersions: [2, 3],
      sourceTags: ["v0.6.24", "v0.6.26"],
    });
  });

  it.each([
    [
      "direct workflow",
      (scenario: (typeof INSTALLED_MIGRATION_MATRIX)[number]) => scenario.workflowMode !== "direct",
    ],
    [
      "branch_pr workflow",
      (scenario: (typeof INSTALLED_MIGRATION_MATRIX)[number]) =>
        scenario.workflowMode !== "branch_pr",
    ],
    [
      "workflow v1",
      (scenario: (typeof INSTALLED_MIGRATION_MATRIX)[number]) => scenario.workflowVersion !== 1,
    ],
    [
      "task doc v2",
      (scenario: (typeof INSTALLED_MIGRATION_MATRIX)[number]) => scenario.taskDocVersion !== 2,
    ],
    [
      "active upgrade",
      (scenario: (typeof INSTALLED_MIGRATION_MATRIX)[number]) =>
        !(scenario.kind === "upgrade" && scenario.activeTask),
    ],
    [
      "v0.6.26 source",
      (scenario: (typeof INSTALLED_MIGRATION_MATRIX)[number]) => scenario.sourceTag !== "v0.6.26",
    ],
  ])("fails closed when %s coverage disappears", (_label, keep) => {
    expect(() =>
      validateInstalledMigrationMatrixCoverage(INSTALLED_MIGRATION_MATRIX.filter(keep)),
    ).toThrow(/installed migration matrix/iu);
  });

  it("runs the matrix from the existing installed-tarball smoke", () => {
    const source = readFileSync(
      path.resolve(process.cwd(), "scripts/release/check-local-tarball-install-smoke.mjs"),
      "utf8",
    );

    expect(source).toContain("runInstalledMigrationMatrix");
    expect(source).toContain("installed migration matrix OK");
  });
});
