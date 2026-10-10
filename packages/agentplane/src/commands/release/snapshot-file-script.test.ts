import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts/release/snapshot-file.test.mjs");

describe("release snapshot file regression suite", () => {
  it("runs all Node snapshot boundary tests without failures or skips", async () => {
    const result = await execFileAsync(
      process.execPath,
      ["--test", "--test-reporter=tap", SCRIPT_PATH],
      { timeout: 60_000 },
    );
    const tests = /^# tests (\d+)$/mu.exec(result.stdout);
    expect(tests, result.stdout).not.toBeNull();
    expect(Number(tests?.[1])).toBeGreaterThanOrEqual(5);
    expect(result.stdout).toMatch(/^# fail 0$/mu);
    expect(result.stdout).toMatch(/^# skipped 0$/mu);
    expect(result.stdout).toMatch(/^# cancelled 0$/mu);
    expect(result.stdout).not.toMatch(/^not ok /mu);
  });
});
