import path from "node:path";
import { z } from "zod";
import {
  advanceSupervisorExecutionEpisodeState,
  completeSupervisorExecutionEpisode,
  recoverSupervisorExecutionEpisodeJournal,
  reopenSupervisorExecutionEpisodeAfterEffectEvidence,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import { taskKernel as k } from "@agentplaneorg/core/tasks";

import { createExistingPrAdoptionStore, resolveAdoptionControlRoot } from "../pr/adoption-store.js";
import { matchesAdoptedPrObservation } from "../pr/adoption-identity.js";
import { assertAdoptedPrMergeReadiness } from "../pr/adoption-task-authority.js";
import { proveAdoptedMergeExactBaseParent } from "../pr/adoption-merge.js";
import { hasExactAdoptedVerificationRecord } from "../pr/adoption-verification.js";
import { observeExistingChangeRequestByNumber } from "../pr/internal/change-request-provider.js";
import { updateProviderBranch } from "../pr/provider-update-branch.js";
import { readContainedStableTextNoFollow } from "../../shared/contained-stable-file.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { workflowOperationAuthorityDigest } from "../shared/side-effect-authority.js";
import { WORKFLOW_OPERATION_AUTHORITY_POLICY } from "../shared/side-effect-authority-policy.js";
import { loadSideEffectAuthorityState } from "../shared/side-effect-authority-store.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
  tryAcquireSupervisorExecutionLease,
} from "../shared/supervisor-execution-episode.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";

const sha = z.string().regex(/^[a-f0-9]{40,64}$/u);
const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const baseOperation = z.object({
  id: z.enum(["provider.pr.update_branch", "integration.adopted_merge"]),
  type: z.enum(["provider_update_branch", "integration_adopted_merge"]),
  preconditionFingerprint: z.object({ digest }),
  idempotencyKey: z.string().min(1),
  authorityRef: z.string().regex(/^authority:[A-Za-z0-9._-]+$/u),
  params: z.record(z.string(), z.unknown()),
});
const updateParams = z
  .object({
    taskId: z.string().min(1),
    identity: z.strictObject({
      provider: z.literal("github"),
      hostname: z.string().min(1),
      remote: z.string().min(1),
      sourceProject: z.string().min(1),
      targetProject: z.string().min(1),
      sourceUrl: z.string().min(1),
      targetUrl: z.string().min(1),
    }),
    prNumber: z.number().int().positive(),
    branch: z.string().min(1),
    baseBranch: z.string().min(1),
    expectedHeadSha: sha,
    expectedBaseSha: sha,
  })
  .strict();
const mergeParams = z.strictObject({
  taskId: z.string().min(1),
  prNumber: z.number().int().positive(),
  headSha: sha,
  baseSha: sha,
});

/** Resolve only the exact prior adopted effect. This path never invokes a provider mutation. */
export async function recoverAdoptedProviderEffect(opts: {
  command: CommandContext;
  task_id: string;
}): Promise<boolean> {
  // A provider effect is issued from the control checkout, where the adopted PR
  // receipt is retained. Ordinary tasks never need the provider journal probe.
  const root = opts.command.resolvedProject.gitRoot;
  const workflowDir = opts.command.config?.paths?.workflow_dir;
  if (!workflowDir) return false;
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/u.test(opts.task_id)) {
    throw new Error("Adopted provider recovery task ID is invalid");
  }
  let localMeta: string;
  try {
    localMeta = await readContainedStableTextNoFollow({
      repository_root: root,
      file_path: path.join(root, workflowDir, opts.task_id, "pr", "meta.json"),
      label: "local adopted PR recovery marker",
      max_bytes: 1024 * 1024,
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw error;
  }
  if (!/"adoption"\s*:/u.test(localMeta)) return false;
  const commonGitDir = await resolveCommandGitCommonDir(opts.command);
  const journalPath = await resolveSupervisorExecutionEpisodePath({
    git_root: root,
    common_git_dir: commonGitDir,
    task_id: opts.task_id,
  });
  const lease = await tryAcquireSupervisorExecutionLease({ journal_path: journalPath });
  if (!lease) return false;
  try {
    const journalStore = createSupervisorEpisodeStore(journalPath);
    const raw = await journalStore.read();
    if (!raw) return false;
    let journal = validateSupervisorExecutionEpisodeJournal(raw);
    if (journal.task_id !== opts.task_id) {
      throw new Error("Adopted provider recovery journal task identity changed");
    }
    if (
      !(journal.status === "running" && journal.cursor.phase === "intent_recorded") &&
      !(journal.status === "stopped" && journal.stop?.reason === "effect_in_doubt")
    )
      return false;
    const entry = journal.operations.at(-1);
    if (
      !entry?.recovery?.context ||
      entry.recovery.context === null ||
      typeof entry.recovery.context !== "object" ||
      !("kind" in entry.recovery.context) ||
      entry.recovery.context.kind !== "adopted_provider_effect"
    )
      return false;
    if (entry.status !== "intent") {
      throw new Error("Adopted provider recovery requires the exact retained effect intent");
    }
    const operation = baseOperation.parse(entry.recovery.operation_identity);
    if (
      (operation.id === "provider.pr.update_branch" &&
        operation.type !== "provider_update_branch") ||
      (operation.id === "integration.adopted_merge" &&
        operation.type !== "integration_adopted_merge")
    )
      throw new Error("Adopted provider recovery operation type changed");
    if (journal.status === "running" && journal.cursor.phase === "intent_recorded") {
      const stopped = recoverSupervisorExecutionEpisodeJournal({
        journal,
        state_fingerprint_digest: journal.state_fingerprint_digest,
      });
      if (
        stopped.status !== "stopped" ||
        stopped.stop?.reason !== "effect_in_doubt" ||
        !(await journalStore.compareAndSwap(journal.digest, stopped))
      ) {
        throw new Error("Adopted provider recovery could not retain the interrupted intent");
      }
      journal = stopped;
    }
    if (
      journal.status !== "stopped" ||
      journal.stop?.reason !== "effect_in_doubt" ||
      journal.stop.operation_key !== entry.operation_key
    )
      return false;
    if (
      entry.authority_ref !== `workflow-operation:${operation.id}` ||
      entry.authority_digest !== operation.preconditionFingerprint.digest ||
      entry.precondition_fingerprint_digest !== operation.preconditionFingerprint.digest ||
      entry.effect_ref !== operation.idempotencyKey
    )
      throw new Error("Adopted provider recovery operation identity changed");
    const controlRoot = await resolveAdoptionControlRoot(root);
    const adoptionStore = createExistingPrAdoptionStore({
      gitRoot: controlRoot,
      workflowDir: opts.command.config.paths.workflow_dir,
    });
    const receipt = await adoptionStore.readTask(opts.task_id);
    const context = entry.recovery.context as { task_id?: unknown; adoption?: unknown };
    if (
      !receipt ||
      context.task_id !== opts.task_id ||
      k.kernelDigest(context.adoption) !== k.kernelDigest(receipt)
    )
      throw new Error("Adopted provider recovery immutable task binding changed");
    const task = await opts.command.taskBackend.getTask(opts.task_id);
    if (!task) throw new Error("Adopted provider recovery task is unavailable");
    const authority = await loadSideEffectAuthorityState({
      gitRoot: root,
      commonGitDir,
      taskId: opts.task_id,
      task,
    });
    const operationDigest =
      operation.id === "provider.pr.update_branch"
        ? workflowOperationAuthorityDigest({
            id: operation.id,
            type: "provider_update_branch",
            params: updateParams.parse(operation.params),
          })
        : workflowOperationAuthorityDigest({
            id: operation.id,
            type: "integration_adopted_merge",
            params: mergeParams.parse(operation.params),
          });
    const grants =
      authority.state?.grants.filter(
        (grant) =>
          grant.id === operation.authorityRef.slice("authority:".length) &&
          grant.actor === "USER" &&
          grant.policyRule === WORKFLOW_OPERATION_AUTHORITY_POLICY[operation.id].policyRule &&
          grant.operationId === operation.id &&
          grant.operationDigest === operationDigest &&
          Date.parse(grant.issuedAt) <= Date.parse(entry.started_at) &&
          Date.parse(grant.expiresAt) >= Date.parse(entry.started_at) &&
          authority.state?.audit.some(
            (audit) =>
              audit.outcome === "approved" &&
              audit.actor === grant.actor &&
              audit.policyRule === grant.policyRule &&
              audit.authorityDigest === grant.digest &&
              audit.operationDigest === grant.operationDigest &&
              audit.stateFingerprintDigest === grant.stateFingerprintDigest &&
              Date.parse(audit.at) <= Date.parse(entry.started_at),
          ),
      ) ?? [];
    if (grants.length !== 1) {
      throw new Error("Adopted provider recovery lacks the original retained USER grant");
    }
    const observed = await observeExistingChangeRequestByNumber({
      gitRoot: root,
      prNumber: receipt.pr_number,
      branch: receipt.head_ref,
      baseBranch: receipt.base_ref,
    });
    if (observed.state !== "found" || !matchesAdoptedPrObservation(receipt, observed.pr)) {
      throw new Error("Adopted provider recovery PR identity readback changed");
    }
    if (operation.id === "provider.pr.update_branch") {
      const params = updateParams.parse(operation.params);
      const meta = await adoptionStore.readMetadata(opts.task_id);
      if (
        params.taskId !== opts.task_id ||
        params.prNumber !== receipt.pr_number ||
        params.branch !== receipt.head_ref ||
        params.baseBranch !== receipt.base_ref ||
        meta?.status !== "OPEN" ||
        !observed.pr.headSha ||
        observed.pr.headSha === params.expectedHeadSha ||
        ![params.expectedHeadSha, observed.pr.headSha].includes(meta.head_sha ?? receipt.head_sha)
      )
        throw new Error("Adopted update recovery head or retained operation changed");
      const result = await updateProviderBranch({
        gitRoot: root,
        adoption: receipt,
        ...params,
        reconcileHeadSha: observed.pr.headSha,
      });
      if (result.state !== "updated" || result.effect !== "reconciled") {
        throw new Error("Adopted update recovery lacks exact provider ancestry proof");
      }
      await adoptionStore.recordUpdatedHead(
        opts.task_id,
        params.expectedHeadSha,
        result.evidence.observedHeadSha,
      );
    } else {
      const params = mergeParams.parse(operation.params);
      const meta = await adoptionStore.readMetadata(opts.task_id);
      if (
        params.taskId !== opts.task_id ||
        params.prNumber !== receipt.pr_number ||
        (meta?.head_sha ?? receipt.head_sha) !== params.headSha ||
        !["OPEN", "MERGED"].includes(meta?.status ?? "") ||
        observed.pr.status !== "MERGED" ||
        observed.pr.headSha !== params.headSha ||
        !observed.pr.mergeCommit ||
        !observed.pr.mergedAt ||
        Math.floor(Date.parse(observed.pr.mergedAt) / 1000) <
          Math.floor(Date.parse(entry.started_at) / 1000)
      )
        throw new Error("Adopted merge recovery head, base, or merge readback changed");
      assertAdoptedPrMergeReadiness(task, params.headSha);
      if (
        !(await hasExactAdoptedVerificationRecord({
          ctx: opts.command,
          task,
          headSha: params.headSha,
        }))
      ) {
        throw new Error("Adopted merge recovery lacks exact-head native verification");
      }
      if (
        !(await proveAdoptedMergeExactBaseParent({
          gitRoot: root,
          receipt,
          expectedBaseSha: params.baseSha,
          mergeCommit: observed.pr.mergeCommit,
        }))
      ) {
        throw new Error("Adopted merge recovery lacks exact pre-merge base proof");
      }
      await adoptionStore.recordMerged(
        opts.task_id,
        params.headSha,
        observed.pr.mergeCommit,
        observed.pr.mergedAt,
      );
    }
    const refreshed = await buildTaskRouteDecision({
      ctx: opts.command,
      cwd: path.resolve(root),
      rootOverride: null,
      includeRemote: true,
      freshHead: true,
      taskId: opts.task_id,
    });
    const reopened = reopenSupervisorExecutionEpisodeAfterEffectEvidence({
      journal,
      operation_key: entry.operation_key,
    });
    const completed = completeSupervisorExecutionEpisode({
      journal: reopened,
      operation_key: entry.operation_key,
      result: { kind: "adopted_provider_effect_reconciled", operation_id: operation.id },
    });
    const advanced = advanceSupervisorExecutionEpisodeState({
      journal: completed,
      state_fingerprint_digest: refreshed.workflowStep.preconditionFingerprint.digest,
      route_observation: { step_id: refreshed.workflowStep.id },
    });
    if (!(await journalStore.compareAndSwap(journal.digest, advanced))) {
      throw new Error("Adopted provider recovery journal changed during reconciliation");
    }
    return true;
  } finally {
    await lease.release();
  }
}
