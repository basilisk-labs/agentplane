import path from "node:path";

import {
  UnsupportedWorkflowVersionError,
  safeParseWorkflowFrontMatter,
  type AgentplaneConfig,
} from "@agentplaneorg/core/config";
import type { ZodIssue } from "zod";

import type { WorkflowDiagnostic, WorkflowFrontMatter } from "./types.js";
import { pushDiagnostic } from "./validation-helpers.js";

type WorkflowFrontMatterValidationOptions = {
  repoRoot?: string;
  knownAgentIds?: Set<string>;
  config?: AgentplaneConfig | null;
};

function issuePath(issue: ZodIssue): string {
  return issue.path.length > 0
    ? `front_matter.${issue.path.map(String).join(".")}`
    : "front_matter";
}

function valueAtPath(raw: Record<string, unknown>, issue: ZodIssue): unknown {
  let current: unknown = raw;
  for (const segment of issue.path) {
    if (!current || typeof current !== "object") return undefined;
    if (typeof segment === "symbol") return undefined;
    current = (current as Record<string | number, unknown>)[segment];
  }
  return current;
}

function flattenIssues(issues: readonly ZodIssue[]): ZodIssue[] {
  const flattened: ZodIssue[] = [];
  for (const issue of issues) {
    if (issue.code === "invalid_union" && "errors" in issue) {
      flattened.push(...flattenIssues(issue.errors.flat()));
      continue;
    }
    flattened.push(issue);
  }
  return flattened;
}

function diagnosticCodeForIssue(
  issue: ZodIssue,
  raw: Record<string, unknown>,
): WorkflowDiagnostic["code"] {
  if (issue.code === "unrecognized_keys") return "WF_SCHEMA_UNKNOWN_KEY";
  if (issue.code === "too_small" || issue.code === "too_big") return "WF_SCHEMA_RANGE";
  if (issue.code === "invalid_value") return "WF_SCHEMA_ENUM";
  if (issue.code === "invalid_type" && valueAtPath(raw, issue) === undefined) {
    return "WF_SCHEMA_MISSING";
  }
  return "WF_SCHEMA_TYPE";
}

function pushSchemaDiagnostics(
  diags: WorkflowDiagnostic[],
  raw: Record<string, unknown>,
  issues: readonly ZodIssue[],
): void {
  const seen = new Set<string>();
  for (const issue of flattenIssues(issues)) {
    const code = diagnosticCodeForIssue(issue, raw);
    const issueKeys =
      issue.code === "unrecognized_keys" && "keys" in issue && Array.isArray(issue.keys)
        ? issue.keys
        : [null];
    for (const unknownKey of issueKeys) {
      const basePath = issuePath(issue);
      const diagnosticPath = unknownKey ? `${basePath}.${unknownKey}` : basePath;
      const key = `${code}:${diagnosticPath}:${issue.message}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pushDiagnostic(diags, {
        code,
        severity: "ERROR",
        path: diagnosticPath,
        message: issue.message,
      });
    }
  }
}

function validatePaths(diags: WorkflowDiagnostic[], paths: string[], repoRoot?: string): void {
  if (!repoRoot) return;
  const resolvedRoot = path.resolve(repoRoot);
  const rootPrefix = `${resolvedRoot}${path.sep}`;
  for (const value of paths) {
    const candidate = path.resolve(resolvedRoot, value.replaceAll(/[*]{1,2}$/g, ""));
    if (candidate === resolvedRoot || candidate.startsWith(rootPrefix)) continue;
    pushDiagnostic(diags, {
      code: "WF_PATH_OUTSIDE_ROOT",
      severity: "ERROR",
      path: "front_matter.in_scope_paths",
      message: `Path escapes repository root: ${value}`,
    });
  }
}

function validateOwner(
  diags: WorkflowDiagnostic[],
  owner: string,
  knownAgentIds?: Set<string>,
): void {
  if (!knownAgentIds || knownAgentIds.has(owner)) return;
  pushDiagnostic(diags, {
    code: "WF_OWNER_NOT_FOUND",
    severity: "ERROR",
    path: "front_matter.owners.orchestrator",
    message: `Owner ${owner} was not found in .agentplane/agents/*.json.`,
  });
}

function validateConfigParity(
  diags: WorkflowDiagnostic[],
  frontMatter: WorkflowFrontMatter,
  config?: AgentplaneConfig | null,
): void {
  if (!config) return;
  if (config.workflow_mode !== frontMatter.workflow.mode) {
    pushDiagnostic(diags, {
      code: "WF_POLICY_MISMATCH",
      severity: "ERROR",
      path: "front_matter.workflow.mode",
      message: `workflow mode mismatch: WORKFLOW.md=${frontMatter.workflow.mode}, config=${config.workflow_mode}`,
    });
  }

  const configApprovals = config.agents?.approvals;
  if (!configApprovals) return;
  for (const key of ["require_plan", "require_verify", "require_network"] as const) {
    if (configApprovals[key] === frontMatter.approvals[key]) continue;
    pushDiagnostic(diags, {
      code: "WF_POLICY_MISMATCH",
      severity: "WARN",
      path: `front_matter.approvals.${key}`,
      message: `Approval mismatch with resolved AgentPlane config (${key}).`,
    });
  }
}

export function validateWorkflowFrontMatter(
  diags: WorkflowDiagnostic[],
  raw: Record<string, unknown>,
  opts?: WorkflowFrontMatterValidationOptions,
): WorkflowFrontMatter | undefined {
  const parsed = safeParseWorkflowFrontMatter(raw);
  if (!parsed.success) {
    if (parsed.error instanceof UnsupportedWorkflowVersionError) {
      pushDiagnostic(diags, {
        code: "WF_UNSUPPORTED_VERSION",
        severity: "ERROR",
        path: "front_matter.version",
        message: parsed.error.message,
      });
    } else {
      pushSchemaDiagnostics(diags, raw, parsed.error.issues);
    }
    return undefined;
  }

  validatePaths(diags, parsed.data.in_scope_paths, opts?.repoRoot);
  validateOwner(diags, parsed.data.owners.orchestrator, opts?.knownAgentIds);
  validateConfigParity(diags, parsed.data, opts?.config);
  return parsed.data;
}
