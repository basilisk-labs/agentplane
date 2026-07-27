import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import {
  validateRunnerEffectJournal,
  validateRunnerEffectOperation,
  validateRunnerEffectOperationRef,
  type StateFingerprint,
  type StateFingerprintPreconditionDiagnostic,
} from "@agentplaneorg/core/schemas";
import { installRunCliIntegrationHarness } from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CloudBackend, LocalBackend } from "../../backends/task-backend.js";
import { cloudProjectionIdentitySha256 } from "../../backends/task-backend/cloud-projection-identity.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import { resolveRunnerEffectOperationPaths } from "../effect-operation.js";
import { captureGitSnapshot } from "../observation/git-snapshot.js";
import { RunnerRunRepository } from "../run-repository.js";
import {
  captureRunnerStateFingerprint,
  RUNNER_STATE_FINGERPRINT_POLICY,
} from "../state-fingerprint.js";
import type { RunnerContextBundle } from "../types.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import {
  configureCustomRunner,
  createDoingTask,
  createFailedSource,
  mkGitRepoRoot,
} from "./task-run-active-claim.testkit.js";
import { resumeTaskRunnerExecution, retryTaskRunnerExecution } from "./task-run-lifecycle.js";
import { isRunnerEffectInDoubt } from "./task-run-active-claim-authority.js";
import { reconcileStaleTerminalTaskRunnerActiveClaim } from "./task-run-active-claim-runtime.js";
import {
  executeStateBoundRunnerInvocation,
  RunnerPostStateUnavailableCliError,
  RunnerStateFingerprintCliError,
} from "./task-run-state-fingerprint.js";
import { persistRunnerStateFingerprintPostStateUnknown } from "./task-run-state-fingerprint-persistence.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

async function captureRejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("Expected promise to reject.");
}

async function switchReplayFixtureToAcknowledgedCloud(opts: {
  root: string;
  task_id: string;
  ctx: Awaited<ReturnType<typeof loadCommandContext>>;
}) {
  const endpoint = "https://cloud.example";
  const projectId = "project-state-fingerprint";
  const provider = "github";
  const initialCheckedAt = new Date().toISOString();
  const acknowledgedAt = new Date(Date.now() + 1000).toISOString();
  const task = await opts.ctx.taskBackend.getTask(opts.task_id);
  if (!task) throw new Error(`Task not found: ${opts.task_id}`);
  await opts.ctx.taskBackend.writeTask({
    ...task,
    sync: {
      version: 1,
      external_refs: [{ provider, remote_id: "123" }],
      field_policies: {},
      freshness: {
        provider_revision: "provider-1",
        projected_at: initialCheckedAt,
      },
      conflicts: [],
    },
  });
  const statePath = path.join(opts.root, ".agentplane", "backends", "cloud", "state.json");
  await Promise.all([
    mkdir(path.dirname(opts.ctx.backendConfigPath), { recursive: true }),
    mkdir(path.dirname(statePath), { recursive: true }),
  ]);
  await Promise.all([
    writeFile(
      opts.ctx.backendConfigPath,
      `${JSON.stringify({
        id: "cloud",
        version: 1,
        settings: {
          endpoint,
          token: "token",
          project_id: projectId,
          provider,
          cache_dir: ".agentplane/tasks",
          stale_after_seconds: 300,
          autosync_enabled: true,
          autosync_pull_on_read: false,
          autosync_pull_on_write: false,
          autosync_push_on_write: true,
        },
      })}\n`,
      "utf8",
    ),
    writeFile(
      statePath,
      `${JSON.stringify({
        last_checked_at: initialCheckedAt,
        last_start_ready_pull_at: null,
        pending_projection_apply: null,
        pending_push: null,
        projection_identity_sha256: cloudProjectionIdentitySha256({
          endpoint,
          projectId,
          provider,
        }),
      })}\n`,
      "utf8",
    ),
  ]);
  const fetchImpl = vi.fn<typeof fetch>((_input, init) => {
    if (typeof init?.body !== "string") throw new TypeError("Expected cloud push body.");
    const body = JSON.parse(init.body) as {
      projection?: {
        request_id?: string;
        projection_sha256?: string;
        task_count?: number;
        project_id?: string;
        provider?: string | null;
      };
    };
    return Promise.resolve(
      Response.json({
        data: {
          last_checked_at: acknowledgedAt,
          projection_ack: {
            status: "persisted",
            request_id: body.projection?.request_id,
            projection_sha256: body.projection?.projection_sha256,
            task_count: body.projection?.task_count,
            project_id: body.projection?.project_id,
            provider: body.projection?.provider,
          },
        },
      }),
    );
  });
  const cache = new LocalBackend({ dir: path.join(opts.root, ".agentplane", "tasks") });
  const backend = new CloudBackend(
    {
      endpoint,
      token: "token",
      project_id: projectId,
      provider,
      cache_dir: ".agentplane/tasks",
      stale_after_seconds: 300,
      autosync_enabled: true,
      autosync_pull_on_read: false,
      autosync_pull_on_write: false,
      autosync_push_on_write: true,
    },
    {
      root: opts.root,
      cache,
      fetchImpl,
      autoSyncNetworkAllowed: true,
    },
  );
  opts.ctx.taskBackend = backend;
  opts.ctx.backendId = backend.id;
  opts.ctx.memo = {};
  return { fetchImpl, statePath };
}

describe("task-run state fingerprint precondition", () => {
  it("keeps prepared artifacts outside the guarded state and records before/after state", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint success");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
    const originalExecute = CustomRunnerAdapter.prototype.execute;
    let effectJournalState: Awaited<ReturnType<RunnerRunRepository["readState"]>> = null;
    let effectJournalEvents = "";
    let effectOperationAtFirstAdapterInstruction: Record<string, unknown> | null = null;
    let effectJournalAtFirstAdapterInstruction: Record<string, unknown> | null = null;
    let effectReferenceAtFirstAdapterInstruction: Record<string, unknown> | null = null;
    const executeSpy = vi
      .spyOn(CustomRunnerAdapter.prototype, "execute")
      .mockImplementation(async function (invocation) {
        const repository = await RunnerRunRepository.openExistingTaskRun({
          git_root: root,
          workflow_dir: ctx.config.paths.workflow_dir,
          task_id: taskId,
          run_id: invocation.run_id,
          storage: "supervisor",
        });
        effectJournalState = await repository.readState();
        effectJournalEvents = await readFile(invocation.events_path, "utf8");
        const reference = JSON.parse(
          await readFile(path.join(invocation.run_dir, ".runner-effect-operation.json"), "utf8"),
        ) as Record<string, unknown>;
        validateRunnerEffectOperationRef(reference);
        const paths = resolveRunnerEffectOperationPaths({
          run_dir: invocation.run_dir,
          operation_key: String(reference.operation_key),
        });
        const operation = JSON.parse(await readFile(paths.operation_path, "utf8")) as Record<
          string,
          unknown
        >;
        const journal = JSON.parse(await readFile(paths.journal_path, "utf8")) as Record<
          string,
          unknown
        >;
        validateRunnerEffectOperation(operation);
        validateRunnerEffectJournal(journal);
        effectOperationAtFirstAdapterInstruction = operation;
        effectJournalAtFirstAdapterInstruction = journal;
        effectReferenceAtFirstAdapterInstruction = reference;
        return await originalExecute.call(this, invocation);
      });

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: "run-state-fingerprint-success",
    });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(effectJournalState?.state_fingerprint).toMatchObject({
      outcome: "effect_started",
      effect_applied: null,
      state_after: null,
      post_state_reason_code: null,
    });
    expect(effectJournalEvents).toContain('"type":"runner_effect_started"');
    expect(effectOperationAtFirstAdapterInstruction).toMatchObject({
      task_id: taskId,
      origin_run_id: "run-state-fingerprint-success",
      adapter_id: "custom",
      enforcement: "supervisor_single_spawn",
    });
    expect(effectJournalAtFirstAdapterInstruction).toMatchObject({ phase: "started" });
    expect(effectReferenceAtFirstAdapterInstruction).toMatchObject({
      run_id: "run-state-fingerprint-success",
      enforcement: "supervisor_single_spawn",
    });
    if (!effectOperationAtFirstAdapterInstruction || !effectJournalAtFirstAdapterInstruction) {
      throw new Error("Expected runner effect operation before adapter instruction.");
    }
    const operationKey = String(effectOperationAtFirstAdapterInstruction.operation_key);
    const claimGeneration = String(effectOperationAtFirstAdapterInstruction.claim_generation);
    expect(String(effectOperationAtFirstAdapterInstruction.idempotency_key)).toEqual(
      `runner-effect:${operationKey}`,
    );
    expect(String(effectJournalAtFirstAdapterInstruction.operation_key)).toBe(operationKey);
    expect(String(effectJournalAtFirstAdapterInstruction.claim_generation)).toBe(claimGeneration);
    expect(effectJournalState?.effect_operation).toMatchObject({
      run_id: "run-state-fingerprint-success",
      operation_key: operationKey,
      claim_generation: claimGeneration,
    });
    expect(executed.precondition).toMatchObject({
      status: "fresh",
      reason_code: "state_fingerprint_fresh",
    });
    expect(executed.precondition_fingerprint).toEqual(executed.state_before);
    expect(executed.bundle.state_fingerprint).toEqual(executed.precondition_fingerprint);
    expect(executed.state_after).toMatchObject({
      kind: "state_fingerprint",
      task_id: taskId,
    });
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-state-fingerprint-success",
      storage: "supervisor",
    });
    const persisted = await repository.readState();
    expect(persisted?.state_fingerprint).toEqual({
      schema_version: 1,
      kind: "runner_state_fingerprint_record",
      outcome: "accepted",
      precondition_fingerprint: executed.precondition_fingerprint,
      precondition_policy: executed.precondition_policy,
      state_before: executed.state_before,
      state_after: executed.state_after,
      precondition: executed.precondition,
      effect_applied: true,
      post_state_reason_code: null,
    });
  });

  it("retains an in-doubt claim when the adapter effect throws after its durable journal", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint effect unknown");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockRejectedValue(
      new Error("simulated adapter boundary failure"),
    );

    await expect(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-state-fingerprint-effect-unknown",
      }),
    ).rejects.toThrow("simulated adapter boundary failure");

    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-state-fingerprint-effect-unknown",
      storage: "supervisor",
    });
    const persisted = await repository.readState();
    expect(persisted).toMatchObject({
      status: "failed",
      state_fingerprint: {
        outcome: "effect_unknown",
        effect_applied: null,
        state_after: null,
        post_state_reason_code: null,
      },
    });
    const events = await readFile(repository.paths.events_path, "utf8");
    expect(events).toContain('"type":"runner_effect_started"');
    expect(events).toContain('"type":"runner_effect_unknown"');
    await expect(
      reconcileStaleTerminalTaskRunnerActiveClaim({
        ctx,
        task_id: taskId,
      }),
    ).resolves.toBe("retained");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner?.run_id).not.toBe("run-state-fingerprint-effect-unknown");
  });

  it("withholds terminal success when post-state capture is unavailable", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint post-state unavailable");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-post-state-unavailable",
    });
    let effectApplied = false;

    const onPostStateError = vi.fn(
      async ({
        result,
        state_fingerprint: stateFingerprint,
      }: {
        error?: unknown;
        result: Parameters<typeof persistRunnerStateFingerprintPostStateUnknown>[0]["result"];
        state_fingerprint: Parameters<
          typeof persistRunnerStateFingerprintPostStateUnknown
        >[0]["state_fingerprint"];
      }) => {
        await persistRunnerStateFingerprintPostStateUnknown({
          ctx,
          task_id: taskId,
          invocation: prepared.invocation,
          result,
          state_fingerprint: stateFingerprint,
        });
      },
    );
    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        probes: {
          capture_git: async () => {
            if (effectApplied) throw new Error("post-state capture unavailable");
            return await captureGitSnapshot({ repository_root: root });
          },
        },
        on_post_state_error: onPostStateError,
        apply: () => {
          effectApplied = true;
          return Promise.resolve({
            status: "success",
            exit_code: 0,
            started_at: "2026-07-24T10:00:00.000Z",
            ended_at: "2026-07-24T10:00:01.000Z",
          });
        },
      }),
    );

    expect(rejection).toBeInstanceOf(RunnerPostStateUnavailableCliError);
    expect(rejection).toMatchObject({
      context: { reason_code: "runner_post_state_unavailable" },
      state_fingerprint: {
        outcome: "post_state_unknown",
        effect_applied: true,
        state_after: null,
        post_state_reason_code: "post_state_unavailable",
      },
    });
    expect(onPostStateError).toHaveBeenCalledTimes(1);
    const postStateErrorCall = onPostStateError.mock.calls[0]?.[0];
    expect(postStateErrorCall?.error).toBe(rejection);
    expect(postStateErrorCall?.result).toMatchObject({ status: "success", exit_code: 0 });
    expect(postStateErrorCall?.state_fingerprint).toMatchObject({
      outcome: "post_state_unknown",
      effect_applied: true,
    });
    expect(
      isRunnerEffectInDoubt({
        state_fingerprint:
          rejection instanceof RunnerPostStateUnavailableCliError
            ? rejection.state_fingerprint
            : undefined,
      }),
    ).toBe(true);
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: prepared.invocation.run_id,
      storage: "supervisor",
    });
    const persisted = await repository.readState();
    expect(persisted).toMatchObject({
      status: "prepared",
      result: { status: "success", exit_code: 0 },
      state_fingerprint: {
        outcome: "post_state_unknown",
        effect_applied: true,
        state_after: null,
      },
    });
    expect(await readFile(repository.paths.events_path, "utf8")).toContain(
      '"type":"runner_post_state_unknown"',
    );
  });

  it("rejects an unstable double-captured state before entering the adapter", async () => {
    const root = await mkGitRepoRoot();
    const sourcePath = path.join(root, "unstable-source.ts");
    await writeFile(sourcePath, "export const value = 1;\n", "utf8");
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint unstable generation");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-unstable-generation",
    });
    let captures = 0;
    const apply = vi.fn(() =>
      Promise.reject(new Error("Adapter effect must not run for unstable state.")),
    );

    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        probes: {
          capture_git: async () => {
            const snapshot = await captureGitSnapshot({ repository_root: root });
            captures += 1;
            if (captures === 1) {
              await writeFile(sourcePath, "export const value = 2;\n", "utf8");
            }
            return snapshot;
          },
        },
        apply,
      }),
    );

    expect(rejection).toBeInstanceOf(RunnerStateFingerprintCliError);
    expect(apply).not.toHaveBeenCalled();
    if (!(rejection instanceof RunnerStateFingerprintCliError)) {
      throw new Error("Expected a RunnerStateFingerprintCliError.");
    }
    expect(
      rejection.state_fingerprint.precondition.changed_components.map((entry) => entry.component),
    ).toEqual(["git"]);
  });

  it("rejects replay anchor persistence after a concurrent prepared-revision change", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint replay CAS");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-replay-cas",
    });
    const preparedRevision = prepared.bundle.task?.data.revision;
    if (typeof preparedRevision !== "number") {
      throw new Error("Prepared task revision missing.");
    }
    const apply = vi.fn(() =>
      Promise.reject(new Error("Adapter effect must not run for stale replay CAS.")),
    );

    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        advance_precondition: async () => {
          const current = await ctx.taskBackend.getTask(taskId);
          if (!current) throw new Error(`Task not found: ${taskId}`);
          await ctx.taskBackend.writeTask({
            ...current,
            title: "Concurrent mutation between assert and replay anchor",
          });
          await persistRunnerOutcomeToTask({
            ctx,
            task_id: taskId,
            bundle: prepared.bundle,
            state: prepared.state,
            ordering_authority: "current_active_claim",
            expected_task_revision: preparedRevision,
          });
          throw new Error("Stale CAS unexpectedly succeeded.");
        },
        apply,
      }),
    );

    expect(rejection).toMatchObject({
      code: "E_VALIDATION",
      context: {
        reason_code: "task_revision_conflict",
        expected_revision: preparedRevision,
      },
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("rejects a concurrent HEAD advance while accepting a replay anchor task advance", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint replay HEAD CAS");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-replay-head-cas",
    });
    const apply = vi.fn(() =>
      Promise.reject(new Error("Adapter effect must not run after a concurrent HEAD advance.")),
    );

    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        advance_precondition: async () => {
          const anchoredTask = await ctx.taskBackend.getTask(taskId);
          if (!anchoredTask) throw new Error(`Task not found: ${taskId}`);
          await ctx.taskBackend.writeTask({
            ...anchoredTask,
            title: "Trusted replay anchor",
          });
          const expectedTask = await ctx.taskBackend.getTask(taskId);
          if (!expectedTask) throw new Error(`Task not found: ${taskId}`);
          await execFileAsync("git", ["commit", "--allow-empty", "-m", "concurrent head advance"], {
            cwd: root,
            env: gitEnv(),
          });
          return { expected_task: expectedTask };
        },
        apply,
      }),
    );

    expect(rejection).toBeInstanceOf(RunnerStateFingerprintCliError);
    expect(apply).not.toHaveBeenCalled();
    if (!(rejection instanceof RunnerStateFingerprintCliError)) {
      throw new Error("Expected a RunnerStateFingerprintCliError.");
    }
    expect(rejection.state_fingerprint.precondition.identity_changes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "task_revision" }),
        expect.objectContaining({ field: "git_head" }),
      ]),
    );
  });

  it.each(["resume", "retry"] as const)(
    "%s advances the fingerprint after persisting its replay anchor and rechecks before execution",
    async (action) => {
      const root = await mkGitRepoRoot();
      await configureCustomRunner({
        root,
        script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
      });
      const taskId = await createDoingTask(root, `State fingerprint ${action}`);
      const { ctx, prepared: source } = await createFailedSource({
        root,
        task_id: taskId,
        run_id: `run-state-fingerprint-${action}-source`,
      });
      // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
      const originalPrepare = CustomRunnerAdapter.prototype.prepare;
      // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
      const originalExecute = CustomRunnerAdapter.prototype.execute;
      let replayBundle: RunnerContextBundle | null = null;
      let observedAtExecute: StateFingerprint | null = null;
      vi.spyOn(CustomRunnerAdapter.prototype, "prepare").mockImplementation(
        async function (bundle) {
          replayBundle = bundle;
          return await originalPrepare.call(this, bundle);
        },
      );
      vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(
        async function (invocation) {
          if (!replayBundle) throw new Error("Replay bundle was not captured.");
          observedAtExecute = await captureRunnerStateFingerprint({
            ctx,
            bundle: replayBundle,
          });
          return await originalExecute.call(this, invocation);
        },
      );

      const replayed =
        action === "resume"
          ? await resumeTaskRunnerExecution({
              ctx,
              cwd: root,
              rootOverride: root,
              task_id: taskId,
              run_id: source.invocation.run_id,
              new_run_id: `run-state-fingerprint-${action}-destination`,
            })
          : await retryTaskRunnerExecution({
              ctx,
              cwd: root,
              rootOverride: root,
              task_id: taskId,
              run_id: source.invocation.run_id,
              new_run_id: `run-state-fingerprint-${action}-destination`,
            });

      expect(observedAtExecute).toEqual(replayed.state_before);
      expect(replayed.precondition_fingerprint).toEqual(replayed.state_before);
      expect(replayed.precondition).toMatchObject({
        status: "fresh",
        reason_code: "state_fingerprint_fresh",
      });
      const preparedFingerprint = replayed.bundle.state_fingerprint;
      if (!preparedFingerprint) throw new Error("Prepared fingerprint was not recorded.");
      expect(preparedFingerprint.components.task.digest).not.toBe(
        replayed.precondition_fingerprint.components.task.digest,
      );
      expect(preparedFingerprint.components.git.digest).toBe(
        replayed.precondition_fingerprint.components.git.digest,
      );
      const repository = await RunnerRunRepository.openExistingTaskRun({
        git_root: root,
        workflow_dir: ctx.config.paths.workflow_dir,
        task_id: taskId,
        run_id: replayed.invocation.run_id,
        storage: "supervisor",
      });
      const persisted = await repository.readState();
      expect(persisted?.state_fingerprint).toMatchObject({
        outcome: "accepted",
        precondition_fingerprint: replayed.state_before,
        state_before: replayed.state_before,
        effect_applied: true,
      });
    },
  );

  it("retries through an acknowledged cloud replay transition before entering the adapter", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint cloud retry");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-state-fingerprint-cloud-retry-source",
    });
    const cloud = await switchReplayFixtureToAcknowledgedCloud({
      root,
      task_id: taskId,
      ctx,
    });
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    const retried = await retryTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
      new_run_id: "run-state-fingerprint-cloud-retry-destination",
    });

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(retried.precondition).toMatchObject({
      status: "fresh",
      reason_code: "state_fingerprint_fresh",
    });
    expect(retried.bundle.state_fingerprint?.components.backend_projection.state).toBe("present");
    expect(retried.precondition_fingerprint.components.backend_projection.state).toBe("present");
    expect(retried.bundle.state_fingerprint?.components.backend_projection.digest).not.toBe(
      retried.precondition_fingerprint.components.backend_projection.digest,
    );
    expect(retried.precondition_fingerprint.task_revision).toBe(
      (retried.bundle.state_fingerprint?.task_revision ?? 0) + 1,
    );
    expect(cloud.fetchImpl).toHaveBeenCalledTimes(2);
    expect(JSON.parse(await readFile(cloud.statePath, "utf8"))).toMatchObject({
      pending_push: null,
    });
  });

  it("rejects a mutation after an advanced precondition before invoking the adapter effect", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint advanced precondition");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-advanced-precondition",
    });
    let advancedFingerprint: StateFingerprint | null = null;
    const apply = vi.fn(() =>
      Promise.reject(new Error("Adapter effect must not run for stale advanced state.")),
    );

    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
        advance_precondition: async () => {
          const anchoredTask = await ctx.taskBackend.getTask(taskId);
          if (!anchoredTask) throw new Error(`Task not found: ${taskId}`);
          await ctx.taskBackend.writeTask({
            ...anchoredTask,
            title: "Trusted replay anchor",
            revision: (anchoredTask.revision ?? 0) + 1,
          });
          const expectedTask = await ctx.taskBackend.getTask(taskId);
          if (!expectedTask) throw new Error(`Task not found: ${taskId}`);
          advancedFingerprint = await captureRunnerStateFingerprint({
            ctx,
            bundle: prepared.bundle,
            probes: {
              load_task: () => Promise.resolve(structuredClone(expectedTask)),
            },
          });
          const mutatedTask = await ctx.taskBackend.getTask(taskId);
          if (!mutatedTask) throw new Error(`Task not found: ${taskId}`);
          await ctx.taskBackend.writeTask({
            ...mutatedTask,
            title: "Untrusted mutation after replay anchor",
            revision: (mutatedTask.revision ?? 0) + 1,
          });
          return { expected_task: expectedTask };
        },
        apply,
      }),
    );

    expect(rejection).toBeInstanceOf(RunnerStateFingerprintCliError);
    if (!(rejection instanceof RunnerStateFingerprintCliError)) {
      throw new Error("Expected a RunnerStateFingerprintCliError.");
    }
    expect(apply).not.toHaveBeenCalled();
    expect(rejection.state_fingerprint).toMatchObject({
      outcome: "refused",
      precondition_fingerprint: advancedFingerprint,
      precondition: {
        status: "stale",
        reason_code: "state_fingerprint_stale",
      },
      effect_applied: false,
    });
    expect(rejection.state_fingerprint.state_before).toEqual(
      rejection.state_fingerprint.state_after,
    );
    expect(
      rejection.state_fingerprint.precondition.changed_components.map((entry) => entry.component),
    ).toEqual(["task"]);
  });

  it("rejects a task mutation after preparation and never invokes the adapter effect", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint stale task");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
    const originalPrepare = CustomRunnerAdapter.prototype.prepare;
    vi.spyOn(CustomRunnerAdapter.prototype, "prepare").mockImplementation(async function (bundle) {
      const invocation = await originalPrepare.call(this, bundle);
      const currentTask = await ctx.taskBackend.getTask(taskId);
      if (!currentTask) throw new Error(`Task not found: ${taskId}`);
      await ctx.taskBackend.writeTask({
        ...currentTask,
        title: "Mutated after bundle preparation",
        revision: (currentTask.revision ?? 0) + 1,
      });
      return invocation;
    });
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    const rejection = await captureRejection(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-state-fingerprint-stale",
      }),
    );
    expect(rejection).toBeInstanceOf(CliError);
    if (!(rejection instanceof CliError)) {
      throw new Error("Expected a CliError.");
    }
    expect(rejection.code).toBe("E_RUNTIME");
    expect(rejection.context?.reason_code).toBe("state_fingerprint_stale");
    expect(rejection.context?.task_id).toBe(taskId);
    const diagnostic = rejection.context?.fingerprint as StateFingerprintPreconditionDiagnostic;
    expect(diagnostic.status).toBe("stale");
    expect(diagnostic.changed_components.map((entry) => entry.component)).toContain("task");
    expect(diagnostic.changed_components.map((entry) => entry.component)).not.toContain(
      "backend_projection",
    );
    expect(executeSpy).not.toHaveBeenCalled();
    const repository = await RunnerRunRepository.openExistingTaskRun({
      git_root: root,
      workflow_dir: ctx.config.paths.workflow_dir,
      task_id: taskId,
      run_id: "run-state-fingerprint-stale",
      storage: "supervisor",
    });
    const persisted = await repository.readState();
    expect(persisted).toMatchObject({
      status: "failed",
      state_fingerprint: {
        schema_version: 1,
        kind: "runner_state_fingerprint_record",
        outcome: "refused",
        precondition: {
          status: "stale",
          reason_code: "state_fingerprint_stale",
        },
        effect_applied: false,
      },
    });
    expect(persisted?.state_fingerprint?.state_before).toEqual(
      persisted?.state_fingerprint?.state_after,
    );
    expect(persisted?.state_fingerprint?.precondition_policy).toEqual(
      RUNNER_STATE_FINGERPRINT_POLICY,
    );
  });

  it("re-resolves a live policy mutation and never invokes the adapter effect", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    await writeFile(
      path.join(root, "AGENTS.md"),
      "# Test policy\n\nUse the prepared task contract.\n",
      "utf8",
    );
    const taskId = await createDoingTask(root, "State fingerprint stale policy");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
    const originalPrepare = CustomRunnerAdapter.prototype.prepare;
    vi.spyOn(CustomRunnerAdapter.prototype, "prepare").mockImplementation(async function (bundle) {
      const invocation = await originalPrepare.call(this, bundle);
      const policyPath = path.join(root, "AGENTS.md");
      await writeFile(
        policyPath,
        `${await readFile(policyPath, "utf8")}\n<!-- live policy mutation -->\n`,
        "utf8",
      );
      return invocation;
    });
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    const rejection = await captureRejection(
      executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-state-fingerprint-stale-policy",
      }),
    );
    expect(rejection).toBeInstanceOf(CliError);
    if (!(rejection instanceof CliError)) {
      throw new Error("Expected a CliError.");
    }
    const diagnostic = rejection.context?.fingerprint as StateFingerprintPreconditionDiagnostic;
    expect(diagnostic.changed_components.map((entry) => entry.component)).toContain("policy");
    expect(executeSpy).not.toHaveBeenCalled();
  });
});
