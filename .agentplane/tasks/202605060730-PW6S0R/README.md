---
id: "202605060730-PW6S0R"
title: "Validate local blueprints in doctor"
result_summary: "Doctor reports invalid project-local blueprints before custom routes are trusted."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202605060730-Y7T26J"
tags:
  - "blueprints"
  - "doctor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T07:31:25.206Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T07:46:57.051Z"
  updated_by: "CODER"
  note: "Verified: doctor reports invalid project-local blueprints as warnings; doctor test and ci:local:fast passed."
commit:
  hash: "70ac693ef82c44c51d5dff652e16dfda60411b70"
  message: "Merge pull request #958 from basilisk-labs/task/202605060730-B55DQR/local-blueprint-authoring"
comments:
  -
    author: "CODER"
    body: "Start: batch execution in B55DQR worktree; add doctor validation for local blueprints."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #958 passed required remote checks, review threads were resolved, and hosted merge landed on origin/main."
events:
  -
    type: "status"
    at: "2026-05-06T07:31:57.581Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: batch execution in B55DQR worktree; add doctor validation for local blueprints."
  -
    type: "verify"
    at: "2026-05-06T07:46:57.051Z"
    author: "CODER"
    state: "ok"
    note: "Verified: doctor reports invalid project-local blueprints as warnings; doctor test and ci:local:fast passed."
  -
    type: "status"
    at: "2026-05-06T08:15:47.589Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #958 passed required remote checks, review threads were resolved, and hosted merge landed on origin/main."
doc_version: 3
doc_updated_at: "2026-05-06T08:15:47.590Z"
doc_updated_by: "INTEGRATOR"
description: "Add doctor coverage for project-local blueprint definitions so invalid .agentplane/blueprints/*.json files are reported before custom routes can be trusted."
sections:
  Summary: |-
    Validate local blueprints in doctor
    
    Add doctor coverage for project-local blueprint definitions so invalid .agentplane/blueprints/*.json files are reported before custom routes can be trusted.
  Scope: |-
    - In scope: Add doctor coverage for project-local blueprint definitions so invalid .agentplane/blueprints/*.json files are reported before custom routes can be trusted.
    - Out of scope: unrelated refactors not required for "Validate local blueprints in doctor".
  Plan: "1. Locate doctor check structure. 2. Add local blueprint validation to doctor as a project authoring guard. 3. Report invalid local blueprint files with actionable diagnostics. 4. Add doctor tests for valid and invalid local blueprints."
  Verify Steps: |-
    1. Review the requested outcome for "Validate local blueprints in doctor". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T07:46:57.051Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: doctor reports invalid project-local blueprints as warnings; doctor test and ci:local:fast passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T07:31:57.581Z, excerpt_hash=sha256:2abfb185be54401f950899f7a0db8df96e3dbee1eb3e93e67abcb7b0c8e680fe
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Validate local blueprints in doctor

Add doctor coverage for project-local blueprint definitions so invalid .agentplane/blueprints/*.json files are reported before custom routes can be trusted.

## Scope

- In scope: Add doctor coverage for project-local blueprint definitions so invalid .agentplane/blueprints/*.json files are reported before custom routes can be trusted.
- Out of scope: unrelated refactors not required for "Validate local blueprints in doctor".

## Plan

1. Locate doctor check structure. 2. Add local blueprint validation to doctor as a project authoring guard. 3. Report invalid local blueprint files with actionable diagnostics. 4. Add doctor tests for valid and invalid local blueprints.

## Verify Steps

1. Review the requested outcome for "Validate local blueprints in doctor". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T07:46:57.051Z — VERIFY — ok

By: CODER

Note: Verified: doctor reports invalid project-local blueprints as warnings; doctor test and ci:local:fast passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T07:31:57.581Z, excerpt_hash=sha256:2abfb185be54401f950899f7a0db8df96e3dbee1eb3e93e67abcb7b0c8e680fe

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
