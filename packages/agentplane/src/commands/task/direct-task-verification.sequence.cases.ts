import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import * as processRunner from "@agentplaneorg/core/process";
import { defaultConfig } from "../../cli/core-imports.js";

import type { TaskData } from "../../backends/task-backend.js";
import * as runtimeEnv from "../../shared/runtime-env.js";
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

function runNativeVerification(
  cwd: string,
  task: Parameters<typeof runDirectTaskVerification>[0]["task"],
) {
  return runDirectTaskVerification({ command: command(cwd), task, task_id: TASK_ID, cwd });
}

describe("direct task verification sequences", () => {
  it.each(["ap config show", "agentplane config show"])(
    "executes %s through the real repository CLI",
    async (check) => {
      const cwd = await root();
      await processRunner.runProcess({ command: "git", args: ["init", "--quiet"], cwd });
      await mkdir(path.join(cwd, ".agentplane"));
      const config = defaultConfig();
      config.branch.task_prefix = "readonly-cli-fixture";
      await writeFile(path.join(cwd, ".agentplane/config.json"), JSON.stringify(config));
      const result = await runNativeVerification(cwd, { verify: [check] });
      expect(result.status, JSON.stringify(result)).toBe("passed");
      expect(result.checks[0]?.stdout_tail).toContain("readonly-cli-fixture");
      expect(runProcess).not.toHaveBeenCalled();
    },
  );

  it("delivers the heap override to a real child without leaking to the next segment", async () => {
    const cwd = await root();
    const inherited = process.env.NODE_OPTIONS ?? "";
    await writeFile(
      path.join(cwd, "heap.mjs"),
      "console.log(JSON.stringify(process.env.NODE_OPTIONS ?? ''));\n",
    );
    const result = await runNativeVerification(cwd, {
      verify: ["NODE_OPTIONS=--max-old-space-size=512 node heap.mjs && node heap.mjs"],
    });
    expect(result.status, JSON.stringify(result)).toBe("passed");
    expect(result.checks[0]?.stdout_tail.trim().split("\n\n")).toEqual([
      JSON.stringify("--max-old-space-size=512"),
      JSON.stringify(inherited),
    ]);
    expect(process.env.NODE_OPTIONS ?? "").toBe(inherited);
  });

  it.each([
    "NODE_OPTIONS='--max-old-space-size=4096 --import=evil.mjs' node effect.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096 NODE_OPTIONS=--require=evil.cjs node effect.mjs",
    "NODE_OPTIONS=--max-old-space-size=4096 ap config set workflow_mode direct",
    "ap config show --root elsewhere",
  ])("rejects %s before a real subprocess effect", async (check) => {
    const cwd = await root();
    await writeFile(
      path.join(cwd, "effect.mjs"),
      "import {writeFileSync} from 'node:fs'; writeFileSync('effect', 'bad');",
    );
    const result = await runNativeVerification(cwd, { verify: [check] });
    expect(result.status).toBe("unsupported");
    expect(result.checks).toEqual([]);
    await expect(readFile(path.join(cwd, "effect"))).rejects.toMatchObject({ code: "ENOENT" });
  });

  it.each([
    { script: "test:fast", explicitTimeout: undefined, expectedTimeout: 60 * 60_000 },
    { script: "test:fast", explicitTimeout: 1000, expectedTimeout: 1000 },
    { script: "release:prepublish", explicitTimeout: undefined, expectedTimeout: 150 * 60_000 },
    { script: "release:prepublish", explicitTimeout: 1000, expectedTimeout: 1000 },
    { script: "release:prepublish:fast", explicitTimeout: undefined, expectedTimeout: 30 * 60_000 },
  ])(
    "bounds $script with explicit timeout $explicitTimeout",
    async ({ script, explicitTimeout, expectedTimeout }) => {
      const cwd = await root();
      const check = `bun run ${script}`;
      runProcess.mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
      const result = await runDirectTaskVerification({
        command: command(cwd),
        task: { verify: [check], task_kind: "code", mutation_scope: "code" },
        task_id: TASK_ID,
        cwd,
        run_process: runProcess,
        additional_commands: [{ command: check, timeout_ms: explicitTimeout }],
      });
      expect(result.status).toBe("passed");
      expect(runProcess).toHaveBeenCalledOnce();
      expect(runProcess.mock.calls[0]?.[0]).toHaveProperty("timeoutMs", expectedTimeout);
    },
  );

  it("rejects incomplete runtime evidence and succeeds on a fully qualified retry", async () => {
    const cwd = await root();
    const check = "bun run first && bun run second";
    const runtime = runtimeEnv.localRuntimeEvidence("bun", process.env);
    const observation = vi
      .spyOn(runtimeEnv, "localRuntimeEvidence")
      .mockReturnValueOnce({ ...runtime, status: "unavailable", executable_digest: null })
      .mockReturnValueOnce({ ...runtime, status: "unavailable", executable_digest: null });
    runProcess.mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
    const opts = {
      command: command(cwd),
      task: { verify: [check], task_kind: "code", mutation_scope: "code" } as TaskData,
      task_id: TASK_ID,
      cwd,
      run_process: runProcess,
    };
    try {
      expect(await runDirectTaskVerification(opts)).toMatchObject({
        status: "unsupported",
        checks: [{ exit_code: 0, failure_kind: "infrastructure" }],
      });
      expect(runProcess).toHaveBeenCalledOnce();
      runProcess.mockClear();
      expect(await runDirectTaskVerification(opts)).toMatchObject({ status: "passed" });
      expect(runProcess).toHaveBeenCalledTimes(2);
    } finally {
      observation.mockRestore();
    }
  });

  it("isolates heap settings across segments and binds every effective environment", async () => {
    const cwd = await root();
    const inherited = process.env.NODE_OPTIONS;
    runProcess.mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
    const verify = async (size: number) =>
      await runDirectTaskVerification({
        command: command(cwd),
        task: {
          verify: [
            `NODE_OPTIONS=--max-old-space-size=${String(size)} node first.mjs && node second.mjs`,
            "node third.mjs",
          ],
          task_kind: "code",
          mutation_scope: "code",
        },
        task_id: TASK_ID,
        cwd,
        run_process: runProcess,
      });
    const first = await verify(4096);
    expect(first.status).toBe("passed");
    expect(runProcess.mock.calls[0]?.[0]).toHaveProperty(
      "env.NODE_OPTIONS",
      "--max-old-space-size=4096",
    );
    type Invocation = Parameters<
      NonNullable<Parameters<typeof runDirectTaskVerification>[0]["run_process"]>
    >[0];
    const secondInvocation = runProcess.mock.calls[1]?.[0] as Invocation | undefined;
    const thirdInvocation = runProcess.mock.calls[2]?.[0] as Invocation | undefined;
    expect(secondInvocation?.env?.NODE_OPTIONS).toBe(inherited);
    expect(thirdInvocation?.env?.NODE_OPTIONS).toBe(inherited);
    const second = await verify(512);
    expect(second.status).toBe("passed");
    expect(first.checks[0]?.runtime?.environment_digest).not.toBe(
      second.checks[0]?.runtime?.environment_digest,
    );
    expect(first.checks[1]?.runtime).toEqual(second.checks[1]?.runtime);
    expect(process.env.NODE_OPTIONS).toBe(inherited);
  });

  it("runs a safe sequence in order without a shell", async () => {
    const cwd = await root();
    runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "generated", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "fresh", stderr: "" });
    const check = "bun run first && bun run second";
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
      expect.objectContaining({ command: "bun", args: ["run", "first"] }),
    );
    expect(runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ command: "bun", args: ["run", "second"] }),
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
