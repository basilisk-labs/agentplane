import { describe, expect, it } from "vitest";

import * as testRoutingCheckModule from "../../../../scripts/check-test-routing.mjs";
import * as testInventoryModule from "../../../../scripts/lib/test-inventory.mjs";

type InventoryEntry = {
  filePath: string;
  primaryRoutes: string[];
  aggregateRoutes: string[];
};

const { buildTestInventory } = testInventoryModule as {
  buildTestInventory: () => InventoryEntry[];
};

const { renderTestRoutingReport, validateTargetedTestFiles, validateTestRouting } =
  testRoutingCheckModule as {
    renderTestRoutingReport: (result: {
      ok: boolean;
      errors: string[];
      summary: Record<string, number>;
      total: number;
    }) => string;
    validateTargetedTestFiles: (
      sourceLabel: string,
      groups: Record<string, string[]>,
      inventoryFiles: Set<string>,
    ) => string[];
    validateTestRouting: (entries: InventoryEntry[]) => {
      ok: boolean;
      errors: string[];
      summary: Record<string, number>;
      total: number;
    };
  };

describe("test routing check", () => {
  it("passes for the current inventory", () => {
    const result = validateTestRouting(buildTestInventory());

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.total).toBeGreaterThan(300);
    expect(result.summary.agentplane).toBeGreaterThan(0);
    expect(result.summary["cli-core"]).toBeGreaterThan(0);
  });

  it("fails when a test has no primary route", () => {
    const result = validateTestRouting([
      {
        filePath: "packages/example/src/orphan.test.ts",
        primaryRoutes: [],
        aggregateRoutes: [],
      },
    ]);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("packages/example/src/orphan.test.ts: missing primary route");
  });

  it("fails when a test has multiple primary routes", () => {
    const result = validateTestRouting([
      {
        filePath: "packages/agentplane/src/cli/ambiguous.test.ts",
        primaryRoutes: ["agentplane", "cli-core"],
        aggregateRoutes: [],
      },
    ]);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "packages/agentplane/src/cli/ambiguous.test.ts: duplicate primary routes: agentplane, cli-core",
    );
  });

  it("reports unknown primary and aggregate route labels", () => {
    const result = validateTestRouting([
      {
        filePath: "packages/agentplane/src/cli/unknown-route.test.ts",
        primaryRoutes: ["unknown-primary"],
        aggregateRoutes: ["unknown-aggregate"],
      },
    ]);

    expect(result.ok).toBe(false);
    expect(result.errors).toContain(
      "packages/agentplane/src/cli/unknown-route.test.ts: unknown primary route(s): unknown-primary",
    );
    expect(result.errors).toContain(
      "packages/agentplane/src/cli/unknown-route.test.ts: unknown aggregate route(s): unknown-aggregate",
    );
  });

  it("reports stale targeted suite references", () => {
    const errors = validateTargetedTestFiles(
      "fixture suite",
      {
        duplicate: [
          "packages/agentplane/src/cli/test-routing-check.test.ts",
          "packages/agentplane/src/cli/test-routing-check.test.ts",
        ],
        stale: ["packages/agentplane/src/cli/missing-target.test.ts"],
      },
      new Set(["packages/agentplane/src/cli/test-routing-check.test.ts"]),
    );

    expect(errors).toContain(
      "fixture suite duplicate: duplicate target packages/agentplane/src/cli/test-routing-check.test.ts",
    );
    expect(errors).toContain(
      "fixture suite stale: target is missing from test inventory: packages/agentplane/src/cli/missing-target.test.ts",
    );
  });

  it("renders a deterministic report", () => {
    const report = renderTestRoutingReport({
      ok: true,
      errors: [],
      summary: { agentplane: 2, core: 1 },
      total: 3,
    });

    expect(report).toBe("test routing OK\ntotal tests: 3\n  agentplane: 2\n  core: 1\n");
  });
});
