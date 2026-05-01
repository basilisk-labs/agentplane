import { describe, expect, it } from "vitest";

import * as testInventoryModule from "../../../../scripts/lib/test-inventory.mjs";

const {
  buildTestInventory,
  classifyPrimaryTestRoutes,
  discoverPackageTestFiles,
  SIGNIFICANT_COVERAGE_TARGETS,
  summarizeTestInventory,
  WORKFLOW_HARNESS_TARGETS,
} = testInventoryModule as {
  buildTestInventory: () => {
    filePath: string;
    primaryRoutes: string[];
    aggregateRoutes: string[];
  }[];
  classifyPrimaryTestRoutes: (filePath: string) => string[];
  discoverPackageTestFiles: () => string[];
  SIGNIFICANT_COVERAGE_TARGETS: { source: string; tests: string[] }[];
  summarizeTestInventory: (
    entries: { filePath: string; primaryRoutes: string[]; aggregateRoutes: string[] }[],
  ) => Record<string, number>;
  WORKFLOW_HARNESS_TARGETS: { source: string; tests: string[] }[];
};

describe("test inventory", () => {
  it("discovers package test files deterministically", () => {
    const files = discoverPackageTestFiles();

    expect(files.length).toBeGreaterThan(300);
    expect(files).toEqual(files.toSorted((a, b) => a.localeCompare(b)));
    expect(files).toContain("packages/agentplane/src/cli/run-cli.core.test.ts");
    expect(files).toContain("packages/core/src/config/config.test.ts");
    expect(files).toContain("packages/recipes/src/index.test.ts");
    expect(files).toContain("packages/testkit/src/index.test.ts");
  });

  it("classifies primary workspace routes without relying on Vitest execution", () => {
    expect(classifyPrimaryTestRoutes("packages/core/src/config/config.test.ts")).toEqual(["core"]);
    expect(classifyPrimaryTestRoutes("packages/recipes/src/index.test.ts")).toEqual(["recipes"]);
    expect(classifyPrimaryTestRoutes("packages/testkit/src/index.test.ts")).toEqual(["testkit"]);
    expect(classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.core.test.ts")).toEqual([
      "cli-core",
    ]);
    expect(
      classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.recipes.test.ts"),
    ).toEqual(["cli-recipes"]);
    expect(
      classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.scenario.test.ts"),
    ).toEqual(["cli-scenario"]);
    expect(classifyPrimaryTestRoutes("packages/agentplane/src/cli/cli-smoke.test.ts")).toEqual([
      "cli-smoke",
    ]);
    expect(
      classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.critical.base.test.ts"),
    ).toEqual(["critical"]);
    expect(
      classifyPrimaryTestRoutes(
        "packages/agentplane/src/commands/guard/impl/commands.guard.unit.test.ts",
      ),
    ).toEqual(["guard"]);
    expect(classifyPrimaryTestRoutes("packages/agentplane/src/cli/prompts.test.ts")).toEqual([
      "agentplane",
    ]);
  });

  it("summarizes current inventory by primary route", () => {
    const entries = buildTestInventory();
    const summary = summarizeTestInventory(entries);

    expect(summary.agentplane).toBeGreaterThan(0);
    expect(summary["cli-core"]).toBeGreaterThan(0);
    expect(summary.core).toBeGreaterThan(0);
    expect(summary.recipes).toBeGreaterThan(0);
    expect(summary.testkit).toBeGreaterThan(0);
  });

  it("exposes shared target inventories for aggregate guardrail contracts", () => {
    const inventory = new Set(discoverPackageTestFiles());

    expect(SIGNIFICANT_COVERAGE_TARGETS.length).toBeGreaterThan(0);
    expect(WORKFLOW_HARNESS_TARGETS.length).toBeGreaterThan(0);

    for (const target of [...SIGNIFICANT_COVERAGE_TARGETS, ...WORKFLOW_HARNESS_TARGETS]) {
      expect(target.source).toMatch(/^packages\/.+\.ts$/);
      expect(target.tests.length).toBeGreaterThan(0);
      expect(new Set(target.tests).size).toBe(target.tests.length);
      for (const testFile of target.tests) {
        expect(inventory.has(testFile)).toBe(true);
        expect(classifyPrimaryTestRoutes(testFile).length).toBe(1);
      }
    }
  });
});
