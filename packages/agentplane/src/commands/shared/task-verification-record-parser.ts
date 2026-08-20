import { createHash } from "node:crypto";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import {
  verificationInputDigest,
  type VerificationEvidenceReference,
  type VerificationInputIdentity,
} from "./task-verification-input.js";

function sha256(value: string): `sha256:${string}` {
  return `sha256:${createHash("sha256").update(value).digest("hex")}`;
}

function isSha256(value: unknown): value is `sha256:${string}` {
  return typeof value === "string" && /^sha256:[a-f0-9]{64}$/u.test(value);
}

export function hasValidRecordDigest(record: Record<string, unknown>): boolean {
  const { digest, ...payload } = record;
  return (
    typeof digest === "string" &&
    /^sha256:[a-f0-9]{64}$/u.test(digest) &&
    digest === sha256(JSON.stringify(canonicalizeJson(payload)))
  );
}

function parseEvidenceReferences(value: unknown): VerificationEvidenceReference[] | null {
  if (!Array.isArray(value)) return null;
  const references = value.filter((item): item is VerificationEvidenceReference => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return false;
    const reference = item as unknown as Record<string, unknown>;
    return (
      typeof reference.reference === "string" &&
      typeof reference.path === "string" &&
      (reference.fragment === null || typeof reference.fragment === "string") &&
      ["filesystem", "git", "missing", "unsafe"].includes(String(reference.source)) &&
      isSha256(reference.digest)
    );
  });
  return references.length === value.length ? references : null;
}

function parseVerificationExecution(value: unknown): VerificationInputIdentity["execution"] | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const execution = value as Record<string, unknown>;
  const taskIds = execution.task_ids;
  const reasonCodes = execution.reason_codes;
  if (
    !isSha256(execution.digest) ||
    typeof execution.primary_task_id !== "string" ||
    !execution.primary_task_id.trim() ||
    !Array.isArray(taskIds) ||
    taskIds.length === 0 ||
    !taskIds.every((item) => typeof item === "string" && item.trim()) ||
    !taskIds.includes(execution.primary_task_id) ||
    !["direct", "branch_pr"].includes(String(execution.repository_mode)) ||
    !["direct", "branch_pr"].includes(String(execution.selected_mode)) ||
    !["auto", "direct", "branch_pr"].includes(String(execution.requested_mode)) ||
    ![
      "execution_contract",
      "execution_route",
      "repository_floor",
      "repository_default",
      "legacy_migration",
    ].includes(String(execution.route_source)) ||
    !Array.isArray(reasonCodes) ||
    !reasonCodes.every((item) => typeof item === "string") ||
    typeof execution.base_ref !== "string" ||
    !execution.base_ref.trim() ||
    typeof execution.base_sha !== "string" ||
    !/^[0-9a-f]{40,64}$/u.test(execution.base_sha) ||
    !["base_checkout", "task_worktree", "task_branch_snapshot", "backend_projection"].includes(
      String(execution.authoritative_task_source),
    )
  ) {
    return null;
  }
  const { digest, authoritative_task_source: _source, ...identityPayload } = execution;
  if (digest !== sha256(JSON.stringify(canonicalizeJson(identityPayload)))) return null;
  return execution as unknown as NonNullable<VerificationInputIdentity["execution"]>;
}

export function parseVerificationInput(value: unknown): VerificationInputIdentity | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const implementation = input.implementation;
  const context = input.context;
  const environment = input.environment;
  const evidence = input.evidence;
  const execution = input.schema_version === 4 ? parseVerificationExecution(input.execution) : null;
  if (
    (input.schema_version !== 2 && input.schema_version !== 3 && input.schema_version !== 4) ||
    input.kind !== "task_verification_input" ||
    !implementation ||
    typeof implementation !== "object" ||
    Array.isArray(implementation) ||
    !context ||
    typeof context !== "object" ||
    Array.isArray(context) ||
    !environment ||
    typeof environment !== "object" ||
    Array.isArray(environment) ||
    !evidence ||
    typeof evidence !== "object" ||
    Array.isArray(evidence) ||
    (input.schema_version === 4 && !execution) ||
    (input.schema_version !== 4 && input.execution !== undefined)
  ) {
    return null;
  }
  const implementationRecord = implementation as Record<string, unknown>;
  const contextRecord = context as Record<string, unknown>;
  const environmentRecord = environment as Record<string, unknown>;
  const evidenceRecord = evidence as Record<string, unknown>;
  const evidenceReferences = parseEvidenceReferences(evidenceRecord.references);
  const runtime = environmentRecord.runtime;
  if (
    (implementationRecord.strategy !== "branch_diff" && implementationRecord.strategy !== "tree") ||
    !isSha256(implementationRecord.digest) ||
    typeof implementationRecord.target_sha !== "string" ||
    !/^[0-9a-f]{40,64}$/u.test(implementationRecord.target_sha) ||
    (implementationRecord.base_sha !== null &&
      (typeof implementationRecord.base_sha !== "string" ||
        !/^[0-9a-f]{40,64}$/u.test(implementationRecord.base_sha))) ||
    !isSha256(input.verify_steps_digest) ||
    (input.schema_version === 3 && !isSha256(input.verification_contract_digest)) ||
    (input.schema_version === 4 &&
      input.verification_contract_digest !== undefined &&
      !isSha256(input.verification_contract_digest)) ||
    (input.schema_version === 2 && input.verification_contract_digest !== undefined) ||
    !isSha256(contextRecord.digest) ||
    !Array.isArray(contextRecord.paths) ||
    !contextRecord.paths.every((item) => typeof item === "string") ||
    !isSha256(environmentRecord.digest) ||
    !isSha256(evidenceRecord.digest) ||
    !isSha256(evidenceRecord.details_digest) ||
    !evidenceReferences ||
    evidenceRecord.digest !==
      sha256(
        JSON.stringify(
          canonicalizeJson({
            details_digest: evidenceRecord.details_digest,
            references: evidenceReferences.map(
              ({ reference, path: evidencePath, fragment, digest }) => ({
                reference,
                path: evidencePath,
                fragment,
                digest,
              }),
            ),
          }),
        ),
      ) ||
    !runtime ||
    typeof runtime !== "object" ||
    Array.isArray(runtime) ||
    !isSha256(input.digest) ||
    input.digest !==
      verificationInputDigest({
        executionDigest: execution?.digest,
        implementationDigest: String(implementationRecord.digest),
        verifyStepsDigest: String(input.verify_steps_digest),
        verificationContractDigest:
          typeof input.verification_contract_digest === "string"
            ? input.verification_contract_digest
            : null,
        contextDigest: String(contextRecord.digest),
        environmentDigest: String(environmentRecord.digest),
        evidenceDigest: String(evidenceRecord.digest),
      })
  ) {
    return null;
  }
  const runtimeRecord = runtime as Record<string, unknown>;
  if (
    typeof runtimeRecord.platform !== "string" ||
    typeof runtimeRecord.architecture !== "string" ||
    typeof runtimeRecord.node_major !== "string" ||
    (runtimeRecord.bun_major !== null && typeof runtimeRecord.bun_major !== "string")
  ) {
    return null;
  }
  return input as unknown as VerificationInputIdentity;
}
