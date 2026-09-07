import {
  externalReportResultPath,
  materializeExternalReportResult,
} from "./external-agent-report-result.js";
import {
  pathFromStatusLine,
  hasChangedTaskArtifacts,
  finishExternalImplementationVerification,
} from "./external-agent-implementation-finalization.js";
import {
  authorityPath,
  pathAllowed,
  recoverExternalConflictEvidence,
  applyExternalConflictResolution,
} from "./external-agent-conflict-application.js";

import type { AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";

import { CliError } from "../../shared/errors.js";
import { CI_PATH_PREFIXES } from "../../shared/protected-paths.js";
import { cmdCommit } from "../guard/impl/commit.js";
import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";
import { resolveConflictReworkSemanticInput } from "../pr/conflict-rework-semantic-input.js";
import { commitConflictResolutionSnapshot } from "../pr/conflict-rework-merge.js";

import type { TaskRouteDecision } from "../shared/route-decision-types.js";

import type {
  ExternalAgentExchange,
  ExternalAgentResultEnvelope,
} from "./external-agent-exchange.js";
import {
  isExternalBlockedResultRecorded,
  recordExternalBlockedResult,
} from "./external-agent-blocked-result.js";
import { recoversRecordedImplementationCommit } from "./external-agent-purpose.js";
import { readDirectRepositoryStatus, readDirectTaskHead } from "./direct-task-finalization.js";
import { recordDirectTaskVerification } from "./direct-task-verification.js";
import { prepareDirectImplementationEvidence } from "./direct-task-supervisor-implementation.js";
import { cmdTaskComment } from "./comment.js";
import { cmdTaskSetStatus } from "./set-status.js";
import { recordObservedTaskExecutionContract } from "./task-execution-contract-observation.js";
import {
  resolveRecordedImplementationRecovery,
  resolveVerifiedEvidenceOnlyReworkCommit,
  assertRecoverableImplementationCommit,
  refreshRecoveredImplementationEvidence,
} from "./external-agent-implementation-recovery.js";
import { recordedTaskImplementationCommitSha } from "../shared/quality-review-target.js";
import { requiresImplementationReworkReopen } from "../shared/task-scope-extension-request.js";
import { loadTaskFromContext, type CommandContext } from "../shared/task-backend.js";
import {
  prepareExternalVerificationCheckpoint,
  completeExternalVerificationCheckpoint,
  recoverExternalVerificationCheckpoint,
} from "./external-agent-implementation-checkpoint.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";

export function assertExternalImplementationReturnState(opts: {
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  current: TaskRouteDecision;
  current_head: string | null;
  current_status_lines: readonly string[];
  require_changes: boolean;
}): string[] {
  const expected = opts.work_order.state_fingerprint;
  const current = opts.current.workflowStep.preconditionFingerprint;
  if (
    current.task_id !== expected.task_id ||
    current.task_revision !== expected.task_revision ||
    current.worktree !== expected.worktree ||
    current.components.task.digest !== expected.components.task.digest ||
    current.components.backend_projection.digest !==
      expected.components.backend_projection.digest ||
    current.components.provider.digest !== expected.components.provider.digest
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External-agent implementation result is stale against current task authority.",
    });
  }
  if (opts.current_head !== opts.exchange.baseline.head) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "External agent changed Git history; Agentplane must own the implementation commit.",
    });
  }
  const resolvesDirtyWorktree = opts.exchange.purpose === "task_worktree_resolution";
  const baseline = new Set(opts.exchange.baseline.changed_paths);
  const baselinePaths = new Set(
    opts.exchange.baseline.changed_paths.map((line) => pathFromStatusLine(line)),
  );
  for (const line of baseline) {
    if (!resolvesDirtyWorktree && !opts.current_status_lines.includes(line)) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "A pre-existing repository change moved during the external-agent episode.",
      });
    }
  }
  const changed = opts.current_status_lines
    .filter((line) => resolvesDirtyWorktree || !baseline.has(line))
    .map((line) => pathFromStatusLine(line))
    .filter(Boolean)
    .toSorted();
  const allowed = opts.work_order.authority.writable_roots
    .map((entry) => authorityPath(entry, opts.exchange.checkout))
    .filter((entry): entry is string => entry !== null);
  const taskPrefix = `.agentplane/tasks/${opts.exchange.task_id}/`;
  const reportPath = externalReportResultPath(opts);
  const forbidden = changed.filter((entry) => {
    const taskArtifact = entry.startsWith(taskPrefix);
    const baselineTaskArtifact = taskArtifact && resolvesDirtyWorktree && baselinePaths.has(entry);
    if (baselineTaskArtifact) return false;
    return (taskArtifact && entry !== reportPath) || !pathAllowed(entry, allowed);
  });
  if (forbidden.length > 0) {
    throw new CliError({
      code: "E_VALIDATION",
      message: `External-agent changes escaped semantic authority: ${forbidden.join(", ")}.`,
    });
  }
  if (changed.length === 0 && !resolvesDirtyWorktree && opts.require_changes) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Completed implementation result produced no supervisor-observed workspace change.",
    });
  }
  return changed;
}

export async function applyExternalReadOnlyWorktreeObservation(opts: {
  command: CommandContext;
  exchange: ExternalAgentExchange;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  await cmdTaskComment({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    author: "SUPERVISOR",
    body:
      `Read-only worktree observation (${opts.envelope.result.status}): ` +
      opts.envelope.result.summary,
    quiet: true,
  });
  const status = await readDirectRepositoryStatus(opts.exchange.checkout);
  if (!hasChangedTaskArtifacts(status?.lines ?? [], opts.exchange.task_id)) return;
  const exitCode = await cmdCommit({
    ctx: opts.command,
    cwd: opts.exchange.checkout,
    taskId: opts.exchange.task_id,
    message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record worktree observation`,
    close: false,
    allow: [],
    autoAllow: false,
    allowTasks: true,
    allowBase: false,
    allowPolicy: false,
    allowConfig: false,
    allowHooks: false,
    allowCI: false,
    requireClean: false,
    quiet: true,
    closeUnstageOthers: false,
    closeCheckOnly: false,
  });
  if (exitCode !== 0) throw new Error(`External worktree observation commit exited ${exitCode}.`);
}

export function blockingImplementationAuthorityViolations(violations: readonly string[]): string[] {
  return violations.filter((violation) => !violation.startsWith("verification:"));
}

function assertScopeExtensionBlockerPreservedBaseline(opts: {
  exchange: ExternalAgentExchange;
  current_head: string | null;
  current_status_lines: readonly string[];
}): void {
  if (opts.current_head !== opts.exchange.baseline.head) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Scope-extension blocker changed Git history after the episode was issued.",
    });
  }
  const issued = [...opts.exchange.baseline.changed_paths].toSorted();
  const current = [...opts.current_status_lines].toSorted();
  if (issued.length !== current.length || issued.some((line, index) => line !== current[index])) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Scope-extension blocker changed the workspace after the episode was issued.",
    });
  }
}

export function implementationCommitAllowsCi(
  contract: TaskRouteDecision["task"]["execution_contract"],
  validatedPaths: readonly string[],
  workspacePaths: readonly string[],
): boolean {
  const ciPaths = workspacePaths.filter((entry) => pathAllowed(entry, CI_PATH_PREFIXES));
  return (
    contract?.authority.allowed_repository_effects.includes("ci") === true &&
    ciPaths.length > 0 &&
    ciPaths.every((entry) => validatedPaths.includes(entry))
  );
}

export async function applyExternalImplementationResult(opts: {
  command: CommandContext;
  decision: TaskRouteDecision;
  exchange: ExternalAgentExchange;
  work_order: AgentWorkOrderV2;
  envelope: ExternalAgentResultEnvelope;
}): Promise<void> {
  let semantic = opts.envelope.result;
  if (semantic.status !== "completed") {
    if (semantic.status === "blocked" && opts.decision.workflowMode === "branch_pr") {
      const alreadyRecorded = await isExternalBlockedResultRecorded({
        command: opts.command,
        exchange: opts.exchange,
        semantic,
      });
      if (!alreadyRecorded) {
        const [head, status] = await Promise.all([
          readDirectTaskHead(opts.exchange.checkout),
          readDirectRepositoryStatus(opts.exchange.checkout),
        ]);
        if (semantic.blocker?.scope_extension_request) {
          assertScopeExtensionBlockerPreservedBaseline({
            exchange: opts.exchange,
            current_head: head,
            current_status_lines: status?.lines ?? [],
          });
        } else {
          const changed = assertExternalImplementationReturnState({
            exchange: opts.exchange,
            work_order: opts.work_order,
            current: opts.decision,
            current_head: head,
            current_status_lines: status?.lines ?? [],
            require_changes: false,
          });
          if (changed.length > 0) {
            throw new CliError({
              code: "E_VALIDATION",
              message:
                "Blocked implementation result produced workspace changes; restore them or return a completed implementation result.",
            });
          }
        }
      }
      await recordExternalBlockedResult({
        command: opts.command,
        exchange: opts.exchange,
        semantic,
      });
      return;
    }
    await cmdTaskComment({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      author: "SUPERVISOR",
      body: `External ${opts.exchange.role} returned ${semantic.status}: ${semantic.summary}`,
      quiet: true,
    });
    return;
  }
  const [head, status] = await Promise.all([
    readDirectTaskHead(opts.exchange.checkout),
    readDirectRepositoryStatus(opts.exchange.checkout),
  ]);
  const conflictContext = resolveConflictReworkSemanticInput({
    task_id: opts.work_order.task.id,
    checkout: opts.exchange.checkout,
    head: opts.work_order.state_fingerprint.git_head,
    writable_roots: opts.work_order.authority.writable_roots,
    required_inputs: opts.work_order.required_inputs,
  });
  if (await recoverExternalConflictEvidence(opts, conflictContext, head, status)) return;
  const recoveredVerification = conflictContext
    ? await recoverExternalVerificationCheckpoint(opts)
    : null;
  if (recoveredVerification) {
    await finishExternalImplementationVerification({
      ...opts,
      semantic,
      task: recoveredVerification.task,
      verification: recoveredVerification.verification,
      conflict: true,
    });
    return;
  }
  const taskAtReturn = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  const admittedAggregate = taskCentricAggregateFromExtensions(taskAtReturn.extensions);
  if (
    admittedAggregate?.current_plan &&
    !opts.work_order.task.work_item_id &&
    admittedAggregate.current_plan.proposal.work_items.work_items.some(
      (item) => !item.optional && admittedAggregate.work_items[item.id]?.state !== "COMPLETED",
    )
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "A WorkItem result requires the explicit WorkItem ID from its issued work order.",
    });
  }
  let implementationCommit =
    !conflictContext && recoversRecordedImplementationCommit(opts.exchange.purpose)
      ? opts.decision.task.commit
      : null;
  let reusedRecordedImplementation = false;
  let recoveredExecutionBase: string | null = null;
  let observedChangedPaths: string[] | null = null;
  if (head === opts.exchange.baseline.head) {
    implementationCommit = null;
    observedChangedPaths = assertExternalImplementationReturnState({
      exchange: opts.exchange,
      work_order: opts.work_order,
      current: opts.decision,
      current_head: head,
      current_status_lines: status?.lines ?? [],
      require_changes: false,
    });
  }
  // Implementation replay can follow a supervisor task-artifact commit before verification.
  if (
    !conflictContext &&
    (observedChangedPaths?.length === 0 ||
      ((recoversRecordedImplementationCommit(opts.exchange.purpose) ||
        opts.exchange.purpose === "implementation_rework") &&
        head !== opts.exchange.baseline.head))
  ) {
    const recovery = await resolveRecordedImplementationRecovery({
      purpose: semantic.plan_refinement ? undefined : opts.exchange.purpose,
      command: opts.command,
      task: taskAtReturn,
      work_order: opts.work_order,
      head,
      recorded_commit: recordedTaskImplementationCommitSha(taskAtReturn),
      // The current packet passed authority checks against an unchanged source baseline.
      reassess_current_plan:
        head === opts.exchange.baseline.head && observedChangedPaths?.length === 0,
    });
    if (recovery) {
      implementationCommit = recovery.commit;
      recoveredExecutionBase = recovery.execution_base;
      if (recovery.semantic?.work_order_id === opts.work_order.work_order_id) {
        semantic = recovery.semantic;
      }
      reusedRecordedImplementation = true;
    }
  }
  if (conflictContext && head && head !== opts.exchange.baseline.head) {
    implementationCommit = head;
  } else if (conflictContext && head && observedChangedPaths?.length === 0) {
    implementationCommit = head;
  } else if (implementationCommit) {
    if (!recoveredExecutionBase) {
      await assertRecoverableImplementationCommit({
        cwd: opts.exchange.checkout,
        baseline: opts.exchange.baseline.head,
        commit: implementationCommit,
        task_id: opts.exchange.task_id,
      });
    }
  } else if (head !== opts.exchange.baseline.head && head) {
    await assertRecoverableImplementationCommit({
      cwd: opts.exchange.checkout,
      baseline: opts.exchange.baseline.head,
      commit: head,
      task_id: opts.exchange.task_id,
    });
    implementationCommit = head;
  } else {
    observedChangedPaths = assertExternalImplementationReturnState({
      exchange: opts.exchange,
      work_order: opts.work_order,
      current: opts.decision,
      current_head: head,
      current_status_lines: status?.lines ?? [],
      require_changes: false,
    });
    implementationCommit = conflictContext
      ? null
      : await resolveVerifiedEvidenceOnlyReworkCommit({
          command: opts.command,
          exchange: opts.exchange,
          work_order: opts.work_order,
          task: taskAtReturn,
          route_commit: opts.decision.task.commit,
          head,
          changed_paths: observedChangedPaths,
        });
    if (implementationCommit) {
      reusedRecordedImplementation = true;
      await assertRecoverableImplementationCommit({
        cwd: opts.exchange.checkout,
        baseline: opts.exchange.baseline.head,
        commit: implementationCommit,
        task_id: opts.exchange.task_id,
      });
    } else {
      observedChangedPaths = await materializeExternalReportResult({
        ...opts,
        changed_paths: observedChangedPaths,
      });
      if (observedChangedPaths.length === 0) {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            "Completed implementation result produced no supervisor-observed workspace change.",
        });
      }
      if (conflictContext && opts.exchange.result_digest) {
        await commitConflictResolutionSnapshot({
          command: opts.command,
          cwd: opts.exchange.checkout,
          task_id: opts.exchange.task_id,
          result_digest: opts.exchange.result_digest,
          changed_paths: observedChangedPaths,
        });
      } else {
        const exitCode = await cmdCommit({
          ctx: opts.command,
          cwd: opts.exchange.checkout,
          taskId: opts.exchange.task_id,
          message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: apply external agent result`,
          close: false,
          allow: observedChangedPaths,
          autoAllow: false,
          allowTasks: true,
          allowBase: false,
          allowPolicy: false,
          allowConfig: false,
          allowHooks: false,
          allowCI: implementationCommitAllowsCi(
            taskAtReturn.execution_contract,
            observedChangedPaths,
            status?.lines.map(pathFromStatusLine) ?? [],
          ),
          requireClean: false,
          quiet: true,
          closeUnstageOthers: false,
          closeCheckOnly: false,
        });
        if (exitCode !== 0)
          throw new Error(`External-agent implementation commit exited ${exitCode}.`);
      }
    }
  }
  if (conflictContext)
    implementationCommit = await applyExternalConflictResolution(opts, conflictContext);
  const executionContext = taskAtReturn.extensions?.task_execution_context as
    | { base_sha?: unknown }
    | undefined;
  const recordedExecutionBase =
    recoveredExecutionBase ??
    (typeof executionContext?.base_sha === "string" ? executionContext.base_sha.trim() : null);
  if (reusedRecordedImplementation && !recordedExecutionBase) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Evidence-only implementation rework is missing its recorded execution base.",
    });
  }
  const recoveredEvidence = await refreshRecoveredImplementationEvidence({
    command: opts.command,
    exchange: opts.exchange,
    execution_base: recoveredExecutionBase,
    commit: implementationCommit,
    preserve_recorded_evidence: reusedRecordedImplementation,
  });
  const implementation = recoveredEvidence
    ? { status: "ready" as const, evidence: recoveredEvidence }
    : await prepareDirectImplementationEvidence({
        command: opts.command,
        cwd: opts.exchange.checkout,
        task_id: opts.exchange.task_id,
        execution_base_commit: conflictContext
          ? conflictContext.local.base_head_sha
          : reusedRecordedImplementation
            ? recordedExecutionBase
            : opts.exchange.baseline.head,
        execution_baseline_status: {
          command: "git status --short --untracked-files=all",
          lines: opts.exchange.baseline.changed_paths,
        },
        observed_base_commit: conflictContext
          ? (opts.exchange.baseline.head ?? undefined)
          : undefined,
        allowed_paths: [
          ...opts.work_order.authority.writable_roots,
          `.agentplane/tasks/${opts.exchange.task_id}`,
        ],
        observed_changed_paths: observedChangedPaths,
      });
  if (implementation.status !== "ready") {
    throw new CliError({ code: "E_VALIDATION", message: implementation.reason });
  }
  const workItemId = opts.work_order.task.work_item_id ?? null;
  const taskCentric = taskCentricAggregateFromExtensions(taskAtReturn.extensions);
  const workItemIsRequired = Boolean(
    workItemId &&
    taskCentric?.current_plan?.proposal.work_items.work_items.some(
      (item) => item.id === workItemId && !item.optional,
    ),
  );
  const reopenDone = requiresImplementationReworkReopen({
    purpose: opts.exchange.purpose,
    task_status: opts.decision.task.status,
    work_item_id: workItemId,
    work_item_is_required: workItemIsRequired,
  });
  if (opts.decision.task.commit !== implementation.evidence.implementation_commit) {
    await cmdTaskSetStatus({
      ctx: opts.command,
      cwd: opts.exchange.checkout,
      taskId: opts.exchange.task_id,
      status: "DOING",
      author: "SUPERVISOR",
      body:
        `Implementation committed: ${implementation.evidence.implementation_commit.slice(0, 12)}. ` +
        "CLI accepted one state-bound external-agent semantic result.",
      commit: implementation.evidence.implementation_commit,
      force: reopenDone,
      yes: reopenDone,
      commitFromComment: false,
      commitAllow: [],
      commitAutoAllow: false,
      commitAllowTasks: true,
      commitRequireClean: false,
      confirmStatusCommit: false,
      quiet: true,
    });
  }
  const currentTask = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  const execution = await resolveTaskExecutionContext({
    ctx: opts.command,
    tasks: [currentTask],
    primaryTaskId: currentTask.id,
  });
  const reconciliation = await recordObservedTaskExecutionContract({
    command: opts.command,
    execution,
    task: currentTask,
    changed_paths: implementation.evidence.changed_paths,
    preserved_commit: implementation.evidence.implementation_commit,
  });
  const authorityViolations = blockingImplementationAuthorityViolations(
    reconciliation.episodeAuthorityViolations,
  );
  if (authorityViolations.length > 0 && !reconciliation.escalated) {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Supervisor-observed changes exceeded the execution contract authority: " +
        authorityViolations.join(", "),
    });
  }
  // Conflict verification and replay are bound to the two-parent merge HEAD.
  // Its checkpoint owner persists artifacts after verification.
  if (opts.decision.workflowMode === "branch_pr" && !conflictContext) {
    const status = await readDirectRepositoryStatus(opts.exchange.checkout);
    if (hasChangedTaskArtifacts(status?.lines ?? [], opts.exchange.task_id)) {
      // Keep the implementation SHA in its evidence; commit only the supervisor's
      // task artifacts so declared checks can require a clean repository.
      await commitBranchSupervisorTaskArtifacts({
        command: opts.command,
        cwd: opts.exchange.checkout,
        task_id: opts.exchange.task_id,
        message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record implementation before verification`,
      });
    }
  }
  const verification = await recordDirectTaskVerification({
    command: opts.command,
    checkout: opts.exchange.checkout,
    task: reconciliation.task,
    work_order: opts.work_order,
    workflow: opts.decision.workflowMode === "branch_pr" ? "branch_pr" : "direct",
    beforePersist: conflictContext
      ? (mutation, checks) =>
          prepareExternalVerificationCheckpoint({
            ...opts,
            mutation,
            verification: checks,
            expected_task: reconciliation.task,
          })
      : undefined,
    afterPersist: conflictContext ? () => completeExternalVerificationCheckpoint(opts) : undefined,
  });
  await finishExternalImplementationVerification({
    ...opts,
    semantic,
    task: taskAtReturn,
    verification,
    conflict: conflictContext !== null,
  });
}
