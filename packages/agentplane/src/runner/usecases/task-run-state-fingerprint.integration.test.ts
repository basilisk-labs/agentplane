import type { StateFingerprintPreconditionDiagnostic } from "@agentplaneorg/core/schemas";
import { installRunCliIntegrationHarness } from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CliError } from "../../shared/errors.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
} from "./task-run-active-claim.testkit.js";
import { executeTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

afterEach(() => {
  vi.restoreAllMocks();
});

async function captureRejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("Expected promise to reject.");
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
    const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");

    const executed = await executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: "run-state-fingerprint-success",
    });

    expect(executeSpy).toHaveBeenCalledTimes(1);
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
    expect(diagnostic.changed_components.map((entry) => entry.component)).toEqual(
      expect.arrayContaining(["task", "backend_projection"]),
    );
    expect(executeSpy).not.toHaveBeenCalled();
  });
});
