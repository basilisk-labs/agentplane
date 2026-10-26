import { taskKernel as k } from "@agentplaneorg/core/tasks";
import { verifyUserApprovalReceipt } from "../../adapters/authority/user-approval-receipt.js";
import type { CommandContext } from "../shared/task-backend.js";
import { observeExistingChangeRequestByNumber } from "../pr/internal/change-request-provider.js";
import { resolveHostedChecksStatus } from "../pr/hosted-checks.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";
import { kernelExchangeDirectory, writeKernelArtifact } from "./kernel-exchange.js";
import {
  classifyBoundedTimingFailure,
  parseFinalTimingOutcomeReport,
  retainedFinalValidationFailure,
} from "./kernel-final-timing-exception-evidence.js";
import { listKernelRepositoryEvidence } from "./kernel-repository-coordinator.js";

export type AcceptFinalTimingExceptionOptions = {
  task_id: string;
  state_digest: string;
  failure_evidence_digest: string;
  failed_command: string;
  max_overage_ms: number;
  change_number: number;
  branch: string;
  head_sha: string;
  outcome_report: string;
  approval_receipt?: string;
  approval_request_digest?: string;
  by?: string;
  note?: string;
};

/** Operator action: re-observe both the native failure and hosted checks before one CAS write. */
export async function acceptKernelFinalTimingException(
  command: CommandContext,
  opts: AcceptFinalTimingExceptionOptions,
) {
  const runtime = await createKernelRuntime({
    command,
    task_id: opts.task_id,
    transport: "manual",
    operation_id: `final-timing-exception:${opts.state_digest}`,
  });
  const read = await runtime.adapter.read(opts.task_id);
  if (read.kind !== "canonical" || read.record.digest !== opts.state_digest)
    throw new Error("Canonical timing exception state digest is stale");
  const record = read.record;
  const plan = record.aggregate.current_plan;
  const validation = record.aggregate.final_validation;
  if (
    record.aggregate.state !== "FINAL_VALIDATION" ||
    plan?.state !== "APPROVED" ||
    validation?.status !== "FAILED" ||
    validation.evidence_digests.at(-1) !== opts.failure_evidence_digest ||
    record.aggregate.final_timing_exception
  )
    throw new Error("Current FAILED final-validation evidence is unavailable or already accepted");
  const evidence = await retainedFinalValidationFailure(command, record);
  const report = parseFinalTimingOutcomeReport(opts.outcome_report);
  const timing = classifyBoundedTimingFailure({
    evidence,
    record,
    failed_command: opts.failed_command,
    max_overage_ms: opts.max_overage_ms,
    report,
  });
  const repositoryEvidence = await listKernelRepositoryEvidence(command, record);
  const implementationCommit = repositoryEvidence.at(-1)?.implementation_commit;
  if (!implementationCommit || implementationCommit !== opts.head_sha)
    throw new Error("Hosted head must equal the independently recorded implementation commit");
  const observed = await observeExistingChangeRequestByNumber({
    gitRoot: command.resolvedProject.gitRoot,
    branch: opts.branch,
    prNumber: opts.change_number,
  });
  if (
    observed.state !== "found" ||
    !["OPEN", "MERGED"].includes(observed.pr.status) ||
    observed.pr.headSha !== opts.head_sha ||
    observed.pr.headRef !== opts.branch ||
    observed.pr.prNumber !== opts.change_number
  )
    throw new Error("Hosted change request does not match the exact task implementation head");
  const hostedChecks = await resolveHostedChecksStatus({
    gitRoot: command.resolvedProject.gitRoot,
    prNumber: opts.change_number,
    branch: opts.branch,
    expectedHeadSha: opts.head_sha,
    requiredChecks: report.required_hosted_checks,
    requireCompleteSuccess: true,
  });
  if (
    !hostedChecks.checked ||
    hostedChecks.total === 0 ||
    hostedChecks.pending !== 0 ||
    hostedChecks.failing !== 0 ||
    hostedChecks.missingRequired.length > 0 ||
    hostedChecks.passing !== hostedChecks.total ||
    report.required_hosted_checks.some(
      (name) =>
        !hostedChecks.rows.some(
          (row) => row.name === name && row.state?.toUpperCase() === "SUCCESS",
        ),
    ) ||
    !hostedChecks.rows.some((row) => row.state?.toUpperCase() === "SUCCESS")
  )
    throw new Error("Exact-head hosted checks are not fully successful");
  const context = await runtime.native.readContext(opts.task_id);
  const current = await runtime.adapter.read(opts.task_id);
  const repository = await runtime.observe();
  if (
    current.kind !== "canonical" ||
    current.record.digest !== record.digest ||
    repository.fingerprint !== context.repository_fingerprint
  )
    throw new Error("Canonical task or repository changed during timing-exception observation");
  const hostedEvidence = {
    provider: observed.pr.provider,
    change_number: opts.change_number,
    branch: opts.branch,
    head_sha: opts.head_sha,
    status: observed.pr.status,
    checks: hostedChecks,
  };
  const hostedEvidenceDigest = k.kernelDigest(hostedEvidence);
  const approvalRequest = {
    approvalType: "final_timing_exception" as const,
    taskId: opts.task_id,
    authorityReference: `final-timing:${record.digest}`,
    stateFingerprint: context.repository_fingerprint,
    operationId: "task.final-validation.accept-timing",
    operationDigest: k.kernelDigest({
      record_digest: record.digest,
      report,
      max_overage_ms: opts.max_overage_ms,
      hosted_evidence_digest: hostedEvidenceDigest,
    }),
    stateScopeDigest: k.kernelDigest({
      task_id: opts.task_id,
      plan_digest: plan.digest,
      failure_evidence_digest: opts.failure_evidence_digest,
      implementation_identity: validation.identity.implementation_identity,
      hosted_head_sha: opts.head_sha,
      required_hosted_checks: report.required_hosted_checks,
    }),
  };
  const requestDigest = k.kernelDigest(approvalRequest);
  const hasManualArgs =
    opts.approval_request_digest !== undefined || opts.by !== undefined || opts.note !== undefined;
  if (!opts.approval_receipt && !hasManualArgs)
    return {
      approval_request: approvalRequest,
      approval_request_digest: requestDigest,
      outcome_report_digest: k.kernelDigest(report),
    };
  if (opts.approval_receipt && hasManualArgs)
    throw new Error("Signed USER receipt and manual operator approval are mutually exclusive");
  const trustedIssuers = context.approval_receipts.trusted_issuers;
  if (hasManualArgs && trustedIssuers.length > 0)
    throw new Error("Configured trusted issuer requires a signed USER receipt");
  if (
    hasManualArgs &&
    (opts.by !== "USER" ||
      opts.approval_request_digest !== requestDigest ||
      !opts.note?.trim() ||
      opts.note.trim() !== opts.note)
  )
    throw new Error("Manual USER approval requires the exact request digest and a nonempty reason");
  const manualDecision = hasManualArgs
    ? {
        schema_version: 1 as const,
        kind: "final_timing_exception_manual_operator" as const,
        approval_request: approvalRequest,
        approval_request_digest: requestDigest,
        by: "USER" as const,
        note: opts.note!,
        occurred_at: context.occurred_at,
      }
    : null;
  const verified = manualDecision
    ? {
        actor: "USER",
        digest: k.kernelDigest(manualDecision),
      }
    : verifyUserApprovalReceipt({
        encoded: opts.approval_receipt!,
        config: context.approval_receipts,
        request: approvalRequest,
        now: new Date(context.occurred_at),
      });
  const exception: k.FinalTimingException = {
    schema_version: 1,
    kind: "timing_only",
    task_id: opts.task_id,
    plan_revision: plan.revision,
    plan_digest: plan.digest,
    validation_digest: k.kernelDigest(validation),
    failed_check_id: timing.failed_check_id,
    failure_evidence_digest: opts.failure_evidence_digest as k.Sha256Digest,
    implementation_identity: validation.identity.implementation_identity,
    acceptance_fingerprint: context.repository_fingerprint,
    command_digest: validation.identity.command_digest,
    environment_digest: validation.identity.environment_digest,
    budget_ms: timing.budget_ms,
    duration_ms: timing.duration_ms,
    max_overage_ms: opts.max_overage_ms,
    hosted_head_sha: opts.head_sha,
    hosted_required_checks: report.required_hosted_checks,
    hosted_evidence_digest: hostedEvidenceDigest,
    approval_evidence_digest: verified.digest as k.Sha256Digest,
    approval_mode: manualDecision ? "manual_operator" : "signed_user_receipt",
    approval_actor_id: verified.actor,
    approved_by: "USER",
    accepted_at: context.occurred_at,
  };
  const directory = await kernelExchangeDirectory(
    command,
    opts.task_id,
    k.kernelDigest({ kind: "final-timing-exception", exception }),
  );
  await writeKernelArtifact(directory, "timing-exception-evidence.json", {
    failure_evidence_digest: opts.failure_evidence_digest,
    outcome_report: report,
    hosted: hostedEvidence,
    approval_request: approvalRequest,
    approval_receipt: opts.approval_receipt,
    manual_operator_decision: manualDecision,
    approval_evidence_digest: verified.digest,
  });
  const input = await runtime.input(
    { kind: "accept_final_timing_exception", exception },
    `final-timing-exception:${k.kernelDigest(exception)}`,
  );
  if (input.command.expected_task_revision !== record.aggregate.revision)
    throw new Error("Canonical timing exception task changed before persistence");
  requireKernelCommit(
    await runtime.adapter.execute({
      ...input,
      actor: { ...input.actor, kind: "USER", id: verified.actor, transport: "manual" },
    }),
  );
  return { exception, evidence_directory: directory };
}
