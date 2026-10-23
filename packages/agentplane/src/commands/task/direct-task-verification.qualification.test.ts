import * as processRunner from "@agentplaneorg/core/process";
import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
  await writeFile(path.join(root, ".gitignore"), "node_modules\n", "utf8");
  await execFileAsync("git", ["add", "README.md", ".gitignore"], { cwd: root });
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

beforeEach(() => {
  vi.stubEnv("AGENTPLANE_TASK_CHECK_TIMEOUT_MS", undefined);
});

afterEach(async () => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  await Promise.all(roots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe("release qualification verification", () => {
  it("uses an explicit finite task timeout for canonical command-only checks", async () => {
    vi.stubEnv("AGENTPLANE_TASK_CHECK_TIMEOUT_MS", "7200000");
    const root = await repository();
    const runProcess = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
    const result = await runDirectTaskVerification({
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: root },
      } as never,
      task: { verify: [] },
      task_id: "202609200000-QUALIFY",
      cwd: root,
      additional_only: true,
      additional_commands: [{ command: "bun run test:project agentplane -- example.test.ts" }],
      run_process: runProcess,
    });
    expect(result.status).toBe("passed");
    expect(runProcess.mock.calls[0]?.[0]).toMatchObject({ timeoutMs: 7_200_000 });
    const invocation = runProcess.mock.calls[0]?.[0] as { env: NodeJS.ProcessEnv } | undefined;
    expect(invocation?.env).not.toHaveProperty("AGENTPLANE_TASK_CHECK_TIMEOUT_MS");
  });

  it("fails invalid profiles before invoking a process", async () => {
    const root = await repository();
    vi.stubEnv("AGENTPLANE_TASK_CHECK_TIMEOUT_MS", "0");
    const { result, runProcess } = verify(root, "bun run test:project agentplane");
    await expect(result).rejects.toThrow("1 to 86400000");
    expect(runProcess).not.toHaveBeenCalled();
  });

  it("shares the operator deadline across a declared command sequence", async () => {
    const root = await repository();
    vi.stubEnv("AGENTPLANE_TASK_CHECK_TIMEOUT_MS", "1000");
    let now = 0;
    const runProcess = vi.fn((_input: { timeoutMs?: number }) => {
      now += 700;
      return Promise.resolve({ exitCode: 0, stdout: "ok", stderr: "" });
    });
    const result = await runDirectTaskVerification({
      command: {
        config: { paths: { workflow_dir: ".agentplane/tasks" } },
        resolvedProject: { gitRoot: root },
      } as never,
      task: { verify: ["bun run typecheck && bun run lint && bun run format:check"] },
      task_id: "202609200000-QUALIFY",
      cwd: root,
      run_process: runProcess,
      now: () => now,
    });
    expect(result.status).toBe("failed");
    expect(runProcess).toHaveBeenCalledTimes(2);
    expect(runProcess.mock.calls.map(([input]) => input.timeoutMs)).toEqual([1000, 300]);
    expect(JSON.stringify(result)).toContain("exhausted");
  });

  it("passes the bounded native full-check deadline and explicit source to local CI", async () => {
    vi.stubEnv("AGENTPLANE_TASK_CHECK_TIMEOUT_MS", "7200000");
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
    { script: "ci:local:full", explicitTimeout: undefined, expectedTimeout: 9_000_000 },
    { script: "ci:local:full", explicitTimeout: 1000, expectedTimeout: 1000 },
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
        timeoutMs: expectedTimeout,
      });
      const processInput = runProcess.mock.calls[0]?.[0] as { cwd: string } | undefined;
      const actualCwd = processInput?.cwd;
      if (script === "ci:local:full") expect(actualCwd).not.toBe(root);
      else expect(actualCwd).toBe(root);
    },
  );

  it("runs local full CI on committed HEAD without changing original dirty files or staged metadata", async () => {
    const root = await repository();
    const { stdout: head } = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    await mkdir(path.join(root, "node_modules"));
    const report = path.join(root, ".arkady", "historical-report.json");
    const metadata = path.join(root, ".agentplane/tasks/202609200000-QUALIFY/pr/meta.json");
    await mkdir(path.dirname(report), { recursive: true });
    await mkdir(path.dirname(metadata), { recursive: true });
    await writeFile(report, '{"historical":true}\n', "utf8");
    await writeFile(metadata, '{"staged":true}\n', "utf8");
    await writeFile(path.join(root, "README.md"), "dirty original\n", "utf8");
    await execFileAsync("git", ["add", metadata], { cwd: root });
    const { stdout: status } = await execFileAsync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all"],
      {
        cwd: root,
      },
    );
    const index = await readFile(path.join(root, ".git/index"));
    const reportBytes = await readFile(report);
    const metadataBytes = await readFile(metadata);
    const { mode: reportMode } = await stat(report);
    const { mode: metadataMode } = await stat(metadata);
    let checkout = "";
    const runProcess = vi.fn(async (input: { cwd: string }) => {
      checkout = input.cwd;
      expect(checkout).not.toBe(root);
      const current = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: checkout });
      expect(current.stdout).toBe(head);
      const clean = await execFileAsync(
        "git",
        ["status", "--porcelain=v1", "--untracked-files=all"],
        { cwd: checkout },
      );
      expect(clean.stdout).toBe("");
      const borrowedModules = await stat(path.join(checkout, "node_modules"));
      expect(borrowedModules.isDirectory()).toBe(true);
      await expect(stat(path.join(checkout, "packages"))).rejects.toMatchObject({ code: "ENOENT" });
      await expect(readFile(path.join(checkout, "README.md"), "utf8")).resolves.toBe("fixture\n");
      await expect(
        readFile(path.join(checkout, ".arkady/historical-report.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
      await expect(
        readFile(path.join(checkout, ".agentplane/tasks/202609200000-QUALIFY/pr/meta.json")),
      ).rejects.toMatchObject({ code: "ENOENT" });
      return { exitCode: 0, stdout: "ok", stderr: "" };
    });
    const { result } = verify(root, "bun run ci:local:full", runProcess);
    const completed = await result;
    expect(completed.status).toBe("passed");
    expect(completed.checks[0]?.observation?.status).toBe("retained");
    const observation = completed.checks[0]!.observation!.manifest_path!;
    const observationRoot = `${path.relative(root, path.dirname(observation))}/`;
    expect(await readFile(report)).toEqual(reportBytes);
    expect(await readFile(metadata)).toEqual(metadataBytes);
    const { mode: currentReportMode } = await stat(report);
    const { mode: currentMetadataMode } = await stat(metadata);
    expect(currentReportMode).toBe(reportMode);
    expect(currentMetadataMode).toBe(metadataMode);
    expect(await readFile(path.join(root, "README.md"), "utf8")).toBe("dirty original\n");
    expect(await readFile(path.join(root, ".git/index"))).toEqual(index);
    const after = await execFileAsync(
      "git",
      ["status", "--porcelain=v1", "--untracked-files=all"],
      { cwd: root },
    );
    const preserved = after.stdout
      .split("\n")
      .filter(
        (line) =>
          line !== `?? ${completed.artifact_path}` && !line.startsWith(`?? ${observationRoot}`),
      )
      .join("\n");
    expect(preserved).toBe(status);
    await expect(readFile(path.join(checkout, ".git"))).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("recognizes the versioned gate alias and gives it an isolated bounded run", async () => {
    const root = await repository();
    const runProcess = vi.fn().mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });
    const { result } = verify(root, "bun run e2e:v0.7.1:gate", runProcess);

    await expect(result).resolves.toMatchObject({ status: "passed" });
    const input = runProcess.mock.calls[0]?.[0] as { timeoutMs: number; cwd: string } | undefined;
    expect(input?.timeoutMs).toBe(150 * 60_000);
    expect(input?.cwd).not.toBe(root);
  });

  it.each([
    "bun run ci:local:full",
    "node scripts/qualification/run-v0.7.10-release-qualification.mjs --mode audit --profile full",
  ])("removes the detached checkout after successful %s", async (command) => {
    const root = await repository();
    const recipeDependency = "packages/recipes/node_modules/zod/index.js";
    await mkdir(path.dirname(path.join(root, recipeDependency)), { recursive: true });
    await writeFile(path.join(root, recipeDependency), "fixture dependency\n", "utf8");
    let checkout = "";
    const runProcess = vi.fn(async (input: { cwd: string }) => {
      checkout = input.cwd;
      await expect(readFile(path.join(checkout, ".git"), "utf8")).resolves.toContain("gitdir:");
      await expect(readFile(path.join(checkout, recipeDependency), "utf8")).resolves.toBe(
        "fixture dependency\n",
      );
      return { exitCode: 0, stdout: "ok", stderr: "" };
    });
    const { result } = verify(root, command, runProcess);

    await expect(result).resolves.toMatchObject({ status: "passed" });
    await expect(readFile(path.join(checkout, ".git"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it.each([
    "bun run ci:local:full",
    "node scripts/qualification/run-v0.7.10-release-qualification.mjs --mode audit --profile full",
  ])("removes the detached checkout when dependency setup fails for %s", async (command) => {
    const root = await repository(true);
    const nativeRunProcess = processRunner.runProcess;
    let checkout = "";
    vi.spyOn(processRunner, "runProcess").mockImplementation(async (input) => {
      if (input.command === "git" && input.args.slice(0, 2).join(" ") === "worktree add") {
        checkout = input.args[3]!;
      }
      return nativeRunProcess(input);
    });
    const { result, runProcess } = verify(root, command);

    await expect(result).resolves.toMatchObject({ status: "failed" });
    await expect(readFile(path.join(checkout, ".git"), "utf8")).rejects.toMatchObject({
      code: "ENOENT",
    });
    expect(runProcess).not.toHaveBeenCalled();
  });
});
