---
id: "202603120833-7Z9X0K"
title: "Fix allow-tasks coverage for active task artifacts"
result_summary: "allow-tasks now covers tasks_path plus the active task subtree without requiring a duplicate explicit allow prefix"
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T08:43:05.004Z"
  updated_by: "CODER"
  note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000"
commit:
  hash: "7ad047a65edaf868e581b84b9fc95fcf98a675c0"
  message: "✨ 7Z9X0K guard: cover active task artifacts via allow-tasks"
comments:
  -
    author: "CODER"
    body: "Start: fix allow-tasks so policy and allowlist checks cover the active task README and the task export snapshot without requiring duplicate explicit prefixes."
  -
    author: "CODER"
    body: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000"
events:
  -
    type: "status"
    at: "2026-03-12T08:34:13.187Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fix allow-tasks so policy and allowlist checks cover the active task README and the task export snapshot without requiring duplicate explicit prefixes."
  -
    type: "verify"
    at: "2026-03-12T08:43:05.004Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000"
  -
    type: "status"
    at: "2026-03-12T08:43:10.633Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000"
doc_version: 3
doc_updated_at: "2026-03-12T08:43:10.633Z"
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
#### 2026-03-12T08:43:05.004Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/cli/run-cli.core.guard.test.ts packages/agentplane/src/commands/guard/impl/allow.test.ts packages/agentplane/src/policy/evaluate.test.ts --hookTimeout 60000 --testTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:34:13.187Z, excerpt_hash=sha256:0160c40b94ef2a7fb0a918999d78f1edf2e40d668690979dd247dd4da93e296e

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
