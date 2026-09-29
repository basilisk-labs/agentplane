import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

describe("release-check script", () => {
  it("delegates to the package tarball policy assertion", async () => {
    const script = await readFile(path.resolve(process.cwd(), "scripts/release-check.mjs"), "utf8");
    expect(script).toContain("./check-package-tarball.mjs");
  });

  it("includes the Blueprint retirement release gate", async () => {
    const script = await readFile(path.resolve(process.cwd(), "scripts/release-check.mjs"), "utf8");
    const gateWrapper = await readFile(
      path.resolve(process.cwd(), "scripts/check-blueprint-release-gate.mjs"),
      "utf8",
    );
    const gate = await readFile(
      path.resolve(process.cwd(), "scripts/checks/check-blueprint-release-gate.mjs"),
      "utf8",
    );

    expect(script).toContain("./check-blueprint-release-gate.mjs");
    expect(gateWrapper).toContain("./checks/check-blueprint-release-gate.mjs");
    expect(gate).toContain("no-blueprint-engine.test.mjs");
    expect(gate).toContain("no-blueprint-cursor.test.mjs");
  });
});
