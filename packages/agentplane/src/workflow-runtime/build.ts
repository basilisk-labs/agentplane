import { parseWorkflowMarkdown, serializeWorkflowMarkdown } from "./markdown.js";
import { emitWorkflowEvent } from "./observability.js";
import { renderTemplateStrict, validateTemplateStrict } from "./template.js";
import type { WorkflowBuildInput, WorkflowBuildOutput, WorkflowDiagnostic } from "./types.js";
import { validateWorkflowDocument } from "./validate.js";

function mergeRecord(
  baseValue: Record<string, unknown>,
  overrideValue: Record<string, unknown>,
): Record<string, unknown> {
  const out: Record<string, unknown> = { ...baseValue };
  for (const [key, value] of Object.entries(overrideValue)) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      out[key] &&
      typeof out[key] === "object" &&
      !Array.isArray(out[key])
    ) {
      out[key] = mergeRecord(out[key] as Record<string, unknown>, value as Record<string, unknown>);
      continue;
    }
    out[key] = value;
  }
  return out;
}

function mergeSections(
  baseSections: Record<string, string>,
  overrideSections: Record<string, string>,
): Record<string, string> {
  const out: Record<string, string> = { ...baseSections };
  for (const [key, value] of Object.entries(overrideSections)) {
    if (value.trim().length === 0) continue;
    out[key] = value;
  }
  return out;
}

export function buildWorkflowFromTemplates(input: WorkflowBuildInput): WorkflowBuildOutput {
  emitWorkflowEvent({ event: "workflow_build_started" });
  const diagnostics: WorkflowDiagnostic[] = [];

  const base = parseWorkflowMarkdown(input.baseTemplate);
  diagnostics.push(...base.diagnostics);

  const override = input.projectOverrideTemplate
    ? parseWorkflowMarkdown(input.projectOverrideTemplate)
    : null;
  if (override) diagnostics.push(...override.diagnostics);

  const mergedFrontMatter = mergeRecord(
    base.document.frontMatterRaw,
    override?.document.frontMatterRaw ?? {},
  );
  const runtimeWorkflow = input.runtimeContext.workflow;
  if (runtimeWorkflow && typeof runtimeWorkflow === "object" && !Array.isArray(runtimeWorkflow)) {
    const runtimeWorkflowRecord = runtimeWorkflow as Record<string, unknown>;
    const runtimeMode = runtimeWorkflowRecord.mode;
    if (runtimeMode === "direct" || runtimeMode === "branch_pr") {
      const workflowSection =
        mergedFrontMatter.workflow &&
        typeof mergedFrontMatter.workflow === "object" &&
        !Array.isArray(mergedFrontMatter.workflow)
          ? (mergedFrontMatter.workflow as Record<string, unknown>)
          : {};
      mergedFrontMatter.workflow = { ...workflowSection, mode: runtimeMode };
      delete mergedFrontMatter.mode;
    }
    const runtimeApprovals = runtimeWorkflowRecord.approvals;
    if (
      runtimeApprovals &&
      typeof runtimeApprovals === "object" &&
      !Array.isArray(runtimeApprovals)
    ) {
      const approvalsRecord = runtimeApprovals as Record<string, unknown>;
      mergedFrontMatter.approvals = {
        require_plan: approvalsRecord.require_plan === true,
        require_verify: approvalsRecord.require_verify === true,
        require_network: approvalsRecord.require_network === true,
      };
    }
  }
  const mergedSections = mergeSections(base.document.sections, override?.document.sections ?? {});

  const promptTemplate = mergedSections["Prompt Template"] ?? "";
  const strict = validateTemplateStrict(promptTemplate, input.runtimeContext, {
    strictVariables: true,
    strictFilters: true,
  });
  diagnostics.push(...strict.diagnostics);

  const renderedPrompt = renderTemplateStrict(promptTemplate, input.runtimeContext, {
    strictVariables: true,
    strictFilters: true,
  });
  diagnostics.push(...renderedPrompt.diagnostics);
  mergedSections["Prompt Template"] = renderedPrompt.text;

  const renderedText = serializeWorkflowMarkdown(mergedFrontMatter, mergedSections);
  const parsedRendered = parseWorkflowMarkdown(renderedText);
  diagnostics.push(...parsedRendered.diagnostics);
  const schema = validateWorkflowDocument(parsedRendered.document);
  diagnostics.push(...schema.diagnostics);

  const hasError = diagnostics.some((d) => d.severity === "ERROR");
  if (hasError) {
    emitWorkflowEvent({
      event: "workflow_build_failed",
      details: { diagnostics: diagnostics.length },
    });
  } else {
    emitWorkflowEvent({
      event: "workflow_build_completed",
      details: { diagnostics: diagnostics.length },
    });
  }

  return {
    text: renderedText,
    diagnostics,
  };
}

export const DEFAULT_WORKFLOW_TEMPLATE = `---
version: 2
workflow:
  mode: direct
  status_commit_policy: warn
  commit_automation: manual
  finish_auto_status_commit: false
  close_commit:
    direct_dirty_policy: allow_other_task_readmes
  artifacts_language: any
  closure_commit_requires_approval: false
owners:
  orchestrator: ORCHESTRATOR
approvals:
  require_plan: true
  require_verify: true
  require_network: true
workspace:
  agents_dir: .agentplane/agents
  tasks_path: .agentplane/tasks.json
  workflow_dir: .agentplane/tasks
  worktrees_dir: .agentplane/worktrees
  isolation: per_task
  cleanup: after_finish
tasks:
  backend:
    config_path: .agentplane/backends/local/backend.json
runner:
  default_adapter: codex
scheduler:
  concurrency: 1
  poll_interval_ms: 30000
  retry_policy:
    normal_exit_continuation: true
    abnormal_backoff: exponential
    max_attempts: 5
evaluator:
  verdicts:
    - pass
    - rework
    - blocked_external
    - human_review
    - infra_failed
    - no_change
  max_rework_attempts: 3
  required_checks:
    - agentplane doctor
    - node .agentplane/policy/check-routing.mjs
observability:
  runs_dir: .agentplane/tasks/<task-id>/runs
  events: jsonl
retry_policy:
  normal_exit_continuation: true
  abnormal_backoff: exponential
  max_attempts: 5
timeouts:
  stall_seconds: 900
in_scope_paths:
  - "**"
---

## Prompt Template
Repository: {{ runtime.repo_name }}
Workflow mode: {{ workflow.mode }}

## Checks
- preflight
- verify
- finish

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
`;
