import { randomUUID } from "node:crypto";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
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
import { cmdVerifyParsed } from "./verify-record.js";
import { kernelExchangeDirectory, writeKernelArtifact } from "./kernel-exchange.js";
import type { createKernelRuntime } from "./kernel-runtime-context.js";
import { requireKernelCommit } from "./kernel-runtime-context.js";
import { listKernelRepositoryEvidence } from "./kernel-repository-coordinator.js";
import { resolveQualityReviewTargetSha } from "../shared/quality-review-target.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

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
    validation.identity.check_id !== "canonical-final-contracts" ||
    !finalValidationIdentityMatches({
      stored_identity: validation.identity.implementation_identity,
      repository_fingerprint: repositoryFingerprint,
      previous_evaluator_target: previousEvaluatorTarget,
      resolved_evaluator_target: resolvedEvaluatorTarget,
      status_lines: status?.lines ?? null,
      task_artifact_prefix: taskArtifactPrefix,
    }) ||
    validation.identity.command_digest !== k.kernelDigest(finalValidationCommands(record)) ||
    validation.identity.environment_digest !== environmentDigest ||
    !evidenceDigest
  ) {
    return null;
  }
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
  const previousEvaluatorTarget = repositoryEvidence.at(-1)?.implementation_commit ?? null;
  const evaluatorTarget = await resolveEvaluatorTarget(command, taskId, previousEvaluatorTarget);
  if (previousEvaluatorTarget && !evaluatorTarget)
    throw new Error("Canonical final validation commit identity is unavailable");
  // Retain only a digest of the check environment, never its values. No check cache spans invocations.
  const environmentDigest = k.kernelDigest(verificationChildEnv());
  const binding = {
    task_id: taskId,
    plan_digest: plan.digest,
    repository_fingerprint: context.repository_fingerprint,
    authority_digest: authority.digest,
    commands,
    environment_digest: environmentDigest,
    repository_evidence: repositoryEvidence,
    evaluator_target: evaluatorTarget,
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
  const operationalTask = await command.taskBackend.getTask(taskId);
  if (!operationalTask) throw new Error("Canonical operational verification task is unavailable");
  const checks = await runDirectTaskVerification({
    command,
    task: operationalTask,
    task_id: taskId,
    cwd: command.resolvedProject.gitRoot,
    additional_commands: commands.map((check) => ({ command: check })),
    allow_empty: true,
  });
  const current = await runtime.adapter.read(taskId);
  const observed = await runtime.observe();
  if (
    current.kind !== "canonical" ||
    current.record.digest !== record.digest ||
    observed.fingerprint !== binding.repository_fingerprint ||
    (evaluatorTarget !== null &&
      !(await evaluatorTargetRemainsCurrent(command, taskId, evaluatorTarget))) ||
    k.kernelDigest(verificationChildEnv()) !== environmentDigest
  )
    throw new Error("Canonical final validation inputs changed during checks");
  const evidence = { binding, checks };
  await writeKernelArtifact(directory, "final-validation.json", evidence);
  if (checks.status !== "passed")
    return {
      stop: {
        kind: "human_required",
        reason: "canonical_final_checks_failed",
        summary: checks.reason,
        evidence: directory,
      },
    };
  const validation: k.ValidationRecord = {
    status: "PASSED",
    identity: {
      implementation_identity: binding.repository_fingerprint,
      check_id: "canonical-final-contracts",
      command_digest: k.kernelDigest(commands),
      environment_digest: environmentDigest,
      toolchain_digest: k.kernelDigest(checks.checks.map((check) => check.runtime ?? null)),
    },
    evidence_digests: [k.kernelDigest(evidence)],
    observed_at: context.occurred_at,
  };
  const input = await runtime.input(
    { kind: "record_final_validation", validation },
    `final-validation:${k.kernelDigest(evidence)}:${record.aggregate.revision}`,
  );
  if (input.command.expected_task_revision !== record.aggregate.revision)
    throw new Error("Canonical final validation task changed before persistence");
  await writeKernelArtifact(directory, "final-validation-command.json", input);
  requireKernelCommit(await runtime.lifecycle.apply(input));
  const projectedTask = await command.taskBackend.getTask(taskId);
  if (projectedTask?.execution_route?.repository_mode === "branch_pr") {
    const verification = await resolveImplementationVerificationTask({
      command,
      checkout: command.resolvedProject.gitRoot,
      task: projectedTask,
      workflow: "branch_pr",
    });
    const exitCode = await cmdVerifyParsed({
      ctx: command,
      cwd: command.resolvedProject.gitRoot,
      rootOverride: undefined,
      taskId,
      state: "ok",
      by: "SUPERVISOR",
      note: "Verified: canonical Task Kernel final checks passed.",
      details: renderDirectTaskVerificationDetails({
        task: verification.task,
        taskId,
        workflow: "branch_pr",
        result: checks,
      }),
      localOnly: false,
      repoFixable: false,
      incidentTags: [],
      incidentMatch: [],
      quiet: true,
      verificationSnapshot: verification.snapshot,
      allowCanonicalProjection: true,
    });
    if (exitCode !== 0) throw new Error(`Canonical verification projection exited ${exitCode}`);
  }
  return {
    fingerprint: binding.repository_fingerprint,
    environment_digest: environmentDigest,
    evidence_digest: k.kernelDigest(evidence),
    plan_digest: plan.digest,
  };
}
