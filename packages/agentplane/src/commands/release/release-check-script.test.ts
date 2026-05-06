import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("release-check script", () => {
  it("delegates to the package tarball policy assertion", async () => {
    const script = await readFile(path.resolve(process.cwd(), "scripts/release-check.mjs"), "utf8");
    expect(script).toContain("./check-package-tarball.mjs");
  });

  it("includes the v0.5 blueprint integration release gate", async () => {
    const script = await readFile(path.resolve(process.cwd(), "scripts/release-check.mjs"), "utf8");
    const gate = await readFile(
      path.resolve(process.cwd(), "scripts/check-blueprint-release-gate.mjs"),
      "utf8",
    );

    expect(script).toContain("./check-blueprint-release-gate.mjs");
    expect(gate).toContain("blueprint report");
    expect(gate).toContain("Project blueprint compatibility");
    expect(gate).toContain("blueprint-execution-plan.json");
    expect(gate).toContain("BlueprintSnapshotRef");
    expect(gate).toContain("agentplane.blueprint");
  });
});
