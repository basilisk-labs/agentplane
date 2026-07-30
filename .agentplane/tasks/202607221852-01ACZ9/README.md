---
id: "202607221852-01ACZ9"
title: "Serve bounded knowledge requests during agent episodes"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 29
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
  updated_at: "2026-07-30T15:09:32.150Z"
  updated_by: "TESTER"
  note: "RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 321c7d0d; focused reservation and concurrent retrieval coverage also passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T15:29:46.484Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "33887675818a9d372fdab802499a82320eb6290f"
  blueprint_digest: "74844e812dd39e4dafac4298d591a610b79c6d53703b8c720346e0ba53a15e01"
  evidence_refs:
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-01ACZ9/README.md"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-01ACZ9/quality/20260730-152946255-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Reviewed commit 33887675: Prettier-normalized the only rejected import without changing behavior. Local format, schema, architecture, type, and focused request/lifecycle/lock checks pass; no new dependency edge or contract change was introduced."
commit:
  hash: "f0a8d6a102ae39f973b0eaf1731a2f01bdab2011"
  message: "🧪 01ACZ9 task: record format-fix quality review"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented bounded knowledge request serving with typed schema, run-bound digest audit, role and scope controls, bounded retrieval, and escalation. Local verification passed: schemas, typecheck, focused tests, test:critical, ci:local:fast."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Investigated hosted verify-static failure on PR #4693: dependency-cruiser found a circular import between task-knowledge-request and task-knowledge-request-audit. Moved the shared response contract, sealing, and validation into a neutral module; the request handler and audit adapter now depend on that module without importing each other. Local architecture, type, and focused lifecycle checks pass."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Hosted verify-contract failure was formatting-only: Prettier required the task-knowledge-request codec import to be on one line. Applied the repository formatter; format:check, schemas:check, arch:check, agentplane typecheck, and focused request/lifecycle/lock tests pass."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Hosted verify-static lint failure identified an unused local validator import left after moving response validation to the neutral response module. Removed the unused import. Local format, lint:core, schemas, architecture, type, and focused request/lifecycle/lock checks pass."
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
  -
    type: "verify"
    at: "2026-07-30T14:52:08.570Z"
    author: "TESTER"
    state: "ok"
    note: "RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 0502c0cf; focused concurrent retrieval coverage also passed."
  -
    type: "verify"
    at: "2026-07-30T15:09:32.150Z"
    author: "TESTER"
    state: "ok"
    note: "RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 321c7d0d; focused reservation and concurrent retrieval coverage also passed."
  -
    type: "status"
    at: "2026-07-30T15:11:32.389Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "comment"
    at: "2026-07-30T15:23:19.484Z"
    author: "CODER"
    body: "Investigated hosted verify-static failure on PR #4693: dependency-cruiser found a circular import between task-knowledge-request and task-knowledge-request-audit. Moved the shared response contract, sealing, and validation into a neutral module; the request handler and audit adapter now depend on that module without importing each other. Local architecture, type, and focused lifecycle checks pass."
  -
    type: "status"
    at: "2026-07-30T15:25:17.412Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "comment"
    at: "2026-07-30T15:29:07.504Z"
    author: "CODER"
    body: "Hosted verify-contract failure was formatting-only: Prettier required the task-knowledge-request codec import to be on one line. Applied the repository formatter; format:check, schemas:check, arch:check, agentplane typecheck, and focused request/lifecycle/lock tests pass."
  -
    type: "status"
    at: "2026-07-30T15:30:41.415Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "comment"
    at: "2026-07-30T15:37:07.271Z"
    author: "CODER"
    body: "Hosted verify-static lint failure identified an unused local validator import left after moving response validation to the neutral response module. Removed the unused import. Local format, lint:core, schemas, architecture, type, and focused request/lifecycle/lock checks pass."
doc_version: 3
doc_updated_at: "2026-07-30T15:37:07.271Z"
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

    ### 2026-07-30T14:52:08.570Z — VERIFY — ok

    By: TESTER

    Note: RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 0502c0cf; focused concurrent retrieval coverage also passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T14:27:54.637Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

    Details:

    Command: bun run schemas:check
    Result: pass
    Evidence: schemas OK at HEAD 0502c0cfaac823d0f527854b91e83e18dde76adc.
    Scope: Generated public schemas and fixture synchronization.

    Command: bun run test:critical
    Result: pass
    Evidence: critical CLI matrix passed 12/12 chunks and 76 tests at HEAD 0502c0cfaac823d0f527854b91e83e18dde76adc.
    Scope: Critical CLI trust-boundary and agent-efficiency regressions.

    Command: bun run typecheck
    Result: pass
    Evidence: repository TypeScript build exited 0 at HEAD 0502c0cfaac823d0f527854b91e83e18dde76adc.
    Scope: Workspace type safety.

    Command: bun run --filter=agentplane test -- task-knowledge-request.test.ts task-knowledge-request-lifecycle.test.ts task-knowledge-semantic-escalation.test.ts agent-work-order.integration.test.ts task-run-bootstrap.result-examples.test.ts result-manifest.test.ts codex-result-transport.test.ts direct-task-supervisor-observation.test.ts task-run-context.integration.test.ts task-run-lifecycle.test.ts
    Result: pass
    Evidence: 10 agentplane files and 98 tests passed; includes FTS pagination, digest drift, complete response budget, and concurrent round reservation/escalation across separate run directories.
    Scope: RF-22 request serving, runner lifecycle, authorization, digest binding, response budget, and concurrency regressions.

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

    ### 2026-07-30T15:09:32.150Z — VERIFY — ok

    By: TESTER

    Note: RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 321c7d0d; focused reservation and concurrent retrieval coverage also passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T14:52:09.285Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

    Details:

    Command: bun run schemas:check
    Result: pass
    Evidence: schemas OK at HEAD 321c7d0d9c3c9cc45da0fa1f75e7b374fcc13f5a.
    Scope: Generated public schemas and fixture synchronization.

    Command: bun run test:critical
    Result: pass
    Evidence: critical CLI matrix passed 12/12 chunks and 76 tests at HEAD 321c7d0d9c3c9cc45da0fa1f75e7b374fcc13f5a.
    Scope: Critical CLI trust-boundary and agent-efficiency regressions.

    Command: bun run typecheck
    Result: pass
    Evidence: repository TypeScript build exited 0 at HEAD 321c7d0d9c3c9cc45da0fa1f75e7b374fcc13f5a.
    Scope: Workspace type safety.

    Command: bun run --filter=agentplane test -- task-knowledge-request.test.ts task-knowledge-request-lifecycle.test.ts task-knowledge-semantic-escalation.test.ts agent-work-order.integration.test.ts task-run-bootstrap.result-examples.test.ts result-manifest.test.ts codex-result-transport.test.ts direct-task-supervisor-observation.test.ts task-run-context.integration.test.ts task-run-lifecycle.test.ts cloud-projection-lock.test.ts
    Result: pass
    Evidence: 11 agentplane files and 107 tests passed; includes FTS pagination, digest drift, complete response budget, owner-verified lock recovery, concurrent round reservation, and bounded reservation-timeout escalation.
    Scope: RF-22 request serving, runner lifecycle, authorization, digest binding, response budget, and concurrency regressions.

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
    - Observation: EVALUATOR found that concurrent requests could read the same audit history before a round was persisted.
      Impact: Two requests could claim the same round, bypass a budget, or miss required escalation.
      Resolution: Serialize audit reload, response calculation, and persistence by immutable work-order binding; concurrent runner coverage asserts rounds 1/2 and unresolved/escalated ordering across separate run directories.
    - Observation: EVALUATOR found that an age-based lock cleanup could remove a live request during a slow context operation.
      Impact: A second process could enter the same critical section or surface an untyped storage error on reservation contention.
      Resolution: Reuse an owner-verified cross-process lock without time-based eviction, retain dead-owner recovery, and return a bounded round-0 escalation when the reservation wait expires.
extensions:
  implementation_commit:
    hash: "33887675818a9d372fdab802499a82320eb6290f"
    message: "🧹 01ACZ9 task: format knowledge request imports"
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

### 2026-07-30T14:52:08.570Z — VERIFY — ok

By: TESTER

Note: RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 0502c0cf; focused concurrent retrieval coverage also passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T14:27:54.637Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

Details:

Command: bun run schemas:check
Result: pass
Evidence: schemas OK at HEAD 0502c0cfaac823d0f527854b91e83e18dde76adc.
Scope: Generated public schemas and fixture synchronization.

Command: bun run test:critical
Result: pass
Evidence: critical CLI matrix passed 12/12 chunks and 76 tests at HEAD 0502c0cfaac823d0f527854b91e83e18dde76adc.
Scope: Critical CLI trust-boundary and agent-efficiency regressions.

Command: bun run typecheck
Result: pass
Evidence: repository TypeScript build exited 0 at HEAD 0502c0cfaac823d0f527854b91e83e18dde76adc.
Scope: Workspace type safety.

Command: bun run --filter=agentplane test -- task-knowledge-request.test.ts task-knowledge-request-lifecycle.test.ts task-knowledge-semantic-escalation.test.ts agent-work-order.integration.test.ts task-run-bootstrap.result-examples.test.ts result-manifest.test.ts codex-result-transport.test.ts direct-task-supervisor-observation.test.ts task-run-context.integration.test.ts task-run-lifecycle.test.ts
Result: pass
Evidence: 10 agentplane files and 98 tests passed; includes FTS pagination, digest drift, complete response budget, and concurrent round reservation/escalation across separate run directories.
Scope: RF-22 request serving, runner lifecycle, authorization, digest binding, response budget, and concurrency regressions.

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

### 2026-07-30T15:09:32.150Z — VERIFY — ok

By: TESTER

Note: RF-22 evidence refresh: declared schema, critical CLI, and type checks passed at 321c7d0d; focused reservation and concurrent retrieval coverage also passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T14:52:09.285Z, excerpt_hash=sha256:71de638d60efec5e2dc8cfe8b2cf6bbd9f5eb77930537d5185b761b29bac9ca7

Details:

Command: bun run schemas:check
Result: pass
Evidence: schemas OK at HEAD 321c7d0d9c3c9cc45da0fa1f75e7b374fcc13f5a.
Scope: Generated public schemas and fixture synchronization.

Command: bun run test:critical
Result: pass
Evidence: critical CLI matrix passed 12/12 chunks and 76 tests at HEAD 321c7d0d9c3c9cc45da0fa1f75e7b374fcc13f5a.
Scope: Critical CLI trust-boundary and agent-efficiency regressions.

Command: bun run typecheck
Result: pass
Evidence: repository TypeScript build exited 0 at HEAD 321c7d0d9c3c9cc45da0fa1f75e7b374fcc13f5a.
Scope: Workspace type safety.

Command: bun run --filter=agentplane test -- task-knowledge-request.test.ts task-knowledge-request-lifecycle.test.ts task-knowledge-semantic-escalation.test.ts agent-work-order.integration.test.ts task-run-bootstrap.result-examples.test.ts result-manifest.test.ts codex-result-transport.test.ts direct-task-supervisor-observation.test.ts task-run-context.integration.test.ts task-run-lifecycle.test.ts cloud-projection-lock.test.ts
Result: pass
Evidence: 11 agentplane files and 107 tests passed; includes FTS pagination, digest drift, complete response budget, owner-verified lock recovery, concurrent round reservation, and bounded reservation-timeout escalation.
Scope: RF-22 request serving, runner lifecycle, authorization, digest binding, response budget, and concurrency regressions.

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
- Observation: EVALUATOR found that concurrent requests could read the same audit history before a round was persisted.
  Impact: Two requests could claim the same round, bypass a budget, or miss required escalation.
  Resolution: Serialize audit reload, response calculation, and persistence by immutable work-order binding; concurrent runner coverage asserts rounds 1/2 and unresolved/escalated ordering across separate run directories.
- Observation: EVALUATOR found that an age-based lock cleanup could remove a live request during a slow context operation.
  Impact: A second process could enter the same critical section or surface an untyped storage error on reservation contention.
  Resolution: Reuse an owner-verified cross-process lock without time-based eviction, retain dead-owner recovery, and return a bounded round-0 escalation when the reservation wait expires.
