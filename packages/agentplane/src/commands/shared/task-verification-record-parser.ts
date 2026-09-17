import { createHash } from "node:crypto";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";
import {
  verificationInputDigest,
  verificationInputV5Digest,
  type VerificationEvidenceReference,
  type VerificationExecutionIdentity,
  type VerificationInputIdentity,
  type VerificationInputIdentityV5,
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

function parseVerificationExecution(value: unknown): VerificationExecutionIdentity | null {
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
  return execution as unknown as VerificationExecutionIdentity;
}

function validDigestObject(value: Record<string, unknown>): boolean {
  const { digest, ...identity } = value;
  return isSha256(digest) && digest === sha256(JSON.stringify(canonicalizeJson(identity)));
}

function parseVerificationInputV5(
  input: Record<string, unknown>,
): VerificationInputIdentityV5 | null {
  const concurrency = input.concurrency;
  const checked = input.checked_input;
  const obligations = input.obligations;
  if (
    input.kind !== "task_verification_input" ||
    !concurrency ||
    typeof concurrency !== "object" ||
    Array.isArray(concurrency) ||
    !checked ||
    typeof checked !== "object" ||
    Array.isArray(checked) ||
    !obligations ||
    typeof obligations !== "object" ||
    Array.isArray(obligations) ||
    !isSha256(input.digest)
  ) {
    return null;
  }
  const concurrencyRecord = concurrency as Record<string, unknown>;
  const checkedRecord = checked as Record<string, unknown>;
  const obligationsRecord = obligations as Record<string, unknown>;
  const execution = parseVerificationExecution(concurrencyRecord.execution);
  const task = concurrencyRecord.task;
  const implementation = checkedRecord.implementation;
  const commands = checkedRecord.commands;
  const context = checkedRecord.context;
  const environment = checkedRecord.environment;
  const evidence = checkedRecord.evidence;
  if (
    !execution ||
    !task ||
    typeof task !== "object" ||
    Array.isArray(task) ||
    !implementation ||
    typeof implementation !== "object" ||
    Array.isArray(implementation) ||
    !commands ||
    typeof commands !== "object" ||
    Array.isArray(commands) ||
    !context ||
    typeof context !== "object" ||
    Array.isArray(context) ||
    !environment ||
    typeof environment !== "object" ||
    Array.isArray(environment) ||
    !evidence ||
    typeof evidence !== "object" ||
    Array.isArray(evidence)
  ) {
    return null;
  }
  const taskRecord = task as Record<string, unknown>;
  const implementationRecord = implementation as Record<string, unknown>;
  const commandsRecord = commands as Record<string, unknown>;
  const contextRecord = context as Record<string, unknown>;
  const environmentRecord = environment as Record<string, unknown>;
  const evidenceRecord = evidence as Record<string, unknown>;
  const references = parseEvidenceReferences(evidenceRecord.references);
  const entries = commandsRecord.entries;
  const runtime = environmentRecord.runtime;
  const requiredCheckIds = obligationsRecord.required_check_ids;
  if (
    taskRecord.schema_version !== 1 ||
    taskRecord.kind !== "agentplane.native_task_identity" ||
    taskRecord.task_id !== execution.primary_task_id ||
    !validDigestObject(taskRecord) ||
    !isSha256((taskRecord.plan as Record<string, unknown> | undefined)?.digest) ||
    !isSha256((taskRecord.policy as Record<string, unknown> | undefined)?.digest) ||
    !isSha256((taskRecord.capability as Record<string, unknown> | undefined)?.digest) ||
    !isSha256((taskRecord.checks as Record<string, unknown> | undefined)?.digest) ||
    (implementationRecord.strategy !== "branch_diff" && implementationRecord.strategy !== "tree") ||
    !isSha256(implementationRecord.digest) ||
    typeof implementationRecord.target_sha !== "string" ||
    !/^[0-9a-f]{40,64}$/u.test(implementationRecord.target_sha) ||
    (implementationRecord.base_sha !== null &&
      (typeof implementationRecord.base_sha !== "string" ||
        !/^[0-9a-f]{40,64}$/u.test(implementationRecord.base_sha))) ||
    !Array.isArray(entries) ||
    !entries.every(
      (entry) =>
        entry &&
        typeof entry === "object" &&
        !Array.isArray(entry) &&
        ((entry as Record<string, unknown>).check_id === null ||
          typeof (entry as Record<string, unknown>).check_id === "string") &&
        typeof (entry as Record<string, unknown>).command === "string",
    ) ||
    !isSha256(commandsRecord.digest) ||
    commandsRecord.digest !== sha256(JSON.stringify(canonicalizeJson(entries))) ||
    !isSha256(contextRecord.digest) ||
    !Array.isArray(contextRecord.paths) ||
    !contextRecord.paths.every((item) => typeof item === "string") ||
    !isSha256(environmentRecord.digest) ||
    !runtime ||
    typeof runtime !== "object" ||
    Array.isArray(runtime) ||
    !isSha256(evidenceRecord.digest) ||
    !isSha256(evidenceRecord.details_digest) ||
    !references ||
    !isSha256(obligationsRecord.verify_steps_digest) ||
    !isSha256(obligationsRecord.verification_contract_digest) ||
    !Array.isArray(requiredCheckIds) ||
    !requiredCheckIds.every((item) => typeof item === "string" && item.trim())
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
  const expectedEvidenceDigest = sha256(
    JSON.stringify(
      canonicalizeJson({
        details_digest: evidenceRecord.details_digest,
        references: references.map(({ reference, path: evidencePath, fragment, digest }) => ({
          reference,
          path: evidencePath,
          fragment,
          digest,
        })),
      }),
    ),
  );
  const expectedConcurrencyDigest = sha256(
    JSON.stringify(
      canonicalizeJson({
        execution_digest: execution.digest,
        task_digest: taskRecord.digest,
      }),
    ),
  );
  const expectedCheckedDigest = sha256(
    JSON.stringify(
      canonicalizeJson({
        implementation_digest: implementationRecord.digest,
        commands_digest: commandsRecord.digest,
        context_digest: contextRecord.digest,
        environment_digest: environmentRecord.digest,
        evidence_digest: evidenceRecord.digest,
      }),
    ),
  );
  const { digest: _obligationsDigest, ...obligationIdentity } = obligationsRecord;
  const expectedObligationsDigest = sha256(JSON.stringify(canonicalizeJson(obligationIdentity)));
  if (
    evidenceRecord.digest !== expectedEvidenceDigest ||
    concurrencyRecord.digest !== expectedConcurrencyDigest ||
    checkedRecord.digest !== expectedCheckedDigest ||
    obligationsRecord.digest !== expectedObligationsDigest ||
    input.digest !==
      verificationInputV5Digest({
        concurrencyDigest: expectedConcurrencyDigest,
        checkedInputDigest: expectedCheckedDigest,
        obligationsDigest: expectedObligationsDigest,
      })
  ) {
    return null;
  }
  return input as unknown as VerificationInputIdentityV5;
}

export function parseVerificationInput(value: unknown): VerificationInputIdentity | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (input.schema_version === 5) return parseVerificationInputV5(input);
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
