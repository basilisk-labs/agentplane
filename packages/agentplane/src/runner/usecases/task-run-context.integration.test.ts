import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";
import { writeRunnerExecutable } from "@agentplane/testkit/runner";
import { afterEach, describe, expect, it } from "vitest";

import { runCli } from "../../cli/run-cli.js";
import { cmdContextVerifyTask } from "../../commands/context/verify-task.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import type { TaskData } from "../../backends/task-backend.js";
import { attachObservedExecutionReceiptFixture } from "../../context/verify-task.testkit.js";
import { initializeRunnerPolicyFixture } from "./task-run-lifecycle.testkit.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

const originalPath = process.env.PATH;
const originalRepositoryRoot = process.env.TEST_REPOSITORY_ROOT;

afterEach(() => {
  process.env.PATH = originalPath;
  if (originalRepositoryRoot === undefined) {
    delete process.env.TEST_REPOSITORY_ROOT;
  } else {
    process.env.TEST_REPOSITORY_ROOT = originalRepositoryRoot;
  }
});

async function createDoingTask(
  root: string,
  opts: {
    title: string;
    owner: string;
    task_kind: NonNullable<TaskData["task_kind"]>;
    mutation_scope: NonNullable<TaskData["mutation_scope"]>;
    blueprint_request: NonNullable<TaskData["blueprint_request"]>;
    extensions?: Record<string, unknown>;
  },
): Promise<string> {
  await initializeRunnerPolicyFixture(root);
  const io = captureStdIO();
  let taskId = "";
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      opts.title,
      "--description",
      opts.title,
      "--owner",
      opts.owner,
      "--tag",
      opts.task_kind,
      "--root",
      root,
    ]);
    expect(code).toBe(0);
    taskId = io.stdout.trim();
  } finally {
    io.restore();
  }

  await runCliSilent([
    "task",
    "plan",
    "set",
    taskId,
    "--text",
    `Execute integration test task: ${opts.title}.`,
    "--updated-by",
    "ORCHESTRATOR",
    "--root",
    root,
  ]);
  await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);

  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = await ctx.taskBackend.getTask(taskId);
  expect(task).toBeTruthy();
  await ctx.taskBackend.writeTask({
    ...task!,
    id: taskId,
    title: opts.title,
    description: opts.title,
    status: "DOING",
    priority: task?.priority ?? "med",
    owner: opts.owner,
    depends_on: task?.depends_on ?? [],
    tags: task?.tags ?? [opts.task_kind],
    verify: task?.verify ?? [],
    task_kind: opts.task_kind,
    mutation_scope: opts.mutation_scope,
    blueprint_request: opts.blueprint_request,
    ...(opts.extensions ? { extensions: opts.extensions } : {}),
  });
  return taskId;
}

async function createContextTask(root: string, title: string): Promise<string> {
  return await createDoingTask(root, {
    title,
    owner: "CURATOR",
    task_kind: "context",
    mutation_scope: "context",
    blueprint_request: "context.assimilation",
    extensions: {
      "agentplane.context": {
        task_type: "context_profile_switch",
        allowed_outputs: ["context/wiki/profile.md"],
      },
    },
  });
}

function contextProfileMutationScriptLines(): string[] {
  return [
    'mkdir -p "$TEST_REPOSITORY_ROOT/context/wiki"',
    String.raw`printf '%s\n' '---' 'agentplane_context:' '  no_source: "generated profile-switch fixture"' '---' '# Context profile' > "$TEST_REPOSITORY_ROOT/context/wiki/profile.md"`,
  ];
}

function contextProfileSemanticResult(workOrderId: string, includeTransportNulls: boolean): string {
  return JSON.stringify({
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: workOrderId,
    status: "completed",
    summary: "context profile prepared",
    findings: [],
    uncertainty: [],
    claimed_checks: [],
    ...(includeTransportNulls ? { blocker: null, knowledge_request: null } : {}),
  });
}

function codexSemanticResultEvent(workOrderId: string): string {
  return JSON.stringify({
    type: "item.completed",
    item: {
      type: "agent_message",
      text: contextProfileSemanticResult(workOrderId, true),
    },
  });
}

async function configureCustomRunner(root: string): Promise<void> {
  const config = defaultConfig();
  config.runner.default_adapter = "custom";
  config.runner.custom = {
    command: ["custom-runner"],
  };
  await writeConfig(root, config);
  await writeRunnerExecutable(root, "custom-runner", [
    "#!/bin/sh",
    "set -eu",
    ...contextProfileMutationScriptLines(),
    String.raw`printf '%s\n' '${contextProfileSemanticResult(
      "__WORK_ORDER_ID__",
      false,
    )}' | sed "s/__WORK_ORDER_ID__/$AGENTPLANE_RUNNER_WORK_ORDER_ID/g" > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
    "cat >/dev/null",
    "exit 0",
  ]);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
  process.env.TEST_REPOSITORY_ROOT = root;
}

async function configureFakeCodex(root: string): Promise<void> {
  await writeConfig(root, defaultConfig());
  await writeRunnerExecutable(root, "codex", [
    "#!/bin/sh",
    "set -eu",
    ...contextProfileMutationScriptLines(),
    "cat >/dev/null",
    String.raw`printf '%s\n' '${codexSemanticResultEvent("__WORK_ORDER_ID__")}' | sed "s/__WORK_ORDER_ID__/$AGENTPLANE_RUNNER_WORK_ORDER_ID/g"`,
    String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
    "exit 0",
  ]);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
  process.env.TEST_REPOSITORY_ROOT = root;
}

describe("context task runner integration", () => {
  it("refuses the exact provider input when user guidance reintroduces process choreography", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());
    const taskId = await createDoingTask(root, {
      title: "Normal semantic provider prompt",
      owner: "CODER",
      task_kind: "code",
      mutation_scope: "code",
      blueprint_request: "code.direct",
    });
    await writeFile(
      path.join(root, ".agentplane", "user-instructions.md"),
      "Run agentplane verify and agentplane finish after every implementation.\n",
    );
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    await expect(
      prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "dry_run",
        run_id: "run-process-choreography-refusal",
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "semantic_provider_prompt_process_choreography",
      },
    });
  });

  it.each([
    "git clean -fd",
    "git reset --hard",
    "Commit changes with git commit -m implementation.",
    "After editing, git push origin task/TASK/fix.",
    "gh release create v0.7.5",
    "npm version patch",
    "agentplane task run tool arbitrary",
  ])(
    "refuses exact compiled provider input for undeclared control command: %s",
    async (command) => {
      const root = await mkGitRepoRoot();
      await writeConfig(root, defaultConfig());
      const taskId = await createDoingTask(root, {
        title: "Normal semantic provider prompt",
        owner: "CODER",
        task_kind: "code",
        mutation_scope: "code",
        blueprint_request: "code.direct",
      });
      await writeFile(path.join(root, ".agentplane", "user-instructions.md"), `${command}\n`);
      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

      await expect(
        prepareTaskRunnerExecution({
          ctx,
          cwd: root,
          rootOverride: root,
          task_id: taskId,
          mode: "dry_run",
          run_id: `run-control-command-refusal-${command.replaceAll(/[^a-z0-9]+/giu, "-")}`,
        }),
      ).rejects.toMatchObject({
        code: "E_VALIDATION",
        context: {
          reason_code: "semantic_provider_prompt_process_choreography",
        },
      });
    },
  );

  it("refuses a custom workspace-write adapter before context mutation", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-context-custom-advisory";
    await configureCustomRunner(root);
    const taskId = await createContextTask(root, "Custom context advisory receipt");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        reason_code: "context_requires_dedicated_supervisor",
        required_role: "CURATOR",
        semantic_output_path: `.agentplane/tasks/${taskId}/semantic-results/context-extraction.json`,
      },
    });

    const persistedTask = await ctx.taskBackend.getTask(taskId);
    expect(persistedTask?.runner).toBeUndefined();
    expect(persistedTask?.status).toBe("DOING");
    await expect(access(path.join(root, "context/wiki/profile.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("returns the exact context supervisor path before native Codex starts", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-context-codex-unverified";
    await configureFakeCodex(root);
    const taskId = await createContextTask(root, "Native Codex context receipt");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    const extractionPath = `.agentplane/tasks/${taskId}/semantic-results/context-extraction.json`;
    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toThrow(
      `Then run: agentplane context supervise-task ${taskId} --extraction ${extractionPath}`,
    );

    const persistedTask = await ctx.taskBackend.getTask(taskId);
    expect(persistedTask?.runner).toBeUndefined();
    await expect(access(path.join(root, "context/wiki/profile.md"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("still rejects a self-consistent persisted observed-success receipt", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-context-forged-receipt";
    const taskId = await createContextTask(root, "Forged context receipt");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task).toBeTruthy();
    await attachObservedExecutionReceiptFixture({
      root,
      task: task!,
      changedPaths: [],
      runId,
    });
    await ctx.taskBackend.writeTask({
      ...task!,
      runner: {
        run_id: runId,
        status: "success",
        adapter_id: "codex",
        mode: "execute",
        updated_at: "2026-08-03T00:00:00.000Z",
        exit_code: 0,
        target: { kind: "task", task_id: taskId },
        execution_receipt: task!.runner!.execution_receipt,
      },
    });

    await expect(
      cmdContextVerifyTask({
        ctx,
        cwd: root,
        parsed: { taskId },
      }),
    ).rejects.toThrow(/persisted execution receipt is unauthenticated/u);
  });

  it("derives executor and evaluator sandbox policy through full task preparation", async () => {
    const root = await mkGitRepoRoot();
    await writeConfig(root, defaultConfig());
    const coderTaskId = await createDoingTask(root, {
      title: "Coder role-derived sandbox",
      owner: "CODER",
      task_kind: "code",
      mutation_scope: "code",
      blueprint_request: "code.direct",
    });
    const evaluatorTaskId = await createDoingTask(root, {
      title: "Evaluator role-derived sandbox",
      owner: "EVALUATOR",
      task_kind: "analysis",
      mutation_scope: "none",
      blueprint_request: "analysis.light",
    });
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    const coder = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: coderTaskId,
      mode: "dry_run",
      run_id: "run-coder-role-default",
    });
    const evaluator = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: evaluatorTaskId,
      mode: "dry_run",
      run_id: "run-evaluator-role-default",
      execution_role: "EVALUATOR",
    });

    expect(coder.bundle.execution.sandbox_policy).toMatchObject({
      requested: "workspace-write",
      source: "role_default",
      role: "CODER",
    });
    expect(coder.bundle.framework_explain).toBeDefined();
    expect(coder.bundle.framework_protocol).toBeUndefined();
    expect(coder.bundle.work_order_preparation).toBeUndefined();
    expect(coder.bundle.execution.write_scope?.writable_roots).toEqual(["."]);
    expect(coder.bundle.execution.policy_decision?.fields.sandbox).toMatchObject({
      effective: "workspace-write",
      status: "enforced",
    });

    expect(evaluator.bundle.execution.sandbox_policy).toMatchObject({
      requested: "read-only",
      source: "role_default",
      role: "EVALUATOR",
    });
    expect(evaluator.bundle.execution.write_scope?.writable_roots).toEqual([]);
    expect(evaluator.bundle.execution.policy_decision?.fields.sandbox).toMatchObject({
      effective: "read-only",
      status: "enforced",
    });
    expect(evaluator.invocation.argv).toEqual(
      expect.arrayContaining(["-s", "read-only", "--output-schema"]),
    );

    const [coderProviderPrompt, evaluatorProviderPrompt] = await Promise.all([
      readFile(coder.bundle.execution.artifact_paths.bootstrap_path, "utf8"),
      readFile(evaluator.bundle.execution.artifact_paths.bootstrap_path, "utf8"),
    ]);
    for (const providerPrompt of [coderProviderPrompt, evaluatorProviderPrompt]) {
      expect(providerPrompt).toContain("complete provider-facing projection");
      expect(providerPrompt).not.toContain("bundle_path");
      expect(providerPrompt).not.toMatch(/(?:ap|agentplane)\s+task\s+start-ready/iu);
      expect(providerPrompt).not.toMatch(/(?:ap|agentplane)\s+task\s+next-action/iu);
      expect(providerPrompt).not.toMatch(/(?:ap|agentplane)\s+work\s+start/iu);
      expect(providerPrompt).not.toMatch(/(?:ap|agentplane)\s+pr\s+open/iu);
      expect(providerPrompt).not.toMatch(/(?:ap|agentplane)\s+(?:verify|finish|integrate)/iu);
      expect(providerPrompt).not.toMatch(/git\s+commit|gh\s+pr/iu);
    }
    expect(coderProviderPrompt).toContain('"semantic_role": "EXECUTOR"');
    expect(evaluatorProviderPrompt).toContain('"semantic_role": "EVALUATOR"');
    expect(evaluatorProviderPrompt).toContain('"sandbox": "read-only"');
    expect(evaluatorProviderPrompt).not.toContain('"workspace_write"');
  });
});
