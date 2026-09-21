import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, describe, expect, it, vi } from "vitest";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", { value: <T>(factory: () => T): T => factory() });
}

const mocks = vi.hoisted(() => ({
  applyKernelEffectStep: vi.fn(),
  commitCanonicalTerminalTaskArtifacts: vi.fn().mockResolvedValue(false),
  createKernelRuntime: vi.fn(),
  decideCanonicalWorkflowEffect: vi.fn(),
  prepareCanonicalWorkflowEffect: vi.fn(),
  restoreKernelFinalValidation: vi.fn().mockResolvedValue(null),
  runKernelFinalValidation: vi.fn(),
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
  prepareCanonicalWorkflowEffect: mocks.prepareCanonicalWorkflowEffect,
}));
vi.mock("./kernel-repository-coordinator.js", () => ({
  commitCanonicalTerminalTaskArtifacts: mocks.commitCanonicalTerminalTaskArtifacts,
}));

import { advanceTaskStep } from "./advance-task-step.js";

const execFileAsync = promisify(execFile);
const temporaryRoots: string[] = [];

afterEach(async () => {
  vi.clearAllMocks();
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
