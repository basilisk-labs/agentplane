import { taskCentricAggregateFromExtensions, taskCentricDigest } from "@agentplaneorg/core/tasks";
import { TaskCentricBackendAdapter } from "../adapters/task-backend/task-centric-backend-adapter.js";
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
  const adapter = new TaskCentricBackendAdapter({
    backend: ctx.taskBackend,
    observeRepository: () => Promise.resolve(repository),
  });
  await adapter.recordWorkItemResult({
    task_id: taskId,
    expected_revision: task.revision ?? 1,
    work_item_id: item.id,
    semantic_result: {
      schema_version: 1,
      kind: "execute",
      task_id: taskId,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      work_item_id: item.id,
      context_digest: repository.digest,
      status: "completed",
      summary: "Completed the isolated route fixture implementation.",
      claims: [],
      questions: [],
      artifacts: item.expected_outputs,
    },
    outputs: item.expected_outputs.map((id) => ({
      schema_version: 1,
      id,
      kind: "test_fixture",
      schema: "agentplane.route-fixture.v1",
      digest: taskCentricDigest({ taskId, id }),
      producer: {
        task_id: taskId,
        plan_revision: plan.revision,
        work_item_id: item.id,
        attempt: 1,
      },
      repository_snapshot_digest: repository.digest,
      provenance: ["isolated route test fixture"],
    })),
    validation: item.validation.checks.map((check) => ({
      check_id: check.id,
      status: "passed",
      observed_at: new Date().toISOString(),
      repository_snapshot_digest: repository.digest,
      command_identity: "isolated route fixture verification",
      exit_code: 0,
      artifact_refs: [],
      detail: "The test fixture implementation is ready for closeout routing.",
    })),
    idempotency_key: `route-fixture-result:${taskId}`,
  });
  const completed = await adapter.readTask(taskId);
  expect(completed?.work_items[item.id]?.state).toBe("COMPLETED");
}
