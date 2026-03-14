---
id: "202603141531-6ZYNTF"
title: "Stabilize integrate rebase failure-path timeout cases"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:33:13.747Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for the remaining v0.3.7 gate tail."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:38:04.578Z"
  updated_by: "CODER"
  note: "The two remaining integrate rebase failure-path cases were not semantically regressing; targeted repro shows they take about 7.0s and 6.2s, but the full release gate was still leaving them on hardcoded 60s budgets while the neighboring rebase success path had already been moved to 120s. Rebinding those two failure paths to the shared 120s rebase budget keeps the failure assertions unchanged while leaving the full integrate suite, tsc, and package builds green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the two integrate rebase failure-path timeout cases under isolated and full release-gate load, confirm whether their 60s budgets are still too low or mis-bound, and patch the smallest coherent fix without weakening rebase-failure assertions."
events:
  -
    type: "status"
    at: "2026-03-14T15:36:00.006Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the two integrate rebase failure-path timeout cases under isolated and full release-gate load, confirm whether their 60s budgets are still too low or mis-bound, and patch the smallest coherent fix without weakening rebase-failure assertions."
  -
    type: "verify"
    at: "2026-03-14T15:38:04.578Z"
    author: "CODER"
    state: "ok"
    note: "The two remaining integrate rebase failure-path cases were not semantically regressing; targeted repro shows they take about 7.0s and 6.2s, but the full release gate was still leaving them on hardcoded 60s budgets while the neighboring rebase success path had already been moved to 120s. Rebinding those two failure paths to the shared 120s rebase budget keeps the failure assertions unchanged while leaving the full integrate suite, tsc, and package builds green."
doc_version: 3
doc_updated_at: "2026-03-14T15:38:04.584Z"
doc_updated_by: "CODER"
description: "Stabilize the two integrate rebase failure-path tests that still time out under full release load without weakening rebase-failure assertions."
sections:
  Summary: |-
    Stabilize integrate rebase failure-path timeout cases
    
    Stabilize the two integrate rebase failure-path tests that still time out under full release load without weakening rebase-failure assertions.
  Scope: |-
    - In scope: Stabilize the two integrate rebase failure-path tests that still time out under full release load without weakening rebase-failure assertions.
    - Out of scope: unrelated refactors not required for "Stabilize integrate rebase failure-path timeout cases".
  Plan: |-
    1. Reproduce the two integrate rebase failure-path timeout cases under isolated and full-gate conditions to separate budget drift from rebase-verify behavior.
    2. Patch only the rebase-failure-path timeout/fixture details needed so the failure assertions remain semantically strict.
    3. Re-run integrate coverage and tsc, and record any remaining aggregate-load caveat in Findings.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:38:04.578Z — VERIFY — ok
    
    By: CODER
    
    Note: The two remaining integrate rebase failure-path cases were not semantically regressing; targeted repro shows they take about 7.0s and 6.2s, but the full release gate was still leaving them on hardcoded 60s budgets while the neighboring rebase success path had already been moved to 120s. Rebinding those two failure paths to the shared 120s rebase budget keeps the failure assertions unchanged while leaving the full integrate suite, tsc, and package builds green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:36:00.010Z, excerpt_hash=sha256:ed5bcf382486fd71ec73fc6267989bc2daa118c257bc4a6e56939ca0f520de43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Stabilize integrate rebase failure-path timeout cases

Stabilize the two integrate rebase failure-path tests that still time out under full release load without weakening rebase-failure assertions.

## Scope

- In scope: Stabilize the two integrate rebase failure-path tests that still time out under full release load without weakening rebase-failure assertions.
- Out of scope: unrelated refactors not required for "Stabilize integrate rebase failure-path timeout cases".

## Plan

1. Reproduce the two integrate rebase failure-path timeout cases under isolated and full-gate conditions to separate budget drift from rebase-verify behavior.
2. Patch only the rebase-failure-path timeout/fixture details needed so the failure assertions remain semantically strict.
3. Re-run integrate coverage and tsc, and record any remaining aggregate-load caveat in Findings.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:38:04.578Z — VERIFY — ok

By: CODER

Note: The two remaining integrate rebase failure-path cases were not semantically regressing; targeted repro shows they take about 7.0s and 6.2s, but the full release gate was still leaving them on hardcoded 60s budgets while the neighboring rebase success path had already been moved to 120s. Rebinding those two failure paths to the shared 120s rebase budget keeps the failure assertions unchanged while leaving the full integrate suite, tsc, and package builds green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:36:00.010Z, excerpt_hash=sha256:ed5bcf382486fd71ec73fc6267989bc2daa118c257bc4a6e56939ca0f520de43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
