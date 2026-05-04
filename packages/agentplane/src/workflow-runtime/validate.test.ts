import { describe, expect, it } from "vitest";

import { parseWorkflowMarkdown } from "./markdown.js";
import { validateWorkflowDocument } from "./validate.js";
import { renderWorkflowDiagnostic } from "./validation-helpers.js";

describe("workflow-runtime/validate", () => {
  it("accepts canonical WORKFLOW v2 front matter", () => {
    const parsed = parseWorkflowMarkdown(`---
version: 2
workflow:
  mode: direct
  status_commit_policy: warn
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
tasks:
  backend:
    config_path: .agentplane/backends/local/backend.json
runner:
  default_adapter: codex
scheduler:
  concurrency: 1
  retry_policy:
    normal_exit_continuation: true
    abnormal_backoff: exponential
    max_attempts: 5
evaluator:
  verdicts:
    - pass
observability:
  runs_dir: .agentplane/runs
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
Hi

## Checks
- preflight

## Fallback
last_known_good: .agentplane/workflows/last-known-good.md
`);

    const result = validateWorkflowDocument(parsed.document, {
      repoRoot: "/tmp/repo",
      knownAgentIds: new Set(["ORCHESTRATOR"]),
      config: {
        workflow_mode: "direct",
        agents: { approvals: { require_plan: true, require_verify: true, require_network: true } },
      } as never,
    });

    expect(result.ok).toBe(true);
  });

  it("reports unknown keys and missing required fields", () => {
    const parsed = parseWorkflowMarkdown(`---
version: "1"
mode: fast
owners: {}
approvals:
  require_plan: "yes"
extra: true
---

## Prompt Template
Hi

## Checks
- preflight

## Fallback
x
`);

    const result = validateWorkflowDocument(parsed.document, {
      repoRoot: "/tmp/repo",
      knownAgentIds: new Set(["ORCHESTRATOR"]),
    });

    expect(result.ok).toBe(false);
    expect(result.diagnostics.some((d) => d.code === "WF_SCHEMA_UNKNOWN_KEY")).toBe(true);
    expect(result.diagnostics.some((d) => d.code === "WF_SCHEMA_TYPE")).toBe(true);
    expect(result.diagnostics.some((d) => d.code === "WF_SCHEMA_ENUM")).toBe(true);
    const typeDiagnostic = result.diagnostics.find((d) => d.code === "WF_SCHEMA_TYPE");
    expect(typeDiagnostic?.remediation).toMatchObject({
      code: "WF_SCHEMA_TYPE",
      safeCommand: "agentplane doctor",
    });
    expect(renderWorkflowDiagnostic(typeDiagnostic!)).toContain("Stop condition:");
  });
});
