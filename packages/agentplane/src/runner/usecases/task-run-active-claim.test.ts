import { lstat, mkdir, readFile, rename, symlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { captureStdIO, installRunCliIntegrationHarness, mkGitRepoRoot } from "@agentplane/testkit";

import { runCli } from "../../cli/run-cli.js";
import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { TaskStore } from "../../commands/shared/task-store/store.js";
import { CliError } from "../../shared/errors.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import {
  claimRunnerChildSpawn,
  claimRunnerPreSpawnDecision,
} from "../adapters/execution-control.js";
import { evolveRunnerRunState, readRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import * as processSignals from "../process-supervision/signals.js";
import { persistRunnerOutcomeToTask } from "../task-state.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";
import type { RunnerInvocation, RunnerResult, RunnerRunState } from "../types.js";

import {
  acquireTaskRunnerActiveClaim,
  readTaskRunnerActiveClaim,
  recoverTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import { inspectTaskRunnerOwnerIdentity } from "./task-run-active-claim-authority.js";
import { resumeTaskRunnerExecution } from "./task-run-lifecycle.js";
import { executeTaskRunnerExecution, prepareTaskRunnerExecution } from "./task-run.js";
import { reconcileTerminalTaskRunnerActiveClaim } from "./task-run-active-claim-runtime.js";
import {
  configureCustomRunner,
  createDoingTask,
  createFailedSource,
  replaceActiveClaim,
  staleClaim,
  writeActiveClaim,
  writeTerminalSuccess,
} from "./task-run-active-claim.testkit.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run active claim hardening", () => {
  it("keeps a live owner fail-closed when ps cannot provide a complete identity", async () => {
    vi.spyOn(processSignals, "readObservedProcessIdentity").mockResolvedValue({
      pid: process.pid,
      command: null,
      started_at: null,
    });

    await expect(
      inspectTaskRunnerOwnerIdentity({
        owner_pid: process.pid,
        owner_command: "agentplane task run",
        owner_started_at: "2026-07-24T00:00:00.000Z",
      }),
    ).resolves.toBe("unverified");
  });

  it("recovers a stale SIGKILL-style owner claim before any run directory exists", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-STALE-OWNER";
    const stale = staleClaim({ task_id: taskId, run_id: "run-crashed-owner" });
    await writeActiveClaim(root, stale);

    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-after-crash",
      operation: "execute",
    });
    expect(lease.claim.run_id).toBe("run-after-crash");
    expect(lease.claim.generation).not.toBe(stale.generation);
    await releaseTaskRunnerActiveClaim(lease);
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-after-crash",
      }),
    ).resolves.toBeNull();
  });

  it("recovers an incomplete pre-provider run without reusing its immutable directory", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-INCOMPLETE-CLAIM";
    const stale = staleClaim({ task_id: taskId, run_id: "run-incomplete" });
    const { paths } = await writeActiveClaim(root, stale);
    await mkdir(paths.run_dir, { recursive: true });
    const sentinelPath = path.join(paths.run_dir, "pre-provider-sentinel");
    await writeFile(sentinelPath, "immutable\n", "utf8");

    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-fresh-destination",
      operation: "retry",
    });
    expect(await readFile(sentinelPath, "utf8")).toBe("immutable\n");
    expect(lease.claim.run_id).toBe("run-fresh-destination");
    await releaseTaskRunnerActiveClaim(lease);
  });

  it("elects exactly one successor when concurrent starts recover the same stale claim", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-CONCURRENT-RECOVERY";
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: "run-stale-concurrent-owner" }),
    );

    const attempts = await Promise.allSettled(
      Array.from({ length: 8 }, (_, index) =>
        acquireTaskRunnerActiveClaim({
          git_root: root,
          workflow_dir: ".agentplane/tasks",
          task_id: taskId,
          run_id: `run-successor-${index}`,
          operation: "execute",
        }),
      ),
    );
    const acquired = attempts.filter(
      (
        attempt,
      ): attempt is PromiseFulfilledResult<
        Awaited<ReturnType<typeof acquireTaskRunnerActiveClaim>>
      > => attempt.status === "fulfilled",
    );

    expect(acquired).toHaveLength(1);
    expect(attempts.filter((attempt) => attempt.status === "rejected")).toHaveLength(7);
    const active = await readTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: acquired[0]!.value.claim.run_id,
    });
    expect(active?.generation).toBe(acquired[0]!.value.claim.generation);
    await releaseTaskRunnerActiveClaim(acquired[0]!.value);
  });

  it("runs and releases with unavailable owner identity but refuses stale auto-recovery", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Unavailable owner identity");
    vi.spyOn(processSignals, "readObservedProcessIdentity").mockResolvedValueOnce(null);

    const executed = await executeTaskRunnerExecution({
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      include_route_runner_state: false,
    });
    expect(executed.result.status).toBe("success");
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: executed.invocation.run_id,
      }),
    ).resolves.toBeNull();

    const unverifiable = {
      ...staleClaim({ task_id: taskId, run_id: "run-unverifiable-owner" }),
      owner_pid: process.pid,
      owner_command: null,
      owner_started_at: null,
    };
    await writeActiveClaim(root, unverifiable);
    await expect(
      acquireTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-after-unverifiable-owner",
        operation: "execute",
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: { competing_owner_status: "unverified" },
    });
  });

  it("does not auto-recover a terminal provider outcome before external projection", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Terminal claim projection gate");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-terminal-before-projection",
    });
    await writeTerminalSuccess(prepared, "provider completed before external projection");
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: prepared.invocation.run_id }),
    );

    await expect(
      acquireTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-duplicate-side-effects",
        operation: "resume",
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        competing_owner_status: "stale",
        competing_run_authority: "terminal",
      },
    });
  });

  it("projects a terminal stale-claim outcome before starting a fresh execution", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Fresh execution terminal reconciliation");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const stranded = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-terminal-stranded-fresh",
    });
    await persistRunnerOutcomeToTask({
      ctx,
      task_id: taskId,
      bundle: stranded.bundle,
      state: stranded.state,
    });
    await writeTerminalSuccess(stranded, "stranded terminal outcome");
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: stranded.invocation.run_id }),
    );

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: "run-after-terminal-reconciliation",
      include_route_runner_state: false,
    });

    expect(executed.result.status).toBe("success");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner?.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          run_id: stranded.invocation.run_id,
          status: "success",
        }),
      ]),
    );
    expect(await readFile(stranded.invocation.events_path, "utf8")).toContain(
      '"type":"runner_terminal_claim_reconciled"',
    );
  });

  it("makes a reconciled terminal run visible before replay source selection", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Replay terminal reconciliation");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-replay-source-before-stranded",
    });
    const stranded = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-terminal-stranded-replay",
    });
    await persistRunnerOutcomeToTask({
      ctx,
      task_id: taskId,
      bundle: stranded.bundle,
      state: stranded.state,
    });
    await writeTerminalSuccess(stranded, "terminal replay barrier outcome");
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: stranded.invocation.run_id }),
    );

    const resumed = await resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
      new_run_id: "run-after-replay-reconciliation",
    });

    expect(resumed.source_run_id).toBe(source.invocation.run_id);
    expect(resumed.result.status).toBe("success");
    const task = await ctx.taskBackend.getTask(taskId);
    expect(task?.runner?.history).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          run_id: stranded.invocation.run_id,
          status: "success",
        }),
        expect.objectContaining({
          run_id: source.invocation.run_id,
          status: "failed",
        }),
      ]),
    );
  });

  it("refuses stale-owner recovery while the claimed running child identity is live", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Live provider child retains claim authority");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-live-child",
    });
    const observed = await processSignals.readObservedProcessIdentity(process.pid);
    expect(observed?.command).toBeTruthy();
    expect(observed?.started_at).toBeTruthy();
    await writeRunnerRunState({
      state_path: prepared.invocation.state_path,
      state: {
        ...prepared.state,
        status: "running",
        updated_at: new Date().toISOString(),
        supervision: {
          pid: process.pid,
          process_identity: {
            pid: process.pid,
            command: observed!.command!,
            started_at: observed!.started_at!,
            observed_at: new Date().toISOString(),
          },
        },
      },
    });
    await writeActiveClaim(
      root,
      staleClaim({ task_id: taskId, run_id: prepared.invocation.run_id }),
    );

    await expect(
      acquireTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: "run-must-not-start",
        operation: "retry",
      }),
    ).rejects.toMatchObject({
      code: "E_USAGE",
      context: {
        competing_owner_status: "stale",
        competing_run_authority: "running_child_active",
      },
    });
    const rejected = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-must-not-start",
    });
    await expect(lstat(rejected.run_dir)).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("recovers an orphan claim only after the claimed run is terminal", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Terminal orphan claim recovery");
    const { prepared } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-terminal-orphan",
    });
    const stale = staleClaim({ task_id: taskId, run_id: prepared.invocation.run_id });
    await writeActiveClaim(root, stale);

    await expect(
      recoverTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: stale.run_id,
        expected_generation: stale.generation,
        expected_owner: stale,
      }),
    ).resolves.toMatchObject({
      status: "recovered",
      claim: { generation: stale.generation },
    });
  });

  it("rejects an ancestor symlink without publishing outside the supervisor root", async () => {
    const root = await mkGitRepoRoot();
    const paths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: "TASK-SYMLINK-CLAIM",
      run_id: "run-symlink",
    });
    const outside = path.join(root, "outside-supervisor-root");
    await mkdir(outside, { recursive: true });
    await symlink(outside, path.join(paths.artifact_root, "agentplane"), "dir");

    await expect(
      acquireTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: "TASK-SYMLINK-CLAIM",
        run_id: "run-symlink",
        operation: "execute",
      }),
    ).rejects.toThrow(/non-symlink directory/u);
    await expect(
      readFile(path.join(outside, "active-run-claim.json"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });

  it("fails closed on task-directory swap without removing the replacement claim", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-DIRECTORY-SWAP";
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-original-directory",
      operation: "execute",
    });
    const originalTaskDir = path.dirname(lease.claim_path);
    const displacedTaskDir = `${originalTaskDir}.displaced`;
    await rename(originalTaskDir, displacedTaskDir);
    await mkdir(originalTaskDir);
    const replacement = staleClaim({
      task_id: taskId,
      run_id: "run-replacement-directory",
      generation: "00000000-0000-4000-8000-000000000002",
    });
    await writeFile(lease.claim_path, `${JSON.stringify(replacement)}\n`, "utf8");

    await expect(releaseTaskRunnerActiveClaim(lease)).rejects.toThrow(
      /task directory|identity changed/u,
    );
    expect(JSON.parse(await readFile(lease.claim_path, "utf8"))).toMatchObject({
      generation: replacement.generation,
    });
    expect(
      JSON.parse(await readFile(path.join(displacedTaskDir, "active-run-claim.json"), "utf8")),
    ).toMatchObject({ generation: lease.claim.generation });
  });

  it("fails closed without unlinking a replacement generation", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-RELEASE-RACE";
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-release-owner",
      operation: "execute",
    });
    await rename(lease.claim_path, `${lease.claim_path}.original-generation`);
    const replacement = staleClaim({
      task_id: taskId,
      run_id: "run-replacement-generation",
      generation: "00000000-0000-4000-8000-000000000003",
    });
    await writeFile(lease.claim_path, `${JSON.stringify(replacement)}\n`, "utf8");

    await expect(releaseTaskRunnerActiveClaim(lease)).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        generation: lease.claim.generation,
        observed_generation: replacement.generation,
      },
    });
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: replacement.run_id,
      }),
    ).resolves.toMatchObject({ generation: replacement.generation });
  });

  it("retains a terminal claim until a failed TaskData projection is reconciled", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Retain claim across projection failure");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const projectionError = new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: "simulated task projection conflict",
    });
    const mutate = vi.spyOn(TaskStore.prototype, "mutate").mockRejectedValueOnce(projectionError);

    let rejected: unknown;
    try {
      await executeTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-projection-conflict",
        include_route_runner_state: false,
      });
    } catch (error) {
      rejected = error;
    } finally {
      mutate.mockRestore();
    }
    expect(rejected).toBe(projectionError);

    const paths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-projection-conflict",
    });
    const terminal = JSON.parse(await readFile(paths.state_path, "utf8")) as RunnerRunState;
    expect(terminal.status).toBe("success");
    const retained = await readTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: terminal.run_id,
    });
    expect(retained?.run_id).toBe(terminal.run_id);

    const claimPath = path.join(paths.task_dir, "active-run-claim.json");
    const stale = {
      ...retained!,
      owner_pid: 999_999,
      owner_command: "/missing/agentplane",
      owner_started_at: "2000-01-01T00:00:00.000Z",
    };
    await writeFile(claimPath, `${JSON.stringify(stale)}\n`, "utf8");
    await expect(
      reconcileTerminalTaskRunnerActiveClaim({
        ctx,
        task_id: taskId,
        claim: stale,
      }),
    ).resolves.toBe("recovered");

    const projectedTask = await ctx.taskBackend.getTask(taskId);
    expect(projectedTask?.runner?.run_id).toBe(terminal.run_id);
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: terminal.run_id,
      }),
    ).resolves.toBeNull();
  });

  it("preserves the exact adapter error while recording a suppressed cleanup violation", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Adapter error survives claim cleanup");
    const primary = new CliError({
      exitCode: 8,
      code: "E_RUNTIME",
      message: "primary adapter failure",
    });
    let invocation: RunnerInvocation | null = null;
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(async (current) => {
      invocation = current;
      await replaceActiveClaim(current, taskId, "00000000-0000-4000-8000-000000000004");
      throw primary;
    });

    let rejected: unknown;
    try {
      await executeTaskRunnerExecution({
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        include_route_runner_state: false,
      });
    } catch (error) {
      rejected = error;
    }

    expect(rejected).toBe(primary);
    expect(rejected).toMatchObject({ code: "E_RUNTIME", exitCode: 8 });
    expect((rejected as { agentplane_suppressed?: unknown[] }).agentplane_suppressed).toEqual([
      expect.objectContaining({
        status: "cleanup_failed",
        event_recorded: true,
      }),
    ]);
    expect(invocation).not.toBeNull();
    expect(await readFile(invocation!.events_path, "utf8")).toContain(
      '"type":"runner_active_claim_cleanup_failed"',
    );
  });

  it("keeps terminal success authoritative while surfacing claim cleanup diagnostics", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Success survives claim cleanup");
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(async (invocation) => {
      await replaceActiveClaim(invocation, taskId, "00000000-0000-4000-8000-000000000005");
      const at = new Date().toISOString();
      const result: RunnerResult = {
        status: "success",
        exit_code: 0,
        started_at: at,
        ended_at: at,
        summary: "simulated terminal success",
      };
      return result;
    });

    const executed = await executeTaskRunnerExecution({
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      include_route_runner_state: false,
    });

    expect(executed.result.status).toBe("success");
    expect(executed.state.status).toBe("success");
    expect(executed.active_claim_cleanup).toMatchObject({
      status: "cleanup_failed",
      event_recorded: true,
    });
    expect(await readFile(executed.invocation.events_path, "utf8")).toContain(
      '"type":"runner_active_claim_cleanup_failed"',
    );
  });

  it("retains the active claim and degrades the CLI when terminal cleanup leaves a live process", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Residual process retains active claim");
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(async (invocation) => {
      const prepared = await readRunnerRunState(invocation.state_path);
      expect(prepared).not.toBeNull();
      const at = new Date().toISOString();
      const result: RunnerResult = {
        status: "success",
        exit_code: 0,
        started_at: at,
        ended_at: at,
        summary: "provider completed but cleanup left a live process",
      };
      await writeRunnerRunState({
        state_path: invocation.state_path,
        state: evolveRunnerRunState({
          state: prepared!,
          status: "success",
          updated_at: at,
          result,
          supervision: {
            process_tree: {
              scope: "posix_process_group",
              group_id: 4242,
              cleanup_state: "failed",
              terminate_sent_at: at,
              kill_sent_at: at,
              completed_at: at,
              residual_alive: true,
              error: "simulated residual process",
              containment_state: "limited",
              containment_limitation: "residual process remains alive",
            },
          },
        }),
      });
      return result;
    });

    const io = captureStdIO();
    let payload: {
      run_id: string;
      status: string;
      lifecycle_status: string;
      active_claim_cleanup: {
        status: string;
        event_recorded: boolean;
        context?: { reason?: string };
      };
    };
    try {
      expect(await runCli(["task", "run", taskId, "--json", "--root", root])).toBe(1);
      payload = JSON.parse(io.stdout) as typeof payload;
    } finally {
      io.restore();
    }

    expect(payload!).toMatchObject({
      status: "success",
      lifecycle_status: "degraded",
      active_claim_cleanup: {
        status: "cleanup_failed",
        event_recorded: true,
        context: {
          reason: "runner_residual_process_alive",
        },
      },
    });
    const retained = await readTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: payload!.run_id,
    });
    expect(retained).toMatchObject({
      task_id: taskId,
      run_id: payload!.run_id,
      operation: "execute",
    });
    const retainedPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: payload!.run_id,
    });
    await writeFile(
      path.join(retainedPaths.task_dir, "active-run-claim.json"),
      `${JSON.stringify(
        staleClaim({
          task_id: taskId,
          run_id: payload!.run_id,
          generation: retained!.generation,
        }),
      )}\n`,
      "utf8",
    );

    await expect(
      executeTaskRunnerExecution({
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: "run-after-unconfirmed-cleanup",
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        run_id: payload!.run_id,
        reason: "run_not_recoverable:terminal_cleanup_unverified",
      },
    });
  });

  it("retains the active claim when terminal process cleanup is unverified", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Unverified cleanup retains active claim");
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(async (invocation) => {
      const prepared = await readRunnerRunState(invocation.state_path);
      expect(prepared).not.toBeNull();
      const decision = await claimRunnerPreSpawnDecision({
        invocation,
        decision: "start",
      });
      expect(decision.record.owner_lease).toBeDefined();
      await claimRunnerChildSpawn({
        invocation,
        start_owner_id: decision.record.owner_lease!.owner_id,
      });
      const at = new Date().toISOString();
      const result: RunnerResult = {
        status: "success",
        exit_code: 0,
        started_at: at,
        ended_at: at,
        summary: "provider completed but cleanup evidence was contradictory",
      };
      await writeRunnerRunState({
        state_path: invocation.state_path,
        state: evolveRunnerRunState({
          state: prepared!,
          status: "success",
          updated_at: at,
          result,
          supervision: {
            process_tree: {
              scope: "posix_process_group",
              group_id: 4242,
              cleanup_state: "terminated",
              terminate_sent_at: at,
              kill_sent_at: null,
              completed_at: at,
              residual_alive: false,
              error: "simulated contradictory cleanup result",
              containment_state: "limited",
              containment_limitation:
                "cleanup reported a clean process group and an observation error",
            },
          },
        }),
      });
      return result;
    });

    const executed = await executeTaskRunnerExecution({
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      include_route_runner_state: false,
    });

    expect(executed.active_claim_cleanup).toMatchObject({
      status: "cleanup_failed",
      context: {
        reason: "runner_process_cleanup_unverified",
        claimed_run_authority: "terminal_cleanup_unverified",
      },
    });
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: executed.invocation.run_id,
      }),
    ).resolves.toMatchObject({
      task_id: taskId,
      run_id: executed.invocation.run_id,
    });
  });

  it("releases the active claim after confirmed cleanup of a limited direct-child scope", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "Confirmed direct-child cleanup releases claim");
    vi.spyOn(CustomRunnerAdapter.prototype, "execute").mockImplementation(async (invocation) => {
      const prepared = await readRunnerRunState(invocation.state_path);
      expect(prepared).not.toBeNull();
      const decision = await claimRunnerPreSpawnDecision({
        invocation,
        decision: "start",
      });
      expect(decision.record.owner_lease).toBeDefined();
      await claimRunnerChildSpawn({
        invocation,
        start_owner_id: decision.record.owner_lease!.owner_id,
      });
      const at = new Date().toISOString();
      const result: RunnerResult = {
        status: "success",
        exit_code: 0,
        started_at: at,
        ended_at: at,
        summary: "direct child exited and its declared cleanup scope is clear",
      };
      await writeRunnerRunState({
        state_path: invocation.state_path,
        state: evolveRunnerRunState({
          state: prepared!,
          status: "success",
          updated_at: at,
          result,
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
              containment_limitation:
                "Direct-child cleanup does not provide bounded descendant containment.",
            },
          },
        }),
      });
      return result;
    });

    const executed = await executeTaskRunnerExecution({
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      include_route_runner_state: false,
    });

    expect(executed.result.status).toBe("success");
    expect(executed.active_claim_cleanup).toBeUndefined();
    expect(executed.state.supervision?.process_tree).toMatchObject({
      scope: "direct_child_only",
      cleanup_state: "not_needed",
      residual_alive: false,
      containment_state: "limited",
    });
    await expect(
      readTaskRunnerActiveClaim({
        git_root: root,
        workflow_dir: ".agentplane/tasks",
        task_id: taskId,
        run_id: executed.invocation.run_id,
      }),
    ).resolves.toBeNull();
  });
});
