import type { ExecutionReceipt } from "@agentplaneorg/core/schemas";

import { CliError } from "../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../commands/shared/task-backend.js";
import { validateContextArtifacts as validateContextArtifactFiles } from "./verify-task-artifacts.js";
import {
  DEFAULT_FORBIDDEN,
  hasPathPrefix,
  isRawMutationAllowed,
  isTaskPathMatch,
  normalizeChangedPath,
  normalizePath,
  readAllowed,
  readChangedPaths,
  readContextExtensions,
  readExecutionReceiptRef,
  readForbidden,
  hasExecutionReceiptReference,
  type VerificationInput,
} from "./verify-task-policy.js";

function failReceiptValidation(taskId: string, reason: string): never {
  throw new CliError({
    exitCode: 3,
    code: "E_VALIDATION",
    message: `context verify-task failed for ${taskId}: ${reason}`,
  });
}

function rejectUnauthenticatedExecutionReceipt(opts: {
  task: VerificationInput;
}): ExecutionReceipt {
  const taskId = opts.task.id;
  const receiptRef = readExecutionReceiptRef(opts.task);
  if (!receiptRef) {
    if (hasExecutionReceiptReference(opts.task)) {
      failReceiptValidation(
        taskId,
        "receipt integrity failure: malformed execution receipt reference",
      );
    }
    failReceiptValidation(
      taskId,
      "compatibility_unverified: execution receipt is missing; legacy runner evidence cannot establish observed success",
    );
  }
  // A repository-local path and digest are not an authentication channel: a detached same-UID
  // process can rewrite both the receipt and task reference. Keep persisted evidence diagnostic
  // until a trusted supervisor can hand the observation to this verifier directly.
  failReceiptValidation(
    taskId,
    "compatibility_unverified: persisted execution receipt is unauthenticated; durable supervisor authentication is not available",
  );
}

export async function validateContextTaskArtifacts(opts: {
  ctx: CommandContext;
  task: VerificationInput;
  changedPaths: readonly string[];
}): Promise<number> {
  const { ctx, task } = opts;
  const context = readContextExtensions(task);
  const allowed = readAllowed(context, task.id);
  const forbidden = readForbidden(context);
  const changedPaths = opts.changedPaths
    .map((value) => normalizeChangedPath(ctx.resolvedProject.gitRoot, value))
    .map((value) => normalizePath(value))
    .filter(Boolean);
  const normalizedTaskId = task.id;
  const normalizedTaskOwner = task.owner ?? "unknown";
  const requiredSourceRoots =
    Array.isArray(context.allowed_outputs) && context.allowed_outputs.length > 0
      ? context.allowed_outputs.map(String)
      : [];

  if (changedPaths.length > 0) {
    const denied: string[] = [];
    for (const changed of changedPaths) {
      if (
        changed === ".agentplane/cache.sqlite" ||
        changed.startsWith(".agentplane/context/service/")
      ) {
        denied.push(`${changed}: forbidden service mutation`);
        continue;
      }

      if (hasPathPrefix(changed, "context/raw/") && !isRawMutationAllowed(context)) {
        denied.push(`${changed}: raw mutation is forbidden`);
      }

      if (
        !isTaskPathMatch(changed, allowed, normalizedTaskId) &&
        !DEFAULT_FORBIDDEN.some((forbiddenPrefix) => hasPathPrefix(changed, forbiddenPrefix))
      ) {
        denied.push(`${changed}: path outside allowed outputs`);
      }

      for (const forbiddenPrefix of forbidden) {
        if (hasPathPrefix(changed, forbiddenPrefix)) {
          denied.push(`${changed}: matches forbidden output ${forbiddenPrefix}`);
          break;
        }
      }
      if (
        requiredSourceRoots.length > 0 &&
        !isTaskPathMatch(changed, requiredSourceRoots, normalizedTaskId)
      ) {
        denied.push(`${changed}: path outside required context outputs`);
      }
    }
    if (denied.length > 0) {
      throw new CliError({
        exitCode: 3,
        code: "E_VALIDATION",
        message: `context verify-task failed for ${task.id}: ${denied.length} mutation policy violation(s)\n- ${denied.join("\n- ")}`,
      });
    }
  } else {
    process.stdout.write(
      `context verify-task ${task.id}: no changed_paths observed by execution receipt\n`,
    );
  }

  const artifactErrors = await validateContextArtifactFiles({
    root: ctx.resolvedProject.gitRoot,
    task,
    context,
    changedPaths,
  });
  if (artifactErrors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context verify-task failed for ${task.id}: ${artifactErrors.length} artifact validation issue(s)\n- ${artifactErrors.join("\n- ")}`,
    });
  }

  process.stdout.write(
    `context verify-task ${task.id}: ok (${normalizedTaskOwner} / ${task.status ?? "unknown"})\n`,
  );
  return 0;
}

export async function cmdContextVerifyTask(opts: {
  ctx?: CommandContext;
  cwd: string;
  rootOverride?: string;
  parsed: { taskId: string };
}): Promise<number> {
  const ctx =
    opts.ctx ??
    (await loadCommandContext({ cwd: opts.cwd, rootOverride: opts.rootOverride ?? null }));
  const task = await loadTaskFromContext({ ctx, taskId: opts.parsed.taskId });
  if (!task) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task not found: ${opts.parsed.taskId}`,
    });
  }
  if (task.task_kind !== "context") {
    process.stdout.write(
      `context verify-task ${opts.parsed.taskId}: skipped_not_applicable (task_kind=${task.task_kind ?? "unknown"}; expected context)\n`,
    );
    return 0;
  }
  if (task.mutation_scope !== "context") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has invalid mutation scope: ${task.mutation_scope ?? "unknown"}`,
    });
  }
  if (
    task.blueprint_request !== "context.assimilation" &&
    task.blueprint_request !== "context.maximum_assimilation"
  ) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has unexpected blueprint request: ${task.blueprint_request ?? "unknown"}`,
    });
  }

  const normalizedTask = task as VerificationInput;
  const executionReceipt = rejectUnauthenticatedExecutionReceipt({
    task: normalizedTask,
  });
  return await validateContextTaskArtifacts({
    ctx,
    task: normalizedTask,
    changedPaths: readChangedPaths(executionReceipt),
  });
}
