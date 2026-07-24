import {
  assertStateFingerprintPrecondition,
  type StateFingerprintComponentName,
} from "@agentplaneorg/core/schemas";
import { describe, expect, it, vi } from "vitest";

import {
  capturePreparedRunnerStateFingerprint,
  captureRunnerStateFingerprint,
  resolveRunnerStateFingerprintPolicy,
  RUNNER_STATE_FINGERPRINT_POLICY,
} from "./state-fingerprint.js";
import {
  bundle,
  capturePreconditionError,
  context,
  gitSnapshot,
  invocation,
  probes,
  task,
} from "./state-fingerprint.testkit.js";
import { executeStateBoundRunnerInvocation } from "./usecases/task-run-state-fingerprint.js";

describe("runner state fingerprint", () => {
  it("captures deterministic task, Git, backend, policy, blueprint, and authority inputs", async () => {
    const taskData = task();
    const ctx = context(taskData);
    const runnerBundle = bundle(taskData);
    const stateProbes = probes({ task: taskData, bundle: runnerBundle });

    const first = await captureRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      probes: stateProbes,
    });
    const second = await captureRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      probes: stateProbes,
    });

    expect(second).toEqual(first);
    expect(first.components).toMatchObject({
      task: { state: "present", source: "task_backend" },
      git: { state: "present", source: "git_snapshot" },
      backend_projection: { state: "present", source: "task_backend_runtime" },
      policy: { state: "present", source: "runner_policy_resolution" },
      blueprint: { state: "present", source: "blueprint_resolver" },
      knowledge: {
        state: "missing",
        reason_code: "knowledge_workspace_not_initialized",
      },
      provider: { state: "missing", reason_code: "provider_not_applicable" },
      authority: { state: "present", source: "runner_authority_resolution" },
    });
  });

  it("rejects a prepared bundle that changes the live repository trust root", async () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);
    runnerBundle.repository.git_root = "/outside";

    await expect(
      capturePreparedRunnerStateFingerprint({
        ctx: context(taskData),
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: probes({ task: taskData, bundle: runnerBundle }),
      }),
    ).rejects.toThrow(/repository root does not match the live command context/u);
  });

  it("binds the expected task projection to the prepared bundle, not a later live task", async () => {
    const preparedTask = task({ title: "Prepared title", revision: 3 });
    const changedTask = task({ title: "Changed title", revision: 4 });
    const runnerBundle = bundle(preparedTask);
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx: context(changedTask),
      bundle: runnerBundle,
      git: gitSnapshot(),
      probes: probes({ task: preparedTask, bundle: runnerBundle }),
    });
    const current = await captureRunnerStateFingerprint({
      ctx: context(changedTask),
      bundle: runnerBundle,
      probes: probes({ task: changedTask, bundle: runnerBundle }),
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_stale");
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual(["task"]);
  });

  it("rejects a Git HEAD race between initial observation and bundle assembly", async () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);
    runnerBundle.repository.head_commit = "b".repeat(40);
    const racedSnapshot = gitSnapshot({ head_commit: "a".repeat(40) });
    const currentSnapshot = gitSnapshot({ head_commit: "b".repeat(40) });
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: runnerBundle,
      git: racedSnapshot,
      probes: probes({ task: taskData, bundle: runnerBundle, git: racedSnapshot }),
    });
    const current = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: runnerBundle,
      probes: probes({ task: taskData, bundle: runnerBundle, git: currentSnapshot }),
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_stale");
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual(["git"]);
  });

  it("records provider unavailability as bounded policy input", async () => {
    const taskData = task({
      sync: {
        version: 1,
        external_refs: [{ provider: "github", remote_id: "123" }],
        field_policies: {},
        conflicts: [],
      },
    });
    const fingerprint = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: bundle(taskData),
      probes: probes({ task: taskData, bundle: bundle(taskData) }),
    });

    expect(fingerprint.components.provider).toMatchObject({
      state: "unavailable",
      reason_code: "provider_freshness_unavailable",
    });
    expect(
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    ).toMatchObject({
      status: "fresh_with_bounded_uncertainty",
      reason_code: "state_fingerprint_provider_uncertainty_allowed",
    });
  });

  it("requires provider truth for a remote-canonical task backend", () => {
    const taskData = task();
    const ctx = context(taskData);
    expect(resolveRunnerStateFingerprintPolicy(ctx)).toEqual(RUNNER_STATE_FINGERPRINT_POLICY);
    ctx.taskBackend.capabilities = {
      ...ctx.taskBackend.capabilities,
      canonical_source: "remote",
    };

    expect(resolveRunnerStateFingerprintPolicy(ctx)).toEqual({
      ...RUNNER_STATE_FINGERPRINT_POLICY,
      provider: {
        ...RUNNER_STATE_FINGERPRINT_POLICY.provider,
        required: true,
      },
    });
  });

  it("does not invoke the effect without provider truth for a remote-canonical backend", async () => {
    const taskData = task({
      sync: {
        version: 1,
        external_refs: [{ provider: "cloud", remote_id: "123" }],
        field_policies: {},
        freshness: {
          projection_sha256: "local-projection-only",
          source_revision: 3,
        },
        conflicts: [],
      },
    });
    const runnerBundle = bundle(taskData);
    const ctx = context(taskData);
    ctx.taskBackend.capabilities = {
      ...ctx.taskBackend.capabilities,
      canonical_source: "remote",
    };
    const stateProbes = probes({ task: taskData, bundle: runnerBundle });
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      git: gitSnapshot(),
      probes: stateProbes,
    });
    const apply = vi.fn(() =>
      Promise.resolve({
        status: "success" as const,
        exit_code: 0,
        started_at: "2026-07-24T00:00:00.000Z",
        ended_at: "2026-07-24T00:00:01.000Z",
      }),
    );

    await expect(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: taskData.id,
        bundle: runnerBundle,
        invocation: invocation(),
        precondition_fingerprint: prepared,
        precondition_policy: resolveRunnerStateFingerprintPolicy(ctx),
        probes: stateProbes,
        apply,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason_code: "state_fingerprint_provider_unavailable",
        fingerprint: {
          status: "blocked",
          provider_state: "unavailable",
        },
      },
      state_fingerprint: {
        outcome: "refused",
        effect_applied: false,
      },
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("fails closed when a required live observation is unavailable", async () => {
    const taskData = task();
    const fingerprint = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: bundle(taskData),
      probes: probes({
        task: taskData,
        bundle: bundle(taskData),
        git: gitSnapshot({
          state: "unavailable",
          snapshot_sha256: null,
          errors: [
            {
              operation: "git_status",
              message: "failed",
              code: 1,
              stderr: null,
            },
          ],
        }),
      }),
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_required_component_unavailable");
    expect(error.diagnostic.unavailable_required_components).toEqual([
      "git" satisfies StateFingerprintComponentName,
    ]);
  });

  it.each([
    {
      component: "backend_projection" as const,
      probe: {
        observe_backend_projection: () =>
          Promise.resolve({
            state: "present" as const,
            source: "task_backend_runtime",
            value: {
              backend_id: "local",
              backend_config_path: ".agentplane/backends/local/backend.json",
              backend_config: { state: "present", sha256: `sha256:${"3".repeat(64)}` },
              capabilities: context(task()).taskBackend.capabilities,
              projection_revision: null,
              projection_freshness: null,
              remote_projection: null,
            },
          }),
      },
    },
    {
      component: "policy" as const,
      probe: {
        observe_policy: () =>
          Promise.resolve({
            state: "present" as const,
            source: "runner_policy_resolution",
            value: { prompts: [{ id: "changed-policy" }], policy_modules: [] },
          }),
      },
    },
    {
      component: "blueprint" as const,
      probe: {
        observe_blueprint: () =>
          Promise.resolve({
            state: "present" as const,
            source: "blueprint_resolver",
            value: { blueprintId: "changed-blueprint" },
          }),
      },
    },
    {
      component: "knowledge" as const,
      probe: {
        observe_knowledge: () =>
          Promise.resolve({
            state: "present" as const,
            source: "context_manifest_lock",
            value: {
              path: ".agentplane/context/manifest.lock.json",
              sha256: `sha256:${"4".repeat(64)}`,
            },
          }),
      },
    },
    {
      component: "authority" as const,
      probe: {
        observe_authority: () =>
          Promise.resolve({
            state: "present" as const,
            source: "runner_authority_resolution",
            value: {
              sandbox_policy: { requested: "read-only" },
              write_scope: { writable_roots: [] },
              approvals: {
                require_plan: true,
                require_verify: false,
                require_network: false,
              },
            },
          }),
      },
    },
  ])(
    "rejects a live $component mutation before the adapter effect",
    async ({ component, probe }) => {
      const taskData = task();
      const runnerBundle = bundle(taskData);
      const ctx = context(taskData);
      const stableProbes = probes({ task: taskData, bundle: runnerBundle });
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stableProbes,
      });
      const apply = vi.fn(() =>
        Promise.resolve({
          status: "success" as const,
          exit_code: 0,
          started_at: "2026-07-24T00:00:00.000Z",
          ended_at: "2026-07-24T00:00:01.000Z",
        }),
      );

      await expect(
        executeStateBoundRunnerInvocation({
          ctx,
          task_id: taskData.id,
          bundle: runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: RUNNER_STATE_FINGERPRINT_POLICY,
          probes: probes({
            task: taskData,
            bundle: runnerBundle,
            components: probe,
          }),
          apply,
        }),
      ).rejects.toMatchObject({
        code: "E_RUNTIME",
        context: {
          reason_code: "state_fingerprint_stale",
          fingerprint: {
            changed_components: [{ component }],
          },
        },
        state_fingerprint: {
          outcome: "refused",
          effect_applied: false,
        },
      });
      expect(apply).not.toHaveBeenCalled();
    },
  );

  it("fails closed when live authority cannot be observed", async () => {
    const taskData = task();
    const runnerBundle = bundle(taskData);
    const fingerprint = await captureRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: runnerBundle,
      probes: probes({
        task: taskData,
        bundle: runnerBundle,
        components: {
          observe_authority: () =>
            Promise.resolve({
              state: "unavailable",
              source: "runner_authority_resolution",
              reason_code: "authority_projection_unavailable",
            }),
        },
      }),
    });
    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: fingerprint,
        current: fingerprint,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.reason_code).toBe("state_fingerprint_required_component_unavailable");
    expect(error.diagnostic.unavailable_required_components).toContain("authority");
  });
});
