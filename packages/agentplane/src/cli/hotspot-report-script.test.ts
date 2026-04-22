import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "hotspot-report.mjs");
const BASELINE_SCRIPT_PATH = path.resolve(
  process.cwd(),
  "scripts",
  "check-oversized-test-baseline.mjs",
);
const tempRoots: string[] = [];

async function makeTempRoot(prefix: string) {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  tempRoots.push(root);
  return root;
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

async function runBaselineScript(args: string[]) {
  try {
    const result = await execFileAsync(process.execPath, [BASELINE_SCRIPT_PATH, ...args], {
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

afterEach(async () => {
  while (tempRoots.length > 0) {
    const root = tempRoots.pop();
    if (!root) continue;
    await rm(root, { recursive: true, force: true });
  }
});

describe("hotspot-report script", () => {
  it("prints help", async () => {
    const result = await runScript(["--help"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("hotspot-report.mjs");
    expect(result.stdout).toContain("--warning-lines");
    expect(result.stdout).toContain("--runtime-dir");
    expect(result.stdout).toContain("--oversized-lines");
    expect(result.stdout).toContain("--oversized-test-lines");
  });

  it("reports deterministic hotspot counts for a fixture runtime tree", async () => {
    const root = await makeTempRoot("agentplane-hotspot-report-");
    const runtimeDir = path.join(root, "src");
    await mkdir(path.join(runtimeDir, "nested"), { recursive: true });

    await writeFile(
      path.join(runtimeDir, "runtime-a.ts"),
      [
        String.raw`process.stdout.write("one\n");`,
        String.raw`process.stdout.write("two\n");`,
        String.raw`process.stderr.write("warn\n");`,
        'if (ctx.backendId !== "local") return;',
        "const useStore = backendIsLocalFileBackend(ctx);",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      path.join(runtimeDir, "nested", "runtime-b.ts"),
      [
        'if (backendId === "redmine") {',
        "  const synced = true;",
        "}",
        "const a = 1;",
        "const b = 2;",
        "const c = 3;",
        "const d = 4;",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      path.join(runtimeDir, "ignored.test.ts"),
      'process.stdout.write("ignore me\\n");\nif (backendId === "redmine") return;\n',
      "utf8",
    );
    await writeFile(
      path.join(runtimeDir, "ignored.test-helpers.ts"),
      Array.from({ length: 20 }, (_, index) => `const helper${index} = ${index};`).join("\n"),
      "utf8",
    );

    const result = await runScript([
      "--root",
      root,
      "--runtime-dir",
      "src",
      "--oversized-lines",
      "6",
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stderr).toBe("");

    const payload = JSON.parse(result.stdout) as {
      mode?: string;
      runtime_dir?: string;
      runtime_file_count?: number;
      filters?: { oversized_lines?: number };
      metrics?: {
        direct_stdio_writes?: {
          total?: number;
          stdout?: number;
          stderr?: number;
          impacted_file_count?: number;
          files?: {
            file?: string;
            stdout_writes?: number;
            stderr_writes?: number;
            total?: number;
          }[];
        };
        backend_type_branches?: {
          total?: number;
          backend_is_local_helper?: number;
          backend_id_local_compares?: number;
          backend_id_redmine_compares?: number;
          impacted_file_count?: number;
          files?: {
            file?: string;
            backend_is_local_helper?: number;
            backend_id_local_compares?: number;
            backend_id_redmine_compares?: number;
            total?: number;
          }[];
        };
        oversized_runtime_modules?: {
          total?: number;
          threshold_lines?: number;
          modules?: { file?: string; lines?: number }[];
        };
      };
    };

    expect(payload.mode).toBe("hotspot_report_v1");
    expect(payload.runtime_dir).toBe("src");
    expect(payload.runtime_file_count).toBe(2);
    expect(payload.filters?.oversized_lines).toBe(6);

    expect(payload.metrics?.direct_stdio_writes).toEqual({
      total: 3,
      stdout: 2,
      stderr: 1,
      impacted_file_count: 1,
      files: [{ file: "src/runtime-a.ts", stdout_writes: 2, stderr_writes: 1, total: 3 }],
    });

    expect(payload.metrics?.backend_type_branches).toEqual({
      total: 3,
      backend_is_local_helper: 1,
      backend_id_local_compares: 1,
      backend_id_redmine_compares: 1,
      impacted_file_count: 2,
      files: [
        {
          file: "src/runtime-a.ts",
          backend_is_local_helper: 1,
          backend_id_local_compares: 1,
          backend_id_redmine_compares: 0,
          total: 2,
        },
        {
          file: "src/nested/runtime-b.ts",
          backend_is_local_helper: 0,
          backend_id_local_compares: 0,
          backend_id_redmine_compares: 1,
          total: 1,
        },
      ],
    });

    expect(payload.metrics?.oversized_runtime_modules?.total).toBe(1);
    expect(payload.metrics?.oversized_runtime_modules?.threshold_lines).toBe(6);
    expect(payload.metrics?.oversized_runtime_modules?.modules?.[0]?.file).toBe(
      "src/nested/runtime-b.ts",
    );
    expect(payload.metrics?.oversized_runtime_modules?.modules?.[0]?.lines).toBeGreaterThanOrEqual(
      7,
    );
  });

  it("fails check mode when an oversized module is not allowlisted", async () => {
    const root = await makeTempRoot("agentplane-hotspot-check-");
    const runtimeDir = path.join(root, "src");
    await mkdir(runtimeDir, { recursive: true });
    await writeFile(
      path.join(runtimeDir, "too-big.ts"),
      Array.from({ length: 8 }, (_, index) => `const value${index} = ${index};`).join("\n"),
      "utf8",
    );

    const result = await runScript([
      "--root",
      root,
      "--runtime-dir",
      "src",
      "--oversized-lines",
      "6",
      "--check",
    ]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Hotspot threshold failed");
    expect(result.stderr).toContain("src/too-big.ts");
  });

  it("passes check mode when oversized modules are explicitly allowlisted", async () => {
    const root = await makeTempRoot("agentplane-hotspot-check-");
    const runtimeDir = path.join(root, "src");
    await mkdir(runtimeDir, { recursive: true });
    await writeFile(
      path.join(runtimeDir, "temporary-exception.ts"),
      Array.from({ length: 8 }, (_, index) => `const value${index} = ${index};`).join("\n"),
      "utf8",
    );

    const result = await runScript([
      "--root",
      root,
      "--runtime-dir",
      "src",
      "--oversized-lines",
      "6",
      "--check",
      "--allow-oversized",
      "src/temporary-exception.ts",
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Hotspot threshold check passed");
    expect(result.stderr).toBe("");
  });

  it("emits warning output without failing when runtime modules are between warning and error thresholds", async () => {
    const root = await makeTempRoot("agentplane-hotspot-warning-");
    const runtimeDir = path.join(root, "src");
    await mkdir(runtimeDir, { recursive: true });
    await writeFile(
      path.join(runtimeDir, "warn-only.ts"),
      Array.from({ length: 5 }, (_, index) => `const value${index} = ${index};`).join("\n"),
      "utf8",
    );

    const result = await runScript([
      "--root",
      root,
      "--runtime-dir",
      "src",
      "--warning-lines",
      "4",
      "--oversized-lines",
      "6",
      "--check",
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Hotspot warning");
    expect(result.stderr).toBe("");
  });

  it("fails check mode when oversized test files exceed the configured threshold", async () => {
    const root = await makeTempRoot("agentplane-hotspot-test-threshold-");
    const runtimeDir = path.join(root, "src");
    const testDir = path.join(root, "tests");
    await mkdir(runtimeDir, { recursive: true });
    await mkdir(testDir, { recursive: true });
    await writeFile(path.join(runtimeDir, "ok.ts"), "const value = 1;\n", "utf8");
    await writeFile(
      path.join(testDir, "too-large.test.ts"),
      Array.from({ length: 12 }, (_, index) => `const testValue${index} = ${index};`).join("\n"),
      "utf8",
    );

    const result = await runScript([
      "--root",
      root,
      "--runtime-dir",
      "src",
      "--test-dir",
      "tests",
      "--test-warning-lines",
      "6",
      "--oversized-test-lines",
      "10",
      "--check",
    ]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Oversized test threshold failed");
    expect(result.stderr).toContain("tests/too-large.test.ts");
  });

  it("passes oversized test baseline when current files are within baseline", async () => {
    const root = await makeTempRoot("agentplane-hotspot-test-baseline-");
    await mkdir(path.join(root, "packages", "agentplane", "src"), { recursive: true });
    await mkdir(path.join(root, "packages", "example", "src"), { recursive: true });
    await writeFile(path.join(root, "packages", "agentplane", "src", "ok.ts"), "const ok = 1;\n");
    await writeFile(
      path.join(root, "packages", "example", "src", "large.test.ts"),
      Array.from({ length: 5 }, (_, index) => `const testValue${index} = ${index};`).join("\n"),
    );
    const baselinePath = path.join(root, "baseline.json");
    await writeFile(
      baselinePath,
      JSON.stringify(
        {
          schema_version: 1,
          threshold_lines: 3,
          entries: [{ file: "packages/example/src/large.test.ts", lines: 5 }],
        },
        null,
        2,
      ),
    );

    const result = await runBaselineScript([
      "--root",
      root,
      "--baseline",
      baselinePath,
      "--threshold-lines",
      "3",
    ]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("Oversized test baseline OK");
    expect(result.stderr).toBe("");
  });

  it("fails oversized test baseline on new or grown oversized tests", async () => {
    const root = await makeTempRoot("agentplane-hotspot-test-baseline-");
    await mkdir(path.join(root, "packages", "agentplane", "src"), { recursive: true });
    await mkdir(path.join(root, "packages", "example", "src"), { recursive: true });
    await writeFile(path.join(root, "packages", "agentplane", "src", "ok.ts"), "const ok = 1;\n");
    await writeFile(
      path.join(root, "packages", "example", "src", "large.test.ts"),
      Array.from({ length: 6 }, (_, index) => `const testValue${index} = ${index};`).join("\n"),
    );
    await writeFile(
      path.join(root, "packages", "example", "src", "new-large.test.ts"),
      Array.from({ length: 5 }, (_, index) => `const newValue${index} = ${index};`).join("\n"),
    );
    const baselinePath = path.join(root, "baseline.json");
    await writeFile(
      baselinePath,
      JSON.stringify(
        {
          schema_version: 1,
          threshold_lines: 3,
          entries: [{ file: "packages/example/src/large.test.ts", lines: 5 }],
        },
        null,
        2,
      ),
    );

    const result = await runBaselineScript([
      "--root",
      root,
      "--baseline",
      baselinePath,
      "--threshold-lines",
      "3",
    ]);

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Oversized test baseline failed");
    expect(result.stderr).toContain(
      "Oversized test grew beyond baseline: packages/example/src/large.test.ts",
    );
    expect(result.stderr).toContain(
      "New oversized test without baseline: packages/example/src/new-large.test.ts",
    );
  });
});
