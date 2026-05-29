import { CliError } from "../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../commands/shared/task-backend.js";
import { validateContextArtifacts } from "./verify-task-artifacts.js";
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
  readForbidden,
  type VerificationInput,
} from "./verify-task-policy.js";

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
  const context = readContextExtensions(normalizedTask);
  const allowed = readAllowed(context, task.id);
  const forbidden = readForbidden(context);
  const changedPaths = readChangedPaths(normalizedTask)
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
        message: `context verify-task failed for ${opts.parsed.taskId}: ${denied.length} mutation policy violation(s)\n- ${denied.join("\n- ")}`,
      });
    }
  } else {
    process.stdout.write(
      `context verify-task ${opts.parsed.taskId}: no changed_paths reported by task evidence\n`,
    );
  }

  const artifactErrors = await validateContextArtifacts({
    root: ctx.resolvedProject.gitRoot,
    task: normalizedTask,
    context,
    changedPaths,
  });
  if (artifactErrors.length > 0) {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `context verify-task failed for ${opts.parsed.taskId}: ${artifactErrors.length} artifact validation issue(s)\n- ${artifactErrors.join("\n- ")}`,
    });
  }

  process.stdout.write(
    `context verify-task ${opts.parsed.taskId}: ok (${normalizedTaskOwner} / ${task.status ?? "unknown"})\n`,
  );
  return 0;
}
