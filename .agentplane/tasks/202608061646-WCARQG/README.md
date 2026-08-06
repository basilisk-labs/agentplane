---
id: "202608061646-WCARQG"
title: "Add explainable per-task workflow routing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "routing"
  - "ux"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/blueprint/task-input.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T16:47:31.667Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-06T17:05:50.489Z"
  updated_by: "CODER"
  note: "Post-commit verification binds the passing focused tests, 119 core task tests, typecheck, schema parity, and policy routing evidence to implementation commit b060e9b18."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-06T17:06:18.884Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "b060e9b18d17843cc7d36a0baf77c8ae9ae5b744"
  blueprint_digest: "faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde"
  evidence_refs:
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-170618598-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-170618598-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/f0412ba4e376ac256537b815ebbde156201747cc24d497705efbd524d26e2d91.md"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-170618598-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-170618598-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-170618598-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608061646-WCARQG/README.md"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/87f84112d774433f055ea519380015d5122ef389b7a1a79603a89a9b96fcd741.patch"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/6390548bfeef48fbf0cbb1267032252ace5b9db7b9836f3bac47beeca55cd1b8.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/98612f88fee45e5df9dc5991375942860d92e08303638847628e14aa3b8b9cf8.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Automatic routing is deterministic from structured task fields, emits stable reason codes, and treats branch_pr as a non-downgradeable repository policy floor."
    - "The persisted execution_route survives README parsing, export schemas, provider-safe projection, blueprint resolution, route decisions, work start, and supervised task execution."
    - "Focused E2E coverage proves a risky release task in a direct repository is escalated into a branch_pr worktree."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T16:48:32.006Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-08-06T17:05:17.319Z"
    author: "CODER"
    state: "ok"
    note: "Task routing contract verified: 9 focused agentplane tests, 119 core task tests, TypeScript build, schema parity, and policy routing all pass; E2E confirms direct repository auto-escalation creates branch_pr worktree."
  -
    type: "verify"
    at: "2026-08-06T17:05:50.489Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification binds the passing focused tests, 119 core task tests, typecheck, schema parity, and policy routing evidence to implementation commit b060e9b18."
doc_version: 3
doc_updated_at: "2026-08-06T17:05:51.580Z"
doc_updated_by: "CODER"
description: "Add a backward-compatible task-level execution route that lets AgentPlane classify task isolation risk and deterministically select direct or branch_pr, with policy overrides, stable reason codes, persisted evidence, and no route changes after mutation starts."
sections:
  Summary: |-
    Add explainable per-task workflow routing

    Add a backward-compatible task-level execution route that lets AgentPlane classify task isolation risk and deterministically select direct or branch_pr, with policy overrides, stable reason codes, persisted evidence, and no route changes after mutation starts.
  Scope: |-
    - In scope: Add a backward-compatible task-level execution route that lets AgentPlane classify task isolation risk and deterministically select direct or branch_pr, with policy overrides, stable reason codes, persisted evidence, and no route changes after mutation starts.
    - Out of scope: unrelated refactors not required for "Add explainable per-task workflow routing".
  Plan: "1. Add an optional persisted execution_route contract to task artifacts without changing legacy workflow_mode defaults. 2. Implement a deterministic route classifier from task kind, mutation scope, risk flags, repository policy, and checkout safety. 3. Resolve the route before blueprint/supervisor execution, freeze it once mutation starts, and emit stable reason codes plus human-readable explanation. 4. Cover direct, branch_pr, forced-policy, ambiguous, and backward-compatibility cases. Approved scope: packages/core/src/tasks/**, packages/core/src/config/**, packages/agentplane/src/runtime/task-routing/**, packages/agentplane/src/runtime/task-intake/**, packages/agentplane/src/commands/blueprint/**, packages/agentplane/src/commands/task/**, related schemas/generated artifacts and focused tests."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/blueprint/task-input.test.ts
    - bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T17:05:17.319Z — VERIFY — ok

    By: CODER

    Note: Task routing contract verified: 9 focused agentplane tests, 119 core task tests, TypeScript build, schema parity, and policy routing all pass; E2E confirms direct repository auto-escalation creates branch_pr worktree.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T16:48:32.006Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061646-WCARQG-add-explainable-per-task-workflow-routing/.agentplane/tasks/202608061646-WCARQG/blueprint/resolved-snapshot.json
    - old_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
    - current_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061646-WCARQG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T17:05:50.489Z — VERIFY — ok

    By: CODER

    Note: Post-commit verification binds the passing focused tests, 119 core task tests, typecheck, schema parity, and policy routing evidence to implementation commit b060e9b18.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:05:18.437Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061646-WCARQG-add-explainable-per-task-workflow-routing/.agentplane/tasks/202608061646-WCARQG/blueprint/resolved-snapshot.json
    - old_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
    - current_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061646-WCARQG

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the feature commit. Legacy tasks without execution_route continue to resolve from repository workflow_mode; no migration is required."
  Findings: |-
    - Observation: Automatic execution routing is now persisted, explainable, and applied by blueprint, route decision, work start, and supervised task run.
      Impact: Risky release/ops/security tasks can gain branch isolation without changing the repository default, while branch_pr remains a non-downgradeable policy floor.
      Resolution: Added deterministic selection, frozen task evidence, scoped workflow contexts, schema/export support, and regression coverage.
extensions:
  workflow_route_baseline:
    start_head_sha: "f89392c2f479a4b2eaa79c628912152e68ab6094"
    version: 1
id_source: "generated"
---
## Summary

Add explainable per-task workflow routing

Add a backward-compatible task-level execution route that lets AgentPlane classify task isolation risk and deterministically select direct or branch_pr, with policy overrides, stable reason codes, persisted evidence, and no route changes after mutation starts.

## Scope

- In scope: Add a backward-compatible task-level execution route that lets AgentPlane classify task isolation risk and deterministically select direct or branch_pr, with policy overrides, stable reason codes, persisted evidence, and no route changes after mutation starts.
- Out of scope: unrelated refactors not required for "Add explainable per-task workflow routing".

## Plan

1. Add an optional persisted execution_route contract to task artifacts without changing legacy workflow_mode defaults. 2. Implement a deterministic route classifier from task kind, mutation scope, risk flags, repository policy, and checkout safety. 3. Resolve the route before blueprint/supervisor execution, freeze it once mutation starts, and emit stable reason codes plus human-readable explanation. 4. Cover direct, branch_pr, forced-policy, ambiguous, and backward-compatibility cases. Approved scope: packages/core/src/tasks/**, packages/core/src/config/**, packages/agentplane/src/runtime/task-routing/**, packages/agentplane/src/runtime/task-intake/**, packages/agentplane/src/commands/blueprint/**, packages/agentplane/src/commands/task/**, related schemas/generated artifacts and focused tests.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/blueprint/task-input.test.ts
- bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T17:05:17.319Z — VERIFY — ok

By: CODER

Note: Task routing contract verified: 9 focused agentplane tests, 119 core task tests, TypeScript build, schema parity, and policy routing all pass; E2E confirms direct repository auto-escalation creates branch_pr worktree.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T16:48:32.006Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061646-WCARQG-add-explainable-per-task-workflow-routing/.agentplane/tasks/202608061646-WCARQG/blueprint/resolved-snapshot.json
- old_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
- current_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061646-WCARQG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T17:05:50.489Z — VERIFY — ok

By: CODER

Note: Post-commit verification binds the passing focused tests, 119 core task tests, typecheck, schema parity, and policy routing evidence to implementation commit b060e9b18.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:05:18.437Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061646-WCARQG-add-explainable-per-task-workflow-routing/.agentplane/tasks/202608061646-WCARQG/blueprint/resolved-snapshot.json
- old_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
- current_digest: faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061646-WCARQG

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the feature commit. Legacy tasks without execution_route continue to resolve from repository workflow_mode; no migration is required.

## Findings

- Observation: Automatic execution routing is now persisted, explainable, and applied by blueprint, route decision, work start, and supervised task run.
  Impact: Risky release/ops/security tasks can gain branch isolation without changing the repository default, while branch_pr remains a non-downgradeable policy floor.
  Resolution: Added deterministic selection, frozen task evidence, scoped workflow contexts, schema/export support, and regression coverage.
