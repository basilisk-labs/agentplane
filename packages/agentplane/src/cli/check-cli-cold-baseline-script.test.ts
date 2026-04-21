import { execFile } from "node:child_process";
import { mkdtemp, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "check-cli-cold-baseline.mjs");

async function writeJson(root: string, fileName: string, value: unknown): Promise<string> {
  const filePath = path.join(root, fileName);
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  return filePath;
}

async function runScript(args: string[]) {
  try {
    const result = await execFileAsync(process.execPath, [SCRIPT_PATH, ...args], {
      cwd: process.cwd(),
      env: process.env,
      maxBuffer: 10 * 1024 * 1024,
    });
    return {
      exitCode: 0,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
    };
  } catch (error: unknown) {
    const execError = error as { code?: number; stdout?: string; stderr?: string };
    return {
      exitCode: Number.isInteger(execError.code) ? Number(execError.code) : 1,
      stdout: typeof execError.stdout === "string" ? execError.stdout : "",
      stderr: typeof execError.stderr === "string" ? execError.stderr : String(error),
    };
  }
}

function payload(avgMs: number) {
  return {
    schema_version: 1,
    mode: "cli_cold_path_v1",
    metric: "avg_ms",
    commands: [
      {
        id: "quickstart",
        avg_ms: avgMs,
        exit_code: 0,
      },
    ],
  };
}

describe("check-cli-cold-baseline script", () => {
  it("passes when measurement stays below the baseline ceiling", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cold-baseline-"));
    const baselinePath = await writeJson(root, "baseline.json", {
      schema_version: 1,
      mode: "cli_cold_path_v1",
      metric: "avg_ms",
      commands: [
        {
          id: "quickstart",
          max_avg_ms: 100,
          expected_exit_code: 0,
        },
      ],
    });
    const measurementPath = await writeJson(root, "measurement.json", payload(50));

    const result = await runScript(["--baseline", baselinePath, "--measurement", measurementPath]);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");
    expect(result.stdout).toContain("CLI cold-start baseline OK");
  });

  it("fails when measurement exceeds the baseline ceiling", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cold-baseline-"));
    const baselinePath = await writeJson(root, "baseline.json", {
      schema_version: 1,
      mode: "cli_cold_path_v1",
      metric: "avg_ms",
      commands: [
        {
          id: "quickstart",
          max_avg_ms: 100,
          expected_exit_code: 0,
        },
      ],
    });
    const measurementPath = await writeJson(root, "measurement.json", payload(150));

    const result = await runScript(["--baseline", baselinePath, "--measurement", measurementPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("CLI cold-start baseline guard failed");
    expect(result.stderr).toContain("quickstart: avg_ms=150 exceeds max_avg_ms=100");
  });
});
