---
id: "202603080913-TJC9WG"
title: "Fix task doc set for Verify Steps section replacement"
result_summary: "Serialized task README updates to prevent lost section edits from concurrent task doc set operations."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T09:14:24.159Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T09:18:49.918Z"
  updated_by: "CODER"
  note: "Task README updates are now serialized, concurrent section writes no longer lose earlier changes, and targeted core tests plus lint/build checks passed."
commit:
  hash: "393d919ea02d159f21e5da21b57a6b8d8eb221d1"
  message: "🧱 core: serialize concurrent task README updates"
comments:
  -
    author: "CODER"
    body: "Start: reproducing and fixing the Verify Steps section replacement bug in task doc set so task verification contracts stay editable and trustworthy."
  -
    author: "CODER"
    body: "Verified: concurrent task README updates are now serialized, the low-level and task-store regressions pass, and the task Verify Steps contract remains editable after repeated updates."
events:
  -
    type: "status"
    at: "2026-03-08T09:14:30.877Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing and fixing the Verify Steps section replacement bug in task doc set so task verification contracts stay editable and trustworthy."
  -
    type: "verify"
    at: "2026-03-08T09:18:49.918Z"
    author: "CODER"
    state: "ok"
    note: "Task README updates are now serialized, concurrent section writes no longer lose earlier changes, and targeted core tests plus lint/build checks passed."
  -
    type: "status"
    at: "2026-03-08T09:19:09.399Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: concurrent task README updates are now serialized, the low-level and task-store regressions pass, and the task Verify Steps contract remains editable after repeated updates."
doc_version: 2
doc_updated_at: "2026-03-08T09:19:09.399Z"
doc_updated_by: "CODER"
description: "Ensure agentplane task doc set updates the Verify Steps section content instead of leaving the seeded template in place."
id_source: "generated"
---
## Summary

Fix task doc set for Verify Steps section replacement.

## Scope

- In scope: reproduce and fix Verify Steps section replacement via `agentplane task doc set`.
- Out of scope: broader task-doc UX redesign.

## Plan

1. Reproduce the bug in an isolated test.
2. Fix task doc helpers so Verify Steps replacement behaves like other sections.
3. Run targeted verification and push immediately after finish.

## Risks

- Risk: breaking full-doc updates or other section replacements.
- Mitigation: cover both Verify Steps and ordinary section paths in tests.

## Verify Steps

1. bunx vitest run packages/core/src/tasks/task-readme-io.test.ts packages/core/src/tasks/task-store.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
2. bun run lint:core -- packages/core/src/tasks/task-readme-io.ts packages/core/src/tasks/task-readme-io.test.ts packages/core/src/tasks/task-store.test.ts
3. bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
4. agentplane task doc show 202603080913-TJC9WG --section "Verify Steps"

## Verification

### Plan

Run the targeted task-doc and lifecycle suites after the fix.

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T09:18:49.918Z — VERIFY — ok

By: CODER

Note: Task README updates are now serialized, concurrent section writes no longer lose earlier changes, and targeted core tests plus lint/build checks passed.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T09:18:37.926Z, excerpt_hash=sha256:c6c674193e209a5880ec727ebcfef21873b77d308967f1fc350ee4fa0a3fe28a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task commit(s).
- Re-run the targeted task-doc verification suite.

## Notes

Observed on task 202603080903-A16E7Z: `task doc set` updated Plan and Notes, but left the seeded Verify Steps template unchanged.
