---
id: "202605032100-8HPPGC"
title: "Finalize 0.4.3 release state"
result_summary: "Merged via PR #858."
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
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T21:00:45.482Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-03T21:06:44.631Z"
  updated_by: "CODER"
  note: "Release finalization checks passed: doctor OK, routing OK, release parity OK, release:check OK, release:bun:check OK for five v0.4.3 assets, release:bun:smoke OK with compiled CLI version 0.4.3, release:demo:check OK, spec examples OK, docs CLI reference fresh, and npm README link grep confirmed ACR/docs surfaces."
commit:
  hash: "9ea84bb858758ec116a2384d048b5eb9134ebc37"
  message: "🚧 8HPPGC task: Finalize 0.4.3 release state [202605032100-8HPPGC]"
comments:
  -
    author: "CODER"
    body: "Start: finalize release state after merged ACR launch PR and prepare hosted 0.4.3 publication."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #858 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-03T21:01:02.392Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: finalize release state after merged ACR launch PR and prepare hosted 0.4.3 publication."
  -
    type: "verify"
    at: "2026-05-03T21:06:44.631Z"
    author: "CODER"
    state: "ok"
    note: "Release finalization checks passed: doctor OK, routing OK, release parity OK, release:check OK, release:bun:check OK for five v0.4.3 assets, release:bun:smoke OK with compiled CLI version 0.4.3, release:demo:check OK, spec examples OK, docs CLI reference fresh, and npm README link grep confirmed ACR/docs surfaces."
  -
    type: "status"
    at: "2026-05-03T21:08:46.800Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #858 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-03T21:08:46.805Z"
doc_updated_by: "INTEGRATOR"
description: "Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish."
sections:
  Summary: |-
    Finalize 0.4.3 release state
    
    Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish.
  Scope: |-
    - In scope: Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish.
    - Out of scope: unrelated refactors not required for "Finalize 0.4.3 release state".
  Plan: "1. Start a branch_pr worktree for the release finalization task. 2. Close the merged ACR launch leaf tasks against the #853 close commit. 3. Align .agentplane/WORKFLOW.md expected CLI version to 0.4.3. 4. Verify package versions, Bun build/runtime version, release parity, schema examples, docs README surfaces, and doctor. 5. Open/merge the finalization PR, then dispatch hosted publish for the final main SHA and verify npm, GitHub release/tag, Bun assets, and published README surfaces."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-03T21:06:44.631Z — VERIFY — ok
    
    By: CODER
    
    Note: Release finalization checks passed: doctor OK, routing OK, release parity OK, release:check OK, release:bun:check OK for five v0.4.3 assets, release:bun:smoke OK with compiled CLI version 0.4.3, release:demo:check OK, spec examples OK, docs CLI reference fresh, and npm README link grep confirmed ACR/docs surfaces.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T21:01:02.392Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Finalize 0.4.3 release state

Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish.

## Scope

- In scope: Close merged ACR launch leaf tasks, align repository expected CLI version with 0.4.3, verify Bun binary/version surfaces, and prepare hosted publish.
- Out of scope: unrelated refactors not required for "Finalize 0.4.3 release state".

## Plan

1. Start a branch_pr worktree for the release finalization task. 2. Close the merged ACR launch leaf tasks against the #853 close commit. 3. Align .agentplane/WORKFLOW.md expected CLI version to 0.4.3. 4. Verify package versions, Bun build/runtime version, release parity, schema examples, docs README surfaces, and doctor. 5. Open/merge the finalization PR, then dispatch hosted publish for the final main SHA and verify npm, GitHub release/tag, Bun assets, and published README surfaces.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-03T21:06:44.631Z — VERIFY — ok

By: CODER

Note: Release finalization checks passed: doctor OK, routing OK, release parity OK, release:check OK, release:bun:check OK for five v0.4.3 assets, release:bun:smoke OK with compiled CLI version 0.4.3, release:demo:check OK, spec examples OK, docs CLI reference fresh, and npm README link grep confirmed ACR/docs surfaces.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-03T21:01:02.392Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
