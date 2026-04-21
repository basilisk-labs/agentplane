---
id: "202604211313-RE08PF"
title: "Add oversized test file guard"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "testing"
  - "tooling"
verify:
  - "bun run hotspots:check"
  - "bun run test:project -- cli-unit"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:23.539Z"
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
doc_updated_at: "2026-04-21T13:13:22.992Z"
doc_updated_by: "PLANNER"
description: "Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently."
sections:
  Summary: |-
    Add oversized test file guard
    
    Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.
  Scope: |-
    - In scope: Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.
    - Out of scope: unrelated refactors not required for "Add oversized test file guard".
  Plan: "Scope: establish enforcement before splitting remaining large tests. Steps: 1. Extend hotspot or add a new script to report test file LoC separately. 2. Set initial error threshold at 800 LoC for tests, with explicit allowlist for existing oversized files if needed. 3. Document how to split scenario files. Acceptance: new oversized test files fail the guard; current baseline is explicit and visible."
  Verify Steps: |-
    1. Review the requested outcome for "Add oversized test file guard". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Add oversized test file guard

Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.

## Scope

- In scope: Introduce a test-file size guard with warning or failure threshold so new 1000+ LoC CLI tests cannot appear silently.
- Out of scope: unrelated refactors not required for "Add oversized test file guard".

## Plan

Scope: establish enforcement before splitting remaining large tests. Steps: 1. Extend hotspot or add a new script to report test file LoC separately. 2. Set initial error threshold at 800 LoC for tests, with explicit allowlist for existing oversized files if needed. 3. Document how to split scenario files. Acceptance: new oversized test files fail the guard; current baseline is explicit and visible.

## Verify Steps

1. Review the requested outcome for "Add oversized test file guard". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
