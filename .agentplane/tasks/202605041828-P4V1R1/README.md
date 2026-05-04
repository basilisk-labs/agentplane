---
id: "202605041828-P4V1R1"
title: "Add doctor and parallel CLI performance regression suite"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "doctor"
  - "performance"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-04T18:29:00.879Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-04T18:40:19.911Z"
  updated_by: "CODER"
  note: "New doctor-large-archive benchmark suite passed smoke runs for default doctor, deep doctor, and parallel task list; script help exposes the suite."
commit:
  hash: "81a80a2f532b83fd3dcef088ee5fe1c383c26f4c"
  message: "🚧 RCSMN7 task: Add fast doctor tier for large task archives [202605041827-RCSMN7]"
comments:
  -
    author: "CODER"
    body: "Start: add bounded doctor and parallel CLI performance benchmark coverage without making regular CI slow or network-dependent."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #874 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-04T18:29:37.328Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add bounded doctor and parallel CLI performance benchmark coverage without making regular CI slow or network-dependent."
  -
    type: "verify"
    at: "2026-05-04T18:40:19.911Z"
    author: "CODER"
    state: "ok"
    note: "New doctor-large-archive benchmark suite passed smoke runs for default doctor, deep doctor, and parallel task list; script help exposes the suite."
  -
    type: "status"
    at: "2026-05-04T18:49:58.114Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #874 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-04T18:49:58.117Z"
doc_updated_by: "INTEGRATOR"
description: "Add benchmark coverage for large task archive doctor latency and parallel read/mutation CLI behavior so future refactors can detect regressions."
sections:
  Summary: |-
    Add doctor and parallel CLI performance regression suite
    
    Add benchmark coverage for large task archive doctor latency and parallel read/mutation CLI behavior so future refactors can detect regressions.
  Scope: |-
    - In scope: Add benchmark coverage for large task archive doctor latency and parallel read/mutation CLI behavior so future refactors can detect regressions.
    - Out of scope: unrelated refactors not required for "Add doctor and parallel CLI performance regression suite".
  Plan: "1. Extend existing CLI benchmark suites with doctor large-archive and parallel CLI scenarios. 2. Add measurements that exercise doctor default/deep behavior and parallel read-heavy commands without requiring network. 3. Wire the suite into existing benchmark scripts without making normal CI flaky or slow. 4. Document command usage in the suite config or existing benchmark docs."
  Verify Steps: |-
    1. Run the new benchmark suite with a small attempt count. Expected: JSON measurement completes for doctor and parallel CLI scenarios.
    2. Run existing benchmark script help or suite validation. Expected: new suite is discoverable.
    3. Run TypeScript/typecheck or script syntax checks for changed benchmark files. Expected: no syntax/type failures.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-04T18:40:19.911Z — VERIFY — ok
    
    By: CODER
    
    Note: New doctor-large-archive benchmark suite passed smoke runs for default doctor, deep doctor, and parallel task list; script help exposes the suite.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:37.328Z, excerpt_hash=sha256:d754c51bf306f614f0c02a6245f522c6e89857b0fa97c946440435152adf4f28
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --runs 1 --warmups 0 --command-id doctor_default; Result: pass; Evidence: failed=false exit_code=0. Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --runs 1 --warmups 0 --command-id doctor_deep; Result: pass; Evidence: failed=false exit_code=0. Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --runs 1 --warmups 0 --command-id parallel_task_list_4; Result: pass; Evidence: parallel=4 failed_count=0. Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --help; Result: pass; Evidence: help lists doctor_default, doctor_deep, and parallel_task_list_4.
      Impact: Future CLI performance checks can measure large-archive doctor behavior and concurrent read-heavy CLI runs through the existing JSON benchmark contract.
      Resolution: Extended cli-benchmark-runner with per-command parallel execution and added the doctor-large-archive suite.
id_source: "generated"
---
## Summary

Add doctor and parallel CLI performance regression suite

Add benchmark coverage for large task archive doctor latency and parallel read/mutation CLI behavior so future refactors can detect regressions.

## Scope

- In scope: Add benchmark coverage for large task archive doctor latency and parallel read/mutation CLI behavior so future refactors can detect regressions.
- Out of scope: unrelated refactors not required for "Add doctor and parallel CLI performance regression suite".

## Plan

1. Extend existing CLI benchmark suites with doctor large-archive and parallel CLI scenarios. 2. Add measurements that exercise doctor default/deep behavior and parallel read-heavy commands without requiring network. 3. Wire the suite into existing benchmark scripts without making normal CI flaky or slow. 4. Document command usage in the suite config or existing benchmark docs.

## Verify Steps

1. Run the new benchmark suite with a small attempt count. Expected: JSON measurement completes for doctor and parallel CLI scenarios.
2. Run existing benchmark script help or suite validation. Expected: new suite is discoverable.
3. Run TypeScript/typecheck or script syntax checks for changed benchmark files. Expected: no syntax/type failures.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-04T18:40:19.911Z — VERIFY — ok

By: CODER

Note: New doctor-large-archive benchmark suite passed smoke runs for default doctor, deep doctor, and parallel task list; script help exposes the suite.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-04T18:29:37.328Z, excerpt_hash=sha256:d754c51bf306f614f0c02a6245f522c6e89857b0fa97c946440435152adf4f28

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --runs 1 --warmups 0 --command-id doctor_default; Result: pass; Evidence: failed=false exit_code=0. Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --runs 1 --warmups 0 --command-id doctor_deep; Result: pass; Evidence: failed=false exit_code=0. Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --runs 1 --warmups 0 --command-id parallel_task_list_4; Result: pass; Evidence: parallel=4 failed_count=0. Command: node scripts/measure-cli-perf.mjs --suite doctor-large-archive --help; Result: pass; Evidence: help lists doctor_default, doctor_deep, and parallel_task_list_4.
  Impact: Future CLI performance checks can measure large-archive doctor behavior and concurrent read-heavy CLI runs through the existing JSON benchmark contract.
  Resolution: Extended cli-benchmark-runner with per-command parallel execution and added the doctor-large-archive suite.
