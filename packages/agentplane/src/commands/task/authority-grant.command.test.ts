import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildStateFingerprint,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import {
  createSideEffectAuthorityRecord,
  appendSideEffectAuthorityAudit,
  workflowOperationAuthorityDigest,
} from "../shared/side-effect-authority.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";

import { parseCommandArgv } from "../../cli/spec/parse.js";
import type { CommandCtx } from "../../cli/spec/spec.js";
import type * as AgentWorkOrderModule from "../../runner/usecases/agent-work-order.js";
import type * as ProviderRecoveryModule from "./provider-update-effect-recovery.js";
import type * as TaskBackendModule from "../shared/task-backend.js";
import type * as SupervisorEpisodeModule from "../shared/supervisor-execution-episode.js";
import type * as AuthorityStoreModule from "../shared/side-effect-authority-store.js";
import type { SideEffectAuthorityState } from "../shared/side-effect-authority.js";

type CommandContext = TaskBackendModule.CommandContext;

const mocks = vi.hoisted(() => ({
  prepareAgentWorkOrder: vi.fn(),
  readRecovery: vi.fn(),
  journalRead: vi.fn(),
  authority: vi.fn(),
  persist: vi.fn<(opts: { state: SideEffectAuthorityState }) => Promise<void>>(),
  observe: vi.fn(),
  gh: vi.fn(),
  local: vi.fn(),
  loadTask: vi.fn(),
}));

vi.mock("../../runner/usecases/agent-work-order.js", async (importOriginal) => {
  const actual = await importOriginal<typeof AgentWorkOrderModule>();
  return { ...actual, prepareAgentWorkOrder: mocks.prepareAgentWorkOrder };
});
vi.mock("./provider-update-effect-recovery.js", async (importOriginal) => {
  const actual = await importOriginal<typeof ProviderRecoveryModule>();
  return { ...actual, readProviderUpdateRecoveryInput: mocks.readRecovery };
});
vi.mock("../shared/task-backend.js", async (importOriginal) => {
  const actual = await importOriginal<typeof TaskBackendModule>();
  return {
    ...actual,
    loadTaskFromContext: mocks.loadTask,
    resolveCommandGitCommonDir: () => Promise.resolve("/repo/.git"),
  };
});
vi.mock("../shared/supervisor-execution-episode.js", async (importOriginal) => {
  const actual = await importOriginal<typeof SupervisorEpisodeModule>();
  return {
    ...actual,
    resolveSupervisorExecutionEpisodePath: () =>
      Promise.resolve("/repo/.git/agentplane/supervisor/journal.json"),
    tryAcquireSupervisorExecutionLease: () => Promise.resolve({ release: () => Promise.resolve() }),
    createSupervisorEpisodeStore: () => ({ read: mocks.journalRead }),
  };
});
vi.mock("../shared/side-effect-authority-store.js", async (importOriginal) => {
  const actual = await importOriginal<typeof AuthorityStoreModule>();
  return {
    ...actual,
    loadSideEffectAuthorityState: mocks.authority,
    persistSideEffectAuthorityState: mocks.persist,
  };
});
vi.mock("../pr/internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: mocks.observe,
}));
vi.mock("../pr/internal/gh-api.js", () => ({ runGhApiJson: mocks.gh }));
vi.mock("../pr/provider-update-branch-local.js", () => ({
  validateProviderUpdateLocalState: mocks.local,
}));

import {
  makeRunTaskAuthorityGrantHandler,
  taskAuthorityGrantSpec,
} from "./authority-grant.command.js";

function recoveryFixture() {
  const taskId = "T-RECOVERY";
  const originalHead = "a".repeat(40);
  const originalBase = "b".repeat(40);
  const observedHead = "c".repeat(40);
  const advancedBase = "d".repeat(40);
  const identity = {
    provider: "github" as const,
    hostname: "github.com",
    remote: "origin",
    sourceProject: "example/repo",
    targetProject: "example/repo",
    sourceUrl: "https://github.com/example/repo.git",
    targetUrl: "https://github.com/example/repo.git",
  };
  const fingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: 1,
    git_head: originalHead,
    worktree: "/repo",
    components: Object.fromEntries(
      [
        "task",
        "git",
        "backend_projection",
        "plan",
        "policy",
        "capability",
        "knowledge",
        "provider",
        "authority",
      ].map((key) => [key, { state: "present", source: "test", value: { key } }]),
    ) as Parameters<typeof buildStateFingerprint>[0]["components"],
  });
  const params = {
    taskId,
    identity,
    prNumber: 42,
    branch: "task/T-RECOVERY/example",
    baseBranch: "main",
    expectedHeadSha: originalHead,
    expectedBaseSha: originalBase,
  };
  const originalOperation = {
    id: "provider.pr.update_branch" as const,
    type: "provider_update_branch" as const,
    params,
  };
  const operationDigest = `sha256:${operationPayloadDigest(originalOperation)}`;
  const effectRef = `provider.pr.update_branch:${taskId}:${fingerprint.digest}:${operationDigest.slice(7)}`;
  const budget = {
    max_episodes: 10,
    max_agent_runs: null,
    max_input_tokens: null,
    max_output_tokens: null,
    max_total_tokens: null,
    max_wall_time_ms: null,
    max_changed_files: null,
    max_diff_lines: null,
    max_no_progress_episodes: null,
  };
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: fingerprint.digest,
    budget,
  });
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: {
      ...originalOperation,
      preconditionFingerprint: fingerprint,
      authorityRef: `route:${taskId}:${fingerprint.digest}`,
      idempotencyKey: effectRef,
    },
    precondition_fingerprint_digest: fingerprint.digest,
    authority_ref: "workflow-operation:provider.pr.update_branch",
    authority_digest: fingerprint.digest,
    effect_ref: effectRef,
  });
  if (started.status !== "started") throw new Error("expected started intent");
  const journal = recoverSupervisorExecutionEpisodeJournal({
    journal: started.journal,
    state_fingerprint_digest: fingerprint.digest,
  });
  const originalGrant = createSideEffectAuthorityRecord({
    actor: "USER",
    operation: originalOperation,
    fingerprint,
    issuedAt: new Date(Date.parse(started.journal.operations[0]!.started_at) - 1000).toISOString(),
    expiresAt: new Date(
      Date.parse(started.journal.operations[0]!.started_at) + 60_000,
    ).toISOString(),
  });
  const originalState = appendSideEffectAuthorityAudit({
    state: { schemaVersion: 1, grants: [originalGrant], audit: [] },
    at: originalGrant.issuedAt,
    actor: "USER",
    operation: originalOperation,
    fingerprint,
    authority: originalGrant,
    outcome: "approved",
  });
  const evidence = [
    {
      ref: "provider-observation",
      content: "Observed exact GitHub branch update",
      digest: digestSupervisorEpisodeValue("Observed exact GitHub branch update"),
    },
  ];
  const input = {
    task_id: taskId,
    repository_root: "/repo",
    journal_digest: journal.digest,
    operation_key: started.operation_key,
    precondition_fingerprint_digest: fingerprint.digest,
    effect_ref: effectRef,
    grant_id: originalGrant.id,
    current_state_fingerprint: fingerprint.digest,
    identity,
    pr_number: 42,
    pr_url: "https://github.com/example/repo/pull/42",
    branch: params.branch,
    base_branch: "main",
    original_head_sha: originalHead,
    original_base_sha: originalBase,
    observed_head_sha: observedHead,
    operator: {
      actor: "USER",
      advanced_base_attestation: {
        journal_digest: journal.digest,
        operation_key: started.operation_key,
        grant_id: originalGrant.id,
        grant_digest: originalGrant.digest,
        identity,
        pr_number: 42,
        pr_url: "https://github.com/example/repo/pull/42",
        branch: params.branch,
        base_branch: "main",
        original_head_sha: originalHead,
        original_base_sha: originalBase,
        observed_head_sha: observedHead,
        observed_merge_base_sha: advancedBase,
        provider_actor_login: "deus-agentplane",
        provider_actor_id: 282_251_400,
      },
    },
    evidence,
  };
  const route = {
    workflowStep: { preconditionFingerprint: fingerprint },
    workspace: { taskWorktreePath: "/repo", prBranch: params.branch },
  };
  const commandContext = {
    resolvedProject: { gitRoot: "/repo" },
    config: {
      workflow_mode: "branch_pr",
      authority: {
        approval_receipts: { trusted_issuers: [], max_ttl_minutes: 15, clock_skew_seconds: 0 },
      },
    },
  } as CommandContext;
  mocks.prepareAgentWorkOrder.mockResolvedValue({
    status: "prepared",
    value: { route_decision: route },
  });
  mocks.readRecovery.mockResolvedValue(input);
  mocks.journalRead.mockResolvedValue(journal);
  mocks.loadTask.mockResolvedValue({ id: taskId });
  mocks.authority.mockResolvedValue({ state: originalState, source: "git_common_dir" });
  mocks.observe.mockResolvedValue({
    state: "found",
    pr: {
      provider: "github",
      status: "OPEN",
      prNumber: 42,
      prUrl: input.pr_url,
      headRef: params.branch,
      base: "main",
      baseSha: advancedBase,
      headSha: observedHead,
      identity,
    },
  });
  mocks.gh.mockImplementation((_root: string, args: string[]) => {
    const endpoint = args[0]!;
    if (endpoint.includes("/git/commits/"))
      return Promise.resolve({
        sha: observedHead,
        parents: [{ sha: originalHead }, { sha: advancedBase }],
      });
    if (endpoint.includes("/commits/"))
      return Promise.resolve({
        sha: observedHead,
        parents: [{ sha: originalHead }, { sha: advancedBase }],
        author: { login: "deus-agentplane", id: 282_251_400 },
        committer: { login: "web-flow" },
        commit: {
          message: `Merge branch 'main' into ${params.branch}`,
          verification: {
            verified: true,
            reason: "valid",
            verified_at: started.journal.operations[0]!.started_at,
          },
        },
      });
    if (endpoint === "user") return Promise.resolve({ login: "deus-agentplane", id: 282_251_400 });
    const ancestor = endpoint.split("/compare/")[1]!.split("...")[0];
    return Promise.resolve({
      status: "ahead",
      base_commit: { sha: ancestor },
      merge_base_commit: { sha: ancestor },
    });
  });
  mocks.local.mockResolvedValue(null);
  const session = {
    getLocalContext: vi.fn(() => Promise.resolve(commandContext)),
    getRemoteContext: vi.fn(() => Promise.resolve(commandContext)),
    getLocalWriteContext: vi.fn(() => Promise.resolve(commandContext)),
    getRemoteWriteContext: vi.fn(() => Promise.resolve(commandContext)),
  };
  const invoke = () =>
    makeRunTaskAuthorityGrantHandler(session)({ cwd: "/repo", rootOverride: null } as CommandCtx, {
      taskId,
      operationId: "",
      operationDigest: "",
      stateFingerprintDigest: "",
      stateScopeDigest: "",
      recoveryInput: "/tmp/recovery.json",
      by: "USER",
      ttlMinutes: 15,
      remote: true,
    });
  return { invoke, input, journal, originalGrant, originalState, originalOperation };
}

describe("task authority grant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.prepareAgentWorkOrder.mockRejectedValue(new Error("stop after context selection"));
  });

  it("preserves the explicit hosted-route context emitted by task next-action", () => {
    expect(
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--remote",
        "--operation",
        "task.pre_merge_close",
        "--operation-digest",
        "sha256:operation",
        "--state-fingerprint",
        "sha256:fingerprint",
        "--state-scope-digest",
        "sha256:scope",
        "--by",
        "USER",
      ]),
    ).toMatchObject({
      parsed: {
        taskId: "T-1",
        operationId: "task.pre_merge_close",
        remote: true,
      },
    });
  });

  it("accepts a signed receipt in place of a direct actor", () => {
    expect(
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--operation",
        "pr.open",
        "--operation-digest",
        "sha256:operation",
        "--state-fingerprint",
        "sha256:fingerprint",
        "--state-scope-digest",
        "sha256:scope",
        "--approval-receipt",
        "signed-receipt",
      ]),
    ).toMatchObject({
      parsed: {
        taskId: "T-1",
        approvalReceipt: "signed-receipt",
        by: undefined,
      },
    });
  });

  it("accepts the operator recovery path without normal live-operation pins", () => {
    expect(
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--remote",
        "--recovery-input",
        "/tmp/recovery.json",
        "--by",
        "USER",
      ]),
    ).toMatchObject({
      parsed: { taskId: "T-1", remote: true, recoveryInput: "/tmp/recovery.json", by: "USER" },
    });
    expect(() =>
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--recovery-input",
        "/tmp/recovery.json",
        "--by",
        "USER",
      ]),
    ).toThrow("--recovery-input requires --remote");
    expect(() =>
      parseCommandArgv(taskAuthorityGrantSpec, [
        "T-1",
        "--remote",
        "--recovery-input",
        "/tmp/recovery.json",
        "--operation",
        "provider.pr.update_branch",
        "--by",
        "USER",
      ]),
    ).toThrow("cannot combine with normal operation options");
  });

  it("requires exactly one user-evidence channel", () => {
    const base = [
      "T-1",
      "--operation",
      "pr.open",
      "--operation-digest",
      "sha256:operation",
      "--state-fingerprint",
      "sha256:fingerprint",
      "--state-scope-digest",
      "sha256:scope",
    ];

    expect(() => parseCommandArgv(taskAuthorityGrantSpec, base)).toThrow(
      "exactly one of --by or --approval-receipt",
    );
    expect(() =>
      parseCommandArgv(taskAuthorityGrantSpec, [
        ...base,
        "--by",
        "USER",
        "--approval-receipt",
        "signed-receipt",
      ]),
    ).toThrow("exactly one of --by or --approval-receipt");
  });

  it.each([
    { remote: false, selected: "local" },
    { remote: true, selected: "remote" },
  ] as const)(
    "selects the $selected route context before rebuilding authority",
    async (testCase) => {
      const commandContext = {} as CommandContext;
      const writeCommandContext = { config: {} } as CommandContext;
      const getLocalContext = vi.fn(() => Promise.resolve(commandContext));
      const getRemoteContext = vi.fn(() => Promise.resolve(commandContext));
      const getLocalWriteContext = vi.fn(() => Promise.resolve(writeCommandContext));
      const getRemoteWriteContext = vi.fn(() => Promise.resolve(writeCommandContext));
      const run = makeRunTaskAuthorityGrantHandler({
        getLocalContext,
        getRemoteContext,
        getLocalWriteContext,
        getRemoteWriteContext,
      });

      await expect(
        run({ cwd: "/repo", rootOverride: null } as CommandCtx, {
          taskId: "T-1",
          operationId: "pr.open",
          operationDigest: "sha256:operation",
          stateFingerprintDigest: "sha256:fingerprint",
          stateScopeDigest: "sha256:scope",
          by: "USER",
          ttlMinutes: 15,
          remote: testCase.remote,
        }),
      ).rejects.toThrow("stop after context selection");

      expect(getLocalContext).toHaveBeenCalledTimes(testCase.remote ? 0 : 1);
      expect(getRemoteContext).toHaveBeenCalledTimes(testCase.remote ? 1 : 0);
      if (!testCase.remote) {
        expect(getLocalContext).toHaveBeenCalledWith("task authority grant", "/repo", null);
      }
      expect(getLocalWriteContext).not.toHaveBeenCalled();
      expect(getRemoteWriteContext).not.toHaveBeenCalled();
      expect(mocks.prepareAgentWorkOrder).toHaveBeenCalledWith({
        command_ctx: commandContext,
        cwd: "/repo",
        root_override: null,
        task_id: "T-1",
        ...(testCase.remote ? { include_remote: true } : {}),
      });
    },
  );

  it("rebuilds authority from the same canonical WorkOrder route as task next-action", async () => {
    const commandContext = {} as CommandContext;
    mocks.prepareAgentWorkOrder.mockResolvedValue({
      status: "prepared",
      value: {
        route_decision: {
          workflowStep: { kind: "cli_operation", id: "task.pre_merge_close" },
        },
      },
    });
    const run = makeRunTaskAuthorityGrantHandler({
      getLocalContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteContext: vi.fn(() => Promise.resolve(commandContext)),
      getLocalWriteContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteWriteContext: vi.fn(() => Promise.resolve(commandContext)),
    });

    await expect(
      run({ cwd: "/repo", rootOverride: null } as CommandCtx, {
        taskId: "T-1",
        operationId: "pr.open",
        operationDigest: "sha256:operation",
        stateFingerprintDigest: "sha256:fingerprint",
        stateScopeDigest: "sha256:scope",
        by: "USER",
        ttlMinutes: 15,
        remote: false,
      }),
    ).rejects.toThrow(/recomputed local route.*cli_operation:task\.pre_merge_close/su);
  });

  it("explains hosted route drift when the requested authority boundary has already moved", async () => {
    const commandContext = {} as CommandContext;
    mocks.prepareAgentWorkOrder.mockResolvedValue({
      status: "prepared",
      value: {
        route_decision: {
          workflowStep: { kind: "cli_operation", id: "task.pre_merge_close" },
        },
      },
    });
    const run = makeRunTaskAuthorityGrantHandler({
      getLocalContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteContext: vi.fn(() => Promise.resolve(commandContext)),
      getLocalWriteContext: vi.fn(() => Promise.resolve(commandContext)),
      getRemoteWriteContext: vi.fn(() => Promise.resolve(commandContext)),
    });

    await expect(
      run({ cwd: "/repo", rootOverride: null } as CommandCtx, {
        taskId: "T-1",
        operationId: "task.pre_merge_close",
        operationDigest: "sha256:operation",
        stateFingerprintDigest: "sha256:fingerprint",
        stateScopeDigest: "sha256:scope",
        by: "USER",
        ttlMinutes: 15,
        remote: true,
      }),
    ).rejects.toThrow(
      /Authority request is stale:.*cli_operation:task\.pre_merge_close.*next-action T-1 --remote --explain/su,
    );
  });

  it("persists a distinct audited USER grant for the exact stopped recovery tuple", async () => {
    const f = recoveryFixture();
    await expect(f.invoke()).resolves.toBe(0);
    expect(mocks.persist).toHaveBeenCalledTimes(1);
    const written = mocks.persist.mock.calls[0]![0].state;
    expect(written.grants).toHaveLength(2);
    expect(written.audit.at(-1)).toMatchObject({
      actor: "USER",
      outcome: "approved",
      authorityDigest: written.grants.at(-1).digest,
    });
    expect(written.grants.at(-1).operationDigest).not.toBe(
      workflowOperationAuthorityDigest(f.originalOperation),
    );
    expect(written.grants.at(-1).operationId).toBe("provider.pr.update_branch");
    expect(JSON.stringify(mocks.gh.mock.calls)).not.toContain('"-X"');
  });

  it("rejects changed original grant, journal, or PR before issuing recovery authority", async () => {
    for (const variant of ["original-grant", "journal", "provider"] as const) {
      vi.clearAllMocks();
      const f = recoveryFixture();
      if (variant === "original-grant")
        mocks.authority.mockResolvedValue({
          state: { ...f.originalState, grants: [] },
          source: "git_common_dir",
        });
      if (variant === "journal")
        mocks.journalRead.mockResolvedValue({
          ...f.journal,
          status: "running",
        });
      if (variant === "provider")
        mocks.observe.mockResolvedValue({
          state: "found",
          pr: {
            provider: "github",
            status: "OPEN",
            prNumber: 42,
            prUrl: f.input.pr_url,
            headRef: f.input.branch,
            base: "main",
            baseSha: f.input.operator.advanced_base_attestation.observed_merge_base_sha,
            headSha: "e".repeat(40),
            identity: f.input.identity,
          },
        });
      await expect(f.invoke()).rejects.toThrow();
      expect(mocks.persist).not.toHaveBeenCalled();
    }
  });
});
