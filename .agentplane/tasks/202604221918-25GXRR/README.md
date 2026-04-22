---
id: "202604221918-25GXRR"
title: "Wire test routing guard into checks"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604221918-HQ0WPR"
tags:
  - "code"
  - "test"
verify:
  - "bun run ci:local:fast"
  - "bun run vitest:projects:check"
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
doc_updated_at: "2026-04-22T19:19:22.579Z"
doc_updated_by: "PLANNER"
description: "Connect the routing guard to existing project and local/release validation scripts so routing drift is caught by normal developer and release flows."
sections:
  Summary: |-
    Wire test routing guard into checks
    
    Connect the routing guard to existing project and local/release validation scripts so routing drift is caught by normal developer and release flows.
  Scope: |-
    - In scope: wire the routing guard into existing developer/release checks.
    - In scope: update package scripts or existing project-check script so normal validation catches routing drift.
    - In scope: preserve existing command names where possible to avoid disrupting docs and release flows.
    - Out of scope: broad release workflow refactors or suite timing work.
  Plan: "Integrate the routing guard into existing validation commands while preserving public command names. The accepted result is that normal project checks now fail on route drift."
  Verify Steps: |-
    1. Run `bun run vitest:projects:check`. Expected: includes routing guard and passes.
    2. Run `bun run ci:local:fast`. Expected: pass.
    3. Inspect package scripts touched by the task. Expected: no obsolete command path remains documented as canonical.
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

Wire test routing guard into checks

Connect the routing guard to existing project and local/release validation scripts so routing drift is caught by normal developer and release flows.

## Scope

- In scope: wire the routing guard into existing developer/release checks.
- In scope: update package scripts or existing project-check script so normal validation catches routing drift.
- In scope: preserve existing command names where possible to avoid disrupting docs and release flows.
- Out of scope: broad release workflow refactors or suite timing work.

## Plan

Integrate the routing guard into existing validation commands while preserving public command names. The accepted result is that normal project checks now fail on route drift.

## Verify Steps

1. Run `bun run vitest:projects:check`. Expected: includes routing guard and passes.
2. Run `bun run ci:local:fast`. Expected: pass.
3. Inspect package scripts touched by the task. Expected: no obsolete command path remains documented as canonical.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
