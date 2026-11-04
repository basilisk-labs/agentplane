import { gitRevParse } from "@agentplaneorg/core/git";
import { hasAuthenticatedCompletedNativeReview } from "./kernel-completed-native-review.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import { qualityReviewIsFreshForHead } from "../shared/quality-review-retirement.js";
import { hasAcceptedVerificationRecord } from "../shared/task-verification-records.js";
import { mkdtemp, writeFile, rename } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { vi, expect, type Mock } from "vitest";
import {
  buildStateFingerprint,
  reopenCompletedSupervisorExecutionEpisodeAfterStaleState,
  validateSupervisorExecutionEpisodeJournal,
  createSupervisorExecutionEpisodeJournal,
  digestSupervisorEpisodeValue,
  recoverSupervisorExecutionEpisodeJournal,
  completeSupervisorExecutionEpisode,
  startSupervisorExecutionEpisode,
} from "@agentplaneorg/core/schemas";
import { loadCommandContext } from "../shared/task-backend.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import type * as UpdateLocal from "../pr/provider-update-branch-local.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { PrFlowStatusReport } from "../pr/flow-status.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { retainProviderUpdateVerificationProof } from "../pr/provider-update-verification-proof.js";
import {
  prepareAgentWorkOrder,
  requirePreparedAgentWorkOrder,
} from "../../runner/usecases/agent-work-order.js";
import {
  issueExternalAgentExchange,
  acceptExternalAgentResult,
} from "./external-agent-supervisor.js";
import { reconcileProviderUpdateEffect } from "./provider-update-effect-recovery.js";

export type GlabRecoveryCall = { endpoint: string; hostname: string; method?: string };
type RecoveryFixtureDependencies = {
  canonicalRouteTask: (root: string, full?: boolean) => Promise<CommandContext>;
  ownedRoots: string[];
  mocks: {
    glab: Mock<(call: GlabRecoveryCall) => unknown>;
    authority: Mock;
    observe: Mock;
    compare: Mock;
    local: Mock;
    flow: Mock<() => Promise<PrFlowStatusReport>>;
  };
};

export const taskId = "202610251417-RECVR1";
export const branch = `task/${taskId}/example`;
export const originalHead = "a".repeat(40);
export const observedHead = "b".repeat(40);
const identity = {
  provider: "github" as const,
  hostname: "github.com",
  remote: "origin",
  sourceProject: "example/repo",
  targetProject: "example/repo",
  sourceUrl: "https://github.com/example/repo.git",
  targetUrl: "https://github.com/example/repo.git",
};
export const budget = {
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
export async function providerUpdateRecoveryFixture(
  dependencies: RecoveryFixtureDependencies,
  authorityRef = "workflow-operation:provider.pr.update_branch",
  realMerge = false,
  advanceBase = false,
  provider: "github" | "gitlab" = "github",
  unaligned = false,
  productionRoute = false,
  validation?: {
    emptyBase?: boolean;
    full?: boolean;
    normal?: boolean;
    adopted?: boolean;
    reconcile?: boolean;
    beforeUpdate?: (root: string, command: CommandContext) => Promise<void>;
  },
) {
  const { mocks, canonicalRouteTask, ownedRoots } = dependencies;
  let fixtureOriginalHead = originalHead;
  let fixtureObservedHead = observedHead;
  const root = await mkdtemp(path.join(os.tmpdir(), "provider-recovery-suite-"));
  ownedRoots.push(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
  const fixtureIdentity = {
    ...identity,
    provider,
    hostname: provider === "gitlab" ? "gitlab.example.test" : identity.hostname,
    sourceProject: provider === "gitlab" ? "group/sub/repo" : identity.sourceProject,
    targetProject: provider === "gitlab" ? "group/sub/repo" : identity.targetProject,
  };
  const prUrl =
    provider === "gitlab"
      ? `https://${fixtureIdentity.hostname}/${fixtureIdentity.targetProject}/-/merge_requests/42`
      : "https://github.com/example/repo/pull/42";
  git("init", "--template=", "--quiet", "--initial-branch=main");
  git("config", "user.name", "Fixture");
  git("config", "user.email", "fixture@example.test");
  git("commit", "--allow-empty", "-m", "init");
  let base = git("rev-parse", "HEAD");
  const routeCommand = productionRoute ? await canonicalRouteTask(root, validation?.full) : null;
  if (realMerge) {
    git("remote", "add", "origin", identity.targetUrl);
    git("checkout", "-b", branch);
    await writeFile(path.join(root, "own.ts"), "task");
    git("add", ".");
    git("commit", "-m", "task");
    if (validation?.beforeUpdate) await validation.beforeUpdate(root, routeCommand!);
    fixtureOriginalHead = git("rev-parse", "HEAD");
    git("checkout", "main");
    if (!validation?.emptyBase) await writeFile(path.join(root, "foreign.ts"), "canonical");
    git("add", ".");
    git("commit", "--allow-empty", "-m", "canonical");
    base = git("rev-parse", "HEAD");
    git("checkout", branch);
    git("merge", "--no-ff", "main", "-m", "provider update");
    fixtureObservedHead = git("rev-parse", "HEAD");
  }
  let currentBase = base;
  if (advanceBase) {
    git("checkout", "main");
    await writeFile(path.join(root, "next-canonical.ts"), "later canonical change");
    git("add", "next-canonical.ts");
    git("commit", "-m", "canonical advanced after interrupted update");
    currentBase = git("rev-parse", "HEAD");
    git("checkout", branch);
  }
  if (provider === "gitlab" || (realMerge && validation?.full)) {
    if (!realMerge) throw new Error("GitLab recovery requires a real H/R merge fixture");
    const remoteRoot = await mkdtemp(path.join(os.tmpdir(), "gitlab-recovery-host-"));
    ownedRoots.push(remoteRoot);
    const remote = path.join(remoteRoot, "host.git");
    git("clone", "--bare", root, remote);
    fixtureIdentity.sourceUrl = remote;
    fixtureIdentity.targetUrl = remote;
    git("remote", "set-url", "origin", remote);
    git("fetch", "--no-tags", "origin");
    git("branch", "--set-upstream-to", `origin/${branch}`, branch);
    if (unaligned) {
      git("checkout", "--detach", fixtureOriginalHead);
      git("update-ref", `refs/heads/${branch}`, fixtureOriginalHead, fixtureObservedHead);
      git("checkout", branch);
    }
    mocks.glab.mockImplementation((call: GlabRecoveryCall) => {
      if (call.hostname !== fixtureIdentity.hostname || (call.method && call.method !== "GET"))
        throw new Error("Unexpected provider host or write during recovery");
      const endpoint = `projects/${encodeURIComponent(fixtureIdentity.targetProject)}`;
      if (call.endpoint === endpoint)
        return { id: 9, path_with_namespace: fixtureIdentity.targetProject };
      if (call.endpoint === `${endpoint}/repository/branches/main`)
        return { name: "main", commit: { id: currentBase } };
      if (call.endpoint.startsWith(`${endpoint}/repository/commits/`))
        return { id: fixtureObservedHead, parent_ids: [fixtureOriginalHead, base] };
      if (call.endpoint.startsWith(`${endpoint}/repository/merge_base?`)) {
        const refs = new URLSearchParams(call.endpoint.split("?")[1]).getAll("refs[]");
        return { id: git("merge-base", ...refs) };
      }
      throw new Error("Unexpected recovery endpoint");
    });
  }
  git("update-ref", "refs/remotes/origin/main", currentBase);
  let currentFingerprint = `sha256:${"c".repeat(64)}`;
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
    identity: fixtureIdentity,
    prNumber: 42,
    branch,
    baseBranch: "main",
    expectedHeadSha: fixtureOriginalHead,
    expectedBaseSha: base,
    ...(validation?.reconcile ? { reconcileHeadSha: fixtureObservedHead } : {}),
  };
  const payloadDigest = `sha256:${operationPayloadDigest({
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params,
  })}`;
  const effectRef = `provider.pr.update_branch:${taskId}:${originalFingerprint.digest}:${payloadDigest.slice(7)}`;
  const journalScope = { git_root: root, task_id: taskId };
  const journalPath = await resolveSupervisorExecutionEpisodePath(journalScope);
  const retainedJournal = await createSupervisorEpisodeStore(journalPath).read();
  const created = retainedJournal
    ? reopenCompletedSupervisorExecutionEpisodeAfterStaleState({
        journal: recoverSupervisorExecutionEpisodeJournal({
          journal: validateSupervisorExecutionEpisodeJournal(retainedJournal),
          state_fingerprint_digest: originalFingerprint.digest,
        }),
        state_fingerprint_digest: originalFingerprint.digest,
      })
    : createSupervisorExecutionEpisodeJournal({
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
    recovery_context:
      provider === "gitlab"
        ? {
            schema_version: 1,
            kind: validation?.adopted ? "adopted_provider_effect" : "gitlab_provider_update_branch",
            task_id: taskId,
          }
        : undefined,
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
  await createSupervisorEpisodeStore(journalPath).write(
    validation?.normal ? started.journal : stopped,
  );
  const startedAt = Date.parse(started.journal.operations.at(-1)!.started_at);
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
    issuedAt: new Date(startedAt - 1000).toISOString(),
    expiresAt: new Date(startedAt + 60_000).toISOString(),
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
  mocks.authority.mockResolvedValue({ state: authorityState, source: "git_common_dir" });
  const providerPr = (headSha = fixtureObservedHead) => ({
    provider,
    identity: fixtureIdentity,
    status: "OPEN" as const,
    prNumber: 42,
    prUrl,
    headRef: branch,
    base: "main",
    baseSha: currentBase,
    headSha,
    mergedAt: null,
    mergeCommit: null,
    mergeability: {
      state: "not_conflicting" as const,
      mergeable: true,
      providerState: advanceBase ? "need_rebase" : "mergeable",
    },
  });
  mocks.observe.mockResolvedValue({ state: "found", pr: providerPr() });
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
  if (productionRoute) {
    const actual = await vi.importActual<typeof UpdateLocal>(
      "../pr/provider-update-branch-local.js",
    );
    mocks.local.mockImplementation(actual.validateProviderUpdateLocalState);
    // Only provider-flow I/O is replaced. The checkout, native Task, route reducer,
    // policy/authority fingerprint and stabilization all use production readers.
    mocks.flow.mockImplementation(() => {
      const head = git("rev-parse", "HEAD");
      const upstream = git("rev-parse", `refs/remotes/origin/${branch}`);
      const hosted = validation?.full ? upstream : fixtureObservedHead;
      return Promise.resolve({
        task: { id: taskId, status: "DONE", verification: "ok" },
        branch: { name: branch, headSha: head, metaHeadSha: fixtureOriginalHead },
        pr: {
          state: "OPEN",
          source: "lookup",
          provider,
          prNumber: 42,
          prUrl,
          base: "main",
          headSha: hosted,
          mergeCommit: null,
        },
        providerObservation: { state: "found", pr: providerPr(hosted) },
        publication: {
          state: head === hosted ? "aligned" : "hosted_mismatch",
          localHeadSha: head,
          hostedHeadSha: hosted,
          upstreamRef: `origin/${branch}`,
          upstreamHeadSha: upstream,
        },
        hostedChecks: {
          checked: true,
          failing: 0,
          pending: 0,
          passing: 1,
          total: 1,
          missingRequired: [],
          rows: [{ name: "ci", state: "SUCCESS" }],
        },
        reviewThreads: { checked: false, reason: "not needed for recovery proof" },
        closeTail: { state: "not_applicable", reason: "implementation MR is open" },
        queue: { present: false },
        handoff: { present: false },
        nextAction: "",
      } satisfies PrFlowStatusReport);
    });
  }
  const route = {
    task: { id: taskId },
    workspace: { taskWorktreePath: root, baseCheckoutPath: root, prBranch: branch },
    workflowStep: {
      id: "agent.implementation_rework",
      preconditionFingerprint: { digest: currentFingerprint },
    },
  } as TaskRouteDecision;
  const command =
    routeCommand ??
    ({
      resolvedProject: { gitRoot: root },
      memo: {},
      taskBackend: { getTask: vi.fn().mockResolvedValue({ id: taskId }) },
    } as unknown as CommandContext);
  const decide = async () => {
    if (productionRoute)
      return await buildTaskRouteDecision({
        cwd: root,
        taskId,
        includeRemote: true,
        freshHead: true,
      });
    if (provider !== "gitlab") return route;
    const head = git("rev-parse", "HEAD");
    const fingerprint =
      !unaligned || head === fixtureOriginalHead ? currentFingerprint : `sha256:${"d".repeat(64)}`;
    return {
      ...route,
      workflowStep: {
        ...route.workflowStep,
        preconditionFingerprint: {
          ...originalFingerprint,
          digest: fingerprint,
          git_head: head,
          components: {
            ...originalFingerprint.components,
            git: {
              state: "present",
              source: "fixture",
              digest: digestSupervisorEpisodeValue(head),
              reason_code: null,
            },
          },
        },
      },
    } as TaskRouteDecision;
  };
  if (productionRoute) {
    const decision = await decide();
    currentFingerprint = decision.workflowStep.preconditionFingerprint.digest;
  }
  const effectEvidence = `PR 42 head ${fixtureObservedHead} is the provider-published update merge`;
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
    identity: fixtureIdentity,
    pr_number: 42,
    pr_url: prUrl,
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
        content: effectEvidence,
        digest: digestSupervisorEpisodeValue(effectEvidence),
      },
    ],
  };
  const inputPath = path.join(root, ".git", "operator-recovery-input.json");
  const invoke = async (delta: Record<string, unknown> = {}) => {
    await writeFile(inputPath, JSON.stringify({ ...input, ...delta }));
    return await reconcileProviderUpdateEffect({
      command,
      task_id: taskId,
      input_path: inputPath,
      decide,
    });
  };
  return {
    root,
    journalPath,
    input,
    invoke,
    grant,
    authorityState,
    command,
    params,
    currentBase,
    decide,
    completeNormally: async () => {
      const completion = {
        status: "succeeded",
        exit_code: 0,
        observed_postconditions: [`provider_update_head:${fixtureObservedHead}`],
      };
      const retained = await retainProviderUpdateVerificationProof({
        command,
        params,
        authority_digest: originalFingerprint.digest,
        observed_head_sha: fixtureObservedHead,
        completion,
      });
      await createSupervisorEpisodeStore(journalPath).write(
        completeSupervisorExecutionEpisode({
          journal: started.journal,
          operation_key: started.operation_key,
          result: retained,
        }),
      );
    },
  };
}

export async function acceptValidationFloorReview(root: string) {
  const command = await loadCommandContext({ cwd: root, rootOverride: null });
  const prepared = requirePreparedAgentWorkOrder(
    await prepareAgentWorkOrder({
      command_ctx: command,
      cwd: root,
      task_id: taskId,
      include_remote: true,
    }),
  );
  expect(prepared.work_order.role, JSON.stringify(prepared.route_decision.workflowStep)).toBe(
    "EVALUATOR",
  );
  const issued = await issueExternalAgentExchange({
    ctx: { cwd: root },
    command,
    decision: prepared.route_decision,
    work_order: prepared.work_order,
    replace_failed_operation: false,
  });
  if (!issued) throw new Error("Expected native EVALUATOR exchange");
  await writeFile(
    issued.paths.result,
    JSON.stringify({
      work_order_id: issued.work_order.work_order_id,
      status: "completed",
      summary: "Current implementation reviewed.",
      findings: ["The current combined implementation meets the fixture contract."],
      uncertainty: [],
      review: { verdict: "pass", missing_tests: [], hidden_assumptions: [], residual_risks: [] },
    }),
  );
  await acceptExternalAgentResult({
    ctx: { cwd: root },
    command,
    task_id: taskId,
    result_path: issued.paths.result,
    include_remote: true,
  });
}

export async function validationFloorGates(root: string, snapshotOnly = false, ref?: string) {
  const ctx = await loadCommandContext({ cwd: root, rootOverride: null });
  const task = (await ctx.taskBackend.getTask(taskId))!;
  if (task.quality_review?.state === "pass")
    expect(await hasAuthenticatedCompletedNativeReview(ctx, task)).toBe(true);
  const head = ref ?? (await gitRevParse(root, ["HEAD"]));
  const execution = await resolveTaskExecutionContext({
    ctx,
    tasks: [task],
    primaryTaskId: taskId,
  });
  const scope = {
    gitRoot: root,
    workflowDir: ctx.config.paths.workflow_dir,
    workflowMode: "branch_pr" as const,
  };
  const evaluated = await resolveQualityReviewTargetSha({
    ...scope,
    taskId,
    headSha: head,
    previousEvaluatedSha: task.quality_review?.evaluated_sha,
  });
  const taskRoot = path.join(root, ctx.config.paths.workflow_dir, taskId);
  const verificationDirectory = path.join(taskRoot, "verification");
  if (snapshotOnly) await rename(verificationDirectory, `${verificationDirectory}.saved`);
  let verification;
  try {
    verification = await hasAcceptedVerificationRecord({
      taskRoot,
      task,
      evaluatedSha: evaluated,
      targetContext: { ...scope, execution },
      snapshotRef: head,
    });
  } finally {
    if (snapshotOnly) await rename(`${verificationDirectory}.saved`, verificationDirectory);
  }
  const review = await qualityReviewIsFreshForHead({
    ctx,
    task,
    headSha: head,
    batchOwnership: { role: "none" },
    expectedState: "pass",
    workflowMode: "branch_pr",
  });
  return { verification, review, task, head, evaluated };
}
