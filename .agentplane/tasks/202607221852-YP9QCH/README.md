---
id: "202607221852-YP9QCH"
title: "Build source-driven canonical reconciliation candidates"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221852-ADC3A5"
  - "202607221852-J910P6"
tags:
  - "assimilation"
  - "context"
  - "milestone-beta2"
  - "reconciliation"
  - "refactor"
  - "rf-17"
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
  updated_at: "2026-07-30T09:44:14.049Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T10:00:51.850Z"
  updated_by: "TESTER"
  note: "Pass: deterministic task-bound candidates cover a canonical entity after the prior first-50 range; fixture proves exact label, alias, FTS graph/page, graph-neighbour evidence, stable ordering, refs, and digest. CURATOR remains the only identity decision owner. Checks: agentplane build; 42 focused tests; Prettier; ESLint; diff check."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T10:01:22.620Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "18e8d9f30ffefb7f0cb0024f685ffc6ae141aa18"
  blueprint_digest: "198a7d19555b5b9a35fd7db335c3335d455661b8d4ef0efb80d4a8972643c324"
  evidence_refs:
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221852-YP9QCH/README.md"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221852-YP9QCH/quality/20260730-100122509-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The candidate-term extractor returns a basename term for deleted source rows, which can surface stale candidates without task-bound source evidence."
commit:
  hash: "18e8d9f30ffefb7f0cb0024f685ffc6ae141aa18"
  message: "🚧 YP9QCH task: source-driven reconciliation candidates"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: source-driven reconciliation candidates are deterministic, indexed, and CURATOR-owned. Verified: agentplane build; targeted context ingestion, task prompt, and release-readiness tests; Prettier; ESLint."
events:
  -
    type: "status"
    at: "2026-07-30T09:44:33.679Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-30T09:59:43.189Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: source-driven reconciliation candidates are deterministic, indexed, and CURATOR-owned. Verified: agentplane build; targeted context ingestion, task prompt, and release-readiness tests; Prettier; ESLint."
  -
    type: "verify"
    at: "2026-07-30T10:00:51.850Z"
    author: "TESTER"
    state: "ok"
    note: "Pass: deterministic task-bound candidates cover a canonical entity after the prior first-50 range; fixture proves exact label, alias, FTS graph/page, graph-neighbour evidence, stable ordering, refs, and digest. CURATOR remains the only identity decision owner. Checks: agentplane build; 42 focused tests; Prettier; ESLint; diff check."
doc_version: 3
doc_updated_at: "2026-07-30T10:00:52.681Z"
doc_updated_by: "CODER"
description: "RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest."
sections:
  Summary: |-
    Build source-driven canonical reconciliation candidates

    RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest.
  Scope: |-
    - In scope: source-derived query terms, candidate fusion from FTS/aliases/graph/page families, deterministic scoring/reasons, bounded additional search, index digest, full-catalog compatibility, and entity-resolution fixture metrics.
    - Out of scope: deciding semantic identity in CLI; CURATOR remains authoritative.
  Plan: |-
    1. Extract deterministic candidate queries from source spans and structured terms.
    2. Gather FTS, alias, graph-neighbour, and page-family candidates.
    3. Score/dedupe with explicit reasons and bind to the index digest.
    4. Provide bounded additional search when evidence is insufficient.
    5. Compare fixture resolution coverage and eliminate alphabetical bias.
  Verify Steps: |-
    1. Rebuild candidates twice from the same source/index. Expected: identical ordering, reasons, scores, refs, and digest.
    2. Use fixtures whose correct entity is beyond the old first-50 slice. Expected: the source-driven candidate set includes it without scanning an arbitrary alphabetical prefix.
    3. Inspect semantic application. Expected: CLI supplies candidates/evidence only; CURATOR supplies the identity decision and rationale.
    4. Run reconciliation/context tests and report fixture accuracy.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T10:00:51.850Z — VERIFY — ok

    By: TESTER

    Note: Pass: deterministic task-bound candidates cover a canonical entity after the prior first-50 range; fixture proves exact label, alias, FTS graph/page, graph-neighbour evidence, stable ordering, refs, and digest. CURATOR remains the only identity decision owner. Checks: agentplane build; 42 focused tests; Prettier; ESLint; diff check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T09:59:43.189Z, excerpt_hash=sha256:1ee0e13912c715c5168cc2acb390e543e1074f5d96a2692f2bd469ee40ef995d

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-YP9QCH-build-source-driven-canonical-reconciliation-can/.agentplane/tasks/202607221852-YP9QCH/blueprint/resolved-snapshot.json
    - old_digest: 198a7d19555b5b9a35fd7db335c3335d455661b8d4ef0efb80d4a8972643c324
    - current_digest: 198a7d19555b5b9a35fd7db335c3335d455661b8d4ef0efb80d4a8972643c324
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221852-YP9QCH

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221852-YP9QCH
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
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "e9f2cbe94440b925b16f04da815cd21628812161"
    version: 1
id_source: "generated"
---
## Summary

Build source-driven canonical reconciliation candidates

RF-17: replace arbitrary alphabetical first-50 reconciliation slices with reproducible source terms, FTS matches, glossary aliases, graph neighbours, page families, scores, reasons, and index digest.

## Scope

- In scope: source-derived query terms, candidate fusion from FTS/aliases/graph/page families, deterministic scoring/reasons, bounded additional search, index digest, full-catalog compatibility, and entity-resolution fixture metrics.
- Out of scope: deciding semantic identity in CLI; CURATOR remains authoritative.

## Plan

1. Extract deterministic candidate queries from source spans and structured terms.
2. Gather FTS, alias, graph-neighbour, and page-family candidates.
3. Score/dedupe with explicit reasons and bind to the index digest.
4. Provide bounded additional search when evidence is insufficient.
5. Compare fixture resolution coverage and eliminate alphabetical bias.

## Verify Steps

1. Rebuild candidates twice from the same source/index. Expected: identical ordering, reasons, scores, refs, and digest.
2. Use fixtures whose correct entity is beyond the old first-50 slice. Expected: the source-driven candidate set includes it without scanning an arbitrary alphabetical prefix.
3. Inspect semantic application. Expected: CLI supplies candidates/evidence only; CURATOR supplies the identity decision and rationale.
4. Run reconciliation/context tests and report fixture accuracy.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T10:00:51.850Z — VERIFY — ok

By: TESTER

Note: Pass: deterministic task-bound candidates cover a canonical entity after the prior first-50 range; fixture proves exact label, alias, FTS graph/page, graph-neighbour evidence, stable ordering, refs, and digest. CURATOR remains the only identity decision owner. Checks: agentplane build; 42 focused tests; Prettier; ESLint; diff check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T09:59:43.189Z, excerpt_hash=sha256:1ee0e13912c715c5168cc2acb390e543e1074f5d96a2692f2bd469ee40ef995d

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221852-YP9QCH-build-source-driven-canonical-reconciliation-can/.agentplane/tasks/202607221852-YP9QCH/blueprint/resolved-snapshot.json
- old_digest: 198a7d19555b5b9a35fd7db335c3335d455661b8d4ef0efb80d4a8972643c324
- current_digest: 198a7d19555b5b9a35fd7db335c3335d455661b8d4ef0efb80d4a8972643c324
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221852-YP9QCH

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221852-YP9QCH
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
