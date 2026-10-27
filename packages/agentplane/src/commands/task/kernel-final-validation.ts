import { randomUUID } from "node:crypto";
import path from "node:path";
import { taskKernel as k, kernelPlanProposalSchema } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";
import {
  renderDirectTaskVerificationDetails,
  runDirectTaskVerification,
} from "./direct-task-verification.js";
import { resolveImplementationVerificationTask } from "./external-agent-implementation-recovery.js";
import { readDirectRepositoryStatus } from "./direct-task-finalization.js";
import { pathFromStatusLine } from "./git-status-path.js";
import {
  requiredVerificationContractChecks,
  verificationContractEvidenceCoverage,
} from "../shared/task-verification-records.js";
import { cmdVerifyParsed } from "./verify-record.js";
import { kernelExchangeDirectory, writeKernelArtifact } from "./kernel-exchange.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";
import { listKernelRepositoryEvidence } from "./kernel-repository-coordinator.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";
import { recoverKernelOperationalProjection } from "./kernel-operational-projection-recovery.js";
import { canonicalNoExecutableChecksAllowed } from "./kernel-no-check-policy.js";
import {
  assertCurrentHostedHead,
  type HostedValidationRoute,
} from "./kernel-hosted-head-evidence.js";
import { resolveKernelAdoptedValidationRoute } from "./kernel-adopted-pr-route.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;
const FINAL_VALIDATION_CHECK_ID = "canonical-final-contracts-v2";

export function canonicalFinalValidationTask<T extends { verify?: string[] }>(task: T): T {
  return { ...task, verify: [] };
}

function finalValidationCommands(record: KernelRecord): string[] {
  const plan = record.aggregate.current_plan;
  if (plan?.state !== "APPROVED" || !record.documents)
    throw new Error("Canonical final validation requires an approved plan and contracts");
  return [
    ...new Set(
      plan.work_items
        .filter(
          (definition) =>
            !definition.optional ||
            record.aggregate.work_items[definition.id]?.state === "COMPLETED",
        )
        .flatMap((definition) => {
          const contract = record.documents!.contracts[String(definition.contract_digest ?? "")];
          if (!contract) throw new Error("Canonical final validation contract is missing");
          return contract.verification_commands;
        }),
    ),
  ];
}

export function finalValidationIdentityMatches(opts: {
  stored_identity: string;
  repository_fingerprint: string;
  previous_evaluator_target: string | null;
  resolved_evaluator_target: string | null;
  status_lines: readonly string[] | null;
  task_artifact_prefix: string;
}): boolean {
  if (opts.stored_identity === opts.repository_fingerprint) return true;
  return (
    opts.previous_evaluator_target !== null &&
    opts.resolved_evaluator_target === opts.previous_evaluator_target &&
    opts.status_lines?.every((line) =>
      pathFromStatusLine(line).startsWith(opts.task_artifact_prefix),
    ) === true
  );
}

async function resolveEvaluatorTarget(
  command: CommandContext,
  taskId: string,
  previousEvaluatedSha: string | null,
): Promise<string | null> {
  if (!previousEvaluatedSha) return null;
  return await resolveQualityReviewTargetSha({
    gitRoot: command.resolvedProject.gitRoot,
    workflowDir: command.config.paths.workflow_dir,
    taskId,
    previousEvaluatedSha,
    workflowMode: "branch_pr",
  });
}

export async function restoreKernelFinalValidation(
  command: CommandContext,
  record: KernelRecord,
  repositoryFingerprint: string,
): Promise<{
  fingerprint: string;
  environment_digest: string;
  evidence_digest: k.Sha256Digest;
  plan_digest: string;
} | null> {
  const plan = record.aggregate.current_plan;
  const validation = record.aggregate.final_validation;
  const evidenceDigest = validation?.evidence_digests.at(-1);
  const environmentDigest = k.kernelDigest(verificationChildEnv());
  const repositoryEvidence = await listKernelRepositoryEvidence(command, record);
  const latest = repositoryEvidence.at(-1) ?? null;
  const hostedRoute =
    latest?.origin === "adopted_hosted_pr"
      ? await resolveKernelAdoptedValidationRoute(command, record.aggregate.id, latest)
      : undefined;
  if (latest?.origin === "adopted_hosted_pr") {
    if (
      !hostedRoute ||
      plan?.state !== "APPROVED" ||
      validation?.status !== "PASSED" ||
      validation.identity.check_id !== FINAL_VALIDATION_CHECK_ID ||
      validation.identity.hosted_head_evidence_digest !== latest.hosted_head.digest ||
      validation.identity.environment_digest !== environmentDigest ||
      validation.identity.command_digest !== k.kernelDigest(finalValidationCommands(record)) ||
      !evidenceDigest
    )
      return null;
    await assertCurrentHostedHead({
      repository_root: command.resolvedProject.gitRoot,
      checkout: latest.checkout,
      evidence: latest.hosted_head,
      fresh_readback: hostedRoute.fresh_readback,
    });
    return {
      fingerprint: repositoryFingerprint,
      environment_digest: environmentDigest,
      evidence_digest: evidenceDigest,
      plan_digest: plan.digest,
    };
  }
  const previousEvaluatorTarget = repositoryEvidence.at(-1)?.implementation_commit ?? null;
  const resolvedEvaluatorTarget = await resolveEvaluatorTarget(
    command,
    record.aggregate.id,
    previousEvaluatorTarget,
  );
  const status = await readDirectRepositoryStatus(command.resolvedProject.gitRoot);
  const taskArtifactPrefix = `${command.config.paths.workflow_dir}/${record.aggregate.id}/`;
  if (
    plan?.state !== "APPROVED" ||
    validation?.status !== "PASSED" ||
    validation.identity.check_id !== FINAL_VALIDATION_CHECK_ID ||
    !finalValidationIdentityMatches({
      stored_identity: validation.identity.implementation_identity,
      repository_fingerprint: repositoryFingerprint,
      previous_evaluator_target: previousEvaluatorTarget,
      resolved_evaluator_target: resolvedEvaluatorTarget,
      status_lines: status?.lines ?? null,
      task_artifact_prefix: taskArtifactPrefix,
    }) ||
    validation.identity.environment_digest !== environmentDigest ||
    !evidenceDigest
  ) {
    return null;
  }
  const commands = finalValidationCommands(record);
  if (commands.length === 0) {
    const task = await command.taskBackend.getTask(record.aggregate.id);
    if (!task || !canonicalNoExecutableChecksAllowed(task, record)) return null;
  }
  if (validation.identity.command_digest !== k.kernelDigest(commands)) return null;
  return {
    fingerprint: repositoryFingerprint,
    environment_digest: environmentDigest,
    evidence_digest: evidenceDigest,
    plan_digest: plan.digest,
  };
}

async function evaluatorTargetRemainsCurrent(
  command: CommandContext,
  taskId: string,
  evaluatorTarget: string,
): Promise<boolean> {
  return (
    (await resolveQualityReviewTargetSha({
      gitRoot: command.resolvedProject.gitRoot,
      workflowDir: command.config.paths.workflow_dir,
      taskId,
      previousEvaluatedSha: evaluatorTarget,
      workflowMode: "branch_pr",
    })) === evaluatorTarget
  );
}

/** Native final checks never infer success from an agent result or an earlier WorkItem. */
export async function runKernelFinalValidation(
  command: CommandContext,
  runtime: Runtime,
  record: KernelRecord,
  hostedRoute?: HostedValidationRoute,
) {
  const taskId = record.aggregate.id;
  const plan = record.aggregate.current_plan;
  if (plan?.state !== "APPROVED" || !record.documents)
    throw new Error("Canonical final validation requires an approved plan and contracts");
  const context = await runtime.native.readContext(taskId);
  const { authority } = await runtime.authority.resolve(taskId);
  if (authority.repository_fingerprint !== context.repository_fingerprint)
    throw new Error("Canonical final validation authority is stale");
  const commands = finalValidationCommands(record);
  const repositoryEvidence = await listKernelRepositoryEvidence(command, record);
  const latestEvidence = repositoryEvidence.at(-1);
  if (!hostedRoute && latestEvidence?.origin === "adopted_hosted_pr") {
    hostedRoute = await resolveKernelAdoptedValidationRoute(command, taskId, latestEvidence);
  }
  const hostedEvidence = latestEvidence?.origin === "adopted_hosted_pr" ? latestEvidence : null;
  if (hostedRoute && !hostedEvidence) {
    throw new Error("Adopted hosted PR final validation route has no accepted evidence");
  }
  if (
    repositoryEvidence.some((evidence) => evidence.origin === "adopted_hosted_pr") &&
    (!hostedEvidence ||
      !hostedRoute ||
      path.resolve(hostedRoute.checkout) !== path.resolve(hostedEvidence.checkout) ||
      path.resolve(command.resolvedProject.gitRoot) !==
        path.resolve(hostedEvidence.control_checkout))
  ) {
    throw new Error("Adopted hosted PR final validation requires its exact-head checkout route");
  }
  const assertHosted = async () => {
    if (hostedEvidence?.origin !== "adopted_hosted_pr") return;
    await assertCurrentHostedHead({
      repository_root: command.resolvedProject.gitRoot,
      checkout: hostedEvidence.checkout,
      evidence: hostedEvidence.hosted_head,
      fresh_readback: hostedRoute!.fresh_readback,
    });
  };
  await assertHosted();
  const previousEvaluatorTarget = repositoryEvidence.at(-1)?.implementation_commit ?? null;
  const evaluatorTarget =
    hostedEvidence?.origin === "adopted_hosted_pr"
      ? hostedEvidence.evaluator_target
      : await resolveEvaluatorTarget(command, taskId, previousEvaluatorTarget);
  if (previousEvaluatorTarget && !evaluatorTarget)
    throw new Error("Canonical final validation commit identity is unavailable");
  let operationalTask = await command.taskBackend.getTask(taskId);
  if (!operationalTask) throw new Error("Canonical operational verification task is unavailable");
  const recovery = await recoverKernelOperationalProjection(command, record, operationalTask);
  if (recovery.kind === "stop") return { stop: recovery.action };
  if (recovery.kind === "restored") {
    operationalTask = await command.taskBackend.getTask(taskId);
    if (!operationalTask) throw new Error("Recovered operational task is unavailable");
  }
  const verification =
    !hostedEvidence &&
    operationalTask.execution_route?.repository_mode === "branch_pr" &&
    recovery.kind !== "report_only"
      ? await resolveImplementationVerificationTask({
          command,
          checkout: command.resolvedProject.gitRoot,
          task: operationalTask,
          workflow: "branch_pr",
        })
      : null;
  const projectionTask = verification?.task ?? operationalTask;
  const noExecutableChecks =
    commands.length === 0 &&
    canonicalNoExecutableChecksAllowed(operationalTask, record) &&
    canonicalNoExecutableChecksAllowed(projectionTask, record) &&
    requiredVerificationContractChecks(projectionTask).every((check) => check === "task_outcome");
  // Retain only a digest of the check environment, never its values. No check cache spans invocations.
  const environmentDigest = k.kernelDigest(verificationChildEnv());
  const binding = {
    task_id: taskId,
    plan_digest: plan.digest,
    repository_fingerprint: context.repository_fingerprint,
    authority_digest: authority.digest,
    commands,
    no_executable_checks: noExecutableChecks,
    environment_digest: environmentDigest,
    repository_evidence: repositoryEvidence,
    evaluator_target: evaluatorTarget,
    verification_contract: projectionTask.execution_contract ?? null,
    work_items: Object.fromEntries(
      Object.entries(record.aggregate.work_items).map(([id, item]) => [
        id,
        { state: item.state, result_digest: item.result_digest, validation: item.validation },
      ]),
    ),
  };
  const directory = await kernelExchangeDirectory(
    command,
    taskId,
    k.kernelDigest({ binding, revision: record.aggregate.revision, attempt: randomUUID() }),
  );
  await writeKernelArtifact(directory, "final-validation-inputs.json", binding);
  const checks = await runDirectTaskVerification({
    command,
    task: canonicalFinalValidationTask(projectionTask),
    task_id: taskId,
    cwd: hostedEvidence ? hostedRoute!.checkout : command.resolvedProject.gitRoot,
    additional_commands: commands.map((check) => ({ command: check })),
    // A historical empty canonical contract cannot be rescued by an implicit policy fallback.
    additional_only: commands.length === 0 && !noExecutableChecks,
    allow_empty: noExecutableChecks,
    empty_is_failure: !noExecutableChecks,
  });
  const current = await runtime.adapter.read(taskId);
  const observed = await runtime.observe();
  await assertHosted();
  if (
    current.kind !== "canonical" ||
    current.record.digest !== record.digest ||
    observed.fingerprint !== binding.repository_fingerprint ||
    (!hostedEvidence &&
      evaluatorTarget !== null &&
      !(await evaluatorTargetRemainsCurrent(command, taskId, evaluatorTarget))) ||
    k.kernelDigest(verificationChildEnv()) !== environmentDigest
  )
    throw new Error("Canonical final validation inputs changed during checks");
  const evidence = { binding, checks };
  await writeKernelArtifact(directory, "final-validation.json", evidence);
  const validation: k.ValidationRecord = {
    status:
      checks.status === "passed" ? "PASSED" : checks.status === "failed" ? "FAILED" : "BLOCKED",
    identity: {
      implementation_identity: binding.repository_fingerprint,
      ...(hostedEvidence ? { hosted_head_evidence_digest: hostedEvidence.hosted_head.digest } : {}),
      check_id: FINAL_VALIDATION_CHECK_ID,
      command_digest: k.kernelDigest(commands),
      environment_digest: environmentDigest,
      toolchain_digest: k.kernelDigest(checks.checks.map((check) => check.runtime ?? null)),
    },
    evidence_digests: [k.kernelDigest(evidence)],
    observed_at: context.occurred_at,
  };
  if (checks.status !== "passed") {
    const input = await runtime.input(
      { kind: "record_final_validation", validation },
      `final-validation:${k.kernelDigest(evidence)}:${record.aggregate.revision}`,
    );
    if (input.command.expected_task_revision !== record.aggregate.revision)
      throw new Error("Canonical final validation task changed before failure persistence");
    await writeKernelArtifact(directory, "final-validation-command.json", input);
    requireKernelCommit(await runtime.lifecycle.apply(input));
    const retry = ["agentplane", "task", "advance", taskId, "--agent-json"];
    const missingCommands =
      checks.status === "failed" && commands.length === 0 && !noExecutableChecks;
    const correction =
      checks.status === "failed"
        ? await writeCorrectivePlan(
            directory,
            record,
            commands,
            k.kernelDigest(evidence),
            missingCommands,
          )
        : null;
    return {
      stop: {
        kind: "human_required",
        reason:
          checks.status === "failed"
            ? "canonical_final_checks_failed"
            : "canonical_final_checks_infrastructure_blocked",
        summary:
          commands.length === 0 && checks.checks.length === 0 && !noExecutableChecks
            ? "The approved Plan has no executable verification command. A USER-approved corrective Plan must add a new checked WorkItem while preserving the completed contracts and failed evidence."
            : checks.reason,
        evidence: directory,
        failure_class: checks.status === "failed" ? "code_regression" : "infrastructure",
        recovery: {
          cwd: command.resolvedProject.gitRoot,
          retry_argv: retry,
          ...(missingCommands && correction
            ? {
                required_role: "USER",
                plan_template: correction,
                plan_amendment_argv: [
                  "agentplane",
                  "task",
                  "plan",
                  "set",
                  taskId,
                  "--file",
                  correction,
                  "--scope-expansion-approved-by",
                  "USER",
                ],
                required_edit:
                  "Set verification_commands on the new corrective WorkItem to an executable local check before submitting this template. The untouched template is intentionally inadmissible.",
                constraint:
                  "Retain completed WorkItems and append a checked corrective WorkItem within the approved scope. USER approval is required for the revised Plan.",
              }
            : {}),
          ...(correction && !missingCommands
            ? {
                required_role: "USER",
                corrective_plan: correction,
                approval_argv: [
                  "agentplane",
                  "task",
                  "plan",
                  "set",
                  taskId,
                  "--file",
                  correction,
                  "--scope-expansion-approved-by",
                  "USER",
                ],
                resume_argv: retry,
              }
            : {}),
        },
      },
    };
  }
  const details = verification
    ? renderDirectTaskVerificationDetails({
        task: verification.task,
        taskId,
        workflow: "branch_pr",
        result: checks,
        ...(noExecutableChecks && checks.checks.length === 0
          ? {
              no_check_evidence: {
                plan_digest: plan.digest,
                evidence_digest: k.kernelDigest(evidence),
              },
            }
          : {}),
      })
    : null;
  if (verification && details && !noExecutableChecks) {
    const coverage = verificationContractEvidenceCoverage(verification.task, details);
    if (!coverage.accepted)
      throw new Error(
        `Canonical final verification evidence is incomplete: ${coverage.missingChecks.join(",")}`,
      );
  }
  // Persist native checks before fallible artifact projection. Completion still requires projection.
  const input = await runtime.input(
    { kind: "record_final_validation", validation },
    `final-validation:${k.kernelDigest(evidence)}:${record.aggregate.revision}`,
  );
  if (input.command.expected_task_revision !== record.aggregate.revision)
    throw new Error("Canonical final validation task changed before persistence");
  await writeKernelArtifact(directory, "final-validation-command.json", input);
  requireKernelCommit(await runtime.lifecycle.apply(input));
  if (verification && details && noExecutableChecks) {
    const projectedTask = await command.taskBackend.getTask(taskId);
    const coverage = projectedTask
      ? verificationContractEvidenceCoverage(projectedTask, details)
      : { accepted: false, missingChecks: ["task_projection_missing"] };
    if (!coverage.accepted) {
      const current = await runtime.adapter.read(taskId);
      if (
        current.kind !== "canonical" ||
        current.record.aggregate.current_plan?.digest !== plan.digest ||
        !current.record.aggregate.final_validation?.evidence_digests.includes(
          k.kernelDigest(evidence),
        )
      )
        throw new Error("Canonical no-check projection changed after final validation");
      const context = await runtime.native.readContext(taskId);
      const rejectedEvidence = {
        binding,
        checks,
        coverage,
        reason: "no_check_projection_rejected",
      };
      await writeKernelArtifact(
        directory,
        "final-validation-projection-rejected.json",
        rejectedEvidence,
      );
      const rejected: k.ValidationRecord = {
        ...validation,
        status: "FAILED",
        identity: {
          ...validation.identity,
          implementation_identity: context.repository_fingerprint,
        },
        evidence_digests: [k.kernelDigest(rejectedEvidence)],
        observed_at: context.occurred_at,
      };
      const invalidate = await runtime.input(
        { kind: "record_final_validation", validation: rejected },
        `final-validation-projection-rejected:${k.kernelDigest(rejectedEvidence)}:${current.record.aggregate.revision}`,
      );
      if (invalidate.command.expected_task_revision !== current.record.aggregate.revision)
        throw new Error("Canonical no-check projection changed before rejection persistence");
      await writeKernelArtifact(
        directory,
        "final-validation-projection-rejected-command.json",
        invalidate,
      );
      requireKernelCommit(await runtime.lifecycle.apply(invalidate));
      return {
        stop: {
          kind: "human_required",
          reason: "canonical_no_check_projection_rejected",
          summary: `No-check evidence does not satisfy the current Verification Contract: ${coverage.missingChecks.join(",")}`,
          evidence: directory,
          failure_class: "infrastructure",
          recovery: {
            cwd: command.resolvedProject.gitRoot,
            required_role: "USER",
            retry_argv: ["agentplane", "task", "advance", taskId, "--agent-json"],
            constraint:
              "Review the changed Verification Contract and approve a corrective checked Plan. Preserve the rejected evidence.",
          },
        },
      };
    }
  }
  if (verification) {
    const exitCode = await cmdVerifyParsed({
      ctx: command,
      cwd: command.resolvedProject.gitRoot,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "SUPERVISOR",
      note: "Verified: canonical Task Kernel final checks passed.",
      details: details!,
      localOnly: false,
      repoFixable: false,
      incidentTags: [],
      incidentMatch: [],
      quiet: true,
      verificationSnapshot: verification.snapshot,
      allowCanonicalProjection: true,
    });
    if (exitCode !== 0) throw new Error(`Canonical verification projection exited ${exitCode}`);
    if (
      (evaluatorTarget !== null &&
        !(await evaluatorTargetRemainsCurrent(command, taskId, evaluatorTarget))) ||
      k.kernelDigest(verificationChildEnv()) !== environmentDigest
    )
      throw new Error("Canonical final validation inputs changed during projection");
  }
  return {
    fingerprint: binding.repository_fingerprint,
    environment_digest: environmentDigest,
    evidence_digest: k.kernelDigest(evidence),
    plan_digest: plan.digest,
  };
}

async function writeCorrectivePlan(
  directory: string,
  record: KernelRecord,
  commands: string[],
  evidenceDigest: string,
  missingCommands = false,
) {
  const plan = record.aggregate.current_plan!;
  const items = plan.work_items.map(({ contract_digest, ...definition }) => {
    const contract = record.documents!.contracts[String(contract_digest)];
    if (!contract) throw new Error("Corrective Plan requires every retained contract");
    return { ...definition, contract };
  });
  const union = (key: keyof k.ExecutionRequirements) =>
    [...new Set(plan.work_items.flatMap((item) => item.execution_requirements[key]))].toSorted();
  const id = `final-correction-${evidenceDigest.slice(7, 19)}`;
  const proposal = {
    work_items: [
      ...items,
      {
        id,
        depends_on: plan.work_items
          .filter((item) => record.aggregate.work_items[item.id]?.state === "COMPLETED")
          .map((item) => item.id),
        required_inputs: [],
        expected_outputs: [id + "-evidence"],
        optional: false,
        execution_requirements: {
          scope_roots: union("scope_roots"),
          repository_effects: union("repository_effects"),
          external_effects: [],
          capabilities: union("capabilities"),
          resources: union("resources"),
        },
        contract: {
          objective: missingCommands
            ? `Add executable final verification for the approved implementation evidenced by ${evidenceDigest}. Read ${path.join(directory, "final-validation.json")} before edits.`
            : `Repair the failed final validation evidenced by ${evidenceDigest}. Read ${path.join(directory, "final-validation.json")} before edits.`,
          acceptance_criteria: [
            missingCommands
              ? "Select and run an executable local verification command for the existing approved code. Preserve completed work and all prior evidence."
              : "Correct the reproduced regression within the existing approved scope. Preserve completed work and all prior evidence.",
            missingCommands
              ? "Record the selected executable command in this WorkItem contract before Plan submission. Return concrete results for independent native review."
              : "Run the unchanged required validation commands. Return implementation evidence for independent native review.",
            "Do not bypass checks, expand authority, discard effects or claim that infrastructure failures are code defects.",
          ],
          verification_commands: commands,
          role: "EXECUTOR",
        },
      },
    ],
  };
  const filename = missingCommands ? "corrective-plan.template.json" : "corrective-plan.json";
  await writeKernelArtifact(directory, filename, kernelPlanProposalSchema.parse(proposal));
  return path.join(directory, filename);
}
