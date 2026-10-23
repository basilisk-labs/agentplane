import {
  approveTaskPlan,
  createLegacyTaskAggregate,
  createRepositorySnapshot,
  createTaskPlanRevision,
  materializeApprovedWorkItems,
  taskKernel as k,
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import { LocalBackend } from "../backends/task-backend.js";
import { recoverWorkPlanningBase } from "../commands/branch/work-resume-planning-base.js";
import { execFile, spawn } from "node:child_process";
import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { resolveCanonicalWorktreePreparationRoot } from "../commands/shared/worktree-topology.js";
import { executeBranchWorkflowOperation } from "../commands/task/branch-task-supervisor-operations.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

async function createTask(
  root: string,
  title = "External task-worktree resolution",
): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      title,
      "--description",
      "Exercise the state-bound worktree resolution protocol.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--verify",
      "git diff --check",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function writeHarnessGitignore(root: string): Promise<void> {
  const gitignorePath = path.join(root, ".gitignore");
  const existingGitignore = await readFile(gitignorePath, "utf8").catch(() => "");
  await writeFile(
    gitignorePath,
    [
      existingGitignore.trimEnd(),
      ".agentplane/bin",
      ".agentplane/cache.sqlite*",
      "node_modules",
      "packages/agentplane/bin",
      "packages/agentplane/dist",
      "packages/agentplane/package.json",
      "packages/core/dist",
      "packages/core/package.json",
      "packages/recipes/dist",
      "packages/recipes/package.json",
      "",
    ].join("\n"),
    "utf8",
  );
}

async function readHead(root: string): Promise<string> {
  const result = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return result.stdout.trim();
}

async function writeLegacyTerminalTask(root: string, taskId: string): Promise<void> {
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = (await command.taskBackend.getTask(taskId))!;
  const now = new Date().toISOString();
  const aggregate = createLegacyTaskAggregate({
    id: taskId,
    revision: task.revision!,
    title: task.title,
    description: task.description ?? task.title,
    status: "DONE",
    acceptance_criteria: [],
    captured_at: now,
    updated_at: now,
  });
  const { task_kernel: _kernel, ...extensions } = task.extensions ?? {};
  await command.taskBackend.writeTask({
    ...task,
    status: "DONE",
    extensions: withTaskCentricAggregate(extensions, aggregate),
  });
}

async function writeLegacyApprovedTask(
  root: string,
  taskId: string,
  targetSha: string,
  dependsOn: string[] = [],
): Promise<void> {
  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = (await command.taskBackend.getTask(taskId))!;
  const now = new Date().toISOString();
  const snapshot = createRepositorySnapshot({
    git: { kind: "commit", sha: targetSha, ref: "refs/heads/main" },
    dirty_paths: [],
    policy_digest: taskCentricDigest("policy"),
    config_digest: taskCentricDigest("config"),
    context_digest: taskCentricDigest("context"),
    task_history_cursor: `task:${taskId}`,
    captured_at: now,
  });
  const validation = {
    schema_version: 1 as const,
    criteria: [
      {
        id: "worktree-contract",
        description: "Preserve the authoritative worktree and exact external-episode contract.",
        required: true,
        check_ids: ["task-check"],
      },
    ],
    checks: [
      {
        id: "task-check",
        kind: "deterministic" as const,
        required: true,
        capability: "task.verify",
      },
    ],
    evidence_fingerprint: snapshot.digest,
  };
  const proposal = {
    schema_version: 1 as const,
    task_id: taskId,
    planning_baseline: snapshot,
    work_items: {
      schema_version: 1 as const,
      work_items: [
        {
          id: "exercise-worktree",
          objective: "Exercise the authoritative external-agent worktree.",
          depends_on: [],
          required_inputs: [],
          expected_outputs: ["worktree-result"],
          scope_roots: ["."],
          acceptance_criteria: validation.criteria,
          validation,
          context: {
            required_sources: [],
            optional_sources: [],
            symbol_hints: [],
            max_bytes: 65_536,
          },
          risk: "low" as const,
          capabilities: ["task.verify"],
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
  const draft = createTaskPlanRevision({ proposal, revision: 1, created_at: now });
  const plan = approveTaskPlan({
    plan: draft,
    expected_digest: draft.digest,
    actor: "USER",
    approved_at: now,
  });
  const aggregate = materializeApprovedWorkItems({
    task: createLegacyTaskAggregate({
      id: taskId,
      revision: task.revision!,
      title: task.title,
      description: task.description ?? task.title,
      status: "TODO",
      acceptance_criteria: validation.criteria.map((criterion) => criterion.description),
      captured_at: now,
      updated_at: now,
    }),
    plan,
    now,
  });
  const { task_kernel: _kernel, ...extensions } = task.extensions ?? {};
  await command.taskBackend.writeTask({
    ...task,
    status: "DOING",
    revision: aggregate.revision,
    depends_on: dependsOn,
    plan_approval: { state: "approved", updated_at: now, updated_by: "USER", note: null },
    extensions: withTaskCentricAggregate(extensions, aggregate),
  });
}

async function publicCompletionRegression() {
  const root = await mkGitRepoRootWithBranch("main");
  const config = defaultConfig();
  config.workflow_mode = "branch_pr";
  await writeConfig(root, config);
  await runCliSilent(["branch", "base", "set", "main", "--root", root]);
  const taskId = await createTask(root, "Canonical completion persistence");
  await writeHarnessGitignore(root);
  await execFileAsync("git", ["add", "."], { cwd: root });
  await execFileAsync("git", ["commit", "-m", "test: seed completion persistence"], {
    cwd: root,
  });
  await execFileAsync("git", ["switch", "-c", `task/${taskId}/completion-persistence`], {
    cwd: root,
  });

  const command = await loadCommandContext({ cwd: root, rootOverride: root });
  const task = (await command.taskBackend.getTask(taskId))!;
  const kernel = task.extensions!.task_kernel as { aggregate: Record<string, unknown> };
  const aggregate = kernel.aggregate;
  const evidenceDigest = `sha256:${"e".repeat(64)}` as k.Sha256Digest;
  const planDigest = `sha256:${"a".repeat(64)}` as k.Sha256Digest;
  const completionRecord = {
    digest: `sha256:${"b".repeat(64)}` as k.Sha256Digest,
    aggregate: {
      ...aggregate,
      current_plan: { digest: planDigest },
      final_validation: { status: "PASSED", evidence_digests: [evidenceDigest] },
    },
  };
  const completedRecord = {
    ...completionRecord,
    aggregate: { ...completionRecord.aggregate, state: "COMPLETED", revision: 2 },
  };
  let completed = false;
  const readCanonical = async () => ({
    kind: "canonical" as const,
    task: (await command.taskBackend.getTask(taskId))!,
    record: completed ? completedRecord : completionRecord,
  });
  const adapterRead = vi.fn(readCanonical);
  const read = vi.fn(async () => ({
    read: await readCanonical(),
    next_action: {
      reason_code: completed ? "kernel_task_completed" : "kernel_task_completion_required",
      work_item_id: null,
      effect_id: null,
    },
  }));
  const apply = vi.fn().mockImplementation(async () => {
    const current = (await command.taskBackend.getTask(taskId))!;
    const currentKernel = current.extensions!.task_kernel as {
      aggregate: Record<string, unknown>;
    };
    const revision = current.revision! + 1;
    await command.taskBackend.writeTask(
      {
        ...current,
        status: "DONE",
        revision,
        extensions: {
          ...current.extensions,
          task_kernel: {
            ...currentKernel,
            aggregate: { ...currentKernel.aggregate, state: "COMPLETED", revision },
          },
        },
      },
      { expectedRevision: current.revision },
    );
    completed = true;
    return { kind: "committed", record: completedRecord, receipts: [], replayed: false };
  });
  const runtime = {
    command,
    adapter: { read: adapterRead },
    native: {
      readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:repo" }),
    },
    lifecycle: { read, apply },
    input: vi.fn().mockResolvedValue({ command: { expected_task_revision: task.revision } }),
    checkpoint: vi.fn(),
  };
  const [
    kernelRuntime,
    kernelFinalValidation,
    kernelProjection,
    kernelProviderEffects,
    verifyLog,
    kernelProjectionRecovery,
  ] = await Promise.all([
    import("../commands/task/kernel-runtime-context.js"),
    import("../commands/task/kernel-final-validation.js"),
    import("../commands/task/kernel-operational-projection.js"),
    import("../commands/task/kernel-provider-effect-coordinator.js"),
    import("../commands/shared/pr-meta/verify-log.js"),
    import("../commands/task/kernel-operational-projection-recovery.js"),
  ]);
  const originalRecoverKernelOperationalProjection =
    kernelProjectionRecovery.recoverKernelOperationalProjection;
  // This completion-persistence fixture supplies synthetic validation and projection evidence.
  // Recovery is a separate boundary; keep the actual completion write and Git commit below.
  const recoverySpy = vi
    .spyOn(kernelProjectionRecovery, "recoverKernelOperationalProjection")
    .mockResolvedValue({ kind: "unchanged" });
  const originalCreateKernelRuntime = kernelRuntime.createKernelRuntime;
  const originalRestoreKernelFinalValidation = kernelFinalValidation.restoreKernelFinalValidation;
  const originalEnsureKernelOperationalProjectionEvidence =
    kernelProjection.ensureKernelOperationalProjectionEvidence;
  const originalDecideCanonicalWorkflowEffect = kernelProviderEffects.decideCanonicalWorkflowEffect;
  const runtimeSpy = vi
    .spyOn(kernelRuntime, "createKernelRuntime")
    .mockResolvedValue(runtime as never);
  const validationSpy = vi
    .spyOn(kernelFinalValidation, "restoreKernelFinalValidation")
    .mockResolvedValue({
      fingerprint: "sha256:repo",
      environment_digest: k.kernelDigest(verifyLog.verificationChildEnv()),
      evidence_digest: evidenceDigest,
      plan_digest: planDigest,
    });
  const projectionSpy = vi
    .spyOn(kernelProjection, "ensureKernelOperationalProjectionEvidence")
    .mockResolvedValue(undefined);
  const workflowSpy = vi
    .spyOn(kernelProviderEffects, "decideCanonicalWorkflowEffect")
    .mockResolvedValue({
      workspace: { baseCheckoutPath: root },
      workflowStep: { kind: "terminal", outcome: { type: "done" } },
    } as never);

  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "advance",
      taskId,
      "--agent-json",
      "--remote",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    expect(JSON.parse(io.stdout)).toMatchObject({
      action: { kind: "terminal", reason: "kernel_task_completed" },
    });
  } finally {
    io.restore();
    recoverySpy.mockImplementation(originalRecoverKernelOperationalProjection);
    workflowSpy.mockImplementation(originalDecideCanonicalWorkflowEffect);
    projectionSpy.mockImplementation(originalEnsureKernelOperationalProjectionEvidence);
    validationSpy.mockImplementation(originalRestoreKernelFinalValidation);
    runtimeSpy.mockImplementation(originalCreateKernelRuntime);
  }

  expect(adapterRead).toHaveBeenCalledWith(taskId);
  expect(apply).toHaveBeenCalledTimes(1);
  expect(recoverySpy).toHaveBeenCalled();
  const persisted = (await command.taskBackend.getTask(taskId))!;
  expect(persisted.status).toBe("DONE");
  expect(
    (persisted.extensions!.task_kernel as { aggregate: { state: string } }).aggregate.state,
  ).toBe("COMPLETED");
  const status = await execFileAsync(
    "git",
    ["status", "--short", "--untracked-files=all", `.agentplane/tasks/${taskId}`],
    { cwd: root },
  );
  expect(status.stdout).toBe("");
  const committedReadme = await execFileAsync(
    "git",
    ["show", `HEAD:.agentplane/tasks/${taskId}/README.md`],
    { cwd: root },
  );
  expect(committedReadme.stdout).toContain('status: "DONE"');
}

describe("runCli task advance worktree resolution", { timeout: 180_000 }, () => {
  it("prepares from the primary when the admitted internal base is ahead of stale main", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    await writeHarnessGitignore(root);
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(path.join(root, "scripts", "check-branch.mjs"), "process.exit(0);\n");
    await execFileAsync("git", ["add", "-A"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed stale primary"], { cwd: root });
    const primaryHead = await readHead(root);
    const baseRoot = path.join(root, ".agentplane", "worktrees", "integration-base");
    await execFileAsync("git", ["branch", "integration"], { cwd: root });
    await execFileAsync("git", ["worktree", "add", baseRoot, "integration"], { cwd: root });
    await writeFile(path.join(baseRoot, "base-only.txt"), "base-only\n");
    await execFileAsync("git", ["add", "base-only.txt"], { cwd: baseRoot });
    await execFileAsync("git", ["commit", "-m", "test: advance registered base"], {
      cwd: baseRoot,
    });
    const baseHead = await readHead(baseRoot);
    expect(baseHead).not.toBe(primaryHead);

    const runJson = async (argv: string[], checkout = root) => {
      const io = captureStdIO();
      try {
        expect(await runCli([...argv, "--root", checkout]), io.stderr).toBe(0);
        return JSON.parse(io.stdout) as Record<string, unknown>;
      } finally {
        io.restore();
      }
    };
    const created = await runJson([
      "task",
      "create",
      "Prepare from a registered base",
      "--base",
      "integration",
      "--task-kind",
      "code",
      "--mutation-scope",
      "code",
      "--route",
      "branch_pr",
      "--scope-root",
      "base-only.txt",
      "--scope-root",
      ".gitignore",
      "--scope-root",
      ".agentplane/cache/tasks-index.v2.json",
      "--repository-effect",
      "source_code",
      "--repository-effect",
      "repository_write",
      "--verify",
      "node scripts/check-branch.mjs",
      "--json",
    ]);
    const taskId = String(created.task_id);
    const planningRoute = await runJson(["task", "advance", taskId, "--agent-json"]);
    expect(planningRoute.action).toMatchObject({
      kind: "external_wait",
      reason: "canonical_planning_checkout_required",
      must_run_from: baseRoot,
    });
    const planning = await runJson(["task", "advance", taskId, "--agent-json"], baseRoot);
    expect(planning.authority, JSON.stringify(planning)).toMatchObject({ role: "PLANNER" });
    const exchange = planning.exchange as {
      directory: string;
      work_order_ref: string;
      result_path: string;
      resume_argv: string[];
    };
    const workOrder = JSON.parse(
      await readFile(path.join(exchange.directory, exchange.work_order_ref), "utf8"),
    ) as {
      work_order_id: string;
      canonical_binding: Record<string, unknown>;
      state_fingerprint: { worktree: string };
    };
    expect(workOrder.state_fingerprint.worktree).toBe(baseRoot);
    await writeFile(
      exchange.result_path,
      JSON.stringify({
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: workOrder.work_order_id,
        status: "completed",
        summary: "Prepare one bounded branch artifact from the admitted base.",
        findings: [],
        uncertainty: [],
        canonical_binding: workOrder.canonical_binding,
        canonical_plan: {
          work_items: [
            {
              id: "base-change",
              depends_on: [],
              required_inputs: [],
              expected_outputs: ["base-output"],
              optional: false,
              execution_requirements: {
                scope_roots: [
                  "base-only.txt",
                  ".gitignore",
                  ".agentplane/cache/tasks-index.v2.json",
                ],
                repository_effects: ["source_code", "repository_write"],
                external_effects: [],
                capabilities: ["repository_write"],
                resources: [],
              },
              contract: {
                role: "EXECUTOR",
                objective: "Keep the branch anchored to the registered base.",
                acceptance_criteria: ["The task branch contains the base-only commit."],
                verification_commands: ["node scripts/check-branch.mjs"],
              },
            },
          ],
        },
      }),
    );
    const approval = await runJson(exchange.resume_argv.slice(1), baseRoot);
    expect(approval.action).toMatchObject({ kind: "approval_required" });
    const approveIO = captureStdIO();
    try {
      expect(
        await runCli(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
        approveIO.stderr,
      ).toBe(0);
    } finally {
      approveIO.restore();
    }
    await cp(
      path.join(root, ".agentplane", "tasks", taskId),
      path.join(baseRoot, ".agentplane", "tasks", taskId),
      { recursive: true },
    );
    const baseCommand = await loadCommandContext({ cwd: baseRoot, rootOverride: null });
    const beforePrepare = await buildTaskRouteDecision({
      ctx: baseCommand,
      cwd: baseRoot,
      taskId,
      includeRemote: false,
    });
    expect(beforePrepare.workflowStep.kind, JSON.stringify(beforePrepare.workflowStep)).toBe(
      "cli_operation",
    );
    expect(
      await resolveCanonicalWorktreePreparationRoot({
        routedCheckout: baseRoot,
        registeredBaseCheckout: beforePrepare.workspace.baseCheckoutPath,
        baseBranch: "integration",
      }),
    ).toBe(root);
    if (
      beforePrepare.workflowStep.kind !== "cli_operation" ||
      beforePrepare.workflowStep.operation.id !== "worktree.prepare"
    ) {
      throw new Error("Expected the admitted worktree.prepare operation.");
    }
    const journalPath = path.join(
      root,
      ".git",
      "agentplane",
      "supervisor",
      "episodes",
      taskId,
      "journal.json",
    );
    const journalBefore = await readFile(journalPath, "utf8").catch(() => null);
    const worktreesBefore = await execFileAsync("git", ["worktree", "list", "--porcelain"], {
      cwd: root,
    });
    await expect(
      executeBranchWorkflowOperation({
        decision: {
          ...beforePrepare,
          workspace: { ...beforePrepare.workspace, baseCheckoutPath: root },
        },
        operation: beforePrepare.workflowStep.operation,
      }),
    ).rejects.toMatchObject({
      context: { reason_code: "worktree_preparation_route_base_mismatch" },
    });
    expect(await readFile(journalPath, "utf8").catch(() => null)).toBe(journalBefore);
    const worktreesAfterRejection = await execFileAsync(
      "git",
      ["worktree", "list", "--porcelain"],
      { cwd: root },
    );
    expect(worktreesAfterRejection.stdout).toBe(worktreesBefore.stdout);
    const prepared = await runJson(["task", "advance", taskId, "--agent-json"], baseRoot);
    expect(prepared.action, JSON.stringify(prepared)).toMatchObject({
      kind: "external_wait",
      reason: "canonical_worktree_prepared",
    });
    const taskRoot = (prepared.action as { must_run_from: string }).must_run_from;
    expect(path.dirname(taskRoot)).toBe(path.join(root, ".agentplane", "worktrees"));
    expect(taskRoot).not.toBe(baseRoot);
    expect(await readHead(root)).toBe(primaryHead);
    expect(await readHead(baseRoot)).toBe(baseHead);
    const ancestry = await execFileAsync("git", ["merge-base", "--is-ancestor", baseHead, "HEAD"], {
      cwd: taskRoot,
    });
    expect(ancestry.stdout).toBe("");
    expect(await readHead(taskRoot)).toBe(baseHead);
    expect(await readFile(path.join(taskRoot, "base-only.txt"), "utf8")).toBe("base-only\n");
    const journalAfter = JSON.parse(await readFile(journalPath, "utf8")) as {
      operations: { authority_ref: string; status: string; result_digest: string | null }[];
    };
    expect(journalAfter.operations).toHaveLength(1);
    expect(journalAfter.operations[0]?.authority_ref).toBe("workflow-operation:worktree.prepare");
    expect(journalAfter.operations[0]?.status).toBe("completed");
    expect(journalAfter.operations[0]?.result_digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
  });

  it.each([false, true, "process"] as const)(
    "recovers an unstarted approved planning base (interrupted=%s)",
    async (interrupted) => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      const workflowDir = interrupted === true ? "./.agent plane/задачи" : ".agentplane/tasks";
      config.paths.workflow_dir = workflowDir;
      await writeConfig(root, config);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      await writeFile(
        path.join(root, ".gitignore"),
        ".agentplane/bin/\n.agentplane/cache.sqlite-*\nnode_modules\npackages/\nwebsite/\n",
      );
      await execFileAsync("git", ["add", ".agentplane", ".gitignore"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: initial workflow"], { cwd: root });
      const taskId = await createTask(root);
      const initial = await readHead(root);
      const dependencyId = await createTask(
        root,
        "Completed prerequisite for planning-base recovery",
      );
      await writeLegacyTerminalTask(root, dependencyId);
      await execFileAsync("git", ["add", `${workflowDir}/${dependencyId}`], { cwd: root });
      await writeFile(path.join(root, "prerequisite.txt"), "completed prerequisite\n");
      await execFileAsync("git", ["add", "prerequisite.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: prerequisite landed"], { cwd: root });
      const target = await readHead(root);
      await writeLegacyApprovedTask(root, taskId, target, [dependencyId]);
      expect(
        await runCliSilent([
          "work",
          "start",
          taskId,
          "--agent",
          "CODER",
          "--slug",
          "planning-base",
          "--worktree",
          "--root",
          root,
        ]),
      ).toBe(0);
      const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
      const inspected = await recoverWorkPlanningBase({ ctx, taskId, apply: false });
      expect(inspected).toMatchObject({
        from_sha: initial,
        observed_head: initial,
        target_sha: target,
        status: "ready",
      });
      const taskRoot = inspected.worktree;
      const taskCtx = await loadCommandContext({ cwd: taskRoot, rootOverride: null });
      const original = (await taskCtx.taskBackend.getTask(taskId))!;
      expect(original.status).toBe("DOING");
      expect(original.depends_on).toEqual([dependencyId]);
      await expect(
        readFile(path.join(taskRoot, workflowDir, dependencyId, "README.md"), "utf8"),
      ).rejects.toMatchObject({ code: "ENOENT" });
      const hasHistory =
        taskCtx.taskBackend instanceof LocalBackend && taskCtx.taskBackend.historyRoot !== null;
      const dependency = await taskCtx.taskBackend.getTask(dependencyId);
      if (hasHistory) expect(dependency).toMatchObject({ id: dependencyId, status: "DONE" });
      else expect(dependency).toBeNull();
      const beforeRoute = await buildTaskRouteDecision({
        ctx: taskCtx,
        cwd: taskRoot,
        taskId,
        includeRemote: false,
      });
      // Compact worktrees can resolve completed dependencies from retained history.
      if (hasHistory) {
        expect(beforeRoute.oracle.phase).not.toBe("dependency_wait");
        expect(
          beforeRoute.blockers.some((blocker) => blocker.code === "dependency_not_ready"),
        ).toBe(false);
      } else {
        expect(beforeRoute.oracle.phase).toBe("dependency_wait");
        expect(beforeRoute.blockers).toEqual(
          expect.arrayContaining([expect.objectContaining({ code: "dependency_not_ready" })]),
        );
      }
      await expect(
        recoverWorkPlanningBase({
          ctx,
          taskId,
          apply: true,
          expectedToken: "sha256:" + "0".repeat(64),
        }),
      ).rejects.toThrow("stale or missing recovery token");
      await writeFile(path.join(taskRoot, "unrelated.txt"), "preserve");
      await expect(recoverWorkPlanningBase({ ctx, taskId, apply: false })).rejects.toThrow(
        "untracked changes",
      );
      await rm(path.join(taskRoot, "unrelated.txt"));
      const priorBase = original.extensions!.task_execution_context as Record<string, unknown>;
      await taskCtx.taskBackend.writeTask({
        ...original,
        extensions: {
          ...original.extensions,
          task_execution_context: { ...priorBase, source: "explicit" },
        },
      });
      await expect(recoverWorkPlanningBase({ ctx, taskId, apply: false })).rejects.toThrow(
        "base provenance",
      );
      const pinned = (await taskCtx.taskBackend.getTask(taskId))!;
      await taskCtx.taskBackend.writeTask({ ...pinned, extensions: original.extensions });
      const restored = (await taskCtx.taskBackend.getTask(taskId))!;
      const untouched = taskCentricAggregateFromExtensions(restored.extensions)!;
      const workItem = Object.values(untouched.work_items)[0]!;
      await taskCtx.taskBackend.writeTask({
        ...restored,
        extensions: withTaskCentricAggregate(restored.extensions, {
          ...untouched,
          work_items: { ...untouched.work_items, [workItem.id]: { ...workItem, attempt: 1 } },
        }),
      });
      await expect(recoverWorkPlanningBase({ ctx, taskId, apply: false })).rejects.toThrow(
        "WorkItem execution or validation already exists",
      );
      await taskCtx.taskBackend.writeTask({
        ...(await taskCtx.taskBackend.getTask(taskId))!,
        extensions: restored.extensions,
      });
      await execFileAsync(
        "git",
        ["commit", "--allow-empty", "-m", "test: started branch history"],
        { cwd: taskRoot },
      );
      await expect(recoverWorkPlanningBase({ ctx, taskId, apply: false })).rejects.toThrow(
        "commits after creation",
      );
      await execFileAsync("git", ["reset", "--hard", initial], { cwd: taskRoot });
      const io = captureStdIO();
      try {
        expect(
          await runCli([
            "work",
            "resume",
            taskId,
            "--refresh-planning-base",
            "--json",
            "--root",
            root,
          ]),
          io.stderr,
        ).toBe(0);
        const result = JSON.parse(io.stdout) as { target_sha: string };
        expect(result.target_sha).toBe(target);
      } finally {
        io.restore();
      }
      const ready = await recoverWorkPlanningBase({ ctx, taskId, apply: false });
      if (!interrupted) {
        await writeFile(path.join(root, ".git", "info", "exclude"), "prerequisite.txt\n");
        await writeFile(path.join(taskRoot, "prerequisite.txt"), "preserve ignored local bytes\n");
        await expect(
          recoverWorkPlanningBase({ ctx, taskId, apply: true, expectedToken: ready.token }),
        ).rejects.toThrow("ignored local paths overlap the target snapshot");
        expect(await readFile(path.join(taskRoot, "prerequisite.txt"), "utf8")).toBe(
          "preserve ignored local bytes\n",
        );
        expect(await readHead(taskRoot)).toBe(initial);
        await rm(path.join(taskRoot, "prerequisite.txt"));
      }
      if (interrupted === true) {
        if (!(taskCtx.taskBackend instanceof LocalBackend))
          throw new Error("Expected local fixture backend");
        const originalWrite = LocalBackend.prototype.writeTaskWithReceipt.bind(taskCtx.taskBackend);
        const spy = vi
          .spyOn(LocalBackend.prototype, "writeTaskWithReceipt")
          .mockImplementationOnce((task, options, beforePublication) => {
            return originalWrite(task, options, async () => {
              await beforePublication();
              throw new Error("injected interruption after Git before Task publication");
            });
          });
        try {
          await expect(
            recoverWorkPlanningBase({ ctx, taskId, apply: true, expectedToken: ready.token }),
          ).rejects.toThrow("injected interruption");
        } finally {
          spy.mockRestore();
        }
        expect(await readHead(taskRoot)).toBe(target);
        expect(
          (await taskCtx.taskBackend.getTask(taskId))!.extensions!.task_execution_context,
        ).toEqual(priorBase);
      }
      let orphanBytes: string | null = null;
      if (interrupted === "process") {
        const marker = path.join(root, ".git", "recovery-kill-marker.json");
        const hook = path.join(root, ".git", "hooks", "post-merge");
        await writeFile(
          hook,
          '#!/usr/bin/env node\nrequire("node:fs").writeFileSync(process.env.AGENTPLANE_RECOVERY_TEST_MARKER, JSON.stringify({hookPid:process.pid,gitPid:process.ppid})); setTimeout(() => {}, 10000);\n',
          { mode: 0o755 },
        );
        const child = spawn(
          process.execPath,
          [
            path.join(process.cwd(), "packages/agentplane/dist/cli.js"),
            "work",
            "resume",
            taskId,
            "--refresh-planning-base",
            "--apply",
            "--expect-token",
            ready.token,
            "--root",
            root,
          ],
          {
            cwd: root,
            env: { ...process.env, AGENTPLANE_RECOVERY_TEST_MARKER: marker },
            stdio: ["ignore", "ignore", "pipe"],
          },
        );
        let childStderr = "";
        child.stderr?.setEncoding("utf8");
        child.stderr?.on("data", (chunk: string) => {
          childStderr += chunk;
        });
        const exited = new Promise((resolve) => child.once("exit", resolve));
        let hookPids: { hookPid: number; gitPid: number } | null = null;
        try {
          for (let poll = 0; poll < 200; poll++) {
            const raw = await readFile(marker, "utf8").catch(() => null);
            if (raw) {
              hookPids = JSON.parse(raw) as { hookPid: number; gitPid: number };
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
          expect(
            hookPids,
            `isolated CLI must reach the post-merge crash boundary: ${childStderr}`,
          ).not.toBeNull();
          child.kill("SIGKILL");
          await exited;
        } finally {
          if (child.exitCode === null && child.signalCode === null) child.kill("SIGKILL");
          if (hookPids)
            for (const pid of [hookPids.hookPid, hookPids.gitPid]) {
              try {
                process.kill(pid, "SIGKILL");
              } catch {
                // The owned fixture subprocess may already have exited.
              }
            }
          await rm(hook, { force: true });
        }
        const directory = path.join(taskRoot, workflowDir, taskId);
        const entries = await readdir(directory);
        const orphans = entries.filter((name) => name.startsWith("README.md.tmp-"));
        expect(orphans).toHaveLength(1);
        orphanBytes = await readFile(path.join(directory, orphans[0]!), "utf8");
        // Eight valid interrupted candidates must leave room for the next atomic publication.
        for (let candidate = 1; candidate < 8; candidate++) {
          await writeFile(
            path.join(directory, `README.md.tmp-${String(candidate).padStart(32, "0")}`),
            orphanBytes,
          );
        }
        const excess = path.join(directory, `README.md.tmp-${"9".repeat(32)}`);
        await writeFile(excess, orphanBytes);
        await expect(recoverWorkPlanningBase({ ctx, taskId, apply: false })).rejects.toThrow(
          "Task execution artifacts already exist",
        );
        await rm(excess);

        expect(await readHead(taskRoot)).toBe(target);
        expect(
          (await taskCtx.taskBackend.getTask(taskId))!.extensions!.task_execution_context,
        ).toEqual(priorBase);
      }
      const fresh = await recoverWorkPlanningBase({ ctx, taskId, apply: false });
      const applied = await recoverWorkPlanningBase({
        ctx,
        taskId,
        apply: true,
        expectedToken: fresh.token,
      });
      expect(applied.status).toBe("applied");
      if (orphanBytes !== null) {
        const directory = path.join(taskRoot, workflowDir, taskId);
        const remainingEntries = await readdir(directory);
        expect(remainingEntries.filter((name) => name.startsWith("README.md.tmp-"))).toEqual([]);
        const archiveRoot = path.join(root, ".git", "agentplane", "planning-base-recovery", taskId);
        const archived = await readdir(archiveRoot);
        expect(archived).toHaveLength(1);
        expect(await readFile(path.join(archiveRoot, archived[0]!), "utf8")).toBe(orphanBytes);
      }

      const after = (await taskCtx.taskBackend.getTask(taskId))!;
      const afterAggregate = taskCentricAggregateFromExtensions(after.extensions)!;
      const originalAggregate = taskCentricAggregateFromExtensions(original.extensions)!;
      expect(afterAggregate.revision).toBe(after.revision);
      expect({
        ...afterAggregate,
        revision: originalAggregate.revision,
        event_cursor: originalAggregate.event_cursor,
        updated_at: originalAggregate.updated_at,
      }).toEqual(originalAggregate);
      expect(after.depends_on).toEqual(original.depends_on);
      const dependencyAfter = await taskCtx.taskBackend.getTask(dependencyId);
      expect(dependencyAfter?.status).toBe("DONE");
      const afterRoute = await buildTaskRouteDecision({
        ctx: taskCtx,
        cwd: taskRoot,
        taskId,
        includeRemote: false,
      });
      expect(afterRoute.oracle.phase).not.toBe("dependency_wait");
      expect(afterRoute.blockers.some((blocker) => blocker.code === "dependency_not_ready")).toBe(
        false,
      );
      expect(after.status).toBe("DOING");
      expect(after.extensions!.task_execution_context).toMatchObject({
        ...priorBase,
        base_sha: target,
      });
      expect(await readFile(path.join(taskRoot, "prerequisite.txt"), "utf8")).toBe(
        "completed prerequisite\n",
      );
      const readmePath = path.join(taskRoot, workflowDir, taskId, "README.md");
      const completedBytes = await readFile(readmePath, "utf8");
      const repeated = await recoverWorkPlanningBase({ ctx, taskId, apply: false });
      expect(repeated.status).toBe("already_applied");
      expect(await readFile(readmePath, "utf8")).toBe(completedBytes);
      const legacy = (await taskCtx.taskBackend.getTask(taskId))!;
      const legacyAggregate = taskCentricAggregateFromExtensions(legacy.extensions)!;
      await taskCtx.taskBackend.writeTask({
        ...legacy,
        extensions: withTaskCentricAggregate(legacy.extensions, {
          ...legacyAggregate,
          revision: legacyAggregate.revision - 1,
        }),
      });
      const reconciliation = await recoverWorkPlanningBase({ ctx, taskId, apply: false });
      expect(reconciliation.status).toBe("ready_to_reconcile");
      const appliedReconciliation = await recoverWorkPlanningBase({
        ctx,
        taskId,
        apply: true,
        expectedToken: reconciliation.token,
      });
      expect(appliedReconciliation.status).toBe("applied");
      expect(
        await runCliSilent([
          "task",
          "start-ready",
          taskId,
          "--author",
          "CODER",
          "--body",
          "Start: continue branch_pr task after planning-base recovery.",
          "--root",
          taskRoot,
        ]),
      ).toBe(0);
      const started = (await taskCtx.taskBackend.getTask(taskId))!;
      expect(taskCentricAggregateFromExtensions(started.extensions)?.revision).toBe(
        started.revision,
      );
    },
  );

  it(
    "commits the canonical COMPLETED projection through the public branch_pr route",
    publicCompletionRegression,
  );
});
