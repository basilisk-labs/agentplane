---
id: "202603301856-R676R2"
title: "Preserve lazy handler loading while removing duplicated registry bootstrap work"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-D7EHN2"
  - "202603301856-H78XDH"
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
doc_updated_at: "2026-03-30T18:56:58.971Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice."
sections:
  Summary: |-
    Preserve lazy handler loading while removing duplicated registry bootstrap work
    
    Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
  Scope: |-
    - In scope: Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
    - Out of scope: unrelated refactors not required for "Preserve lazy handler loading while removing duplicated registry bootstrap work".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/registry.run.ts` to isolate the exact behavior gap for R1.4.
    2. Implement the smallest change set that satisfies the REFACTOR contract: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/registry.run.ts`. Expected: the behavior described by R1.4 is observable and stable.
    2. Inspect the final diff for 202603301856-R676R2. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/registry.run.ts` plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
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

Preserve lazy handler loading while removing duplicated registry bootstrap work

Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.

## Scope

- In scope: Implement Epic 1 / R1.4 from REFACTOR.md. handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
- Out of scope: unrelated refactors not required for "Preserve lazy handler loading while removing duplicated registry bootstrap work".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/registry.run.ts` to isolate the exact behavior gap for R1.4.
2. Implement the smallest change set that satisfies the REFACTOR contract: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/registry.run.ts`. Expected: the behavior described by R1.4 is observable and stable.
2. Inspect the final diff for 202603301856-R676R2. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/registry.run.ts` plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: handlers are still loaded lazily, but help/dispatch do not pay avoidable registry setup costs twice.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
