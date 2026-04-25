---
id: "202604251729-1F9PPF"
title: "Refactor PR check snapshot helpers"
result_summary: "split PR check helpers"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-25T17:29:36.329Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-25T17:38:01.964Z"
  updated_by: "CODER"
  note: "Focused pr check validation suites passed; full format:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. pr/check.ts left the hotspot set and the runtime warning count dropped to seven."
commit:
  hash: "da7a92059f85b3195ab85e412270191510529083"
  message: "♻️ 1F9PPF task: split PR check helpers"
comments:
  -
    author: "CODER"
    body: "Start: Extract the PR artifact snapshot and freshness helper cluster from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and output."
  -
    author: "CODER"
    body: "Verified: pr check now delegates snapshot and freshness helpers to an internal module, focused branch_pr validation suites and full repo gates passed, and the command left the hotspot list."
events:
  -
    type: "status"
    at: "2026-04-25T17:29:37.145Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract the PR artifact snapshot and freshness helper cluster from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and output."
  -
    type: "verify"
    at: "2026-04-25T17:38:01.964Z"
    author: "CODER"
    state: "ok"
    note: "Focused pr check validation suites passed; full format:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. pr/check.ts left the hotspot set and the runtime warning count dropped to seven."
  -
    type: "status"
    at: "2026-04-25T17:38:14.906Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pr check now delegates snapshot and freshness helpers to an internal module, focused branch_pr validation suites and full repo gates passed, and the command left the hotspot list."
doc_version: 3
doc_updated_at: "2026-04-25T17:38:14.908Z"
doc_updated_by: "CODER"
description: "Extract PR artifact snapshot and freshness helpers from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and CLI output."
sections:
  Summary: |-
    Refactor PR check snapshot helpers
    
    Extract PR artifact snapshot and freshness helpers from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and CLI output.
  Scope: |-
    - In scope: Extract PR artifact snapshot and freshness helpers from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and CLI output.
    - Out of scope: unrelated refactors not required for "Refactor PR check snapshot helpers".
  Plan: |-
    1. Inspect pr/check.ts and extract the PR artifact snapshot/freshness helper cluster into focused internal modules without changing the public cmdPrCheck flow.
    2. Preserve branch_pr validation behavior, fallback-to-branch artifact loading, freshness errors, and CLI emitter output.
    3. Run focused PR validation tests plus typecheck, lint, arch, hotspot, task-state, artifact, targeted Prettier, bootstrap, doctor, and routing checks.
    4. Record any remaining follow-up if a second helper cluster still keeps pr/check.ts near the warning threshold.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-25T17:38:01.964Z — VERIFY — ok
    
    By: CODER
    
    Note: Focused pr check validation suites passed; full format:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. pr/check.ts left the hotspot set and the runtime warning count dropped to seven.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T17:37:37.915Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Extracted PR artifact snapshot and freshness helpers from pr/check.ts into internal/pr-artifact-snapshot.ts; cmdPrCheck now reads as a linear validation flow.
      Impact: pr/check.ts dropped from 424 to 194 lines and left the runtime hotspot set; branch_pr fallback, freshness checks, and emitter output remained covered by focused CLI suites.
      Resolution: Kept the extracted module internal and behavior-preserving; only structural orchestration moved, not the user-facing validation contract.
id_source: "generated"
---
## Summary

Refactor PR check snapshot helpers

Extract PR artifact snapshot and freshness helpers from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and CLI output.

## Scope

- In scope: Extract PR artifact snapshot and freshness helpers from pr/check.ts into focused internal modules while preserving branch_pr validation behavior and CLI output.
- Out of scope: unrelated refactors not required for "Refactor PR check snapshot helpers".

## Plan

1. Inspect pr/check.ts and extract the PR artifact snapshot/freshness helper cluster into focused internal modules without changing the public cmdPrCheck flow.
2. Preserve branch_pr validation behavior, fallback-to-branch artifact loading, freshness errors, and CLI emitter output.
3. Run focused PR validation tests plus typecheck, lint, arch, hotspot, task-state, artifact, targeted Prettier, bootstrap, doctor, and routing checks.
4. Record any remaining follow-up if a second helper cluster still keeps pr/check.ts near the warning threshold.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-25T17:38:01.964Z — VERIFY — ok

By: CODER

Note: Focused pr check validation suites passed; full format:check, typecheck, lint:core, arch:check, hotspot-report, task-state, artifact gate, framework bootstrap, doctor, and routing checks passed. pr/check.ts left the hotspot set and the runtime warning count dropped to seven.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-25T17:37:37.915Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Extracted PR artifact snapshot and freshness helpers from pr/check.ts into internal/pr-artifact-snapshot.ts; cmdPrCheck now reads as a linear validation flow.
  Impact: pr/check.ts dropped from 424 to 194 lines and left the runtime hotspot set; branch_pr fallback, freshness checks, and emitter output remained covered by focused CLI suites.
  Resolution: Kept the extracted module internal and behavior-preserving; only structural orchestration moved, not the user-facing validation contract.
