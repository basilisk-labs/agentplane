---
id: "202603301856-HVS36K"
title: "Define the canonical command-graph data model"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202603301721-9ZMFDY"
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
doc_updated_at: "2026-03-30T18:56:56.813Z"
doc_updated_by: "PLANNER"
description: "Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth."
sections:
  Summary: |-
    Define the canonical command-graph data model
    
    Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
  Scope: |-
    - In scope: Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
    - Out of scope: unrelated refactors not required for "Define the canonical command-graph data model".
  Plan: |-
    1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata to isolate the exact behavior gap for R1.1.
    2. Implement the smallest change set that satisfies the REFACTOR contract: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
    3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.
  Verify Steps: |-
    1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata. Expected: the behavior described by R1.1 is observable and stable.
    2. Inspect the final diff for 202603301856-HVS36K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata plus incidental tests/docs required by the task.
    3. Re-run the focused checks after final edits. Expected: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
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

Define the canonical command-graph data model

Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.

## Scope

- In scope: Implement Epic 1 / R1.1 from REFACTOR.md. one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
- Out of scope: unrelated refactors not required for "Define the canonical command-graph data model".

## Plan

1. Audit the current implementation and tests around `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata to isolate the exact behavior gap for R1.1.
2. Implement the smallest change set that satisfies the REFACTOR contract: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.
3. Run focused verification, capture the evidence in the task README, and keep any residual follow-up scope outside this task.

## Verify Steps

1. Run a focused verification slice covering `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata. Expected: the behavior described by R1.1 is observable and stable.
2. Inspect the final diff for 202603301856-HVS36K. Expected: scope stays limited to `packages/agentplane/src/cli/run-cli/command-catalog.ts`, related command metadata plus incidental tests/docs required by the task.
3. Re-run the focused checks after final edits. Expected: one internal structure can answer longest-prefix match, command lookup, and direct-child lookup from the same source of truth.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
