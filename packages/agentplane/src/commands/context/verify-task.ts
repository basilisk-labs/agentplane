import { CliError } from "../../shared/errors.js";
import {
  loadCommandContext,
  loadTaskFromContext,
  type CommandContext,
} from "../shared/task-backend.js";
import { isRecord, toPosix } from "./context-utils.js";
import path from "node:path";

type ContextExtension = {
  assimilation?: {
    propose_capabilities?: boolean;
    update_capabilities?: boolean;
    allow_raw_mutation?: boolean;
  };
  allowed_outputs?: string[];
  forbidden_outputs?: string[];
};

type ContextRunnerEvidence = {
  changed_paths?: string[];
  changed_capabilities?: string[];
  changed_graph_nodes?: string[];
  changed_facts?: string[];
};

type TaskRunner = {
  evidence?: ContextRunnerEvidence;
};

type VerificationInput = {
  task_kind?: string;
  mutation_scope?: string;
  blueprint_request?: string;
  id: string;
  owner?: string;
  status?: string;
  extensions?: Record<string, unknown>;
  runner?: TaskRunner;
};

const DEFAULT_ALLOWED = [
  "context/wiki/",
  ".agentplane/context/derived/facts/facts.jsonl",
  ".agentplane/context/derived/graph/entities.jsonl",
  ".agentplane/context/derived/graph/edges.jsonl",
  ".agentplane/context/derived/graph/provenance_edges.jsonl",
  ".agentplane/context/derived/capabilities/capabilities.jsonl",
  ".agentplane/context/derived/reports/assimilation-events.jsonl",
  ".agentplane/tasks/${taskId}/README.md",
  ".agentplane/tasks/${taskId}/acr.json",
];

const DEFAULT_FORBIDDEN = ["context/raw/", "context/raw/private/", ".agentplane/context/service/"];

function normalizePath(path: string): string {
  return toPosix(path).replace(/^\/+/, "");
}

function normalizeChangedPath(projectRoot: string, value: string): string {
  const resolved = path.resolve(value);
  const root = path.resolve(projectRoot);
  if (resolved === root) return "";
  if (resolved.startsWith(`${root}${path.sep}`)) {
    return normalizePath(path.relative(root, resolved));
  }
  return normalizePath(value);
}

function hasPathPrefix(target: string, prefix: string): boolean {
  return target === prefix || target.startsWith(`${prefix}/`);
}

function isTaskPathMatch(path: string, patterns: string[], taskId: string): boolean {
  return patterns.some((pattern) => {
    const resolved = pattern.replaceAll("${taskId}", taskId);
    if (resolved.includes("*")) {
      const asPrefix = resolved.replaceAll("*", "");
      return hasPathPrefix(path, asPrefix);
    }
    if (resolved.endsWith("/")) return hasPathPrefix(path, resolved);
    return path === resolved || path.startsWith(`${resolved}/`);
  });
}

function readContextExtensions(task: VerificationInput): ContextExtension {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const rawContext = extensions["agentplane.context"];
  return isRecord(rawContext) ? (rawContext as ContextExtension) : {};
}

function readAllowed(context: ContextExtension, taskId: string): string[] {
  const extras = Array.isArray(context.allowed_outputs)
    ? context.allowed_outputs.filter(Boolean)
    : [];
  return [
    ...DEFAULT_ALLOWED.map((value) => value.replaceAll("${taskId}", taskId)),
    ...extras.map((value) => String(value)),
  ];
}

function readForbidden(context: ContextExtension): string[] {
  return [
    ...DEFAULT_FORBIDDEN,
    ...(Array.isArray(context.forbidden_outputs) ? context.forbidden_outputs : []),
  ].map(String);
}

function readChangedPaths(task: VerificationInput): string[] {
  const evidence = task.runner?.evidence;
  if (!isRecord(evidence)) return [];
  const changed = evidence.changed_paths;
  return Array.isArray(changed)
    ? changed.filter((path) => typeof path === "string" && path.trim())
    : [];
}

function isRawMutationAllowed(context: ContextExtension): boolean {
  return context.assimilation?.allow_raw_mutation === true;
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
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} is not a context task (found ${task.task_kind ?? "unknown"})`,
    });
  }
  if (task.mutation_scope !== "context") {
    throw new CliError({
      exitCode: 3,
      code: "E_VALIDATION",
      message: `Task ${opts.parsed.taskId} has invalid mutation scope: ${task.mutation_scope ?? "unknown"}`,
    });
  }
  if (task.blueprint_request !== "context.assimilation") {
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
    .map(normalizePath)
    .filter(Boolean);
  const normalizedTaskId = task.id;
  const normalizedTaskOwner = task.owner ?? "unknown";
  const requiredSourceRoots =
    Array.isArray(context.allowed_outputs) && context.allowed_outputs.length > 0
      ? context.allowed_outputs.map((value) => String(value))
      : [];

  if (changedPaths.length > 0) {
    const denied: string[] = [];
    for (const changed of changedPaths) {
      if (changed.startsWith(".agentplane/context/service/")) {
        denied.push(`${changed}: forbidden service mutation`);
        continue;
      }

      if (hasPathPrefix(changed, "context/raw/")) {
        if (!isRawMutationAllowed(context)) {
          denied.push(`${changed}: raw mutation is forbidden`);
        }
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
        !requiredSourceRoots.some((prefix) =>
          hasPathPrefix(changed, prefix.replace("${taskId}", normalizedTaskId)),
        )
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

  process.stdout.write(
    `context verify-task ${opts.parsed.taskId}: ok (${normalizedTaskOwner} / ${task.status ?? "unknown"})\n`,
  );
  return 0;
}
