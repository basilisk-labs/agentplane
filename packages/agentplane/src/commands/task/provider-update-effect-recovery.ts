import {
  providerUpdateBranchParamsSchema,
  retainProviderUpdateVerificationProof,
} from "../pr/provider-update-verification-proof.js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  digestSupervisorEpisodeValue,
  isoTimestampSchema,
  reopenSupervisorExecutionEpisodeAfterEffectEvidence,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { gitRevParse } from "@agentplaneorg/core/git";

import { CliError } from "../../shared/errors.js";
import { observeExistingChangeRequestByNumber } from "../pr/internal/change-request-provider.js";
import { runGhApiJson } from "../pr/internal/gh-api.js";
import {
  reconcileProviderUpdateLocalHead,
  validateProviderUpdateLocalState,
} from "../pr/provider-update-branch-local.js";
import { readGitLabCurrentTargetHead } from "../pr/internal/sync-gitlab.js";
import { verifyGitLabProviderUpdate } from "../pr/provider-update-branch-gitlab.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import { loadSideEffectAuthorityState } from "../shared/side-effect-authority-store.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import {
  publishGitLabJournalTransition,
  withGitLabJournalLease,
} from "../shared/supervisor-execution-journal.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

const digest = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const sha = z.string().regex(/^[0-9a-f]{40}$/u);
const nonempty = z.string().trim().min(1);
const identitySchema = z.strictObject({
  provider: z.enum(["github", "gitlab"]),
  hostname: nonempty,
  remote: nonempty,
  sourceProject: nonempty,
  targetProject: nonempty,
  sourceUrl: nonempty,
  targetUrl: nonempty,
});

const providerUpdateEffectResolutionSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("provider_update_branch_effect_resolution"),
  task_id: nonempty,
  repository_root: nonempty,
  journal_digest: digest,
  operation_key: digest,
  precondition_fingerprint_digest: digest,
  effect_ref: nonempty,
  grant_id: nonempty,
  current_state_fingerprint: digest,
  identity: identitySchema,
  pr_number: z.number().int().positive(),
  pr_url: nonempty,
  branch: nonempty,
  base_branch: nonempty,
  original_head_sha: sha,
  original_base_sha: sha,
  observed_head_sha: sha,
  operator: z.strictObject({
    kind: z.literal("operator_decision"),
    actor: nonempty.refine(
      (value) => !/^(agent|planner|executor|evaluator|coder|tester|orchestrator)$/iu.test(value),
    ),
    decision_ref: nonempty,
    observed_at: isoTimestampSchema(),
  }),
  evidence: z
    .array(
      z.strictObject({
        ref: nonempty,
        content: z.string().refine((value) => value.trim().length > 0),
        digest,
      }),
    )
    .min(1),
});

type ProviderUpdateEffectResolution = z.infer<typeof providerUpdateEffectResolutionSchema>;
type GithubCompareResponse = {
  status?: string | null;
  base_commit?: { sha?: string | null } | null;
  merge_base_commit?: { sha?: string | null } | null;
};
type GithubCommitResponse = { sha?: string | null; parents?: { sha?: string | null }[] | null };

function reject(detail: string): never {
  throw new CliError({
    code: "E_VALIDATION",
    message: `Provider update effect recovery: ${detail}`,
  });
}

async function provesHostedAncestor(
  root: string,
  project: string,
  ancestor: string,
  descendant: string,
): Promise<boolean> {
  if (ancestor === descendant) return true;
  const observed = await runGhApiJson<GithubCompareResponse>(root, [
    `repos/${project}/compare/${encodeURIComponent(ancestor)}...${encodeURIComponent(descendant)}`,
  ]);
  return (
    observed.status?.toLowerCase() === "ahead" &&
    observed.base_commit?.sha === ancestor &&
    observed.merge_base_commit?.sha === ancestor
  );
}

function originalOperationParams(resolution: ProviderUpdateEffectResolution, identity: unknown) {
  const expected = {
    taskId: resolution.task_id,
    identity: resolution.identity,
    prNumber: resolution.pr_number,
    branch: resolution.branch,
    baseBranch: resolution.base_branch,
    expectedHeadSha: resolution.original_head_sha,
    expectedBaseSha: resolution.original_base_sha,
  };
  if (resolution.identity.provider !== "gitlab") return expected;
  const retained = z
    .object({
      id: z.literal("provider.pr.update_branch"),
      type: z.literal("provider_update_branch"),
      params: providerUpdateBranchParamsSchema,
    })
    .safeParse(identity);
  if (!retained.success) reject("the retained original operation parameters are unproven.");
  const { reconcileHeadSha, ...baseParams } = retained.data.params;
  if (digestSupervisorEpisodeValue(baseParams) !== digestSupervisorEpisodeValue(expected))
    reject("the retained original operation parameters differ from operator input.");
  if (reconcileHeadSha && reconcileHeadSha !== resolution.observed_head_sha)
    reject("the retained reconciliation head differs from the observed head.");
  return retained.data.params;
}

function originalOperationDigest(params: z.infer<typeof providerUpdateBranchParamsSchema>): string {
  return `sha256:${operationPayloadDigest({
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params,
  })}`;
}

function gitLabRecoveryControls(decision: TaskRouteDecision) {
  return {
    task: decision.task,
    workflowMode: decision.workflowMode ?? null,
    batchOwnership: decision.batchOwnership ?? null,
    approvalPolicy: decision.approval?.runtime ?? null,
    workspace: {
      root: decision.workspace.root ?? null,
      branch: decision.workspace.branch ?? null,
      baseBranch: decision.workspace.baseBranch ?? null,
      prBranch: decision.workspace.prBranch ?? null,
      checkoutRole: decision.workspace.checkoutRole ?? null,
      baseCheckoutPath: decision.workspace.baseCheckoutPath ?? null,
      taskWorktreePath: decision.workspace.taskWorktreePath ?? null,
    },
  };
}

export async function reconcileProviderUpdateEffect(opts: {
  command: CommandContext;
  task_id: string;
  input_path: string;
  decide: () => Promise<TaskRouteDecision>;
}): Promise<{
  task_id: string;
  operation_key: string;
  verdict: "applied";
  observed_head_sha: string;
  next_step: string;
}> {
  const parsed = providerUpdateEffectResolutionSchema.safeParse(
    JSON.parse(await readFile(opts.input_path, "utf8")),
  );
  if (!parsed.success) reject(`invalid operator input: ${parsed.error.message}`);
  const resolution = parsed.data;
  if (resolution.task_id !== opts.task_id) reject("the input names another task.");
  for (const evidence of resolution.evidence) {
    if (digestSupervisorEpisodeValue(evidence.content) !== evidence.digest)
      reject("operator evidence content digest mismatch.");
  }
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: opts.command.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
    task_id: opts.task_id,
  });
  const run = async () => {
    const store = createSupervisorEpisodeStore(journalPath);
    const journal = validateSupervisorExecutionEpisodeJournal(await store.read());
    const operation = journal.operations.at(-1);
    if (
      journal.task_id !== opts.task_id ||
      journal.digest !== resolution.journal_digest ||
      journal.status !== "stopped" ||
      journal.stop?.reason !== "effect_in_doubt" ||
      journal.stop.operation_key !== resolution.operation_key ||
      operation?.operation_key !== resolution.operation_key ||
      operation.status !== "intent" ||
      operation.kind !== "cli_operation" ||
      operation.authority_ref !== "workflow-operation:provider.pr.update_branch" ||
      operation.authority_digest !== resolution.precondition_fingerprint_digest ||
      operation.precondition_fingerprint_digest !== resolution.precondition_fingerprint_digest ||
      operation.effect_ref !== resolution.effect_ref
    ) {
      reject("the exact stopped provider operation is absent or changed.");
    }
    const params = originalOperationParams(resolution, operation.recovery?.operation_identity);
    const operationDigest = originalOperationDigest(params);
    const observedAt = Date.parse(resolution.operator.observed_at);
    if (observedAt < Date.parse(operation.started_at) || observedAt > Date.now())
      reject("operator evidence predates the intent or is future-dated.");
    if (
      resolution.effect_ref !==
        `provider.pr.update_branch:${opts.task_id}:${resolution.precondition_fingerprint_digest}:${operationDigest.slice(7)}` ||
      resolution.original_head_sha === resolution.observed_head_sha
    ) {
      reject("the original operation identity or distinct published head is unproven.");
    }
    const task = await opts.command.taskBackend.getTask(opts.task_id);
    if (!task) reject("the task record is unavailable.");
    const authority = await loadSideEffectAuthorityState({
      gitRoot: opts.command.resolvedProject.gitRoot,
      commonGitDir,
      taskId: opts.task_id,
      task,
    });
    const eligibleGrants =
      authority.state?.grants.filter(
        (item) =>
          item.actor === "USER" &&
          item.operationId === "provider.pr.update_branch" &&
          item.operationDigest === operationDigest &&
          item.policyRule === "workflow.external_high_risk" &&
          Date.parse(item.issuedAt) <= Date.parse(operation.started_at) &&
          Date.parse(item.expiresAt) >= Date.parse(operation.started_at),
      ) ?? [];
    const grant = eligibleGrants[0];
    if (
      eligibleGrants.length !== 1 ||
      grant?.id !== resolution.grant_id ||
      !authority.state?.audit.some(
        (entry) =>
          entry.authorityDigest === grant.digest &&
          entry.actor === grant.actor &&
          entry.policyRule === grant.policyRule &&
          entry.operationId === grant.operationId &&
          entry.operationDigest === grant.operationDigest &&
          entry.stateFingerprintDigest === grant.stateFingerprintDigest &&
          entry.outcome === "approved" &&
          Date.parse(entry.at) <= Date.parse(operation.started_at),
      )
    ) {
      reject("the original operation has no matching retained USER authority.");
    }
    const retainedAuthorityDigest = digestSupervisorEpisodeValue({
      source: authority.source,
      state: authority.state,
    });
    const current = await opts.decide();
    const checkout = current.workspace.taskWorktreePath;
    if (
      current.task.id !== opts.task_id ||
      current.workflowStep.preconditionFingerprint.digest !==
        resolution.current_state_fingerprint ||
      !checkout ||
      path.resolve(current.workspace.baseCheckoutPath ?? opts.command.resolvedProject.gitRoot) !==
        path.resolve(resolution.repository_root) ||
      current.workspace.prBranch !== resolution.branch
    ) {
      reject("the authoritative task route or checkout changed.");
    }
    const observed = await observeExistingChangeRequestByNumber({
      gitRoot: resolution.repository_root,
      prNumber: resolution.pr_number,
      branch: resolution.branch,
      baseBranch: resolution.base_branch,
    });
    if (observed.state !== "found") reject("fresh provider PR evidence is unavailable.");
    const pr = observed.pr;
    if (
      pr.provider !== resolution.identity.provider ||
      pr.status !== "OPEN" ||
      pr.prNumber !== resolution.pr_number ||
      pr.prUrl !== resolution.pr_url ||
      pr.headRef !== resolution.branch ||
      pr.base !== resolution.base_branch ||
      pr.headSha !== resolution.observed_head_sha ||
      pr.identity.provider !== resolution.identity.provider ||
      pr.identity.hostname !== resolution.identity.hostname ||
      pr.identity.remote !== resolution.identity.remote ||
      pr.identity.sourceProject !== resolution.identity.sourceProject ||
      pr.identity.targetProject !== resolution.identity.targetProject ||
      pr.identity.sourceUrl !== resolution.identity.sourceUrl ||
      pr.identity.targetUrl !== resolution.identity.targetUrl ||
      !pr.baseSha
    ) {
      reject("provider PR identity, head, or base changed.");
    }
    const request = {
      gitRoot: resolution.repository_root,
      worktreePath: checkout,
      identity: resolution.identity,
      prNumber: resolution.pr_number,
      branch: resolution.branch,
      baseBranch: resolution.base_branch,
      expectedHeadSha: resolution.original_head_sha,
      expectedBaseSha: resolution.original_base_sha,
    };
    const observedBase =
      pr.provider === "gitlab"
        ? await readGitLabCurrentTargetHead({
            gitRoot: resolution.repository_root,
            identity: pr.identity,
            baseBranch: resolution.base_branch,
          })
        : pr.baseSha!;
    const project = resolution.identity.targetProject;
    if (pr.provider === "gitlab") {
      const before = await validateProviderUpdateLocalState(request, [
        resolution.original_head_sha,
        resolution.observed_head_sha,
      ]);
      if (before) reject(`local task state changed before recovery: ${before}`);
      if (
        !(await verifyGitLabProviderUpdate({
          request,
          observedHeadSha: resolution.observed_head_sha,
          observedBaseSha: observedBase,
          allowAdvancedBase: true,
        }))
      )
        reject("the exact hosted GitLab H/R merge and current-base ancestry are unproven.");
    } else {
      const hostedCommit = await runGhApiJson<GithubCommitResponse>(resolution.repository_root, [
        `repos/${project}/git/commits/${resolution.observed_head_sha}`,
      ]);
      if (
        hostedCommit.sha !== resolution.observed_head_sha ||
        hostedCommit.parents?.length !== 2 ||
        hostedCommit.parents[0]?.sha !== resolution.original_head_sha ||
        hostedCommit.parents[1]?.sha !== resolution.original_base_sha
      ) {
        reject("the published head is not the exact original-head/base merge commit.");
      }
      if (
        !(await provesHostedAncestor(
          resolution.repository_root,
          project,
          resolution.original_head_sha,
          resolution.observed_head_sha,
        )) ||
        !(await provesHostedAncestor(
          resolution.repository_root,
          project,
          resolution.original_base_sha,
          resolution.observed_head_sha,
        )) ||
        !(await provesHostedAncestor(
          resolution.repository_root,
          project,
          resolution.original_base_sha,
          pr.baseSha,
        ))
      ) {
        reject("exact hosted head and base ancestry is unproven.");
      }
    }
    if (pr.provider === "gitlab") {
      // HEAD can already be aligned while source/base tracking still needs a
      // non-force refresh after an interrupted final readback at a later main.
      const failure = await reconcileProviderUpdateLocalHead(
        request,
        resolution.observed_head_sha,
        observedBase,
      );
      if (failure) reject(`local GitLab recovery alignment is incomplete: ${failure}`);
    }
    const local = await validateProviderUpdateLocalState(request, [resolution.observed_head_sha]);
    if (local) reject(`local task head is not safely aligned: ${local}`);
    if (
      (await gitRevParse(checkout, [
        `refs/remotes/${resolution.identity.remote}/${resolution.base_branch}`,
      ])) !== observedBase
    ) {
      reject("local base tracking head differs from provider base.");
    }
    const refreshed = await opts.decide();
    const beforeComponents = current.workflowStep.preconditionFingerprint.components;
    const afterComponents = refreshed.workflowStep.preconditionFingerprint.components;
    // The proven local update changes blockers and the next step in authority.
    // Bind its stable controls separately. This completion grants no authority
    // to execute that new step; the next operation requires its own fresh gate.
    const controlUnchanged =
      pr.provider !== "gitlab" ||
      (beforeComponents.authority.state === "present" &&
        afterComponents.authority.state === "present" &&
        Object.entries(beforeComponents).every(
          ([key, value]) =>
            key === "git" ||
            key === "provider" ||
            key === "authority" ||
            digestSupervisorEpisodeValue(afterComponents[key as keyof typeof afterComponents]) ===
              digestSupervisorEpisodeValue(value),
        ) &&
        digestSupervisorEpisodeValue(gitLabRecoveryControls(current)) ===
          digestSupervisorEpisodeValue(gitLabRecoveryControls(refreshed)));
    if (
      (pr.provider === "gitlab"
        ? !controlUnchanged
        : refreshed.workflowStep.preconditionFingerprint.digest !==
          resolution.current_state_fingerprint) ||
      refreshed.task.id !== opts.task_id
    ) {
      reject("the route changed during provider proof.");
    }
    if (
      pr.provider === "gitlab" &&
      (path.resolve(refreshed.workspace.taskWorktreePath ?? "") !== path.resolve(checkout) ||
        refreshed.workspace.prBranch !== resolution.branch)
    )
      reject("the authoritative GitLab task checkout changed during recovery.");
    if (pr.provider === "gitlab") {
      const after = await observeExistingChangeRequestByNumber({
        gitRoot: resolution.repository_root,
        identity: pr.identity,
        prNumber: resolution.pr_number,
        branch: resolution.branch,
        baseBranch: resolution.base_branch,
      });
      if (
        after.state !== "found" ||
        after.pr.provider !== "gitlab" ||
        after.pr.status !== "OPEN" ||
        after.pr.prNumber !== resolution.pr_number ||
        after.pr.headSha !== resolution.observed_head_sha ||
        after.pr.prUrl !== resolution.pr_url ||
        after.pr.headRef !== resolution.branch ||
        after.pr.base !== resolution.base_branch ||
        !(
          [
            "provider",
            "hostname",
            "remote",
            "sourceProject",
            "targetProject",
            "sourceUrl",
            "targetUrl",
          ] as const
        ).every((key) => after.pr.identity[key] === pr.identity[key]) ||
        (await readGitLabCurrentTargetHead({
          gitRoot: resolution.repository_root,
          identity: pr.identity,
          baseBranch: resolution.base_branch,
        })) !== observedBase
      )
        reject("GitLab hosted identity or target changed during local recovery.");
      const freshTask = await opts.command.taskBackend.getTask(opts.task_id);
      if (freshTask?.id !== opts.task_id)
        reject("the task record changed before final GitLab authority readback.");
      const retainedAuthority = await loadSideEffectAuthorityState({
        gitRoot: opts.command.resolvedProject.gitRoot,
        commonGitDir,
        taskId: opts.task_id,
        task: freshTask,
      });
      if (
        digestSupervisorEpisodeValue({
          source: retainedAuthority.source,
          state: retainedAuthority.state,
        }) !== retainedAuthorityDigest
      )
        reject("the retained USER authority changed during GitLab recovery.");
    }
    const completion = {
      kind: "provider_update_branch_effect_resolution",
      verdict: "applied",
      original_operation_digest: operationDigest,
      grant_digest: grant.digest,
      grant_state_fingerprint_digest: grant.stateFingerprintDigest,
      grant_state_scope_digest: grant.stateScopeDigest,
      observed_head_sha: resolution.observed_head_sha,
      original_base_sha: resolution.original_base_sha,
      observed_base_sha: observedBase,
      operator: resolution.operator,
      evidence: resolution.evidence,
    };
    const retainedCompletion = await retainProviderUpdateVerificationProof({
      command: opts.command,
      params,
      authority_digest: resolution.precondition_fingerprint_digest,
      observed_head_sha: resolution.observed_head_sha,
      completion,
    });
    const reopened = reopenSupervisorExecutionEpisodeAfterEffectEvidence({
      journal,
      operation_key: resolution.operation_key,
    });
    const completed = completeSupervisorExecutionEpisode({
      journal: reopened,
      operation_key: resolution.operation_key,
      result: retainedCompletion,
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: refreshed.workflowStep.id },
    });
    if (resolution.identity.provider === "gitlab")
      await publishGitLabJournalTransition({
        store,
        before: journal,
        next: advanced,
        phase: "state",
      });
    else if (!(await store.compareAndSwap(journal.digest, advanced)))
      reject("the supervisor journal changed during recovery.");
    const postCompletionRoute = await opts.decide();
    return {
      task_id: opts.task_id,
      operation_key: resolution.operation_key,
      verdict: "applied" as const,
      observed_head_sha: resolution.observed_head_sha,
      next_step: postCompletionRoute.workflowStep.id,
    };
  };
  if (resolution.identity.provider === "gitlab")
    return withGitLabJournalLease({ journal_path: journalPath, run, failed: () => false });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) reject("another supervisor owns this task.");
  try {
    return await run();
  } finally {
    await lease.release();
  }
}
