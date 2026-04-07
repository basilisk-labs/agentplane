---
id: "202604070755-FXWXDS"
title: "Reduce stale-build false positives after protected-main sync"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runtime"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-07T16:47:05.218Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-07T16:51:21.539Z"
  updated_by: "CODER"
  note: "Targeted stale-dist tests passed; allowlisted task-artifact commands now warn-and-run while finish/work-start remain strict."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement safe stale-dist allowlist for task-artifact lifecycle commands after protected-main sync."
events:
  -
    type: "status"
    at: "2026-04-07T16:47:58.623Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement safe stale-dist allowlist for task-artifact lifecycle commands after protected-main sync."
  -
    type: "verify"
    at: "2026-04-07T16:51:21.539Z"
    author: "CODER"
    state: "ok"
    note: "Targeted stale-dist tests passed; allowlisted task-artifact commands now warn-and-run while finish/work-start remain strict."
doc_version: 3
doc_updated_at: "2026-04-07T16:51:21.548Z"
doc_updated_by: "CODER"
description: "Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current."
sections:
  Summary: |-
    Reduce stale-build false positives after protected-main sync
    
    Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current.
  Scope: |-
    - In scope: Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current.
    - Out of scope: unrelated refactors not required for "Reduce stale-build false positives after protected-main sync".
  Plan: |-
    1. Allow only safe task-artifact commands under stale-dist.
    2. Keep finish and other risky mutators strict.
    3. Add CLI policy and end-to-end regression tests.
  Verify Steps: |-
    1. Simulate a stale repo-local build and run task-artifact lifecycle commands like `agentplane task plan set` and `agentplane verify`. Expected: they warn about stale build, then continue without forcing bootstrap.
    2. Simulate a stale repo-local build and run a still-risky command like `agentplane finish` or another non-allowlisted mutator. Expected: the command remains blocked until `bun run framework:dev:bootstrap` is executed.
    3. Run the targeted stale-dist policy and CLI guard tests. Expected: the updated allowlist behavior passes without widening the unsafe surface beyond the approved commands.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-07T16:51:21.539Z — VERIFY — ok
    
    By: CODER
    
    Note: Targeted stale-dist tests passed; allowlisted task-artifact commands now warn-and-run while finish/work-start remain strict.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T16:47:58.642Z, excerpt_hash=sha256:55a9b8562b48b84723dfdfa3020dc2ca6ad6e8ce3f914c5e2e1c1f799e819af5
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Reduce stale-build false positives after protected-main sync

Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current.

## Scope

- In scope: Stop repo-local stale-build guards from forcing repeated framework bootstrap after merge and pull paths when the effective source/runtime state is already current.
- Out of scope: unrelated refactors not required for "Reduce stale-build false positives after protected-main sync".

## Plan

1. Allow only safe task-artifact commands under stale-dist.
2. Keep finish and other risky mutators strict.
3. Add CLI policy and end-to-end regression tests.

## Verify Steps

1. Simulate a stale repo-local build and run task-artifact lifecycle commands like `agentplane task plan set` and `agentplane verify`. Expected: they warn about stale build, then continue without forcing bootstrap.
2. Simulate a stale repo-local build and run a still-risky command like `agentplane finish` or another non-allowlisted mutator. Expected: the command remains blocked until `bun run framework:dev:bootstrap` is executed.
3. Run the targeted stale-dist policy and CLI guard tests. Expected: the updated allowlist behavior passes without widening the unsafe surface beyond the approved commands.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-07T16:51:21.539Z — VERIFY — ok

By: CODER

Note: Targeted stale-dist tests passed; allowlisted task-artifact commands now warn-and-run while finish/work-start remain strict.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-07T16:47:58.642Z, excerpt_hash=sha256:55a9b8562b48b84723dfdfa3020dc2ca6ad6e8ce3f914c5e2e1c1f799e819af5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
