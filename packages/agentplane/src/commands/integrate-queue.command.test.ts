import { beforeEach, describe, expect, it, vi } from "vitest";

import { CliError } from "../shared/errors.js";
import type * as QueueStateModule from "./pr/integrate/queue-state.js";

const mocks = vi.hoisted(() => ({
  inMutex: false,
  readIntegrationQueue: vi.fn(),
  writeIntegrationQueue: vi.fn(),
  claimNextQueuedEntry: vi.fn(),
  markQueueEntry: vi.fn(),
  rejectIfQueuedEntryIsStale: vi.fn(),
  rejectIfQueuedEntryPublicationIsStale: vi.fn(),
  prepareIntegrate: vi.fn(),
  gitRevParse: vi.fn(),
  upsertQueuedEntry: vi.fn(),
  reserveQueueEntryForIntegration: vi.fn(),
  queueState: null as unknown,
  cmdIntegrate: vi.fn(),
  waitForHostedChecks: vi.fn(),
  output: {
    json: vi.fn(),
    line: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("./pr/integrate/queue-state.js", () => ({
  readIntegrationQueue: mocks.readIntegrationQueue,
  writeIntegrationQueue: mocks.writeIntegrationQueue,
  claimNextQueuedEntry: mocks.claimNextQueuedEntry,
  markQueueEntry: mocks.markQueueEntry,
  upsertQueuedEntry: mocks.upsertQueuedEntry,
  reserveQueueEntryForIntegration: mocks.reserveQueueEntryForIntegration,
  withIntegrationQueueMutex: async (_gitRoot: string, run: () => Promise<unknown>) => {
    expect(mocks.inMutex).toBe(false);
    mocks.inMutex = true;
    try {
      return await run();
    } finally {
      mocks.inMutex = false;
    }
  },
}));

vi.mock("./integrate-queue-lane.js", () => ({
  defaultIntegrationQueueWorker: () => "worker",
  findActiveIntegrationLane: vi.fn(),
  hasQueuedIntegrationEntries: vi.fn(),
  normalizeTerminalQueueEntries: vi.fn(),
  recoverStaleActiveLane: vi.fn(),
  rejectIfQueuedEntryIsStale: mocks.rejectIfQueuedEntryIsStale,
  rejectIfQueuedEntryPublicationIsStale: mocks.rejectIfQueuedEntryPublicationIsStale,
  renderIntegrationQueueEntry: vi.fn(),
}));

vi.mock("./pr/integrate/internal/prepare.js", () => ({
  prepareIntegrate: mocks.prepareIntegrate,
}));
vi.mock("./pr/integrate/cmd.js", () => ({ cmdIntegrate: mocks.cmdIntegrate }));
vi.mock("./integrate-queue-doctor-command.js", () => ({
  runIntegrationQueueDoctor: vi.fn(),
}));
vi.mock("./pr/hosted-checks.js", () => ({
  waitForHostedChecks: mocks.waitForHostedChecks,
}));
vi.mock("./shared/git-ops.js", () => ({ gitRevParse: mocks.gitRevParse }));
vi.mock("../cli/output.js", () => ({
  createCliEmitter: () => mocks.output,
  emptyStateMessage: (value: string) => `no ${value}`,
}));

import {
  makeRunIntegrateQueueClaimHandler,
  makeRunIntegrateQueueEnqueueHandler,
  makeRunIntegrateQueueRunNextHandler,
} from "./integrate-queue.command.js";

const entry = {
  task_id: "T-1",
  branch: "task/T-1/work",
  base: "main",
  head_sha: "head",
  base_sha: "base",
  changed_paths: ["src/work.ts"],
  pr_number: 101,
  pr_url: "https://github.com/example/repo/pull/101",
  priority: 0,
  status: "claimed" as const,
  claimed_by: "worker",
  claimed_at: "2026-01-01T00:00:00.000Z",
  lease_expires_at: "2099-01-01T00:30:00.000Z",
  enqueued_at: "2026-01-01T00:00:00.000Z",
  updated_at: "2026-01-01T00:00:00.000Z",
};

function commandContext() {
  return Promise.resolve({
    resolvedProject: { gitRoot: "/repo" },
  } as never);
}

function runNextParsed(overrides: Record<string, unknown> = {}) {
  return {
    worker: null,
    leaseMs: null,
    wait: false,
    pollIntervalMs: null,
    timeoutMs: null,
    hosted: false,
    hostedPollIntervalMs: 1,
    hostedTimeoutMs: 1,
    stablePolls: 1,
    requiredChecks: [],
    runVerify: false,
    dryRun: false,
    quiet: true,
    drain: false,
    ...overrides,
  } as never;
}

describe("integrate queue claim publication guard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.inMutex = false;
    const state = { schema_version: 1 as const, entries: [entry] };
    mocks.queueState = state;
    mocks.readIntegrationQueue.mockImplementation(() => Promise.resolve(mocks.queueState));
    mocks.writeIntegrationQueue.mockImplementation((_root: string, nextState: unknown) => {
      mocks.queueState = nextState;
      return Promise.resolve();
    });
    mocks.claimNextQueuedEntry.mockReturnValue({ state, entry });
    mocks.rejectIfQueuedEntryIsStale.mockResolvedValue(null);
    mocks.rejectIfQueuedEntryPublicationIsStale.mockImplementation(() => {
      expect(mocks.inMutex).toBe(false);
      return Promise.resolve(null);
    });
    mocks.cmdIntegrate.mockResolvedValue(0);
    mocks.waitForHostedChecks.mockResolvedValue(undefined);
    mocks.markQueueEntry.mockImplementation(
      (queue: unknown, _taskId: string, status: string, reason?: string) => ({
        ...(queue as object),
        entries: ((queue as { entries?: (typeof entry)[] }).entries ?? [entry]).map((current) => {
          if (current.task_id !== entry.task_id) return current;
          const { active_operation: _activeOperation, ...withoutActiveOperation } = current as {
            active_operation?: string;
          } & typeof current;
          return { ...withoutActiveOperation, status, reason };
        }),
      }),
    );
    mocks.reserveQueueEntryForIntegration.mockImplementation((queue: unknown) => ({
      ...(queue as object),
      entries: ((queue as { entries?: (typeof entry)[] }).entries ?? [entry]).map((current) =>
        current.task_id === entry.task_id
          ? {
              ...current,
              status: "handoff",
              active_operation: "integration",
              reason: "integration in progress",
            }
          : current,
      ),
    }));
    mocks.prepareIntegrate.mockResolvedValue({
      resolved: { gitRoot: "/repo" },
      task: { id: "T-1" },
      branch: entry.branch,
      base: entry.base,
      branchHeadSha: entry.head_sha,
      changedPaths: entry.changed_paths,
      hostedPr: { prNumber: entry.pr_number, prUrl: entry.pr_url },
    });
    mocks.gitRevParse.mockResolvedValue(entry.base_sha);
  });

  it("checks the upstream and hosted PR head after releasing the queue mutex", async () => {
    const handler = makeRunIntegrateQueueClaimHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        json: true,
      }),
    ).resolves.toBe(0);

    expect(mocks.rejectIfQueuedEntryIsStale).toHaveBeenCalledTimes(2);
    expect(mocks.rejectIfQueuedEntryPublicationIsStale).toHaveBeenCalledOnce();
    expect(mocks.writeIntegrationQueue).toHaveBeenCalledOnce();
  });

  it("reacquires the mutex briefly and records typed rework on missing upstream", async () => {
    mocks.rejectIfQueuedEntryPublicationIsStale.mockImplementation(() => {
      expect(mocks.inMutex).toBe(false);
      return Promise.resolve({
        ...entry,
        status: "rework",
        reason: "queued branch upstream is missing",
      });
    });
    const handler = makeRunIntegrateQueueClaimHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        json: false,
      }),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      message: "queued branch upstream is missing",
    });

    expect(mocks.markQueueEntry).toHaveBeenCalledWith(
      expect.anything(),
      "T-1",
      "rework",
      "queued branch upstream is missing",
    );
    expect(mocks.inMutex).toBe(false);
  });

  it("records provider unavailability as handoff without semantic rework", async () => {
    const providerError = new CliError({
      code: "E_HANDOFF",
      message: "queued provider validation is temporarily unavailable",
      context: { reason_code: "integration_queue_provider_unavailable" },
    });
    mocks.rejectIfQueuedEntryPublicationIsStale.mockRejectedValue(providerError);
    const handler = makeRunIntegrateQueueClaimHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        json: false,
      }),
    ).rejects.toBe(providerError);

    expect(mocks.markQueueEntry).toHaveBeenCalledWith(
      expect.anything(),
      "T-1",
      "handoff",
      providerError.message,
    );
    expect(mocks.markQueueEntry).not.toHaveBeenCalledWith(
      expect.anything(),
      "T-1",
      "rework",
      expect.anything(),
    );
    expect(mocks.writeIntegrationQueue).toHaveBeenCalledTimes(2);
    expect(mocks.writeIntegrationQueue).toHaveBeenLastCalledWith(
      "/repo",
      expect.objectContaining({
        entries: [expect.objectContaining({ status: "handoff" })],
      }),
    );
  });

  it("fails with a handoff when the claim changes during provider lookup", async () => {
    const initialState = { schema_version: 1 as const, entries: [entry] };
    const replacedState = {
      schema_version: 1 as const,
      entries: [{ ...entry, claimed_by: "other-worker", claimed_at: "2026-01-02T00:00:00.000Z" }],
    };
    mocks.readIntegrationQueue
      .mockResolvedValueOnce(initialState)
      .mockResolvedValueOnce(replacedState);
    mocks.claimNextQueuedEntry.mockReturnValue({ state: initialState, entry });
    const handler = makeRunIntegrateQueueClaimHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        json: false,
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
    });

    expect(mocks.rejectIfQueuedEntryPublicationIsStale).toHaveBeenCalledOnce();
    expect(mocks.markQueueEntry).not.toHaveBeenCalled();
    expect(mocks.inMutex).toBe(false);
  });

  it("revalidates the exact claim under mutex before run-next integrates", async () => {
    mocks.cmdIntegrate.mockImplementation(() => {
      expect(mocks.inMutex).toBe(true);
      expect(mocks.readIntegrationQueue).toHaveBeenCalledTimes(4);
      return Promise.resolve(0);
    });
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        wait: false,
        pollIntervalMs: null,
        timeoutMs: null,
        hosted: false,
        hostedPollIntervalMs: 1,
        hostedTimeoutMs: 1,
        stablePolls: 1,
        requiredChecks: [],
        runVerify: false,
        dryRun: false,
        quiet: true,
        drain: false,
      }),
    ).resolves.toBe(0);

    expect(mocks.rejectIfQueuedEntryPublicationIsStale).toHaveBeenCalledTimes(2);
    expect(mocks.cmdIntegrate).toHaveBeenCalledWith(
      expect.objectContaining({
        taskId: "T-1",
        branch: "task/T-1/work",
        base: "main",
        expectedHeadSha: "head",
        expectedBaseSha: "base",
      }),
    );
    expect(mocks.readIntegrationQueue).toHaveBeenCalledTimes(4);
  });

  it("does not let run-next integrate after another worker replaces the claim", async () => {
    const initialState = { schema_version: 1 as const, entries: [entry] };
    const replacedState = {
      schema_version: 1 as const,
      entries: [
        { ...entry, claimed_by: "other-worker", lease_expires_at: "2099-01-02T00:30:00.000Z" },
      ],
    };
    mocks.readIntegrationQueue
      .mockResolvedValueOnce(initialState)
      .mockResolvedValueOnce(replacedState);
    mocks.claimNextQueuedEntry.mockReturnValue({ state: initialState, entry });
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        wait: false,
        pollIntervalMs: null,
        timeoutMs: null,
        hosted: false,
        hostedPollIntervalMs: 1,
        hostedTimeoutMs: 1,
        stablePolls: 1,
        requiredChecks: [],
        runVerify: false,
        dryRun: false,
        quiet: true,
        drain: false,
      }),
    ).rejects.toMatchObject({ code: "E_HANDOFF" });

    expect(mocks.cmdIntegrate).not.toHaveBeenCalled();
  });

  it("revalidates ownership after hosted checks before calling integrate", async () => {
    const initialState = { schema_version: 1 as const, entries: [entry] };
    const replacedState = {
      schema_version: 1 as const,
      entries: [
        {
          ...entry,
          status: "handoff" as const,
          active_operation: "integration" as const,
          claimed_by: "other-worker",
          claimed_at: "2026-01-02T00:00:00.000Z",
          lease_expires_at: "2099-01-02T00:30:00.000Z",
          claim_token: "other-claim",
        },
      ],
    };
    mocks.queueState = initialState;
    mocks.claimNextQueuedEntry.mockReturnValue({ state: initialState, entry });
    mocks.waitForHostedChecks.mockImplementation(() => {
      mocks.queueState = replacedState;
      return Promise.resolve();
    });
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        wait: false,
        pollIntervalMs: null,
        timeoutMs: null,
        hosted: true,
        hostedPollIntervalMs: 1,
        hostedTimeoutMs: 1,
        stablePolls: 1,
        requiredChecks: [],
        runVerify: false,
        dryRun: false,
        quiet: true,
        drain: false,
      }),
    ).rejects.toMatchObject({ code: "E_HANDOFF" });

    expect(mocks.waitForHostedChecks).toHaveBeenCalledOnce();
    expect(mocks.cmdIntegrate).not.toHaveBeenCalled();
    expect(mocks.markQueueEntry).not.toHaveBeenCalled();
  });

  it("passes queued H1 into integrate and rejects synchronized H1 to H2 movement", async () => {
    mocks.waitForHostedChecks.mockResolvedValue(undefined);
    mocks.cmdIntegrate.mockImplementation(
      (opts: { expectedHeadSha?: string; expectedBaseSha?: string }) => {
        expect(opts.expectedHeadSha).toBe("head");
        expect(opts.expectedBaseSha).toBe("base");
        return Promise.reject(
          new CliError({
            code: "E_VALIDATION",
            message: "Task branch head changed after queue reservation: queued=head current=head-2",
            context: { reason_code: "integration_queue_head_changed" },
          }),
        );
      },
    );
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, runNextParsed({ hosted: true })),
    ).rejects.toMatchObject({
      code: "E_VALIDATION",
      context: { reason_code: "integration_queue_head_changed" },
    });

    const queueEntry = (mocks.queueState as { entries: { status: string; reason?: string }[] })
      .entries[0];
    expect(queueEntry?.status).toBe("handoff");
    expect(queueEntry?.reason).toContain("queued=head current=head-2");
  });

  it("preserves late provider unavailability as handoff with the exact reason", async () => {
    const providerError = new CliError({
      code: "E_NETWORK",
      message: "GitHub PR state is unavailable for task/T-1/work: authentication required",
      context: { reason_code: "github_pr_state_unavailable" },
    });
    mocks.cmdIntegrate.mockRejectedValue(providerError);
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, runNextParsed()),
    ).rejects.toBe(providerError);

    expect(
      (mocks.queueState as { entries: { status: string; reason?: string }[] }).entries[0],
    ).toMatchObject({
      status: "handoff",
      reason: providerError.message,
    });
    expect(
      (mocks.queueState as { entries: { active_operation?: string }[] }).entries[0]
        ?.active_operation,
    ).toBeUndefined();
  });

  it("keeps a non-expiring reservation active across lease expiry and records success", async () => {
    const second = {
      ...entry,
      task_id: "T-2",
      branch: "task/T-2/work",
      status: "queued" as const,
      claimed_by: undefined,
      claimed_at: undefined,
      lease_expires_at: undefined,
    };
    const initialState = { schema_version: 1 as const, entries: [entry, second] };
    mocks.queueState = initialState;
    mocks.claimNextQueuedEntry.mockReturnValue({ state: initialState, entry });
    const actualQueueState = await vi.importActual<typeof QueueStateModule>(
      "./pr/integrate/queue-state.js",
    );
    mocks.cmdIntegrate.mockImplementation(() => {
      const overlapping = actualQueueState.claimNextQueuedEntry(mocks.queueState as never, {
        worker: "second-worker",
        clock: { now: () => new Date("2100-01-01T00:00:00.000Z") },
      });
      expect(overlapping.entry).toBeNull();
      expect(overlapping.state.entries[0]).toMatchObject({
        status: "handoff",
        active_operation: "integration",
      });
      return Promise.resolve(0);
    });
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, runNextParsed()),
    ).resolves.toBe(0);

    expect(
      (mocks.queueState as { entries: { task_id: string; status: string }[] }).entries,
    ).toContainEqual(expect.objectContaining({ task_id: "T-1", status: "done" }));
  });

  it("rejects re-enqueue while the same task owns an active reservation", async () => {
    const actualQueueState = await vi.importActual<typeof QueueStateModule>(
      "./pr/integrate/queue-state.js",
    );
    mocks.upsertQueuedEntry.mockImplementation(actualQueueState.upsertQueuedEntry);
    mocks.queueState = {
      schema_version: 1,
      entries: [{ ...entry, status: "handoff", active_operation: "integration" }],
    };
    const handler = makeRunIntegrateQueueEnqueueHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        taskId: "T-1",
        branch: null,
        base: null,
        priority: 0,
      }),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "integration_queue_entry_active" },
    });
  });

  it("rejects enqueue when H1 moves before the queue write", async () => {
    const actualQueueState = await vi.importActual<typeof QueueStateModule>(
      "./pr/integrate/queue-state.js",
    );
    mocks.upsertQueuedEntry.mockImplementation(actualQueueState.upsertQueuedEntry);
    mocks.queueState = { schema_version: 1, entries: [] };
    mocks.rejectIfQueuedEntryIsStale.mockResolvedValue({
      ...entry,
      status: "rework",
      reason: "branch head changed after enqueue: queued=head current=head-2",
    });
    const handler = makeRunIntegrateQueueEnqueueHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        taskId: "T-1",
        branch: null,
        base: null,
        priority: 0,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect((mocks.queueState as { entries: { status: string }[] }).entries[0]?.status).toBe(
      "rework",
    );
  });

  it("rechecks local H1 after provider lookup before returning a claim", async () => {
    mocks.rejectIfQueuedEntryIsStale.mockResolvedValueOnce(null).mockResolvedValueOnce({
      ...entry,
      status: "rework",
      reason: "branch head changed during provider lookup: queued=head current=head-2",
    });
    const handler = makeRunIntegrateQueueClaimHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, {
        worker: null,
        leaseMs: null,
        json: false,
      }),
    ).rejects.toMatchObject({ code: "E_VALIDATION" });
    expect((mocks.queueState as { entries: { status: string }[] }).entries[0]?.status).toBe(
      "rework",
    );
  });

  it("keeps a possible post-merge failure in handoff instead of retryable rework", async () => {
    const postMergeError = new Error("finalize failed after merge commit was created");
    mocks.cmdIntegrate.mockRejectedValue(postMergeError);
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, runNextParsed()),
    ).rejects.toBe(postMergeError);

    expect(
      (mocks.queueState as { entries: { status: string; reason?: string }[] }).entries[0],
    ).toMatchObject({
      status: "handoff",
      reason: postMergeError.message,
    });
  });

  it("leaves a reconciliation handoff when terminal done persistence fails", async () => {
    mocks.writeIntegrationQueue.mockImplementation((_root: string, nextState: unknown) => {
      const status = (nextState as { entries?: { status?: string }[] }).entries?.[0]?.status;
      if (status === "done") return Promise.reject(new Error("terminal write failed"));
      expect(mocks.inMutex).toBe(true);
      mocks.queueState = nextState;
      return Promise.resolve();
    });
    const handler = makeRunIntegrateQueueRunNextHandler(commandContext);

    await expect(
      handler({ cwd: "/repo", rootOverride: null } as never, runNextParsed()),
    ).rejects.toMatchObject({
      code: "E_HANDOFF",
      context: { reason_code: "integration_queue_outcome_requires_reconciliation" },
    });

    const queueEntry = (mocks.queueState as { entries: { status: string; reason?: string }[] })
      .entries[0];
    expect(queueEntry?.status).toBe("handoff");
    expect(queueEntry?.reason).toContain("terminal queue state could not be persisted");
  });
});
