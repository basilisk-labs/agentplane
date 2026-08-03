---
id: "202608031321-5GK3DD"
title: "Make built-in task run context-verifiable"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "issue-4641"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T13:22:19.434Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T13:55:48.166Z"
  updated_by: "TESTER"
  note: "Verified: the default context path is deterministic, live-observed, fail-closed for persisted receipts, and formally records task verification."
  attempts: 0
commit:
  hash: "3c5b1044eafc2bb50de30d385af46f7054af3130"
  message: "🐛 5GK3DD code: verify context through live supervisor"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: context tasks now stop before the generic runner, route one CURATOR semantic result to the dedicated supervisor, verify the supervisor's live Git delta, and record formal verification without trusting persisted receipt claims."
events:
  -
    type: "status"
    at: "2026-08-03T13:22:52.115Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T13:54:08.581Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: context tasks now stop before the generic runner, route one CURATOR semantic result to the dedicated supervisor, verify the supervisor's live Git delta, and record formal verification without trusting persisted receipt claims."
  -
    type: "verify"
    at: "2026-08-03T13:55:48.166Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: the default context path is deterministic, live-observed, fail-closed for persisted receipts, and formally records task verification."
doc_version: 3
doc_updated_at: "2026-08-03T13:55:49.173Z"
doc_updated_by: "CODER"
description: "Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication."
sections:
  Summary: |-
    Make built-in task run context-verifiable

    Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
  Scope: |-
    - In scope: Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
    - Out of scope: unrelated refactors not required for "Make built-in task run context-verifiable".
  Plan: "Trace the built-in task run receipt and context verification paths; preserve the fail-closed rule for persisted receipts; make the default built-in execution path use the same live authenticated observation boundary as context supervise-task, or return the exact supervisor action before unsafe execution; update the integration contract so normal task run can complete verifiably while copied, stale, tampered, or standalone persisted receipts remain rejected; keep changes bounded to runner/context orchestration and focused security tests; close issue #4641 only after hosted merge evidence."
  Verify Steps: |-
    1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts. Expected: default built-in execution reaches a live authenticated verification result, while standalone persisted and tampered receipts still fail closed.
    2. Run the focused context supervise-task, verify-task, execution-receipt, and task-run suites selected from touched modules. Expected: live observation is required and no path/hash/self-claim becomes trusted authentication.
    3. Run bun run guards:check and the trust-boundary ratchet. Expected: zero new reviewed trust-boundary violations.
    4. Run targeted ESLint, TypeScript checking, and git diff --check for touched files. Expected: all pass.
    5. Execute one isolated end-to-end built-in runner fixture. Expected: the CLI emits one deterministic next action and the completed run can be verified without manual receipt rewriting or hidden operator knowledge.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T13:55:48.166Z — VERIFY — ok

    By: TESTER

    Note: Verified: the default context path is deterministic, live-observed, fail-closed for persisted receipts, and formally records task verification.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T13:54:08.581Z, excerpt_hash=sha256:88001c3d8830dbfb525f42256184304dfc60342a64ef4613d6f9c871a3f168b2

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts
    Result: pass (1 file, 4 tests)
    Evidence: local TESTER run at implementation commit 3c5b1044eafc2bb50de30d385af46f7054af3130
    Scope: default built-in context admission and persisted-receipt rejection

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane <7 focused suites>
    Result: pass (7 files, 72 tests)
    Evidence: context supervisor, verify-task, route, execution-receipt, and task-run suites
    Scope: live observation and no path/hash/self-claim authentication

    Command: bun run guards:check
    Result: pass (shared guards OK; trust-boundary ratchet 0)
    Evidence: local TESTER run
    Scope: security and trust boundary regression gates

    Command: bunx eslint <11 touched files>; bun run typecheck; git diff --check origin/main...HEAD
    Result: pass
    Evidence: local TESTER run
    Scope: lint, TypeScript, and patch integrity

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane <task-run-context and assimilation-supervisor> -t <isolated route and live-observation fixtures>
    Result: pass (2 files, 2 selected tests)
    Evidence: native Codex stops with the exact supervisor action; supervisor observes the Git delta and records verification
    Scope: isolated built-in runner-to-supervisor path without receipt rewriting or hidden operator knowledge

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608031321-5GK3DD-make-built-in-task-run-context-verifiable/.agentplane/tasks/202608031321-5GK3DD/blueprint/resolved-snapshot.json
    - old_digest: 64352f9d629976866e671e93239d37f10dbcc44c58d015a01537c75801a88001
    - current_digest: 64352f9d629976866e671e93239d37f10dbcc44c58d015a01537c75801a88001
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608031321-5GK3DD

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608031321-5GK3DD
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The old generic context runner could only persist an unauthenticated receipt and then repeat the same rejected route.
      Impact: Context assimilation could not complete through the documented built-in path and required hidden operator intervention.
      Resolution: Context semantic work is now one bounded CURATOR result; the dedicated supervisor owns live Git observation, artifact validation, and formal verification while persisted receipts remain untrusted.
      Promotion: incident-candidate
      Fixability: repo-fixable
extensions:
  workflow_route_baseline:
    start_head_sha: "a86f55dae7b4f2b9903dba4fe6bc4b5405731962"
    version: 1
id_source: "generated"
---
## Summary

Make built-in task run context-verifiable

Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.

## Scope

- In scope: Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
- Out of scope: unrelated refactors not required for "Make built-in task run context-verifiable".

## Plan

Trace the built-in task run receipt and context verification paths; preserve the fail-closed rule for persisted receipts; make the default built-in execution path use the same live authenticated observation boundary as context supervise-task, or return the exact supervisor action before unsafe execution; update the integration contract so normal task run can complete verifiably while copied, stale, tampered, or standalone persisted receipts remain rejected; keep changes bounded to runner/context orchestration and focused security tests; close issue #4641 only after hosted merge evidence.

## Verify Steps

1. Run bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts. Expected: default built-in execution reaches a live authenticated verification result, while standalone persisted and tampered receipts still fail closed.
2. Run the focused context supervise-task, verify-task, execution-receipt, and task-run suites selected from touched modules. Expected: live observation is required and no path/hash/self-claim becomes trusted authentication.
3. Run bun run guards:check and the trust-boundary ratchet. Expected: zero new reviewed trust-boundary violations.
4. Run targeted ESLint, TypeScript checking, and git diff --check for touched files. Expected: all pass.
5. Execute one isolated end-to-end built-in runner fixture. Expected: the CLI emits one deterministic next action and the completed run can be verified without manual receipt rewriting or hidden operator knowledge.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T13:55:48.166Z — VERIFY — ok

By: TESTER

Note: Verified: the default context path is deterministic, live-observed, fail-closed for persisted receipts, and formally records task verification.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T13:54:08.581Z, excerpt_hash=sha256:88001c3d8830dbfb525f42256184304dfc60342a64ef4613d6f9c871a3f168b2

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts
Result: pass (1 file, 4 tests)
Evidence: local TESTER run at implementation commit 3c5b1044eafc2bb50de30d385af46f7054af3130
Scope: default built-in context admission and persisted-receipt rejection

Command: bunx vitest --config vitest.workspace.ts run --project agentplane <7 focused suites>
Result: pass (7 files, 72 tests)
Evidence: context supervisor, verify-task, route, execution-receipt, and task-run suites
Scope: live observation and no path/hash/self-claim authentication

Command: bun run guards:check
Result: pass (shared guards OK; trust-boundary ratchet 0)
Evidence: local TESTER run
Scope: security and trust boundary regression gates

Command: bunx eslint <11 touched files>; bun run typecheck; git diff --check origin/main...HEAD
Result: pass
Evidence: local TESTER run
Scope: lint, TypeScript, and patch integrity

Command: bunx vitest --config vitest.workspace.ts run --project agentplane <task-run-context and assimilation-supervisor> -t <isolated route and live-observation fixtures>
Result: pass (2 files, 2 selected tests)
Evidence: native Codex stops with the exact supervisor action; supervisor observes the Git delta and records verification
Scope: isolated built-in runner-to-supervisor path without receipt rewriting or hidden operator knowledge

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608031321-5GK3DD-make-built-in-task-run-context-verifiable/.agentplane/tasks/202608031321-5GK3DD/blueprint/resolved-snapshot.json
- old_digest: 64352f9d629976866e671e93239d37f10dbcc44c58d015a01537c75801a88001
- current_digest: 64352f9d629976866e671e93239d37f10dbcc44c58d015a01537c75801a88001
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608031321-5GK3DD

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608031321-5GK3DD
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

- Observation: The old generic context runner could only persist an unauthenticated receipt and then repeat the same rejected route.
  Impact: Context assimilation could not complete through the documented built-in path and required hidden operator intervention.
  Resolution: Context semantic work is now one bounded CURATOR result; the dedicated supervisor owns live Git observation, artifact validation, and formal verification while persisted receipts remain untrusted.
  Promotion: incident-candidate
  Fixability: repo-fixable
