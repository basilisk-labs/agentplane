---
id: "202605052204-AJBX3D"
title: "Add initial blueprint registry data"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605052203-WH7G6R"
tags:
  - "blueprints"
  - "code"
  - "registry"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T22:05:10.304Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T22:18:37.874Z"
  updated_by: "CODER"
  note: "Verified: initial blueprint registry data now carries executable contract metadata for built-in analysis, content, docs, code, release, and ops routes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the initial blueprint registry using the executable definition contract from the primary batch task."
events:
  -
    type: "status"
    at: "2026-05-05T22:07:22.427Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the initial blueprint registry using the executable definition contract from the primary batch task."
  -
    type: "verify"
    at: "2026-05-05T22:18:37.874Z"
    author: "CODER"
    state: "ok"
    note: "Verified: initial blueprint registry data now carries executable contract metadata for built-in analysis, content, docs, code, release, and ops routes."
doc_version: 3
doc_updated_at: "2026-05-05T22:18:37.892Z"
doc_updated_by: "CODER"
description: "Add the second implementation task for blueprint execution contracts: introduce a registry of initial blueprint definitions for analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval using the typed contract from the preceding task."
sections:
  Summary: |-
    Add initial blueprint registry data
    
    Add the second implementation task for blueprint execution contracts: introduce a registry of initial blueprint definitions for analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval using the typed contract from the preceding task.
  Scope: |-
    - In scope: Add the second implementation task for blueprint execution contracts: introduce a registry of initial blueprint definitions for analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval using the typed contract from the preceding task.
    - Out of scope: unrelated refactors not required for "Add initial blueprint registry data".
  Plan: |-
    1. Build on the typed blueprint definition contract.
    2. Add a static registry for initial blueprints: analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval.
    3. Encode lightweight analysis/content routes without CI or PR states.
    4. Encode code/release routes with heavier evidence and policy expectations.
    5. Add registry lookup and validation tests.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T22:18:37.874Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: initial blueprint registry data now carries executable contract metadata for built-in analysis, content, docs, code, release, and ops routes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:22.427Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: full blueprint validation tests, resolver tests, runner dry-run preparation tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
      Impact: Built-in routes now expose allowed commands, policy modules, and context budgets while preserving lightweight analysis/content behavior.
      Resolution: Extended built-ins and tests without adding automatic state execution.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Add initial blueprint registry data

Add the second implementation task for blueprint execution contracts: introduce a registry of initial blueprint definitions for analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval using the typed contract from the preceding task.

## Scope

- In scope: Add the second implementation task for blueprint execution contracts: introduce a registry of initial blueprint definitions for analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval using the typed contract from the preceding task.
- Out of scope: unrelated refactors not required for "Add initial blueprint registry data".

## Plan

1. Build on the typed blueprint definition contract.
2. Add a static registry for initial blueprints: analysis.light, content.light, docs.change, code.branch_pr, release.strict, and ops.approval.
3. Encode lightweight analysis/content routes without CI or PR states.
4. Encode code/release routes with heavier evidence and policy expectations.
5. Add registry lookup and validation tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-05T22:18:37.874Z — VERIFY — ok

By: CODER

Note: Verified: initial blueprint registry data now carries executable contract metadata for built-in analysis, content, docs, code, release, and ops routes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T22:07:22.427Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: full blueprint validation tests, resolver tests, runner dry-run preparation tests, typecheck, targeted eslint, schemas, docs CLI freshness, policy routing, doctor, and diff check.
  Impact: Built-in routes now expose allowed commands, policy modules, and context budgets while preserving lightweight analysis/content behavior.
  Resolution: Extended built-ins and tests without adding automatic state execution.
  Promotion: incident-candidate
  Fixability: external
