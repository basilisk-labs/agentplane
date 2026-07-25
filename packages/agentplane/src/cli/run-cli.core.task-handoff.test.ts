import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { defaultConfig } from "@agentplaneorg/core/config";
import { execFileAsync } from "@agentplaneorg/core/process";

import { loadCommandContext } from "../commands/shared/task-backend.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../runner/artifacts.js";
import { staleClaim, writeActiveClaim } from "../runner/usecases/task-run-active-claim.testkit.js";
import { prepareTaskRunnerExecution } from "../runner/usecases/task-run.js";
import { runCli } from "./run-cli.js";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

installRunCliIntegrationHarness();

describe("runCli task handoff and recovery", () => {
  it("task reclaim records a deterministic handoff for a task awaiting a local agent", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Handoff without run",
            "--description",
            "Capture reclaim state before another local agent has picked up the task.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: move the task into DOING before reclaiming it through the handoff surface.",
      "--root",
      root,
    ]);

    const io = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "reclaim",
          taskId,
          "--author",
          "CODER",
          "--reason",
          "Original agent disconnected before another local agent picked up the task.",
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task_id: string;
        to_role?: string | null;
        runner?: { next_action?: string | null; next_command?: string | null };
      };
      expect(payload.task_id).toBe(taskId);
      expect(payload.to_role).toBe("CODER");
      expect(payload.runner?.next_action).toBe("run");
      expect(payload.runner?.next_command).toBe(`agentplane task run ${taskId}`);
      expect(io.stdout).toBe(`${JSON.stringify(payload, null, 2)}\n`);
    } finally {
      io.restore();
    }
  });

  it("task reclaim cancels a stale running runner before recording handoff", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Stale runner reclaim",
            "--description",
            "Exercise reclaim recovery after a runner process disappears.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: prepare a task runner artifact before simulating a stale PID.",
      "--root",
      root,
    ]);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-stale-running-reclaim",
    });
    const staleAt = "2000-01-01T00:00:00.000Z";
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "running",
        updated_at: staleAt,
        supervision: {
          pid: 999_997,
          started_at: staleAt,
          heartbeat_at: staleAt,
        },
      }),
    });
    const activeClaim = await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: prepared.invocation.run_id }),
    );

    const reclaimIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "reclaim",
          taskId,
          "--author",
          "CODER",
          "--reason",
          "stale runner pid is no longer alive",
          "--json",
          "--root",
          root,
        ]),
      ).toBe(0);
      const handoff = JSON.parse(reclaimIo.stdout) as {
        to_role: string | null;
        runner?: { run_id?: string | null; status?: string | null; next_action?: string | null };
      };
      expect(handoff).toMatchObject({
        to_role: "CODER",
        runner: {
          run_id: prepared.invocation.run_id,
          status: "cancelled",
          next_action: "retry",
        },
      });
    } finally {
      reclaimIo.restore();
    }

    const reclaimedState = JSON.parse(
      await readFile(prepared.invocation.state_path, "utf8"),
    ) as Record<string, unknown>;
    expect(reclaimedState.status).toBe("cancelled");
    await expect(access(activeClaim.claim_path)).rejects.toMatchObject({ code: "ENOENT" });
    await expect(readFile(prepared.invocation.events_path, "utf8")).resolves.toContain(
      "runner_orphaned_running_cancelled",
    );

    const resumeIo = captureStdIO();
    try {
      expect(await runCli(["task", "resume-context", taskId, "--json", "--root", root])).toBe(0);
      const resume = JSON.parse(resumeIo.stdout) as {
        latest_handoff: { to_role: string | null } | null;
        runner: { status: string | null; next_action: string | null };
      };
      expect(resume).toMatchObject({
        latest_handoff: { to_role: "CODER" },
        runner: { status: "cancelled", next_action: "retry" },
      });
    } finally {
      resumeIo.restore();
    }

    const nextIo = captureStdIO();
    try {
      expect(await runCli(["task", "next-action", taskId, "--json", "--root", root])).toBe(0);
      const parsed = JSON.parse(nextIo.stdout) as {
        next_action: { code: string; command: string };
      };
      expect(parsed.next_action.command).not.toContain("task reclaim");
      expect(parsed.next_action).toMatchObject({
        code: "retry",
        command: `agentplane task run ${taskId}`,
      });
    } finally {
      nextIo.restore();
    }
  }, 15_000);

  it("task reclaim leaves an unclaimed stale running state non-terminal without a handoff", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());

    let taskId = "";
    {
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "task",
            "new",
            "--title",
            "Unclaimed stale runner reclaim",
            "--description",
            "Fail closed when no supervisor active-run claim proves ownership.",
            "--owner",
            "CODER",
            "--tag",
            "workflow",
            "--root",
            root,
          ]),
        ).toBe(0);
        taskId = io.stdout.trim();
      } finally {
        io.restore();
      }
    }

    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: prepare an unclaimed running state to prove reclaim fails closed.",
      "--root",
      root,
    ]);

    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-unclaimed-stale-reclaim",
    });
    const staleAt = "2000-01-01T00:00:00.000Z";
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "running",
        updated_at: staleAt,
        supervision: {
          pid: 999_996,
          started_at: staleAt,
          heartbeat_at: staleAt,
        },
      }),
    });

    expect(
      await runCli([
        "task",
        "reclaim",
        taskId,
        "--author",
        "CODER",
        "--reason",
        "stale runner pid is no longer alive without a supervisor claim",
        "--root",
        root,
      ]),
    ).toBe(8);

    const retainedState = JSON.parse(
      await readFile(prepared.invocation.state_path, "utf8"),
    ) as Record<string, unknown>;
    expect(retainedState.status).toBe("running");
    await expect(
      access(path.join(root, ".agentplane", "tasks", taskId, "handoff", "latest.json")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  }, 15_000);

  it("resume-context reads the task branch state and PR metadata before stale base artifacts", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeFile(path.join(root, "base.txt"), "base\n", "utf8");
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed branch_pr base"], { cwd: root });

    let taskId = "";
    const taskIo = captureStdIO();
    try {
      expect(
        await runCli([
          "task",
          "new",
          "--title",
          "Resume branch snapshot",
          "--description",
          "Resume context must ignore stale base task artifacts before integration.",
          "--owner",
          "CODER",
          "--tag",
          "workflow",
          "--root",
          root,
        ]),
      ).toBe(0);
      taskId = taskIo.stdout.trim();
    } finally {
      taskIo.restore();
    }
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: persist stale base task"], { cwd: root });

    const branch = `task/${taskId}/resume-snapshot`;
    await execFileAsync("git", ["checkout", "-b", branch], { cwd: root });
    const readmePath = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const branchReadme = await readFile(readmePath, "utf8");
    await writeFile(
      readmePath,
      branchReadme.replace(/status:\s*["']?TODO["']?/u, 'status: "DONE"'),
      "utf8",
    );
    const prDir = path.join(root, ".agentplane", "tasks", taskId, "pr");
    await mkdir(prDir, { recursive: true });
    await writeFile(
      path.join(prDir, "meta.json"),
      `${JSON.stringify({
        schema_version: 1,
        task_id: taskId,
        branch,
        base: "main",
        status: "OPEN",
        pr_number: 321,
        pr_url: "https://github.com/example/repo/pull/321",
        created_at: "2026-07-25T00:00:00.000Z",
        updated_at: "2026-07-25T00:00:00.000Z",
      })}\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane/tasks"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: add task branch resume metadata"], {
      cwd: root,
    });
    await execFileAsync("git", ["checkout", "main"], { cwd: root });

    const io = captureStdIO();
    try {
      expect(await runCli(["task", "resume-context", taskId, "--json", "--root", root])).toBe(0);
      const parsed = JSON.parse(io.stdout) as {
        task_status: string;
        base_branch: string | null;
        pr_branch: string | null;
      };
      expect(parsed).toMatchObject({
        task_status: "DONE",
        base_branch: "main",
        pr_branch: branch,
      });
    } finally {
      io.restore();
    }
  });
});
