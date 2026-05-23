import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { describe } from "vitest";

import {
  captureStdIO,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

async function createTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route decision batch task",
      "--description",
      "Exercise route decision batch ownership.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--allow-duplicate",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return taskIo.stdout.trim();
  } finally {
    taskIo.restore();
  }
}

async function approveTasks(root: string, taskIds: string[], text: string): Promise<void> {
  for (const taskId of taskIds) {
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      text,
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  }
}

async function writeBatchMeta(opts: {
  root: string;
  primaryTaskId: string;
  includedTaskId: string;
  branch: string;
  status?: "OPEN";
}): Promise<void> {
  const prDir = path.join(opts.root, ".agentplane", "tasks", opts.primaryTaskId, "pr");
  await mkdir(prDir, { recursive: true });
  await writeFile(
    path.join(prDir, "meta.json"),
    JSON.stringify(
      {
        schema_version: 1,
        task_id: opts.primaryTaskId,
        branch: opts.branch,
        base: "main",
        ...(opts.status
          ? {
              created_at: "2026-05-23T00:00:00.000Z",
              updated_at: "2026-05-23T00:00:00.000Z",
              status: opts.status,
              pr_number: 123,
              pr_url: "https://github.com/example/repo/pull/123",
            }
          : {}),
        related_task_ids: [opts.includedTaskId],
        batch: {
          schema_version: 1,
          primary_task_id: opts.primaryTaskId,
          included_task_ids: [opts.includedTaskId],
          closure_policy: "all_or_fail",
        },
      },
      null,
      2,
    ),
    "utf8",
  );
}

describe("runCli route decision batch ownership", () => {
  it("exposes branch_pr batch ownership in route and brief output", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const primaryTaskId = await createTask(root);
    const includedTaskId = await createTask(root);
    await approveTasks(
      root,
      [primaryTaskId, includedTaskId],
      "Exercise batch ownership route diagnostics.",
    );

    const branch = `task/${primaryTaskId}/batch-owner`;
    await writeBatchMeta({ root, primaryTaskId, includedTaskId, branch, status: "OPEN" });

    const includedBriefIo = captureStdIO();
    try {
      const code = await runCli(["task", "brief", includedTaskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(includedBriefIo.stdout) as {
        batch_ownership: {
          role: string;
          primary_task_id: string;
          included_task_ids: string[];
          branch: string;
          task_states: { id: string; status: string; verification: string | null }[];
          next_owner_action: { code: string; command: string };
        };
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.batch_ownership).toMatchObject({
        role: "included",
        primary_task_id: primaryTaskId,
        included_task_ids: [includedTaskId],
        branch,
        next_owner_action: {
          code: "verify_included_task",
          command: `agentplane verify ${includedTaskId} --ok|--rework --by CODER --note "..."`,
        },
      });
      expect(parsed.batch_ownership.task_states).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: primaryTaskId, status: "TODO", verification: "pending" }),
          expect.objectContaining({ id: includedTaskId, status: "TODO", verification: "pending" }),
        ]),
      );
      expect(parsed.next_action.code).toBe("verify_included_task");
      expect(parsed.next_action.command).not.toContain(`agentplane pr open ${includedTaskId}`);
      expect(parsed.blockers.map((blocker) => blocker.code)).not.toContain("missing_pr_branch");
    } finally {
      includedBriefIo.restore();
    }

    const includedTextIo = captureStdIO();
    try {
      const code = await runCli(["task", "brief", includedTaskId, "--root", root]);
      expect(code).toBe(0);
      expect(includedTextIo.stdout).toContain("batch_primary:");
      expect(includedTextIo.stdout).toContain(primaryTaskId);
      expect(includedTextIo.stdout).toContain("batch_included:");
      expect(includedTextIo.stdout).toContain(includedTaskId);
      expect(includedTextIo.stdout).toContain("batch_branch:");
      expect(includedTextIo.stdout).toContain(branch);
      expect(includedTextIo.stdout).toContain(`agentplane verify ${includedTaskId}`);
      expect(includedTextIo.stdout).not.toContain(`agentplane pr open ${includedTaskId}`);
    } finally {
      includedTextIo.restore();
    }

    const primaryStatusIo = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "status",
        primaryTaskId,
        "--route",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const parsed = JSON.parse(primaryStatusIo.stdout) as {
        batchOwnership: {
          role: string;
          primaryTaskId: string;
          includedTaskIds: string[];
          branch: string;
          nextOwnerAction: { code: string; command: string };
        };
        source_confidence: Record<string, { source: string; freshness: string }>;
      };
      expect(parsed.batchOwnership).toMatchObject({
        role: "primary",
        primaryTaskId,
        includedTaskIds: [includedTaskId],
        branch,
        nextOwnerAction: {
          code: "collect_included_verification",
          command: `agentplane task brief ${includedTaskId}`,
        },
      });
      expect(parsed.source_confidence.batch_ownership).toMatchObject({
        source: "pr_artifact",
        freshness: "live_local",
      });
    } finally {
      primaryStatusIo.restore();
    }
  });

  it("does not let stale batch PR artifacts override direct-mode routing", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const primaryTaskId = await createTask(root);
    const includedTaskId = await createTask(root);
    await approveTasks(
      root,
      [primaryTaskId, includedTaskId],
      "Exercise direct routing with stale batch artifacts.",
    );
    await writeBatchMeta({
      root,
      primaryTaskId,
      includedTaskId,
      branch: `task/${primaryTaskId}/old-batch`,
    });

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", includedTaskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
      };
      expect(parsed.next_action).toMatchObject({
        code: "none",
        command: `agentplane task verify-show ${includedTaskId}`,
      });
    } finally {
      nextIo.restore();
    }
  });
});
