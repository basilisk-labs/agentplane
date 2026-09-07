import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  commit: vi.fn(),
  status: vi.fn(),
}));

vi.mock("../guard/impl/commit.js", () => ({ cmdCommit: mocks.commit }));

vi.mock("./direct-task-finalization.js", () => ({ readDirectRepositoryStatus: mocks.status }));

import {
  canCoalesceVerificationArtifacts,
  commitBranchSupervisorTaskArtifacts,
} from "./branch-task-supervisor-artifact-commit.js";

describe("commitBranchSupervisorTaskArtifacts", () => {
  beforeEach(() => {
    mocks.commit.mockReset();
  });

  it("invalidates cached Git status before committing newly written task artifacts", async () => {
    const invalidateStatus = vi.fn();
    mocks.commit.mockImplementation(() => {
      expect(invalidateStatus).toHaveBeenCalledTimes(1);
      return Promise.resolve(0);
    });

    await commitBranchSupervisorTaskArtifacts({
      command: { git: { invalidateStatus } } as never,
      cwd: "/repo",
      task_id: "202608130001-ABC123",
      message: "record verification",
    });

    expect(mocks.commit).toHaveBeenCalledTimes(1);
  });
});

const opts = () => ({
  command: {
    config: {
      paths: { workflow_dir: ".agentplane/tasks", tasks_path: ".agentplane/tasks.json" },
    },
  } as never,
  cwd: "/repo",
  task_id: "TASK",
  next: {
    workflowStep: {
      kind: "agent_episode",
      episode: { purpose: "quality_review", taskId: "TASK" },
      blockers: [],
    },
    executionPacket: { mustRunFrom: "/repo" },
  } as never,
});

describe("verification artifact coalescing", () => {
  it("defers only durable same-task artifacts to the evaluator boundary, including restart", async () => {
    mocks.status.mockResolvedValue({
      lines: [
        " M .agentplane/tasks/TASK/README.md",
        "?? .agentplane/tasks/TASK/supervision/declared-checks.json",
      ],
    });
    expect(await canCoalesceVerificationArtifacts(opts())).toBe(true);
    expect(await canCoalesceVerificationArtifacts(opts())).toBe(true);
  });
  it.each([
    [" M source.ts"],
    ["?? .agentplane/tasks/TASK/foreign.ts"],
    ["?? unrelated.txt"],
    [" M .agentplane/tasks/OTHER/README.md"],
    [" M .agentplane/tasks.json"],
    [' M ".agentplane/tasks/TASK/quoted file"'],
    ["R  source.ts -> .agentplane/tasks/TASK/source.ts"],
  ])("does not defer a checkpoint with foreign or ambiguous changes: %s", async (line) => {
    mocks.status.mockResolvedValue({ lines: [line] });
    expect(await canCoalesceVerificationArtifacts(opts())).toBe(false);
  });
  it("retains the checkpoint at verification, human or external boundaries and unavailable status", async () => {
    mocks.status.mockResolvedValue(null);
    expect(await canCoalesceVerificationArtifacts(opts())).toBe(false);
    for (const purpose of ["verification", "implementation", "human_required"]) {
      const input = opts();
      input.next = {
        workflowStep: { kind: "agent_episode", episode: { purpose, taskId: "TASK" }, blockers: [] },
        executionPacket: { mustRunFrom: "/repo" },
      } as never;
      mocks.status.mockResolvedValue({ lines: [] });
      expect(await canCoalesceVerificationArtifacts(input)).toBe(false);
    }
  });
});
