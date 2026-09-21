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
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
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
  const read = vi
    .fn()
    .mockResolvedValueOnce({
      read: {
        kind: "canonical",
        task,
        record: completionRecord,
      },
      next_action: {
        reason_code: "kernel_task_completion_required",
        work_item_id: null,
        effect_id: null,
      },
    })
    .mockResolvedValue({
      read: {
        kind: "canonical",
        task: { ...task, status: "DONE" },
        record: completedRecord,
      },
      next_action: {
        reason_code: "kernel_task_completed",
        work_item_id: null,
        effect_id: null,
      },
    });
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
    return { kind: "committed", record: completedRecord, receipts: [], replayed: false };
  });
  const runtime = {
    native: {
      readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:repo" }),
    },
    lifecycle: { read, apply },
    input: vi.fn().mockResolvedValue({ command: { expected_task_revision: task.revision } }),
    checkpoint: vi.fn(),
  };
  const [kernelRuntime, kernelFinalValidation, kernelProjection, kernelProviderEffects, verifyLog] =
    await Promise.all([
      import("../commands/task/kernel-runtime-context.js"),
      import("../commands/task/kernel-final-validation.js"),
      import("../commands/task/kernel-operational-projection.js"),
      import("../commands/task/kernel-provider-effect-coordinator.js"),
      import("../commands/shared/pr-meta/verify-log.js"),
    ]);
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
    workflowSpy.mockImplementation(originalDecideCanonicalWorkflowEffect);
    projectionSpy.mockImplementation(originalEnsureKernelOperationalProjectionEvidence);
    validationSpy.mockImplementation(originalRestoreKernelFinalValidation);
    runtimeSpy.mockImplementation(originalCreateKernelRuntime);
  }

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
        ".agentplane/bin/\n.agentplane/cache.sqlite-*\nnode_modules\npackages/\nwebsite/\nagentplane-recipes\n",
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
      expect(await taskCtx.taskBackend.getTask(dependencyId)).toBeNull();
      const beforeRoute = await buildTaskRouteDecision({
        ctx: taskCtx,
        cwd: taskRoot,
        taskId,
        includeRemote: false,
      });
      expect(beforeRoute.oracle.phase).toBe("dependency_wait");
      expect(beforeRoute.blockers).toEqual(
        expect.arrayContaining([expect.objectContaining({ code: "dependency_not_ready" })]),
      );
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
        ).rejects.toThrow();
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
