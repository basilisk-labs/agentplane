import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";
import { LocalBackend } from "../backends/task-backend.js";
import { recoverWorkPlanningBase } from "../commands/branch/work-resume-planning-base.js";
import { execFile, spawn } from "node:child_process";
import { mkdir, readdir, readFile, realpath, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { describe, expect, it, vi } from "vitest";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  type AgentWorkOrderV2,
} from "@agentplaneorg/core/schemas";

import {
  captureStdIO,
  installRunCliIntegrationHarness,
  mkGitRepoRootWithBranch,
  runCliSilent,
  writeConfig,
} from "@agentplane/testkit";

import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { agentTransitionId } from "../commands/task/agent-action-packet.js";
import type { ExternalAgentExchange } from "../commands/task/external-agent-exchange.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();

const execFileAsync = promisify(execFile);

type AgentPacket = {
  task_id: string;
  transition_id: string;
  state_fingerprint: string;
  authority: { role: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_ref: string;
  };
};

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "External task-worktree resolution",
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

async function readAgentPacket(root: string, taskId: string): Promise<AgentPacket> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    return JSON.parse(io.stdout) as AgentPacket;
  } finally {
    io.restore();
  }
}

async function writeCompletedResult(packet: AgentPacket): Promise<string> {
  if (!packet.exchange) throw new Error("expected an external-agent exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as { work_order_id: string; role: string };
  const resultPath = path.join(packet.exchange.directory, packet.exchange.result_ref);
  await writeFile(
    resultPath,
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
          summary: "Keep the intended worktree changes.",
          findings: [],
          uncertainty: [],
        },
      },
      null,
      2,
    )}\n`,
    "utf8",
  );
  return resultPath;
}

async function returnAgentResult(root: string, taskId: string, resultPath: string) {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "advance",
      taskId,
      "--result",
      resultPath,
      "--agent-json",
      "--root",
      root,
    ]);
    return { code, stdout: io.stdout, stderr: io.stderr };
  } finally {
    io.restore();
  }
}

async function approveStructuredPlan(root: string, taskId: string): Promise<void> {
  const packet = await readAgentPacket(root, taskId);
  expect(packet.authority.role).toBe("PLANNER");
  if (!packet.exchange) throw new Error("expected a planning exchange");
  const workOrder = JSON.parse(
    await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
  ) as AgentWorkOrderV2;
  const criterion = {
    id: "worktree-contract",
    description: "Preserve the authoritative worktree and exact external-episode contract.",
    required: true,
    check_ids: ["task-check"],
  };
  const validation = {
    schema_version: 1,
    criteria: [criterion],
    checks: [
      { id: "task-check", kind: "deterministic", required: true, capability: "task.verify" },
    ],
    evidence_fingerprint: workOrder.planning_context!.repository_snapshot.digest,
  };
  const resultPath = path.join(packet.exchange.directory, "result.json");
  await writeFile(
    resultPath,
    JSON.stringify({
      schema_version: 1,
      kind: "agent_action_result",
      task_id: taskId,
      transition_id: packet.transition_id,
      state_fingerprint: packet.state_fingerprint,
      role: "PLANNER",
      result: {
        schema_version: 2,
        kind: "agent_semantic_result",
        work_order_id: workOrder.work_order_id,
        status: "completed",
        summary: "Exercise the worktree contract through one approved structured WorkItem.",
        findings: [],
        uncertainty: [],
        task_intent: {
          task_kind: "code",
          mutation_scope: "code",
          risk_flags: [],
          tags: ["code"],
          execution: {
            schema_version: 2,
            preferred_mode: "branch_pr",
            scope_roots: ["."],
            repository_effects: ["repository_write", "source_code"],
            external_effects: [],
            requirements_uncertainty: "bounded",
            implementation_uncertainty: "bounded",
            reversibility: "reversible",
            rationale: ["The fixture authorizes only local worktree payload changes."],
          },
        },
        task_plan_proposal: {
          schema_version: 1,
          task_id: taskId,
          planning_baseline: workOrder.planning_context!.repository_snapshot,
          work_items: {
            schema_version: 1,
            work_items: [
              {
                id: "exercise-worktree",
                objective: "Exercise the authoritative external-agent worktree.",
                depends_on: [],
                required_inputs: [],
                expected_outputs: ["worktree-result"],
                scope_roots: ["."],
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
                resource_claims: [{ kind: "workspace", resource: ".", mode: "write" }],
                optional: false,
                priority: 1,
              },
            ],
          },
          assumptions: [],
          unresolved_questions: [],
          top_level_validation: validation,
        },
      },
    }),
  );
  const io = captureStdIO();
  try {
    expect(
      await runCli([
        "task",
        "advance",
        taskId,
        "--result",
        resultPath,
        "--agent-json",
        "--root",
        root,
      ]),
      io.stderr,
    ).toBe(0);
    const approval = JSON.parse(io.stdout) as { action: { kind: string } };
    expect(approval.action.kind).toBe("approval_required");
  } finally {
    io.restore();
  }
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
}

async function readHead(root: string): Promise<string> {
  const result = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  return result.stdout.trim();
}

describe("runCli task advance worktree resolution", { timeout: 180_000 }, () => {
  it.each([false, true, "process"] as const)(
    "recovers an unstarted approved planning base (interrupted=%s)",
    async (interrupted) => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
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
      await writeFile(path.join(root, "prerequisite.txt"), "completed prerequisite\n");
      await execFileAsync("git", ["add", "prerequisite.txt"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: prerequisite landed"], { cwd: root });
      const target = await readHead(root);
      await approveStructuredPlan(root, taskId);
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
      await taskCtx.taskBackend.writeTask({ ...restored, status: "DOING" });
      await expect(recoverWorkPlanningBase({ ctx, taskId, apply: false })).rejects.toThrow(
        "already started",
      );
      await taskCtx.taskBackend.writeTask({
        ...(await taskCtx.taskBackend.getTask(taskId))!,
        status: "TODO",
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
            stdio: "ignore",
          },
        );
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
          expect(hookPids, "isolated CLI must reach the post-merge crash boundary").not.toBeNull();
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
        const directory = path.join(taskRoot, ".agentplane", "tasks", taskId);
        const entries = await readdir(directory);
        const orphans = entries.filter((name) => name.startsWith("README.md.tmp-"));
        expect(orphans).toHaveLength(1);
        orphanBytes = await readFile(path.join(directory, orphans[0]!), "utf8");
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
        const directory = path.join(taskRoot, ".agentplane", "tasks", taskId);
        const remainingEntries = await readdir(directory);
        expect(remainingEntries.filter((name) => name.startsWith("README.md.tmp-"))).toEqual([]);
        const archiveRoot = path.join(root, ".git", "agentplane", "planning-base-recovery", taskId);
        const archived = await readdir(archiveRoot);
        expect(archived).toHaveLength(1);
        expect(await readFile(path.join(archiveRoot, archived[0]!), "utf8")).toBe(orphanBytes);
      }

      const after = (await taskCtx.taskBackend.getTask(taskId))!;
      expect(taskCentricAggregateFromExtensions(after.extensions)).toEqual(
        taskCentricAggregateFromExtensions(original.extensions),
      );
      expect(after.depends_on).toEqual(original.depends_on);
      expect(after.status).toBe("TODO");
      expect(after.extensions!.task_execution_context).toMatchObject({
        ...priorBase,
        base_sha: target,
      });
      expect(await readFile(path.join(taskRoot, "prerequisite.txt"), "utf8")).toBe(
        "completed prerequisite\n",
      );
      const readmePath = path.join(taskRoot, ".agentplane", "tasks", taskId, "README.md");
      const completedBytes = await readFile(readmePath, "utf8");
      const repeated = await recoverWorkPlanningBase({ ctx, taskId, apply: false });
      expect(repeated.status).toBe("already_applied");
      expect(await readFile(readmePath, "utf8")).toBe(completedBytes);
    },
  );

  it("recovers a completed stale journal and replaces prior implementation metadata", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root);
    await writeHarnessGitignore(root);
    await mkdir(path.join(root, "scripts"), { recursive: true });
    await writeFile(
      path.join(root, "scripts", "check-resolution.mjs"),
      'import { readFileSync } from "node:fs";\nimport { strict as assert } from "node:assert";\nassert.equal(readFileSync("intended-resolution.txt", "utf8"), "keep\\n");\n',
      "utf8",
    );
    await writeFile(
      path.join(root, "package.json"),
      JSON.stringify({ scripts: { "ci:local:full": "node scripts/check-resolution.mjs" } }),
      "utf8",
    );
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed worktree resolution"], { cwd: root });
    await approveStructuredPlan(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: approve structured worktree plan"], {
      cwd: root,
    });

    const slug = "external-resolution";
    const taskWorktree = path.join(root, ".agentplane", "worktrees", `${taskId}-${slug}`);
    await runCliSilent([
      "work",
      "start",
      taskId,
      "--agent",
      "CODER",
      "--slug",
      slug,
      "--worktree",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "start-ready",
      taskId,
      "--author",
      "CODER",
      "--body",
      "Start: reproduce external task-worktree resolution.",
      "--root",
      taskWorktree,
    ]);
    await execFileAsync("git", ["add", "."], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: persist start-ready fixture"], {
      cwd: taskWorktree,
    });
    const priorImplementationHeadResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const priorImplementationHead = priorImplementationHeadResult.stdout.trim();
    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DOING",
      "--commit",
      priorImplementationHead,
      "--root",
      taskWorktree,
    ]);
    await execFileAsync("git", ["add", `.agentplane/tasks/${taskId}`], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: persist prior implementation metadata"], {
      cwd: taskWorktree,
    });
    await writeFile(path.join(taskWorktree, "intended-resolution.txt"), "keep\n", "utf8");
    const pendingTaskReadme = path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md");
    await writeFile(
      pendingTaskReadme,
      `${await readFile(pendingTaskReadme, "utf8")}\n<!-- pending baseline task metadata -->\n`,
      "utf8",
    );

    const taskCommand = await loadCommandContext({ cwd: taskWorktree, rootOverride: taskWorktree });
    const currentDecision = await buildTaskRouteDecision({
      ctx: taskCommand,
      cwd: taskWorktree,
      rootOverride: taskWorktree,
      taskId,
      includeRemote: false,
    });
    const oldFingerprint = `sha256:${"a".repeat(64)}`;
    const prior = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: currentDecision.workflowStep.preconditionFingerprint.task_revision,
      state_fingerprint_digest: oldFingerprint,
      budget: {
        max_episodes: 4,
        max_agent_runs: 4,
        max_input_tokens: null,
        max_output_tokens: null,
        max_total_tokens: null,
        max_wall_time_ms: null,
        max_changed_files: null,
        max_diff_lines: null,
        max_no_progress_episodes: null,
      },
    });
    const priorStarted = startSupervisorExecutionEpisode({
      journal: prior,
      role: "EVALUATOR",
      kind: "evaluator_episode",
      operation_identity: { test: "completed prior external episode" },
      precondition_fingerprint_digest: oldFingerprint,
    });
    if (priorStarted.status !== "started") throw new Error("expected prior supervisor intent");
    const priorCompleted = completeSupervisorExecutionEpisode({
      journal: priorStarted.journal,
      operation_key: priorStarted.operation_key,
      result: { verdict: "rework" },
    });
    const priorReady = advanceSupervisorExecutionEpisodeState({
      journal: priorCompleted,
      state_fingerprint_digest: oldFingerprint,
      route_observation: { test: "prior result persisted" },
    });
    const stale = startSupervisorExecutionEpisode({
      journal: priorReady,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { test: "changed route after prior result" },
      precondition_fingerprint_digest: currentDecision.workflowStep.preconditionFingerprint.digest,
    });
    if (stale.status !== "stopped" || stale.stop.reason !== "stale_state") {
      throw new Error("expected stale supervisor journal fixture");
    }
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: taskWorktree,
      task_id: taskId,
    });
    await createSupervisorEpisodeStore(journalPath).write(priorReady);

    const packet = await readAgentPacket(taskWorktree, taskId);
    expect(packet.authority.role).toBe("EXECUTOR");
    const resultPath = await writeCompletedResult(packet);
    if (!packet.exchange) throw new Error("expected task-worktree resolution exchange");
    const exchange = JSON.parse(
      await readFile(path.join(packet.exchange.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    expect(exchange).toMatchObject({
      task_id: taskId,
      transition_id: packet.transition_id,
      state_fingerprint: packet.state_fingerprint,
      role: "EXECUTOR",
      purpose: "task_worktree_resolution",
      checkout: await realpath(taskWorktree),
      status: "issued",
    });
    expect(exchange.baseline.changed_paths).toContain(` M .agentplane/tasks/${taskId}/README.md`);
    const accepted = await returnAgentResult(taskWorktree, taskId, resultPath);
    expect(accepted.code, accepted.stderr).toBe(0);
    expect(accepted.stderr).not.toMatch(/unsupported purpose|stale/iu);
    expect(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "consumed" });
    expect(exchange.baseline.head).not.toBe(priorImplementationHead);
    const taskReadme = await readFile(
      path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    expect(taskReadme).toMatch(/commit:\n {2}hash: "[0-9a-f]{40}"/u);
    expect(taskReadme).not.toContain(`hash: "${priorImplementationHead}"`);
    const committedContent = await execFileAsync(
      "git",
      ["show", "HEAD~1:intended-resolution.txt"],
      { cwd: taskWorktree },
    );
    expect(committedContent.stdout).toBe("keep\n");
  });

  it("accepts a fresh read-only worktree observation without implementation authority", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root);
    await runCliSilent([
      "task",
      "plan",
      "set",
      taskId,
      "--text",
      "Report the closed task worktree state without mutating it.",
      "--updated-by",
      "ORCHESTRATOR",
      "--root",
      root,
    ]);
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "ORCHESTRATOR", "--root", root]);
    await writeHarnessGitignore(root);
    await execFileAsync("git", ["add", "."], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed read-only resolution"], {
      cwd: root,
    });

    const slug = "read-only-resolution";
    const taskWorktree = path.join(root, ".agentplane", "worktrees", `${taskId}-${slug}`);
    await runCliSilent([
      "work",
      "start",
      taskId,
      "--agent",
      "CODER",
      "--slug",
      slug,
      "--worktree",
      "--root",
      root,
    ]);
    await runCliSilent([
      "task",
      "set-status",
      taskId,
      "DONE",
      "--force",
      "--yes",
      "--root",
      taskWorktree,
    ]);
    await execFileAsync("git", ["add", "."], { cwd: taskWorktree });
    await execFileAsync("git", ["commit", "-m", "test: persist closed task fixture"], {
      cwd: taskWorktree,
    });
    await writeFile(path.join(taskWorktree, "unresolved-local.txt"), "observe only\n", "utf8");

    const packet = await readAgentPacket(taskWorktree, taskId);
    expect(packet.transition_id).toBe(
      agentTransitionId("agent.task_worktree_resolution", packet.state_fingerprint),
    );
    if (!packet.exchange) throw new Error("expected read-only worktree exchange");
    const workOrder = JSON.parse(
      await readFile(path.join(packet.exchange.directory, packet.exchange.work_order_ref), "utf8"),
    ) as { authority: { sandbox: string } };
    expect(workOrder.authority.sandbox).toBe("read-only");
    const resultPath = await writeCompletedResult(packet);
    const accepted = await returnAgentResult(taskWorktree, taskId, resultPath);

    expect(accepted.code, accepted.stderr).toBe(0);
    expect(
      JSON.parse(await readFile(path.join(packet.exchange.directory, "exchange.json"), "utf8")),
    ).toMatchObject({ status: "consumed" });
    const unresolvedStatus = await execFileAsync(
      "git",
      ["status", "--short", "unresolved-local.txt"],
      { cwd: taskWorktree },
    );
    expect(unresolvedStatus.stdout).toContain("unresolved-local.txt");
    const latestSubject = await execFileAsync("git", ["log", "-1", "--format=%s"], {
      cwd: taskWorktree,
    });
    expect(latestSubject.stdout).toContain("record worktree observation");
  });
});
