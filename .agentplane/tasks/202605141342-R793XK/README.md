---
id: "202605141342-R793XK"
title: "Add SGR schema for context extraction"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T13:44:37.794Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T14:30:19.406Z"
  updated_by: "CODER"
  note: "Verified: context extraction SGR contract is now consumed by the task-history CURATOR extraction prompt with a validated context_extraction v1 example and source_refs requirement. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the primary SGR reliability schema batch for context extraction, evaluator result, and blueprint decision contracts in one branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-14T13:45:49.508Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the primary SGR reliability schema batch for context extraction, evaluator result, and blueprint decision contracts in one branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-14T13:55:53.191Z"
    author: "CODER"
    state: "ok"
    note: "Verified: context extraction SGR contract requires source_refs, confidence, status, stale/conflict markers, and bounded output kinds. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
  -
    type: "verify"
    at: "2026-05-14T14:30:19.406Z"
    author: "CODER"
    state: "ok"
    note: "Verified: context extraction SGR contract is now consumed by the task-history CURATOR extraction prompt with a validated context_extraction v1 example and source_refs requirement. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
doc_version: 3
doc_updated_at: "2026-05-14T14:30:19.429Z"
doc_updated_by: "CODER"
description: "Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable."
sections:
  Summary: |-
    Add SGR schema for context extraction

    Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.
  Scope: |-
    - In scope: Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.
    - Out of scope: unrelated refactors not required for "Add SGR schema for context extraction".
  Plan: "Primary batch task for SGR reliability contracts. Implement the context extraction schema first, and include dependent tasks 202605141343-89PDXP and 202605141343-VEKAEE in the same batch worktree/PR. Add typed contracts and validation/tests for context extraction outputs so extracted knowledge is source-backed and machine-checkable. Keep runtime execution behavior out of scope unless required by tests."
  Verify Steps: |-
    1. Inspect the added context extraction SGR contract and confirm it requires source-backed extracted items with source_refs, confidence, status, stale/conflict markers, and bounded output kinds.
    2. Run focused tests for the context SGR schema/model and confirm valid context extraction examples pass while missing source references fail.
    3. Run typecheck or the narrow package check covering the added exported contract.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T13:55:53.191Z — VERIFY — ok

    By: CODER

    Note: Verified: context extraction SGR contract requires source_refs, confidence, status, stale/conflict markers, and bounded output kinds. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:45:49.508Z, excerpt_hash=sha256:a7531b2c3f148b666efe26a63857f423cbb5bfba26315741bb5d1815d542f510

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141342-R793XK/blueprint/resolved-snapshot.json
    - old_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
    - current_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141342-R793XK

    ### 2026-05-14T14:30:19.406Z — VERIFY — ok

    By: CODER

    Note: Verified: context extraction SGR contract is now consumed by the task-history CURATOR extraction prompt with a validated context_extraction v1 example and source_refs requirement. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:55:53.399Z, excerpt_hash=sha256:a7531b2c3f148b666efe26a63857f423cbb5bfba26315741bb5d1815d542f510

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141342-R793XK/blueprint/resolved-snapshot.json
    - old_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
    - current_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141342-R793XK

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add SGR schema for context extraction

Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.

## Scope

- In scope: Introduce a structured Schema-Guided Reasoning contract for context harvest/CURATOR extraction so extracted facts, wiki updates, graph edges, confidence, stale markers, conflict markers, and source refs are machine-checkable.
- Out of scope: unrelated refactors not required for "Add SGR schema for context extraction".

## Plan

Primary batch task for SGR reliability contracts. Implement the context extraction schema first, and include dependent tasks 202605141343-89PDXP and 202605141343-VEKAEE in the same batch worktree/PR. Add typed contracts and validation/tests for context extraction outputs so extracted knowledge is source-backed and machine-checkable. Keep runtime execution behavior out of scope unless required by tests.

## Verify Steps

1. Inspect the added context extraction SGR contract and confirm it requires source-backed extracted items with source_refs, confidence, status, stale/conflict markers, and bounded output kinds.
2. Run focused tests for the context SGR schema/model and confirm valid context extraction examples pass while missing source references fail.
3. Run typecheck or the narrow package check covering the added exported contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T13:55:53.191Z — VERIFY — ok

By: CODER

Note: Verified: context extraction SGR contract requires source_refs, confidence, status, stale/conflict markers, and bounded output kinds. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:45:49.508Z, excerpt_hash=sha256:a7531b2c3f148b666efe26a63857f423cbb5bfba26315741bb5d1815d542f510

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141342-R793XK/blueprint/resolved-snapshot.json
- old_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
- current_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141342-R793XK

### 2026-05-14T14:30:19.406Z — VERIFY — ok

By: CODER

Note: Verified: context extraction SGR contract is now consumed by the task-history CURATOR extraction prompt with a validated context_extraction v1 example and source_refs requirement. Checks passed after CI knip fix: bun test focused SGR/blueprint/evaluator/context files; bun run --filter=agentplane typecheck; bun run knip:check; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:55:53.399Z, excerpt_hash=sha256:a7531b2c3f148b666efe26a63857f423cbb5bfba26315741bb5d1815d542f510

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141342-R793XK/blueprint/resolved-snapshot.json
- old_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
- current_digest: a717e7d4932f17f5c234fdd15818369b0c8cc1a5cdf1c10a43376834f842104b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141342-R793XK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
