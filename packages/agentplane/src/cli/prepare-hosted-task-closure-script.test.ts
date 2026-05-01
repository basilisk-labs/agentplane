import { execFile } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import { afterEach, describe, expect, it } from "vitest";

const execFileAsync = promisify(execFile);
const SCRIPT_PATH = path.resolve(process.cwd(), "scripts", "prepare-hosted-task-closure.mjs");

const tempRoots: string[] = [];

async function makeTempRoot() {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-hosted-task-close-"));
  tempRoots.push(root);
  return root;
}

async function writeEventFixture(root: string, payload: Record<string, unknown>) {
  const eventPath = path.join(root, "event.json");
  await writeFile(eventPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  return eventPath;
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

describe("prepare-hosted-task-closure script", () => {
  it("prints help", async () => {
    const result = await runScript(["--help"]);
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain("prepare-hosted-task-closure.mjs");
    expect(result.stdout).toContain("closure_branch");
  });

  it("builds deterministic closure metadata for a merged task PR", async () => {
    const root = await makeTempRoot();
    const eventPath = await writeEventFixture(root, {
      pull_request: {
        merged: true,
        number: 31,
        title: "Runner repository refactor",
        merge_commit_sha: "1234567890abcdef1234567890abcdef12345678",
        head: {
          ref: "task/202603271940-EG3B0C/hosted-closure-automation",
          sha: "abcdef1234567890abcdef1234567890abcdef12",
        },
        base: { ref: "main" },
      },
    });

    const result = await runScript(["--event-json", eventPath]);
    expect(result.exitCode).toBe(0);
    const parsed = JSON.parse(result.stdout) as {
      actionable?: boolean;
      task_id?: string;
      closure_branch?: string;
      merge_sha?: string;
      pr_title?: string;
      pr_body?: string;
    };
    expect(parsed.actionable).toBe(true);
    expect(parsed.task_id).toBe("202603271940-EG3B0C");
    expect(parsed.merge_sha).toBe("1234567890abcdef1234567890abcdef12345678");
    expect(parsed.closure_branch).toBe("task-close/202603271940-EG3B0C/1234567890ab");
    expect(parsed.pr_title).toBe(
      "task-close: Runner repository refactor [202603271940-EG3B0C]",
    );
    expect(parsed.pr_body).toContain("## Source");
    expect(parsed.pr_body).toContain("## Scope");
  });

  it("returns a no-op payload for non-task PR branches", async () => {
    const root = await makeTempRoot();
    const eventPath = await writeEventFixture(root, {
      pull_request: {
        merged: true,
        number: 44,
        merge_commit_sha: "1234567890abcdef1234567890abcdef12345678",
        head: { ref: "docs/presentation-fix" },
        base: { ref: "main" },
      },
    });

    const result = await runScript(["--event-json", eventPath]);
    expect(result.exitCode).toBe(0);
    const parsed = JSON.parse(result.stdout) as { actionable?: boolean; reason?: string };
    expect(parsed.actionable).toBe(false);
    expect(parsed.reason).toContain("source branch is not");
  });
});
