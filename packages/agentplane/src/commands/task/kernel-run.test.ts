import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { coordinateKernelEffect, type KernelEffectPort } from "./kernel-effect-coordinator.js";

const digest = (value: string) => k.kernelDigest(value);

function effect(state: k.EffectState): k.ExternalEffect {
  return {
    id: "pr.open:task-1",
    kind: "pr.open",
    execution_requirements: {
      scope_roots: [],
      repository_effects: [],
      external_effects: ["pr.open"],
      capabilities: ["provider_write"],
      resources: [],
    },
    idempotency_key: "task-1:pr.open",
    state,
    request_digest: digest("request"),
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

function record(candidate: k.ExternalEffect) {
  return { aggregate: { id: "task-1", effects: [candidate] } } as never;
}

function runtime(commands: k.TaskCommand[]) {
  return {
    input: vi.fn((payload: k.TaskCommand) => Promise.resolve({ command: payload })),
    adapter: {
      execute: vi.fn((input: { command: k.TaskCommand }) => {
        commands.push(input.command);
        return Promise.resolve({
          kind: "committed",
          record: record(effect("PENDING")),
          events: [],
          receipts: [],
          replayed: false,
        });
      }),
    },
    lifecycle: {
      apply: vi.fn((input: { command: k.TaskCommand }) => {
        commands.push(input.command);
        return Promise.resolve({
          kind: "committed",
          record: record(effect("NOT_APPLIED")),
          events: [],
          receipts: [],
          replayed: false,
        });
      }),
    },
  } as never;
}

describe("canonical managed effect recovery", () => {
  it("observes a pending effect without dispatching it again", async () => {
    const candidate = effect("PENDING");
    const commands: k.TaskCommand[] = [];
    const dispatch = vi.fn();
    const observe = vi.fn().mockResolvedValue({ state: "NOT_APPLIED", digest: digest("absent") });
    const port: KernelEffectPort = {
      dispatch,
      observe,
    };

    await expect(
      coordinateKernelEffect({
        runtime: runtime(commands),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_observation_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).resolves.toEqual({
      kind: "stop",
      action: {
        kind: "human_required",
        reason: "canonical_effect_not_applied",
        effect_id: candidate.id,
        idempotency_key: candidate.idempotency_key,
      },
    });

    expect(dispatch).not.toHaveBeenCalled();
    expect(observe).toHaveBeenCalledWith(
      expect.objectContaining({ idempotency_key: candidate.idempotency_key }),
    );
    expect(commands).toEqual([
      expect.objectContaining({
        kind: "observe_effect",
        effect_id: candidate.id,
        observed_state: "NOT_APPLIED",
      }),
      expect.objectContaining({ kind: "transition_task", action: "request_human" }),
    ]);
  });

  it("stops for explicit reconciliation after an in-doubt observation", async () => {
    const candidate = effect("IN_DOUBT");
    const dispatch = vi.fn();
    const observe = vi.fn();
    const port: KernelEffectPort = { dispatch, observe };

    await expect(
      coordinateKernelEffect({
        runtime: runtime([]),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_observation_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).resolves.toEqual({
      kind: "stop",
      action: {
        kind: "human_required",
        reason: "canonical_effect_reconciliation_required",
        effect_id: candidate.id,
        idempotency_key: candidate.idempotency_key,
      },
    });
    expect(dispatch).not.toHaveBeenCalled();
    expect(observe).not.toHaveBeenCalled();
  });
});
