import { kernelDigest } from "./digest.js";
import type { Sha256Digest } from "./model.js";

const objectId = /^[0-9a-f]{40,64}$/u;
const digest = /^sha256:[0-9a-f]{64}$/u;

export type HostedPrIdentity = Readonly<{
  provider: string;
  hostname: string;
  remote: string;
  source_project: string;
  target_project: string;
  pr_number: number;
  head_ref: string;
  base_ref: string;
}>;

export type HostedPrHeadEvidence = Readonly<{
  schema_version: 1;
  kind: "adopted_hosted_pr_head";
  task_id: string;
  work_order_id: Sha256Digest;
  adoption_digest: Sha256Digest;
  identity: HostedPrIdentity;
  adopted_head: string;
  adopted_base: string;
  current_head: string;
  current_base: string;
  current_readback_digest: Sha256Digest;
  head_tree: string;
  checkout_head: string;
  checkout_tree: string;
  head_descends_from_adoption: boolean;
  base_descends_from_adoption: boolean;
  digest: Sha256Digest;
}>;

/** A task checkout is not the implementation checkout for an adopted hosted PR. */
export function bindHostedPrHeadEvidence(
  input: Omit<HostedPrHeadEvidence, "schema_version" | "kind" | "digest">,
): HostedPrHeadEvidence {
  const { identity } = input;
  if (
    !input.task_id ||
    !digest.test(input.work_order_id) ||
    !digest.test(input.adoption_digest) ||
    !digest.test(input.current_readback_digest) ||
    !identity.provider ||
    !identity.hostname ||
    !identity.remote ||
    !identity.source_project ||
    identity.source_project !== identity.target_project ||
    !Number.isSafeInteger(identity.pr_number) ||
    identity.pr_number <= 0 ||
    !identity.head_ref ||
    !identity.base_ref ||
    ![
      input.adopted_head,
      input.adopted_base,
      input.current_head,
      input.current_base,
      input.head_tree,
      input.checkout_head,
      input.checkout_tree,
    ].every((value) => objectId.test(value)) ||
    input.current_head !== input.checkout_head ||
    input.head_tree !== input.checkout_tree ||
    !input.head_descends_from_adoption ||
    !input.base_descends_from_adoption
  ) {
    throw new Error("Adopted hosted PR head evidence is incomplete or stale");
  }
  const contents = {
    schema_version: 1 as const,
    kind: "adopted_hosted_pr_head" as const,
    ...input,
  };
  return { ...contents, digest: kernelDigest(contents) };
}

export function validateHostedPrHeadEvidence(
  evidence: HostedPrHeadEvidence,
  expected: Readonly<{
    task_id: string;
    work_order_id: Sha256Digest;
    adoption_digest: Sha256Digest;
    identity: HostedPrIdentity;
    current_head: string;
    current_base: string;
    current_readback_digest: Sha256Digest;
  }>,
): boolean {
  try {
    const { digest: stored, schema_version, kind, ...input } = evidence;
    if (schema_version !== 1 || kind !== "adopted_hosted_pr_head") return false;
    const bound = bindHostedPrHeadEvidence(input);
    return (
      stored === bound.digest &&
      evidence.task_id === expected.task_id &&
      evidence.work_order_id === expected.work_order_id &&
      evidence.adoption_digest === expected.adoption_digest &&
      kernelDigest(evidence.identity) === kernelDigest(expected.identity) &&
      evidence.current_head === expected.current_head &&
      evidence.current_base === expected.current_base &&
      evidence.current_readback_digest === expected.current_readback_digest
    );
  } catch {
    return false;
  }
}
