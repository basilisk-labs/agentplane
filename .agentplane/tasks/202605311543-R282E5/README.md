---
id: "202605311543-R282E5"
title: "Make evaluator recovery batch-friendly"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "evaluator"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- evaluator"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:47.937Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:06:22.915Z"
  updated_by: "CODER"
  note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:30.481Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:22.915Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
doc_version: 3
doc_updated_at: "2026-05-31T16:06:22.941Z"
doc_updated_by: "CODER"
description: "Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written."
sections:
  Summary: |-
    Make evaluator recovery batch-friendly

    Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.
  Scope: |-
    - In scope: Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.
    - Out of scope: unrelated refactors not required for "Make evaluator recovery batch-friendly".
  Plan: |-
    1. Reproduce multi-task evaluator sequencing where the first evaluator artifact dirties the subtree.
    2. Add a batch command or clearer next-step guidance for evaluator -> finish -> commit sequencing.
    3. Ensure partial failures leave an inspectable state with no hidden task mutation.
    4. Add regression tests for related-task closure flows.
  Verify Steps: |-
    PLANNER fallback scaffold for "Make evaluator recovery batch-friendly". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Make evaluator recovery batch-friendly". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:22.915Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:30.481Z, excerpt_hash=sha256:a0745f2fcf4b4c0357d1dcddf1d16e37826c4c2ac2d86f7ffec443fdbf2c28af

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-R282E5/blueprint/resolved-snapshot.json
    - old_digest: 13e4b239b3a5024c011f77dc2dc1e375e2400b997a75a28bca1cfef902e21bef
    - current_digest: 13e4b239b3a5024c011f77dc2dc1e375e2400b997a75a28bca1cfef902e21bef
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-R282E5

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make evaluator recovery batch-friendly

Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.

## Scope

- In scope: Improve evaluator and finish sequencing for multiple related tasks by adding batch support or precise dirty-subtree recovery guidance after evaluator artifacts are written.
- Out of scope: unrelated refactors not required for "Make evaluator recovery batch-friendly".

## Plan

1. Reproduce multi-task evaluator sequencing where the first evaluator artifact dirties the subtree.
2. Add a batch command or clearer next-step guidance for evaluator -> finish -> commit sequencing.
3. Ensure partial failures leave an inspectable state with no hidden task mutation.
4. Add regression tests for related-task closure flows.

## Verify Steps

PLANNER fallback scaffold for "Make evaluator recovery batch-friendly". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Make evaluator recovery batch-friendly". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:22.915Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:30.481Z, excerpt_hash=sha256:a0745f2fcf4b4c0357d1dcddf1d16e37826c4c2ac2d86f7ffec443fdbf2c28af

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-R282E5/blueprint/resolved-snapshot.json
- old_digest: 13e4b239b3a5024c011f77dc2dc1e375e2400b997a75a28bca1cfef902e21bef
- current_digest: 13e4b239b3a5024c011f77dc2dc1e375e2400b997a75a28bca1cfef902e21bef
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-R282E5

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
