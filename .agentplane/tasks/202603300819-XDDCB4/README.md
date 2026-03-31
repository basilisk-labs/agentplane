---
id: "202603300819-XDDCB4"
title: "Lock current CLI read-surface behavior with contract tests"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "cli"
  - "tests"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-30T08:20:46.948Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-31T10:00:06.727Z"
  updated_by: "CODER"
  note: "Re-verified after rebasing onto local refactor wave; targeted vitest contracts passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add behavior-locking tests for help routing, task list/search/next output, and agent_json_v1 output so the next CLI refactor wave can proceed under a stable contract."
events:
  -
    type: "status"
    at: "2026-03-30T08:22:03.494Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add behavior-locking tests for help routing, task list/search/next output, and agent_json_v1 output so the next CLI refactor wave can proceed under a stable contract."
  -
    type: "verify"
    at: "2026-03-30T08:44:45.023Z"
    author: "CODER"
    state: "ok"
    note: "OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts -t \"renders the same task help|wraps trailing help\"; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t \"task next|task search|task list\"; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts"
  -
    type: "verify"
    at: "2026-03-30T18:53:02.989Z"
    author: "CODER"
    state: "ok"
    note: "OK: rebased the branch on current main and reran the task’s intended CLI contract slice; bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts -t 'renders the same task help|wraps trailing help' passed; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t 'task next|task search|task list' passed; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts passed."
  -
    type: "verify"
    at: "2026-03-31T09:59:55.581Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after rebase onto local main; targeted Vitest contracts passed."
  -
    type: "verify"
    at: "2026-03-31T10:00:06.727Z"
    author: "CODER"
    state: "ok"
    note: "Re-verified after rebasing onto local refactor wave; targeted vitest contracts passed."
doc_version: 3
doc_updated_at: "2026-03-31T10:00:06.732Z"
doc_updated_by: "CODER"
description: "Start Epic 0 by adding behavior-locking tests for help routing, task list/search/next output, and JSON output contracts so the next CLI refactor wave can remove duplicate infrastructure safely."
sections:
  Summary: |-
    Lock current CLI read-surface behavior with contract tests
    
    Start Epic 0 by adding behavior-locking tests for help routing, task list/search/next output, and JSON output contracts so the next CLI refactor wave can remove duplicate infrastructure safely.
  Scope: |-
    - In scope: Start Epic 0 by adding behavior-locking tests for help routing, task list/search/next output, and JSON output contracts so the next CLI refactor wave can remove duplicate infrastructure safely.
    - Out of scope: unrelated refactors not required for "Lock current CLI read-surface behavior with contract tests".
  Plan: |-
    1. Audit the current CLI test surface for help routing, task list/search/next output, and JSON output contracts to identify the narrowest places to lock current behavior.
    2. Add behavior-locking tests that freeze current help-routing, task-query, and agent_json_v1 output semantics without refactoring runtime code yet.
    3. Run the targeted test set and record the locked contracts so later CLI refactors can remove duplication safely.
  Verify Steps: |-
    1. Run the new targeted CLI contract tests for help routing, task list/search/next output, and JSON output. Expected: all pass.
    2. Inspect the new assertions/snapshots. Expected: they lock current shipped behavior rather than a speculative redesign.
    3. Re-run the touched targeted CLI tests after the final edits. Expected: stable green results with no unrelated regressions.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-03-30T08:44:45.023Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts -t "renders the same task help|wraps trailing help"; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task next|task search|task list"; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:22:03.496Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02
    
    ### 2026-03-30T18:53:02.989Z — VERIFY — ok
    
    By: CODER
    
    Note: OK: rebased the branch on current main and reran the task’s intended CLI contract slice; bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts -t 'renders the same task help|wraps trailing help' passed; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t 'task next|task search|task list' passed; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:44:45.026Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02
    
    ### 2026-03-31T09:59:55.581Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after rebase onto local main; targeted Vitest contracts passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T18:53:02.991Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02
    
    ### 2026-03-31T10:00:06.727Z — VERIFY — ok
    
    By: CODER
    
    Note: Re-verified after rebasing onto local refactor wave; targeted vitest contracts passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:59:55.585Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Lock current CLI read-surface behavior with contract tests

Start Epic 0 by adding behavior-locking tests for help routing, task list/search/next output, and JSON output contracts so the next CLI refactor wave can remove duplicate infrastructure safely.

## Scope

- In scope: Start Epic 0 by adding behavior-locking tests for help routing, task list/search/next output, and JSON output contracts so the next CLI refactor wave can remove duplicate infrastructure safely.
- Out of scope: unrelated refactors not required for "Lock current CLI read-surface behavior with contract tests".

## Plan

1. Audit the current CLI test surface for help routing, task list/search/next output, and JSON output contracts to identify the narrowest places to lock current behavior.
2. Add behavior-locking tests that freeze current help-routing, task-query, and agent_json_v1 output semantics without refactoring runtime code yet.
3. Run the targeted test set and record the locked contracts so later CLI refactors can remove duplication safely.

## Verify Steps

1. Run the new targeted CLI contract tests for help routing, task list/search/next output, and JSON output. Expected: all pass.
2. Inspect the new assertions/snapshots. Expected: they lock current shipped behavior rather than a speculative redesign.
3. Re-run the touched targeted CLI tests after the final edits. Expected: stable green results with no unrelated regressions.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-03-30T08:44:45.023Z — VERIFY — ok

By: CODER

Note: OK: bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts -t "renders the same task help|wraps trailing help"; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t "task next|task search|task list"; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:22:03.496Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02

### 2026-03-30T18:53:02.989Z — VERIFY — ok

By: CODER

Note: OK: rebased the branch on current main and reran the task’s intended CLI contract slice; bunx vitest run packages/agentplane/src/cli/run-cli.core.test.ts -t 'renders the same task help|wraps trailing help' passed; bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -t 'task next|task search|task list' passed; bunx vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T08:44:45.026Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02

### 2026-03-31T09:59:55.581Z — VERIFY — ok

By: CODER

Note: Re-verified after rebase onto local main; targeted Vitest contracts passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-30T18:53:02.991Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02

### 2026-03-31T10:00:06.727Z — VERIFY — ok

By: CODER

Note: Re-verified after rebasing onto local refactor wave; targeted vitest contracts passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-31T09:59:55.585Z, excerpt_hash=sha256:25ce9cf558224ffe8e2594d2b97d07c4cab4883e61e0fc0c1984399dd002df02

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
