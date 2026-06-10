---
id: "202606101735-15G7ZE"
title: "Add task-level human input blockers"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "task-lifecycle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-10T17:36:53.579Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-10T17:55:00.382Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts. Result: pass, 3 files / 19 tests. Command: bun run --filter=agentplane build. Result: pass, tsup build succeeded. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: git diff --check. Result: pass."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-10T17:58:42.646Z"
  updated_by: "EVALUATOR"
  note: "Human input blocker implementation is task-scoped and covered by focused CLI tests."
  evaluated_sha: "a08513d863411d967cf8c86287e26b4942c81361"
  blueprint_digest: "4e19c83fcadf1f3c322caf9fddc13399e598bed72373a6bce4f34167612bbfab"
  evidence_refs:
    - ".agentplane/tasks/202606101735-15G7ZE/README.md"
    - ".agentplane/tasks/202606101735-15G7ZE/quality/20260610-175842646-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606101735-15G7ZE/quality/20260610-175842646-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606101735-15G7ZE/quality/20260610-175842646-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606101735-15G7ZE/blueprint/resolved-snapshot.json"
    - "bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts"
    - "bun run --filter=agentplane build"
    - "node .agentplane/policy/check-routing.mjs"
  findings:
    - "task ask/answer stores an explicit user-input blocker, active listing exposes the question and answer command, and route next-action blocks progression until answered."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement task-scoped human input blockers, expose waiting-on-user tasks in active and route guidance, and verify with focused CLI tests plus routing validation."
events:
  -
    type: "status"
    at: "2026-06-10T17:38:34.227Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement task-scoped human input blockers, expose waiting-on-user tasks in active and route guidance, and verify with focused CLI tests plus routing validation."
  -
    type: "verify"
    at: "2026-06-10T17:55:00.382Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts. Result: pass, 3 files / 19 tests. Command: bun run --filter=agentplane build. Result: pass, tsup build succeeded. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: git diff --check. Result: pass."
doc_version: 3
doc_updated_at: "2026-06-10T17:55:00.963Z"
doc_updated_by: "CODER"
description: "Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker."
sections:
  Summary: |-
    Add task-level human input blockers

    Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker.
  Scope: |-
    - In scope: Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker.
    - Out of scope: unrelated refactors not required for "Add task-level human input blockers".
  Plan: |-
    1. Inspect existing task state, comments, active-list, and route-oracle code paths.
    2. Add task-scoped human input blocker storage and commands for asking and answering a blocking question.
    3. Surface waiting-on-user tasks in ap task active, ap task brief, and ap task next-action with the exact question and answer command.
    4. Add focused CLI/unit coverage for ask/answer, active listing, and route guidance.
    5. Run targeted tests plus routing validation, record verification, and prepare branch_pr artifacts.
  Verify Steps: |-
    1. Run focused CLI/unit tests for task human-input blockers. Expected: ask/answer behavior, unresolved blocker visibility, and route guidance pass.
    2. Run `ap task active` coverage for waiting-on-user tasks. Expected: active output lists the exact question and answer command without hiding ready tasks.
    3. Run route-oracle coverage for unresolved user input. Expected: `ap task brief` and `ap task next-action --explain` report the blocker and prevent unsafe progression until answered.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy validation passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-10T17:55:00.382Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts. Result: pass, 3 files / 19 tests. Command: bun run --filter=agentplane build. Result: pass, tsup build succeeded. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: git diff --check. Result: pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-10T17:38:34.227Z, excerpt_hash=sha256:b2dc1ef05e9ce7d9c6f61070e028327e71034a842665fed4730ed88938eab70c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606101735-15G7ZE-add-task-level-human-input-blockers/.agentplane/tasks/202606101735-15G7ZE/blueprint/resolved-snapshot.json
    - old_digest: 4e19c83fcadf1f3c322caf9fddc13399e598bed72373a6bce4f34167612bbfab
    - current_digest: 4e19c83fcadf1f3c322caf9fddc13399e598bed72373a6bce4f34167612bbfab
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606101735-15G7ZE

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606101735-15G7ZE
    - diagnostic_command: agentplane pr check 202606101735-15G7ZE
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add task-level human input blockers

Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker.

## Scope

- In scope: Add explicit task-scoped human input blocker support so agents can record a blocking question, ap task active surfaces waiting-on-user tasks with the exact question and answer command, and route guidance treats unresolved user input as a first-class blocker.
- Out of scope: unrelated refactors not required for "Add task-level human input blockers".

## Plan

1. Inspect existing task state, comments, active-list, and route-oracle code paths.
2. Add task-scoped human input blocker storage and commands for asking and answering a blocking question.
3. Surface waiting-on-user tasks in ap task active, ap task brief, and ap task next-action with the exact question and answer command.
4. Add focused CLI/unit coverage for ask/answer, active listing, and route guidance.
5. Run targeted tests plus routing validation, record verification, and prepare branch_pr artifacts.

## Verify Steps

1. Run focused CLI/unit tests for task human-input blockers. Expected: ask/answer behavior, unresolved blocker visibility, and route guidance pass.
2. Run `ap task active` coverage for waiting-on-user tasks. Expected: active output lists the exact question and answer command without hiding ready tasks.
3. Run route-oracle coverage for unresolved user input. Expected: `ap task brief` and `ap task next-action --explain` report the blocker and prevent unsafe progression until answered.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: routing policy validation passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-10T17:55:00.382Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.lifecycle.test.ts packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts packages/agentplane/src/cli/run-cli.core.task-next-action-json.test.ts. Result: pass, 3 files / 19 tests. Command: bun run --filter=agentplane build. Result: pass, tsup build succeeded. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK. Command: git diff --check. Result: pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-10T17:38:34.227Z, excerpt_hash=sha256:b2dc1ef05e9ce7d9c6f61070e028327e71034a842665fed4730ed88938eab70c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606101735-15G7ZE-add-task-level-human-input-blockers/.agentplane/tasks/202606101735-15G7ZE/blueprint/resolved-snapshot.json
- old_digest: 4e19c83fcadf1f3c322caf9fddc13399e598bed72373a6bce4f34167612bbfab
- current_digest: 4e19c83fcadf1f3c322caf9fddc13399e598bed72373a6bce4f34167612bbfab
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606101735-15G7ZE

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606101735-15G7ZE
- diagnostic_command: agentplane pr check 202606101735-15G7ZE
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
