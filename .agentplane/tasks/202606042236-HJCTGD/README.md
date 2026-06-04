---
id: "202606042236-HJCTGD"
title: "Commit included batch ownership artifacts"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cognitive-load"
  - "followup"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T22:37:05.838Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T22:38:11.243Z"
  updated_by: "CODER"
  note: "Verified: PR artifact auto-commit now includes related included task packets changed by syncPrArtifacts. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: include batch ownership README changes in PR artifact auto-commit to avoid dirty-tree stale-head loops."
events:
  -
    type: "status"
    at: "2026-06-04T22:37:06.202Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: include batch ownership README changes in PR artifact auto-commit to avoid dirty-tree stale-head loops."
  -
    type: "verify"
    at: "2026-06-04T22:38:11.243Z"
    author: "CODER"
    state: "ok"
    note: "Verified: PR artifact auto-commit now includes related included task packets changed by syncPrArtifacts. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane."
doc_version: 3
doc_updated_at: "2026-06-04T22:38:11.344Z"
doc_updated_by: "CODER"
description: "Ensure PR artifact updates commit included task batch ownership README changes together with primary PR artifacts, avoiding dirty-tree and stale-head loops."
sections:
  Summary: |-
    Commit included batch ownership artifacts

    Ensure PR artifact updates commit included task batch ownership README changes together with primary PR artifacts, avoiding dirty-tree and stale-head loops.
  Scope: |-
    - In scope: Ensure PR artifact updates commit included task batch ownership README changes together with primary PR artifacts, avoiding dirty-tree and stale-head loops.
    - Out of scope: unrelated refactors not required for "Commit included batch ownership artifacts".
  Plan: "Extend PR artifact auto-commit to include task packets for related included tasks changed by syncPrArtifacts, pass includeTaskIds from pr open/update, and cover the included README staging behavior with a focused unit test."
  Verify Steps: |-
    PLANNER fallback scaffold for "Commit included batch ownership artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Commit included batch ownership artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T22:38:11.243Z — VERIFY — ok

    By: CODER

    Note: Verified: PR artifact auto-commit now includes related included task packets changed by syncPrArtifacts. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:37:06.202Z, excerpt_hash=sha256:72a842403af4e5e456d6c8ceca7f942d487b7539bf1dbe95938f553682242607

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042236-HJCTGD/blueprint/resolved-snapshot.json
    - old_digest: 46bd9a4023825979383d00c53585c929ff80f663549a52c3b53172109aa019d6
    - current_digest: 46bd9a4023825979383d00c53585c929ff80f663549a52c3b53172109aa019d6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042236-HJCTGD

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042236-HJCTGD --agent CODER --slug commit-included-batch-ownership-artifacts --worktree
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202606042157-020DWK/reduce-agent-cognitive-load-and-publish-next-pat"
    included_task_ids:
      - "202606042204-NX58GD"
      - "202606042214-GEJ627"
      - "202606042225-FE57GC"
      - "202606042230-T1RYR8"
      - "202606042236-HJCTGD"
      - "202606042239-5Z9J95"
    primary_task_id: "202606042157-020DWK"
    role: "included"
    updated_at: "2026-06-04T22:47:08.942Z"
id_source: "generated"
---
## Summary

Commit included batch ownership artifacts

Ensure PR artifact updates commit included task batch ownership README changes together with primary PR artifacts, avoiding dirty-tree and stale-head loops.

## Scope

- In scope: Ensure PR artifact updates commit included task batch ownership README changes together with primary PR artifacts, avoiding dirty-tree and stale-head loops.
- Out of scope: unrelated refactors not required for "Commit included batch ownership artifacts".

## Plan

Extend PR artifact auto-commit to include task packets for related included tasks changed by syncPrArtifacts, pass includeTaskIds from pr open/update, and cover the included README staging behavior with a focused unit test.

## Verify Steps

PLANNER fallback scaffold for "Commit included batch ownership artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Commit included batch ownership artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T22:38:11.243Z — VERIFY — ok

By: CODER

Note: Verified: PR artifact auto-commit now includes related included task packets changed by syncPrArtifacts. Checks: bunx vitest run packages/agentplane/src/commands/pr/internal/auto-commit.test.ts; npm run typecheck in packages/agentplane; npm run build in packages/agentplane.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:37:06.202Z, excerpt_hash=sha256:72a842403af4e5e456d6c8ceca7f942d487b7539bf1dbe95938f553682242607

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042236-HJCTGD/blueprint/resolved-snapshot.json
- old_digest: 46bd9a4023825979383d00c53585c929ff80f663549a52c3b53172109aa019d6
- current_digest: 46bd9a4023825979383d00c53585c929ff80f663549a52c3b53172109aa019d6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042236-HJCTGD

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042236-HJCTGD --agent CODER --slug commit-included-batch-ownership-artifacts --worktree
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- runner_required: false
- runner_failure_means: not_runner_route
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
