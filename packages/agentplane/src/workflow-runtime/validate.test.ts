import { describe, expect, it } from "vitest";

import { parseWorkflowMarkdown } from "./markdown.js";
import { validateWorkflowDocument } from "./validate.js";

describe("workflow-runtime/validate", () => {
  it("accepts canonical workflow front matter", () => {
    const parsed = parseWorkflowMarkdown(`---
version: 1
mode: direct
owners:
  orchestrator: ORCHESTRATOR
approvals:
  require_plan: true
  require_verify: true
  require_network: true
retry_policy:
  normal_exit_continuation: true
  abnormal_backoff: exponential
  max_attempts: 5
timeouts:
  stall_seconds: 900
in_scope_paths:
  - packages/**
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
  });
});
