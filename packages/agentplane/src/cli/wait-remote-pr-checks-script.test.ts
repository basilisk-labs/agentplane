import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "wait-remote-pr-checks.mjs");

const tempRoots: string[] = [];
type RunScriptResult = { exitCode: number; stdout: string; stderr: string };
type RunScriptOptions = { env?: Record<string, string> };

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-remote-check-wait-"));
  tempRoots.push(root);
  return root;
}

async function writeExecutable(root: string, relativePath: string, content: string) {
  const target = path.join(root, relativePath);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, `${content}\n`, { encoding: "utf8", mode: 0o755 });
  return target;
}

async function runScript(args: string[], opts: RunScriptOptions = {}): Promise<RunScriptResult> {
  try {
    const result = await execFileAsync(process.execPath, [SCRIPT_PATH, ...args], {
      cwd: process.cwd(),
      env: { ...process.env, ...opts.env },
      maxBuffer: 10 * 1024 * 1024,
    });
    return {
      exitCode: 0,
      stdout: String(result.stdout ?? ""),
      stderr: String(result.stderr ?? ""),
    };
  } catch (error: unknown) {
    const execError = error as {
      code?: number;
      stdout?: string;
      stderr?: string;
    };
    return {
      exitCode: Number.isInteger(execError.code) ? execError.code : 1,
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

describe("wait-remote-pr-checks script", () => {
  it("prints help without invoking gh", async () => {
    const result = await runScript(["--help"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("workflow:wait-remote-checks");
    expect(result.stdout).toContain("gh pr checks");
  });

  it("delegates to gh pr checks and appends required wait flags", async () => {
    const root = await makeTempRoot();
    const argsFile = path.join(root, "gh-args.txt");
    await writeExecutable(
      root,
      "bin/gh",
      [
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        String.raw`printf '%s\n' "$@" > ${JSON.stringify(argsFile)}`,
      ].join("\n"),
    );

    const result = await runScript([], {
      env: { PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}` },
    });

    expect(result.exitCode).toBe(0);
    const argsText = await readFile(argsFile, "utf8");
    const args = argsText.trim().split("\n");
    expect(args).toEqual(["pr", "checks", "--watch", "--required", "--fail-fast"]);
  });

  it("forwards the target and extra gh flags while preserving enforced wait flags", async () => {
    const root = await makeTempRoot();
    const argsFile = path.join(root, "gh-args.txt");
    await writeExecutable(
      root,
      "bin/gh",
      [
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        String.raw`printf '%s\n' "$@" > ${JSON.stringify(argsFile)}`,
      ].join("\n"),
    );

    const result = await runScript(["123", "--repo", "basilisk-labs/agentplane"], {
      env: { PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}` },
    });

    expect(result.exitCode).toBe(0);
    const argsText = await readFile(argsFile, "utf8");
    const args = argsText.trim().split("\n");
    expect(args).toEqual([
      "pr",
      "checks",
      "123",
      "--repo",
      "basilisk-labs/agentplane",
      "--watch",
      "--required",
      "--fail-fast",
    ]);
  });

  it("fails explicitly when gh is missing", async () => {
    const result = await runScript([], {
      env: { PATH: path.join(await makeTempRoot(), "empty-bin") },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Missing required gh CLI");
  });
});
