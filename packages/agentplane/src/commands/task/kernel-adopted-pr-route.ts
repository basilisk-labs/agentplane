import { taskKernel as k } from "@agentplaneorg/core/tasks";
import type { TaskPrMeta } from "@agentplaneorg/core/schemas";
import { readTaskPrMetaArtifact } from "../pr/internal/pr-paths.js";
import { createExistingPrAdoptionStore, resolveAdoptionControlRoot } from "../pr/adoption-store.js";
import { parsePrMeta } from "../shared/pr-meta.js";
import { loadSideEffectAuthorityState } from "../shared/side-effect-authority-store.js";
import type { CommandContext } from "../shared/task-backend.js";
import { freshHostedPrReadback } from "./kernel-hosted-readback.js";
import type { HostedValidationRoute } from "./kernel-hosted-head-evidence.js";
import type { KernelRepositoryEvidence } from "./kernel-repository-types.js";

type Adoption = NonNullable<TaskPrMeta["adoption"]>;

export function bindKernelAdoption(
  meta: TaskPrMeta,
  taskId: string,
): {
  receipt: Adoption;
  digest: k.Sha256Digest;
  identity: k.HostedPrIdentity;
} | null {
  const receipt = meta.adoption;
  if (!receipt) return null;
  if (
    meta.task_id !== taskId ||
    receipt.task_id !== taskId ||
    receipt.source_project !== receipt.target_project ||
    (meta.pr_number !== undefined && meta.pr_number !== receipt.pr_number) ||
    (meta.provider !== undefined &&
      (meta.provider.kind !== receipt.provider ||
        meta.provider.hostname !== receipt.hostname ||
        meta.provider.remote !== receipt.remote ||
        meta.provider.source_project !== receipt.source_project ||
        meta.provider.target_project !== receipt.target_project))
  ) {
    throw new Error("Canonical adopted PR metadata identity changed");
  }
  return {
    receipt,
    digest: k.kernelDigest(receipt),
    identity: {
      provider: receipt.provider,
      hostname: receipt.hostname,
      remote: receipt.remote,
      source_project: receipt.source_project,
      target_project: receipt.target_project,
      pr_number: receipt.pr_number,
      head_ref: receipt.head_ref,
      base_ref: receipt.base_ref,
    },
  };
}

export async function readKernelAdoption(command: CommandContext, taskId: string) {
  const controlRoot = await resolveAdoptionControlRoot(command.resolvedProject.gitRoot);
  const store = createExistingPrAdoptionStore({
    gitRoot: controlRoot,
    workflowDir: command.config.paths.workflow_dir,
  });
  const controlMeta = await store.readMetadata(taskId);
  const local = await readTaskPrMetaArtifact({ ctx: command, taskId });
  const branch = local.content
    ? local
    : await readTaskPrMetaArtifact({ ctx: command, taskId, preferBranchSnapshot: true });
  const branchMeta = branch.content ? parsePrMeta(branch.content, taskId) : null;
  if (
    branchMeta?.adoption &&
    (!controlMeta?.adoption ||
      k.kernelDigest(branchMeta.adoption) !== k.kernelDigest(controlMeta.adoption))
  ) {
    throw new Error("Canonical adopted PR branch metadata differs from its primary control store");
  }
  const adopted = controlMeta ? bindKernelAdoption(controlMeta, taskId) : null;
  if (!adopted) return null;
  const task = await command.taskBackend.getTask(taskId);
  if (!task) throw new Error("Canonical adopted PR has no matching task");
  const authority = await loadSideEffectAuthorityState({
    gitRoot: controlRoot,
    taskId,
    task,
  });
  const grant = authority.state?.grants.find(
    (entry) => entry.digest === adopted.receipt.authority_digest,
  );
  const binding = await store.findBinding(adopted.receipt);
  if (
    grant?.actor !== "USER" ||
    grant.operationId !== "pr.existing.adopt" ||
    binding?.task_id !== taskId
  ) {
    throw new Error("Canonical adopted PR has no durable matching USER adoption grant");
  }
  return adopted;
}

export async function resolveKernelAdoptedValidationRoute(
  command: CommandContext,
  taskId: string,
  evidence: KernelRepositoryEvidence | null,
): Promise<HostedValidationRoute | undefined> {
  const adopted = await readKernelAdoption(command, taskId);
  if (!adopted) {
    if (evidence?.origin === "adopted_hosted_pr")
      throw new Error("Canonical adopted PR metadata is missing");
    return undefined;
  }
  if (evidence?.origin !== "adopted_hosted_pr") {
    throw new Error("Canonical adopted PR has no exact-head repository evidence");
  }
  if (
    evidence.hosted_head.adoption_digest !== adopted.digest ||
    k.kernelDigest(evidence.hosted_head.identity) !== k.kernelDigest(adopted.identity) ||
    evidence.hosted_head.adopted_head !== adopted.receipt.head_sha ||
    evidence.hosted_head.adopted_base !== adopted.receipt.base_sha
  ) {
    throw new Error("Canonical adopted PR evidence differs from its immutable receipt");
  }
  return {
    checkout: evidence.checkout,
    fresh_readback: freshHostedPrReadback({
      gitRoot: command.resolvedProject.gitRoot,
      identity: adopted.identity,
    }),
  };
}
