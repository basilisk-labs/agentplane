---
id: "202603071639-4MWWFW"
title: "Prefer repo-local binary inside framework checkout"
result_summary: "Closed as duplicate of 202603071647-M0Q79C."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:39:48.928Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: route framework-checkout invocations through the repo-local binary with regression coverage."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inspect the global bin wrapper and make PATH-launched agentplane hand off to the repo-local binary automatically inside this framework checkout."
  -
    author: "ORCHESTRATOR"
    body: "Verified: 202603071639-4MWWFW is a bookkeeping duplicate of 202603071647-M0Q79C (Detect framework checkout and prefer repo-local agentplane); no code/config changes are expected in this task and closure is recorded as no-op.\n\nReason: Superseded by the decomposed repo-local handoff task graph after the exploratory wrapper analysis was interrupted before implementation."
events:
  -
    type: "status"
    at: "2026-03-07T16:39:49.045Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inspect the global bin wrapper and make PATH-launched agentplane hand off to the repo-local binary automatically inside this framework checkout."
  -
    type: "status"
    at: "2026-03-07T16:47:27.089Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: 202603071639-4MWWFW is a bookkeeping duplicate of 202603071647-M0Q79C (Detect framework checkout and prefer repo-local agentplane); no code/config changes are expected in this task and closure is recorded as no-op.\n\nReason: Superseded by the decomposed repo-local handoff task graph after the exploratory wrapper analysis was interrupted before implementation."
doc_version: 2
doc_updated_at: "2026-03-07T16:47:27.089Z"
doc_updated_by: "ORCHESTRATOR"
description: "When agentplane from PATH is launched inside the framework repository checkout, route execution through the repo-local binary instead of continuing with the global install warning path."
id_source: "generated"
---
## Summary

Prefer repo-local binary inside framework checkout

When agentplane from PATH is launched inside the framework repository checkout, route execution through the repo-local binary instead of continuing with the global install warning path.

## Scope

- In scope: When agentplane from PATH is launched inside the framework repository checkout, route execution through the repo-local binary instead of continuing with the global install warning path..
- Out of scope: unrelated refactors not required for "Prefer repo-local binary inside framework checkout".

## Plan

1. Inspect the global bin wrapper and decide the exact repo-checkout detection plus handoff conditions for switching to the repo-local binary. 2. Implement a safe handoff so PATH-launched agentplane inside this framework checkout executes the local binary while preserving stale-build protection and recursion guards. 3. Add regression tests for repo-local handoff behavior, update docs/help text if startup guidance changes, then run targeted CLI and bin checks.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
