import { mkdir, readFile, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { evaluateStateFingerprintPrecondition } from "@agentplaneorg/core/schemas";
import { installRunCliIntegrationHarness, mkGitRepoRoot } from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../artifacts.js";

import {
  acquireTaskRunnerActiveClaim,
  readTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import {
  staleClaim,
  writeActiveClaim,
  writeTerminalSuccess,
} from "./task-run-active-claim.testkit.js";
import { reconcileTaskRunnerActiveClaim } from "./task-run-active-claim-runtime.js";
import { cancelTaskRunnerExecution } from "./task-run-lifecycle.js";
import {
  configureCustomRunner,
  createDoingTask,
  resolveTestRunnerPaths,
} from "./task-run-lifecycle-cancel.testkit.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

async function writeOrphanedEffectStarted(opts: {
  ctx: Awaited<ReturnType<typeof loadCommandContext>>;
  root: string;
  task_id: string;
  run_id: string;
}): Promise<void> {
  const prepared = await prepareTaskRunnerExecution({
    ctx: opts.ctx,
    cwd: opts.root,
    rootOverride: opts.root,
    task_id: opts.task_id,
    mode: "execute",
    run_id: opts.run_id,
  });
  const orphanedAt = new Date(Date.parse(prepared.state.created_at) + 1).toISOString();
  await writeRunnerRunState({
    state_path: prepared.invocation.state_path,
    state: evolveRunnerRunState({
      state: prepared.state,
      status: "failed",
      updated_at: orphanedAt,
      result: {
        status: "failed",
        exit_code: 8,
        started_at: prepared.state.created_at,
        ended_at: orphanedAt,
        summary: "owner disappeared after the effect journal",
      },
      state_fingerprint: {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "effect_started",
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        state_before: prepared.precondition_fingerprint,
        state_after: null,
        precondition: evaluateStateFingerprintPrecondition({
          expected: prepared.precondition_fingerprint,
          current: prepared.precondition_fingerprint,
          policy: prepared.precondition_policy,
        }),
        effect_applied: null,
        post_state_reason_code: null,
      },
    }),
  });
}

describe("task-run cancellation effect-in-doubt guard", () => {
  it("refuses to treat another run's claim as the effect-in-doubt guard", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Refuse unrelated effect guard");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-unclaimed-effect-unknown";
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: runId,
    });
    const terminalAt = new Date(Date.parse(prepared.state.created_at) + 1).toISOString();
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "failed",
        updated_at: terminalAt,
        result: {
          status: "failed",
          exit_code: 8,
          started_at: prepared.state.created_at,
          ended_at: terminalAt,
          summary: "effect outcome is unknown",
        },
        state_fingerprint: {
          schema_version: 1,
          kind: "runner_state_fingerprint_record",
          outcome: "effect_unknown",
          precondition_fingerprint: prepared.precondition_fingerprint,
          precondition_policy: prepared.precondition_policy,
          state_before: prepared.precondition_fingerprint,
          state_after: null,
          precondition: evaluateStateFingerprintPrecondition({
            expected: prepared.precondition_fingerprint,
            current: prepared.precondition_fingerprint,
            policy: prepared.precondition_policy,
          }),
          effect_applied: null,
          post_state_reason_code: null,
        },
      }),
    });
    const competing = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-unrelated-claim",
      operation: "execute",
    });

    await expect(
      cancelTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: runId,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_effect_in_doubt_claim_conflict",
        task_id: taskId,
        run_id: runId,
        competing_run_id: competing.claim.run_id,
        competing_generation: competing.claim.generation,
      },
    });
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: competing.claim.run_id,
      }),
    ).resolves.toMatchObject({
      generation: competing.claim.generation,
      run_id: competing.claim.run_id,
    });
    await releaseTaskRunnerActiveClaim(competing);
  });

  it("fails closed when supervisor history contains a run without state", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Block incomplete supervisor history");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const incompleteRunId = "run-missing-state";
    const incompletePaths = await resolveTestRunnerPaths(root, taskId, incompleteRunId);
    await mkdir(incompletePaths.run_dir, { recursive: true });
    await writeFile(path.join(incompletePaths.run_dir, "unversioned-artifact"), "unknown\n");
    const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-missing-state",
      }),
    ).rejects.toMatchObject({
      code: "E_IO",
      context: {
        reason: "runner_run_state_missing",
        task_id: taskId,
        run_id: incompleteRunId,
      },
    });
    expect(adapterExecute).not.toHaveBeenCalled();
  });

  it("allows a crash-empty run directory with no state or spawn authority", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Allow crash-empty supervisor history");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const incompleteRunId = "run-empty-before-preparation-record";
    const incompletePaths = await resolveTestRunnerPaths(root, taskId, incompleteRunId);
    await mkdir(incompletePaths.run_dir, { recursive: true });
    const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-empty-state",
      }),
    ).resolves.toMatchObject({
      state: { status: "success" },
    });
    expect(adapterExecute).toHaveBeenCalledTimes(1);
    await expect(readdir(incompletePaths.run_dir)).resolves.toEqual([]);
  });

  it("allows a versioned pre-provider run whose state disappeared before child spawn", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Allow versioned pre-provider history");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-versioned-before-spawn",
    });
    await unlink(historical.invocation.state_path);
    const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-versioned-pre-provider-state",
      }),
    ).resolves.toMatchObject({
      state: { status: "success" },
    });
    expect(adapterExecute).toHaveBeenCalledTimes(1);
    await expect(
      readFile(path.join(historical.invocation.run_dir, ".runner-preparation-record.json"), "utf8"),
    ).resolves.toContain(`"run_id":"${historical.invocation.run_id}"`);
  });

  it("blocks an orphaned non-latest effect before acquiring a new claim", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Block historical orphaned effect");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const orphanedRunId = "run-older-orphaned-effect";
    await writeOrphanedEffectStarted({
      ctx,
      root,
      task_id: taskId,
      run_id: orphanedRunId,
    });

    const newer = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-newer-safe-terminal",
    });
    const newerAt = new Date(Date.parse(newer.state.created_at) + 2).toISOString();
    await writeRunnerRunState({
      state_path: newer.invocation.state_path,
      state: evolveRunnerRunState({
        state: newer.state,
        status: "failed",
        updated_at: newerAt,
        result: {
          status: "failed",
          exit_code: 2,
          started_at: newer.state.created_at,
          ended_at: newerAt,
          summary: "newer safe terminal run",
        },
      }),
    });
    const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      reconcileTaskRunnerActiveClaim({
        ctx,
        task_id: taskId,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_run_ids: [orphanedRunId],
      },
    });
    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-orphaned-effect",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_run_ids: [orphanedRunId],
        orphaned_runs: [
          {
            run_id: orphanedRunId,
            status: "failed",
            outcome: "effect_started",
          },
        ],
        next_safe_action: "manual_repair_required",
      },
    });
    expect(adapterExecute).not.toHaveBeenCalled();
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-after-orphaned-effect",
      }),
    ).resolves.toBeNull();
  });

  it("blocks an older orphaned effect after retiring a newer stale terminal claim", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Block orphan hidden by terminal claim");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const orphanedRunId = "run-older-hidden-orphaned-effect";
    await writeOrphanedEffectStarted({
      ctx,
      root,
      task_id: taskId,
      run_id: orphanedRunId,
    });

    const terminal = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-newer-stale-terminal-claim",
    });
    await writeTerminalSuccess(terminal, "newer safe terminal run");
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: terminal.invocation.run_id }),
    );
    const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-hidden-orphaned-effect",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_run_ids: [orphanedRunId],
      },
    });
    expect(adapterExecute).not.toHaveBeenCalled();
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-after-hidden-orphaned-effect",
      }),
    ).resolves.toBeNull();
  });

  it("blocks an older orphan after recovering a stale prepared claim in acquire", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
    const taskId = await createDoingTask(root, "Block orphan hidden by prepared claim");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const orphanedRunId = "run-older-orphan-hidden-by-prepared";
    await writeOrphanedEffectStarted({
      ctx,
      root,
      task_id: taskId,
      run_id: orphanedRunId,
    });
    const preparedClaimRun = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-newer-stale-prepared-claim",
    });
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: preparedClaimRun.invocation.run_id }),
    );
    const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-prepared-hidden-orphan",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_run_ids: [orphanedRunId],
      },
    });
    expect(adapterExecute).not.toHaveBeenCalled();
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-after-prepared-hidden-orphan",
      }),
    ).resolves.toBeNull();
  });

  it.each(["effect_unknown", "post_state_unknown"] as const)(
    "restores a durable blocker when cancel observes %s without its active claim",
    async (outcome) => {
      const root = await mkGitRepoRoot();
      await configureCustomRunner(root, ["#!/bin/sh", "exit 0"]);
      const taskId = await createDoingTask(root, `Restore ${outcome} cancellation guard`);
      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const runId = `run-missing-claim-${outcome}`;
      await acquireTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: runId,
        operation: "execute",
      });
      const prepared = await prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "execute",
        run_id: runId,
      });
      const terminalAt = new Date().toISOString();
      await writeRunnerRunState({
        state_path: prepared.invocation.state_path,
        state: evolveRunnerRunState({
          state: prepared.state,
          status: "failed",
          updated_at: terminalAt,
          result: {
            status: "failed",
            exit_code: 8,
            started_at: prepared.state.created_at,
            ended_at: terminalAt,
            summary: `simulated ${outcome} terminal state`,
          },
          state_fingerprint: {
            schema_version: 1,
            kind: "runner_state_fingerprint_record",
            outcome,
            precondition_fingerprint: prepared.precondition_fingerprint,
            precondition_policy: prepared.precondition_policy,
            state_before: prepared.precondition_fingerprint,
            state_after: null,
            precondition: evaluateStateFingerprintPrecondition({
              expected: prepared.precondition_fingerprint,
              current: prepared.precondition_fingerprint,
              policy: prepared.precondition_policy,
            }),
            effect_applied: outcome === "post_state_unknown" ? true : null,
            post_state_reason_code:
              outcome === "post_state_unknown" ? "post_state_unavailable" : null,
          },
        }),
      });
      const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
      await unlink(path.join(runnerPaths.task_dir, "active-run-claim.json"));
      const adapterExecute = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

      await expect(
        cancelTaskRunnerExecution({
          ctx,
          cwd: root,
          rootOverride: root,
          task_id: taskId,
          run_id: runId,
        }),
      ).rejects.toMatchObject({
        code: "E_USAGE",
        context: {
          reason: "runner_terminal_state_immutable",
          current_status: "failed",
        },
      });

      await expect(
        readTaskRunnerActiveClaim({
          git_root: root,
          workflow_dir: ".agentplane/tasks",
          task_id: taskId,
          run_id: runId,
        }),
      ).resolves.toMatchObject({
        task_id: taskId,
        run_id: runId,
        operation: "effect_in_doubt",
      });
      await expect(
        executeTaskRunnerExecution({
          ctx,
          cwd: root,
          rootOverride: root,
          task_id: taskId,
          run_id: `run-after-missing-claim-${outcome}`,
        }),
      ).rejects.toMatchObject({
        code: "E_USAGE",
        context: {
          active_run_authority: "supervisor_active_run_claim",
          competing_run_id: runId,
          competing_operation: "effect_in_doubt",
        },
      });
      expect(adapterExecute).not.toHaveBeenCalled();
      const task = await ctx.taskBackend.getTask(taskId);
      expect(task?.runner?.run_id).not.toBe(runId);
      const events = await readFile(runnerPaths.events_path, "utf8");
      expect(events).toContain('"type":"runner_effect_in_doubt_claim_restored"');
      expect(events).toContain('"type":"runner_terminal_projection_deferred"');
      expect(events).toContain(`"state_fingerprint_outcome":"${outcome}"`);
    },
  );
});
