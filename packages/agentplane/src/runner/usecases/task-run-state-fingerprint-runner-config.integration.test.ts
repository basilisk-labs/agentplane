import type { AgentplaneConfig } from "@agentplaneorg/core/config";
import { gitEnv } from "@agentplaneorg/core/git";
import { execFileAsync } from "@agentplaneorg/core/process";
import { installRunCliIntegrationHarness, writeConfig } from "@agentplane/testkit";
import { afterEach, describe, expect, it, vi } from "vitest";

import { loadCommandContext } from "../../commands/shared/task-backend.js";
import { CustomRunnerAdapter } from "../adapters/custom.js";
import {
  configureCustomRunner,
  createDoingTask,
  mkGitRepoRoot,
} from "./task-run-active-claim.testkit.js";
import {
  executeStateBoundRunnerInvocation,
  RunnerStateFingerprintCliError,
} from "./task-run-state-fingerprint.js";
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

function expectRefusal(
  rejection: unknown,
  executeSpy: ReturnType<typeof vi.spyOn>,
  component: "authority" | "policy",
  includeGit = true,
): asserts rejection is RunnerStateFingerprintCliError {
  expect(rejection).toBeInstanceOf(RunnerStateFingerprintCliError);
  if (!(rejection instanceof RunnerStateFingerprintCliError)) {
    throw new Error("Expected a RunnerStateFingerprintCliError.");
  }
  expect(
    rejection.state_fingerprint.precondition.changed_components.map((entry) => entry.component),
  ).toEqual([...(includeGit ? (["git"] as const) : []), component]);
  expect(rejection.state_fingerprint.effect_applied).toBe(false);
  expect(executeSpy).not.toHaveBeenCalled();
}

async function expectConfigMutationRejected(opts: {
  title: string;
  run_id: string;
  mutate: (config: AgentplaneConfig) => void;
  env?: Record<string, string>;
  expected_component?: "authority" | "policy";
}): Promise<RunnerStateFingerprintCliError> {
  const root = await mkGitRepoRoot();
  await configureCustomRunner({
    root,
    script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    ...(opts.env ? { env: opts.env } : {}),
  });
  const taskId = await createDoingTask(root, opts.title);
  const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
  // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
  const originalPrepare = CustomRunnerAdapter.prototype.prepare;
  vi.spyOn(CustomRunnerAdapter.prototype, "prepare").mockImplementation(async function (bundle) {
    const invocation = await originalPrepare.call(this, bundle);
    const config = structuredClone(ctx.config);
    opts.mutate(config);
    await writeConfig(root, config);
    return invocation;
  });
  const executeSpy = vi.spyOn(CustomRunnerAdapter.prototype, "execute");
  const rejection = await captureRejection(
    executeTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      run_id: opts.run_id,
    }),
  );
  expectRefusal(rejection, executeSpy, opts.expected_component ?? "authority");
  return rejection;
}

describe("runner execution configuration fingerprint", () => {
  it("rejects an adapter mutation after preparation before any effect", async () => {
    await expectConfigMutationRejected({
      title: "State fingerprint stale runner adapter",
      run_id: "run-state-fingerprint-stale-runner-adapter",
      mutate: (config) => {
        config.runner.default_adapter = "codex";
      },
    });
  });

  it("rejects a secret env mutation without persisting a value verifier", async () => {
    const preparedSecret = "low-entropy-alpha";
    const liveSecret = "low-entropy-beta";
    const rejection = await expectConfigMutationRejected({
      title: "State fingerprint stale runner env",
      run_id: "run-state-fingerprint-stale-runner-env",
      env: { RUNNER_LOW_ENTROPY_SECRET: preparedSecret },
      mutate: (config) => {
        if (!config.runner.custom) throw new Error("Custom runner config is missing.");
        config.runner.custom.env.RUNNER_LOW_ENTROPY_SECRET = liveSecret;
      },
    });
    const persistedFingerprint = JSON.stringify(rejection.state_fingerprint);
    expect(persistedFingerprint).not.toContain(preparedSecret);
    expect(persistedFingerprint).not.toContain(liveSecret);
  });

  it("rejects task outcome projection drift before any effect", async () => {
    await expectConfigMutationRejected({
      title: "State fingerprint stale task outcome projection",
      run_id: "run-state-fingerprint-stale-task-outcome",
      mutate: (config) => {
        config.tasks.doc.sections = [...config.tasks.doc.sections, "Operator Notes"];
        config.tasks.doc.required_sections = [
          ...config.tasks.doc.required_sections,
          "Operator Notes",
        ];
      },
    });
  });

  it("rejects force approval and close-tail route drift before any effect", async () => {
    await expectConfigMutationRejected({
      title: "State fingerprint stale authority controls",
      run_id: "run-state-fingerprint-stale-authority-controls",
      mutate: (config) => {
        config.agents.approvals.require_force = !config.agents.approvals.require_force;
        config.branch.task_close_prefix = "replacement-close-tail";
      },
    });
  });

  it("rejects lifecycle policy drift before any effect", async () => {
    await expectConfigMutationRejected({
      title: "State fingerprint stale lifecycle policy",
      run_id: "run-state-fingerprint-stale-lifecycle-policy",
      expected_component: "policy",
      mutate: (config) => {
        config.tasks.verify.required_tags = [...config.tasks.verify.required_tags, "operator"];
        config.tasks.comments.start.min_chars += 1;
        config.closure_commit_requires_approval = !config.closure_commit_requires_approval;
      },
    });
  });

  it("rejects a same-commit branch switch before any effect", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint stale route branch");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    // eslint-disable-next-line @typescript-eslint/unbound-method -- invoked with the live adapter receiver below
    const originalPrepare = CustomRunnerAdapter.prototype.prepare;
    vi.spyOn(CustomRunnerAdapter.prototype, "prepare").mockImplementation(async function (bundle) {
      const invocation = await originalPrepare.call(this, bundle);
      await execFileAsync("git", ["switch", "-c", "same-commit-route-drift"], {
        cwd: root,
        env: gitEnv(),
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
        run_id: "run-state-fingerprint-stale-route-branch",
      }),
    );

    expectRefusal(rejection, executeSpy, "authority", false);
  });

  it("rejects ambient process environment drift before any effect", async () => {
    const root = await mkGitRepoRoot();
    await configureCustomRunner({
      root,
      script_lines: ["#!/bin/sh", "cat >/dev/null", "exit 0"],
    });
    const taskId = await createDoingTask(root, "State fingerprint stale ambient environment");
    const ctx = await loadCommandContext({ cwd: root, rootOverride: root });
    const preparedAmbientSecret = "ambient-secret-alpha-7z";
    const liveAmbientSecret = "ambient-secret-beta-8q";
    vi.stubEnv("AGENTPLANE_AMBIENT_DRIFT_TEST", preparedAmbientSecret);
    const prepared = await prepareTaskRunnerExecution({
      ctx,
      cwd: root,
      rootOverride: root,
      task_id: taskId,
      mode: "execute",
      run_id: "run-state-fingerprint-stale-ambient-environment",
    });
    vi.stubEnv("AGENTPLANE_AMBIENT_DRIFT_TEST", liveAmbientSecret);
    const apply = vi.fn(() =>
      Promise.reject(new Error("Adapter effect must not run with ambient env drift.")),
    );

    const rejection = await captureRejection(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskId,
        bundle: prepared.bundle,
        invocation: prepared.invocation,
        precondition_fingerprint: prepared.precondition_fingerprint,
        precondition_policy: prepared.precondition_policy,
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
    ).toEqual(["authority"]);
    const persistedFingerprint = JSON.stringify(rejection.state_fingerprint);
    expect(persistedFingerprint).not.toContain(preparedAmbientSecret);
    expect(persistedFingerprint).not.toContain(liveAmbientSecret);
  });
});
