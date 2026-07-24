import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { makeRunnerContextBundle, setRunnerBundleRunDir } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import {
  openExistingRunnerRunWithLegacyFallback,
  openLatestRunnerRunWithLegacyFallback,
} from "./run-repository-compat.js";
import { RunnerRunRepository } from "./run-repository.js";
import { resolveSupervisorTaskRunnerPaths, resolveTaskRunnerPaths } from "./task-run-paths.js";

const roots: string[] = [];
const workflowDir = ".agentplane/tasks";
const taskId = "202607241300-LEGACY";

async function makeGitRoot(): Promise<string> {
  const root = await mkdtemp(path.join(tmpdir(), "agentplane-run-compat-"));
  roots.push(root);
  await execFileAsync("git", ["init", "--quiet", "--initial-branch=main"], { cwd: root });
  return root;
}

async function writeState(
  paths: Awaited<ReturnType<typeof resolveSupervisorTaskRunnerPaths>>,
  updatedAt: string,
  options: {
    pre_trace_legacy?: boolean;
  } = {},
): Promise<void> {
  await mkdir(paths.run_dir, { recursive: true });
  await writeFile(
    paths.state_path,
    `${JSON.stringify({
      schema_version: 1,
      runner_api_version: "1",
      run_id: path.basename(paths.run_dir),
      adapter_id: "custom",
      target: { kind: "task", task_id: taskId },
      status: "success",
      mode: "execute",
      bundle_path: paths.bundle_path,
      result_path: paths.result_path,
      ...(options.pre_trace_legacy ? {} : { receipt_path: paths.receipt_path }),
      events_path: paths.events_path,
      ...(options.pre_trace_legacy
        ? {}
        : {
            trace_path: paths.trace_path,
            stderr_path: paths.stderr_path,
            trace_policy: {
              mode: "raw",
              max_tail_bytes: 65_536,
              capture_stderr: true,
            },
            timeout_policy: {
              wall_clock_ms: 60_000,
              idle_ms: 30_000,
              terminate_grace_ms: 1000,
            },
          }),
      created_at: updatedAt,
      updated_at: updatedAt,
    })}\n`,
  );
}

async function writePreTraceLegacyRecord(opts: {
  git_root: string;
  paths: ReturnType<typeof resolveTaskRunnerPaths>;
  include_trace_contract?: boolean;
}): Promise<void> {
  const runId = path.basename(opts.paths.run_dir);
  const bundle = makeRunnerContextBundle({
    taskId,
    runId,
    gitRoot: opts.git_root,
    mode: "execute",
  });
  setRunnerBundleRunDir(bundle, opts.paths.run_dir);
  const artifactPaths = bundle.execution.artifact_paths as Record<string, unknown>;
  const omittedPaths = [
    "blueprint_plan_path",
    "blueprint_execution_plan_path",
    "blueprint_execution_state_path",
    "context_manifest_path",
    "receipt_path",
    ...(opts.include_trace_contract ? [] : ["trace_path", "stderr_path"]),
  ];
  for (const key of omittedPaths) {
    Reflect.deleteProperty(artifactPaths, key);
  }
  if (!opts.include_trace_contract) {
    Reflect.deleteProperty(bundle.execution, "trace_policy");
    Reflect.deleteProperty(bundle.execution, "timeout_policy");
  }

  const createdAt = "2026-03-24T08:27:15.596Z";
  const endedAt = "2026-03-24T08:29:33.646Z";
  await mkdir(opts.paths.run_dir, { recursive: true });
  await Promise.all([
    writeFile(opts.paths.bundle_path, `${JSON.stringify(bundle, null, 2)}\n`),
    writeFile(
      opts.paths.state_path,
      `${JSON.stringify(
        {
          schema_version: 1,
          runner_api_version: "1",
          run_id: runId,
          adapter_id: bundle.execution.adapter_id,
          target: bundle.target,
          status: opts.include_trace_contract ? "prepared" : "cancelled",
          mode: "execute",
          bundle_path: opts.paths.bundle_path,
          result_path: opts.paths.result_path,
          bootstrap_path: opts.paths.bootstrap_path,
          events_path: opts.paths.events_path,
          ...(opts.include_trace_contract
            ? {
                trace_path: opts.paths.trace_path,
                stderr_path: opts.paths.stderr_path,
                trace_policy: bundle.execution.trace_policy,
                timeout_policy: bundle.execution.timeout_policy,
              }
            : {}),
          created_at: createdAt,
          updated_at: endedAt,
          ...(opts.include_trace_contract
            ? {}
            : {
                result: {
                  status: "cancelled",
                  exit_code: 0,
                  started_at: createdAt,
                  ended_at: endedAt,
                  stderr_summary: "Codex runner cancelled via SIGTERM.",
                  output_paths: [opts.paths.bundle_path, opts.paths.bootstrap_path],
                  metrics: {
                    duration_ms: 138_050,
                    stdout_bytes: 147_982,
                    stderr_bytes: 760,
                    output_last_message_bytes: null,
                  },
                  artifacts: [
                    { path: opts.paths.bundle_path },
                    { path: opts.paths.bootstrap_path },
                  ],
                  capabilities_used: ["codex.exec"],
                },
              }),
        },
        null,
        2,
      )}\n`,
    ),
    writeFile(opts.paths.events_path, ""),
    writeFile(opts.paths.bootstrap_path, "Historical runner bootstrap.\n"),
  ]);
}

afterEach(async () => {
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("runner repository legacy compatibility", () => {
  it("falls back to task-local storage for an explicit historical run", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-legacy";
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writeState(taskPaths, "2026-07-24T09:00:00.000Z");

    const repository = await openExistingRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });

    expect(repository.paths.run_dir).toBe(taskPaths.run_dir);
  });

  it("keeps supervisor storage authoritative when both stores contain the run id", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-collision";
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writeState(taskPaths, "2026-07-24T09:00:00.000Z");
    await writeState(supervisorPaths, "2026-07-24T09:01:00.000Z");

    const repository = await openExistingRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });

    expect(repository.paths.run_dir).toBe(supervisorPaths.run_dir);
  });

  it("uses the historical latest run when supervisor storage has no runs", async () => {
    const gitRoot = await makeGitRoot();
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-legacy-newer",
    });
    await writeState(taskPaths, "2026-07-24T09:02:00.000Z", {
      pre_trace_legacy: true,
    });

    const selected = await openLatestRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
    });

    expect(selected.run_id).toBe("run-legacy-newer");
    expect(selected.repository.paths.run_dir).toBe(taskPaths.run_dir);
    await expect(selected.repository.readState()).resolves.toMatchObject({
      run_id: "run-legacy-newer",
      status: "success",
    });
  });

  it("reads a complete pre-trace task-local record through the legacy contract", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-pre-trace-record";
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writePreTraceLegacyRecord({ git_root: gitRoot, paths: taskPaths });

    const repository = await openExistingRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    const record = await repository.readRequiredRecord({
      task_id: taskId,
      run_id: runId,
    });

    expect(repository.storage).toBe("task");
    expect(record.state).toMatchObject({
      run_id: runId,
      status: "cancelled",
      result: {
        status: "cancelled",
        exit_code: 0,
      },
    });
    expect(record.bundle.execution.artifact_paths).not.toHaveProperty("trace_path");
  });

  it("does not apply the pre-trace task profile to supervisor storage", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-pre-trace-supervisor";
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writePreTraceLegacyRecord({
      git_root: gitRoot,
      paths: supervisorPaths,
    });
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
      storage: "supervisor",
    });

    await expect(
      repository.readRequiredRecord({
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toThrow("invalid supervisor contract");
  });

  it("reads the transitional task-local profile with trace authority but no blueprints", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-transitional-legacy";
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writePreTraceLegacyRecord({
      git_root: gitRoot,
      paths: taskPaths,
      include_trace_contract: true,
    });
    const repository = await openExistingRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });

    await expect(
      repository.readRequiredRecord({
        task_id: taskId,
        run_id: runId,
      }),
    ).resolves.toMatchObject({
      state: {
        status: "prepared",
        trace_path: taskPaths.trace_path,
      },
    });
  });

  it("ignores unrelated files and incomplete directories in historical task storage", async () => {
    const gitRoot = await makeGitRoot();
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-legacy-valid",
    });
    await writeState(taskPaths, "2026-07-24T09:02:00.000Z");
    await writeFile(path.join(taskPaths.runs_dir, ".DS_Store"), "legacy metadata");
    await mkdir(path.join(taskPaths.runs_dir, "run-legacy-incomplete"));

    const selected = await openLatestRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
    });

    expect(selected.run_id).toBe("run-legacy-valid");
    expect(selected.repository.paths.run_dir).toBe(taskPaths.run_dir);
  });

  it("keeps supervisor latest authoritative over a newer task-local timestamp", async () => {
    const gitRoot = await makeGitRoot();
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-legacy-newer",
    });
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-supervisor-older",
    });
    await writeState(taskPaths, "2026-07-24T09:02:00.000Z");
    await writeState(supervisorPaths, "2026-07-24T09:01:00.000Z");

    const selected = await openLatestRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
    });

    expect(selected.run_id).toBe("run-supervisor-older");
    expect(selected.repository.paths.run_dir).toBe(supervisorPaths.run_dir);
  });

  it("does not hide an unsafe supervisor run behind a legacy fallback", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-unsafe-supervisor";
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writeState(taskPaths, "2026-07-24T09:00:00.000Z");
    const outside = await mkdtemp(path.join(tmpdir(), "agentplane-run-compat-outside-"));
    roots.push(outside);
    await mkdir(supervisorPaths.runs_dir, { recursive: true });
    await symlink(outside, supervisorPaths.run_dir);

    await expect(
      openExistingRunnerRunWithLegacyFallback({
        git_root: gitRoot,
        workflow_dir: workflowDir,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toThrow("non-symlink directories");
  });

  it("does not treat an unsafe supervisor runs parent as an absent explicit run", async () => {
    const gitRoot = await makeGitRoot();
    const runId = "run-unsafe-parent";
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: runId,
    });
    await writeState(taskPaths, "2026-07-24T09:00:00.000Z");
    const outside = await mkdtemp(path.join(tmpdir(), "agentplane-run-compat-parent-"));
    roots.push(outside);
    await mkdir(supervisorPaths.task_dir, { recursive: true });
    await symlink(outside, supervisorPaths.runs_dir);

    await expect(
      openExistingRunnerRunWithLegacyFallback({
        git_root: gitRoot,
        workflow_dir: workflowDir,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toThrow("non-symlink directories");
  });

  it("does not hide a supervisor symlink entry behind latest legacy fallback", async () => {
    const gitRoot = await makeGitRoot();
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-legacy",
    });
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-supervisor-symlink",
    });
    await writeState(taskPaths, "2026-07-24T09:00:00.000Z");
    const outside = await mkdtemp(path.join(tmpdir(), "agentplane-run-compat-latest-"));
    roots.push(outside);
    await mkdir(supervisorPaths.runs_dir, { recursive: true });
    await symlink(outside, supervisorPaths.run_dir);

    await expect(
      openLatestRunnerRunWithLegacyFallback({
        git_root: gitRoot,
        workflow_dir: workflowDir,
        task_id: taskId,
      }),
    ).rejects.toMatchObject({
      context: {
        storage: "supervisor",
        reason: "runner_runs_invalid_entries",
      },
    });
  });

  it("does not hide an incomplete supervisor run behind latest legacy fallback", async () => {
    const gitRoot = await makeGitRoot();
    const taskPaths = resolveTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-legacy",
    });
    const supervisorPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
      run_id: "run-supervisor-incomplete",
    });
    await writeState(taskPaths, "2026-07-24T09:00:00.000Z");
    await mkdir(supervisorPaths.run_dir, { recursive: true });

    await expect(
      openLatestRunnerRunWithLegacyFallback({
        git_root: gitRoot,
        workflow_dir: workflowDir,
        task_id: taskId,
      }),
    ).rejects.toMatchObject({
      context: {
        storage: "supervisor",
        reason: "runner_runs_incomplete",
        incomplete_run_ids: ["run-supervisor-incomplete"],
      },
    });
  });
});
