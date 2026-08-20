import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  allocateWorkspace: vi.fn(),
  executeRunner: vi.fn(),
  loadTaskCommandContext: vi.fn(),
  projectLifecycle: vi.fn(),
  readHead: vi.fn(),
  readStatus: vi.fn(),
  releaseLease: vi.fn(),
  startReady: vi.fn(),
  lifecycleExitCode: vi.fn(),
}));

vi.mock("../../runtime/task-execution-context/index.js", () => ({
  loadTaskCommandContext: mocks.loadTaskCommandContext,
}));
vi.mock("../../runtime/workspace-allocation/index.js", () => ({
  allocateTaskWorkspace: mocks.allocateWorkspace,
  releaseWorkspaceLease: mocks.releaseLease,
}));
vi.mock("../../runner/usecases/task-run.js", () => ({
  executeTaskRunnerExecution: mocks.executeRunner,
}));
vi.mock("../../runner/usecases/task-run-lifecycle-result.js", () => ({
  projectExecutedTaskRunnerLifecycleResult: mocks.projectLifecycle,
  taskRunnerLifecycleExitCode: mocks.lifecycleExitCode,
}));
vi.mock("./direct-task-finalization.js", () => ({
  readDirectRepositoryStatus: mocks.readStatus,
  readDirectTaskHead: mocks.readHead,
}));
vi.mock("./start-ready.js", () => ({ cmdTaskStartReady: mocks.startReady }));

import {
  executeDirectOperation,
  type RetainedDirectWorkspace,
} from "./direct-task-supervisor-operation.js";

const execution = {
  schema_version: 1,
  primary_task_id: "TASK-1",
  task_ids: ["TASK-1"],
  repository_mode: "direct",
  selected_mode: "direct",
  requested_mode: "auto",
  route_source: "execution_contract",
  reason_codes: [],
  base_ref: "main",
  base_sha: "a".repeat(40),
  authoritative_task_source: "task_worktree",
} as const;

describe("direct task supervisor operation", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    const baseCommand = { resolvedProject: { gitRoot: "/repo" } };
    const workspaceCommand = {
      resolvedProject: { gitRoot: "/repo/.agentplane/workspaces/TASK-1" },
    };
    mocks.loadTaskCommandContext
      .mockResolvedValueOnce({ command: baseCommand, execution })
      .mockResolvedValueOnce({
        command: workspaceCommand,
        execution,
        primary_task: { id: "TASK-1", events: [{ type: "started" }] },
      });
    mocks.allocateWorkspace.mockResolvedValue({
      workspace_root: "/repo/.agentplane/workspaces/TASK-1",
      lease: { task_id: "TASK-1" },
    });
    mocks.readHead.mockResolvedValue("base-sha");
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [" M .agentplane/tasks/TASK-1/README.md"],
    });
    mocks.executeRunner.mockResolvedValue({ result: { summary: "implemented" } });
    mocks.projectLifecycle.mockReturnValue({ phase: "executed", result: { status: "success" } });
    mocks.lifecycleExitCode.mockReturnValue(0);
    mocks.releaseLease.mockResolvedValue(undefined);
  });

  it("hands the allocated workspace to closeout and leaves its lease retained", async () => {
    let retained: RetainedDirectWorkspace | null = null;
    let releaseRetained: (() => Promise<void>) | undefined;

    const result = await executeDirectOperation({
      input: {
        ctx: { cwd: "/repo" } as never,
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        include_remote: false,
      },
      operation: {
        id: "runner.follow",
        params: { mode: "run", taskId: "TASK-1" },
      } as never,
      retainWorkspace: (workspace) => {
        retained = workspace;
        releaseRetained = workspace.release;
      },
    });

    expect(result).toMatchObject({ status: "succeeded", exit_code: 0 });
    expect(mocks.executeRunner).toHaveBeenCalledWith(
      expect.objectContaining({
        cwd: "/repo/.agentplane/workspaces/TASK-1",
        task_execution: execution,
      }),
    );
    expect(retained).toMatchObject({
      ctx: { cwd: "/repo/.agentplane/workspaces/TASK-1" },
      execution_base_commit: "base-sha",
      executor_events_before: 1,
    });
    expect(mocks.releaseLease).not.toHaveBeenCalled();

    expect(releaseRetained).toBeTypeOf("function");
    await releaseRetained?.();
    expect(mocks.releaseLease).toHaveBeenCalledTimes(1);
  });

  it("releases the workspace immediately when no closeout owner is supplied", async () => {
    await executeDirectOperation({
      input: {
        ctx: { cwd: "/repo" } as never,
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        include_remote: false,
      },
      operation: {
        id: "runner.follow",
        params: { mode: "run", taskId: "TASK-1" },
      } as never,
    });

    expect(mocks.releaseLease).toHaveBeenCalledTimes(1);
  });
});
