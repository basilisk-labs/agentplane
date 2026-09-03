import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

import { resolveAgentplaneBinPath } from "../../shared/package-paths.js";
import type { TaskData } from "../../backends/task-backend.js";
import * as executionContext from "../../runtime/task-execution-context/index.js";
import { resolveTaskExecutionContract } from "../../runtime/task-routing/index.js";
import * as observedChanges from "./verify-record-observed-changes.js";
import * as verifyRecord from "./verify-record.js";
import * as reviewTarget from "../shared/quality-review-target.js";
import * as processRunner from "@agentplaneorg/core/process";
import { defaultConfig } from "../../cli/core-imports.js";

const mocks = { runProcess: vi.fn() };
const ORIGINAL_AGENT_MODE = process.env.AGENTPLANE_AGENT_MODE;
const ORIGINAL_RUNTIME_ACTIVE_BIN = process.env.AGENTPLANE_RUNTIME_ACTIVE_BIN;

import {
  blockingWorkItemCommands,
  isTaskLevelVerificationReworkState,
  parseDirectTaskCheck,
  renderDirectTaskVerificationDetails,
  recordDirectTaskVerification,
  runDirectTaskVerification,
} from "./direct-task-verification.js";
import { resolveEvidenceOnlyReworkCommit } from "./evidence-only-rework-commit.js";

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
  it("records missing executable as infrastructure evidence rather than a failing implementation", async () => {
    const cwd = await root();
    mocks.runProcess.mockRejectedValueOnce(
      Object.assign(new Error("spawn bun ENOENT"), { code: "ENOENT" }),
    );
    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { id: TASK_ID, verify: ["bun test"] } as TaskData,
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });
    expect(result.status).toBe("unsupported");
    expect(result.checks[0]).toMatchObject({
      exit_code: null,
      failure_kind: "infrastructure",
      runtime: {
        kind: "local_runtime_resolution",
        environment_digest: expect.stringMatching(/^sha256:/) as unknown,
      },
    });
    const persisted = JSON.parse(await readFile(path.join(cwd, result.artifact_path), "utf8")) as {
      checks: { failure_kind: string }[];
    };
    expect(persisted.checks[0]!.failure_kind).toBe("infrastructure");
  });

  it("maps checks from the frozen verification diff before persisting their evidence", async () => {
    const repo = await root();
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    const task = {
      id: TASK_ID,
      tags: ["code"],
      verify: ["bun run ci:local:full"],
      task_kind: "code",
      mutation_scope: "code",
      extensions: {},
    } as TaskData;
    task.execution_contract = resolveTaskExecutionContract({
      config,
      task,
      requestedMode: "branch_pr",
    });
    expect(task.execution_contract.verification.contract?.selected_checks).not.toContain(
      "docs_contract",
    );
    const context = vi
      .spyOn(executionContext, "resolveTaskExecutionContext")
      .mockResolvedValue({} as never);
    const target = vi
      .spyOn(reviewTarget, "resolveQualityReviewTargetSha")
      .mockResolvedValue("frozen-head");
    const observed = vi
      .spyOn(observedChanges, "resolveObservedVerificationChangedPaths")
      .mockResolvedValue(["docs/contract.md"]);
    const persist = vi.spyOn(verifyRecord, "cmdVerifyParsed").mockResolvedValue(0);
    const process = vi
      .spyOn(processRunner, "runProcess")
      .mockResolvedValue({ exitCode: 0, stdout: "checks passed", stderr: "" } as never);
    try {
      const result = await recordDirectTaskVerification({
        command: command(repo),
        checkout: repo,
        task,
        work_order: { task: { id: TASK_ID } } as never,
        workflow: "branch_pr",
      });
      expect(result.status).toBe("passed");
      expect(result.checks[0]?.check_ids).toContain("docs_contract");
      expect(persist.mock.calls[0]?.[0].details).toContain("Check: docs_contract");
      const snapshot = persist.mock.calls[0]?.[0].verificationSnapshot;
      expect(snapshot).toMatchObject({
        evaluated_sha: "frozen-head",
        changed_paths: ["docs/contract.md"],
      });
      expect(snapshot?.execution_contract.verification.contract?.selected_checks).toContain(
        "docs_contract",
      );
      expect(observed).toHaveBeenCalledWith(
        expect.objectContaining({ evaluatedSha: "frozen-head" }),
      );
      expect(task.execution_contract.verification.contract?.selected_checks).not.toContain(
        "docs_contract",
      );
    } finally {
      context.mockRestore();
      target.mockRestore();
      observed.mockRestore();
      persist.mockRestore();
      process.mockRestore();
    }
  });
  it("reuses only the exact unchanged implementation identity at a rework boundary", () => {
    const eligible = {
      purpose: "implementation" as const,
      changed_paths: [],
      recorded_commit: "abc123",
      head: "abc123",
      work_item_id: "work-item",
      work_item_state: "REWORK_READY",
      task_verification_state: undefined,
      all_required_work_items_completed: false,
    };

    expect(resolveEvidenceOnlyReworkCommit(eligible)).toBe("abc123");
    expect(
      resolveEvidenceOnlyReworkCommit({ ...eligible, changed_paths: ["repair.ts"] }),
    ).toBeNull();
    expect(resolveEvidenceOnlyReworkCommit({ ...eligible, head: "different" })).toBeNull();
    expect(resolveEvidenceOnlyReworkCommit({ ...eligible, work_item_state: "READY" })).toBeNull();
    expect(resolveEvidenceOnlyReworkCommit({ ...eligible, purpose: "evaluation" })).toBeNull();
  });

  it("recognizes task-level evidence rework only after every required WorkItem completed", () => {
    const eligible = {
      work_item_id: null,
      has_plan_refinement: false,
      task_verification_state: "needs_rework",
      has_current_plan: true,
      all_required_work_items_completed: true,
    };

    expect(isTaskLevelVerificationReworkState(eligible)).toBe(true);
    expect(isTaskLevelVerificationReworkState({ ...eligible, task_verification_state: "ok" })).toBe(
      true,
    );
    expect(isTaskLevelVerificationReworkState({ ...eligible, has_plan_refinement: true })).toBe(
      false,
    );
    expect(isTaskLevelVerificationReworkState({ ...eligible, work_item_id: "work-item" })).toBe(
      false,
    );
    expect(
      isTaskLevelVerificationReworkState({
        ...eligible,
        all_required_work_items_completed: false,
      }),
    ).toBe(false);
  });

  it("replaces a missing package script only for a planner fallback scaffold", async () => {
    const repo = await root();
    await writeFile(
      path.join(repo, "package.json"),
      JSON.stringify({
        scripts: {
          "test:critical": "vitest run critical",
          "test:fast": "vitest run",
          typecheck: "tsc --noEmit",
        },
      }),
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
      expect.objectContaining({ command: "bun", args: ["run", "test:critical"] }),
    );
    expect(result.checks[0]).toMatchObject({
      command: "bun run test:critical",
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

  it("runs a safe declared check sequence in order without a shell", async () => {
    const cwd = await root();
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "generated", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "fresh", stderr: "" });
    const check = "bun run docs:readme-header:generate && bun run docs:readme-header:check";

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
      checks: [{ command: check, script: null, exit_code: 0, stdout_tail: "generated\nfresh" }],
    });
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        command: "bun",
        args: ["run", "docs:readme-header:generate"],
      }),
    );
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ command: "bun", args: ["run", "docs:readme-header:check"] }),
    );
  });

  it("stops a declared check sequence on first failure and shares its timeout budget", async () => {
    const cwd = await root();
    mocks.runProcess
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
      run_process: mocks.runProcess,
      now: () => nowValues.shift() ?? 1250,
    });

    expect(result).toMatchObject({
      status: "failed",
      reason: `Declared check failed: ${check}`,
      checks: [{ command: check, exit_code: 7 }],
    });
    expect(mocks.runProcess).toHaveBeenCalledTimes(2);
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ timeoutMs: 1000 }),
    );
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ timeoutMs: 750 }),
    );
  });

  it("rejects malformed or unsafe declared check sequences before execution", async () => {
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
        task: { verify: [check], task_kind: "code", mutation_scope: "code" },
        task_id: TASK_ID,
        cwd,
        run_process: mocks.runProcess,
      });

      expect(result).toMatchObject({
        status: "unsupported",
        reason: `Unsupported declared check: ${check}`,
      });
    }
    expect(mocks.runProcess).not.toHaveBeenCalled();
  });

  it("keeps quoted ampersands inside one structured argument", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValueOnce({ exitCode: 0, stdout: "1 pass", stderr: "" });
    const check = "bun test 'a && b'";

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: [check], task_kind: "code", mutation_scope: "code" },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result.status).toBe("passed");
    expect(mocks.runProcess).toHaveBeenCalledOnce();
    expect(mocks.runProcess).toHaveBeenCalledWith(
      expect.objectContaining({ command: "bun", args: ["test", "a && b"] }),
    );
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

  it("runs blocking WorkItem checks with their strictest timeout and skips optional-only checks", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "ok", stderr: "" });

    const additionalCommands = blockingWorkItemCommands({
      criteria: [{ required: true, check_ids: ["criterion-check"] }],
      checks: [
        {
          id: "required-check",
          required: true,
          command: "bun run test:critical",
          timeout_ms: 5000,
        },
        {
          id: "criterion-check",
          required: false,
          command: "bun run lifecycle:invariants",
          timeout_ms: 3000,
        },
        {
          id: "optional-check",
          required: false,
          command: "bun run optional:diagnostic",
          timeout_ms: 1000,
        },
      ],
    });
    expect(additionalCommands).toEqual([
      {
        command: "bun run test:critical",
        timeout_ms: 5000,
        check_ids: ["required-check"],
      },
      {
        command: "bun run lifecycle:invariants",
        timeout_ms: 3000,
        check_ids: ["criterion-check"],
      },
    ]);

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["bun run test:critical"] },
      task_id: TASK_ID,
      cwd,
      additional_commands: [
        ...additionalCommands,
        { command: "bun run test:critical", timeout_ms: 2000 },
      ],
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({
      status: "passed",
      checks: [
        { command: "bun run test:critical", exit_code: 0 },
        { command: "bun run lifecycle:invariants", exit_code: 0 },
      ],
    });
    expect(mocks.runProcess).toHaveBeenCalledTimes(2);
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ timeoutMs: 2000 }),
    );
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ timeoutMs: 3000 }),
    );
  });

  it("runs only exact WorkItem checks before final Task verification", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "8 invariants passed", stderr: "" });

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: {
        verify: ["bun run ci:local:full"],
        execution_contract: {
          verification: { contract: { selected_checks: ["full_regression"] } },
        },
      } as TaskData,
      task_id: TASK_ID,
      cwd,
      additional_commands: [
        {
          command: "bun run lifecycle:invariants",
          timeout_ms: 600_000,
          check_ids: ["m3-invariants"],
        },
      ],
      additional_only: true,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({
      status: "passed",
      checks: [
        {
          command: "bun run lifecycle:invariants",
          check_ids: ["m3-invariants"],
          exit_code: 0,
        },
      ],
    });
    expect(mocks.runProcess).toHaveBeenCalledOnce();
    expect(mocks.runProcess).toHaveBeenCalledWith(
      expect.objectContaining({
        command: "bun",
        args: ["run", "lifecycle:invariants"],
        timeoutMs: 600_000,
      }),
    );
    expect(
      renderDirectTaskVerificationDetails({
        task: {
          execution_contract: {
            verification: { contract: { selected_checks: ["full_regression"] } },
          },
        } as TaskData,
        taskId: TASK_ID,
        workflow: "branch_pr",
        result,
      }),
    ).toContain("Command: bun run lifecycle:invariants");
  });

  it("persists the actual observations from each rerun, including equivalent pass outcomes", async () => {
    const cwd = await root();
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "first timing: 10ms", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "second timing: 20ms", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 1, stdout: "", stderr: "changed failure" });
    const task = {
      verify: ["bun run test:critical"],
      task_kind: "code" as const,
      mutation_scope: "code" as const,
    };

    const first = await runDirectTaskVerification({
      command: command(cwd),
      task,
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });
    const artifactPath = path.join(cwd, first.artifact_path);
    const firstArtifact = await readFile(artifactPath, "utf8");

    const second = await runDirectTaskVerification({
      command: command(cwd),
      task,
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });
    expect(second.checks[0]?.stdout_tail).toBe("second timing: 20ms");
    expect(await readFile(artifactPath, "utf8")).not.toBe(firstArtifact);
    expect(JSON.parse(await readFile(artifactPath, "utf8"))).toMatchObject({
      status: "passed",
      checks: [{ exit_code: 0, stdout_tail: "second timing: 20ms" }],
    });

    const failed = await runDirectTaskVerification({
      command: command(cwd),
      task,
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });
    expect(failed.status).toBe("failed");
    expect(await readFile(artifactPath, "utf8")).not.toBe(firstArtifact);
    expect(JSON.parse(await readFile(artifactPath, "utf8"))).toMatchObject({
      status: "failed",
      reason: "Declared check failed: bun run test:critical",
      checks: [{ exit_code: 1, stderr_tail: "changed failure" }],
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
            check_ids: ["critical_paths", "task_outcome"],
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

  it("runs and binds full regression separately without claiming hosted integration", async () => {
    const cwd = await root();
    await writeFile(
      path.join(cwd, "package.json"),
      JSON.stringify({
        packageManager: "bun@1.3.6",
        scripts: { "ci:local:full": "node scripts/checks/full.mjs" },
      }),
      "utf8",
    );
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "1 pass", stderr: "" });
    const task = {
      verify: ["bun test packages/agentplane/src/cli/focused.test.ts"],
      task_kind: "code" as const,
      mutation_scope: "code" as const,
      execution_contract: {
        ...executionContract(["repository_write", "source_code"]),
        verification: {
          required_evidence: ["hosted_integration", "task_outcome"],
          contract: {
            selected_checks: [
              "affected_unit_integration",
              "critical_paths",
              "full_regression",
              "hosted_integration",
              "task_outcome",
            ],
          },
        },
      },
    } as unknown as Pick<
      TaskData,
      "verify" | "task_kind" | "mutation_scope" | "execution_contract" | "sections"
    >;

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task,
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result.status).toBe("passed");
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ command: "bun", args: ["run", "ci:local:full"] }),
    );
    expect(result.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          command: "bun test packages/agentplane/src/cli/focused.test.ts",
          check_ids: ["affected_unit_integration", "critical_paths", "task_outcome"],
        }),
        expect.objectContaining({
          command: "bun run ci:local:full",
          check_ids: [
            "affected_unit_integration",
            "critical_paths",
            "full_regression",
            "task_outcome",
          ],
        }),
      ]),
    );
    const details = renderDirectTaskVerificationDetails({
      task,
      taskId: TASK_ID,
      workflow: "branch_pr",
      result,
    });
    expect(details).toContain("Check: full_regression\nCommand: bun run ci:local:full");
    expect(details).not.toContain("Check: hosted_integration");
    expect(details).not.toMatch(/Check: full_regression\nCommand: bun test/gu);
  });

  it("uses the configured package runner for the canonical full script", async () => {
    const cwd = await root();
    await writeFile(
      path.join(cwd, "package.json"),
      JSON.stringify({
        scripts: {
          "test:fast": "node scripts/checks/fast.mjs",
          "ci:local:full": "node scripts/checks/full.mjs",
        },
      }),
      "utf8",
    );
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "1 pass", stderr: "" });
    const contract = executionContract(["repository_write", "source_code"]);
    contract.verification.contract = { selected_checks: ["full_regression", "task_outcome"] };

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["npm run test:fast"], execution_contract: contract },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result.status).toBe("passed");
    expect(mocks.runProcess).toHaveBeenCalledTimes(2);
    expect(mocks.runProcess).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ command: "npm", args: ["run", "ci:local:full"] }),
    );
    expect(result.checks[1]).toMatchObject({
      command: "npm run ci:local:full",
      check_ids: ["full_regression", "task_outcome"],
    });
  });

  it("recognizes a repository-wide non-JavaScript test command as full evidence", async () => {
    const cwd = await root();
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "42 passed", stderr: "" });
    const contract = executionContract(["repository_write", "source_code"]);
    contract.verification.contract = { selected_checks: ["full_regression", "task_outcome"] };

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: { verify: ["python -m pytest"], execution_contract: contract },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({
      status: "passed",
      checks: [
        {
          command: "python -m pytest",
          check_ids: ["full_regression", "task_outcome"],
          exit_code: 0,
        },
      ],
    });
    expect(mocks.runProcess).toHaveBeenCalledOnce();
  });

  it("does not pass a required full regression when the repository has no full script", async () => {
    const cwd = await root();
    await writeFile(path.join(cwd, "package.json"), JSON.stringify({ scripts: {} }), "utf8");
    const contract = executionContract(["repository_write", "source_code"]);
    contract.verification.contract = { selected_checks: ["full_regression", "task_outcome"] };

    const result = await runDirectTaskVerification({
      command: command(cwd),
      task: {
        verify: ["bun test focused.test.ts"],
        execution_contract: contract,
      },
      task_id: TASK_ID,
      cwd,
      run_process: mocks.runProcess,
    });

    expect(result).toMatchObject({
      status: "unsupported",
      reason:
        "Verification Contract requires full_regression, but package.json does not define ci:local:full.",
      checks: [
        {
          command: "bun test focused.test.ts",
          check_ids: ["task_outcome"],
          exit_code: 0,
        },
      ],
    });
    const artifact = JSON.parse(await readFile(path.join(cwd, result.artifact_path), "utf8")) as {
      status: string;
      checks: { check_ids: string[] }[];
    };
    expect(artifact).toMatchObject({
      status: "unsupported",
      checks: [{ check_ids: ["task_outcome"] }],
    });
    expect(artifact.checks.flatMap((check) => check.check_ids)).not.toContain("full_regression");
    expect(mocks.runProcess).toHaveBeenCalledOnce();
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
