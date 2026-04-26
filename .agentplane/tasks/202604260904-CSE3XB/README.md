---
id: "202604260904-CSE3XB"
title: "Fix lint drift before push"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lint"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T09:04:48.057Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T09:07:13.221Z"
  updated_by: "CODER"
  note: "Fixed pre-push lint drift after refactor cleanup."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix the lint violations reported by pre-push so the already verified refactor/docs commits can be pushed cleanly."
events:
  -
    type: "status"
    at: "2026-04-26T09:04:48.287Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix the lint violations reported by pre-push so the already verified refactor/docs commits can be pushed cleanly."
  -
    type: "verify"
    at: "2026-04-26T09:07:13.221Z"
    author: "CODER"
    state: "ok"
    note: "Fixed pre-push lint drift after refactor cleanup."
doc_version: 3
doc_updated_at: "2026-04-26T09:07:13.225Z"
doc_updated_by: "CODER"
description: "Fix lint violations surfaced by pre-push after the refactor sequence and repush main."
sections:
  Summary: |-
    Fix lint drift before push
    
    Fix lint violations surfaced by pre-push after the refactor sequence and repush main.
  Scope: |-
    - In scope: Fix lint violations surfaced by pre-push after the refactor sequence and repush main.
    - Out of scope: unrelated refactors not required for "Fix lint drift before push".
  Plan: |-
    1. Fix lint violations reported by pre-push in runner type split, incidents internal helpers, and check-knip-baseline.mjs.
    2. Run lint:core plus the focused checks affected by these files.
    3. Finish the repair task with a scoped commit, then retry push.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T09:07:13.221Z — VERIFY — ok
    
    By: CODER
    
    Note: Fixed pre-push lint drift after refactor cleanup.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T09:04:48.293Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    Checks passed: bun run lint:core; bun run typecheck; bun run knip:check; bun run format:check; git diff --check.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix lint drift before push

Fix lint violations surfaced by pre-push after the refactor sequence and repush main.

## Scope

- In scope: Fix lint violations surfaced by pre-push after the refactor sequence and repush main.
- Out of scope: unrelated refactors not required for "Fix lint drift before push".

## Plan

1. Fix lint violations reported by pre-push in runner type split, incidents internal helpers, and check-knip-baseline.mjs.
2. Run lint:core plus the focused checks affected by these files.
3. Finish the repair task with a scoped commit, then retry push.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T09:07:13.221Z — VERIFY — ok

By: CODER

Note: Fixed pre-push lint drift after refactor cleanup.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T09:04:48.293Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

Checks passed: bun run lint:core; bun run typecheck; bun run knip:check; bun run format:check; git diff --check.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
