---
id: "202604171329-2MMNWG"
title: "Remove bundled recipes fallback path"
result_summary: "Merged via PR #389."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-17T14:16:01.551Z"
  updated_by: "CODER"
  note: "Removed bundled recipes fallback resolution from recipes install and deleted the empty bundled-catalog compatibility surface from runtime-facing core CLI tests."
commit:
  hash: "13de95b9592b516fa408cd6d3a9c1dd0c8de9f06"
  message: "Remove bundled recipes fallback path (2MMNWG) (#389)"
comments:
  -
    author: "CODER"
    body: "Start: remove the remaining bundled recipes fallback path from install and runtime-facing tests so recipes distribution is remote-index plus cache only."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #389 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-17T13:30:22.889Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove the remaining bundled recipes fallback path from install and runtime-facing tests so recipes distribution is remote-index plus cache only."
  -
    type: "verify"
    at: "2026-04-17T14:16:01.551Z"
    author: "CODER"
    state: "ok"
    note: "Removed bundled recipes fallback resolution from recipes install and deleted the empty bundled-catalog compatibility surface from runtime-facing core CLI tests."
  -
    type: "status"
    at: "2026-04-17T14:25:49.371Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #389 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-17T14:25:49.377Z"
doc_updated_by: "INTEGRATOR"
description: "Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4."
sections:
  Summary: |-
    Remove bundled recipes fallback path
    
    Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.
  Scope: |-
    - In scope: Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.
    - Out of scope: unrelated refactors not required for "Remove bundled recipes fallback path".
  Plan: "1. Audit the remaining bundled recipe references in install flow and runtime-facing tests. 2. Remove bundled fallback resolution from recipes install so name resolution always goes through the remote index/cache path. 3. Replace or delete bundled-catalog imports in runtime-facing tests and any stale helper surfaces. 4. Run focused recipes/install/CLI tests plus the smallest freshness or lint checks needed by the touched paths."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-17T14:16:01.551Z — VERIFY — ok
    
    By: CODER
    
    Note: Removed bundled recipes fallback resolution from recipes install and deleted the empty bundled-catalog compatibility surface from runtime-facing core CLI tests.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T13:30:22.895Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove bundled recipes fallback path

Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.

## Scope

- In scope: Remove remaining bundled recipe fallback usage from recipes install and runtime-facing tests so remote catalog + global cache remain the only distribution path for recipes before 0.4.
- Out of scope: unrelated refactors not required for "Remove bundled recipes fallback path".

## Plan

1. Audit the remaining bundled recipe references in install flow and runtime-facing tests. 2. Remove bundled fallback resolution from recipes install so name resolution always goes through the remote index/cache path. 3. Replace or delete bundled-catalog imports in runtime-facing tests and any stale helper surfaces. 4. Run focused recipes/install/CLI tests plus the smallest freshness or lint checks needed by the touched paths.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-17T14:16:01.551Z — VERIFY — ok

By: CODER

Note: Removed bundled recipes fallback resolution from recipes install and deleted the empty bundled-catalog compatibility surface from runtime-facing core CLI tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-17T13:30:22.895Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
