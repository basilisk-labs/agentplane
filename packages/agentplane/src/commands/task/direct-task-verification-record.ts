import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import { CliError } from "../../shared/errors.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { resolveImplementationVerificationTask } from "./external-agent-implementation-recovery.js";
import type { PreparedTaskMutationObserver } from "../shared/task-mutation.js";
import type { CommandContext, loadTaskFromContext } from "../shared/task-backend.js";
import {
  blockingWorkItemCommands,
  runDirectTaskVerification,
  renderDirectTaskVerificationDetails,
  type DirectTaskVerificationResult,
} from "./direct-task-verification.js";
import {
  isInfrastructureVerification,
  prepareInfrastructureVerificationForCheckout,
} from "./verification-infrastructure.js";

export async function recordDirectTaskVerification(opts: {
  command: CommandContext;
  checkout: string;
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  work_order: AgentWorkOrderV2;
  workflow: "direct" | "branch_pr";
  beforePersist?: (
    mutation: Parameters<PreparedTaskMutationObserver>[0],
    verification: DirectTaskVerificationResult,
  ) => Promise<void>;
  afterPersist?: () => Promise<void>;
}): Promise<DirectTaskVerificationResult> {
  const verification = await resolveImplementationVerificationTask(opts);
  const verificationTask = verification.task;
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  const selectedWorkItem = aggregate?.current_plan?.proposal.work_items.work_items.find(
    (item) => item.id === opts.work_order.task.work_item_id,
  );
  const taskCentricValidation = opts.work_order.task.work_item_id
    ? selectedWorkItem?.validation
    : aggregate?.current_plan?.proposal.top_level_validation;
  const additionalCommands = taskCentricValidation
    ? blockingWorkItemCommands(taskCentricValidation)
    : [];
  const usesTaskLevelPlanCommands =
    !opts.work_order.task.work_item_id && additionalCommands.length > 0;
  const usesTaskCentricCommands = selectedWorkItem !== undefined || usesTaskLevelPlanCommands;
  const retain = await prepareInfrastructureVerificationForCheckout({
    command: opts.command,
    checkout: opts.checkout,
    task_id: opts.task.id,
    implementation_commit: verification.snapshot.evaluated_sha ?? "",
    verification_scope: opts.work_order.task.work_item_id ?? null,
    identity: {
      snapshot: verification.snapshot,
      commands: verificationTask.verify ?? [],
      validation: taskCentricValidation ?? null,
      policy: opts.command.config,
    },
  });
  const checks = await runDirectTaskVerification({
    retain_infrastructure_failure: retain,
    command: opts.command,
    task: verificationTask,
    task_id: opts.task.id,
    cwd: opts.checkout,
    additional_commands: usesTaskCentricCommands ? additionalCommands : [],
    additional_only: usesTaskCentricCommands,
    allow_empty: selectedWorkItem !== undefined,
    map_selected_checks: usesTaskLevelPlanCommands,
  });
  if (isInfrastructureVerification(checks))
    throw new Error(
      `Verification infrastructure failed. Retained: ${checks.artifact_path}. Repair the environment and resume the same external result.`,
    );
  if (selectedWorkItem) {
    // WorkItem validation is projected by recordTaskCentricExternalResult.
    // Task-level verification remains pending until every required WorkItem is complete.
    return checks;
  }
  const exitCode = await cmdVerifyParsed({
    ctx: opts.command,
    cwd: opts.checkout,
    rootOverride: undefined,
    taskId: opts.task.id,
    state: checks.status === "passed" ? "ok" : "needs_rework",
    by: "SUPERVISOR",
    note:
      checks.status === "passed"
        ? "Verified: CLI-owned checks passed before independent EVALUATOR review."
        : `Rework: ${checks.reason ?? "Declared implementation verification did not pass."}`,
    details: renderDirectTaskVerificationDetails({
      task: verificationTask,
      taskId: opts.task.id,
      workflow: opts.workflow,
      result: checks,
    }),
    localOnly: false,
    repoFixable: checks.status !== "passed",
    incidentTags: [],
    incidentMatch: [],
    quiet: true,
    verificationSnapshot: verification.snapshot,
    beforePersist: opts.beforePersist
      ? (mutation) => opts.beforePersist!(mutation, checks)
      : undefined,
  });
  if (exitCode !== 0) {
    throw new CliError({
      code: "E_RUNTIME",
      message: `External-agent implementation verification exited with ${exitCode}.`,
    });
  }
  await opts.afterPersist?.();
  return checks;
}
