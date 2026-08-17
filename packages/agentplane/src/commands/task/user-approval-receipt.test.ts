import { generateKeyPairSync, sign } from "node:crypto";

import type { SideEffectAuthorityConfig } from "@agentplaneorg/core/config";
import { describe, expect, it } from "vitest";

import {
  canonicalUserApprovalReceiptPayload,
  type UserApprovalReceipt,
  type UserApprovalReceiptRequest,
  verifyUserApprovalReceipt,
} from "./user-approval-receipt.js";

const TASK_ID = "202608171853-X3FD5M";
const STATE_FINGERPRINT = `sha256:${"a".repeat(64)}`;
const OPERATION_DIGEST = `sha256:${"b".repeat(64)}`;
const STATE_SCOPE_DIGEST = `sha256:${"c".repeat(64)}`;
const NOW = new Date("2026-08-17T18:00:00.000Z");

function issueReceipt(overrides: Partial<UserApprovalReceipt> = {}) {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const receipt: UserApprovalReceipt = {
    schema_version: 1,
    kind: "agentplane.user_approval_receipt",
    receipt_id: "receipt-1",
    issuer: "hermes-bridge",
    subject: "denis",
    decision: "approved",
    approval_type: "side_effect",
    task_id: TASK_ID,
    authority_reference: "route:pr.open",
    state_fingerprint: STATE_FINGERPRINT,
    operation_id: "pr.open",
    operation_digest: OPERATION_DIGEST,
    state_scope_digest: STATE_SCOPE_DIGEST,
    issued_at: "2026-08-17T17:59:00.000Z",
    expires_at: "2026-08-17T18:09:00.000Z",
    signature: "pending",
    ...overrides,
  };
  receipt.signature = sign(
    null,
    Buffer.from(canonicalUserApprovalReceiptPayload(receipt), "utf8"),
    privateKey,
  ).toString("base64url");
  const encoded = Buffer.from(JSON.stringify(receipt), "utf8").toString("base64url");
  const config: SideEffectAuthorityConfig["approval_receipts"] = {
    trusted_issuers: [
      {
        id: "hermes-bridge",
        public_key_spki: publicKey.export({ format: "der", type: "spki" }).toString("base64"),
      },
    ],
    max_ttl_minutes: 15,
    clock_skew_seconds: 0,
  };
  return { encoded, receipt, config };
}

function sideEffectRequest(
  overrides: Partial<UserApprovalReceiptRequest> = {},
): UserApprovalReceiptRequest {
  return {
    approvalType: "side_effect",
    taskId: TASK_ID,
    authorityReference: "route:pr.open",
    stateFingerprint: STATE_FINGERPRINT,
    operationId: "pr.open",
    operationDigest: OPERATION_DIGEST,
    stateScopeDigest: STATE_SCOPE_DIGEST,
    ...overrides,
  };
}

describe("signed user approval receipts", () => {
  it("accepts a trusted, unexpired receipt bound to the exact route", () => {
    const issued = issueReceipt();

    expect(
      verifyUserApprovalReceipt({
        encoded: issued.encoded,
        config: issued.config,
        request: sideEffectRequest(),
        now: NOW,
      }),
    ).toMatchObject({
      actor: "USER:denis@hermes-bridge",
      digest: expect.stringMatching(/^sha256:[0-9a-f]{64}$/u) as unknown as string,
      receipt: { receipt_id: "receipt-1" },
    });
  });

  it("rejects a forged receipt whose signed payload was altered", () => {
    const issued = issueReceipt();
    const forged = { ...issued.receipt, subject: "attacker" };
    const encoded = Buffer.from(JSON.stringify(forged), "utf8").toString("base64url");

    expect(() =>
      verifyUserApprovalReceipt({
        encoded,
        config: issued.config,
        request: sideEffectRequest(),
        now: NOW,
      }),
    ).toThrow("signature is invalid");
  });

  it("rejects receipts from an issuer outside the configured trust boundary", () => {
    const issued = issueReceipt();

    expect(() =>
      verifyUserApprovalReceipt({
        encoded: issued.encoded,
        config: { ...issued.config, trusted_issuers: [] },
        request: sideEffectRequest(),
        now: NOW,
      }),
    ).toThrow("issuer is not trusted");
  });

  it("rejects state drift and a wrong side-effect scope", () => {
    const issued = issueReceipt();

    for (const request of [
      sideEffectRequest({ stateFingerprint: `sha256:${"d".repeat(64)}` }),
      sideEffectRequest({ stateScopeDigest: `sha256:${"e".repeat(64)}` }),
    ]) {
      expect(() =>
        verifyUserApprovalReceipt({
          encoded: issued.encoded,
          config: issued.config,
          request,
          now: NOW,
        }),
      ).toThrow("stale or does not match");
    }
  });

  it("rejects expired receipts and receipts exceeding the configured TTL", () => {
    const expired = issueReceipt({
      issued_at: "2026-08-17T17:40:00.000Z",
      expires_at: "2026-08-17T17:50:00.000Z",
    });
    expect(() =>
      verifyUserApprovalReceipt({
        encoded: expired.encoded,
        config: expired.config,
        request: sideEffectRequest(),
        now: NOW,
      }),
    ).toThrow("has expired");

    const excessive = issueReceipt({ expires_at: "2026-08-17T18:19:00.000Z" });
    expect(() =>
      verifyUserApprovalReceipt({
        encoded: excessive.encoded,
        config: excessive.config,
        request: sideEffectRequest(),
        now: NOW,
      }),
    ).toThrow("TTL exceeds");
  });

  it("keeps plan approval semantic and free of side-effect fields", () => {
    const issued = issueReceipt({
      approval_type: "plan_approval",
      authority_reference: "plan",
      operation_id: null,
      operation_digest: null,
      state_scope_digest: null,
    });

    expect(
      verifyUserApprovalReceipt({
        encoded: issued.encoded,
        config: issued.config,
        request: {
          approvalType: "plan_approval",
          taskId: TASK_ID,
          authorityReference: "plan",
          stateFingerprint: STATE_FINGERPRINT,
        },
        now: NOW,
      }).actor,
    ).toBe("USER:denis@hermes-bridge");
  });
});
