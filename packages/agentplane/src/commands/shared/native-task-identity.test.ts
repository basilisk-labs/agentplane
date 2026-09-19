import { describe, expect, it } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import {
  makeKernelRecord,
  TASK_KERNEL_EXTENSION,
} from "../../adapters/task-backend/kernel-record.js";
import { resolveNativeTaskIdentity } from "./native-task-identity.js";

const digest = (value: string) => k.kernelDigest(value);

function kernelTask(planState: k.PlanRecord["state"]) {
  const plan: k.PlanRecord = {
    revision: 3,
    digest: digest("plan"),
    state: planState,
    approval_actor_id: "USER",
    approval_evidence_digest: digest("approval"),
    work_items: [],
  };
  const aggregate: k.TaskAggregate = {
    schema_version: 1,
    id: "T-1",
    revision: 4,
    state: "FINAL_VALIDATION",
    intent_digest: digest("intent"),
    current_plan: plan,
    plan_history: [],
    work_items: {},
    final_validation: null,
    effects: [],
    mutation_receipts: {},
    controller_transfer: null,
    migration_receipts: [],
  };
  const repositoryIdentity = digest("repository");
  const contractDigest = digest("verification-contract");
  const task = {
    id: "T-1",
    extensions: {
      [TASK_KERNEL_EXTENSION]: makeKernelRecord(repositoryIdentity, aggregate, []),
    },
    execution_route: { repository_mode: "branch_pr" },
    execution_contract: {
      selected_mode: "branch_pr",
      repository_mode: "branch_pr",
      reason_codes: [],
      safety: {},
      authority: {},
      verification: {
        contract: {
          digest: contractDigest,
          selected_checks: ["unit", "hosted_integration"],
          policy_floor: {},
        },
      },
    },
  } as never;
  return { contractDigest, plan, task };
}

describe("native task identity", () => {
  it("derives an identity from a validated approved Task Kernel plan", () => {
    const { contractDigest, plan, task } = kernelTask("APPROVED");

    expect(resolveNativeTaskIdentity(task)).toMatchObject({
      task_id: "T-1",
      plan: {
        revision: 3,
        digest: plan.digest,
        approval_state: "approved",
        approved_digest: plan.digest,
      },
      checks: {
        verification_contract_digest: contractDigest,
        required_check_ids: ["unit"],
      },
    });
  });

  it("rejects a validated Task Kernel plan that is not approved", () => {
    expect(resolveNativeTaskIdentity(kernelTask("PROPOSED").task)).toBeNull();
  });

  it("rejects a malformed Task Kernel record", () => {
    const repositoryIdentity = digest("repository");
    expect(
      resolveNativeTaskIdentity({
        id: "T-1",
        extensions: {
          [TASK_KERNEL_EXTENSION]: {
            repository_identity: repositoryIdentity,
            kind: "canonical_task",
          },
        },
      } as never),
    ).toBeNull();
  });
});
