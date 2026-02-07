---
id: "202602071657-RSDBQE"
title: "2-step verification + spike->implementation (tracking)"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "roadmap"
  - "epic"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:02:49.383Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T18:38:24.449Z"
  updated_by: "ORCHESTRATOR"
  note: "All dependent tasks finished"
commit:
  hash: "ed3c3581d842b953de4a1cf3a171c4a4c8ff50db"
  message: "✅ AJX423 close: record task finish metadata"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: decomposed the roadmap into atomic tasks and will execute them sequentially with per-task commits."
  -
    author: "ORCHESTRATOR"
    body: "Verified: Completed all subtasks (templates, gates, derive/verify-show, docs, config, tests); bun run test:fast, bun run test:cli:core, and bun run lint passed."
doc_version: 2
doc_updated_at: "2026-02-07T18:38:31.571Z"
doc_updated_by: "ORCHESTRATOR"
description: "Tracking task for implementing ex-ante Verify Steps + ex-post Verification, plus spike->implementation flow, without breaking default CLI."
---
## Summary

Tracking: implement two-stage verification (Verify Steps ex-ante + Verification ex-post) and spike -> implementation flow with gates, UX commands, config knobs, and tests.

## Scope

- Task README templates (scaffold)
- Verify Steps gates on plan approve / start (when plan approval is disabled)
- verify-record adds VerifyStepsRef
- UX commands: task verify-show, task derive
- Config knobs: tasks.verify.*
- Docs + tests

## Plan

1) Create atomic tasks for the roadmap with explicit dependencies.
2) Ensure tasks are materialized under .agentplane/tasks/<id>/README.md and committed.
3) Keep this tracking task open until all subtasks are DONE.

## Risks

- Behavior changes in plan approval/start for verify-required tags.
- Potential doc drift if help/guide are not updated alongside CLI changes.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:02:59.135Z — VERIFY — ok

By: ORCHESTRATOR

Note: Created tracking + 21 dependent tasks; ready to proceed with implementation.

#### 2026-02-07T18:38:24.449Z — VERIFY — ok

By: ORCHESTRATOR

Note: All dependent tasks finished

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-07T18:38:07.585Z, excerpt_hash=sha256:missing

Details:

bun run test:fast (pass); bun run test:cli:core (pass); bun run lint (pass)

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the commits associated with this epic and its subtasks.
