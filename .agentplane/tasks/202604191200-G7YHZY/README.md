---
id: "202604191200-G7YHZY"
title: "Avoid redundant manual close tails after hosted closure"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T12:24:30.317Z"
  updated_by: "CODER"
  note: "Validated redundant close-tail suppression on base-side canonical closures: finish no longer materializes a task-close branch when the base already has canonical close artifacts, and hosted-close-pr now short-circuits before any GitHub recovery lookup once the task is already closed for that merge."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: short-circuit manual close-tail and hosted-close-pr once canonical closure is already present on the base branch, then verify the no-op behavior with regression coverage."
events:
  -
    type: "status"
    at: "2026-04-19T12:11:53.479Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: short-circuit manual close-tail and hosted-close-pr once canonical closure is already present on the base branch, then verify the no-op behavior with regression coverage."
  -
    type: "verify"
    at: "2026-04-19T12:24:30.317Z"
    author: "CODER"
    state: "ok"
    note: "Validated redundant close-tail suppression on base-side canonical closures: finish no longer materializes a task-close branch when the base already has canonical close artifacts, and hosted-close-pr now short-circuits before any GitHub recovery lookup once the task is already closed for that merge."
doc_version: 3
doc_updated_at: "2026-04-19T12:24:30.331Z"
doc_updated_by: "CODER"
description: "Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task."
sections:
  Summary: |-
    Avoid redundant manual close tails after hosted closure
    
    Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
  Scope: |-
    - In scope: Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
    - Out of scope: unrelated refactors not required for "Avoid redundant manual close tails after hosted closure".
  Plan: |-
    1. Implement the change for "Avoid redundant manual close tails after hosted closure".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "Avoid redundant manual close tails after hosted closure". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T12:24:30.317Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated redundant close-tail suppression on base-side canonical closures: finish no longer materializes a task-close branch when the base already has canonical close artifacts, and hosted-close-pr now short-circuits before any GitHub recovery lookup once the task is already closed for that merge.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:11:53.495Z, excerpt_hash=sha256:7f7377d7b755a861569f4277733542dc8a988cb6ba4ca24765076fe38d80cdb0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: After hosted closure landed on main, both manual finish --close-commit and task hosted-close-pr could still generate obsolete closure tails or PRs.
      Impact: Operators could create conflicting close PRs after automation had already closed the task, and hosted-close-pr could even fail on unnecessary GitHub lookups before reaching a no-op.
      Resolution: Treat base-side canonical closure as a first-class no-op condition: skip branch_pr close-tail materialization when no fresh task artifacts remain, and short-circuit hosted-close-pr before any remote recovery calls when task status/commit already match the merged commit.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Avoid redundant manual close tails after hosted closure

Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.

## Scope

- In scope: Short-circuit manual close-tail and hosted-close-pr flows when the canonical close commit is already present on main, so branch_pr users cannot create obsolete closure PRs after hosted automation has already closed the task.
- Out of scope: unrelated refactors not required for "Avoid redundant manual close tails after hosted closure".

## Plan

1. Implement the change for "Avoid redundant manual close tails after hosted closure".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "Avoid redundant manual close tails after hosted closure". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T12:24:30.317Z — VERIFY — ok

By: CODER

Note: Validated redundant close-tail suppression on base-side canonical closures: finish no longer materializes a task-close branch when the base already has canonical close artifacts, and hosted-close-pr now short-circuits before any GitHub recovery lookup once the task is already closed for that merge.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T12:11:53.495Z, excerpt_hash=sha256:7f7377d7b755a861569f4277733542dc8a988cb6ba4ca24765076fe38d80cdb0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: After hosted closure landed on main, both manual finish --close-commit and task hosted-close-pr could still generate obsolete closure tails or PRs.
  Impact: Operators could create conflicting close PRs after automation had already closed the task, and hosted-close-pr could even fail on unnecessary GitHub lookups before reaching a no-op.
  Resolution: Treat base-side canonical closure as a first-class no-op condition: skip branch_pr close-tail materialization when no fresh task artifacts remain, and short-circuit hosted-close-pr before any remote recovery calls when task status/commit already match the merged commit.
  Promotion: incident-candidate
  Fixability: external
