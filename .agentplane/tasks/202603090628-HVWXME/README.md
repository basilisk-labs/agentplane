---
id: "202603090628-HVWXME"
title: "Auto-export tasks snapshot after task migrate-doc"
result_summary: "Made task migrate-doc auto-export .agentplane/tasks.json for local backend after successful migration."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T06:29:19.557Z"
  updated_by: "ORCHESTRATOR"
  note: "Install-first hotfix approved; keep scope limited to local-backend auto-export and regression coverage."
verification:
  state: "ok"
  updated_at: "2026-03-09T06:30:43.264Z"
  updated_by: "CODER"
  note: "task migrate-doc now refreshes the local tasks export snapshot automatically; migrate-doc tests, lint:core, and agentplane build all passed."
commit:
  hash: "ee5ebc01f10b2455f11055b96b9e731e2ad3ebbc"
  message: "🐛 HVWXME task: auto-export after migrate-doc"
comments:
  -
    author: "CODER"
    body: "Verified: task migrate-doc now refreshes the local tasks export snapshot automatically, so doctor sees README v3 migration without a separate task export step."
events:
  -
    type: "verify"
    at: "2026-03-09T06:30:43.264Z"
    author: "CODER"
    state: "ok"
    note: "task migrate-doc now refreshes the local tasks export snapshot automatically; migrate-doc tests, lint:core, and agentplane build all passed."
  -
    type: "status"
    at: "2026-03-09T06:31:16.510Z"
    author: "CODER"
    from: "TODO"
    to: "DONE"
    note: "Verified: task migrate-doc now refreshes the local tasks export snapshot automatically, so doctor sees README v3 migration without a separate task export step."
doc_version: 3
doc_updated_at: "2026-03-09T06:31:16.510Z"
doc_updated_by: "CODER"
description: "Make task migrate-doc refresh .agentplane/tasks.json automatically for local backend so doctor sees README v3 migration immediately without a separate task export step."
id_source: "generated"
---
## Summary

Auto-export tasks snapshot after task migrate-doc

Make task migrate-doc refresh .agentplane/tasks.json automatically for local backend so doctor sees README v3 migration immediately without a separate task export step.

## Scope

- In scope: Make task migrate-doc refresh .agentplane/tasks.json automatically for local backend so doctor sees README v3 migration immediately without a separate task export step.
- Out of scope: unrelated refactors not required for "Auto-export tasks snapshot after task migrate-doc".

## Plan

1. Update task migrate-doc to refresh .agentplane/tasks.json automatically when the active backend is local and exportTasksJson is available. 2. Add a regression test that proves migrate-doc updates a stale local tasks export snapshot to doc_version=3 without a separate task export command. 3. Run targeted task migration tests plus lint/build, then verify and finish the hotfix task.

## Verify Steps

1. Run bunx vitest run packages/agentplane/src/commands/task/migrate-doc.test.ts. Expected: migration tests pass and cover automatic refresh of .agentplane/tasks.json for local backend.
2. Run bun run lint:core -- packages/agentplane/src/commands/task/migrate-doc.ts packages/agentplane/src/commands/task/migrate-doc.test.ts. Expected: no lint errors.
3. Run bun run --filter=agentplane build. Expected: build succeeds after the migrate-doc hotfix.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-09T06:30:43.264Z — VERIFY — ok

By: CODER

Note: task migrate-doc now refreshes the local tasks export snapshot automatically; migrate-doc tests, lint:core, and agentplane build all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T06:29:11.608Z, excerpt_hash=sha256:6c9f2fe5ae7a562239b6aa8a8407139373bf1aa3d64967d35ac8c25f8d87c035

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
