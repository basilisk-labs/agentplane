import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { StateFingerprint } from "@agentplaneorg/core/schemas";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { createSideEffectAuthorityRecord } from "../shared/side-effect-authority.js";
import {
  assertCandidateAttempt,
  authenticateCandidateAttempt,
  candidatePublicationApprovalRequest,
  type CandidatePublicationRequest,
} from "./candidate-publication-request.js";
import { assertCandidateTree, readCandidateTree } from "./candidate-publication-tree.js";

export function candidatePublicationOperation(request: CandidatePublicationRequest) {
  return {
    id: "candidate.publish" as const,
    type: "pr_sync" as const,
    params: { taskId: request.task_id, requestDigest: request.digest },
  };
}

/** Called only by the operator checkpoint after it displays the exact request for review. */
export async function admitCandidatePublication(opts: {
  request: CandidatePublicationRequest;
  raw: unknown;
  record: KernelRecord;
  root: string;
  actor: string;
  approved_digest: string;
  fingerprint: StateFingerprint;
  issued_at: string;
  expires_at: string;
}) {
  const preparation = candidatePublicationApprovalRequest(opts.request);
  if (opts.actor !== "USER" || opts.approved_digest !== preparation.approval_digest)
    throw new Error("Candidate publication requires the exact separate USER approval digest");
  if (opts.fingerprint.task_id !== preparation.request.task_id)
    throw new Error("Candidate publication authority task changed");
  assertCandidateAttempt(opts);
  await assertCandidateTree(opts.root, preparation.request);
  return createSideEffectAuthorityRecord({
    actor: opts.actor,
    operation: candidatePublicationOperation(preparation.request),
    fingerprint: opts.fingerprint,
    issuedAt: opts.issued_at,
    expiresAt: opts.expires_at,
    evidenceDigest: preparation.approval_digest,
  });
}

/** Builds a reviewable request from immutable objects without contacting a remote or granting rights. */
export async function prepareCandidatePublication(opts: {
  root: string;
  raw: unknown;
  record: KernelRecord;
  work_order_digest: k.Sha256Digest;
  base_commit: string;
  commit: string;
  frozen_files_digest: string;
  review_digest: string;
  remote_url: string;
  candidate_ref: string;
}) {
  const { order, mutation_receipt_digest } = authenticateCandidateAttempt(opts);
  const binding = order.canonical_binding;
  if (binding?.phase !== "implementation")
    throw new Error("Candidate requires implementation binding");
  const tree = await readCandidateTree(opts.root, opts.base_commit, opts.commit);
  if (tree.files_digest !== opts.frozen_files_digest)
    throw new Error("Immutable candidate differs from the reviewed frozen file inventory");
  const contents = {
    schema_version: 1 as const,
    kind: "candidate_publication_request" as const,
    task_id: opts.record.aggregate.id,
    record_digest: opts.record.digest,
    repository_identity: binding.repository_identity,
    plan_digest: binding.plan_digest,
    plan_revision: binding.plan_revision,
    work_item_id: binding.work_item_id,
    attempt: binding.attempt,
    claim_id: binding.claim_id,
    contract_digest: binding.contract_digest,
    work_order_digest: opts.work_order_digest,
    begin_receipt_digest: mutation_receipt_digest,
    review_digest: opts.review_digest,
    ...tree,
    remote_url: opts.remote_url,
    candidate_ref: opts.candidate_ref,
    expected_remote_head: null,
  };
  return candidatePublicationApprovalRequest({ ...contents, digest: k.kernelDigest(contents) });
}
