---
id: "202604092339-Z755FH"
title: "Warn on stale verify metadata during pr update"
result_summary: "integrate: squash task/202604092339-Z755FH/pr-update-stale-verify-warning"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T23:40:25.945Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T23:55:37.055Z"
  updated_by: "CODER"
  note: "Verified: targeted pr-flow stale-verify regression test and eslint passed for pr update warning behavior."
commit:
  hash: "34bdf9a48c5d31408bf11baf4e994491833f8a97"
  message: "📝 Z755FH task: format stale verify warning path"
comments:
  -
    author: "CODER"
    body: "Start: surface stale verify metadata immediately during pr update so operators do not learn about it only from a later pr check failure."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604092339-Z755FH/pr."
events:
  -
    type: "status"
    at: "2026-04-09T23:40:26.415Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: surface stale verify metadata immediately during pr update so operators do not learn about it only from a later pr check failure."
  -
    type: "verify"
    at: "2026-04-09T23:55:37.055Z"
    author: "CODER"
    state: "ok"
    note: "Verified: targeted pr-flow stale-verify regression test and eslint passed for pr update warning behavior."
  -
    type: "status"
    at: "2026-04-10T00:07:34.919Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604092339-Z755FH/pr."
doc_version: 3
doc_updated_at: "2026-04-10T00:07:34.920Z"
doc_updated_by: "INTEGRATOR"
description: "When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later."
sections:
  Summary: |-
    Warn on stale verify metadata during pr update
    
    When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
  Scope: |-
    - In scope: When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
    - Out of scope: unrelated refactors not required for "Warn on stale verify metadata during pr update".
  Plan: "1. Reproduce a branch_pr flow where verify passes, a new commit lands, and pr update refreshes artifacts without surfacing that last_verified_sha is now stale. 2. Add an explicit warning/next-step in pr update (and any auto artifact refresh path that uses the same logic) when head_sha differs from last_verified_sha after refresh. 3. Cover the stale-warning path with regression tests."
  Verify Steps: |-
    1. Verify a task branch, create another commit, and run pr update. Expected: pr update completes but prints an exact rerun-verify warning naming the stale last_verified_sha and current head.
    2. Run pr update when head_sha still matches last_verified_sha. Expected: no stale-verify warning is printed.
    3. Run targeted regression tests. Expected: stale and fresh verify metadata paths are both covered.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T23:55:37.055Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: targeted pr-flow stale-verify regression test and eslint passed for pr update warning behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:40:26.421Z, excerpt_hash=sha256:eff912301bbba4c61201474515fb69dccf3838d91c5d1c6e01bccd77cfbea72a
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Warn on stale verify metadata during pr update

When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.

## Scope

- In scope: When pr update refreshes PR artifacts after branch HEAD advanced beyond last_verified_sha, surface an exact rerun-verify warning instead of silently leaving the stale verify state for pr check to discover later.
- Out of scope: unrelated refactors not required for "Warn on stale verify metadata during pr update".

## Plan

1. Reproduce a branch_pr flow where verify passes, a new commit lands, and pr update refreshes artifacts without surfacing that last_verified_sha is now stale. 2. Add an explicit warning/next-step in pr update (and any auto artifact refresh path that uses the same logic) when head_sha differs from last_verified_sha after refresh. 3. Cover the stale-warning path with regression tests.

## Verify Steps

1. Verify a task branch, create another commit, and run pr update. Expected: pr update completes but prints an exact rerun-verify warning naming the stale last_verified_sha and current head.
2. Run pr update when head_sha still matches last_verified_sha. Expected: no stale-verify warning is printed.
3. Run targeted regression tests. Expected: stale and fresh verify metadata paths are both covered.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T23:55:37.055Z — VERIFY — ok

By: CODER

Note: Verified: targeted pr-flow stale-verify regression test and eslint passed for pr update warning behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T23:40:26.421Z, excerpt_hash=sha256:eff912301bbba4c61201474515fb69dccf3838d91c5d1c6e01bccd77cfbea72a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
