import { mkdtemp, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildStateFingerprint,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  recoverSupervisorExecutionEpisodeJournal,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { mkGitRepoRoot } from "@agentplane/testkit";

import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import { workflowOperationAuthorityDigest } from "../shared/side-effect-authority.js";
import { providerUpdateRecoveryGrantOperation } from "../shared/provider-update-branch-route.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { reconcileProviderUpdateEffect } from "./provider-update-effect-recovery.js";

const mocks = vi.hoisted(() => ({
  observe: vi.fn(),
  compare: vi.fn(),
  local: vi.fn(),
  authority: vi.fn(),
}));
vi.mock("../pr/internal/change-request-provider.js", () => ({
  observeExistingChangeRequestByNumber: mocks.observe,
}));
vi.mock("../pr/internal/gh-api.js", () => ({ runGhApiJson: mocks.compare }));
vi.mock("../pr/provider-update-branch-local.js", () => ({
  validateProviderUpdateLocalState: mocks.local,
}));
vi.mock("../shared/side-effect-authority-store.js", () => ({
  loadSideEffectAuthorityState: mocks.authority,
}));

const taskId = "202610251417-RECOVR";
const branch = `task/${taskId}/example`;
const originalHead = "a".repeat(40);
const observedHead = "b".repeat(40);
const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/repo",
  targetProject: "example/repo",
  sourceUrl: "https://github.com/example/repo.git",
  targetUrl: "https://github.com/example/repo.git",
};
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
} as const;

type Fixture = Awaited<ReturnType<typeof fixture>>;

async function fixture(authorityRef = "workflow-operation:provider.pr.update_branch") {
  const root = await mkGitRepoRoot();
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "--allow-empty",
      "-m",
      "init",
    ],
    { cwd: root },
  );
  const base = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  execFileSync("git", ["update-ref", "refs/remotes/origin/main", base], { cwd: root });
  const currentFingerprint = `sha256:${"c".repeat(64)}`;
  const originalFingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: 1,
    git_head: originalHead,
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
      ].map((key) => [key, { state: "present", source: "test", value: { key } }]),
    ) as Parameters<typeof buildStateFingerprint>[0]["components"],
  });
  const params = {
    taskId,
    identity,
    prNumber: 42,
    branch,
    baseBranch: "main",
    expectedHeadSha: originalHead,
    expectedBaseSha: base,
  };
  const payloadDigest = `sha256:${operationPayloadDigest({
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params,
  })}`;
  const effectRef = `provider.pr.update_branch:${taskId}:${originalFingerprint.digest}:${payloadDigest.slice(7)}`;
  const created = createSupervisorExecutionEpisodeJournal({
    task_id: taskId,
    task_revision: 1,
    state_fingerprint_digest: originalFingerprint.digest,
    budget,
  });
  const started = startSupervisorExecutionEpisode({
    journal: created,
    role: "EXECUTOR",
    kind: "cli_operation",
    operation_identity: {
      id: "provider.pr.update_branch",
      type: "provider_update_branch",
      params,
      preconditionFingerprint: originalFingerprint,
      authorityRef: `route:${taskId}:${originalFingerprint.digest}`,
      idempotencyKey: effectRef,
    },
    precondition_fingerprint_digest: originalFingerprint.digest,
    authority_ref: authorityRef,
    authority_digest: originalFingerprint.digest,
    effect_ref: effectRef,
  });
  if (started.status !== "started") throw new Error("expected started operation");
  const stopped = recoverSupervisorExecutionEpisodeJournal({
    journal: started.journal,
    state_fingerprint_digest: originalFingerprint.digest,
  });
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    task_id: taskId,
  });
  await createSupervisorEpisodeStore(journalPath).write(stopped);
  const grant = {
    schemaVersion: 1,
    kind: "side_effect_authority",
    id: "authority-example",
    actor: "USER",
    operationId: "provider.pr.update_branch",
    operationDigest: payloadDigest,
    policyRule: "workflow.external_high_risk",
    stateFingerprintDigest: `sha256:${"8".repeat(64)}`,
    stateScopeDigest: `sha256:${"7".repeat(64)}`,
    issuedAt: new Date(Date.parse(started.journal.operations[0]!.started_at) - 1000).toISOString(),
    expiresAt: new Date(
      Date.parse(started.journal.operations[0]!.started_at) + 60_000,
    ).toISOString(),
    digest: `sha256:${"d".repeat(64)}`,
  };
  const authorityState = {
    grants: [grant],
    audit: [
      {
        authorityDigest: grant.digest,
        actor: grant.actor,
        policyRule: grant.policyRule,
        operationId: grant.operationId,
        operationDigest: payloadDigest,
        stateFingerprintDigest: grant.stateFingerprintDigest,
        at: grant.issuedAt,
        outcome: "approved",
      },
    ],
  };
  mocks.authority.mockResolvedValue({
    state: authorityState,
    source: "git_common_dir",
  });
  mocks.observe.mockResolvedValue({
    state: "found",
    pr: {
      provider: "github",
      status: "OPEN",
      prNumber: 42,
      prUrl: "https://github.com/example/repo/pull/42",
      headRef: branch,
      base: "main",
      baseSha: base,
      headSha: observedHead,
      identity,
    },
  });
  mocks.compare.mockImplementation((_root: string, args: string[]) => {
    if (args[0]!.includes("/git/commits/"))
      return Promise.resolve({
        sha: observedHead,
        parents: [{ sha: originalHead }, { sha: base }],
      });
    const [older] = args[0]!.split("/compare/")[1]!.split("...");
    return Promise.resolve({
      status: "ahead",
      base_commit: { sha: older },
      merge_base_commit: { sha: older },
    });
  });
  mocks.local.mockResolvedValue(null);
  const route = {
    task: { id: taskId },
    workspace: { taskWorktreePath: root, baseCheckoutPath: root, prBranch: branch },
    workflowStep: {
      id: "agent.implementation_rework",
      preconditionFingerprint: { digest: currentFingerprint },
    },
  } as TaskRouteDecision;
  const command = {
    resolvedProject: { gitRoot: root },
    memo: {},
    taskBackend: { getTask: vi.fn().mockResolvedValue({ id: taskId }) },
  } as unknown as CommandContext;
  const input = {
    schema_version: 1,
    kind: "provider_update_branch_effect_resolution",
    task_id: taskId,
    repository_root: root,
    journal_digest: stopped.digest,
    operation_key: started.operation_key,
    precondition_fingerprint_digest: originalFingerprint.digest,
    effect_ref: effectRef,
    grant_id: grant.id,
    current_state_fingerprint: currentFingerprint,
    identity,
    pr_number: 42,
    pr_url: "https://github.com/example/repo/pull/42",
    branch,
    base_branch: "main",
    original_head_sha: originalHead,
    original_base_sha: base,
    observed_head_sha: observedHead,
    operator: {
      kind: "operator_decision",
      actor: "release operator",
      decision_ref: "release-0713-reconcile-observed-update",
      observed_at: new Date().toISOString(),
    },
    evidence: [
      {
        ref: "hosted-pr-observation",
        content: `PR 42 head ${observedHead} is the provider-published update merge`,
        digest: digestSupervisorEpisodeValue(
          `PR 42 head ${observedHead} is the provider-published update merge`,
        ),
      },
    ],
  };
  const inputPath = path.join(
    await mkdtemp(path.join(os.tmpdir(), "ap-provider-recovery-")),
    "input.json",
  );
  const invoke = async (delta: Record<string, unknown> = {}) => {
    await writeFile(inputPath, JSON.stringify({ ...input, ...delta }));
    return await reconcileProviderUpdateEffect({
      command,
      task_id: taskId,
      input_path: inputPath,
      decide: () => Promise.resolve(route),
    });
  };
  return { root, base, journalPath, input, invoke, grant, authorityState };
}

function advancedBaseFixture(f: Fixture) {
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Test",
      "-c",
      "user.email=test@example.com",
      "commit",
      "--allow-empty",
      "-m",
      "advanced",
    ],
    { cwd: f.root },
  );
  const mergedBase = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: f.root,
    encoding: "utf8",
  }).trim();
  execFileSync("git", ["update-ref", "refs/remotes/origin/main", mergedBase], { cwd: f.root });
  const stopped = createSupervisorEpisodeStore(f.journalPath).read();
  const verifiedAt = async () => {
    const journal = (await stopped) as {
      operations: { started_at: string }[];
      stop: { at: string };
    };
    return new Date(
      (Date.parse(journal.operations[0]!.started_at) + Date.parse(journal.stop.at)) / 2,
    ).toISOString();
  };
  const attestation = {
    kind: "operator_attested_advanced_base",
    journal_digest: f.input.journal_digest,
    operation_key: f.input.operation_key,
    grant_id: f.grant.id,
    grant_digest: f.grant.digest,
    identity,
    pr_number: 42,
    pr_url: f.input.pr_url,
    branch,
    base_branch: "main",
    original_head_sha: originalHead,
    original_base_sha: f.base,
    observed_merge_base_sha: mergedBase,
    observed_head_sha: observedHead,
    provider_actor_login: "deus-agentplane",
    provider_actor_id: 282_251_400,
  };
  const recoveryOperation = providerUpdateRecoveryGrantOperation(
    {
      taskId,
      identity,
      prNumber: 42,
      branch,
      baseBranch: "main",
      expectedHeadSha: originalHead,
      expectedBaseSha: f.base,
    },
    {
      kind: "advanced_base_effect_recovery",
      journalDigest: f.input.journal_digest,
      operationKey: f.input.operation_key,
      originalGrantId: f.grant.id,
      originalGrantDigest: f.grant.digest,
      prUrl: f.input.pr_url,
      originalHeadSha: originalHead,
      originalBaseSha: f.base,
      observedHeadSha: observedHead,
      observedMergeBaseSha: mergedBase,
      providerActorLogin: "deus-agentplane",
      providerActorId: 282_251_400,
      evidenceDigest: digestSupervisorEpisodeValue(f.input.evidence),
    },
  );
  const recoveryGrant = {
    ...f.grant,
    id: "authority-recovery",
    operationDigest: workflowOperationAuthorityDigest(recoveryOperation),
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
    digest: `sha256:${"2".repeat(64)}`,
  };
  f.authorityState.grants.push(recoveryGrant);
  f.authorityState.audit.push({
    ...f.authorityState.audit[0]!,
    authorityDigest: recoveryGrant.digest,
    operationDigest: recoveryGrant.operationDigest,
    stateFingerprintDigest: recoveryGrant.stateFingerprintDigest,
    at: recoveryGrant.issuedAt,
  });
  mocks.observe.mockResolvedValue({
    state: "found",
    pr: {
      provider: "github",
      status: "OPEN",
      prNumber: 42,
      prUrl: f.input.pr_url,
      headRef: branch,
      base: "main",
      baseSha: mergedBase,
      headSha: observedHead,
      identity,
    },
  });
  mocks.compare.mockImplementation(async (_root: string, args: string[]) => {
    const endpoint = args[0]!;
    if (endpoint.includes("/git/commits/"))
      return { sha: observedHead, parents: [{ sha: originalHead }, { sha: mergedBase }] };
    if (endpoint.includes("/commits/"))
      return {
        sha: observedHead,
        parents: [{ sha: originalHead }, { sha: mergedBase }],
        author: { login: "deus-agentplane", id: 282_251_400 },
        committer: { login: "web-flow" },
        commit: {
          message: `Merge branch 'main' into ${branch}`,
          verification: { verified: true, reason: "valid", verified_at: await verifiedAt() },
        },
      };
    if (endpoint === "user") return { login: "deus-agentplane", id: 282_251_400 };
    const [older] = endpoint.split("/compare/")[1]!.split("...");
    return { status: "ahead", base_commit: { sha: older }, merge_base_commit: { sha: older } };
  });
  const input = {
    operator: {
      ...f.input.operator,
      actor: "USER",
      advanced_base_attestation: {
        ...attestation,
        recovery_grant_id: recoveryGrant.id,
        recovery_grant_digest: recoveryGrant.digest,
      },
    },
  };
  return { mergedBase, attestation, input, recoveryGrant };
}

describe("interrupted provider update recovery", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => vi.restoreAllMocks());

  it("settles the exact applied intent once without another provider PUT or changing hosted truth", async () => {
    const f = await fixture();
    await expect(f.invoke()).resolves.toMatchObject({
      verdict: "applied",
      observed_head_sha: observedHead,
      next_step: "agent.implementation_rework",
    });
    const stored = await createSupervisorEpisodeStore(f.journalPath).read();
    expect(stored).toMatchObject({
      status: "running",
      cursor: { phase: "ready" },
      operations: [{ status: "completed" }],
    });
    expect(mocks.compare).toHaveBeenCalledTimes(3);
    const compareCalls = mocks.compare.mock.calls as unknown[][];
    expect(
      compareCalls.every((call) => {
        const args = call[1];
        return Array.isArray(args) && !(args as unknown[]).includes("-X");
      }),
    ).toBe(true);
    await expect(f.invoke()).rejects.toThrow(
      "exact stopped provider operation is absent or changed",
    );
  });

  it("settles an attested advanced-base update once without provider mutation", async () => {
    const f = await fixture();
    const advanced = advancedBaseFixture(f);
    await expect(f.invoke(advanced.input)).resolves.toMatchObject({ verdict: "applied" });
    const stored = await createSupervisorEpisodeStore(f.journalPath).read();
    expect(stored).toMatchObject({ status: "running", operations: [{ status: "completed" }] });
    expect(
      mocks.compare.mock.calls.some(
        (call: unknown[]) =>
          Array.isArray(call[1]) &&
          String(call[1][0]).includes(`${f.base}...${advanced.mergedBase}`),
      ),
    ).toBe(true);
    expect(mocks.observe).toHaveBeenCalledTimes(2);
    expect(!JSON.stringify(mocks.compare.mock.calls).includes('"-X"')).toBe(true);
    await expect(f.invoke(advanced.input)).rejects.toThrow("exact stopped provider operation");
  });

  it("requires exact USER attestation and rejects replayed or competing authority", async () => {
    const f = await fixture();
    const advanced = advancedBaseFixture(f);
    for (const operator of [
      { ...advanced.input.operator, actor: "release operator" },
      { ...advanced.input.operator, advanced_base_attestation: undefined },
      {
        ...advanced.input.operator,
        advanced_base_attestation: {
          ...advanced.attestation,
          grant_digest: `sha256:${"f".repeat(64)}`,
        },
      },
      {
        ...advanced.input.operator,
        advanced_base_attestation: { ...advanced.attestation, observed_merge_base_sha: f.base },
      },
    ]) {
      await expect(f.invoke({ operator })).rejects.toThrow("exact USER attestation");
    }
    const stored = await createSupervisorEpisodeStore(f.journalPath).read();
    expect(stored.status).toBe("stopped");
    expect(!JSON.stringify(mocks.compare.mock.calls).includes('"-X"')).toBe(true);
  });

  it("rejects missing, mismatched, expired, or competing recovery grants", async () => {
    for (const variant of ["missing", "wrong-evidence", "expired", "competing"] as const) {
      const f = await fixture();
      const advanced = advancedBaseFixture(f);
      if (variant === "missing") f.authorityState.grants.pop();
      if (variant === "wrong-evidence") {
        advanced.input.operator.advanced_base_attestation.recovery_grant_digest = `sha256:${"e".repeat(64)}`;
      }
      if (variant === "expired") {
        advanced.recoveryGrant.expiresAt = new Date(Date.now() - 1).toISOString();
      }
      if (variant === "competing") {
        f.authorityState.grants.push({ ...advanced.recoveryGrant, id: "authority-competing" });
      }
      await expect(f.invoke(advanced.input)).rejects.toThrow("matching retained USER grant");
      const stored = await createSupervisorEpisodeStore(f.journalPath).read();
      expect(stored.status).toBe("stopped");
      expect(!JSON.stringify(mocks.compare.mock.calls).includes('"-X"')).toBe(true);
    }
  });

  it("accepts a trusted signed-receipt USER actor retained in grant and audit", async () => {
    const f = await fixture();
    const advanced = advancedBaseFixture(f);
    advanced.recoveryGrant.actor = "USER:release@trusted-issuer";
    f.authorityState.audit.at(-1)!.actor = advanced.recoveryGrant.actor;
    await expect(f.invoke(advanced.input)).resolves.toMatchObject({ verdict: "applied" });
  });

  it.each([
    "wrong message",
    "wrong merge parent",
    "out-of-window verification",
    "wrong actor",
    "non-descendant base",
  ] as const)(
    "rejects %s despite the retained USER grant and never dispatches PUT",
    async (variant) => {
      const f = await fixture();
      const advanced = advancedBaseFixture(f);
      const original = mocks.compare.getMockImplementation() as (
        root: string,
        args: string[],
      ) => Promise<{
        status?: string;
        parents?: { sha: string }[];
        commit?: { message?: string; verification?: { verified_at?: string } };
        author?: { login: string; id: number };
      }>;
      mocks.compare.mockImplementation(async (root: string, args: string[]) => {
        const value = await original(root, args);
        const endpoint = args[0]!;
        if (variant === "non-descendant base" && endpoint.includes(`/compare/${f.base}...`)) {
          return { ...value, status: "diverged" };
        }
        if (variant === "wrong merge parent" && endpoint.includes("/git/commits/")) {
          return { ...value, parents: [{ sha: originalHead }, { sha: "e".repeat(40) }] };
        }
        if (endpoint.includes("/commits/") && !endpoint.includes("/git/commits/")) {
          if (variant === "wrong message") {
            return { ...value, commit: { ...value.commit, message: "Unrelated merge" } };
          }
          if (variant === "out-of-window verification") {
            return {
              ...value,
              commit: {
                ...value.commit,
                verification: {
                  ...value.commit?.verification,
                  verified_at: "2000-01-01T00:00:00Z",
                },
              },
            };
          }
          if (variant === "wrong actor") {
            return { ...value, author: { login: "other-agent", id: 1 } };
          }
        }
        return value;
      });
      await expect(f.invoke(advanced.input)).rejects.toThrow();
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "stopped",
        operations: [{ status: "intent" }],
      });
      expect(!JSON.stringify(mocks.compare.mock.calls).includes('"-X"')).toBe(true);
    },
  );

  it("rejects a fresh hosted head change or authority-store mutation before journal CAS", async () => {
    for (const variant of ["head", "authority"] as const) {
      const f = await fixture();
      const advanced = advancedBaseFixture(f);
      if (variant === "head") {
        const first = (await mocks.observe()) as {
          state: string;
          pr: Record<string, unknown>;
        };
        mocks.observe.mockResolvedValueOnce(first).mockResolvedValueOnce({
          ...first,
          pr: { ...first.pr, headSha: "e".repeat(40) },
        });
      } else {
        const first = structuredClone(f.authorityState);
        const changed = structuredClone(f.authorityState);
        changed.grants.pop();
        mocks.authority
          .mockResolvedValueOnce({ state: first })
          .mockResolvedValueOnce({ state: changed });
      }
      await expect(f.invoke(advanced.input)).rejects.toThrow(
        variant === "head" ? "before advanced-base settlement" : "authority changed or expired",
      );
      const stored = await createSupervisorEpisodeStore(f.journalPath).read();
      expect(stored.status).toBe("stopped");
    }
  });

  it.each([
    ["wrong operation", { effect_ref: "provider.pr.update_branch:forged" }],
    ["wrong task", { task_id: "other-task" }],
    ["wrong published head", { observed_head_sha: "e".repeat(40) }],
    ["wrong original base", { original_base_sha: "f".repeat(40) }],
  ])("rejects %s before journal completion", async (_label, delta) => {
    const f = await fixture();
    await expect(f.invoke(delta)).rejects.toThrow();
    expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
      status: "stopped",
      operations: [{ status: "intent" }],
    });
  });

  it("rejects missing USER grant, provider mismatch, ancestry failure, and dirty local state", async () => {
    const scenarios = [
      () => mocks.authority.mockResolvedValue({ state: { grants: [], audit: [] } }),
      () =>
        mocks.observe.mockResolvedValue({
          state: "found",
          pr: { status: "OPEN", headSha: "e".repeat(40) },
        }),
      () => mocks.compare.mockResolvedValue({ status: "diverged" }),
      () => mocks.local.mockResolvedValue("dirty checkout"),
    ];
    for (const arrange of scenarios) {
      vi.clearAllMocks();
      const f: Fixture = await fixture();
      arrange();
      await expect(f.invoke()).rejects.toThrow();
      expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
        status: "stopped",
      });
    }
  });

  it("rejects competing payload grants and mismatched historical audit bindings", async () => {
    const f = await fixture();
    const state = f.authorityState;
    mocks.authority.mockResolvedValue({
      state: { ...state, grants: [f.grant, { ...f.grant, id: "authority-other" }] },
    });
    await expect(f.invoke()).rejects.toThrow("matching retained USER authority");
    mocks.authority.mockResolvedValue({
      state: {
        ...state,
        audit: [{ ...state.audit[0], stateFingerprintDigest: `sha256:${"f".repeat(64)}` }],
      },
    });
    await expect(f.invoke()).rejects.toThrow("matching retained USER authority");
  });

  it("rejects an unrelated hosted descendant with the same old base", async () => {
    const f = await fixture();
    mocks.compare.mockImplementation((_root: string, args: string[]) => {
      if (args[0]!.includes("/git/commits/"))
        return Promise.resolve({
          sha: observedHead,
          parents: [{ sha: originalHead }, { sha: "f".repeat(40) }],
        });
      const [older] = args[0]!.split("/compare/")[1]!.split("...");
      return Promise.resolve({
        status: "ahead",
        base_commit: { sha: older },
        merge_base_commit: { sha: older },
      });
    });
    await expect(f.invoke()).rejects.toThrow("exact USER attestation");
  });

  it("rejects operator evidence with a mismatched digest", async () => {
    const f = await fixture();
    await expect(
      f.invoke({
        evidence: [
          { ref: "hosted-pr-observation", content: "forged", digest: f.input.evidence[0]!.digest },
        ],
      }),
    ).rejects.toThrow("operator evidence content digest mismatch");
  });

  it("leaves unrelated mutating intents stopped", async () => {
    const f = await fixture("workflow-operation:pr.open");
    await expect(f.invoke()).rejects.toThrow(
      "exact stopped provider operation is absent or changed",
    );
    expect(await createSupervisorEpisodeStore(f.journalPath).read()).toMatchObject({
      status: "stopped",
      operations: [{ status: "intent" }],
    });
  });

  it("rejects a concurrent journal change at compare-and-swap", async () => {
    const f = await fixture();
    mocks.local.mockImplementation(async () => {
      const concurrent = createSupervisorExecutionEpisodeJournal({
        task_id: taskId,
        task_revision: 2,
        state_fingerprint_digest: `sha256:${"9".repeat(64)}`,
        budget,
      });
      await createSupervisorEpisodeStore(f.journalPath).write(concurrent);
      return null;
    });
    await expect(f.invoke()).rejects.toThrow("supervisor journal changed during recovery");
  });
});
