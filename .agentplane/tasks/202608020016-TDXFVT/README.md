---
id: "202608020016-TDXFVT"
title: "Preserve evaluator work units across base-sync merges"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bugfix"
  - "evaluator"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T00:16:35.930Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-02T00:17:10.217Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T00:17:10.217Z"
doc_updated_by: "CODER"
description: "Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection."
sections:
  Summary: |-
    Preserve evaluator work units across base-sync merges

    Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection.
  Scope: |-
    - In scope: make branch_pr semantic review target selection merge-aware for base-sync merges; preserve the actual task diff and current verification records; add focused regression tests.
    - Out of scope: evaluator prompt/rubric changes, provider behavior changes, unrelated lifecycle refactors.
  Plan: |-
    1. Reproduce the empty evaluator packet with a branch_pr base-sync merge fixture.
    2. Make quality-review target resolution recognize a merge whose non-first-parent comparison contains the current task work unit.
    3. Prove the actual diff and verification record remain bound to the merge head while unrelated/lifecycle-only behavior remains unchanged.
    4. Run focused tests, typecheck, evaluator quality review, and hosted integration.
  Verify Steps: |-
    1. Run focused quality-target and evaluator evidence tests. Expected: a task branch that merges updated base history freezes the merge commit as evaluated_sha, the actual task patch, and the matching SHA-bound verification record.
    2. Run evaluator command tests and repository typecheck. Expected: existing metadata-only, lifecycle-only, batch, and direct-mode target semantics remain green.
    3. Inspect the final diff against main. Expected: only merge-aware target selection and focused tests plus task-local evidence are changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5d4a8de1a96bc29e13012ce01bfc65661ff5fa19"
    version: 1
id_source: "generated"
---
## Summary

Preserve evaluator work units across base-sync merges

Fix branch_pr evaluator packet preparation so a merge of current main into a task branch preserves the committed task work unit, actual diff, and matching verification records instead of freezing an empty packet. Add focused regression coverage for merge-aware target selection.

## Scope

- In scope: make branch_pr semantic review target selection merge-aware for base-sync merges; preserve the actual task diff and current verification records; add focused regression tests.
- Out of scope: evaluator prompt/rubric changes, provider behavior changes, unrelated lifecycle refactors.

## Plan

1. Reproduce the empty evaluator packet with a branch_pr base-sync merge fixture.
2. Make quality-review target resolution recognize a merge whose non-first-parent comparison contains the current task work unit.
3. Prove the actual diff and verification record remain bound to the merge head while unrelated/lifecycle-only behavior remains unchanged.
4. Run focused tests, typecheck, evaluator quality review, and hosted integration.

## Verify Steps

1. Run focused quality-target and evaluator evidence tests. Expected: a task branch that merges updated base history freezes the merge commit as evaluated_sha, the actual task patch, and the matching SHA-bound verification record.
2. Run evaluator command tests and repository typecheck. Expected: existing metadata-only, lifecycle-only, batch, and direct-mode target semantics remain green.
3. Inspect the final diff against main. Expected: only merge-aware target selection and focused tests plus task-local evidence are changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
