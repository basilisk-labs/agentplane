import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { parseTaskReadme, type TaskPlanProposal } from "@agentplaneorg/core/tasks";
import { captureStdIO, runCliSilent } from "@agentplane/testkit";
import { runCli } from "./run-cli.js";
import { loadCommandContext, loadTaskFromContext } from "../commands/shared/task-backend.js";
import { loadTaskCommandContext } from "../runtime/task-execution-context/index.js";
import { reconcileTaskExecutionContract } from "../runtime/task-routing/index.js";
import {
  recordedTaskImplementationCommitSha,
  resolveQualityReviewTargetSha,
} from "../commands/shared/quality-review-target.js";
import { resolveObservedVerificationChangedPaths } from "../commands/task/verify-record-observed-changes.js";

type PlanningPacket = {
  transition_id: string;
  state_fingerprint: string;
  authority: { role: string };
  exchange: {
    directory: string;
    work_order_ref: string;
    result_path: string;
    resume_argv: string[];
  };
};

export async function approveRouteTaskPlan(
  root: string,
  taskId: string,
  objective: string,
): Promise<void> {
  let packet: PlanningPacket;
  const io = captureStdIO();
  try {
    expect(
      await runCli(["task", "advance", taskId, "--agent-json", "--root", root]),
      io.stderr,
    ).toBe(0);
    packet = JSON.parse(io.stdout) as PlanningPacket;
  } finally {
    io.restore();
  }
  expect(packet.authority.role).toBe("PLANNER");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const baseline = workOrder.planning_context!.repository_snapshot;
  const task = parseTaskReadme(
    await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
  ).frontmatter;
  const { config } = await loadCommandContext({ cwd: root, rootOverride: root });
  const commands: string[] = Array.isArray(task.verify)
    ? task.verify.filter((value): value is string => typeof value === "string")
    : [];
  const checks = commands.map((command, index) => ({
    id: `task-check-${index + 1}`,
    kind: "deterministic" as const,
    required: true,
    capability: "task.verify",
    command,
  }));
  const taskChecks =
    checks.length > 0
      ? checks
      : [
          {
            id: "task-check",
            kind: "deterministic" as const,
            required: true,
            capability: "task.verify",
          },
        ];
  const criterion = {
    id: "route-contract",
    description: objective,
    required: true,
    check_ids: taskChecks.map((check) => check.id),
  };
  const validation = {
    schema_version: 1 as const,
    criteria: [criterion],
    checks: taskChecks,
    evidence_fingerprint: baseline.digest,
  };
  const proposal: TaskPlanProposal = {
    schema_version: 1,
    task_id: taskId,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "exercise-route",
          objective,
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["route-result"],
          scope_roots: ["."],
          acceptance_criteria: [criterion],
          validation,
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 65_536,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
  await writeFile(
    packet.exchange.result_path,
    JSON.stringify({
      schema_version: 1,
      kind: "agent_action_result",
      task_id: taskId,
      transition_id: packet.transition_id,
      state_fingerprint: packet.state_fingerprint,
      role: "PLANNER",
      result: {
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: workOrder.work_order_id,
        status: "completed",
        summary: objective,
        findings: [],
        uncertainty: [],
        task_intent: {
          task_kind: "code",
          mutation_scope: "code",
          risk_flags: [],
          tags: ["code"],
          ...(task.blueprint_request ? { blueprint_request: task.blueprint_request } : {}),
          execution: {
            schema_version: 2,
            preferred_mode: config.workflow_mode,
            scope_roots: ["."],
            repository_effects: ["repository_write", "source_code"],
            external_effects: [],
            requirements_uncertainty: "bounded",
            implementation_uncertainty: "bounded",
            reversibility: "reversible",
            rationale: ["Exercise the configured route in an isolated local fixture."],
          },
        },
        task_plan_proposal: proposal,
      },
    }),
  );
  const resumeIo = captureStdIO();
  try {
    expect(
      await runCli([...packet.exchange.resume_argv.slice(1), "--root", root]),
      resumeIo.stderr,
    ).toBe(0);
    expect(JSON.parse(resumeIo.stdout)).toMatchObject({ action: { kind: "approval_required" } });
  } finally {
    resumeIo.restore();
  }
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
