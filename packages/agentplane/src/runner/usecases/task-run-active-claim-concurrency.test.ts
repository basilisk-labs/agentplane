import { lstat, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { installRunCliIntegrationHarness, waitForCondition } from "@agentplane/testkit";

import { readRunnerRunState, writeRunnerRunState } from "../artifacts.js";
import * as processSupervision from "../process-supervision/signals.js";
import * as stableFile from "../stable-file.js";
import { resolveSupervisorTaskRunnerPaths } from "../task-run-paths.js";

import {
  acquireTaskRunnerActiveClaim,
  releaseTaskRunnerActiveClaim,
} from "./task-run-active-claim.js";
import {
  acquireTaskRunnerActiveClaimRecoveryLease,
  releaseTaskRunnerActiveClaimRecoveryLease,
} from "./task-run-active-claim-recovery-lease.js";
import { resumeTaskRunnerExecution, retryTaskRunnerExecution } from "./task-run-lifecycle.js";
import { executeTaskRunnerExecution, type ExecutedTaskRunnerExecution } from "./task-run.js";
import {
  configureCustomRunner,
  createDoingTask,
  createFailedSource,
  expectClaimRejection,
  gateRunnerScript,
  mkGitRepoRoot,
  observeSettlement,
  waitForStartedRun,
  type SettledObservation,
} from "./task-run-active-claim.testkit.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run supervisor active claim", () => {
  it("retries a transient recovery-lease read collision without accepting an unstable observation", async () => {
    const root = await mkGitRepoRoot();
    const originalRead = stableFile.readStableRegularTextNoFollow;
    let recoveryLeaseReadCount = 0;
    vi.spyOn(stableFile, "readStableRegularTextNoFollow").mockImplementation(async (...args) => {
      if (args[1] === "runner active-claim recovery lease") {
        recoveryLeaseReadCount += 1;
        if (recoveryLeaseReadCount === 1) {
          throw new Error(
            `runner active-claim recovery lease changed while it was being read: ${args[0]}`,
          );
        }
      }
      return await originalRead(...args);
    });

    const acquired = await acquireTaskRunnerActiveClaimRecoveryLease({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: "TASK-RECOVERY-LEASE-READ-COLLISION",
      target_generation: "generation-read-collision",
    });
    try {
      expect(acquired.status).toBe("acquired");
      expect(recoveryLeaseReadCount).toBe(2);
    } finally {
      if (acquired.status === "acquired") {
        await releaseTaskRunnerActiveClaimRecoveryLease({
          lease: acquired.lease,
          succeeded: false,
        });
      }
    }
  });

  it("reports a live competing claim before inspecting mutable supervisor history", async () => {
    const root = await mkGitRepoRoot();
    const taskId = "TASK-LIVE-CLAIM-PRECEDENCE";
    const lease = await acquireTaskRunnerActiveClaim({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: "run-live-owner",
      operation: "execute",
    });
    const invalidHistoryPath = path.join(
      lease.history_anchor.boundary.run_dir,
      "invalid-history-entry",
    );
    await writeFile(invalidHistoryPath, "mutable\n", "utf8");

    try {
      await expect(
        acquireTaskRunnerActiveClaim({
          git_root: root,
          workflow_dir: ".agentplane/tasks",
          task_id: taskId,
          run_id: "run-competing-retry",
          operation: "retry",
        }),
      ).rejects.toMatchObject({
        code: "E_USAGE",
        context: {
          task_id: taskId,
          runner_operation: "retry",
          active_run_authority: "supervisor_active_run_claim",
          competing_run_id: lease.claim.run_id,
          competing_operation: lease.claim.operation,
        },
      });
    } finally {
      await unlink(invalidHistoryPath).catch(() => null);
      await releaseTaskRunnerActiveClaim(lease);
    }
  });

  it("atomically rejects a concurrent generated retry while generated resume is executing", async () => {
    const root = await mkGitRepoRoot();
    const startedPath = path.join(root, "claim-started.log");
    const releasePath = path.join(root, "claim-release");
    await configureCustomRunner({
      root,
      script_lines: gateRunnerScript(),
      env: {
        TEST_CLAIM_STARTED: startedPath,
        TEST_CLAIM_RELEASE: releasePath,
      },
    });
    const taskId = await createDoingTask(root, "Concurrent generated replay claim");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-concurrent-replay-source",
    });

    const resumePromise = resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
    });
    let firstStarted = "";
    let retryPromise: Promise<ExecutedTaskRunnerExecution> | null = null;
    let retryObservation: SettledObservation<ExecutedTaskRunnerExecution> = { kind: "timeout" };
    try {
      const startedRuns = await waitForStartedRun(startedPath);
      firstStarted = startedRuns.trim();
      retryPromise = retryTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: source.invocation.run_id,
      });
      retryObservation = await observeSettlement(retryPromise);
    } finally {
      await writeFile(releasePath, "release\n", "utf8");
      await Promise.allSettled([resumePromise, ...(retryPromise ? [retryPromise] : [])]);
    }

    const resumed = await resumePromise;
    expect(firstStarted).toBe(resumed.invocation.run_dir);
    const rejected = expectClaimRejection(retryObservation, {
      task_id: taskId,
      operation: "retry",
      competing_operation: "resume",
      competing_run_id: resumed.invocation.run_id,
    });
    const rejectedRunId = rejected.context?.run_id;
    expect(rejectedRunId).not.toBe(resumed.invocation.run_id);
    expect(typeof rejectedRunId).toBe("string");
    const rejectedPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: String(rejectedRunId),
    });
    await expect(lstat(rejectedPaths.run_dir)).rejects.toMatchObject({
      code: "ENOENT",
    });
    const completedStarts = await readFile(startedPath, "utf8");
    expect(completedStarts.trim().split("\n")).toHaveLength(1);
  });

  it("makes an ordinary executing run authoritative against a concurrent replay", async () => {
    const root = await mkGitRepoRoot();
    const startedPath = path.join(root, "ordinary-claim-started.log");
    const releasePath = path.join(root, "ordinary-claim-release");
    await configureCustomRunner({
      root,
      script_lines: gateRunnerScript(),
      env: {
        TEST_CLAIM_STARTED: startedPath,
        TEST_CLAIM_RELEASE: releasePath,
      },
    });
    const taskId = await createDoingTask(root, "Ordinary run active claim");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-ordinary-claim-source",
    });

    const ordinaryPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      include_route_runner_state: false,
    });
    let firstStarted = "";
    let retryPromise: Promise<ExecutedTaskRunnerExecution> | null = null;
    let retryObservation: SettledObservation<ExecutedTaskRunnerExecution> = { kind: "timeout" };
    try {
      const startedRuns = await waitForStartedRun(startedPath);
      firstStarted = startedRuns.trim();
      retryPromise = retryTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: source.invocation.run_id,
      });
      retryObservation = await observeSettlement(retryPromise);
    } finally {
      await writeFile(releasePath, "release\n", "utf8");
      await Promise.allSettled([ordinaryPromise, ...(retryPromise ? [retryPromise] : [])]);
    }

    const ordinary = await ordinaryPromise;
    expect(firstStarted).toBe(ordinary.invocation.run_dir);
    expectClaimRejection(retryObservation, {
      task_id: taskId,
      operation: "retry",
      competing_operation: "execute",
      competing_run_id: ordinary.invocation.run_id,
    });
    const completedStarts = await readFile(startedPath, "utf8");
    expect(completedStarts.trim().split("\n")).toHaveLength(1);
  });

  it("rejects a concurrent retry while the authoritative run is running without identity", async () => {
    const root = await mkGitRepoRoot();
    const startedPath = path.join(root, "null-identity-claim-started.log");
    const releasePath = path.join(root, "null-identity-claim-release");
    await configureCustomRunner({
      root,
      script_lines: gateRunnerScript(),
      env: {
        TEST_CLAIM_STARTED: startedPath,
        TEST_CLAIM_RELEASE: releasePath,
      },
    });
    const taskId = await createDoingTask(root, "Running null identity remains authoritative");
    const { ctx, prepared: source } = await createFailedSource({
      root,
      task_id: taskId,
      run_id: "run-null-identity-source",
    });
    const destinationRunId = "run-null-identity-destination";
    const destinationPaths = await resolveSupervisorTaskRunnerPaths({
      git_root: root,
      workflow_dir: ".agentplane/tasks",
      task_id: taskId,
      run_id: destinationRunId,
    });
    const preparationPath = path.join(destinationPaths.run_dir, ".runner-preparation-record.json");
    const originalReadIdentity = processSupervision.readObservedProcessIdentity;
    let childIdentityProbeEntered!: () => void;
    let releaseChildIdentityProbe!: () => void;
    const childIdentityProbeEnteredPromise = new Promise<void>((resolve) => {
      childIdentityProbeEntered = resolve;
    });
    const releaseChildIdentityProbePromise = new Promise<void>((resolve) => {
      releaseChildIdentityProbe = resolve;
    });
    let authoritativeChildProbeStarted = false;
    let childIdentityProbeCount = 0;
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockImplementation(async (pid) => {
      if (pid === process.pid) {
        const observed = await originalReadIdentity(pid);
        if (!authoritativeChildProbeStarted) {
          return (
            observed ?? {
              pid,
              command: "authoritative-active-claim-owner",
              started_at: "2026-07-26T00:00:00.000Z",
            }
          );
        }
        return {
          pid,
          command: "stale-active-claim-owner",
          started_at: "2000-01-01T00:00:00.000Z",
        };
      }
      childIdentityProbeCount += 1;
      if (childIdentityProbeCount > 1) return null;
      authoritativeChildProbeStarted = true;
      childIdentityProbeEntered();
      await releaseChildIdentityProbePromise;
      return {
        pid,
        command: "gated-authoritative-child",
        started_at: "2026-07-26T00:00:00.000Z",
      };
    });

    const resumePromise = resumeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: source.invocation.run_id,
      new_run_id: destinationRunId,
    });
    let retryPromise: Promise<ExecutedTaskRunnerExecution> | null = null;
    let retryObservation: SettledObservation<ExecutedTaskRunnerExecution> = { kind: "timeout" };
    let originalBundleText: string | null = null;
    let originalPreparationText: string | null = null;
    let originalState: Awaited<ReturnType<typeof readRunnerRunState>> = null;
    try {
      await childIdentityProbeEnteredPromise;
      await waitForStartedRun(startedPath);
      const runningWithoutIdentity = await waitForCondition({
        description: "authoritative running state without process identity",
        timeoutMs: 5000,
        read: async () => await readRunnerRunState(destinationPaths.state_path),
        predicate: (state) =>
          state?.status === "running" &&
          typeof state.supervision?.pid === "number" &&
          state.supervision.process_identity === null,
      });
      expect(runningWithoutIdentity.supervision?.pid).toBeGreaterThan(0);

      // Normal live runs stop at effect_in_doubt first. This controlled legacy
      // record exercises the lower fail-closed branch without changing provider state.
      [originalBundleText, originalPreparationText, originalState] = await Promise.all([
        readFile(destinationPaths.bundle_path, "utf8"),
        readFile(preparationPath, "utf8"),
        readRunnerRunState(destinationPaths.state_path),
      ]);
      expect(originalState).not.toBeNull();
      const legacyBundle = JSON.parse(originalBundleText) as Record<string, unknown>;
      delete legacyBundle.state_fingerprint;
      delete legacyBundle.state_fingerprint_policy;
      const legacyState = structuredClone(originalState!);
      delete legacyState.state_fingerprint;
      await writeFile(
        destinationPaths.bundle_path,
        `${JSON.stringify(legacyBundle, null, 2)}\n`,
        "utf8",
      );
      await writeRunnerRunState({
        state_path: destinationPaths.state_path,
        state: legacyState,
      });
      await unlink(preparationPath);

      retryPromise = retryTaskRunnerExecution({
        ctx,
        cwd: root,
        rootOverride: root,
        task_id: taskId,
        run_id: source.invocation.run_id,
      });
      retryObservation = await observeSettlement(retryPromise);
    } finally {
      if (originalBundleText && originalPreparationText && originalState) {
        await writeFile(destinationPaths.bundle_path, originalBundleText, "utf8");
        await writeRunnerRunState({
          state_path: destinationPaths.state_path,
          state: originalState,
        });
        await writeFile(preparationPath, originalPreparationText, "utf8");
      }
      releaseChildIdentityProbe();
      await writeFile(releasePath, "release\n", "utf8");
      await Promise.allSettled([resumePromise, ...(retryPromise ? [retryPromise] : [])]);
    }

    const resumed = await resumePromise;
    const rejected = expectClaimRejection(retryObservation, {
      task_id: taskId,
      operation: "retry",
      competing_operation: "resume",
      competing_run_id: resumed.invocation.run_id,
    });
    expect(rejected.context).toMatchObject({
      competing_owner_status: "stale",
      competing_run_authority: "running_child_unverified",
    });
    const completedStarts = await readFile(startedPath, "utf8");
    expect(completedStarts.trim().split("\n")).toHaveLength(1);
  });
});
