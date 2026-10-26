import { describe, expect, it } from "vitest";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import { planScopeExpansionApprovalDigest } from "./authority-lineage.js";
import type { TaskCommand } from "./model.js";
import {
  fingerprint,
  resultDigest,
  requirements,
  plan,
  authority,
  runtime,
  aggregate,
  input,
  validation,
  amendmentCommand,
} from "./kernel.test-fixtures.js";

function expectRejection(invocation: Parameters<typeof reduceTaskCommand>[0], code: string): void {
  expect(reduceTaskCommand(invocation)).toMatchObject({ kind: "rejected", code });
}

describe("required check correction", () => {
  it("corrects one unavailable required check with USER-bound failed evidence and reruns the WorkItem", () => {
    const oldCheck = "A prose description of the focused tests";
    const newCheck = "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts";
    const oldContract = {
      objective: "Verify the implementation",
      acceptance_criteria: ["The result is validated"],
      verification_commands: ["bun run typecheck", oldCheck],
      role: "EXECUTOR" as const,
    };
    const newContract = { ...oldContract, verification_commands: ["bun run typecheck", newCheck] };
    const oldDefinition = { ...plan.work_items[0]!, contract_digest: kernelDigest(oldContract) };
    const newDefinition = { ...oldDefinition, contract_digest: kernelDigest(newContract) };
    const current = {
      ...plan,
      work_items: [oldDefinition],
      digest: kernelDigest({ revision: plan.revision, work_items: [oldDefinition] }),
    };
    const workOrderId = kernelDigest("failed-work-order");
    const native = {
      kind: "kernel_native_validation",
      input: {
        task_id: "task-1",
        work_item_id: "kernel",
        result_digest: resultDigest,
        repository_fingerprint: fingerprint,
        verification: { commands: oldContract.verification_commands },
      },
      checks: {
        status: "failed",
        reason: `Declared check could not run: ${oldCheck}`,
        checks: [
          { command: "bun run typecheck", exit_code: 0, runtime: { status: "resolved" } },
          {
            command: oldCheck,
            exit_code: null,
            stderr_tail: "process command is not in the allowed executable set: A",
            runtime: { status: "unavailable", executable_digest: null },
          },
        ],
      },
    };
    const priorCommand: TaskCommand = {
      kind: "record_work_item_validation",
      task_id: "task-1",
      expected_task_revision: 6,
      expected_state_fingerprint: fingerprint,
      work_item_id: "kernel",
      validation: {
        ...validation(resultDigest),
        status: "FAILED",
        identity: {
          ...validation(resultDigest).identity,
          command_digest: kernelDigest(oldContract.verification_commands),
        },
        evidence_digests: [kernelDigest(native)],
      },
    };
    const prior = {
      mutation_id: `validation:${workOrderId}`,
      repository_fingerprint: fingerprint,
      command: priorCommand,
    };
    const acceptedResultCommand: TaskCommand = {
      kind: "accept_work_item_result",
      task_id: "task-1",
      expected_task_revision: 4,
      expected_state_fingerprint: fingerprint,
      plan_revision: current.revision,
      plan_digest: current.digest,
      work_item_id: "kernel",
      result_digest: resultDigest,
      output_manifests: [],
    };
    const acceptedResult = {
      mutation_id: `result:${workOrderId}`,
      repository_fingerprint: fingerprint,
      authority: {
        repository_identity: kernelDigest("repository"),
        digest: kernelDigest("authority"),
      },
      command: acceptedResultCommand,
    };
    const workBinding = {
      task_id: "task-1",
      repository_fingerprint: fingerprint,
      plan_revision: current.revision,
      plan_digest: current.digest,
      work_item_id: "kernel",
      attempt: 1,
      claim_id: "claim-1",
      contract_digest: oldDefinition.contract_digest,
    };
    const failedWorkOrder = {
      work_order_id: workOrderId,
      task: { id: "task-1", revision: acceptedResultCommand.expected_task_revision },
      canonical_binding: {
        ...workBinding,
        phase: "implementation",
        repository_identity: kernelDigest("repository"),
        authority_digest: kernelDigest("authority"),
      },
    };
    const resultReceipt = {
      mutation_id: acceptedResult.mutation_id,
      command_digest: kernelDigest({
        ...acceptedResultCommand,
        binding_digest: kernelDigest(workBinding),
      }),
      before_revision: 4,
      after_revision: 5,
      aggregate_digest: kernelDigest("after-result"),
      event_digests: [],
      effect_ids: [],
    };
    const receipt = {
      mutation_id: `validation:${workOrderId}`,
      command_digest: kernelDigest(priorCommand),
      before_revision: 6,
      after_revision: 7,
      aggregate_digest: kernelDigest("after-failure"),
      event_digests: [],
      effect_ids: [],
    };
    const state = aggregate({
      current_plan: current,
      work_items: { kernel: { ...runtime("BLOCKED"), definition: oldDefinition, attempt: 2 } },
      mutation_receipts: {
        [resultReceipt.mutation_id]: resultReceipt,
        [receipt.mutation_id]: receipt,
      },
    });
    const base = amendmentCommand(state, [newDefinition]);
    const approvalDigest = planScopeExpansionApprovalDigest({
      task_id: state.id,
      current_plan_digest: current.digest,
      amended_plan_digest: base.amended_plan.digest,
      actor_id: "USER",
    });
    const command: TaskCommand = {
      ...base,
      authority_delta_digest: approvalDigest,
      work_contracts: {
        [kernelDigest(oldContract)]: oldContract,
        [kernelDigest(newContract)]: newContract,
      },
      required_check_correction: {
        work_item_id: "kernel",
        failed_work_order_id: workOrderId,
        previous_command: oldCheck,
        replacement_command: newCheck,
        failed_work_order: failedWorkOrder,
        accepted_result_command_input: acceptedResult,
        validation_command_input: prior,
        native_validation: native,
      },
    };
    const invocation = {
      ...input(state, command),
      actor: { id: "USER", kind: "USER" as const, transport: "manual" as const, capabilities: [] },
      authority: { ...authority, plan_digest: current.digest },
    };
    const accepted = reduceTaskCommand(invocation);
    if (accepted.kind === "rejected") throw new Error(JSON.stringify(accepted));
    expect(accepted).toMatchObject({
      kind: "accepted",
      aggregate: {
        current_plan: { approval_evidence_digest: approvalDigest },
        work_items: { kernel: { state: "READY", result_digest: null, validation: null } },
        mutation_receipts: {
          [resultReceipt.mutation_id]: resultReceipt,
          [receipt.mutation_id]: receipt,
        },
      },
    });
    expectRejection(
      {
        ...invocation,
        aggregate: {
          ...state,
          work_items: {
            kernel: { ...state.work_items.kernel!, state: "EXECUTING" },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      { ...invocation, actor: { ...invocation.actor, id: "other" } },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      { ...invocation, actor: { ...invocation.actor, kind: "AGENT" } },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        command: {
          ...command,
          required_check_correction: {
            ...command.required_check_correction!,
            failed_work_order_id: kernelDigest("other"),
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    for (const canonical_binding of [
      { ...failedWorkOrder.canonical_binding, plan_digest: kernelDigest("other-plan") },
      { ...failedWorkOrder.canonical_binding, work_item_id: "other-item" },
      { ...failedWorkOrder.canonical_binding, claim_id: "other-claim" },
      { ...failedWorkOrder.canonical_binding, repository_identity: kernelDigest("other-repo") },
    ]) {
      expectRejection(
        {
          ...invocation,
          command: {
            ...command,
            required_check_correction: {
              ...command.required_check_correction!,
              failed_work_order: { ...failedWorkOrder, canonical_binding },
            },
          },
        },
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
    }
    expectRejection(
      {
        ...invocation,
        command: {
          ...command,
          required_check_correction: {
            ...command.required_check_correction!,
            failed_work_order: { ...failedWorkOrder, work_order_id: kernelDigest("other-order") },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    for (const authority of [
      { ...acceptedResult.authority, repository_identity: kernelDigest("other-repo") },
      { ...acceptedResult.authority, digest: kernelDigest("other-authority") },
    ]) {
      expectRejection(
        {
          ...invocation,
          command: {
            ...command,
            required_check_correction: {
              ...command.required_check_correction!,
              accepted_result_command_input: { ...acceptedResult, authority },
            },
          },
        },
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
    }
    expectRejection(
      {
        ...invocation,
        aggregate: {
          ...state,
          mutation_receipts: {
            ...state.mutation_receipts,
            [resultReceipt.mutation_id]: {
              ...resultReceipt,
              command_digest: kernelDigest("other-result-command"),
            },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      { ...invocation, aggregate: { ...state, mutation_receipts: {} } },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        command: {
          ...command,
          required_check_correction: {
            ...command.required_check_correction!,
            accepted_result_command_input: {
              ...acceptedResult,
              command: { ...acceptedResultCommand, plan_digest: kernelDigest("older-plan") },
            },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        aggregate: {
          ...state,
          mutation_receipts: { [receipt.mutation_id]: receipt, "result:unrelated": resultReceipt },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        aggregate: {
          ...state,
          mutation_receipts: { "validation:unrelated": receipt },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        command: {
          ...command,
          required_check_correction: {
            ...command.required_check_correction!,
            native_validation: {
              ...native,
              checks: {
                ...native.checks,
                checks: [{ ...native.checks.checks[0]!, exit_code: 1 }, native.checks.checks[1]!],
              },
            },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        command: {
          ...command,
          required_check_correction: {
            ...command.required_check_correction!,
            native_validation: {
              ...native,
              checks: {
                ...native.checks,
                checks: [native.checks.checks[0]!, { ...native.checks.checks[1]!, exit_code: 1 }],
              },
            },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    const widened = {
      ...newDefinition,
      execution_requirements: { ...requirements, scope_roots: ["outside"] },
    };
    expectRejection(
      { ...invocation, command: amendmentCommand(state, [widened]) },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    const extraContract = {
      ...newContract,
      verification_commands: ["bun run typecheck", newCheck, "bun test"],
    };
    const extraDefinition = { ...newDefinition, contract_digest: kernelDigest(extraContract) };
    const extraCommand = amendmentCommand(state, [extraDefinition]);
    expectRejection(
      {
        ...invocation,
        command: {
          ...extraCommand,
          authority_delta_digest: planScopeExpansionApprovalDigest({
            task_id: state.id,
            current_plan_digest: current.digest,
            amended_plan_digest: extraCommand.amended_plan.digest,
            actor_id: "USER",
          }),
          work_contracts: {
            ...command.work_contracts,
            [kernelDigest(extraContract)]: extraContract,
          },
          required_check_correction: command.required_check_correction,
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        aggregate: { ...state, current_plan: { ...current, digest: kernelDigest("stale") } },
      },
      "AUTHORITY_SCOPE_EXCEEDED",
    );
  });
});
