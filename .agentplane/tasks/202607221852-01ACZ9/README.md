---
id: "202607221852-01ACZ9"
title: "Serve bounded knowledge requests during agent episodes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202607221848-ER5H6N"
  - "202607221848-VC4VVS"
  - "202607221849-NWVCAG"
  - "202607221852-ABP0EX"
tags:
  - "context"
  - "knowledge-request"
  - "milestone-beta2"
  - "refactor"
  - "rf-22"
  - "runner"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T13:20:25.394Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T14:27:53.900Z"
  updated_by: "TESTER"
  note: "RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 18c2c433; focused adversarial retrieval coverage also passed."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T14:29:19.615Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "18c2c4338849ebc61dccb31941bb847f2e9cbc2f"
  blueprint_digest: "74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01"
  evidence_refs:
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221852-01ACZ9/README.md"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-01ACZ9/verification/20260730142753900-c44e92ceb733fa11.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-142807781-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The response token budget counts only excerpt content, while returned references, omission receipts, run metadata, blocker text, and serialization overhead are excluded; therefore a response can exceed the declared token limit while reporting itself within budget."
commit:
  hash: "35758465c6432d0503e12e56c6f31eb49cfb7604"
  message: "🚧 01ACZ9 task: serve bounded knowledge requests"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented bounded knowledge request serving with typed schema, run-bound digest audit, role and scope controls, bounded retrieval, and escalation. Local verification passed: schemas, typecheck, focused tests, test:critical, ci:local:fast."
events:
  -
    type: "status"
    at: "2026-07-30T13:20:41.645Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T13:43:41.544Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented bounded knowledge request serving with typed schema, run-bound digest audit, role and scope controls, bounded retrieval, and escalation. Local verification passed: schemas, typecheck, focused tests, test:critical, ci:local:fast."
  -
    type: "verify"
    at: "2026-07-30T13:48:39.616Z"
    author: "TESTER"
    state: "ok"
    note: "RF-22 verified. schemas:check passed; focused agentplane suite 76/76 and core suite 25/25 passed; critical CLI matrix passed 12/12 chunks. Valid EXECUTOR/EVALUATOR requests, bounded denials, repeated-gap escalation, and digest/work-order/fingerprint tamper rejection are covered."
  -
    type: "verify"
    at: "2026-07-30T14:27:53.900Z"
    author: "TESTER"
    state: "ok"
    note: "RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 18c2c433; focused adversarial retrieval coverage also passed."
doc_version: 3
doc_updated_at: "2026-07-30T14:27:54.637Z"
doc_updated_by: "CODER"
description: "RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps."
sections:
  Summary: |-
    Serve bounded knowledge requests during agent episodes

    RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps.
  Scope: |-
    - In scope: KnowledgeRequest schema, run-bound audit, deterministic retrieval response, verified refs/excerpts, round/token budgets, blocking semantics, dedupe, repeated-unresolved escalation, and role-specific policy.
    - Out of scope: exposing unrestricted repository/lifecycle access or naming the contract ContextGapRequest.
  Plan: |-
    1. Define versioned request/response contracts and role policy.
    2. Bind requests to run/work-order identity, fingerprint, authority, rounds, and token budget.
    3. Execute deterministic retrieval with optional policy-gated escalation.
    4. Return verified refs/excerpts plus missing/omitted receipt.
    5. Convert repeated unresolved blocking requests into a typed blocker/human escalation.
  Verify Steps: |-
    1. Submit valid executor and evaluator requests. Expected: scoped digest-valid refs/excerpts and a complete run audit.
    2. Exceed round/token budget or request a forbidden scope. Expected: typed denial without broader repository authority.
    3. Repeat an unresolved blocking request. Expected: deduplicated evidence followed by blocker/escalation, not an infinite loop.
    4. Tamper with work-order id, fingerprint, or returned digest. Expected: validation rejects the request/response.
    5. Run schema, runner, and retrieval tests.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T13:48:39.616Z — VERIFY — ok

    By: TESTER

    Note: RF-22 verified. schemas:check passed; focused agentplane suite 76/76 and core suite 25/25 passed; critical CLI matrix passed 12/12 chunks. Valid EXECUTOR/EVALUATOR requests, bounded denials, repeated-gap escalation, and digest/work-order/fingerprint tamper rejection are covered.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T13:43:41.544Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-01ACZ9-serve-bounded-knowledge-requests-during-agent-ep/.agentplane/tasks/202607221852-01ACZ9/blueprint/resolved-snapshot.json
    - old_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
    - current_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-01ACZ9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-01ACZ9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-30T14:27:53.900Z — VERIFY — ok

    By: TESTER

    Note: RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 18c2c433; focused adversarial retrieval coverage also passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T13:48:40.341Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

    Details:

    Command: bun run schemas:check
    Result: pass
    Evidence: schemas OK at HEAD 18c2c4338849ebc61dccb31941bb847f2e9cbc2f.
    Scope: Generated public schemas and fixture synchronization.

    Command: bun run test:critical
    Result: pass
    Evidence: critical CLI matrix passed 12/12 chunks and 76 tests at HEAD 18c2c4338849ebc61dccb31941bb847f2e9cbc2f.
    Scope: Critical CLI trust-boundary and agent-efficiency regressions.

    Command: bun run typecheck
    Result: pass
    Evidence: repository TypeScript build exited 0 at HEAD 18c2c4338849ebc61dccb31941bb847f2e9cbc2f.
    Scope: Workspace type safety.

    Command: bun run --filter=agentplane test -- task-knowledge-request.test.ts task-knowledge-request-lifecycle.test.ts task-knowledge-semantic-escalation.test.ts agent-work-order.integration.test.ts task-run-bootstrap.result-examples.test.ts result-manifest.test.ts codex-result-transport.test.ts direct-task-supervisor-observation.test.ts task-run-context.integration.test.ts task-run-lifecycle.test.ts
    Result: pass
    Evidence: 10 agentplane files and 96 tests passed; includes FTS pagination beyond six out-of-scope results and post-work-order digest drift rejection.
    Scope: RF-22 request serving, runner lifecycle, authorization, digest binding, and adversarial retrieval regressions.

    Command: bun run --filter=@agentplaneorg/core test -- agent-semantic-result.test.ts agent-work-order.test.ts
    Result: pass
    Evidence: 2 core files and 25 tests passed.
    Scope: Semantic result and work-order contract compatibility.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-01ACZ9-serve-bounded-knowledge-requests-during-agent-ep/.agentplane/tasks/202607221852-01ACZ9/blueprint/resolved-snapshot.json
    - old_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
    - current_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-01ACZ9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-01ACZ9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
    - Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
    - Re-run equivalence, recall, lifecycle, and type checks.
  Findings: |-
    - Observation: Bounded knowledge handler remains below the enforced 600-line runtime limit (578 lines); hotspot warning only.
      Impact: No current correctness gate is violated; future extraction may split the handler if its policy surface grows.
      Resolution: Keep RF-23 limited to provider-tool transport; do not widen this handler without a separate refactoring task.
extensions:
  workflow_route_baseline:
    start_head_sha: "1432ec85ec7ff015df754622d2c8e452930461ca"
    version: 1
id_source: "generated"
---
## Summary

Serve bounded knowledge requests during agent episodes

RF-22: let EXECUTOR/EVALUATOR request a query, reason, kind/scope, and blocking flag; let CLI return digest-valid refs/excerpts under round and token limits with escalation on repeated gaps.

## Scope

- In scope: KnowledgeRequest schema, run-bound audit, deterministic retrieval response, verified refs/excerpts, round/token budgets, blocking semantics, dedupe, repeated-unresolved escalation, and role-specific policy.
- Out of scope: exposing unrestricted repository/lifecycle access or naming the contract ContextGapRequest.

## Plan

1. Define versioned request/response contracts and role policy.
2. Bind requests to run/work-order identity, fingerprint, authority, rounds, and token budget.
3. Execute deterministic retrieval with optional policy-gated escalation.
4. Return verified refs/excerpts plus missing/omitted receipt.
5. Convert repeated unresolved blocking requests into a typed blocker/human escalation.

## Verify Steps

1. Submit valid executor and evaluator requests. Expected: scoped digest-valid refs/excerpts and a complete run audit.
2. Exceed round/token budget or request a forbidden scope. Expected: typed denial without broader repository authority.
3. Repeat an unresolved blocking request. Expected: deduplicated evidence followed by blocker/escalation, not an infinite loop.
4. Tamper with work-order id, fingerprint, or returned digest. Expected: validation rejects the request/response.
5. Run schema, runner, and retrieval tests.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T13:48:39.616Z — VERIFY — ok

By: TESTER

Note: RF-22 verified. schemas:check passed; focused agentplane suite 76/76 and core suite 25/25 passed; critical CLI matrix passed 12/12 chunks. Valid EXECUTOR/EVALUATOR requests, bounded denials, repeated-gap escalation, and digest/work-order/fingerprint tamper rejection are covered.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T13:43:41.544Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-01ACZ9-serve-bounded-knowledge-requests-during-agent-ep/.agentplane/tasks/202607221852-01ACZ9/blueprint/resolved-snapshot.json
- old_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
- current_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-01ACZ9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-01ACZ9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-30T14:27:53.900Z — VERIFY — ok

By: TESTER

Note: RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 18c2c433; focused adversarial retrieval coverage also passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T13:48:40.341Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

Details:

Command: bun run schemas:check
Result: pass
Evidence: schemas OK at HEAD 18c2c4338849ebc61dccb31941bb847f2e9cbc2f.
Scope: Generated public schemas and fixture synchronization.

Command: bun run test:critical
Result: pass
Evidence: critical CLI matrix passed 12/12 chunks and 76 tests at HEAD 18c2c4338849ebc61dccb31941bb847f2e9cbc2f.
Scope: Critical CLI trust-boundary and agent-efficiency regressions.

Command: bun run typecheck
Result: pass
Evidence: repository TypeScript build exited 0 at HEAD 18c2c4338849ebc61dccb31941bb847f2e9cbc2f.
Scope: Workspace type safety.

Command: bun run --filter=agentplane test -- task-knowledge-request.test.ts task-knowledge-request-lifecycle.test.ts task-knowledge-semantic-escalation.test.ts agent-work-order.integration.test.ts task-run-bootstrap.result-examples.test.ts result-manifest.test.ts codex-result-transport.test.ts direct-task-supervisor-observation.test.ts task-run-context.integration.test.ts task-run-lifecycle.test.ts
Result: pass
Evidence: 10 agentplane files and 96 tests passed; includes FTS pagination beyond six out-of-scope results and post-work-order digest drift rejection.
Scope: RF-22 request serving, runner lifecycle, authorization, digest binding, and adversarial retrieval regressions.

Command: bun run --filter=@agentplaneorg/core test -- agent-semantic-result.test.ts agent-work-order.test.ts
Result: pass
Evidence: 2 core files and 25 tests passed.
Scope: Semantic result and work-order contract compatibility.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-01ACZ9-serve-bounded-knowledge-requests-during-agent-ep/.agentplane/tasks/202607221852-01ACZ9/blueprint/resolved-snapshot.json
- old_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
- current_digest: 74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-01ACZ9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-01ACZ9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the bounded retrieval or authority slice and restore the previous projection version or compatibility adapter.
- Preserve durable context data and use the documented full-rebuild/repair path rather than deleting it.
- Re-run equivalence, recall, lifecycle, and type checks.

## Findings

- Observation: Bounded knowledge handler remains below the enforced 600-line runtime limit (578 lines); hotspot warning only.
  Impact: No current correctness gate is violated; future extraction may split the handler if its policy surface grows.
  Resolution: Keep RF-23 limited to provider-tool transport; do not widen this handler without a separate refactoring task.
- Observation: Independent review found global result truncation before task-context filtering, path-only digest rematerialization, and excerpt-only response budgeting.
  Impact: Available scoped context could be denied, changed evidence could be returned under a stale work order, or metadata could push a response past its declared budget.
  Resolution: Page FTS before response limiting, serve only original digest-bound references, and measure the complete sealed response before each inclusion; adversarial ranking, drift, six-candidate, and metadata-pressure tests cover these boundaries.
