import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { assertStateFingerprintPrecondition } from "@agentplaneorg/core/schemas";
import { describe, expect, it, vi } from "vitest";

import type { TaskData } from "../backends/task-backend.js";
import {
  capturePreparedRunnerStateFingerprint,
  captureRunnerStateFingerprint,
  RUNNER_STATE_FINGERPRINT_POLICY,
} from "./state-fingerprint.js";
import {
  bundle,
  capturePreconditionError,
  context,
  gitSnapshot,
  invocation,
  probes,
  setResolvedAuthority,
  task,
} from "./state-fingerprint.testkit.js";
import { executeStateBoundRunnerInvocation } from "./usecases/task-run-state-fingerprint.js";

function contextAtRoot(taskData: TaskData, root: string) {
  const ctx = context(taskData);
  ctx.resolvedProject = {
    gitRoot: root,
    agentplaneDir: path.join(root, ".agentplane"),
  };
  ctx.backendConfigPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
  return ctx;
}

describe("runner state fingerprint production projections", () => {
  it("assigns provider sync freshness exclusively to the provider component", async () => {
    const preparedTask = task({
      sync: {
        version: 1,
        external_refs: [{ provider: "github", remote_id: "123" }],
        field_policies: {},
        freshness: {
          projected_at: "2026-07-24T00:00:00.000Z",
          projection_sha256: "projection-1",
          provider_revision: "provider-1",
          source_revision: 1,
        },
        conflicts: [],
      },
    });
    const changedTask = structuredClone(preparedTask);
    changedTask.sync = {
      ...changedTask.sync!,
      freshness: {
        projected_at: "2026-07-24T00:01:00.000Z",
        projection_sha256: "projection-2",
        provider_revision: "provider-2",
        source_revision: 2,
      },
    };
    const runnerBundle = bundle(preparedTask);
    const ctx = context(changedTask);
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      git: gitSnapshot(),
      probes: probes({ task: preparedTask, bundle: runnerBundle }),
    });
    const current = await captureRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      probes: probes({ task: changedTask, bundle: runnerBundle }),
    });
    const apply = vi.fn(() =>
      Promise.resolve({
        status: "success" as const,
        exit_code: 0,
        started_at: "2026-07-24T00:00:00.000Z",
        ended_at: "2026-07-24T00:00:01.000Z",
      }),
    );

    expect(current.components.task.digest).toBe(prepared.components.task.digest);
    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
      "provider",
    ]);
    await expect(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: changedTask.id,
        bundle: runnerBundle,
        invocation: invocation(),
        precondition_fingerprint: prepared,
        precondition_policy: RUNNER_STATE_FINGERPRINT_POLICY,
        probes: probes({ task: changedTask, bundle: runnerBundle }),
        apply,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason_code: "state_fingerprint_stale",
        fingerprint: {
          changed_components: [{ component: "provider" }],
        },
      },
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("rejects changed provider evidence while freshness remains unavailable", async () => {
    const preparedTask = task({
      sync: {
        version: 1,
        external_refs: [{ provider: "github", remote_id: "123" }],
        field_policies: {},
        freshness: {
          provider_revision: "provider-1",
          stale: true,
          reason: "refresh required",
        },
        conflicts: [],
      },
    });
    const changedTask = structuredClone(preparedTask);
    changedTask.sync!.freshness = {
      provider_revision: "provider-2",
      stale: true,
      reason: "refresh required",
    };
    const runnerBundle = bundle(preparedTask);
    const ctx = context(changedTask);
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      git: gitSnapshot(),
      probes: probes({ task: preparedTask, bundle: runnerBundle }),
    });
    const current = await captureRunnerStateFingerprint({
      ctx,
      bundle: runnerBundle,
      probes: probes({ task: changedTask, bundle: runnerBundle }),
    });
    const apply = vi.fn(() =>
      Promise.resolve({
        status: "success" as const,
        exit_code: 0,
        started_at: "2026-07-24T00:00:00.000Z",
        ended_at: "2026-07-24T00:00:01.000Z",
      }),
    );

    expect(prepared.components.provider.state).toBe("unavailable");
    expect(current.components.provider.state).toBe("unavailable");
    expect(current.components.task.digest).toBe(prepared.components.task.digest);
    await expect(
      executeStateBoundRunnerInvocation({
        ctx,
        task_id: changedTask.id,
        bundle: runnerBundle,
        invocation: invocation(),
        precondition_fingerprint: prepared,
        precondition_policy: RUNNER_STATE_FINGERPRINT_POLICY,
        probes: probes({ task: changedTask, bundle: runnerBundle }),
        apply,
      }),
    ).rejects.toMatchObject({
      code: "E_RUNTIME",
      context: {
        reason_code: "state_fingerprint_stale",
        fingerprint: {
          changed_components: [{ component: "provider" }],
        },
      },
    });
    expect(apply).not.toHaveBeenCalled();
  });

  it("rejects explicitly stale provider evidence even when it is unchanged", async () => {
    const taskData = task({
      sync: {
        version: 1,
        external_refs: [{ provider: "github", remote_id: "123" }],
        field_policies: {},
        freshness: {
          provider_revision: "provider-1",
          stale: true,
          reason: "refresh required",
        },
        conflicts: [],
      },
    });
    const runnerBundle = bundle(taskData);
    const ctx = context(taskData);
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
        precondition_policy: RUNNER_STATE_FINGERPRINT_POLICY,
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

  it.each([
    {
      name: "field policies",
      mutate: (sync: NonNullable<TaskData["sync"]>) => {
        sync.field_policies.title = {
          authority: "provider",
          conflict_policy: "manual",
        };
      },
    },
    {
      name: "sync conflicts",
      mutate: (sync: NonNullable<TaskData["sync"]>) => {
        sync.conflicts.push({
          id: "conflict-1",
          kind: "field",
          severity: "blocking",
          status: "open",
          summary: "Provider title diverged.",
          field: "title",
          detected_at: "2026-07-24T00:00:00.000Z",
        });
      },
    },
  ])(
    "keeps provider $name in the task component even when external refs are empty",
    async ({ mutate }) => {
      const preparedTask = task({
        sync: {
          version: 1,
          external_refs: [],
          field_policies: {},
          conflicts: [],
        },
      });
      const changedTask = structuredClone(preparedTask);
      mutate(changedTask.sync!);
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

      expect(prepared.components.provider).toMatchObject({
        state: "missing",
        reason_code: "provider_not_applicable",
      });
      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: prepared,
          current,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual(["task"]);
    },
  );

  it("keeps owner-profile derivation out of policy, blueprint, and authority projections", async () => {
    const preparedTask = task({ owner: "CODER" });
    const changedTask = task({ owner: "TESTER" });
    const preparedBundle = bundle(preparedTask);
    preparedBundle.blueprint!.policyModules = [];
    preparedBundle.base_prompts.push({
      id: "base.owner_profile",
      role: "profile",
      source: ".agentplane/agents/CODER.json",
      priority: 300,
      content: '{"id":"CODER"}\n',
    });
    preparedBundle.blueprint!.contextManifest = [
      {
        id: "base.owner_profile",
        kind: "prompt",
        reason: "Resolved owner profile.",
        source: ".agentplane/agents/CODER.json",
      },
    ];
    setResolvedAuthority(preparedBundle);
    const changedBundle = bundle(changedTask);
    changedBundle.blueprint = structuredClone(preparedBundle.blueprint);
    changedBundle.blueprint.contextManifest = [
      {
        id: "base.owner_profile",
        kind: "prompt",
        reason: "Resolved owner profile.",
        source: ".agentplane/agents/TESTER.json",
      },
    ];
    changedBundle.base_prompts.push({
      id: "base.owner_profile",
      role: "profile",
      source: ".agentplane/agents/TESTER.json",
      priority: 300,
      content: '{"id":"TESTER"}\n',
    });
    setResolvedAuthority(changedBundle);
    const preparedProbes = probes({ task: preparedTask, bundle: preparedBundle });
    delete preparedProbes.observe_policy;
    delete preparedProbes.observe_blueprint;
    delete preparedProbes.observe_authority;
    const changedProbes = probes({ task: changedTask, bundle: changedBundle });
    delete changedProbes.observe_policy;
    delete changedProbes.observe_blueprint;
    delete changedProbes.observe_authority;

    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx: context(preparedTask),
      bundle: preparedBundle,
      git: gitSnapshot(),
      probes: preparedProbes,
    });
    const current = await capturePreparedRunnerStateFingerprint({
      ctx: context(changedTask),
      bundle: changedBundle,
      git: gitSnapshot(),
      probes: changedProbes,
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual(["task"]);
  });

  it("assigns execution-profile approvals exclusively to authority", async () => {
    const taskData = task();
    const preparedBundle = bundle(taskData);
    preparedBundle.blueprint!.policyModules = [];
    setResolvedAuthority(preparedBundle);
    preparedBundle.base_prompts.push({
      id: "base.execution_profile",
      role: "policy",
      source: "runtime:execution-profile:balanced",
      priority: 250,
      content: `${JSON.stringify(
        {
          profile: "balanced",
          reasoning_effort: "medium",
          approvals: preparedBundle.execution.approvals,
          stop_conditions: ["blocked"],
        },
        null,
        2,
      )}\n`,
    });
    const changedBundle = structuredClone(preparedBundle);
    setResolvedAuthority(changedBundle, {
      require_plan: true,
      require_verify: false,
      require_network: true,
    });
    const executionProfile = changedBundle.base_prompts.find(
      (prompt) => prompt.id === "base.execution_profile",
    );
    if (!executionProfile) throw new Error("Expected execution profile prompt.");
    const parsedProfile = JSON.parse(executionProfile.content) as Record<string, unknown>;
    parsedProfile.approvals = changedBundle.execution.approvals;
    executionProfile.content = `${JSON.stringify(parsedProfile, null, 2)}\n`;
    const preparedProbes = probes({ task: taskData, bundle: preparedBundle });
    delete preparedProbes.observe_policy;
    delete preparedProbes.observe_blueprint;
    delete preparedProbes.observe_authority;
    const changedProbes = probes({ task: taskData, bundle: changedBundle });
    delete changedProbes.observe_policy;
    delete changedProbes.observe_blueprint;
    delete changedProbes.observe_authority;

    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: preparedBundle,
      git: gitSnapshot(),
      probes: preparedProbes,
    });
    const current = await capturePreparedRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: changedBundle,
      git: gitSnapshot(),
      probes: changedProbes,
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
      "authority",
    ]);
  });

  it("assigns selected policy modules exclusively to the policy component", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-"));
    try {
      await Promise.all([
        writeFile(path.join(root, "policy-a.md"), "Same policy bytes.\n", "utf8"),
        writeFile(path.join(root, "policy-b.md"), "Same policy bytes.\n", "utf8"),
      ]);
      const taskData = task();
      const preparedBundle = bundle(taskData);
      preparedBundle.repository.git_root = root;
      preparedBundle.blueprint!.policyModules = ["policy-a.md"];
      preparedBundle.blueprint!.contextManifest = [
        {
          id: "policy-a.md",
          kind: "policy_module",
          reason: "Selected by the resolved blueprint.",
          source: "policy-a.md",
        },
      ];
      const changedBundle = structuredClone(preparedBundle);
      changedBundle.blueprint!.policyModules = ["policy-b.md"];
      changedBundle.blueprint!.contextManifest = [
        {
          id: "policy-b.md",
          kind: "policy_module",
          reason: "Selected by the resolved blueprint.",
          source: "policy-b.md",
        },
      ];
      const preparedProbes = probes({ task: taskData, bundle: preparedBundle });
      delete preparedProbes.observe_policy;
      delete preparedProbes.observe_blueprint;
      const changedProbes = probes({ task: taskData, bundle: changedBundle });
      delete changedProbes.observe_policy;
      delete changedProbes.observe_blueprint;
      const ctx = contextAtRoot(taskData, root);

      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: preparedBundle,
        git: gitSnapshot(),
        probes: preparedProbes,
      });
      const current = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: changedBundle,
        git: gitSnapshot(),
        probes: changedProbes,
      });

      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: prepared,
          current,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
        "policy",
      ]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("assigns resolved plan changes exclusively to the blueprint component", async () => {
    const taskData = task();
    const preparedBundle = bundle(taskData);
    const changedBundle = structuredClone(preparedBundle);
    changedBundle.blueprint!.allowedCommands = ["bun run typecheck"];
    const preparedProbes = probes({ task: taskData, bundle: preparedBundle });
    delete preparedProbes.observe_blueprint;
    const changedProbes = probes({ task: taskData, bundle: changedBundle });
    delete changedProbes.observe_blueprint;
    const prepared = await capturePreparedRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: preparedBundle,
      git: gitSnapshot(),
      probes: preparedProbes,
    });
    const current = await capturePreparedRunnerStateFingerprint({
      ctx: context(taskData),
      bundle: changedBundle,
      git: gitSnapshot(),
      probes: changedProbes,
    });

    const error = capturePreconditionError(() =>
      assertStateFingerprintPrecondition({
        expected: prepared,
        current,
        policy: RUNNER_STATE_FINGERPRINT_POLICY,
      }),
    );
    expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
      "blueprint",
    ]);
  });

  it("assigns manifest-lock changes exclusively to the knowledge component", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-"));
    try {
      const manifestPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
      await mkdir(path.dirname(manifestPath), { recursive: true });
      await writeFile(manifestPath, '{"schema_version":1,"revision":1}\n', "utf8");
      const taskData = task();
      const runnerBundle = bundle(taskData);
      runnerBundle.repository.git_root = root;
      const ctx = contextAtRoot(taskData, root);
      const preparedProbes = probes({ task: taskData, bundle: runnerBundle });
      delete preparedProbes.observe_knowledge;
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: preparedProbes,
      });
      await writeFile(manifestPath, '{"schema_version":1,"revision":2}\n', "utf8");
      const currentProbes = probes({ task: taskData, bundle: runnerBundle });
      delete currentProbes.observe_knowledge;
      const current = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: currentProbes,
      });

      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: prepared,
          current,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
        "knowledge",
      ]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("assigns backend configuration changes exclusively to backend projection", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-"));
    try {
      const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
      await mkdir(path.dirname(configPath), { recursive: true });
      await writeFile(configPath, '{"schema_version":1,"revision":1}\n', "utf8");
      const taskData = task();
      const runnerBundle = bundle(taskData);
      runnerBundle.repository.git_root = root;
      const ctx = context(taskData);
      ctx.resolvedProject = {
        gitRoot: root,
        agentplaneDir: path.join(root, ".agentplane"),
      };
      ctx.backendConfigPath = configPath;
      const preparedProbes = probes({ task: taskData, bundle: runnerBundle });
      delete preparedProbes.observe_backend_projection;
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: preparedProbes,
      });
      await writeFile(configPath, '{"schema_version":1,"revision":2}\n', "utf8");
      const currentProbes = probes({ task: taskData, bundle: runnerBundle });
      delete currentProbes.observe_backend_projection;
      const current = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: currentProbes,
      });

      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: prepared,
          current,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.diagnostic.changed_components.map((entry) => entry.component)).toEqual([
        "backend_projection",
      ]);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });

  it("refuses a selected policy module symlink that escapes the repository", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-repo-"));
    const outside = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-outside-"));
    try {
      const outsidePolicy = path.join(outside, "policy.md");
      await writeFile(outsidePolicy, "External policy bytes must not be observed.\n", "utf8");
      await symlink(outsidePolicy, path.join(root, "policy.md"));
      const taskData = task();
      const runnerBundle = bundle(taskData);
      runnerBundle.repository.git_root = root;
      runnerBundle.blueprint!.policyModules = ["policy.md"];
      const ctx = contextAtRoot(taskData, root);
      const stateProbes = probes({ task: taskData, bundle: runnerBundle });
      delete stateProbes.observe_policy;

      const fingerprint = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });

      expect(fingerprint.components.policy).toMatchObject({
        state: "unavailable",
        reason_code: "policy_module_observation_unavailable",
      });
      await writeFile(outsidePolicy, "Changed external policy bytes.\n", "utf8");
      const repeated = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });
      expect(repeated.components.policy).toEqual(fingerprint.components.policy);
      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: fingerprint,
          current: fingerprint,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.reason_code).toBe("state_fingerprint_required_component_unavailable");
      expect(error.diagnostic.unavailable_required_components).toContain("policy");
    } finally {
      await Promise.all([
        rm(root, { recursive: true, force: true }),
        rm(outside, { recursive: true, force: true }),
      ]);
    }
  });

  it("refuses a backend configuration symlink that escapes the repository", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-repo-"));
    const outside = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-outside-"));
    try {
      const outsideConfig = path.join(outside, "backend.json");
      const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
      await Promise.all([
        writeFile(outsideConfig, '{"schema_version":1,"id":"external"}\n', "utf8"),
        mkdir(path.dirname(configPath), { recursive: true }),
      ]);
      await symlink(outsideConfig, configPath);
      const taskData = task();
      const runnerBundle = bundle(taskData);
      runnerBundle.repository.git_root = root;
      const ctx = context(taskData);
      ctx.resolvedProject = {
        gitRoot: root,
        agentplaneDir: path.join(root, ".agentplane"),
      };
      ctx.backendConfigPath = configPath;
      const stateProbes = probes({ task: taskData, bundle: runnerBundle });
      delete stateProbes.observe_backend_projection;

      const fingerprint = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });

      expect(fingerprint.components.backend_projection).toMatchObject({
        state: "unavailable",
        reason_code: "backend_config_unreadable",
      });
      await writeFile(outsideConfig, '{"schema_version":1,"id":"changed-external"}\n', "utf8");
      const repeated = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });
      expect(repeated.components.backend_projection).toEqual(
        fingerprint.components.backend_projection,
      );
      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: fingerprint,
          current: fingerprint,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.reason_code).toBe("state_fingerprint_required_component_unavailable");
      expect(error.diagnostic.unavailable_required_components).toContain("backend_projection");
    } finally {
      await Promise.all([
        rm(root, { recursive: true, force: true }),
        rm(outside, { recursive: true, force: true }),
      ]);
    }
  });

  it("refuses a knowledge manifest symlink that escapes the repository", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-repo-"));
    const outside = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-outside-"));
    try {
      const outsideContext = path.join(outside, "context");
      const outsideManifest = path.join(outsideContext, "manifest.lock.json");
      const manifestPath = path.join(root, ".agentplane", "context", "manifest.lock.json");
      await Promise.all([
        mkdir(outsideContext, { recursive: true }),
        mkdir(path.join(root, ".agentplane"), { recursive: true }),
      ]);
      await writeFile(outsideManifest, '{"schema_version":1,"revision":"external"}\n', "utf8");
      await symlink(outsideContext, path.dirname(manifestPath));
      const taskData = task();
      const runnerBundle = bundle(taskData);
      runnerBundle.repository.git_root = root;
      const ctx = contextAtRoot(taskData, root);
      const stateProbes = probes({ task: taskData, bundle: runnerBundle });
      delete stateProbes.observe_knowledge;

      const fingerprint = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });

      expect(fingerprint.components.knowledge).toMatchObject({
        state: "unavailable",
        reason_code: "knowledge_manifest_unreadable",
      });
      await writeFile(
        outsideManifest,
        '{"schema_version":1,"revision":"changed-external"}\n',
        "utf8",
      );
      const repeated = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });
      expect(repeated.components.knowledge).toEqual(fingerprint.components.knowledge);
    } finally {
      await Promise.all([
        rm(root, { recursive: true, force: true }),
        rm(outside, { recursive: true, force: true }),
      ]);
    }
  });

  it("fails closed when a selected policy module is missing", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-state-fingerprint-"));
    try {
      const taskData = task();
      const runnerBundle = bundle(taskData);
      runnerBundle.repository.git_root = root;
      runnerBundle.blueprint!.policyModules = ["missing-policy.md"];
      const ctx = contextAtRoot(taskData, root);
      const stateProbes = probes({ task: taskData, bundle: runnerBundle });
      delete stateProbes.observe_policy;
      const fingerprint = await capturePreparedRunnerStateFingerprint({
        ctx,
        bundle: runnerBundle,
        git: gitSnapshot(),
        probes: stateProbes,
      });

      expect(fingerprint.components.policy).toMatchObject({
        state: "unavailable",
        reason_code: "policy_module_missing",
      });
      const error = capturePreconditionError(() =>
        assertStateFingerprintPrecondition({
          expected: fingerprint,
          current: fingerprint,
          policy: RUNNER_STATE_FINGERPRINT_POLICY,
        }),
      );
      expect(error.reason_code).toBe("state_fingerprint_required_component_unavailable");
      expect(error.diagnostic.unavailable_required_components).toContain("policy");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
});
