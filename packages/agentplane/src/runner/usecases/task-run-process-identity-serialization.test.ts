import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  installRunCliIntegrationHarness,
  mkGitRepoRoot,
  waitForCondition,
} from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { readRunnerRunState } from "../artifacts.js";
import * as processSupervision from "../process-supervision/signals.js";
import { observeSettlement } from "./task-run-active-claim.testkit.js";
import {
  configureCustomRunner,
  createDoingTask,
  resolveTestRunnerPaths,
  waitForState,
} from "./task-run-lifecycle-cancel.testkit.js";
import { executeTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();
const originalPath = process.env.PATH;

afterEach(() => {
  process.env.PATH = originalPath;
  vi.restoreAllMocks();
});

describe("task-run process identity publication", () => {
  it("publishes running state before bounded identity enrichment and serializes terminalization", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner(root, [
      "#!/bin/sh",
      'touch "$AGENTPLANE_RUNNER_RUN_DIR/provider-started"',
      'while [ ! -f "$AGENTPLANE_RUNNER_RUN_DIR/provider-release" ]; do sleep 0.01; done',
      'touch "$AGENTPLANE_RUNNER_RUN_DIR/provider-exited"',
      "exit 0",
    ]);
    const taskId = await createDoingTask(root, "Serialize process identity terminalization");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const runId = "run-running-state-barrier";
    const runnerPaths = await resolveTestRunnerPaths(root, taskId, runId);
    const originalReadIdentity = processSupervision.readObservedProcessIdentity;
    let childIdentityEntered!: () => void;
    let releaseChildIdentity!: () => void;
    const childIdentityEnteredPromise = new Promise<void>((resolve) => {
      childIdentityEntered = resolve;
    });
    const releaseChildIdentityPromise = new Promise<void>((resolve) => {
      releaseChildIdentity = resolve;
    });
    vi.spyOn(processSupervision, "readObservedProcessIdentity").mockImplementation(async (pid) => {
      if (pid === process.pid) return await originalReadIdentity(pid);
      childIdentityEntered();
      await releaseChildIdentityPromise;
      return {
        pid,
        command: "delayed-fast-child",
        started_at: "2026-07-26T00:00:00.000Z",
      };
    });
    const executionPromise = executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: runId,
    });
    try {
      await childIdentityEnteredPromise;
      await waitForCondition({
        description: "gated provider start marker",
        timeoutMs: 5000,
        read: async () =>
          await access(path.join(runnerPaths.run_dir, "provider-started")).then(
            () => true,
            () => false,
          ),
        predicate: Boolean,
      });
      const stateBeforeIdentity = await waitForState(
        runnerPaths.state_path,
        (state) => state?.status === "running" && typeof state.supervision?.pid === "number",
      );
      expect(stateBeforeIdentity?.supervision?.process_identity).toBeNull();
      expect(await readFile(runnerPaths.events_path, "utf8")).toContain(
        '"type":"runner_execute_start"',
      );

      await writeFile(path.join(runnerPaths.run_dir, "provider-release"), "release\n", "utf8");
      await waitForCondition({
        description: "gated provider exit marker",
        timeoutMs: 5000,
        read: async () =>
          await access(path.join(runnerPaths.run_dir, "provider-exited")).then(
            () => true,
            () => false,
          ),
        predicate: Boolean,
      });
      const executionObservation = await observeSettlement(executionPromise, 100);
      expect(executionObservation.kind).toBe("timeout");

      releaseChildIdentity();
      const executed = await executionPromise;
      expect(executed.result.status).toBe("success");
      const finalState = await readRunnerRunState(runnerPaths.state_path);
      expect(finalState?.status).toBe("success");
      expect(finalState?.result?.status).toBe("success");
      expect(finalState?.supervision?.process_identity).toBeNull();
    } finally {
      releaseChildIdentity();
      await writeFile(
        path.join(runnerPaths.run_dir, "provider-release"),
        "release\n",
        "utf8",
      ).catch(() => null);
      await executionPromise.catch(() => null);
    }
  });
});
