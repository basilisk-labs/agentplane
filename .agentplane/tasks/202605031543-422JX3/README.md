---
id: "202605031543-422JX3"
title: "Auto-bootstrap stale framework CLI for diagnostics"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T15:43:44.566Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T15:56:11.009Z"
  updated_by: "CODER"
  note: "Verified: stale framework CLI diagnostics now auto-bootstrap before rerun; WORKFLOW.md-only bootstrap root detection works; targeted tests, routing, doctor, eslint, and diff check passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement stale framework CLI auto-bootstrap for diagnostic commands and fix WORKFLOW.md-only bootstrap root detection."
events:
  -
    type: "status"
    at: "2026-05-03T15:44:36.854Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement stale framework CLI auto-bootstrap for diagnostic commands and fix WORKFLOW.md-only bootstrap root detection."
  -
    type: "verify"
    at: "2026-05-03T15:56:11.009Z"
    author: "CODER"
    state: "ok"
    note: "Verified: stale framework CLI diagnostics now auto-bootstrap before rerun; WORKFLOW.md-only bootstrap root detection works; targeted tests, routing, doctor, eslint, and diff check passed."
doc_version: 3
doc_updated_at: "2026-05-03T15:56:11.041Z"
doc_updated_by: "CODER"
description: "Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands."
sections:
  Summary: |-
    Auto-bootstrap stale framework CLI for diagnostics
    
    Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands.
  Scope: |-
    - In scope: Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands.
    - Out of scope: unrelated refactors not required for "Auto-bootstrap stale framework CLI for diagnostics".
  Plan: |-
    1. Reproduce current stale-runtime behavior after a manual build and identify the stale-policy entry points.
    2. Update framework CLI bootstrap/root detection so WORKFLOW.md-only repositories are recognized and stale diagnostic commands auto-bootstrap safely.
    3. Add focused tests for WORKFLOW.md root detection and stale diagnostic auto-bootstrap/fail-fast behavior.
    4. Verify with targeted tests, routing check, agentplane doctor, and config/mode smoke checks.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T15:56:11.009Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: stale framework CLI diagnostics now auto-bootstrap before rerun; WORKFLOW.md-only bootstrap root detection works; targeted tests, routing, doctor, eslint, and diff check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:44:36.854Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Auto-bootstrap stale framework CLI for diagnostics

Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands.

## Scope

- In scope: Make framework-checkout stale runtime handling rebuild or stop instead of returning stale config for diagnostic commands.
- Out of scope: unrelated refactors not required for "Auto-bootstrap stale framework CLI for diagnostics".

## Plan

1. Reproduce current stale-runtime behavior after a manual build and identify the stale-policy entry points.
2. Update framework CLI bootstrap/root detection so WORKFLOW.md-only repositories are recognized and stale diagnostic commands auto-bootstrap safely.
3. Add focused tests for WORKFLOW.md root detection and stale diagnostic auto-bootstrap/fail-fast behavior.
4. Verify with targeted tests, routing check, agentplane doctor, and config/mode smoke checks.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T15:56:11.009Z — VERIFY — ok

By: CODER

Note: Verified: stale framework CLI diagnostics now auto-bootstrap before rerun; WORKFLOW.md-only bootstrap root detection works; targeted tests, routing, doctor, eslint, and diff check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T15:44:36.854Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
