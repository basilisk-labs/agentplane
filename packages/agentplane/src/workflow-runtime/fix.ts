import { parseWorkflowMarkdown, serializeWorkflowMarkdown } from "./markdown.js";
import type { WorkflowDiagnostic, WorkflowFrontMatter } from "./types.js";

type WorkflowFixResult = {
  changed: boolean;
  text: string;
  diagnostics: WorkflowDiagnostic[];
};

const DEFAULT_FRONT_MATTER: WorkflowFrontMatter = {
  version: 1,
  mode: "direct",
  owners: { orchestrator: "ORCHESTRATOR" },
  approvals: {
    require_plan: true,
    require_verify: true,
    require_network: true,
  },
  retry_policy: {
    normal_exit_continuation: true,
    abnormal_backoff: "exponential",
    max_attempts: 5,
  },
  timeouts: {
    stall_seconds: 900,
  },
  in_scope_paths: ["packages/**"],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function withDefaults(raw: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...raw };

  if (typeof out.version !== "number" || !Number.isInteger(out.version) || out.version < 1) {
    out.version = 1;
  }

  if (out.mode !== "direct" && out.mode !== "branch_pr") {
    out.mode = DEFAULT_FRONT_MATTER.mode;
  }

  const owners = isRecord(out.owners) ? { ...out.owners } : {};
  if (typeof owners.orchestrator !== "string" || owners.orchestrator.trim().length === 0) {
    owners.orchestrator = DEFAULT_FRONT_MATTER.owners.orchestrator;
  }
  out.owners = owners;

  const approvals = isRecord(out.approvals) ? { ...out.approvals } : {};
  for (const key of ["require_plan", "require_verify", "require_network"] as const) {
    if (typeof approvals[key] !== "boolean") approvals[key] = DEFAULT_FRONT_MATTER.approvals[key];
  }
  out.approvals = approvals;

  const retryPolicy = isRecord(out.retry_policy) ? { ...out.retry_policy } : {};
  if (typeof retryPolicy.normal_exit_continuation !== "boolean") {
    retryPolicy.normal_exit_continuation =
      DEFAULT_FRONT_MATTER.retry_policy.normal_exit_continuation;
  }
  if (retryPolicy.abnormal_backoff !== "exponential") {
    retryPolicy.abnormal_backoff = DEFAULT_FRONT_MATTER.retry_policy.abnormal_backoff;
  }
  if (
    typeof retryPolicy.max_attempts !== "number" ||
    !Number.isInteger(retryPolicy.max_attempts) ||
    retryPolicy.max_attempts < 1
  ) {
    retryPolicy.max_attempts = DEFAULT_FRONT_MATTER.retry_policy.max_attempts;
  }
  out.retry_policy = retryPolicy;

  const timeouts = isRecord(out.timeouts) ? { ...out.timeouts } : {};
  if (
    typeof timeouts.stall_seconds !== "number" ||
    !Number.isInteger(timeouts.stall_seconds) ||
    timeouts.stall_seconds < 1
  ) {
    timeouts.stall_seconds = DEFAULT_FRONT_MATTER.timeouts.stall_seconds;
  }
  out.timeouts = timeouts;

  const inScope = Array.isArray(out.in_scope_paths)
    ? out.in_scope_paths.filter((v) => typeof v === "string" && v.trim().length > 0)
    : [];
  out.in_scope_paths = inScope.length > 0 ? inScope : DEFAULT_FRONT_MATTER.in_scope_paths;

  return out;
}

export function safeAutofixWorkflowText(text: string): WorkflowFixResult {
  const parsed = parseWorkflowMarkdown(text);
  const diagnostics: WorkflowDiagnostic[] = [];
  const unknownKeyDiagnostics = Object.keys(parsed.document.frontMatterRaw)
    .filter(
      (key) =>
        ![
          "version",
          "mode",
          "owners",
          "approvals",
          "retry_policy",
          "timeouts",
          "in_scope_paths",
        ].includes(key),
    )
    .map<WorkflowDiagnostic>((key) => ({
      code: "WF_FIX_SKIPPED_UNSAFE",
      severity: "WARN",
      path: `front_matter.${key}`,
      message: `Unsafe autofix skipped for unknown key: ${key}`,
    }));

  diagnostics.push(...unknownKeyDiagnostics);

  if (unknownKeyDiagnostics.length > 0) {
    return { changed: false, text, diagnostics };
  }

  const nextFrontMatter = withDefaults(parsed.document.frontMatterRaw);
  const sections = {
    ...parsed.document.sections,
    "Prompt Template": parsed.document.sections["Prompt Template"] ?? "",
    Checks: parsed.document.sections.Checks ?? "- preflight\n- verify\n- finish",
    Fallback:
      parsed.document.sections.Fallback ??
      "last_known_good: .agentplane/workflows/last-known-good.md",
  };

  const nextText = serializeWorkflowMarkdown(nextFrontMatter, sections);
  return {
    changed: nextText !== text,
    text: nextText,
    diagnostics,
  };
}
