---
id: "202604191639-ECXAH2"
title: "Delete obsolete config validation fallback"
result_summary: "The legacy config validation layer is collapsed into the canonical Zod source while the public runtime API remains stable."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "schemas"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T18:44:12.890Z"
  updated_by: "CODER"
  note: "Verified: config validation helpers now live in config-zod, the runtime wrapper delegates to that source, and config tests plus parity/schema/core build checks all passed."
commit:
  hash: "eba0d927d3595c7795bcd1f5454e6e61c1c4b3e3"
  message: "🔧 ECXAH2 schemas: collapse config validation into zod source"
comments:
  -
    author: "CODER"
    body: "Verified: the config runtime now delegates validation and error formatting to config-zod, parity output still matches, and the focused config/schema/core checks passed."
events:
  -
    type: "verify"
    at: "2026-04-19T18:44:12.890Z"
    author: "CODER"
    state: "ok"
    note: "Verified: config validation helpers now live in config-zod, the runtime wrapper delegates to that source, and config tests plus parity/schema/core build checks all passed."
  -
    type: "status"
    at: "2026-04-19T18:44:12.943Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: the config runtime now delegates validation and error formatting to config-zod, parity output still matches, and the focused config/schema/core checks passed."
doc_version: 3
doc_updated_at: "2026-04-19T18:44:12.949Z"
doc_updated_by: "CODER"
description: "Epic A′. Remove the obsolete legacy config validation layer after the Zod route is canonical."
sections:
  Summary: |-
    Delete obsolete config validation fallback
    
    Epic A′. Remove the obsolete legacy config validation layer after the Zod route is canonical.
  Scope: |-
    - In scope: Epic A′. Remove the obsolete legacy config validation layer after the Zod route is canonical.
    - Out of scope: unrelated refactors not required for "Delete obsolete config validation fallback".
  Plan: |-
    1. Implement the change for "Delete obsolete config validation fallback".
    2. Run required checks and capture verification evidence.
    3. Finalize task findings and finish with traceable commit metadata.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T18:44:12.890Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: config validation helpers now live in config-zod, the runtime wrapper delegates to that source, and config tests plus parity/schema/core build checks all passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:39:22.270Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Delete obsolete config validation fallback

Epic A′. Remove the obsolete legacy config validation layer after the Zod route is canonical.

## Scope

- In scope: Epic A′. Remove the obsolete legacy config validation layer after the Zod route is canonical.
- Out of scope: unrelated refactors not required for "Delete obsolete config validation fallback".

## Plan

1. Implement the change for "Delete obsolete config validation fallback".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T18:44:12.890Z — VERIFY — ok

By: CODER

Note: Verified: config validation helpers now live in config-zod, the runtime wrapper delegates to that source, and config tests plus parity/schema/core build checks all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T16:39:22.270Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
