import { execFile } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it } from "vitest";

import { materializeHookShimForWorktree } from "./work-start.hook-shim.js";
import { materializeActiveTaskArtifactsForWorktree } from "./work-start.materialize.js";

const ACTIVE_BIN_ENV = "AGENTPLANE_RUNTIME_ACTIVE_BIN";
const execFileNodeAsync = promisify(execFile);

function processOutput(value: unknown): string {
  if (typeof value === "string") return value;
  return Buffer.isBuffer(value) ? value.toString("utf8") : "";
}

describe("worktree hook shim", () => {
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
    await writeFile(
      activeBin,
      "if (process.argv.includes('--version')) process.exit(0); setInterval(() => {}, 1000);\n",
      "utf8",
    );
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
    await writeFile(
      activeBin,
      "if (process.argv.includes('--version')) process.exit(0); process.kill(process.pid, 'SIGKILL');\n",
      "utf8",
    );
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

  it("falls through when the repository-local runner cannot start", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-fallback-"));
    const worktreePath = path.join(root, "worktree");
    const localBin = path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js");
    const installedBin = path.join(root, "installed", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(localBin), { recursive: true });
    await mkdir(path.dirname(installedBin), { recursive: true });
    await writeFile(localBin, "import 'missing-hook-runner-dependency';\n", "utf8");
    await writeFile(
      installedBin,
      "if (process.argv.includes('--version')) process.stdout.write('0.6.29\\n'); else process.stdout.write('installed runner\\n');\n",
      "utf8",
    );
    process.env[ACTIVE_BIN_ENV] = installedBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
    const { stdout } = await execFileNodeAsync(shimPath, ["hooks", "run", "pre-commit"], {
      cwd: worktreePath,
    });

    expect(stdout).toBe("installed runner\n");
  });

  it("honors an explicit ready runner before repository and installed candidates", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-env-"));
    const worktreePath = path.join(root, "worktree");
    const localBin = path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js");
    const installedBin = path.join(root, "installed", "agentplane.js");
    const envBin = path.join(root, "override", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    for (const candidate of [localBin, installedBin, envBin]) {
      await mkdir(path.dirname(candidate), { recursive: true });
      const label = candidate === envBin ? "env runner" : "unexpected runner";
      await writeFile(
        candidate,
        `if (process.argv.includes('--version')) process.stdout.write('0.6.29\\n'); else process.stdout.write('${label}\\n');\n`,
        "utf8",
      );
    }
    process.env[ACTIVE_BIN_ENV] = installedBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
    const { stdout } = await execFileNodeAsync(shimPath, ["hooks", "run", "pre-commit"], {
      cwd: worktreePath,
      env: { ...process.env, AGENTPLANE_HOOK_RUNNER: envBin },
    });

    expect(stdout).toBe("env runner\n");
  });

  it("does not fall back after a ready runner rejects the hook command", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-worktree-shim-reject-"));
    const worktreePath = path.join(root, "worktree");
    const localBin = path.join(worktreePath, "packages", "agentplane", "bin", "agentplane.js");
    const installedBin = path.join(root, "installed", "agentplane.js");
    const previousActiveBin = process.env[ACTIVE_BIN_ENV];
    await mkdir(path.dirname(localBin), { recursive: true });
    await mkdir(path.dirname(installedBin), { recursive: true });
    await writeFile(
      localBin,
      "if (process.argv.includes('--version')) process.exit(0); process.stderr.write('hook rejected\\n'); process.exit(7);\n",
      "utf8",
    );
    await writeFile(
      installedBin,
      "if (process.argv.includes('--version')) process.exit(0); process.stdout.write('fallback ran\\n');\n",
      "utf8",
    );
    process.env[ACTIVE_BIN_ENV] = installedBin;
    try {
      await materializeHookShimForWorktree(worktreePath);
    } finally {
      if (previousActiveBin === undefined) delete process.env[ACTIVE_BIN_ENV];
      else process.env[ACTIVE_BIN_ENV] = previousActiveBin;
    }

    const shimPath = path.join(worktreePath, ".agentplane", "bin", "agentplane");
    const result = await execFileNodeAsync(shimPath, ["hooks", "run", "pre-commit"], {
      cwd: worktreePath,
    }).then(
      ({ stdout, stderr }) => ({ code: 0, stdout, stderr }),
      (error: unknown) => ({
        code: (error as { code?: number }).code ?? null,
        stdout: processOutput((error as { stdout?: unknown }).stdout),
        stderr: processOutput((error as { stderr?: unknown }).stderr),
      }),
    );

    expect(result.code).toBe(7);
    expect(result.stderr).toContain("hook rejected");
    expect(result.stdout).not.toContain("fallback ran");
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
});
