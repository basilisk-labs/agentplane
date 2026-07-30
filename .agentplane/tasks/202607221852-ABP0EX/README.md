---
id: "202607221852-ABP0EX"
title: "Add policy-gated semantic retrieval escalation"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on:
  - "202607221849-NWVCAG"
  - "202607221852-9T0RT3"
tags:
  - "context"
  - "milestone-beta2"
  - "refactor"
  - "retrieval"
  - "rf-19"
  - "semantic-escalation"
  - "v0.7"
  - "wave-retrieval"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T12:36:01.385Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T12:51:53.139Z"
  updated_by: "TESTER"
  note: "Verified c4348a3: 17 focused tests cover high-confidence zero escalation, four bounded trigger episodes, and stale/invalid/adapter-failure fallbacks; critical-cli 12 chunks, typecheck, and fast local CI passed. Receipt exposes baseline versus observed escalation and token cost; downstream quality remains explicitly not_observed pending evaluator evidence."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T12:54:06.554Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "ae57f3af8a46637818d16bcca69519bb77041aab"
  blueprint_digest: "f8cfacdace7675c365e1aab8b657954cf4646e57daf30492c758c5eb3db5e683"
  evidence_refs:
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-ABP0EX/README.md"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-ABP0EX/quality/20260730-125406350-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The high-confidence integration fixture proves that exact bounded retrieval does not create a selector episode despite auxiliary query signals."
    - "The semantic selector contract is bounded to materialized references and validates candidate-set freshness, identity, uniqueness, and token/episode limits before changing prepared evidence."
commit:
  hash: "ae57f3af8a46637818d16bcca69519bb77041aab"
  message: "📝 ABP0EX task: record implementation evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: added a policy-gated, adapter-injected semantic retrieval selector with a one-episode authority budget, deterministic fallback, provenance and comparison receipts; calibrated high-confidence and conflict fixtures."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Rework: hosted routed CI found nine lint-only violations in the new selector and fixtures; correcting the lint surface without changing retrieval behavior."
events:
  -
    type: "status"
    at: "2026-07-30T12:36:18.265Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T12:51:16.925Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: added a policy-gated, adapter-injected semantic retrieval selector with a one-episode authority budget, deterministic fallback, provenance and comparison receipts; calibrated high-confidence and conflict fixtures."
  -
    type: "verify"
    at: "2026-07-30T12:51:53.139Z"
    author: "TESTER"
    state: "ok"
    note: "Verified c4348a3: 17 focused tests cover high-confidence zero escalation, four bounded trigger episodes, and stale/invalid/adapter-failure fallbacks; critical-cli 12 chunks, typecheck, and fast local CI passed. Receipt exposes baseline versus observed escalation and token cost; downstream quality remains explicitly not_observed pending evaluator evidence."
  -
    type: "status"
    at: "2026-07-30T12:54:35.612Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-30T12:59:45.336Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Rework: hosted routed CI found nine lint-only violations in the new selector and fixtures; correcting the lint surface without changing retrieval behavior."
doc_version: 3
doc_updated_at: "2026-07-30T12:59:45.336Z"
doc_updated_by: "CODER"
description: "RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default."
sections:
  Summary: |-
    Add policy-gated semantic retrieval escalation

    RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default.
  Scope: |-
    - In scope: measurable escalation triggers, typed selector input/output, authority/budget policy, provenance, fallback, quality/escalation metrics, and conflict fixtures.
    - Out of scope: running CURATOR before every coding task or allowing semantic selection to rewrite durable knowledge.
  Plan: |-
    1. Define threshold and policy inputs for size, confidence, domain conflict, and synthesis breadth.
    2. Prepare a bounded candidate-selection work order only when a trigger fires.
    3. Validate semantic selections against available refs/digests and retain deterministic fallback.
    4. Record cost, reason, selection provenance, and downstream quality.
    5. Calibrate triggers on golden retrieval scenarios.
  Verify Steps: |-
    1. Run high-confidence bounded retrieval. Expected: zero semantic escalation.
    2. Run each trigger fixture. Expected: one bounded selector episode with explicit reason, authority, budget, and candidate refs.
    3. Return invalid/stale selections or fail the adapter. Expected: validation rejects them and deterministic fallback/typed blocker is preserved.
    4. Compare escalation rate, retrieval quality, and total episode/token cost to baseline.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T12:51:53.139Z — VERIFY — ok

    By: TESTER

    Note: Verified c4348a3: 17 focused tests cover high-confidence zero escalation, four bounded trigger episodes, and stale/invalid/adapter-failure fallbacks; critical-cli 12 chunks, typecheck, and fast local CI passed. Receipt exposes baseline versus observed escalation and token cost; downstream quality remains explicitly not_observed pending evaluator evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T12:51:16.925Z, excerpt_hash=sha256:6e4919e898d950fe105c80a8320939d44efb9b2c088c01dd58c1de795ea93db4

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-ABP0EX-add-policy-gated-semantic-retrieval-escalation/.agentplane/tasks/202607221852-ABP0EX/blueprint/resolved-snapshot.json
    - old_digest: f8cfacdace7675c365e1aab8b657954cf4646e57daf30492c758c5eb3db5e683
    - current_digest: f8cfacdace7675c365e1aab8b657954cf4646e57daf30492c758c5eb3db5e683
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-ABP0EX

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-ABP0EX
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
    - Observation: No selector invocation for high-confidence bounded retrieval; every trigger fixture issues one authority-bounded work order.
      Impact: Prevents unconditional semantic episodes while retaining deterministic retrieval on any selector fault.
      Resolution: Selector response is runtime-validated against the current candidate-set digest and all failures fall back to the deterministic candidate order.
extensions:
  workflow_route_baseline:
    start_head_sha: "3f46bbe11ff4528efbcf0aeff526e8a3cd98a981"
    version: 1
id_source: "generated"
---
## Summary

Add policy-gated semantic retrieval escalation

RF-19b: invoke an optional selector/reranker only for oversized, low-confidence, conflicting-domain, or broad-synthesis candidate sets; preserve deterministic retrieval as the default.

## Scope

- In scope: measurable escalation triggers, typed selector input/output, authority/budget policy, provenance, fallback, quality/escalation metrics, and conflict fixtures.
- Out of scope: running CURATOR before every coding task or allowing semantic selection to rewrite durable knowledge.

## Plan

1. Define threshold and policy inputs for size, confidence, domain conflict, and synthesis breadth.
2. Prepare a bounded candidate-selection work order only when a trigger fires.
3. Validate semantic selections against available refs/digests and retain deterministic fallback.
4. Record cost, reason, selection provenance, and downstream quality.
5. Calibrate triggers on golden retrieval scenarios.

## Verify Steps

1. Run high-confidence bounded retrieval. Expected: zero semantic escalation.
2. Run each trigger fixture. Expected: one bounded selector episode with explicit reason, authority, budget, and candidate refs.
3. Return invalid/stale selections or fail the adapter. Expected: validation rejects them and deterministic fallback/typed blocker is preserved.
4. Compare escalation rate, retrieval quality, and total episode/token cost to baseline.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T12:51:53.139Z — VERIFY — ok

By: TESTER

Note: Verified c4348a3: 17 focused tests cover high-confidence zero escalation, four bounded trigger episodes, and stale/invalid/adapter-failure fallbacks; critical-cli 12 chunks, typecheck, and fast local CI passed. Receipt exposes baseline versus observed escalation and token cost; downstream quality remains explicitly not_observed pending evaluator evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T12:51:16.925Z, excerpt_hash=sha256:6e4919e898d950fe105c80a8320939d44efb9b2c088c01dd58c1de795ea93db4

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-ABP0EX-add-policy-gated-semantic-retrieval-escalation/.agentplane/tasks/202607221852-ABP0EX/blueprint/resolved-snapshot.json
- old_digest: f8cfacdace7675c365e1aab8b657954cf4646e57daf30492c758c5eb3db5e683
- current_digest: f8cfacdace7675c365e1aab8b657954cf4646e57daf30492c758c5eb3db5e683
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-ABP0EX

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-ABP0EX
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

- Observation: No selector invocation for high-confidence bounded retrieval; every trigger fixture issues one authority-bounded work order.
  Impact: Prevents unconditional semantic episodes while retaining deterministic retrieval on any selector fault.
  Resolution: Selector response is runtime-validated against the current candidate-set digest and all failures fall back to the deterministic candidate order.
