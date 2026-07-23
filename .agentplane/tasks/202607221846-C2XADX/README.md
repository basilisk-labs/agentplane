---
id: "202607221846-C2XADX"
title: "Generate runner manifest examples from canonical fixtures"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221846-4CE7EG"
tags:
  - "fixtures"
  - "milestone-alpha1"
  - "refactor"
  - "rf-02"
  - "runner"
  - "schema"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run spec:examples:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T17:58:07.109Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T18:31:55.387Z"
  updated_by: "TESTER"
  note: "PASS at 45ba511d2: bootstrap/public fixtures cover completed, blocked, needs_context, and failed; all rendered bootstrap examples round-trip through the production parser and remain bound to work_order_id. Focused runner/core tests: 5 files, 59/59. schemas:check: pass. spec:examples:check: 14 validated plus 1 compatibility-only route. test:critical: 11 chunks, 71/71. typecheck, guards/trust ratchet, lint:core, arch:check, git diff check: pass. Deterministic schema sync preserved identical hashes. RF01 superseded the historical missing-evidence wording: typed negatives now prove missing blocker, missing knowledge_request, forbidden exit_code, and malformed JSON. A prior monolithic suite run showed 8 cross-file isolation failures in prompt/release smoke tests; the three affected files pass together in isolation, 19/19, so hosted CI remains the final concurrency check."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-23T18:33:03.321Z"
  updated_by: "EVALUATOR"
  note: "RF-02 satisfies its semantic contract at e1a327cf7: runner result examples have one typed source, bind to the supervised work order, round-trip through the production parser, enter the CI contract lane, and remove agent-side route reconstruction."
  evaluated_sha: "e1a327cf74f173b2f518ebb73cff6a0d3293b674"
  blueprint_digest: "0878fcbe1f8a59ad4dc79876ccd5bd60f66316aa304d94cd1ac30eca2abad09f"
  evidence_refs:
    - ".agentplane/tasks/202607221846-C2XADX/README.md"
    - ".agentplane/tasks/202607221846-C2XADX/quality/20260723-183303321-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-C2XADX/quality/20260723-183303321-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-C2XADX/quality/20260723-183303321-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-C2XADX/blueprint/resolved-snapshot.json"
    - "packages/core/src/runner/agent-semantic-result.ts"
    - "packages/agentplane/src/runner/usecases/task-run-bootstrap.result-examples.test.ts"
    - "scripts/checks/check-spec-examples.mjs"
    - "focused RF-02 tests: 5 files, 59/59; critical CLI: 71/71; schemas/spec/typecheck/guards/lint/arch all pass"
  findings:
    - "Canonical fixture generation is exhaustive for completed, blocked, needs_context, and failed, while preserving legacy v1 only as compatibility input."
    - "The real bootstrap output is parsed byte-for-byte by the production manifest parser and rejects status-specific omissions, malformed JSON, and supervisor-owned exit_code."
    - "Bootstrap now receives only resolved mutation constraints and returns lifecycle control to the parent supervisor instead of asking the execution agent to recompute the workflow route."
commit:
  hash: "dfee69368e1334c4ba056d8f303fb75d282c5282"
  message: "🚧 C2XADX task: pre-merge closure"
comments:
  -
    author: "CODER"
    body: "Start: Generate canonical runner fixtures, render bootstrap examples from them, and prove production parser round-trips plus typed negative cases."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-23T18:00:27.403Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Generate canonical runner fixtures, render bootstrap examples from them, and prove production parser round-trips plus typed negative cases."
  -
    type: "verify"
    at: "2026-07-23T18:31:55.387Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at 45ba511d2: bootstrap/public fixtures cover completed, blocked, needs_context, and failed; all rendered bootstrap examples round-trip through the production parser and remain bound to work_order_id. Focused runner/core tests: 5 files, 59/59. schemas:check: pass. spec:examples:check: 14 validated plus 1 compatibility-only route. test:critical: 11 chunks, 71/71. typecheck, guards/trust ratchet, lint:core, arch:check, git diff check: pass. Deterministic schema sync preserved identical hashes. RF01 superseded the historical missing-evidence wording: typed negatives now prove missing blocker, missing knowledge_request, forbidden exit_code, and malformed JSON. A prior monolithic suite run showed 8 cross-file isolation failures in prompt/release smoke tests; the three affected files pass together in isolation, 19/19, so hosted CI remains the final concurrency check."
  -
    type: "status"
    at: "2026-07-23T18:33:31.764Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-23T18:34:49.246Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-23T18:34:49.247Z"
doc_updated_by: "CODER"
description: "RF-02: eliminate bootstrap/parser drift by deriving runner success, blocked, and failure examples from canonical schema fixtures that round-trip through the production parser."
sections:
  Summary: |-
    Generate runner manifest examples from canonical fixtures

    RF-02: eliminate bootstrap/parser drift by deriving runner success, blocked, and failure examples from canonical schema fixtures that round-trip through the production parser.
  Scope: |-
    - In scope: canonical runner result fixture builders, bootstrap rendering from those fixtures, production-parser round-trip tests, and CI schema/example parity.
    - Out of scope: the full workflow supervisor and evaluator implementation.
  Plan: |-
    1. Define canonical valid examples for every terminal runner result shape.
    2. Render bootstrap instructions from the fixture source instead of hand-authored JSON.
    3. Parse every rendered example with the production parser in tests.
    4. Preserve explicit negative fixtures for missing evidence and malformed results.
    5. Add schema/example parity to the contract lane.
  Verify Steps: |-
    1. Generate all bootstrap result examples and feed them to the production parser. Expected: every advertised valid example is accepted without repair.
    2. Feed missing-evidence and malformed fixtures. Expected: the parser rejects them with the intended typed errors.
    3. Diff generated bootstrap output twice. Expected: deterministic output with no hand-maintained duplicate schema.
    4. Run `bun run schemas:check`, `bun run spec:examples:check`, focused runner tests, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T18:31:55.387Z — VERIFY — ok

    By: TESTER

    Note: PASS at 45ba511d2: bootstrap/public fixtures cover completed, blocked, needs_context, and failed; all rendered bootstrap examples round-trip through the production parser and remain bound to work_order_id. Focused runner/core tests: 5 files, 59/59. schemas:check: pass. spec:examples:check: 14 validated plus 1 compatibility-only route. test:critical: 11 chunks, 71/71. typecheck, guards/trust ratchet, lint:core, arch:check, git diff check: pass. Deterministic schema sync preserved identical hashes. RF01 superseded the historical missing-evidence wording: typed negatives now prove missing blocker, missing knowledge_request, forbidden exit_code, and malformed JSON. A prior monolithic suite run showed 8 cross-file isolation failures in prompt/release smoke tests; the three affected files pass together in isolation, 19/19, so hosted CI remains the final concurrency check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T18:00:27.403Z, excerpt_hash=sha256:772d96b67a07069da8e33c3a977a5f5643578ace11ec8be57c0c07528b22766c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-C2XADX-generate-runner-manifest-examples-from-canonical/.agentplane/tasks/202607221846-C2XADX/blueprint/resolved-snapshot.json
    - old_digest: 0878fcbe1f8a59ad4dc79876ccd5bd60f66316aa304d94cd1ac30eca2abad09f
    - current_digest: 0878fcbe1f8a59ad4dc79876ccd5bd60f66316aa304d94cd1ac30eca2abad09f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-C2XADX

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221846-C2XADX
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: ""
extensions:
  implementation_commit:
    hash: "e1a327cf74f173b2f518ebb73cff6a0d3293b674"
    message: "🚧 C2XADX task: generate canonical runner result examples"
id_source: "generated"
---
## Summary

Generate runner manifest examples from canonical fixtures

RF-02: eliminate bootstrap/parser drift by deriving runner success, blocked, and failure examples from canonical schema fixtures that round-trip through the production parser.

## Scope

- In scope: canonical runner result fixture builders, bootstrap rendering from those fixtures, production-parser round-trip tests, and CI schema/example parity.
- Out of scope: the full workflow supervisor and evaluator implementation.

## Plan

1. Define canonical valid examples for every terminal runner result shape.
2. Render bootstrap instructions from the fixture source instead of hand-authored JSON.
3. Parse every rendered example with the production parser in tests.
4. Preserve explicit negative fixtures for missing evidence and malformed results.
5. Add schema/example parity to the contract lane.

## Verify Steps

1. Generate all bootstrap result examples and feed them to the production parser. Expected: every advertised valid example is accepted without repair.
2. Feed missing-evidence and malformed fixtures. Expected: the parser rejects them with the intended typed errors.
3. Diff generated bootstrap output twice. Expected: deterministic output with no hand-maintained duplicate schema.
4. Run `bun run schemas:check`, `bun run spec:examples:check`, focused runner tests, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T18:31:55.387Z — VERIFY — ok

By: TESTER

Note: PASS at 45ba511d2: bootstrap/public fixtures cover completed, blocked, needs_context, and failed; all rendered bootstrap examples round-trip through the production parser and remain bound to work_order_id. Focused runner/core tests: 5 files, 59/59. schemas:check: pass. spec:examples:check: 14 validated plus 1 compatibility-only route. test:critical: 11 chunks, 71/71. typecheck, guards/trust ratchet, lint:core, arch:check, git diff check: pass. Deterministic schema sync preserved identical hashes. RF01 superseded the historical missing-evidence wording: typed negatives now prove missing blocker, missing knowledge_request, forbidden exit_code, and malformed JSON. A prior monolithic suite run showed 8 cross-file isolation failures in prompt/release smoke tests; the three affected files pass together in isolation, 19/19, so hosted CI remains the final concurrency check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T18:00:27.403Z, excerpt_hash=sha256:772d96b67a07069da8e33c3a977a5f5643578ace11ec8be57c0c07528b22766c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-C2XADX-generate-runner-manifest-examples-from-canonical/.agentplane/tasks/202607221846-C2XADX/blueprint/resolved-snapshot.json
- old_digest: 0878fcbe1f8a59ad4dc79876ccd5bd60f66316aa304d94cd1ac30eca2abad09f
- current_digest: 0878fcbe1f8a59ad4dc79876ccd5bd60f66316aa304d94cd1ac30eca2abad09f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-C2XADX

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221846-C2XADX
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
