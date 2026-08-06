---
id: "202608061646-WCARQG"
title: "Add explainable per-task workflow routing"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
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
  updated_at: "2026-08-06T17:15:18.499Z"
  updated_by: "TESTER"
  note: "Implementation 1c7849f0e is accepted for integration with concrete check evidence."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-06T17:10:11.374Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "1c7849f0ed3881ca385a7bdf8705358099fb47b2"
  blueprint_digest: "faeda72627b35767174ab067742fd82a40e33e572dd85a22fca7ba6668e7bfde"
  evidence_refs:
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-171010925-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-171010925-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/85a6bee787c552ef828c87c5c339796803397cddc5b582928882b4e9b9a5934a.md"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-171010925-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-171010925-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/20260806-171010925-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608061646-WCARQG/README.md"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/87f84112d774433f055ea519380015d5122ef389b7a1a79603a89a9b96fcd741.patch"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/9e8e5b902a7ea052f7e6454abf0715d813143d8de9d068ffc23af868d03d58f5.json"
    - ".agentplane/tasks/202608061646-WCARQG/quality/objects/sha256/98612f88fee45e5df9dc5991375942860d92e08303638847628e14aa3b8b9cf8.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation commit 1c7849f0e remains the semantic change and satisfies the route contract."
    - "Task-only closure and verification artifacts do not alter runtime behavior or invalidate the focused E2E evidence."
token_usage:
  agent_runs: 0
  input_tokens: null
  journal_digest: null
  observed_agent_runs: 0
  observed_by: "agentplane"
  output_tokens: null
  reasoning_tokens: null
  schema_version: 1
  source: "unavailable"
  state: "unavailable"
  total_tokens: null
  unavailable_reason: "supervisor_journal_missing"
  updated_at: "2026-08-06T17:16:44.392Z"
commit:
  hash: "e3568ad1cdd05cab3bad63ddbb23ba35531d9618"
  message: "🧪 WCARQG task: refresh task artifacts after commit"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-08-06T17:07:34.361Z"
    author: "TESTER"
    state: "ok"
    note: "Verified commit 1c7849f0e: 98 focused routing/schema/CLI tests pass, TypeScript build passes, generated schemas are current, and policy routing passes."
  -
    type: "status"
    at: "2026-08-06T17:08:25.845Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-08-06T17:08:56.605Z"
    author: "TESTER"
    state: "ok"
    note: "Post-closure verification confirms f60c230c4931 adds only task closure artifacts on top of already verified implementation 1c7849f0e; 98 focused tests, typecheck, schema parity, and policy routing remain the accepted evidence."
  -
    type: "verify"
    at: "2026-08-06T17:10:05.208Z"
    author: "TESTER"
    state: "ok"
    note: "Verification refreshed for task-artifact head 8c032b7fa; implementation remains 1c7849f0e and the accepted 98 focused tests, typecheck, schema parity, and policy routing evidence are unchanged."
  -
    type: "verify"
    at: "2026-08-06T17:13:54.026Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation 1c7849f0e remains fully verified after task-only closure artifacts."
  -
    type: "verify"
    at: "2026-08-06T17:14:45.234Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation 1c7849f0e is accepted for integration."
  -
    type: "verify"
    at: "2026-08-06T17:15:18.499Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation 1c7849f0e is accepted for integration with concrete check evidence."
  -
    type: "status"
    at: "2026-08-06T17:16:44.392Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-06T17:16:44.420Z"
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

    ### 2026-08-06T17:07:34.361Z — VERIFY — ok

    By: TESTER

    Note: Verified commit 1c7849f0e: 98 focused routing/schema/CLI tests pass, TypeScript build passes, generated schemas are current, and policy routing passes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:05:51.580Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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
    - diagnostic_command: agentplane task verify-show 202608061646-WCARQG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-06T17:08:56.605Z — VERIFY — ok

    By: TESTER

    Note: Post-closure verification confirms f60c230c4931 adds only task closure artifacts on top of already verified implementation 1c7849f0e; 98 focused tests, typecheck, schema parity, and policy routing remain the accepted evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:08:25.856Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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

    ### 2026-08-06T17:10:05.208Z — VERIFY — ok

    By: TESTER

    Note: Verification refreshed for task-artifact head 8c032b7fa; implementation remains 1c7849f0e and the accepted 98 focused tests, typecheck, schema parity, and policy routing evidence are unchanged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:08:57.835Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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

    ### 2026-08-06T17:13:54.026Z — VERIFY — ok

    By: TESTER

    Note: Implementation 1c7849f0e remains fully verified after task-only closure artifacts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:10:11.396Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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

    ### 2026-08-06T17:14:45.234Z — VERIFY — ok

    By: TESTER

    Note: Implementation 1c7849f0e is accepted for integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:13:55.579Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

    Details:

    Checks: bunx vitest focused routing/schema/CLI suites => 98 passed; bunx vitest core tasks => 119 passed; bun run typecheck => passed; bun run schemas:check => passed; node .agentplane/policy/check-routing.mjs => passed. Scope: implementation commit 1c7849f0e; later commits contain managed task evidence only.

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

    ### 2026-08-06T17:15:18.499Z — VERIFY — ok

    By: TESTER

    Note: Implementation 1c7849f0e is accepted for integration with concrete check evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:14:46.923Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/blueprint/task-input.test.ts
    Result: pass
    Evidence: 98 focused routing, schema, CLI, and worktree tests passed
    Scope: task routing and blueprint integration

    Command: bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks
    Result: pass
    Evidence: 119 core task persistence and schema tests passed
    Scope: task execution_route storage and schema compatibility

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript workspace typecheck completed successfully
    Scope: changed core and CLI packages

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing validation passed
    Scope: repository policy graph

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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the feature commit. Legacy tasks without execution_route continue to resolve from repository workflow_mode; no migration is required."
  Findings: |-
    - Observation: Automatic execution routing is now persisted, explainable, and applied by blueprint, route decision, work start, and supervised task run.
      Impact: Risky release/ops/security tasks can gain branch isolation without changing the repository default, while branch_pr remains a non-downgradeable policy floor.
      Resolution: Added deterministic selection, frozen task evidence, scoped workflow contexts, schema/export support, and regression coverage.

    - Observation: 98 focused routing, schema, and CLI tests pass; TypeScript typecheck, generated schema parity, and policy routing checks pass; commits after 1c7849f0e change only managed task evidence.
      Impact: The persisted execution_route contract, route explanations, blueprint selection, dry-run execution, and branch worktree routing satisfy the approved acceptance criteria without regression to legacy repository routing.
      Resolution: Accept implementation commit 1c7849f0e for integration; retain later commits as lifecycle evidence only.
extensions:
  implementation_commit:
    hash: "1c7849f0ed3881ca385a7bdf8705358099fb47b2"
    message: "✨ WCARQG routing: add explainable task execution routes"
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

### 2026-08-06T17:07:34.361Z — VERIFY — ok

By: TESTER

Note: Verified commit 1c7849f0e: 98 focused routing/schema/CLI tests pass, TypeScript build passes, generated schemas are current, and policy routing passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:05:51.580Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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
- diagnostic_command: agentplane task verify-show 202608061646-WCARQG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-06T17:08:56.605Z — VERIFY — ok

By: TESTER

Note: Post-closure verification confirms f60c230c4931 adds only task closure artifacts on top of already verified implementation 1c7849f0e; 98 focused tests, typecheck, schema parity, and policy routing remain the accepted evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:08:25.856Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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

### 2026-08-06T17:10:05.208Z — VERIFY — ok

By: TESTER

Note: Verification refreshed for task-artifact head 8c032b7fa; implementation remains 1c7849f0e and the accepted 98 focused tests, typecheck, schema parity, and policy routing evidence are unchanged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:08:57.835Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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

### 2026-08-06T17:13:54.026Z — VERIFY — ok

By: TESTER

Note: Implementation 1c7849f0e remains fully verified after task-only closure artifacts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:10:11.396Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

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

### 2026-08-06T17:14:45.234Z — VERIFY — ok

By: TESTER

Note: Implementation 1c7849f0e is accepted for integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:13:55.579Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

Details:

Checks: bunx vitest focused routing/schema/CLI suites => 98 passed; bunx vitest core tasks => 119 passed; bun run typecheck => passed; bun run schemas:check => passed; node .agentplane/policy/check-routing.mjs => passed. Scope: implementation commit 1c7849f0e; later commits contain managed task evidence only.

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

### 2026-08-06T17:15:18.499Z — VERIFY — ok

By: TESTER

Note: Implementation 1c7849f0e is accepted for integration with concrete check evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T17:14:46.923Z, excerpt_hash=sha256:32c2f05019d838c3772bc15fea76fee9c7c68fad926dd3ae4d931fe85cc74984

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/blueprint/task-input.test.ts
Result: pass
Evidence: 98 focused routing, schema, CLI, and worktree tests passed
Scope: task routing and blueprint integration

Command: bunx vitest --config vitest.workspace.ts run --project core packages/core/src/tasks
Result: pass
Evidence: 119 core task persistence and schema tests passed
Scope: task execution_route storage and schema compatibility

Command: bun run typecheck
Result: pass
Evidence: TypeScript workspace typecheck completed successfully
Scope: changed core and CLI packages

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing validation passed
Scope: repository policy graph

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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the feature commit. Legacy tasks without execution_route continue to resolve from repository workflow_mode; no migration is required.

## Findings

- Observation: Automatic execution routing is now persisted, explainable, and applied by blueprint, route decision, work start, and supervised task run.
  Impact: Risky release/ops/security tasks can gain branch isolation without changing the repository default, while branch_pr remains a non-downgradeable policy floor.
  Resolution: Added deterministic selection, frozen task evidence, scoped workflow contexts, schema/export support, and regression coverage.

- Observation: 98 focused routing, schema, and CLI tests pass; TypeScript typecheck, generated schema parity, and policy routing checks pass; commits after 1c7849f0e change only managed task evidence.
  Impact: The persisted execution_route contract, route explanations, blueprint selection, dry-run execution, and branch worktree routing satisfy the approved acceptance criteria without regression to legacy repository routing.
  Resolution: Accept implementation commit 1c7849f0e for integration; retain later commits as lifecycle evidence only.

## Token Usage

- State: `unavailable`
- Completeness: `0/0` agent runs
- Input tokens: `unavailable`
- Output tokens: `unavailable`
- Reasoning tokens: `unavailable`
- Total tokens: `unavailable`
- Provenance: `unavailable/agentplane`
- Journal digest: `unavailable`
- Unavailable reason: `supervisor_journal_missing`
- Updated at: `2026-08-06T17:16:44.392Z`
