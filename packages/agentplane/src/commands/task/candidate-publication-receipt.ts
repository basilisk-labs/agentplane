import path from "node:path";
import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  publishNewStableRegularFileNoFollow,
  readStableRegularTextNoFollow,
} from "../../shared/stable-file.js";
import type { CandidatePublicationRequest } from "./candidate-publication-request.js";

function identity(request: CandidatePublicationRequest, authority: string) {
  return {
    kind: "candidate_publication_receipt" as const,
    schema_version: 1 as const,
    task_id: request.task_id,
    request_digest: request.digest,
    authority_digest: authority,
    commit: request.commit,
    tree: request.tree,
    files_digest: request.files_digest,
    remote_url: request.remote_url,
    candidate_ref: request.candidate_ref,
    observed_head: request.commit,
    qualification: "not_established" as const,
  };
}
const schema = z.strictObject({
  kind: z.literal("candidate_publication_receipt"),
  schema_version: z.literal(1),
  task_id: z.string(),
  request_digest: z.string(),
  authority_digest: z.string(),
  commit: z.string(),
  tree: z.string(),
  files_digest: z.string(),
  remote_url: z.string(),
  candidate_ref: z.string(),
  observed_head: z.string(),
  qualification: z.literal("not_established"),
  reconciled: z.boolean(),
  observed_at: z.string().refine((value) => Number.isFinite(Date.parse(value))),
  digest: z.string(),
});

export async function readCandidateReceipt(
  directory: string,
  request: CandidatePublicationRequest,
  authority: string,
) {
  const result = schema.parse(
    JSON.parse(
      await readStableRegularTextNoFollow(
        path.join(directory, "receipt.json"),
        "candidate publication receipt",
      ),
    ),
  );
  const { digest, observed_at: _at, reconciled: _reconciled, ...bound } = result;
  const { digest: _digest, ...contents } = result;
  if (
    digest !== k.kernelDigest(contents) ||
    k.kernelDigest(bound) !== k.kernelDigest(identity(request, authority))
  )
    throw new Error("Candidate publication receipt identity or digest changed");
  return result;
}

export async function persistCandidateReceipt(
  directory: string,
  request: CandidatePublicationRequest,
  authority: string,
  reconciled: boolean,
) {
  const value = {
    ...identity(request, authority),
    reconciled,
    observed_at: new Date().toISOString(),
  };
  await publishNewStableRegularFileNoFollow(
    path.join(directory, "receipt.json"),
    JSON.stringify({ ...value, digest: k.kernelDigest(value) }),
    "candidate publication receipt",
  );
  return await readCandidateReceipt(directory, request, authority);
}
