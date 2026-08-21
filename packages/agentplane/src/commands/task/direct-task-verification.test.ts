import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";
import type { TaskData } from "../../backends/task-backend.js";

const mocks = { runProcess: vi.fn() };
const ORIGINAL_AGENT_MODE = process.env.AGENTPLANE_AGENT_MODE;
const ORIGINAL_RUNTIME_ACTIVE_BIN = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;

import {
  parseDirectTaskCheck,
  renderDirectTaskVerificationDetails,
  runDirectTaskVerification,
} from "./direct-task-verification.js";

const TASK_ID = "202607290000-RF10A1";
const roots: string[] = [];

function command(root: string) {
  return {
    config: { paths: { workflow_dir: ".agentplane/tasks" } },
    resolvedProject: { gitRoot: root },
  } as never;
}

function executionContract(
  repositoryEffects: NonNullable<
    TaskData["execution_contract"]
  >["declaration"]["repository_effects"],
): NonNullable<TaskData["execution_contract"]> {
  return {
    schema_version: 1,
    source: "agent_declared",
    declaration: {
      schema_version: 1,
      preferred_mode: "direct",
      scope_roots: ["docs"],
      repository_effects: repositoryEffects,
      external_effects: [],
      uncertainty: "bounded",
      reversibility: "reversible",
      rationale: ["task-specific semantic assessment"],
    },
    selected_mode: "direct",
    repository_mode: "direct",
    reason_codes: ["agent_preferred_direct_compatible"],
    authority: {
      writable_roots: ["docs"],
      allowed_repository_effects: repositoryEffects,
      forbidden_repository_effects: [],
      allowed_external_effects: [],
      forbidden_external_effects: [
        "network_read",
        "external_write",
        "credentials",
        "publish",
        "deploy",
        "destructive_git",
      ],
    },
    safety: {
      requires_worktree: false,
      requires_user_approval: false,
      approval_effects: [],
    },
    verification: { required_evidence: ["task_outcome"] },
    observed: {
      repository_effects: [],
      external_effects: [],
      changed_paths: [],
      changed_components: [],
      verification_results: [],
      authority_violations: [],
    },
  };
}

async function root(): Promise<string> {
  const value = await mkdtemp(path.join(os.tmpdir(), "agentplane-direct-verification-"));
  roots.push(value);
  return value;
}

afterEach(async () => {
  vi.clearAllMocks();
  if (ORIGINAL_AGENT_MODE === undefined) delete process.env.AGENTPLANE_AGENT_MODE;
  else process.env.AGENTPLANE_AGENT_MODE = ORIGINAL_AGENT_MODE;
  if (ORIGINAL_RUNTIME_ACTIVE_BIN === undefined) delete process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;
  else process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = ORIGINAL_RUNTIME_ACTIVE_BIN;
  await Promise.all(roots.splice(0).map(async (entry) => await rm(entry, { recursive: true })));
});

describe("direct task verification", () => {
  it("replaces a missing package script only for a planner fallback scaffold", async () => {
    const repo = await root();
    await writeFile(
      path.join(repo, "package.json"),
      JSON.stringify({ scripts: { "test:fast": "vitest run", typecheck: "tsc --noEmit" } }),
      "utf8",
    );
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "1 pass", stderr: "" });

    const result = await runDirectTaskVerification({
      command: command(repo),
      task: {
        verify: ["bun run check", "bun run typecheck"],
        task_kind: "code",
        mutation_scope: "code",
        sections: { "Verify Steps": "PLANNER fallback scaffold. Replace this." },
      },
      task_id: TASK_ID,
      cwd: repo,
      run_process: mocks.runProcess,
    });

    expect(result.status).toBe("passed");
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ command: "bun", args: ["run", "test:fast"] }),
    );
    expect(result.checks[0]).toMatchObject({
      command: "bun run test:fast",
      declared_command: "bun run check",
    });
  });

  it("accepts project-native repository-bound argv without shell syntax", () => {
    expect(parseDirectTaskCheck(" bun run test:critical ")).toEqual({
      executable: "bun",
      args: ["run", "test:critical"],
      script: "test:critical",
    });
    expect(parseDirectTaskCheck("bun run e2e:v0.7.1:gate")).toEqual({
      executable: "bun",
      args: ["run", "e2e:v0.7.1:gate"],
      script: "e2e:v0.7.1:gate",
    });
    expect(parseDirectTaskCheck("bun run test:critical -- --watch")).toEqual({
      executable: "bun",
      args: ["run", "test:critical", "--", "--watch"],
      script: "test:critical",
    });
    expect(
      parseDirectTaskCheck(
        "bun test 'packages/agentplane/src/commands/task/a test.ts' packages/core/src --timeout 5000",
      ),
    ).toEqual({
      executable: "bun",
      args: [
        "test",
        "packages/agentplane/src/commands/task/a test.ts",
        "packages/core/src",
        "--timeout",
        "5000",
      ],
      script: null,
    });
    expect(parseDirectTaskCheck("bun run test:critical; rm -rf /tmp/x")).toBeNull();
    expect(parseDirectTaskCheck("bun run ../test:critical")).toBeNull();
    expect(parseDirectTaskCheck("bun test ../outside.test.ts")).toBeNull();
    expect(parseDirectTaskCheck("bun test --preload=/tmp/outside.ts")).toBeNull();
    expect(parseDirectTaskCheck("bun test 'C:\\outside.test.ts'")).toBeNull();
    expect(parseDirectTaskCheck("TOKEN=value bun test packages/core/src")).toBeNull();
    expect(parseDirectTaskCheck("bun install")).toBeNull();
    expect(parseDirectTaskCheck("npm test")).toEqual({
      executable: "npm",
      args: ["test"],
      script: "test",
    });
    expect(parseDirectTaskCheck("python -m pytest tests/unit")).toEqual({
      executable: "python",
      args: ["-m", "pytest", "tests/unit"],
      script: null,
    });
    expect(parseDirectTaskCheck("bash -c 'bun test'")).toBeNull();
    expect(parseDirectTaskCheck("git reset --hard")).toBeNull();
  });

  it("runs the reported bun test command as structured argv and records it", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "16 pass", stderr: "" });
    process.env.AGENTPLANE_AGENT_MODE = "1";
    process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN = "/maintenance/agentplane.js";
    const check = "bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts";

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: [check], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({
      status: "passed",
      reason: null,
      checks: [{ command: check, script: null, exit_code: 0, stdout_tail: "16 pass" }],
    });
    const invocation = mocks.runProcess.mock.calls.at(0)?.[0] as
      | {
          command: string;
          args: string[];
          cwd: string;
          timeoutMs: number;
          env: NodeJS.ProcessEnv;
        }
      | undefined;
    expect(invocation).toMatchObject({
      command: "bun",
      args: ["test", "packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"],
      cwd,
      timeoutMs: 30 * 60_000,
    });
    expect(invocation?.env).not.toHaveProperty("AGENTPLANE_AGENT_MODE");
    expect(invocation?.env).not.toHaveProperty("AGENTPLANE_RUNTIME_ACTIVE_BIN");
  });

  it("rejects successful Bun processes that report zero executed tests", async () => {
    for (const output of [
      { stdout: "0 pass\n0 fail\nRan 0 tests across 0 files.", stderr: "" },
      {
        stdout: "1 pass",
        stderr: "The following filters did not match any test files: missing-filter",
      },
    ]) {
      const cwd = await root();
      mocks.runProcess.mockResolvedValueOnce({ exitCode: 0, ...output });
      const check = "bun test missing-filter";

      const result = await runDirectTaskVerification({
        command: command(cwd),
        task: { verify: [check], task_kind: "code", mutation_scope: "code" },
        task_id: TASK_ID,
        cwd,
        run_process: mocks.runProcess,
      });

      expect(result).toMatchObject({
        status: "failed",
        reason: `Declared bun test check executed zero tests: ${check}`,
        checks: [{ command: check, exit_code: 0 }],
      });
      expect(
        JSON.parse(await readFile(path.join(cwd, result.artifact_path), "utf8")),
      ).toMatchObject({
        status: "failed",
        reason: `Declared bun test check executed zero tests: ${check}`,
      });
    }

    const cwd = await root();
    mocks.runProcess.mockResolvedValueOnce({
      exitCode: 0,
      stdout: "1 pass\n(pass) preserves a captured no tests found diagnostic",
      stderr: "",
    });
    const valid = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun test real-filter"], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });
    expect(valid).toMatchObject({ status: "passed", reason: null });
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
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({ status: "passed", reason: null });
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        command: "bun",
        args: ["run", "test:critical"],
        cwd,
        timeoutMs: 30 * 60_000,
      }),
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

  it("binds supervisor evidence to every selected Verification Contract check", () => {
    const task = {
      execution_contract: {
        ...executionContract(["repository_write", "source_code"]),
        verification: {
          required_evidence: ["task_outcome"],
          contract: {
            selected_checks: ["critical_paths", "task_outcome"],
          },
        },
      },
    } as unknown as Pick<TaskData, "execution_contract">;
    const details = renderDirectTaskVerificationDetails({
      task,
      taskId: TASK_ID,
      workflow: "branch_pr",
      result: {
        status: "passed",
        artifact_path: ".agentplane/tasks/T/supervision/declared-checks.json",
        reason: null,
        checks: [
          {
            command: "bun run test:critical",
            script: "test:critical",
            exit_code: 0,
            duration_ms: 10,
            stdout_tail: "pass",
            stderr_tail: "",
          },
        ],
      },
    });

    expect(details).toContain("Check: critical_paths");
    expect(details).toContain("Check: task_outcome");
    expect(details.match(/Command: bun run test:critical/gu)).toHaveLength(2);
  });

  it("gives the canonical provider qualification its bounded release window", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "provider gate ok", stderr: "" });

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run e2e:v0.7.1:gate"] },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({ status: "passed" });
    expect(mocks.runProcess).toHaveBeenCalledWith(
      expect.objectContaining({
        command: "bun",
        args: ["run", "e2e:v0.7.1:gate"],
        timeoutMs: 150 * 60_000,
      }),
    );
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
      run_process: mocks.runProcess,
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

  it("uses declared effects instead of a misleading task kind to select docs policy checks", async () => {
    const cwd = await root();
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "routing ok", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "doctor ok", stderr: "" });

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: {
        verify: [],
        task_kind: "code",
        mutation_scope: "code",
        execution_contract: executionContract(["repository_write", "documentation"]),
      },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({ status: "passed" });
    expect(mocks.runProcess).toHaveBeenCalledTimes(2);
  });

  it("does not treat an empty code-task check contract as successful verification", async () => {
    const cwd = await root();
    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: [], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({
      status: "unsupported",
      checks: [],
      reason: "No executable declared verification checks are configured for this task.",
    });
    expect(mocks.runProcess).not.toHaveBeenCalled();
    expect(JSON.parse(await readFile(path.join(cwd, result.artifact_path), "utf8"))).toMatchObject({
      status: "unsupported",
      checks: [],
    });
  });

  it("stops at the first failed or unsupported check and still writes the evidence artifact", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 7, stdout: "", stderr: "failed" });

    const failed = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run test:critical", "bun run should-not-run"] },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });
    expect(failed).toMatchObject({ status: "failed", checks: [{ exit_code: 7 }] });
    expect(mocks.runProcess).toHaveBeenCalledTimes(1);

    const unsupported = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run test:critical; injected"] },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
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
