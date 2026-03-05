import path from "node:path";

import type { AgentplaneConfig } from "@agentplaneorg/core";

import type {
  WorkflowDiagnostic,
  WorkflowDocument,
  WorkflowFrontMatter,
  WorkflowValidationResult,
} from "./types.js";
import { diagnosticsToValidationResult } from "./markdown.js";

const ROOT_KEYS = new Set([
  "version",
  "mode",
  "owners",
  "approvals",
  "retry_policy",
  "timeouts",
  "in_scope_paths",
]);

function push(diags: WorkflowDiagnostic[], diagnostic: WorkflowDiagnostic): void {
  diags.push(diagnostic);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function expectBoolean(
  diags: WorkflowDiagnostic[],
  value: unknown,
  pathName: string,
  required: boolean,
): boolean | undefined {
  if (value === undefined) {
    if (required) {
      push(diags, {
        code: "WF_SCHEMA_MISSING",
        severity: "ERROR",
        path: pathName,
        message: `${pathName} is required.`,
      });
    }
    return undefined;
  }
  if (typeof value !== "boolean") {
    push(diags, {
      code: "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be a boolean.`,
    });
    return undefined;
  }
  return value;
}

function expectString(
  diags: WorkflowDiagnostic[],
  value: unknown,
  pathName: string,
  required: boolean,
): string | undefined {
  if (value === undefined) {
    if (required) {
      push(diags, {
        code: "WF_SCHEMA_MISSING",
        severity: "ERROR",
        path: pathName,
        message: `${pathName} is required.`,
      });
    }
    return undefined;
  }
  if (typeof value !== "string") {
    push(diags, {
      code: "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be a string.`,
    });
    return undefined;
  }
  if (value.trim().length === 0) {
    push(diags, {
      code: "WF_SCHEMA_RANGE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be non-empty.`,
    });
    return undefined;
  }
  return value;
}

function expectIntegerInRange(
  diags: WorkflowDiagnostic[],
  value: unknown,
  pathName: string,
  min: number,
  max: number,
  required: boolean,
): number | undefined {
  if (value === undefined) {
    if (required) {
      push(diags, {
        code: "WF_SCHEMA_MISSING",
        severity: "ERROR",
        path: pathName,
        message: `${pathName} is required.`,
      });
    }
    return undefined;
  }
  if (typeof value !== "number" || !Number.isInteger(value)) {
    push(diags, {
      code: "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be an integer.`,
    });
    return undefined;
  }
  if (value < min || value > max) {
    push(diags, {
      code: "WF_SCHEMA_RANGE",
      severity: "ERROR",
      path: pathName,
      message: `${pathName} must be in [${min}, ${max}].`,
    });
    return undefined;
  }
  return value;
}

function validateUnknownKeys(diags: WorkflowDiagnostic[], raw: Record<string, unknown>): void {
  for (const key of Object.keys(raw)) {
    if (!ROOT_KEYS.has(key)) {
      push(diags, {
        code: "WF_SCHEMA_UNKNOWN_KEY",
        severity: "ERROR",
        path: `front_matter.${key}`,
        message: `Unknown front matter key: ${key}`,
      });
    }
  }
}

function validateMode(
  diags: WorkflowDiagnostic[],
  value: unknown,
): "direct" | "branch_pr" | undefined {
  const mode = expectString(diags, value, "front_matter.mode", true);
  if (!mode) return undefined;
  if (mode !== "direct" && mode !== "branch_pr") {
    push(diags, {
      code: "WF_SCHEMA_ENUM",
      severity: "ERROR",
      path: "front_matter.mode",
      message: "front_matter.mode must be one of: direct, branch_pr.",
    });
    return undefined;
  }
  return mode;
}

function validateOwners(
  diags: WorkflowDiagnostic[],
  value: unknown,
  knownAgentIds: Set<string> | null,
): { orchestrator: string } | undefined {
  if (!isRecord(value)) {
    push(diags, {
      code: value === undefined ? "WF_SCHEMA_MISSING" : "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: "front_matter.owners",
      message: "front_matter.owners must be an object.",
    });
    return undefined;
  }
  const orchestrator = expectString(
    diags,
    value.orchestrator,
    "front_matter.owners.orchestrator",
    true,
  );
  if (!orchestrator) return undefined;
  if (knownAgentIds && !knownAgentIds.has(orchestrator)) {
    push(diags, {
      code: "WF_OWNER_NOT_FOUND",
      severity: "ERROR",
      path: "front_matter.owners.orchestrator",
      message: `Owner ${orchestrator} was not found in .agentplane/agents/*.json.`,
    });
  }
  return { orchestrator };
}

function validateApprovals(
  diags: WorkflowDiagnostic[],
  value: unknown,
): WorkflowFrontMatter["approvals"] | undefined {
  if (!isRecord(value)) {
    push(diags, {
      code: value === undefined ? "WF_SCHEMA_MISSING" : "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: "front_matter.approvals",
      message: "front_matter.approvals must be an object.",
    });
    return undefined;
  }
  const require_plan = expectBoolean(
    diags,
    value.require_plan,
    "front_matter.approvals.require_plan",
    true,
  );
  const require_verify = expectBoolean(
    diags,
    value.require_verify,
    "front_matter.approvals.require_verify",
    true,
  );
  const require_network = expectBoolean(
    diags,
    value.require_network,
    "front_matter.approvals.require_network",
    true,
  );
  if (require_plan === undefined || require_verify === undefined || require_network === undefined) {
    return undefined;
  }
  return { require_plan, require_verify, require_network };
}

function validateRetryPolicy(
  diags: WorkflowDiagnostic[],
  value: unknown,
): WorkflowFrontMatter["retry_policy"] | undefined {
  if (!isRecord(value)) {
    push(diags, {
      code: value === undefined ? "WF_SCHEMA_MISSING" : "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: "front_matter.retry_policy",
      message: "front_matter.retry_policy must be an object.",
    });
    return undefined;
  }
  const normal_exit_continuation = expectBoolean(
    diags,
    value.normal_exit_continuation,
    "front_matter.retry_policy.normal_exit_continuation",
    true,
  );
  const abnormal_backoff = expectString(
    diags,
    value.abnormal_backoff,
    "front_matter.retry_policy.abnormal_backoff",
    true,
  );
  if (abnormal_backoff && abnormal_backoff !== "exponential") {
    push(diags, {
      code: "WF_SCHEMA_ENUM",
      severity: "ERROR",
      path: "front_matter.retry_policy.abnormal_backoff",
      message: "front_matter.retry_policy.abnormal_backoff must be exponential.",
    });
  }
  const max_attempts = expectIntegerInRange(
    diags,
    value.max_attempts,
    "front_matter.retry_policy.max_attempts",
    1,
    100,
    true,
  );
  if (normal_exit_continuation === undefined || !abnormal_backoff || max_attempts === undefined) {
    return undefined;
  }
  return {
    normal_exit_continuation,
    abnormal_backoff: "exponential",
    max_attempts,
  };
}

function validateTimeouts(
  diags: WorkflowDiagnostic[],
  value: unknown,
): WorkflowFrontMatter["timeouts"] | undefined {
  if (!isRecord(value)) {
    push(diags, {
      code: value === undefined ? "WF_SCHEMA_MISSING" : "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: "front_matter.timeouts",
      message: "front_matter.timeouts must be an object.",
    });
    return undefined;
  }
  const stall_seconds = expectIntegerInRange(
    diags,
    value.stall_seconds,
    "front_matter.timeouts.stall_seconds",
    1,
    86_400,
    true,
  );
  if (stall_seconds === undefined) return undefined;
  return { stall_seconds };
}

function validateScopePaths(
  diags: WorkflowDiagnostic[],
  value: unknown,
  repoRoot?: string,
): string[] | undefined {
  if (!Array.isArray(value)) {
    push(diags, {
      code: value === undefined ? "WF_SCHEMA_MISSING" : "WF_SCHEMA_TYPE",
      severity: "ERROR",
      path: "front_matter.in_scope_paths",
      message: "front_matter.in_scope_paths must be an array.",
    });
    return undefined;
  }
  const normalized = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item.length > 0);

  if (normalized.length === 0) {
    push(diags, {
      code: "WF_SCHEMA_RANGE",
      severity: "ERROR",
      path: "front_matter.in_scope_paths",
      message: "front_matter.in_scope_paths must contain at least one path.",
    });
    return undefined;
  }

  if (repoRoot) {
    for (const p of normalized) {
      const candidate = path.resolve(repoRoot, p.replaceAll(/[*]{1,2}$/g, ""));
      const rootPrefix = `${path.resolve(repoRoot)}${path.sep}`;
      if (!(candidate === path.resolve(repoRoot) || candidate.startsWith(rootPrefix))) {
        push(diags, {
          code: "WF_PATH_OUTSIDE_ROOT",
          severity: "ERROR",
          path: "front_matter.in_scope_paths",
          message: `Path escapes repository root: ${p}`,
        });
      }
    }
  }

  return normalized;
}

export function validateWorkflowDocument(
  document: WorkflowDocument,
  opts?: {
    repoRoot?: string;
    knownAgentIds?: Set<string>;
    config?: AgentplaneConfig | null;
  },
): WorkflowValidationResult {
  const diags: WorkflowDiagnostic[] = [];
  const raw = document.frontMatterRaw;
  if (!isRecord(raw)) {
    push(diags, {
      code: "WF_FRONTMATTER_NOT_OBJECT",
      severity: "ERROR",
      path: "front_matter",
      message: "Workflow front matter must decode to an object.",
    });
    return diagnosticsToValidationResult(diags);
  }

  validateUnknownKeys(diags, raw);

  const version = expectIntegerInRange(
    diags,
    raw.version,
    "front_matter.version",
    1,
    Number.MAX_SAFE_INTEGER,
    true,
  );
  const mode = validateMode(diags, raw.mode);
  const owners = validateOwners(diags, raw.owners, opts?.knownAgentIds ?? null);
  const approvals = validateApprovals(diags, raw.approvals);
  const retry_policy = validateRetryPolicy(diags, raw.retry_policy);
  const timeouts = validateTimeouts(diags, raw.timeouts);
  const in_scope_paths = validateScopePaths(diags, raw.in_scope_paths, opts?.repoRoot);

  if (opts?.config && mode && opts.config.workflow_mode !== mode) {
    push(diags, {
      code: "WF_POLICY_MISMATCH",
      severity: "ERROR",
      path: "front_matter.mode",
      message: `workflow mode mismatch: WORKFLOW.md=${mode}, config=${opts.config.workflow_mode}`,
    });
  }

  if (opts?.config && approvals) {
    const cfgApprovals = opts.config.agents?.approvals;
    if (cfgApprovals) {
      if (cfgApprovals.require_plan !== approvals.require_plan) {
        push(diags, {
          code: "WF_POLICY_MISMATCH",
          severity: "WARN",
          path: "front_matter.approvals.require_plan",
          message: "Approval mismatch with .agentplane/config.json (require_plan).",
        });
      }
      if (cfgApprovals.require_verify !== approvals.require_verify) {
        push(diags, {
          code: "WF_POLICY_MISMATCH",
          severity: "WARN",
          path: "front_matter.approvals.require_verify",
          message: "Approval mismatch with .agentplane/config.json (require_verify).",
        });
      }
      if (cfgApprovals.require_network !== approvals.require_network) {
        push(diags, {
          code: "WF_POLICY_MISMATCH",
          severity: "WARN",
          path: "front_matter.approvals.require_network",
          message: "Approval mismatch with .agentplane/config.json (require_network).",
        });
      }
    }
  }

  if (
    version !== undefined &&
    mode &&
    owners &&
    approvals &&
    retry_policy &&
    timeouts &&
    in_scope_paths
  ) {
    document.frontMatter = {
      version,
      mode,
      owners,
      approvals,
      retry_policy,
      timeouts,
      in_scope_paths,
    };
  }

  return diagnosticsToValidationResult(diags);
}
