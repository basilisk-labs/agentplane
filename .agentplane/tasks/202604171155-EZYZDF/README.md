---
id: "202604171155-EZYZDF"
title: "Make recipe mutations transactional"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T13:03:28.737Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T13:21:00.162Z"
  updated_by: "TESTER"
  note: "Verified: recipes mutations now publish registry and derived artifacts from a validated candidate state, with rollback restoring vendored trees and active state when compilation fails."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: make recipes mutations publish registry and derived artifacts from a single validated candidate state, with rollback on failed writes where possible."
events:
  -
    type: "status"
    at: "2026-04-17T13:03:42.692Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make recipes mutations publish registry and derived artifacts from a single validated candidate state, with rollback on failed writes where possible."
  -
    type: "verify"
    at: "2026-04-17T13:21:00.162Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: recipes mutations now publish registry and derived artifacts from a validated candidate state, with rollback restoring vendored trees and active state when compilation fails."
doc_version: 3
doc_updated_at: "2026-04-17T13:21:00.165Z"
doc_updated_by: "CODER"
description: "Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind."
sections:
  Summary: |-
    Make recipe mutations transactional
    
    Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind.
  Scope: |-
    - In scope: Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind.
    - Out of scope: unrelated refactors not required for "Make recipe mutations transactional".
  Plan: |-
    1. Audit current add/remove/enable/disable/update/detach flows to identify where registry and generated artifacts can drift.
    2. Introduce a transaction helper that builds a candidate recipes registry, compiles derived artifacts from that candidate state, and publishes registry plus generated artifacts together only after compilation succeeds.
    3. Update recipe mutation commands to use the transaction path and add focused rollback/consistency tests.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T13:21:00.162Z — VERIFY — ok
    
    By: TESTER
    
    Note: Verified: recipes mutations now publish registry and derived artifacts from a validated candidate state, with rollback restoring vendored trees and active state when compilation fails.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T13:03:42.698Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Added transactional publish helpers plus rollback coverage for add, update, enable, disable, and remove.
      Impact: Recipes commands no longer leave registry/generated files or vendored trees in partial intermediate states after failed compile/publish paths.
      Resolution: Passed typecheck, runtime explain, existing recipes CLI/catalog suites, base-prompts/list/scenario suites, and new rollback tests for transactional recipes mutations.
id_source: "generated"
---
## Summary

Make recipe mutations transactional

Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind.

## Scope

- In scope: Apply add/enable/disable/update/detach through candidate state and atomic artifact writes so recipe operations cannot leave partial registry or generated outputs behind.
- Out of scope: unrelated refactors not required for "Make recipe mutations transactional".

## Plan

1. Audit current add/remove/enable/disable/update/detach flows to identify where registry and generated artifacts can drift.
2. Introduce a transaction helper that builds a candidate recipes registry, compiles derived artifacts from that candidate state, and publishes registry plus generated artifacts together only after compilation succeeds.
3. Update recipe mutation commands to use the transaction path and add focused rollback/consistency tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T13:21:00.162Z — VERIFY — ok

By: TESTER

Note: Verified: recipes mutations now publish registry and derived artifacts from a validated candidate state, with rollback restoring vendored trees and active state when compilation fails.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T13:03:42.698Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Added transactional publish helpers plus rollback coverage for add, update, enable, disable, and remove.
  Impact: Recipes commands no longer leave registry/generated files or vendored trees in partial intermediate states after failed compile/publish paths.
  Resolution: Passed typecheck, runtime explain, existing recipes CLI/catalog suites, base-prompts/list/scenario suites, and new rollback tests for transactional recipes mutations.
