---
id: "202604151921-DQ7DB6"
title: "Commit task README with branch_pr PR packet artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-15T19:22:12.609Z"
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
    body: "Start: reproduce the branch_pr path where pr open commits pr/** but leaves the task README untracked, then make the auto-commit path include the same task README so task branches stay self-contained for closeout."
events:
  -
    type: "status"
    at: "2026-04-15T19:22:29.089Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the branch_pr path where pr open commits pr/** but leaves the task README untracked, then make the auto-commit path include the same task README so task branches stay self-contained for closeout."
doc_version: 3
doc_updated_at: "2026-04-15T19:22:29.101Z"
doc_updated_by: "CODER"
description: "Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery."
sections:
  Summary: |-
    Commit task README with branch_pr PR packet artifacts
    
    Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery.
  Scope: |-
    - In scope: Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery.
    - Out of scope: unrelated refactors not required for "Commit task README with branch_pr PR packet artifacts".
  Plan: |-
    1. Reproduce the branch_pr path where pr open leaves .agentplane/tasks/<task-id>/README.md untracked while auto-committing pr/**; verify: a deterministic reproducer captures the exact changed paths.
    2. Change only the branch_pr auto-commit path so the active task README is committed whenever PR packet artifacts are auto-committed for the same task; verify: targeted tests cover clean task branches after pr open/pr update and no unrelated paths are auto-committed.
    3. Validate on a live task branch, then land via hosted merge/close; verify: after pr open on a fresh task branch, git status is clean for both README and pr/** and hosted close still succeeds.
  Verify Steps: |-
    1. Review the requested outcome for "Commit task README with branch_pr PR packet artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Commit task README with branch_pr PR packet artifacts

Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery.

## Scope

- In scope: Reproduce the branch_pr path where pr open auto-commits .agentplane/tasks/<task-id>/pr/** but leaves the active task README untracked on the task branch, then make the task packet self-contained so task branches carry the README needed for closeout without relying on fallback recovery.
- Out of scope: unrelated refactors not required for "Commit task README with branch_pr PR packet artifacts".

## Plan

1. Reproduce the branch_pr path where pr open leaves .agentplane/tasks/<task-id>/README.md untracked while auto-committing pr/**; verify: a deterministic reproducer captures the exact changed paths.
2. Change only the branch_pr auto-commit path so the active task README is committed whenever PR packet artifacts are auto-committed for the same task; verify: targeted tests cover clean task branches after pr open/pr update and no unrelated paths are auto-committed.
3. Validate on a live task branch, then land via hosted merge/close; verify: after pr open on a fresh task branch, git status is clean for both README and pr/** and hosted close still succeeds.

## Verify Steps

1. Review the requested outcome for "Commit task README with branch_pr PR packet artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
