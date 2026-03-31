---
id: "202603301857-N7JJQM"
title: "Move `task next` to the shared pipeline"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202603301857-32E1F0"
tags:
  - "code"
  - "refactor"
  - "cli"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Scope already satisfied by integrated task 202603301857-32E1F0 (merge 4da2e8abb6da); task remains only as backlog bookkeeping.
events:
  -
    type: "status"
    at: "2026-03-31T10:10:18.260Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.
      
      Note: Scope already satisfied by integrated task 202603301857-32E1F0 (merge 4da2e8abb6da); task remains only as backlog bookkeeping.
doc_version: 3
doc_updated_at: "2026-03-31T10:10:18.263Z"
doc_updated_by: "ORCHESTRATOR"
description: "Implement Epic 3 / R3.4 from REFACTOR.md. ready-task selection is layered on top of the shared query result instead of repeating the full filter stack."
sections:
  Summary: |-
    Move `task next` to the shared pipeline
    
    Implement Epic 3 / R3.4 from REFACTOR.md. ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.
  Scope: |-
    - In scope: Implement Epic 3 / R3.4 from REFACTOR.md. ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.
    - Out of scope: unrelated refactors not required for "Move `task next` to the shared pipeline".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/next.ts` to isolate the exact behavior gap for R3.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/commands/task/next.ts`. Expected: the behavior described by R3.4 is observable and stable.
    2. Inspect the final diff for 202603301857-N7JJQM. Expected: scope stays limited to `packages/agentplane/src/commands/task/next.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Move `task next` to the shared pipeline

Implement Epic 3 / R3.4 from REFACTOR.md. ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.

## Scope

- In scope: Implement Epic 3 / R3.4 from REFACTOR.md. ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.
- Out of scope: unrelated refactors not required for "Move `task next` to the shared pipeline".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/next.ts` to isolate the exact behavior gap for R3.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/commands/task/next.ts`. Expected: the behavior described by R3.4 is observable and stable.
2. Inspect the final diff for 202603301857-N7JJQM. Expected: scope stays limited to `packages/agentplane/src/commands/task/next.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: ready-task selection is layered on top of the shared query result instead of repeating the full filter stack.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
