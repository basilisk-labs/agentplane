import { execFileAsync } from "@agentplaneorg/core/process";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import { describe } from "vitest";

import {
  captureStdIO,
  commitAll,
  configureGitUser,
  defaultConfig,
  expect,
  it,
  mkGitRepoRootWithBranch,
  runCli,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit/cli-core-pr-flow";

async function createBranchPrTask(root: string): Promise<string> {
  const taskIo = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Route decision task",
      "--description",
      "Exercise route decision commands for branch_pr recovery.",
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

async function recordEvaluatorReview(root: string, taskId: string): Promise<void> {
  await runCliSilent([
    "evaluator",
    "run",
    taskId,
    "--provenance",
    "evaluator_supplied",
    "--verdict",
    "pass",
    "--summary",
    "EVALUATOR quality gate passed for route decision closeout regression.",
    "--finding",
    "No unresolved findings for this route decision closeout regression.",
    "--evidence",
    `.agentplane/tasks/${taskId}/README.md`,
    "--root",
    root,
  ]);
}

describe("runCli route decision direct closeout", () => {
  it("routes approved direct tasks to current-agent start-ready before execution", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise direct route guidance before start-ready.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; nextCommand: string | null };
        next_action: { code: string; command: string | null };
      };
      expect(parsed.route_oracle.phase).toBe("direct_execution");
      expect(parsed.next_action).toMatchObject({
        code: "start_direct",
        command: `agentplane task start-ready ${taskId} --author CODER --body "Start: continue direct-mode task in current checkout."`,
      });
      expect(parsed.route_oracle.nextCommand).toBe(
        `agentplane task start-ready ${taskId} --author CODER --body "Start: continue direct-mode task in current checkout."`,
      );
      expect(parsed.next_action.command).not.toContain("task run");
    } finally {
      nextIo.restore();
    }
  });

  it("does not require a runner route for a newly started direct task without runner state", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise direct route guidance after start-ready.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct DOING task that has no runner artifact.",
      "--root",
      root,
    ]);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string; nextCommand: string | null };
        operator_guidance: {
          runner_context: {
            runner_is_required: boolean;
            runner_is_allowed_now: boolean;
            runner_failure_means: string;
          };
        };
        next_action: { code: string; command: string | null; summary: string };
      };
      expect(parsed.route_oracle.phase).toBe("direct_execution");
      expect(parsed.next_action).toMatchObject({
        code: "continue_direct",
        command: `agentplane task verify-show ${taskId}`,
      });
      expect(parsed.route_oracle.nextCommand).toBe(`agentplane task verify-show ${taskId}`);
      expect(parsed.next_action.command).not.toContain("task run");
      expect(parsed.operator_guidance.runner_context).toMatchObject({
        runner_is_required: false,
        runner_is_allowed_now: false,
        runner_failure_means: "not_runner_route",
      });
    } finally {
      nextIo.restore();
    }
  });

  it("routes verified direct tasks to closeout instead of rerunning them and drops them from active work", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "direct";
    await writeConfig(root, config);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise direct verified closeout routing.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: create a direct DOING task for verified closeout routing.",
      "--root",
      root,
    ]);
    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "EVALUATOR",
      "--note",
      "Verified: ready for direct closeout.",
      "--root",
      root,
    ]);

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        route_oracle: { phase: string };
        next_action: { code: string; command: string | null; summary: string };
      };
      expect(parsed.route_oracle.phase).toBe("direct_verified_pending_closeout");
      expect(parsed.next_action).toMatchObject({
        code: "complete_direct",
        command: `agentplane task complete ${taskId} --result "<result>" --commit <hash>`,
      });
      expect(parsed.next_action.summary).toContain("task complete");
      expect(parsed.next_action.summary).toContain("instead of rerunning execution");
    } finally {
      nextIo.restore();
    }

    const activeIo = captureStdIO();
    try {
      const code = await runCli(["task", "active", "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(activeIo.stdout) as {
        count: number;
        filtered_count: number;
        items: { task: { id: string } }[];
      };
      expect(parsed.count).toBe(0);
      expect(parsed.filtered_count).toBe(0);
      expect(parsed.items.map((item) => item.task.id)).not.toContain(taskId);
    } finally {
      activeIo.restore();
    }
  });

  it(
    "routes done direct tasks with dirty tracked task artifacts to a cleanup commit",
    { timeout: 120_000 },
    async () => {
      const root = await mkGitRepoRootWithBranch("main");
      await configureGitUser(root);
      const config = defaultConfig();
      config.workflow_mode = "direct";
      await writeConfig(root, config);
      await commitAll(root, "seed direct workflow config");

      await writeFile(path.join(root, "file.txt"), "implementation\n", "utf8");
      await commitAll(root, "seed implementation");
      const { stdout: implHash } = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: root,
      });

      const taskId = await createBranchPrTask(root);
      await runCliSilent([
        "task",
        "plan",
        "set",
        taskId,
        "--text",
        "Exercise no-close-commit route cleanup.",
        "--updated-by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      await runCliSilent([
        "task",
        "plan",
        "approve",
        taskId,
        "--by",
        "ORCHESTRATOR",
        "--root",
        root,
      ]);
      await runCliSilent([
        "task",
        "start-ready",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Start: create a direct task that will be finished without an automatic close commit.",
        "--root",
        root,
      ]);
      await runCliSilent(["blueprint", "snapshot", taskId, "--root", root]);
      await runCliSilent([
        "verify",
        taskId,
        "--ok",
        "--by",
        "EVALUATOR",
        "--note",
        "Ok to finish with manual close commit handling.",
        "--quiet",
        "--root",
        root,
      ]);
      await recordEvaluatorReview(root, taskId);
      await commitAll(root, "track task artifacts before finish");

      await runCliSilent([
        "finish",
        taskId,
        "--author",
        "CODER",
        "--body",
        "Verified: direct finish leaves task artifacts for manual cleanup when no close commit is requested.",
        "--result",
        "finish without close commit",
        "--commit",
        implHash.trim(),
        "--no-close-commit",
        "--root",
        root,
      ]);

      const trackedStatus = await execFileAsync(
        "git",
        ["status", "--short", "--untracked-files=no", "--", `.agentplane/tasks/${taskId}`],
        { cwd: root },
      );
      expect(trackedStatus.stdout).toContain(`.agentplane/tasks/${taskId}/README.md`);

      const nextIo = captureStdIO();
      try {
        const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(nextIo.stdout) as {
          route_oracle: {
            phase: string;
            blocker: { code: string } | null;
            nextCommand: string | null;
          };
          execution_packet: {
            actionKind: string;
            exactArgv: string[] | null;
            evidenceMissing: string[];
          };
          next_action: { code: string; command: string | null; summary: string };
        };
        expect(parsed.route_oracle.phase).toBe("direct_done_pending_artifact_commit");
        expect(parsed.route_oracle.blocker).toMatchObject({ code: "dirty_task_artifacts" });
        expect(parsed.next_action).toMatchObject({
          code: "commit_direct_task_artifacts",
          command: `agentplane commit ${taskId} --close --unstage-others`,
        });
        expect(parsed.next_action.summary).toContain("tracked task artifacts");
        expect(parsed.route_oracle.nextCommand).toBe(parsed.next_action.command);
        expect(parsed.execution_packet.actionKind).toBe("local_command");
        expect(parsed.execution_packet.exactArgv).toEqual([
          "agentplane",
          "commit",
          taskId,
          "--close",
          "--unstage-others",
        ]);
        expect(parsed.execution_packet.evidenceMissing).toContain("task_artifact_cleanup_commit");
      } finally {
        nextIo.restore();
      }

      await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}/README.md`], {
        cwd: root,
      });

      const stagedNextIo = captureStdIO();
      try {
        const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
        expect(code).toBe(0);
        const parsed = JSON.parse(stagedNextIo.stdout) as {
          route_oracle: { blocker: { code: string } | null };
          next_action: { code: string; command: string | null };
          execution_packet: { exactArgv: string[] | null };
        };
        expect(parsed.route_oracle.blocker).toMatchObject({ code: "dirty_task_artifacts" });
        expect(parsed.next_action).toMatchObject({
          code: "commit_direct_task_artifacts",
          command: `agentplane commit ${taskId} --close --unstage-others`,
        });
        expect(parsed.execution_packet.exactArgv).toEqual([
          "agentplane",
          "commit",
          taskId,
          "--close",
          "--unstage-others",
        ]);
      } finally {
        stagedNextIo.restore();
      }
    },
  );
});
