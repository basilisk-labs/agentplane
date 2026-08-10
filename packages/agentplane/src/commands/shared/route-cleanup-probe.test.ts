import { describe, expect, it, vi } from "vitest";

import type { TaskData } from "../../backends/task-backend.js";
import type { TaskResumeContext } from "../task/handoff.shared.js";
import type { CommandContext } from "./task-backend.js";

const mocks = vi.hoisted(() => ({
  resolveCleanupPlan: vi.fn(),
  gitRevParse: vi.fn(),
}));

vi.mock("../branch/cleanup-merged-proof.js", () => ({
  resolveCleanupPlan: mocks.resolveCleanupPlan,
}));

vi.mock("@agentplaneorg/core/git", () => ({
  gitRevParse: mocks.gitRevParse,
}));

import { resolveDoneCleanupProbe } from "./route-cleanup-probe.js";

const task = {
  id: "202608102112-AY0H1F",
  title: "Completed task",
  description: "Completed task",
  status: "DONE",
  priority: "high",
  owner: "CODER",
  depends_on: [],
  tags: ["code"],
  verify: ["bun test"],
} satisfies TaskData;

const resume = {
  task_id: task.id,
  task_status: "DONE",
  branch: "main",
  base_branch: "main",
  head_sha: "a".repeat(40),
  workspace_root: "/repo",
  pr_branch: null,
  latest_handoff: null,
  runner: {
    run_id: null,
    status: null,
    heartbeat_at: null,
    state_path: null,
    trace_path: null,
    next_action: "run",
    next_command: `agentplane task run ${task.id}`,
    resume_command: `agentplane task run ${task.id}`,
    retry_command: null,
  },
} satisfies TaskResumeContext;

describe("DONE cleanup route probe", () => {
  it("proves local terminal cleanup without requiring a remote provider query", async () => {
    mocks.resolveCleanupPlan.mockResolvedValue({
      candidates: [],
      blocked: [],
      matchedTaskIds: new Set<string>(),
    });
    mocks.gitRevParse.mockResolvedValue("a".repeat(40));

    await expect(
      resolveDoneCleanupProbe({
        ctx: {
          config: {
            workflow_mode: "branch_pr",
            paths: { workflow_dir: ".agentplane/tasks" },
          },
          resolvedProject: { gitRoot: "/repo" },
        } as CommandContext,
        resume,
        task,
      }),
    ).resolves.toEqual({ state: "already_clean", baseSynchronized: true });
  });
});
