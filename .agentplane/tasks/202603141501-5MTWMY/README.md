---
id: "202603141501-5MTWMY"
title: "Fix release apply push test timeout binding under full gate"
result_summary: "Fixed the release apply timeout mis-binding so the push-with-no-verify coverage uses the intended long timeout budget under full release gating."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "release"
  - "code"
verify:
  - "bun x vitest run packages/agentplane/src/commands/release/apply.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T15:03:00.648Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as atomic release unblock task for v0.3.7."
verification:
  state: "ok"
  updated_at: "2026-03-14T15:06:10.353Z"
  updated_by: "CODER"
  note: "Root cause was a mis-bound timeout constant: RELEASE_APPLY_LONG_TIMEOUT_MS was attached to the neighboring requires --push case while the push-with-no-verify hook test still kept 30000ms. The targeted apply suite, the single failing case, tsc, and package builds are all green after rebinding the timeout to the intended test."
commit:
  hash: "8f73945a75630b94647446829351453640bb0ceb"
  message: "🩹 5MTWMY test: fix release apply timeout binding"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the release apply push-with-no-verify timeout under isolated and full release-gate conditions, confirm whether the explicit timeout binding is being ignored, and land the smallest coherent fix without weakening the recursive hook assertion."
  -
    author: "CODER"
    body: "Verified: the release apply push-with-no-verify case was still running with a hardcoded 30000ms because the new timeout constant had been attached to the neighboring test. Rebinding the 60s budget to the intended case keeps the recursive pre-push hook assertion intact and leaves the isolated apply suite green."
events:
  -
    type: "status"
    at: "2026-03-14T15:04:51.757Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the release apply push-with-no-verify timeout under isolated and full release-gate conditions, confirm whether the explicit timeout binding is being ignored, and land the smallest coherent fix without weakening the recursive hook assertion."
  -
    type: "verify"
    at: "2026-03-14T15:06:10.353Z"
    author: "CODER"
    state: "ok"
    note: "Root cause was a mis-bound timeout constant: RELEASE_APPLY_LONG_TIMEOUT_MS was attached to the neighboring requires --push case while the push-with-no-verify hook test still kept 30000ms. The targeted apply suite, the single failing case, tsc, and package builds are all green after rebinding the timeout to the intended test."
  -
    type: "status"
    at: "2026-03-14T15:06:32.627Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the release apply push-with-no-verify case was still running with a hardcoded 30000ms because the new timeout constant had been attached to the neighboring test. Rebinding the 60s budget to the intended case keeps the recursive pre-push hook assertion intact and leaves the isolated apply suite green."
doc_version: 3
doc_updated_at: "2026-03-14T15:06:32.629Z"
doc_updated_by: "CODER"
description: "Make the release apply push-with-no-verify coverage use the intended timeout budget in full release:prepublish runs and prove it with isolated apply coverage."
sections:
  Summary: |-
    Fix release apply push test timeout binding under full gate
    
    Make the release apply push-with-no-verify coverage use the intended timeout budget in full release:prepublish runs and prove it with isolated apply coverage.
  Scope: |-
    - In scope: Make the release apply push-with-no-verify coverage use the intended timeout budget in full release:prepublish runs and prove it with isolated apply coverage.
    - Out of scope: unrelated refactors not required for "Fix release apply push test timeout binding under full gate".
  Plan: |-
    1. Reproduce the push-with-no-verify timeout under isolated and full release gate conditions to confirm whether the issue is a stale per-test timeout binding or a deeper release apply slowdown.
    2. Patch the smallest coherent timeout/config/test-shape issue in release apply coverage without weakening the recursive-hook assertion.
    3. Re-run the isolated apply suite and tsc, then record any residual full-gate risk in Findings if the suite still only fails under aggregate load.
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/release/apply.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T15:06:10.353Z — VERIFY — ok
    
    By: CODER
    
    Note: Root cause was a mis-bound timeout constant: RELEASE_APPLY_LONG_TIMEOUT_MS was attached to the neighboring requires --push case while the push-with-no-verify hook test still kept 30000ms. The targeted apply suite, the single failing case, tsc, and package builds are all green after rebinding the timeout to the intended test.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:04:51.759Z, excerpt_hash=sha256:223cdefd4a64da94b93f8f55e80175ce64b6af46a3d8b6b196d1630ae2698237
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix release apply push test timeout binding under full gate

Make the release apply push-with-no-verify coverage use the intended timeout budget in full release:prepublish runs and prove it with isolated apply coverage.

## Scope

- In scope: Make the release apply push-with-no-verify coverage use the intended timeout budget in full release:prepublish runs and prove it with isolated apply coverage.
- Out of scope: unrelated refactors not required for "Fix release apply push test timeout binding under full gate".

## Plan

1. Reproduce the push-with-no-verify timeout under isolated and full release gate conditions to confirm whether the issue is a stale per-test timeout binding or a deeper release apply slowdown.
2. Patch the smallest coherent timeout/config/test-shape issue in release apply coverage without weakening the recursive-hook assertion.
3. Re-run the isolated apply suite and tsc, then record any residual full-gate risk in Findings if the suite still only fails under aggregate load.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/release/apply.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T15:06:10.353Z — VERIFY — ok

By: CODER

Note: Root cause was a mis-bound timeout constant: RELEASE_APPLY_LONG_TIMEOUT_MS was attached to the neighboring requires --push case while the push-with-no-verify hook test still kept 30000ms. The targeted apply suite, the single failing case, tsc, and package builds are all green after rebinding the timeout to the intended test.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T15:04:51.759Z, excerpt_hash=sha256:223cdefd4a64da94b93f8f55e80175ce64b6af46a3d8b6b196d1630ae2698237

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
