import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import { buildAgentWorkOrderV2ValidFixture } from "@agentplaneorg/core/schemas";
import { expect } from "vitest";
import { captureStdIO, runCliSilent } from "@agentplane/testkit";
import { runCli } from "./run-cli.js";
import { prepareContinuityPlan } from "./task-continuity.testkit.js";
import { loadCommandContext, loadTaskFromContext } from "../commands/shared/task-backend.js";
import { loadTaskCommandContext } from "../runtime/task-execution-context/index.js";
import { reconcileTaskExecutionContract } from "../runtime/task-routing/index.js";
import {
  recordedTaskImplementationCommitSha,
  resolveQualityReviewTargetSha,
} from "../commands/shared/quality-review-target.js";
import { resolveObservedVerificationChangedPaths } from "../commands/task/verify-record-observed-changes.js";
import { recordTaskCentricExternalResult } from "../commands/task/task-centric-external-result.js";

export async function approveRouteTaskPlan(
  root: string,
  taskId: string,
  objective: string,
): Promise<void> {
  await prepareContinuityPlan(root, taskId, objective, false);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await loadTaskFromContext({ ctx, taskId });
  const commands = task.verify ?? [];
  const verifySteps =
    commands.length > 0
      ? commands
          .map((command, index) => `${index + 1}. Run \`${command}\`. Expected: ${objective}`)
          .join("\n")
      : `1. Review the route result. Expected: ${objective}`;
  expect(
    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      verifySteps,
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]),
  ).toBe(0);
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
}

export async function routeVerificationDetails(root: string, taskId: string): Promise<string> {
  const initialCtx = await loadCommandContext({ cwd: root, rootOverride: root });
  const { command: ctx, execution } = await loadTaskCommandContext({
    ctx: initialCtx,
    taskIds: [taskId],
  });
  const task = await loadTaskFromContext({ ctx, taskId });
  const evaluatedSha = await resolveQualityReviewTargetSha({
    gitRoot: ctx.resolvedProject.gitRoot,
    workflowDir: ctx.config.paths.workflow_dir,
    taskId,
    taskIds: [taskId],
    lifecycleTaskIds: [taskId],
    headSha: recordedTaskImplementationCommitSha(task),
    previousEvaluatedSha: task.quality_review?.evaluated_sha ?? null,
    workflowMode: execution.selected_mode,
  });
  const changedPaths = await resolveObservedVerificationChangedPaths({
    ctx,
    evaluatedSha,
    taskId,
    artifactTaskIds: [taskId],
    execution,
  });
  expect(task.execution_contract).toBeDefined();
  const contract = reconcileTaskExecutionContract({
    contract: task.execution_contract!,
    changed_paths: changedPaths,
  }).contract;
  const checks = contract.verification.contract!.selected_checks.filter(
    (check) => check !== "hosted_integration",
  );
  expect(checks.length).toBeGreaterThan(0);
  return checks
    .map((check) =>
      [
        `Check: ${check}`,
        "Command: isolated route fixture verification",
        "Result: pass",
        "Evidence: deterministic test fixture; no hosted evidence claimed",
        "Scope: local route-decision fixture",
      ].join("\n"),
    )
    .join("\n\n");
}

export async function recordRouteVerification(
  root: string,
  taskId: string,
  note: string,
  localOnly = false,
): Promise<void> {
  const details = await routeVerificationDetails(root, taskId);
  const io = captureStdIO();
  try {
    expect(
      await runCli([
        "verify",
        taskId,
        "--ok",
        "--by",
        "TESTER",
        "--note",
        note,
        "--details",
        details,
        ...(localOnly ? ["--local-only"] : []),
        "--root",
        root,
      ]),
      io.stderr,
    ).toBe(0);
  } finally {
    io.restore();
  }
}

export async function completeRouteWorkItem(root: string, taskId: string): Promise<void> {
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await loadTaskFromContext({ ctx, taskId });
  const aggregate = taskCentricAggregateFromExtensions(task.extensions);
  const plan = aggregate?.current_plan;
  if (!plan) throw new Error("Route fixture requires an approved plan.");
  const [item] = plan.proposal.work_items.work_items;
  if (!item || plan.proposal.work_items.work_items.length !== 1) {
    throw new Error("Route fixture requires exactly one WorkItem.");
  }
  const repository = plan.proposal.planning_baseline;
  const workOrder = buildAgentWorkOrderV2ValidFixture();
  workOrder.work_order_id = `route-fixture-result:${taskId}`;
  workOrder.task = {
    id: taskId,
    revision: task.revision ?? 1,
    work_item_id: item.id,
    objective: item.objective,
    acceptance_criteria: item.acceptance_criteria,
    unresolved_questions: [],
  };
  workOrder.planning_context = {
    schema_version: 1,
    repository_snapshot: repository,
    retrievals: [],
    digest: repository.digest,
  };
  const result = await recordTaskCentricExternalResult({
    command: ctx,
    work_order: workOrder,
    head: await ctx.git.headCommit(),
    dirty_paths: [],
    semantic: {
      schema_version: 2,
      kind: "agent_semantic_result",
      work_order_id: workOrder.work_order_id,
      status: "completed",
      summary: "Completed the isolated route fixture implementation.",
      findings: [],
      uncertainty: [],
    },
    verification: {
      status: "passed",
      artifact_path: "isolated route test fixture",
      reason: null,
      checks: item.validation.checks.map((check) => ({
        command: check.command ?? "isolated route fixture verification",
        script: null,
        check_ids: [check.id],
        exit_code: 0,
        duration_ms: 0,
        stdout_tail: "The test fixture implementation is ready for closeout routing.",
        stderr_tail: "",
      })),
    },
  });
  expect(result).toEqual({
    state: "work_item_completed",
    work_item_id: item.id,
    remaining_required_work_items: 0,
  });
}
