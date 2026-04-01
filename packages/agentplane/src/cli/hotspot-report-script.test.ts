import { execFile } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "hotspot-report.mjs");
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
    expect(result.stdout).toContain("--runtime-dir");
    expect(result.stdout).toContain("--oversized-lines");
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
      "7",
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
    expect(payload.filters?.oversized_lines).toBe(7);

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
    expect(payload.metrics?.oversized_runtime_modules?.threshold_lines).toBe(7);
    expect(payload.metrics?.oversized_runtime_modules?.modules?.[0]?.file).toBe(
      "src/nested/runtime-b.ts",
    );
    expect(payload.metrics?.oversized_runtime_modules?.modules?.[0]?.lines).toBeGreaterThanOrEqual(
      7,
    );
  });
});
