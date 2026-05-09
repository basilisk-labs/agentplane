import {
  computeAcrRecordDigest,
  validateAcr,
  type AgentChangeRecord,
} from "@agentplaneorg/core/schemas";
import { gitIsAncestor, gitRevParse } from "@agentplaneorg/core/git";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";

import type { CommandContext } from "../shared/task-backend.js";
import { loadTaskFromContext } from "../shared/task-backend.js";
import { acrValidationError } from "./remediation.js";

type AcrValidationMode = "schema" | "local" | "ci";

type AcrCiSemanticOptions = {
  requirePlanApproved: boolean;
  requireVerification: boolean;
  requirePolicyPass: boolean;
  allowWaivedVerification: boolean;
  allowManualOverride: boolean;
};

type AcrValidationResult = {
  ok: true;
  task_id: string;
  acr_path: string;
  record_id: string;
  warnings: string[];
};

export async function validateAcrTarget(
  opts: {
    ctx: CommandContext;
    target: string;
    mode: AcrValidationMode;
    strict: boolean;
  } & AcrCiSemanticOptions,
): Promise<AcrValidationResult> {
  const resolved = await readAcrTarget(opts.ctx, opts.target);
  const warnings: string[] = [];
  validateAcr(resolved.record);
  if (opts.mode !== "schema") {
    const task = await loadTaskFromContext({ ctx: opts.ctx, taskId: resolved.record.task.task_id });
    if (task.id !== resolved.record.task.task_id) {
      throw acrValidationError("ACR_E_TASK_NOT_FOUND", "ACR task id does not resolve locally.");
    }
    await assertGitCommit(opts.ctx.resolvedProject.gitRoot, resolved.record.repository.base_commit);
    await assertGitCommit(opts.ctx.resolvedProject.gitRoot, resolved.record.repository.work_commit);
    const ancestor = await gitIsAncestor(
      opts.ctx.resolvedProject.gitRoot,
      resolved.record.repository.base_commit,
      resolved.record.repository.work_commit,
    );
    if (!ancestor) {
      throw acrValidationError(
        "ACR_E_GIT_RANGE_INVALID",
        "work_commit is not a descendant of base_commit.",
      );
    }
    for (const evidence of resolved.record.evidence) {
      const fullPath = path.join(opts.ctx.resolvedProject.gitRoot, evidence.path);
      const digest = await hashFile(fullPath).catch(() => null);
      if (!digest)
        throw acrValidationError("ACR_E_EVIDENCE_NOT_FOUND", `Missing evidence: ${evidence.path}`);
      if (digest !== evidence.sha256) {
        throw acrValidationError(
          "ACR_E_EVIDENCE_HASH_MISMATCH",
          `Evidence hash mismatch: ${evidence.path}`,
        );
      }
    }
    if (resolved.record.integrity.record_digest === null) {
      warnings.push("ACR record digest is not finalized.");
    } else if (
      computeAcrRecordDigest(resolved.record) !== resolved.record.integrity.record_digest
    ) {
      throw acrValidationError(
        "ACR_E_DIGEST_MISMATCH",
        "ACR record digest does not match record content.",
      );
    }
  }
  if (opts.mode === "ci") {
    assertAcrCiSemantics(resolved.record, opts);
  }
  if (opts.strict && warnings.length > 0) {
    throw acrValidationError("ACR_E_STRICT_WARNING", warnings.join("; "));
  }
  return {
    ok: true,
    task_id: resolved.record.task.task_id,
    acr_path: resolved.acrPath,
    record_id: resolved.record.record_id,
    warnings,
  };
}

export function assertAcrCiSemantics(record: AgentChangeRecord, opts: AcrCiSemanticOptions): void {
  if (!record.result.merge_ready) {
    throw acrValidationError("ACR_E_NOT_MERGE_READY", "ACR result.merge_ready is not true.");
  }
  if (record.integrity.record_digest === null) {
    throw acrValidationError("ACR_E_DIGEST_REQUIRED", "Merge-ready ACR requires record_digest.");
  }
  if (record.evidence.length === 0) {
    throw acrValidationError("ACR_E_EVIDENCE_REQUIRED", "Merge-ready ACR requires evidence.");
  }
  if (opts.requirePlanApproved && record.plan.status !== "approved") {
    if (record.plan.status === "waived") {
      assertApproval(record, "plan_waiver", "ACR_E_PLAN_WAIVER_REQUIRED");
    } else {
      throw acrValidationError("ACR_E_PLAN_NOT_APPROVED", "ACR plan status is not approved.");
    }
  }
  if (record.plan.status === "approved") {
    assertApproval(record, "plan_approval", "ACR_E_PLAN_APPROVAL_REQUIRED");
    assertEvidence(record, "plan", "ACR_E_PLAN_EVIDENCE_REQUIRED");
  }
  if (
    opts.requireVerification &&
    record.verification.status !== "passed" &&
    !(opts.allowWaivedVerification && record.verification.status === "waived")
  ) {
    throw acrValidationError(
      "ACR_E_VERIFICATION_REQUIRED",
      "ACR verification status is not passed.",
    );
  }
  if (record.verification.status === "passed") {
    if (record.verification.checks.length === 0) {
      throw acrValidationError(
        "ACR_E_VERIFICATION_CHECK_REQUIRED",
        "Passed verification requires at least one check.",
      );
    }
    assertEvidence(record, "verification_log", "ACR_E_VERIFICATION_EVIDENCE_REQUIRED");
  }
  if (record.verification.status === "waived") {
    assertApproval(record, "verification_waiver", "ACR_E_VERIFICATION_WAIVER_REQUIRED");
  }
  if (opts.requirePolicyPass) {
    const failed = record.policy.decisions.find((item) => item.decision === "fail");
    if (failed) throw acrValidationError("ACR_E_POLICY_FAILED", `Policy failed: ${failed.rule_id}`);
    const manual = record.policy.decisions.find((item) => item.decision === "manual_override");
    if (manual) {
      assertApproval(record, "policy_override", "ACR_E_POLICY_OVERRIDE_REQUIRED");
    }
    if (manual && !opts.allowManualOverride) {
      throw acrValidationError(
        "ACR_E_MANUAL_OVERRIDE_NOT_ALLOWED",
        `Manual override not allowed: ${manual.rule_id}`,
      );
    }
  }
}

export function emitValidationResult(
  result: AcrValidationResult,
  json: boolean,
  command: string,
): void {
  if (json) {
    process.stdout.write(`${JSON.stringify({ command, ...result }, null, 2)}\n`);
    return;
  }
  process.stdout.write(`✅ ${command} ${path.basename(result.acr_path)}\n`);
}

export function defaultAcrPath(ctx: CommandContext, taskId: string): string {
  return path.join(ctx.resolvedProject.gitRoot, ctx.config.paths.workflow_dir, taskId, "acr.json");
}

export async function readAcrTarget(
  ctx: CommandContext,
  target: string,
): Promise<{ record: AgentChangeRecord; acrPath: string }> {
  const acrPath =
    target.includes("/") || target.endsWith(".json")
      ? path.resolve(ctx.resolvedProject.gitRoot, target)
      : defaultAcrPath(ctx, target);
  const text = await readFile(acrPath, "utf8").catch(() => {
    throw acrValidationError(
      "ACR_E_NOT_FOUND",
      `ACR not found: ${path.relative(ctx.resolvedProject.gitRoot, acrPath)}`,
    );
  });
  try {
    return { record: validateAcr(JSON.parse(text) as unknown), acrPath };
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw acrValidationError("ACR_E_INVALID_JSON", `Invalid ACR JSON: ${err.message}`);
    }
    throw acrValidationError("ACR_E_SCHEMA", err instanceof Error ? err.message : String(err));
  }
}

async function assertGitCommit(gitRoot: string, rev: string): Promise<void> {
  await gitRevParse(gitRoot, ["--verify", `${rev}^{commit}`]).catch(() => {
    throw acrValidationError("ACR_E_GIT_COMMIT_MISSING", `Git commit missing: ${rev}`);
  });
}

async function hashFile(filePath: string): Promise<string> {
  const bytes = await readFile(filePath);
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

function assertApproval(
  record: AgentChangeRecord,
  type: AgentChangeRecord["approvals"][number]["type"],
  code: string,
): void {
  if (
    !record.approvals.some((approval) => approval.type === type && approval.decision !== "rejected")
  ) {
    throw acrValidationError(code, `Missing approval: ${type}.`);
  }
}

function assertEvidence(
  record: AgentChangeRecord,
  type: AgentChangeRecord["evidence"][number]["type"],
  code: string,
): void {
  if (!record.evidence.some((evidence) => evidence.type === type)) {
    throw acrValidationError(code, `Missing evidence: ${type}.`);
  }
}
