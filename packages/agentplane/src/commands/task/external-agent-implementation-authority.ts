import path from "node:path";

import type { AgentSemanticResult, AgentWorkOrderV2 } from "@agentplaneorg/core/schemas";
import { taskCentricAggregateFromExtensions } from "@agentplaneorg/core/tasks";

import { CliError } from "../../shared/errors.js";
import { cmdCommit } from "../guard/impl/commit.js";
import { commitBranchSupervisorTaskArtifacts } from "./branch-task-supervisor-artifact-commit.js";
import type { TaskRouteDecision } from "../shared/route-decision-types.js";
import type { CommandContext } from "../shared/task-backend.js";

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
import {
  isTaskLevelVerificationReworkState,
  recordDirectTaskVerification,
} from "./direct-task-verification.js";
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
import { loadTaskFromContext } from "../shared/task-backend.js";
import { resolveTaskExecutionContext } from "../../runtime/task-execution-context/index.js";
import {
  recordTaskCentricExternalResult,
  type TaskCentricExternalResultProjection,
} from "./task-centric-external-result.js";

function pathFromStatusLine(line: string): string {
  const raw = line.length >= 4 ? line.slice(3).trim() : "";
  const renamed = raw.includes(" -> ") ? (raw.split(" -> ").at(-1) ?? raw) : raw;
  return renamed.replaceAll("\\", "/");
}

function authorityPath(value: string, cwd: string): string | null {
  const relative = path.relative(cwd, path.resolve(cwd, value)).replaceAll("\\", "/");
  if (relative === "") return ".";
  if (relative === ".." || relative.startsWith("../") || path.posix.isAbsolute(relative)) {
    return null;
  }
  return relative.replace(/\/$/u, "");
}

function pathAllowed(value: string, allowed: readonly string[]): boolean {
  return allowed.some((root) => root === "." || value === root || value.startsWith(`${root}/`));
}

function hasChangedTaskArtifacts(statusLines: readonly string[], taskId: string): boolean {
  const prefix = `.agentplane/tasks/${taskId}/`;
  return statusLines.some((line) => pathFromStatusLine(line).startsWith(prefix));
}

function isTaskLevelVerificationRework(opts: {
  task: Awaited<ReturnType<typeof loadTaskFromContext>>;
  work_order: AgentWorkOrderV2;
  semantic: AgentSemanticResult;
}): boolean {
  const aggregate = taskCentricAggregateFromExtensions(opts.task.extensions);
  return isTaskLevelVerificationReworkState({
    work_item_id: opts.work_order.task.work_item_id ?? null,
    has_plan_refinement: Boolean(opts.semantic.plan_refinement),
    task_verification_state: opts.task.verification?.state,
    has_current_plan: Boolean(aggregate?.current_plan),
    all_required_work_items_completed:
      aggregate?.current_plan?.proposal.work_items.work_items
        .filter((item) => !item.optional)
        .every((item) => aggregate.work_items[item.id]?.state === "COMPLETED") ?? false,
  });
}

function assertExternalImplementationReturnState(opts: {
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
  const forbidden = changed.filter((entry) => {
    const taskArtifact = entry.startsWith(taskPrefix);
    const baselineTaskArtifact = taskArtifact && resolvesDirtyWorktree && baselinePaths.has(entry);
    if (baselineTaskArtifact) return false;
    return taskArtifact || !pathAllowed(entry, allowed);
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
  const taskAtReturn = await loadTaskFromContext({
    ctx: opts.command,
    taskId: opts.exchange.task_id,
  });
  let implementationCommit = recoversRecordedImplementationCommit(opts.exchange.purpose)
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
    if (observedChangedPaths.length === 0) {
      const recovery = await resolveRecordedImplementationRecovery({
        purpose: semantic.plan_refinement ? undefined : opts.exchange.purpose,
        command: opts.command,
        task: taskAtReturn,
        work_order: opts.work_order,
        head,
        recorded_commit: recordedTaskImplementationCommitSha(taskAtReturn),
      });
      if (recovery) {
        implementationCommit = recovery.commit;
        recoveredExecutionBase = recovery.execution_base;
        semantic = recovery.semantic ?? semantic;
        reusedRecordedImplementation = true;
      }
    }
  }
  if (implementationCommit) {
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
    implementationCommit = await resolveVerifiedEvidenceOnlyReworkCommit({
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
      if (observedChangedPaths.length === 0) {
        throw new CliError({
          code: "E_VALIDATION",
          message:
            "Completed implementation result produced no supervisor-observed workspace change.",
        });
      }
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
        allowCI: false,
        requireClean: false,
        quiet: true,
        closeUnstageOthers: false,
        closeCheckOnly: false,
      });
      if (exitCode !== 0)
        throw new Error(`External-agent implementation commit exited ${exitCode}.`);
    }
  }
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
        execution_base_commit: reusedRecordedImplementation
          ? recordedExecutionBase
          : opts.exchange.baseline.head,
        execution_baseline_status: {
          command: "git status --short --untracked-files=all",
          lines: opts.exchange.baseline.changed_paths,
        },
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
  if (opts.decision.workflowMode === "branch_pr") {
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
  });
  const postVerificationHead = await readDirectTaskHead(opts.exchange.checkout);
  const postVerificationStatus = await readDirectRepositoryStatus(opts.exchange.checkout);
  const canonicalProjection: TaskCentricExternalResultProjection | null =
    isTaskLevelVerificationRework({
      task: reconciliation.task,
      work_order: opts.work_order,
      semantic,
    })
      ? null
      : await recordTaskCentricExternalResult({
          command: opts.command,
          work_order: opts.work_order,
          semantic,
          verification,
          head: postVerificationHead,
          dirty_paths: (postVerificationStatus?.lines ?? [])
            .map((line) => pathFromStatusLine(line))
            .filter(Boolean),
        });
  if (verification.status !== "passed") {
    if (canonicalProjection?.state !== "legacy_task") return;
    throw new CliError({
      code: "E_VALIDATION",
      message: verification.reason ?? "Declared implementation verification did not pass.",
    });
  }
  if (canonicalProjection?.state === "work_item_rework") return;
  if (opts.decision.workflowMode === "branch_pr") {
    opts.command.git.invalidateStatus();
    const currentStatus = await readDirectRepositoryStatus(opts.exchange.checkout);
    if (!hasChangedTaskArtifacts(currentStatus?.lines ?? [], opts.exchange.task_id)) return;
    await commitBranchSupervisorTaskArtifacts({
      command: opts.command,
      cwd: opts.exchange.checkout,
      task_id: opts.exchange.task_id,
      message: `🚧 ${opts.exchange.task_id.split("-").at(-1)} task: record external implementation evidence`,
    });
  }
}
