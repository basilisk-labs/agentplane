---
id: "202603120833-7Z9X0K"
title: "Fix allow-tasks coverage for active task artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:34:01.828Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fix allow-tasks so policy and allowlist checks cover the active task README and the task export snapshot without requiring duplicate explicit prefixes."
events:
  -
    type: "status"
    at: "2026-03-12T08:34:13.187Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix allow-tasks so policy and allowlist checks cover the active task README and the task export snapshot without requiring duplicate explicit prefixes."
doc_version: 3
doc_updated_at: "2026-03-12T08:34:13.187Z"
doc_updated_by: "CODER"
description: "Make --allow-tasks cover the active task README and task export artifact without requiring a duplicate explicit --allow prefix."
id_source: "generated"
---
## Summary

Fix allow-tasks coverage for active task artifacts

Make --allow-tasks cover the active task README and task export artifact without requiring a duplicate explicit --allow prefix.

## Scope

- In scope: Make --allow-tasks cover the active task README and task export artifact without requiring a duplicate explicit --allow prefix.
- Out of scope: unrelated refactors not required for "Fix allow-tasks coverage for active task artifacts".

## Plan

1. Implement the change for "Fix allow-tasks coverage for active task artifacts".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

- Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000
- Expected: --allow-tasks covers .agentplane/tasks.json and the active task README, but does not silently allow unrelated task directories.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
