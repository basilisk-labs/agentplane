---
id: "202605052303-N37XQ0"
title: "Validate blueprint plan state transitions"
result_summary: "Merged blueprint plan state transition validation in PR #955."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605052303-QWE78P"
tags:
  - "blueprint"
  - "recipes"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T23:03:50.027Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T23:12:39.369Z"
  updated_by: "CODER"
  note: "Implemented and tested validate-only blueprint plan state transition checks."
commit:
  hash: "87a7923dc678d8f1f37803cc1a5fdcd46bdbad94"
  message: "Merge pull request #955 from basilisk-labs/task/202605052303-QWE78P/blueprint-plan-validation"
comments:
  -
    author: "CODER"
    body: "Start: batch execution in QWE78P worktree; implement validate-only blueprint plan state transition checks."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #955 merged after required checks passed; merge commit 87a7923dc678d8f1f37803cc1a5fdcd46bdbad94."
events:
  -
    type: "status"
    at: "2026-05-05T23:09:15.757Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: batch execution in QWE78P worktree; implement validate-only blueprint plan state transition checks."
  -
    type: "verify"
    at: "2026-05-05T23:12:39.369Z"
    author: "CODER"
    state: "ok"
    note: "Implemented and tested validate-only blueprint plan state transition checks."
  -
    type: "status"
    at: "2026-05-05T23:18:48.550Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #955 merged after required checks passed; merge commit 87a7923dc678d8f1f37803cc1a5fdcd46bdbad94."
doc_version: 3
doc_updated_at: "2026-05-05T23:18:48.551Z"
doc_updated_by: "INTEGRATOR"
description: "Add validate-only checks for materialized blueprint plan state order against the selected blueprint edge graph, including duplicate/missing/unknown state transition diagnostics."
sections:
  Summary: |-
    Validate blueprint plan state transitions
    
    Add validate-only checks for materialized blueprint plan state order against the selected blueprint edge graph, including duplicate/missing/unknown state transition diagnostics.
  Scope: |-
    - In scope: Add validate-only checks for materialized blueprint plan state order against the selected blueprint edge graph, including duplicate/missing/unknown state transition diagnostics.
    - Out of scope: unrelated refactors not required for "Validate blueprint plan state transitions".
  Plan: "1. Reuse the blueprint definition graph already selected for a materialized plan. 2. Add validate-only state order checks for unknown states, missing entry/final state coverage, duplicate materialized states, and edges not allowed by the blueprint graph. 3. Cover failures and a valid built-in plan with focused tests. 4. Run targeted tests and required checks."
  Verify Steps: |-
    1. Review the requested outcome for "Validate blueprint plan state transitions". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T23:12:39.369Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented and tested validate-only blueprint plan state transition checks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T23:09:15.757Z, excerpt_hash=sha256:2723aae130b05343633d65d16392d68ff6e945a12c0d787a0e49708c26968878
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/blueprints/validate.test.ts; Result: pass; Evidence: built-ins and plan validation tests pass, including duplicate, missing, unknown, and invalidly ordered states. Scope: selected blueprint graph validation.
      Impact: Plans now fail fast when their states drift from the selected blueprint graph.
      Resolution: validateBlueprintPlanArtifact compares plan state ids and adjacent transitions against the blueprint node/edge graph.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Validate blueprint plan state transitions

Add validate-only checks for materialized blueprint plan state order against the selected blueprint edge graph, including duplicate/missing/unknown state transition diagnostics.

## Scope

- In scope: Add validate-only checks for materialized blueprint plan state order against the selected blueprint edge graph, including duplicate/missing/unknown state transition diagnostics.
- Out of scope: unrelated refactors not required for "Validate blueprint plan state transitions".

## Plan

1. Reuse the blueprint definition graph already selected for a materialized plan. 2. Add validate-only state order checks for unknown states, missing entry/final state coverage, duplicate materialized states, and edges not allowed by the blueprint graph. 3. Cover failures and a valid built-in plan with focused tests. 4. Run targeted tests and required checks.

## Verify Steps

1. Review the requested outcome for "Validate blueprint plan state transitions". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T23:12:39.369Z — VERIFY — ok

By: CODER

Note: Implemented and tested validate-only blueprint plan state transition checks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T23:09:15.757Z, excerpt_hash=sha256:2723aae130b05343633d65d16392d68ff6e945a12c0d787a0e49708c26968878

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/blueprints/validate.test.ts; Result: pass; Evidence: built-ins and plan validation tests pass, including duplicate, missing, unknown, and invalidly ordered states. Scope: selected blueprint graph validation.
  Impact: Plans now fail fast when their states drift from the selected blueprint graph.
  Resolution: validateBlueprintPlanArtifact compares plan state ids and adjacent transitions against the blueprint node/edge graph.
  Promotion: incident-candidate
  Fixability: external
