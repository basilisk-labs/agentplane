---
id: "202603071647-Y4BZ1T"
title: "Implement repo-local binary handoff in wrapper"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202603071647-M0Q79C"
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-07T16:50:44.229Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved: wire the wrapper to exec into the repo-local binary with opt-out and recursion guard."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: use the new framework-checkout context helper to hand off PATH-launched agentplane to the repo-local binary by default inside this framework checkout."
events:
  -
    type: "status"
    at: "2026-03-07T16:50:44.343Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: use the new framework-checkout context helper to hand off PATH-launched agentplane to the repo-local binary by default inside this framework checkout."
doc_version: 2
doc_updated_at: "2026-03-07T16:50:44.343Z"
doc_updated_by: "CODER"
description: "When PATH-launched agentplane runs inside the framework checkout, exec into the repo-local binary by default while preserving recursion guards and explicit opt-out."
id_source: "generated"
---
## Summary

Implement repo-local binary handoff in wrapper

When PATH-launched agentplane runs inside the framework checkout, exec into the repo-local binary by default while preserving recursion guards and explicit opt-out.

## Scope

- In scope: When PATH-launched agentplane runs inside the framework checkout, exec into the repo-local binary by default while preserving recursion guards and explicit opt-out..
- Out of scope: unrelated refactors not required for "Implement repo-local binary handoff in wrapper".

## Plan

1. Use the new checkout helper in the global wrapper to exec into the repo-local binary by default inside the framework checkout. 2. Preserve stale-build checks, commit-msg fast-path, recursion guard, and add an explicit opt-out env. 3. Keep non-framework and already-local invocations unchanged.

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
