import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import {
  parseTaskReadme,
  taskCentricDigest,
  type RepositorySnapshot,
  type TaskAggregate,
  type TaskPlanProposal,
} from "@agentplaneorg/core/tasks";
import { installRunCliIntegrationHarness, mkTempDir, captureStdIO } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);
const DETERMINISTIC_CHECK = "node scripts/check-task-centric.mjs";

type Packet = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string };
  authority?: { role?: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
    result_path: string;
    resume_argv: string[];
  };
  operator_action?: {
    host_user_decision?: { request: Record<string, unknown> };
  };
};

type WorkOrder = {
  work_order_id: string;
  role: string;
  task: { id: string; work_item_id?: string };
  state_fingerprint: { worktree: string };
  planning_context?: { repository_snapshot: RepositorySnapshot };
};

async function runJson(root: string, argv: readonly string[]): Promise<Record<string, unknown>> {
  const io = captureStdIO();
  try {
    const code = await runCli([...argv, "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as Record<string, unknown>;
  } finally {
    io.restore();
  }
}

async function runCommand(root: string, argv: readonly string[]): Promise<void> {
  const io = captureStdIO();
  try {
    expect(await runCli([...argv, "--root", root]), io.stderr).toBe(0);
  } finally {
    io.restore();
  }
}

async function readWorkOrder(packet: Packet): Promise<WorkOrder> {
  if (!packet.exchange) throw new Error("Expected an external-agent exchange.");
  return JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as WorkOrder;
}

async function writeResult(
  packet: Packet,
  opts: {
    summary: string;
    proposal?: TaskPlanProposal;
    include_intent?: boolean;
    review?: {
      verdict: "pass" | "rework" | "blocked" | "human_review";
      missing_tests: string[];
      hidden_assumptions: string[];
      residual_risks: string[];
    };
  },
): Promise<void> {
  if (!packet.exchange) throw new Error("Expected an external-agent exchange.");
  const workOrder = await readWorkOrder(packet);
  await writeFile(
    packet.exchange.result_path,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: packet.task_id,
        transition_id: packet.transition_id,
        state_fingerprint: packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary: opts.summary,
          findings: opts.review
            ? ["The approved WorkItem outputs and root verification evidence are complete."]
            : [],
          uncertainty: [],
          ...(opts.proposal ? { task_plan_proposal: opts.proposal } : {}),
          ...(opts.review ? { review: opts.review } : {}),
          ...(opts.include_intent
            ? {
                task_intent: {
                  task_kind: "code",
                  mutation_scope: "code",
                  risk_flags: [],
                  tags: ["task-centric"],
                  execution: {
                    schema_version: 2,
                    preferred_mode: "direct",
                    scope_roots: ["src"],
                    repository_effects: ["repository_write", "source_code", "tests"],
                    external_effects: [],
                    requirements_uncertainty: "bounded",
                    implementation_uncertainty: "bounded",
                    reversibility: "reversible",
                    rationale: ["fresh repository task-centric release gate"],
                  },
                },
              }
            : {}),
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function validation(id: string, criterion: string) {
  return {
    schema_version: 1 as const,
    criteria: [
      {
        id: `criterion-${id}`,
        description: criterion,
        required: true,
        check_ids: [`check-${id}`],
      },
    ],
    checks: [
      {
        id: `check-${id}`,
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
        command: DETERMINISTIC_CHECK,
      },
    ],
    evidence_fingerprint: taskCentricDigest({ id, criterion }),
  };
}

function proposal(taskId: string, baseline: RepositorySnapshot): TaskPlanProposal {
  const firstValidation = validation("first", "The first implementation file is valid.");
  const secondValidation = validation("second", "The dependent implementation file is valid.");
  return {
    schema_version: 1,
    task_id: taskId,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1,
      work_items: [
        {
          id: "first",
          objective: "Create the first implementation artifact.",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["output-first"],
          scope_roots: ["src/first.ts"],
          acceptance_criteria: firstValidation.criteria,
          validation: firstValidation,
          context: {
            required_sources: ["repository"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [{ kind: "path", resource: "src/first.ts", mode: "write" }],
          optional: false,
          priority: 2,
        },
        {
          id: "second",
          objective: "Create the dependent implementation artifact.",
          depends_on: ["first"],
          required_inputs: ["output-first"],
          expected_outputs: ["output-second"],
          scope_roots: ["src/second.ts", "src/second.ok"],
          acceptance_criteria: secondValidation.criteria,
          validation: secondValidation,
          context: {
            required_sources: ["repository", "output-first"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "low",
          capabilities: ["task.verify"],
          resource_claims: [{ kind: "path", resource: "src", mode: "write" }],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation("root", "The complete Task passes its declared verification."),
  };
}

async function resume(root: string, packet: Packet): Promise<Packet> {
  if (!packet.exchange) throw new Error("Expected an external-agent exchange.");
  expect(packet.exchange.resume_argv.at(0)).toBe("agentplane");
  expect(packet.exchange.resume_argv).toContain(packet.exchange.result_path);
  return (await runJson(root, packet.exchange.resume_argv.slice(1))) as Packet;
}

async function requestSemanticPacket(root: string, taskId: string): Promise<Packet> {
  let packet = (await runJson(root, ["task", "advance", taskId, "--agent-json"])) as Packet;
  if (packet.action.kind === "framework_transition") {
    packet = (await runJson(root, ["task", "advance", taskId, "--agent-json"])) as Packet;
  }
  return packet;
}

describe("task-centric fresh repository release gate", { timeout: 180_000 }, () => {
  it("keeps one Task through exact approval, WorkItem repair, restart-safe progression, and completion", async () => {
    const root = await mkTempDir();
    await runCommand(root, [
      "init",
      "--workflow",
      "direct",
      "--require-network-approval",
      "true",
      "--yes",
    ]);
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "check-task-centric.mjs"),
      [
        'import { existsSync } from "node:fs";',
        'if (existsSync("src/second.ts") && !existsSync("src/second.ok")) process.exit(1);',
        "",
      ].join("\n"),
      "utf8",
    );
    await writeFile(
      path.join(root, "package.json"),
      `${JSON.stringify({ scripts: { "ci:local:full": DETERMINISTIC_CHECK } }, null, 2)}\n`,
      "utf8",
    );
    await execFileAsync("git", ["add", "scripts/check-task-centric.mjs", "package.json"], {
      cwd: root,
    });
    await execFileAsync(
      "git",
      ["commit", "--no-verify", "-m", "test: add deterministic task check"],
      {
        cwd: root,
      },
    );
    const created = await runJson(root, [
      "task",
      "create",
      "Implement a two-step task-centric example",
      "--description",
      "Create two dependent source files inside one user Task.",
      "--verify",
      DETERMINISTIC_CHECK,
      "--json",
    ]);
    const taskId = String(created.task_id);
    const planning = (await runJson(root, ["task", "advance", taskId, "--agent-json"])) as Packet;
    expect(planning.action.kind).toBe("agent_episode");
    expect(planning.authority?.role).toBe("PLANNER");
    const planningWorkOrder = await readWorkOrder(planning);
    const baseline = planningWorkOrder.planning_context?.repository_snapshot;
    if (!baseline) throw new Error("Planning work order omitted the repository snapshot.");
    const structuredPlan = proposal(taskId, baseline);
    await writeResult(planning, {
      summary: "Create the first file, then the dependent second file, and verify the root result.",
      proposal: structuredPlan,
      include_intent: true,
    });
    const approval = await resume(root, planning);
    expect(approval.action.kind).toBe("approval_required");
    const approvalRequest = approval.operator_action?.host_user_decision?.request;
    if (!approvalRequest) throw new Error("Expected exact host user decision request.");
    expect(approvalRequest.plan_digest).toMatch(/^sha256:[0-9a-f]{64}$/u);
    const hostDecision = Buffer.from(
      JSON.stringify({
        schema_version: 1,
        ...approvalRequest,
        host_id: "critical-test",
        conversation_id: "task-centric-fresh-repo",
        message_id: "approval-1",
        decided_at: "2026-08-22T00:00:00.000Z",
      }),
      "utf8",
    ).toString("base64url");
    await runCommand(root, [
      "task",
      "plan",
      "approve",
      taskId,
      "--host-user-decision",
      hostDecision,
    ]);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: approve task-centric plan"], {
      cwd: root,
    });

    let first = await requestSemanticPacket(root, taskId);
    if (first.exchange) {
      const state = JSON.parse(
        await readFile(path.join(first.exchange.directory, "exchange.json"), "utf8"),
      ) as { purpose: string };
      if (state.purpose === "task_worktree_resolution") {
        await writeResult(first, { summary: "The task worktree is ready." });
        first = await resume(root, first);
      }
    }
    const firstWorkOrder = await readWorkOrder(first);
    expect(firstWorkOrder.task.work_item_id).toBe("first");
    expect(first.authority?.role).toBe("EXECUTOR");
    const checkout = firstWorkOrder.state_fingerprint.worktree;
    await mkdir(path.join(checkout, "src"), { recursive: true });
    await writeFile(path.join(checkout, "src", "first.ts"), "export const first = 1;\n", "utf8");
    await writeResult(first, { summary: "Created the first WorkItem output." });
    const second = await resume(checkout, first);
    const secondWorkOrder = await readWorkOrder(second);
    expect(secondWorkOrder.task.work_item_id).toBe("second");
    expect(second.authority?.role).toBe("EXECUTOR");

    await writeFile(path.join(checkout, "src", "second.ts"), "export const second = 2;\n", "utf8");
    await writeResult(second, {
      summary: "Created the dependent output with a deterministic defect.",
    });
    const repair = await resume(checkout, second);
    const repairWorkOrder = await readWorkOrder(repair);
    expect(repairWorkOrder.task.work_item_id).toBe("second");
    expect(repair.authority?.role).toBe("EXECUTOR");
    await writeFile(path.join(checkout, "src", "second.ok"), "validated\n", "utf8");
    await writeResult(repair, { summary: "Repaired the deterministic validation failure." });
    const evaluator = await resume(checkout, repair);
    expect(evaluator.authority?.role).toBe("EVALUATOR");
    await writeResult(evaluator, {
      summary: "Both WorkItems and the root Task satisfy the approved plan.",
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    });
    const terminal = await resume(checkout, evaluator);
    expect(terminal.action.kind).toBe("terminal");

    const taskReadme = path.join(checkout, ".agentplane", "tasks", taskId, "README.md");
    const frontmatter = parseTaskReadme(await readFile(taskReadme, "utf8")).frontmatter;
    const aggregate = (frontmatter.extensions as Record<string, unknown>)[
      "agentplane.task_centric"
    ] as TaskAggregate;
    expect(frontmatter.status).toBe("DONE");
    expect(aggregate).toMatchObject({
      lifecycle: "COMPLETED",
      current_plan: { approval: { state: "approved" } },
      final_validation: { status: "passed", stale_evidence: [] },
      work_items: {
        first: { state: "COMPLETED" },
        second: { state: "COMPLETED", attempt: 2 },
      },
    });
    const taskEntries = await readdir(path.join(checkout, ".agentplane", "tasks"), {
      withFileTypes: true,
    });
    const taskDirectories = taskEntries.filter(
      (entry) => entry.isDirectory() && /^\d{12}-/u.test(entry.name),
    );
    expect(taskDirectories.map((entry) => entry.name)).toEqual([taskId]);
  });
});
