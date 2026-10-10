import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelBackendAdapter } from "../../adapters/task-backend/kernel-backend-adapter.js";
import { kernelAuthorityRecordSchema } from "../../adapters/task-backend/kernel-authority-schema.js";
import type { KernelAuthorityPort, NativeAuthorityContext } from "../../ports/kernel-authority.js";

export async function renewKernelPolicyAuthority(opts: {
  task_id: string;
  adapter: KernelBackendAdapter;
  native: KernelAuthorityPort;
  context: NativeAuthorityContext;
  aggregate: k.TaskAggregate;
  assertCeiling: (authority: k.ExecutionAuthority, context: NativeAuthorityContext) => void;
  assertFresh: (context: NativeAuthorityContext, expires_at: string | null) => Promise<void>;
}) {
  const { aggregate, context } = opts;
  const parent = aggregate.authority_lineage?.at(-1)?.authority;
  const plan = aggregate.current_plan;
  if (
    !parent ||
    plan?.state !== "APPROVED" ||
    plan.revision !== parent.plan_revision ||
    plan.digest !== parent.plan_digest ||
    k.canonicalAuthorityIssues(aggregate).length > 0
  )
    throw new Error("Canonical authority renewal requires an unchanged approved Plan");
  if (
    parent.expires_at !== null &&
    Date.parse(parent.expires_at) <= Date.parse(context.occurred_at)
  )
    throw new Error("Canonical authority renewal cannot renew expired authority");
  const approval = await opts.native.readApproval(opts.task_id);
  if (
    approval?.kind !== "manual_operator" ||
    !approval.invocation_id ||
    !/^USER(?::[A-Za-z0-9._@-]+)?$/u.test(approval.actor_id)
  )
    throw new Error("Canonical authority renewal requires explicit manual USER approval");
  const contents = {
    ...parent,
    repository_fingerprint: context.repository_fingerprint,
    policy_digests: context.ceiling.policy_digests,
    provenance: {
      ...parent.provenance,
      kind: "USER" as const,
      actor_id: approval.actor_id,
      parent_authority_digest: parent.digest,
    },
  };
  const authority = { ...contents, digest: k.authorityDigest(contents) };
  opts.assertCeiling(authority, context);
  const observation =
    parent.repository_fingerprint === context.repository_fingerprint
      ? null
      : await opts.native.observeContinuation(opts.task_id, parent);
  if (
    parent.repository_fingerprint !== context.repository_fingerprint &&
    (observation?.kind !== "repository_implementation" ||
      observation.previous_fingerprint !== parent.repository_fingerprint ||
      observation.changed_paths.length === 0)
  )
    throw new Error("Canonical policy renewal requires a fresh native repository observation");
  const reviewedBase = await opts.native.observeReviewedBaseImport?.(opts.task_id, parent);
  const requestDigest = k.policyRenewalRequestDigest({
    task_revision: aggregate.revision,
    parent,
    repository_fingerprint: context.repository_fingerprint,
    policy_digests: authority.policy_digests,
    changed_paths: observation?.changed_paths ?? [],
    repository_evidence_digest: observation?.evidence_digest,
    ...(reviewedBase ? { reviewed_base_import: reviewedBase } : {}),
  });
  const record = kernelAuthorityRecordSchema.parse({
    authority,
    approval_mode: "manual_operator",
    observation: {
      kind: "policy_renewal",
      ...(reviewedBase ? { reviewed_base_import: reviewedBase } : {}),
      previous_fingerprint: parent.repository_fingerprint,
      changed_paths: observation?.changed_paths ?? [],
      ...(observation ? { repository_evidence_digest: observation.evidence_digest } : {}),
      request_task_revision: aggregate.revision,
      request_digest: requestDigest,
      evidence_digest: k.policyRenewalApprovalEvidence({
        request_digest: requestDigest,
        actor_id: approval.actor_id,
      }),
    },
  });
  await opts.assertFresh(context, parent.expires_at);
  if (
    reviewedBase &&
    k.kernelDigest(await opts.native.observeReviewedBaseImport?.(opts.task_id, parent)) !==
      k.kernelDigest(reviewedBase)
  )
    throw new Error("Reviewed base evidence changed before renewal dispatch");
  return opts.adapter.execute({
    command: {
      kind: "renew_policy_authority",
      task_id: opts.task_id,
      expected_task_revision: aggregate.revision,
      expected_state_fingerprint: context.repository_fingerprint,
      record,
    },
    actor: { ...context.actor, id: approval.actor_id, kind: "USER" },
    authority: null,
    repository_fingerprint: context.repository_fingerprint,
    occurred_at: context.occurred_at,
    mutation_id: context.mutation_id,
  });
}
