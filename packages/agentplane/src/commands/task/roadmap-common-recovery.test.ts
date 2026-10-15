import type { MockInstance } from "vitest";
import type { SupervisorExecutionEpisodeJournal } from "@agentplaneorg/core/schemas";
type IntegrationQueueState = QueueModule.IntegrationQueueState;
type IntegrationQueueEntry = QueueModule.IntegrationQueueEntry;
import type * as GitModule from "@agentplaneorg/core/git";
import type * as RecordModule from "../../adapters/task-backend/kernel-record.js";
import type * as ProviderModule from "../pr/internal/change-request-provider.js";
import type * as BackendModule from "../shared/task-backend.js";
import type * as SupervisorModule from "../shared/supervisor-execution-episode.js";
import type * as QueueModule from "../pr/integrate/queue-state.js";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import {
  consumeRetryBudget,
  recoveryDecisionForFailure,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { readKernelNextAction } from "../../adapters/task-backend/kernel-next-action.js";
import { applyKernelEffectStep, type KernelEffectPort } from "./kernel-effect-coordinator.js";

const fingerprint = (value: string) => k.kernelDigest(value);

function budget() {
  return {
    max_episodes: 8,
    max_agent_runs: 4,
    max_input_tokens: null,
    max_output_tokens: null,
    max_total_tokens: null,
    max_wall_time_ms: 60_000,
    max_changed_files: 20,
    max_diff_lines: null,
    max_no_progress_episodes: 2,
  };
}

function effect(state: k.EffectState): k.ExternalEffect {
  return {
    id: "integration.run_next:task-1",
    kind: "integration.run_next",
    execution_requirements: {
      scope_roots: [],
      repository_effects: [],
      external_effects: ["integration.run_next"],
      capabilities: ["provider_write"],
      resources: [],
    },
    idempotency_key: "task-1:integration.run_next",
    state,
    request_digest: fingerprint("request"),
    provider_receipt_digest: null,
    observed_state_digest: null,
  };
}

function canonicalRead(candidate: k.ExternalEffect | null, state: k.WorkItemState = "EXECUTING") {
  return {
    kind: "canonical",
    task: { id: "task-1" },
    record: {
      aggregate: {
        id: "task-1",
        state: "ACTIVE",
        effects: candidate ? [candidate] : [],
        current_plan: {
          state: "APPROVED",
          work_items: [{ id: "build", optional: false }],
        },
        work_items: {
          build: {
            definition: {
              id: "build",
              optional: false,
              depends_on: [],
              required_inputs: [],
              execution_requirements: { resources: [] },
            },
            state,
            attempt: 3,
            claim_id: "claim-3",
          },
        },
      },
    },
  };
}

describe("LC-12 common recovery admission", () => {
  it("preserves a completed operation identity until its route observation is applied", () => {
    const original = createSupervisorExecutionEpisodeJournal({
      task_id: "task-1",
      task_revision: 7,
      state_fingerprint_digest: fingerprint("before"),
      budget: budget(),
      now: "2026-09-21T00:00:00.000Z",
    });
    const started = startSupervisorExecutionEpisode({
      journal: original,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: { work_order_id: "work-order-1" },
      precondition_fingerprint_digest: fingerprint("before"),
      authority_ref: "work-order:work-order-1",
      authority_digest: fingerprint("authority"),
      work_order_ref: "exchange/work-order.json",
      effect_ref: "exchange/result.json",
      now: "2026-09-21T00:00:01.000Z",
    });
    if (started.status !== "started") throw new Error("expected the operation to start");
    const completed = completeSupervisorExecutionEpisode({
      journal: started.journal,
      operation_key: started.operation_key,
      result: { result_digest: fingerprint("result"), receipt_id: "receipt-1" },
      now: "2026-09-21T00:00:02.000Z",
    });
    const resultDigest = digestSupervisorEpisodeValue({
      result_digest: fingerprint("result"),
      receipt_id: "receipt-1",
    });

    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: completed,
      state_fingerprint_digest: fingerprint("after"),
      now: "2026-09-21T00:00:03.000Z",
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: recovered,
      state_fingerprint_digest: fingerprint("after"),
      route_observation: { reason_code: "kernel_work_item_inspection_required" },
      now: "2026-09-21T00:00:04.000Z",
    });

    expect(recovered).toMatchObject({
      cursor: { phase: "completed", operation_key: started.operation_key },
      operations: [
        {
          operation_key: started.operation_key,
          effect_ref: "exchange/result.json",
          result_digest: resultDigest,
        },
      ],
    });
    expect(advanced.operations).toHaveLength(1);
    expect(advanced.operations[0]).toMatchObject({
      operation_key: started.operation_key,
      effect_ref: "exchange/result.json",
      result_digest: resultDigest,
      postcondition_fingerprint_digest: fingerprint("after"),
    });
  });

  it("stops an uncertain intent and prioritizes effect observation over new work", () => {
    const original = createSupervisorExecutionEpisodeJournal({
      task_id: "task-1",
      task_revision: 7,
      state_fingerprint_digest: fingerprint("state"),
      budget: budget(),
      now: "2026-09-21T00:00:00.000Z",
    });
    const started = startSupervisorExecutionEpisode({
      journal: original,
      role: "EXECUTOR",
      kind: "cli_operation",
      operation_identity: { operation_id: "integration.run_next" },
      precondition_fingerprint_digest: fingerprint("state"),
      authority_ref: "workflow:integration.run_next",
      authority_digest: fingerprint("authority"),
      effect_ref: "task-1:integration.run_next",
      now: "2026-09-21T00:00:01.000Z",
    });
    if (started.status !== "started") throw new Error("expected the operation to start");

    const recovered = recoverSupervisorExecutionEpisodeJournal({
      journal: started.journal,
      state_fingerprint_digest: fingerprint("state"),
      now: "2026-09-21T00:00:02.000Z",
    });
    const route = readKernelNextAction(
      canonicalRead(effect("PENDING")) as never,
      fingerprint("state"),
    );

    expect(recovered).toMatchObject({
      status: "stopped",
      stop: { reason: "effect_in_doubt", operation_key: started.operation_key },
    });
    expect(route).toMatchObject({
      reason_code: "kernel_effect_observation_required",
      effect_id: "integration.run_next:task-1",
      work_item_id: null,
    });
  });

  it("observes a pending effect without redispatching it or changing the semantic attempt", async () => {
    const candidate = effect("PENDING");
    const commands: k.TaskCommand[] = [];
    const read = canonicalRead(candidate);
    const dispatch = vi.fn();
    const port: KernelEffectPort = {
      dispatch,
      observe: vi.fn().mockResolvedValue({
        state: "IN_DOUBT",
        digest: fingerprint("provider-uncertain"),
      }),
    };
    const runtime = {
      input: vi.fn((command: k.TaskCommand) => Promise.resolve({ command })),
      adapter: {
        execute: vi.fn((input: { command: k.TaskCommand }) => {
          commands.push(input.command);
          return Promise.resolve({
            kind: "committed",
            record: read.record,
            events: [],
            receipts: [],
            replayed: false,
          });
        }),
      },
    } as never;

    await expect(
      applyKernelEffectStep({
        runtime,
        record: read.record as never,
        route: readKernelNextAction(read as never, fingerprint("state")),
        resolve_port: () => port,
      }),
    ).resolves.toMatchObject({
      kind: "stop",
      action: { reason: "canonical_effect_reconciliation_required" },
    });

    expect(dispatch).not.toHaveBeenCalled();
    expect(commands).toEqual([expect.objectContaining({ kind: "observe_effect" })]);
    expect(read.record.aggregate.work_items.build.attempt).toBe(3);
  });

  it("keeps an interrupted semantic return pending and separates service retry from rework", () => {
    const route = readKernelNextAction(canonicalRead(null) as never, fingerprint("state"));
    const serviceFailure = {
      kind: "operation" as const,
      code: "transport_interrupted",
      message: "provider return was interrupted",
      retryable: true,
      cause_refs: [],
    };
    const semanticFailure = {
      kind: "validation" as const,
      code: "acceptance_failed",
      message: "accepted output did not pass validation",
      retryable: true,
      cause_refs: [],
    };
    const retryBudget = {
      task_id: "task-1",
      work_item_id: "build",
      operation: "semantic_work",
      failure_kind: serviceFailure.kind,
      maximum: 2,
      consumed: 0,
      reset_fingerprint: fingerprint("state"),
    };

    expect(route).toMatchObject({
      reason_code: "kernel_work_item_result_required",
      work_item_id: "build",
    });
    expect(recoveryDecisionForFailure(serviceFailure).action).toBe("retry");
    expect(recoveryDecisionForFailure(semanticFailure).action).toBe("repair");
    expect(
      consumeRetryBudget({ budget: retryBudget, current_fingerprint: fingerprint("state") }),
    ).toMatchObject({ consumed: 1 });
    expect(canonicalRead(null).record.aggregate.work_items.build.attempt).toBe(3);
  });
});

const recovery = vi.hoisted(() => ({
  readQueue: vi.fn(),
  writeQueue: vi.fn<(root: string, next: IntegrationQueueState) => Promise<void>>(),
  store: vi.fn(),
  lease: vi.fn(),
  provider: vi.fn(),
  kernel: vi.fn(),
  rev: vi.fn<(root: string, refs: string[]) => Promise<string>>(),
}));
vi.mock("../pr/integrate/queue-state.js", async (original) => ({
  ...(await original<typeof QueueModule>()),
  readIntegrationQueue: recovery.readQueue,
  writeIntegrationQueue: recovery.writeQueue,
  withIntegrationQueueMutex: (_root: string, run: () => Promise<unknown>) => run(),
}));
vi.mock("../shared/supervisor-execution-episode.js", async (original) => ({
  ...(await original<typeof SupervisorModule>()),
  resolveSupervisorExecutionEpisodePath: () => Promise.resolve("/repo/journal.json"),
  tryAcquireSupervisorExecutionLease: recovery.lease,
  createSupervisorEpisodeStore: recovery.store,
}));
vi.mock("../shared/task-backend.js", async (original) => ({
  ...(await original<typeof BackendModule>()),
  resolveCommandGitCommonDir: () => Promise.resolve("/repo/.git"),
}));
vi.mock("../pr/internal/change-request-provider.js", async (original) => ({
  ...(await original<typeof ProviderModule>()),
  observeExistingChangeRequestByNumber: recovery.provider,
}));
vi.mock("../../adapters/task-backend/kernel-record.js", async (original) => ({
  ...(await original<typeof RecordModule>()),
  readKernelRecord: recovery.kernel,
}));
vi.mock("@agentplaneorg/core/git", async (original) => ({
  ...(await original<typeof GitModule>()),
  gitRevParse: recovery.rev,
  gitIsAncestor: vi.fn(),
}));
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { hostname, tmpdir, userInfo } from "node:os";
import path from "node:path";
import { reconcileIntegrationEffect } from "./external-agent-workflow-recovery.js";
type KernelRecord = RecordModule.KernelRecord;
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

async function recoveryFixture() {
  const taskId = "task-1";
  const fp = fingerprint("current-route");
  const before = fingerprint("original-route");
  const identity = {
    branch: "task/task-1/work",
    head_sha: "a".repeat(40),
    base: "main",
    base_sha: "b".repeat(40),
    pr_number: 42,
    pr_url: "https://github.test/repo/pull/42",
    provider: {
      provider: "github",
      hostname: "github.test",
      remote: "origin",
      sourceProject: "owner/repo",
      targetProject: "owner/repo",
      sourceUrl: "https://github.test/owner/repo.git",
      targetUrl: "https://github.test/owner/repo.git",
    },
  };
  const opIdentity = {
    id: "integration.run_next",
    type: "integration_run_next",
    params: { taskId },
    preconditionFingerprint: { digest: before },
    authorityRef: `route:${taskId}:${before}`,
    idempotencyKey: `integration.run_next:${taskId}:${before}:exact`,
  };
  const empty = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: null,
    state_fingerprint_digest: before,
    budget: budget(),
    now: "2026-09-21T00:00:00.000Z",
  });
  const first = startSupervisorExecutionEpisode({
    journal: empty,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: { id: "previous" },
    precondition_fingerprint_digest: before,
    authority_ref: "previous",
    authority_digest: before,
    now: "2026-09-21T00:00:01.000Z",
  });
  if (first.status !== "started") throw new Error("fixture start");
  const prior = completeSupervisorExecutionEpisode({
    journal: first.journal,
    operation_key: first.operation_key,
    result: { previous: true },
    now: "2026-09-21T00:00:02.000Z",
  });
  const ready = advanceSupervisorExecutionEpisodeState({
    journal: prior,
    state_fingerprint_digest: before,
    route_observation: {},
    now: "2026-09-21T00:00:03.000Z",
  });
  const started = startSupervisorExecutionEpisode({
    journal: ready,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: opIdentity,
    precondition_fingerprint_digest: before,
    authority_ref: "workflow-operation:integration.run_next",
    authority_digest: before,
    effect_ref: opIdentity.idempotencyKey,
    now: "2026-09-21T00:00:05.000Z",
    recovery_context: {
      schema_version: 1,
      kind: "integration_run_next",
      task_id: taskId,
      repository_root: "/repo",
      queue: {
        present: true,
        branch: identity.branch,
        base: identity.base,
        headSha: identity.head_sha,
        baseSha: identity.base_sha,
        prNumber: identity.pr_number,
      },
      provider: {
        state: "found",
        pr: {
          identity: identity.provider,
          prNumber: 42,
          prUrl: identity.pr_url,
          headSha: identity.head_sha,
          base: identity.base,
        },
      },
    },
  });
  if (started.status !== "started") throw new Error("fixture intent");
  let journal = started.journal;
  const original = structuredClone(journal);
  const entry: IntegrationQueueEntry = {
    task_id: taskId,
    branch: identity.branch,
    base: identity.base,
    head_sha: identity.head_sha,
    base_sha: identity.base_sha,
    pr_number: 42,
    pr_url: identity.pr_url,
    changed_paths: [],
    priority: 0,
    status: "handoff",
    active_operation: "integration",
    claimed_by: `${userInfo().username}@${hostname()}`,
    claim_token: "original-claim",
    claimed_at: "2026-09-21T00:00:06.000Z",
    lease_expires_at: "2026-09-21T00:00:30.000Z",
    enqueued_at: "2026-09-21T00:00:00.000Z",
    updated_at: "2026-09-21T00:00:06.000Z",
  };
  let queue: IntegrationQueueState = { schema_version: 1, entries: [structuredClone(entry)] };
  const processIdentity = {
    pid: 2_147_483_000,
    ppid: 10,
    pgid: 2_147_483_000,
    session: "0",
    start: "Mon Sep 21 00:00:04 2026",
  };
  const receipt = {
    journal_after: structuredClone(original),
    queue_after: structuredClone(queue),
    steps: [
      {
        argv: [
          "/node",
          "/agentplane/dist/cli.js",
          "--no-update-check",
          "task",
          "advance",
          taskId,
          "--remote",
          "--agent-json",
        ],
        started_at: Date.parse("2026-09-21T00:00:04.000Z") / 1000,
        finished_at: Date.parse("2026-09-21T00:00:10.000Z") / 1000,
        pid: processIdentity.pid,
        root_start_identity: processIdentity,
        owned_history: [
          processIdentity,
          { ...processIdentity, pid: 2_147_483_001, ppid: processIdentity.pid },
        ],
        exit_code: -15,
        reaped: true,
        reader_stopped: true,
        remaining_owned: [],
      },
    ],
  };
  const operation = original.operations.at(-1)!;
  const resolution = {
    schema_version: 1,
    kind: "integration_effect_resolution",
    task_id: taskId,
    repository_root: "/repo",
    journal_digest: original.digest,
    operation_key: operation.operation_key,
    precondition_fingerprint_digest: before,
    authority_ref: operation.authority_ref,
    authority_digest: operation.authority_digest,
    effect_ref: operation.effect_ref,
    current_state_fingerprint: fp,
    identity,
    verdict: "not_applied",
    execution_receipt_ref: "operator:retained-receipt",
    operator: {
      kind: "operator_decision",
      actor: "Denis",
      decision_ref: "reviewed:original-intent",
      observed_at: "2026-09-21T00:01:00.000Z",
    },
    evidence: [{ ref: "operator:retained-receipt", content: "", digest: "" }],
  };
  const canonical = {
    aggregate: {
      state: "COMPLETED",
      id: taskId,
      work_items: { original: { state: "COMPLETED" } },
      final_validation: { status: "PASSED" },
    },
    repository_identity: fingerprint("repository"),
    digest: fingerprint("completed-record"),
  } as unknown as KernelRecord;
  recovery.kernel.mockImplementation(() => ({ kind: "canonical", record: canonical }));
  const getTask = vi.fn().mockResolvedValue({ id: taskId });
  const command = { resolvedProject: { gitRoot: "/repo" }, taskBackend: { getTask } };
  const route = {
    task: { id: taskId },
    workspace: { baseCheckoutPath: "/repo" },
    workflowStep: {
      kind: "wait",
      id: "wait.integration_queue",
      preconditionFingerprint: { digest: fp },
    },
  } as unknown as TaskRouteDecision;
  const decide = vi.fn().mockResolvedValue(route);
  const release = vi.fn().mockResolvedValue(undefined);
  recovery.lease.mockResolvedValue({ release });
  const cas = vi
    .fn()
    .mockImplementation((expected: string, next: SupervisorExecutionEpisodeJournal) => {
      if (journal.digest !== expected) return Promise.resolve(false);
      journal = next;
      return Promise.resolve(true);
    });
  recovery.store.mockReturnValue({ read: () => Promise.resolve(journal), compareAndSwap: cas });
  recovery.readQueue.mockImplementation(() => Promise.resolve(structuredClone(queue)));
  recovery.writeQueue.mockImplementation((_root, next) => {
    queue = next;
    return Promise.resolve();
  });
  const provider = {
    state: "found",
    pr: {
      identity: identity.provider,
      provider: "github",
      prNumber: 42,
      prUrl: identity.pr_url,
      headSha: identity.head_sha,
      headRef: identity.branch,
      base: identity.base,
      baseSha: identity.base_sha,
      status: "OPEN",
      mergeCommit: "test-merge-only",
      mergedAt: null,
    },
  };
  recovery.provider.mockResolvedValue(provider);
  recovery.rev.mockImplementation((_root, refs) =>
    Promise.resolve(refs[0] === "main" ? identity.base_sha : identity.head_sha),
  );
  const dir = await mkdtemp(path.join(tmpdir(), "ap-recovery-"));
  const input = path.join(dir, "resolution.json");
  const save = async (updateDigest = true) => {
    resolution.evidence[0]!.content = JSON.stringify(receipt);
    if (updateDigest)
      resolution.evidence[0]!.digest = digestSupervisorEpisodeValue(
        resolution.evidence[0]!.content,
      );
    await writeFile(input, JSON.stringify(resolution));
  };
  await save();
  const fixtureRecord = canonical;
  return {
    canonical,
    provider,
    resolution,
    receipt,
    entry,
    original,
    decide,
    cas,
    release,
    getTask,
    save,
    readJournal: () => journal,
    readQueue: () => queue,
    cleanup: () => rm(dir, { recursive: true, force: true }),
    run: (canonical = true) =>
      reconcileIntegrationEffect({
        command: command as never,
        task_id: taskId,
        input_path: input,
        canonical_record: canonical ? fixtureRecord : undefined,
        decide,
      }),
  };
}

describe("completed integration intent operator reconciliation", () => {
  let fixture: Awaited<ReturnType<typeof recoveryFixture>>;
  let kill: MockInstance<typeof process.kill>;
  beforeEach(async () => {
    vi.clearAllMocks();
    kill = vi.spyOn(process, "kill").mockImplementation(() => {
      throw Object.assign(new Error("absent"), { code: "ESRCH" });
    });
    fixture = await recoveryFixture();
  });
  afterEach(async () => {
    await fixture?.cleanup();
    vi.restoreAllMocks();
  });

  it("commits the exact journal before releasing only its claim and preserves completion/history", async () => {
    recovery.writeQueue.mockImplementationOnce((_root, next) => {
      expect(fixture.readJournal().operations.at(-1)?.status).toBe("failed");
      expect(fixture.cas).toHaveBeenCalledOnce();
      expect(next.entries[0]).not.toHaveProperty("claim_token");
      return Promise.resolve();
    });
    await expect(fixture.run()).resolves.toMatchObject({ verdict: "not_applied", replay: false });
    const journal = fixture.readJournal();
    expect(journal.operations[0]).toEqual(fixture.original.operations[0]);
    expect(journal.operations.at(-1)).toMatchObject({
      ...fixture.original.operations.at(-1),
      status: "failed",
      completed_at: expect.any(String) as string,
      result_digest: expect.any(String) as string,
    });
    expect(fixture.canonical.aggregate.state).toBe("COMPLETED");
    expect(fixture.canonical.aggregate.final_validation).toEqual({ status: "PASSED" });
    expect(fixture.release).toHaveBeenCalledOnce();
    expect(kill).toHaveBeenCalledWith(2_147_483_000, 0);
    expect(kill).toHaveBeenCalledWith(2_147_483_001, 0);
  });

  it("retains the claim after queue persistence failure and retries bookkeeping only", async () => {
    recovery.writeQueue.mockRejectedValueOnce(new Error("queue unavailable"));
    await expect(fixture.run()).rejects.toThrow("queue unavailable");
    expect(fixture.readQueue().entries[0]?.claim_token).toBe("original-claim");
    expect(fixture.readJournal().operations.at(-1)?.status).toBe("failed");
    fixture.decide.mockResolvedValue({
      task: { id: "task-1" },
      workspace: { baseCheckoutPath: "/repo" },
      workflowStep: {
        kind: "wait",
        preconditionFingerprint: { digest: fingerprint("after-durable-resolution") },
      },
    } as TaskRouteDecision);
    await expect(fixture.run()).resolves.toMatchObject({ replay: true });
    expect(fixture.cas).toHaveBeenCalledOnce();
    expect(fixture.readQueue().entries[0]).not.toHaveProperty("claim_token");
    await expect(fixture.run()).resolves.toMatchObject({ replay: true });
    expect(fixture.cas).toHaveBeenCalledOnce();
    expect(recovery.writeQueue).toHaveBeenCalledTimes(2);
  });

  it("never releases the claim on a lost journal CAS", async () => {
    fixture.cas.mockResolvedValue(false);
    await expect(fixture.run()).rejects.toThrow("journal changed");
    expect(recovery.writeQueue).not.toHaveBeenCalled();
  });

  it.each(["digest", "claim", "host", "empty", "root", "duplicate", "time", "journal", "subset"])(
    "rejects invalid receipt %s before any durable outcome",
    async (change) => {
      const step = fixture.receipt.steps[0]!;
      if (change === "claim") fixture.receipt.queue_after.entries[0]!.claim_token = "foreign";
      if (change === "host") {
        fixture.receipt.queue_after.entries[0]!.claimed_by = "foreign@host";
        fixture.readQueue().entries[0]!.claimed_by = "foreign@host";
      }
      if (change === "empty") step.owned_history = [];
      if (change === "root") step.root_start_identity = { ...step.root_start_identity, pid: 99 };
      if (change === "duplicate") fixture.receipt.steps.push(structuredClone(step));
      if (change === "time") step.finished_at = step.started_at;
      if (change === "journal")
        fixture.receipt.journal_after = { ...fixture.original, digest: fingerprint("foreign") };
      if (change === "subset") step.owned_history = step.owned_history.slice(1);
      if (change === "digest") fixture.resolution.evidence[0]!.digest = fingerprint("tampered");
      await fixture.save(change !== "digest");
      await expect(fixture.run()).rejects.toThrow();
      expect(fixture.cas).not.toHaveBeenCalled();
      expect(recovery.writeQueue).not.toHaveBeenCalled();
    },
  );

  it.each(["live", "EPERM", "EIO"])("rejects %s worker observations", async (state) => {
    kill.mockImplementation(() => {
      if (state === "live") return true;
      throw Object.assign(new Error(state), { code: state });
    });
    await expect(fixture.run()).rejects.toThrow();
    expect(fixture.cas).not.toHaveBeenCalled();
  });

  it.each(["provider", "merged", "head", "canonical", "fingerprint", "busy"])(
    "rejects changed or unavailable %s",
    async (change) => {
      if (change === "provider") recovery.provider.mockResolvedValue({ state: "unavailable" });
      if (change === "merged")
        recovery.provider.mockResolvedValue({
          state: "found",
          pr: {
            ...fixture.provider.pr,
            status: "MERGED",
            mergedAt: "2026-09-21",
          },
        });
      if (change === "head") recovery.rev.mockResolvedValue("c".repeat(40));
      if (change === "canonical")
        recovery.kernel.mockReturnValue({
          kind: "canonical",
          record: {
            ...fixture.canonical,
            digest: fingerprint("changed"),
          },
        });
      if (change === "fingerprint")
        fixture.decide.mockResolvedValue({
          task: { id: "task-1" },
          workspace: { baseCheckoutPath: "/repo" },
          workflowStep: { preconditionFingerprint: { digest: fingerprint("changed") } },
        });
      if (change === "busy") recovery.lease.mockResolvedValue(null);
      await expect(fixture.run()).rejects.toThrow();
      expect(fixture.cas).not.toHaveBeenCalled();
    },
  );
  it("rejects a foreign active lane without releasing either entry", async () => {
    fixture.readQueue().entries.push({ ...fixture.entry, task_id: "foreign" });
    await expect(fixture.run()).rejects.toThrow("active owner");
    expect(fixture.cas).not.toHaveBeenCalled();
    expect(recovery.writeQueue).not.toHaveBeenCalled();
  });
  it("requires an actual retained receipt, not just an operator stopped assertion", async () => {
    fixture.resolution.execution_receipt_ref = "missing:receipt";
    await fixture.save();
    await expect(fixture.run()).rejects.toThrow("digest-bound execution receipt");
    expect(fixture.cas).not.toHaveBeenCalled();
  });
  it("rejects a still-leased worker even when its process has stopped", async () => {
    const future = new Date(Date.now() + 60_000).toISOString();
    fixture.readQueue().entries[0]!.lease_expires_at = future;
    fixture.receipt.queue_after.entries[0]!.lease_expires_at = future;
    await fixture.save();
    await expect(fixture.run()).rejects.toThrow("expired, local, abandoned");
    expect(fixture.cas).not.toHaveBeenCalled();
  });
  it("preserves legacy semantic-rework admission rather than canonicalizing active Tasks", async () => {
    const { claimed_by, claimed_at, lease_expires_at, claim_token, active_operation, ...released } =
      fixture.entry;
    void claimed_by;
    void claimed_at;
    void lease_expires_at;
    void claim_token;
    void active_operation;
    fixture.readQueue().entries[0] = { ...released, status: "queued" };
    fixture.decide.mockResolvedValue({
      task: { id: "task-1" },
      workspace: { baseCheckoutPath: "/repo" },
      workflowStep: {
        kind: "agent_episode",
        episode: { purpose: "implementation_rework" },
        preconditionFingerprint: { digest: fixture.resolution.current_state_fingerprint },
      },
    } as TaskRouteDecision);
    await expect(fixture.run(false)).resolves.toMatchObject({ verdict: "not_applied" });
    expect(recovery.writeQueue).not.toHaveBeenCalled();
    expect(fixture.readJournal().cursor.phase).toBe("ready");
  });
});
