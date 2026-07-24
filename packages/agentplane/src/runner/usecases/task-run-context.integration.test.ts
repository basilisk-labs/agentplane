import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { defaultConfig } from "@agentplaneorg/core/config";
import { EXECUTION_RECEIPT_V2_VALID_FIXTURE } from "@agentplaneorg/core/schemas";
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
import { resolveSupervisorExecutionReceiptLocator } from "../task-run-paths.js";
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

function contextProfileSemanticResult(runId: string, includeTransportNulls: boolean): string {
  return JSON.stringify({
    schema_version: 2,
    kind: "agent_semantic_result",
    work_order_id: runId,
    status: "completed",
    summary: "context profile prepared",
    findings: [],
    uncertainty: [],
    claimed_checks: [],
    ...(includeTransportNulls ? { blocker: null, knowledge_request: null } : {}),
  });
}

function codexSemanticResultEvent(runId: string): string {
  return JSON.stringify({
    type: "item.completed",
    item: {
      type: "agent_message",
      text: contextProfileSemanticResult(runId, true),
    },
  });
}

async function configureCustomRunner(root: string, runId: string): Promise<void> {
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
      runId,
      false,
    )}' > "$AGENTPLANE_RUNNER_RESULT_PATH"`,
    "cat >/dev/null",
    "exit 0",
  ]);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
  process.env.TEST_REPOSITORY_ROOT = root;
}

async function configureFakeCodex(root: string, runId: string): Promise<void> {
  await writeConfig(root, defaultConfig());
  await writeRunnerExecutable(root, "codex", [
    "#!/bin/sh",
    "set -eu",
    ...contextProfileMutationScriptLines(),
    "cat >/dev/null",
    String.raw`printf '%s\n' '${codexSemanticResultEvent(runId)}'`,
    String.raw`printf '%s\n' '{"type":"turn.completed"}'`,
    "exit 0",
  ]);
  process.env.PATH = `${path.join(root, "bin")}${path.delimiter}${process.env.PATH ?? ""}`;
  process.env.TEST_REPOSITORY_ROOT = root;
}

async function readPersistedReceipt(
  root: string,
  receiptPath: string,
): Promise<{
  observed_by?: string;
  success_policy?: { outcome?: string; reasons?: string[] };
  scope_evaluation?: {
    state?: string;
    mutation_scope?: string | null;
    writable_roots?: string[];
    violations?: unknown[];
  };
  checks?: { id?: string; required?: boolean; status?: string; details?: string }[];
  process?: {
    process_tree?: {
      containment_state?: string;
      containment_limitation?: string | null;
    };
  };
}> {
  const resolvedReceiptPath = receiptPath.startsWith("agentplane-run:")
    ? await resolveSupervisorExecutionReceiptLocator({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        locator: receiptPath,
      })
    : path.isAbsolute(receiptPath)
      ? receiptPath
      : path.join(root, receiptPath);
  return JSON.parse(await readFile(resolvedReceiptPath, "utf8")) as {
    observed_by?: string;
    success_policy?: { outcome?: string; reasons?: string[] };
    scope_evaluation?: {
      state?: string;
      mutation_scope?: string | null;
      writable_roots?: string[];
      violations?: unknown[];
    };
    checks?: { id?: string; required?: boolean; status?: string; details?: string }[];
    process?: {
      process_tree?: {
        containment_state?: string;
        containment_limitation?: string | null;
      };
    };
  };
}

describe("context task runner integration", () => {
  it("keeps trust unverified when a custom adapter only carries workspace-write as advisory", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-context-custom-advisory";
    await configureCustomRunner(root, runId);
    const taskId = await createContextTask(root, "Custom context advisory receipt");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    expect(executed.bundle.execution.sandbox_policy).toMatchObject({
      requested: "workspace-write",
      source: "role_default",
      role: "CURATOR",
    });
    expect(executed.bundle.task?.data.owner).toBe("CURATOR");
    expect(executed.bundle.execution.write_scope).toMatchObject({
      mutation_scope: "context",
      writable_roots: [".agentplane/context", "context"],
    });
    expect(executed.bundle.execution.policy_decision?.fields.sandbox).toMatchObject({
      requested: "workspace-write",
      status: "advisory",
      capability_level: "advisory",
      channel: "env",
    });
    expect(executed.result).toMatchObject({
      status: "success",
      exit_code: 0,
      execution_receipt: {
        verification_state: "unverified",
        observed_by: "agentplane",
      },
    });

    const persistedTask = await ctx.taskBackend.getTask(taskId);
    expect(persistedTask?.runner).toMatchObject({
      run_id: runId,
      status: "success",
      execution_receipt: {
        verification_state: "unverified",
        observed_by: "agentplane",
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

  it("keeps trust unverified when native Codex lacks bounded descendant lifetime", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-context-codex-unverified";
    await configureFakeCodex(root, runId);
    const taskId = await createContextTask(root, "Native Codex context receipt");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });

    expect(executed.bundle.execution.sandbox_policy).toMatchObject({
      requested: "workspace-write",
      source: "role_default",
      role: "CURATOR",
    });
    expect(executed.bundle.task?.data.owner).toBe("CURATOR");
    expect(executed.bundle.execution.policy_decision?.fields.sandbox).toMatchObject({
      requested: "workspace-write",
      effective: "workspace-write",
      status: "enforced",
      capability_level: "native",
      channel: "argv",
    });
    expect(executed.invocation.argv).toEqual(
      expect.arrayContaining(["--ignore-user-config", "--strict-config", "-s", "workspace-write"]),
    );
    expect(executed.result).toMatchObject({
      status: "success",
      exit_code: 0,
      execution_receipt: {
        verification_state: "unverified",
        observed_by: "agentplane",
      },
    });

    const receiptRef = executed.result.execution_receipt;
    expect(receiptRef).toBeTruthy();
    const receipt = await readPersistedReceipt(root, receiptRef!.path);
    expect(receipt).toMatchObject({
      observed_by: "agentplane",
      success_policy: {
        outcome: "unverified",
      },
      scope_evaluation: {
        state: "passed",
        mutation_scope: "context",
        writable_roots: [".agentplane/context", "context"],
        violations: [],
      },
    });
    expect(receipt.success_policy?.reasons).toEqual(
      expect.arrayContaining([
        expect.stringContaining("cannot observe or terminate descendants"),
        "required observed check was not run: runner.process_containment",
      ]),
    );
    expect(receipt.process?.process_tree?.containment_state).toBe("limited");
    expect(receipt.process?.process_tree?.containment_limitation).toContain(
      "POSIX process-group cleanup cannot observe or terminate descendants",
    );
    expect(receipt.checks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "runner.sandbox.filesystem_effects_enforced",
          required: false,
          status: "not_run",
        }),
        expect.objectContaining({
          id: "runner.process_containment",
          required: true,
          status: "not_run",
        }),
      ]),
    );

    const persistedTask = await ctx.taskBackend.getTask(taskId);
    expect(persistedTask?.runner).toMatchObject({
      run_id: runId,
      status: "success",
      execution_receipt: {
        path: receiptRef!.path,
        sha256: receiptRef!.sha256,
        verification_state: "unverified",
        observed_by: "agentplane",
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

  it("rejects a forged observed-success receipt and matching task reference", async () => {
    const root = await mkGitRepoRoot();
    const runId = "run-context-forged-receipt";
    await configureFakeCodex(root, runId);
    const taskId = await createContextTask(root, "Forged context receipt");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    expect(executed.result.execution_receipt?.verification_state).toBe("unverified");

    const forgedReceipt = structuredClone(EXECUTION_RECEIPT_V2_VALID_FIXTURE);
    forgedReceipt.run_id = runId;
    forgedReceipt.work_order_id = runId;
    const forgedText = `${JSON.stringify(forgedReceipt, null, 2)}\n`;
    const receiptReference = executed.result.execution_receipt!.path;
    const receiptPath = receiptReference.startsWith("agentplane-run:")
      ? await resolveSupervisorExecutionReceiptLocator({
          git_root: root,
          workflow_dir: ".agentplane/tasks",
          locator: receiptReference,
        })
      : path.isAbsolute(receiptReference)
        ? receiptReference
        : path.resolve(root, ...receiptReference.split("/"));
    await writeFile(receiptPath, forgedText, "utf8");

    const task = await ctx.taskBackend.getTask(taskId);
    expect(task).toBeTruthy();
    await ctx.taskBackend.writeTask({
      ...task!,
      runner: {
        ...task!.runner,
        run_id: runId,
        execution_receipt: {
          path: executed.result.execution_receipt!.path,
          sha256: `sha256:${createHash("sha256").update(forgedText).digest("hex")}`,
          verification_state: "observed_success",
          observed_by: "agentplane",
        },
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
  });
});
