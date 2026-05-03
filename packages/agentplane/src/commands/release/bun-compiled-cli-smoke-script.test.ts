import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/smoke-bun-compiled-cli.mjs");

describe("smoke-bun-compiled-cli script", () => {
  it("compiles the built CLI and verifies startup plus bundled asset reads", async () => {
    const { stdout } = await execFileAsync("node", [SCRIPT_PATH, "--json"], {
      cwd: process.cwd(),
      timeout: 120_000,
    });
    const result = JSON.parse(stdout) as {
      version: string;
      checks: string[];
      kept: boolean;
    };

    expect(result.version).toMatch(/^\d+\.\d+\.\d+/u);
    expect(result.kept).toBe(false);
    expect(result.checks).toEqual(["--version", "quickstart", "role CODER"]);
  }, 120_000);
});
