import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { gitDiffNames, gitIsAncestor, gitShowFile, gitProofEnv } from "@agentplaneorg/core/git";
import { runProcess } from "@agentplaneorg/core/process";
import {
  parseTaskReadme,
  renderTaskReadme,
  setMarkdownSection,
  taskCentricAggregateFromExtensions,
  isGitObjectId,
  taskCentricDigest,
  withTaskCentricAggregate,
} from "@agentplaneorg/core/tasks";
import type { AgentSemanticResult, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";

import type { TaskData } from "../../backends/task-backend.js";
import { isRecord } from "../../shared/guards.js";
import { recoverAppliedTaskScopeExtension } from "../shared/task-scope-extension-request.js";
import { projectTaskCentricCompatibilityMutation } from "../../adapters/task-backend/task-centric-backend-projection.js";
import {
  syntheticEvent,
  transitionReceipt,
} from "../../adapters/task-backend/task-centric-backend-runtime.js";
import { resolveCommandGitCommonDir, type CommandContext } from "../shared/task-backend.js";
import {
  readDirectTaskHead,
  recordDirectImplementationEvidence,
} from "./direct-task-finalization.js";
import { CliError } from "../../shared/errors.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  reconcileTaskExecutionContract,
  resolveTaskExecutionContract,
} from "../../runtime/task-routing/index.js";
import {
  recordedTaskImplementationCommitSha,
  resolveQualityReviewTargetSha,
  taskReadmesHaveOnlyLifecycleDrift,
} from "../shared/quality-review-target.js";
import { normalizeBranchPrBatchTaskIds } from "../pr/internal/sync-batch-ownership.js";
import { resolveObservedVerificationChangedPaths } from "./verify-record-observed-changes.js";
import { isQualificationTask } from "./qualification-packet.js";
import { resolveQualificationDependencyLeaves } from "./qualification-packet-dependencies.js";
import {
  externalAgentResultDigest,
  readExternalAgentExchange,
  readExternalAgentWorkOrder,
  validateExternalAgentResultEnvelope,
  type ExternalAgentExchange,
} from "./external-agent-exchange.js";
import {
  resolveEvidenceOnlyReworkCommit,
  selectRecordedImplementationRecoveryCommit,
} from "./evidence-only-rework-commit.js";

export async function resolveVerifiedEvidenceOnlyReworkCommit(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  task: TaskData;
  route_commit: string | null;
  head: string | null;
  changed_paths: readonly string[];
}): Promise<string | null> {
  const extensionCommit = opts.task.extensions?.implementation_commit as
    | { hash?: unknown }
    | undefined;
  const eventCommit = (opts.task.events ?? [])
    .toReversed()
    .map((event) => (event as unknown as { commit?: unknown }).commit)
    .find((commit): commit is string => typeof commit === "string" && commit.trim().length > 0);
  const recordedCommit =
    opts.route_commit ??
    (typeof extensionCommit?.hash === "string" ? extensionCommit.hash.trim() : null) ??
    eventCommit?.trim() ??
    null;
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  if (!aggregate?.current_plan) return null;
  const workItemId = opts.work_order.task.work_item_id ?? null;
  const allRequiredWorkItemsCompleted = aggregate.current_plan.proposal.work_items.work_items
    .filter((item) => !item.optional)
    .every((item) => aggregate.work_items[item.id]?.state === "COMPLETED");
  let headIsManagedDescendant = false;
  if (
    recordedCommit &&
    opts.head &&
    recordedCommit !== opts.head &&
    opts.task.verification?.state === "ok" &&
    opts.task.quality_review?.state === "pass" &&
    opts.task.quality_review.evaluated_sha === recordedCommit &&
    (await gitIsAncestor(opts.exchange.checkout, recordedCommit, opts.head))
  ) {
    const prefix = `${opts.command.config.paths.workflow_dir}/${opts.exchange.task_id}/`;
    const managed = ["pr/", "quality/", "blueprint/", "verification/", "evidence/", "supervision/"];
    const changed = await gitDiffNames(opts.exchange.checkout, recordedCommit, opts.head);
    headIsManagedDescendant = changed.every(
      (name) =>
        name.startsWith(prefix) &&
        (name === `${prefix}README.md` ||
          managed.some((directory) => name.startsWith(`${prefix}${directory}`))),
    );
  }
  return resolveEvidenceOnlyReworkCommit({
    purpose: opts.exchange.purpose,
    changed_paths: opts.changed_paths,
    recorded_commit: recordedCommit,
    head: opts.head,
    work_item_id: workItemId,
    work_item_state: workItemId ? aggregate.work_items[workItemId]?.state : null,
    task_verification_state: opts.task.verification?.state,
    quality_review_state: opts.task.quality_review?.state,
    quality_review_evaluated_sha: opts.task.quality_review?.evaluated_sha,
    head_is_managed_descendant: headIsManagedDescendant,
    all_required_work_items_completed: allRequiredWorkItemsCompleted,
  });
}

export async function assertRecoverableImplementationCommit(opts: {
  cwd: string;
  baseline: string | null;
  commit: string;
  task_id: string;
}): Promise<void> {
  const subject = await runProcess({
    command: "git",
    args: ["show", "-s", "--format=%s", opts.commit],
    cwd: opts.cwd,
    reject: false,
  });
  const ancestry = opts.baseline
    ? await runProcess({
        command: "git",
        args: ["merge-base", "--is-ancestor", opts.baseline, opts.commit],
        cwd: opts.cwd,
        reject: false,
      })
    : null;
  if (
    subject.exitCode !== 0 ||
    subject.stdout.trim() !==
      `🚧 ${opts.task_id.split("-").at(-1)} task: apply external agent result` ||
    (ancestry && ancestry.exitCode !== 0)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Git history changed outside the recoverable Agentplane implementation effect.",
    });
  }
}

export async function refreshRecoveredImplementationEvidence(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  execution_base: string | null;
  commit: string | null;
  preserve_recorded_evidence?: boolean;
}) {
  await recoverAppliedScopeProjection(opts);
  if (!opts.execution_base || !opts.commit) return null;
  if (opts.preserve_recorded_evidence) {
    // Reobserve Git without rewriting the historical effect with a new episode baseline.
    const checks = await Promise.all(
      [
        ["diff", "--check", opts.execution_base, opts.commit, "--"],
        ["diff", "--cached", "--check"],
      ].map((args) =>
        runProcess({
          command: "git",
          args,
          cwd: opts.exchange.checkout,
          env: gitProofEnv(),
          reject: false,
        }),
      ),
    );
    const changed = await exactChangedPaths(
      opts.exchange.checkout,
      opts.execution_base,
      opts.commit,
    );
    if (checks.some((check) => check.exitCode !== 0) || !changed)
      throw new CliError({
        code: "E_VALIDATION",
        message: "Recorded implementation Git checks failed.",
      });
    return {
      artifact_path: `${opts.command.config.paths.workflow_dir}/${opts.exchange.task_id}/supervision/implementation-evidence.json`,
      implementation_commit: opts.commit,
      changed_paths: changed,
    };
  }
  const evidence = await recordDirectImplementationEvidence({
    command: opts.command,
    cwd: opts.exchange.checkout,
    task_id: opts.exchange.task_id,
    execution_base_commit: opts.execution_base,
    implementation_commit: opts.commit,
    execution_baseline_status: {
      command: "git status --short --untracked-files=all",
      lines: opts.exchange.baseline.changed_paths,
    },
  });
  if (!evidence)
    throw new CliError({
      code: "E_VALIDATION",
      message: "The CLI could not refresh recorded implementation Git evidence.",
    });
  return evidence;
}

function sameRecoveryIdentity(left: unknown, right: unknown): boolean {
  return taskCentricDigest(left ?? null) === taskCentricDigest(right ?? null);
}

async function recoverAppliedScopeProjection(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  commit: string | null;
}): Promise<void> {
  const task = await opts.command.taskBackend.getTask(opts.exchange.task_id);
  if (!task) return;
  const recovered = recoverAppliedTaskScopeExtension(task);
  if (!recovered) return;
  const root = opts.command.resolvedProject.gitRoot;
  const commit = opts.commit ?? (await readDirectTaskHead(root));
  const base = opts.exchange.baseline.head;
  const issued = await readExternalAgentWorkOrder(opts.exchange.work_order_ref);
  const accepted = await readExternalAgentExchange(
    path.join(path.dirname(opts.exchange.work_order_ref), "exchange.json"),
  );
  const baseline = base
    ? await gitShowFile(
        root,
        base,
        `${opts.command.config.paths.workflow_dir}/${task.id}/README.md`,
      )
    : null;
  const fields = baseline ? parseTaskReadme(baseline).frontmatter : null;
  const extensions = fields?.extensions;
  if (
    !commit ||
    !base ||
    !accepted?.result ||
    !accepted.result_digest ||
    accepted.task_id !== task.id ||
    issued.task.id !== task.id ||
    accepted.transition_id !== opts.exchange.transition_id ||
    accepted.state_fingerprint !== opts.exchange.state_fingerprint ||
    accepted.work_order_ref !== opts.exchange.work_order_ref ||
    issued.state_fingerprint.git_head !== base ||
    path.resolve(issued.state_fingerprint.worktree) !== path.resolve(root) ||
    !["result_received", "accepted"].includes(accepted.status) ||
    accepted.purpose !== opts.exchange.purpose ||
    !["implementation", "implementation_rework", "task_worktree_resolution"].includes(
      accepted.purpose,
    ) ||
    path.resolve(accepted.checkout) !== path.resolve(root) ||
    path.resolve(opts.exchange.checkout) !== path.resolve(root) ||
    accepted.baseline.head !== base ||
    fields?.id !== task.id ||
    fields.revision !== task.revision ||
    !isRecord(extensions) ||
    ![
      "agentplane.task_centric",
      "agentplane.scope_extension_request",
      "task_execution_context",
    ].every((key) => sameRecoveryIdentity(extensions[key], task.extensions?.[key])) ||
    !isRecord(fields.execution_contract) ||
    !sameRecoveryIdentity(
      fields.execution_contract.declaration,
      task.execution_contract?.declaration,
    ) ||
    !sameRecoveryIdentity(
      fields.execution_contract.authority,
      task.execution_contract?.authority,
    ) ||
    !(await gitIsAncestor(root, base, commit)) ||
    !(await gitIsAncestor(root, commit, "HEAD"))
  )
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Scope projection recovery requires the exact accepted implementation and immutable execution baseline.",
    });
  const envelope = validateExternalAgentResultEnvelope({
    raw: accepted.result,
    exchange: accepted,
    work_order: issued,
  });
  if (
    envelope.result.status !== "completed" ||
    externalAgentResultDigest(envelope) !== accepted.result_digest
  )
    throw new CliError({
      code: "E_VALIDATION",
      message: "Scope projection recovery rejected an altered accepted result.",
    });
  await assertRecoverableImplementationCommit({
    cwd: root,
    baseline: base,
    commit,
    task_id: task.id,
  });
  await opts.command.taskBackend.writeTask(
    projectTaskCentricCompatibilityMutation({
      current: task,
      next: { ...task, extensions: withTaskCentricAggregate(task.extensions, recovered) },
    }),
    { expectedRevision: task.revision! },
  );
}

function recoveryComparableReadme(
  markdown: string,
  commit: string,
  current: boolean,
): string | null {
  const parsed = parseTaskReadme(markdown);
  const fields = parsed.frontmatter;
  Reflect.deleteProperty(fields, "token_usage");
  if (isRecord(fields.execution_contract)) {
    for (const key of ["observed", "verification", "reason_codes"])
      Reflect.deleteProperty(fields.execution_contract, key);
  }
  if (isRecord(fields.extensions)) {
    const receipt = fields.extensions.implementation_commit;
    if (
      receipt != null &&
      (!isRecord(receipt) ||
        typeof receipt.hash !== "string" ||
        (current && receipt.hash !== commit) ||
        Object.keys(receipt).some((key) => !["hash", "message"].includes(key)))
    )
      return null;
    Reflect.deleteProperty(fields.extensions, "implementation_commit");
  }
  return renderTaskReadme(fields, setMarkdownSection(parsed.body, "Token Usage", ""));
}

function preserveReceiptedMetadata(
  before: Record<string, unknown>,
  after: Record<string, unknown>,
): void {
  const aggregateKey = "agentplane.task_centric";
  const runtimeKey = "agentplane.task_centric_runtime";
  if (
    taskCentricDigest(before[aggregateKey] ?? null) ===
      taskCentricDigest(after[aggregateKey] ?? null) &&
    taskCentricDigest(before[runtimeKey] ?? null) === taskCentricDigest(after[runtimeKey] ?? null)
  )
    return;
  const original = taskCentricAggregateFromExtensions(before);
  const current = taskCentricAggregateFromExtensions(after);
  const previousRuntime = before[runtimeKey];
  const currentRuntime = after[runtimeKey];
  if (!original || !current || !isRecord(previousRuntime) || !isRecord(currentRuntime)) return;
  const previousReceipts = previousRuntime.mutation_receipts;
  const currentReceipts = currentRuntime.mutation_receipts;
  if (!isRecord(previousReceipts) || !isRecord(currentReceipts)) return;
  if (
    taskCentricDigest({ ...previousRuntime, mutation_receipts: null }) !==
      taskCentricDigest({ ...currentRuntime, mutation_receipts: null }) ||
    Object.entries(previousReceipts).some(
      ([key, receipt]) =>
        !Object.hasOwn(currentReceipts, key) ||
        taskCentricDigest(receipt) !== taskCentricDigest(currentReceipts[key]),
    )
  )
    return;
  const added = Object.entries(currentReceipts).filter(
    ([key]) => !Object.hasOwn(previousReceipts, key),
  );
  let candidate = original;
  // Replay only metadata-only projection receipts. Plan, lifecycle and WorkItem data stay exact.
  const ordered = added.toSorted(
    ([, left], [, right]) =>
      Number(isRecord(left) ? left.previous_revision : -1) -
      Number(isRecord(right) ? right.previous_revision : -1),
  );
  for (const [mutationId, receipt] of ordered) {
    if (!isRecord(receipt) || !isRecord(receipt.event) || typeof receipt.event.at !== "string")
      return;
    const next = {
      ...candidate,
      revision: candidate.revision + 1,
      event_cursor: candidate.event_cursor + 1,
      updated_at: receipt.event.at,
    };
    const expected = transitionReceipt({
      task_id: candidate.id,
      previous_revision: candidate.revision,
      next,
      mutation_id: mutationId,
      event: syntheticEvent({
        task: candidate,
        mutation_id: mutationId,
        entity: "task",
        from: candidate.lifecycle,
        to: candidate.lifecycle,
        at: receipt.event.at,
        cause_refs: ["compatibility_projection_mutation"],
      }),
    });
    if (
      !mutationId.startsWith("compatibility:sha256:") ||
      taskCentricDigest(expected) !== taskCentricDigest(receipt)
    ) {
      return;
    }
    candidate = next;
  }
  if (taskCentricDigest(candidate) !== taskCentricDigest(current)) return;
  before[aggregateKey] = after[aggregateKey];
  before[runtimeKey] = after[runtimeKey];
}

/** This comparison does not reuse verification. The fresh route reruns the observed contract. */
export function taskReadmesPreserveRecoveryContract(
  before: string,
  after: string,
  commit: string,
): boolean {
  const original = parseTaskReadme(before);
  const next = parseTaskReadme(after);
  const previousExtensions = original.frontmatter.extensions;
  const nextExtensions = next.frontmatter.extensions;
  if (isRecord(previousExtensions) && isRecord(nextExtensions)) {
    try {
      preserveReceiptedMetadata(previousExtensions, nextExtensions);
    } catch {
      return false;
    }
    const previous = previousExtensions.task_execution_context;
    const current = nextExtensions.task_execution_context;
    const identityKeys = ["schema_version", "base_ref", "base_sha", "repository_identity"];
    if (
      isRecord(previous) &&
      isRecord(current) &&
      previous.source === "creation_checkout" &&
      !Object.hasOwn(current, "source") &&
      previous.schema_version === 1 &&
      typeof previous.base_ref === "string" &&
      previous.base_ref.trim().length > 0 &&
      typeof previous.base_sha === "string" &&
      isGitObjectId(previous.base_sha) &&
      typeof previous.repository_identity === "string" &&
      /^sha256:[0-9a-f]{64}$/u.test(previous.repository_identity) &&
      identityKeys.every((key) => previous[key] === current[key]) &&
      Object.keys(previous).every((key) => key === "source" || identityKeys.includes(key)) &&
      Object.keys(current).every((key) => identityKeys.includes(key))
    ) {
      // Verification omits creation provenance while preserving the exact execution identity.
      Reflect.deleteProperty(previous, "source");
    }
  }
  if (
    isRecord(previousExtensions) &&
    isRecord(nextExtensions) &&
    previousExtensions.task_execution_context == null
  ) {
    const baseline = previousExtensions.workflow_route_baseline;
    const context = nextExtensions.task_execution_context;
    if (
      isRecord(baseline) &&
      isRecord(context) &&
      context.schema_version === 1 &&
      typeof baseline.start_head_sha === "string" &&
      context.base_sha === baseline.start_head_sha &&
      context.repository_identity == null &&
      typeof context.base_ref === "string" &&
      Object.keys(context).every((key) =>
        ["schema_version", "base_ref", "base_sha", "repository_identity"].includes(key),
      )
    ) {
      // Verification can materialize an already-frozen execution boundary after the commit.
      previousExtensions.task_execution_context = context;
    }
  }
  const previous = recoveryComparableReadme(
    renderTaskReadme(original.frontmatter, original.body),
    commit,
    false,
  );
  const current = recoveryComparableReadme(after, commit, true);
  return (
    previous !== null && current !== null && taskReadmesHaveOnlyLifecycleDrift(previous, current)
  );
}

async function exactChangedPaths(
  root: string,
  base: string,
  head: string,
): Promise<string[] | null> {
  const diff = await runProcess({
    command: "git",
    args: [
      "diff",
      "--no-ext-diff",
      "--no-textconv",
      "--no-renames",
      "--name-only",
      "-z",
      base,
      head,
      "--",
    ],
    cwd: root,
    env: gitProofEnv(),
    reject: false,
  });
  return diff.exitCode === 0 ? diff.stdout.split("\0").filter(Boolean) : null;
}

export async function resolveImplementationVerificationTask(opts: {
  command: CommandContext;
  checkout: string;
  task: TaskData;
  workflow: "direct" | "branch_pr";
}): Promise<{
  task: TaskData;
  snapshot: {
    execution_contract: NonNullable<TaskData["execution_contract"]>;
    evaluated_sha: string | null;
    changed_paths: string[];
  };
}> {
  const execution = await resolveTaskExecutionContext({
    ctx: opts.command,
    tasks: [opts.task],
    primaryTaskId: opts.task.id,
  });
  const batchTaskIds = normalizeBranchPrBatchTaskIds(opts.task, opts.task.id);
  const dependencies = isQualificationTask(opts.task)
    ? await resolveQualificationDependencyLeaves({
        taskId: opts.task.id,
        loadTask: (id) => opts.command.taskBackend.getTask(id),
      })
    : null;
  const taskIds = [...new Set([...batchTaskIds, ...(dependencies?.dependencyTaskIds ?? [])])];
  const evaluatedSha = await resolveQualityReviewTargetSha({
    gitRoot: opts.checkout,
    workflowDir: opts.command.config.paths.workflow_dir,
    taskId: opts.task.id,
    taskIds,
    lifecycleTaskIds: batchTaskIds,
    previousEvaluatedSha: recordedTaskImplementationCommitSha(opts.task),
    workflowMode: opts.workflow,
  });
  const changedPaths = await resolveObservedVerificationChangedPaths({
    ctx: opts.command,
    evaluatedSha,
    taskId: opts.task.id,
    artifactTaskIds: taskIds,
    execution,
  });
  const verificationTask = {
    ...opts.task,
    execution_contract: reconcileTaskExecutionContract({
      contract:
        opts.task.execution_contract ??
        resolveTaskExecutionContract({
          config: opts.command.config,
          task: opts.task,
          requestedMode: opts.workflow,
        }),
      changed_paths: changedPaths,
    }).contract,
  };
  return {
    task: verificationTask,
    snapshot: {
      execution_contract: verificationTask.execution_contract!,
      evaluated_sha: evaluatedSha,
      changed_paths: changedPaths,
    },
  };
}

async function directories(directory: string): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(directory, entry.name));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

function completedWorkItemRecoveryReadme(markdown: string): string {
  const parsed = parseTaskReadme(markdown);
  const aggregate = parsed.frontmatter.extensions;
  const runtime = isRecord(aggregate) ? aggregate["agentplane.task_centric"] : null;
  if (isRecord(aggregate) && isRecord(runtime)) {
    // Completion changes runtime evidence, not the approved plan or its authority.
    for (const key of ["revision", "event_cursor", "updated_at", "final_validation"])
      Reflect.deleteProperty(runtime, key);
    if (isRecord(runtime.work_items)) {
      for (const item of Object.values(runtime.work_items)) {
        if (!isRecord(item)) continue;
        for (const key of [
          "state",
          "revision",
          "attempt",
          "claim_id",
          "output_manifests",
          "validation_result",
          "last_failure",
        ])
          Reflect.deleteProperty(item, key);
      }
    }
    Reflect.deleteProperty(aggregate, "agentplane.task_centric_runtime");
  }
  return renderTaskReadme(parsed.frontmatter, parsed.body);
}

/** Recover only recorded implementation effects. Checks are executed again by the caller. */
export async function resolveRecordedImplementationRecovery(opts: {
  command: CommandContext;
  task: TaskData;
  work_order: AgentWorkOrderV2;
  head: string | null;
  recorded_commit: string | null;
  purpose?: ExternalAgentExchange["purpose"];
}): Promise<{
  commit: string;
  execution_base: string;
  semantic: AgentSemanticResult | null;
} | null> {
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  const plan = aggregate?.current_plan;
  const root = opts.command.resolvedProject.gitRoot;
  const taskPrefix = `${opts.command.config.paths.workflow_dir}/${opts.task.id}/`;
  let evidence: unknown;
  try {
    evidence = JSON.parse(
      await readFile(
        path.join(root, taskPrefix, "supervision/implementation-evidence.json"),
        "utf8",
      ),
    );
  } catch (error) {
    if (error instanceof SyntaxError || (error as NodeJS.ErrnoException).code === "ENOENT")
      return null;
    throw error;
  }
  if (
    !isRecord(evidence) ||
    evidence.kind !== "direct_task_implementation_evidence" ||
    evidence.task_id !== opts.task.id ||
    typeof evidence.implementation_commit !== "string" ||
    typeof evidence.execution_base_commit !== "string"
  )
    return null;
  const workItemId = opts.work_order.task.work_item_id ?? null;
  const taskLevelRework =
    workItemId === null &&
    opts.purpose === "implementation_rework" &&
    (opts.task.verification?.state === "needs_rework" ||
      ["rework", "blocked"].includes(opts.task.quality_review?.state ?? ""));
  const commit = selectRecordedImplementationRecoveryCommit({
    task_level_rework: taskLevelRework,
    recorded_commit: opts.recorded_commit,
    evidence_commit: evidence.implementation_commit,
  });
  if (
    evidence.implementation_commit !== commit ||
    !/^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(commit) ||
    !/^[0-9a-f]{40}(?:[0-9a-f]{24})?$/u.test(evidence.execution_base_commit)
  )
    return null;
  if (workItemId === null && !taskLevelRework) return null;
  if (
    !plan ||
    !aggregate ||
    !commit ||
    !opts.head ||
    plan.approval.state !== "approved" ||
    plan.approval.approved_digest !== plan.digest ||
    opts.task.plan_approval?.state !== "approved"
  ) {
    return null;
  }
  if (workItemId) {
    const item = aggregate.work_items[workItemId];
    if (!item || !["READY", "REWORK_READY"].includes(item.state)) return null;
  } else if (
    plan.proposal.work_items.work_items.some(
      (item) => !item.optional && aggregate.work_items[item.id]?.state !== "COMPLETED",
    )
  ) {
    return null;
  }
  if (!(await gitIsAncestor(root, commit, opts.head))) return null;
  const subsequentPaths = await exactChangedPaths(root, commit, opts.head);
  const managed = ["pr/", "quality/", "blueprint/", "verification/", "evidence/", "supervision/"];
  if (
    !subsequentPaths ||
    subsequentPaths.some(
      (name) =>
        !name.startsWith(taskPrefix) ||
        (name !== `${taskPrefix}README.md` &&
          !managed.some((directory) => name.startsWith(`${taskPrefix}${directory}`))),
    )
  )
    return null;
  const committedReadme = await gitShowFile(root, commit, `${taskPrefix}README.md`);
  if (!committedReadme) return null;
  const currentReadmes = await Promise.all([
    gitShowFile(root, opts.head, `${taskPrefix}README.md`),
    readFile(path.join(root, taskPrefix, "README.md"), "utf8"),
  ]);
  if (
    currentReadmes.some(
      (readme) =>
        !taskReadmesPreserveRecoveryContract(
          taskLevelRework ? completedWorkItemRecoveryReadme(committedReadme) : committedReadme,
          taskLevelRework ? completedWorkItemRecoveryReadme(readme) : readme,
          commit,
        ),
    )
  )
    return null;
  const frontmatter = parseTaskReadme(committedReadme).frontmatter;
  const recordedPlan = taskCentricAggregateFromExtensions(
    isRecord(frontmatter.extensions) ? frontmatter.extensions : undefined,
  )?.current_plan;
  if (recordedPlan?.digest !== plan.digest || recordedPlan.revision !== plan.revision) return null;

  const base = evidence.execution_base_commit;
  if (!(await gitIsAncestor(root, base, commit)) || base === commit) return null;
  const diffNames = await exactChangedPaths(root, base, commit);
  if (!diffNames) return null;
  const changed = diffNames.filter((name) => !name.startsWith(taskPrefix));
  const allowed = opts.work_order.authority.writable_roots.map((entry) =>
    path.relative(root, path.resolve(root, entry)).replaceAll("\\", "/"),
  );
  if (
    changed.length === 0 ||
    changed.some(
      (name) =>
        !allowed.some((scope) => scope === "" || name === scope || name.startsWith(`${scope}/`)),
    )
  )
    return null;

  const exchangeRoot = path.join(
    await resolveCommandGitCommonDir(opts.command),
    "agentplane/external-agent",
    opts.task.id,
  );
  for (const transition of await directories(exchangeRoot)) {
    for (const directory of await directories(transition)) {
      const exchange = await readExternalAgentExchange(path.join(directory, "exchange.json"));
      if (
        exchange?.task_id !== opts.task.id ||
        exchange.baseline.head !== base ||
        !["implementation", "implementation_rework"].includes(exchange.purpose) ||
        !["result_received", "accepted", "consumed", "retired"].includes(exchange.status) ||
        !exchange.result ||
        !exchange.result_digest ||
        path.resolve(exchange.checkout) !== path.resolve(root) ||
        path.resolve(exchange.work_order_ref) !== path.join(directory, "work-order.json")
      )
        continue;
      const issued = await readExternalAgentWorkOrder(path.join(directory, "work-order.json"));
      const originalItem = issued.task.work_item_id ?? null;
      if (
        issued.task.id !== opts.task.id ||
        (taskLevelRework
          ? originalItem !== null && aggregate.work_items[originalItem]?.state !== "COMPLETED"
          : originalItem !== workItemId)
      )
        continue;
      const original = validateExternalAgentResultEnvelope({
        raw: exchange.result,
        exchange,
        work_order: issued,
      });
      if (
        original.result.status !== "completed" ||
        original.result.plan_refinement ||
        externalAgentResultDigest(original) !== exchange.result_digest
      )
        continue;
      // Task-level rework reports current claims. Interrupted WorkItems retain original claims.
      return { commit, execution_base: base, semantic: taskLevelRework ? null : original.result };
    }
  }
  return null;
}
