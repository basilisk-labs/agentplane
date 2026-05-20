import { execFile } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "check-github-protection-contract.mjs");

const tempRoots: string[] = [];
type RunScriptResult = { exitCode: number; stdout: string; stderr: string };
type RunScriptOptions = { env?: Record<string, string> };

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-github-protection-"));
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

describe("check-github-protection-contract script", () => {
  it("prints help without invoking gh", async () => {
    const result = await runScript(["--help"]);

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("workflow:github-protection:check");
    expect(result.stdout).toContain("expected GitHub Actions");
  });

  it("passes when protection uses the canonical GitHub Actions checks with app bindings", async () => {
    const root = await makeTempRoot();
    const argsFile = path.join(root, "gh-args.txt");
    const payload = JSON.stringify({
      required_status_checks: {
        strict: true,
        contexts: ["Core CI / PR verification", "Docs CI / docs"],
        checks: [
          { context: "Core CI / PR verification", app_id: 15_368 },
          { context: "Docs CI / docs", app_id: 15_368 },
        ],
      },
    });
    await writeExecutable(
      root,
      "bin/gh",
      [
        "#!/usr/bin/env bash",
        "set -euo pipefail",
        String.raw`printf '%s\n' "$@" > ${JSON.stringify(argsFile)}`,
        String.raw`printf '%s\n' ${JSON.stringify(payload)}`,
      ].join("\n"),
    );

    const result = await runScript([], {
      env: { PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}` },
    });

    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("GitHub protection contract OK");
    const argsText = await readFile(argsFile, "utf8");
    const args = argsText.trim().split("\n");
    expect(args).toEqual(["api", "repos/basilisk-labs/agentplane/branches/main/protection"]);
  });

  it("fails when required checks are present but app bindings are missing", async () => {
    const root = await makeTempRoot();
    const payload = JSON.stringify({
      required_status_checks: {
        strict: true,
        contexts: ["Core CI / PR verification", "Docs CI / docs"],
        checks: [
          { context: "Core CI / PR verification", app_id: null },
          { context: "Docs CI / docs", app_id: null },
        ],
      },
    });
    await writeExecutable(
      root,
      "bin/gh",
      [
        `#!/usr/bin/env bash`,
        "set -euo pipefail",
        String.raw`printf '%s\n' ${JSON.stringify(payload)}`,
      ].join("\n"),
    );

    const result = await runScript([], {
      env: { PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}` },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("app_id=null");
  });

  it("fails when the required check set drifts from the canonical gate", async () => {
    const root = await makeTempRoot();
    const payload = JSON.stringify({
      required_status_checks: {
        strict: true,
        contexts: ["Core CI / test", "Docs CI / docs"],
        checks: [
          { context: "Core CI / test", app_id: 15_368 },
          { context: "Docs CI / docs", app_id: 15_368 },
        ],
      },
    });
    await writeExecutable(
      root,
      "bin/gh",
      [
        `#!/usr/bin/env bash`,
        "set -euo pipefail",
        String.raw`printf '%s\n' ${JSON.stringify(payload)}`,
      ].join("\n"),
    );

    const result = await runScript([], {
      env: { PATH: `${path.join(root, "bin")}:${process.env.PATH ?? ""}` },
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toContain("Missing required checks: Core CI / PR verification");
  });
});
