import { execFile } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, expect } from "vitest";
import { parseTaskReadme } from "@agentplaneorg/core/tasks";
import { captureStdIO } from "@agentplane/testkit";

import { runCli } from "./run-cli.js";
import type { TaskExecutionDeclaration, TaskPlanProposal } from "@agentplaneorg/core/tasks";
import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { RUNTIME_GITIGNORE_LINES } from "../runtime/shared/runtime-artifacts.js";

const execFileAsync = promisify(execFile);
const originalGhBin = process.env.AGENTPLANE_GH_BIN;
const originalGhArgs = process.env.AGENTPLANE_GH_ARGS;

afterEach(() => {
  if (originalGhBin === undefined) delete process.env.AGENTPLANE_GH_BIN;
  else process.env.AGENTPLANE_GH_BIN = originalGhBin;
  if (originalGhArgs === undefined) delete process.env.AGENTPLANE_GH_ARGS;
  else process.env.AGENTPLANE_GH_ARGS = originalGhArgs;
});

export type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority?: { network: string; required: boolean; role?: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
  };
  operator_action?: {
    kind: string;
    cwd: string | null;
    argv: string[] | null;
  };
};

export type ScenarioMetrics = {
  control_plane_commands: number;
  approval_boundaries: number;
  lifecycle_transitions: number;
  verification_time_ms: number;
  work_preserved: boolean;
  recovery_commands: number;
};

export async function describePacketEvidence(packet: AgentPacket): Promise<string> {
  if (!packet.exchange) return JSON.stringify(packet);
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const checks = await readFile(
    path.join(
      workOrder.state_fingerprint.worktree,
      ".agentplane",
      "tasks",
      packet.task_id,
      "supervision",
      "declared-checks.json",
    ),
    "utf8",
  ).catch(() => "no declared check evidence");
  return JSON.stringify({ packet, checks });
}

export const LOCALIZED_DIRECT_REFERENCE = {
  control_plane_commands: 7,
  approval_boundaries: 1,
  lifecycle_transitions: 4,
} as const;

export function scenarioMetrics(): ScenarioMetrics {
  return {
    control_plane_commands: 0,
    approval_boundaries: 0,
    lifecycle_transitions: 0,
    verification_time_ms: 0,
    work_preserved: false,
    recovery_commands: 0,
  };
}

function observeCommand(
  metrics: ScenarioMetrics | undefined,
  argv: readonly string[],
  payload?: Record<string, unknown>,
  elapsedMs = 0,
): void {
  if (!metrics) return;
  metrics.control_plane_commands += 1;
  if ((payload?.action as { kind?: string } | undefined)?.kind === "approval_required") {
    metrics.approval_boundaries += 1;
  }
  if (argv[0] === "verify") metrics.verification_time_ms += elapsedMs;
  if (argv.some((part) => ["reclaim", "reconcile", "repair"].includes(part))) {
    metrics.recovery_commands += 1;
  }
}

export async function runJson(
  root: string,
  argv: string[],
  metrics?: ScenarioMetrics,
): Promise<Record<string, unknown>> {
  const io = captureStdIO();
  const startedAt = performance.now();
  try {
    const code = await runCli([...argv, "--root", root]);
    const statusResult =
      code === 0 ? undefined : await execFileAsync("git", ["status", "--short"], { cwd: root });
    const status = statusResult?.stdout ?? "";
    expect(code, `${io.stderr}\n${status}`).toBe(0);
    const payload = JSON.parse(io.stdout) as Record<string, unknown>;
    observeCommand(metrics, argv, payload, performance.now() - startedAt);
    return payload;
  } finally {
    io.restore();
  }
}

export async function runCommand(
  root: string,
  argv: string[],
  metrics: ScenarioMetrics,
): Promise<void> {
  const io = captureStdIO();
  const startedAt = performance.now();
  try {
    expect(await runCli([...argv, "--root", root]), io.stderr).toBe(0);
    observeCommand(metrics, argv, undefined, performance.now() - startedAt);
  } finally {
    io.restore();
  }
}

export async function readLifecycleMetrics(
  root: string,
  taskId: string,
  metrics: ScenarioMetrics,
): Promise<Record<string, unknown>> {
  const parsed = parseTaskReadme(
    await readFile(path.join(root, ".agentplane", "tasks", taskId, "README.md"), "utf8"),
  ).frontmatter;
  metrics.lifecycle_transitions = Array.isArray(parsed.events) ? parsed.events.length : 0;
  return parsed;
}

export async function findTaskWorktree(root: string, taskId: string): Promise<string> {
  const { stdout } = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
    cwd: root,
  });
  const worktree = stdout
    .split("\n\n")
    .map((entry) => /^worktree (.+)$/mu.exec(entry)?.[1])
    .find((entry) => entry?.includes(taskId));
  if (!worktree) {
    const route = await runJson(root, ["task", "next-action", taskId, "--explain", "--json"]);
    throw new Error(
      `expected task worktree for ${taskId}\nworktrees=${stdout}\nroute=${JSON.stringify(route, null, 2)}`,
    );
  }
  return worktree;
}

export async function writeFrameworkHarnessGitignore(root: string): Promise<void> {
  const existing = await readFile(path.join(root, ".gitignore"), "utf8").catch(() => "");
  await writeFile(
    path.join(root, ".gitignore"),
    [
      existing.trimEnd(),
      ...RUNTIME_GITIGNORE_LINES,
      ".agentplane/bin",
      ".agentplane/cache.sqlite*",
      "agentplane-recipes",
      "node_modules",
      "packages/agentplane/bin",
      "packages/agentplane/dist",
      "packages/agentplane/package.json",
      "packages/core/dist",
      "packages/core/package.json",
      "packages/recipes/dist",
      "packages/recipes/package.json",
      "website/node_modules",
      "",
    ].join("\n"),
    "utf8",
  );
}

export async function writePlannerResult(opts: {
  packet: AgentPacket;
  summary: string;
  includeIntent: boolean;
  execution?: TaskExecutionDeclaration;
  review?: {
    verdict: "pass" | "rework" | "blocked" | "human_review";
    missing_tests: string[];
    hidden_assumptions: string[];
    residual_risks: string[];
  };
}): Promise<string> {
  const exchange = opts.packet.exchange;
  if (!exchange) throw new Error("expected external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(exchange.directory, exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const execution: TaskExecutionDeclaration = opts.execution ?? {
    schema_version: 2,
    preferred_mode: "direct",
    scope_roots: ["packages/agentplane/src/cli"],
    repository_effects: ["repository_write", "source_code", "tests"],
    external_effects: [],
    requirements_uncertainty: "bounded",
    implementation_uncertainty: "bounded",
    reversibility: "reversible",
    rationale: ["localized parser change with existing tests"],
  };
  let proposal: TaskPlanProposal | undefined;
  if (workOrder.role === "PLANNER" && opts.includeIntent) {
    const baseline = workOrder.planning_context?.repository_snapshot;
    if (!baseline) throw new Error("expected the issued planner repository snapshot");
    const task = parseTaskReadme(
      await readFile(
        path.join(
          workOrder.state_fingerprint.worktree,
          ".agentplane",
          "tasks",
          opts.packet.task_id,
          "README.md",
        ),
        "utf8",
      ),
    ).frontmatter;
    const declaredChecks: unknown = task.verify;
    const commands = Array.isArray(declaredChecks)
      ? declaredChecks.filter((value: unknown): value is string => typeof value === "string")
      : [];
    const checks =
      commands.length > 0
        ? commands.map((command, index) => ({
            id: `task-check-${index + 1}`,
            kind: "deterministic" as const,
            required: true,
            capability: "task.verify",
            command,
          }))
        : [
            {
              id: "task-check",
              kind: "deterministic" as const,
              required: true,
              capability: "task.verify",
            },
          ];
    const criterion = {
      id: "intent-preserved",
      description: opts.summary,
      required: true,
      check_ids: checks.map((check) => check.id),
    };
    const validation = {
      schema_version: 1 as const,
      criteria: [criterion],
      checks,
      evidence_fingerprint: baseline.digest,
    };
    proposal = {
      schema_version: 1,
      task_id: opts.packet.task_id,
      planning_baseline: baseline,
      work_items: {
        schema_version: 1,
        work_items: [
          {
            id: "implement-declared-intent",
            objective: opts.summary,
            depends_on: [],
            required_inputs: [],
            expected_outputs: ["artifact:declared-intent-result"],
            scope_roots: execution.scope_roots,
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
            resource_claims: execution.scope_roots.map((resource) => ({
              kind: "path",
              resource,
              mode: "write",
            })),
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
  const resultPath = path.join(exchange.directory, exchange.result_ref);
  await writeFile(
    resultPath,
    `${JSON.stringify(
      {
        schema_version: 1,
        kind: "agent_action_result",
        task_id: opts.packet.task_id,
        transition_id: opts.packet.transition_id,
        state_fingerprint: opts.packet.state_fingerprint,
        role: workOrder.role,
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: workOrder.work_order_id,
          status: "completed",
          summary: opts.summary,
          findings: opts.review ? ["The frozen implementation satisfies the declared intent."] : [],
          uncertainty: [],
          ...(opts.review ? { review: opts.review } : {}),
          ...(proposal ? { task_plan_proposal: proposal } : {}),
          ...(opts.includeIntent
            ? {
                task_intent: {
                  task_kind: "code",
                  mutation_scope: "code",
                  risk_flags: [],
                  tags: ["cli", "parser"],
                  execution,
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
  return resultPath;
}
