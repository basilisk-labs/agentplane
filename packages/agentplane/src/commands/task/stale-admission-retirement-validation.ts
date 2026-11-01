import { createHash } from "node:crypto";
import { lstat } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { taskKernel as k } from "@agentplaneorg/core/tasks";
import {
  AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
  AGENT_WORK_ORDER_V2_ZOD_SCHEMA,
  STATE_FINGERPRINT_ZOD_SCHEMA,
  STATE_FINGERPRINT_POLICY_ZOD_SCHEMA,
  validateAgentWorkOrderV2,
  validateStateFingerprint,
  validateStateFingerprintPolicy,
  validateSupervisorExecutionEpisodeJournal,
} from "@agentplaneorg/core/schemas";
import {
  assertContainedPathChainIdentityUnchanged,
  captureContainedPathChainIdentity,
  readContainedStableTextNoFollow,
} from "../../shared/contained-stable-file.js";
import { readStableRegularFileNoFollow } from "../../shared/stable-file.js";
import { CliError } from "../../shared/errors.js";
import {
  decodeLifecycleOwnerMigrationSource,
  previewLifecycleOwnerMigration,
} from "./migration-preview.js";
import { isRevisionSplitPreview } from "./migration-quarantine.js";
import {
  externalAgentResultDigest,
  externalAgentExchangeDigest,
  resolveExternalAgentExchangePaths,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";
import {
  assertExternalAgentExchangeIdentity,
  assertExternalAgentSupervisorIntent,
} from "./external-agent-exchange-authority.js";

const digest = z.string().regex(/^sha256:[a-f0-9]{64}$/u);
export const retirementRequestSchema = z.strictObject({
  schema_version: z.literal(1),
  kind: z.literal("stale_admission_retirement_request"),
  task_id: z.string().regex(/^[A-Za-z0-9_-]+$/u),
  repository_identity: digest,
  policy_digest: digest,
  source_digest: digest,
  journal_digest: digest,
  operation_key: digest,
  work_order_digest: digest,
  exchange_digest: digest,
  result_digest: digest.nullable(),
  original_checkout: z.string().min(1),
});
export type RetirementRequest = z.infer<typeof retirementRequestSchema>;
type RetirementBinding = Pick<RetirementRequest, "repository_identity" | "policy_digest">;
export type RetirementContext = {
  checkout: string;
  workflow_dir: string;
  worktrees_dir: string;
  common_git_dir: string;
  task_id: string;
  observe_binding: () => Promise<RetirementBinding>;
};
export type RetirementImages = {
  source: string;
  journal: string;
  work_order: string;
  exchange: string;
  result: string | null;
};
type RetirementObservation = {
  request: RetirementRequest;
  images: RetirementImages;
  current_journal: string;
  current_exchange: string;
  journal_path: string;
  exchange_path: string;
};

// Retirement may authenticate a retained v1 fingerprint. It never upgrades that
// WorkOrder or makes the historical authority usable for invocation.
const historicalWorkOrderSchema = z.strictObject({
  ...AGENT_WORK_ORDER_V2_ZOD_SCHEMA.shape,
  state_fingerprint: STATE_FINGERPRINT_ZOD_SCHEMA,
  state_fingerprint_policy: STATE_FINGERPRINT_POLICY_ZOD_SCHEMA,
});
function retirementWorkOrder(raw: unknown) {
  const input = raw as { state_fingerprint?: { schema_version?: unknown } } | null;
  if (input?.state_fingerprint?.schema_version !== 1)
    return { legacy: false as const, value: validateAgentWorkOrderV2(raw) };
  const parsed = historicalWorkOrderSchema.parse(raw);
  if (parsed.state_fingerprint.schema_version !== 1)
    retirementRefusal("unsupported historical fingerprint version.");
  validateStateFingerprint(parsed.state_fingerprint);
  validateStateFingerprintPolicy(parsed.state_fingerprint_policy);
  if (
    parsed.state_fingerprint_policy.fingerprint_schema_version === 2 ||
    parsed.state_fingerprint_policy.required_components.some(
      (name) => !Object.hasOwn(parsed.state_fingerprint.components, name),
    )
  )
    retirementRefusal("historical policy names an incompatible fingerprint domain.");
  if (parsed.canonical_binding !== undefined || parsed.recipe_context !== undefined)
    retirementRefusal("historical fingerprint has unsupported canonical authority.");
  return { legacy: true as const, value: raw as typeof parsed };
}

/** Version 2 issue identity, preserving the originally serialized WorkOrder. */
function historicalIssueDigest(
  exchange: ExternalAgentExchange,
  workOrder: z.infer<typeof historicalWorkOrderSchema>,
) {
  if (exchange.issue_digest_version !== 2 || exchange.result_format !== undefined)
    retirementRefusal("unsupported historical issue identity version.");
  return externalAgentExchangeDigest(
    JSON.stringify({
      schema_version: exchange.schema_version,
      kind: exchange.kind,
      task_id: exchange.task_id,
      transition_id: exchange.transition_id,
      state_fingerprint: exchange.state_fingerprint,
      role: exchange.role,
      purpose: exchange.purpose,
      checkout: exchange.checkout,
      work_order_id: exchange.work_order_id,
      work_order_ref: exchange.work_order_ref,
      result_schema_ref: exchange.result_schema_ref,
      ...(exchange.result_schema_object
        ? { result_schema_object: exchange.result_schema_object }
        : {}),
      result_ref: exchange.result_ref,
      evaluator_work_order_ref: exchange.evaluator_work_order_ref,
      baseline: exchange.baseline,
      work_order: workOrder,
      issue_digest_version: 2,
    }),
  );
}

export function retirementRefusal(message: string): never {
  throw new CliError({ code: "E_VALIDATION", message: "Admission retirement: " + message });
}

export function retirementBytesDigest(text: string): string {
  return "sha256:" + createHash("sha256").update(text).digest("hex");
}

export async function readRetirementFile(root: string, file: string): Promise<string> {
  const chain = await captureContainedPathChainIdentity({
    repository_root: root,
    file_path: file,
    label: "admission retirement evidence",
  });
  const text = await readContainedStableTextNoFollow({
    repository_root: root,
    file_path: file,
    label: "admission retirement evidence",
    max_bytes: 4 * 1024 * 1024,
  });
  const bytes = await readStableRegularFileNoFollow(file, "retirement raw bytes", {
    max_bytes: 4 * 1024 * 1024,
  });
  if (!bytes.equals(Buffer.from(text))) retirementRefusal("changed or non-UTF-8 evidence.");
  await assertContainedPathChainIdentityUnchanged(chain, "admission retirement evidence");
  if ((await lstat(file)).nlink !== 1) retirementRefusal("hard-linked evidence.");
  return text;
}

export function retirementJournalPath(ctx: RetirementContext): string {
  if (!/^[A-Za-z0-9_-]+$/u.test(ctx.task_id)) retirementRefusal("invalid Task identity.");
  return path.join(
    ctx.common_git_dir,
    "agentplane/supervisor/episodes",
    ctx.task_id,
    "journal.json",
  );
}

/** A missing original checkout is a concrete loss of the issued workspace authority. */
async function requireMissingOwner(ctx: RetirementContext, checkout: string): Promise<void> {
  if (path.basename(ctx.common_git_dir) !== ".git")
    retirementRefusal("a standard non-bare repository is required.");
  const primary = path.dirname(ctx.common_git_dir);
  const parent = path.resolve(primary, ctx.worktrees_dir);
  await captureContainedPathChainIdentity({
    repository_root: primary,
    file_path: parent,
    label: "configured worktree directory",
    path_policy: { target_kind: "file_or_directory", allow_missing_ancestors: true },
  });
  const relative = path.relative(parent, checkout);
  if (
    !relative ||
    relative.startsWith("..") ||
    path.isAbsolute(relative) ||
    relative.includes(path.sep) ||
    !path.basename(checkout).startsWith(ctx.task_id + "-")
  )
    retirementRefusal("original checkout is outside the configured Task worktrees.");
  const owner = await captureContainedPathChainIdentity({
    repository_root: primary,
    file_path: checkout,
    label: "original semantic checkout",
    path_policy: { target_kind: "file_or_directory", allow_missing_ancestors: true },
  });
  if (owner.target_exists) retirementRefusal("the original semantic checkout still exists.");
}

export async function observeStaleAdmission(
  ctx: RetirementContext,
  before?: RetirementImages,
): Promise<RetirementObservation> {
  const journalPath = retirementJournalPath(ctx);
  const sourcePath = path.resolve(ctx.checkout, ctx.workflow_dir, ctx.task_id, "README.md");
  const source = await readRetirementFile(ctx.checkout, sourcePath);
  const preview = previewLifecycleOwnerMigration(Buffer.from(source));
  if (!isRevisionSplitPreview(preview, ctx.task_id))
    retirementRefusal("the exact source is not a revision-split quarantine candidate.");
  const runtime = decodeLifecycleOwnerMigrationSource(Buffer.from(source)).runtime;
  if (runtime.leases.length !== 0 || runtime.pending_effects.length !== 0)
    retirementRefusal("legacy Task runtime still retains leases or pending effects.");
  const currentJournal = await readRetirementFile(ctx.common_git_dir, journalPath);
  const journalText = before?.journal ?? currentJournal;
  const journal = validateSupervisorExecutionEpisodeJournal(JSON.parse(journalText));
  const operation = journal.operations.at(-1);
  if (
    journal.task_id !== ctx.task_id ||
    journal.status !== "running" ||
    journal.stop !== null ||
    journal.cursor.phase !== "intent_recorded" ||
    journal.operations.filter((entry) => entry.status === "intent").length !== 1 ||
    operation?.status !== "intent" ||
    operation.kind !== "agent_episode" ||
    operation.role !== "EXECUTOR" ||
    journal.cursor.operation_key !== operation.operation_key ||
    !operation.work_order_ref ||
    !operation.effect_ref?.startsWith("external-agent-issue:")
  )
    retirementRefusal("the exact single running semantic intent is unavailable.");
  const workOrderPath = path.resolve(operation.work_order_ref);
  const externalRoot = path.join(ctx.common_git_dir, "agentplane/external-agent", ctx.task_id);
  const relativeWorkOrder = path.relative(externalRoot, workOrderPath);
  if (relativeWorkOrder.startsWith("..") || path.isAbsolute(relativeWorkOrder))
    retirementRefusal("the WorkOrder is outside its native Task exchange.");
  const workOrderText = await readRetirementFile(ctx.common_git_dir, workOrderPath);
  const validated = retirementWorkOrder(JSON.parse(workOrderText));
  const workOrder = validated.value;
  const directory = path.dirname(workOrderPath);
  const exchangePath = path.join(directory, "exchange.json");
  const currentExchange = await readRetirementFile(ctx.common_git_dir, exchangePath);
  const exchangeText = before?.exchange ?? currentExchange;
  const exchange = JSON.parse(exchangeText) as ExternalAgentExchange;
  const authority = workOrder.authority;
  const expectedDirectory = path.join(
    ctx.common_git_dir,
    "agentplane/external-agent",
    ctx.task_id,
    exchange.transition_id,
    operation.precondition_fingerprint_digest.slice(7),
  );
  if (
    directory !== expectedDirectory ||
    path.basename(workOrderPath) !== "work-order.json" ||
    workOrder.task.id !== ctx.task_id ||
    workOrder.state_fingerprint.task_id !== ctx.task_id ||
    workOrder.role !== "EXECUTOR" ||
    workOrder.state_fingerprint.digest !== operation.precondition_fingerprint_digest ||
    workOrder.state_fingerprint.worktree !== exchange.checkout ||
    workOrder.work_order_id !== exchange.work_order_id ||
    exchange.schema_version !== 1 ||
    exchange.kind !== "external_agent_exchange" ||
    exchange.task_id !== ctx.task_id ||
    exchange.role !== "EXECUTOR" ||
    !/^tr_[a-f0-9]{32}$/u.test(exchange.transition_id) ||
    exchange.work_order_ref !== workOrderPath ||
    exchange.state_fingerprint !== operation.precondition_fingerprint_digest ||
    !["implementation", "implementation_rework"].includes(exchange.purpose) ||
    !["issued", "result_received"].includes(exchange.status) ||
    exchange.verification_checkpoint ||
    authority.sandbox !== "workspace-write" ||
    authority.mutation_scope !== "code" ||
    authority.writable_roots.length === 0 ||
    authority.external_side_effects.length !== 0 ||
    authority.allowed_tool_classes.some(
      (tool) =>
        ![
          "repository_read",
          "git_read",
          "workspace_write",
          "run_checks",
          "report_result",
          "report_blocker",
          "knowledge_request",
          "knowledge_read",
        ].includes(tool),
    ) ||
    authority.writable_roots.some((root) => {
      const relative = path.relative(exchange.checkout, root);
      return !relative || relative.startsWith("..") || path.isAbsolute(relative);
    })
  )
    retirementRefusal("the original writable WorkOrder admission is not proven.");
  const paths = await resolveExternalAgentExchangePaths({
    git_root: ctx.checkout,
    common_git_dir: ctx.common_git_dir,
    task_id: ctx.task_id,
    transition_id: exchange.transition_id,
    state_fingerprint: operation.precondition_fingerprint_digest,
  });
  assertExternalAgentExchangeIdentity({
    exchange,
    paths,
    task_id: ctx.task_id,
    transition_id: exchange.transition_id,
    state_fingerprint: operation.precondition_fingerprint_digest,
    work_order_id: workOrder.work_order_id,
    role: "EXECUTOR",
    purpose: exchange.purpose,
    checkout: exchange.checkout,
  });
  if (validated.legacy) {
    if (
      operation.effect_ref !==
      "external-agent-issue:" + historicalIssueDigest(exchange, validated.value)
    )
      retirementRefusal("the original historical issuance digest is not proven.");
  } else {
    const intent = assertExternalAgentSupervisorIntent({
      journal,
      exchange,
      paths,
      work_order: validated.value,
      task_id: ctx.task_id,
      state_fingerprint: operation.precondition_fingerprint_digest,
    });
    if (intent.state !== "issued") retirementRefusal("the admission is not an unresolved intent.");
  }
  await requireMissingOwner(ctx, exchange.checkout);
  const resultPath = path.join(directory, "result.json");
  if (exchange.result_ref !== resultPath)
    retirementRefusal("the result path is not the canonical issued artifact.");
  let result: string | null;
  try {
    result = await readRetirementFile(ctx.common_git_dir, resultPath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    result = null;
  }
  if (result === null) {
    if (exchange.status !== "issued" || exchange.result !== null || exchange.result_digest !== null)
      retirementRefusal("the retained result is missing.");
  } else {
    const raw: unknown = JSON.parse(result);
    let envelope;
    if (validated.legacy) {
      const retained = z
        .strictObject({
          schema_version: z.literal(1),
          kind: z.literal("agent_action_result"),
          task_id: z.literal(ctx.task_id),
          transition_id: z.literal(exchange.transition_id),
          state_fingerprint: z.literal(exchange.state_fingerprint),
          role: z.literal("EXECUTOR"),
          result: AGENT_SEMANTIC_RESULT_ZOD_SCHEMA,
        })
        .parse(raw);
      if (
        retained.result.work_order_id !== exchange.work_order_id ||
        k.kernelDigest(raw) !== k.kernelDigest(exchange.result)
      )
        retirementRefusal("the original historical result envelope changed.");
      envelope = exchange.result;
    } else {
      envelope = validateExternalAgentResultEnvelope({
        raw,
        exchange,
        work_order: validated.value,
      });
    }
    if (
      exchange.status !== "result_received" ||
      !envelope ||
      !exchange.result ||
      externalAgentResultDigest(envelope) !== exchange.result_digest ||
      externalAgentResultDigest(exchange.result) !== exchange.result_digest
    )
      retirementRefusal("the retained result changed or was not received natively.");
  }
  const binding = await ctx.observe_binding();
  const images = {
    source,
    journal: journalText,
    work_order: workOrderText,
    exchange: exchangeText,
    result,
  };
  const request = retirementRequestSchema.parse({
    schema_version: 1,
    kind: "stale_admission_retirement_request",
    task_id: ctx.task_id,
    ...binding,
    source_digest: retirementBytesDigest(source),
    journal_digest: retirementBytesDigest(journalText),
    operation_key: operation.operation_key,
    work_order_digest: retirementBytesDigest(workOrderText),
    exchange_digest: retirementBytesDigest(exchangeText),
    result_digest: result === null ? null : retirementBytesDigest(result),
    original_checkout: exchange.checkout,
  });
  if (before && k.kernelDigest(images) !== k.kernelDigest(before))
    retirementRefusal("retained source, WorkOrder or result changed after preparation.");
  return {
    request,
    images,
    current_journal: currentJournal,
    current_exchange: currentExchange,
    journal_path: journalPath,
    exchange_path: exchangePath,
  };
}
