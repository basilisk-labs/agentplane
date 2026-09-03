import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import { runDirectTaskVerification } from "./direct-task-verification.js";

const TASK_ID = "202607290000-RF10A1";
const roots: string[] = [];
const runProcess = vi.fn();

function command(root: string) {
  return {
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    resolvedProject: { gitRoot: root },
  } as never;
}

async function root(): Promise<string> {
  const value = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-sequence-"));
  roots.push(value);
  return value;
}

afterEach(async () => {
  vi.clearAllMocks();
  await Promise.all(roots.splice(0).map(async (entry) => await rm(entry, { recursive: true })));
});

describe("direct task verification sequences", () => {
  it("runs a safe sequence in order without a shell", async () => {
    const cwd = await root();
    runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "generated", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "fresh", stderr: "" });
    const check = "bun run docs:readme-header:generate && bun run docs:readme-header:check";
    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: [check], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      run_process: runProcess,
    });
    expect(result).toMatchObject({
      status: "passed",
      reason: null,
      checks: [{ command: check, script: null, exit_code: 0, stdout_tail: "generated\nfresh" }],
    });
    expect(runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ command: "bun", args: ["run", "docs:readme-header:generate"] }),
    );
    expect(runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ command: "bun", args: ["run", "docs:readme-header:check"] }),
    );
  });

  it("stops on first failure and shares one timeout budget", async () => {
    const cwd = await root();
    runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "first", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 7, stdout: "", stderr: "second failed" });
    const nowValues = [1000, 1000, 1250, 1250];
    const check = "bun run first && bun run second && bun run should-not-run";
    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: [], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      additional_commands: [{ command: check, timeout_ms: 1000 }],
      additional_only: true,
      run_process: runProcess,
      now: () => nowValues.shift() ?? 1250,
    });
    expect(result).toMatchObject({
      status: "failed",
      reason: `Declared check failed: ${check}`,
      checks: [{ command: check, exit_code: 7 }],
    });
    expect(runProcess).toHaveBeenCalledTimes(2);
    expect(runProcess).toHaveBeenNthCalledWith(1, expect.objectContaining({ timeoutMs: 1000 }));
    expect(runProcess).toHaveBeenNthCalledWith(2, expect.objectContaining({ timeoutMs: 750 }));
  });

  it("rejects malformed or unsafe sequences before execution", async () => {
    for (const check of [
      "bun run first &&",
      "&& bun run second",
      "bun run first && && bun run second",
      "bun run first&&bun run second",
      "bun run first || bun run second",
      "bun run first; bun run second",
      "bun run first & bun run second",
    ]) {
      const cwd = await root();
      const result = await runDirectTaskVerification({
        command: command(cwd),
        task: { verify: [check], task_kind: "code", mutation_scope: "code" } as TaskData,
        task_id: TASK_ID,
        cwd,
        run_process: runProcess,
      });
      expect(result).toMatchObject({
        status: "unsupported",
        reason: `Unsupported declared check: ${check}`,
      });
    }
    expect(runProcess).not.toHaveBeenCalled();
  });

  it("keeps quoted ampersands inside one structured argument", async () => {
    const cwd = await root();
    runProcess.mockResolvedValueOnce({ exitCode: 0, stdout: "1 pass", stderr: "" });
    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun test 'a && b'"], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      run_process: runProcess,
    });
    expect(result.status).toBe("passed");
    expect(runProcess).toHaveBeenCalledOnce();
    expect(runProcess).toHaveBeenCalledWith(
      expect.objectContaining({ command: "bun", args: ["test", "a && b"] }),
    );
  });
});
