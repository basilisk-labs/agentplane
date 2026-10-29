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
import type { ObservedChangeRequest } from "../pr/internal/change-request-model.js";
import { runGhApiJson } from "../pr/internal/gh-api.js";
import { validateProviderUpdateLocalState } from "../pr/provider-update-branch-local.js";
import { providerUpdateRecoveryGrantOperation } from "../shared/provider-update-branch-route.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import { workflowOperationAuthorityDigest } from "../shared/side-effect-authority.js";
import { loadSideEffectAuthorityState } from "../shared/side-effect-authority-store.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";

const digest = z.string().regex(/^sha256:[0-9a-f]{64}$/u);
const sha = z.string().regex(/^[0-9a-f]{40}$/u);
const nonempty = z.string().trim().min(1);
const identitySchema = z.strictObject({
  provider: z.literal("github"),
  hostname: nonempty,
  remote: nonempty,
  sourceProject: nonempty,
  targetProject: nonempty,
  sourceUrl: nonempty,
  targetUrl: nonempty,
});
const advancedBaseAttestationSchema = z.strictObject({
  kind: z.literal("operator_attested_advanced_base"),
  journal_digest: digest,
  operation_key: digest,
  grant_id: nonempty,
  grant_digest: digest,
  identity: identitySchema,
  pr_number: z.number().int().positive(),
  pr_url: nonempty,
  branch: nonempty,
  base_branch: nonempty,
  original_head_sha: sha,
  original_base_sha: sha,
  observed_merge_base_sha: sha,
  observed_head_sha: sha,
  provider_actor_login: nonempty,
  provider_actor_id: z.number().int().positive(),
  recovery_grant_id: nonempty.optional(),
  recovery_grant_digest: digest.optional(),
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
    advanced_base_attestation: advancedBaseAttestationSchema.optional(),
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
export async function readProviderUpdateRecoveryInput(
  file: string,
): Promise<ProviderUpdateEffectResolution> {
  const parsed = providerUpdateEffectResolutionSchema.safeParse(
    JSON.parse(await readFile(file, "utf8")),
  );
  if (!parsed.success) reject(`invalid operator input: ${parsed.error.message}`);
  return parsed.data;
}

export function advancedBaseRecoveryOperation(
  resolution: ProviderUpdateEffectResolution,
  originalGrantDigest: string,
) {
  const attested = resolution.operator.advanced_base_attestation;
  if (!attested) reject("advanced-base recovery lacks an exact USER attestation.");
  return providerUpdateRecoveryGrantOperation(
    {
      taskId: resolution.task_id,
      identity: resolution.identity,
      prNumber: resolution.pr_number,
      branch: resolution.branch,
      baseBranch: resolution.base_branch,
      expectedHeadSha: resolution.original_head_sha,
      expectedBaseSha: resolution.original_base_sha,
    },
    {
      kind: "advanced_base_effect_recovery",
      journalDigest: resolution.journal_digest,
      operationKey: resolution.operation_key,
      originalGrantId: resolution.grant_id,
      originalGrantDigest,
      prUrl: resolution.pr_url,
      originalHeadSha: resolution.original_head_sha,
      originalBaseSha: resolution.original_base_sha,
      observedHeadSha: resolution.observed_head_sha,
      observedMergeBaseSha: attested.observed_merge_base_sha,
      providerActorLogin: attested.provider_actor_login,
      providerActorId: attested.provider_actor_id,
      evidenceDigest: digestSupervisorEpisodeValue(resolution.evidence),
    },
  );
}
type GithubCompareResponse = {
  status?: string | null;
  base_commit?: { sha?: string | null } | null;
  merge_base_commit?: { sha?: string | null } | null;
};
type GithubCommitResponse = { sha?: string | null; parents?: { sha?: string | null }[] | null };
type GithubVerifiedCommitResponse = GithubCommitResponse & {
  author?: { id?: number | null; login?: string | null } | null;
  committer?: { login?: string | null } | null;
  commit?: {
    message?: string | null;
    verification?: {
      verified?: boolean | null;
      reason?: string | null;
      verified_at?: string | null;
    } | null;
  } | null;
};
type GithubAccountResponse = { id?: number | null; login?: string | null };

function sameProviderPr(pr: ObservedChangeRequest, resolution: ProviderUpdateEffectResolution) {
  return (
    pr.provider === "github" &&
    pr.status === "OPEN" &&
    pr.prNumber === resolution.pr_number &&
    pr.prUrl === resolution.pr_url &&
    pr.headRef === resolution.branch &&
    pr.base === resolution.base_branch &&
    pr.headSha === resolution.observed_head_sha &&
    pr.identity.provider === resolution.identity.provider &&
    pr.identity.hostname === resolution.identity.hostname &&
    pr.identity.remote === resolution.identity.remote &&
    pr.identity.sourceProject === resolution.identity.sourceProject &&
    pr.identity.targetProject === resolution.identity.targetProject &&
    pr.identity.sourceUrl === resolution.identity.sourceUrl &&
    pr.identity.targetUrl === resolution.identity.targetUrl &&
    !!pr.baseSha
  );
}

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

function originalOperationDigest(resolution: ProviderUpdateEffectResolution): string {
  return `sha256:${operationPayloadDigest({
    id: "provider.pr.update_branch",
    type: "provider_update_branch",
    params: {
      taskId: resolution.task_id,
      identity: resolution.identity,
      prNumber: resolution.pr_number,
      branch: resolution.branch,
      baseBranch: resolution.base_branch,
      expectedHeadSha: resolution.original_head_sha,
      expectedBaseSha: resolution.original_base_sha,
    },
  })}`;
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
  const resolution = await readProviderUpdateRecoveryInput(opts.input_path);
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
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) reject("another supervisor owns this task.");
  try {
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
    const operationDigest = originalOperationDigest(resolution);
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
    if (!sameProviderPr(pr, resolution)) {
      reject("provider PR identity, head, or base changed.");
    }
    const providerBase = pr.baseSha;
    if (!providerBase) reject("provider PR base is unavailable.");
    const project = resolution.identity.targetProject;
    const hostedCommit = await runGhApiJson<GithubCommitResponse>(resolution.repository_root, [
      `repos/${project}/git/commits/${resolution.observed_head_sha}`,
    ]);
    if (
      hostedCommit.sha !== resolution.observed_head_sha ||
      hostedCommit.parents?.length !== 2 ||
      hostedCommit.parents[0]?.sha !== resolution.original_head_sha
    ) {
      reject("the published head is not an exact original-head merge commit.");
    }
    const mergedBase = hostedCommit.parents[1]?.sha;
    if (typeof mergedBase !== "string" || !sha.safeParse(mergedBase).success)
      reject("the published merge base is absent or invalid.");
    const advancedBase = mergedBase !== resolution.original_base_sha;
    let verifiedAt: string | undefined;
    let recoveryGrantDigest: string | undefined;
    if (advancedBase) {
      const attested = resolution.operator.advanced_base_attestation;
      if (
        resolution.operator.actor !== "USER" ||
        attested?.journal_digest !== journal.digest ||
        attested.operation_key !== operation.operation_key ||
        attested.grant_id !== grant.id ||
        attested.grant_digest !== grant.digest ||
        JSON.stringify(attested.identity) !== JSON.stringify(resolution.identity) ||
        attested.pr_number !== resolution.pr_number ||
        attested.pr_url !== resolution.pr_url ||
        attested.branch !== resolution.branch ||
        attested.base_branch !== resolution.base_branch ||
        attested.original_head_sha !== resolution.original_head_sha ||
        attested.original_base_sha !== resolution.original_base_sha ||
        attested.observed_merge_base_sha !== mergedBase ||
        attested.observed_head_sha !== resolution.observed_head_sha ||
        !attested.recovery_grant_id ||
        !attested.recovery_grant_digest
      ) {
        reject("advanced-base recovery lacks an exact USER attestation.");
      }
      if (
        !(await provesHostedAncestor(
          resolution.repository_root,
          project,
          resolution.original_base_sha,
          mergedBase,
        )) ||
        !(await provesHostedAncestor(resolution.repository_root, project, mergedBase, providerBase))
      ) {
        reject("the attested merge base does not descend from the authorized base.");
      }
      const [commit, account] = await Promise.all([
        runGhApiJson<GithubVerifiedCommitResponse>(resolution.repository_root, [
          `repos/${project}/commits/${resolution.observed_head_sha}`,
        ]),
        runGhApiJson<GithubAccountResponse>(resolution.repository_root, ["user"]),
      ]);
      verifiedAt = commit.commit?.verification?.verified_at ?? undefined;
      if (
        commit.sha !== resolution.observed_head_sha ||
        commit.parents?.length !== 2 ||
        commit.parents[0]?.sha !== resolution.original_head_sha ||
        commit.parents[1]?.sha !== mergedBase ||
        commit.commit?.message !==
          `Merge branch '${resolution.base_branch}' into ${resolution.branch}` ||
        commit.commit.verification?.verified !== true ||
        commit.commit.verification.reason !== "valid" ||
        !verifiedAt ||
        !Number.isFinite(Date.parse(verifiedAt)) ||
        Date.parse(verifiedAt) < Date.parse(operation.started_at) ||
        Date.parse(verifiedAt) > Date.parse(journal.stop.at) ||
        commit.author?.id !== attested.provider_actor_id ||
        commit.author?.login !== attested.provider_actor_login ||
        account.id !== attested.provider_actor_id ||
        account.login !== attested.provider_actor_login ||
        commit.committer?.login !== "web-flow"
      ) {
        reject("the attested provider actor, merge signature, or server timing is unproven.");
      }
      const recoveryDigest = workflowOperationAuthorityDigest(
        advancedBaseRecoveryOperation(resolution, grant.digest),
      );
      const stoppedAt = journal.stop?.at;
      if (!stoppedAt) reject("the original supervisor stop time is unavailable.");
      const recoveryGrants =
        authority.state?.grants.filter(
          (item) =>
            (item.actor === "USER" || item.actor.startsWith("USER:")) &&
            item.operationId === "provider.pr.update_branch" &&
            item.operationDigest === recoveryDigest &&
            item.policyRule === "workflow.external_high_risk" &&
            Date.parse(item.issuedAt) >= Date.parse(stoppedAt) &&
            Date.parse(item.expiresAt) > Date.now(),
        ) ?? [];
      const recoveryGrant = recoveryGrants[0];
      if (
        recoveryGrants.length !== 1 ||
        recoveryGrant?.id !== attested.recovery_grant_id ||
        recoveryGrant.digest !== attested.recovery_grant_digest ||
        !authority.state?.audit.some(
          (entry) =>
            entry.authorityDigest === recoveryGrant.digest &&
            entry.actor === recoveryGrant.actor &&
            entry.operationId === "provider.pr.update_branch" &&
            entry.operationDigest === recoveryDigest &&
            entry.stateFingerprintDigest === recoveryGrant.stateFingerprintDigest &&
            entry.policyRule === recoveryGrant.policyRule &&
            entry.outcome === "approved" &&
            Date.parse(entry.at) >= Date.parse(stoppedAt),
        )
      )
        reject("advanced-base recovery lacks a matching retained USER grant and audit.");
      recoveryGrantDigest = recoveryGrant.digest;
    } else if (resolution.operator.advanced_base_attestation) {
      reject("advanced-base attestation cannot be used for the strict original-base path.");
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
        providerBase,
      ))
    ) {
      reject("exact hosted head and base ancestry is unproven.");
    }
    const local = await validateProviderUpdateLocalState(
      {
        gitRoot: resolution.repository_root,
        worktreePath: checkout,
        identity: resolution.identity,
        prNumber: resolution.pr_number,
        branch: resolution.branch,
        baseBranch: resolution.base_branch,
        expectedHeadSha: resolution.original_head_sha,
        expectedBaseSha: resolution.original_base_sha,
      },
      [resolution.observed_head_sha],
    );
    if (local) reject(`local task head is not safely aligned: ${local}`);
    if (
      (await gitRevParse(checkout, [
        `refs/remotes/${resolution.identity.remote}/${resolution.base_branch}`,
      ])) !== pr.baseSha
    ) {
      reject("local base tracking head differs from provider base.");
    }
    const refreshed = await opts.decide();
    if (
      refreshed.workflowStep.preconditionFingerprint.digest !==
        resolution.current_state_fingerprint ||
      refreshed.task.id !== opts.task_id
    ) {
      reject("the route changed during provider proof.");
    }
    if (advancedBase) {
      const latest = await observeExistingChangeRequestByNumber({
        gitRoot: resolution.repository_root,
        prNumber: resolution.pr_number,
        branch: resolution.branch,
        baseBranch: resolution.base_branch,
      });
      if (
        latest.state !== "found" ||
        !sameProviderPr(latest.pr, resolution) ||
        latest.pr.baseSha !== pr.baseSha
      ) {
        reject("provider PR head or base changed before advanced-base settlement.");
      }
      const pending = validateSupervisorExecutionEpisodeJournal(await store.read());
      if (pending.digest !== journal.digest)
        reject("the supervisor journal changed before advanced-base settlement.");
      const currentAuthority = await loadSideEffectAuthorityState({
        gitRoot: opts.command.resolvedProject.gitRoot,
        commonGitDir,
        taskId: opts.task_id,
        task,
      });
      if (
        !currentAuthority.state ||
        digestSupervisorEpisodeValue(currentAuthority.state) !==
          digestSupervisorEpisodeValue(authority.state) ||
        !currentAuthority.state.grants.some(
          (item) => item.digest === recoveryGrantDigest && Date.parse(item.expiresAt) > Date.now(),
        )
      )
        reject("the recovery USER authority changed or expired before settlement.");
    }
    const reopened = reopenSupervisorExecutionEpisodeAfterEffectEvidence({
      journal,
      operation_key: resolution.operation_key,
    });
    const completed = completeSupervisorExecutionEpisode({
      journal: reopened,
      operation_key: resolution.operation_key,
      result: {
        kind: "provider_update_branch_effect_resolution",
        verdict: "applied",
        original_operation_digest: operationDigest,
        grant_digest: grant.digest,
        grant_state_fingerprint_digest: grant.stateFingerprintDigest,
        grant_state_scope_digest: grant.stateScopeDigest,
        observed_head_sha: resolution.observed_head_sha,
        observed_base_sha: pr.baseSha,
        ...(advancedBase
          ? {
              observed_merge_base_sha: mergedBase,
              provider_verified_at: verifiedAt,
              recovery_grant_digest: recoveryGrantDigest,
            }
          : {}),
        operator: resolution.operator,
        evidence: resolution.evidence,
      },
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: resolution.current_state_fingerprint,
      route_observation: { step_id: refreshed.workflowStep.id },
    });
    if (!(await store.compareAndSwap(journal.digest, advanced))) {
      reject("the supervisor journal changed during recovery.");
    }
    return {
      task_id: opts.task_id,
      operation_key: resolution.operation_key,
      verdict: "applied",
      observed_head_sha: resolution.observed_head_sha,
      next_step: refreshed.workflowStep.id,
    };
  } finally {
    await lease.release();
  }
}
