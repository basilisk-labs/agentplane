import { createCliEmitter, infoMessage } from "../../cli/output.js";
import { routeRunnerContextIsRelevant } from "../shared/route-guidance.js";
import type { TaskBrief } from "./brief-model.js";

function splitNonEmptyLines(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function formatSourceConfidence(sourceConfidence: TaskBrief["source_confidence"]): string {
  const keys = ["route", "next_action", "verify_steps", "snapshot", "remote"] as const;
  return keys
    .map((key) => {
      const value = sourceConfidence[key];
      return `${key}=${value?.confidence ?? "unknown"}/${value?.freshness ?? "unknown"}`;
    })
    .join(", ");
}

export function reportTaskBriefText(brief: TaskBrief, taskId: string): void {
  const output = createCliEmitter();
  output.report(
    [
      { label: "task", value: `${brief.task.id} ${brief.task.status}` },
      { label: "title", value: brief.task.title },
      { label: "owner", value: brief.task.owner },
      { label: "workflow", value: brief.workflow.mode },
      { label: "phase", value: brief.route.phase },
      { label: "authoritative_checkout", value: brief.route.authoritative_checkout },
      {
        label: "authoritative_checkout_path",
        value: brief.route.authoritative_checkout_path ?? "unknown",
      },
      { label: "mutation_path_hint", value: brief.route.mutation_path_hint ?? "none" },
      { label: "checkout_role", value: brief.workflow.checkout_role },
      { label: "branch", value: brief.workflow.branch ?? "unknown" },
      { label: "base_branch", value: brief.workflow.base_branch ?? "unknown" },
      { label: "pr_branch", value: brief.workflow.pr_branch ?? "missing" },
      { label: "next_code", value: brief.next_action.code },
      { label: "next", value: brief.next_action.command ?? brief.next_action.summary },
      { label: "operator_action", value: brief.decision_context.operatorAction },
      { label: "can_execute_now", value: String(brief.decision_context.canExecuteNow) },
      { label: "safe_command", value: brief.decision_context.safeCommand ?? "none" },
      {
        label: "diagnostic_command",
        value: brief.decision_context.diagnosticCommand ?? "none",
      },
      {
        label: "source_of_truth",
        value:
          `route=${brief.decision_context.sourceOfTruth.route} ` +
          `diagnostic=${brief.decision_context.sourceOfTruth.diagnostic} ` +
          `remote=${brief.decision_context.sourceOfTruth.remote}`,
      },
      {
        label: "repeat_policy",
        value:
          `allowed=${String(brief.decision_context.repeatPolicy.allowed)} ` +
          `recompute=${brief.decision_context.repeatPolicy.recomputeCommand}`,
      },
      {
        label: "executor_context",
        value:
          `executor=${brief.decision_context.executorContext.executor} ` +
          `runner_route_active=${String(
            brief.decision_context.executorContext.runnerRouteActive,
          )} ` +
          `instruction=${brief.decision_context.executorContext.instruction}`,
      },
      {
        label: "executor_warning",
        value: brief.decision_context.executorContext.warning,
      },
      ...(routeRunnerContextIsRelevant(brief.decision_context)
        ? [
            {
              label: "runner_context",
              value:
                `required=${String(brief.decision_context.runnerContext.runnerIsRequired)} ` +
                `allowed_now=${String(brief.decision_context.runnerContext.runnerIsAllowedNow)} ` +
                `failure_means=${brief.decision_context.runnerContext.runnerFailureMeans}`,
            },
          ]
        : []),
      {
        label: "safe_to_mutate",
        value: String(brief.execution_packet.safe_to_mutate),
      },
      { label: "recommended_role", value: brief.execution_packet.recommended_role },
      {
        label: "must_run_from",
        value: brief.execution_packet.must_run_from ?? "unknown",
      },
      {
        label: "exact_argv",
        value: brief.execution_packet.exact_argv?.join(" ") ?? "none",
      },
      {
        label: "return_control_when",
        value: brief.execution_packet.return_control_when,
      },
      {
        label: "stale_state_check",
        value: brief.execution_packet.stale_state_check,
      },
      {
        label: "evidence_missing",
        value: brief.execution_packet.evidence_missing.join(", ") || "none",
      },
      { label: "requires_approval", value: String(brief.next_action.requires_approval) },
      {
        label: "human_provider_action",
        value: brief.execution_packet.human_provider_action ?? "none",
      },
      { label: "remote", value: brief.remote.note },
      { label: "confidence", value: formatSourceConfidence(brief.source_confidence) },
    ],
    { header: infoMessage(`task brief: ${taskId}`) },
  );
  if (brief.batch_ownership.role !== "none") {
    output.report([
      { label: "batch_role", value: brief.batch_ownership.role },
      { label: "batch_primary", value: brief.batch_ownership.primary_task_id },
      { label: "batch_branch", value: brief.batch_ownership.branch ?? "missing" },
      {
        label: "batch_included",
        value: brief.batch_ownership.included_task_ids.join(", ") || "none",
      },
      {
        label: "batch_states",
        value: brief.batch_ownership.task_states
          .map(
            (state) =>
              `${state.id}:${state.status}:verification=${state.verification ?? "pending"}`,
          )
          .join(", "),
      },
      {
        label: "batch_next",
        value:
          brief.batch_ownership.next_owner_action.command ??
          brief.batch_ownership.next_owner_action.summary,
      },
    ]);
  }
  for (const blocker of brief.blockers) {
    output.line(`blocker: ${blocker.code}: ${blocker.summary}`);
  }
  for (const rule of brief.execution_packet.must_not) {
    output.line(`must_not: ${rule}`);
  }
  for (const risk of brief.decision_context.risks) {
    output.line(
      `decision_risk: ${risk.code}: ${risk.summary}; mitigation: ${risk.mitigationCommand}; stop: ${risk.stopCondition}`,
    );
  }
  output.line(`verify_steps_quality: ${brief.verify_steps.quality}`);
  output.line("verify_steps:");
  for (const line of splitNonEmptyLines(brief.verify_steps.text)) {
    output.line(`  ${line}`);
  }
  output.report([
    { label: "blueprint_id", value: brief.blueprint.blueprint_id ?? "unresolved" },
    { label: "blueprint_route", value: brief.blueprint.route?.join(" -> ") ?? "none" },
    {
      label: "policy_modules",
      value: brief.policy_modules.join(", ") || "none",
    },
    {
      label: "required_evidence",
      value: brief.evidence_required.join(", ") || "none",
    },
    { label: "snapshot_state", value: brief.snapshot.state },
    { label: "snapshot_safe_command", value: brief.snapshot.safe_command },
    { label: "stop_rules", value: brief.stop_rules.join(", ") || "none" },
  ]);
}
