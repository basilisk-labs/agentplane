import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { createCliEmitter } from "../../cli/output.js";
import {
  appendSideEffectAuthorityAudit,
  createSideEffectAuthorityRecord,
  workflowOperationAuthorityDigest,
  workflowAuthorityStateScopeDigest,
} from "../shared/side-effect-authority.js";
import { operationPayloadDigest } from "../shared/workflow-step-authority.js";
import { observeExistingChangeRequestByNumber } from "../pr/internal/change-request-provider.js";
import { runGhApiJson } from "../pr/internal/gh-api.js";
import { validateProviderUpdateLocalState } from "../pr/provider-update-branch-local.js";
import {
  resolveCommandGitCommonDir,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import {
  advancedBaseRecoveryOperation,
  readProviderUpdateRecoveryInput,
} from "./provider-update-effect-recovery.js";
import {
  loadSideEffectAuthorityState,
  persistSideEffectAuthorityState,
} from "../shared/side-effect-authority-store.js";
import { verifyUserApprovalReceipt } from "./user-approval-receipt.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { TaskAuthorityGrantParsed } from "./authority-grant.command.js";

export async function grantAdvancedBaseRecovery(opts: {
  session: { getRemoteWriteContext: (cmd: string) => Promise<CommandContext> };
  parsed: TaskAuthorityGrantParsed;
  decision: TaskRouteDecision;
  commandCtx: CommandContext;
}): Promise<number> {
  const { session, parsed, decision, commandCtx } = opts;
  if (parsed.by && parsed.by !== "USER")
    throw new Error("Advanced-base recovery requires an explicit USER operator action.");
  const input = await readProviderUpdateRecoveryInput(parsed.recoveryInput!);
  const attested = input.operator.advanced_base_attestation;
  if (
    !attested ||
    input.task_id !== parsed.taskId ||
    input.operator.actor !== "USER" ||
    input.current_state_fingerprint !== decision.workflowStep.preconditionFingerprint.digest ||
    input.repository_root !== commandCtx.resolvedProject.gitRoot ||
    !decision.workspace.taskWorktreePath ||
    decision.workspace.prBranch !== input.branch
  )
    throw new Error("Recovery authority proposal does not match the exact current task route.");
  for (const item of input.evidence) {
    if (digestSupervisorEpisodeValue(item.content) !== item.digest)
      throw new Error("Recovery operator evidence digest mismatch.");
  }
  const commonGitDir = await resolveCommandGitCommonDir(commandCtx);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: commandCtx.resolvedProject.gitRoot,
    common_git_dir: commonGitDir,
    task_id: parsed.taskId,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) throw new Error("Another supervisor owns this recovery task.");
  try {
    const journalStore = createSupervisorEpisodeStore(journalPath);
    const journal = validateSupervisorExecutionEpisodeJournal(await journalStore.read());
    const intent = journal.operations.at(-1);
    const payloadDigest = `sha256:${operationPayloadDigest({
      id: "provider.pr.update_branch",
      type: "provider_update_branch",
      params: {
        taskId: input.task_id,
        identity: input.identity,
        prNumber: input.pr_number,
        branch: input.branch,
        baseBranch: input.base_branch,
        expectedHeadSha: input.original_head_sha,
        expectedBaseSha: input.original_base_sha,
      },
    })}`;
    if (
      journal.digest !== input.journal_digest ||
      journal.status !== "stopped" ||
      journal.stop?.reason !== "effect_in_doubt" ||
      journal.stop.operation_key !== input.operation_key ||
      intent?.operation_key !== input.operation_key ||
      intent.status !== "intent" ||
      intent.authority_ref !== "workflow-operation:provider.pr.update_branch" ||
      intent.precondition_fingerprint_digest !== input.precondition_fingerprint_digest ||
      intent.authority_digest !== input.precondition_fingerprint_digest ||
      intent.effect_ref !== input.effect_ref ||
      input.effect_ref !==
        `provider.pr.update_branch:${parsed.taskId}:${input.precondition_fingerprint_digest}:${payloadDigest.slice(7)}`
    )
      throw new Error("Recovery authority requires the exact stopped original provider intent.");
    const task = await loadTaskFromContext({
      ctx: commandCtx,
      taskId: parsed.taskId,
      preferBranchSnapshot: commandCtx.config.workflow_mode === "branch_pr",
    });
    const original = await loadSideEffectAuthorityState({
      gitRoot: commandCtx.resolvedProject.gitRoot,
      commonGitDir,
      taskId: parsed.taskId,
      task,
    });
    const matching =
      original.state?.grants.filter(
        (grant) =>
          grant.actor === "USER" &&
          grant.operationId === "provider.pr.update_branch" &&
          grant.operationDigest === payloadDigest &&
          Date.parse(grant.issuedAt) <= Date.parse(intent.started_at) &&
          Date.parse(grant.expiresAt) >= Date.parse(intent.started_at),
      ) ?? [];
    const originalGrant = matching[0];
    if (
      matching.length !== 1 ||
      originalGrant?.id !== input.grant_id ||
      !original.state?.audit.some(
        (audit) =>
          audit.authorityDigest === originalGrant.digest &&
          audit.actor === "USER" &&
          audit.outcome === "approved" &&
          audit.operationDigest === payloadDigest &&
          audit.stateFingerprintDigest === originalGrant.stateFingerprintDigest,
      )
    )
      throw new Error(
        "Recovery authority lacks the unique retained original USER grant and audit.",
      );
    if (
      attested.journal_digest !== journal.digest ||
      attested.operation_key !== intent.operation_key ||
      attested.grant_id !== originalGrant.id ||
      attested.grant_digest !== originalGrant.digest ||
      attested.pr_number !== input.pr_number ||
      attested.pr_url !== input.pr_url ||
      attested.branch !== input.branch ||
      attested.base_branch !== input.base_branch ||
      attested.original_head_sha !== input.original_head_sha ||
      attested.original_base_sha !== input.original_base_sha ||
      attested.observed_head_sha !== input.observed_head_sha ||
      Object.entries(input.identity).some(
        ([key, value]) => attested.identity[key as keyof typeof input.identity] !== value,
      )
    )
      throw new Error(
        "Recovery authority attestation does not bind the exact original intent and PR.",
      );
    const observed = await observeExistingChangeRequestByNumber({
      gitRoot: input.repository_root,
      prNumber: input.pr_number,
      branch: input.branch,
      baseBranch: input.base_branch,
    });
    const pr = observed.state === "found" ? observed.pr : null;
    if (
      pr?.provider !== "github" ||
      pr.status !== "OPEN" ||
      pr.prNumber !== input.pr_number ||
      pr.prUrl !== input.pr_url ||
      pr.headRef !== input.branch ||
      pr.base !== input.base_branch ||
      pr.headSha !== input.observed_head_sha ||
      !pr.baseSha ||
      pr.identity.provider !== input.identity.provider ||
      pr.identity.hostname !== input.identity.hostname ||
      pr.identity.remote !== input.identity.remote ||
      pr.identity.sourceProject !== input.identity.sourceProject ||
      pr.identity.targetProject !== input.identity.targetProject ||
      pr.identity.sourceUrl !== input.identity.sourceUrl ||
      pr.identity.targetUrl !== input.identity.targetUrl
    )
      throw new Error("Recovery authority provider PR identity or head changed.");
    const project = input.identity.targetProject;
    const commit = await runGhApiJson<{ sha?: string; parents?: { sha?: string }[] }>(
      input.repository_root,
      [`repos/${project}/git/commits/${input.observed_head_sha}`],
    );
    if (
      commit.sha !== input.observed_head_sha ||
      commit.parents?.length !== 2 ||
      commit.parents[0]?.sha !== input.original_head_sha ||
      commit.parents[1]?.sha !== attested.observed_merge_base_sha ||
      attested.observed_merge_base_sha === input.original_base_sha
    )
      throw new Error("Recovery authority requires the exact advanced-base merge parents.");
    const comparison = await runGhApiJson<{
      status?: string;
      base_commit?: { sha?: string };
      merge_base_commit?: { sha?: string };
    }>(input.repository_root, [
      `repos/${project}/compare/${input.original_base_sha}...${attested.observed_merge_base_sha}`,
    ]);
    if (
      comparison.status !== "ahead" ||
      comparison.base_commit?.sha !== input.original_base_sha ||
      comparison.merge_base_commit?.sha !== input.original_base_sha
    )
      throw new Error("Recovery authority cannot prove advanced-base ancestry.");
    if (pr.baseSha !== attested.observed_merge_base_sha) {
      const currentBase = await runGhApiJson<{
        status?: string;
        base_commit?: { sha?: string };
        merge_base_commit?: { sha?: string };
      }>(input.repository_root, [
        `repos/${project}/compare/${attested.observed_merge_base_sha}...${pr.baseSha}`,
      ]);
      if (
        currentBase.status !== "ahead" ||
        currentBase.base_commit?.sha !== attested.observed_merge_base_sha ||
        currentBase.merge_base_commit?.sha !== attested.observed_merge_base_sha
      )
        throw new Error(
          "Recovery authority current PR base is not descended from the observed merge base.",
        );
    }
    const signed = await runGhApiJson<{
      sha?: string;
      parents?: { sha?: string }[];
      author?: { login?: string; id?: number };
      committer?: { login?: string };
      commit?: {
        message?: string;
        verification?: { verified?: boolean; reason?: string; verified_at?: string };
      };
    }>(input.repository_root, [`repos/${project}/commits/${input.observed_head_sha}`]);
    const account = await runGhApiJson<{ login?: string; id?: number }>(input.repository_root, [
      "user",
    ]);
    const verifiedAt = Date.parse(signed.commit?.verification?.verified_at ?? "");
    if (
      signed.sha !== input.observed_head_sha ||
      signed.parents?.length !== 2 ||
      signed.parents[0]?.sha !== input.original_head_sha ||
      signed.parents[1]?.sha !== attested.observed_merge_base_sha ||
      signed.commit?.verification?.verified !== true ||
      signed.commit.verification.reason !== "valid" ||
      signed.commit.message !== `Merge branch '${input.base_branch}' into ${input.branch}` ||
      !Number.isFinite(verifiedAt) ||
      verifiedAt < Date.parse(intent.started_at) ||
      verifiedAt > Date.parse(journal.stop.at) ||
      signed.committer?.login !== "web-flow" ||
      signed.author?.login !== attested.provider_actor_login ||
      signed.author?.id !== attested.provider_actor_id ||
      account.login !== attested.provider_actor_login ||
      account.id !== attested.provider_actor_id
    )
      throw new Error(
        "Recovery authority provider signature, actor, or server timing is unproven.",
      );
    const local = await validateProviderUpdateLocalState(
      {
        gitRoot: input.repository_root,
        worktreePath: decision.workspace.taskWorktreePath,
        identity: input.identity,
        prNumber: input.pr_number,
        branch: input.branch,
        baseBranch: input.base_branch,
        expectedHeadSha: input.original_head_sha,
        expectedBaseSha: input.original_base_sha,
      },
      [input.observed_head_sha],
    );
    if (local) throw new Error(`Recovery authority local state changed: ${local}`);
    const operation = advancedBaseRecoveryOperation(input, originalGrant.digest);
    const opDigest = workflowOperationAuthorityDigest(operation);
    const scopeDigest = workflowAuthorityStateScopeDigest(
      decision.workflowStep.preconditionFingerprint,
      operation.id,
    );
    const verified = parsed.approvalReceipt
      ? verifyUserApprovalReceipt({
          encoded: parsed.approvalReceipt,
          config: commandCtx.config.authority.approval_receipts,
          request: {
            approvalType: "side_effect",
            taskId: parsed.taskId,
            authorityReference: `recovery:${parsed.taskId}:${input.operation_key}`,
            stateFingerprint: decision.workflowStep.preconditionFingerprint.digest,
            operationId: operation.id,
            operationDigest: opDigest,
            stateScopeDigest: scopeDigest,
          },
        })
      : null;
    const actor = verified?.actor ?? parsed.by;
    if (actor !== "USER" && !actor?.startsWith("USER:"))
      throw new Error("Advanced-base recovery requires a USER operator grant.");
    const issuedAt = new Date().toISOString();
    const expiresAt = new Date(
      Math.min(
        Date.parse(issuedAt) + parsed.ttlMinutes * 60_000,
        verified ? Date.parse(verified.receipt.expires_at) : Infinity,
      ),
    ).toISOString();
    const writeCtx = await session.getRemoteWriteContext("task authority grant");
    const latestPr = await observeExistingChangeRequestByNumber({
      gitRoot: input.repository_root,
      prNumber: input.pr_number,
      branch: input.branch,
      baseBranch: input.base_branch,
    });
    if (
      latestPr.state !== "found" ||
      latestPr.pr.headSha !== pr.headSha ||
      latestPr.pr.baseSha !== pr.baseSha ||
      latestPr.pr.prUrl !== pr.prUrl ||
      latestPr.pr.status !== "OPEN" ||
      validateSupervisorExecutionEpisodeJournal(await journalStore.read()).digest !== journal.digest
    )
      throw new Error("Recovery authority provider PR or supervisor journal changed before grant.");
    const writeTask = await loadTaskFromContext({
      ctx: writeCtx,
      taskId: parsed.taskId,
      preferBranchSnapshot: writeCtx.config.workflow_mode === "branch_pr",
    });
    const loaded = await loadSideEffectAuthorityState({
      gitRoot: writeCtx.resolvedProject.gitRoot,
      taskId: parsed.taskId,
      task: writeTask,
    });
    if (
      !loaded.state ||
      digestSupervisorEpisodeValue(loaded.state) !== digestSupervisorEpisodeValue(original.state)
    )
      throw new Error("Recovery authority state changed during operator proof.");
    if (
      loaded.state.grants.some(
        (grant) => grant.operationId === operation.id && grant.operationDigest === opDigest,
      )
    )
      throw new Error("Recovery authority for this exact effect was already issued.");
    const grant = createSideEffectAuthorityRecord({
      actor: actor!,
      operation,
      fingerprint: decision.workflowStep.preconditionFingerprint,
      issuedAt,
      expiresAt,
      ...(verified ? { evidenceDigest: verified.digest } : {}),
    });
    const audited = appendSideEffectAuthorityAudit({
      state: { ...loaded.state, grants: [...loaded.state.grants, grant] },
      at: issuedAt,
      actor: actor!,
      operation,
      fingerprint: decision.workflowStep.preconditionFingerprint,
      authority: grant,
      outcome: "approved",
    });
    await persistSideEffectAuthorityState({
      gitRoot: writeCtx.resolvedProject.gitRoot,
      taskId: parsed.taskId,
      state: audited,
      expected: loaded,
    });
    createCliEmitter().success(
      "task authority grant",
      parsed.taskId,
      `recovery_authority=${grant.id} digest=${grant.digest} operation_digest=${opDigest} expires_at=${expiresAt} stored=git_common_dir`,
    );
    return 0;
  } finally {
    await lease.release();
  }
}
