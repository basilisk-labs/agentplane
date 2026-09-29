import { installRunCliIntegrationHarness } from "@agentplane/testkit";
import { describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import {
  authorityComponent,
  liveRunnerExecutionConfigProjection,
} from "../state-fingerprint-authority.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
} from "./task-run-active-claim.testkit.js";
import {
  executeStateBoundRunnerInvocation,
  RunnerPostStateUnavailableCliError,
} from "./task-run-state-fingerprint.js";
import { prepareTaskRunnerExecution } from "./task-run.js";

installRunCliIntegrationHarness();

async function captureRejection(promise: Promise<unknown>): Promise<unknown> {
  try {
    await promise;
  } catch (error) {
    return error;
  }
  throw new Error("Expected promise to reject.");
}

describe("runner state fingerprint post-state and route guards", () => {
  it("withholds terminal success when post-state capture throws", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint post-authority unavailable");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-post-authority-unavailable",
    });
    const preparedFingerprint = prepared.precondition_fingerprint;
    if (!preparedFingerprint) throw new Error("Prepared fingerprint missing.");
    let effectApplied = false;
    const apply = vi.fn(() => {
      effectApplied = true;
      return Promise.resolve({
        status: "success" as const,
        exit_code: 0,
        started_at: "2026-07-24T10:00:00.000Z",
        ended_at: "2026-07-24T10:00:01.000Z",
      });
    });
    const onPostStateError = vi.fn();

    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: preparedFingerprint,
        precondition_policy: prepared.precondition_policy,
        probes: {
          observe_authority: () => {
            if (effectApplied) {
              throw new Error("simulated post-state authority capture failure");
            }
            return Promise.resolve(
              authorityComponent({
                sandbox_policy: prepared.bundle.execution.sandbox_policy,
                write_scope: prepared.bundle.execution.write_scope,
                approvals: prepared.bundle.execution.approvals,
                runner_execution_config: liveRunnerExecutionConfigProjection(
                  prepared.bundle,
                  ctx.config,
                  prepared.bundle.route_decision,
                ),
              }),
            );
          },
        },
        on_post_state_error: onPostStateError,
        apply,
      }),
    );

    expect(rejection).toBeInstanceOf(RunnerPostStateUnavailableCliError);
    expect(apply).toHaveBeenCalledTimes(1);
    expect(rejection).toMatchObject({
      state_fingerprint: {
        outcome: "post_state_unknown",
        effect_applied: true,
        state_after: null,
        post_state_reason_code: "post_state_unavailable",
      },
    });
    expect(onPostStateError).toHaveBeenCalledTimes(1);
  });
});
