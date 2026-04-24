---
id: "202604241137-BBVYQQ"
title: "v0.3 hygiene H4: ban test-helper suffix regression"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on:
  - "202604241136-NWWGZV"
tags:
  - "ci"
  - "testing"
  - "v0.3"
verify:
  - "bun run lint"
  - "rg -n '\\.test-helpers\\.ts' ."
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-24T11:37:52.758Z"
doc_updated_by: "CODER"
description: "Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero."
sections:
  Summary: |-
    v0.3 hygiene H4: ban test-helper suffix regression
    
    Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.
  Scope: |-
    - In scope: Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.
    - Out of scope: unrelated refactors not required for "v0.3 hygiene H4: ban test-helper suffix regression".
  Plan: |-
    1. Implement the change for "v0.3 hygiene H4: ban test-helper suffix regression".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the requested outcome for "v0.3 hygiene H4: ban test-helper suffix regression". Expected: the visible result matches ## Summary and stays inside approved scope.
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

v0.3 hygiene H4: ban test-helper suffix regression

Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.

## Scope

- In scope: Add or tighten enforcement so .test-helpers.ts files cannot re-enter after the baseline reaches zero.
- Out of scope: unrelated refactors not required for "v0.3 hygiene H4: ban test-helper suffix regression".

## Plan

1. Implement the change for "v0.3 hygiene H4: ban test-helper suffix regression".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the requested outcome for "v0.3 hygiene H4: ban test-helper suffix regression". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
