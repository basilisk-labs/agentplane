---
id: "202604191200-N6XPEJ"
title: "Fix pr open when remote branch already exists"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T12:04:07.673Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the already-published branch path for pr open, patch the redundant push behavior, and verify that PR creation continues when origin already has the matching branch head."
events:
  -
    type: "status"
    at: "2026-04-19T12:04:07.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the already-published branch path for pr open, patch the redundant push behavior, and verify that PR creation continues when origin already has the matching branch head."
doc_version: 3
doc_updated_at: "2026-04-19T12:04:07.788Z"
doc_updated_by: "CODER"
description: "Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path."
sections:
  Summary: |-
    Fix pr open when remote branch already exists
    
    Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
  Scope: |-
    - In scope: Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
    - Out of scope: unrelated refactors not required for "Fix pr open when remote branch already exists".
  Plan: |-
    1. Implement the change for "Fix pr open when remote branch already exists".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Fix pr open when remote branch already exists". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Fix pr open when remote branch already exists

Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.

## Scope

- In scope: Make pr open tolerate an already-published branch and continue PR creation when remote HEAD already matches the local branch, instead of failing on an unnecessary internal push path.
- Out of scope: unrelated refactors not required for "Fix pr open when remote branch already exists".

## Plan

1. Implement the change for "Fix pr open when remote branch already exists".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Fix pr open when remote branch already exists". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
