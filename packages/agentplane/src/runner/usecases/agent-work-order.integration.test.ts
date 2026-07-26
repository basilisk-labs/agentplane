import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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
};

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

async function createPreparedTask(root: string): Promise<string> {
  await writeConfig(root, defaultConfig());
  return await createDoingRunnerTask({
    root,
    title: "Canonical AgentWorkOrder surface fixture",
    plan_text: "Prepare one canonical AgentWorkOrder for every CLI surface.",
  });
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
  it("renders one canonical work order through brief, next-action, runner, and Hermes", async () => {
    const root = await mkGitRepoRoot();
    const taskId = await createPreparedTask(root);
    const commandCtx = await loadCommandContext({ cwd: root, rootOverride: root });

    const brief = (await captureJsonRun([
      "task",
      "brief",
      taskId,
      "--json",
      "--root",
      root,
    ])) as WorkOrderView & { contract: unknown };
    const nextAction = (await captureJsonRun([
      "task",
      "next-action",
      taskId,
      "--json",
      "--root",
      root,
    ])) as WorkOrderView & { workflowStep: unknown };
    const hermes = (await routePacket({
      ctx: commandCtx,
      cwd: root,
      rootOverride: root,
      taskId,
      includeRemote: false,
    })) as WorkOrderView;
    const runner = await prepareTaskRunnerExecution({
      ctx: commandCtx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "dry_run",
      run_id: "work-order-surface-fixture",
    });
    const runnerView: WorkOrderView = {
      work_order: runner.bundle.work_order!,
      work_order_preparation: runner.bundle.work_order_preparation!,
    };

    const expected = canonicalWorkOrderSignature(brief);
    expect(canonicalWorkOrderSignature(nextAction)).toEqual(expected);
    expect(canonicalWorkOrderSignature(hermes)).toEqual(expected);
    expect(canonicalWorkOrderSignature(runnerView)).toEqual(expected);

    // V1 remains an explicit outer compatibility view; the embedded V2 surface has one casing.
    expect(brief.contract).toBeTruthy();
    expect(nextAction.workflowStep).toBeTruthy();
    for (const view of [brief, nextAction, hermes, runnerView]) {
      expectSnakeCaseOnly(view.work_order);
      expectSnakeCaseOnly(view.work_order_preparation);
    }
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
        includeRemote: false,
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
    const frozenTitle = taskPrepared.task_envelope.task.data.title;
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
