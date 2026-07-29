import type * as CoreSchemas from "@agentplaneorg/core/schemas";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  advance: vi.fn(),
  applyEvaluator: vi.fn(),
  buildDecision: vi.fn(),
  complete: vi.fn(),
  executeEvaluator: vi.fn(),
  loadCatalog: vi.fn(),
  loadTask: vi.fn(),
  open: vi.fn(),
  start: vi.fn(),
  supervise: vi.fn(),
  verify: vi.fn(),
}));

vi.mock("@agentplaneorg/core/schemas", async (importOriginal) => ({
  ...(await importOriginal<typeof CoreSchemas>()),
  advanceSupervisorExecutionEpisodeState: mocks.advance,
  completeSupervisorExecutionEpisode: mocks.complete,
  startSupervisorExecutionEpisode: mocks.start,
}));
vi.mock("../../evaluators/catalog.js", () => ({ loadEvaluatorCatalog: mocks.loadCatalog }));
vi.mock("../evaluator/evaluator-execute-supervisor.js", () => ({
  executeEvaluatorSupervisorEpisode: mocks.executeEvaluator,
}));
vi.mock("../evaluator/evaluator-review-apply.js", () => ({
  applyEvaluatorSgrReview: mocks.applyEvaluator,
}));
vi.mock("../shared/route-decision.js", () => ({ buildTaskRouteDecision: mocks.buildDecision }));
vi.mock("../shared/supervisor-execution-episode.js", () => ({
  supervisePersistedWorkflowEpisode: mocks.supervise,
  openSupervisorExecutionEpisode: mocks.open,
}));
vi.mock("../shared/task-backend.js", () => ({ loadTaskFromContext: mocks.loadTask }));
vi.mock("./verify-record.js", () => ({ cmdVerifyParsed: mocks.verify }));

import { superviseDirectTaskRun } from "./direct-task-supervisor.js";

const TASK_ID = "202607290000-RF10A1";
const FINGERPRINT = {
  digest: "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
} as const;

const journal = {
  status: "running",
  cursor: { episode: 2, phase: "ready", operation_key: null },
  usage: {
    episodes: 2,
    agent_runs: 1,
    input_tokens: 1,
    output_tokens: 1,
    total_tokens: 2,
    wall_time_ms: 1,
    changed_files: 1,
    diff_lines: 0,
    no_progress_episodes: 0,
  },
  stop: null,
  digest: "sha256:bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
} as const;

function decision(opts: {
  id: string;
  code: string;
  operation?: { id: "task.start" | "runner.follow"; params: Record<string, unknown> };
}) {
  return {
    workflowMode: "direct",
    task: { id: TASK_ID, title: "RF-10 direct supervision", status: "DOING", owner: "CODER" },
    workflowStep: {
      id: opts.id,
      phase: "direct_execution",
      summary: opts.id,
      compatibility: { code: opts.code, command: null, summary: opts.id, requiresApproval: false },
      preconditionFingerprint: FINGERPRINT,
      ...(opts.operation
        ? { kind: "cli_operation", operation: opts.operation }
        : { kind: "terminal", outcome: { type: "input_required", taskId: TASK_ID } }),
    },
  } as never;
}

describe("direct task supervisor", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps evaluator rework as a typed stop after one started EXECUTOR episode", async () => {
    const start = decision({
      id: "task.start",
      code: "start_direct",
      operation: {
        id: "task.start",
        params: { taskId: TASK_ID, author: "CODER", body: "Start: direct." },
      },
    });
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const rework = decision({
      id: "agent.implementation_rework",
      code: "implementation_rework_required",
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-executor" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-executor/execution-receipt.json",
          sha256: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
        semantic_result: {
          provenance: "agent_reported",
          value: { kind: "agent_semantic_result", status: "completed" },
        },
      },
    } as never;

    mocks.buildDecision.mockResolvedValueOnce(start).mockResolvedValueOnce(rework);
    mocks.supervise
      .mockResolvedValueOnce({
        journal,
        journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
        execution: {
          executable: true,
          result: { status: "succeeded" },
          refreshed_decision: runner,
        },
      })
      .mockResolvedValueOnce({
        journal,
        journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
        execution: {
          executable: true,
          result: { operation_result: { kind: "runner_lifecycle", value: lifecycle } },
          refreshed_decision: runner,
        },
      });
    mocks.loadCatalog.mockResolvedValue([{ id: "recovery-context" }]);
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, quality_review: null });
    mocks.executeEvaluator.mockResolvedValue({
      result: { evaluator_id: "recovery-context", verdict: "rework" },
      result_path: "/repo/.agentplane/tasks/evaluator-result.json",
      report_path: "/repo/.agentplane/tasks/evaluator-report.json",
      work_order_path: "/repo/.agentplane/tasks/evaluator-work-order.json",
      journal,
      store: { path: "/repo/.git/agentplane/supervisor/episodes/journal.json", write: vi.fn() },
    });
    mocks.applyEvaluator.mockResolvedValue({
      result_path: ".agentplane/tasks/evaluator-result.json",
      report_path: ".agentplane/tasks/evaluator-report.json",
    });
    mocks.advance.mockReturnValue(journal);

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(mocks.supervise).toHaveBeenCalledTimes(2);
    expect(mocks.executeEvaluator).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      status: "stopped",
      executor: { run_id: "run-executor", semantic_status: "completed" },
      evaluator: { evaluator_id: "recovery-context", verdict: "rework" },
      stop: { code: "evaluator_rework" },
    });
  });

  it("stops for a bounded knowledge request without starting an EVALUATOR", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-needs-context" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-needs-context/execution-receipt.json",
          sha256: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
        semantic_result: {
          provenance: "agent_reported",
          value: { kind: "agent_semantic_result", status: "needs_context" },
        },
      },
    } as never;
    mocks.buildDecision.mockResolvedValue(runner);
    mocks.supervise.mockResolvedValue({
      journal,
      journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
      execution: {
        executable: true,
        result: { operation_result: { kind: "runner_lifecycle", value: lifecycle } },
        refreshed_decision: runner,
      },
    });

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({ status: "stopped", stop: { code: "missing_knowledge" } });
    expect(mocks.executeEvaluator).not.toHaveBeenCalled();
  });

  it("turns an EXECUTOR adapter crash into a typed stop", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    mocks.buildDecision.mockResolvedValue(runner);
    mocks.supervise.mockRejectedValue(new Error("adapter exited unexpectedly"));

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({
      status: "stopped",
      stop: { code: "executor_adapter_crash", operation_id: "runner.follow" },
    });
  });

  it("records only evaluator evidence before formal verification and finalization", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-pass" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-pass/execution-receipt.json",
          sha256: "sha256:cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
        semantic_result: {
          provenance: "agent_reported",
          value: { kind: "agent_semantic_result", status: "completed" },
        },
      },
    } as never;
    const store = {
      path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
      write: vi.fn(),
    };
    mocks.buildDecision.mockResolvedValue(runner);
    mocks.supervise.mockResolvedValue({
      journal,
      journal_path: store.path,
      execution: {
        executable: true,
        result: { operation_result: { kind: "runner_lifecycle", value: lifecycle } },
        refreshed_decision: runner,
      },
    });
    mocks.loadCatalog.mockResolvedValue([{ id: "recovery-context" }]);
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, quality_review: null });
    mocks.executeEvaluator.mockResolvedValue({
      result: { evaluator_id: "recovery-context", verdict: "pass" },
      result_path: "/repo/.agentplane/tasks/evaluator-result.json",
      report_path: "/repo/.agentplane/tasks/evaluator-report.json",
      work_order_path: "/repo/.agentplane/tasks/evaluator-work-order.json",
      journal,
      store,
    });
    mocks.applyEvaluator.mockResolvedValue({
      result_path: ".agentplane/tasks/evaluator-result.json",
      report_path: ".agentplane/tasks/evaluator-report.json",
    });
    mocks.open.mockResolvedValue({ journal, journal_path: store.path, store });
    mocks.start.mockReturnValue({ status: "started", journal, operation_key: "sha256:operation" });
    mocks.complete.mockReturnValue(journal);
    mocks.advance.mockReturnValue(journal);
    mocks.verify.mockResolvedValue(0);

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({
      status: "finalized",
      evaluator: { evaluator_id: "recovery-context", verdict: "pass" },
      stop: null,
    });
    expect(mocks.verify).toHaveBeenCalledWith(
      expect.objectContaining({
        by: "SUPERVISOR",
        state: "ok",
      }),
    );
    const [verifyPayload] = mocks.verify.mock.calls[0] as unknown as [{ details: string }];
    expect(verifyPayload.details).toContain(".agentplane/tasks/evaluator-result.json");
    expect(mocks.open).toHaveBeenCalledTimes(2);
  });
});
