import {
  EXECUTION_GRANT_EXTENSION_KEY,
  executionGrantFromExtensions,
  rebaseExecutionGrantScope,
  type TaskRepositoryEffect,
} from "@agentplaneorg/core/tasks";

import type { TaskData } from "../../backends/task-backend.js";
import { mapBackendError } from "../../cli/error-map.js";
import { createCliEmitter, emitCommandResult } from "../../cli/output.js";
import { CliError } from "../../shared/errors.js";
import {
  reconcileTaskExecutionContract,
  resolveTaskExecutionContract,
} from "../../runtime/task-routing/index.js";
import { cmdCommit } from "../guard/impl/commit.js";
import { commitRefreshedTaskArtifacts } from "../guard/impl/commit-refresh.js";
import { refreshBranchPrArtifactsAfterTaskCommit } from "../shared/post-commit-pr-artifacts.js";
import { buildTaskRouteDecision } from "../shared/route-decision.js";
import { workflowAuthorityStateScopeDigest } from "../shared/side-effect-authority.js";
import {
  applyApprovedTaskScopeExtension,
  normalizeTaskScopeRoot,
  parseTaskScopeExtensionRequestState,
  scopeExtensionReceiptForState,
} from "../shared/task-scope-extension-request.js";
import { loadCommandContext, type CommandContext } from "../shared/task-backend.js";

const output = createCliEmitter();

function uniqueSorted<T extends string>(values: readonly T[]): T[] {
  return [...new Set(values)].toSorted();
}

export function extendBlockedTaskExecutionContract(opts: {
  command: CommandContext;
  task: NonNullable<Awaited<ReturnType<CommandContext["taskBackend"]["getTask"]>>>;
  scope_roots: readonly string[];
  repository_effects: readonly TaskRepositoryEffect[];
  request_digest: string;
  by: string;
}) {
  const current = opts.task.execution_contract;
  if (!current) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope cannot be extended without a persisted execution contract.",
    });
  }
  if (opts.task.status !== "BLOCKED") {
    throw new CliError({
      code: "E_VALIDATION",
      message:
        "Task execution scope can be extended only after a recorded BLOCKED semantic result.",
    });
  }
  const pending = parseTaskScopeExtensionRequestState(opts.task);
  if (pending?.status !== "pending") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope extension requires one valid pending structured request.",
    });
  }
  if (pending.request_digest !== opts.request_digest) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope extension request digest does not match the pending blocker.",
    });
  }
  if (
    !(opts.task.comments ?? []).some(
      (comment) =>
        comment.author === "SUPERVISOR" &&
        comment.body.includes(scopeExtensionReceiptForState(pending)),
    )
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope extension requires a recorded external-agent blocker receipt.",
    });
  }
  if (opts.by !== "USER") {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope extension requires explicit --by USER authority.",
    });
  }

  const addedRoots = uniqueSorted(opts.scope_roots.map((root) => normalizeTaskScopeRoot(root)));
  const addedEffects = uniqueSorted(opts.repository_effects);
  if (
    JSON.stringify(addedRoots) !== JSON.stringify(pending.request.scope_roots) ||
    JSON.stringify(addedEffects) !== JSON.stringify(pending.request.repository_effects)
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope extension must exactly match the pending structured request.",
    });
  }
  const scopeRoots = uniqueSorted([...current.declaration.scope_roots, ...addedRoots]);
  const repositoryEffects = uniqueSorted([
    ...current.declaration.repository_effects,
    ...opts.repository_effects,
  ]);
  if (
    scopeRoots.length === current.declaration.scope_roots.length &&
    repositoryEffects.length === current.declaration.repository_effects.length
  ) {
    throw new CliError({
      code: "E_VALIDATION",
      message: "Task execution scope extension must add a new scope root or repository effect.",
    });
  }
  const extensionSummary = [
    addedRoots.length > 0 ? `roots=${uniqueSorted(addedRoots).join(",")}` : null,
    addedEffects.length > 0 ? `repository_effects=${addedEffects.join(",")}` : null,
  ]
    .filter((value): value is string => value !== null)
    .join("; ");
  const declaration = {
    ...current.declaration,
    scope_roots: scopeRoots,
    repository_effects: repositoryEffects,
    rationale: uniqueSorted([
      ...current.declaration.rationale,
      `USER-approved blocked-result scope extension: ${extensionSummary}`,
    ]),
  };
  const fresh = resolveTaskExecutionContract({
    config: opts.command.config,
    task: opts.task,
    requestedMode: opts.task.execution_route?.requested_mode,
    declaration,
  });
  return reconcileTaskExecutionContract({
    contract: fresh,
    changed_paths: current.observed.changed_paths,
    observed_external_effects: current.observed.external_effects,
  }).contract;
}

export function taskWithRebasedExecutionGrant(opts: {
  task: TaskData;
  execution_contract: NonNullable<TaskData["execution_contract"]>;
}) {
  const executionGrant = executionGrantFromExtensions(opts.task.extensions);
  if (!executionGrant) return opts.task;
  return {
    ...opts.task,
    extensions: {
      ...(opts.task.extensions ?? {}),
      [EXECUTION_GRANT_EXTENSION_KEY]: rebaseExecutionGrantScope({
        grant: executionGrant,
        previous_execution_contract: opts.task.execution_contract!,
        next_execution_contract: opts.execution_contract,
      }),
    },
  };
}

export async function cmdTaskScopeExtend(opts: {
  ctx: CommandContext;
  cwd: string;
  taskId: string;
  scopeRoots: string[];
  repositoryEffects: TaskRepositoryEffect[];
  requestDigest: string;
  stateFingerprint?: string;
  stateScopeDigest?: string;
  by: string;
  quiet?: boolean;
}): Promise<number> {
  try {
    const routeCommand = opts.ctx;
    const decision = await buildTaskRouteDecision({
      ctx: routeCommand,
      cwd: opts.cwd,
      includeRemote: false,
      rootOverride: null,
      taskId: opts.taskId,
    });
    const currentStateScopeDigest = workflowAuthorityStateScopeDigest(
      decision.workflowStep.preconditionFingerprint,
      "task.scope.extend",
    );
    const stale = opts.stateScopeDigest
      ? currentStateScopeDigest !== opts.stateScopeDigest
      : decision.workflowStep.preconditionFingerprint.digest !== opts.stateFingerprint;
    if (stale) {
      throw new CliError({
        code: "E_VALIDATION",
        message:
          "Task execution scope extension is stale; recompute task next-action and use its exact state scope.",
      });
    }
    const checkout = decision.oracle.authoritativeCheckoutPath;
    if (!checkout) {
      throw new CliError({
        code: "E_VALIDATION",
        message: "Task execution scope extension requires an authoritative task checkout.",
      });
    }
    const command = await loadCommandContext({
      cwd: checkout,
      rootOverride: checkout,
      config: routeCommand.config,
      preparationTrace: routeCommand.preparationTrace,
    });
    const task = await command.taskBackend.getTask(opts.taskId);
    if (!task) {
      throw new CliError({
        code: "E_USAGE",
        message: `Unknown task id: ${opts.taskId}`,
      });
    }
    const executionContract = extendBlockedTaskExecutionContract({
      command,
      task,
      scope_roots: opts.scopeRoots,
      repository_effects: opts.repositoryEffects,
      request_digest: opts.requestDigest,
      by: opts.by,
    });
    const pending = parseTaskScopeExtensionRequestState(task);
    if (pending?.status !== "pending") {
      throw new CliError({
        code: "E_VALIDATION",
        message: "Task execution scope extension pending request disappeared before persistence.",
      });
    }
    const now = new Date().toISOString();
    const taskWithRebasedGrant = taskWithRebasedExecutionGrant({
      task,
      execution_contract: executionContract,
    });
    await command.taskBackend.writeTask(
      applyApprovedTaskScopeExtension({
        task: taskWithRebasedGrant,
        executionContract,
        pending,
        scopeRoots: opts.scopeRoots,
        repositoryEffects: opts.repositoryEffects,
        by: opts.by,
        now,
      }),
      task.revision ? { expectedRevision: task.revision } : undefined,
    );

    const subject = `🚧 ${opts.taskId.split("-").at(-1) ?? opts.taskId} task: extend approved execution scope`;
    const exitCode = await cmdCommit({
      ctx: command,
      cwd: checkout,
      taskId: opts.taskId,
      message: subject,
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
    if (exitCode !== 0) throw new Error(`Task scope extension commit exited ${exitCode}.`);
    await refreshBranchPrArtifactsAfterTaskCommit({
      ctx: command,
      cwd: checkout,
      taskId: opts.taskId,
      quiet: true,
    });
    command.git.invalidateStatus();
    await commitRefreshedTaskArtifacts({
      ctx: command,
      cwd: checkout,
      taskId: opts.taskId,
      sourceMessage: subject,
      quiet: true,
    });

    if (!opts.quiet) {
      emitCommandResult(output, {
        kind: "success",
        action: "task execution scope extended",
        target: opts.taskId,
        details: `roots=${opts.scopeRoots.join(",")} state_scope=${opts.stateScopeDigest ?? opts.stateFingerprint}`,
      });
    }
    return 0;
  } catch (error) {
    if (error instanceof CliError) throw error;
    throw mapBackendError(error, { command: "task scope extend", task_id: opts.taskId });
  }
}
