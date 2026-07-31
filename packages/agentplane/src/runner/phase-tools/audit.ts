import { createHash, randomUUID } from "node:crypto";
import { mkdir } from "node:fs/promises";
import path from "node:path";

import { writeNewStableRegularFileNoFollow } from "../stable-file.js";
import type {
  RunnerPhaseToolManifest,
  RunnerPhaseToolResponse,
  RunnerPhaseToolResponseCode,
} from "../types.js";
import type { RunnerPhaseToolGrantRecord } from "./token.js";

type RunnerPhaseToolAudit = {
  schema_version: 1;
  kind: "runner_phase_tool_audit";
  at: string;
  token_id: string;
  run_id: string;
  work_order_id: string;
  phase: string;
  role: RunnerPhaseToolManifest["role"];
  tool: string;
  outcome: "ok" | "denied";
  code: RunnerPhaseToolResponseCode;
  input_digest: string;
  output_digest: string;
  digest: string;
};

function sha256Json(value: unknown): string {
  return `sha256:${createHash("sha256").update(JSON.stringify(value), "utf8").digest("hex")}`;
}

export async function persistRunnerPhaseToolAudit(opts: {
  manifest: RunnerPhaseToolManifest;
  record: RunnerPhaseToolGrantRecord;
  tool: string;
  input: unknown;
  response: RunnerPhaseToolResponse;
  now?: Date;
}): Promise<RunnerPhaseToolResponse> {
  const base = {
    schema_version: 1 as const,
    kind: "runner_phase_tool_audit" as const,
    at: (opts.now ?? new Date()).toISOString(),
    token_id: opts.record.claims.token_id,
    run_id: opts.record.claims.run_id,
    work_order_id: opts.record.claims.work_order_id,
    phase: opts.record.claims.phase,
    role: opts.record.claims.role,
    tool: opts.tool,
    outcome: opts.response.status,
    code: opts.response.code,
    input_digest: sha256Json(opts.input),
    output_digest: sha256Json(opts.response.data),
  };
  const audit: RunnerPhaseToolAudit = { ...base, digest: sha256Json(base) };
  await mkdir(opts.manifest.audit_directory, { recursive: true, mode: 0o700 });
  const filePath = path.join(
    opts.manifest.audit_directory,
    `${audit.at.replaceAll(":", "-").replaceAll(".", "-")}-${randomUUID()}.json`,
  );
  await writeNewStableRegularFileNoFollow(
    filePath,
    `${JSON.stringify(audit, null, 2)}\n`,
    "runner phase-tool audit",
  );
  return {
    ...opts.response,
    audit: {
      path: filePath,
      digest: audit.digest,
    },
  };
}
