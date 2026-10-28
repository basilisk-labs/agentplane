import type { CommandContext } from "../shared/task-backend.js";
import { readKernelAdoption } from "./kernel-adopted-pr-route.js";
import { decideCanonicalWorkflowEffect } from "./kernel-provider-effect-coordinator.js";
import { advanceCompletedProviderWorkflow } from "./kernel-completed-provider-workflow.js";

/** A provider update changes the hosted tree, so it must precede every native claim. */
export async function advanceAdoptedPreclaimUpdate(opts: {
  command: CommandContext;
  task_id: string;
  allow_provider_effects?: boolean;
  first_claim: boolean;
}) {
  if (!opts.first_claim || !(await readKernelAdoption(opts.command, opts.task_id)))
    return { kind: "not_applicable" as const };
  if (!opts.allow_provider_effects) {
    return {
      kind: "stop" as const,
      response: {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "external_wait" as const, reason: "canonical_provider_access_required" },
      },
    };
  }
  const workflow = await decideCanonicalWorkflowEffect(opts.command, opts.task_id, true);
  const step = workflow.workflowStep;
  if (
    step.kind === "approval" &&
    step.request.type === "side_effect" &&
    step.request.operationId === "provider.pr.update_branch"
  ) {
    return {
      kind: "stop" as const,
      response: {
        schema_version: 1,
        task_id: opts.task_id,
        action: { kind: "approval_required" as const, reason: "adopted_provider_update_required" },
        operator_action: {
          kind: "grant_side_effect_authority" as const,
          required_role: "USER" as const,
          cwd: workflow.executionPacket.mustRunFrom,
          argv: [
            "agentplane",
            "task",
            "authority",
            "grant",
            opts.task_id,
            "--remote",
            "--operation",
            step.request.operationId,
            "--operation-digest",
            step.request.operationDigest,
            "--state-fingerprint",
            step.request.stateFingerprintDigest,
            "--state-scope-digest",
            step.request.stateScopeDigest,
            "--by",
            "USER",
          ],
          authority_reference: step.request.authorityRef,
        },
      },
    };
  }
  if (step.kind === "cli_operation" && step.operation.id === "provider.pr.update_branch") {
    const updated = await advanceCompletedProviderWorkflow({
      command: opts.command,
      decision: workflow,
      task_id: opts.task_id,
    });
    if (updated?.kind === "progress") return { kind: "progress" as const };
    return {
      kind: "stop" as const,
      response: {
        schema_version: 1,
        task_id: opts.task_id,
        action:
          updated?.kind === "stop"
            ? updated.action
            : { kind: "human_required" as const, reason: "adopted_provider_update_unavailable" },
      },
    };
  }
  if (step.id !== "terminal.adopted_kernel_incomplete") {
    return {
      kind: "stop" as const,
      response: {
        schema_version: 1,
        task_id: opts.task_id,
        action: {
          kind:
            step.kind === "cli_operation"
              ? ("external_wait" as const)
              : ("human_required" as const),
          reason: "adopted_provider_prevalidation_unavailable",
          workflow_step: step.id,
        },
      },
    };
  }
  return { kind: "not_applicable" as const };
}
