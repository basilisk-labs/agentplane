---
id: "202603301857-6DJCDV"
title: "Move update-check policy gating behind the real config boundary"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301857-XC7RHS"
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
doc_updated_at: "2026-03-30T18:57:08.404Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path."
sections:
  Summary: |-
    Move update-check policy gating behind the real config boundary
    
    Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
  Scope: |-
    - In scope: Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
    - Out of scope: unrelated refactors not required for "Move update-check policy gating behind the real config boundary".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts` to isolate the exact behavior gap for R4.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`. Expected: the behavior described by R4.2 is observable and stable.
    2. Inspect the final diff for 202603301857-6DJCDV. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
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

Move update-check policy gating behind the real config boundary

Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.

## Scope

- In scope: Implement Epic 4 / R4.2 from REFACTOR.md. update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
- Out of scope: unrelated refactors not required for "Move update-check policy gating behind the real config boundary".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli.ts` to isolate the exact behavior gap for R4.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli.ts`. Expected: the behavior described by R4.2 is observable and stable.
2. Inspect the final diff for 202603301857-6DJCDV. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: update-check still respects `require_network`, but commands that do not otherwise need config do not load it just for the warning path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
