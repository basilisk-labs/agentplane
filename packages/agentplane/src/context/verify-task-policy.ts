import path from "node:path";

import { isRecord } from "../shared/guards.js";
import { toPosix } from "./context-utils.js";

export type ContextExtension = {
  assimilation?: {
    propose_capabilities?: boolean;
    update_capabilities?: boolean;
    allow_raw_mutation?: boolean;
  };
  task_type?: string;
  mode?: string;
  source_set?: {
    files?: { path?: unknown; sha256?: unknown }[];
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

export type VerificationInput = {
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
  ".agentplane/context/derived/reports/coverage.jsonl",
  ".agentplane/tasks/${taskId}/README.md",
  ".agentplane/tasks/${taskId}/acr.json",
];

export const DEFAULT_FORBIDDEN = [
  "context/raw/",
  ".agentplane/cache.sqlite",
  ".agentplane/context/service/",
];

export function normalizePath(path: string): string {
  return toPosix(path).replace(/^\/+/, "");
}

export function normalizeChangedPath(projectRoot: string, value: string): string {
  const resolved = path.resolve(value);
  const root = path.resolve(projectRoot);
  if (resolved === root) return "";
  if (resolved.startsWith(`${root}${path.sep}`)) {
    return normalizePath(path.relative(root, resolved));
  }
  return normalizePath(value);
}

export function hasPathPrefix(target: string, prefix: string): boolean {
  const normalizedPrefix = prefix.replace(/\/+$/u, "");
  return target === normalizedPrefix || target.startsWith(`${normalizedPrefix}/`);
}

export function isTaskPathMatch(path: string, patterns: string[], taskId: string): boolean {
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

export function readContextExtensions(task: VerificationInput): ContextExtension {
  const extensions = isRecord(task.extensions) ? task.extensions : {};
  const rawContext = extensions["agentplane.context"];
  return isRecord(rawContext) ? (rawContext as ContextExtension) : {};
}

export function readAllowed(context: ContextExtension, taskId: string): string[] {
  const extras = Array.isArray(context.allowed_outputs)
    ? context.allowed_outputs.filter(Boolean)
    : [];
  return [
    ...DEFAULT_ALLOWED.map((value) => value.replaceAll("${taskId}", taskId)),
    ...extras.map(String),
  ];
}

export function readForbidden(context: ContextExtension): string[] {
  return [
    ...DEFAULT_FORBIDDEN,
    ...(Array.isArray(context.forbidden_outputs) ? context.forbidden_outputs : []),
  ].map(String);
}

export function readChangedPaths(task: VerificationInput): string[] {
  const evidence = task.runner?.evidence;
  if (!isRecord(evidence)) return [];
  const changed = evidence.changed_paths;
  return Array.isArray(changed)
    ? changed.filter((path) => typeof path === "string" && path.trim())
    : [];
}

export function isRawMutationAllowed(context: ContextExtension): boolean {
  return context.assimilation?.allow_raw_mutation === true;
}

export function isProfileSwitchContextTask(context: ContextExtension): boolean {
  return (
    context.task_type === "context_profile_switch" || context.task_type === "context_configuration"
  );
}

export function isMaximumAssimilationTask(
  task: VerificationInput,
  context: ContextExtension,
): boolean {
  return (
    task.blueprint_request === "context.maximum_assimilation" ||
    context.mode === "maximum_assimilation"
  );
}
