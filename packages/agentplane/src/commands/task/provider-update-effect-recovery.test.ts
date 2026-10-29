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
import type * as UpdateProof from "../pr/provider-update-verification-proof.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import { reconcileProviderUpdateEffect } from "./provider-update-effect-recovery.js";

const mocks = vi.hoisted(() => ({
  retainProof: vi
    .fn()
    .mockImplementation(
      (opts: Parameters<typeof UpdateProof.retainProviderUpdateVerificationProof>[0]) =>
        Promise.resolve(opts.completion),
    ),
  observe: vi.fn(),
  compare: vi.fn(),
  local: vi.fn(),
  authority: vi.fn(),
}));
vi.mock("../pr/provider-update-verification-proof.js", () => ({
  retainProviderUpdateVerificationProof: mocks.retainProof,
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

async function fixture(
  authorityRef = "workflow-operation:provider.pr.update_branch",
  realMerge = false,
  advanceBase = false,
) {
  let fixtureOriginalHead = originalHead;
  let fixtureObservedHead = observedHead;
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
  let base = execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  if (realMerge) {
    const git = (...args: string[]) =>
      execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
    git("config", "user.name", "Fixture");
    git("config", "user.email", "fixture@example.test");
    git("remote", "add", "origin", identity.targetUrl);
    git("checkout", "-b", branch);
    await writeFile(path.join(root, "own.ts"), "task");
    git("add", ".");
    git("commit", "-m", "task");
    fixtureOriginalHead = git("rev-parse", "HEAD");
    git("checkout", "main");
    await writeFile(path.join(root, "foreign.ts"), "canonical");
    git("add", ".");
    git("commit", "-m", "canonical");
    base = git("rev-parse", "HEAD");
    git("checkout", branch);
    git("merge", "--no-ff", "main", "-m", "provider update");
    fixtureObservedHead = git("rev-parse", "HEAD");
  }
  let currentBase = base;
  if (advanceBase) {
    const git = (...args: string[]) =>
      execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
    git("checkout", "main");
    await writeFile(path.join(root, "next-canonical.ts"), "later canonical change");
    git("add", "next-canonical.ts");
    git("commit", "-m", "canonical advanced after interrupted update");
    currentBase = git("rev-parse", "HEAD");
    git("checkout", branch);
  }
  execFileSync("git", ["update-ref", "refs/remotes/origin/main", currentBase], { cwd: root });
  const currentFingerprint = `sha256:${"c".repeat(64)}`;
  const originalFingerprint = buildStateFingerprint({
    task_id: taskId,
    task_revision: 1,
    git_head: fixtureOriginalHead,
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
    expectedHeadSha: fixtureOriginalHead,
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
      baseSha: currentBase,
      headSha: fixtureObservedHead,
      identity,
    },
  });
  mocks.compare.mockImplementation((_root: string, args: string[]) => {
    if (args[0]!.includes("/git/commits/"))
      return Promise.resolve({
        sha: fixtureObservedHead,
        parents: [{ sha: fixtureOriginalHead }, { sha: base }],
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
    original_head_sha: fixtureOriginalHead,
    original_base_sha: base,
    observed_head_sha: fixtureObservedHead,
    operator: {
      kind: "operator_decision",
      actor: "release operator",
      decision_ref: "release-0713-reconcile-observed-update",
      observed_at: new Date().toISOString(),
    },
    evidence: [
      {
        ref: "hosted-pr-observation",
        content: `PR 42 head ${fixtureObservedHead} is the provider-published update merge`,
        digest: digestSupervisorEpisodeValue(
          `PR 42 head ${fixtureObservedHead} is the provider-published update merge`,
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
  return { root, journalPath, input, invoke, grant, authorityState, command, params, currentBase };
}

describe("interrupted provider update recovery", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.retainProof.mockImplementation(
      (opts: Parameters<typeof UpdateProof.retainProviderUpdateVerificationProof>[0]) =>
        Promise.resolve(opts.completion),
    );
  });
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
    await expect(f.invoke()).rejects.toThrow("exact original-head/base merge commit");
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
  it.each([
    [false, false],
    [true, false],
    [false, true],
    [true, true],
  ])(
    "publishes usable native proof during real-Git recovery, provisional=%s, advanced base=%s",
    async (provisional, advanceBase) => {
      const f = await fixture("workflow-operation:provider.pr.update_branch", true, advanceBase);
      const actual = await vi.importActual<typeof UpdateProof>(
        "../pr/provider-update-verification-proof.js",
      );
      mocks.retainProof.mockImplementation(actual.retainProviderUpdateVerificationProof);
      if (provisional)
        await actual.retainProviderUpdateVerificationProof({
          command: f.command,
          params: f.params,
          authority_digest: f.input.precondition_fingerprint_digest,
          observed_head_sha: f.input.observed_head_sha,
          completion: {
            status: "succeeded",
            observed_postconditions: [`provider_update_head:${f.input.observed_head_sha}`],
            exit_code: 0,
          },
        });
      const before = await actual.inheritedProviderUpdatePaths({
        command: f.command,
        task_id: taskId,
        frozen_base: execFileSync(
          "git",
          ["merge-base", f.params.expectedHeadSha, f.params.expectedBaseSha],
          { cwd: f.root, encoding: "utf8" },
        ).trim(),
        evaluated_sha: f.input.observed_head_sha,
        changed_paths: ["foreign.ts", "next-canonical.ts"],
        workflow_dir: ".agentplane/tasks",
        tasks_path: ".agentplane/tasks.json",
      });
      expect(before).toEqual([]);
      await f.invoke();
      const inherited = await actual.inheritedProviderUpdatePaths({
        command: f.command,
        task_id: taskId,
        frozen_base: execFileSync(
          "git",
          ["merge-base", f.params.expectedHeadSha, f.params.expectedBaseSha],
          { cwd: f.root, encoding: "utf8" },
        ).trim(),
        evaluated_sha: f.input.observed_head_sha,
        changed_paths: ["foreign.ts", "next-canonical.ts"],
        workflow_dir: ".agentplane/tasks",
        tasks_path: ".agentplane/tasks.json",
      });
      expect(inherited).toEqual(["foreign.ts"]);
      if (advanceBase)
        expect(() =>
          execFileSync(
            "git",
            ["merge-base", "--is-ancestor", f.currentBase, f.input.observed_head_sha],
            {
              cwd: f.root,
              stdio: "ignore",
            },
          ),
        ).toThrow();
      expect(mocks.compare.mock.calls.every((call) => !(call[1] as string[]).includes("-X"))).toBe(
        true,
      );
    },
  );
});
