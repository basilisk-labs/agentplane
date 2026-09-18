import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import {
  coordinateKernelEffect,
  type KernelEffectDispatch,
  type KernelEffectPort,
} from "./kernel-effect-coordinator.js";
import { blockKernelSemanticEpisode } from "./kernel-advance.js";
import { resumeKernelWorkOrder } from "./kernel-work-order.js";

const digest = (value: string) => k.kernelDigest(value);

function effect(state: k.EffectState = "PREPARED"): k.ExternalEffect {
  return {
    id: "repository.commit:build",
    kind: "repository.commit",
    execution_requirements: {
      scope_roots: ["packages/core"],
      repository_effects: ["repository.commit"],
      external_effects: ["repository.commit"],
      capabilities: ["repository_write"],
      resources: [],
    },
    idempotency_key: "task:build:repository.commit",
    state,
    request_digest: digest("request"),
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

function record(candidate: k.ExternalEffect) {
  return {
    aggregate: {
      id: "task-1",
      effects: [candidate],
    },
  } as never;
}

function runtime(events: string[]) {
  return {
    input: vi.fn((payload: k.TaskCommand, mutationId: string) => {
      events.push(`input:${payload.kind}:${mutationId}`);
      return Promise.resolve({ command: payload });
    }),
    adapter: {
      execute: vi.fn((input: { command: k.TaskCommand }) => {
        events.push(`commit:${input.command.kind}`);
        return Promise.resolve({
          kind: "committed",
          record: record(effect()),
          events: [],
          receipts: [],
          replayed: false,
        });
      }),
    },
    lifecycle: {
      apply: vi.fn((input: { command: k.TaskCommand }) => {
        events.push(`commit:${input.command.kind}`);
        return Promise.resolve({
          kind: "committed",
          record: record(effect()),
          events: [],
          receipts: [],
          replayed: false,
        });
      }),
    },
  } as never;
}

describe("canonical effect coordinator", () => {
  it("persists dispatch intent before invoking an adapter and then records success", async () => {
    const events: string[] = [];
    const candidate = effect();
    const observe = vi.fn();
    const port: KernelEffectPort = {
      dispatch: vi.fn((input: KernelEffectDispatch) => {
        events.push(`dispatch:${input.idempotency_key}`);
        return Promise.resolve({ state: "APPLIED", digest: digest("applied") });
      }),
      observe,
    };

    await expect(
      coordinateKernelEffect({
        runtime: runtime(events),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_dispatch_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).resolves.toEqual({ kind: "advanced" });

    expect(events).toEqual([
      `input:begin_effect:effect:begin:${candidate.id}:${candidate.idempotency_key}`,
      "commit:begin_effect",
      `dispatch:${candidate.idempotency_key}`,
      `input:observe_effect:effect:observe:${candidate.id}:${digest("applied")}`,
      "commit:observe_effect",
    ]);
    expect(observe).not.toHaveBeenCalled();
  });

  it("leaves a durable pending intent when dispatch terminates ambiguously", async () => {
    const events: string[] = [];
    const candidate = effect();
    const dispatch = vi.fn().mockRejectedValue(new Error("connection closed after request"));
    const port: KernelEffectPort = {
      dispatch,
      observe: vi.fn(),
    };

    await expect(
      coordinateKernelEffect({
        runtime: runtime(events),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_dispatch_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).rejects.toThrow("connection closed after request");

    expect(events).toEqual([
      `input:begin_effect:effect:begin:${candidate.id}:${candidate.idempotency_key}`,
      "commit:begin_effect",
    ]);
  });

  it("persists an in-doubt dispatch result and returns the reconciliation boundary", async () => {
    const events: string[] = [];
    const candidate = effect();
    const port: KernelEffectPort = {
      dispatch: vi.fn().mockResolvedValue({
        state: "IN_DOUBT",
        digest: digest("unknown-provider-outcome"),
      }),
      observe: vi.fn(),
    };

    await expect(
      coordinateKernelEffect({
        runtime: runtime(events),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_dispatch_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).resolves.toMatchObject({
      kind: "stop",
      action: { reason: "canonical_effect_reconciliation_required" },
    });
    expect(events).toEqual([
      `input:begin_effect:effect:begin:${candidate.id}:${candidate.idempotency_key}`,
      "commit:begin_effect",
      `input:observe_effect:effect:observe:${candidate.id}:${digest("unknown-provider-outcome")}`,
      "commit:observe_effect",
    ]);
  });
});

describe("canonical semantic episode recovery", () => {
  it("persists a replayable WorkItem block before crossing a semantic stop", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-stop-"));
    const input = {
      command: {
        kind: "transition_work_item",
        task_id: "task-1",
        work_item_id: "build",
        action: "block",
        claim_id: "claim-1",
      },
    } as never;
    const apply = vi.fn().mockResolvedValue({
      kind: "committed",
      record: {},
      events: [],
      receipts: [],
      replayed: false,
    });
    const runtime = {
      input: vi.fn().mockResolvedValue(input),
      lifecycle: { apply },
    } as never;

    const request = {
      runtime,
      directory,
      work_order_id: "sha256:work-order",
      work_item_id: "build",
      claim_id: "claim-1",
    };
    await blockKernelSemanticEpisode(request);
    await blockKernelSemanticEpisode(request);

    expect(runtime.input).toHaveBeenCalledTimes(1);
    expect(apply).toHaveBeenNthCalledWith(1, input);
    expect(apply).toHaveBeenNthCalledWith(2, input);
    expect(
      JSON.parse(await readFile(path.join(directory, "semantic-stop-command.json"), "utf8")),
    ).toEqual(input);
  });

  it("re-projects one stable WorkOrder for an already executing WorkItem", () => {
    const contractDigest = digest("contract");
    const repositoryFingerprint = digest("repository");
    const authority = { digest: digest("authority"), work_item_id: "build" } as never;
    const record = {
      aggregate: {
        id: "task-1",
        current_plan: { revision: 2, digest: digest("plan") },
        work_items: {
          dependency: {
            state: "COMPLETED",
            output_manifests: [{ id: "input", digest: digest("input") }],
          },
          build: {
            state: "EXECUTING",
            attempt: 3,
            claim_id: "claim-3",
            definition: {
              contract_digest: contractDigest,
              required_inputs: ["input"],
              expected_outputs: ["built"],
            },
          },
        },
      },
      documents: {
        contracts: {
          [String(contractDigest)]: {
            objective: "Build",
            acceptance_criteria: ["Built"],
            verification_commands: ["bun test"],
            role: "EXECUTOR",
          },
        },
      },
    } as never;

    const resumed = resumeKernelWorkOrder({
      record,
      work_item_id: "build",
      authority,
      repository_fingerprint: repositoryFingerprint,
    });

    expect(resumed).toMatchObject({
      binding: {
        task_id: "task-1",
        work_item_id: "build",
        attempt: 3,
        claim_id: "claim-3",
        repository_fingerprint: repositoryFingerprint,
      },
      inputs: [{ id: "input" }],
      expected_outputs: ["built"],
      authority,
    });
    expect(
      resumeKernelWorkOrder({
        record,
        work_item_id: "missing",
        authority,
        repository_fingerprint: repositoryFingerprint,
      }),
    ).toBeNull();
  });
});
