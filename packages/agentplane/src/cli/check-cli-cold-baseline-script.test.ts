import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
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

function payload(medianMs: number) {
  return {
    schema_version: 1,
    mode: "cli_cold_path_v1",
    commands: [
      {
        id: "quickstart",
        median_ms: medianMs,
        avg_ms: medianMs,
        p95_ms: medianMs,
        exit_code: 0,
      },
    ],
  };
}

async function writeFakeCli(
  root: string,
  opts: { slowInvocations: number; slowMs: number; fastMs: number; failInvocations?: number },
): Promise<{ cliPath: string; counterPath: string }> {
  const counterPath = path.join(root, "counter.txt");
  const cliDir = path.join(root, "stub", "bin");
  const cliPath = path.join(cliDir, "agentplane.js");
  await mkdir(cliDir, { recursive: true });
  await writeFile(counterPath, "0\n", "utf8");
  await writeFile(
    cliPath,
    [
      "const fs = require('node:fs');",
      `const counterPath = ${JSON.stringify(counterPath)};`,
      "let counter = 0;",
      "try {",
      "  counter = Number.parseInt(fs.readFileSync(counterPath, 'utf8').trim(), 10) || 0;",
      "} catch {}",
      "counter += 1;",
      "fs.writeFileSync(counterPath, `${counter}\\n`, 'utf8');",
      `const delayMs = counter <= ${opts.slowInvocations} ? ${opts.slowMs} : ${opts.fastMs};`,
      `const exitCode = counter <= ${opts.failInvocations ?? 0} ? 1 : 0;`,
      "const startedAt = Date.now();",
      "while (Date.now() - startedAt < delayMs) {}",
      "process.exit(exitCode);",
      "",
    ].join("\n"),
    "utf8",
  );
  return { cliPath, counterPath };
}

describe("check-cli-cold-baseline script", () => {
  it("passes when measurement stays below the baseline ceiling", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cold-baseline-"));
    const baselinePath = await writeJson(root, "baseline.json", {
      schema_version: 2,
      mode: "cli_cold_path_v1",
      metric: "median_ms",
      commands: [
        {
          id: "quickstart",
          max_median_ms: 100,
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
      schema_version: 2,
      mode: "cli_cold_path_v1",
      metric: "median_ms",
      commands: [
        {
          id: "quickstart",
          max_median_ms: 100,
          expected_exit_code: 0,
        },
      ],
    });
    const measurementPath = await writeJson(root, "measurement.json", payload(150));

    const result = await runScript(["--baseline", baselinePath, "--measurement", measurementPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("CLI cold-start baseline guard failed");
    expect(result.stderr).toContain("quickstart: median_ms=150 exceeds max_median_ms=100");
  });

  it("fails fast with timeout diagnostics when a measured command timed out", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cold-baseline-"));
    const baselinePath = await writeJson(root, "baseline.json", {
      schema_version: 2,
      mode: "cli_cold_path_v1",
      metric: "median_ms",
      commands: [
        {
          id: "quickstart",
          max_median_ms: 100,
          expected_exit_code: 0,
        },
      ],
    });
    const measurementPath = await writeJson(root, "measurement.json", {
      schema_version: 1,
      mode: "cli_cold_path_v1",
      commands: [
        {
          id: "quickstart",
          median_ms: 50,
          avg_ms: 50,
          p95_ms: 50,
          exit_code: 124,
          timed_out: true,
          timeout_ms: 25,
        },
      ],
    });

    const result = await runScript(["--baseline", baselinePath, "--measurement", measurementPath]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("quickstart: timed out after 25ms");
    expect(result.stderr).toContain("quickstart: exit_code=124, expected=0");
  });

  it("uses median timing instead of average timing so one outlier does not fail the guard", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cold-baseline-"));
    const baselinePath = await writeJson(root, "baseline.json", {
      schema_version: 2,
      mode: "cli_cold_path_v1",
      metric: "median_ms",
      commands: [
        {
          id: "quickstart",
          max_median_ms: 100,
          expected_exit_code: 0,
        },
      ],
    });
    const measurementPath = await writeJson(root, "measurement.json", {
      schema_version: 1,
      mode: "cli_cold_path_v1",
      commands: [
        {
          id: "quickstart",
          median_ms: 50,
          avg_ms: 500,
          p95_ms: 1400,
          exit_code: 0,
        },
      ],
    });

    const result = await runScript(["--baseline", baselinePath, "--measurement", measurementPath]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("quickstart median=50ms (threshold=100ms, p95=1400ms)");
  });

  it("retries measured runs before failing so transient cold-start noise does not block the guard", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cold-baseline-"));
    const baselinePath = await writeJson(root, "baseline.json", {
      schema_version: 2,
      mode: "cli_cold_path_v1",
      metric: "median_ms",
      commands: [
        {
          id: "quickstart",
          max_median_ms: 10_000,
          expected_exit_code: 0,
        },
      ],
    });
    const { cliPath, counterPath } = await writeFakeCli(root, {
      slowInvocations: 0,
      slowMs: 1,
      fastMs: 1,
      failInvocations: 5,
    });

    const result = await runScript([
      "--baseline",
      baselinePath,
      "--cli",
      cliPath,
      "--root",
      root,
      "--runs",
      "1",
      "--attempts",
      "2",
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("CLI cold-start baseline OK after retry 2/2");
    expect(await readFile(counterPath, "utf8")).toBe("10\n");
  });
});
