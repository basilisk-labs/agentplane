---
id: "202605311543-KS7B7N"
title: "Detect landed included tasks in route oracle"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "release"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run release:tasks:check"
  - "bun run verify:cli"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:44.616Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-31T16:06:11.546Z"
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
    at: "2026-05-31T15:53:25.729Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
  -
    type: "verify"
    at: "2026-05-31T16:06:11.546Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed."
doc_version: 3
doc_updated_at: "2026-05-31T16:06:11.574Z"
doc_updated_by: "CODER"
description: "Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed."
sections:
  Summary: |-
    Detect landed included tasks in route oracle

    Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
  Scope: |-
    - In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
    - Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".
  Plan: |-
    1. Add tests that reproduce a verified included batch task returning generic worktree_needed.
    2. Update route classification to emit an included-task closure phase with landed evidence requirements.
    3. Make next-action output include the exact safe recovery command and checkout.
    4. Verify release:tasks:check and routing checks still pass.
  Verify Steps: |-
    PLANNER fallback scaffold for "Detect landed included tasks in route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Detect landed included tasks in route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-31T16:06:11.546Z — VERIFY — ok

    By: CODER

    Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:25.729Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
    - old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Detect landed included tasks in route oracle

Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.

## Scope

- In scope: Teach branch_pr route oracle to classify verified included batch tasks whose implementation already landed but whose finish metadata is missing, instead of returning generic missing_pr_branch/worktree_needed.
- Out of scope: unrelated refactors not required for "Detect landed included tasks in route oracle".

## Plan

1. Add tests that reproduce a verified included batch task returning generic worktree_needed.
2. Update route classification to emit an included-task closure phase with landed evidence requirements.
3. Make next-action output include the exact safe recovery command and checkout.
4. Verify release:tasks:check and routing checks still pass.

## Verify Steps

PLANNER fallback scaffold for "Detect landed included tasks in route oracle". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Detect landed included tasks in route oracle". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-31T16:06:11.546Z — VERIFY — ok

By: CODER

Note: Verified: release recovery CLI/policy batch implemented in commit c7c33342a. Checks passed: bun run --filter=agentplane typecheck; bun run format:changed; node .agentplane/policy/check-routing.mjs; bun run agents:check; targeted Vitest suites for route decision, cleanup merged, evaluator run, PR open/lifecycle, and help snapshots. Manual route fixture confirmed verified included task now resolves to included_task_closure_needed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-31T15:53:25.729Z, excerpt_hash=sha256:beb5bd452492d76123ec1a8c66795f45175489a93433f8e07b116e8e46ffff37

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605311543-KS7B7N-release-recovery-cli-improvements/.agentplane/tasks/202605311543-KS7B7N/blueprint/resolved-snapshot.json
- old_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- current_digest: ff69bd52fc87a1822177d4063acfbfafbd1386d22e095af36f94d20dc6dd311f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605311543-KS7B7N

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
