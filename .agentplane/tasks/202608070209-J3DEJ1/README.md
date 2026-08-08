---
id: "202608070209-J3DEJ1"
title: "Harden automatic task intake against unknown intent and stale locks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202608061646-30TKV4"
tags:
  - "code"
verify:
  - "bunx vitest --config vitest.workspace.ts run packages/core/src/tasks/task-readme-io.test.ts packages/agentplane/src/runtime/task-routing/resolve.test.ts packages/agentplane/src/cli/run-cli.core.tasks.user-create.test.ts"
  - "bun run typecheck"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-07T02:09:25.021Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "1f452c38f24122aa1ce00e9ba7c38afc388ff8a6"
  message: "🐛 J3DEJ1 code: recover stale creation locks"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: unknown natural-language outcomes now persist an explicit unknown mutation scope and require confirmation; stale task-creation locks recover through serialized claims while unverifiable locks remain fail-closed. Focused 18/18, critical CLI 84/84, core 394/394, typecheck, and ci:contract passed."
events:
  -
    type: "status"
    at: "2026-08-08T02:08:29.760Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-08T02:25:11.783Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: unknown natural-language outcomes now persist an explicit unknown mutation scope and require confirmation; stale task-creation locks recover through serialized claims while unverifiable locks remain fail-closed. Focused 18/18, critical CLI 84/84, core 394/394, typecheck, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-08-08T02:25:11.783Z"
doc_updated_by: "CODER"
description: "Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5."
sections:
  Summary: |-
    Harden automatic task intake against unknown intent and stale locks

    Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
  Scope: |-
    - In scope: Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
    - Out of scope: unrelated refactors not required for "Harden automatic task intake against unknown intent and stale locks".
  Plan: "1. Replace the unmatched-intent direct fallback with an explicit unknown/confirmation route while preserving explainable recognized classifications. 2. Replace or harden the repository-wide creation lock so an interrupted process cannot block future task creation, without reintroducing duplicate-ID races. 3. Add focused classification, interruption-recovery, duplicate, and CLI regression tests. 4. Run focused tests plus typecheck, formatting, lint, Knip, compatibility, Windows, and hosted PR checks."
  Verify Steps: |-
    1. Run the focused core lock, route resolver, and user-first CLI suites. Expected: unknown outcomes require confirmation and branch isolation; explicit code outcomes retain the direct route; stale same-host process locks recover; malformed or unverifiable locks remain fail-closed; concurrent creators produce one task.
    2. Run `bun run typecheck`. Expected: all workspace packages typecheck.
    3. Run `bun run ci:contract`. Expected: formatting, schemas, compatibility, architecture, clone, Knip, and coverage contract gates pass.
    4. Run hosted Windows, unit, static, critical, contract, coverage, docs, and CodeQL checks on the exact PR head. Expected: all required checks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "17632349ed759437d905d0945933c3d99ad3fea8"
    version: 1
id_source: "generated"
---
## Summary

Harden automatic task intake against unknown intent and stale locks

Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.

## Scope

- In scope: Treat unmatched natural-language outcomes as unknown instead of safe direct; make repository-wide task creation locking safely recoverable after process interruption; add regression and recovery tests before 0.7.5.
- Out of scope: unrelated refactors not required for "Harden automatic task intake against unknown intent and stale locks".

## Plan

1. Replace the unmatched-intent direct fallback with an explicit unknown/confirmation route while preserving explainable recognized classifications. 2. Replace or harden the repository-wide creation lock so an interrupted process cannot block future task creation, without reintroducing duplicate-ID races. 3. Add focused classification, interruption-recovery, duplicate, and CLI regression tests. 4. Run focused tests plus typecheck, formatting, lint, Knip, compatibility, Windows, and hosted PR checks.

## Verify Steps

1. Run the focused core lock, route resolver, and user-first CLI suites. Expected: unknown outcomes require confirmation and branch isolation; explicit code outcomes retain the direct route; stale same-host process locks recover; malformed or unverifiable locks remain fail-closed; concurrent creators produce one task.
2. Run `bun run typecheck`. Expected: all workspace packages typecheck.
3. Run `bun run ci:contract`. Expected: formatting, schemas, compatibility, architecture, clone, Knip, and coverage contract gates pass.
4. Run hosted Windows, unit, static, critical, contract, coverage, docs, and CodeQL checks on the exact PR head. Expected: all required checks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
