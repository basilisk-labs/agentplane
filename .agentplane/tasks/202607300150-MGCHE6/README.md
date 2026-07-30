---
id: "202607300150-MGCHE6"
title: "Recover diverged task PR identities safely"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "branch-pr"
  - "recovery"
  - "workflow"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T01:51:13.648Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T02:12:48.694Z"
  updated_by: "TESTER"
  note: "Focused recovery tests passed (29/29), typecheck passed, compatibility gate passed, and the full ci:contract suite passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T02:14:48.827Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "4eb1bca90c544aaa6a5eb3cf1ef220880a47b40a"
  blueprint_digest: "5ac7117996bb0ad45d2a4bfdd9ad0396bbf7d46881eeab9b3172419dea8e8f5e"
  evidence_refs:
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607300150-MGCHE6/README.md"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607300150-MGCHE6/quality/20260730-021448606-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No unsafe transition is introduced: recovery requires a clean dedicated task worktree, matching branch and exact observed SHA pair, then validates fetched provider truth before creating the archive/upstream/reset sequence."
    - "The test suite exercises mock refusal paths and a real bare remote recovery; the candidate compatibility inventory accounts for the three new public options."
commit:
  hash: "98320a03497de247e7391eb93d9fc053bd7d5ae2"
  message: "📝 MGCHE6 task: record verification and review evidence"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: recover the exact provider/local task-branch identity mismatch without losing the local rework commit or performing automatic semantic resolution."
  -
    author: "CODER"
    body: "Implementation: committed be17d45d4163; added explicit diverged-head recovery that archives the unpublished local SHA, validates the provider SHA after fetch, and resets only the clean dedicated task worktree; full ci:contract passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-30T01:51:17.231Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: recover the exact provider/local task-branch identity mismatch without losing the local rework commit or performing automatic semantic resolution."
  -
    type: "status"
    at: "2026-07-30T02:11:56.828Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: committed be17d45d4163; added explicit diverged-head recovery that archives the unpublished local SHA, validates the provider SHA after fetch, and resets only the clean dedicated task worktree; full ci:contract passed."
  -
    type: "status"
    at: "2026-07-30T02:12:17.722Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-07-30T02:12:48.694Z"
    author: "TESTER"
    state: "ok"
    note: "Focused recovery tests passed (29/29), typecheck passed, compatibility gate passed, and the full ci:contract suite passed."
  -
    type: "status"
    at: "2026-07-30T02:15:26.688Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-30T02:15:26.689Z"
doc_updated_by: "CODER"
description: "Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner."
sections:
  Summary: |-
    Recover diverged task PR identities safely

    Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner.
  Scope: |-
    - In scope: Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner.
    - Out of scope: unrelated refactors not required for "Recover diverged task PR identities safely".
  Plan: "1. Add an explicit branch_pr recovery command that accepts the observed local and provider head identities, fails closed on any drift, archives the local unpublished head under a deterministic recovery ref, fetches and adopts only the exact provider task-branch head, and never rebase-merges, force-pushes, or resolves semantic conflicts. 2. Expose the recovery result as a compact packet with archive ref, adopted head, and the exact follow-up conflict-rework command; register it in the PR CLI/help surface. 3. Cover success and refusal cases: head drift, non-conflicting or missing PR, dirty worktree, wrong branch, and archive collision. 4. Run focused tests plus contract/type checks; use the recovery command against MR9EA9 only after its local and remote SHAs are recorded, then rebuild its read-only conflict packet. 5. Do not publish, delete remote data, retry providers, or alter beta.1 qualification thresholds."
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover diverged task PR identities safely". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover diverged task PR identities safely". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T02:12:48.694Z — VERIFY — ok

    By: TESTER

    Note: Focused recovery tests passed (29/29), typecheck passed, compatibility gate passed, and the full ci:contract suite passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T02:12:17.722Z, excerpt_hash=sha256:8e32be94b05c9807415151f4973944015a4219dd2bf86685dbe1a4b2e09518d6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607300150-MGCHE6-recover-diverged-task-pr-identities-safely/.agentplane/tasks/202607300150-MGCHE6/blueprint/resolved-snapshot.json
    - old_digest: 5ac7117996bb0ad45d2a4bfdd9ad0396bbf7d46881eeab9b3172419dea8e8f5e
    - current_digest: 5ac7117996bb0ad45d2a4bfdd9ad0396bbf7d46881eeab9b3172419dea8e8f5e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607300150-MGCHE6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607300150-MGCHE6
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Recovery archives the exact unpublished SHA; it rejects stale identities, a provider move during fetch, and archive collisions.
      Impact: The task can safely re-enter normal conflict-rework preparation without overwriting local evidence or selecting semantic conflict resolution.
      Resolution: No rebase, merge, force-push, or provider write is performed; remaining semantic resolution stays on the existing conflict-rework route.
extensions:
  implementation_commit:
    hash: "4eb1bca90c544aaa6a5eb3cf1ef220880a47b40a"
    message: "📝 MGCHE6 task: record implementation evidence"
  workflow_route_baseline:
    start_head_sha: "88c7ead3e32920f31a219880f72651635c41778a"
    version: 1
id_source: "generated"
---
## Summary

Recover diverged task PR identities safely

Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner.

## Scope

- In scope: Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner.
- Out of scope: unrelated refactors not required for "Recover diverged task PR identities safely".

## Plan

1. Add an explicit branch_pr recovery command that accepts the observed local and provider head identities, fails closed on any drift, archives the local unpublished head under a deterministic recovery ref, fetches and adopts only the exact provider task-branch head, and never rebase-merges, force-pushes, or resolves semantic conflicts. 2. Expose the recovery result as a compact packet with archive ref, adopted head, and the exact follow-up conflict-rework command; register it in the PR CLI/help surface. 3. Cover success and refusal cases: head drift, non-conflicting or missing PR, dirty worktree, wrong branch, and archive collision. 4. Run focused tests plus contract/type checks; use the recovery command against MR9EA9 only after its local and remote SHAs are recorded, then rebuild its read-only conflict packet. 5. Do not publish, delete remote data, retry providers, or alter beta.1 qualification thresholds.

## Verify Steps

PLANNER fallback scaffold for "Recover diverged task PR identities safely". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover diverged task PR identities safely". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T02:12:48.694Z — VERIFY — ok

By: TESTER

Note: Focused recovery tests passed (29/29), typecheck passed, compatibility gate passed, and the full ci:contract suite passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T02:12:17.722Z, excerpt_hash=sha256:8e32be94b05c9807415151f4973944015a4219dd2bf86685dbe1a4b2e09518d6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607300150-MGCHE6-recover-diverged-task-pr-identities-safely/.agentplane/tasks/202607300150-MGCHE6/blueprint/resolved-snapshot.json
- old_digest: 5ac7117996bb0ad45d2a4bfdd9ad0396bbf7d46881eeab9b3172419dea8e8f5e
- current_digest: 5ac7117996bb0ad45d2a4bfdd9ad0396bbf7d46881eeab9b3172419dea8e8f5e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607300150-MGCHE6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607300150-MGCHE6
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Recovery archives the exact unpublished SHA; it rejects stale identities, a provider move during fetch, and archive collisions.
  Impact: The task can safely re-enter normal conflict-rework preparation without overwriting local evidence or selecting semantic conflict resolution.
  Resolution: No rebase, merge, force-push, or provider write is performed; remaining semantic resolution stays on the existing conflict-rework route.
