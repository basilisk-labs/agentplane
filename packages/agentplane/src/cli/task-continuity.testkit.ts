import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect } from "vitest";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import type { TaskPlanProposal } from "@agentplaneorg/core/tasks";
import { captureStdIO, runCliSilent } from "@agentplane/testkit";
import { runCli } from "./run-cli.js";
import { loadCommandContext, loadTaskFromContext } from "../commands/shared/task-backend.js";
import { resolveNativeTaskIdentity } from "../commands/shared/native-task-identity.js";

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

export function createFixtureTaskPlan(
  workOrder: AgentWorkOrderV2,
  opts: {
    id: string;
    objective: string;
    expectedOutput: string;
    validation: NonNullable<TaskPlanProposal["top_level_validation"]>;
  },
): TaskPlanProposal {
  const baseline = workOrder.planning_context?.repository_snapshot;
  if (!baseline) throw new Error("Task fixture requires the issued planning snapshot.");
  const { objective, validation } = opts;
  return {
    schema_version: 1,
    task_id: workOrder.task.id,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: opts.id,
          objective,
          depends_on: [],
          required_inputs: [],
          expected_outputs: [opts.expectedOutput],
          scope_roots: ["."],
          acceptance_criteria: validation.criteria,
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
}

export async function prepareContinuityPlan(
  root: string,
  taskId: string,
  objective: string,
  approve = true,
): Promise<void> {
  const initialCtx = await loadCommandContext({ cwd: root, rootOverride: root });
  const initialTask = await loadTaskFromContext({ ctx: initialCtx, taskId });
  if (!resolveNativeTaskIdentity(initialTask)) {
    const inspectIo = captureStdIO();
    let sourceDigest = "";
    let classification = "";
    try {
      expect(
        await runCli(["task", "kernel-migrate", taskId, "--root", root]),
        inspectIo.stderr,
      ).toBe(0);
      const report = JSON.parse(inspectIo.stdout) as {
        classification?: unknown;
        source_digest?: unknown;
      };
      classification = typeof report.classification === "string" ? report.classification : "";
      sourceDigest = typeof report.source_digest === "string" ? report.source_digest : "";
    } finally {
      inspectIo.restore();
    }
    if (classification === "canonical") {
      sourceDigest = "";
    } else {
      expect(sourceDigest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    }
    if (classification !== "canonical") {
      const applyIo = captureStdIO();
      try {
        const code = await runCli([
          "task",
          "kernel-migrate",
          taskId,
          "--apply",
          "--source-digest",
          sourceDigest,
          "--yes",
          "--root",
          root,
        ]);
        if (code !== 0) {
          throw new Error(`Kernel migration fixture failed: ${applyIo.stderr || applyIo.stdout}`);
        }
      } finally {
        applyIo.restore();
      }
    }
  }
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
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await loadTaskFromContext({ ctx, taskId });
  const { config } = ctx;
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
    evidence_fingerprint:
      workOrder.planning_context?.repository_snapshot.digest ?? workOrder.state_fingerprint.digest,
  };
  const proposal = workOrder.planning_context
    ? createFixtureTaskPlan(workOrder, {
        id: "exercise-route",
        objective,
        expectedOutput: "route-result",
        validation,
      })
    : null;
  if (!proposal && !workOrder.canonical_binding) {
    throw new Error("Task fixture requires a planning baseline or canonical binding.");
  }
  const semanticResult = {
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: workOrder.work_order_id,
    status: "completed",
    summary: objective,
    findings: [],
    uncertainty: [],
    ...(workOrder.canonical_binding
      ? {
          canonical_binding: workOrder.canonical_binding,
          canonical_plan: {
            work_items: [
              {
                id: "exercise-route",
                depends_on: [],
                required_inputs: [],
                expected_outputs: ["route-result"],
                optional: false,
                execution_requirements: {
                  scope_roots: ["."],
                  repository_effects: ["source_code", "tests"],
                  external_effects: [],
                  capabilities: ["repository_write", "task.verify"],
                  resources: [],
                },
                contract: {
                  objective,
                  acceptance_criteria: [objective],
                  verification_commands: commands.length > 0 ? commands : ["git status --short"],
                  role: "EXECUTOR",
                },
              },
            ],
          },
        }
      : {
          task_intent: {
            task_kind: task.task_kind ?? "code",
            mutation_scope: task.mutation_scope ?? "code",
            risk_flags: task.risk_flags ?? [],
            tags: task.tags,
            execution: {
              schema_version: 2,
              preferred_mode: config.workflow_mode,
              scope_roots: ["."],
              repository_effects: task.execution_contract?.declaration.repository_effects ?? [
                "repository_write",
                "source_code",
              ],
              external_effects: task.execution_contract?.declaration.external_effects ?? [],
              requirements_uncertainty: "bounded",
              implementation_uncertainty: "bounded",
              reversibility: task.execution_contract?.declaration.reversibility ?? "reversible",
              rationale: ["Exercise the configured route in an isolated local fixture."],
            },
          },
          task_plan_proposal: proposal,
        }),
  };
  await writeFile(
    packet.exchange.result_path,
    JSON.stringify(
      workOrder.canonical_binding
        ? semanticResult
        : {
            schema_version: 1,
            kind: "agent_action_result",
            task_id: taskId,
            transition_id: packet.transition_id,
            state_fingerprint: packet.state_fingerprint,
            role: "PLANNER",
            result: semanticResult,
          },
    ),
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
  if (!approve) return;
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
}
