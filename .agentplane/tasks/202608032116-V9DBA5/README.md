---
id: "202608032116-V9DBA5"
title: "Restore ACR generation in hosted close qualification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "hosted-close"
  - "qualification"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "node scripts/checks/run-vitest-suite.mjs v0.7-hosted"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T21:35:26.625Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T21:45:05.220Z"
  updated_by: "TESTER"
  note: "PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-08-03T21:45:35.887Z"
  updated_by: "HUMAN"
  note: "The fix removes the schema-invalid token usage extension and makes hosted closure reject missing mandatory ACR artifacts while preserving the established best-effort contract for ordinary finish."
  evaluated_sha: "e1c509e38ff5719b1178274a50834e35b3f9b818"
  blueprint_digest: "b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141"
  evidence_refs:
    - ".agentplane/tasks/202608032116-V9DBA5/quality/20260803-214535497-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/20260803-214535497-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/objects/sha256/700bda96c27fc0eccf09e5bc51b0e450a0536b4f9bc433f4cf1f785ea4c32914.md"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/20260803-214535497-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/20260803-214535497-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608032116-V9DBA5/README.md"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/objects/sha256/35267e5cc80c96e948a78c74264a79f9d4a03b5cf55a46d19f4da6b1cbd0f40d.patch"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/objects/sha256/6e082b2d9ff01b7a88cb12d17343978332d75de8500b66d06e80d619a91c6875.json"
    - ".agentplane/tasks/202608032116-V9DBA5/verification/20260803214505220-43bbd446b8abb6e6.json"
    - ".agentplane/tasks/202608032116-V9DBA5/quality/objects/sha256/fe0cd6fb171ca168b821a086124caab96e87e1b4b206936dc4cbfe0635f78911.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/acr/generate.ts"
    - "packages/agentplane/src/commands/task/finish-shared.ts"
    - "packages/agentplane/src/commands/task/hosted-close.command.ts"
    - "packages/agentplane/src/commands/task/finish-acr-refresh.unit.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.task-hosted-close.test.ts"
  findings:
    - "PASS: agentplane.token-usage satisfies the ACR extension-key schema and the hosted integration test proves the completed task token usage is serialized in the resulting valid ACR."
    - "PASS: required behavior is opt-in at the hosted-close caller; ordinary finish and other existing callers retain best-effort refresh semantics."
    - "PASS: hosted-close now returns a contextual non-zero failure containing the task ID and root ACR error instead of committing a successful close tail without acr.json."
commit:
  hash: "e1c509e38ff5719b1178274a50834e35b3f9b818"
  message: "🐛 V9DBA5 task: restore hosted close ACRs"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: corrected the ACR token-usage extension key, made hosted-close require successful ACR refresh, preserved best-effort ordinary finish behavior, and added unit plus hosted regression coverage."
events:
  -
    type: "status"
    at: "2026-08-03T21:35:42.291Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T21:42:08.245Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: corrected the ACR token-usage extension key, made hosted-close require successful ACR refresh, preserved best-effort ordinary finish behavior, and added unit plus hosted regression coverage."
  -
    type: "verify"
    at: "2026-08-03T21:42:26.895Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics."
  -
    type: "verify"
    at: "2026-08-03T21:45:05.220Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics."
doc_version: 3
doc_updated_at: "2026-08-03T21:45:06.191Z"
doc_updated_by: "CODER"
description: "Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure."
sections:
  Summary: |-
    Restore ACR generation in hosted close qualification

    Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
  Scope: |-
    - In scope: Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
    - Out of scope: unrelated refactors not required for "Restore ACR generation in hosted close qualification".
  Plan: |-
    1. Reproduce the hosted-close ACR omission with traceable failure evidence and identify the exact generateAcr contract violation.
    2. Apply the smallest implementation fix so hosted-close persists a valid tracked acr.json for each finished task; mandatory hosted-close ACR refresh must fail with actionable evidence instead of returning success without the artifact, while unrelated finish behavior remains compatible.
    3. Add focused unit coverage for refresh failure semantics and extend the real hosted-close regression to prove acr.json creation, tracking, and idempotent rerun.
    4. Run focused tests, bun run test:critical, and node scripts/checks/run-vitest-suite.mjs v0.7-hosted; record residual risk and rollback by reverting the task commits.
  Verify Steps: |-
    PLANNER fallback scaffold for "Restore ACR generation in hosted close qualification". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Restore ACR generation in hosted close qualification". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T21:42:26.895Z — VERIFY — ok

    By: TESTER

    Note: PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T21:42:08.245Z, excerpt_hash=sha256:d72c6903b66ae700da158ba0161dd5c0a467c89ea9afc69c4aad3cd9a9e7ca8d

    Details:

    Command: bun x vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish-acr-refresh.unit.test.ts --project agentplane
    Result: pass (1 file, 3 tests)
    Evidence: best-effort ordinary refresh and required fail-closed behavior are both asserted
    Scope: refreshAcrArtifactsForFinishedTasks error contract

    Command: node scripts/checks/run-vitest-suite.mjs v0.7-hosted
    Result: pass (7 files, 29 tests across 2 chunks)
    Evidence: hosted-close creates and tracks acr.json, serializes extensions["agentplane.token-usage"], and reruns idempotently
    Scope: hosted close, protected integration, and release recovery

    Command: bun run test:critical
    Result: pass (12 chunks, 79 tests)
    Evidence: all critical CLI, efficiency, boundary, and exit-code suites passed
    Scope: critical CLI regression surface

    Command: bun run typecheck; targeted ESLint; targeted Prettier check
    Result: pass
    Evidence: zero type, lint, or formatting failures on the implementation and documentation paths
    Scope: changed TypeScript, tests, and docs

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032116-V9DBA5-restore-acr-generation-in-hosted-close-qualifica/.agentplane/tasks/202608032116-V9DBA5/blueprint/resolved-snapshot.json
    - old_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
    - current_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032116-V9DBA5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032116-V9DBA5
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T21:45:05.220Z — VERIFY — ok

    By: TESTER

    Note: PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T21:42:27.856Z, excerpt_hash=sha256:d72c6903b66ae700da158ba0161dd5c0a467c89ea9afc69c4aad3cd9a9e7ca8d

    Details:

    Command: bun x vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish-acr-refresh.unit.test.ts --project agentplane
    Result: pass
    Evidence: 1 file and 3 tests passed; best-effort ordinary refresh and required fail-closed behavior are both asserted
    Scope: refreshAcrArtifactsForFinishedTasks error contract

    Command: node scripts/checks/run-vitest-suite.mjs v0.7-hosted
    Result: pass
    Evidence: 7 files and 29 tests passed across 2 chunks; hosted-close creates and tracks acr.json, serializes extensions["agentplane.token-usage"], and reruns idempotently
    Scope: hosted close, protected integration, and release recovery

    Command: bun run test:critical
    Result: pass
    Evidence: all 12 chunks and 79 critical CLI, efficiency, boundary, and exit-code tests passed
    Scope: critical CLI regression surface

    Command: bun run typecheck; targeted ESLint; targeted Prettier check
    Result: pass
    Evidence: zero type, lint, or formatting failures on the implementation and documentation paths
    Scope: changed TypeScript, tests, and docs

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032116-V9DBA5-restore-acr-generation-in-hosted-close-qualifica/.agentplane/tasks/202608032116-V9DBA5/blueprint/resolved-snapshot.json
    - old_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
    - current_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608032116-V9DBA5

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608032116-V9DBA5
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "aa93de810c57ada6039cfb942818ab3eae45a92d"
    version: 1
id_source: "generated"
---
## Summary

Restore ACR generation in hosted close qualification

Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.

## Scope

- In scope: Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
- Out of scope: unrelated refactors not required for "Restore ACR generation in hosted close qualification".

## Plan

1. Reproduce the hosted-close ACR omission with traceable failure evidence and identify the exact generateAcr contract violation.
2. Apply the smallest implementation fix so hosted-close persists a valid tracked acr.json for each finished task; mandatory hosted-close ACR refresh must fail with actionable evidence instead of returning success without the artifact, while unrelated finish behavior remains compatible.
3. Add focused unit coverage for refresh failure semantics and extend the real hosted-close regression to prove acr.json creation, tracking, and idempotent rerun.
4. Run focused tests, bun run test:critical, and node scripts/checks/run-vitest-suite.mjs v0.7-hosted; record residual risk and rollback by reverting the task commits.

## Verify Steps

PLANNER fallback scaffold for "Restore ACR generation in hosted close qualification". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Restore ACR generation in hosted close qualification". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T21:42:26.895Z — VERIFY — ok

By: TESTER

Note: PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T21:42:08.245Z, excerpt_hash=sha256:d72c6903b66ae700da158ba0161dd5c0a467c89ea9afc69c4aad3cd9a9e7ca8d

Details:

Command: bun x vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish-acr-refresh.unit.test.ts --project agentplane
Result: pass (1 file, 3 tests)
Evidence: best-effort ordinary refresh and required fail-closed behavior are both asserted
Scope: refreshAcrArtifactsForFinishedTasks error contract

Command: node scripts/checks/run-vitest-suite.mjs v0.7-hosted
Result: pass (7 files, 29 tests across 2 chunks)
Evidence: hosted-close creates and tracks acr.json, serializes extensions["agentplane.token-usage"], and reruns idempotently
Scope: hosted close, protected integration, and release recovery

Command: bun run test:critical
Result: pass (12 chunks, 79 tests)
Evidence: all critical CLI, efficiency, boundary, and exit-code suites passed
Scope: critical CLI regression surface

Command: bun run typecheck; targeted ESLint; targeted Prettier check
Result: pass
Evidence: zero type, lint, or formatting failures on the implementation and documentation paths
Scope: changed TypeScript, tests, and docs

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032116-V9DBA5-restore-acr-generation-in-hosted-close-qualifica/.agentplane/tasks/202608032116-V9DBA5/blueprint/resolved-snapshot.json
- old_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
- current_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032116-V9DBA5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032116-V9DBA5
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T21:45:05.220Z — VERIFY — ok

By: TESTER

Note: PASS: hosted close now writes a valid tracked ACR with token usage and fails closed on required ACR refresh errors without changing ordinary finish fallback semantics.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T21:42:27.856Z, excerpt_hash=sha256:d72c6903b66ae700da158ba0161dd5c0a467c89ea9afc69c4aad3cd9a9e7ca8d

Details:

Command: bun x vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish-acr-refresh.unit.test.ts --project agentplane
Result: pass
Evidence: 1 file and 3 tests passed; best-effort ordinary refresh and required fail-closed behavior are both asserted
Scope: refreshAcrArtifactsForFinishedTasks error contract

Command: node scripts/checks/run-vitest-suite.mjs v0.7-hosted
Result: pass
Evidence: 7 files and 29 tests passed across 2 chunks; hosted-close creates and tracks acr.json, serializes extensions["agentplane.token-usage"], and reruns idempotently
Scope: hosted close, protected integration, and release recovery

Command: bun run test:critical
Result: pass
Evidence: all 12 chunks and 79 critical CLI, efficiency, boundary, and exit-code tests passed
Scope: critical CLI regression surface

Command: bun run typecheck; targeted ESLint; targeted Prettier check
Result: pass
Evidence: zero type, lint, or formatting failures on the implementation and documentation paths
Scope: changed TypeScript, tests, and docs

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608032116-V9DBA5-restore-acr-generation-in-hosted-close-qualifica/.agentplane/tasks/202608032116-V9DBA5/blueprint/resolved-snapshot.json
- old_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
- current_digest: b8707b52cb7be455acd640340f711a41d7480e6ad6863202b910043564c95141
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608032116-V9DBA5

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608032116-V9DBA5
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
