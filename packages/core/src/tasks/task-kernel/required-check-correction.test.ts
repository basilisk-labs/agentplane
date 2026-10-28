import { describe, expect, it } from "vitest";
import { kernelDigest, reduceTaskCommand } from "./kernel.js";
import { authorityDigest, planScopeExpansionApprovalDigest } from "./authority-lineage.js";
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
  it("corrects one unsupported required check after the first attempt with USER-bound native evidence", () => {
    const oldCheck = "A prose description of the focused tests";
    const newCheck = "bunx vitest run packages/core/src/tasks/task-kernel/kernel.test.ts";
    const focusedCheck =
      "bunx vitest run packages/core/src/tasks/task-kernel/required-check-correction.test.ts";
    const oldContract = {
      objective: "Verify the implementation",
      acceptance_criteria: ["The result is validated"],
      verification_commands: [focusedCheck, "bun run typecheck", oldCheck],
      role: "EXECUTOR" as const,
    };
    const newContract = {
      ...oldContract,
      verification_commands: [focusedCheck, "bun run typecheck", newCheck],
    };
    const oldDefinition = { ...plan.work_items[0]!, contract_digest: kernelDigest(oldContract) };
    const newDefinition = { ...oldDefinition, contract_digest: kernelDigest(newContract) };
    const current = {
      ...plan,
      work_items: [oldDefinition],
      digest: kernelDigest({ revision: plan.revision, work_items: [oldDefinition] }),
      approval_actor_id: "agentplane:kernel-controller",
      approval_evidence_digest: kernelDigest("delegation"),
    };
    const workOrderId = kernelDigest("failed-work-order");
    // Retained native shape: two checks completed, then the third declared check was unsupported.
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
        status: "unsupported",
        reason: `Unsupported declared check: ${oldCheck}`,
        checks: [
          { command: focusedCheck, exit_code: 0, runtime: { status: "resolved" } },
          { command: "bun run typecheck", exit_code: 0, runtime: { status: "resolved" } },
        ],
      },
    };
    const priorCommand: TaskCommand = {
      kind: "record_work_item_validation",
      task_id: "task-1",
      expected_task_revision: 9,
      expected_state_fingerprint: fingerprint,
      work_item_id: "kernel",
      validation: {
        ...validation(resultDigest),
        status: "BLOCKED",
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
      expected_task_revision: 7,
      expected_state_fingerprint: fingerprint,
      plan_revision: current.revision,
      plan_digest: current.digest,
      work_item_id: "kernel",
      result_digest: resultDigest,
      output_manifests: [],
    };
    const issuedFingerprint = kernelDigest("repository-before-implementation");
    const approvedParentContents = {
      ...authority,
      task_id: "task-1",
      plan_revision: current.revision,
      plan_digest: current.digest,
      work_item_id: null,
      repository_fingerprint: issuedFingerprint,
      provenance: {
        kind: "SYSTEM" as const,
        actor_id: "agentplane:kernel-controller",
        evidence_digest: kernelDigest("delegation"),
        parent_authority_digest: null,
      },
    };
    const approvedParent = {
      ...approvedParentContents,
      digest: authorityDigest(approvedParentContents),
    };
    const continuedParentContents = {
      ...approvedParent,
      repository_fingerprint: fingerprint,
      provenance: {
        ...approvedParent.provenance,
        parent_authority_digest: approvedParent.digest,
      },
    };
    const continuedParent = {
      ...continuedParentContents,
      digest: authorityDigest(continuedParentContents),
    };
    const approvalRecord = {
      authority: approvedParent,
      approval_mode: "repository_policy" as const,
      observation: null,
    };
    const continuationRecord = {
      authority: continuedParent,
      approval_mode: null,
      observation: {
        kind: "repository_implementation" as const,
        previous_fingerprint: issuedFingerprint,
        changed_paths: ["packages/core/src/tasks/task-kernel/kernel.ts"],
        evidence_digest: kernelDigest("repository-observation"),
      },
    };
    const delegate = (parent: typeof approvedParent) => {
      const contents = {
        ...parent,
        ...oldDefinition.execution_requirements,
        work_item_id: "kernel",
        provenance: {
          ...parent.provenance,
          kind: "DELEGATED" as const,
          actor_id: "agentplane:kernel-controller",
          parent_authority_digest: parent.digest,
        },
      };
      return { ...contents, digest: authorityDigest(contents) };
    };
    const issuedAuthority = delegate(approvedParent).digest;
    const acceptedResultAuthority = delegate(continuedParent);
    const acceptedResult = {
      mutation_id: `result:${workOrderId}`,
      repository_fingerprint: fingerprint,
      authority: acceptedResultAuthority,
      command: acceptedResultCommand,
    };
    const workBinding = {
      task_id: "task-1",
      repository_fingerprint: issuedFingerprint,
      plan_revision: current.revision,
      plan_digest: current.digest,
      work_item_id: "kernel",
      attempt: 1,
      claim_id: "claim-1",
      contract_digest: oldDefinition.contract_digest,
    };
    const failedWorkOrder = {
      work_order_id: workOrderId,
      task: { id: "task-1", revision: acceptedResultCommand.expected_task_revision - 1 },
      state_fingerprint: {
        components: {
          authority: {
            digest: kernelDigest({
              state: "present",
              source: "canonical_authority",
              value: { issued: issuedAuthority, lineage: approvedParent.digest },
            }),
          },
        },
      },
      canonical_binding: {
        ...workBinding,
        phase: "implementation",
        repository_identity: kernelDigest("repository"),
        authority_digest: issuedAuthority,
      },
    };
    const resultReceipt = {
      mutation_id: acceptedResult.mutation_id,
      command_digest: kernelDigest({
        ...acceptedResultCommand,
        binding_digest: kernelDigest(workBinding),
      }),
      before_revision: 7,
      after_revision: 8,
      aggregate_digest: kernelDigest("after-result"),
      event_digests: [],
      effect_ids: [],
    };
    const receipt = {
      mutation_id: `validation:${workOrderId}`,
      command_digest: kernelDigest(priorCommand),
      before_revision: 9,
      after_revision: 10,
      aggregate_digest: kernelDigest("after-failure"),
      event_digests: [],
      effect_ids: [],
    };
    const approvalReceipt = {
      mutation_id: "approve-plan",
      command_digest: kernelDigest({
        kind: "approve_plan",
        task_id: "task-1",
        expected_task_revision: 2,
        expected_state_fingerprint: issuedFingerprint,
        plan_revision: current.revision,
        plan_digest: current.digest,
        approval_evidence_digest: approvedParent.provenance.evidence_digest,
        authority_mode: "repository_policy",
      }),
      before_revision: 2,
      after_revision: 3,
      aggregate_digest: kernelDigest("after-approval"),
      event_digests: [kernelDigest("approval-event")],
      effect_ids: [],
    };
    const continuationReceipt = {
      mutation_id: "repository-continuation",
      command_digest: kernelDigest({
        kind: "continue_authority",
        task_id: "task-1",
        expected_task_revision: 6,
        expected_state_fingerprint: fingerprint,
        record: continuationRecord,
      }),
      before_revision: 6,
      after_revision: 7,
      aggregate_digest: kernelDigest("after-continuation"),
      event_digests: [kernelDigest("continuation-event")],
      effect_ids: [],
    };
    const state = aggregate({
      revision: 11,
      current_plan: current,
      authority_lineage: [approvalRecord, continuationRecord],
      work_items: {
        kernel: {
          ...runtime("REWORK_READY"),
          definition: oldDefinition,
          attempt: 1,
          claim_id: "claim-1",
          result_digest: resultDigest,
          validation: priorCommand.validation,
        },
      },
      mutation_receipts: {
        [approvalReceipt.mutation_id]: approvalReceipt,
        [continuationReceipt.mutation_id]: continuationReceipt,
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
    const serializedCommand = JSON.parse(
      Buffer.from(JSON.stringify(command)).toString("utf8"),
    ) as TaskCommand;
    const invocation = {
      ...input(state, serializedCommand),
      actor: { id: "USER", kind: "USER" as const, transport: "manual" as const, capabilities: [] },
      authority: continuedParent,
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
    for (const mutated of [
      { ...continuationReceipt, command_digest: kernelDigest("forged-continuation") },
      { ...continuationReceipt, before_revision: 5, after_revision: 6 },
      { ...continuationReceipt, before_revision: 7, after_revision: 8 },
      { ...continuationReceipt, event_digests: [] },
    ]) {
      expectRejection(
        {
          ...invocation,
          aggregate: {
            ...state,
            mutation_receipts: {
              ...state.mutation_receipts,
              [continuationReceipt.mutation_id]: mutated,
            },
          },
        },
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
    }
    const { [continuationReceipt.mutation_id]: _removedContinuation, ...withoutContinuation } =
      state.mutation_receipts;
    expectRejection(
      { ...invocation, aggregate: { ...state, mutation_receipts: withoutContinuation } },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    expectRejection(
      {
        ...invocation,
        aggregate: {
          ...state,
          mutation_receipts: {
            ...state.mutation_receipts,
            "replayed-continuation": {
              ...continuationReceipt,
              mutation_id: "replayed-continuation",
            },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    for (const observation of [
      { ...continuationRecord.observation, previous_fingerprint: kernelDigest("other-head") },
      { ...continuationRecord.observation, changed_paths: ["outside-approved-scope"] },
    ]) {
      expectRejection(
        {
          ...invocation,
          aggregate: {
            ...state,
            authority_lineage: [approvalRecord, { ...continuationRecord, observation }],
          },
        },
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
    }
    for (const authorityAlias of [acceptedResultAuthority.digest, approvedParent.digest])
      expectRejection(
        {
          ...invocation,
          command: {
            ...command,
            required_check_correction: {
              ...command.required_check_correction!,
              failed_work_order: {
                ...failedWorkOrder,
                canonical_binding: {
                  ...failedWorkOrder.canonical_binding,
                  authority_digest: authorityAlias,
                },
                state_fingerprint: {
                  components: {
                    authority: {
                      digest: kernelDigest({
                        state: "present",
                        source: "canonical_authority",
                        value: { issued: authorityAlias, lineage: approvedParent.digest },
                      }),
                    },
                  },
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
        aggregate: {
          ...state,
          work_items: {
            kernel: { ...state.work_items.kernel!, state: "EXECUTING" },
          },
        },
      },
      "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
    );
    for (const changedRuntime of [
      { attempt: 2 },
      { claim_id: "other-claim" },
      { result_digest: kernelDigest("other-result") },
      { validation: { ...priorCommand.validation, status: "FAILED" as const } },
    ]) {
      expectRejection(
        {
          ...invocation,
          aggregate: {
            ...state,
            work_items: {
              kernel: { ...state.work_items.kernel!, ...changedRuntime },
            },
          },
        },
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
    }
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
    for (const checks of [
      { ...native.checks, reason: `Unsupported declared check: ${newCheck}` },
      { ...native.checks, checks: [] },
      {
        ...native.checks,
        checks: [{ ...native.checks.checks[0]!, exit_code: 1 }],
      },
      {
        ...native.checks,
        checks: [...native.checks.checks, { command: oldCheck, exit_code: 0 }],
      },
    ]) {
      expectRejection(
        {
          ...invocation,
          command: {
            ...command,
            required_check_correction: {
              ...command.required_check_correction!,
              native_validation: { ...native, checks },
            },
          },
        },
        "PLAN_SCOPE_EXPANSION_REQUIRES_USER",
      );
    }
    for (const canonical_binding of [
      { ...failedWorkOrder.canonical_binding, plan_digest: kernelDigest("other-plan") },
      { ...failedWorkOrder.canonical_binding, work_item_id: "other-item" },
      { ...failedWorkOrder.canonical_binding, claim_id: "other-claim" },
      { ...failedWorkOrder.canonical_binding, repository_identity: kernelDigest("other-repo") },
      { ...failedWorkOrder.canonical_binding, repository_fingerprint: kernelDigest("other-head") },
      { ...failedWorkOrder.canonical_binding, authority_digest: kernelDigest("other-authority") },
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
    const forgedAuthorityContents = {
      ...acceptedResultAuthority,
      provenance: {
        ...acceptedResultAuthority.provenance,
        parent_authority_digest: kernelDigest("other-parent"),
      },
    };
    expectRejection(
      {
        ...invocation,
        command: {
          ...command,
          required_check_correction: {
            ...command.required_check_correction!,
            accepted_result_command_input: {
              ...acceptedResult,
              authority: {
                ...forgedAuthorityContents,
                digest: authorityDigest(forgedAuthorityContents),
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
