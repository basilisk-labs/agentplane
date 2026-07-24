import { mkdtemp, mkdir, rename, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  openLatestRunnerRun,
  resolveLatestRunnerRunId,
  RunnerRunRepository,
} from "./run-repository.js";
import { resolveSupervisorTaskRunnerPaths, resolveTaskRunnerPaths } from "./task-run-paths.js";

const roots: string[] = [];

async function makeRunnerRoot(): Promise<{
  gitRoot: string;
  workflowDir: string;
  taskId: string;
}> {
  const gitRoot = await mkdtemp(path.join(tmpdir(), "agentplane-run-repository-"));
  roots.push(gitRoot);
  return {
    gitRoot,
    workflowDir: ".agentplane/tasks",
    taskId: "202607241200-RUNSEC",
  };
}

async function makeGitRunnerRoot(): Promise<Awaited<ReturnType<typeof makeRunnerRoot>>> {
  const root = await makeRunnerRoot();
  await execFileAsync("git", ["init", "--quiet", "--initial-branch=main"], {
    cwd: root.gitRoot,
  });
  return root;
}

async function writeCandidateState(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  runId: string;
  updatedAt?: string;
}): Promise<ReturnType<typeof resolveTaskRunnerPaths>> {
  const paths = resolveTaskRunnerPaths({
    git_root: opts.gitRoot,
    workflow_dir: opts.workflowDir,
    task_id: opts.taskId,
    run_id: opts.runId,
  });
  await mkdir(paths.run_dir, { recursive: true });
  const createdAt = "2026-07-24T09:00:00.000Z";
  await writeFile(
    paths.state_path,
    `${JSON.stringify({
      created_at: createdAt,
      updated_at: opts.updatedAt ?? createdAt,
    })}\n`,
  );
  return paths;
}

async function writeSupervisorCandidateState(opts: {
  gitRoot: string;
  workflowDir: string;
  taskId: string;
  runId: string;
  updatedAt?: string;
}): Promise<Awaited<ReturnType<typeof resolveSupervisorTaskRunnerPaths>>> {
  const paths = await resolveSupervisorTaskRunnerPaths({
    git_root: opts.gitRoot,
    workflow_dir: opts.workflowDir,
    task_id: opts.taskId,
    run_id: opts.runId,
  });
  await mkdir(paths.run_dir, { recursive: true });
  const createdAt = "2026-07-24T09:00:00.000Z";
  await writeFile(
    paths.state_path,
    `${JSON.stringify({
      created_at: createdAt,
      updated_at: opts.updatedAt ?? createdAt,
    })}\n`,
  );
  return paths;
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(roots.splice(0).map(async (root) => await rm(root, { recursive: true })));
});

describe("guarded existing runner repositories", () => {
  it("rejects an explicit run_dir symlink", async () => {
    const root = await makeRunnerRoot();
    const paths = resolveTaskRunnerPaths({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
      run_id: "run-symlink",
    });
    const outside = await mkdtemp(path.join(tmpdir(), "agentplane-run-outside-"));
    roots.push(outside);
    await mkdir(paths.runs_dir, { recursive: true });
    await symlink(outside, paths.run_dir);

    await expect(
      RunnerRunRepository.openExistingTaskRun({
        git_root: root.gitRoot,
        workflow_dir: root.workflowDir,
        task_id: root.taskId,
        run_id: "run-symlink",
        storage: "task",
      }),
    ).rejects.toThrow("stable non-symlink directory");
  });

  it("rejects a run_dir replaced after its boundary was captured", async () => {
    const root = await makeRunnerRoot();
    const paths = await writeCandidateState({
      ...root,
      runId: "run-replaced",
    });
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
      run_id: "run-replaced",
      storage: "task",
    });
    await rename(paths.run_dir, `${paths.run_dir}.old`);
    await mkdir(paths.run_dir);
    await writeFile(paths.state_path, '{"updated_at":"2099-01-01T00:00:00.000Z"}\n');

    await expect(repository.readState()).rejects.toThrow("run_dir identity changed");
  });

  it("guards the latest-run readdir-to-read interval with the captured boundary", async () => {
    const root = await makeRunnerRoot();
    const paths = await writeCandidateState({
      ...root,
      runId: "run-latest",
    });
    const openExisting = RunnerRunRepository.openExistingTaskRun.bind(RunnerRunRepository);
    vi.spyOn(RunnerRunRepository, "openExistingTaskRun").mockImplementationOnce(async (opts) => {
      const repository = await openExisting(opts);
      await rename(paths.run_dir, `${paths.run_dir}.old`);
      await mkdir(paths.run_dir);
      await writeFile(paths.state_path, '{"updated_at":"2099-01-01T00:00:00.000Z"}\n');
      return repository;
    });

    await expect(
      resolveLatestRunnerRunId({
        git_root: root.gitRoot,
        workflow_dir: root.workflowDir,
        task_id: root.taskId,
        storage: "task",
      }),
    ).rejects.toThrow("run_dir identity changed");
  });

  it("retains the selected latest run boundary for subsequent status and log reads", async () => {
    const root = await makeRunnerRoot();
    const paths = await writeCandidateState({
      ...root,
      runId: "run-selected",
    });
    const selected = await openLatestRunnerRun({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
      storage: "task",
    });
    await rename(paths.run_dir, `${paths.run_dir}.old`);
    await mkdir(paths.run_dir);
    await writeFile(paths.state_path, '{"updated_at":"2099-01-01T00:00:00.000Z"}\n');

    expect(selected.run_id).toBe("run-selected");
    await expect(selected.repository.readState()).rejects.toThrow("run_dir identity changed");
  });

  it("defaults existing-run lookup to supervisor storage and keeps task storage explicit", async () => {
    const root = await makeGitRunnerRoot();
    const runId = "run-default-storage";
    const taskPaths = await writeCandidateState({
      ...root,
      runId,
    });
    const supervisorPaths = await writeSupervisorCandidateState({
      ...root,
      runId,
    });

    const defaultRepository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
      run_id: runId,
    });
    const taskRepository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
      run_id: runId,
      storage: "task",
    });

    expect(defaultRepository.paths.run_dir).toBe(supervisorPaths.run_dir);
    expect(taskRepository.paths.run_dir).toBe(taskPaths.run_dir);
  });

  it("defaults latest-run lookup and id resolution to supervisor storage", async () => {
    const root = await makeGitRunnerRoot();
    await writeSupervisorCandidateState({
      ...root,
      runId: "run-supervisor-old",
      updatedAt: "2026-07-24T09:01:00.000Z",
    });
    const latestSupervisor = await writeSupervisorCandidateState({
      ...root,
      runId: "run-supervisor-new",
      updatedAt: "2026-07-24T09:02:00.000Z",
    });
    const latestTask = await writeCandidateState({
      ...root,
      runId: "run-task-newer",
      updatedAt: "2026-07-24T09:03:00.000Z",
    });

    const selected = await openLatestRunnerRun({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
    });
    const resolvedId = await resolveLatestRunnerRunId({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
    });
    const selectedTask = await openLatestRunnerRun({
      git_root: root.gitRoot,
      workflow_dir: root.workflowDir,
      task_id: root.taskId,
      storage: "task",
    });

    expect(selected.run_id).toBe("run-supervisor-new");
    expect(selected.repository.paths.run_dir).toBe(latestSupervisor.run_dir);
    expect(resolvedId).toBe("run-supervisor-new");
    expect(selectedTask.run_id).toBe("run-task-newer");
    expect(selectedTask.repository.paths.run_dir).toBe(latestTask.run_dir);
  });
});
