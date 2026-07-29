import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  cmdFinish: vi.fn(),
  mkdir: vi.fn(),
  runProcess: vi.fn(),
  writeJson: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));
vi.mock("node:fs/promises", () => ({ mkdir: mocks.mkdir }));
vi.mock("../../shared/write-if-changed.js", () => ({ writeJsonStableIfChanged: mocks.writeJson }));
vi.mock("./finish-command.js", () => ({ cmdFinish: mocks.cmdFinish }));

import {
  finishDirectTask,
  recordDirectImplementationEvidence,
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

  it("uses the execution-base commit delta instead of rejecting pre-existing dirty paths", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "def456\n",
        stderr: "",
      })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "packages/agentplane/src/index.ts\n",
        stderr: "",
      });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src"],
        observed_changed_paths: ["packages/agentplane/src/index.ts"],
      }),
    ).resolves.toEqual({ status: "ready", commit: "def456" });
    expect(mocks.runProcess).toHaveBeenCalledTimes(2);
  });

  it("accepts a committed executor delta after the post-process snapshot is clean", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "def456\n", stderr: "" })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "packages/agentplane/src/index.ts\n",
        stderr: "",
      });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src"],
        observed_changed_paths: null,
      }),
    ).resolves.toEqual({ status: "ready", commit: "def456" });
  });

  it("does not accept an unchanged HEAD as an implementation", async () => {
    mocks.runProcess.mockResolvedValueOnce({ exitCode: 0, stdout: "abc123\n", stderr: "" });

    const unchangedHead = await resolveDirectImplementationCommit({
      command,
      cwd: "/repo",
      task_id: TASK_ID,
      execution_base_commit: "abc123",
      allowed_paths: ["packages/agentplane/src"],
      observed_changed_paths: ["packages/agentplane/src/index.ts"],
    });
    expect(unchangedHead.status).toBe("missing");
    if (unchangedHead.status === "missing")
      expect(unchangedHead.reason).toContain("distinct committed");
  });

  it("stops finalization when the committed implementation escapes the work-order scope", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "def456\n", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "README.md\n", stderr: "" });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src"],
        observed_changed_paths: ["README.md"],
      }),
    ).resolves.toMatchObject({ status: "scope_violation", paths: ["README.md"] });
  });

  it("does not let an EXECUTOR commit task artifacts outside its work-order scope", async () => {
    mocks.runProcess
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
        observed_changed_paths: [`.agentplane/tasks/${TASK_ID}/README.md`],
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

  it("freezes independent Git checks and the complete repository-status audit for EVALUATOR", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "", stderr: "" })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "A\tpackages/agentplane/src/index.ts\n",
        stderr: "",
      })
      .mockResolvedValueOnce({
        exitCode: 0,
        stdout: "?? benchmark-preexisting.md\n",
        stderr: "",
      });

    await expect(
      recordDirectImplementationEvidence({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "abc123",
        implementation_commit: "def456",
        execution_baseline_status: {
          command: "git status --short --untracked-files=all",
          lines: ["?? benchmark-preexisting.md"],
        },
      }),
    ).resolves.toEqual({
      artifact_path: `.agentplane/tasks/${TASK_ID}/supervision/implementation-evidence.json`,
      implementation_commit: "def456",
    });
    const evidence = mocks.writeJson.mock.calls[0]?.[1] as {
      implementation_commit: string;
      repository_status: {
        unchanged_from_execution_baseline: string[];
        introduced_after_execution_baseline: string[];
      };
    };
    expect(mocks.writeJson.mock.calls[0]?.[0]).toBe(
      `/repo/.agentplane/tasks/${TASK_ID}/supervision/implementation-evidence.json`,
    );
    expect(evidence).toMatchObject({
      implementation_commit: "def456",
      repository_status: {
        unchanged_from_execution_baseline: ["?? benchmark-preexisting.md"],
        introduced_after_execution_baseline: [],
      },
    });
  });
});
