---
id: "202603071647-Y4BZ1T"
title: "Implement repo-local binary handoff in wrapper"
result_summary: "PATH-launched agentplane now hands off to the repo-local binary inside the framework checkout by default while preserving explicit global opt-out and recursion protection."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-07T16:52:35.346Z"
  updated_by: "REVIEWER"
  note: "Verified: the wrapper now delegates PATH-launched framework-checkout invocations to the repo-local binary by default, with explicit opt-out and recursion guard."
commit:
  hash: "ec5b7b4146328d6ec437e50c85498e917557e3c2"
  message: "🧭 Y4BZ1T task: hand off to repo-local binary"
comments:
  -
    author: "CODER"
    body: "Start: use the new framework-checkout context helper to hand off PATH-launched agentplane to the repo-local binary by default inside this framework checkout."
  -
    author: "CODER"
    body: "Verified: wired repo-local binary handoff into the global wrapper with opt-out and recursion protection."
events:
  -
    type: "status"
    at: "2026-03-07T16:50:44.343Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: use the new framework-checkout context helper to hand off PATH-launched agentplane to the repo-local binary by default inside this framework checkout."
  -
    type: "verify"
    at: "2026-03-07T16:52:35.346Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified: the wrapper now delegates PATH-launched framework-checkout invocations to the repo-local binary by default, with explicit opt-out and recursion guard."
  -
    type: "status"
    at: "2026-03-07T16:52:35.569Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: wired repo-local binary handoff into the global wrapper with opt-out and recursion protection."
doc_version: 2
doc_updated_at: "2026-03-07T16:52:35.569Z"
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
#### 2026-03-07T16:52:35.346Z — VERIFY — ok

By: REVIEWER

Note: Verified: the wrapper now delegates PATH-launched framework-checkout invocations to the repo-local binary by default, with explicit opt-out and recursion guard.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-07T16:50:44.343Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
