---
id: "202605010644-1YXBE7"
title: "AP-01: Restore oversized test guard budget model"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202605010644-CE27KS"
tags:
  - "code"
verify:
  - "node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000"
plan_approval:
  state: "approved"
  updated_at: "2026-05-01T06:55:24.293Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved AP-01 from user-provided Agentplane 0.4 refactor plan."
verification:
  state: "ok"
  updated_at: "2026-05-01T06:59:34.260Z"
  updated_by: "CODER"
  note: "Verified oversized baseline schema v2 guard with: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx prettier --check touched files; git diff --check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement oversized test baseline schema v2 budgets and keep the guard green without raising limits."
events:
  -
    type: "status"
    at: "2026-05-01T06:55:38.116Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement oversized test baseline schema v2 budgets and keep the guard green without raising limits."
  -
    type: "verify"
    at: "2026-05-01T06:59:34.260Z"
    author: "CODER"
    state: "ok"
    note: "Verified oversized baseline schema v2 guard with: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx prettier --check touched files; git diff --check."
doc_version: 3
doc_updated_at: "2026-05-01T06:59:34.268Z"
doc_updated_by: "CODER"
description: "Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked."
sections:
  Summary: |-
    AP-01: Restore oversized test guard budget model
    
    Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
  Scope: |-
    - In scope: Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
    - Out of scope: unrelated refactors not required for "AP-01: Restore oversized test guard budget model".
  Plan: |-
    1. Implement the change for "AP-01: Restore oversized test guard budget model".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Run `node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-01T06:59:34.260Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified oversized baseline schema v2 guard with: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx prettier --check touched files; git diff --check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:55:38.116Z, excerpt_hash=sha256:062cf2e0850c31556395bade4f9e61814031ab94e198e442f2c9673d2dadd4db
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

AP-01: Restore oversized test guard budget model

Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.

## Scope

- In scope: Upgrade oversized test baseline enforcement to schema v2 budgets so current total reductions are respected while new oversized tests remain blocked.
- Out of scope: unrelated refactors not required for "AP-01: Restore oversized test guard budget model".

## Plan

1. Implement the change for "AP-01: Restore oversized test guard budget model".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-01T06:59:34.260Z — VERIFY — ok

By: CODER

Note: Verified oversized baseline schema v2 guard with: node scripts/check-oversized-test-baseline.mjs --threshold-lines 1000; bunx vitest run packages/agentplane/src/cli/hotspot-report-script.test.ts --testTimeout 60000 --hookTimeout 60000; bunx prettier --check touched files; git diff --check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-01T06:55:38.116Z, excerpt_hash=sha256:062cf2e0850c31556395bade4f9e61814031ab94e198e442f2c9673d2dadd4db

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
