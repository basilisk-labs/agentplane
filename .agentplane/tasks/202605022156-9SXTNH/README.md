---
id: "202605022156-9SXTNH"
title: "Fix standalone release scripts under Node 24"
result_summary: "Standalone release check path verified on main"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-02T21:56:58.534Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-02T21:57:02.130Z"
  updated_by: "CODER"
  note: "Targeted release standalone checks passed: bunx vitest run packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts (4 tests passed)."
commit:
  hash: "8f9b00f814b931a2537b5efc9086d39e1445004c"
  message: "🧪 HTD2WC task: speed up standalone check assets"
comments:
  -
    author: "CODER"
    body: "Start: Fix Node 24 standalone release pre-push blocker by reducing synthetic check-mode archive generation cost only."
  -
    author: "INTEGRATOR"
    body: "Verified: targeted standalone release checks passed on main worktree; closing Node 24 standalone release task."
events:
  -
    type: "status"
    at: "2026-05-02T21:57:00.201Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix Node 24 standalone release pre-push blocker by reducing synthetic check-mode archive generation cost only."
  -
    type: "verify"
    at: "2026-05-02T21:57:02.130Z"
    author: "CODER"
    state: "ok"
    note: "Targeted release standalone checks passed: bunx vitest run packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts (4 tests passed)."
  -
    type: "status"
    at: "2026-05-03T05:28:04.828Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: targeted standalone release checks passed on main worktree; closing Node 24 standalone release task."
doc_version: 3
doc_updated_at: "2026-05-03T05:28:04.829Z"
doc_updated_by: "INTEGRATOR"
description: "Repair the standalone release distribution check path that blocks pre-push under Node 24."
sections:
  Summary: |-
    Fix standalone release scripts under Node 24
    
    Repair the standalone release distribution check path that blocks pre-push under Node 24.
  Scope: |-
    - In scope: Repair the standalone release distribution check path that blocks pre-push under Node 24.
    - Out of scope: unrelated refactors not required for "Fix standalone release scripts under Node 24".
  Plan: "1. Keep production standalone asset generation unchanged. 2. Speed up synthetic/check-mode standalone generation by materializing a minimal synthetic agentplane package when synthetic Node and skip-install are active. 3. Verify the release distribution and setup-agentplane renderer tests."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-02T21:57:02.130Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted release standalone checks passed: bunx vitest run packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts (4 tests passed).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:57:00.201Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix standalone release scripts under Node 24

Repair the standalone release distribution check path that blocks pre-push under Node 24.

## Scope

- In scope: Repair the standalone release distribution check path that blocks pre-push under Node 24.
- Out of scope: unrelated refactors not required for "Fix standalone release scripts under Node 24".

## Plan

1. Keep production standalone asset generation unchanged. 2. Speed up synthetic/check-mode standalone generation by materializing a minimal synthetic agentplane package when synthetic Node and skip-install are active. 3. Verify the release distribution and setup-agentplane renderer tests.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-02T21:57:02.130Z — VERIFY — ok

By: CODER

Note: Targeted release standalone checks passed: bunx vitest run packages/agentplane/src/commands/release/generate-release-distribution-script.test.ts packages/agentplane/src/commands/release/render-scoop-and-setup-standalone-script.test.ts (4 tests passed).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-02T21:57:00.201Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
