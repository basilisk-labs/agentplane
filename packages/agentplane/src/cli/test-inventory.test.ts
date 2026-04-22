import { describe, expect, it } from "vitest";

import * as testInventoryModule from "../../../../scripts/lib/test-inventory.mjs";

const {
  buildTestInventory,
  classifyPrimaryTestRoutes,
  discoverPackageTestFiles,
  summarizeTestInventory,
} = testInventoryModule as {
  buildTestInventory: () => Array<{
    filePath: string;
    primaryRoutes: string[];
    aggregateRoutes: string[];
  }>;
  classifyPrimaryTestRoutes: (filePath: string) => string[];
  discoverPackageTestFiles: () => string[];
  summarizeTestInventory: (
    entries: Array<{ filePath: string; primaryRoutes: string[]; aggregateRoutes: string[] }>,
  ) => Record<string, number>;
};

describe("test inventory", () => {
  it("discovers package test files deterministically", () => {
    const files = discoverPackageTestFiles();

    expect(files.length).toBeGreaterThan(300);
    expect(files).toEqual([...files].sort((a, b) => a.localeCompare(b)));
    expect(files).toContain("packages/agentplane/src/cli/run-cli.core.test.ts");
    expect(files).toContain("packages/core/src/config/config.test.ts");
    expect(files).toContain("packages/recipes/src/index.test.ts");
    expect(files).toContain("packages/testkit/src/index.test.ts");
  });

  it("classifies primary workspace routes without relying on Vitest execution", () => {
    expect(classifyPrimaryTestRoutes("packages/core/src/config/config.test.ts")).toEqual([
      "core",
    ]);
    expect(classifyPrimaryTestRoutes("packages/recipes/src/index.test.ts")).toEqual([
      "recipes",
    ]);
    expect(classifyPrimaryTestRoutes("packages/testkit/src/index.test.ts")).toEqual([
      "testkit",
    ]);
    expect(classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.core.test.ts")).toEqual([
      "cli-core",
    ]);
    expect(
      classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.recipes.test.ts"),
    ).toEqual(["cli-recipes"]);
    expect(classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.scenario.test.ts")).toEqual(
      ["cli-scenario"],
    );
    expect(classifyPrimaryTestRoutes("packages/agentplane/src/cli/cli-smoke.test.ts")).toEqual([
      "cli-smoke",
    ]);
    expect(
      classifyPrimaryTestRoutes("packages/agentplane/src/cli/run-cli.critical.base.test.ts"),
    ).toEqual(["critical"]);
    expect(
      classifyPrimaryTestRoutes("packages/agentplane/src/commands/guard/impl/commands.unit.test.ts"),
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
});
