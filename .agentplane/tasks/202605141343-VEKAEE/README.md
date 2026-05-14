---
id: "202605141343-VEKAEE"
title: "Add structured blueprint route decision schema"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T13:45:09.692Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-14T13:56:33.385Z"
  updated_by: "CODER"
  note: "Verified: blueprint route decision SGR contract separates facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the blueprint route decision SGR schema inside the approved R793XK batch worktree and keeping verification evidence separate for this task."
events:
  -
    type: "status"
    at: "2026-05-14T13:46:10.813Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the blueprint route decision SGR schema inside the approved R793XK batch worktree and keeping verification evidence separate for this task."
  -
    type: "verify"
    at: "2026-05-14T13:56:33.385Z"
    author: "CODER"
    state: "ok"
    note: "Verified: blueprint route decision SGR contract separates facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings."
doc_version: 3
doc_updated_at: "2026-05-14T13:56:33.466Z"
doc_updated_by: "CODER"
description: "Add a structured Schema-Guided Reasoning contract for blueprint route decisions so facts, inferred task kind, rejected routes, selected route, evidence requirements, stop rules, and weak links can be inspected consistently."
sections:
  Summary: |-
    Add structured blueprint route decision schema

    Add a structured Schema-Guided Reasoning contract for blueprint route decisions so facts, inferred task kind, rejected routes, selected route, evidence requirements, stop rules, and weak links can be inspected consistently.
  Scope: |-
    - In scope: Add a structured Schema-Guided Reasoning contract for blueprint route decisions so facts, inferred task kind, rejected routes, selected route, evidence requirements, stop rules, and weak links can be inspected consistently.
    - Out of scope: unrelated refactors not required for "Add structured blueprint route decision schema".
  Plan: "Implement the blueprint route decision SGR schema as part of the R793XK batch worktree/PR. Add typed contracts and validation/tests for structured route decisions: facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links. Keep resolver behavior changes out of scope unless needed to export or validate the contract."
  Verify Steps: |-
    1. Inspect the blueprint route decision SGR contract and confirm it separates facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links.
    2. Run focused blueprint decision schema/model tests and confirm valid decision examples pass while decisions without selected route or rejection reasons fail.
    3. Run typecheck or the narrow package check covering the added exported contract.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-14T13:56:33.385Z — VERIFY — ok

    By: CODER

    Note: Verified: blueprint route decision SGR contract separates facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:46:10.813Z, excerpt_hash=sha256:e56d9789a410b016ddddbaadedf5fdcf904444e6a65b11cba12304b09c8df525

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141343-VEKAEE/blueprint/resolved-snapshot.json
    - old_digest: af8823fc9262759b82f7a0795d57d1ee6452ad7e32c93021953865cc32aac252
    - current_digest: af8823fc9262759b82f7a0795d57d1ee6452ad7e32c93021953865cc32aac252
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141343-VEKAEE

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add structured blueprint route decision schema

Add a structured Schema-Guided Reasoning contract for blueprint route decisions so facts, inferred task kind, rejected routes, selected route, evidence requirements, stop rules, and weak links can be inspected consistently.

## Scope

- In scope: Add a structured Schema-Guided Reasoning contract for blueprint route decisions so facts, inferred task kind, rejected routes, selected route, evidence requirements, stop rules, and weak links can be inspected consistently.
- Out of scope: unrelated refactors not required for "Add structured blueprint route decision schema".

## Plan

Implement the blueprint route decision SGR schema as part of the R793XK batch worktree/PR. Add typed contracts and validation/tests for structured route decisions: facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links. Keep resolver behavior changes out of scope unless needed to export or validate the contract.

## Verify Steps

1. Inspect the blueprint route decision SGR contract and confirm it separates facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links.
2. Run focused blueprint decision schema/model tests and confirm valid decision examples pass while decisions without selected route or rejection reasons fail.
3. Run typecheck or the narrow package check covering the added exported contract.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-14T13:56:33.385Z — VERIFY — ok

By: CODER

Note: Verified: blueprint route decision SGR contract separates facts, inferences, rejected routes, selected route, required evidence, stop rules, and weak links. Checks passed: bun test packages/agentplane/src/runtime/sgr/contracts.test.ts; bun run --filter=agentplane typecheck; focused eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor with only pre-existing branch_pr reconciliation warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T13:46:10.813Z, excerpt_hash=sha256:e56d9789a410b016ddddbaadedf5fdcf904444e6a65b11cba12304b09c8df525

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141342-R793XK-sgr-reliability-schemas/.agentplane/tasks/202605141343-VEKAEE/blueprint/resolved-snapshot.json
- old_digest: af8823fc9262759b82f7a0795d57d1ee6452ad7e32c93021953865cc32aac252
- current_digest: af8823fc9262759b82f7a0795d57d1ee6452ad7e32c93021953865cc32aac252
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141343-VEKAEE

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
