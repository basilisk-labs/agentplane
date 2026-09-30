import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { runProcess, startProcess } from "@agentplaneorg/core/process";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  mkTempDir,
  writeConfig,
} from "@agentplane/testkit";
import { defaultConfig } from "../../cli/core-imports.js";
import { runCli } from "../../cli/run-cli.js";
import { resolveLocalExecutable } from "../../shared/runtime-env.js";
import { assertSupportedDeclaredTaskChecks } from "../shared/declared-check.js";
import { loadCommandContext } from "../shared/task-backend.js";
import * as verifyLog from "../shared/pr-meta/verify-log.js";
import { runDirectTaskVerification } from "./direct-task-verification.js";

installRunCliIntegrationHarness();

const interpreter =
  resolveLocalExecutable("python3", process.env) ?? resolveLocalExecutable("python", process.env);
const taskId = "202609290000-PYTHON";
type Options = Parameters<typeof runDirectTaskVerification>[0];

function verify(cwd: string, check: string, timeoutMs?: number) {
  return runDirectTaskVerification({
    command: {
      config: { paths: { workflow_dir: ".agentplane/tasks" } },
      resolvedProject: { gitRoot: cwd },
    } as Options["command"],
    task: { verify: [check], task_kind: "code", mutation_scope: "code" },
    task_id: taskId,
    cwd,
    ...(timeoutMs === undefined
      ? {}
      : {
          additional_only: true,
          additional_commands: [{ command: check, timeout_ms: timeoutMs }],
        }),
  });
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe.skipIf(!interpreter)("real Python declared verification", { timeout: 120_000 }, () => {
  let root: string;

  beforeEach(async () => {
    root = await mkTempDir();
    const venv = path.join(root, "venv");
    const created = await startProcess({
      command: interpreter!,
      args: ["-m", "venv", "--without-pip", venv],
      buffer: true,
      timeoutMs: 30_000,
    });
    expect(created.exitCode, created.stderr).toBe(0);
    const bin = path.join(venv, process.platform === "win32" ? "Scripts" : "bin");
    vi.stubEnv("PATH", bin + path.delimiter + process.env.PATH);
    vi.stubEnv("PYTHONPATH", undefined);
    vi.stubEnv("PYTHONHOME", undefined);
    vi.stubEnv("PYTHONNOUSERSITE", "1");
    await writeFile(
      path.join(root, "test_example.py"),
      "import unittest\nclass Example(unittest.TestCase):\n    def test_value(self):\n        self.assertEqual(2 + 2, 4)\n",
    );
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify({ private: true, scripts: { test: "python -B -m unittest -v" } }),
    );
  });

  it.each(["python", "python3"])(
    "executes %s unittest with the real default runner",
    async (python) => {
      const check = python + " -B -m unittest -v";
      assertSupportedDeclaredTaskChecks([check]);
      const result = await verify(root, check);
      expect(result.status).toBe("passed");
      expect(result.checks[0]).toMatchObject({ exit_code: 0, runtime: { status: "resolved" } });
      expect(result.checks[0]?.stderr_tail).toContain("Ran 1 test");
    },
  );

  it.each(["python", "python3"])(
    "launches %s -m pytest without a package-policy rejection",
    async (python) => {
      // This isolated venv has no pytest. A numeric Python error proves launcher parity, not pytest success.
      const check = python + " -m pytest";
      assertSupportedDeclaredTaskChecks([check]);
      const result = await verify(root, check);
      expect(result.status).toBe("failed");
      expect(result.checks[0]).toMatchObject({ exit_code: 1, runtime: { status: "resolved" } });
      expect(result.checks[0]?.stderr_tail).toContain("No module named pytest");
      expect(result.checks[0]?.failure_kind).toBeUndefined();
    },
  );

  it("records a launched failing unittest with its numeric exit code", async () => {
    await writeFile(
      path.join(root, "test_example.py"),
      "import unittest\nclass Example(unittest.TestCase):\n    def test_value(self):\n        self.fail('intentional assertion')\n",
    );
    const result = await verify(root, "python -B -m unittest -v");
    expect(result.status).toBe("failed");
    expect(result.checks[0]).toMatchObject({ exit_code: 1 });
    expect(result.checks[0]?.stderr_tail).toContain("FAILED (failures=1)");
    expect(result.checks[0]?.failure_kind).toBeUndefined();
  });

  it("keeps npm test launching the same Python unittest", async () => {
    const result = await verify(root, "npm test");
    expect(result.status).toBe("passed");
    expect(result.checks[0]?.exit_code).toBe(0);
    expect(result.checks[0]?.stderr_tail).toContain("Ran 1 test");
  });

  it("classifies a missing interpreter as infrastructure, not a failed test", async () => {
    const empty = path.join(root, "empty-bin");
    await mkdir(empty);
    vi.spyOn(verifyLog, "verificationChildEnv").mockReturnValue({ PATH: empty, HOME: root });
    const result = await verify(root, "python3 -m unittest");
    expect(result.status).toBe("unsupported");
    expect(result.checks[0]).toMatchObject({
      exit_code: null,
      failure_kind: "infrastructure",
      runtime: { status: "unavailable" },
    });
    expect(result.checks[0]?.stderr_tail).not.toContain("allowed executable set");
  });

  it("enforces the declared timeout on an actual Python process", async () => {
    await writeFile(path.join(root, "slow.py"), "import time\ntime.sleep(60)\n");
    const result = await verify(root, "python slow.py", 100);
    expect(result.status).toBe("failed");
    expect(result.checks[0]?.exit_code).not.toBe(0);
  });

  it("enforces buffered output limits on an actual Python process", async () => {
    await writeFile(path.join(root, "noisy.py"), "print('x' * (3 * 1024 * 1024))\n");
    const result = await verify(root, "python noisy.py");
    expect(result.status).toBe("failed");
    expect(result.checks[0]?.exit_code).not.toBe(0);
    expect(result.checks[0]!.stdout_tail.length).toBeLessThanOrEqual(4000);
  });

  it.each(["python -c", "python3 -Bc", "python -IBc"])(
    "rejects %s before its inline code can run",
    async (prefix) => {
      const result = await verify(root, prefix + " \"open('unexpected','w').write('bad')\"");
      expect(result.status).toBe("unsupported");
      expect(result.checks).toEqual([]);
      await expect(access(path.join(root, "unexpected"))).rejects.toMatchObject({ code: "ENOENT" });
    },
  );

  it("keeps Python outside the generic process allowlist", async () => {
    await expect(runProcess({ command: "python", args: ["--version"] })).rejects.toThrow(
      /allowed executable set/u,
    );
  });

  it("preserves non-Python managed executable restrictions", async () => {
    const result = await verify(root, "custom-runner --version");
    expect(result.status).toBe("failed");
    expect(result.checks[0]?.stderr_tail).toContain("allowed executable set");
  });

  it("accepts the reported commands at real CLI task intake", async () => {
    const repo = await mkGitRepoRootWithBranch("main");
    await writeConfig(repo, defaultConfig());
    for (const check of [
      "python3 -B -m unittest -v",
      "python -m pytest",
      "python3 -m pytest",
      "npm test",
    ]) {
      const io = captureStdIO();
      let createdId: string;
      try {
        const code = await runCli([
          "task",
          "create",
          "Verify Python: " + check,
          "--task-kind",
          "code",
          "--mutation-scope",
          "code",
          "--route",
          "direct",
          "--scope-root",
          "test_example.py",
          "--repository-effect",
          "source_code",
          "--capability",
          "repository_write",
          "--verify",
          check,
          "--json",
          "--root",
          repo,
        ]);
        expect(code, io.stderr).toBe(0);
        createdId = (JSON.parse(io.stdout) as { task_id: string }).task_id;
      } finally {
        io.restore();
      }
      const ctx = await loadCommandContext({ cwd: repo, rootOverride: repo });
      const task = await ctx.taskBackend.getTask(createdId!);
      expect(task?.verify).toContain(check);
    }
  });
});
