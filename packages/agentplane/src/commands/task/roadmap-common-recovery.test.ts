import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import {
  consumeRetryBudget,
  recoveryDecisionForFailure,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import { describe, expect, it, vi } from "vitest";

import { readKernelNextAction } from "../../adapters/task-backend/kernel-next-action.js";
import { applyKernelEffectStep, type KernelEffectPort } from "./kernel-effect-coordinator.js";

const fingerprint = (value: string) => k.kernelDigest(value);

function budget() {
  return {
    max_episodes: 8,
    max_agent_runs: 4,
    max_input_tokens: null,
    max_output_tokens: null,
    max_total_tokens: null,
    max_wall_time_ms: 60_000,
    max_changed_files: 20,
    max_diff_lines: null,
    max_no_progress_episodes: 2,
  };
}

function effect(state: k.EffectState): k.ExternalEffect {
  return {
    id: "integration.run_next:task-1",
    kind: "integration.run_next",
    execution_requirements: {
      scope_roots: [],
      repository_effects: [],
      external_effects: ["integration.run_next"],
      capabilities: ["provider_write"],
      resources: [],
    },
    idempotency_key: "task-1:integration.run_next",
    state,
    request_digest: fingerprint("request"),
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

function canonicalRead(candidate: k.ExternalEffect | null, state: k.WorkItemState = "EXECUTING") {
  return {
    kind: "canonical",
    task: { id: "task-1" },
    record: {
      aggregate: {
        id: "task-1",
        state: "ACTIVE",
        effects: candidate ? [candidate] : [],
        current_plan: {
          state: "APPROVED",
          work_items: [{ id: "build", optional: false }],
        },
        work_items: {
          build: {
            definition: {
              id: "build",
              optional: false,
              depends_on: [],
              required_inputs: [],
              execution_requirements: { resources: [] },
            },
            state,
            attempt: 3,
            claim_id: "claim-3",
          },
        },
      },
    },
  };
}

describe("LC-12 common recovery admission", () => {
  it("preserves a completed operation identity until its route observation is applied", () => {
    const original = createSupervisorExecutionEpisodeJournal({
      task_id: "task-1",
      task_revision: 7,
      state_fingerprint_digest: fingerprint("before"),
      budget: budget(),
      now: "2026-09-21T00:00:00.000Z",
    });
    const started = startSupervisorExecutionEpisode({
      journal: original,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { work_order_id: "work-order-1" },
      precondition_fingerprint_digest: fingerprint("before"),
      authority_ref: "work-order:work-order-1",
      authority_digest: fingerprint("authority"),
      work_order_ref: "exchange/work-order.json",
      effect_ref: "exchange/result.json",
      now: "2026-09-21T00:00:01.000Z",
    });
    if (started.status !== "started") throw new Error("expected the operation to start");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { result_digest: fingerprint("result"), receipt_id: "receipt-1" },
      now: "2026-09-21T00:00:02.000Z",
    });
    const resultDigest = digestSupervisorEpisodeValue({
      result_digest: fingerprint("result"),
      receipt_id: "receipt-1",
    });

    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: completed,
      state_fingerprint_digest: fingerprint("after"),
      now: "2026-09-21T00:00:03.000Z",
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: recovered,
      state_fingerprint_digest: fingerprint("after"),
      route_observation: { reason_code: "kernel_work_item_inspection_required" },
      now: "2026-09-21T00:00:04.000Z",
    });

    expect(recovered).toMatchObject({
      cursor: { phase: "completed", operation_key: started.operation_key },
      operations: [
        {
          operation_key: started.operation_key,
          effect_ref: "exchange/result.json",
          result_digest: resultDigest,
        },
      ],
    });
    expect(advanced.operations).toHaveLength(1);
    expect(advanced.operations[0]).toMatchObject({
      operation_key: started.operation_key,
      effect_ref: "exchange/result.json",
      result_digest: resultDigest,
      postcondition_fingerprint_digest: fingerprint("after"),
    });
  });

  it("stops an uncertain intent and prioritizes effect observation over new work", () => {
    const original = createSupervisorExecutionEpisodeJournal({
      task_id: "task-1",
      task_revision: 7,
      state_fingerprint_digest: fingerprint("state"),
      budget: budget(),
      now: "2026-09-21T00:00:00.000Z",
    });
    const started = startSupervisorExecutionEpisode({
      journal: original,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { operation_id: "integration.run_next" },
      precondition_fingerprint_digest: fingerprint("state"),
      authority_ref: "workflow:integration.run_next",
      authority_digest: fingerprint("authority"),
      effect_ref: "task-1:integration.run_next",
      now: "2026-09-21T00:00:01.000Z",
    });
    if (started.status !== "started") throw new Error("expected the operation to start");

    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: started.journal,
      state_fingerprint_digest: fingerprint("state"),
      now: "2026-09-21T00:00:02.000Z",
    });
    const route = readKernelNextAction(
      canonicalRead(effect("PENDING")) as never,
      fingerprint("state"),
    );

    expect(recovered).toMatchObject({
      status: "stopped",
      stop: { reason: "effect_in_doubt", operation_key: started.operation_key },
    });
    expect(route).toMatchObject({
      reason_code: "kernel_effect_observation_required",
      effect_id: "integration.run_next:task-1",
      work_item_id: null,
    });
  });

  it("observes a pending effect without redispatching it or changing the semantic attempt", async () => {
    const candidate = effect("PENDING");
    const commands: k.TaskCommand[] = [];
    const read = canonicalRead(candidate);
    const dispatch = vi.fn();
    const port: KernelEffectPort = {
      dispatch,
      observe: vi.fn().mockResolvedValue({
        state: "IN_DOUBT",
        digest: fingerprint("provider-uncertain"),
      }),
    };
    const runtime = {
      input: vi.fn((command: k.TaskCommand) => Promise.resolve({ command })),
      adapter: {
        execute: vi.fn((input: { command: k.TaskCommand }) => {
          commands.push(input.command);
          return Promise.resolve({
            kind: "committed",
            record: read.record,
            events: [],
            receipts: [],
            replayed: false,
          });
        }),
      },
    } as never;

    await expect(
      applyKernelEffectStep({
        runtime,
        record: read.record as never,
        route: readKernelNextAction(read as never, fingerprint("state")),
        resolve_port: () => port,
      }),
    ).resolves.toMatchObject({
      kind: "stop",
      action: { reason: "canonical_effect_reconciliation_required" },
    });

    expect(dispatch).not.toHaveBeenCalled();
    expect(commands).toEqual([expect.objectContaining({ kind: "observe_effect" })]);
    expect(read.record.aggregate.work_items.build.attempt).toBe(3);
  });

  it("keeps an interrupted semantic return pending and separates service retry from rework", () => {
    const route = readKernelNextAction(canonicalRead(null) as never, fingerprint("state"));
    const serviceFailure = {
      kind: "operation" as const,
      code: "transport_interrupted",
      message: "provider return was interrupted",
      retryable: true,
      cause_refs: [],
    };
    const semanticFailure = {
      kind: "validation" as const,
      code: "acceptance_failed",
      message: "accepted output did not pass validation",
      retryable: true,
      cause_refs: [],
    };
    const retryBudget = {
      task_id: "task-1",
      work_item_id: "build",
      operation: "semantic_work",
      failure_kind: serviceFailure.kind,
      maximum: 2,
      consumed: 0,
      reset_fingerprint: fingerprint("state"),
    };

    expect(route).toMatchObject({
      reason_code: "kernel_work_item_result_required",
      work_item_id: "build",
    });
    expect(recoveryDecisionForFailure(serviceFailure).action).toBe("retry");
    expect(recoveryDecisionForFailure(semanticFailure).action).toBe("repair");
    expect(
      consumeRetryBudget({ budget: retryBudget, current_fingerprint: fingerprint("state") }),
    ).toMatchObject({ consumed: 1 });
    expect(canonicalRead(null).record.aggregate.work_items.build.attempt).toBe(3);
  });
});
