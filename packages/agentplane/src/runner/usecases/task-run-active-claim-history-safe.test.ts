import { link, mkdir, readFile, rename, rmdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { evaluateStateFingerprintPrecondition } from "@agentplaneorg/core/schemas";
import { installRunCliIntegrationHarness } from "@agentplane/testkit";
import { describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import {
  claimRunnerChildSpawn,
  claimRunnerPreSpawnDecision,
} from "../adapters/execution-control.js";
import { evolveRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import { RunnerRunRepository } from "../run-repository.js";
import type { RunnerProcessTreeObservation, RunnerResult } from "../types.js";
import {
  acquireTaskRunnerActiveClaim,
  readTaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import { assertTaskRunnerActiveClaimHistorySafe } from "./task-run-active-claim-runtime.js";
import { assertNoOrphanedRunnerEffectInDoubt } from "./task-run-orphaned-effect-guard.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
  staleClaim,
  writeActiveClaim,
  writeTerminalSuccess,
} from "./task-run-active-claim.testkit.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

async function writeAcceptedTerminalWithSpawnClaim(opts: {
  prepared: Awaited<ReturnType<typeof prepareTaskRunnerExecution>>;
  at: string;
  process_tree?: RunnerProcessTreeObservation;
}): Promise<void> {
  const decision = await claimRunnerPreSpawnDecision({
    invocation: opts.prepared.invocation,
    decision: "start",
  });
  const ownerId = decision.record.owner_lease?.owner_id;
  if (!ownerId) throw new Error("Prepared start decision did not record an owner lease.");
  await claimRunnerChildSpawn({
    invocation: opts.prepared.invocation,
    start_owner_id: ownerId,
  });
  const preparedFingerprint = opts.prepared.state.state_fingerprint;
  if (!preparedFingerprint) throw new Error("Prepared state fingerprint missing.");
  const result: RunnerResult = {
    status: "success",
    exit_code: 0,
    started_at: opts.prepared.state.created_at,
    ended_at: opts.at,
    summary: "provider completed",
  };
  await writeRunnerRunState({
    state_path: opts.prepared.invocation.state_path,
    state: evolveRunnerRunState({
      state: opts.prepared.state,
      status: "success",
      updated_at: opts.at,
      result,
      ...(opts.process_tree ? { supervision: { process_tree: opts.process_tree } } : {}),
      state_fingerprint: {
        ...preparedFingerprint,
        outcome: "accepted",
        state_before: opts.prepared.precondition_fingerprint,
        state_after: opts.prepared.precondition_fingerprint,
        precondition: evaluateStateFingerprintPrecondition({
          expected: opts.prepared.precondition_fingerprint,
          current: opts.prepared.precondition_fingerprint,
          policy: opts.prepared.precondition_policy,
        }),
        effect_applied: true,
      },
    }),
  });
}

describe("task runner active-claim history guard", () => {
  it("rejects a byte-identical replacement inode with the same generation", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject replaced history guard claim");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-replaced-history-guard-claim",
      operation: "execute",
    });
    const displacedPath = `${lease.claim_path}.displaced`;
    const original = await readFile(lease.claim_path, "utf8");
    await rename(lease.claim_path, displacedPath);
    await writeFile(lease.claim_path, original, "utf8");

    await expect(assertTaskRunnerActiveClaimHistorySafe({ ctx, lease })).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        task_id: taskId,
        run_id: lease.claim.run_id,
        generation: lease.claim.generation,
        observed_generation: lease.claim.generation,
      },
    });
    await expect(readFile(lease.claim_path, "utf8")).resolves.toBe(original);
    await expect(readFile(displacedPath, "utf8")).resolves.toBe(original);
  });

  it("rejects a replaced task directory even when the original claim inode is hard-linked", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject replaced history task directory");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-replaced-history-task-directory",
      operation: "execute",
    });
    const displacedTaskDirectory = `${lease.directory.task_dir}.displaced`;
    await rename(lease.directory.task_dir, displacedTaskDirectory);
    await mkdir(lease.directory.task_dir);
    await link(`${displacedTaskDirectory}/active-run-claim.json`, lease.claim_path);

    await expect(assertTaskRunnerActiveClaimHistorySafe({ ctx, lease })).rejects.toMatchObject({
      code: "RUNNER_RUN_DIRECTORY_BOUNDARY",
    });
  });

  it("rejects a renamed supervisor history directory after claim acquisition", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({ root, script_lines: ["#!/bin/sh", "exit 0"] });
    const taskId = await createDoingTask(root, "Reject hidden runner history");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-hidden-runner-history",
      operation: "execute",
    });
    await rename(
      lease.history_anchor.boundary.run_dir,
      `${lease.history_anchor.boundary.run_dir}.hidden`,
    );

    await expect(assertTaskRunnerActiveClaimHistorySafe({ ctx, lease })).rejects.toMatchObject({
      code: "RUNNER_RUN_DIRECTORY_BOUNDARY",
    });
  });

  it("rejects removal of a historical run after claim acquisition", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({ root, script_lines: ["#!/bin/sh", "exit 0"] });
    const taskId = await createDoingTask(root, "Reject removed historical run");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-historical-before-claim",
    });
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-after-hidden-history",
      operation: "execute",
    });
    await rename(
      historical.invocation.run_dir,
      `${lease.directory.task_dir}/hidden-historical-run`,
    );

    await expect(assertTaskRunnerActiveClaimHistorySafe({ ctx, lease })).rejects.toMatchObject({
      code: "E_IO",
      context: { reason: "runner_runs_changed_during_scan" },
    });
  });

  it("rejects replacement of historical state before the first claim-owned scan", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({ root, script_lines: ["#!/bin/sh", "exit 0"] });
    const taskId = await createDoingTask(root, "Reject pre-scan historical state replacement");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-historical-state-before-claim",
    });
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-after-replaced-history-state",
      operation: "execute",
    });
    const original = await readFile(historical.invocation.state_path, "utf8");
    await rename(historical.invocation.state_path, `${historical.invocation.state_path}.displaced`);
    await writeFile(historical.invocation.state_path, original, "utf8");

    await expect(assertTaskRunnerActiveClaimHistorySafe({ ctx, lease })).rejects.toMatchObject({
      code: "E_IO",
      context: { reason: "runner_runs_changed_during_scan" },
    });
  });

  it("rejects a replaced historical state inode during the orphan scan", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject replaced orphan history state");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-replaced-orphan-history-state",
    });
    const recordedAt = "2026-07-24T10:00:00.000Z";
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: evolveRunnerRunState({
        state: prepared.state,
        status: "failed",
        updated_at: recordedAt,
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
    const displacedStatePath = `${prepared.invocation.state_path}.displaced`;

    await expect(
      assertNoOrphanedRunnerEffectInDoubt({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
        after_history_snapshot: async () => {
          await rename(prepared.invocation.state_path, displacedStatePath);
          await writeRunnerRunState({
            state_path: prepared.invocation.state_path,
            state: evolveRunnerRunState({
              state: prepared.state,
              status: "success",
              updated_at: recordedAt,
            }),
          });
        },
      }),
    ).rejects.toMatchObject({
      code: "E_IO",
      context: {
        reason: "runner_runs_changed_during_scan",
        task_id: taskId,
      },
    });
  });

  it("rejects an add-remove mutation of the supervisor runs inventory during a scan", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({ root, script_lines: ["#!/bin/sh", "exit 0"] });
    const taskId = await createDoingTask(root, "Reject transient foreign runner history");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-before-transient-foreign-history",
    });
    const foreignRunDirectory = path.join(
      path.dirname(prepared.invocation.run_dir),
      "run-transient-foreign-history",
    );

    await expect(
      assertNoOrphanedRunnerEffectInDoubt({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
        after_history_snapshot: async () => {
          await mkdir(foreignRunDirectory);
          await rmdir(foreignRunDirectory);
        },
      }),
    ).rejects.toMatchObject({
      code: "E_IO",
      context: {
        reason: "runner_runs_changed_during_scan",
        task_id: taskId,
      },
    });
  });

  it("rejects creation of a previously missing run state after the history anchor", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({ root, script_lines: ["#!/bin/sh", "exit 0"] });
    const taskId = await createDoingTask(root, "Reject late runner state creation");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-late-state-creation",
    });
    const originalState = await readFile(prepared.invocation.state_path, "utf8");
    await unlink(prepared.invocation.state_path);

    await expect(
      assertNoOrphanedRunnerEffectInDoubt({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
        after_history_snapshot: async () => {
          await writeFile(prepared.invocation.state_path, originalState, "utf8");
        },
      }),
    ).rejects.toMatchObject({
      code: "E_IO",
      context: {
        reason: "runner_runs_changed_during_scan",
        task_id: taskId,
      },
    });
  });

  it("rejects a present runner state file whose JSON value is null", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject null runner state");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-null-state",
    });
    await writeFile(historical.invocation.state_path, "null\n", "utf8");
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-null-state",
      }),
    ).rejects.toThrow("Runner state file has an invalid supervisor contract");
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it("rejects a partial terminal state that matches the historical run id", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject partial runner state");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-partial-terminal-state",
    });
    await writeFile(
      historical.invocation.state_path,
      `${JSON.stringify({
        run_id: historical.invocation.run_id,
        status: "success",
      })}\n`,
      "utf8",
    );
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-partial-terminal-state",
      }),
    ).rejects.toThrow("Runner state file has an invalid supervisor contract");
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it("blocks a missing historical state after child-spawn authority was published", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject missing spawned run state");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-missing-state-after-spawn",
    });
    const decision = await claimRunnerPreSpawnDecision({
      invocation: historical.invocation,
      decision: "start",
    });
    const ownerId = decision.record.owner_lease?.owner_id;
    if (!ownerId) throw new Error("Prepared start decision did not record an owner lease.");
    await claimRunnerChildSpawn({
      invocation: historical.invocation,
      start_owner_id: ownerId,
    });
    await unlink(historical.invocation.state_path);
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-missing-spawned-state",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_runs: [
          {
            run_id: historical.invocation.run_id,
            status: "missing",
            outcome: "effect_unknown",
          },
        ],
        next_safe_action: "manual_repair_required",
      },
    });
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it("retains a stale claim when child-spawn authority exists but run state is missing", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Retain missing spawned run claim");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-stale-missing-spawned-state",
    });
    const decision = await claimRunnerPreSpawnDecision({
      invocation: prepared.invocation,
      decision: "start",
    });
    const ownerId = decision.record.owner_lease?.owner_id;
    if (!ownerId) throw new Error("Prepared start decision did not record an owner lease.");
    await claimRunnerChildSpawn({
      invocation: prepared.invocation,
      start_owner_id: ownerId,
    });
    await unlink(prepared.invocation.state_path);
    const stale = staleClaim({
      task_id: taskId,
      run_id: prepared.invocation.run_id,
    });
    await writeActiveClaim(root, stale);

    await expect(
      acquireTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
        run_id: "run-after-stale-missing-spawned-state",
        operation: "execute",
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        competing_run_id: prepared.invocation.run_id,
        competing_run_authority: "spawn_authorized_but_unconfirmed",
      },
    });
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
        run_id: prepared.invocation.run_id,
      }),
    ).resolves.toMatchObject({
      run_id: prepared.invocation.run_id,
      generation: stale.generation,
    });
  });

  it.each([
    {
      label: "missing cleanup evidence",
      processTree: (_at: string): RunnerProcessTreeObservation | undefined => undefined,
    },
    {
      label: "failed process-group cleanup",
      processTree: (at: string): RunnerProcessTreeObservation => ({
        scope: "posix_process_group",
        group_id: 72_424,
        cleanup_state: "failed",
        terminate_sent_at: at,
        kill_sent_at: null,
        completed_at: at,
        residual_alive: null,
        error: "process-group cleanup could not be confirmed",
        containment_state: "limited",
        containment_limitation: "process-group cleanup is limited to same-session processes",
      }),
    },
  ])("blocks a modern accepted terminal spawn with $label", async ({ processTree }) => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject unconfirmed terminal cleanup");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-modern-terminal-unconfirmed-cleanup",
    });
    const at = new Date().toISOString();
    const observedProcessTree = processTree(at);
    await writeAcceptedTerminalWithSpawnClaim({
      prepared: historical,
      at,
      ...(observedProcessTree ? { process_tree: observedProcessTree } : {}),
    });
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-unconfirmed-terminal-cleanup",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_runs: [
          {
            run_id: historical.invocation.run_id,
            status: "success",
            outcome: "effect_unknown",
          },
        ],
        next_safe_action: "manual_repair_required",
      },
    });
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it("blocks a terminal spawn whose fingerprint journal never advanced beyond prepared", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject terminal spawn without effect journal");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-terminal-prepared-journal",
    });
    const decision = await claimRunnerPreSpawnDecision({
      invocation: historical.invocation,
      decision: "start",
    });
    const ownerId = decision.record.owner_lease?.owner_id;
    if (!ownerId) throw new Error("Prepared start decision did not record an owner lease.");
    await claimRunnerChildSpawn({
      invocation: historical.invocation,
      start_owner_id: ownerId,
    });
    const at = new Date().toISOString();
    await writeRunnerRunState({
      state_path: historical.invocation.state_path,
      state: evolveRunnerRunState({
        state: historical.state,
        status: "failed",
        updated_at: at,
        result: {
          status: "failed",
          exit_code: 1,
          started_at: historical.state.created_at,
          ended_at: at,
          stderr_summary: "provider exited before effect journal persistence",
        },
        supervision: {
          process_tree: {
            scope: "direct_child_only",
            group_id: null,
            cleanup_state: "not_needed",
            terminate_sent_at: null,
            kill_sent_at: null,
            completed_at: at,
            residual_alive: false,
            error: null,
            containment_state: "limited",
            containment_limitation: "direct-child cleanup does not bound descendants",
          },
        },
      }),
    });
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-terminal-prepared-journal",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_runs: [
          {
            run_id: historical.invocation.run_id,
            status: "failed",
            outcome: "effect_unknown",
          },
        ],
      },
    });
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it("blocks accepted terminal evidence without durable child-spawn authority", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Reject accepted state without spawn authority");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-accepted-without-spawn",
    });
    await writeTerminalSuccess(historical, "accepted without spawn authority", {
      publish_spawn_claim: false,
    });
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-accepted-without-spawn",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason: "runner_orphaned_effect_in_doubt",
        task_id: taskId,
        orphaned_runs: [
          {
            run_id: historical.invocation.run_id,
            status: "success",
            outcome: "effect_unknown",
          },
        ],
      },
    });
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it("allows a modern accepted terminal spawn with confirmed cleanup", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Allow confirmed terminal cleanup");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-modern-terminal-confirmed-cleanup",
    });
    const at = new Date().toISOString();
    await writeAcceptedTerminalWithSpawnClaim({
      prepared: historical,
      at,
      process_tree: {
        scope: "direct_child_only",
        group_id: null,
        cleanup_state: "not_needed",
        terminate_sent_at: null,
        kill_sent_at: null,
        completed_at: at,
        residual_alive: false,
        error: null,
        containment_state: "limited",
        containment_limitation: "direct-child cleanup does not bound descendants",
      },
    });
    await expect(
      assertNoOrphanedRunnerEffectInDoubt({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
      }),
    ).resolves.toBeUndefined();
  });

  it("rejects a modern running orphan whose complete fingerprint authority was deleted", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({ root, script_lines: ["#!/bin/sh", "exit 0"] });
    const taskId = await createDoingTask(root, "Reject legacy running orphan");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const historical = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-legacy-running-orphan",
    });
    const legacyState = evolveRunnerRunState({
      state: historical.state,
      status: "running",
      updated_at: "2026-07-24T12:00:00.000Z",
    });
    Reflect.deleteProperty(legacyState, "state_fingerprint");
    await writeRunnerRunState({
      state_path: historical.invocation.state_path,
      state: legacyState,
    });
    const downgradedBundle = structuredClone(historical.bundle);
    Reflect.deleteProperty(downgradedBundle, "state_fingerprint");
    Reflect.deleteProperty(downgradedBundle, "state_fingerprint_policy");
    await RunnerRunRepository.fromInvocation(historical.invocation).writeBundleText(
      `${JSON.stringify(downgradedBundle, null, 2)}\n`,
    );
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-legacy-running-orphan",
      }),
    ).rejects.toMatchObject({
      code: "E_IO",
      context: {
        task_id: taskId,
        run_id: historical.invocation.run_id,
        reason: "runner_modern_fingerprint_authority_missing",
      },
    });
    expect(executeSpy).not.toHaveBeenCalled();
  });

  it.each(["running", "prepared"] as const)(
    "blocks a %s orphan whose accepted fingerprint contradicts lifecycle authority",
    async (status) => {
      const root = await mkGitRepoRoot();
      await configureCustomRunner({
        root,
        script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
      });
      const taskId = await createDoingTask(root, "Reject contradictory accepted fingerprint");
      const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
      const historical = await prepareTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        mode: "execute",
        run_id: `run-contradictory-accepted-${status}`,
      });
      if (status === "prepared") {
        const decision = await claimRunnerPreSpawnDecision({
          invocation: historical.invocation,
          decision: "start",
        });
        const ownerId = decision.record.owner_lease?.owner_id;
        if (!ownerId) throw new Error("Prepared start decision did not record an owner lease.");
        await claimRunnerChildSpawn({
          invocation: historical.invocation,
          start_owner_id: ownerId,
        });
      }
      const preparedFingerprint = historical.state.state_fingerprint;
      if (!preparedFingerprint) throw new Error("Prepared state fingerprint missing.");
      await writeRunnerRunState({
        state_path: historical.invocation.state_path,
        state: evolveRunnerRunState({
          state: historical.state,
          status,
          updated_at: "2026-07-24T13:00:00.000Z",
          state_fingerprint: {
            ...preparedFingerprint,
            outcome: "accepted",
            state_before: historical.precondition_fingerprint,
            state_after: historical.precondition_fingerprint,
            precondition: evaluateStateFingerprintPrecondition({
              expected: historical.precondition_fingerprint,
              current: historical.precondition_fingerprint,
              policy: historical.precondition_policy,
            }),
            effect_applied: true,
          },
        }),
      });
      const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

      await expect(
        executeTaskRunnerExecution({
          ctx,
          cwd: root,
          rootOverride: root,
          task_id: taskId,
          run_id: `run-after-contradictory-${status}`,
        }),
      ).rejects.toThrow("Runner state file has an invalid supervisor contract");
      expect(executeSpy).not.toHaveBeenCalled();
    },
  );
});
