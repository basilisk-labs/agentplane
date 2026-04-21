---
id: "202604211313-G34KY8"
title: "Add hotspot warning threshold at 400 LoC"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "architecture"
  - "ci"
  - "tooling"
verify:
  - "bun run hotspots:check"
  - "node scripts/hotspot-report.mjs --check --oversized-lines 600"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:47.657Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-04-21T13:13:45.636Z"
doc_updated_by: "PLANNER"
description: "Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI."
sections:
  Summary: |-
    Add hotspot warning threshold at 400 LoC
    
    Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.
  Scope: |-
    - In scope: Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.
    - Out of scope: unrelated refactors not required for "Add hotspot warning threshold at 400 LoC".
  Plan: "Scope: expose medium-sized files before they become hard failures. Steps: 1. Add a warning threshold option/default around 400 LoC. 2. Print warning inventory separately from error inventory. 3. Keep current error behavior at 600. 4. Update docs or help output. Acceptance: current check passes, warning list is visible, and files over 600 still fail."
  Verify Steps: |-
    1. Review the requested outcome for "Add hotspot warning threshold at 400 LoC". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Add hotspot warning threshold at 400 LoC

Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.

## Scope

- In scope: Extend hotspot reporting with a two-level threshold: warning at 400 LoC and error at 600 LoC, without making existing warnings fail CI.
- Out of scope: unrelated refactors not required for "Add hotspot warning threshold at 400 LoC".

## Plan

Scope: expose medium-sized files before they become hard failures. Steps: 1. Add a warning threshold option/default around 400 LoC. 2. Print warning inventory separately from error inventory. 3. Keep current error behavior at 600. 4. Update docs or help output. Acceptance: current check passes, warning list is visible, and files over 600 still fail.

## Verify Steps

1. Review the requested outcome for "Add hotspot warning threshold at 400 LoC". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
