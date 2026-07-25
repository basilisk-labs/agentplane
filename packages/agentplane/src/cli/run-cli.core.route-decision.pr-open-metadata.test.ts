import { execFile } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

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

const execFileAsync = promisify(execFile);

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

describe("runCli route decision open PR metadata", () => {
  it("starts a TODO task in its existing worktree before routing to pr open", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Publish the already-created task branch.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed task artifacts"], { cwd: root });
    const branch = `task/${taskId}/bootstrap-existing`;
    const worktreePath = path.join(
      root,
      ".agentplane",
      "worktrees",
      `${taskId}-bootstrap-existing`,
    );
    await mkdir(path.dirname(worktreePath), { recursive: true });
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktreePath], { cwd: root });
    await writeFile(
      path.join(worktreePath, "implementation.ts"),
      "export const existingImplementation = true;\n",
    );
    const { stdout: branches } = await execFileAsync(
      "git",
      ["branch", "--format=%(refname:short)"],
      { cwd: root },
    );
    expect(branches).toContain(branch);
    const { stdout: worktreesBeforeStart } = await execFileAsync(
      "git",
      ["worktree", "list", "--porcelain"],
      { cwd: root },
    );
    const taskWorktreesBeforeStart = worktreesBeforeStart
      .split("\n")
      .filter((line) => line.startsWith("worktree ") && line.includes(taskId));

    const startRouteIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(startRouteIo.stdout) as {
        workflow_step: {
          operation: { id: string };
        };
        next_action: { code: string; command: string };
        route_oracle: {
          authoritativeCheckout: string;
          authoritativeCheckoutPath: string | null;
        };
      };
      expect(parsed.workflow_step.operation.id).toBe("task.branch.start");
      expect(parsed.next_action).toMatchObject({
        code: "start_branch",
      });
      expect(parsed.next_action.command).toContain(
        `agentplane task start-ready ${taskId} --author CODER`,
      );
      expect(parsed.route_oracle.authoritativeCheckout).toBe("task_worktree");
      expect(parsed.route_oracle.authoritativeCheckoutPath).toContain(taskId);
    } finally {
      startRouteIo.restore();
    }

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: continue branch_pr task in the existing dedicated worktree.",
      "--root",
      worktreePath,
    ]);

    const dirtyWorktreeRouteIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", worktreePath]);
      expect(code).toBe(0);
      const parsed = JSON.parse(dirtyWorktreeRouteIo.stdout) as {
        workflow_step: {
          kind: string;
          episode: { purpose: string };
          execution: { semanticMutationAllowed: boolean };
        };
        next_action: { code: string; command: string | null };
        route_oracle: { mutationPathHint: string | null };
        execution_packet: {
          safe_to_mutate: boolean;
          mutation_path_hint: string | null;
          exact_argv: string[] | null;
        };
      };
      expect(parsed.workflow_step).toMatchObject({
        kind: "agent_episode",
        episode: { purpose: "task_worktree_resolution" },
        execution: { semanticMutationAllowed: true },
      });
      expect(parsed.next_action).toMatchObject({
        code: "resolve_task_worktree_state",
        command: null,
        requiresApproval: false,
      });
      expect(typeof parsed.next_action.summary).toBe("string");
      const routeMutationPathHint = parsed.route_oracle.mutationPathHint;
      if (typeof routeMutationPathHint !== "string") {
        throw new Error("expected a mutation path for an inspectable dirty task worktree");
      }
      expect(routeMutationPathHint).toContain(`${taskId}-bootstrap-existing`);
      expect(parsed.execution_packet).toMatchObject({
        safe_to_mutate: true,
        exact_argv: null,
      });
      const packetMutationPathHint = parsed.execution_packet.mutation_path_hint;
      if (typeof packetMutationPathHint !== "string") {
        throw new Error("expected an execution-packet mutation path for semantic repair");
      }
      expect(packetMutationPathHint).toContain(`${taskId}-bootstrap-existing`);
    } finally {
      dirtyWorktreeRouteIo.restore();
    }

    await execFileAsync("git", ["add", "."], { cwd: worktreePath });
    await execFileAsync("git", ["commit", "-m", "feat: resolve existing worktree changes"], {
      cwd: worktreePath,
    });

    const openPrRouteIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", worktreePath]);
      expect(code).toBe(0);
      const parsed = JSON.parse(openPrRouteIo.stdout) as {
        workflow_step: {
          operation: { id: string };
        };
        next_action: { code: string; command: string };
        route_oracle: {
          authoritativeCheckout: string;
          authoritativeCheckoutPath: string | null;
        };
      };
      expect(parsed.workflow_step.operation.id).toBe("pr.open");
      expect(parsed.next_action).toMatchObject({
        code: "open_pr",
        command: `agentplane pr open ${taskId} --author CODER`,
      });
      expect(parsed.route_oracle.authoritativeCheckout).toBe("task_worktree");
      expect(parsed.route_oracle.authoritativeCheckoutPath).toContain(taskId);
    } finally {
      openPrRouteIo.restore();
    }

    const { stdout: worktreesAfterStart } = await execFileAsync(
      "git",
      ["worktree", "list", "--porcelain"],
      { cwd: root },
    );
    const taskWorktrees = worktreesAfterStart
      .split("\n")
      .filter((line) => line.startsWith("worktree ") && line.includes(taskId));
    expect(taskWorktrees).toEqual(taskWorktreesBeforeStart);
    expect(taskWorktrees).toHaveLength(1);
    expect(taskWorktrees[0]).toContain(`${taskId}-bootstrap-existing`);
  });

  it("routes local open PR metadata to pre-merge closure without remote lookup", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);

    const taskId = await createBranchPrTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Exercise local open PR routing.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "seed task workflow"], { cwd: root });

    const branch = `task/${taskId}/route-decision`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    await writeFile(path.join(root, "impl.txt"), "implementation\n");
    await execFileAsync("git", ["add", "impl.txt"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "feat: implementation"], { cwd: root });

    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: exercise local open PR routing through the branch_pr lifecycle.",
      "--root",
      root,
    ]);

    await runCliSilent([
      "verify",
      taskId,
      "--ok",
      "--by",
      "CODER",
      "--note",
      "Implementation verified for local open PR routing.",
      "--root",
      root,
    ]);
    await runCliSilent([
      "evaluator",
      "run",
      taskId,
      "--provenance",
      "evaluator_supplied",
      "--verdict",
      "pass",
      "--summary",
      "Quality review passed.",
      "--finding",
      "No blocking findings.",
      "--evidence",
      `.agentplane/tasks/${taskId}/README.md`,
      "--root",
      root,
    ]);

    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify(
        {
          base: "main",
          branch,
          created_at: "2026-01-01T00:00:00.000Z",
          pr_number: 123,
          pr_url: "https://github.com/example/repo/pull/123",
          schema_version: 1,
          status: "OPEN",
          task_id: taskId,
          updated_at: "2026-01-01T00:00:00.000Z",
        },
        null,
        2,
      )}\n`,
    );

    const nextIo = captureStdIO();
    try {
      const code = await runCli(["task", "next-action", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
        blockers: { code: string }[];
      };
      expect(parsed.blockers.map((blocker) => blocker.code)).toContain("pre_merge_closure_missing");
      expect(parsed.next_action.code).toBe("record_pre_merge_closure");
      expect(parsed.next_action.command).toContain("--pre-merge-closure");
    } finally {
      nextIo.restore();
    }
  });
});
