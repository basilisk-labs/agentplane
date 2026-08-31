import {
  hostUserDecisionDigest,
  parseHostUserDecision,
  taskKernel as k,
} from "@agentplaneorg/core/tasks";
import { verifyUserApprovalReceipt } from "../../adapters/authority/user-approval-receipt.js";
import {
  kernelAuthorityRecordSchema,
  kernelAuthoritySchema,
} from "../../adapters/task-backend/kernel-authority-schema.js";
import type {
  KernelBackendAdapter,
  KernelCommandInput,
} from "../../adapters/task-backend/kernel-backend-adapter.js";
import type {
  KernelAuthorityPort,
  NativeApprovalObservation,
  NativeAuthorityContext,
} from "../../ports/kernel-authority.js";

function invalid(reason: string): never {
  throw Object.assign(new Error(`Canonical authority rejected: ${reason}`), {
    reason_code: reason,
    required_action: ["plan_exceeds_native_approval_scope", "work_item_exceeds_authority"].includes(
      reason,
    )
      ? "request_authority_delta"
      : "request_fresh_native_context",
  });
}

function freshTime(context: NativeAuthorityContext) {
  const now = Date.parse(context.occurred_at);
  if (!Number.isFinite(now)) invalid("invalid_observation_time");
  return now;
}

function assertUnexpired(authority: k.ExecutionAuthority, now: number) {
  if (authority.expires_at !== null && Date.parse(authority.expires_at) <= now)
    invalid("authority_expired");
}

export function kernelApprovalReference(context: NativeAuthorityContext, plan: k.PlanRecord) {
  return k.kernelDigest({
    kind: "canonical_plan_approval",
    task_id: context.task_id,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    repository_identity: context.repository_identity,
    repository_fingerprint: context.repository_fingerprint,
    ceiling: context.ceiling,
  });
}

/** One production authority resolver. Callers supply task identity, never a grant or USER claim. */
export class KernelAuthorityResolver {
  constructor(
    private readonly adapter: KernelBackendAdapter,
    private readonly native: KernelAuthorityPort,
  ) {}

  private async context(taskId: string) {
    const [read, context] = await Promise.all([
      this.adapter.read(taskId),
      this.native.readContext(taskId),
    ]);
    if (read.kind !== "canonical") invalid(read.kind);
    if (
      context.task_id !== taskId ||
      context.task_revision !== read.record.aggregate.revision ||
      context.repository_identity !== this.adapter.repositoryIdentity ||
      context.actor.kind !== "SYSTEM" ||
      !context.mutation_id ||
      !/^sha256:[0-9a-f]{64}$/u.test(context.repository_fingerprint)
    )
      invalid("native_context_binding");
    freshTime(context);
    return { read, context, aggregate: read.record.aggregate };
  }

  private approvalEvidence(
    observation: NativeApprovalObservation,
    context: NativeAuthorityContext,
    plan: k.PlanRecord,
  ): { actor: string; digest: k.Sha256Digest; expires_at: string | null } {
    if (observation.kind === "signed_user_receipt") {
      const verified = verifyUserApprovalReceipt({
        encoded: observation.encoded,
        config: context.approval_receipts,
        request: {
          approvalType: "plan_approval",
          taskId: context.task_id,
          authorityReference: kernelApprovalReference(context, plan),
          stateFingerprint: context.repository_fingerprint,
        },
        now: new Date(context.occurred_at),
      });
      return {
        actor: verified.actor,
        digest: verified.digest as k.Sha256Digest,
        expires_at: verified.receipt.expires_at,
      };
    }
    if (observation.kind === "host_user_decision") {
      const decision = parseHostUserDecision(observation.encoded);
      if (
        observation.repository_identity !== context.repository_identity ||
        decision.host_id !== observation.host_id ||
        decision.conversation_id !== observation.conversation_id ||
        decision.message_id !== observation.message_id ||
        decision.task_id !== context.task_id ||
        decision.plan_digest !== plan.digest ||
        decision.state_fingerprint !== context.repository_fingerprint ||
        Date.parse(decision.decided_at) > freshTime(context) ||
        freshTime(context) - Date.parse(decision.decided_at) >
          context.approval_receipts.max_ttl_minutes * 60_000
      )
        invalid("host_decision_binding");
      return {
        actor: `HOST:${decision.host_id}:USER`,
        digest: hostUserDecisionDigest(decision) as k.Sha256Digest,
        expires_at: context.ceiling.expires_at,
      };
    }
    if (
      observation.kind !== "manual_operator" ||
      !observation.invocation_id ||
      !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(observation.actor_id)
    )
      invalid("explicit_manual_operator_required");
    return {
      actor: observation.actor_id,
      digest: k.kernelDigest({
        observation,
        task_id: context.task_id,
        plan_digest: plan.digest,
        repository_identity: context.repository_identity,
        repository_fingerprint: context.repository_fingerprint,
      }),
      expires_at: context.ceiling.expires_at,
    };
  }

  async approve(taskId: string) {
    const { context, aggregate } = await this.context(taskId);
    const plan = aggregate.current_plan;
    if (aggregate.state !== "AWAITING_PLAN_APPROVAL" || plan?.state !== "PROPOSED")
      invalid("proposed_plan_required");
    const observation = await this.native.readApproval(taskId);
    if (!observation) invalid("native_user_decision_required");
    const evidence = this.approvalEvidence(observation, context, plan);
    const ceilingExpiry = context.ceiling.expires_at;
    const expiresAt =
      evidence.expires_at === null
        ? ceilingExpiry
        : ceilingExpiry === null || Date.parse(evidence.expires_at) <= Date.parse(ceilingExpiry)
          ? evidence.expires_at
          : ceilingExpiry;
    const contents = {
      ...context.ceiling,
      task_id: taskId,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      work_item_id: null,
      repository_identity: context.repository_identity,
      repository_fingerprint: context.repository_fingerprint,
      provenance: {
        kind: "USER" as const,
        actor_id: evidence.actor,
        evidence_digest: evidence.digest,
        parent_authority_digest: null,
      },
      expires_at: expiresAt,
    };
    const authority = kernelAuthoritySchema.parse({
      ...contents,
      digest: k.authorityDigest(contents),
    });
    assertUnexpired(authority, freshTime(context));
    for (const item of plan.work_items) {
      const delegated = this.delegate(authority, context.actor, item);
      if (!k.compareExecutionAuthority(authority, delegated).ok)
        invalid("plan_exceeds_native_approval_scope");
    }
    await this.assertFresh(context, authority.expires_at);
    return this.adapter.execute({
      command: {
        kind: "approve_plan",
        task_id: taskId,
        expected_task_revision: aggregate.revision,
        expected_state_fingerprint: context.repository_fingerprint,
        plan_revision: plan.revision,
        plan_digest: plan.digest,
        approval_evidence_digest: evidence.digest,
        authority_mode: observation.kind,
      },
      actor: { ...context.actor, id: evidence.actor, kind: "USER" },
      authority,
      repository_fingerprint: context.repository_fingerprint,
      occurred_at: context.occurred_at,
      mutation_id: context.mutation_id,
    });
  }

  private async assertFresh(expected: NativeAuthorityContext, expiresAt: string | null) {
    const current = await this.native.readContext(expected.task_id);
    // Native mutation IDs may be renewed; all authority-bearing inputs must remain identical.
    const stable = ({
      mutation_id: _mutation,
      occurred_at: _time,
      ...rest
    }: NativeAuthorityContext) => rest;
    if (k.kernelDigest(stable(current)) !== k.kernelDigest(stable(expected)))
      invalid("native_context_changed");
    if (expiresAt !== null && Date.parse(expiresAt) <= freshTime(current))
      invalid("authority_expired");
    if (
      freshTime(current) < freshTime(expected) ||
      freshTime(current) - freshTime(expected) >
        expected.approval_receipts.max_ttl_minutes * 60_000 ||
      (expected.ceiling.expires_at !== null &&
        Date.parse(expected.ceiling.expires_at) <= freshTime(current))
    )
      invalid("native_context_expired");
  }

  private delegate(
    parent: k.ExecutionAuthority,
    actor: k.ActorIdentity,
    item: k.WorkItemDefinition,
  ) {
    const contents = {
      ...parent,
      ...item.execution_requirements,
      work_item_id: item.id,
      provenance: {
        ...parent.provenance,
        kind: "DELEGATED" as const,
        actor_id: actor.id,
        parent_authority_digest: parent.digest,
      },
    };
    return { ...contents, digest: k.authorityDigest(contents) };
  }

  private assertCeiling(authority: k.ExecutionAuthority, context: NativeAuthorityContext) {
    const limit = { ...authority, ...context.ceiling };
    limit.digest = k.authorityDigest(limit);
    const candidate = {
      ...authority,
      provenance: {
        ...authority.provenance,
        kind: "DELEGATED" as const,
        parent_authority_digest: limit.digest,
      },
    };
    if (
      !k.compareExecutionAuthority(limit, candidate).ok ||
      ["policy_digests", "validation_requirements", "completion_requirements"].some((key) => {
        const field = key as
          | "policy_digests"
          | "validation_requirements"
          | "completion_requirements";
        return (
          k.kernelDigest(authority[field].toSorted()) !==
          k.kernelDigest(context.ceiling[field].toSorted())
        );
      })
    )
      invalid("native_policy_changed");
  }

  async resolve(
    taskId: string,
    workItemId?: string,
  ): Promise<{ authority: k.ExecutionAuthority; context: NativeAuthorityContext }> {
    const { context, aggregate } = await this.context(taskId);
    const stored = aggregate.authority_lineage?.at(-1)?.authority;
    if (!stored) invalid("canonical_authority_missing");
    const authority = kernelAuthoritySchema.parse(stored);
    assertUnexpired(authority, freshTime(context));
    this.assertCeiling(authority, context);
    if (
      aggregate.current_plan?.state !== "APPROVED" ||
      authority.plan_revision !== aggregate.current_plan.revision ||
      authority.plan_digest !== aggregate.current_plan.digest ||
      authority.repository_identity !== context.repository_identity ||
      authority.repository_fingerprint !== context.repository_fingerprint
    )
      invalid("native_continuation_required");
    if (!workItemId) return { authority, context };
    const item = aggregate.current_plan.work_items.find((entry) => entry.id === workItemId);
    if (!item) invalid("work_item_missing");
    const delegated = this.delegate(authority, context.actor, item);
    if (!k.compareExecutionAuthority(authority, delegated).ok)
      invalid("work_item_exceeds_authority");
    return { authority: delegated, context };
  }

  async continue(taskId: string) {
    const { context, aggregate } = await this.context(taskId);
    const parent = aggregate.authority_lineage?.at(-1)?.authority;
    const plan = aggregate.current_plan;
    if (!parent || plan?.state !== "APPROVED") invalid("canonical_authority_missing");
    assertUnexpired(parent, freshTime(context));
    this.assertCeiling(parent, context);
    const observation = await this.native.observeContinuation(taskId, parent);
    if (!observation) invalid("native_observation_required");
    const contents = {
      ...parent,
      plan_revision: plan.revision,
      plan_digest: plan.digest,
      repository_fingerprint: context.repository_fingerprint,
      provenance: {
        ...parent.provenance,
        kind: "SYSTEM" as const,
        actor_id: context.actor.id,
        parent_authority_digest: parent.digest,
      },
    };
    const record: k.CanonicalAuthorityRecord = {
      authority: { ...contents, digest: k.authorityDigest(contents) },
      approval_mode: null,
      observation,
    };
    kernelAuthorityRecordSchema.parse(record);
    const issues = k.continuationIssues(parent, record);
    if (issues.length > 0) invalid(issues.join(","));
    await this.assertFresh(context, parent.expires_at);
    const input: KernelCommandInput = {
      command: {
        kind: "continue_authority",
        task_id: taskId,
        expected_task_revision: aggregate.revision,
        expected_state_fingerprint: context.repository_fingerprint,
        record,
      },
      actor: context.actor,
      authority: parent,
      repository_fingerprint: context.repository_fingerprint,
      occurred_at: context.occurred_at,
      mutation_id: context.mutation_id,
    };
    return this.adapter.execute(input);
  }
}
