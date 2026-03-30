---
id: "202603301857-7Y9FHM"
title: "Move `task search` to the shared pipeline"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-03-30T18:57:05.500Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 3 / R3.3 from REFACTOR.md. search-specific matching is the only command-local part left in the module."
sections:
  Summary: |-
    Move `task search` to the shared pipeline
    
    Implement Epic 3 / R3.3 from REFACTOR.md. search-specific matching is the only command-local part left in the module.
  Scope: |-
    - In scope: Implement Epic 3 / R3.3 from REFACTOR.md. search-specific matching is the only command-local part left in the module.
    - Out of scope: unrelated refactors not required for "Move `task search` to the shared pipeline".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/search.ts` to isolate the exact behavior gap for R3.3.
    2. Implement the smallest change set that satisfies the REFACTOR contract: search-specific matching is the only command-local part left in the module.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/commands/task/search.ts`. Expected: the behavior described by R3.3 is observable and stable.
    2. Inspect the final diff for 202603301857-7Y9FHM. Expected: scope stays limited to `packages/agentplane/src/commands/task/search.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: search-specific matching is the only command-local part left in the module.
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

Move `task search` to the shared pipeline

Implement Epic 3 / R3.3 from REFACTOR.md. search-specific matching is the only command-local part left in the module.

## Scope

- In scope: Implement Epic 3 / R3.3 from REFACTOR.md. search-specific matching is the only command-local part left in the module.
- Out of scope: unrelated refactors not required for "Move `task search` to the shared pipeline".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/commands/task/search.ts` to isolate the exact behavior gap for R3.3.
2. Implement the smallest change set that satisfies the REFACTOR contract: search-specific matching is the only command-local part left in the module.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/commands/task/search.ts`. Expected: the behavior described by R3.3 is observable and stable.
2. Inspect the final diff for 202603301857-7Y9FHM. Expected: scope stays limited to `packages/agentplane/src/commands/task/search.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: search-specific matching is the only command-local part left in the module.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
