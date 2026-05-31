import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { captureStdIO, mkGitRepoRoot, runCliSilent } from "@agentplane/testkit";

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

describe("hermes adapter commands", () => {
  it("renders a provider-safe enqueue projection", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createTask(root);

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
        metadata: { agentplane: { task_id: string; authority: { status_sync: string } } };
        sync_field_policies: { status: { authority: string } };
      };
      expect(payload.idempotency_key).toContain(`agentplane:${root}:${taskId}:CODER`);
      expect(payload.board).toBe("repo-board");
      expect(payload.assignee).toBe("agentplane-coder");
      expect(payload.metadata.agentplane.task_id).toBe(taskId);
      expect(payload.metadata.agentplane.authority.status_sync).toBe("projection_only");
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
        terminal: { hermes_root_complete_allowed: boolean };
      };
      expect(payload.task.id).toBe(taskId);
      expect(payload.projection_boundary.agentplane_authority).toBe("engineering_task_lifecycle");
      expect(payload.projection_boundary.hermes_authority).toBe("dispatch_run_lifecycle");
      expect(payload.supervisor_policy.execute_raw_shell_from_route).toBe(false);
      expect(payload.supervisor_policy.max_route_steps_per_claim).toBe(1);
      expect(payload.terminal.hermes_root_complete_allowed).toBe(false);
    } finally {
      io.restore();
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
});
