---
id: "202603081155-8GENY7"
title: "Track README v3 task doc template source file"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T11:55:30.997Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T11:56:27.901Z"
  updated_by: "CODER"
  note: "Tracked HEAD task commands already imported ./doc-template.js; adding packages/agentplane/src/commands/task/doc-template.ts closes that rollout gap. agentplane build, focused README v3 task tests, and lint:core for touched task command paths all passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add the missing tracked doc-template.ts source so README v3 task commands build correctly from a clean checkout and in CI."
events:
  -
    type: "status"
    at: "2026-03-08T11:55:34.492Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add the missing tracked doc-template.ts source so README v3 task commands build correctly from a clean checkout and in CI."
  -
    type: "verify"
    at: "2026-03-08T11:56:27.901Z"
    author: "CODER"
    state: "ok"
    note: "Tracked HEAD task commands already imported ./doc-template.js; adding packages/agentplane/src/commands/task/doc-template.ts closes that rollout gap. agentplane build, focused README v3 task tests, and lint:core for touched task command paths all passed."
doc_version: 3
doc_updated_at: "2026-03-08T11:56:27.902Z"
doc_updated_by: "CODER"
description: "Add the missing tracked doc-template.ts source used by README v3 task commands so framework checkouts and CI do not import a file that exists only locally."
id_source: "generated"
---
## Summary

Track README v3 task doc template source file

Add the missing tracked doc-template.ts source used by README v3 task commands so framework checkouts and CI do not import a file that exists only locally.

## Scope

- In scope: Add the missing tracked doc-template.ts source used by README v3 task commands so framework checkouts and CI do not import a file that exists only locally..
- Out of scope: unrelated refactors not required for "Track README v3 task doc template source file".

## Plan

1. Confirm that tracked task command sources on HEAD import ./doc-template.js while doc-template.ts is missing from git, and treat the missing tracked source as the rollout defect to fix. 2. Add the missing packages/agentplane/src/commands/task/doc-template.ts source file to git without changing its implementation semantics. 3. Rebuild agentplane and run focused task-command checks so the repo can compile from a clean checkout that includes the tracked template source.

## Verify Steps

1. Inspect the tracked task command sources on HEAD. Expected: they import ./doc-template.js and the missing tracked source is the only rollout defect being fixed. 2. Build agentplane from source. Expected: the build succeeds with packages/agentplane/src/commands/task/doc-template.ts present as tracked input. 3. Run focused task command tests. Expected: README v3 task creation and migration paths pass without import or template regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T11:56:27.901Z — VERIFY — ok

By: CODER

Note: Tracked HEAD task commands already imported ./doc-template.js; adding packages/agentplane/src/commands/task/doc-template.ts closes that rollout gap. agentplane build, focused README v3 task tests, and lint:core for touched task command paths all passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-08T11:55:34.492Z, excerpt_hash=sha256:0961f7327ac9a07644ee5bb0e8f66deaf8a10bf1b9f6341b3ba7a8a75fd1f0f8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
