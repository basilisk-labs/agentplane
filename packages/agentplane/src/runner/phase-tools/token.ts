import {
  createHash,
  createPublicKey,
  generateKeyPairSync,
  type KeyObject,
  randomUUID,
  sign,
  verify,
} from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { atomicWriteFile } from "@agentplaneorg/core/fs";

import { isRecord } from "../../shared/guards.js";
import {
  readStableRegularTextNoFollow,
  writeNewStableRegularFileNoFollow,
} from "../stable-file.js";
import type {
  RunnerContextBundle,
  RunnerPhaseToolManifest,
  RunnerPhaseToolName,
  RunnerPhaseToolResponseCode,
} from "../types.js";
import {
  buildRunnerPhaseToolManifest,
  RUNNER_PHASE_TOOL_AUDIT_RELATIVE_DIRECTORY,
  RUNNER_PHASE_TOOL_GRANT_RELATIVE_PATH,
  runScopedPhaseToolNames,
} from "./contract.js";

const TOKEN_PREFIX = "apt1";
const DEFAULT_TOKEN_TTL_MS = 30 * 60 * 1000;
const MIN_TOKEN_TTL_MS = 5 * 60 * 1000;
const MAX_TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

type RunnerPhaseToolTokenClaims = {
  schema_version: 1;
  kind: "runner_phase_tool_token";
  token_id: string;
  run_id: string;
  work_order_id: string;
  task_id: string;
  state_fingerprint_digest: string;
  phase: string;
  role: RunnerPhaseToolManifest["role"];
  allowed_tools: RunnerPhaseToolName[];
  issued_at: string;
  expires_at: string;
};

export type RunnerPhaseToolGrantRecord = {
  schema_version: 1;
  kind: "runner_phase_tool_grant";
  public_key_spki: string;
  claims: RunnerPhaseToolTokenClaims;
  manifest_digest: string;
  revoked_at: string | null;
  revoke_reason: "terminal_report" | "supervisor_revoke" | null;
  digest: string;
};

export type RunnerPhaseToolGrant = {
  manifest: RunnerPhaseToolManifest;
  token: string;
  record: RunnerPhaseToolGrantRecord;
};

export type RunnerPhaseToolTokenValidation =
  | {
      status: "valid";
      claims: RunnerPhaseToolTokenClaims;
      record: RunnerPhaseToolGrantRecord;
    }
  | {
      status: "denied";
      code: Extract<
        RunnerPhaseToolResponseCode,
        "invalid_token" | "token_expired" | "token_revoked" | "tool_not_allowed"
      >;
      message: string;
      record: RunnerPhaseToolGrantRecord | null;
    };

function sha256Json(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

function clampTokenTtl(bundle: RunnerContextBundle): number {
  const wallClockMs = bundle.execution.timeout_policy.wall_clock_ms;
  const graceMs = bundle.execution.timeout_policy.terminate_grace_ms;
  const requested =
    wallClockMs > 0 ? wallClockMs + Math.max(0, graceMs) + 60_000 : DEFAULT_TOKEN_TTL_MS;
  return Math.min(MAX_TOKEN_TTL_MS, Math.max(MIN_TOKEN_TTL_MS, requested));
}

function recordDigest(
  value: Omit<RunnerPhaseToolGrantRecord, "digest">,
): RunnerPhaseToolGrantRecord {
  return { ...value, digest: sha256Json(value) };
}

function encodeClaims(claims: RunnerPhaseToolTokenClaims): string {
  return Buffer.from(JSON.stringify(claims), "utf8").toString("base64url");
}

function signedToken(opts: { claims: RunnerPhaseToolTokenClaims; private_key: KeyObject }): string {
  const payload = encodeClaims(opts.claims);
  const signature = sign(null, Buffer.from(payload, "utf8"), opts.private_key).toString(
    "base64url",
  );
  return `${TOKEN_PREFIX}.${payload}.${signature}`;
}

function grantPath(runDir: string): string {
  return path.join(runDir, RUNNER_PHASE_TOOL_GRANT_RELATIVE_PATH);
}

function auditDirectory(runDir: string): string {
  return path.join(runDir, RUNNER_PHASE_TOOL_AUDIT_RELATIVE_DIRECTORY);
}

function validClaims(value: unknown): value is RunnerPhaseToolTokenClaims {
  if (!isRecord(value)) return false;
  return (
    value.schema_version === 1 &&
    value.kind === "runner_phase_tool_token" &&
    typeof value.token_id === "string" &&
    value.token_id.length > 0 &&
    typeof value.run_id === "string" &&
    value.run_id.length > 0 &&
    typeof value.work_order_id === "string" &&
    value.work_order_id.length > 0 &&
    typeof value.task_id === "string" &&
    value.task_id.length > 0 &&
    typeof value.state_fingerprint_digest === "string" &&
    /^sha256:[0-9a-f]{64}$/u.test(value.state_fingerprint_digest) &&
    typeof value.phase === "string" &&
    value.phase.length > 0 &&
    (value.role === "PLANNER" ||
      value.role === "CURATOR" ||
      value.role === "EXECUTOR" ||
      value.role === "EVALUATOR") &&
    Array.isArray(value.allowed_tools) &&
    value.allowed_tools.every(
      (tool) =>
        tool === "report_result" ||
        tool === "report_blocker" ||
        tool === "request_knowledge" ||
        tool === "knowledge_search" ||
        tool === "knowledge_show",
    ) &&
    typeof value.issued_at === "string" &&
    Number.isFinite(Date.parse(value.issued_at)) &&
    typeof value.expires_at === "string" &&
    Number.isFinite(Date.parse(value.expires_at))
  );
}

function parseGrant(value: unknown): RunnerPhaseToolGrantRecord {
  if (!isRecord(value)) throw new Error("Run phase-tool grant must be an object.");
  const { digest, ...unsigned } = value;
  if (
    value.schema_version !== 1 ||
    value.kind !== "runner_phase_tool_grant" ||
    typeof value.public_key_spki !== "string" ||
    value.public_key_spki.length === 0 ||
    !validClaims(value.claims) ||
    typeof value.manifest_digest !== "string" ||
    !/^sha256:[0-9a-f]{64}$/u.test(value.manifest_digest) ||
    (value.revoked_at !== null &&
      (typeof value.revoked_at !== "string" || !Number.isFinite(Date.parse(value.revoked_at)))) ||
    (value.revoke_reason !== null &&
      value.revoke_reason !== "terminal_report" &&
      value.revoke_reason !== "supervisor_revoke") ||
    typeof digest !== "string" ||
    digest !== sha256Json(unsigned)
  ) {
    throw new Error("Run phase-tool grant is malformed or its digest is invalid.");
  }
  return value as RunnerPhaseToolGrantRecord;
}

export async function issueRunnerPhaseToolGrant(opts: {
  bundle: RunnerContextBundle;
  now?: Date;
  ttl_ms?: number;
}): Promise<RunnerPhaseToolGrant | null> {
  const workOrder = opts.bundle.work_order;
  const task = opts.bundle.task;
  if (!workOrder || !task) return null;
  const issuedAt = opts.now ?? new Date();
  const ttlMs = opts.ttl_ms ?? clampTokenTtl(opts.bundle);
  const tokenId = randomUUID();
  const tokenSummary = {
    id: tokenId,
    issued_at: issuedAt.toISOString(),
    expires_at: new Date(issuedAt.getTime() + ttlMs).toISOString(),
    terminal_reports_revoke: true as const,
  };
  const manifest = buildRunnerPhaseToolManifest({
    bundle: opts.bundle,
    token: tokenSummary,
    grant_path: grantPath(opts.bundle.execution.artifact_paths.run_dir),
    audit_directory: auditDirectory(opts.bundle.execution.artifact_paths.run_dir),
  });
  if (!manifest) return null;
  const claims: RunnerPhaseToolTokenClaims = {
    schema_version: 1,
    kind: "runner_phase_tool_token",
    token_id: tokenId,
    run_id: manifest.run_id,
    work_order_id: manifest.work_order_id,
    task_id: manifest.task_id,
    state_fingerprint_digest: workOrder.state_fingerprint.digest,
    phase: manifest.phase,
    role: manifest.role,
    allowed_tools: runScopedPhaseToolNames(manifest),
    issued_at: tokenSummary.issued_at,
    expires_at: tokenSummary.expires_at,
  };
  const keyPair = generateKeyPairSync("ed25519");
  const publicKeySpki = keyPair.publicKey
    .export({ format: "der", type: "spki" })
    .toString("base64");
  const record = recordDigest({
    schema_version: 1,
    kind: "runner_phase_tool_grant",
    public_key_spki: publicKeySpki,
    claims,
    manifest_digest: sha256Json(manifest),
    revoked_at: null,
    revoke_reason: null,
  });
  const filePath = grantPath(opts.bundle.execution.artifact_paths.run_dir);
  await mkdir(path.dirname(filePath), { recursive: true, mode: 0o700 });
  await mkdir(auditDirectory(opts.bundle.execution.artifact_paths.run_dir), {
    recursive: true,
    mode: 0o700,
  });
  await writeNewStableRegularFileNoFollow(
    filePath,
    `${JSON.stringify(record, null, 2)}\n`,
    "runner phase-tool grant",
  );
  return {
    manifest,
    token: signedToken({ claims, private_key: keyPair.privateKey }),
    record,
  };
}

export async function readRunnerPhaseToolGrant(
  runDir: string,
): Promise<RunnerPhaseToolGrantRecord> {
  return parseGrant(
    JSON.parse(
      await readStableRegularTextNoFollow(grantPath(runDir), "runner phase-tool grant"),
    ) as unknown,
  );
}

export async function validateRunnerPhaseToolToken(opts: {
  run_dir: string;
  token: string;
  tool: string;
  now?: Date;
}): Promise<RunnerPhaseToolTokenValidation> {
  let record: RunnerPhaseToolGrantRecord;
  try {
    record = await readRunnerPhaseToolGrant(opts.run_dir);
  } catch {
    return {
      status: "denied",
      code: "invalid_token",
      message: "The run-scoped phase-tool grant is missing or invalid.",
      record: null,
    };
  }
  const parts = opts.token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_PREFIX) {
    return {
      status: "denied",
      code: "invalid_token",
      message: "The run-scoped phase token has an invalid envelope.",
      record,
    };
  }
  let claims: unknown;
  try {
    claims = JSON.parse(Buffer.from(parts[1]!, "base64url").toString("utf8")) as unknown;
  } catch {
    claims = null;
  }
  if (!validClaims(claims) || JSON.stringify(claims) !== JSON.stringify(record.claims)) {
    return {
      status: "denied",
      code: "invalid_token",
      message: "The run-scoped phase token claims do not match the durable grant.",
      record,
    };
  }
  let signatureValid = false;
  try {
    const publicKey = createPublicKey({
      key: Buffer.from(record.public_key_spki, "base64"),
      format: "der",
      type: "spki",
    });
    signatureValid = verify(
      null,
      Buffer.from(parts[1]!, "utf8"),
      publicKey,
      Buffer.from(parts[2]!, "base64url"),
    );
  } catch {
    signatureValid = false;
  }
  if (!signatureValid) {
    return {
      status: "denied",
      code: "invalid_token",
      message: "The run-scoped phase token signature is invalid.",
      record,
    };
  }
  if (record.revoked_at !== null) {
    return {
      status: "denied",
      code: "token_revoked",
      message: "The run-scoped phase token was revoked.",
      record,
    };
  }
  if ((opts.now ?? new Date()).getTime() >= Date.parse(claims.expires_at)) {
    return {
      status: "denied",
      code: "token_expired",
      message: "The run-scoped phase token has expired.",
      record,
    };
  }
  if (!claims.allowed_tools.includes(opts.tool as RunnerPhaseToolName)) {
    return {
      status: "denied",
      code: "tool_not_allowed",
      message: `The current run-scoped phase token does not allow ${JSON.stringify(opts.tool)}.`,
      record,
    };
  }
  return { status: "valid", claims, record };
}

export async function revokeRunnerPhaseToolGrant(opts: {
  run_dir: string;
  record: RunnerPhaseToolGrantRecord;
  at?: Date;
  reason: NonNullable<RunnerPhaseToolGrantRecord["revoke_reason"]>;
}): Promise<RunnerPhaseToolGrantRecord> {
  if (opts.record.revoked_at !== null) return opts.record;
  const revoked = recordDigest({
    schema_version: opts.record.schema_version,
    kind: opts.record.kind,
    public_key_spki: opts.record.public_key_spki,
    claims: opts.record.claims,
    manifest_digest: opts.record.manifest_digest,
    revoked_at: (opts.at ?? new Date()).toISOString(),
    revoke_reason: opts.reason,
  });
  await atomicWriteFile(grantPath(opts.run_dir), `${JSON.stringify(revoked, null, 2)}\n`, "utf8");
  return revoked;
}

export function runnerPhaseToolManifestDigest(manifest: RunnerPhaseToolManifest): string {
  return sha256Json(manifest);
}
