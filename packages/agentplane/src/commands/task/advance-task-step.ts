import {
  restoreKernelFinalValidation,
  runKernelFinalValidation,
} from "./kernel-final-validation.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";
import { issueKernelInspection, resumeKernelInspection } from "./kernel-inspection.js";
import path from "node:path";
import { repositoryEffectsForPath, taskKernel as k } from "@agentplaneorg/core/tasks";
import { kernelApprovalReference } from "../../runner/usecases/kernel-authority.js";
import type { CommandContext } from "../shared/task-backend.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { buildKernelAgentWorkOrder, resumeKernelWorkOrder } from "./kernel-work-order.js";
import { issueKernelExchange } from "./kernel-exchange.js";
import {
  applyKernelEffectStep,
  emptyKernelEffectPortResolver,
  type KernelEffectPortResolver,
} from "./kernel-effect-coordinator.js";
import { commitCanonicalTerminalTaskArtifacts } from "./kernel-repository-coordinator.js";
import {
  decideCanonicalWorkflowEffect,
  executeCanonicalCompletedAgentEpisode,
  executeCanonicalLocalWorkflowOperation,
  prepareCanonicalWorkflowEffect,
} from "./kernel-provider-effect-coordinator.js";
import { ensureKernelOperationalProjectionEvidence } from "./kernel-operational-projection.js";
import { transferCanonicalControllerToBase } from "./kernel-controller-handoff.js";
import { acceptKernelSemanticResult } from "./kernel-semantic-result.js";
import { ensureCanonicalTaskWorktree } from "./kernel-worktree-routing.js";
import { canonicalCompletionPrecedesWorkflow } from "./ordinary-advance-step.js";
import { repositoryPolicyApprovalEligible } from "./kernel-plan-authority.js";

export { blockKernelSemanticEpisode } from "./kernel-semantic-result.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

export { canonicalCompletionPrecedesWorkflow } from "./ordinary-advance-step.js";

export function kernelPlanApprovalOperatorAction(
  command: CommandContext,
  taskId: string,
  context: Awaited<ReturnType<Runtime["native"]["readContext"]>>,
  plan: k.PlanRecord,
) {
  const authorityReference = kernelApprovalReference(context, plan);
  if (command.config.authority.approval_receipts.trusted_issuers.length === 0) {
    return {
      kind: "approve_plan" as const,
      required_role: "USER" as const,
      cwd: command.resolvedProject.gitRoot,
      argv: ["agentplane", "task", "plan", "approve", taskId, "--by", "USER"],
      authority_reference: authorityReference,
      transport: "manual_operator" as const,
    };
  }
  return {
    kind: "approve_plan" as const,
    required_role: "USER" as const,
    cwd: command.resolvedProject.gitRoot,
    argv: [
      "agentplane",
      "task",
      "plan",
      "approve",
      taskId,
      "--approval-receipt",
      "<base64url-receipt>",
    ],
    authority_reference: authorityReference,
    transport: "signed_user_receipt" as const,
    approval_receipt: {
      schema_version: 1 as const,
      format: "base64url-json+ed25519" as const,
      request: {
        approval_type: "plan_approval" as const,
        task_id: taskId,
        authority_reference: authorityReference,
        state_fingerprint: context.repository_fingerprint,
        operation_id: null,
        operation_digest: null,
        state_scope_digest: null,
      },
    },
  };
}

async function authorityDeltaStop(runtime: Runtime, taskId: string) {
  const prepared = await runtime.authority.prepareDelta(taskId, repositoryEffectsForPath);
  return {
    kind: "human_required" as const,
    reason: "canonical_authority_delta_requires_user",
    summary: "Repository changes exceed the approved canonical scope.",
    authority_delta: prepared,
    operator_action: {
      kind: "extend_scope" as const,
      argv: [
        "agentplane",
        "task",
        "scope",
        "extend",
        taskId,
        ...prepared.request.added_scope_roots.flatMap((root) => ["--scope-root", root]),
        ...prepared.request.added_repository_effects.flatMap((effect) => [
          "--repository-effect",
          effect,
        ]),
        "--request-digest",
        prepared.request_digest,
        "--state-scope-digest",
        prepared.request_digest,
        "--by",
        "USER",
      ],
    },
  };
}

async function advanceCanonicalRoute(opts: {
  command: CommandContext;
  task_id: string;
  result_path?: string;
  transport: "host" | "managed";
  effect_port_resolver?: KernelEffectPortResolver;
  allow_provider_effects?: boolean;
  replace_failed_operation?: boolean;
}) {
  const runtime = await createKernelRuntime({
    command: opts.command,
    task_id: opts.task_id,
    transport: opts.transport,
    operation_id: `continuation:${opts.task_id}`,
  });
  if (opts.result_path) {
    const stop = await acceptKernelSemanticResult(
      opts.command,
      opts.task_id,
      runtime,
      opts.result_path,
    );
    if (stop) return { schema_version: 1, task_id: opts.task_id, action: stop };
  }
  const visited = new Set<string>();
  let replaceFailedOperation = opts.replace_failed_operation;
  let finalValidation: {
    fingerprint: string;
    environment_digest: string;
    evidence_digest: k.Sha256Digest;
    plan_digest: string;
  } | null = null;
  for (let step = 0; step < 16; step++) {
    const context = await runtime.native.readContext(opts.task_id);
    const current = await runtime.lifecycle.read(opts.task_id, context.repository_fingerprint);
    if (current.read.kind !== "canonical")
      throw new Error(`Explicit canonical migration required: ${current.read.kind}`);
    const { record } = current.read;
    const plan = record.aggregate.current_plan;
    const route = current.next_action;
    const operationId = `${route.reason_code}:${record.digest}:${context.repository_fingerprint}`;
    finalValidation ??= await restoreKernelFinalValidation(
      opts.command,
      record,
      context.repository_fingerprint,
    );
    const persistedValidationEvidence =
      record.aggregate.final_validation?.status === "PASSED"
        ? record.aggregate.final_validation.evidence_digests.at(-1)
        : undefined;
    if (
      current.read.task.execution_route?.repository_mode === "branch_pr" &&
      !finalValidation &&
      persistedValidationEvidence &&
      ["kernel_final_validation_required", "kernel_task_completion_required"].includes(
        route.reason_code,
      )
    ) {
      await ensureKernelOperationalProjectionEvidence({
        command: opts.command,
        task_id: opts.task_id,
        verification_evidence_digest: persistedValidationEvidence,
      });
      const completion = await runtime.input({ kind: "complete_task" }, operationId);
      if (completion.command.expected_task_revision !== record.aggregate.revision)
        throw new Error("Canonical task changed before completion");
      requireKernelCommit(await runtime.lifecycle.apply(completion));
      continue;
    }
    if (
      route.reason_code === "kernel_task_completed" &&
      current.read.task.execution_route?.repository_mode !== "branch_pr"
    ) {
      await commitCanonicalTerminalTaskArtifacts(opts.command, opts.task_id);
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "terminal", reason: route.reason_code },
        canonical_revision: record.aggregate.revision,
      };
    }
    if (
      route.reason_code === "kernel_task_completed" &&
      current.read.task.execution_route?.repository_mode === "branch_pr"
    ) {
      await commitCanonicalTerminalTaskArtifacts(opts.command, opts.task_id);
      const localWorkflow = await decideCanonicalWorkflowEffect(opts.command, opts.task_id, false);
      const localTerminal =
        localWorkflow.workflowStep.kind === "terminal" &&
        ["done", "superseded"].includes(localWorkflow.workflowStep.outcome.type);
      if (localTerminal) {
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: { kind: "terminal", reason: route.reason_code },
          canonical_revision: record.aggregate.revision,
        };
      }
      if (
        await executeCanonicalCompletedAgentEpisode({
          command: opts.command,
          decision: localWorkflow,
          task_id: opts.task_id,
          replace_failed_operation: replaceFailedOperation,
        })
      ) {
        replaceFailedOperation = false;
        continue;
      }
      if (
        await executeCanonicalLocalWorkflowOperation({
          command: opts.command,
          decision: localWorkflow,
          task_id: opts.task_id,
        })
      ) {
        continue;
      }
      if (!opts.allow_provider_effects) {
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: { kind: "external_wait", reason: "canonical_provider_access_required" },
        };
      }
      const workflow = await decideCanonicalWorkflowEffect(opts.command, opts.task_id, true);
      const baseCheckout = workflow.workspace.baseCheckoutPath;
      if (
        canonicalCompletionPrecedesWorkflow(workflow.workflowStep) &&
        baseCheckout &&
        path.resolve(baseCheckout) !== path.resolve(opts.command.resolvedProject.gitRoot)
      ) {
        const target = await transferCanonicalControllerToBase({
          command: opts.command,
          runtime,
          task_id: opts.task_id,
          base_checkout: baseCheckout,
        });
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: {
            kind: "external_wait",
            reason: "canonical_controller_transferred",
            must_run_from: target.resolvedProject.gitRoot,
          },
        };
      }
      const terminal =
        workflow.workflowStep.kind === "terminal" &&
        ["done", "superseded"].includes(workflow.workflowStep.outcome.type);
      if (terminal) {
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: { kind: "terminal", reason: route.reason_code },
          canonical_revision: record.aggregate.revision,
        };
      }
      if (
        await executeCanonicalCompletedAgentEpisode({
          command: opts.command,
          decision: workflow,
          task_id: opts.task_id,
          replace_failed_operation: replaceFailedOperation,
        })
      ) {
        replaceFailedOperation = false;
        continue;
      }
      if (
        await executeCanonicalLocalWorkflowOperation({
          command: opts.command,
          decision: workflow,
          task_id: opts.task_id,
        })
      ) {
        continue;
      }
      const prepared = await prepareCanonicalWorkflowEffect({
        command: opts.command,
        runtime,
        record,
        decision: workflow,
      });
      if (prepared === "prepared") continue;
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: {
          kind: workflow.workflowStep.kind === "wait" ? "external_wait" : "human_required",
          reason:
            prepared === "already_observed"
              ? "canonical_workflow_effect_no_progress"
              : "canonical_workflow_effect_unavailable",
          workflow_step: workflow.workflowStep.id,
        },
      };
    }
    if (
      route.reason_code === "kernel_effect_dispatch_required" ||
      route.reason_code === "kernel_effect_observation_required" ||
      route.reason_code === "kernel_effect_reconciliation_required"
    ) {
      const coordinated = await applyKernelEffectStep({
        runtime,
        record,
        route,
        resolve_port: opts.effect_port_resolver ?? emptyKernelEffectPortResolver,
      });
      if (coordinated.kind === "stop") {
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: coordinated.action,
          canonical_revision: record.aggregate.revision,
        };
      }
      continue;
    }
    if (route.reason_code === "kernel_plan_required") {
      const order = await buildKernelAgentWorkOrder({ command: opts.command, record, context });
      return issueKernelExchange(opts.command, order, opts.transport);
    }
    if (route.reason_code === "kernel_plan_approval_required" && plan) {
      await runtime.checkpoint(await runtime.observe());
      if (
        repositoryPolicyApprovalEligible({
          config: opts.command.config,
          task: current.read.task,
          plan,
        })
      ) {
        const policyRuntime = await createKernelRuntime({
          command: opts.command,
          task_id: opts.task_id,
          transport: opts.transport,
          operation_id: `repository-policy:${plan.digest}`,
        });
        requireKernelCommit(await policyRuntime.authority.approveByRepositoryPolicy(opts.task_id));
        continue;
      }
      const operatorAction = kernelPlanApprovalOperatorAction(
        opts.command,
        opts.task_id,
        context,
        plan,
      );
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "approval_required", reason: route.reason_code },
        authority: {
          required: true,
          reference: kernelApprovalReference(context, plan),
          repository_fingerprint: context.repository_fingerprint,
        },
        operator_action: operatorAction,
      };
    }
    const parent = record.aggregate.authority_lineage?.at(-1)?.authority;
    if (
      plan?.state === "APPROVED" &&
      parent &&
      parent.repository_fingerprint !== context.repository_fingerprint
    ) {
      try {
        requireKernelCommit(await runtime.authority.continue(opts.task_id));
        continue;
      } catch (error) {
        if ((error as { reason_code?: string }).reason_code !== "repository_observation_scope")
          throw error;
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: await authorityDeltaStop(runtime, opts.task_id),
          canonical_revision: record.aggregate.revision,
        };
      }
    }
    if (visited.has(operationId))
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "human_required", reason: "canonical_transition_no_progress" },
      };
    visited.add(operationId);
    if (
      route.reason_code === "kernel_final_validation_required" ||
      route.reason_code === "kernel_task_completion_required"
    ) {
      if (
        route.reason_code === "kernel_task_completion_required" &&
        finalValidation?.fingerprint === context.repository_fingerprint &&
        finalValidation.environment_digest === k.kernelDigest(verificationChildEnv()) &&
        finalValidation.plan_digest === plan?.digest &&
        record.aggregate.final_validation?.evidence_digests.includes(
          finalValidation.evidence_digest,
        )
      ) {
        if (current.read.task.execution_route?.repository_mode === "branch_pr") {
          if (!opts.allow_provider_effects) {
            return {
              schema_version: 1,
              task_id: opts.task_id,
              action: {
                kind: "external_wait",
                reason: "canonical_provider_access_required",
              },
            };
          }
          await ensureKernelOperationalProjectionEvidence({
            command: opts.command,
            task_id: opts.task_id,
            verification_evidence_digest: finalValidation.evidence_digest,
          });
        }
        const completion = await runtime.input({ kind: "complete_task" }, operationId);
        if (completion.command.expected_task_revision !== record.aggregate.revision)
          throw new Error("Canonical task changed before completion");
        requireKernelCommit(await runtime.lifecycle.apply(completion));
        if (current.read.task.execution_route?.repository_mode === "branch_pr") {
          await commitCanonicalTerminalTaskArtifacts(opts.command, opts.task_id);
        }
      } else {
        const checked = await runKernelFinalValidation(opts.command, runtime, record);
        if (checked.stop) return { schema_version: 1, task_id: opts.task_id, action: checked.stop };
        finalValidation = {
          fingerprint: checked.fingerprint,
          environment_digest: checked.environment_digest,
          evidence_digest: checked.evidence_digest,
          plan_digest: checked.plan_digest,
        };
      }
      continue;
    }
    if (
      route.reason_code === "kernel_work_item_validation_resolution_required" &&
      route.work_item_id
    ) {
      const stop = await resumeKernelInspection(opts.command, runtime, record, route.work_item_id);
      if (stop) return { schema_version: 1, task_id: opts.task_id, action: stop };
      continue;
    }
    if (
      route.work_item_id &&
      ["kernel_work_item_inspection_required", "kernel_work_item_validation_required"].includes(
        route.reason_code,
      )
    ) {
      if (route.reason_code === "kernel_work_item_inspection_required") {
        requireKernelCommit(
          await runtime.lifecycle.apply(
            await runtime.input(
              {
                kind: "transition_work_item",
                action: "inspect",
                work_item_id: route.work_item_id,
                claim_id: record.aggregate.work_items[route.work_item_id]!.claim_id,
              },
              operationId,
            ),
          ),
        );
        continue;
      }
      const inspection = await issueKernelInspection(
        opts.command,
        runtime,
        record,
        route.work_item_id,
      );
      if (inspection === null) continue;
      return inspection;
    }
    if (route.reason_code === "kernel_work_item_materialization_required" && plan) {
      requireKernelCommit(
        await runtime.lifecycle.apply(
          await runtime.input(
            {
              kind: "materialize_work_items",
              plan_revision: plan.revision,
              plan_digest: plan.digest,
            },
            operationId,
          ),
        ),
      );
      continue;
    }
    if (
      (route.reason_code === "kernel_work_item_claim_required" ||
        route.reason_code === "kernel_work_item_rework_claim_required") &&
      route.work_item_id
    ) {
      await runtime.checkpoint(await runtime.observe());
      requireKernelCommit(
        await runtime.lifecycle.apply(
          await runtime.input(
            {
              kind: "transition_work_item",
              action: "claim",
              work_item_id: route.work_item_id,
              claim_id: k.kernelDigest(operationId),
            },
            operationId,
          ),
        ),
      );
      continue;
    }
    const worktreeAction = await ensureCanonicalTaskWorktree({
      command: opts.command,
      task: current.read.task,
      taskId: opts.task_id,
      reasonCode: route.reason_code,
      hasWorkItem: route.work_item_id !== null,
    });
    if (worktreeAction)
      return {
        schema_version: 1,
        task_id: opts.task_id,
        action: worktreeAction,
      };
    if (route.reason_code === "kernel_work_item_execution_required" && route.work_item_id) {
      const item = record.aggregate.work_items[route.work_item_id]!;
      const begun = await runtime.lifecycle.begin(
        await runtime.input(
          {
            kind: "transition_work_item",
            action: "begin",
            work_item_id: route.work_item_id,
            claim_id: item.claim_id,
          },
          operationId,
        ),
      );
      const result = requireKernelCommit(begun.result);
      if (!begun.work_order)
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: { kind: "human_required", reason: "canonical_begin_dispatch_uncertain" },
        };
      const order = await buildKernelAgentWorkOrder({
        command: opts.command,
        record: result.record,
        context,
        implementation: begun.work_order,
      });
      return issueKernelExchange(opts.command, order, opts.transport, result.record);
    }
    if (route.reason_code === "kernel_work_item_result_required" && route.work_item_id) {
      const resolved = await runtime.authority.resolve(opts.task_id, route.work_item_id);
      const resumed = resumeKernelWorkOrder({
        record,
        work_item_id: route.work_item_id,
        authority: resolved.authority,
        repository_fingerprint: resolved.context.repository_fingerprint,
      });
      if (!resumed)
        return {
          schema_version: 1,
          task_id: opts.task_id,
          action: { kind: "human_required", reason: "canonical_result_dispatch_unavailable" },
        };
      const order = await buildKernelAgentWorkOrder({
        command: opts.command,
        record,
        context: resolved.context,
        implementation: resumed,
      });
      return issueKernelExchange(opts.command, order, opts.transport, record);
    }
    return {
      schema_version: 1,
      task_id: opts.task_id,
      action: {
        kind: ["kernel_task_completed", "kernel_task_cancelled"].includes(route.reason_code)
          ? "terminal"
          : "external_wait",
        reason: route.reason_code,
      },
      canonical_revision: record.aggregate.revision,
    };
  }
  return {
    schema_version: 1,
    task_id: opts.task_id,
    action: { kind: "human_required", reason: "canonical_transition_budget_exhausted" },
  };
}
export type AdvanceTaskStepOptions = Parameters<typeof advanceCanonicalRoute>[0];

export async function advanceTaskStep(opts: AdvanceTaskStepOptions) {
  return await advanceCanonicalRoute(opts);
}
