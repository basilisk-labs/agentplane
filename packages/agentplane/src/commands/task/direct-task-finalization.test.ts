import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ cmdFinish: vi.fn(), runProcess: vi.fn() }));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));
vi.mock("./finish-command.js", () => ({ cmdFinish: mocks.cmdFinish }));

import {
  finishDirectTask,
  readDirectTaskHead,
  resolveDirectImplementationCommit,
} from "./direct-task-finalization.js";

const TASK_ID = "202607290000-RF10A1";
const command = {
  config: { paths: { workflow_dir: ".agentplane/tasks" } },
  resolvedProject: { gitRoot: "/repo" },
} as never;

describe("direct task finalization", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("requires a new committed implementation and permits only active-task artifacts to remain dirty", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: " M packages/agentplane/src/index.ts\n",
        stderr: "",
      })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "?? .agentplane/tasks/202607290000-RF10A1/supervision/checks.json\n",
        stderr: "",
      })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "def456\n", stderr: "" })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "packages/agentplane/src/index.ts\n",
        stderr: "",
      });

    const outsideTaskPaths = await resolveDirectImplementationCommit({
      command,
      cwd: "/repo",
      task_id: TASK_ID,
      execution_base_commit: "abc123",
      allowed_paths: ["packages/agentplane/src"],
    });
    expect(outsideTaskPaths.status).toBe("missing");
    if (outsideTaskPaths.status === "missing")
      expect(outsideTaskPaths.reason).toContain("non-task");
    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src"],
      }),
    ).resolves.toEqual({ status: "ready", commit: "def456" });
  });

  it("does not accept an unchanged HEAD as an implementation", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "abc123\n", stderr: "" });

    const unchangedHead = await resolveDirectImplementationCommit({
      command,
      cwd: "/repo",
      task_id: TASK_ID,
      execution_base_commit: "abc123",
      allowed_paths: ["packages/agentplane/src"],
    });
    expect(unchangedHead.status).toBe("missing");
    if (unchangedHead.status === "missing")
      expect(unchangedHead.reason).toContain("distinct committed");
  });

  it("stops finalization when the committed implementation escapes the work-order scope", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "def456\n", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "README.md\n", stderr: "" });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src"],
      }),
    ).resolves.toEqual({
      status: "scope_violation",
      paths: ["README.md"],
      reason: "The EXECUTOR committed paths outside its approved scope: README.md.",
    });
  });

  it("does not let an EXECUTOR commit task artifacts outside its work-order scope", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "def456\n", stderr: "" })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: `.agentplane/tasks/${TASK_ID}/README.md\n`,
        stderr: "",
      });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src"],
      }),
    ).resolves.toMatchObject({
      status: "scope_violation",
      paths: [`.agentplane/tasks/${TASK_ID}/README.md`],
    });
  });

  it("passes the observed implementation commit to the real finish lifecycle command", async () => {
    mocks.cmdFinish.mockResolvedValue(0);
    const result = await finishDirectTask({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command,
      task_id: TASK_ID,
      implementation_commit: "def456",
    });

    expect(result).toBe(0);
    expect(mocks.cmdFinish).toHaveBeenCalledWith(
      expect.objectContaining({
        taskIds: [TASK_ID],
        author: "SUPERVISOR",
        commit: "def456",
        implementationCommit: "def456",
      }),
    );
  });

  it("reads HEAD through the structured process boundary", async () => {
    mocks.runProcess.mockResolvedValue({ exitCode: 0, stdout: "def456\n", stderr: "" });
    await expect(readDirectTaskHead("/repo")).resolves.toBe("def456");
    expect(mocks.runProcess).toHaveBeenCalledWith(
      expect.objectContaining({ command: "git", args: ["rev-parse", "HEAD"], cwd: "/repo" }),
    );
  });
});
