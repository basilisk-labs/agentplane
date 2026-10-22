import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import { assertHookRunnerReady, renderHookShimScript } from "../shared/hook-shim-template.js";

import { LocalBackend } from "../../backends/task-backend.js";
import { materializeHookShimForWorktree } from "./work-start.hook-shim.js";
import {
  materializeActiveTaskArtifactsForWorktree,
  materializeLocalBackendReadmesForWorktree,
} from "./work-start.materialize.js";

const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";
const execFileNodeAsync = promisify(execFile);

describe("worktree hook shim", () => {
  it("resolves relative PATH entries from the hook checkout", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-relative-hook-path-"));
    const shimPath = path.join(root, ".agentplane/bin/agentplane");
    const runner = path.join(root, "runner.js");
    await mkdir(path.dirname(shimPath), { recursive: true });
    await mkdir(path.join(root, "tools"));
    await writeFile(path.join(root, "tools/node"), "#!/bin/sh\nexit 0\n", { mode: 0o755 });
    await writeFile(runner, "process.exit(0);\n");
    await writeFile(shimPath, renderHookShimScript(runner));
    vi.stubEnv("PATH", "tools");
    vi.stubEnv("AGENTPLANE_HOOK_RUNNER", "");
    try {
      await expect(assertHookRunnerReady(root)).resolves.toBeUndefined();
    } finally {
      vi.unstubAllEnvs();
    }
  });
  it.each(["node", "global"])("rejects unavailable %s before staging", async (mode) => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-missing-command-"));
    const shimPath = path.join(root, ".agentplane/bin/agentplane");
    const runner = path.join(root, "runner.js");
    await mkdir(path.dirname(shimPath), { recursive: true });
    await writeFile(runner, "process.exit(0);\n");
    await writeFile(
      shimPath,
      renderHookShimScript(mode === "node" ? runner : "/removed/runner.js"),
    );
    vi.stubEnv("PATH", root);
    vi.stubEnv(ACTIVE_BIN_ENV, "");
    vi.stubEnv("AGENTPLANE_HOOK_RUNNER", "");
    vi.stubEnv("AGENTPLANE_HOOK_ALLOW_GLOBAL", mode === "global" ? "1" : "0");
    try {
      await expect(assertHookRunnerReady(root)).rejects.toMatchObject({
        context: { reason_code: "hook_runner_unavailable" },
      });
    } finally {
      vi.unstubAllEnvs();
    }
  });
  it.each(["active", "explicit", "missing"] as const)(
    "handles a relocated installation with %s runner without disabling hooks",
    async (mode) => {
      const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-relocated-shim-"));
      const activeBin = path.join(root, "active runtime", "agentplane.js");
      const explicitBin = path.join(root, "explicit.js");
      const shimPath = path.join(root, ".agentplane/bin/agentplane");
      await mkdir(path.dirname(activeBin), { recursive: true });
      await mkdir(path.dirname(shimPath), { recursive: true });
      await writeFile(
        activeBin,
        'console.log("active:" + process.argv.slice(2).join(" ")); process.exit(23);\n',
      );
      await writeFile(
        explicitBin,
        'console.log("explicit:" + process.argv.slice(2).join(" ")); process.exit(24);\n',
      );
      await writeFile(
        shimPath,
        renderHookShimScript(path.join(root, "removed install", "agentplane.js")),
        { mode: 0o755 },
      );
      vi.stubEnv(ACTIVE_BIN_ENV, mode === "missing" ? "" : activeBin);
      vi.stubEnv("AGENTPLANE_HOOK_RUNNER", mode === "explicit" ? explicitBin : "");
      vi.stubEnv("AGENTPLANE_HOOK_ALLOW_GLOBAL", "0");
      try {
        if (mode === "missing") {
          await expect(assertHookRunnerReady(root)).rejects.toMatchObject({
            code: "E_VALIDATION",
            context: { reason_code: "hook_runner_unavailable", recovery_cwd: root },
          });
        } else {
          await expect(assertHookRunnerReady(root)).resolves.toBeUndefined();
        }
        await expect(
          execFileNodeAsync(shimPath, ["hooks", "run", "pre-commit"], {
            cwd: root,
            env: { ...process.env },
            timeout: 5000,
          }),
        ).rejects.toMatchObject(
          mode === "missing"
            ? { code: 127 }
            : { code: mode === "active" ? 23 : 24, stdout: `${mode}:hooks run pre-commit\n` },
        );
      } finally {
        vi.unstubAllEnvs();
      }
    },
  );

  it("offers repair for an old shim before changing the Git index", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-old-shim-"));
    await execFileNodeAsync("git", ["init", "-q"], { cwd: root });
    await writeFile(path.join(root, "user.txt"), "user content\n");
    await execFileNodeAsync("git", ["add", "user.txt"], { cwd: root });
    const indexPath = path.join(root, ".git/index");
    const before = await readFile(indexPath);
    const activeBin = path.join(root, "active.js");
    await writeFile(activeBin, "process.exit(0);\n");
    const shimPath = path.join(root, ".agentplane/bin/agentplane");
    await mkdir(path.dirname(shimPath), { recursive: true });
    await writeFile(shimPath, "# agentplane-hook-shim\nINSTALL_BIN='/removed/agentplane.js'\n");
    vi.stubEnv(ACTIVE_BIN_ENV, activeBin);
    vi.stubEnv("AGENTPLANE_HOOK_RUNNER", "");
    vi.stubEnv("AGENTPLANE_HOOK_ALLOW_GLOBAL", "0");
    try {
      await expect(assertHookRunnerReady(root)).rejects.toMatchObject({
        context: { recovery_argv: ["agentplane", "hooks", "install", "--root", root] },
      });
      expect(await readFile(indexPath)).toEqual(before);
      vi.stubEnv("AGENTPLANE_HOOK_RUNNER", activeBin);
      await expect(assertHookRunnerReady(root)).resolves.toBeUndefined();
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("materializes a shim with the active installed runner before PATH fallback", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-"));
    const worktreePath = path.join(root, "worktree");
    const activeBin = path.join(root, "installed agentplane", "bin", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(activeBin), { recursive: true });
    await writeFile(activeBin, "process.exit(0);\n", "utf8");
    process.env[ACTIVE_BIN_ENV] = activeBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shim = await readFile(
      path.join(worktreePath, ".agentplane", "bin", "agentplane"),
      "utf8",
    );
    expect(shim).toContain("agentplane-hook-shim");
    expect(shim).toContain(`INSTALL_BIN='${activeBin}'`);
    expect(shim).toContain("AGENTPLANE_HOOK_RUNNER");
    expect(shim).toContain("AGENTPLANE_HOOK_ALLOW_GLOBAL");
  });

  it("bounds raw shim runner hangs with actionable diagnostics", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-timeout-"));
    const worktreePath = path.join(root, "worktree");
    const activeBin = path.join(root, "installed agentplane", "bin", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(activeBin), { recursive: true });
    await writeFile(activeBin, "setInterval(() => {}, 1000);\n", "utf8");
    process.env[ACTIVE_BIN_ENV] = activeBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
    let stderr = "";
    try {
      await execFileNodeAsync(shimPath, ["hooks", "run", "pre-commit"], {
        cwd: worktreePath,
        env: { ...process.env, AGENTPLANE_HOOK_SHIM_TIMEOUT_SECONDS: "1" },
        timeout: 5000,
      });
    } catch (err) {
      const rawStderr = (err as { stderr?: unknown }).stderr;
      stderr =
        typeof rawStderr === "string"
          ? rawStderr
          : Buffer.isBuffer(rawStderr)
            ? rawStderr.toString("utf8")
            : "";
    }
    expect(stderr).toContain("reason_code=hook_shim_timeout");
    expect(stderr).not.toContain("reason_code=hook_runner_signal");
  }, 10_000);

  it("normalizes killed runner exits into actionable diagnostics", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-signal-"));
    const worktreePath = path.join(root, "worktree");
    const activeBin = path.join(root, "installed agentplane", "bin", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(activeBin), { recursive: true });
    await writeFile(activeBin, "process.kill(process.pid, 'SIGKILL');\n", "utf8");
    process.env[ACTIVE_BIN_ENV] = activeBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
    let exitCode: number | null = null;
    let signal: string | null = null;
    let stderr = "";
    try {
      await execFileNodeAsync(shimPath, ["hooks", "run", "pre-commit"], {
        cwd: worktreePath,
        timeout: 5000,
      });
    } catch (err) {
      exitCode = (err as { code?: number | null }).code ?? null;
      signal = (err as { signal?: string | null }).signal ?? null;
      const rawStderr = (err as { stderr?: unknown }).stderr;
      stderr =
        typeof rawStderr === "string"
          ? rawStderr
          : Buffer.isBuffer(rawStderr)
            ? rawStderr.toString("utf8")
            : "";
    }
    expect(exitCode).toBe(1);
    expect(signal).toBeNull();
    expect(stderr).toContain("terminated by signal 9");
    expect(stderr).toContain("reason_code=hook_runner_signal");
  }, 10_000);

  it("preserves hook stdin when the runner is watched in the background", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-stdin-"));
    const worktreePath = path.join(root, "worktree");
    const activeBin = path.join(root, "installed agentplane", "bin", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(activeBin), { recursive: true });
    await writeFile(activeBin, "process.stdin.pipe(process.stdout);\n", "utf8");
    process.env[ACTIVE_BIN_ENV] = activeBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
    const hookInput = "refs/heads/main 1111111 refs/heads/main 2222222\n";
    const { stdout } = await execFileNodeAsync(
      "sh",
      ["-c", 'printf "%s" "$HOOK_INPUT" | "$1" hooks run pre-push', "sh", shimPath],
      {
        cwd: worktreePath,
        env: { ...process.env, HOOK_INPUT: hookInput },
      },
    );
    expect(stdout).toBe(hookInput);
  });
});

describe("worktree task artifact materialization", () => {
  it("copies the active task artifact directory into the task worktree", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-task-"));
    const worktreePath = path.join(root, "worktree");
    const taskRoot = path.join(root, ".agentplane", "tasks", "T-1");
    await mkdir(path.join(taskRoot, "blueprint"), { recursive: true });
    await writeFile(path.join(taskRoot, "README.md"), "task readme\n", "utf8");
    await writeFile(path.join(taskRoot, "blueprint", "resolved-snapshot.json"), "{}\n", "utf8");

    await expect(
      materializeActiveTaskArtifactsForWorktree({
        repoRoot: root,
        worktreePath,
        workflowDir: ".agentplane/tasks",
        taskId: "T-1",
      }),
    ).resolves.toBe(true);

    await expect(
      readFile(path.join(worktreePath, ".agentplane", "tasks", "T-1", "README.md"), "utf8"),
    ).resolves.toBe("task readme\n");
    await expect(
      readFile(
        path.join(
          worktreePath,
          ".agentplane",
          "tasks",
          "T-1",
          "blueprint",
          "resolved-snapshot.json",
        ),
        "utf8",
      ),
    ).resolves.toBe("{}\n");
  });

  it("does not materialize foreign local task READMEs into the task worktree", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-local-task-"));
    await execFileNodeAsync("git", ["init", "-q"], { cwd: root });
    const worktreePath = path.join(root, "worktree");
    const activeTaskId = "202607260101-ABCD";
    const foreignTaskId = "202607260102-BCDE";
    const tasksRoot = path.join(root, ".agentplane", "tasks");
    await mkdir(path.join(tasksRoot, activeTaskId), { recursive: true });
    await mkdir(path.join(tasksRoot, foreignTaskId), { recursive: true });
    await writeFile(path.join(tasksRoot, activeTaskId, "README.md"), "active task\n", "utf8");
    await writeFile(path.join(tasksRoot, foreignTaskId, "README.md"), "foreign task\n", "utf8");

    await materializeLocalBackendReadmesForWorktree({
      backend: new LocalBackend({ dir: tasksRoot }),
      repoRoot: root,
      worktreePath,
      taskId: activeTaskId,
      workflowDir: ".agentplane/tasks",
    });

    await expect(
      readFile(path.join(worktreePath, ".agentplane", "tasks", activeTaskId, "README.md"), "utf8"),
    ).resolves.toBe("active task\n");
    await expect(
      readFile(path.join(worktreePath, ".agentplane", "tasks", foreignTaskId, "README.md"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(readFile(path.join(tasksRoot, foreignTaskId, "README.md"), "utf8")).resolves.toBe(
      "foreign task\n",
    );
  });
});
