import { readdir } from "node:fs/promises";
import path from "node:path";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { z } from "zod";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import { readStableRegularTextNoFollow } from "../../shared/stable-file.js";
import type { CommandContext } from "../shared/task-backend.js";
import type { DirectTaskVerificationResult } from "./direct-task-verification-checks.js";
import { kernelExchangeDirectory } from "./kernel-exchange.js";

export type FinalValidationFailureEvidence = {
  binding: { commands: string[]; plan_digest: string; repository_fingerprint: string };
  checks: DirectTaskVerificationResult;
};

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
const count = z.number().int().nonnegative();
const timingOutcomeSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("user_attested_final_timing_outcome"),
  task_id: z.string().min(1),
  plan_digest: digest,
  failure_evidence_digest: digest,
  failed_check_id: z.string().min(1),
  implementation_identity: digest,
  command_digest: digest,
  budget_ms: count.positive(),
  duration_ms: count.positive(),
  functional: z.strictObject({
    total: count.positive(),
    passed: count.positive(),
    failed: z.literal(0),
    skipped: count,
    incomplete: z.literal(0),
  }),
  required_hosted_checks: z
    .array(
      z
        .string()
        .min(1)
        .refine((name) => name.trim() === name && name.length > 0),
    )
    .min(1),
});
export type FinalTimingOutcomeReport = z.infer<typeof timingOutcomeSchema>;

export function parseFinalTimingOutcomeReport(encoded: string): FinalTimingOutcomeReport {
  if (Buffer.byteLength(encoded, "utf8") > 24 * 1024 || !encoded.trim())
    throw new Error("Timing outcome report is empty or too large");
  const decoded = Buffer.from(encoded, "base64url");
  if (decoded.toString("base64url") !== encoded)
    throw new Error("Timing outcome report must use canonical base64url JSON");
  return timingOutcomeSchema.parse(JSON.parse(decoded.toString("utf8")));
}

/** Only the exact immutable native failure artifact can support an exception. */
export async function retainedFinalValidationFailure(
  command: CommandContext,
  record: KernelRecord,
): Promise<FinalValidationFailureEvidence> {
  const validation = record.aggregate.final_validation;
  const digest = validation?.evidence_digests.at(-1);
  if (validation?.status !== "FAILED" || !digest)
    throw new Error("Current canonical final validation is not FAILED");
  const parent = path.dirname(
    await kernelExchangeDirectory(command, record.aggregate.id, k.kernelDigest("lookup")),
  );
  const matches: FinalValidationFailureEvidence[] = [];
  for (const entry of await readdir(parent, { withFileTypes: true })) {
    if (!entry.isDirectory() || !/^[a-f0-9]{64}$/u.test(entry.name)) continue;
    let value: FinalValidationFailureEvidence;
    try {
      value = JSON.parse(
        await readStableRegularTextNoFollow(
          path.join(parent, entry.name, "final-validation.json"),
          "canonical final-validation failure",
          { max_bytes: 4 * 1024 * 1024 },
        ),
      ) as FinalValidationFailureEvidence;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") continue;
      throw error;
    }
    if (k.kernelDigest(value) === digest) matches.push(value);
  }
  if (matches.length !== 1)
    throw new Error("Exact retained final-validation failure is unavailable");
  return matches[0]!;
}

export function classifyBoundedTimingFailure(opts: {
  evidence: FinalValidationFailureEvidence;
  record: KernelRecord;
  failed_command: string;
  max_overage_ms: number;
  report: FinalTimingOutcomeReport;
}): { budget_ms: number; duration_ms: number; failed_check_id: string } {
  const { evidence, record, report } = opts;
  const validation = record.aggregate.final_validation;
  if (
    validation?.status !== "FAILED" ||
    evidence.checks.status !== "failed" ||
    evidence.binding.plan_digest !== record.aggregate.current_plan?.digest ||
    evidence.binding.repository_fingerprint !== validation.identity.implementation_identity ||
    evidence.binding.commands.length !== evidence.checks.checks.length ||
    evidence.binding.commands.length === 0
  )
    throw new Error("Failed verification binding is incomplete or stale");
  const failed = evidence.checks.checks.filter((check) => check.exit_code !== 0);
  if (
    failed.length !== 1 ||
    failed[0]?.exit_code !== 1 ||
    failed[0].failure_kind === "infrastructure" ||
    (failed[0].declared_command !== undefined &&
      failed[0].declared_command !== failed[0].command) ||
    failed[0].command !== opts.failed_command ||
    evidence.checks.checks.some(
      (check, index) =>
        check.command !== evidence.binding.commands[index] ||
        (check !== failed[0] && check.exit_code !== 0),
    )
  )
    throw new Error("Only one exact failed declared check may receive a timing exception");
  if (
    report.task_id !== record.aggregate.id ||
    report.plan_digest !== record.aggregate.current_plan?.digest ||
    report.failure_evidence_digest !== validation.evidence_digests.at(-1) ||
    report.failed_check_id !== failed[0].command ||
    report.implementation_identity !== validation.identity.implementation_identity ||
    report.command_digest !== validation.identity.command_digest ||
    report.functional.total !== report.functional.passed + report.functional.skipped ||
    new Set(report.required_hosted_checks).size !== report.required_hosted_checks.length
  )
    throw new Error("Structured timing outcome report is incomplete or stale");
  const output = `${failed[0].stdout_tail}\n${failed[0].stderr_tail}`;
  const markers = [
    ...output.matchAll(
      /suite budget exceeded:\s*duration=(\d+(?:\.\d+)?)s\s+budget=(\d+(?:\.\d+)?)s/giu,
    ),
  ];
  if (
    markers.length !== 1 ||
    /\b[1-9]\d*\s+failed\b|\b(?:AssertionError|TypeError)\b|(?:^|\n)\s*(?:FAIL|not ok)\b/iu.test(
      output,
    )
  )
    throw new Error("The retained failed check conflicts with the attested timing-only outcome");
  const durationMs = Math.round(Number(markers[0]![1]) * 1000);
  const budgetMs = Math.round(Number(markers[0]![2]) * 1000);
  if (
    !Number.isSafeInteger(durationMs) ||
    !Number.isSafeInteger(budgetMs) ||
    !Number.isSafeInteger(opts.max_overage_ms) ||
    budgetMs <= 0 ||
    durationMs <= budgetMs ||
    opts.max_overage_ms <= 0 ||
    opts.max_overage_ms > Math.min(60_000, budgetMs * 0.05) ||
    durationMs - budgetMs > opts.max_overage_ms ||
    durationMs !== report.duration_ms ||
    budgetMs !== report.budget_ms
  )
    throw new Error("Timing overage exceeds the explicitly bounded allowance");
  return { budget_ms: budgetMs, duration_ms: durationMs, failed_check_id: failed[0].command };
}
