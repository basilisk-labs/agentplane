import { describe, expect, it } from "vitest";

import {
  buildStateFingerprint,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";

import type { TaskRouteDecision } from "./route-decision-types.js";
import type { TaskRunnerLifecycleResult } from "../../runner/usecases/task-run-lifecycle-result.js";
import { recordCodexProviderUsageForResult } from "../../runner/adapters/codex-result-transport.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import { WORKFLOW_OPERATION_REGISTRY, type WorkflowOperation } from "./workflow-step.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  supervisePersistedWorkflowEpisode,
} from "./supervisor-execution-episode.js";

const taskId = "202607280001-EPISODE";

function fixtureDecision(
  root: string,
  revision: number,
  owner: "CODER" | "CURATOR" = "CODER",
): TaskRouteDecision {
  const component = {
    state: "present",
    source: "supervisor_execution_episode_test",
    value: { taskId, revision },
  } as const;
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: revision,
    git_head: "0123456789abcdef0123456789abcdef01234567",
    worktree: root,
    components: {
      task: component,
      git: component,
      backend_projection: component,
      policy: component,
      blueprint: component,
      knowledge: component,
      provider: component,
      authority: component,
    },
  });
  const operation: WorkflowOperation = {
    id: "runner.follow",
    type: "runner_follow",
    params: { mode: "run", taskId },
    preconditionFingerprint: fingerprint,
    authorityRef: `route:${taskId}:${fingerprint.digest}`,
    idempotencyKey: `runner.follow:${taskId}:${fingerprint.digest}:fixture`,
    expectedPostconditions: WORKFLOW_OPERATION_REGISTRY["runner.follow"].expectedPostconditions,
    triggersGitHooks: false,
  };
  return {
    task: {
      id: taskId,
      title: "Supervisor episode fixture",
      status: "DOING",
      owner,
      planApproval: "approved",
      verification: "pending",
      commit: null,
    },
    workflowStep: {
      id: "runner.follow",
      kind: "cli_operation",
      summary: "run the typed task runner operation",
      preconditionFingerprint: fingerprint,
      operation,
      execution: { actionKind: "local_command" },
    },
    executionPacket: {
      actionKind: "local_command",
      safeToMutate: true,
      exactArgv: projectWorkflowOperationArgv(operation),
    },
  } as TaskRouteDecision;
}

function executedLifecycle(opts: {
  decision: TaskRouteDecision;
  metrics?: {
    duration_ms?: number;
  };
  provider_usage?: { input_tokens: number; output_tokens: number; total_tokens: number };
  files_changed_count?: number;
}): TaskRunnerLifecycleResult {
  const lifecycle: TaskRunnerLifecycleResult = {
    schema: "agentplane.task_runner_lifecycle_result.v1",
    phase: "executed",
    task_id: opts.decision.task.id,
    invocation: {
      adapter_id: "codex",
      run_id: "run-supervisor-episode",
      work_order_id: "work-order-supervisor-episode",
      run_dir: "/repo/.agentplane/runs/run-supervisor-episode",
      bundle_path: "/repo/.agentplane/runs/run-supervisor-episode/bundle.json",
      bootstrap_path: null,
      result_path: "/repo/.agentplane/runs/run-supervisor-episode/result.json",
    },
    lifecycle: {
      mode: "execute",
      status: "success",
      state_fingerprint: null,
      effect: {
        state: "not_applied",
        operation: null,
        authority: null,
        observed_evidence: null,
        claim_generation: null,
        resolution: null,
        resolution_provenance: null,
        source_resolution: null,
        source_resolution_provenance: null,
      },
      work_order_authority: null,
    },
    result: {
      status: "success",
      exit_code: 0,
      started_at: "2026-07-28T00:00:00.000Z",
      ended_at: "2026-07-28T00:00:01.000Z",
      metrics: opts.metrics,
      evidence:
        opts.files_changed_count === undefined
          ? undefined
          : { provenance: "supervisor_observed", files_changed_count: opts.files_changed_count },
    },
    active_claim_cleanup: null,
  };
  if (opts.provider_usage && lifecycle.phase === "executed" && lifecycle.result) {
    recordCodexProviderUsageForResult(lifecycle.result, opts.provider_usage);
  }
  return lifecycle;
}

function successfulOperationResult() {
  return Promise.resolve({
    status: "succeeded" as const,
    observed_postconditions: ["runner_state_observed"],
    detail: "fixture operation completed",
    exit_code: 0,
  });
}

describe("persisted supervisor execution episodes", () => {
  it("records intent, outcome, and refreshed route without a second controller", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const refreshed = fixtureDecision(root, 2);
    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "fixture runner completed",
          exit_code: 0,
        }),
      refresh: () => Promise.resolve(refreshed),
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: 10,
        max_output_tokens: 10,
        max_total_tokens: 20,
        max_wall_time_ms: 10_000,
        max_changed_files: 10,
        max_diff_lines: 100,
        max_no_progress_episodes: 2,
      },
    });
    const stored = await createSupervisorEpisodeStore(outcome.journal_path).read();

    expect(outcome.execution).toMatchObject({
      executable: true,
      stop_reason: null,
      refreshed_decision: refreshed,
    });
    expect(outcome.journal).toMatchObject({
      task_id: taskId,
      task_revision: 1,
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      operations: [
        {
          kind: "agent_episode",
          status: "completed",
          postcondition_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
        },
      ],
    });
    expect(stored).toEqual(outcome.journal);
    expect(outcome.journal_path).toEqual(
      await resolveSupervisorExecutionEpisodePath({ git_root: root, task_id: taskId }),
    );
  });

  it("advances a recovered completed episode without replaying its provider", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const refreshed = fixtureDecision(root, 2);
    const budget = {
      max_episodes: 2,
      max_agent_runs: 2,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: null,
      max_changed_files: null,
      max_diff_lines: null,
      max_no_progress_episodes: null,
    } as const;
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: 1,
      state_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
      budget,
    });
    const started = startSupervisorExecutionEpisode({
      journal: created,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: decision.workflowStep.operation,
      precondition_fingerprint_digest: decision.workflowStep.preconditionFingerprint.digest,
    });
    if (started.status !== "started") throw new Error("expected a started fixture episode");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { status: "succeeded" },
    });
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    await createSupervisorEpisodeStore(journalPath).write(completed);
    let executions = 0;

    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () => {
        executions += 1;
        return Promise.reject(new Error("the completed provider must not replay"));
      },
      refresh: () => Promise.resolve(refreshed),
      budget,
    });

    expect(executions).toBe(0);
    expect(outcome.journal).toMatchObject({
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      operations: [
        {
          status: "completed",
          postcondition_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
        },
      ],
    });
  });

  it("refuses to replay a completed CLI side effect with the same idempotency key", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const first = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "fixture runner completed",
          exit_code: 0,
        }),
      refresh: () => Promise.resolve(decision),
    });
    expect(first.execution.executable).toBe(true);

    let executions = 0;
    const replay = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () => {
        executions += 1;
        return Promise.reject(new Error("completed side effect must not replay"));
      },
      refresh: () => Promise.resolve(decision),
    });

    expect(executions).toBe(0);
    expect(replay.execution.executable).toBe(false);
    expect(replay.execution.stop_reason).toContain("already completed this idempotency key");
  });

  it("opens a distinct operation after a completed journal becomes stale", async () => {
    const root = await mkGitRepoRoot();
    const firstDecision = fixtureDecision(root, 1);
    const secondDecision = fixtureDecision(root, 2);
    const finalDecision = fixtureDecision(root, 3);

    const first = await supervisePersistedWorkflowEpisode({
      decision: firstDecision,
      git_root: root,
      task_revision: 1,
      execute: successfulOperationResult,
      refresh: () => Promise.resolve(firstDecision),
    });
    expect(first.execution.executable).toBe(true);

    let secondExecutions = 0;
    const second = await supervisePersistedWorkflowEpisode({
      decision: secondDecision,
      git_root: root,
      task_revision: 2,
      execute: () => {
        secondExecutions += 1;
        return successfulOperationResult();
      },
      refresh: () => Promise.resolve(finalDecision),
    });

    expect(secondExecutions).toBe(1);
    expect(second.execution).toMatchObject({
      executable: true,
      stop_reason: null,
      refreshed_decision: finalDecision,
    });
    expect(second.journal).toMatchObject({
      status: "running",
      cursor: { phase: "ready", operation_key: null },
      state_fingerprint_digest: finalDecision.workflowStep.preconditionFingerprint.digest,
      operations: [
        { status: "completed" },
        {
          status: "completed",
          precondition_fingerprint_digest:
            secondDecision.workflowStep.preconditionFingerprint.digest,
          postcondition_fingerprint_digest:
            finalDecision.workflowStep.preconditionFingerprint.digest,
        },
      ],
    });
  });

  it("projects supervisor-observed provider and execution usage into the journal", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "fixture runner completed",
          exit_code: 0,
          operation_result: {
            kind: "runner_lifecycle" as const,
            value: executedLifecycle({
              decision,
              metrics: { duration_ms: 17 },
              provider_usage: { input_tokens: 3, output_tokens: 5, total_tokens: 8 },
              files_changed_count: 2,
            }),
          },
        }),
      refresh: () => Promise.resolve(fixtureDecision(root, 2)),
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: 10,
        max_output_tokens: 10,
        max_total_tokens: 20,
        max_wall_time_ms: 1000,
        max_changed_files: 10,
        max_diff_lines: null,
        max_no_progress_episodes: 2,
      },
    });

    expect(outcome.journal.usage).toMatchObject({
      episodes: 1,
      agent_runs: 1,
      input_tokens: 3,
      output_tokens: 5,
      total_tokens: 8,
      wall_time_ms: 17,
      changed_files: 2,
    });
    expect(outcome.journal.status).toBe("running");
  });

  it("charges observed wall time when a runner executor throws", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: async () => {
        await new Promise<void>((resolve) => setTimeout(resolve, 20));
        throw new Error("runner fixture failed");
      },
      refresh: () => Promise.resolve(fixtureDecision(root, 2)),
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: 10,
        max_output_tokens: 10,
        max_total_tokens: 20,
        max_wall_time_ms: 10_000,
        max_changed_files: 10,
        max_diff_lines: null,
        max_no_progress_episodes: 2,
      },
    });
    const stored = validateSupervisorExecutionEpisodeJournal(
      await createSupervisorEpisodeStore(outcome.journal_path).read(),
    );

    expect(outcome.execution).toMatchObject({ result: { status: "failed" } });
    expect(stored).toMatchObject({
      status: "stopped",
      stop: { reason: "operation_failed" },
      usage: { episodes: 1, agent_runs: 1 },
    });
    expect(stored.usage.wall_time_ms).toBeGreaterThan(0);
  });

  it("keeps a CURATOR context run in the same journal and budget boundary", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1, "CURATOR");
    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "context runner completed",
          exit_code: 0,
          operation_result: {
            kind: "runner_lifecycle" as const,
            value: executedLifecycle({
              decision,
              metrics: { duration_ms: 1 },
              provider_usage: { input_tokens: 1, output_tokens: 1, total_tokens: 2 },
              files_changed_count: 1,
            }),
          },
        }),
      refresh: () => Promise.resolve(fixtureDecision(root, 2, "CURATOR")),
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: 10,
        max_output_tokens: 10,
        max_total_tokens: 20,
        max_wall_time_ms: 1000,
        max_changed_files: 10,
        max_diff_lines: null,
        max_no_progress_episodes: 2,
      },
    });

    expect(outcome.journal.operations).toMatchObject([
      { role: "CURATOR", kind: "agent_episode", status: "completed" },
    ]);
  });

  it("stops for review when an active budget has no trusted telemetry", async () => {
    const root = await mkGitRepoRoot();
    const decision = fixtureDecision(root, 1);
    const outcome = await supervisePersistedWorkflowEpisode({
      decision,
      git_root: root,
      task_revision: 1,
      execute: () =>
        Promise.resolve({
          status: "succeeded" as const,
          observed_postconditions: ["runner_state_observed"],
          detail: "fixture runner completed",
          exit_code: 0,
          operation_result: {
            kind: "runner_lifecycle" as const,
            value: executedLifecycle({
              decision,
              metrics: { duration_ms: 17 },
              files_changed_count: 0,
            }),
          },
        }),
      refresh: () => Promise.resolve(fixtureDecision(root, 2)),
      budget: {
        max_episodes: 2,
        max_agent_runs: 2,
        max_input_tokens: 10,
        max_output_tokens: 10,
        max_total_tokens: 20,
        max_wall_time_ms: 1000,
        max_changed_files: 10,
        max_diff_lines: null,
        max_no_progress_episodes: 2,
      },
    });

    expect(outcome.journal).toMatchObject({
      status: "stopped",
      stop: {
        reason: "human_review",
        exhausted_dimensions: [
          "input_tokens_telemetry",
          "output_tokens_telemetry",
          "total_tokens_telemetry",
        ],
      },
    });
  });
});
