import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { authenticateReviewedBaseOrder } from "./kernel-reviewed-base-import.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const oid = z.string().regex(/^[a-f0-9]{40}(?:[a-f0-9]{24})?$/u);
const hasControl = (value: string) =>
  [...value].some((character) => {
    const code = character.codePointAt(0)!;
    return code < 32 || code === 127;
  });
const safePath = z
  .string()
  .min(1)
  .refine(
    (value) =>
      !value.startsWith("/") &&
      !value.includes("\\") &&
      !hasControl(value) &&
      value.split("/").every((part) => part !== "" && part !== "." && part !== ".."),
  );
const file = z
  .strictObject({
    path: safePath,
    mode: z.enum(["100644", "100755", "120000"]).nullable(),
    blob: oid.nullable(),
    content_digest: digest.nullable(),
  })
  .refine(
    (value) =>
      (value.mode === null) === (value.blob === null) &&
      (value.blob === null) === (value.content_digest === null),
  );

export function candidateRemoteUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      ["https:", "ssh:"].includes(url.protocol) &&
      url.hostname !== "" &&
      url.password === "" &&
      url.search === "" &&
      url.hash === "" &&
      (url.protocol === "ssh:" ? ["", "git"].includes(url.username) : url.username === "") &&
      !/\s/u.test(value) &&
      !hasControl(value) &&
      /^\/(?:[A-Za-z0-9_-][A-Za-z0-9_.-]*\/)*[A-Za-z0-9_-][A-Za-z0-9_.-]*$/u.test(url.pathname) &&
      !value.includes("/./") &&
      !value.includes("/../") &&
      url.pathname !== "/" &&
      !url.pathname.split("/").some((part) => part === ".." || part === ".")
    );
  } catch {
    return false;
  }
}

export const candidatePublicationRequestSchema = z
  .strictObject({
    schema_version: z.literal(1),
    kind: z.literal("candidate_publication_request"),
    task_id: z.string().min(1),
    record_digest: digest,
    repository_identity: digest,
    plan_digest: digest,
    plan_revision: z.number().int().positive(),
    work_item_id: z.string().min(1),
    attempt: z.number().int().positive(),
    claim_id: z.string().min(1),
    contract_digest: digest,
    work_order_digest: digest,
    begin_receipt_digest: digest,
    review_digest: digest,
    commit: oid,
    tree: oid,
    base_commit: oid,
    files: z.array(file).min(1).max(10_000),
    files_digest: digest,
    remote_url: z.string().refine(candidateRemoteUrl),
    candidate_ref: z
      .string()
      .regex(
        /^refs\/heads\/agentplane-candidates\/[A-Za-z0-9_-]+\/[a-f0-9]{40}(?:[a-f0-9]{24})?$/u,
      ),
    expected_remote_head: z.null(),
    digest,
  })
  .superRefine((value, ctx) => {
    const paths = value.files.map((entry) => entry.path);
    const { digest: declared, ...contents } = value;
    if (
      JSON.stringify(paths) !== JSON.stringify([...new Set(paths)].toSorted()) ||
      value.files_digest !== k.kernelDigest(value.files) ||
      declared !== k.kernelDigest(contents) ||
      !value.candidate_ref.endsWith(`/${value.commit}`)
    )
      ctx.addIssue({
        code: "custom",
        message: "Candidate request identity or file inventory changed",
      });
  });
export type CandidatePublicationRequest = z.infer<typeof candidatePublicationRequestSchema>;

/** Reuses native begin-receipt authentication; candidate review grants no semantic authority. */
export function authenticateCandidateAttempt(opts: {
  raw: unknown;
  record: KernelRecord;
  root: string;
  work_order_digest: k.Sha256Digest;
}) {
  const parent = opts.record.aggregate.authority_lineage?.at(-1)?.authority;
  const raw = opts.raw as { state_fingerprint?: { git_head?: unknown } } | null;
  if (!parent || typeof raw?.state_fingerprint?.git_head !== "string")
    throw new Error("Candidate publication requires a live native implementation attempt");
  const authenticated = authenticateReviewedBaseOrder({
    ...opts,
    parent,
    pins: {
      old_commit: raw.state_fingerprint.git_head,
      new_commit: raw.state_fingerprint.git_head,
      checkpoint_digest: parent.repository_fingerprint,
      work_order_digest: opts.work_order_digest,
    },
  });
  return authenticated;
}

/** Public preparation output is inert. Only an exact separate operator decision can admit it. */
export function candidatePublicationApprovalRequest(raw: unknown) {
  const request = candidatePublicationRequestSchema.parse(raw);
  return {
    kind: "approval_required" as const,
    operation: "candidate.publish" as const,
    request,
    approval_digest: k.kernelDigest({
      operation: "candidate.publish",
      request_digest: request.digest,
    }),
    permitted_effects: ["publish_exact_candidate_ref"],
    forbidden_effects: ["commit", "force_push", "merge", "integration", "task_completion"],
  };
}

/** Rejects rehashed requests whose immutable payload no longer matches the live native attempt. */
export function assertCandidateAttempt(opts: {
  request: CandidatePublicationRequest;
  raw: unknown;
  record: KernelRecord;
  root: string;
}) {
  const request = candidatePublicationRequestSchema.parse(opts.request);
  const authenticated = authenticateCandidateAttempt({
    ...opts,
    work_order_digest: request.work_order_digest as k.Sha256Digest,
  });
  const binding = authenticated.order.canonical_binding;
  if (binding?.phase !== "implementation")
    throw new Error("Candidate requires implementation binding");
  const expected = {
    task_id: opts.record.aggregate.id,
    record_digest: opts.record.digest,
    repository_identity: binding.repository_identity,
    plan_digest: binding.plan_digest,
    plan_revision: binding.plan_revision,
    work_item_id: binding.work_item_id,
    attempt: binding.attempt,
    claim_id: binding.claim_id,
    contract_digest: binding.contract_digest,
    begin_receipt_digest: authenticated.mutation_receipt_digest,
  };
  for (const key of Object.keys(expected) as (keyof typeof expected)[]) {
    if (request[key] !== expected[key])
      throw new Error(`Candidate publication current native binding changed: ${key}`);
  }
  return authenticated;
}
