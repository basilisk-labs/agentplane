---
id: "202605281707-7FSSSP"
title: "Evaluator bounded rework MVP"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "lifecycle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-28T17:08:39.383Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T17:22:25.316Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: evaluator rework verdict now requires --rework-context and reports rework_context in quality artifacts. Scope: evaluator rework context MVP."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing evaluator bounded rework semantics as an included task in the approved v0.6.12 agent-efficiency batch worktree."
events:
  -
    type: "status"
    at: "2026-05-28T17:09:46.076Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing evaluator bounded rework semantics as an included task in the approved v0.6.12 agent-efficiency batch worktree."
  -
    type: "verify"
    at: "2026-05-28T17:22:25.316Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: evaluator rework verdict now requires --rework-context and reports rework_context in quality artifacts. Scope: evaluator rework context MVP."
doc_version: 3
doc_updated_at: "2026-05-28T17:22:25.354Z"
doc_updated_by: "CODER"
description: "Add machine-readable evaluator rework context and bounded retry semantics for runner-driven tasks."
sections:
  Summary: |-
    Evaluator bounded rework MVP

    Add machine-readable evaluator rework context and bounded retry semantics for runner-driven tasks.
  Scope: |-
    - In scope: Add machine-readable evaluator rework context and bounded retry semantics for runner-driven tasks.
    - Out of scope: unrelated refactors not required for "Evaluator bounded rework MVP".
  Plan: "Implement bounded evaluator rework MVP: structured rework context, attempt accounting, and explicit blocked transition once the configured rework limit is exceeded. Preserve existing evaluator verdict compatibility."
  Verify Steps: "1. Run evaluator command tests for pass, rework, and blocked-after-limit behavior. 2. Run lifecycle verify tests covering verification.attempts semantics. 3. Run task README projection tests for structured rework context."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T17:22:25.316Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: evaluator rework verdict now requires --rework-context and reports rework_context in quality artifacts. Scope: evaluator rework context MVP.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:46.076Z, excerpt_hash=sha256:51f6483b2bfc0102f565366df65f9dbbcf809121a6c42c4acab3c6e06c0ca1d7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-7FSSSP/blueprint/resolved-snapshot.json
    - old_digest: c936b90b798eb562ce47647b552ecd9c91345ad8898a2e5165ff8c814d5e6767
    - current_digest: c936b90b798eb562ce47647b552ecd9c91345ad8898a2e5165ff8c814d5e6767
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605281707-7FSSSP

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Evaluator bounded rework MVP

Add machine-readable evaluator rework context and bounded retry semantics for runner-driven tasks.

## Scope

- In scope: Add machine-readable evaluator rework context and bounded retry semantics for runner-driven tasks.
- Out of scope: unrelated refactors not required for "Evaluator bounded rework MVP".

## Plan

Implement bounded evaluator rework MVP: structured rework context, attempt accounting, and explicit blocked transition once the configured rework limit is exceeded. Preserve existing evaluator verdict compatibility.

## Verify Steps

1. Run evaluator command tests for pass, rework, and blocked-after-limit behavior. 2. Run lifecycle verify tests covering verification.attempts semantics. 3. Run task README projection tests for structured rework context.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T17:22:25.316Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts --config vitest.workspace.ts; Result: pass as part of focused suite. Evidence: evaluator rework verdict now requires --rework-context and reports rework_context in quality artifacts. Scope: evaluator rework context MVP.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T17:09:46.076Z, excerpt_hash=sha256:51f6483b2bfc0102f565366df65f9dbbcf809121a6c42c4acab3c6e06c0ca1d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605281707-51DD0G-route-packet-v2/.agentplane/tasks/202605281707-7FSSSP/blueprint/resolved-snapshot.json
- old_digest: c936b90b798eb562ce47647b552ecd9c91345ad8898a2e5165ff8c814d5e6767
- current_digest: c936b90b798eb562ce47647b552ecd9c91345ad8898a2e5165ff8c814d5e6767
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605281707-7FSSSP

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
