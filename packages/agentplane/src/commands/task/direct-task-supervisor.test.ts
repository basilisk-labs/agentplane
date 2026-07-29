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
  finish: vi.fn(),
  finalizeDirect: vi.fn(),
  readHead: vi.fn(),
  readStatus: vi.fn(),
  recordEvidence: vi.fn(),
  resolveCommit: vi.fn(),
  runChecks: vi.fn(),
  start: vi.fn(),
  supervise: vi.fn(),
  verify: vi.fn(),
  verifyDirect: vi.fn(),
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
vi.mock("./direct-task-finalization.js", () => ({
  finishDirectTask: mocks.finish,
  readDirectRepositoryStatus: mocks.readStatus,
  readDirectTaskHead: mocks.readHead,
  recordDirectImplementationEvidence: mocks.recordEvidence,
  resolveDirectImplementationCommit: mocks.resolveCommit,
}));
vi.mock("./direct-task-supervisor-closeout.js", () => ({
  finalizeDirectTask: mocks.finalizeDirect,
  verifyDirectTask: mocks.verifyDirect,
}));
vi.mock("./direct-task-verification.js", () => ({
  runDirectTaskVerification: mocks.runChecks,
}));
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
  status?: string;
  verification?: string | null;
  kind?: "approval" | "terminal";
}) {
  const kind = opts.kind ?? (opts.operation ? "cli_operation" : "terminal");
  return {
    workflowMode: "direct",
    task: {
      id: TASK_ID,
      title: "RF-10 direct supervision",
      status: opts.status ?? "DOING",
      owner: "CODER",
      verification: opts.verification ?? null,
    },
    workflowStep: {
      id: opts.id,
      phase: "direct_execution",
      summary: opts.id,
      compatibility: { code: opts.code, command: null, summary: opts.id, requiresApproval: false },
      preconditionFingerprint: FINGERPRINT,
      ...(opts.operation
        ? { kind: "cli_operation", operation: opts.operation }
        : kind === "approval"
          ? { kind: "approval", request: { type: "plan_approval", taskId: TASK_ID } }
          : { kind: "terminal", outcome: { type: "input_required", taskId: TASK_ID } }),
    },
  } as never;
}

describe("direct task supervisor", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.readStatus.mockResolvedValue({
      command: "git status --short --untracked-files=all",
      lines: [],
    });
    mocks.recordEvidence.mockResolvedValue({
      artifact_path: `.agentplane/tasks/${TASK_ID}/supervision/implementation-evidence.json`,
      implementation_commit: "def456",
    });
    mocks.resolveCommit.mockResolvedValue({ status: "ready", commit: "def456" });
    const completion = decision({
      id: "task.complete.input",
      code: "complete_direct",
      verification: "ok",
    });
    mocks.verifyDirect.mockImplementation((opts: { on_lifecycle_operation?: () => void }) => {
      opts.on_lifecycle_operation?.();
      return {
        status: "verified",
        journal,
        journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
        decision: completion,
        declared_checks: 1,
      };
    });
    mocks.finalizeDirect.mockImplementation((opts: { on_lifecycle_operation?: () => void }) => {
      opts.on_lifecycle_operation?.();
      return {
        status: "finalized",
        journal,
        journal_path: "/repo/.git/agentplane/supervisor/episodes/journal.json",
        decision: decision({ id: "task.done", code: "done", status: "DONE", verification: "ok" }),
        declared_checks: 1,
      };
    });
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
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, events: [] });

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
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, events: [] });
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

  it("classifies an EVALUATOR adapter failure without exposing its message", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-evaluator-crash" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-evaluator-crash/execution-receipt.json",
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
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, events: [] });
    mocks.loadCatalog.mockResolvedValue([{ id: "recovery-context" }]);
    mocks.executeEvaluator.mockRejectedValue(
      new Error("provider response contains private detail"),
    );

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({
      status: "stopped",
      stop: {
        code: "evaluator_adapter_crash",
        reason:
          "The read-only EVALUATOR adapter stopped before a typed verdict was applied (Error).",
      },
      metrics: {
        provider_episodes: 1,
        executor_lifecycle_event_delta: 0,
        orchestration: { lifecycle_calls: 2, tool_calls: 3 },
      },
    });
    expect(result.stop?.reason).not.toContain("private detail");
  });

  it("verifies before evaluation and finalizes only after an EVALUATOR pass", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const complete = decision({
      id: "task.complete.input",
      code: "complete_direct",
      verification: "ok",
    });
    const done = decision({ id: "task.done", code: "done", status: "DONE", verification: "ok" });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-pass" },
      lifecycle: {
        work_order_authority: { writable_roots: ["packages/agentplane/src/commands/task"] },
      },
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
    mocks.buildDecision
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(complete)
      .mockResolvedValueOnce(complete)
      .mockResolvedValueOnce(done);
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
    const executorTask = {
      id: TASK_ID,
      quality_review: null,
      verify: ["bun run test:critical"],
      events: [],
      revision: 5,
    };
    const verifiedTask = { ...executorTask, revision: 6 };
    mocks.loadTask
      .mockResolvedValueOnce(executorTask)
      .mockResolvedValueOnce(verifiedTask)
      .mockResolvedValueOnce(verifiedTask)
      .mockResolvedValueOnce(verifiedTask);
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
    mocks.readHead.mockResolvedValue("abc123");
    mocks.resolveCommit.mockResolvedValue({ status: "ready", commit: "def456" });
    mocks.runChecks.mockResolvedValue({
      status: "passed",
      artifact_path: ".agentplane/tasks/202607290000-RF10A1/supervision/declared-checks.json",
      checks: [{ command: "bun run test:critical" }],
      reason: null,
    });
    mocks.finish.mockResolvedValue(0);

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
    expect(mocks.verifyDirect.mock.calls[0]?.[0]).toMatchObject({
      task: { verify: ["bun run test:critical"] },
    });
    expect(mocks.executeEvaluator).toHaveBeenCalledWith(
      expect.objectContaining({ task: verifiedTask }),
    );
    expect(mocks.resolveCommit.mock.invocationCallOrder[0]).toBeLessThan(
      mocks.executeEvaluator.mock.invocationCallOrder[0] ?? Number.POSITIVE_INFINITY,
    );
    expect(mocks.finalizeDirect).toHaveBeenCalledWith(
      expect.objectContaining({
        execution_base_commit: "abc123",
        allowed_paths: ["packages/agentplane/src/commands/task"],
        declared_checks: 1,
      }),
    );
    expect(result.metrics).toEqual({
      provider_episodes: 2,
      executor_lifecycle_event_delta: 0,
      declared_checks: 1,
      orchestration: {
        lifecycle_calls: 3,
        tool_calls: 4,
        duplicate_executor_context_bytes: null,
      },
    });
  });

  it("stops before verification when a declared check fails", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-check-failure" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-check-failure/execution-receipt.json",
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
    mocks.loadTask.mockResolvedValue({
      id: TASK_ID,
      quality_review: null,
      verify: ["bun run bad"],
      events: [],
    });
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
    mocks.advance.mockReturnValue(journal);
    mocks.runChecks.mockResolvedValue({
      status: "failed",
      artifact_path: ".agentplane/tasks/202607290000-RF10A1/supervision/declared-checks.json",
      checks: [{ command: "bun run bad" }],
      reason: "Declared check failed: bun run bad",
    });
    mocks.verifyDirect.mockResolvedValue({
      status: "stopped",
      journal,
      journal_path: store.path,
      decision: runner,
      declared_checks: 1,
      stop: {
        code: "verification_check_failed",
        reason: "Declared check failed: bun run bad",
        route_step_id: "runner.follow",
        operation_id: "runner.follow",
      },
    });

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({
      status: "stopped",
      stop: { code: "verification_check_failed" },
    });
    expect(mocks.executeEvaluator).not.toHaveBeenCalled();
    expect(mocks.finalizeDirect).not.toHaveBeenCalled();
  });

  it("does not finish from a route changed after evaluator completion", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const approval = decision({
      id: "approval.required",
      code: "approval_required",
      kind: "approval",
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-route-change" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-route-change/execution-receipt.json",
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
    mocks.buildDecision
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(approval);
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
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, quality_review: null, verify: [], events: [] });
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
    mocks.advance.mockReturnValue(journal);
    mocks.finalizeDirect.mockResolvedValue({
      status: "stopped",
      journal,
      journal_path: store.path,
      decision: approval,
      declared_checks: 1,
      stop: {
        code: "stale_route",
        reason: "The route changed after the EVALUATOR result.",
        route_step_id: "approval.required",
        operation_id: null,
      },
    });

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({ status: "stopped", stop: { code: "stale_route" } });
    expect(mocks.verifyDirect).toHaveBeenCalledTimes(1);
    expect(mocks.finalizeDirect).toHaveBeenCalledTimes(1);
  });

  it("does not start EVALUATOR when verification changes the route", async () => {
    const runner = decision({
      id: "runner.follow",
      code: "continue_direct",
      operation: { id: "runner.follow", params: { mode: "run", taskId: TASK_ID } },
    });
    const approval = decision({
      id: "approval.required",
      code: "approval_required",
      kind: "approval",
    });
    const lifecycle = {
      phase: "executed",
      invocation: { run_id: "run-post-verify-route-change" },
      result: {
        status: "success",
        execution_receipt: {
          path: ".agentplane/tasks/run-post-verify-route-change/execution-receipt.json",
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
    mocks.buildDecision
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(runner)
      .mockResolvedValueOnce(approval);
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
    mocks.loadTask.mockResolvedValue({ id: TASK_ID, quality_review: null, verify: [], events: [] });
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
    mocks.runChecks.mockResolvedValue({
      status: "passed",
      artifact_path: ".agentplane/tasks/202607290000-RF10A1/supervision/declared-checks.json",
      checks: [],
      reason: null,
    });
    mocks.verify.mockResolvedValue(0);
    mocks.verifyDirect.mockResolvedValue({
      status: "stopped",
      journal,
      journal_path: store.path,
      decision: approval,
      declared_checks: 0,
      stop: {
        code: "stale_route",
        reason: "The route changed after verification.",
        route_step_id: "approval.required",
        operation_id: null,
      },
    });

    const result = await superviseDirectTaskRun({
      ctx: { cwd: "/repo", rootOverride: null } as never,
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      task_id: TASK_ID,
      include_remote: false,
    });

    expect(result).toMatchObject({ status: "stopped", stop: { code: "stale_route" } });
    expect(mocks.executeEvaluator).not.toHaveBeenCalled();
    expect(mocks.finalizeDirect).not.toHaveBeenCalled();
  });
});
