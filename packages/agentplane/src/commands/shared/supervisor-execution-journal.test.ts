import { mkdir, readFile, rename, rmdir } from "node:fs/promises";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type * as NativeFs from "node:fs/promises";
import type * as CoreFs from "@agentplaneorg/core/fs";
import type * as NativeLease from "./supervisor-execution-lease.js";
import {
  buildStateFingerprint,
  completeSupervisorExecutionEpisode,
  createSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
  stopSupervisorExecutionEpisode,
  validateSupervisorExecutionEpisodeJournal,
  type SupervisorExecutionEpisodeJournal as Journal,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";
import { CliError } from "../../shared/errors.js";
import type { TaskRouteDecision } from "./route-decision-types.js";
import type { WorkflowOperation } from "./workflow-step.js";
import { WORKFLOW_OPERATION_REGISTRY } from "./workflow-step.js";
import { projectWorkflowOperationArgv } from "./workflow-operation-projection.js";
import type { WorkflowSupervisorOperationResult } from "./workflow-supervisor.js";
import {
  resolveSupervisorExecutionEpisodePath,
  supervisePersistedWorkflowEpisode,
} from "./supervisor-execution-episode.js";
import {
  createSupervisorEpisodeStore,
  publishGitLabJournalTransition,
} from "./supervisor-execution-journal.js";

const mocks = vi.hoisted(() => ({
  atomicWrite: vi.fn<typeof CoreFs.atomicWriteFile>(),
  acquire: vi.fn<typeof NativeLease.tryAcquireSupervisorExecutionLease>(),
  readFile: vi.fn<typeof NativeFs.readFile>(),
}));
vi.mock("node:fs/promises", async (original) => {
  const actual = await original<typeof NativeFs>();
  mocks.readFile.mockImplementation(actual.readFile);
  return { ...actual, readFile: mocks.readFile };
});
vi.mock("@agentplaneorg/core/fs", async (original) => {
  const actual = await original<typeof CoreFs>();
  return { ...actual, atomicWriteFile: mocks.atomicWrite };
});
vi.mock("./supervisor-execution-lease.js", async (original) => {
  const actual = await original<typeof NativeLease>();
  return { ...actual, tryAcquireSupervisorExecutionLease: mocks.acquire };
});

let actualRead: typeof NativeFs.readFile;
let actualAtomic: typeof CoreFs.atomicWriteFile;
let actualAcquire: typeof NativeLease.tryAcquireSupervisorExecutionLease;
beforeEach(async () => {
  const fs = await vi.importActual<typeof NativeFs>("node:fs/promises");
  const core = await vi.importActual<typeof CoreFs>("@agentplaneorg/core/fs");
  const lease = await vi.importActual<typeof NativeLease>("./supervisor-execution-lease.js");
  actualRead = fs.readFile;
  actualAtomic = core.atomicWriteFile;
  actualAcquire = lease.tryAcquireSupervisorExecutionLease;
  mocks.readFile.mockReset().mockImplementation(actualRead);
  mocks.atomicWrite.mockReset().mockImplementation(actualAtomic);
  mocks.acquire.mockReset().mockImplementation(actualAcquire);
});

const noRestore = () => Promise.resolve();

const budget = {
  max_episodes: Number.MAX_SAFE_INTEGER,
  max_agent_runs: null,
  max_input_tokens: null,
  max_output_tokens: null,
  max_total_tokens: null,
  max_wall_time_ms: null,
  max_changed_files: null,
  max_diff_lines: null,
  max_no_progress_episodes: null,
};
type Fault = "before" | "after" | "changed" | "malformed" | "tampered" | "unreadable";
const faults: Fault[] = ["before", "after", "changed", "malformed", "tampered", "unreadable"];

async function fixture(provider: "gitlab" | "github" = "gitlab") {
  const root = await mkGitRepoRoot();
  const taskId = "202610251417-RECVR1";
  const component = { state: "present", source: "journal-fixture", value: {} } as const;
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: 1,
    git_head: "a".repeat(40),
    worktree: root,
    components: Object.fromEntries(
      [
        "task",
        "git",
        "backend_projection",
        "policy",
        "blueprint",
        "knowledge",
        "provider",
        "authority",
      ].map((key) => [key, component]),
    ) as Parameters<typeof buildStateFingerprint>[0]["components"],
  });
  const operation: Extract<WorkflowOperation, { id: "provider.pr.update_branch" }> = {
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params: {
      taskId,
      identity: {
        provider,
        hostname: "gitlab.example.test",
        remote: "origin",
        sourceProject: "group/repo",
        targetProject: "group/repo",
        sourceUrl: "https://gitlab.example.test/group/repo.git",
        targetUrl: "https://gitlab.example.test/group/repo.git",
      },
      prNumber: 42,
      branch: `task/${taskId}/fixture`,
      baseBranch: "main",
      expectedHeadSha: "a".repeat(40),
      expectedBaseSha: "b".repeat(40),
    },
    preconditionFingerprint: fingerprint,
    authorityRef: `route:${taskId}:${fingerprint.digest}`,
    idempotencyKey: `provider.pr.update_branch:${taskId}:${fingerprint.digest}:fixture`,
    expectedPostconditions:
      WORKFLOW_OPERATION_REGISTRY["provider.pr.update_branch"].expectedPostconditions,
    triggersGitHooks: true,
  };
  const decision = {
    task: {
      id: taskId,
      owner: "CODER",
      title: "Journal boundary",
      status: "DOING",
      planApproval: "approved",
      verification: "pending",
      commit: null,
    },
    workflowMode: "branch_pr",
    workspace: {
      baseBranch: "main",
      baseCheckoutPath: root,
      taskWorktreePath: root,
      prBranch: operation.params.branch,
    },
    workflowStep: {
      id: operation.id,
      kind: "cli_operation",
      summary: "Update branch",
      preconditionFingerprint: fingerprint,
      operation,
      execution: { actionKind: "local_command" },
    },
    executionPacket: {
      actionKind: "local_command",
      safeToMutate: true,
      mustRunFrom: root,
      exactArgv: projectWorkflowOperationArgv(operation),
    },
  } as TaskRouteDecision;
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  return {
    root,
    operation,
    decision,
    journalPath,
    store: createSupervisorEpisodeStore(journalPath),
  };
}
type Fixture = Awaited<ReturnType<typeof fixture>>;

function success(operation: WorkflowOperation): WorkflowSupervisorOperationResult {
  return {
    status: "succeeded",
    observed_postconditions: [
      ...operation.expectedPostconditions
        .map((item) => item.id)
        .filter((id) => id !== "route_state_recomputed"),
      `provider_update_head:${"c".repeat(40)}`,
    ],
    detail: "Observed exact provider update",
    exit_code: 0,
  };
}
function run(
  f: Fixture,
  execute: Parameters<typeof supervisePersistedWorkflowEpisode>[0]["execute"] = vi.fn(() =>
    Promise.resolve(success(f.operation)),
  ),
  decision = f.decision,
) {
  return supervisePersistedWorkflowEpisode({
    decision,
    git_root: f.root,
    task_revision: 1,
    execute,
    refresh: () => Promise.resolve(decision),
  });
}
async function journal(f: Fixture) {
  return validateSupervisorExecutionEpisodeJournal(await f.store.read());
}

async function lastStatus(f: Fixture) {
  const retained = await journal(f);
  return retained.operations.at(-1)?.status;
}

function started(f: Fixture, recovery: boolean | "adopted" = true, operation = f.operation) {
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: f.decision.task.id,
    task_revision: 1,
    state_fingerprint_digest: operation.preconditionFingerprint.digest,
    budget,
  });
  const result = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: operation,
    ...(recovery
      ? {
          recovery_context: {
            schema_version: 1,
            kind:
              recovery === "adopted" ? "adopted_provider_effect" : "gitlab_provider_update_branch",
            task_id: f.decision.task.id,
          },
        }
      : {}),
    precondition_fingerprint_digest: operation.preconditionFingerprint.digest,
    authority_ref: "workflow-operation:provider.pr.update_branch",
    authority_digest: operation.preconditionFingerprint.digest,
    effect_ref: operation.idempotencyKey,
  });
  if (result.status !== "started") throw new Error("Fixture intent was not admitted");
  return { created, result };
}
function completed(f: Fixture, recovery: boolean | "adopted" = true, operation = f.operation) {
  const { result } = started(f, recovery, operation);
  return completeSupervisorExecutionEpisode({
    journal: result.journal,
    operation_key: result.operation_key,
    result: success(operation),
  });
}
function nextRoute(f: Fixture) {
  const operation: Extract<WorkflowOperation, { id: "integration.enqueue" }> = {
    id: "integration.enqueue",
    type: "integration_enqueue",
    params: { taskId: f.decision.task.id, branch: f.operation.params.branch },
    preconditionFingerprint: f.operation.preconditionFingerprint,
    authorityRef: "route:next",
    idempotencyKey: "integration.enqueue:next",
    expectedPostconditions: [],
    triggersGitHooks: false,
  };
  return {
    ...f.decision,
    prFlow: undefined,
    workflowStep: { ...f.decision.workflowStep, id: operation.id, operation },
    executionPacket: {
      ...f.decision.executionPacket,
      exactArgv: projectWorkflowOperationArgv(operation),
    },
  } as TaskRouteDecision;
}

async function corrupt(f: Fixture, mode: Fault) {
  const before = await readFile(f.journalPath, "utf8");
  let restore = noRestore;
  if (mode === "unreadable") {
    const backup = `${f.journalPath}.owned-beforeimage`;
    await rename(f.journalPath, backup);
    let directory = false;
    restore = async () => {
      if (directory) await rmdir(f.journalPath);
      await rename(backup, f.journalPath);
    };
    try {
      await mkdir(f.journalPath);
      directory = true;
    } catch (error) {
      await restore();
      throw error;
    }
    return { bytes: before, restore };
  }
  let bytes: string;
  if (mode === "malformed") bytes = "{injected invalid journal";
  else if (mode === "tampered") {
    const value = JSON.parse(before) as Journal;
    bytes = JSON.stringify({ ...value, task_revision: (value.task_revision ?? 0) + 1 });
  } else
    bytes = `${JSON.stringify(stopSupervisorExecutionEpisode({ journal: validateSupervisorExecutionEpisodeJournal(JSON.parse(before)), reason: "human_review" }), null, 2)}\n`;
  // Inject only an owned fixture's storage result, without reacquiring its held writer lock.
  await actualAtomic(f.journalPath, bytes, "utf8");
  return { bytes, restore };
}

function inject(f: Fixture, predicate: (value: Journal) => boolean, mode: Fault) {
  const fault = { injected: false, bytes: "", restore: noRestore };
  mocks.atomicWrite.mockImplementation(async (...args) => {
    if (
      args[0] === f.journalPath &&
      !fault.injected &&
      predicate(JSON.parse(String(args[1])) as Journal)
    ) {
      fault.injected = true;
      if (mode === "after") await actualAtomic(...args);
      else if (mode !== "before") {
        const changed = await corrupt(f, mode);
        fault.bytes = changed.bytes;
        fault.restore = changed.restore;
      }
      throw new Error(`injected ${mode} publication failure`);
    }
    await actualAtomic(...args);
  });
  return fault;
}

describe("GitLab journal publication and dispatch ownership", () => {
  it.each(["dispatch", "state"] as const)(
    "a retained target afterimage grants only state acknowledgment: %s",
    async (phase) => {
      const f = await fixture();
      const { created, result } = started(f);
      await f.store.write(result.journal);
      mocks.atomicWrite.mockClear();
      const publish = publishGitLabJournalTransition({
        store: f.store,
        before: created,
        next: result.journal,
        phase,
      });
      if (phase === "dispatch") await expect(publish).rejects.toThrow("changed before transition");
      else await publish;
      expect(mocks.atomicWrite).not.toHaveBeenCalled();
      expect(await journal(f)).toEqual(result.journal);
    },
  );

  it.each(faults)("intent publication cannot dispatch after %s uncertainty", async (mode) => {
    const f = await fixture();
    const fault = inject(f, (value) => value.cursor.phase === "intent_recorded", mode);
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    try {
      await expect(run(f, execute)).rejects.toThrow("publication failure");
      expect(fault.injected).toBe(true);
      expect(execute).not.toHaveBeenCalled();
      await fault.restore();
      fault.restore = noRestore;
      if (fault.bytes) expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
      if (mode === "after") {
        const retained = await journal(f);
        expect(retained.operations.at(-1)?.recovery?.operation_identity).toEqual(f.operation);
        await run(f, execute);
        expect(execute).not.toHaveBeenCalled();
        expect(await journal(f)).toHaveProperty("operations.length", 1);
      }
    } finally {
      await fault.restore();
    }
  });

  it("a lost intent CAS preserves the winner and performs no dispatch", async () => {
    const f = await fixture();
    const { created, result } = started(f);
    const winner = stopSupervisorExecutionEpisode({ journal: created, reason: "human_review" });
    await f.store.write(winner);
    const bytes = await readFile(f.journalPath, "utf8");
    await expect(
      publishGitLabJournalTransition({
        store: f.store,
        before: created,
        next: result.journal,
        phase: "dispatch",
      }),
    ).rejects.toThrow("changed before transition");
    expect(await readFile(f.journalPath, "utf8")).toBe(bytes);
  });

  it.each(faults)("completion publication preserves exact outcome after %s", async (mode) => {
    const f = await fixture();
    const fault = inject(f, (value) => value.cursor.phase === "completed", mode);
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    try {
      const result = await run(f, execute);
      expect(fault.injected).toBe(true);
      expect(execute).toHaveBeenCalledOnce();
      await fault.restore();
      fault.restore = noRestore;
      if (fault.bytes) expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
      else if (mode === "after") expect(await lastStatus(f)).toBe("completed");
      else {
        expect(await journal(f)).toMatchObject({ stop: { reason: "effect_in_doubt" } });
        expect(await lastStatus(f)).toBe("intent");
      }
      if (mode !== "after") expect(result.execution.result?.status).toBe("failed");
      await run(f, execute).catch(() => undefined);
      expect(execute).toHaveBeenCalledOnce();
      if (fault.bytes && mode !== "unreadable")
        expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
    } finally {
      await fault.restore();
    }
  });

  it.each(["changed", "malformed", "tampered", "unreadable"] as const)(
    "typed retention uncertainty preserves %s durable state",
    async (mode) => {
      const f = await fixture();
      let changed: Awaited<ReturnType<typeof corrupt>> | undefined;
      const primary = new CliError({
        code: "E_RUNTIME",
        message: "original update uncertainty",
        context: { reason_code: "provider_update_effect_in_doubt" },
      });
      const execute = vi.fn(async () => {
        changed = await corrupt(f, mode);
        throw primary;
      });
      try {
        const result = await run(f, execute);
        expect(result.execution.result?.detail).toBe(primary.message);
        expect(changed).toBeDefined();
        await changed!.restore();
        changed!.restore = noRestore;
        expect(await readFile(f.journalPath, "utf8")).toBe(changed!.bytes);
        await run(f, execute).catch(() => undefined);
        expect(execute).toHaveBeenCalledOnce();
        if (mode !== "unreadable")
          expect(await readFile(f.journalPath, "utf8")).toBe(changed!.bytes);
      } finally {
        await changed?.restore();
      }
    },
  );

  it.each(["before", "after"] as const)(
    "typed stop publication loss %s retains the original intent",
    async (mode) => {
      const f = await fixture();
      const fault = inject(f, (value) => value.stop?.reason === "effect_in_doubt", mode);
      const execute = vi.fn(() =>
        Promise.reject(
          new CliError({
            code: "E_RUNTIME",
            message: "primary typed unknown",
            context: { reason_code: "provider_update_effect_in_doubt" },
          }),
        ),
      );
      const result = await run(f, execute);
      expect(fault.injected).toBe(true);
      expect(result.execution.result?.detail).toBe("primary typed unknown");
      expect(await lastStatus(f)).toBe("intent");
      await run(f, execute);
      expect(execute).toHaveBeenCalledOnce();
    },
  );

  it.each([false, true])("owns both cursor advance paths, restart=%s", async (restart) => {
    for (const mode of faults) {
      const f = await fixture();
      if (restart) await f.store.write(completed(f));
      const fault = inject(
        f,
        (value) =>
          value.cursor.phase === "ready" && value.operations.at(-1)?.status === "completed",
        mode,
      );
      const execute = vi.fn(() => Promise.resolve(success(f.operation)));
      const decision = restart ? nextRoute(f) : f.decision;
      try {
        const promise = run(f, execute, decision);
        if (restart && mode !== "after") await expect(promise).rejects.toThrow();
        else await promise;
        expect(fault.injected, mode).toBe(true);
        await fault.restore();
        fault.restore = noRestore;
        if (fault.bytes) expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
        else expect(await lastStatus(f)).toBe("completed");
        await run(f, execute, decision).catch(() => undefined);
        expect(execute).toHaveBeenCalledTimes(restart ? 0 : 1);
        if (fault.bytes && mode !== "unreadable")
          expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
      } finally {
        await fault.restore();
      }
    }
  });

  it.each(faults)("stale reopen is bound to the last durable state, fault=%s", async (mode) => {
    const f = await fixture();
    const old = { ...f.operation, idempotencyKey: `${f.operation.idempotencyKey}:old` };
    await f.store.write(
      stopSupervisorExecutionEpisode({ journal: completed(f, true, old), reason: "stale_state" }),
    );
    const fault = inject(
      f,
      (value) => value.cursor.phase === "ready" && value.operations.length === 1,
      mode,
    );
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    try {
      const promise = run(f, execute);
      if (mode === "after") await promise;
      else await expect(promise).rejects.toThrow();
      expect(fault.injected).toBe(true);
      await fault.restore();
      fault.restore = noRestore;
      if (fault.bytes) expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
      expect(execute).toHaveBeenCalledTimes(mode === "after" ? 1 : 0);
    } finally {
      await fault.restore();
    }
  });

  it.each(["throw", "not_applied"] as const)(
    "keeps pre-effect classification without overwriting concurrent state: %s",
    async (kind) => {
      for (const mode of [null, "changed", "malformed", "tampered", "unreadable"] as const) {
        const f = await fixture();
        let changed: Awaited<ReturnType<typeof corrupt>> | undefined;
        const execute = vi.fn(async () => {
          if (mode) changed = await corrupt(f, mode);
          if (kind === "throw") throw new Error("pre-effect rejection");
          return {
            status: "failed",
            observed_postconditions: [],
            detail: "not applied",
            exit_code: 1,
          } as WorkflowSupervisorOperationResult;
        });
        try {
          const result = await run(f, execute);
          expect(result.execution.result?.status).toBe("failed");
          if (changed) {
            await changed.restore();
            changed.restore = noRestore;
            expect(await readFile(f.journalPath, "utf8")).toBe(changed.bytes);
          } else {
            expect(await journal(f)).toMatchObject({ stop: { reason: "operation_failed" } });
            expect(await lastStatus(f)).toBe("failed");
          }
          expect(execute).toHaveBeenCalledOnce();
        } finally {
          await changed?.restore();
        }
      }
    },
  );

  it("does not invent restart identity for an old update record", async () => {
    const f = await fixture();
    await f.store.write(completed(f, false));
    const bytes = await readFile(f.journalPath, "utf8");
    mocks.atomicWrite.mockClear();
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    await expect(run(f, execute, nextRoute(f))).rejects.toThrow("no proven identity");
    expect(await readFile(f.journalPath, "utf8")).toBe(bytes);
    expect(mocks.atomicWrite).not.toHaveBeenCalled();
    expect(execute).not.toHaveBeenCalled();
  });

  it.each(["absent", "intent"] as const)(
    "authenticates the entire %s snapshot again before opening publication",
    async (state) => {
      const f = await fixture();
      if (state === "intent") await f.store.write(started(f).result.journal);
      mocks.atomicWrite.mockClear();
      let injected = false;
      let changed = "";
      mocks.readFile.mockImplementation(async (...args) => {
        if (args[0] !== f.journalPath || injected || mocks.acquire.mock.calls.length === 0)
          return actualRead(...args);
        let failure: { error: unknown } | null = null;
        const snapshot = await actualRead(...args).catch((error: unknown) => {
          failure = { error };
          return null;
        });
        injected = true;
        changed =
          state === "absent"
            ? JSON.stringify({ schema_version: 1, preserved_unknown: "no digest" })
            : JSON.stringify({ ...JSON.parse(String(snapshot)), task_revision: 99 });
        await actualAtomic(f.journalPath, changed, "utf8");
        if (failure) throw (failure as { error: unknown }).error;
        return snapshot!;
      });
      const execute = vi.fn(() => Promise.resolve(success(f.operation)));
      await expect(run(f, execute)).rejects.toThrow();
      expect(injected).toBe(true);
      expect(await readFile(f.journalPath, "utf8")).toBe(changed);
      expect(execute).not.toHaveBeenCalled();
      expect(mocks.atomicWrite).not.toHaveBeenCalled();
    },
  );

  it.each(faults)("opening recovery preserves durable state after %s uncertainty", async (mode) => {
    const f = await fixture();
    await f.store.write(started(f).result.journal);
    const fault = inject(f, (value) => value.stop?.reason === "effect_in_doubt", mode);
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    try {
      const outcome = run(f, execute);
      if (mode === "after") await outcome;
      else await expect(outcome).rejects.toThrow();
      expect(fault.injected).toBe(true);
      expect(execute).not.toHaveBeenCalled();
      await fault.restore();
      fault.restore = noRestore;
      if (fault.bytes) expect(await readFile(f.journalPath, "utf8")).toBe(fault.bytes);
      if (mode === "before") expect(await lastStatus(f)).toBe("intent");
      if (mode === "after")
        expect(await journal(f)).toHaveProperty("stop.reason", "effect_in_doubt");
    } finally {
      await fault.restore();
    }
  });

  it("migrates only the supported empty legacy record under GitLab ownership", async () => {
    const f = await fixture();
    const created = started(f).created;
    await actualAtomic(
      f.journalPath,
      JSON.stringify({
        schema_version: 0,
        kind: created.kind,
        task_id: created.task_id,
        task_revision: created.task_revision,
        state_fingerprint_digest: created.state_fingerprint_digest,
        budget: created.budget,
        started_at: created.started_at,
      }),
      "utf8",
    );
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    await run(f, execute);
    expect(execute).toHaveBeenCalledOnce();
    expect(await lastStatus(f)).toBe("completed");
  });

  it.each(["github", "adoption"] as const)(
    "rejects a %s route conflicting with a retained native GitLab cursor",
    async (kind) => {
      const f = await fixture();
      await f.store.write(completed(f));
      const bytes = await readFile(f.journalPath, "utf8");
      const decision =
        kind === "adoption"
          ? ({ ...f.decision, prFlow: { adoption: { provider: "gitlab" } } } as TaskRouteDecision)
          : nextRoute(f);
      if (kind === "github")
        decision.prFlow = { pr: { provider: "github" } } as TaskRouteDecision["prFlow"];
      mocks.atomicWrite.mockClear();
      const execute = vi.fn(() => Promise.resolve(success(f.operation)));
      await expect(run(f, execute, decision)).rejects.toThrow("conflicts with the retained");
      expect(await readFile(f.journalPath, "utf8")).toBe(bytes);
      expect(mocks.atomicWrite).not.toHaveBeenCalled();
      expect(execute).not.toHaveBeenCalled();
    },
  );

  it("rejects a GitLab route conflicting with a retained GitHub cursor", async () => {
    const f = await fixture("github");
    await f.store.write(completed(f));
    const bytes = await readFile(f.journalPath, "utf8");
    const operation = structuredClone(f.operation);
    operation.params.identity.provider = "gitlab";
    const decision = {
      ...f.decision,
      workflowStep: { ...f.decision.workflowStep, operation },
    } as TaskRouteDecision;
    mocks.atomicWrite.mockClear();
    const execute = vi.fn(() => Promise.resolve(success(operation)));
    await expect(run(f, execute, decision)).rejects.toThrow("conflicts with the retained");
    expect(await readFile(f.journalPath, "utf8")).toBe(bytes);
    expect(mocks.atomicWrite).not.toHaveBeenCalled();
    expect(execute).not.toHaveBeenCalled();
  });

  it.each(["gitlab", "github"] as const)(
    "keeps an adopted %s restart on its retained legacy path",
    async (provider) => {
      const f = await fixture(provider);
      await f.store.write(completed(f, "adopted"));
      const execute = vi.fn(() => Promise.resolve(success(f.operation)));
      const decision = {
        ...nextRoute(f),
        prFlow: { pr: { provider }, adoption: { provider } },
      } as TaskRouteDecision;
      await run(f, execute, decision);
      expect(mocks.acquire).not.toHaveBeenCalled();
      expect(execute).not.toHaveBeenCalled();
      expect(await journal(f)).toHaveProperty("cursor.phase", "ready");
    },
  );

  it.each(["classification", "completion", "failure", "adoption"] as const)(
    "preserves a native GitLab cursor appearing after legacy %s",
    async (point) => {
      const f = await fixture("github");
      const native = structuredClone(f.operation);
      native.params.identity.provider = "gitlab";
      const retained = completed(f, true, native);
      const bytes = `${JSON.stringify(retained, null, 2)}\n`;
      let injected = false;
      let writesAtInjection = 0;
      if (point === "classification")
        mocks.readFile.mockImplementation(async (...args) => {
          if (args[0] !== f.journalPath || injected) return actualRead(...args);
          let failure: { error: unknown } | null = null;
          const snapshot = await actualRead(...args).catch((error: unknown) => {
            failure = { error };
            return null;
          });
          injected = true;
          await actualAtomic(f.journalPath, bytes, "utf8");
          if (failure) throw (failure as { error: unknown }).error;
          return snapshot!;
        });
      const execute = vi.fn(async () => {
        injected = true;
        await actualAtomic(f.journalPath, bytes, "utf8");
        writesAtInjection = mocks.atomicWrite.mock.calls.length;
        if (point === "failure" || point === "adoption")
          throw new Error(`primary ${point} failure`);
        return success(f.operation);
      });
      const decision =
        point === "adoption"
          ? ({ ...f.decision, prFlow: { adoption: { provider: "github" } } } as TaskRouteDecision)
          : f.decision;
      if (point === "classification")
        await expect(run(f, execute)).rejects.toThrow("conflicts with the retained");
      else {
        const outcome = await run(f, execute, decision);
        expect(outcome.execution.result?.status).toBe("failed");
        expect(outcome.execution.result?.detail).toContain(
          point === "completion" ? "conflicts with the retained" : `primary ${point} failure`,
        );
      }
      expect(injected).toBe(true);
      expect(await readFile(f.journalPath, "utf8")).toBe(bytes);
      expect(execute).toHaveBeenCalledTimes(point === "classification" ? 0 : 1);
      expect(mocks.atomicWrite).toHaveBeenCalledTimes(writesAtInjection);
      expect(mocks.acquire).not.toHaveBeenCalled();
    },
  );

  it.each(["before", "after"] as const)(
    "GitHub completion I/O %s publication never replaces the outcome as failed",
    async (mode) => {
      const f = await fixture("github");
      const fault = inject(f, (value) => value.operations.at(-1)?.status === "completed", mode);
      const execute = vi.fn(() => Promise.resolve(success(f.operation)));
      const outcome = await run(f, execute);
      expect(outcome.execution.result?.status).toBe("failed");
      expect(fault.injected).toBe(true);
      expect(await lastStatus(f)).toBe(mode === "before" ? "intent" : "completed");
      expect(execute).toHaveBeenCalledOnce();
      const attempts = mocks.atomicWrite.mock.calls
        .filter(([target]) => target === f.journalPath)
        .map(([, data]) => JSON.parse(String(data)) as Journal);
      expect(attempts.some((value) => value.operations.at(-1)?.status === "failed")).toBe(false);
    },
  );

  it("busy ownership stops before open or journal creation, even for the same PID", async () => {
    const f = await fixture();
    const owner = await actualAcquire({ journal_path: f.journalPath });
    expect(owner).not.toBeNull();
    const ownerBytes = await readFile(`${f.journalPath}.execution/owner`, "utf8");
    mocks.atomicWrite.mockClear();
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    try {
      await expect(run(f, execute)).rejects.toThrow("Another supervisor owns");
      await expect(readFile(f.journalPath)).rejects.toMatchObject({ code: "ENOENT" });
      expect(await readFile(`${f.journalPath}.execution/owner`, "utf8")).toBe(ownerBytes);
      expect(mocks.atomicWrite).not.toHaveBeenCalled();
      expect(execute).not.toHaveBeenCalled();
    } finally {
      await owner!.release();
    }
  });

  it.each([false, true])(
    "release error preserves the primary outcome, failed=%s",
    async (failed) => {
      const f = await fixture();
      const releaseError = new Error("injected lease release failure");
      mocks.acquire.mockImplementationOnce(async (opts) => {
        const lease = await actualAcquire(opts);
        if (!lease) throw new Error("Fixture lease unavailable");
        return {
          release: async () => {
            await lease.release();
            throw releaseError;
          },
        };
      });
      const execute = vi.fn(() =>
        failed
          ? Promise.reject(new Error("primary execution failure"))
          : Promise.resolve(success(f.operation)),
      );
      if (failed) {
        const outcome = await run(f, execute);
        expect(outcome.execution.result?.detail).toBe("primary execution failure");
      } else await expect(run(f, execute)).rejects.toBe(releaseError);
      expect(await lastStatus(f)).toBe(failed ? "failed" : "completed");
      const available = await actualAcquire({ journal_path: f.journalPath });
      expect(available).not.toBeNull();
      await available!.release();
      if (!failed) {
        await run(f, execute);
        expect(execute).toHaveBeenCalledOnce();
      }
    },
  );

  it("a managed handoff releases ownership before a later provider admission", async () => {
    const f = await fixture();
    const created = createSupervisorExecutionEpisodeJournal({
      task_id: f.decision.task.id,
      task_revision: 1,
      state_fingerprint_digest: f.operation.preconditionFingerprint.digest,
      budget,
    });
    const result = startSupervisorExecutionEpisode({
      journal: created,
      role: "EXECUTOR",
      kind: "agent_episode",
      operation_identity: {
        transport: "managed",
        task_id: f.decision.task.id,
        work_order_id: "fixture-managed-order",
      },
      precondition_fingerprint_digest: f.operation.preconditionFingerprint.digest,
      authority_ref: "kernel-managed:fixture",
      effect_ref: "fixture-managed-result",
    });
    if (result.status !== "started") throw new Error("Managed fixture intent was not admitted");
    const managed = completeSupervisorExecutionEpisode({
      journal: result.journal,
      operation_key: result.operation_key,
      result: { status: "completed managed work" },
    });
    await f.store.write(managed);
    const owner = await actualAcquire({ journal_path: f.journalPath });
    const execute = vi.fn(() => Promise.resolve(success(f.operation)));
    try {
      await expect(run(f, execute)).rejects.toThrow("Another supervisor owns");
    } finally {
      await owner!.release();
    }
    await run(f, execute);
    expect(execute).not.toHaveBeenCalled();
    expect(await lastStatus(f)).toBe("completed");
    await run(f, execute);
    expect(execute).toHaveBeenCalledOnce();
    expect(await journal(f)).toHaveProperty("operations.length", 2);
  });

  it.each(["github", "adoption"] as const)(
    "preserves the existing legacy path for %s",
    async (kind) => {
      const f = await fixture(kind === "github" ? "github" : "gitlab");
      const decision =
        kind === "adoption"
          ? ({ ...f.decision, prFlow: { adoption: { provider: "gitlab" } } } as TaskRouteDecision)
          : f.decision;
      const execute = vi.fn(() => Promise.resolve(success(f.operation)));
      await run(f, execute, decision);
      expect(execute).toHaveBeenCalledOnce();
      expect(mocks.acquire).not.toHaveBeenCalled();
      expect(await lastStatus(f)).toBe("completed");
    },
  );
});
