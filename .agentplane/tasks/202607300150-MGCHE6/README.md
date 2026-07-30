---
id: "202607300150-MGCHE6"
title: "Recover diverged task PR identities safely"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "be17d45d4163a4b207b85aba2d3ee61a57b7a7ed"
  message: "✨ MGCHE6 task: safely recover diverged PR identity"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: recover the exact provider/local task-branch identity mismatch without losing the local rework commit or performing automatic semantic resolution."
  -
    author: "CODER"
    body: "Implementation: committed be17d45d4163; added explicit diverged-head recovery that archives the unpublished local SHA, validates the provider SHA after fetch, and resets only the clean dedicated task worktree; full ci:contract passed."
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
doc_version: 3
doc_updated_at: "2026-07-30T02:12:17.722Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
