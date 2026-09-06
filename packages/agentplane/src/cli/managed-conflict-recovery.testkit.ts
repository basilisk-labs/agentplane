import { digestSupervisorEpisodeValue } from "@agentplaneorg/core/schemas";
import { execFileAsync } from "@agentplaneorg/core/process";

import { expect, vi } from "vitest";

import { refreshExternalAgentRoute } from "../commands/task/external-agent-result-routing.js";
import { executeProductionBranchEpisode } from "../commands/task/branch-task-supervisor-episodes.js";
import { recoverProductionBranchConflict } from "../commands/task/branch-task-supervisor-implementation.js";
import { loadCommandContext } from "../commands/shared/task-backend.js";
import { loadTaskRunnerInspection } from "../runner/usecases/task-run-inspect.js";
import * as taskRunner from "../runner/usecases/task-run.js";
import * as conflictApplication from "../commands/pr/conflict-rework-merge.js";
import * as taskStatus from "../commands/task/set-status.js";
import * as taskContract from "../commands/task/task-execution-contract-observation.js";
import * as artifactCommit from "../commands/task/branch-task-supervisor-artifact-commit.js";

import type { BranchTaskSupervisorOptions } from "../commands/task/branch-task-supervisor.js";
import { resolveSupervisorExecutionEpisodePath } from "../commands/shared/supervisor-execution-episode.js";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

export async function exerciseManagedConflict(opts: {
  worktree: string;
  taskId: string;
  baseSha: string;
  runner_authority: Pick<BranchTaskSupervisorOptions, "sandbox_override" | "danger_authority">;
  drift?: "workspace" | "result" | "policy" | "projection";
  interrupt?: boolean;
  interruptAfterStatus?: boolean;
  interruptAfterContract?: boolean;
  interruptAfterEvidence?: boolean;
  recoveryDrift?: "context" | "workspace" | "policy" | "task";
}): Promise<void> {
  const { worktree, taskId, baseSha } = opts;
  const command = await loadCommandContext({ cwd: worktree, rootOverride: null });
  const decide = () =>
    refreshExternalAgentRoute({ cwd: worktree, task_id: taskId, include_remote: true });
  const decision = await decide();
  expect(decision.workflowStep.id).toBe("agent.provider_conflict_rework");
  const before = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
  const execute = taskRunner.executeTaskRunnerExecution;
  const drift = vi
    .spyOn(taskRunner, "executeTaskRunnerExecution")
    .mockImplementationOnce(async (args) => {
      const journalPath = await resolveSupervisorExecutionEpisodePath({
        git_root: worktree,
        task_id: taskId,
      });
      const journal = JSON.parse(await readFile(journalPath, "utf8")) as {
        operations: { status: string; work_order_ref: string; effect_ref: string }[];
      };
      const intent = journal.operations.at(-1)!;
      expect(intent.status).toBe("intent");
      expect(args.run_id).toBeTruthy();
      expect(intent.work_order_ref.endsWith(`/runs/${args.run_id}/bundle.json`)).toBe(true);
      expect(intent.effect_ref.endsWith(`/runs/${args.run_id}/result.json`)).toBe(true);
      const executed = await execute(args);
      if (opts.drift === "workspace")
        await writeFile(path.join(worktree, "docs/conflict.md"), "foreign subsequent change\n");
      else if (opts.drift === "result")
        executed.result = { ...executed.result, summary: "different unpersisted result" };
      return executed;
    });
  const merge = conflictApplication.applyConflictResolution;
  let snapshotHead: string | null = null;
  let acceptedTask: Awaited<ReturnType<typeof command.taskBackend.getTask>> = null;
  let statusRecoveryDiagnostic: unknown = null;
  const interruption = vi
    .spyOn(conflictApplication, "applyConflictResolution")
    .mockImplementationOnce(async (args) => {
      const route = await decide();
      const fingerprint = route.workflowStep.preconditionFingerprint;
      const journalPath = await resolveSupervisorExecutionEpisodePath({
        git_root: worktree,
        task_id: taskId,
      });
      const journal = JSON.parse(await readFile(journalPath, "utf8")) as {
        operations: { status: string; progress_digest: string; work_order_ref: string }[];
      };
      const operation = journal.operations.at(-1)!;
      expect(operation.status).toBe("completed");
      const implementation = JSON.parse(
        await readFile(
          path.join(path.dirname(operation.work_order_ref), "implementation-context.json"),
          "utf8",
        ),
      ) as {
        execution_base_commit: string;
        execution_baseline_status: { command: string; lines: string[] };
      };
      expect(implementation.execution_base_commit).toBe(before.stdout.trim());
      expect(implementation.execution_baseline_status.command).toBe(
        "git status --short --untracked-files=all",
      );
      expect(operation.progress_digest).toBe(
        digestSupervisorEpisodeValue({
          implementation,
          authority: {
            task_id: fingerprint.task_id,
            task_revision: fingerprint.task_revision,
            task: fingerprint.components.task,
            backend_projection: fingerprint.components.backend_projection,
            policy: fingerprint.components.policy,
            blueprint: fingerprint.components.blueprint,
            knowledge: fingerprint.components.knowledge,
            provider: route.prFlow?.providerObservation ?? null,
          },
        }),
      );
      if (opts.drift === "policy") {
        const snapshot = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
        snapshotHead = snapshot.stdout;
        const gatewayPath = path.join(worktree, "AGENTS.md");
        await writeFile(
          gatewayPath,
          `${await readFile(gatewayPath, "utf8")}\nForeign policy change.\n`,
        );
      }
      if (opts.interruptAfterStatus) acceptedTask = await command.taskBackend.getTask(taskId);
      const applied = await merge(args);
      if (opts.interrupt) throw new Error("interrupted after managed conflict merge");
      return applied;
    });
  const setStatus = taskStatus.cmdTaskSetStatus;
  const statusInterruption =
    opts.interruptAfterStatus || opts.drift === "projection"
      ? vi.spyOn(taskStatus, "cmdTaskSetStatus").mockImplementationOnce(async (args) => {
          const result = await setStatus(args);
          const projected = await command.taskBackend.getTask(taskId);
          if (opts.drift === "projection") {
            if (!projected) throw new Error("Fixture Task projection disappeared.");
            const head = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
            snapshotHead = head.stdout;
            await command.taskBackend.writeTask(
              { ...projected, title: "Foreign concurrent title" },
              { expectedRevision: projected.revision },
            );
            return result;
          }
          statusRecoveryDiagnostic = {
            revisions: [acceptedTask?.revision, projected?.revision],
            changed: Object.keys(projected ?? {}).filter(
              (key) =>
                JSON.stringify(Reflect.get(acceptedTask ?? {}, key)) !==
                JSON.stringify(Reflect.get(projected ?? {}, key)),
            ),
            events: projected?.events?.slice(acceptedTask?.events?.length ?? 0),
          };
          throw new Error("interrupted after managed task status projection");
        })
      : null;
  const reconcile = taskContract.recordObservedTaskExecutionContract;
  const contractInterruption = opts.interruptAfterContract
    ? vi
        .spyOn(taskContract, "recordObservedTaskExecutionContract")
        .mockImplementationOnce(async (args) => {
          await reconcile(args);
          throw new Error("interrupted after managed contract projection");
        })
    : null;
  const commitArtifacts = artifactCommit.commitBranchSupervisorTaskArtifacts;
  let evidenceCommitCalls = 0;
  const evidenceInterruption = opts.interruptAfterEvidence
    ? vi
        .spyOn(artifactCommit, "commitBranchSupervisorTaskArtifacts")
        .mockImplementation(async (args) => {
          evidenceCommitCalls += 1;
          await commitArtifacts(args);
          if (evidenceCommitCalls === 1)
            throw new Error("interrupted after managed evidence commit");
        })
    : null;
  const interrupted = [
    opts.interrupt,
    opts.interruptAfterStatus,
    opts.interruptAfterContract,
    opts.interruptAfterEvidence,
  ].includes(true);
  const runnerCalls = interrupted ? drift : null;
  const apply = async () =>
    executeProductionBranchEpisode({
      input: {
        ...opts.runner_authority,
        ctx: { cwd: worktree },
        command,
        task_id: taskId,
      },
      decision: await decide(),
      decide,
    });
  let outcome: Awaited<ReturnType<typeof apply>>;
  try {
    if (opts.drift) {
      await expect(apply()).rejects.toThrow(
        opts.drift === "workspace"
          ? "Managed conflict workspace changed"
          : opts.drift === "policy"
            ? "Managed conflict task or provider authority changed"
            : opts.drift === "projection"
              ? "Managed conflict Task projection differs from its exact postcondition"
              : "Managed conflict result differs",
      );
      const after = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
      expect(after.stdout).toBe(
        opts.drift === "policy" || opts.drift === "projection" ? snapshotHead : before.stdout,
      );
      if (opts.drift === "projection") {
        const preserved = await command.taskBackend.getTask(taskId);
        expect(preserved?.title).toBe("Foreign concurrent title");
      }
      expect(drift).toHaveBeenCalledTimes(1);
      expect(await readFile(path.join(worktree, "docs/conflict.md"), "utf8")).toBe(
        opts.drift === "workspace" ? "foreign subsequent change\n" : "resolved task and main\n",
      );
      return;
    }
    if (interrupted) {
      await expect(apply()).rejects.toThrow(
        opts.interruptAfterEvidence
          ? "interrupted after managed evidence commit"
          : opts.interruptAfterContract
            ? "interrupted after managed contract projection"
            : opts.interruptAfterStatus
              ? "interrupted after managed task status projection"
              : "interrupted after managed conflict merge",
      );
      interruption.mockRestore();
      statusInterruption?.mockRestore();
      contractInterruption?.mockRestore();
      if (opts.recoveryDrift) {
        const merged = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
        const run = await loadTaskRunnerInspection({ cwd: worktree, task_id: taskId });
        const target =
          opts.recoveryDrift === "context"
            ? path.join(path.dirname(run.paths.bundle_path), "implementation-context.json")
            : path.join(
                worktree,
                opts.recoveryDrift === "task"
                  ? `${command.config.paths.workflow_dir}/${taskId}/README.md`
                  : opts.recoveryDrift === "policy"
                    ? "AGENTS.md"
                    : "docs/conflict.md",
              );
        const previous = await readFile(target, "utf8");
        let replacement =
          opts.recoveryDrift === "context"
            ? JSON.stringify({ ...JSON.parse(previous), result_digest: `sha256:${"0".repeat(64)}` })
            : `${previous}\nForeign recovery change.\n`;
        if (opts.recoveryDrift === "task") {
          const task = await command.taskBackend.getTask(taskId);
          if (!task) throw new Error("Fixture Task disappeared before recovery drift.");
          await command.taskBackend.writeTask(
            { ...task, title: "Foreign recovery title" },
            { expectedRevision: task.revision },
          );
          replacement = await readFile(target, "utf8");
        } else await writeFile(target, replacement);
        for (let attempt = 0; attempt < 2; attempt += 1) {
          await expect(apply()).rejects.toThrow(
            opts.recoveryDrift === "workspace"
              ? opts.interruptAfterStatus
                ? "Managed conflict recovery found foreign workspace changes"
                : "Conflict application does not match the completed bound result"
              : opts.recoveryDrift === "policy"
                ? "Managed conflict recovery non-Task authority changed"
                : opts.recoveryDrift === "task"
                  ? "Managed conflict recovery non-Task authority changed"
                  : "Managed conflict recovery authority or implementation context changed",
          );
          const preserved = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
          expect(preserved.stdout).toBe(merged.stdout);
          expect(await readFile(target, "utf8")).toBe(replacement);
        }
        expect(drift).toHaveBeenCalledTimes(1);
        return;
      }
    }
    outcome = await apply().catch((error: unknown) => {
      if (!opts.interruptAfterStatus) throw error;
      throw new Error(`${String(error)}\n${JSON.stringify(statusRecoveryDiagnostic)}`, {
        cause: error,
      });
    });
    if (runnerCalls) expect(runnerCalls).toHaveBeenCalledTimes(1);
    if (interrupted) {
      if (opts.interruptAfterEvidence) expect(evidenceCommitCalls).toBe(1);
      expect(outcome.provider_episodes).toBe(0);
      const completed = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
      expect(
        await recoverProductionBranchConflict({
          input: { ctx: { cwd: worktree }, command, task_id: taskId },
          decision: await decide(),
          decide,
        }),
      ).toBeNull();
      const repeated = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: worktree });
      expect(repeated.stdout).toBe(completed.stdout);
    }
  } finally {
    drift?.mockRestore();
    interruption?.mockRestore();
    statusInterruption?.mockRestore();
    contractInterruption?.mockRestore();
    evidenceInterruption?.mockRestore();
    runnerCalls?.mockRestore();
  }
  const run = await loadTaskRunnerInspection({ cwd: worktree, task_id: taskId });
  const receipt = JSON.parse(await readFile(run.paths.receipt_path, "utf8")) as {
    scope_evaluation?: unknown;
  };
  const result = JSON.parse(await readFile(run.paths.result_path, "utf8")) as {
    status: string;
    summary: string;
    execution_receipt?: unknown;
    evidence?: { observed_checks?: unknown };
  };
  expect(
    outcome.status,
    JSON.stringify({
      stop: outcome.status === "stopped" ? outcome.stop : null,
      status: result.status,
      summary: result.summary,
      receipt: result.execution_receipt,
      checks: result.evidence?.observed_checks,
      scope: receipt.scope_evaluation,
    }),
  ).toBe("completed");
  expect(await readFile(path.join(worktree, "docs/conflict.md"), "utf8")).toBe(
    "resolved task and main\n",
  );
  await execFileAsync("git", ["merge-base", "--is-ancestor", baseSha, "HEAD"], { cwd: worktree });
}
