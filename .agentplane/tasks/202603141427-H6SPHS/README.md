---
id: "202603141427-H6SPHS"
title: "Fix task export and task doc regressions blocking v0.3.7"
result_summary: "deterministic task export and task doc show blockers for v0.3.7 are resolved"
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
depends_on: []
tags:
  - "code"
  - "release"
verify:
  - "bun x vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts"
  - "bun x tsc -b packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-03-14T14:27:47.787Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-14T14:30:32.946Z"
  updated_by: "CODER"
  note: "Verified: updated the stale export expectation to canonical doc_version=3 and fixed task doc show so blank sections report 'section has no content' instead of emitting an empty line; targeted vitest and TypeScript checks passed."
commit:
  hash: "379da2a7ef7c62eee2abdf1fad2fc42edd1182c9"
  message: "🩹 H6SPHS code: fix release-blocking task doc regressions"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the deterministic release-gate regressions in task export normalization and task doc show output, align them with the current README v3 canonical-state contract, and rerun the targeted suites before moving on to the timeout families."
  -
    author: "CODER"
    body: "Verified: the release-blocking task export and task doc show regressions are resolved, targeted tests pass, and the timeout-class blockers remain isolated to follow-up tasks."
events:
  -
    type: "status"
    at: "2026-03-14T14:27:54.119Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the deterministic release-gate regressions in task export normalization and task doc show output, align them with the current README v3 canonical-state contract, and rerun the targeted suites before moving on to the timeout families."
  -
    type: "verify"
    at: "2026-03-14T14:30:32.946Z"
    author: "CODER"
    state: "ok"
    note: "Verified: updated the stale export expectation to canonical doc_version=3 and fixed task doc show so blank sections report 'section has no content' instead of emitting an empty line; targeted vitest and TypeScript checks passed."
  -
    type: "status"
    at: "2026-03-14T14:30:56.177Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: the release-blocking task export and task doc show regressions are resolved, targeted tests pass, and the timeout-class blockers remain isolated to follow-up tasks."
doc_version: 3
doc_updated_at: "2026-03-14T14:30:56.179Z"
doc_updated_by: "CODER"
description: "Resolve the deterministic release-gate regressions in task export normalization and task doc show output so the release line no longer disagrees with the README v3/canonical-state behavior introduced in 0.3.7."
sections:
  Summary: |-
    Fix task export and task doc regressions blocking v0.3.7
    
    Resolve the deterministic release-gate regressions in task export normalization and task doc show output so the release line no longer disagrees with the README v3/canonical-state behavior introduced in 0.3.7.
  Scope: |-
    - In scope: Resolve the deterministic release-gate regressions in task export normalization and task doc show output so the release line no longer disagrees with the README v3/canonical-state behavior introduced in 0.3.7.
    - Out of scope: unrelated refactors not required for "Fix task export and task doc regressions blocking v0.3.7".
  Plan: "Plan: reproduce the deterministic failures in task-backend.test.ts and workflow.task-doc.test.ts, align the runtime behavior or stale expectations with the canonical README v3/task-state contract, rerun the targeted regression tests, and keep the fix narrow to release-blocking semantics."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-14T14:30:32.946Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: updated the stale export expectation to canonical doc_version=3 and fixed task doc show so blank sections report 'section has no content' instead of emitting an empty line; targeted vitest and TypeScript checks passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T14:27:54.121Z, excerpt_hash=sha256:0606f0f5d8ff1eb24b788dbc2c1e1bd28a5f029c78e193b51fc43df06d8cd58d
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix task export and task doc regressions blocking v0.3.7

Resolve the deterministic release-gate regressions in task export normalization and task doc show output so the release line no longer disagrees with the README v3/canonical-state behavior introduced in 0.3.7.

## Scope

- In scope: Resolve the deterministic release-gate regressions in task export normalization and task doc show output so the release line no longer disagrees with the README v3/canonical-state behavior introduced in 0.3.7.
- Out of scope: unrelated refactors not required for "Fix task export and task doc regressions blocking v0.3.7".

## Plan

Plan: reproduce the deterministic failures in task-backend.test.ts and workflow.task-doc.test.ts, align the runtime behavior or stale expectations with the canonical README v3/task-state contract, rerun the targeted regression tests, and keep the fix narrow to release-blocking semantics.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/workflow.task-doc.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun x tsc -b packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-14T14:30:32.946Z — VERIFY — ok

By: CODER

Note: Verified: updated the stale export expectation to canonical doc_version=3 and fixed task doc show so blank sections report 'section has no content' instead of emitting an empty line; targeted vitest and TypeScript checks passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-14T14:27:54.121Z, excerpt_hash=sha256:0606f0f5d8ff1eb24b788dbc2c1e1bd28a5f029c78e193b51fc43df06d8cd58d

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
