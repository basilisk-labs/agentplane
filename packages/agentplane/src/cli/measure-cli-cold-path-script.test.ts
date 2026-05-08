import { execFile } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";
import { captureStdIO, mkGitRepoRoot, writeDefaultConfig } from "@agentplane/testkit";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "measure-cli-cold-path.mjs");

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

describe("measure-cli-cold-path script", () => {
  it("prints help", async () => {
    const result = await runScript(["--help"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("measure-cli-cold-path.mjs");
    expect(result.stdout).toContain("agentplane quickstart");
    expect(result.stdout).toContain("agentplane task search task");
    expect(result.stdout).toContain("agentplane task next");
    expect(result.stdout).toContain("agentplane preflight --mode quick");
  });

  it(
    "measures quickstart, task list/search/next, and preflight quick in one payload",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRoot();
      await writeDefaultConfig(root);
      {
        const io = captureStdIO();
        try {
          expect(
            await runCli([
              "task",
              "new",
              "--title",
              "Cold path benchmark task",
              "--description",
              "Seed one ready task so task next benchmarks the success path.",
              "--owner",
              "CODER",
              "--tag",
              "docs",
              "--root",
              root,
            ]),
          ).toBe(0);
          expect(io.stdout.trim()).toMatch(/^\d{12}-[A-Z0-9]{6}$/);
        } finally {
          io.restore();
        }
      }

      const result = await runScript(["--root", root, "--runs", "1", "--warmups", "0"]);

      expect(result.stderr).toBe("");
      const payload = JSON.parse(result.stdout) as {
        mode?: string;
        root?: string;
        cli_path?: string;
        cli_repo_root?: string;
        runs?: number;
        warmups?: number;
        commands?: {
          id?: string;
          argv?: string[];
          runs?: number;
          warmups?: number;
          durations_ms?: number[];
          avg_ms?: number;
          median_ms?: number;
          min_ms?: number;
          max_ms?: number;
          p95_ms?: number;
          exit_code?: number;
          stdout_preview?: string;
          stderr_preview?: string;
        }[];
      };

      expect(payload.mode).toBe("cli_cold_path_v1");
      expect(payload.root).toBe(root);
      expect(payload.cli_path).toBe(
        SCRIPT_PATH.replace(
          "scripts/measure-cli-cold-path.mjs",
          "packages/agentplane/bin/agentplane.js",
        ),
      );
      expect(payload.cli_repo_root).toBe(process.cwd());
      expect(payload.runs).toBe(1);
      expect(payload.warmups).toBe(0);
      expect(payload.commands?.map((command) => command.id)).toEqual([
        "quickstart",
        "task_list",
        "task_search",
        "task_next",
        "preflight_quick",
      ]);

      const commandMap = new Map((payload.commands ?? []).map((command) => [command.id, command]));
      expect(commandMap.get("quickstart")?.exit_code).toBe(0);
      expect(commandMap.get("task_list")?.exit_code).toBe(0);
      expect(commandMap.get("task_search")?.exit_code).toBe(0);
      expect(commandMap.get("preflight_quick")?.exit_code).toBe(0);
      expect([0, 1]).toContain(commandMap.get("task_next")?.exit_code);
      expect(result.exitCode).toBe(commandMap.get("task_next")?.exit_code === 0 ? 0 : 1);

      for (const command of payload.commands ?? []) {
        expect(command.runs).toBe(1);
        expect(command.warmups).toBe(0);
        expect(command.durations_ms).toHaveLength(1);
        expect(command.durations_ms?.[0]).toBeGreaterThan(0);
        expect(command.avg_ms).toBeGreaterThan(0);
        expect(command.median_ms).toBeGreaterThan(0);
        expect(command.min_ms).toBeGreaterThan(0);
        expect(command.max_ms).toBeGreaterThan(0);
        expect(command.p95_ms).toBeGreaterThan(0);
        expect(command.argv?.at(-2)).toBe("--root");
        expect(command.argv?.at(-1)).toBe(root);
        if (command.id !== "task_next") {
          expect(command.exit_code).toBe(0);
        }
      }
    },
  );
});
