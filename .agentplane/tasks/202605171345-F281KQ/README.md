---
id: "202605171345-F281KQ"
title: "Add guided task begin and complete shortcuts"
result_summary: "Merged via PR #3848."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun test packages/agentplane/src/cli/run-cli.core.task-guided.test.ts --runInBand"
  - "bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T13:46:51.810Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-17T17:43:31.493Z"
  updated_by: "CODER"
  note: "Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests; command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for init -> task begin -> task complete."
  attempts: 0
commit:
  hash: "c7bd0fad046998dd23e767380e8225fc9159b74c"
  message: "Merge pull request #3848 from basilisk-labs/task/202605171345-F281KQ/guided-task-shortcuts"
comments:
  -
    author: "CODER"
    body: "Start: implement guided task begin and complete shortcuts over existing lifecycle primitives."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3848 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-17T17:27:08.951Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement guided task begin and complete shortcuts over existing lifecycle primitives."
  -
    type: "verify"
    at: "2026-05-17T17:43:31.493Z"
    author: "CODER"
    state: "ok"
    note: "Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests; command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for init -> task begin -> task complete."
  -
    type: "status"
    at: "2026-05-17T18:48:12.576Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3848 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-17T18:48:12.582Z"
doc_updated_by: "INTEGRATOR"
description: "Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates."
sections:
  Summary: |-
    Add guided task begin and complete shortcuts

    Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.
  Scope: |-
    - In scope: Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.
    - Out of scope: unrelated refactors not required for "Add guided task begin and complete shortcuts".
  Plan: "Implement policy-aware guided workflow shortcuts over existing primitives, not a new lifecycle model. `task begin` should create/update the normal task record, write a minimal plan, approve/start only when policy allows, and print the next concrete command. `task complete` should verify/finish only when required evidence exists; otherwise it must report the exact missing gate. Both commands must preserve task README/ACR traceability and expose the underlying primitive commands in output or JSON."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/cli/run-cli.core.task-guided.test.ts --runInBand`. Expected: `task begin` and `task complete` cover direct and branch_pr policy-aware paths, JSON/text output, and stop-gate behavior.
    2. Run `bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand`. Expected: guided shortcuts preserve existing lifecycle transition invariants.
    3. Run `bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --runInBand`. Expected: help teaches guided shortcuts as the default first real task path while keeping primitives available.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    5. Smoke `task begin` and `task complete` in a temp initialized repository when the repo-local runtime is bootstrapped. Expected: artifacts are normal task docs/ACR records, not a parallel scenario/run state.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-17T17:43:31.493Z — VERIFY — ok

    By: CODER

    Note: Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests; command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for init -> task begin -> task complete.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:27:08.951Z, excerpt_hash=sha256:b86a0ae677275882c6afe6831edc560ea4a00ccea90717b6acf9b77694c34bf4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171345-F281KQ-guided-task-shortcuts/.agentplane/tasks/202605171345-F281KQ/blueprint/resolved-snapshot.json
    - old_digest: 738c33e32278a4116473284579128c420531c9cbcc52cc319fc9140d7e8b91dd
    - current_digest: 738c33e32278a4116473284579128c420531c9cbcc52cc319fc9140d7e8b91dd
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605171345-F281KQ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add guided task begin and complete shortcuts

Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.

## Scope

- In scope: Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.
- Out of scope: unrelated refactors not required for "Add guided task begin and complete shortcuts".

## Plan

Implement policy-aware guided workflow shortcuts over existing primitives, not a new lifecycle model. `task begin` should create/update the normal task record, write a minimal plan, approve/start only when policy allows, and print the next concrete command. `task complete` should verify/finish only when required evidence exists; otherwise it must report the exact missing gate. Both commands must preserve task README/ACR traceability and expose the underlying primitive commands in output or JSON.

## Verify Steps

1. Run `bun test packages/agentplane/src/cli/run-cli.core.task-guided.test.ts --runInBand`. Expected: `task begin` and `task complete` cover direct and branch_pr policy-aware paths, JSON/text output, and stop-gate behavior.
2. Run `bun test packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/finish.state.unit.test.ts --runInBand`. Expected: guided shortcuts preserve existing lifecycle transition invariants.
3. Run `bun test packages/agentplane/src/cli/command-guide.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts --runInBand`. Expected: help teaches guided shortcuts as the default first real task path while keeping primitives available.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
5. Smoke `task begin` and `task complete` in a temp initialized repository when the repo-local runtime is bootstrapped. Expected: artifacts are normal task docs/ACR records, not a parallel scenario/run state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-17T17:43:31.493Z — VERIFY — ok

By: CODER

Note: Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests; command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for init -> task begin -> task complete.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-17T17:27:08.951Z, excerpt_hash=sha256:b86a0ae677275882c6afe6831edc560ea4a00ccea90717b6acf9b77694c34bf4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605171345-F281KQ-guided-task-shortcuts/.agentplane/tasks/202605171345-F281KQ/blueprint/resolved-snapshot.json
- old_digest: 738c33e32278a4116473284579128c420531c9cbcc52cc319fc9140d7e8b91dd
- current_digest: 738c33e32278a4116473284579128c420531c9cbcc52cc319fc9140d7e8b91dd
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605171345-F281KQ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
