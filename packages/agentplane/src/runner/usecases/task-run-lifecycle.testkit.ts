import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { captureStdIO, runCliSilent } from "@agentplane/testkit";
import { gitRevParse } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  taskCentricDigest,
  withTaskCentricAggregate,
  type ValidationPlan,
} from "@agentplaneorg/core/tasks";
import { expect } from "vitest";

import { loadPolicyTemplates } from "../../agents/agents-template.js";
import { runCli } from "../../cli/run-cli.js";
import type { CommandContext } from "../../commands/shared/task-backend.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { loadTaskCommandContext } from "../../runtime/task-execution-context/index.js";
import {
  allocateTaskWorkspace,
  releaseWorkspaceLease,
} from "../../runtime/workspace-allocation/index.js";
import type { RunnerDangerFullAccessAuthority } from "../types.js";

import { runnerReplayDangerAuthoritySource } from "./task-run-lifecycle-shared.js";
import type { PreparedTaskRunnerExecution } from "./task-run.js";

export const INITIAL_DANGER_AUTHORITY = {
  danger_full_access_authorized: true,
  provenance: "explicit_operator",
  source: "task run --allow-danger-full-access",
} as const satisfies RunnerDangerFullAccessAuthority;

export function replayDangerAuthority(action: "resume" | "retry"): RunnerDangerFullAccessAuthority {
  return {
    danger_full_access_authorized: true,
    provenance: "explicit_operator",
    source: runnerReplayDangerAuthoritySource(action),
  };
}

export function sha256(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export async function initializeRunnerPolicyFixture(root: string): Promise<void> {
  const policyRoot = path.join(root, ".agentplane", "policy");
  await mkdir(policyRoot, { recursive: true });
  for (const template of await loadPolicyTemplates()) {
    const target = path.join(policyRoot, template.relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    try {
      await writeFile(target, template.contents, { encoding: "utf8", flag: "wx" });
    } catch (error) {
      if ((error as NodeJS.ErrnoException | null)?.code !== "EEXIST") throw error;
    }
  }
}

export async function materializeRunnerTaskWorkItemFixture(opts: {
  root: string;
  task_id: string;
  objective: string;
}): Promise<void> {
  await execFileAsync("git", ["add", "-f", "-A"], { cwd: opts.root });
  await execFileAsync(
    "git",
    ["commit", "--allow-empty", "--no-verify", "-m", `test: seed runner fixture ${opts.task_id}`],
    { cwd: opts.root },
  );
  const commandCtx = await loadCommandContext({ cwd: opts.root, rootOverride: opts.root });
  const rawTask = await commandCtx.taskBackend.getTask(opts.task_id);
  if (!rawTask) throw new Error(`Task not found after runner fixture creation: ${opts.task_id}`);
  const now = "2026-08-22T00:00:00.000Z";
  const validation: ValidationPlan = {
    schema_version: 1,
    criteria: [
      {
        id: "runner-fixture-ready",
        description: "The runner fixture completes its bounded semantic episode.",
        required: true,
        check_ids: ["runner-fixture-check"],
      },
    ],
    checks: [
      {
        id: "runner-fixture-check",
        kind: "structural",
        required: true,
        capability: "task.run",
      },
    ],
    evidence_fingerprint: taskCentricDigest({
      task_id: opts.task_id,
      kind: "runner-fixture",
    }),
  };
  const baseline = createRepositorySnapshot({
    git: { kind: "commit", sha: await gitRevParse(opts.root, ["HEAD"]), ref: "main" },
    dirty_paths: [],
    policy_digest: null,
    config_digest: null,
    context_digest: null,
    task_history_cursor: null,
    captured_at: now,
  });
  const proposal = {
    schema_version: 1 as const,
    task_id: opts.task_id,
    planning_baseline: baseline,
    work_items: {
      schema_version: 1 as const,
      work_items: [
        {
          id: "runner-fixture",
          objective: opts.objective,
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["runner-fixture-output"],
          scope_roots: ["."],
          acceptance_criteria: validation.criteria,
          validation,
          context: {
            required_sources: ["repository"],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 16_384,
          },
          risk: "low" as const,
          capabilities: ["task.run"],
          resource_claims: [{ kind: "workspace" as const, resource: ".", mode: "write" as const }],
          optional: false,
          priority: 1,
        },
      ],
    },
    assumptions: [],
    unresolved_questions: [],
    top_level_validation: validation,
  };
  const pendingPlan = createTaskPlanRevision({ proposal, revision: 1, created_at: now });
  const plan = approveTaskPlan({
    plan: pendingPlan,
    expected_digest: pendingPlan.digest,
    actor: "ORCHESTRATOR",
    approved_at: now,
  });
  const legacy = createLegacyTaskAggregate({
    id: opts.task_id,
    revision: rawTask.revision ?? 1,
    title: rawTask.title,
    description: rawTask.description,
    status: "DOING",
    acceptance_criteria: rawTask.verify ?? [],
    captured_at: now,
    updated_at: now,
  });
  const aggregate = materializeApprovedWorkItems({
    task: { ...legacy, current_plan: plan },
    plan,
    now,
  });
  await commandCtx.taskBackend.writeTask(
    {
      ...rawTask,
      status: "DOING",
      extensions: withTaskCentricAggregate(rawTask.extensions, aggregate),
    },
    { expectedRevision: rawTask.revision ?? 1 },
  );
  const taskCommand = await loadTaskCommandContext({
    ctx: commandCtx,
    taskIds: [opts.task_id],
  });
  if (taskCommand.execution.selected_mode !== "direct") return;
  const allocation = await allocateTaskWorkspace({
    ctx: taskCommand.command,
    execution: taskCommand.execution,
  });
  await releaseWorkspaceLease(allocation.lease);
}

export async function createDoingRunnerTask(opts: {
  root: string;
  title: string;
  plan_text: string;
  structured_work_item?: boolean;
}): Promise<string> {
  await initializeRunnerPolicyFixture(opts.root);
  let taskId = "";
  {
    const io = captureStdIO();
    try {
      const code = await runCli([
        "task",
        "new",
        "--title",
        opts.title,
        "--description",
        opts.title,
        "--owner",
        "CODER",
        "--tag",
        "docs",
        "--root",
        opts.root,
      ]);
      expect(code).toBe(0);
      taskId = io.stdout.trim();
    } finally {
      io.restore();
    }
  }
  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    opts.plan_text,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    opts.root,
  ]);
  await runCliSilent([
    "task",
    "plan",
    "approve",
    taskId,
    "--by",
    "ORCHESTRATOR",
    "--root",
    opts.root,
  ]);
  const commandCtx = await loadCommandContext({
    cwd: opts.root,
    rootOverride: opts.root,
  });
  const task = await commandCtx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await commandCtx.taskBackend.writeTask({
    ...task,
    id: taskId,
    title: opts.title,
    description: opts.title,
    priority: task?.priority ?? "med",
    owner: task?.owner ?? "CODER",
    depends_on: task?.depends_on ?? [],
    tags: task?.tags ?? ["docs"],
    verify: task?.verify ?? [],
    status: "DOING",
  });
  if (opts.structured_work_item === true) {
    await materializeRunnerTaskWorkItemFixture({
      root: opts.root,
      task_id: taskId,
      objective: opts.plan_text,
    });
  }
  return taskId;
}

export async function recordFailedExternalRunnerAnchor(opts: {
  ctx: CommandContext;
  taskId: string;
  prepared: PreparedTaskRunnerExecution;
  updatedAt: string;
}): Promise<void> {
  const task = await opts.ctx.taskBackend.getTask(opts.taskId);
  if (!task) throw new Error(`Task not found: ${opts.taskId}`);
  await opts.ctx.taskBackend.writeTask({
    ...task,
    runner: {
      run_id: opts.prepared.invocation.run_id,
      status: "failed",
      adapter_id: opts.prepared.invocation.adapter_id,
      mode: "execute",
      updated_at: opts.updatedAt,
      exit_code: 1,
      target: structuredClone(opts.prepared.bundle.target),
      summary: "Externally recorded failed runner source.",
    },
  });
}
