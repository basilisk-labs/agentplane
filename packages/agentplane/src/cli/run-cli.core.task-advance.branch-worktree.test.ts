import { execFile } from "node:child_process";
import { cp, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  taskCentricAggregateFromExtensions,
  taskCentricDigest,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import {
  createSupervisorExecutionEpisodeJournal,
  recoverSupervisorExecutionEpisodeJournal,
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

import {
  agentTransitionId,
  MAX_AGENT_ACTION_PACKET_BYTES,
} from "../commands/task/agent-action-packet.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../commands/shared/supervisor-execution-episode.js";
import { buildTaskRouteDecision } from "../commands/shared/route-decision.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { writeFinishedTasks } from "../commands/task/finish-shared.js";
import * as verification from "../commands/task/direct-task-verification.js";
import * as projection from "../commands/task/task-centric-external-result.js";
import {
  resolveQualityReviewTargetSha,
  recordedTaskImplementationCommitSha,
} from "../commands/shared/quality-review-target.js";
import {
  resolveRecordedImplementationRecovery,
  taskReadmesPreserveRecoveryContract,
} from "../commands/task/external-agent-implementation-recovery.js";
import type { ExternalAgentExchange } from "../commands/task/external-agent-exchange.js";
import { defaultConfig } from "./core-imports.js";
import { runCli } from "./run-cli.js";

installRunCliIntegrationHarness();
afterEach(() => vi.useRealTimers());

const execFileAsync = promisify(execFile);

type AgentPacket = {
  transition_id: string;
  state_fingerprint: string;
  action: { kind: string; instruction: string };
  authority: { role: string; mutation: string };
  exchange?: {
    directory: string;
    work_order_ref: string;
    result_path: string;
    resume_argv: string[];
  };
  recovery?: { reason: string; evidence_digest: string };
  stop: { reason: string };
};

function withoutTimestamps(value: string): string {
  return value.replaceAll(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/gu, "<timestamp>");
}

async function createTask(root: string): Promise<string> {
  const io = captureStdIO();
  try {
    const code = await runCli([
      "task",
      "new",
      "--title",
      "Authoritative external branch transition",
      "--description",
      "Exercise the compact external-agent protocol.",
      "--priority",
      "med",
      "--owner",
      "CODER",
      "--tag",
      "code",
      "--verify",
      "bun run test:critical",
      "--root",
      root,
    ]);
    expect(code, io.stderr).toBe(0);
    return io.stdout.trim();
  } finally {
    io.restore();
  }
}

async function readAgentPacket(root: string, taskId: string): Promise<AgentPacket> {
  const io = captureStdIO();
  try {
    const code = await runCli(["task", "advance", taskId, "--agent-json", "--root", root]);
    expect(code, io.stderr).toBe(0);
    expect(Buffer.byteLength(io.stdout.trim(), "utf8")).toBeLessThanOrEqual(
      MAX_AGENT_ACTION_PACKET_BYTES,
    );
    return JSON.parse(io.stdout) as AgentPacket;
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
    await runCliSilent([
      "task",
      "doc",
      "set",
      taskId,
      "--section",
      "Verify Steps",
      "--text",
      "1. Run bun run test:critical. Expected: the focused recovery contract passes.",
      "--updated-by",
      "PLANNER",
      "--root",
      root,
    ]),
  ).toBe(0);
  expect(
    await runCliSilent(["task", "plan", "approve", taskId, "--by", "USER", "--root", root]),
  ).toBe(0);
}

describe("runCli task advance branch worktree", { timeout: 180_000 }, () => {
  it.each(["before verification", "before WorkItem projection"])(
    "recovers an implementation interrupted %s through a fresh episode",
    async (boundary) => {
      const root = await mkGitRepoRootWithBranch("main");
      const config = defaultConfig();
      config.workflow_mode = "branch_pr";
      await writeConfig(root, config);
      await runCliSilent(["branch", "base", "set", "main", "--root", root]);
      const taskId = await createTask(root);
      await cp(
        path.join(process.cwd(), "packages/agentplane/assets/policy"),
        path.join(root, ".agentplane/policy"),
        { recursive: true },
      );
      const existingIgnore = await readFile(path.join(root, ".gitignore"), "utf8");
      await writeFile(
        path.join(root, ".gitignore"),
        `${existingIgnore}\n.agentplane/bin/\n.agentplane/cache.sqlite*\nagentplane-recipes\nnode_modules\npackages/\nwebsite/\n`,
      );
      await writeFile(
        path.join(root, "package.json"),
        JSON.stringify({
          scripts: { "test:critical": "node -e \"console.log('1 passed')\"" },
        }),
      );
      await execFileAsync("git", ["add", ".agentplane", "package.json", ".gitignore"], {
        cwd: root,
      });
      await execFileAsync("git", ["commit", "-m", "test: seed interrupted implementation"], {
        cwd: root,
      });
      await approveStructuredPlan(root, taskId);
      await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
      await execFileAsync("git", ["commit", "-m", "test: persist approved plan"], { cwd: root });
      const packet = await readAgentPacket(root, taskId);
      if (!packet.exchange)
        throw new Error(`missing implementation exchange: ${JSON.stringify(packet)}`);
      const workOrder = JSON.parse(
        await readFile(path.join(packet.exchange.directory, "work-order.json"), "utf8"),
      ) as AgentWorkOrderV2;
      const checkout = workOrder.state_fingerprint.worktree;
      await writeFile(path.join(checkout, "feature.ts"), "export const feature = true;\n");
      const resultFor = (p: AgentPacket, order: AgentWorkOrderV2) => ({
        schema_version: 1,
        kind: "agent_action_result",
        task_id: taskId,
        transition_id: p.transition_id,
        state_fingerprint: p.state_fingerprint,
        role: "EXECUTOR",
        result: {
          schema_version: 2,
          kind: "agent_semantic_result",
          work_order_id: order.work_order_id,
          status: "completed",
          summary: "The recorded implementation satisfies the approved WorkItem.",
          findings: ["The original implementation claim."],
          uncertainty: ["The original implementation limitation."],
        },
      });
      await writeFile(packet.exchange.result_path, JSON.stringify(resultFor(packet, workOrder)));
      const interruption =
        boundary === "before verification"
          ? vi
              .spyOn(verification, "recordDirectTaskVerification")
              .mockRejectedValueOnce(new Error("injected verification interruption"))
          : vi
              .spyOn(projection, "recordTaskCentricExternalResult")
              .mockRejectedValueOnce(new Error("injected verification interruption"));
      const interruptedIo = captureStdIO();
      try {
        expect(await runCli([...packet.exchange.resume_argv.slice(1), "--root", root])).not.toBe(0);
        const status = await execFileAsync("git", ["status", "--short", "--untracked-files=all"], {
          cwd: checkout,
        });
        expect(interruptedIo.stderr, status.stdout).toContain("injected verification interruption");
        expect(interruption).toHaveBeenCalledOnce();
      } finally {
        interruptedIo.restore();
        interruption.mockRestore();
      }
      const ctx = await loadCommandContext({ cwd: checkout, rootOverride: checkout });
      const interrupted = await ctx.taskBackend.getTask(taskId);
      expect(
        taskCentricAggregateFromExtensions(interrupted?.extensions)?.work_items["exercise-worktree"]
          ?.state,
      ).toBe("READY");
      const implementationOutput = await execFileAsync("git", ["rev-parse", "HEAD"], {
        cwd: checkout,
      });
      const implementation = implementationOutput.stdout.trim();
      if (boundary === "before WorkItem projection") {
        if (!interrupted) throw new Error("missing interrupted WorkItem task");
        const aggregate = taskCentricAggregateFromExtensions(interrupted.extensions)!;
        const revision = interrupted.revision! + 1;
        // Seed premature DONE without also introducing an unrelated revision split.
        await ctx.taskBackend.writeTask({
          ...interrupted,
          status: "DONE",
          revision,
          extensions: withTaskCentricAggregate(interrupted.extensions, { ...aggregate, revision }),
        });
        const prematurelyClosed = await ctx.taskBackend.getTask(taskId);
        expect(prematurelyClosed?.status).toBe("DONE");
        expect(
          taskCentricAggregateFromExtensions(prematurelyClosed?.extensions)?.work_items[
            "exercise-worktree"
          ]?.state,
        ).toBe("READY");
        await execFileAsync("git", ["add", ".agentplane"], { cwd: checkout });
        await execFileAsync("git", ["commit", "-m", "test: seed premature DONE recovery"], {
          cwd: checkout,
        });
        const resumedIo = captureStdIO();
        try {
          expect(
            await runCli([...packet.exchange.resume_argv.slice(1), "--root", checkout]),
            resumedIo.stderr,
          ).toBe(0);
          expect((JSON.parse(resumedIo.stdout) as AgentPacket).action.kind).toBe(
            "framework_transition",
          );
        } finally {
          resumedIo.restore();
        }
        const recovered = await ctx.taskBackend.getTask(taskId);
        expect(recovered?.status).toBe("DOING");
        expect(recovered?.verification?.state).toBe("pending");
        expect(
          taskCentricAggregateFromExtensions(recovered?.extensions)?.work_items["exercise-worktree"]
            ?.validation_result?.status,
        ).toBe("passed");
        expect(
          taskCentricAggregateFromExtensions(recovered?.extensions)?.work_items["exercise-worktree"]
            ?.state,
        ).toBe("COMPLETED");
        return;
      }
      expect(
        await runCliSilent([
          "verify",
          taskId,
          "--rework",
          "--by",
          "TESTER",
          "--repo-fixable",
          "--note",
          "Rework: verification was interrupted after the implementation commit.",
          "--root",
          checkout,
        ]),
      ).toBe(0);
      expect(
        await runCliSilent([
          "commit",
          taskId,
          "--allow-tasks",
          "-m",
          `🚧 ${taskId.split("-").at(-1)} task: record interrupted verification recovery`,
          "--root",
          checkout,
        ]),
      ).toBe(0);
      expect(
        await runCliSilent(["task", "advance", taskId, "--agent-json", "--root", checkout]),
      ).not.toBe(0);
      const io = captureStdIO();
      let fresh: AgentPacket;
      try {
        expect(
          await runCli([
            "task",
            "advance",
            taskId,
            "--replacement",
            "--agent-json",
            "--root",
            checkout,
          ]),
          io.stderr,
        ).toBe(0);
        fresh = JSON.parse(io.stdout) as AgentPacket;
      } finally {
        io.restore();
      }
      if (!fresh.exchange) throw new Error("missing fresh recovery exchange");
      const freshOrder = JSON.parse(
        await readFile(path.join(fresh.exchange.directory, "work-order.json"), "utf8"),
      ) as AgentWorkOrderV2;
      const recoveryTarget = await resolveQualityReviewTargetSha({
        gitRoot: checkout,
        workflowDir: ".agentplane/tasks",
        taskId,
        previousEvaluatedSha: implementation,
        workflowMode: "branch_pr",
      });
      expect(recoveryTarget).toBe(implementation);
      const currentRecoveryTask = await ctx.taskBackend.getTask(taskId);
      if (!currentRecoveryTask) throw new Error("missing recovery task");
      const recoveryOptions = {
        command: ctx,
        task: currentRecoveryTask,
        work_order: freshOrder,
        head: freshOrder.state_fingerprint.git_head,
        recorded_commit: recordedTaskImplementationCommitSha(currentRecoveryTask),
      };
      const readmePath = `.agentplane/tasks/${taskId}/README.md`;
      const oldReadme = await execFileAsync("git", ["show", `${implementation}:${readmePath}`], {
        cwd: checkout,
      });
      const newReadme = await readFile(path.join(checkout, readmePath), "utf8");
      expect(taskReadmesPreserveRecoveryContract(oldReadme.stdout, newReadme, implementation)).toBe(
        true,
      );
      expect(await resolveRecordedImplementationRecovery(recoveryOptions)).toEqual({
        commit: implementation,
        execution_base: workOrder.state_fingerprint.git_head,
        semantic: resultFor(packet, workOrder).result,
        exchange: expect.objectContaining({ task_id: taskId }) as ExternalAgentExchange,
      });
      expect(
        await resolveRecordedImplementationRecovery({
          ...recoveryOptions,
          recorded_commit: freshOrder.state_fingerprint.git_head,
        }),
      ).toBeNull();
      const changedPlanTask = structuredClone(currentRecoveryTask);
      const changedPlan = taskCentricAggregateFromExtensions(
        changedPlanTask.extensions,
      )?.current_plan;
      if (!changedPlan) throw new Error("missing recovery plan");
      Reflect.set(changedPlan, "revision", changedPlan.revision + 1);
      expect(
        await resolveRecordedImplementationRecovery({ ...recoveryOptions, task: changedPlanTask }),
      ).toBeNull();
      const evidencePath = path.join(
        checkout,
        ".agentplane/tasks",
        taskId,
        "supervision/implementation-evidence.json",
      );
      const evidenceBefore = await readFile(evidencePath, "utf8");
      await writeFile(evidencePath, "{}");
      try {
        expect(await resolveRecordedImplementationRecovery(recoveryOptions)).toBeNull();
      } finally {
        await writeFile(evidencePath, evidenceBefore);
      }
      const exchangePath = path.join(packet.exchange.directory, "exchange.json");
      const exchangeBefore = await readFile(exchangePath, "utf8");
      const changedReceipt = JSON.parse(exchangeBefore) as ExternalAgentExchange;
      changedReceipt.result_digest = `sha256:${"0".repeat(64)}`;
      await writeFile(exchangePath, JSON.stringify(changedReceipt));
      try {
        expect(await resolveRecordedImplementationRecovery(recoveryOptions)).toBeNull();
      } finally {
        await writeFile(exchangePath, exchangeBefore);
      }
      const replacementResult = resultFor(fresh, freshOrder);
      replacementResult.result.summary = "A replacement summary with no new implementation.";
      replacementResult.result.findings = ["An unproved replacement claim."];
      replacementResult.result.uncertainty = [];
      await writeFile(fresh.exchange.result_path, JSON.stringify(replacementResult));
      const recordedResult = vi.spyOn(projection, "recordTaskCentricExternalResult");
      const resumeIo = captureStdIO();
      try {
        expect(
          await runCli([...fresh.exchange.resume_argv.slice(1), "--root", checkout]),
          resumeIo.stderr,
        ).toBe(0);
        expect(recordedResult).toHaveBeenCalledOnce();
        expect(recordedResult.mock.calls[0]?.[0].semantic).toEqual(
          resultFor(packet, workOrder).result,
        );
      } finally {
        resumeIo.restore();
        recordedResult.mockRestore();
      }
      const completed = await ctx.taskBackend.getTask(taskId);
      const completedAggregate = taskCentricAggregateFromExtensions(completed?.extensions);
      const originalSemantic = resultFor(packet, workOrder).result;
      expect(completedAggregate?.work_items["exercise-worktree"]?.output_manifests[0]?.digest).toBe(
        taskCentricDigest({
          id: "worktree-result",
          result: {
            schema_version: 1,
            kind: "execute",
            task_id: taskId,
            plan_revision: completedAggregate?.current_plan?.revision,
            plan_digest: completedAggregate?.current_plan?.digest,
            work_item_id: "exercise-worktree",
            context_digest:
              freshOrder.planning_context?.digest ?? freshOrder.state_fingerprint.digest,
            status: originalSemantic.status,
            summary: originalSemantic.summary,
            claims: originalSemantic.findings,
            questions: originalSemantic.uncertainty,
            artifacts: ["worktree-result"],
          },
        }),
      );
      expect(
        taskCentricAggregateFromExtensions(completed?.extensions)?.work_items["exercise-worktree"]
          ?.state,
      ).toBe("COMPLETED");
      expect(completed?.extensions?.implementation_commit).toMatchObject({ hash: implementation });
      expect(await readFile(exchangePath, "utf8")).toBe(exchangeBefore);
      const after = await readFile(
        path.join(checkout, ".agentplane/tasks", taskId, "README.md"),
        "utf8",
      );
      expect(await runCliSilent([...fresh.exchange.resume_argv.slice(1), "--root", checkout])).toBe(
        0,
      );
      expect(
        await readFile(path.join(checkout, ".agentplane/tasks", taskId, "README.md"), "utf8"),
      ).toBe(after);
      if (boundary === "before verification") {
        if (!completed) throw new Error("missing completed WorkItem task");
        const verifyIo = captureStdIO();
        try {
          expect(
            await runCli([
              "verify",
              taskId,
              "--ok",
              "--by",
              "TESTER",
              "--note",
              "Verified: completed WorkItem checks passed; record the task-level verification before review.",
              "--details",
              ["affected_unit_integration", "critical_paths", "task_outcome"]
                .map(
                  (check) =>
                    `Check: ${check}\nCommand: bun run test:critical\nResult: pass\nEvidence: fixture verification stub exited 0 during the accepted recovery\nScope: fixture feature implementation`,
                )
                .join("\n\n"),
              "--root",
              checkout,
            ]),
            verifyIo.stderr,
          ).toBe(0);
        } finally {
          verifyIo.restore();
        }
        const verified = await ctx.taskBackend.getTask(taskId);
        if (!verified) throw new Error("missing verified task");
        const verifiedAggregate = taskCentricAggregateFromExtensions(verified.extensions)!;
        const revision = verified.revision! + 1;
        // Seed a task-level review outcome. No hosted PR is needed by this fixture.
        await ctx.taskBackend.writeTask({
          ...verified,
          revision,
          extensions: withTaskCentricAggregate(verified.extensions, {
            ...verifiedAggregate,
            revision,
          }),
          quality_review: {
            state: "rework",
            updated_at: new Date().toISOString(),
            updated_by: "EVALUATOR",
            provenance: "evaluator_supplied",
            evaluated_sha: implementation,
            blueprint_digest: null,
            note: "Change the feature result to false.",
            evidence_refs: [`.agentplane/tasks/${taskId}/quality/fixture/quality-report.json`],
            findings: ["The task-level feature needs correction after all WorkItems completed."],
          },
        });
        await execFileAsync("git", ["add", ".agentplane"], { cwd: checkout });
        await execFileAsync("git", ["commit", "-m", "test: seed task-level review rework"], {
          cwd: checkout,
        });
        const taskRework = await readAgentPacket(checkout, taskId);
        if (!taskRework.exchange) throw new Error("missing task-level rework exchange");
        const reworkOrder = JSON.parse(
          await readFile(path.join(taskRework.exchange.directory, "work-order.json"), "utf8"),
        ) as AgentWorkOrderV2;
        expect(reworkOrder.task.work_item_id ?? null).toBeNull();
        const beforeRework = await ctx.taskBackend.getTask(taskId);
        expect(beforeRework?.verification?.state).toBe("ok");
        const itemsBefore = taskCentricAggregateFromExtensions(
          beforeRework?.extensions,
        )?.work_items;
        await writeFile(path.join(checkout, "feature.ts"), "export const feature = false;\n");
        await writeFile(
          taskRework.exchange.result_path,
          JSON.stringify(resultFor(taskRework, reworkOrder)),
        );
        const reworkIo = captureStdIO();
        try {
          expect(
            await runCli([...taskRework.exchange.resume_argv.slice(1), "--root", checkout]),
            reworkIo.stderr,
          ).toBe(0);
        } finally {
          reworkIo.restore();
        }
        const afterRework = await ctx.taskBackend.getTask(taskId);
        expect(taskCentricAggregateFromExtensions(afterRework?.extensions)?.work_items).toEqual(
          itemsBefore,
        );
        expect(afterRework?.verification?.state).toBe("ok");
      }
      if (boundary === "before WorkItem projection") {
        await execFileAsync(
          "git",
          ["mv", "feature.ts", `.agentplane/tasks/${taskId}/pr/moved-source.ts`],
          { cwd: checkout },
        );
      } else {
        await writeFile(path.join(checkout, "feature.ts"), "export const feature = null;\n");
        await execFileAsync("git", ["add", "feature.ts"], { cwd: checkout });
      }
      await execFileAsync("git", ["commit", "-m", "test: change implementation after recovery"], {
        cwd: checkout,
      });
      const changedHead = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: checkout });
      expect(
        await resolveRecordedImplementationRecovery({
          ...recoveryOptions,
          head: changedHead.stdout.trim(),
        }),
      ).toBeNull();
    },
  );

  it("does not persist DONE when a required WorkItem is incomplete", async () => {
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    const taskId = await createTask(root);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed incomplete WorkItem"], { cwd: root });
    await approveStructuredPlan(root, taskId);
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const task = await ctx.taskBackend.getTask(taskId);
    if (!task) throw new Error("missing incomplete WorkItem task");
    const headOutput = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
    const head = headOutput.stdout.trim();
    await ctx.taskBackend.writeTask({
      ...task,
      status: "DOING",
      verification: {
        state: "ok",
        attempts: 1,
        updated_at: new Date().toISOString(),
        updated_by: "TESTER",
        note: "The task checks passed before WorkItem projection.",
      },
    });
    const before = await ctx.taskBackend.getTask(taskId);
    if (!before) throw new Error("missing prepared task");
    for (let attempt = 0; attempt < 2; attempt += 1) {
      await expect(
        writeFinishedTasks({
          ctx,
          loadedTasks: [{ taskId, task: before }],
          metaTaskId: taskId,
          author: "CODER",
          body: "Verified: candidate completion must retain WorkItem guards.",
          force: attempt === 1,
          resultProvided: true,
          resultSummary: "candidate completion",
          breaking: false,
          taskCommitInfo: { hash: head, message: "test: implementation" },
        }),
      ).rejects.toThrow("required_work_item_incomplete:exercise-worktree");
      expect(await ctx.taskBackend.getTask(taskId)).toEqual(before);
    }
  });

  it("advances once from the base checkout into one worktree-bound semantic episode", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-05T00:00:00.000Z"));
    const root = await mkGitRepoRootWithBranch("main");
    const config = defaultConfig();
    config.workflow_mode = "branch_pr";
    await writeConfig(root, config);
    await runCliSilent(["branch", "base", "set", "main", "--root", root]);
    const taskId = await createTask(root);
    await cp(
      path.join(process.cwd(), "packages", "agentplane", "assets", "policy"),
      path.join(root, ".agentplane", "policy"),
      { recursive: true, force: true },
    );
    await writeFile(
      path.join(root, ".gitignore"),
      [
        ".agentplane/bin/",
        ".agentplane/cache.sqlite-*",
        "agentplane-recipes",
        "node_modules",
        "packages/",
        "website/",
        "",
      ].join("\n"),
      "utf8",
    );
    await execFileAsync("git", ["add", ".agentplane", ".gitignore"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: seed authoritative advance task"], {
      cwd: root,
    });

    await approveStructuredPlan(root, taskId);
    await execFileAsync("git", ["add", ".agentplane"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "test: approve structured branch plan"], {
      cwd: root,
    });
    const initialReadme = await readFile(
      path.join(root, ".agentplane", "tasks", taskId, "README.md"),
      "utf8",
    );
    const callerCwd = process.cwd();
    const jsonPacket = await readAgentPacket(root, taskId);
    expect(process.cwd()).toBe(callerCwd);
    if (!jsonPacket.exchange) throw new Error("expected a worktree-bound semantic exchange");
    const workOrder = JSON.parse(
      await readFile(
        path.join(jsonPacket.exchange.directory, jsonPacket.exchange.work_order_ref),
        "utf8",
      ),
    ) as AgentWorkOrderV2;
    const taskWorktree = workOrder.state_fingerprint.worktree;
    const branchResult = await execFileAsync("git", ["branch", "--show-current"], {
      cwd: taskWorktree,
    });
    const headResult = await execFileAsync("git", ["rev-parse", "HEAD"], {
      cwd: taskWorktree,
    });
    const branch = branchResult.stdout.trim();
    const head = headResult.stdout.trim();
    const readmePath = path.join(taskWorktree, ".agentplane", "tasks", taskId, "README.md");
    const journalPath = await resolveSupervisorExecutionEpisodePath({
      git_root: root,
      task_id: taskId,
    });
    const jsonReadme = await readFile(readmePath, "utf8");
    const jsonJournal = JSON.parse(await readFile(journalPath, "utf8")) as {
      operations: {
        status: string;
        operation_key: string;
        work_order_ref: string | null;
        precondition_fingerprint_digest: string;
        postcondition_fingerprint_digest: string | null;
      }[];
    };
    const worktreeStatus = await execFileAsync("git", ["status", "--porcelain=v1"], {
      cwd: taskWorktree,
    });
    expect(jsonPacket, worktreeStatus.stdout).toMatchObject({
      action: { kind: "agent_episode" },
      authority: { role: "EXECUTOR", mutation: "scoped_write" },
      stop: { reason: "semantic_boundary" },
    });
    expect(branch).toMatch(new RegExp(`^task/${taskId}/`, "u"));
    expect(workOrder.state_fingerprint.git_head).toBe(head);
    expect(workOrder.authority.writable_roots).toEqual([taskWorktree]);
    const sourceManifestPaths = workOrder.required_inputs.flatMap((input) =>
      input.kind !== "knowledge_ref" && input.path ? [input.path] : [],
    );
    expect(sourceManifestPaths.length).toBeGreaterThan(0);
    for (const sourcePath of sourceManifestPaths) {
      if (sourcePath.startsWith("bundled:") || sourcePath.startsWith("runtime:")) {
        expect(sourcePath).toMatch(/^(?:bundled|runtime):[A-Za-z0-9_.:/-]+$/u);
        continue;
      }
      expect(path.isAbsolute(sourcePath)).toBe(false);
      const worktreeSource = path.resolve(taskWorktree, sourcePath);
      const callerSource = path.resolve(root, sourcePath);
      expect(worktreeSource.startsWith(`${taskWorktree}${path.sep}`)).toBe(true);
      expect(worktreeSource).not.toBe(callerSource);
      await expect(readFile(worktreeSource, "utf8")).resolves.toEqual(expect.any(String));
    }
    expect(jsonPacket.exchange.result_path).toBe(
      path.join(jsonPacket.exchange.directory, "result.json"),
    );
    expect(jsonPacket.exchange.resume_argv).toContain(jsonPacket.exchange.result_path);
    const persistedExchange = JSON.parse(
      await readFile(path.join(jsonPacket.exchange.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    expect(persistedExchange).toMatchObject({
      task_id: taskId,
      transition_id: jsonPacket.transition_id,
      state_fingerprint: jsonPacket.state_fingerprint,
      work_order_id: workOrder.work_order_id,
      role: "EXECUTOR",
      purpose: "implementation",
      status: "issued",
    });
    expect(persistedExchange.checkout).toBe(taskWorktree);
    const taskInput = workOrder.required_inputs.find((input) => input.kind === "task_document");
    expect(taskInput?.path).toBe(`.agentplane/tasks/${taskId}/README.md`);
    await expect(readFile(path.join(taskWorktree, taskInput!.path!), "utf8")).resolves.toContain(
      taskId,
    );
    expect(jsonReadme).toContain('status: "DOING"');
    expect(jsonJournal.operations.filter(({ status }) => status === "intent")).toEqual([
      expect.objectContaining({
        work_order_ref: path.join(
          jsonPacket.exchange.directory,
          jsonPacket.exchange.work_order_ref,
        ),
        precondition_fingerprint_digest: jsonPacket.state_fingerprint,
      }),
    ]);
    expect(jsonJournal.operations.at(-1)?.status).toBe("intent");
    expect(jsonJournal.operations.slice(0, -1).every(({ status }) => status === "completed")).toBe(
      true,
    );
    expect(new Set(jsonJournal.operations.map(({ operation_key }) => operation_key)).size).toBe(
      jsonJournal.operations.length,
    );

    await execFileAsync("git", ["restore", `.agentplane/tasks/${taskId}/README.md`], {
      cwd: taskWorktree,
    });
    await rm(journalPath, { force: true });
    expect(await readFile(readmePath, "utf8")).toBe(initialReadme);

    let humanOutput = "";
    const humanIo = captureStdIO();
    try {
      expect(await runCli(["task", "advance", taskId, "--root", root]), humanIo.stderr).toBe(0);
      expect(humanIo.stdout).toContain("agent_episode");
      expect(humanIo.stdout).toContain("semantic_boundary");
      humanOutput = humanIo.stdout;
    } finally {
      humanIo.restore();
    }
    const humanReadme = await readFile(readmePath, "utf8");
    const humanJournal = JSON.parse(await readFile(journalPath, "utf8")) as typeof jsonJournal;
    expect(withoutTimestamps(humanReadme)).toBe(withoutTimestamps(jsonReadme));
    expect(humanJournal.operations.map(({ status }) => status)).toEqual(["completed", "intent"]);
    expect(humanJournal.operations[0]?.precondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(jsonJournal.operations[0]?.precondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(humanJournal.operations[0]?.postcondition_fingerprint_digest).toMatch(/^sha256:/u);
    expect(jsonJournal.operations[0]?.postcondition_fingerprint_digest).toMatch(/^sha256:/u);

    const beforeRenderOnly = await readFile(readmePath, "utf8");
    const journalBeforeRenderOnly = await readFile(journalPath, "utf8");
    const stablePacket = await readAgentPacket(root, taskId);
    if (!stablePacket.exchange) throw new Error("expected a stable semantic exchange");
    const stableExchange = JSON.parse(
      await readFile(path.join(stablePacket.exchange.directory, "exchange.json"), "utf8"),
    ) as ExternalAgentExchange;
    expect(stableExchange).toMatchObject({
      task_id: taskId,
      transition_id: stablePacket.transition_id,
      state_fingerprint: stablePacket.state_fingerprint,
      role: "EXECUTOR",
      purpose: "implementation",
      checkout: taskWorktree,
    });
    expect(stablePacket.transition_id).toBe(jsonPacket.transition_id);
    expect(stablePacket.action).toEqual(jsonPacket.action);
    expect(humanOutput).toContain(stablePacket.state_fingerprint);
    expect(await readFile(readmePath, "utf8")).toBe(beforeRenderOnly);
    expect(await readFile(journalPath, "utf8")).toBe(journalBeforeRenderOnly);

    await execFileAsync("git", ["restore", `.agentplane/tasks/${taskId}/README.md`], {
      cwd: taskWorktree,
    });
    await rm(journalPath, { force: true });
    const recoveryContext = await loadCommandContext({
      cwd: taskWorktree,
      rootOverride: taskWorktree,
    });
    const recoveryDecision = await buildTaskRouteDecision({
      ctx: recoveryContext,
      cwd: taskWorktree,
      rootOverride: taskWorktree,
      taskId,
      includeRemote: false,
    });
    if (recoveryDecision.workflowStep.kind !== "cli_operation") {
      throw new Error("expected an authoritative deterministic transition recovery fixture");
    }
    const initialJournal = createSupervisorExecutionEpisodeJournal({
      task_id: taskId,
      task_revision: null,
      state_fingerprint_digest: recoveryDecision.workflowStep.preconditionFingerprint.digest,
      budget: {
        max_episodes: 50,
        max_agent_runs: 50,
        max_input_tokens: 3_000_000,
        max_output_tokens: 1_000_000,
        max_total_tokens: 4_000_000,
        max_wall_time_ms: 14_400_000,
        max_changed_files: 2000,
        max_diff_lines: null,
        max_no_progress_episodes: 3,
      },
    });
    const startedJournal = startSupervisorExecutionEpisode({
      journal: initialJournal,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: recoveryDecision.workflowStep.operation,
      precondition_fingerprint_digest: recoveryDecision.workflowStep.preconditionFingerprint.digest,
    });
    if (startedJournal.status !== "started") throw new Error("expected started recovery fixture");
    const effectInDoubt = recoverSupervisorExecutionEpisodeJournal({
      journal: startedJournal.journal,
      state_fingerprint_digest: recoveryDecision.workflowStep.preconditionFingerprint.digest,
    });
    await createSupervisorEpisodeStore(journalPath).write(effectInDoubt);
    const recoveryReadme = await readFile(readmePath, "utf8");
    const recoveryPacket = await readAgentPacket(taskWorktree, taskId);
    expect(recoveryPacket).toMatchObject({
      transition_id: agentTransitionId(recoveryDecision.workflowStep.id),
      state_fingerprint: recoveryDecision.workflowStep.preconditionFingerprint.digest,
      action: { kind: "framework_transition" },
      recovery: { reason: "effect_in_doubt", evidence_digest: effectInDoubt.digest },
      stop: { reason: "control_plane_boundary" },
    });
    expect(await readFile(readmePath, "utf8")).toBe(recoveryReadme);
    const persistedRecovery = JSON.parse(await readFile(journalPath, "utf8")) as {
      digest: string;
      operations: unknown[];
    };
    expect(persistedRecovery.digest).toBe(effectInDoubt.digest);
    expect(persistedRecovery.operations).toHaveLength(1);
  });
});
