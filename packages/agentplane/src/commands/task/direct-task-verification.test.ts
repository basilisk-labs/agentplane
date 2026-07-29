import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";

const mocks = vi.hoisted(() => ({ runProcess: vi.fn() }));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));

import { parseDirectTaskCheck, runDirectTaskVerification } from "./direct-task-verification.js";

const TASK_ID = "202607290000-RF10A1";
const roots: string[] = [];

function command(root: string) {
  return {
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    resolvedProject: { gitRoot: root },
  } as never;
}

async function root(): Promise<string> {
  const value = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-verification-"));
  roots.push(value);
  return value;
}

afterEach(async () => {
  vi.clearAllMocks();
  await Promise.all(roots.splice(0).map(async (entry) => await rm(entry, { recursive: true })));
});

describe("direct task verification", () => {
  it("accepts only a structured bun script invocation", () => {
    expect(parseDirectTaskCheck(" bun run test:critical ")).toEqual({ script: "test:critical" });
    expect(parseDirectTaskCheck("bun run test:critical -- --watch")).toBeNull();
    expect(parseDirectTaskCheck("bun run test:critical; rm -rf /tmp/x")).toBeNull();
    expect(parseDirectTaskCheck("npm test")).toBeNull();
  });

  it("runs every declared check without a shell and records durable evidence", async () => {
    const cwd = await root();
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "first ok", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "second ok", stderr: "" });

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run test:critical", "bun run lifecycle:invariants"] },
      task_id: TASK_ID,
      cwd,
    });

    expect(result).toMatchObject({ status: "passed", reason: null });
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ command: "bun", args: ["run", "test:critical"], cwd }),
    );
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ command: "bun", args: ["run", "lifecycle:invariants"], cwd }),
    );
    const artifact = JSON.parse(
      await readFile(path.join(cwd, result.artifact_path), "utf8"),
    ) as unknown;
    expect(artifact).toMatchObject({
      kind: "direct_task_declared_checks",
      task_id: TASK_ID,
      status: "passed",
      checks: [
        { command: "bun run test:critical", exit_code: 0 },
        { command: "bun run lifecycle:invariants", exit_code: 0 },
      ],
    });
  });

  it("adds the fixed docs policy checks to a docs task without trusting agent claims", async () => {
    const cwd = await root();
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "routing ok", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "doctor ok", stderr: "" });

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: [], task_kind: "docs", mutation_scope: "docs" },
      task_id: TASK_ID,
      cwd,
    });

    expect(result).toMatchObject({ status: "passed" });
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        command: "node",
        args: [".agentplane/policy/check-routing.mjs"],
        cwd,
      }),
    );
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        command: process.execPath,
        args: [resolveAgentplaneBinPath(), "doctor"],
        cwd,
      }),
    );
  });

  it("stops at the first failed or unsupported check and still writes the evidence artifact", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 7, stdout: "", stderr: "failed" });

    const failed = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run test:critical", "bun run should-not-run"] },
      task_id: TASK_ID,
      cwd,
    });
    expect(failed).toMatchObject({ status: "failed", checks: [{ exit_code: 7 }] });
    expect(mocks.runProcess).toHaveBeenCalledTimes(1);

    const unsupported = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run test:critical; injected"] },
      task_id: TASK_ID,
      cwd,
    });
    expect(unsupported).toMatchObject({ status: "unsupported", checks: [] });
    expect(mocks.runProcess).toHaveBeenCalledTimes(1);
    expect(
      JSON.parse(await readFile(path.join(cwd, unsupported.artifact_path), "utf8")),
    ).toMatchObject({
      status: "unsupported",
    });
  });
});
