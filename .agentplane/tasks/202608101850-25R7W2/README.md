---
id: "202608101850-25R7W2"
title: "Recover legacy merged cleanup identity from the provider"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "cleanup"
  - "lifecycle"
  - "regression"
verify:
  - "bun test packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T18:50:49.930Z"
  updated_by: "USER"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-10T18:51:39.445Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-10T18:51:39.445Z"
doc_updated_by: "CODER"
description: "Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases."
sections:
  Summary: |-
    Recover legacy merged cleanup identity from the provider

    Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
  Scope: |-
    - In scope: Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
    - Out of scope: unrelated refactors not required for "Recover legacy merged cleanup identity from the provider".
  Plan: |-
    Goal: let an operator clean a legacy merged branch through the existing targeted AgentPlane cleanup command without weakening cleanup identity.

    1. Add a failing targeted-cleanup regression for a legacy task whose PR metadata has the exact task branch and pre-merge closure marker but no pr_number. Stub an exact provider lookup by branch and base that returns a merged PR whose head equals the local branch head and whose merge commit is on main.
    2. Change targetedCleanupProof to treat the exact branch-and-base provider observation as the missing PR identity when metadata has no number. Keep a recorded pr_number authoritative when it exists.
    3. Run the observed provider record through the same strict merged receipt, closure-on-base, commit-object, base-containment, and branch-head reconciliation checks used for modern metadata. Do not infer merge state from age, names, or local ancestry alone.
    4. Add negative regressions for multiple unsafe boundaries: provider not found or unavailable, open or closed PR, base mismatch, provider-head mismatch, local post-merge head drift, missing closure evidence, and a recorded PR number that disagrees with the provider.
    5. Verify the four known legacy cleanup candidates from the P02 inventory become dry-run candidates only when exact provider identity matches. No deletion is performed in this code task.
    6. Run focused cleanup proof suites, typecheck, lint, and critical CLI checks.

    Success: explicit cleanup by task id can recover old missing pr_number metadata from exact provider truth while every ambiguous or changed history remains blocked.
    Rollback: revert the isolated fallback and its tests; legacy cleanup returns to the current fail-closed behavior.
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover legacy merged cleanup identity from the provider". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover legacy merged cleanup identity from the provider". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "52cca0b0097a5ec4682b90a25b9ba98d7abaef0c"
    version: 1
id_source: "generated"
---
## Summary

Recover legacy merged cleanup identity from the provider

Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.

## Scope

- In scope: Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
- Out of scope: unrelated refactors not required for "Recover legacy merged cleanup identity from the provider".

## Plan

Goal: let an operator clean a legacy merged branch through the existing targeted AgentPlane cleanup command without weakening cleanup identity.

1. Add a failing targeted-cleanup regression for a legacy task whose PR metadata has the exact task branch and pre-merge closure marker but no pr_number. Stub an exact provider lookup by branch and base that returns a merged PR whose head equals the local branch head and whose merge commit is on main.
2. Change targetedCleanupProof to treat the exact branch-and-base provider observation as the missing PR identity when metadata has no number. Keep a recorded pr_number authoritative when it exists.
3. Run the observed provider record through the same strict merged receipt, closure-on-base, commit-object, base-containment, and branch-head reconciliation checks used for modern metadata. Do not infer merge state from age, names, or local ancestry alone.
4. Add negative regressions for multiple unsafe boundaries: provider not found or unavailable, open or closed PR, base mismatch, provider-head mismatch, local post-merge head drift, missing closure evidence, and a recorded PR number that disagrees with the provider.
5. Verify the four known legacy cleanup candidates from the P02 inventory become dry-run candidates only when exact provider identity matches. No deletion is performed in this code task.
6. Run focused cleanup proof suites, typecheck, lint, and critical CLI checks.

Success: explicit cleanup by task id can recover old missing pr_number metadata from exact provider truth while every ambiguous or changed history remains blocked.
Rollback: revert the isolated fallback and its tests; legacy cleanup returns to the current fail-closed behavior.

## Verify Steps

PLANNER fallback scaffold for "Recover legacy merged cleanup identity from the provider". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover legacy merged cleanup identity from the provider". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
