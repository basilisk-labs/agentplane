import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { captureStdIO, mkGitRepoRoot, runCliSilent } from "@agentplane/testkit";
import { chmod, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Hermes adapter fixture",
      "--description",
      "Fixture task for Hermes adapter command coverage.",
      "--owner",
      "CODER",
      "--tag",
      "docs",
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function createApprovedTask(root: string): Promise<string> {
  await runCliSilent(["init", "--workflow", "branch_pr", "--yes", "--root", root]);
  const taskId = await createTask(root);
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    "Fixture plan for Hermes adapter tests.",
    "--updated-by",
    "CODER",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
  return taskId;
}

describe("hermes adapter commands", () => {
  it("renders a provider-safe enqueue projection", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "enqueue",
        taskId,
        "--board",
        "repo-board",
        "--assignee",
        "agentplane-coder",
        "--role",
        "CODER",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        idempotency_key: string;
        board: string;
        assignee: string;
        metadata: {
          agentplane: {
            task_id: string;
            authority: { status_sync: string };
            comment_projection: {
              schema: string;
              evidence_refs: { runner_status: string; runner_inspect: string };
            };
          };
        };
        evidence_refs: { runner_event_logs: string };
        sync_field_policies: { status: { authority: string } };
      };
      expect(payload.idempotency_key).toContain(`agentplane:${root}:${taskId}:CODER`);
      expect(payload.board).toBe("repo-board");
      expect(payload.assignee).toBe("agentplane-coder");
      expect(payload.metadata.agentplane.task_id).toBe(taskId);
      expect(payload.metadata.agentplane.authority.status_sync).toBe("projection_only");
      expect(payload.metadata.agentplane.comment_projection.schema).toBe(
        "agentplane.hermes.lifecycle-comment.v1",
      );
      expect(payload.metadata.agentplane.comment_projection.evidence_refs.runner_status).toBe(
        `agentplane task run status ${taskId} --json`,
      );
      expect(payload.metadata.agentplane.comment_projection.evidence_refs.runner_inspect).toBe(
        `agentplane task run inspect ${taskId} --json`,
      );
      expect(payload.evidence_refs.runner_event_logs).toBe(
        `agentplane task run logs ${taskId} --stream events`,
      );
      expect(payload.sync_field_policies.status.authority).toBe("agentplane");
    } finally {
      io.restore();
    }
  });

  it("supervise returns a route-gated packet without allowing raw route shell execution", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli(["hermes", "supervise", taskId, "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        task: { id: string };
        projection_boundary: { agentplane_authority: string; hermes_authority: string };
        supervisor_policy: {
          execute_raw_shell_from_route: boolean;
          max_route_steps_per_claim: number;
        };
        runner: {
          latest_available: boolean;
          commands: { status: string; inspect: string; event_logs: string };
        };
        hermes_comment_projection: {
          schema: string;
          evidence_refs: { runner_status: string };
        };
        terminal: { hermes_root_complete_allowed: boolean };
      };
      expect(payload.task.id).toBe(taskId);
      expect(payload.projection_boundary.agentplane_authority).toBe("engineering_task_lifecycle");
      expect(payload.projection_boundary.hermes_authority).toBe("dispatch_run_lifecycle");
      expect(payload.supervisor_policy.execute_raw_shell_from_route).toBe(false);
      expect(payload.supervisor_policy.max_route_steps_per_claim).toBe(1);
      expect(payload.runner.latest_available).toBe(false);
      expect(payload.runner.commands.status).toBe(`agentplane task run status ${taskId} --json`);
      expect(payload.runner.commands.inspect).toBe(`agentplane task run inspect ${taskId} --json`);
      expect(payload.runner.commands.event_logs).toBe(
        `agentplane task run logs ${taskId} --stream events`,
      );
      expect(payload.hermes_comment_projection.schema).toBe(
        "agentplane.hermes.lifecycle-comment.v1",
      );
      expect(payload.hermes_comment_projection.evidence_refs.runner_status).toBe(
        payload.runner.commands.status,
      );
      expect(payload.terminal.hermes_root_complete_allowed).toBe(false);
    } finally {
      io.restore();
    }
  });

  it("supervise dry-runs one allowlisted typed route step", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "supervise",
        taskId,
        "--execute-step",
        "--dry-run",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        supervisor_policy: { execute_raw_shell_from_route: boolean };
        execution: {
          requested: boolean;
          dry_run: boolean;
          allowed: boolean;
          result: { command: string[] };
        };
      };
      expect(payload.supervisor_policy.execute_raw_shell_from_route).toBe(false);
      expect(payload.execution.requested).toBe(true);
      expect(payload.execution.dry_run).toBe(true);
      expect(payload.execution.allowed).toBe(true);
      expect(payload.execution.result.command).toContain(taskId);
    } finally {
      io.restore();
    }
  });

  it("supervise returns the child Agentplane command failure code", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);
    const fakeBin = path.join(root, "failing-agentplane.sh");
    await writeFile(fakeBin, "#!/bin/sh\necho child-failed >&2\nexit 7\n");
    await chmod(fakeBin, 0o755);

    const previous = process.env.AGENTPLANE_BIN;
    process.env.AGENTPLANE_BIN = fakeBin;
    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "supervise",
        taskId,
        "--execute-step",
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(7);
      const payload = JSON.parse(io.stdout) as {
        execution: { result: { exit_code: number; stderr: string } };
      };
      expect(payload.execution.result.exit_code).toBe(7);
      expect(payload.execution.result.stderr).toContain("child-failed");
    } finally {
      io.restore();
      if (previous === undefined) {
        delete process.env.AGENTPLANE_BIN;
      } else {
        process.env.AGENTPLANE_BIN = previous;
      }
    }
  });

  it("doctor reports the local Agentplane side of the adapter contract", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["init", "--yes", "--root", root]);

    const io = captureStdIO();
    try {
      const code = await runCli(["hermes", "doctor", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        ok: boolean;
        repo: string;
        adapter_status: string;
        missing_hermes_env: string[];
      };
      expect(payload.ok).toBe(true);
      expect(payload.repo).toBe(root);
      expect(payload.adapter_status).toContain("hermes_plugin_required");
      expect(payload.missing_hermes_env).toContain("task_id");
    } finally {
      io.restore();
    }
  });

  it("doctor reports the Agentplane Hermes lane registry state when configured", async () => {
    const root = await mkGitRepoRoot();
    await runCliSilent(["init", "--yes", "--root", root]);
    const registryPath = path.join(root, "registry", "lane-registry.json");
    await mkdir(path.dirname(registryPath), { recursive: true });
    await writeFile(
      registryPath,
      JSON.stringify(
        {
          lanes: [
            {
              name: "agentplane-coder",
              match: "agentplane-*",
              kind: "agentplane",
            },
          ],
        },
        null,
        2,
      ),
    );

    const previous = process.env.AGENTPLANE_HERMES_LANE_REGISTRY;
    process.env.AGENTPLANE_HERMES_LANE_REGISTRY = registryPath;
    const io = captureStdIO();
    try {
      const code = await runCli(["hermes", "doctor", "--json", "--root", root]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        lane_registry: {
          path: string;
          loaded: boolean;
          agentplane_lanes: { name: string; kind: string }[];
        };
      };
      expect(payload.lane_registry.path).toBe(registryPath);
      expect(payload.lane_registry.loaded).toBe(true);
      expect(payload.lane_registry.agentplane_lanes).toHaveLength(1);
      expect(payload.lane_registry.agentplane_lanes[0]?.name).toBe("agentplane-coder");
    } finally {
      io.restore();
      if (previous === undefined) {
        delete process.env.AGENTPLANE_HERMES_LANE_REGISTRY;
      } else {
        process.env.AGENTPLANE_HERMES_LANE_REGISTRY = previous;
      }
    }
  });

  it("reconcile includes the local Agentplane projection when task id is provided", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createApprovedTask(root);

    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "reconcile",
        "--task-id",
        taskId,
        "--json",
        "--root",
        root,
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        mode: string;
        local_projection: {
          task: { id: string };
          hermes_comment_projection: {
            agentplane_task_id: string;
            evidence_refs: { runner_status: string };
          };
        };
        plugin_contract: { remote_board_reads_required: boolean };
      };
      expect(payload.mode).toBe("read_only");
      expect(payload.local_projection.task.id).toBe(taskId);
      expect(payload.local_projection.hermes_comment_projection.agentplane_task_id).toBe(taskId);
      expect(payload.local_projection.hermes_comment_projection.evidence_refs.runner_status).toBe(
        `agentplane task run status ${taskId} --json`,
      );
      expect(payload.plugin_contract.remote_board_reads_required).toBe(true);
    } finally {
      io.restore();
    }
  });

  it("renders Hermes lifecycle callbacks without touching Hermes in dry-run mode", async () => {
    const previousTask = process.env.HERMES_KANBAN_TASK;
    const previousBoard = process.env.HERMES_KANBAN_BOARD;
    const previousHermesBin = process.env.HERMES_BIN;
    process.env.HERMES_KANBAN_TASK = "hk_123";
    process.env.HERMES_KANBAN_BOARD = "repo-board";
    process.env.HERMES_BIN = "/opt/hermes/bin/hermes";
    const io = captureStdIO();
    try {
      const code = await runCli([
        "hermes",
        "lifecycle",
        "comment",
        "--body",
        '{"agentplane_task_id":"202605311941-K4FCKS"}',
        "--dry-run",
        "--json",
      ]);
      expect(code).toBe(0);
      const payload = JSON.parse(io.stdout) as {
        action: string;
        hermes_run: { task_id: string; board: string };
        result: { executed: boolean; command: string[] };
      };
      expect(payload.action).toBe("comment");
      expect(payload.hermes_run.task_id).toBe("hk_123");
      expect(payload.hermes_run.board).toBe("repo-board");
      expect(payload.result.executed).toBe(false);
      expect(payload.result.command).toEqual([
        "/opt/hermes/bin/hermes",
        "kanban",
        "--board",
        "repo-board",
        "comment",
        "hk_123",
        "--body",
        '{"agentplane_task_id":"202605311941-K4FCKS"}',
      ]);
    } finally {
      io.restore();
      if (previousTask === undefined) {
        delete process.env.HERMES_KANBAN_TASK;
      } else {
        process.env.HERMES_KANBAN_TASK = previousTask;
      }
      if (previousBoard === undefined) {
        delete process.env.HERMES_KANBAN_BOARD;
      } else {
        process.env.HERMES_KANBAN_BOARD = previousBoard;
      }
      if (previousHermesBin === undefined) {
        delete process.env.HERMES_BIN;
      } else {
        process.env.HERMES_BIN = previousHermesBin;
      }
    }
  });
});
