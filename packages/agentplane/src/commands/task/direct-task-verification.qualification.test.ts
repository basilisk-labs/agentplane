import * as processRunner from "@agentplaneorg/core/process";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";

import { runDirectTaskVerification } from "./direct-task-verification.js";

const execFileAsync = promisify(execFile);
const roots: string[] = [];

async function repository(nodeModulesConflict = false) {
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-qualification-"));
  roots.push(root);
  await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
  await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: root });
  await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
  await writeFile(path.join(root, "README.md"), "fixture\n", "utf8");
  await execFileAsync("git", ["add", "README.md"], { cwd: root });
  if (nodeModulesConflict) {
    await writeFile(path.join(root, "node_modules"), "tracked conflict\n", "utf8");
    await execFileAsync("git", ["add", "-f", "node_modules"], { cwd: root });
  }
  await execFileAsync("git", ["commit", "-m", "fixture"], { cwd: root });
  return root;
}

function verify(root: string, check: string, runProcess = vi.fn()) {
  return {
    result: runDirectTaskVerification({
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: root },
      } as never,
      task: { verify: [check] },
      task_id: "202609200000-QUALIFY",
      cwd: root,
      run_process: runProcess,
    }),
    runProcess,
  };
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("release qualification verification", () => {
  it("passes the bounded native full-check deadline and explicit source to local CI", async () => {
    const root = await repository();
    const command = "bun run ci:local:full";
    const runProcess = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
    const result = await runDirectTaskVerification({
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: root },
      } as never,
      task: { verify: [command] },
      task_id: "202609200000-QUALIFY",
      cwd: root,
      run_process: runProcess,
      additional_commands: [{ command, timeout_ms: 600_000 }],
    });
    expect(result.status).toBe("passed");
    expect(runProcess.mock.calls[0]?.[0]).toMatchObject({
      timeoutMs: 600_000,
      env: {
        AGENTPLANE_NATIVE_CHECK_TIMEOUT_MS: "600000",
        AGENTPLANE_NATIVE_CHECK_TIMEOUT_SOURCE: "declared_command",
      },
    });
    const processInput = runProcess.mock.calls[0]?.[0] as { env: NodeJS.ProcessEnv } | undefined;
    expect(Number(processInput?.env.AGENTPLANE_NATIVE_CHECK_DEADLINE_EPOCH_MS)).toBeGreaterThan(
      Date.now() - 600_000,
    );
  });

  it.each([
    { script: "release:ci-check", explicitTimeout: undefined, expectedTimeout: 9_000_000 },
    { script: "release:ci-check", explicitTimeout: 1000, expectedTimeout: 1000 },
    { script: "release:check", explicitTimeout: undefined, expectedTimeout: 1_800_000 },
  ])(
    "executes $script with bounded timeout $expectedTimeout",
    async ({ script, explicitTimeout, expectedTimeout }) => {
      const root = await repository();
      const check = `bun run ${script}`;
      const runProcess = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
      const result = await runDirectTaskVerification({
        command: {
          config: { paths: { workflow_dir: ".agentplane/tasks" } },
          resolvedProject: { gitRoot: root },
        } as never,
        task: { verify: [check] },
        task_id: "202609200000-QUALIFY",
        cwd: root,
        run_process: runProcess,
        ...(explicitTimeout === undefined
          ? {}
          : {
              additional_commands: [{ command: check, timeout_ms: explicitTimeout }],
            }),
      });
      expect(result.status).toBe("passed");
      expect(runProcess).toHaveBeenCalledOnce();
      expect(runProcess.mock.calls[0]?.[0]).toMatchObject({
        command: "bun",
        args: ["run", script],
        cwd: root,
        timeoutMs: expectedTimeout,
      });
    },
  );

  it("recognizes the versioned gate alias and gives it an isolated bounded run", async () => {
    const root = await repository();
    const runProcess = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
    const { result } = verify(root, "bun run e2e:v0.7.1:gate", runProcess);

    await expect(result).resolves.toMatchObject({ status: "passed" });
    const input = runProcess.mock.calls[0]?.[0] as { timeoutMs: number; cwd: string } | undefined;
    expect(input?.timeoutMs).toBe(150 * 60_000);
    expect(input?.cwd).not.toBe(root);
  });

  it("removes the detached checkout after successful qualification", async () => {
    const root = await repository();
    let checkout = "";
    const runProcess = vi.fn(async (input: { cwd: string }) => {
      checkout = input.cwd;
      await expect(readFile(path.join(checkout, ".git"), "utf8")).resolves.toContain("gitdir:");
      return { exitCode: 0, stdout: "ok", stderr: "" };
    });
    const { result } = verify(
      root,
      "node scripts/qualification/run-v0.7.10-release-qualification.mjs --mode audit --profile full",
      runProcess,
    );

    await expect(result).resolves.toMatchObject({ status: "passed" });
    await expect(readFile(path.join(checkout, ".git"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("removes the detached checkout when dependency setup fails", async () => {
    const root = await repository(true);
    const nativeRunProcess = processRunner.runProcess;
    let checkout = "";
    vi.spyOn(processRunner, "runProcess").mockImplementation(async (input) => {
      if (input.command === "git" && input.args.slice(0, 2).join(" ") === "worktree add") {
        checkout = input.args[3]!;
      }
      return nativeRunProcess(input);
    });
    const { result, runProcess } = verify(
      root,
      "node scripts/qualification/run-v0.7.10-release-qualification.mjs --mode audit --profile full",
    );

    await expect(result).resolves.toMatchObject({ status: "failed" });
    await expect(readFile(path.join(checkout, ".git"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect(runProcess).not.toHaveBeenCalled();
  });
});
