---
id: "202603301857-F0343K"
title: "Replace process-wide stdout/stderr monkey-patching with a structured output collector"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301856-CKA7KC"
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
doc_updated_at: "2026-03-30T18:57:14.229Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics."
sections:
  Summary: |-
    Replace process-wide stdout/stderr monkey-patching with a structured output collector
    
    Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.
  Scope: |-
    - In scope: Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.
    - Out of scope: unrelated refactors not required for "Replace process-wide stdout/stderr monkey-patching with a structured output collector".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts to isolate the exact behavior gap for R6.2.
    2. Implement the smallest change set that satisfies the REFACTOR contract: JSON mode no longer relies on global write interception, while preserving current output semantics.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts. Expected: the behavior described by R6.2 is observable and stable.
    2. Inspect the final diff for 202603301857-F0343K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: JSON mode no longer relies on global write interception, while preserving current output semantics.
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

Replace process-wide stdout/stderr monkey-patching with a structured output collector

Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.

## Scope

- In scope: Implement Epic 6 / R6.2 from REFACTOR.md. JSON mode no longer relies on global write interception, while preserving current output semantics.
- Out of scope: unrelated refactors not required for "Replace process-wide stdout/stderr monkey-patching with a structured output collector".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts to isolate the exact behavior gap for R6.2.
2. Implement the smallest change set that satisfies the REFACTOR contract: JSON mode no longer relies on global write interception, while preserving current output semantics.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts. Expected: the behavior described by R6.2 is observable and stable.
2. Inspect the final diff for 202603301857-F0343K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/globals.ts` and command output contracts plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: JSON mode no longer relies on global write interception, while preserving current output semantics.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
