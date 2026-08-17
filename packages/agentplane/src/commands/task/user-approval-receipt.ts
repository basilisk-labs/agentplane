import { createHash, createPublicKey, verify } from "node:crypto";

import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import { canonicalizeJson } from "@agentplaneorg/core/tasks";

import { CliError } from "../../shared/errors.js";
import { isRecord } from "../../shared/guards.js";
import type { WorkflowStep } from "../shared/workflow-step.js";

const RECEIPT_KIND = "agentplane.user_approval_receipt" as const;
const MAX_ENCODED_RECEIPT_BYTES = 24 * 1024;
const SUBJECT_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._@-]{0,127}$/u;
const RECEIPT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._-]{0,127}$/u;
const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/u;
const RECEIPT_KEYS = [
  "approval_type",
  "authority_reference",
  "decision",
  "expires_at",
  "issued_at",
  "issuer",
  "kind",
  "operation_digest",
  "operation_id",
  "receipt_id",
  "schema_version",
  "signature",
  "state_fingerprint",
  "state_scope_digest",
  "subject",
  "task_id",
] as const;

export type UserApprovalType = "plan_approval" | "side_effect" | "provider_merge";

export type UserApprovalReceipt = {
  schema_version: 1;
  kind: typeof RECEIPT_KIND;
  receipt_id: string;
  issuer: string;
  subject: string;
  decision: "approved";
  approval_type: UserApprovalType;
  task_id: string;
  authority_reference: string;
  state_fingerprint: string;
  operation_id: string | null;
  operation_digest: string | null;
  state_scope_digest: string | null;
  issued_at: string;
  expires_at: string;
  signature: string;
};

export type UserApprovalReceiptRequest = {
  approvalType: UserApprovalType;
  taskId: string;
  authorityReference: string;
  stateFingerprint: string;
  operationId?: string | null;
  operationDigest?: string | null;
  stateScopeDigest?: string | null;
};

export type VerifiedUserApprovalReceipt = {
  receipt: UserApprovalReceipt;
  actor: string;
  digest: string;
};

function receiptError(message: string): CliError {
  return new CliError({ exitCode: 3, code: "E_VALIDATION", message });
}

function exactKeys(value: Record<string, unknown>): boolean {
  return Object.keys(value).toSorted().join("\n") === [...RECEIPT_KEYS].toSorted().join("\n");
}

function isIsoTimestamp(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function parseReceipt(encoded: string): UserApprovalReceipt {
  const normalized = encoded.trim();
  if (!normalized || Buffer.byteLength(normalized, "utf8") > MAX_ENCODED_RECEIPT_BYTES) {
    throw receiptError("Approval receipt is empty or exceeds the 24 KiB encoded limit.");
  }
  let value: unknown;
  try {
    const decoded = Buffer.from(normalized, "base64url");
    if (decoded.length === 0 || decoded.toString("base64url") !== normalized.replace(/=+$/u, "")) {
      throw new Error("non-canonical base64url");
    }
    value = JSON.parse(decoded.toString("utf8"));
  } catch {
    throw receiptError("Approval receipt must be canonical base64url-encoded JSON.");
  }
  if (!isRecord(value) || !exactKeys(value)) {
    throw receiptError("Approval receipt has an invalid or non-exact field set.");
  }
  if (
    value.schema_version !== 1 ||
    value.kind !== RECEIPT_KIND ||
    typeof value.receipt_id !== "string" ||
    !RECEIPT_ID_PATTERN.test(value.receipt_id) ||
    typeof value.issuer !== "string" ||
    !value.issuer.trim() ||
    typeof value.subject !== "string" ||
    !SUBJECT_PATTERN.test(value.subject) ||
    value.decision !== "approved" ||
    !["plan_approval", "side_effect", "provider_merge"].includes(String(value.approval_type)) ||
    typeof value.task_id !== "string" ||
    !value.task_id.trim() ||
    typeof value.authority_reference !== "string" ||
    !value.authority_reference.trim() ||
    typeof value.state_fingerprint !== "string" ||
    !DIGEST_PATTERN.test(value.state_fingerprint) ||
    (value.operation_id !== null && typeof value.operation_id !== "string") ||
    (value.operation_digest !== null &&
      (typeof value.operation_digest !== "string" ||
        !DIGEST_PATTERN.test(value.operation_digest))) ||
    (value.state_scope_digest !== null &&
      (typeof value.state_scope_digest !== "string" ||
        !DIGEST_PATTERN.test(value.state_scope_digest))) ||
    !isIsoTimestamp(value.issued_at) ||
    !isIsoTimestamp(value.expires_at) ||
    typeof value.signature !== "string" ||
    !value.signature.trim()
  ) {
    throw receiptError("Approval receipt fields are malformed.");
  }
  return value as UserApprovalReceipt;
}

export function canonicalUserApprovalReceiptPayload(receipt: UserApprovalReceipt): string {
  const { signature: _signature, ...unsigned } = receipt;
  const canonical = JSON.stringify(canonicalizeJson(unsigned));
  if (typeof canonical !== "string")
    throw receiptError("Approval receipt cannot be canonicalized.");
  return canonical;
}

function receiptDigest(receipt: UserApprovalReceipt): string {
  const canonical = canonicalUserApprovalReceiptPayload(receipt);
  return `sha256:${createHash("sha256").update(canonical, "utf8").digest("hex")}`;
}

export function userApprovalReceiptRequestForStep(
  step: Extract<WorkflowStep, { kind: "approval" }>,
): UserApprovalReceiptRequest {
  if (step.request.type === "side_effect") {
    return {
      approvalType: "side_effect",
      taskId: step.request.taskId,
      authorityReference: step.request.authorityRef,
      stateFingerprint: step.request.stateFingerprintDigest,
      operationId: step.request.operationId,
      operationDigest: step.request.operationDigest,
      stateScopeDigest: step.request.stateScopeDigest,
    };
  }
  return {
    approvalType: step.request.type,
    taskId: step.request.taskId,
    authorityReference: step.request.authorityRef,
    stateFingerprint: step.preconditionFingerprint.digest,
  };
}

function assertRequestBinding(
  receipt: UserApprovalReceipt,
  request: UserApprovalReceiptRequest,
): void {
  const expectedOperationId = request.operationId ?? null;
  const expectedOperationDigest = request.operationDigest ?? null;
  const expectedScopeDigest = request.stateScopeDigest ?? null;
  if (
    receipt.approval_type !== request.approvalType ||
    receipt.task_id !== request.taskId ||
    receipt.authority_reference !== request.authorityReference ||
    receipt.state_fingerprint !== request.stateFingerprint ||
    receipt.operation_id !== expectedOperationId ||
    receipt.operation_digest !== expectedOperationDigest ||
    receipt.state_scope_digest !== expectedScopeDigest
  ) {
    throw receiptError("Approval receipt is stale or does not match the current task route.");
  }
  if (
    receipt.approval_type === "side_effect" &&
    (!receipt.operation_id || !receipt.operation_digest || !receipt.state_scope_digest)
  ) {
    throw receiptError("Side-effect approval receipt is missing state-bound operation fields.");
  }
  if (
    receipt.approval_type !== "side_effect" &&
    (receipt.operation_id !== null ||
      receipt.operation_digest !== null ||
      receipt.state_scope_digest !== null)
  ) {
    throw receiptError("Semantic approval receipts cannot contain side-effect operation fields.");
  }
}

export function verifyUserApprovalReceipt(opts: {
  encoded: string;
  config: SideEffectAuthorityConfig["approval_receipts"];
  request: UserApprovalReceiptRequest;
  now?: Date;
}): VerifiedUserApprovalReceipt {
  const receipt = parseReceipt(opts.encoded);
  assertRequestBinding(receipt, opts.request);
  const issuer = opts.config.trusted_issuers.find((item) => item.id === receipt.issuer);
  if (!issuer) throw receiptError(`Approval receipt issuer is not trusted: ${receipt.issuer}`);

  const now = (opts.now ?? new Date()).getTime();
  const issuedAt = Date.parse(receipt.issued_at);
  const expiresAt = Date.parse(receipt.expires_at);
  const skewMs = opts.config.clock_skew_seconds * 1000;
  const maxTtlMs = opts.config.max_ttl_minutes * 60_000;
  if (issuedAt > now + skewMs) throw receiptError("Approval receipt was issued in the future.");
  if (expiresAt <= now - skewMs) throw receiptError("Approval receipt has expired.");
  if (expiresAt <= issuedAt || expiresAt - issuedAt > maxTtlMs) {
    throw receiptError("Approval receipt TTL exceeds the configured trust window.");
  }

  let valid = false;
  try {
    const key = createPublicKey({
      key: Buffer.from(issuer.public_key_spki, "base64"),
      format: "der",
      type: "spki",
    });
    valid = verify(
      null,
      Buffer.from(canonicalUserApprovalReceiptPayload(receipt), "utf8"),
      key,
      Buffer.from(receipt.signature, "base64url"),
    );
  } catch {
    valid = false;
  }
  if (!valid) throw receiptError("Approval receipt signature is invalid.");

  return {
    receipt,
    actor: `USER:${receipt.subject}@${receipt.issuer}`,
    digest: receiptDigest(receipt),
  };
}
