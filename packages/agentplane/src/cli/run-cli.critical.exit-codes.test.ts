import path from "node:path";

import { describe, expect, it } from "vitest";

import { ensureDir, expectCliError, makeTempDir, pathExists, runCli } from "./critical/harness.js";

describe("critical: exit codes contract", () => {
  it("init is idempotent by default (second run reports conflicts with E_IO)", async () => {
    const root = await makeTempDir("agentplane-critical-exit-");
    await ensureDir(root);

    const first = await runCli(["init", "--yes"], { cwd: root });
    expect(first.code).toBe(0);
    expect(await pathExists(path.join(root, ".agentplane", "config.json"))).toBe(true);

    const second = await runCli(["init", "--yes"], { cwd: root });
    expectCliError(second, 4, "E_IO");
    expect(second.stderr).toMatch(/Init conflicts detected/i);
    expect(second.stderr).toMatch(/--force/i);
  });
});
