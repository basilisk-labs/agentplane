import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CloudBackend, LocalBackend } from "../backends/task-backend.js";
import { cloudProjectionIdentitySha256 } from "../backends/task-backend/cloud-projection-identity.js";
import {
  capturePreparedRunnerStateFingerprint,
  resolveRunnerStateFingerprintPolicy,
} from "./state-fingerprint.js";
import {
  bundle,
  context,
  gitSnapshot,
  invocation,
  probes,
  task,
} from "./state-fingerprint.testkit.js";
import { executeStateBoundRunnerInvocation } from "./usecases/task-run-state-fingerprint.js";

type CloudIdentity = {
  endpoint: string;
  projectId: string;
  provider: string | null;
};

const DEFAULT_IDENTITY: CloudIdentity = {
  endpoint: "https://cloud.example",
  projectId: "project-1",
  provider: "github",
};

function successfulApply() {
  return vi.fn(() =>
    Promise.resolve({
      status: "success" as const,
      exit_code: 0,
      started_at: "2026-07-24T00:00:00.000Z",
      ended_at: "2026-07-24T00:00:01.000Z",
    }),
  );
}

function createCloudBackend(root: string, identity: CloudIdentity) {
  const fetchImpl = vi.fn<typeof fetch>(() =>
    Promise.reject(new Error("Projection observation must not access the network.")),
  );
  return {
    fetchImpl,
    backend: new CloudBackend(
      {
        endpoint: identity.endpoint,
        token: "token",
        project_id: identity.projectId,
        provider: identity.provider ?? undefined,
        stale_after_seconds: 300,
      },
      {
        root,
        cache: new LocalBackend({ dir: path.join(root, ".agentplane", "tasks") }),
        fetchImpl,
        autoSyncNetworkAllowed: false,
      },
    ),
  };
}

async function cloudProjectionCase(opts: {
  last_checked_at: string | null;
  identity?: CloudIdentity;
  checkpoint_identity_sha256?: string | null;
  pending_push?: { failed_at: string; reason: string } | null;
}) {
  const identity = opts.identity ?? DEFAULT_IDENTITY;
  const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-cloud-fingerprint-"));
  const configPath = path.join(root, ".agentplane", "backends", "local", "backend.json");
  const statePath = path.join(root, ".agentplane", "backends", "cloud", "state.json");
  await Promise.all([
    mkdir(path.dirname(configPath), { recursive: true }),
    mkdir(path.dirname(statePath), { recursive: true }),
  ]);
  await Promise.all([
    writeFile(
      configPath,
      `${JSON.stringify({
        id: "cloud",
        settings: {
          endpoint: identity.endpoint,
          project_id: identity.projectId,
          provider: identity.provider,
          stale_after_seconds: 300,
        },
      })}\n`,
      "utf8",
    ),
    writeFile(
      statePath,
      `${JSON.stringify({
        last_checked_at: opts.last_checked_at,
        last_start_ready_pull_at: null,
        pending_push: opts.pending_push ?? null,
        projection_identity_sha256:
          opts.checkpoint_identity_sha256 === undefined
            ? cloudProjectionIdentitySha256(identity)
            : opts.checkpoint_identity_sha256,
      })}\n`,
      "utf8",
    ),
  ]);
  const taskData = task({
    sync: {
      version: 1,
      external_refs: [{ provider: "github", remote_id: "123" }],
      field_policies: {},
      freshness: {
        provider_revision: "provider-1",
        projected_at: opts.last_checked_at ?? undefined,
      },
      conflicts: [],
    },
  });
  const runnerBundle = bundle(taskData);
  runnerBundle.repository = {
    ...runnerBundle.repository,
    git_root: root,
    backend_id: "cloud",
    backend_config_path: configPath,
  };
  runnerBundle.execution.approvals.require_network = true;
  const cloud = createCloudBackend(root, identity);
  const ctx = context(taskData);
  ctx.resolvedProject = {
    gitRoot: root,
    agentplaneDir: path.join(root, ".agentplane"),
  };
  ctx.taskBackend = cloud.backend;
  ctx.backendId = cloud.backend.id;
  ctx.backendConfigPath = configPath;
  if (!ctx.config.agents?.approvals) {
    throw new Error("Expected agent approvals configuration.");
  }
  ctx.config.agents.approvals.require_network = true;
  const stateProbes = probes({ task: taskData, bundle: runnerBundle });
  delete stateProbes.observe_backend_projection;
  stateProbes.load_context = () => Promise.resolve(ctx);
  return {
    root,
    configPath,
    taskData,
    runnerBundle,
    ctx,
    stateProbes,
    fetchImpl: cloud.fetchImpl,
  };
}

describe("runner cloud projection fingerprint", () => {
  let originalEnv: NodeJS.ProcessEnv = {};

  beforeEach(() => {
    originalEnv = { ...process.env };
    delete process.env.AGENTPLANE_CLOUD_ENDPOINT;
    delete process.env.AGENTPLANE_CLOUD_TOKEN;
    delete process.env.AGENTPLANE_CLOUD_PROJECT_ID;
    delete process.env.AGENTPLANE_CLOUD_PROVIDER;
  });

  afterEach(() => {
    vi.useRealTimers();
    process.env = originalEnv;
  });

  it("refuses a stale cache with cached provider truth and no network", async () => {
    const fixture = await cloudProjectionCase({
      last_checked_at: "2026-01-01T00:00:00.000Z",
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      const apply = successfulApply();

      expect(prepared.components.provider.state).toBe("present");
      expect(prepared.components.backend_projection).toMatchObject({
        state: "unavailable",
        reason_code: "backend_projection_stale",
      });
      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).rejects.toMatchObject({
        context: {
          reason_code: "state_fingerprint_required_component_unavailable",
          fingerprint: {
            unavailable_required_components: ["backend_projection"],
            provider_state: "present",
          },
        },
        state_fingerprint: { outcome: "refused", effect_applied: false },
      });
      expect(apply).not.toHaveBeenCalled();
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("accepts a fresh identity-bound projection without network access", async () => {
    const fixture = await cloudProjectionCase({
      last_checked_at: new Date().toISOString(),
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      const apply = successfulApply();

      expect(prepared.components.backend_projection.state).toBe("present");
      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).resolves.toMatchObject({
        precondition: { status: "fresh", reason_code: "state_fingerprint_fresh" },
        state_fingerprint: { outcome: "accepted", effect_applied: true },
      });
      expect(apply).toHaveBeenCalledTimes(1);
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("refuses a fresh projection with an unpushed local mutation", async () => {
    const fixture = await cloudProjectionCase({
      last_checked_at: new Date().toISOString(),
      pending_push: {
        failed_at: "2026-07-24T00:01:00.000Z",
        reason: "push failed",
      },
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      const apply = successfulApply();

      expect(prepared.components.backend_projection).toMatchObject({
        state: "unavailable",
        reason_code: "backend_projection_pending_push",
      });
      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).rejects.toMatchObject({
        state_fingerprint: { outcome: "refused", effect_applied: false },
      });
      expect(apply).not.toHaveBeenCalled();
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("refuses a projection one millisecond beyond its TTL", async () => {
    vi.useFakeTimers();
    vi.setSystemTime("2026-07-24T00:05:00.000Z");
    const fixture = await cloudProjectionCase({
      last_checked_at: "2026-07-24T00:00:00.000Z",
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      vi.setSystemTime("2026-07-24T00:05:00.001Z");
      const apply = successfulApply();

      expect(prepared.components.backend_projection.state).toBe("present");
      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).rejects.toMatchObject({
        context: {
          reason_code: "state_fingerprint_stale",
          fingerprint: {
            changed_components: [{ component: "backend_projection" }],
          },
        },
        state_fingerprint: { outcome: "refused", effect_applied: false },
      });
      expect(apply).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("refuses a fresh checkpoint from a different cloud project before preparation", async () => {
    const oldIdentity = cloudProjectionIdentitySha256({
      endpoint: "https://cloud.example",
      projectId: "project-a",
      provider: "github",
    });
    const fixture = await cloudProjectionCase({
      last_checked_at: new Date().toISOString(),
      identity: {
        endpoint: "https://cloud.example",
        projectId: "project-b",
        provider: "github",
      },
      checkpoint_identity_sha256: oldIdentity,
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      const apply = successfulApply();

      expect(prepared.components.backend_projection).toMatchObject({
        state: "unavailable",
        reason_code: "backend_projection_identity_mismatch",
      });
      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).rejects.toMatchObject({
        state_fingerprint: { outcome: "refused", effect_applied: false },
      });
      expect(apply).not.toHaveBeenCalled();
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("refuses a legacy checkpoint without cloud identity", async () => {
    const fixture = await cloudProjectionCase({
      last_checked_at: new Date().toISOString(),
      checkpoint_identity_sha256: null,
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      const apply = successfulApply();

      expect(prepared.components.backend_projection).toMatchObject({
        state: "unavailable",
        reason_code: "backend_projection_identity_unavailable",
      });
      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).rejects.toMatchObject({
        state_fingerprint: { outcome: "refused", effect_applied: false },
      });
      expect(apply).not.toHaveBeenCalled();
      expect(fixture.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });

  it("refuses an effective endpoint override introduced after preparation", async () => {
    const fixture = await cloudProjectionCase({
      last_checked_at: new Date().toISOString(),
    });
    try {
      const prepared = await capturePreparedRunnerStateFingerprint({
        ctx: fixture.ctx,
        bundle: fixture.runnerBundle,
        git: gitSnapshot(),
        probes: fixture.stateProbes,
      });
      process.env.AGENTPLANE_CLOUD_ENDPOINT = "https://other-cloud.example";
      const liveCloud = createCloudBackend(fixture.root, DEFAULT_IDENTITY);
      const liveCtx = context(fixture.taskData);
      liveCtx.resolvedProject = fixture.ctx.resolvedProject;
      liveCtx.taskBackend = liveCloud.backend;
      liveCtx.backendId = liveCloud.backend.id;
      liveCtx.backendConfigPath = fixture.configPath;
      liveCtx.config.agents = fixture.ctx.config.agents;
      fixture.stateProbes.load_context = () => Promise.resolve(liveCtx);
      const apply = successfulApply();

      await expect(
        executeStateBoundRunnerInvocation({
          ctx: fixture.ctx,
          task_id: fixture.taskData.id,
          bundle: fixture.runnerBundle,
          invocation: invocation(),
          precondition_fingerprint: prepared,
          precondition_policy: resolveRunnerStateFingerprintPolicy(fixture.ctx),
          probes: fixture.stateProbes,
          apply,
        }),
      ).rejects.toMatchObject({
        context: {
          reason_code: "state_fingerprint_stale",
          fingerprint: {
            changed_components: [{ component: "backend_projection" }],
          },
        },
        state_fingerprint: { outcome: "refused", effect_applied: false },
      });
      expect(apply).not.toHaveBeenCalled();
      expect(liveCloud.fetchImpl).not.toHaveBeenCalled();
    } finally {
      await rm(fixture.root, { recursive: true, force: true });
    }
  });
});
