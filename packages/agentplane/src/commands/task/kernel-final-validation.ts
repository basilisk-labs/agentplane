import { randomUUID } from "node:crypto";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { KernelRecord } from "../../adapters/task-backend/kernel-record.js";
import type { CommandContext } from "../shared/task-backend.js";
import { verificationChildEnv } from "../shared/pr-meta/verify-log.js";
import { runDirectTaskVerification } from "./direct-task-verification.js";
import { kernelExchangeDirectory, writeKernelArtifact } from "./kernel-exchange.js";
import { createKernelRuntime, requireKernelCommit } from "./kernel-runtime-context.js";

type Runtime = Awaited<ReturnType<typeof createKernelRuntime>>;

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
  const commands = [
    ...new Set(
      plan.work_items
        .filter(
          (definition) =>
            !definition.optional ||
            record.aggregate.work_items[definition.id]?.state === "COMPLETED",
        )
        .flatMap((definition) => {
          const contract = record.documents!.contracts[definition.contract_digest ?? ""];
          if (!contract) throw new Error("Canonical final validation contract is missing");
          return contract.verification_commands;
        }),
    ),
  ];
  // Retain only a digest of the check environment, never its values. No check cache spans invocations.
  const environmentDigest = k.kernelDigest(verificationChildEnv());
  const binding = {
    task_id: taskId,
    plan_digest: plan.digest,
    repository_fingerprint: context.repository_fingerprint,
    authority_digest: authority.digest,
    commands,
    environment_digest: environmentDigest,
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
    task: { verify: [] },
    task_id: taskId,
    cwd: command.resolvedProject.gitRoot,
    additional_only: true,
    additional_commands: commands.map((check) => ({ command: check })),
    allow_empty: true,
  });
  const current = await runtime.adapter.read(taskId);
  if (
    current.kind !== "canonical" ||
    current.record.digest !== record.digest ||
    (await runtime.observe()).fingerprint !== binding.repository_fingerprint ||
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
  return {
    fingerprint: binding.repository_fingerprint,
    environment_digest: environmentDigest,
    evidence_digest: k.kernelDigest(evidence),
    plan_digest: plan.digest,
  };
}
