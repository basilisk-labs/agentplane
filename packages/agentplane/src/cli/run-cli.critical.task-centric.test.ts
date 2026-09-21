import { execFile } from "node:child_process";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { parseTaskReadme, taskKernel as k, type TaskAggregate } from "@agentplaneorg/core/tasks";
import { installRunCliIntegrationHarness, mkTempDir, captureStdIO } from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);
const DETERMINISTIC_CHECK = "node scripts/check-task-centric.mjs";
const BRANCH_CHECK = "node scripts/check-branch-task.mjs";

type Packet = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; reason?: string; must_run_from?: string };
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
  canonical_binding: Record<string, unknown>;
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
    canonical_plan?: ReturnType<typeof canonicalPlan>;
    outputs?: string[];
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
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: workOrder.work_order_id,
        status: "completed",
        summary: opts.summary,
        findings: opts.review
          ? ["The approved WorkItem outputs and root verification evidence are complete."]
          : [],
        uncertainty: [],
        canonical_binding: workOrder.canonical_binding,
        ...(opts.canonical_plan ? { canonical_plan: opts.canonical_plan } : {}),
        ...(opts.outputs
          ? {
              canonical_outputs: opts.outputs.map((id) => ({
                id,
                kind: "source",
                digest: k.kernelDigest({ id, summary: opts.summary }),
              })),
            }
          : {}),
        ...(opts.review ? { review: opts.review } : {}),
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
}

function canonicalPlan() {
  return {
    work_items: [
      {
        id: "first",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["output-first"],
        optional: false,
        execution_requirements: {
          scope_roots: ["src/first.ts"],
          repository_effects: ["source_code"],
          external_effects: [],
          capabilities: ["repository_write", "task.verify"],
          resources: [],
        },
        contract: {
          role: "EXECUTOR" as const,
          objective: "Create the first implementation artifact.",
          acceptance_criteria: ["The first implementation file is valid."],
          verification_commands: [DETERMINISTIC_CHECK],
        },
      },
      {
        id: "second",
        depends_on: ["first"],
        required_inputs: ["output-first"],
        expected_outputs: ["output-second"],
        optional: false,
        execution_requirements: {
          scope_roots: ["src/second.ts", "src/second.ok"],
          repository_effects: ["source_code"],
          external_effects: [],
          capabilities: ["repository_write", "task.verify"],
          resources: [],
        },
        contract: {
          role: "EXECUTOR" as const,
          objective: "Create the dependent implementation artifact.",
          acceptance_criteria: ["The dependent implementation file is valid."],
          verification_commands: [DETERMINISTIC_CHECK],
        },
      },
    ],
  };
}

function branchPlan() {
  return {
    work_items: [
      {
        id: "branch-change",
        depends_on: [],
        required_inputs: [],
        expected_outputs: ["branch-output"],
        optional: false,
        execution_requirements: {
          scope_roots: ["src/branch.ts"],
          repository_effects: ["source_code"],
          external_effects: [],
          capabilities: ["repository_write"],
          resources: [],
        },
        contract: {
          role: "EXECUTOR" as const,
          objective: "Create the scoped branch implementation artifact.",
          acceptance_criteria: ["The task runs in its admitted branch worktree."],
          verification_commands: [BRANCH_CHECK],
        },
      },
    ],
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
    await writeResult(planning, {
      summary: "Create the first file, then the dependent second file, and verify the root result.",
      canonical_plan: canonicalPlan(),
    });
    const approval = await resume(root, planning);
    expect(approval.action.kind).toBe("approval_required");
    const freshApproval = (await runJson(root, [
      "task",
      "advance",
      taskId,
      "--agent-json",
    ])) as Packet;
    expect(freshApproval.action.kind).toBe("approval_required");
    await runCommand(root, ["task", "plan", "approve", taskId, "--by", "USER"]);
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: approve task-centric plan"], {
      cwd: root,
    });

    const first = await requestSemanticPacket(root, taskId);
    const firstWorkOrder = await readWorkOrder(first);
    expect(firstWorkOrder.task.work_item_id).toBe("first");
    expect(first.authority?.role).toBe("EXECUTOR");
    const checkout = firstWorkOrder.state_fingerprint.worktree;
    await mkdir(path.join(checkout, "src"), { recursive: true });
    await writeFile(path.join(checkout, "src", "first.ts"), "export const first = 1;\n", "utf8");
    await writeResult(first, {
      summary: "Created the first WorkItem output.",
      outputs: ["output-first"],
    });
    const firstInspection = await resume(checkout, first);
    const firstInspectionWorkOrder = await readWorkOrder(firstInspection);
    expect(firstInspectionWorkOrder.task.work_item_id).toBe("first");
    expect(firstInspection.authority?.role).toBe("EVALUATOR");
    await writeResult(firstInspection, {
      summary: "The first WorkItem satisfies its approved contract.",
      review: {
        verdict: "pass",
        missing_tests: [],
        hidden_assumptions: [],
        residual_risks: [],
      },
    });
    const second = await resume(checkout, firstInspection);
    const secondWorkOrder = await readWorkOrder(second);
    expect(secondWorkOrder.task.work_item_id).toBe("second");
    expect(second.authority?.role).toBe("EXECUTOR");

    await writeFile(path.join(checkout, "src", "second.ts"), "export const second = 2;\n", "utf8");
    await writeResult(second, {
      summary: "Created the dependent output with a deterministic defect.",
      outputs: ["output-second"],
    });
    const repair = await resume(checkout, second);
    const repairWorkOrder = await readWorkOrder(repair);
    expect(repairWorkOrder.task.work_item_id).toBe("second");
    expect(repair.authority?.role).toBe("EXECUTOR");
    await writeFile(path.join(checkout, "src", "second.ok"), "validated\n", "utf8");
    await writeResult(repair, {
      summary: "Repaired the deterministic validation failure.",
      outputs: ["output-second"],
    });
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
    const kernelRecord = (frontmatter.extensions as Record<string, unknown>).task_kernel as {
      aggregate: TaskAggregate;
    };
    const aggregate = kernelRecord.aggregate;
    expect(frontmatter.status).toBe("DONE");
    expect(aggregate).toMatchObject({
      state: "COMPLETED",
      current_plan: { state: "APPROVED" },
      final_validation: { status: "PASSED" },
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

  it("projects canonical approval and prepares the admitted branch worktree", async () => {
    const root = await mkTempDir();
    await runCommand(root, ["init", "--workflow", "branch_pr", "--yes"]);
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(path.join(root, "scripts", "check-branch-task.mjs"), "process.exit(0);\n");
    await execFileAsync("git", ["add", "scripts/check-branch-task.mjs"], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "test: add branch check"], {
      cwd: root,
    });
    const created = await runJson(root, [
      "task",
      "create",
      "Prepare a title slug branch worktree",
      "--description",
      "Prove public canonical approval and branch worktree bootstrap.",
      "--verify",
      BRANCH_CHECK,
      "--json",
    ]);
    const taskId = String(created.task_id);
    const planning = (await runJson(root, ["task", "advance", taskId, "--agent-json"])) as Packet;
    expect(planning.authority?.role).toBe("PLANNER");
    await writeResult(planning, {
      summary: "Create one scoped artifact in the admitted task worktree.",
      canonical_plan: branchPlan(),
    });
    const approval = await resume(root, planning);
    expect(approval.action.kind).toBe("approval_required");
    await runCommand(root, ["task", "plan", "approve", taskId, "--by", "USER"]);

    const taskReadme = path.join(root, ".agentplane", "tasks", taskId, "README.md");
    const taskText = await readFile(taskReadme, "utf8");
    const task = parseTaskReadme(taskText);
    expect(task.frontmatter.plan_approval).toMatchObject({ state: "approved" });
    expect(taskText).toContain("1. Execute approved WorkItem branch-change.");
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "--no-verify", "-m", "test: approve branch task"], {
      cwd: root,
    });

    const prepared = await requestSemanticPacket(root, taskId);
    expect(prepared.action).toMatchObject({
      kind: "external_wait",
      reason: "canonical_worktree_prepared",
    });
    const checkout = prepared.action.must_run_from;
    expect(checkout).toBeTruthy();
    const branchResult = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: checkout,
    });
    const branch = branchResult.stdout.trim();
    expect(branch).toContain(`task/${taskId}/prepare-a-title-slug-branch-worktree`);
    expect(branch).not.toContain("/canonical-");
    const preparedReadme = await readFile(
      path.join(checkout!, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(preparedReadme).toContain("1. Execute approved WorkItem branch-change.");
  });
});
