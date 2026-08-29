import { describe, expect, expectTypeOf, it } from "vitest";

import * as taskExports from "../index.js";
import {
  EFFECT_STATES,
  KERNEL_REJECTION_CODES,
  TASK_STATES,
  WORK_ITEM_STATES,
  type KernelInput,
  type KernelResult,
  type TaskCommand,
} from "./index.js";

const digest = (value: string) => `sha256:${value.padEnd(64, "0")}` as const;

describe("canonical Task kernel domain contract", () => {
  it("exposes the kernel through its own compatibility-safe namespace", () => {
    expect(taskExports.taskKernel.TASK_STATES).toBe(TASK_STATES);
    expect(taskExports.taskKernel.KERNEL_REJECTION_CODES).toBe(KERNEL_REJECTION_CODES);
  });

  it("publishes closed lifecycle and rejection vocabularies", () => {
    expect(TASK_STATES).toEqual([
      "CAPTURED",
      "PLANNING",
      "AWAITING_PLAN_APPROVAL",
      "ACTIVE",
      "FINAL_VALIDATION",
      "COMPLETED",
      "HUMAN_REQUIRED",
      "BLOCKED",
      "EFFECT_IN_DOUBT",
      "CANCELLED",
    ]);
    expect(WORK_ITEM_STATES).toContain("RESULT_RECEIVED");
    expect(EFFECT_STATES).toEqual([
      "PREPARED",
      "PENDING",
      "APPLIED",
      "NOT_APPLIED",
      "IN_DOUBT",
      "RECONCILED",
      "SUPERSEDED",
    ]);
    expect(new Set(KERNEL_REJECTION_CODES).size).toBe(KERNEL_REJECTION_CODES.length);
    expect(KERNEL_REJECTION_CODES).toContain("PROJECTION_CANNOT_AUTHORIZE");
    expect(KERNEL_REJECTION_CODES).toContain("MUTATION_ID_CONFLICT");
  });

  it("requires adapter-supplied identity, time, actor, authority, and repository state", () => {
    const command = {
      kind: "complete_task",
      task_id: "task-1",
      expected_task_revision: 3,
      expected_state_fingerprint: digest("state"),
    } satisfies TaskCommand;
    const input = {
      aggregate: {
        schema_version: 1,
        id: "task-1",
        revision: 3,
        state: "FINAL_VALIDATION",
        intent_digest: digest("intent"),
        current_plan: null,
        plan_history: [],
        work_items: {},
        final_validation: null,
        effects: [],
        mutation_receipts: {},
        controller_transfer: null,
        migration_receipts: [],
      },
      command,
      actor: {
        id: "agent-1",
        kind: "AGENT",
        transport: "managed",
        capabilities: ["task.lifecycle"],
      },
      authority: null,
      repository_fingerprint: digest("repository"),
      occurred_at: "2026-08-29T19:00:00.000Z",
      mutation_id: "mutation-1",
    } satisfies KernelInput;

    expect(input.command.kind).toBe("complete_task");
    expect(input.occurred_at).toBe("2026-08-29T19:00:00.000Z");
    expect(input.mutation_id).toBe("mutation-1");
    expectTypeOf(input).toMatchTypeOf<KernelInput>();
  });

  it("represents expected lifecycle conflicts as typed results", () => {
    const rejected = {
      kind: "rejected",
      code: "STALE_STATE_FINGERPRINT",
      facts: ["expected state-a", "observed state-b"],
      required_action: "request_fresh_packet",
    } satisfies KernelResult;

    expect(rejected).toEqual({
      kind: "rejected",
      code: "STALE_STATE_FINGERPRINT",
      facts: ["expected state-a", "observed state-b"],
      required_action: "request_fresh_packet",
    });
    expectTypeOf(rejected).toMatchTypeOf<KernelResult>();
  });
});
