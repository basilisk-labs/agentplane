import {
  readWorkOrder,
  evaluatorWorkOrderReviewDigest,
} from "../evaluator/evaluator-work-order.js";
import path from "node:path";
import { readFile } from "node:fs/promises";
import { taskKernel as k, taskExecutionBaseFromExtensions } from "@agentplaneorg/core/tasks";
import { findWorktreeForBranch, listWorktrees } from "@agentplaneorg/core/git";
import { readKernelRecord } from "../../adapters/task-backend/kernel-record.js";
import {
  digestSupervisorEpisodeValue,
  validateSupervisorExecutionEpisodeJournal,
  type AgentWorkOrderV2,
  type AgentSemanticResult,
} from "@agentplaneorg/core/schemas";
import type { TaskData } from "../../backends/task-backend.js";
import type { CommandContext } from "../shared/task-backend.js";
import { loadCommandContext, resolveCommandGitCommonDir } from "../shared/task-backend.js";
import {
  createSupervisorEpisodeStore,
  resolveSupervisorExecutionEpisodePath,
} from "../shared/supervisor-execution-episode.js";
import { readCompletedReworkRecord } from "./kernel-completed-external-rework.js";
import { readDirectTaskHead } from "./direct-task-finalization.js";
import { assertExternalAgentSupervisorIntent } from "./external-agent-exchange-authority.js";
import {
  externalAgentIssueDigest,
  externalAgentResultDigest,
  externalAgentExchangeDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  resolveExternalAgentExchangePaths,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";

/** Resolve retained owner evidence only for the exact registered merged-base projection. */
export async function resolveCompletedReviewOwner(opts: {
  command: CommandContext;
  task: TaskData;
  owner_checkout: string;
}) {
  const root = opts.command.resolvedProject.gitRoot;
  const base = taskExecutionBaseFromExtensions(opts.task.extensions);
  const ownerPath = path.resolve(opts.owner_checkout);
  const registeredBase = base ? await findWorktreeForBranch(root, base.base_ref) : null;
  const worktrees = await listWorktrees(root);
  if (
    !base?.repository_identity ||
    !registeredBase ||
    path.resolve(registeredBase) !== path.resolve(root) ||
    !worktrees.some((entry) => path.resolve(entry.path) === ownerPath)
  )
    throw new Error("Completed review requires registered owner and base checkouts");
  const owner = await loadCommandContext({ cwd: ownerPath, rootOverride: null });
  if (
    path.resolve(await resolveCommandGitCommonDir(owner)) !==
    path.resolve(await resolveCommandGitCommonDir(opts.command))
  )
    throw new Error("Completed review owner is outside the repository");
  const ownerTask = await owner.taskBackend.getTask(opts.task.id);
  const current = readKernelRecord(opts.task, base.repository_identity as k.Sha256Digest);
  const retained = ownerTask
    ? readKernelRecord(ownerTask, base.repository_identity as k.Sha256Digest)
    : null;
  if (
    current.kind !== "canonical" ||
    retained?.kind !== "canonical" ||
    current.record.aggregate.state !== "COMPLETED" ||
    retained.record.digest !== current.record.digest ||
    k.kernelDigest(ownerTask?.quality_review ?? null) !==
      k.kernelDigest(opts.task.quality_review ?? null) ||
    k.kernelDigest(ownerTask?.extensions?.[RECEIPT] ?? null) !==
      k.kernelDigest(opts.task.extensions?.[RECEIPT] ?? null)
  )
    throw new Error("Completed review owner does not contain the exact completed Kernel record");
  const baseTask = await opts.command.taskBackend.getTask(opts.task.id);
  const baseRecord = baseTask
    ? readKernelRecord(baseTask, base.repository_identity as k.Sha256Digest)
    : null;
  if (
    baseRecord?.kind !== "canonical" ||
    baseRecord.record.digest !== current.record.digest ||
    k.kernelDigest(baseTask?.quality_review ?? null) !==
      k.kernelDigest(opts.task.quality_review ?? null) ||
    k.kernelDigest(baseTask?.extensions?.[RECEIPT] ?? null) !==
      k.kernelDigest(opts.task.extensions?.[RECEIPT] ?? null)
  )
    throw new Error("Completed review base does not contain the exact completed Kernel record");
  return owner;
}

const RECEIPT = "agentplane.completed_native_review";
const permits = new WeakMap<
  object,
  {
    task: string;
    checkout: string;
    expiresAt: string | null;
    revision: number | undefined;
    workOrderPath?: string;
    receipt?: Record<string, unknown>;
  }
>();
export type CompletedNativeReviewPermit = Readonly<{
  readonly kind: "completed_native_review_permit";
}>;

export function hasCompletedNativeReviewPermit(
  permit: CompletedNativeReviewPermit | undefined,
  task: TaskData,
  checkout: string,
  workOrderPath?: string,
): boolean {
  const binding = permit && permits.get(permit);
  return (
    !!binding &&
    binding.task === task.id &&
    binding.checkout === path.resolve(checkout) &&
    (binding.expiresAt === null ||
      (Number.isFinite(Date.parse(binding.expiresAt)) &&
        Date.now() < Date.parse(binding.expiresAt))) &&
    binding.revision === task.revision &&
    (workOrderPath === undefined || binding.workOrderPath === path.resolve(workOrderPath))
  );
}

export function completedNativeReviewReceipt(
  permit: CompletedNativeReviewPermit,
  task: TaskData,
  qualityReview: TaskData["quality_review"],
): Record<string, unknown> {
  const binding = permits.get(permit);
  if (!binding?.receipt || !hasCompletedNativeReviewPermit(permit, task, binding?.checkout ?? ""))
    throw new Error("Native review has no verified result authority");
  return {
    [RECEIPT]: {
      ...binding.receipt,
      quality_digest: k.kernelDigest(qualityReview),
      applied_at: qualityReview?.updated_at,
    },
  };
}

export async function authorizeCompletedNativeReviewPreparation(
  command: CommandContext,
  task: TaskData,
  order: AgentWorkOrderV2,
): Promise<CompletedNativeReviewPermit | undefined> {
  if (!Object.hasOwn(task.extensions ?? {}, "task_kernel")) return undefined;
  const record = await readCompletedReworkRecord({ command, task, work_order: order });
  if (
    !record ||
    order.role !== "EVALUATOR" ||
    order.authority.mutation_scope !== "none" ||
    order.authority.writable_roots.length > 0 ||
    order.authority.external_side_effects.length > 0 ||
    order.authority.sandbox !== "read-only" ||
    order.task.revision !== task.revision ||
    order.state_fingerprint.git_head !==
      (await readDirectTaskHead(command.resolvedProject.gitRoot)) ||
    path.resolve(order.state_fingerprint.worktree) !== path.resolve(command.resolvedProject.gitRoot)
  )
    throw new Error("Native completed review requires a current read-only EVALUATOR WorkOrder");
  if (order.authority.expires_at && Date.now() >= Date.parse(order.authority.expires_at))
    throw new Error("Native completed review authority expired");
  const permit: CompletedNativeReviewPermit = Object.freeze({
    kind: "completed_native_review_permit",
  });
  permits.set(permit, {
    task: task.id,
    revision: task.revision,
    checkout: path.resolve(command.resolvedProject.gitRoot),
    expiresAt: order.authority.expires_at,
  });
  return permit;
}

async function retainedReview(
  command: CommandContext,
  task: TaskData,
  exchange: ExternalAgentExchange,
) {
  const common = await resolveCommandGitCommonDir(command);
  const paths = await resolveExternalAgentExchangePaths({
    git_root: command.resolvedProject.gitRoot,
    common_git_dir: common,
    task_id: task.id,
    transition_id: exchange.transition_id,
    state_fingerprint: exchange.state_fingerprint,
  });
  const retained = await readExternalAgentExchange(paths.exchange);
  if (
    !retained ||
    k.kernelDigest(retained) !== k.kernelDigest(exchange) ||
    exchange.task_id !== task.id ||
    exchange.role !== "EVALUATOR" ||
    exchange.purpose !== "quality_review" ||
    !exchange.evaluator_work_order_ref ||
    !exchange.result ||
    exchange.result_digest !== externalAgentResultDigest(exchange.result) ||
    !["result_received", "accepted", "consumed"].includes(exchange.status) ||
    path.resolve(exchange.checkout) !== path.resolve(command.resolvedProject.gitRoot) ||
    path.resolve(exchange.work_order_ref) !== paths.work_order
  )
    throw new Error("Native completed review exchange binding changed");
  const order = await readExternalAgentWorkOrder(paths.work_order);
  const frozen = order.required_inputs.find((input) => input.id === "evaluator-work-order");
  const record = await readCompletedReworkRecord({ command, task, work_order: order });
  if (
    !record ||
    order.role !== "EVALUATOR" ||
    order.work_order_id !== exchange.work_order_id ||
    path.resolve(order.state_fingerprint.worktree) !== path.resolve(exchange.checkout) ||
    order.state_fingerprint.digest !== exchange.state_fingerprint ||
    order.authority.mutation_scope !== "none" ||
    order.authority.writable_roots.length > 0 ||
    order.authority.external_side_effects.length > 0 ||
    order.authority.sandbox !== "read-only" ||
    !frozen?.path ||
    path.resolve(exchange.checkout, frozen.path) !==
      path.resolve(exchange.evaluator_work_order_ref) ||
    frozen.digest !==
      externalAgentExchangeDigest(await readFile(exchange.evaluator_work_order_ref, "utf8")) ||
    exchange.result.result.work_order_id !== order.work_order_id ||
    exchange.result.result.status !== "completed" ||
    !exchange.result.result.review
  )
    throw new Error("Native completed review retained evidence changed");
  const journal = validateSupervisorExecutionEpisodeJournal(
    await createSupervisorEpisodeStore(
      await resolveSupervisorExecutionEpisodePath({
        git_root: command.resolvedProject.gitRoot,
        common_git_dir: common,
        task_id: task.id,
      }),
    ).read(),
  );
  const operation = journal.operations.find(
    (operation) =>
      operation.work_order_ref === paths.work_order &&
      operation.effect_ref ===
        `external-agent-issue:${externalAgentIssueDigest({ exchange, work_order: order })}`,
  );
  if (
    operation?.role !== "EVALUATOR" ||
    operation.precondition_fingerprint_digest !== exchange.state_fingerprint ||
    !["completed", "intent"].includes(operation.status)
  )
    throw new Error("Native completed review supervisor receipt changed");
  return { paths, order, journal, record, operation };
}

export async function authorizeCompletedNativeReviewResult(
  command: CommandContext,
  task: TaskData,
  exchange: ExternalAgentExchange,
  semantic: AgentSemanticResult,
): Promise<CompletedNativeReviewPermit | undefined> {
  if (!Object.hasOwn(task.extensions ?? {}, "task_kernel")) return undefined;
  const proof = await retainedReview(command, task, exchange);
  assertExternalAgentSupervisorIntent({
    journal: proof.journal,
    exchange,
    paths: proof.paths,
    work_order: proof.order,
    task_id: task.id,
    state_fingerprint: exchange.state_fingerprint,
  });
  if (
    k.kernelDigest(semantic) !== k.kernelDigest(exchange.result!.result) ||
    proof.order.task.revision !== task.revision ||
    (proof.order.authority.expires_at && Date.now() >= Date.parse(proof.order.authority.expires_at))
  )
    throw new Error("Native completed review result is stale");
  const permit: CompletedNativeReviewPermit = Object.freeze({
    kind: "completed_native_review_permit",
  });
  permits.set(permit, {
    task: task.id,
    checkout: path.resolve(command.resolvedProject.gitRoot),
    expiresAt: proof.order.authority.expires_at,
    revision: task.revision,
    workOrderPath: path.resolve(exchange.evaluator_work_order_ref!),
    receipt: {
      schema_version: 1,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
      result_digest: exchange.result_digest,
      kernel_digest: k.kernelDigest(task.extensions!.task_kernel),
    },
  });
  return permit;
}

export async function hasAuthenticatedCompletedNativeReview(
  command: CommandContext,
  task: TaskData,
): Promise<boolean> {
  const receipt = task.extensions?.[RECEIPT] as Record<string, unknown> | undefined;
  if (!receipt) return false;
  if (
    receipt.schema_version !== 1 ||
    typeof receipt.transition_id !== "string" ||
    typeof receipt.state_fingerprint !== "string" ||
    receipt.quality_digest !== k.kernelDigest(task.quality_review) ||
    receipt.kernel_digest !== k.kernelDigest(task.extensions!.task_kernel)
  )
    throw new Error("Native completed review projection binding changed");
  const paths = await resolveExternalAgentExchangePaths({
    git_root: command.resolvedProject.gitRoot,
    common_git_dir: await resolveCommandGitCommonDir(command),
    task_id: task.id,
    transition_id: receipt.transition_id,
    state_fingerprint: receipt.state_fingerprint,
  });
  const exchange = await readExternalAgentExchange(paths.exchange);
  if (!exchange || exchange.result_digest !== receipt.result_digest)
    throw new Error("Native completed review receipt is unavailable");
  const evidenceCommand =
    path.resolve(exchange.checkout) === path.resolve(command.resolvedProject.gitRoot)
      ? command
      : await resolveCompletedReviewOwner({ command, task, owner_checkout: exchange.checkout });
  const proof = await retainedReview(evidenceCommand, task, exchange);
  if (
    proof.operation.status !== "completed" ||
    proof.operation.result_digest !==
      digestSupervisorEpisodeValue({
        work_order_id: exchange.work_order_id,
        semantic_status: exchange.result!.result.status,
        result_digest: exchange.result_digest,
        native_review: receipt,
      }) ||
    receipt.applied_at !== task.quality_review?.updated_at
  )
    throw new Error("Native completed review projection has no matching completed journal receipt");
  const semantic = exchange.result!.result;
  const review = semantic.review!;
  const frozen = readWorkOrder(
    JSON.parse(await readFile(exchange.evaluator_work_order_ref!, "utf8")),
  );
  const findings = [
    ...semantic.findings,
    ...review.residual_risks.map((risk) => `Residual risk: ${risk}`),
  ];
  const normalized = findings.length > 0 ? findings : [semantic.summary];
  const quality = task.quality_review;
  if (
    quality?.state !== review.verdict ||
    quality.provenance !== "evaluator_supplied" ||
    quality.updated_by !== "EVALUATOR" ||
    quality.evaluated_sha !== frozen.evaluated_sha ||
    quality.review_identity_digest !== evaluatorWorkOrderReviewDigest(frozen) ||
    quality.note !==
      `EVALUATOR returned ${review.verdict} with ${normalized.length} typed finding(s).` ||
    k.kernelDigest(quality.findings) !== k.kernelDigest(normalized) ||
    !quality.evidence_refs?.some(
      (ref) =>
        path.resolve(exchange.checkout, ref) === path.resolve(exchange.evaluator_work_order_ref!),
    )
  )
    throw new Error("Native completed review projection differs from its semantic result");
  const appliedAt = Date.parse(task.quality_review?.updated_at ?? "");
  if (
    !Number.isFinite(appliedAt) ||
    appliedAt < Date.parse(exchange.created_at) ||
    (proof.order.authority.expires_at && appliedAt >= Date.parse(proof.order.authority.expires_at))
  )
    throw new Error("Native completed review was applied outside its authority lifetime");
  return true;
}

/** The native completion CAS binds the exact projection, including the actual application time. */
export function completedNativeReviewJournalResult(task: TaskData | null): {
  native_review?: unknown;
} {
  const receipt = task?.extensions?.[RECEIPT];
  return receipt ? { native_review: receipt } : {};
}
