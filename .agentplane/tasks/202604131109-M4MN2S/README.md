---
id: "202604131109-M4MN2S"
title: "Suppress non-actionable DONE branch_pr PR artifact warnings"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T11:09:26.565Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T11:16:42.372Z"
  updated_by: "CODER"
  note: "Doctor no longer warns on non-actionable DONE branch_pr duplicate/stacked records, and historical PR artifact drift was reconciled on the release branch."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: classify the four remaining DONE branch_pr PR-artifact warnings, patch doctor to ignore non-actionable duplicate/stacked records, then persist normalized history so doctor is quiet for the next release."
events:
  -
    type: "status"
    at: "2026-04-13T11:09:50.371Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: classify the four remaining DONE branch_pr PR-artifact warnings, patch doctor to ignore non-actionable duplicate/stacked records, then persist normalized history so doctor is quiet for the next release."
  -
    type: "verify"
    at: "2026-04-13T11:16:42.372Z"
    author: "CODER"
    state: "ok"
    note: "Doctor no longer warns on non-actionable DONE branch_pr duplicate/stacked records, and historical PR artifact drift was reconciled on the release branch."
doc_version: 3
doc_updated_at: "2026-04-13T11:16:42.391Z"
doc_updated_by: "CODER"
description: "Persist reconciled branch_pr PR artifact metadata on base and stop doctor from warning on stacked/duplicate DONE tasks that never own a distinct mergeable PR."
sections:
  Summary: |-
    Suppress non-actionable DONE branch_pr PR artifact warnings
    
    Persist reconciled branch_pr PR artifact metadata on base and stop doctor from warning on stacked/duplicate DONE tasks that never own a distinct mergeable PR.
  Scope: |-
    - In scope: Persist reconciled branch_pr PR artifact metadata on base and stop doctor from warning on stacked/duplicate DONE tasks that never own a distinct mergeable PR.
    - Out of scope: unrelated refactors not required for "Suppress non-actionable DONE branch_pr PR artifact warnings".
  Plan: "1. Classify the remaining DONE branch_pr doctor warnings into actionable stale PR artifacts versus non-actionable duplicate/stacked records. 2. Patch doctor/reconcile logic so duplicate no-op tasks and stacked tasks reusing a root branch do not keep release cleanup noisy. 3. Re-run doctor and persist the normalized historical pr/meta updates on base so the next patch release starts from a clean branch_pr state."
  Verify Steps: |-
    1. Review the requested outcome for "Suppress non-actionable DONE branch_pr PR artifact warnings". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T11:16:42.372Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor no longer warns on non-actionable DONE branch_pr duplicate/stacked records, and historical PR artifact drift was reconciled on the release branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T11:09:50.377Z, excerpt_hash=sha256:4535478ed62d76c8a74dfb991e8f40e54761f100d1c786a1d49879c20952add5
    
    Details:
    
    Validated with: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js task normalize --sync-branch-pr-state; node packages/agentplane/bin/agentplane.js task normalize --sync-hosted-merges --task-id 202604090933-SXRWRM; node packages/agentplane/bin/agentplane.js doctor
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Suppress non-actionable DONE branch_pr PR artifact warnings

Persist reconciled branch_pr PR artifact metadata on base and stop doctor from warning on stacked/duplicate DONE tasks that never own a distinct mergeable PR.

## Scope

- In scope: Persist reconciled branch_pr PR artifact metadata on base and stop doctor from warning on stacked/duplicate DONE tasks that never own a distinct mergeable PR.
- Out of scope: unrelated refactors not required for "Suppress non-actionable DONE branch_pr PR artifact warnings".

## Plan

1. Classify the remaining DONE branch_pr doctor warnings into actionable stale PR artifacts versus non-actionable duplicate/stacked records. 2. Patch doctor/reconcile logic so duplicate no-op tasks and stacked tasks reusing a root branch do not keep release cleanup noisy. 3. Re-run doctor and persist the normalized historical pr/meta updates on base so the next patch release starts from a clean branch_pr state.

## Verify Steps

1. Review the requested outcome for "Suppress non-actionable DONE branch_pr PR artifact warnings". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T11:16:42.372Z — VERIFY — ok

By: CODER

Note: Doctor no longer warns on non-actionable DONE branch_pr duplicate/stacked records, and historical PR artifact drift was reconciled on the release branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T11:09:50.377Z, excerpt_hash=sha256:4535478ed62d76c8a74dfb991e8f40e54761f100d1c786a1d49879c20952add5

Details:

Validated with: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts --hookTimeout 60000 --testTimeout 60000; node packages/agentplane/bin/agentplane.js task normalize --sync-branch-pr-state; node packages/agentplane/bin/agentplane.js task normalize --sync-hosted-merges --task-id 202604090933-SXRWRM; node packages/agentplane/bin/agentplane.js doctor

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
