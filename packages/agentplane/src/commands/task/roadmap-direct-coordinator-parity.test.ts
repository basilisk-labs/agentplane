import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  cmdFinish: vi.fn(),
  formalOperation: vi.fn(),
  loadTask: vi.fn(),
  prepareImplementation: vi.fn(),
  recordExecutionContract: vi.fn(),
  resolveExecutionContext: vi.fn(),
  runProcess: vi.fn(),
}));

vi.mock("@agentplaneorg/core/process", () => ({ runProcess: mocks.runProcess }));
vi.mock("./finish-command.js", () => ({ cmdFinish: mocks.cmdFinish }));
vi.mock("./direct-task-supervisor-formal-operation.js", () => ({
  recordDirectTaskFormalOperation: mocks.formalOperation,
}));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));
vi.mock("../../runtime/task-execution-context/index.js", () => ({
  loadTaskCommandContext: vi.fn(),
  resolveTaskExecutionContext: mocks.resolveExecutionContext,
}));
vi.mock("./direct-task-supervisor-implementation.js", () => ({
  prepareDirectImplementationEvidence: mocks.prepareImplementation,
}));
vi.mock("./task-execution-contract-observation.js", () => ({
  observedExternalEffectsFromRunnerResult: () => [],
  recordObservedTaskExecutionContract: mocks.recordExecutionContract,
}));

import {
  resolveDirectImplementationCommit,
  runDirectTaskFinalizationOperation,
} from "./direct-task-finalization.js";
import { applyDirectImplementationOperation } from "./direct-task-supervisor-operation.js";

const TASK_ID = "202609210324-CC13V3";
const command = {
  config: { paths: { workflow_dir: ".agentplane/tasks" } },
  resolvedProject: { gitRoot: "/repo" },
} as never;

describe("direct coordinator parity", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("does not create implementation identity from an unchanged service-only HEAD", async () => {
    mocks.runProcess.mockResolvedValueOnce({ exitCode: 0, stdout: "base\n", stderr: "" });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "base",
        allowed_paths: ["packages/agentplane/src/commands/task"],
        observed_changed_paths: [],
      }),
    ).resolves.toMatchObject({ status: "missing" });
  });

  it("cannot normalize an out-of-scope write into a permitted commit", async () => {
    mocks.runProcess
      .mockResolvedValueOnce({ exitCode: 0, stdout: "implementation\n", stderr: "" })
      .mockResolvedValueOnce({ exitCode: 0, stdout: "README.md\n", stderr: "" });

    await expect(
      resolveDirectImplementationCommit({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        execution_base_commit: "base",
        allowed_paths: ["packages/agentplane/src/commands/task"],
        observed_changed_paths: ["README.md"],
      }),
    ).resolves.toEqual({
      status: "scope_violation",
      paths: ["README.md"],
      reason: "The EXECUTOR committed paths outside its approved scope: README.md.",
    });
  });

  it("delegates direct implementation observation with the exact work-order authority", async () => {
    const task = { id: TASK_ID, events: [], execution_contract: null };
    const reconciled = { ...task, execution_contract: { observed: { authority_violations: [] } } };
    const execution = { task_ids: [TASK_ID] };
    mocks.loadTask.mockResolvedValue(task);
    mocks.resolveExecutionContext.mockResolvedValue(execution);
    mocks.prepareImplementation.mockResolvedValue({
      status: "ready",
      evidence: {
        artifact_path: `.agentplane/tasks/${TASK_ID}/supervision/implementation-evidence.json`,
        implementation_commit: "implementation",
        changed_paths: ["packages/agentplane/src/commands/task/example.ts"],
      },
    });
    mocks.recordExecutionContract.mockResolvedValue({
      task: reconciled,
      escalated: false,
      episodeAuthorityViolations: [],
    });
    const lifecycle = {
      phase: "executed",
      lifecycle: {
        work_order_authority: {
          writable_roots: ["packages/agentplane/src/commands/task"],
        },
      },
      result: {
        evidence: {
          provenance: "supervisor_observed",
          changed_paths: ["packages/agentplane/src/commands/task/example.ts"],
        },
      },
    } as never;

    await expect(
      applyDirectImplementationOperation({
        command,
        cwd: "/repo",
        task_id: TASK_ID,
        lifecycle,
        execution_base_commit: "base",
        execution_baseline_status: {
          command: "git status --short --untracked-files=all",
          lines: [],
        },
        executor_events_before: 0,
      }),
    ).resolves.toMatchObject({
      status: "ready",
      task: reconciled,
      evidence: { implementation_commit: "implementation" },
      executor_lifecycle_event_delta: 0,
    });
    expect(mocks.prepareImplementation).toHaveBeenCalledWith(
      expect.objectContaining({
        allowed_paths: ["packages/agentplane/src/commands/task"],
        observed_changed_paths: ["packages/agentplane/src/commands/task/example.ts"],
      }),
    );
    expect(mocks.recordExecutionContract).toHaveBeenCalledWith(
      expect.objectContaining({
        execution,
        preserved_commit: "implementation",
      }),
    );
  });

  it("keeps the frozen implementation identity and cannot finish twice after replay", async () => {
    const completedDecision = { workflowStep: { id: "task.done" } } as never;
    const decision = vi.fn(() => Promise.resolve(completedDecision));
    let applied = false;
    mocks.formalOperation.mockImplementation(
      async (opts: { run: () => Promise<Record<string, unknown>> }) => {
        if (!applied) {
          applied = true;
          await opts.run();
        }
        return {
          journal: { status: "running" },
          journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
          decision: await decision(),
        };
      },
    );
    mocks.cmdFinish.mockResolvedValue(0);

    const input = {
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command,
      task_id: TASK_ID,
      implementation_commit: "implementation",
      decision,
    };
    await runDirectTaskFinalizationOperation(input);
    await runDirectTaskFinalizationOperation(input);

    expect(mocks.formalOperation).toHaveBeenCalledTimes(2);
    expect(mocks.formalOperation).toHaveBeenCalledWith(
      expect.objectContaining({ id: "task_finish", task_id: TASK_ID }),
    );
    expect(mocks.cmdFinish).toHaveBeenCalledOnce();
    expect(mocks.cmdFinish).toHaveBeenCalledWith(
      expect.objectContaining({
        taskIds: [TASK_ID],
        commit: "implementation",
        implementationCommit: "implementation",
      }),
    );
    expect(mocks.runProcess).not.toHaveBeenCalled();
  });
});
