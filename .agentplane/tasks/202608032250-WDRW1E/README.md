---
id: "202608032250-WDRW1E"
title: "Stabilize supervisor latency p95 qualification sampling"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "v0.7.1"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T22:51:02.812Z"
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
    at: "2026-08-03T22:51:22.964Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T22:51:22.964Z"
doc_updated_by: "CODER"
description: "Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95."
sections:
  Summary: |-
    Stabilize supervisor latency p95 qualification sampling

    Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
  Scope: |-
    - In scope: Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
    - Out of scope: unrelated refactors not required for "Stabilize supervisor latency p95 qualification sampling".
  Plan: "1. Raise the supervisor cold-run minimum and default from 10 to 20 without changing the existing 10 percent median or p95 regression budget. 2. Update qualification contract tests so 20 cold and 30 warm samples are required for both managed-run and external-advance frontends, including explicit rejection of the former 10-sample shape. 3. Run focused qualification tests, type checking, linting, formatting, the supervisor benchmark, and hosted PR verification before integration."
  Verify Steps: |-
    1. Run the focused release qualification contract tests. Expected: reports with 20 cold and 30 warm samples for both public frontends validate; a report with only 10 cold samples is rejected.
    2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass without unrelated changes.
    3. Run the supervisor latency benchmark against the exact task commit. Expected: both managed-run and external-advance cold and warm surfaces satisfy the unchanged 10 percent median and p95 budgets with the new 20/30 sample contract.
    4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0b15f5b7ad169169dec9c46ba02d4e59307d8553"
    version: 1
id_source: "generated"
---
## Summary

Stabilize supervisor latency p95 qualification sampling

Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.

## Scope

- In scope: Increase the mandatory cold supervisor latency sample from 10 to 20 while preserving the existing 10 percent regression budget, so release qualification uses a meaningful p95 estimate instead of treating one maximum outlier as p95.
- Out of scope: unrelated refactors not required for "Stabilize supervisor latency p95 qualification sampling".

## Plan

1. Raise the supervisor cold-run minimum and default from 10 to 20 without changing the existing 10 percent median or p95 regression budget. 2. Update qualification contract tests so 20 cold and 30 warm samples are required for both managed-run and external-advance frontends, including explicit rejection of the former 10-sample shape. 3. Run focused qualification tests, type checking, linting, formatting, the supervisor benchmark, and hosted PR verification before integration.

## Verify Steps

1. Run the focused release qualification contract tests. Expected: reports with 20 cold and 30 warm samples for both public frontends validate; a report with only 10 cold samples is rejected.
2. Run TypeScript type checking, ESLint, and Prettier checks for the touched qualification files. Expected: all pass without unrelated changes.
3. Run the supervisor latency benchmark against the exact task commit. Expected: both managed-run and external-advance cold and warm surfaces satisfy the unchanged 10 percent median and p95 budgets with the new 20/30 sample contract.
4. Complete independent evaluator review and hosted PR verification. Expected: no blocking findings and all required checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
