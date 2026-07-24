import { mkdtemp, mkdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { afterEach, describe, expect, it } from "vitest";

import {
  openExistingRunnerRunWithLegacyFallback,
  openLatestRunnerRunWithLegacyFallback,
} from "./run-repository-compat.js";
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
): Promise<void> {
  await mkdir(paths.run_dir, { recursive: true });
  await writeFile(
    paths.state_path,
    `${JSON.stringify({
      created_at: updatedAt,
      updated_at: updatedAt,
    })}\n`,
  );
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
    await writeState(taskPaths, "2026-07-24T09:02:00.000Z");

    const selected = await openLatestRunnerRunWithLegacyFallback({
      git_root: gitRoot,
      workflow_dir: workflowDir,
      task_id: taskId,
    });

    expect(selected.run_id).toBe("run-legacy-newer");
    expect(selected.repository.paths.run_dir).toBe(taskPaths.run_dir);
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
