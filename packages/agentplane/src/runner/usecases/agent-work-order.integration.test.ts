import { execFile } from "node:child_process";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  writeConfig,
} from "@agentplane/testkit";
import { describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { projectTaskBriefFromPreparedWorkOrder } from "../../commands/task/brief-model.js";
import { routePacket } from "../../commands/hermes/hermes-runtime.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import {
  evaluatePreparedAgentWorkOrderReadiness,
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "./agent-work-order.js";
import { createDoingRunnerTask } from "./task-run-lifecycle.testkit.js";
import { prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type WorkOrderView = {
  work_order: {
    work_order_id: string;
    state_fingerprint: unknown;
    verification_intent: unknown;
  };
  work_order_preparation: {
    remote_policy: unknown;
    route: unknown;
    source_manifest: unknown;
  };
  execution?: {
    sandbox_policy?: {
      requested?: unknown;
      source?: unknown;
    };
    write_scope?: {
      writable_roots?: unknown;
    };
  };
};

async function captureRunnerWorkOrder(opts: {
  taskId: string;
  root: string;
  remote?: boolean;
}): Promise<WorkOrderView> {
  const prepared = (await captureJsonRun([
    "task",
    "run",
    opts.taskId,
    "--dry-run",
    "--json",
    ...(opts.remote ? ["--remote"] : []),
    "--root",
    opts.root,
  ])) as { bundle_path: string };
  const bundle = JSON.parse(await readFile(prepared.bundle_path, "utf8")) as WorkOrderView;
  return {
    work_order: bundle.work_order,
    work_order_preparation: bundle.work_order_preparation,
    execution: bundle.execution,
  };
}

async function captureJsonRun(argv: string[]): Promise<unknown> {
  const io = captureStdIO();
  try {
    const code = await runCli(argv);
    expect(code).toBe(0);
    return JSON.parse(io.stdout) as unknown;
  } finally {
    io.restore();
  }
}

async function captureFailure(argv: string[]): Promise<{ code: number; stderr: string }> {
  const io = captureStdIO();
  try {
    const code = await runCli(argv);
    return { code, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

async function createPreparedTask(
  root: string,
  workflowMode: "direct" | "branch_pr" = "direct",
): Promise<string> {
  const config = defaultConfig();
  config.workflow_mode = workflowMode;
  await writeConfig(root, config);
  return await createDoingRunnerTask({
    root,
    title: "Canonical AgentWorkOrder surface fixture",
    plan_text: "Prepare one canonical AgentWorkOrder for every CLI surface.",
  });
}

async function createBranchPrTaskWorktree(root: string, taskId: string): Promise<string> {
  await execFileAsync("git", ["add", "-A"], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed canonical work order task"], {
    cwd: root,
  });
  const worktree = path.join(root, ".agentplane", "worktrees", `${taskId}-canonical-work-order`);
  await mkdir(path.dirname(worktree), { recursive: true });
  await execFileAsync(
    "git",
    ["worktree", "add", "-b", `task/${taskId}/canonical-work-order`, worktree],
    { cwd: root },
  );
  return worktree;
}

function canonicalWorkOrderSignature(view: WorkOrderView): object {
  return {
    work_order_id: view.work_order.work_order_id,
    state_fingerprint: view.work_order.state_fingerprint,
    remote_policy: view.work_order_preparation.remote_policy,
    route: view.work_order_preparation.route,
    source_manifest: view.work_order_preparation.source_manifest,
    verification_intent: view.work_order.verification_intent,
  };
}

function expectSnakeCaseOnly(value: unknown): void {
  if (Array.isArray(value)) {
    for (const item of value) expectSnakeCaseOnly(item);
    return;
  }
  if (!value || typeof value !== "object") return;
  for (const [key, nested] of Object.entries(value)) {
    expect(key).not.toMatch(/[A-Z]/u);
    expectSnakeCaseOnly(nested);
  }
}

function duplicatePromptFragment(content: string): Record<string, unknown> {
  return {
    recipe_id: "duplicate-prompt",
    recipe_version: "1.0.0",
    recipe_name: "Duplicate Prompt",
    surface: "planning",
    id: "same-module",
    file: "prompts/same-module.md",
    source: "recipes/duplicate-prompt/prompts/same-module.md",
    order: 0,
    strength: "required",
    content,
  };
}

function duplicatePromptOverlayBundle(): Record<string, unknown> {
  return {
    schema_version: 1,
    kind: "overlay_bundle",
    active: [
      {
        id: "duplicate-prompt",
        version: "1.0.0",
        name: "Duplicate Prompt",
        summary: "Intentional compiler failure fixture.",
      },
    ],
    surfaces: {
      planning: [
        duplicatePromptFragment("first duplicate prompt"),
        duplicatePromptFragment("second duplicate prompt"),
      ],
      execution: [],
      coding: [],
      debugging: [],
      review: [],
      verification: [],
      docs: [],
      finish: [],
    },
    validators: [],
    templates: {},
    agents: [],
    tools: [],
    trace: [],
  };
}

describe("AgentWorkOrder v2 surface integration", () => {
  it("renders one canonical work order through real brief, next-action, runner, and Hermes surfaces", async () => {
    for (const workflowMode of ["direct", "branch_pr"] as const) {
      const root = await mkGitRepoRoot();
      const taskId = await createPreparedTask(root, workflowMode);
      const worktree =
        workflowMode === "branch_pr" ? await createBranchPrTaskWorktree(root, taskId) : root;
      const brief = (await captureJsonRun([
        "task",
        "brief",
        taskId,
        "--json",
        "--root",
        worktree,
      ])) as WorkOrderView & { contract: unknown };
      const nextAction = (await captureJsonRun([
        "task",
        "next-action",
        taskId,
        "--json",
        "--root",
        worktree,
      ])) as WorkOrderView & { workflowStep: unknown };
      const hermes = (await captureJsonRun([
        "hermes",
        "supervise",
        taskId,
        "--json",
        "--root",
        worktree,
      ])) as WorkOrderView;
      const runnerView = await captureRunnerWorkOrder({
        taskId,
        root: worktree,
      });

      const expected = canonicalWorkOrderSignature(brief);
      expect(canonicalWorkOrderSignature(nextAction)).toEqual(expected);
      expect(canonicalWorkOrderSignature(hermes)).toEqual(expected);
      expect(canonicalWorkOrderSignature(runnerView)).toEqual(expected);
      if (workflowMode === "branch_pr") {
        expect(runnerView.execution).toMatchObject({
          sandbox_policy: { requested: "read-only", source: "route_authority" },
          write_scope: { writable_roots: [] },
        });
      }
      for (const view of [brief, nextAction, hermes, runnerView]) {
        expect(view.work_order_preparation.remote_policy).toMatchObject({
          mode: "local",
          requested: false,
        });
      }

      // V1 remains an explicit outer compatibility view; the embedded V2 surface has one casing.
      expect(brief.contract).toBeTruthy();
      expect(nextAction.workflowStep).toBeTruthy();
      for (const view of [brief, nextAction, hermes, runnerView]) {
        expectSnakeCaseOnly(view.work_order);
        expectSnakeCaseOnly(view.work_order_preparation);
      }
    }
  });

  it("uses one explicit remote opt-in through every comparable work-order surface", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createPreparedTask(root, "branch_pr");
    const worktree = await createBranchPrTaskWorktree(root, taskId);

    const brief = (await captureJsonRun([
      "task",
      "brief",
      taskId,
      "--json",
      "--remote",
      "--root",
      worktree,
    ])) as WorkOrderView;
    const nextAction = (await captureJsonRun([
      "task",
      "next-action",
      taskId,
      "--json",
      "--remote",
      "--root",
      worktree,
    ])) as WorkOrderView;
    const hermes = (await captureJsonRun([
      "hermes",
      "supervise",
      taskId,
      "--json",
      "--remote",
      "--root",
      worktree,
    ])) as WorkOrderView;
    const runner = await captureRunnerWorkOrder({ taskId, root: worktree, remote: true });

    const expected = canonicalWorkOrderSignature(brief);
    expect(canonicalWorkOrderSignature(nextAction)).toEqual(expected);
    expect(canonicalWorkOrderSignature(hermes)).toEqual(expected);
    expect(canonicalWorkOrderSignature(runner)).toEqual(expected);
    for (const view of [brief, nextAction, hermes, runner]) {
      expect(view.work_order_preparation.remote_policy).toMatchObject({
        mode: "remote",
        requested: true,
      });
    }
  });

  it("keeps a plan-unapproved route blocked instead of weakening required state components", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createPreparedTask(root);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await commandCtx.taskBackend.getTask(taskId);
    expect(task).toBeTruthy();
    await commandCtx.taskBackend.writeTask({
      ...task!,
      status: "DOING",
      plan_approval: {
        state: "pending",
        updated_at: null,
        updated_by: null,
        note: null,
      },
    });

    const prepared = requirePreparedAgentWorkOrder(
      await prepareAgentWorkOrder({
        command_ctx: commandCtx,
        cwd: root,
        root_override: root,
        task_id: taskId,
      }),
    );
    const readiness = await evaluatePreparedAgentWorkOrderReadiness({
      command_ctx: commandCtx,
      cwd: root,
      root_override: root,
      prepared,
    });

    expect(readiness).toMatchObject({
      status: "rejected",
      rejection: {
        code: "work_order_stale",
        precondition: {
          reason_code: "state_fingerprint_required_component_unavailable",
          unavailable_required_components: ["git", "backend_projection"],
        },
      },
    });
  });

  it("refuses every launch surface before execution when the prompt compiler reports an error", async () => {
    const root = await mkGitRepoRoot();
    await mkdir(path.join(root, ".agentplane", "generated"), { recursive: true });
    await writeFile(
      path.join(root, ".agentplane", "generated", "overlay-bundle.json"),
      `${JSON.stringify(duplicatePromptOverlayBundle(), null, 2)}\n`,
      "utf8",
    );
    const taskId = await createPreparedTask(root);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });

    for (const argv of [
      ["task", "brief", taskId, "--json", "--root", root],
      ["task", "next-action", taskId, "--json", "--root", root],
      ["hermes", "supervise", taskId, "--json", "--root", root],
    ]) {
      const result = await captureFailure(argv);
      expect(result.code).not.toBe(0);
      expect(result.stderr).toContain("Runner prompt module compilation failed");
      expect(result.stderr).toContain("duplicate_module");
    }

    await expect(
      routePacket({
        ctx: commandCtx,
        cwd: root,
        rootOverride: root,
        taskId,
      }),
    ).rejects.toThrow(/Runner prompt module compilation failed/u);
    await expect(
      prepareTaskRunnerExecution({
        ctx: commandCtx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: "work-order-prompt-failure",
      }),
    ).rejects.toThrow(/Runner prompt module compilation failed/u);
    await expect(
      access(path.join(root, ".agentplane", "tasks", taskId, "runs", "work-order-prompt-failure")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("keeps a prepared brief immutable and rejects task, Git, and policy drift before invocation", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createPreparedTask(root);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });

    const prepare = async () =>
      requirePreparedAgentWorkOrder(
        await prepareAgentWorkOrder({
          command_ctx: commandCtx,
          cwd: root,
          root_override: root,
          task_id: taskId,
          include_remote: false,
          include_runner_state: false,
        }),
      );
    const staleAfter = async (prepared: Awaited<ReturnType<typeof prepare>>, component: string) => {
      const readiness = await evaluatePreparedAgentWorkOrderReadiness({
        command_ctx: commandCtx,
        cwd: root,
        root_override: root,
        prepared,
      });
      expect(readiness.status).toBe("rejected");
      if (readiness.status !== "rejected") return;
      expect(readiness.rejection.code).toBe("work_order_stale");
      expect(readiness.rejection.precondition?.reason_code).toBe("state_fingerprint_stale");
      expect(
        readiness.rejection.precondition?.changed_components.some(
          (changed) => changed.component === component,
        ),
      ).toBe(true);
    };

    const taskPrepared = await prepare();
    const frozenTitle = taskPrepared.task_envelope.task.narrative.title;
    const persistedTask = await commandCtx.taskBackend.getTask(taskId);
    expect(persistedTask).toBeTruthy();
    await commandCtx.taskBackend.writeTask({
      ...persistedTask!,
      title: "Changed after AgentWorkOrder preparation",
    });
    expect(projectTaskBriefFromPreparedWorkOrder(taskPrepared).task.title).toBe(frozenTitle);
    await staleAfter(taskPrepared, "task");

    const gitPrepared = await prepare();
    await writeFile(
      path.join(root, "agent-work-order-drift.txt"),
      "changed after preparation\n",
      "utf8",
    );
    await staleAfter(gitPrepared, "git");

    const policyPrepared = await prepare();
    await writeFile(path.join(root, "AGENTS.md"), "# Changed policy after preparation\n", "utf8");
    await staleAfter(policyPrepared, "policy");
  });
});
