---
id: "202604092006-NK7RVS"
title: "Make fresh-worktree hook runner degrade cleanly before bootstrap"
result_summary: "Merged via PR #227. Fresh framework worktrees now stop with deterministic bootstrap guidance instead of leaking raw ERR_MODULE_NOT_FOUND traces from hook-driven repo-local handoff."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "hooks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T20:35:12.896Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T21:00:01.014Z"
  updated_by: "INTEGRATOR"
  note: "Verified PR #227: fresh worktrees now fail with bootstrap guidance before raw module-resolution errors, and stale-dist warn-and-run fixtures still pass unchanged."
commit:
  hash: "7554fc6c89211e10ae7166c3e8aaa140a09a3273"
  message: "✅ 5HP443 close: Merged via PR #226. agentplane pr open now uses ghEnv for remote lookup/create, so dote... (202604092006-5HP443) [github]"
comments:
  -
    author: "CODER"
    body: "Start: make fresh framework worktree hook/runtime delegation fail cleanly before bootstrap and verify both pre-bootstrap and post-bootstrap behavior."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #227 merged on GitHub after green hosted checks; close recorded on base after rebuilding the repo-local runtime."
events:
  -
    type: "status"
    at: "2026-04-09T20:35:30.914Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make fresh framework worktree hook/runtime delegation fail cleanly before bootstrap and verify both pre-bootstrap and post-bootstrap behavior."
  -
    type: "verify"
    at: "2026-04-09T21:00:01.014Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified PR #227: fresh worktrees now fail with bootstrap guidance before raw module-resolution errors, and stale-dist warn-and-run fixtures still pass unchanged."
  -
    type: "status"
    at: "2026-04-09T21:00:01.999Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #227 merged on GitHub after green hosted checks; close recorded on base after rebuilding the repo-local runtime."
doc_version: 3
doc_updated_at: "2026-04-09T21:00:01.999Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the hook/runtime path in a fresh framework worktree so commit hooks do not crash with ERR_MODULE_NOT_FOUND before bootstrap; either detect unbootstrapped repo-local runtime and fall back cleanly or emit deterministic guidance without a Node stack trace."
sections:
  Summary: |-
    Make fresh-worktree hook runner degrade cleanly before bootstrap
    
    Fix the hook/runtime path in a fresh framework worktree so commit hooks do not crash with ERR_MODULE_NOT_FOUND before bootstrap; either detect unbootstrapped repo-local runtime and fall back cleanly or emit deterministic guidance without a Node stack trace.
  Scope: |-
    - In scope: Fix the hook/runtime path in a fresh framework worktree so commit hooks do not crash with ERR_MODULE_NOT_FOUND before bootstrap; either detect unbootstrapped repo-local runtime and fall back cleanly or emit deterministic guidance without a Node stack trace.
    - Out of scope: unrelated refactors not required for "Make fresh-worktree hook runner degrade cleanly before bootstrap".
  Plan: "1. Detect the unbootstrapped repo-local runtime path used by fresh framework worktrees before hook delegation. 2. Replace the raw module-resolution crash with deterministic guidance or a safe fallback path. 3. Verify the change with targeted tests and a real fresh-worktree reproduction."
  Verify Steps: |-
    1. Reproduce the fresh framework-worktree hook path before bootstrap. Expected: hooks no longer crash with raw `ERR_MODULE_NOT_FOUND`; they emit deterministic bootstrap guidance or a clean fallback.
    2. Run targeted hook/runtime tests. Expected: the fresh-worktree path degrades cleanly before bootstrap and the bootstrapped path still passes.
    3. Validate the real workflow in a fresh worktree. Expected: commit hooks fail cleanly before `bun run framework:dev:bootstrap` and succeed after bootstrap without manual environment hacks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T21:00:01.014Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Verified PR #227: fresh worktrees now fail with bootstrap guidance before raw module-resolution errors, and stale-dist warn-and-run fixtures still pass unchanged.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T20:35:30.920Z, excerpt_hash=sha256:26332a70ff293f6ff8354fcae9270be067b3226f0efc021d0683d75db3697e03
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make fresh-worktree hook runner degrade cleanly before bootstrap

Fix the hook/runtime path in a fresh framework worktree so commit hooks do not crash with ERR_MODULE_NOT_FOUND before bootstrap; either detect unbootstrapped repo-local runtime and fall back cleanly or emit deterministic guidance without a Node stack trace.

## Scope

- In scope: Fix the hook/runtime path in a fresh framework worktree so commit hooks do not crash with ERR_MODULE_NOT_FOUND before bootstrap; either detect unbootstrapped repo-local runtime and fall back cleanly or emit deterministic guidance without a Node stack trace.
- Out of scope: unrelated refactors not required for "Make fresh-worktree hook runner degrade cleanly before bootstrap".

## Plan

1. Detect the unbootstrapped repo-local runtime path used by fresh framework worktrees before hook delegation. 2. Replace the raw module-resolution crash with deterministic guidance or a safe fallback path. 3. Verify the change with targeted tests and a real fresh-worktree reproduction.

## Verify Steps

1. Reproduce the fresh framework-worktree hook path before bootstrap. Expected: hooks no longer crash with raw `ERR_MODULE_NOT_FOUND`; they emit deterministic bootstrap guidance or a clean fallback.
2. Run targeted hook/runtime tests. Expected: the fresh-worktree path degrades cleanly before bootstrap and the bootstrapped path still passes.
3. Validate the real workflow in a fresh worktree. Expected: commit hooks fail cleanly before `bun run framework:dev:bootstrap` and succeed after bootstrap without manual environment hacks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T21:00:01.014Z — VERIFY — ok

By: INTEGRATOR

Note: Verified PR #227: fresh worktrees now fail with bootstrap guidance before raw module-resolution errors, and stale-dist warn-and-run fixtures still pass unchanged.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T20:35:30.920Z, excerpt_hash=sha256:26332a70ff293f6ff8354fcae9270be067b3226f0efc021d0683d75db3697e03

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
