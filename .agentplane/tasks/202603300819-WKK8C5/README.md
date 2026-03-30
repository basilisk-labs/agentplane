---
id: "202603300819-WKK8C5"
title: "Make framework task worktrees runnable without manual runtime surprises"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "bootstrap"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T08:20:46.971Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-30T08:44:42.941Z"
  updated_by: "CODER"
  note: "OK: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts --hookTimeout 60000 --testTimeout 60000"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproduce the framework task-worktree runtime/bootstrap failures, then implement a supported fallback or diagnostic path so task lifecycle commands and related hooks do not fail opaquely."
events:
  -
    type: "status"
    at: "2026-03-30T08:21:53.922Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the framework task-worktree runtime/bootstrap failures, then implement a supported fallback or diagnostic path so task lifecycle commands and related hooks do not fail opaquely."
  -
    type: "verify"
    at: "2026-03-30T08:29:11.175Z"
    author: "CODER"
    state: "ok"
    note: "Validated repo-local handoff guidance and hook bootstrap fallback with narrow vitest coverage."
  -
    type: "verify"
    at: "2026-03-30T08:44:42.941Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts --hookTimeout 60000 --testTimeout 60000"
doc_version: 3
doc_updated_at: "2026-03-30T08:44:42.993Z"
doc_updated_by: "CODER"
description: "Remove or reduce the need for AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 and bootstrap guesswork in framework task worktrees by fixing repo-local handoff behavior, diagnostics, or fallback paths so task lifecycle and commit hooks fail less opaquely."
sections:
  Summary: |-
    Make framework task worktrees runnable without manual runtime surprises
    
    Remove or reduce the need for AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 and bootstrap guesswork in framework task worktrees by fixing repo-local handoff behavior, diagnostics, or fallback paths so task lifecycle and commit hooks fail less opaquely.
  Scope: |-
    - In scope: Remove or reduce the need for AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 and bootstrap guesswork in framework task worktrees by fixing repo-local handoff behavior, diagnostics, or fallback paths so task lifecycle and commit hooks fail less opaquely.
    - Out of scope: unrelated refactors not required for "Make framework task worktrees runnable without manual runtime surprises".
  Plan: |-
    1. Reproduce the current framework task-worktree failures around repo-local dist handoff, AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK fallback, and pre-commit/bootstrap usability.
    2. Implement a supported fallback, clearer diagnostics, or bootstrap-aware behavior so framework task worktrees are usable without opaque runtime surprises.
    3. Add or update targeted runtime/handoff tests and verify the improved behavior in a task worktree-like scenario.
  Verify Steps: |-
    1. Reproduce the framework task-worktree path that previously required `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1` or failed on missing local dist. Expected: the resulting behavior is supported and actionable rather than opaque.
    2. Run targeted repo-local handoff/runtime tests. Expected: all updated tests pass.
    3. Validate the touched task-lifecycle or hook path in a framework checkout scenario. Expected: no silent/opaque failure remains for the supported path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T08:29:11.175Z — VERIFY — ok
    
    By: CODER
    
    Note: Validated repo-local handoff guidance and hook bootstrap fallback with narrow vitest coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:21:53.924Z, excerpt_hash=sha256:369b1f6e336cb8f8cdbd1ce7b979defbbd75da063eb2c8f84b686f1c05834eb0
    
    ### 2026-03-30T08:44:42.941Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts --hookTimeout 60000 --testTimeout 60000
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:29:11.178Z, excerpt_hash=sha256:369b1f6e336cb8f8cdbd1ce7b979defbbd75da063eb2c8f84b686f1c05834eb0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make framework task worktrees runnable without manual runtime surprises

Remove or reduce the need for AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 and bootstrap guesswork in framework task worktrees by fixing repo-local handoff behavior, diagnostics, or fallback paths so task lifecycle and commit hooks fail less opaquely.

## Scope

- In scope: Remove or reduce the need for AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 and bootstrap guesswork in framework task worktrees by fixing repo-local handoff behavior, diagnostics, or fallback paths so task lifecycle and commit hooks fail less opaquely.
- Out of scope: unrelated refactors not required for "Make framework task worktrees runnable without manual runtime surprises".

## Plan

1. Reproduce the current framework task-worktree failures around repo-local dist handoff, AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK fallback, and pre-commit/bootstrap usability.
2. Implement a supported fallback, clearer diagnostics, or bootstrap-aware behavior so framework task worktrees are usable without opaque runtime surprises.
3. Add or update targeted runtime/handoff tests and verify the improved behavior in a task worktree-like scenario.

## Verify Steps

1. Reproduce the framework task-worktree path that previously required `AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1` or failed on missing local dist. Expected: the resulting behavior is supported and actionable rather than opaque.
2. Run targeted repo-local handoff/runtime tests. Expected: all updated tests pass.
3. Validate the touched task-lifecycle or hook path in a framework checkout scenario. Expected: no silent/opaque failure remains for the supported path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T08:29:11.175Z — VERIFY — ok

By: CODER

Note: Validated repo-local handoff guidance and hook bootstrap fallback with narrow vitest coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:21:53.924Z, excerpt_hash=sha256:369b1f6e336cb8f8cdbd1ce7b979defbbd75da063eb2c8f84b686f1c05834eb0

### 2026-03-30T08:44:42.941Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/repo-local-handoff.test.ts packages/agentplane/src/cli/pre-commit-hook-script.test.ts --hookTimeout 60000 --testTimeout 60000

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:29:11.178Z, excerpt_hash=sha256:369b1f6e336cb8f8cdbd1ce7b979defbbd75da063eb2c8f84b686f1c05834eb0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
