import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", { value: <T>(factory: () => T): T => factory() });
}

const mocks = vi.hoisted(() => ({
  applyKernelEffectStep: vi.fn(),
  commitCanonicalTerminalTaskArtifacts: vi.fn().mockResolvedValue(false),
  createKernelRuntime: vi.fn(),
  decideCanonicalWorkflowEffect: vi.fn(),
  executeCanonicalLocalWorkflowOperation: vi.fn().mockResolvedValue(false),
  prepareCanonicalWorkflowEffect: vi.fn(),
  restoreKernelFinalValidation: vi.fn().mockResolvedValue(null),
  runKernelFinalValidation: vi.fn(),
  ensureKernelOperationalProjectionEvidence: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("./kernel-runtime-context.js", () => ({
  createKernelRuntime: mocks.createKernelRuntime,
  requireKernelCommit: vi.fn((value: unknown) => value),
}));
vi.mock("./kernel-effect-coordinator.js", () => ({
  applyKernelEffectStep: mocks.applyKernelEffectStep,
  emptyKernelEffectPortResolver: vi.fn(),
}));
vi.mock("./kernel-final-validation.js", () => ({
  restoreKernelFinalValidation: mocks.restoreKernelFinalValidation,
  runKernelFinalValidation: mocks.runKernelFinalValidation,
}));
vi.mock("./kernel-provider-effect-coordinator.js", () => ({
  decideCanonicalWorkflowEffect: mocks.decideCanonicalWorkflowEffect,
  executeCanonicalLocalWorkflowOperation: mocks.executeCanonicalLocalWorkflowOperation,
  prepareCanonicalWorkflowEffect: mocks.prepareCanonicalWorkflowEffect,
}));
vi.mock("./kernel-repository-coordinator.js", () => ({
  commitCanonicalTerminalTaskArtifacts: mocks.commitCanonicalTerminalTaskArtifacts,
}));
vi.mock("./kernel-operational-projection.js", () => ({
  ensureKernelOperationalProjectionEvidence: mocks.ensureKernelOperationalProjectionEvidence,
}));

import { advanceTaskStep } from "./advance-task-step.js";

const execFileAsync = promisify(execFile);
const temporaryRoots: string[] = [];

afterEach(async () => {
  vi.clearAllMocks();
  mocks.commitCanonicalTerminalTaskArtifacts.mockResolvedValue(false);
  mocks.executeCanonicalLocalWorkflowOperation.mockResolvedValue(false);
  mocks.restoreKernelFinalValidation.mockResolvedValue(null);
  mocks.ensureKernelOperationalProjectionEvidence.mockResolvedValue(undefined);
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })),
  );
});

function completedRuntime() {
  const record = {
    digest: "sha256:record",
    aggregate: {
      revision: 9,
      state: "COMPLETED",
      current_plan: null,
      final_validation: null,
      authority_lineage: [],
      work_items: {},
      effects: [],
    },
  };
  const apply = vi.fn();
  const input = vi.fn();
  const checkpoint = vi.fn();
  const runtime = {
    native: {
      readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:repo" }),
    },
    lifecycle: {
      read: vi.fn().mockResolvedValue({
        read: {
          kind: "canonical",
          task: { execution_route: { repository_mode: "branch_pr" } },
          record,
        },
        next_action: {
          reason_code: "kernel_task_completed",
          work_item_id: null,
          effect_id: null,
        },
      }),
      apply,
    },
    input,
    checkpoint,
  };
  return { record, runtime, apply, input, checkpoint };
}

async function repositorySnapshot(root: string, evidencePath: string, record: unknown) {
  const head = await execFileAsync("git", ["rev-parse", "HEAD"], { cwd: root });
  const status = await execFileAsync("git", ["status", "--porcelain=v1"], { cwd: root });
  return {
    record: JSON.stringify(record),
    evidence: await readFile(evidencePath, "utf8"),
    head: head.stdout.trim(),
    status: status.stdout,
  };
}

describe("LC-20 terminal replay", () => {
  it("commits terminal task artifacts only after complete_task is persisted", async () => {
    const events: string[] = [];
    const evidenceDigest = `sha256:${"e".repeat(64)}`;
    const planDigest = `sha256:${"p".repeat(64)}`;
    const record = {
      digest: `sha256:${"r".repeat(64)}`,
      aggregate: {
        revision: 12,
        current_plan: { digest: planDigest },
        final_validation: { status: "PASSED", evidence_digests: [evidenceDigest] },
        authority_lineage: [],
        work_items: {},
        effects: [],
      },
    };
    const completion = { command: { expected_task_revision: 12 } };
    const runtime = {
      native: {
        readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:repo" }),
      },
      lifecycle: {
        read: vi.fn().mockResolvedValue({
          read: {
            kind: "canonical",
            task: { execution_route: { repository_mode: "branch_pr" } },
            record,
          },
          next_action: {
            reason_code: "kernel_task_completion_required",
            work_item_id: null,
            effect_id: null,
          },
        }),
        apply: vi.fn().mockImplementation(() => {
          events.push("complete_task");
          return Promise.resolve({ kind: "committed" });
        }),
      },
      input: vi.fn().mockResolvedValue(completion),
      checkpoint: vi.fn(),
    };
    mocks.createKernelRuntime.mockResolvedValue(runtime);
    mocks.restoreKernelFinalValidation.mockResolvedValue({
      fingerprint: "sha256:repo",
      environment_digest: k.kernelDigest(verificationChildEnv()),
      evidence_digest: evidenceDigest,
      plan_digest: planDigest,
    });
    mocks.commitCanonicalTerminalTaskArtifacts.mockImplementation(() => {
      events.push("terminal_artifacts");
      return Promise.reject(new Error("stop after ordering proof"));
    });

    await expect(
      advanceTaskStep({
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        task_id: "task-1",
        transport: "host",
        allow_provider_effects: true,
      }),
    ).rejects.toThrow("stop after ordering proof");

    expect(events).toEqual(["complete_task", "terminal_artifacts"]);
  });

  it("does not commit terminal task artifacts when complete_task fails", async () => {
    const evidenceDigest = `sha256:${"e".repeat(64)}`;
    const planDigest = `sha256:${"p".repeat(64)}`;
    const record = {
      digest: `sha256:${"r".repeat(64)}`,
      aggregate: {
        revision: 12,
        current_plan: { digest: planDigest },
        final_validation: { status: "PASSED", evidence_digests: [evidenceDigest] },
        authority_lineage: [],
        work_items: {},
        effects: [],
      },
    };
    const runtime = {
      native: {
        readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:repo" }),
      },
      lifecycle: {
        read: vi.fn().mockResolvedValue({
          read: {
            kind: "canonical",
            task: { execution_route: { repository_mode: "branch_pr" } },
            record,
          },
          next_action: {
            reason_code: "kernel_task_completion_required",
            work_item_id: null,
            effect_id: null,
          },
        }),
        apply: vi.fn().mockRejectedValue(new Error("stale completion")),
      },
      input: vi.fn().mockResolvedValue({ command: { expected_task_revision: 12 } }),
      checkpoint: vi.fn(),
    };
    mocks.createKernelRuntime.mockResolvedValue(runtime);
    mocks.restoreKernelFinalValidation.mockResolvedValue({
      fingerprint: "sha256:repo",
      environment_digest: k.kernelDigest(verificationChildEnv()),
      evidence_digest: evidenceDigest,
      plan_digest: planDigest,
    });

    await expect(
      advanceTaskStep({
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        task_id: "task-1",
        transport: "host",
        allow_provider_effects: true,
      }),
    ).rejects.toThrow("stale completion");

    expect(mocks.commitCanonicalTerminalTaskArtifacts).not.toHaveBeenCalled();
  });

  it("keeps repeated locally terminal reads byte-stable without provider, check, or Kernel writes", async () => {
    const root = await mkdtemp(path.join(os.tmpdir(), "agentplane-terminal-noop-"));
    temporaryRoots.push(root);
    await execFileAsync("git", ["init", "-b", "main"], { cwd: root });
    await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: root });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], { cwd: root });
    const evidencePath = path.join(root, "evidence.json");
    await writeFile(evidencePath, '{"status":"accepted"}\n', "utf8");
    await execFileAsync("git", ["add", "evidence.json"], { cwd: root });
    await execFileAsync("git", ["commit", "-m", "fixture"], { cwd: root });

    const { record, runtime, apply, input, checkpoint } = completedRuntime();
    mocks.createKernelRuntime.mockResolvedValue(runtime);
    mocks.decideCanonicalWorkflowEffect.mockResolvedValue({
      workspace: { baseCheckoutPath: root },
      workflowStep: { kind: "terminal", outcome: { type: "done" } },
    });
    const command = { resolvedProject: { gitRoot: root } } as never;
    const before = await repositorySnapshot(root, evidencePath, record);

    const first = await advanceTaskStep({
      command,
      task_id: "task-1",
      transport: "host",
      allow_provider_effects: true,
    });
    const second = await advanceTaskStep({
      command,
      task_id: "task-1",
      transport: "host",
      allow_provider_effects: true,
    });

    expect(first).toEqual(second);
    expect(mocks.decideCanonicalWorkflowEffect).toHaveBeenNthCalledWith(
      1,
      command,
      "task-1",
      false,
    );
    expect(mocks.decideCanonicalWorkflowEffect).toHaveBeenNthCalledWith(
      2,
      command,
      "task-1",
      false,
    );
    expect(mocks.decideCanonicalWorkflowEffect).toHaveBeenCalledTimes(2);
    expect(mocks.prepareCanonicalWorkflowEffect).not.toHaveBeenCalled();
    expect(mocks.runKernelFinalValidation).not.toHaveBeenCalled();
    expect(mocks.applyKernelEffectStep).not.toHaveBeenCalled();
    expect(apply).not.toHaveBeenCalled();
    expect(input).not.toHaveBeenCalled();
    expect(checkpoint).not.toHaveBeenCalled();
    await expect(repositorySnapshot(root, evidencePath, record)).resolves.toEqual(before);
  });

  it("executes a repository-local close transition before evaluating provider effects", async () => {
    const { runtime } = completedRuntime();
    mocks.createKernelRuntime.mockResolvedValue(runtime);
    const localDecision = {
      workflowStep: {
        kind: "cli_operation",
        operation: { id: "task.pre_merge_close" },
      },
    };
    const terminalDecision = {
      workflowStep: { kind: "terminal", outcome: { type: "done" } },
    };
    mocks.decideCanonicalWorkflowEffect
      .mockResolvedValueOnce(localDecision)
      .mockResolvedValueOnce(terminalDecision);
    mocks.executeCanonicalLocalWorkflowOperation.mockResolvedValueOnce(true);

    await expect(
      advanceTaskStep({
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        task_id: "task-1",
        transport: "host",
        allow_provider_effects: true,
      }),
    ).resolves.toMatchObject({ action: { kind: "terminal", reason: "kernel_task_completed" } });

    expect(mocks.executeCanonicalLocalWorkflowOperation).toHaveBeenCalledWith(
      expect.objectContaining({ decision: localDecision, task_id: "task-1" }),
    );
    expect(mocks.prepareCanonicalWorkflowEffect).not.toHaveBeenCalled();
  });

  it("does not shortcut an unresolved effect", async () => {
    const { runtime } = completedRuntime();
    runtime.lifecycle.read.mockResolvedValue({
      read: {
        kind: "canonical",
        task: { execution_route: { repository_mode: "branch_pr" } },
        record: {
          digest: "sha256:effect",
          aggregate: {
            revision: 10,
            current_plan: null,
            final_validation: null,
            authority_lineage: [],
            work_items: {},
            effects: [{ id: "merge", state: "PENDING" }],
          },
        },
      },
      next_action: {
        reason_code: "kernel_effect_observation_required",
        work_item_id: null,
        effect_id: "merge",
      },
    });
    mocks.createKernelRuntime.mockResolvedValue(runtime);
    mocks.applyKernelEffectStep.mockResolvedValue({
      kind: "stop",
      action: { kind: "human_required", reason: "canonical_effect_reconciliation_required" },
    });

    await expect(
      advanceTaskStep({
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        task_id: "task-1",
        transport: "host",
      }),
    ).resolves.toMatchObject({
      action: { reason: "canonical_effect_reconciliation_required" },
    });

    expect(mocks.applyKernelEffectStep).toHaveBeenCalledTimes(1);
    expect(mocks.decideCanonicalWorkflowEffect).not.toHaveBeenCalled();
  });
});
