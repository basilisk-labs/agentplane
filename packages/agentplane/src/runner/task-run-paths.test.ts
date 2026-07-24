import { mkdir, mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { execFileAsync } from "@agentplaneorg/core/process";
import { afterEach, describe, expect, it } from "vitest";

import {
  RUNNER_BOOTSTRAP_FILENAME,
  RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME,
  RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME,
  RUNNER_BLUEPRINT_PLAN_FILENAME,
  RUNNER_BUNDLE_FILENAME,
  RUNNER_CONTEXT_MANIFEST_FILENAME,
  RUNNER_EVENTS_FILENAME,
  RUNNER_RESULT_FILENAME,
  RUNNER_STATE_FILENAME,
  RUNNER_STDERR_FILENAME,
  RUNNER_TRACE_FILENAME,
  createSupervisorExecutionReceiptLocator,
  resolveSupervisorExecutionReceiptLocator,
  resolveSupervisorTaskRunnerPaths,
  resolveTaskRunnerPaths,
} from "./task-run-paths.js";

const tempRoots: string[] = [];

afterEach(async () => {
  await Promise.all(
    tempRoots.splice(0).map(async (root) => await rm(root, { recursive: true, force: true })),
  );
});

describe("resolveTaskRunnerPaths", () => {
  it("derives task-local runner artifact paths under runs/<run-id>", () => {
    const paths = resolveTaskRunnerPaths({
      git_root: "/repo",
      workflow_dir: ".agentplane/tasks",
      task_id: "202603231310-NT5V5C",
      run_id: "2026-03-23T13-00-00-000Z",
    });

    expect(paths.task_dir).toBe("/repo/.agentplane/tasks/202603231310-NT5V5C");
    expect(paths.runs_dir).toBe("/repo/.agentplane/tasks/202603231310-NT5V5C/runs");
    expect(paths.run_dir).toBe(
      "/repo/.agentplane/tasks/202603231310-NT5V5C/runs/2026-03-23T13-00-00-000Z",
    );
    expect(paths.bundle_path).toBe(`${paths.run_dir}/${RUNNER_BUNDLE_FILENAME}`);
    expect(paths.blueprint_plan_path).toBe(`${paths.run_dir}/${RUNNER_BLUEPRINT_PLAN_FILENAME}`);
    expect(paths.blueprint_execution_plan_path).toBe(
      `${paths.run_dir}/${RUNNER_BLUEPRINT_EXECUTION_PLAN_FILENAME}`,
    );
    expect(paths.blueprint_execution_state_path).toBe(
      `${paths.run_dir}/${RUNNER_BLUEPRINT_EXECUTION_STATE_FILENAME}`,
    );
    expect(paths.context_manifest_path).toBe(
      `${paths.run_dir}/${RUNNER_CONTEXT_MANIFEST_FILENAME}`,
    );
    expect(paths.bootstrap_path).toBe(`${paths.run_dir}/${RUNNER_BOOTSTRAP_FILENAME}`);
    expect(paths.state_path).toBe(`${paths.run_dir}/${RUNNER_STATE_FILENAME}`);
    expect(paths.events_path).toBe(`${paths.run_dir}/${RUNNER_EVENTS_FILENAME}`);
    expect(paths.result_path).toBe(`${paths.run_dir}/${RUNNER_RESULT_FILENAME}`);
    expect(paths.trace_path).toBe(`${paths.run_dir}/${RUNNER_TRACE_FILENAME}`);
    expect(paths.stderr_path).toBe(`${paths.run_dir}/${RUNNER_STDERR_FILENAME}`);
  });

  it.each(["", ".", "..", "../escape", "nested/run", String.raw`nested\run`])(
    "rejects unsafe run_id %j before resolving artifact paths",
    (runId) => {
      expect(() =>
        resolveTaskRunnerPaths({
          git_root: "/repo",
          workflow_dir: ".agentplane/tasks",
          task_id: "202603231310-NT5V5C",
          run_id: runId,
        }),
      ).toThrow("runner run_id must be a non-empty path segment");
    },
  );

  it("keeps supervisor artifacts stable across linked worktree cleanup", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-supervisor-paths-"));
    tempRoots.push(root);
    await execFileAsync("git", ["init", "--quiet", "--initial-branch=main"], { cwd: root });
    await writeFile(path.join(root, "README.md"), "seed\n", "utf8");
    await execFileAsync("git", ["add", "--", "README.md"], { cwd: root });
    await execFileAsync(
      "git",
      [
        "-c",
        "user.name=AgentPlane",
        "-c",
        "user.email=agentplane@example.com",
        "commit",
        "--quiet",
        "-m",
        "seed",
      ],
      { cwd: root },
    );
    const linkedWorktree = path.join(root, "linked");
    await execFileAsync(
      "git",
      ["worktree", "add", "--quiet", "-b", "linked-test", linkedWorktree],
      {
        cwd: root,
      },
    );
    const inputs = {
      workflow_dir: ".agentplane/tasks",
      task_id: "202603231310-NT5V5C",
      run_id: "2026-03-23T13-00-00-000Z",
    };

    const basePaths = await resolveSupervisorTaskRunnerPaths({
      ...inputs,
      git_root: root,
    });
    const linkedPaths = await resolveSupervisorTaskRunnerPaths({
      ...inputs,
      git_root: linkedWorktree,
    });

    expect(linkedPaths).toEqual(basePaths);
    expect(basePaths.artifact_root).toBe(await realpath(path.join(root, ".git")));
    await mkdir(basePaths.run_dir, { recursive: true });
    await writeFile(basePaths.bundle_path, "durable evidence\n", "utf8");
    await writeFile(basePaths.receipt_path, "durable receipt\n", "utf8");
    const receiptLocator = createSupervisorExecutionReceiptLocator({
      task_id: inputs.task_id,
      run_id: inputs.run_id,
    });
    expect(receiptLocator).toBe(
      `agentplane-run://tasks/${inputs.task_id}/${inputs.run_id}/execution-receipt.json`,
    );
    await expect(
      resolveSupervisorExecutionReceiptLocator({
        git_root: linkedWorktree,
        workflow_dir: inputs.workflow_dir,
        locator: receiptLocator,
      }),
    ).resolves.toBe(basePaths.receipt_path);

    await execFileAsync("git", ["worktree", "remove", "--force", linkedWorktree], { cwd: root });

    const pathsAfterCleanup = await resolveSupervisorTaskRunnerPaths({
      ...inputs,
      git_root: root,
    });
    expect(pathsAfterCleanup).toEqual(basePaths);
    expect(await readFile(pathsAfterCleanup.bundle_path, "utf8")).toBe("durable evidence\n");
    const receiptPathAfterCleanup = await resolveSupervisorExecutionReceiptLocator({
      git_root: root,
      workflow_dir: inputs.workflow_dir,
      locator: receiptLocator,
    });
    expect(await readFile(receiptPathAfterCleanup, "utf8")).toBe("durable receipt\n");
  });

  it.each([
    "not-a-locator",
    "agentplane-run://other/TASK/run/execution-receipt.json",
    "agentplane-run://tasks/../run/execution-receipt.json",
    "agentplane-run://tasks/TASK/run/result.json",
    "agentplane-run://tasks/TASK/run/execution-receipt.json?override=1",
  ])("rejects invalid supervisor receipt locator %j", async (locator) => {
    await expect(
      resolveSupervisorExecutionReceiptLocator({
        git_root: "/repo",
        workflow_dir: ".agentplane/tasks",
        locator,
      }),
    ).rejects.toThrow("Invalid supervisor execution receipt locator");
  });
});
