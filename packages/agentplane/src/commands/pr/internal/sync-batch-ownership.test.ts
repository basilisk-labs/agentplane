import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  approveTaskPlan,
  captureStdIO,
  installRunCliIntegrationHarness,
  recordVerificationOk,
  runCliSilent,
  writeAndConfigureRoot,
  writeConfig,
} from "@agentplane/testkit";

import { createIncidentRegistrySkeleton } from "../../../runtime/incidents/index.js";
import { runCli as runAgentplaneCli } from "../../../cli/run-cli.js";

const execFileAsync = promisify(execFile);

installRunCliIntegrationHarness();

async function setupBranchPrRoot(): Promise<string> {
  const root = await writeAndConfigureRoot();
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await mkdir(path.join(root, ".agentplane", "policy"), { recursive: true });
  await mkdir(path.join(root, "packages", "agentplane", "assets", "policy"), {
    recursive: true,
  });
  await writeFile(
    path.join(root, ".agentplane", "policy", "incidents.md"),
    createIncidentRegistrySkeleton(),
    "utf8",
  );
  await writeFile(
    path.join(root, "packages", "agentplane", "assets", "policy", "incidents.md"),
    createIncidentRegistrySkeleton(),
    "utf8",
  );
  await writeFile(path.join(root, "seed.txt"), "seed\n", "utf8");
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "--no-verify", "-m", "seed"], { cwd: root });
  return root;
}

async function createVerifiedTask(root: string, taskId: string): Promise<void> {
  const addCode = await runCliSilent([
    "task",
    "add",
    taskId,
    "--title",
    `Batch task ${taskId}`,
    "--description",
    "Exercise branch_pr batch ownership.",
    "--priority",
    "high",
    "--owner",
    "CODER",
    "--tag",
    "workflow",
    "--root",
    root,
  ]);
  expect(addCode).toBe(0);
  await approveTaskPlan(root, taskId);
  const startCode = await runCliSilent([
    "task",
    "start-ready",
    taskId,
    "--author",
    "CODER",
    "--body",
    "Start: exercise branch_pr batch ownership.",
    "--root",
    root,
  ]);
  expect(startCode).toBe(0);
  await recordVerificationOk(root, taskId);
}

async function readTask(
  root: string,
  taskId: string,
): Promise<{
  extensions?: {
    branch_pr_batch?: {
      role?: string;
      primary_task_id?: string;
      branch?: string;
      included_task_ids?: string[];
    };
  };
}> {
  const taskShow = captureStdIO();
  try {
    const showCode = await runAgentplaneCli(["task", "show", taskId, "--root", root]);
    expect(showCode).toBe(0);
    return JSON.parse(taskShow.stdout) as {
      extensions?: {
        branch_pr_batch?: {
          role?: string;
          primary_task_id?: string;
          branch?: string;
          included_task_ids?: string[];
        };
      };
    };
  } finally {
    taskShow.restore();
  }
}

describe("branch_pr batch ownership sync", () => {
  it("persists included-task ownership for route fallback and clears stale ownership", async () => {
    const root = await setupBranchPrRoot();
    const primaryTaskId = "202603271940-BATCH1";
    const firstIncludedTaskId = "202603271940-BATCH2";
    const secondIncludedTaskId = "202603271940-BATCH3";
    for (const taskId of [primaryTaskId, firstIncludedTaskId, secondIncludedTaskId]) {
      await createVerifiedTask(root, taskId);
    }

    const branch = `task/${primaryTaskId}/batch-ownership`;
    const openCode = await runCliSilent([
      "pr",
      "open",
      primaryTaskId,
      "--branch",
      branch,
      "--include-task",
      firstIncludedTaskId,
      "--sync-only",
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(openCode).toBe(0);
    const firstIncludedAfterOpen = await readTask(root, firstIncludedTaskId);
    expect(firstIncludedAfterOpen.extensions?.branch_pr_batch).toMatchObject({
      role: "included",
      primary_task_id: primaryTaskId,
      branch,
      included_task_ids: [firstIncludedTaskId],
    });

    const includedStatus = captureStdIO();
    try {
      const statusCode = await runAgentplaneCli([
        "task",
        "status",
        firstIncludedTaskId,
        "--route",
        "--root",
        root,
      ]);
      expect(statusCode).toBe(0);
      expect(includedStatus.stdout).toContain("pr_branch:");
      expect(includedStatus.stdout).toContain(branch);
    } finally {
      includedStatus.restore();
    }

    const changeCode = await runCliSilent([
      "pr",
      "open",
      primaryTaskId,
      "--branch",
      branch,
      "--include-task",
      secondIncludedTaskId,
      "--sync-only",
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(changeCode).toBe(0);
    const firstIncludedAfterChange = await readTask(root, firstIncludedTaskId);
    const secondIncludedAfterChange = await readTask(root, secondIncludedTaskId);
    expect(firstIncludedAfterChange.extensions?.branch_pr_batch).toBeUndefined();
    expect(secondIncludedAfterChange.extensions?.branch_pr_batch).toMatchObject({
      role: "included",
      primary_task_id: primaryTaskId,
      branch,
      included_task_ids: [secondIncludedTaskId],
    });

    const clearCode = await runCliSilent([
      "pr",
      "open",
      primaryTaskId,
      "--branch",
      branch,
      "--sync-only",
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(clearCode).toBe(0);
    const primaryAfterClear = await readTask(root, primaryTaskId);
    const secondIncludedAfterClear = await readTask(root, secondIncludedTaskId);
    expect(primaryAfterClear.extensions?.branch_pr_batch).toBeUndefined();
    expect(secondIncludedAfterClear.extensions?.branch_pr_batch).toBeUndefined();
  });

  it("does not clear stale ownership that already belongs to another primary batch", async () => {
    const root = await setupBranchPrRoot();
    const oldPrimaryTaskId = "202603271940-BATCH4";
    const newPrimaryTaskId = "202603271940-BATCH5";
    const includedTaskId = "202603271940-BATCH6";
    for (const taskId of [oldPrimaryTaskId, newPrimaryTaskId, includedTaskId]) {
      await createVerifiedTask(root, taskId);
    }

    const oldBranch = `task/${oldPrimaryTaskId}/old-batch`;
    const oldOpenCode = await runCliSilent([
      "pr",
      "open",
      oldPrimaryTaskId,
      "--branch",
      oldBranch,
      "--include-task",
      includedTaskId,
      "--sync-only",
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(oldOpenCode).toBe(0);

    const newBranch = `task/${newPrimaryTaskId}/new-batch`;
    const newOpenCode = await runCliSilent([
      "pr",
      "open",
      newPrimaryTaskId,
      "--branch",
      newBranch,
      "--include-task",
      includedTaskId,
      "--sync-only",
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(newOpenCode).toBe(0);

    const oldClearCode = await runCliSilent([
      "pr",
      "open",
      oldPrimaryTaskId,
      "--branch",
      oldBranch,
      "--sync-only",
      "--author",
      "CODER",
      "--root",
      root,
    ]);
    expect(oldClearCode).toBe(0);

    const includedAfterOldClear = await readTask(root, includedTaskId);
    expect(includedAfterOldClear.extensions?.branch_pr_batch).toMatchObject({
      role: "included",
      primary_task_id: newPrimaryTaskId,
      branch: newBranch,
      included_task_ids: [includedTaskId],
    });
  });
});
