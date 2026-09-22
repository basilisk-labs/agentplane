import { beforeEach, describe, expect, it, vi } from "vitest";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type * as TaskBackendModule from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

const mocks = vi.hoisted(() => ({
  decide: vi.fn(),
  supervise: vi.fn(),
  execute: vi.fn(),
  readEnvelope: vi.fn(),
  readJournal: vi.fn(),
  ensureProjection: vi.fn(),
}));
const routeBeforeDigest = k.kernelDigest("route-before");
const routeAfterDigest = k.kernelDigest("route-after");

vi.mock("../shared/route-decision.js", () => ({
  buildTaskRouteDecision: mocks.decide,
}));
vi.mock("../shared/supervisor-execution-episode.js", () => ({
  supervisePersistedWorkflowEpisode: mocks.supervise,
  resolveSupervisorExecutionEpisodePath: () => Promise.resolve("/repo/.git/journal.json"),
  createSupervisorEpisodeStore: () => ({ read: mocks.readJournal }),
}));
vi.mock("./branch-task-supervisor-operations.js", () => ({
  executeAdmittedBranchWorkflowOperation: mocks.supervise,
  executeBranchWorkflowOperation: mocks.execute,
}));
vi.mock("../../shared/stable-file.js", () => ({
  readStableRegularTextNoFollow: mocks.readEnvelope,
}));
vi.mock("./kernel-operational-projection.js", () => ({
  ensureKernelOperationalProjectionEvidence: mocks.ensureProjection,
}));
vi.mock("../shared/task-backend.js", async (importOriginal) => ({
  ...(await importOriginal<typeof TaskBackendModule>()),
  resolveCommandGitCommonDir: () => Promise.resolve("/repo/.git"),
}));

import {
  canonicalWorkflowEffectForDecision,
  createKernelProviderEffectPortResolver,
  executeCanonicalAdmittedWorkflowOperation,
} from "./kernel-provider-effect-coordinator.js";

function operation(
  id: "pr.open" | "integration.enqueue" | "integration.run_next" = "pr.open",
) {
  return {
    id,
    type: "pr_sync",
    params:
      id === "pr.open"
        ? { taskId: "T-1", author: "CODER", includeTaskIds: [] }
        : id === "integration.enqueue"
          ? { taskId: "T-1", branch: "task/T-1/work" }
          : { taskId: "T-1" },
    preconditionFingerprint: { digest: routeBeforeDigest },
    authorityRef: "authority:route-before",
    idempotencyKey: `${id}:T-1:${routeBeforeDigest}:payload`,
    expectedPostconditions: [],
    triggersGitHooks: true,
  } as const;
}

function decision(candidate = operation()): TaskRouteDecision {
  return {
    task: { id: "T-1" },
    workspace: {
      branch: "task/T-1/work",
      baseBranch: "main",
      headSha: "a".repeat(40),
      prBranch: "task/T-1/work",
      baseCheckoutPath: "/repo",
      taskWorktreePath: "/repo/task",
    },
    executionPacket: { mustRunFrom: "/repo/task" },
    prFlow: null,
    cleanupProbe: { state: "not_requested" },
    workflowStep: {
      id: candidate.id,
      kind: "cli_operation",
      preconditionFingerprint: { digest: routeBeforeDigest },
      operation: candidate,
    },
  } as unknown as TaskRouteDecision;
}

function record(): KernelRecord {
  return {
    aggregate: {
      id: "T-1",
      authority_lineage: [
        {
          authority: {
            external_effects: ["pull_request", "integration"],
            capabilities: ["provider_read", "provider_write", "network"],
          },
        },
      ],
    },
  } as unknown as KernelRecord;
}

function terminalDecision(): TaskRouteDecision {
  return {
    task: { id: "T-1" },
    workspace: {
      branch: "task/T-1/work",
      baseBranch: "main",
      headSha: "a".repeat(40),
      prBranch: "task/T-1/work",
    },
    prFlow: null,
    cleanupProbe: { state: "not_requested" },
    workflowStep: {
      id: "task.done",
      kind: "terminal",
      outcome: { type: "done", taskId: "T-1" },
      preconditionFingerprint: { digest: routeAfterDigest },
    },
  } as unknown as TaskRouteDecision;
}

function envelope(
  before: ReturnType<typeof decision>,
  effect: NonNullable<ReturnType<typeof canonicalWorkflowEffectForDecision>>,
) {
  const contents = {
    schema_version: 1 as const,
    task_id: "T-1",
    effect_id: effect.id,
    request_digest: effect.request_digest,
    decision: before,
  };
  return { ...contents, digest: k.kernelDigest(contents) };
}

function completedJournal(before: ReturnType<typeof decision>, fingerprint = routeBeforeDigest) {
  if (before.workflowStep.kind !== "cli_operation") throw new Error("operation required");
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: "T-1",
    task_revision: null,
    state_fingerprint_digest: fingerprint,
    budget: {
      max_episodes: 4,
      max_agent_runs: 4,
      max_input_tokens: null,
      max_output_tokens: null,
      max_total_tokens: null,
      max_wall_time_ms: 60_000,
      max_changed_files: 20,
      max_diff_lines: 200,
      max_no_progress_episodes: 2,
    },
  });
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "side_effect",
    operation_identity: before.workflowStep.operation,
    precondition_fingerprint_digest: fingerprint,
    authority_ref: "workflow-operation:pr.open",
    authority_digest: fingerprint,
    effect_ref: before.workflowStep.operation.idempotencyKey,
  });
  if (started.status !== "started") throw new Error("journal start failed");
  return completeSupervisorExecutionEpisode({
    journal: started.journal,
    operation_key: started.operation_key,
    result: { status: "succeeded" },
    usage: { wall_time_ms: 1 },
    failed: false,
  });
}

describe("canonical provider effect coordinator", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.readJournal.mockResolvedValue(null);
  });

  it("binds a supported typed operation to approved canonical provider authority", () => {
    const effect = canonicalWorkflowEffectForDecision(record(), decision());

    expect(effect).not.toBeNull();
    expect(effect?.id).toMatch(/^workflow:pr\.open:[a-f0-9]{16}$/u);
    expect(effect).toMatchObject({
      kind: "pull_request",
      state: "PREPARED",
      idempotency_key: `pr.open:T-1:${routeBeforeDigest}:payload`,
      execution_requirements: {
        external_effects: ["pull_request"],
        capabilities: ["provider_read", "provider_write", "network"],
      },
    });
  });

  it("uses the persisted mature supervisor and returns its refreshed readback", async () => {
    const before = decision();
    const after = terminalDecision();
    mocks.decide.mockResolvedValueOnce(before);
    mocks.supervise.mockResolvedValueOnce({
      journal: { digest: "journal-digest" },
      execution: {
        executable: true,
        result: { status: "succeeded", observed_postconditions: [], detail: "ok" },
        stop_reason: null,
        refreshed_decision: after,
      },
    });
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    mocks.readEnvelope.mockResolvedValueOnce(JSON.stringify(envelope(before, effect)));
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);

    const observed = await port!.dispatch({
      task_id: "T-1",
      effect,
      idempotency_key: effect.idempotency_key,
    });
    expect(observed.state).toBe("APPLIED");
    expect(observed.digest).toMatch(/^sha256:/u);
    expect(mocks.supervise).toHaveBeenCalledOnce();
  });

  it("turns an ambiguous mature operation outcome into effect-in-doubt", async () => {
    const before = decision();
    mocks.decide.mockResolvedValueOnce(before);
    mocks.supervise.mockResolvedValueOnce({
      journal: { digest: "journal-digest" },
      execution: {
        executable: true,
        result: { status: "failed", observed_postconditions: [], detail: "timeout" },
        stop_reason: "workflow supervisor executor crashed",
        refreshed_decision: null,
      },
    });
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    mocks.readEnvelope.mockResolvedValueOnce(JSON.stringify(envelope(before, effect)));
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);

    await expect(
      port!.dispatch({ task_id: "T-1", effect, idempotency_key: effect.idempotency_key }),
    ).resolves.toMatchObject({ state: "IN_DOUBT" });
  });

  it("requires refreshed route readback in addition to the completed operation proof", async () => {
    const before = decision();
    mocks.decide.mockResolvedValueOnce(before);
    mocks.supervise.mockResolvedValueOnce({
      journal: { digest: "journal-digest" },
      execution: {
        executable: true,
        result: { status: "succeeded", observed_postconditions: [], detail: "ok" },
        stop_reason: null,
        refreshed_decision: before,
      },
    });
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    mocks.readEnvelope.mockResolvedValueOnce(JSON.stringify(envelope(before, effect)));
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);

    await expect(
      port!.dispatch({ task_id: "T-1", effect, idempotency_key: effect.idempotency_key }),
    ).resolves.toMatchObject({ state: "IN_DOUBT" });
  });

  it("observes without dispatching and does not infer application from unrelated route drift", async () => {
    const before = decision();
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);
    mocks.decide.mockResolvedValueOnce(before).mockResolvedValueOnce(terminalDecision());

    await expect(
      port!.observe({ task_id: "T-1", effect, idempotency_key: effect.idempotency_key }),
    ).resolves.toMatchObject({ state: "NOT_APPLIED" });
    await expect(
      port!.observe({ task_id: "T-1", effect, idempotency_key: effect.idempotency_key }),
    ).resolves.toMatchObject({ state: "IN_DOUBT" });
    expect(mocks.supervise).not.toHaveBeenCalled();
    expect(effect.request_digest).toMatch(/^sha256:[a-f0-9]{64}$/u);
  });

  it("recovers a completed exact operation from the durable supervisor journal", async () => {
    const before = decision();
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    mocks.readEnvelope.mockResolvedValueOnce(JSON.stringify(envelope(before, effect)));
    mocks.readJournal.mockResolvedValue(completedJournal(before));
    mocks.decide.mockResolvedValueOnce(terminalDecision());
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);

    const observed = await port!.observe({
      task_id: "T-1",
      effect,
      idempotency_key: effect.idempotency_key,
    });
    expect(observed.state).toBe("APPLIED");
    expect(observed.digest).toMatch(/^sha256:/u);
    expect(mocks.supervise).not.toHaveBeenCalled();
  });

  it("does not accept a journal operation with a different frozen authority identity", async () => {
    const before = decision();
    const effect = canonicalWorkflowEffectForDecision(record(), before)!;
    mocks.readEnvelope.mockResolvedValueOnce(JSON.stringify(envelope(before, effect)));
    mocks.readJournal.mockResolvedValue(
      completedJournal(before, k.kernelDigest("different provider route")),
    );
    mocks.decide.mockResolvedValueOnce(terminalDecision());
    const resolver = createKernelProviderEffectPortResolver({
      command: { resolvedProject: { gitRoot: "/repo" } } as never,
      allow_remote: true,
    });
    const port = await resolver(effect);

    await expect(
      port!.observe({ task_id: "T-1", effect, idempotency_key: effect.idempotency_key }),
    ).resolves.toMatchObject({ state: "IN_DOUBT" });
  });

  it("runs post-completion provider lifecycle through the admitted supervisor", async () => {
    const before = decision();
    const after = terminalDecision();
    mocks.supervise.mockResolvedValueOnce({
      journal: { digest: k.kernelDigest("post-completion") },
      execution: {
        executable: true,
        result: { status: "succeeded", observed_postconditions: [], detail: "ok" },
        stop_reason: null,
        refreshed_decision: after,
      },
    });

    await expect(
      executeCanonicalAdmittedWorkflowOperation({
        command: { resolvedProject: { gitRoot: "/repo" } } as never,
        decision: before,
        task_id: "T-1",
        request_digest: k.kernelDigest("post-completion-request"),
      }),
    ).resolves.toMatchObject({ execution: { refreshed_decision: after } });
    expect(mocks.supervise).toHaveBeenCalledWith(
      expect.objectContaining({ decision: before, git_root: "/repo" }),
    );
  });

  it(
    "executes post-completion integration from the base checkout without a Kernel controller transition",
    async () => {
      const operationId = "integration.enqueue" as const;
      const candidate = operation(operationId);
      const before = decision(candidate);
      const after = terminalDecision();
      mocks.supervise.mockImplementationOnce(async (input) => {
        await input.execute(candidate);
        return {
          journal: { digest: k.kernelDigest("post-completion-integration") },
          execution: {
            executable: true,
            result: { status: "succeeded", observed_postconditions: [], detail: "ok" },
            stop_reason: null,
            refreshed_decision: after,
          },
        };
      });
      mocks.execute.mockResolvedValueOnce({
        status: "succeeded",
        observed_postconditions: [],
        detail: "ok",
      });

      await executeCanonicalAdmittedWorkflowOperation({
        command: { resolvedProject: { gitRoot: "/repo/task" } } as never,
        decision: before,
        task_id: "T-1",
        request_digest: k.kernelDigest(`post-completion-${operationId}`),
      });

      expect(mocks.execute).toHaveBeenCalledWith({
        decision: expect.objectContaining({
          executionPacket: expect.objectContaining({
            authoritativeCheckout: "base_checkout",
            authoritativeCheckoutPath: "/repo",
            mutationPathHint: "/repo",
            mustRunFrom: "/repo",
          }),
        }),
        operation: candidate,
      });
    },
  );
});
