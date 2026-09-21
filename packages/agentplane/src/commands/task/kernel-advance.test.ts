import { describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

if (typeof vi.hoisted !== "function") {
  Object.defineProperty(vi, "hoisted", { value: <T>(factory: () => T): T => factory() });
}

const advanceMocks = vi.hoisted(() => ({
  createKernelRuntime: vi.fn(),
}));

vi.mock("./kernel-runtime-context.js", () => ({
  createKernelRuntime: advanceMocks.createKernelRuntime,
  requireKernelCommit: vi.fn(),
}));
vi.mock("./kernel-final-validation.js", () => ({
  restoreKernelFinalValidation: vi.fn(() => null),
  runKernelFinalValidation: vi.fn(),
}));
import {
  applyKernelEffectStep,
  type KernelEffectDispatch,
  type KernelEffectPort,
} from "./kernel-effect-coordinator.js";
import {
  advanceCanonicalTask,
  blockKernelSemanticEpisode,
  kernelPlanApprovalOperatorAction,
} from "./kernel-advance.js";
import { resumeKernelWorkOrder } from "./kernel-work-order.js";

const digest = (value: string) => k.kernelDigest(value);
const execFileAsync = promisify(execFile);

function effect(state: k.EffectState = "PREPARED"): k.ExternalEffect {
  return {
    id: "repository.commit:build",
    kind: "repository.commit",
    execution_requirements: {
      scope_roots: ["packages/core"],
      repository_effects: ["repository.commit"],
      external_effects: ["repository.commit"],
      capabilities: ["repository_write"],
      resources: [],
    },
    idempotency_key: "task:build:repository.commit",
    state,
    request_digest: digest("request"),
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

function record(candidate: k.ExternalEffect) {
  return {
    aggregate: {
      id: "task-1",
      effects: [candidate],
    },
  } as never;
}

function runtime(events: string[]) {
  return {
    input: vi.fn((payload: k.TaskCommand, mutationId: string) => {
      events.push(`input:${payload.kind}:${mutationId}`);
      return Promise.resolve({ command: payload });
    }),
    adapter: {
      execute: vi.fn((input: { command: k.TaskCommand }) => {
        events.push(`commit:${input.command.kind}`);
        return Promise.resolve({
          kind: "committed",
          record: record(effect()),
          events: [],
          receipts: [],
          replayed: false,
        });
      }),
    },
    lifecycle: {
      apply: vi.fn((input: { command: k.TaskCommand }) => {
        events.push(`commit:${input.command.kind}`);
        return Promise.resolve({
          kind: "committed",
          record: record(effect()),
          events: [],
          receipts: [],
          replayed: false,
        });
      }),
    },
  } as never;
}

describe("canonical effect coordinator", () => {
  it("persists dispatch intent before invoking an adapter and then records success", async () => {
    const events: string[] = [];
    const candidate = effect();
    const observe = vi.fn();
    const port: KernelEffectPort = {
      dispatch: vi.fn((input: KernelEffectDispatch) => {
        events.push(`dispatch:${input.idempotency_key}`);
        return Promise.resolve({ state: "APPLIED", digest: digest("applied") });
      }),
      observe,
    };

    await expect(
      applyKernelEffectStep({
        runtime: runtime(events),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_dispatch_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).resolves.toEqual({ kind: "advanced" });

    expect(events).toEqual([
      `input:begin_effect:effect:begin:${candidate.id}:${candidate.idempotency_key}`,
      "commit:begin_effect",
      `dispatch:${candidate.idempotency_key}`,
      `input:observe_effect:effect:observe:${candidate.id}:${digest("applied")}`,
      "commit:observe_effect",
    ]);
    expect(observe).not.toHaveBeenCalled();
  });

  it("leaves a durable pending intent when dispatch terminates ambiguously", async () => {
    const events: string[] = [];
    const candidate = effect();
    const dispatch = vi.fn().mockRejectedValue(new Error("connection closed after request"));
    const port: KernelEffectPort = {
      dispatch,
      observe: vi.fn(),
    };

    await expect(
      applyKernelEffectStep({
        runtime: runtime(events),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_dispatch_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).rejects.toThrow("connection closed after request");

    expect(events).toEqual([
      `input:begin_effect:effect:begin:${candidate.id}:${candidate.idempotency_key}`,
      "commit:begin_effect",
    ]);
  });

  it("persists an in-doubt dispatch result and returns the reconciliation boundary", async () => {
    const events: string[] = [];
    const candidate = effect();
    const port: KernelEffectPort = {
      dispatch: vi.fn().mockResolvedValue({
        state: "IN_DOUBT",
        digest: digest("unknown-provider-outcome"),
      }),
      observe: vi.fn(),
    };

    await expect(
      applyKernelEffectStep({
        runtime: runtime(events),
        record: record(candidate),
        route: {
          reason_code: "kernel_effect_dispatch_required",
          task_id: "task-1",
          work_item_id: null,
          effect_id: candidate.id,
          grants_authority: false,
        },
        resolve_port: () => port,
      }),
    ).resolves.toMatchObject({
      kind: "stop",
      action: { reason: "canonical_effect_reconciliation_required" },
    });
    expect(events).toEqual([
      `input:begin_effect:effect:begin:${candidate.id}:${candidate.idempotency_key}`,
      "commit:begin_effect",
      `input:observe_effect:effect:observe:${candidate.id}:${digest("unknown-provider-outcome")}`,
      "commit:observe_effect",
    ]);
  });
});

describe("canonical semantic episode recovery", () => {
  it("projects a signed canonical plan approval when trusted issuers are configured", () => {
    const repositoryFingerprint = digest("repository");
    const context = {
      task_id: "task-1",
      repository_identity: digest("identity"),
      repository_fingerprint: repositoryFingerprint,
      ceiling: { scope_roots: ["src"] },
    } as never;
    const plan = { revision: 1, digest: digest("plan") } as never;
    const command = {
      resolvedProject: { gitRoot: "/repo" },
      config: { authority: { approval_receipts: { trusted_issuers: [{ id: "bridge" }] } } },
    } as never;

    const action = kernelPlanApprovalOperatorAction(command, "task-1", context, plan);

    expect(action).toMatchObject({
      kind: "approve_plan",
      required_role: "USER",
      cwd: "/repo",
      argv: [
        "agentplane",
        "task",
        "plan",
        "approve",
        "task-1",
        "--approval-receipt",
        "<base64url-receipt>",
      ],
      transport: "signed_user_receipt",
      approval_receipt: {
        request: {
          approval_type: "plan_approval",
          task_id: "task-1",
          state_fingerprint: repositoryFingerprint,
          operation_id: null,
          operation_digest: null,
          state_scope_digest: null,
        },
      },
    });
    expect(action.approval_receipt?.request.authority_reference).toBe(action.authority_reference);
  });

  it("persists a replayable WorkItem block before crossing a semantic stop", async () => {
    const directory = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-stop-"));
    const input = {
      command: {
        kind: "transition_work_item",
        task_id: "task-1",
        work_item_id: "build",
        action: "block",
        claim_id: "claim-1",
      },
    } as never;
    const apply = vi.fn().mockResolvedValue({
      kind: "committed",
      record: {},
      events: [],
      receipts: [],
      replayed: false,
    });
    const runtime = {
      input: vi.fn().mockResolvedValue(input),
      lifecycle: { apply },
    } as never;

    const request = {
      runtime,
      directory,
      work_order_id: "sha256:work-order",
      work_item_id: "build",
      claim_id: "claim-1",
    };
    await blockKernelSemanticEpisode(request);
    await blockKernelSemanticEpisode(request);

    expect(runtime.input).toHaveBeenCalledTimes(1);
    expect(apply).toHaveBeenNthCalledWith(1, input);
    expect(apply).toHaveBeenNthCalledWith(2, input);
    expect(
      JSON.parse(await readFile(path.join(directory, "semantic-stop-command.json"), "utf8")),
    ).toEqual(input);
  });

  it("re-projects one stable WorkOrder for an already executing WorkItem", () => {
    const contractDigest = digest("contract");
    const repositoryFingerprint = digest("repository");
    const authority = { digest: digest("authority"), work_item_id: "build" } as never;
    const record = {
      aggregate: {
        id: "task-1",
        current_plan: { revision: 2, digest: digest("plan") },
        work_items: {
          dependency: {
            state: "COMPLETED",
            output_manifests: [{ id: "input", digest: digest("input") }],
          },
          build: {
            state: "EXECUTING",
            attempt: 3,
            claim_id: "claim-3",
            definition: {
              contract_digest: contractDigest,
              required_inputs: ["input"],
              expected_outputs: ["built"],
            },
          },
        },
      },
      documents: {
        contracts: {
          [String(contractDigest)]: {
            objective: "Build",
            acceptance_criteria: ["Built"],
            verification_commands: ["bun test"],
            role: "EXECUTOR",
          },
        },
      },
    } as never;

    const resumed = resumeKernelWorkOrder({
      record,
      work_item_id: "build",
      authority,
      repository_fingerprint: repositoryFingerprint,
    });

    expect(resumed).toMatchObject({
      binding: {
        task_id: "task-1",
        work_item_id: "build",
        attempt: 3,
        claim_id: "claim-3",
        repository_fingerprint: repositoryFingerprint,
      },
      inputs: [{ id: "input" }],
      expected_outputs: ["built"],
      authority,
    });
    expect(
      resumeKernelWorkOrder({
        record,
        work_item_id: "missing",
        authority,
        repository_fingerprint: repositoryFingerprint,
      }),
    ).toBeNull();
  });
});

describe("canonical task worktree routing", () => {
  it("redirects a semantic result episode to an existing canonical task worktree", async () => {
    vi.resetAllMocks();
    const repository = await mkdtemp(path.join(os.tmpdir(), "agentplane-kernel-advance-"));
    const worktree = path.join(repository, "task-worktree");
    const branch = "task/202609192051-QAHTFD/canonical-qahtfd";
    await execFileAsync("git", ["init", "-b", "main"], { cwd: repository });
    await execFileAsync("git", ["config", "user.name", "AgentPlane Test"], { cwd: repository });
    await execFileAsync("git", ["config", "user.email", "test@example.com"], {
      cwd: repository,
    });
    await writeFile(path.join(repository, "README.md"), "fixture\n", "utf8");
    await execFileAsync("git", ["add", "README.md"], { cwd: repository });
    await execFileAsync("git", ["commit", "-m", "fixture"], { cwd: repository });
    await execFileAsync("git", ["worktree", "add", "-b", branch, worktree], {
      cwd: repository,
    });
    const canonicalWorktree = await realpath(worktree);
    advanceMocks.createKernelRuntime.mockResolvedValue({
      native: {
        readContext: vi.fn().mockResolvedValue({ repository_fingerprint: "sha256:fingerprint" }),
      },
      lifecycle: {
        read: vi.fn().mockResolvedValue({
          read: {
            kind: "canonical",
            task: {
              owner: "CODER",
              execution_route: { repository_mode: "branch_pr" },
            },
            record: {
              digest: "sha256:record",
              aggregate: {
                revision: 1,
                current_plan: null,
                final_validation: null,
                work_items: { tests: { claim_id: "sha256:claim" } },
              },
            },
          },
          next_action: {
            reason_code: "kernel_work_item_result_required",
            work_item_id: "tests",
          },
        }),
      },
    });

    await expect(
      advanceCanonicalTask({
        command: {
          resolvedProject: { gitRoot: repository },
          config: { branch: { task_prefix: "task/" } },
        } as never,
        task_id: "202609192051-QAHTFD",
        transport: "host",
      }),
    ).resolves.toEqual({
      schema_version: 1,
      task_id: "202609192051-QAHTFD",
      action: {
        kind: "external_wait",
        reason: "canonical_worktree_prepared",
        must_run_from: canonicalWorktree,
      },
    });
    await rm(repository, { recursive: true, force: true });
  });
});
