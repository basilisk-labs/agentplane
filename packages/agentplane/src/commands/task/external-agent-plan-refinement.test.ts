import { describe, expect, it } from "vitest";

import type { ExternalAgentResultEnvelope } from "./external-agent-exchange.js";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  canonicalVerifySteps,
  isPureCanonicalClarification,
} from "./external-agent-plan-refinement.js";

const clarification = {
  description: "Project the approved checks into Verify Steps.",
  scope_roots_added: [],
  outputs_added: [],
  acceptance_changed: false,
  risk_changed: false,
  external_effects_added: [],
  dependencies_changed: false,
  architecture_constraints_changed: false,
  operations: ["clarify"],
} as NonNullable<ExternalAgentResultEnvelope["result"]["plan_refinement"]>;

describe("canonical external plan refinement", () => {
  it("projects verification commands from immutable approved Kernel contracts", () => {
    const digest = `sha256:${"a".repeat(64)}` as const;
    const record = {
      aggregate: {
        current_plan: {
          work_items: [{ id: "implementation", contract_digest: digest }],
        },
      },
      documents: {
        contracts: Object.fromEntries([
          [
            digest,
            {
              objective: "the canonical lifecycle fix",
              verification_commands: ["bun run test:focused", "bun run typecheck"],
            },
          ],
        ]),
      },
    } as unknown as KernelRecord;

    expect(canonicalVerifySteps(record)).toBe(
      "1. Run `bun run test:focused`. Expected: The command passes for the canonical lifecycle fix\n" +
        "2. Run `bun run typecheck`. Expected: The command passes for the canonical lifecycle fix",
    );
  });

  it("accepts only a non-material clarification for a completed canonical task", () => {
    expect(isPureCanonicalClarification(clarification)).toBe(true);
    expect(isPureCanonicalClarification({ ...clarification, dependencies_changed: true })).toBe(
      false,
    );
    expect(isPureCanonicalClarification({ ...clarification, operations: ["split"] })).toBe(false);
  });
});
