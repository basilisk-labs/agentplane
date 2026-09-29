import { beforeEach, describe, expect, it, vi } from "vitest";

import { taskKernel as k } from "@agentplaneorg/core/tasks";

import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type * as TaskBackendModule from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { WorkflowOperation } from "../shared/workflow-step.js";

const mocks = vi.hoisted(() => ({
  admitted: vi.fn(),
  decide: vi.fn(),
  ensureProjection: vi.fn(),
  execute: vi.fn(),
  readEnvelope: vi.fn(),
  recoverSuspension: vi.fn(),
}));

vi.mock("../shared/route-decision.js", () => ({ buildTaskRouteDecision: mocks.decide }));
vi.mock("./branch-task-supervisor-operations.js", () => ({
  executeAdmittedBranchWorkflowOperation: mocks.admitted,
  executeBranchWorkflowOperation: mocks.execute,
}));
vi.mock("../../shared/stable-file.js", () => ({
  readStableRegularTextNoFollow: mocks.readEnvelope,
}));
vi.mock("./kernel-operational-projection.js", () => ({
  ensureKernelOperationalProjectionEvidence: mocks.ensureProjection,
}));
vi.mock("./kernel-controller-handoff.js", () => ({
  recoverCanonicalControllerSuspension: mocks.recoverSuspension,
  withCanonicalControllerSuspendedForOperation: vi.fn(),
}));
vi.mock("../shared/task-backend.js", async (importOriginal) => ({
  ...(await importOriginal<typeof TaskBackendModule>()),
  resolveCommandGitCommonDir: () => Promise.resolve("/repo/.git"),
}));

import { buildAgentActionPacket } from "./agent-action-packet.js";
import {
  canonicalWorkflowEffectForDecision,
  canonicalWorkflowRequestDigest,
  createKernelProviderEffectPortResolver,
} from "./kernel-provider-effect-coordinator.js";

const TASK_ID = "T-1";
const BRANCH = "task/T-1/work";
const HEAD = "a".repeat(40);
const BASE = "b".repeat(40);

function operation(id: "integration.run_next" | "task.hosted_close.finalize") {
  return {
    id,
    type: id === "integration.run_next" ? "integration_run_next" : "cleanup",
    params: id === "integration.run_next" ? { taskId: TASK_ID } : { taskId: TASK_ID, base: "main" },
    preconditionFingerprint: { digest: k.kernelDigest(`${id}:route`) },
    authorityRef: `authority:${id}`,
    idempotencyKey: `${id}:${TASK_ID}:exact`,
    expectedPostconditions: [],
    triggersGitHooks: false,
  } as WorkflowOperation;
}

function decision(
  candidate: WorkflowOperation = operation("integration.run_next"),
  hostedHead = HEAD,
  mergeCommit: string | null = null,
): TaskRouteDecision {
  return {
    task: { id: TASK_ID },
    workflowMode: "branch_pr",
    workspace: {
      branch: BRANCH,
      baseBranch: "main",
      headSha: BASE,
      prBranch: BRANCH,
      baseCheckoutPath: "/repo/base",
      taskWorktreePath: "/repo/task",
    },
    prFlow: {
      branch: { name: BRANCH, headSha: HEAD, metaHeadSha: HEAD },
      pr: {
        provider: "github",
        state: mergeCommit ? "MERGED" : "OPEN",
        source: "lookup",
        prNumber: 42,
        prUrl: "https://github.test/pull/42",
        base: "main",
        headSha: hostedHead,
        mergeCommit,
      },
      publication: {
        state: "aligned",
        localHeadSha: HEAD,
        upstreamHeadSha: HEAD,
        hostedHeadSha: hostedHead,
      },
      queue: {
        present: true,
        status: "queued",
        reason: null,
        updatedAt: "2026-09-21T00:00:00.000Z",
        branch: BRANCH,
        base: "main",
        headSha: HEAD,
        baseSha: BASE,
        prNumber: 42,
      },
      closeTail: { state: "not_applicable", reason: "implementation PR is open" },
      hostedChecks: { checked: true, failing: 0, pending: 0, passing: 1 },
      reviewThreads: { checked: true, unresolved: 0 },
      handoff: { present: false },
      task: { id: TASK_ID, status: "DONE", verification: "ok" },
      nextAction: "",
    },
    cleanupProbe: { state: "not_requested" },
    workflowStep: {
      id: candidate.id,
      kind: "cli_operation",
      preconditionFingerprint: candidate.preconditionFingerprint,
      operation: candidate,
    },
  } as unknown as TaskRouteDecision;
}

function record(): KernelRecord {
  return {
    aggregate: {
      id: TASK_ID,
      authority_lineage: [
        {
          authority: {
            external_effects: ["integration", "hosted_ci"],
            capabilities: ["provider_read", "provider_write", "network"],
          },
        },
      ],
    },
  } as unknown as KernelRecord;
}

describe("0.7.11 hosted integration parity", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.ensureProjection.mockResolvedValue(undefined);
    mocks.recoverSuspension.mockResolvedValue(undefined);
  });

  it("binds queue and hosted observations to their exact SHA identity", () => {
    const current = decision();
    const wrongHead = decision(operation("integration.run_next"), "c".repeat(40));
    const firstMerge = decision(operation("integration.run_next"), HEAD, "d".repeat(40));
    const movedMerge = decision(operation("integration.run_next"), HEAD, "e".repeat(40));
    if (current.workflowStep.kind !== "cli_operation") throw new Error("operation required");
    if (wrongHead.workflowStep.kind !== "cli_operation") throw new Error("operation required");
    if (firstMerge.workflowStep.kind !== "cli_operation") throw new Error("operation required");
    if (movedMerge.workflowStep.kind !== "cli_operation") throw new Error("operation required");

    const currentDigest = canonicalWorkflowRequestDigest(
      TASK_ID,
      current,
      current.workflowStep.operation,
    );
    const wrongDigest = canonicalWorkflowRequestDigest(
      TASK_ID,
      wrongHead,
      wrongHead.workflowStep.operation,
    );

    expect(currentDigest).toMatch(/^sha256:[a-f0-9]{64}$/u);
    expect(wrongDigest).not.toBe(currentDigest);
    expect(
      canonicalWorkflowRequestDigest(TASK_ID, firstMerge, firstMerge.workflowStep.operation),
    ).not.toBe(
      canonicalWorkflowRequestDigest(TASK_ID, movedMerge, movedMerge.workflowStep.operation),
    );
    expect(canonicalWorkflowEffectForDecision(record(), current)?.request_digest).toBe(
      currentDigest,
    );
  });

  it("projects a hosted wait without issuing a model exchange", () => {
    const current = decision();
    const wait = {
      ...current,
      workflowStep: {
        id: "wait.integration_queue",
        kind: "wait",
        summary: "wait for exact provider merge truth",
        preconditionFingerprint: { digest: k.kernelDigest("wait") },
        condition: {
          type: "integration_queue_terminal",
          taskId: TASK_ID,
          queueStatus: "handoff",
        },
      },
    } as unknown as TaskRouteDecision;
    const packet = buildAgentActionPacket({
      decision: wait,
      work_order: {
        role: "EXECUTOR",
        authority: { sandbox: "read-only", network: "deny" },
        required_inputs: [],
      } as never,
      exchange: {
        directory: "/exchange",
        work_order_ref: "work-order.json",
        result_schema_ref: "result-schema.json",
        result_ref: "result.json",
        return_invocation: "agentplane task advance T-1 --result result.json --agent-json",
        result_path: "/exchange/result.json",
        resume_argv: ["agentplane", "task", "advance", TASK_ID],
      },
    });

    expect(packet.action.kind).toBe("external_wait");
    expect(packet.stop.reason).toBe("external_boundary");
    expect(packet).not.toHaveProperty("exchange");
  });

  it("keeps a lost integration response in doubt for fresh reconciliation", async () => {
    const before = decision();
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    const contents = {
      schema_version: 1 as const,
      task_id: TASK_ID,
      effect_id: effect.id,
      request_digest: effect.request_digest,
      decision: before,
    };
    mocks.readEnvelope.mockResolvedValue(
      JSON.stringify({ ...contents, digest: k.kernelDigest(contents) }),
    );
    mocks.admitted.mockResolvedValue({
      journal: { digest: k.kernelDigest("ambiguous-integration") },
      execution: {
        executable: true,
        result: { status: "failed", observed_postconditions: [], detail: "provider timeout" },
        stop_reason: "workflow supervisor executor crashed",
        refreshed_decision: null,
      },
    });
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);

    await expect(
      port!.dispatch({ task_id: TASK_ID, effect, idempotency_key: effect.idempotency_key }),
    ).resolves.toMatchObject({ state: "IN_DOUBT" });
    expect(mocks.admitted).toHaveBeenCalledOnce();
    expect(mocks.recoverSuspension).toHaveBeenCalledOnce();
  });

  it("keeps hosted close-tail operations on the canonical recoverable effect path", () => {
    const close = decision(operation("task.hosted_close.finalize"));
    expect(canonicalWorkflowEffectForDecision(record(), close)).toMatchObject({
      kind: "hosted_ci",
      state: "PREPARED",
      idempotency_key: `task.hosted_close.finalize:${TASK_ID}:exact`,
    });
  });
});
