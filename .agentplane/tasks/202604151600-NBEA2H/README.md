---
id: "202604151600-NBEA2H"
title: "Introduce explicit branch_pr release candidate route"
result_summary: "Merged via PR #317."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T16:00:36.826Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-15T16:11:08.948Z"
  updated_by: "CODER"
  note: "Release route refactor validated: explicit release candidate command added for branch_pr, release apply is now direct-route only, release/help/docs contracts passed."
commit:
  hash: "bbd21880d17a7fd9598e4d9211ff63cbe8a2af98"
  message: "branch_pr/release: Introduce explicit branch_pr release candidate route (NBEA2H) (#317)"
comments:
  -
    author: "CODER"
    body: "Start: separating branch_pr release candidate preparation from direct release publication, updating route types, CLI surface, and tests while preserving direct-mode publish and current hosted publish workflows."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #317 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T16:01:04.505Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: separating branch_pr release candidate preparation from direct release publication, updating route types, CLI surface, and tests while preserving direct-mode publish and current hosted publish workflows."
  -
    type: "verify"
    at: "2026-04-15T16:11:08.948Z"
    author: "CODER"
    state: "ok"
    note: "Release route refactor validated: explicit release candidate command added for branch_pr, release apply is now direct-route only, release/help/docs contracts passed."
  -
    type: "status"
    at: "2026-04-15T17:06:57.131Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #317 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T17:06:57.136Z"
doc_updated_by: "INTEGRATOR"
description: "Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path."
sections:
  Summary: |-
    Introduce explicit branch_pr release candidate route
    
    Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path.
  Scope: |-
    - In scope: Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path.
    - Out of scope: unrelated refactors not required for "Introduce explicit branch_pr release candidate route".
  Plan: |-
    1. Split release routing semantics so branch_pr has an explicit candidate-preparation route -> verify: CLI and route types distinguish candidate preparation from direct publish.
    2. Update implementation and docs/tests around release candidate behavior -> verify: branch_pr release tests and relevant command/docs contracts pass with the new route semantics.
    3. Preserve current direct release and hosted publish behavior -> verify: existing direct-mode and publish workflow contracts still hold after the refactor.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-15T16:11:08.948Z — VERIFY — ok
    
    By: CODER
    
    Note: Release route refactor validated: explicit release candidate command added for branch_pr, release apply is now direct-route only, release/help/docs contracts passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T16:01:04.518Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Introduce explicit branch_pr release candidate route

Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path.

## Scope

- In scope: Add a first-class release candidate route for branch_pr mode so release preparation is modeled as a candidate PR flow instead of a deferred release-apply publish path.
- Out of scope: unrelated refactors not required for "Introduce explicit branch_pr release candidate route".

## Plan

1. Split release routing semantics so branch_pr has an explicit candidate-preparation route -> verify: CLI and route types distinguish candidate preparation from direct publish.
2. Update implementation and docs/tests around release candidate behavior -> verify: branch_pr release tests and relevant command/docs contracts pass with the new route semantics.
3. Preserve current direct release and hosted publish behavior -> verify: existing direct-mode and publish workflow contracts still hold after the refactor.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-15T16:11:08.948Z — VERIFY — ok

By: CODER

Note: Release route refactor validated: explicit release candidate command added for branch_pr, release apply is now direct-route only, release/help/docs contracts passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-15T16:01:04.518Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
