---
id: "202608101850-25R7W2"
title: "Recover legacy merged cleanup identity from the provider"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "cleanup"
  - "lifecycle"
  - "regression"
verify:
  - "bun test packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T18:50:49.930Z"
  updated_by: "USER"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-10T19:46:19.394Z"
  updated_by: "SUPERVISOR"
  note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-10T19:49:10.452Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 5 typed finding(s)."
  evaluated_sha: "d15d591b882d3d0618121becbf2327047e64958f"
  blueprint_digest: "4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82"
  evidence_refs:
    - ".agentplane/tasks/202608101850-25R7W2/quality/20260810-194650636-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608101850-25R7W2/quality/20260810-194650636-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608101850-25R7W2/quality/objects/sha256/079a629bad0909717d8888acc251d306775feb27adb7f7f72c320cf360dc140a.md"
    - ".agentplane/tasks/202608101850-25R7W2/quality/20260810-194650636-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608101850-25R7W2/quality/20260810-194650636-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608101850-25R7W2/quality/20260810-194650636-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608101850-25R7W2/README.md"
    - ".agentplane/tasks/202608101850-25R7W2/quality/objects/sha256/314d567f9a1af2263262a5ecddc90affb3ce24ff35dd6acdd8251da1abdab14e.patch"
    - ".agentplane/tasks/202608101850-25R7W2/quality/objects/sha256/2f4d7b16d0d46a41a001688fd1c4f33a2c710c78e3f63d2911b453197ecfca99.json"
    - ".agentplane/tasks/202608101850-25R7W2/verification/20260810194619394-73c1f07ad244c577.json"
    - ".agentplane/tasks/202608101850-25R7W2/quality/objects/sha256/b661d264dc7b3aa73fe445619628929aae1bf4434136ebd5c29807b06470b102.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Pass: requireUnique is opt-in at the cleanup provider boundary, so ordinary GitHub branch lookup behavior is unchanged while legacy cleanup rejects multiple valid PR records before selecting an identity."
    - "Pass: legacy cleanup still requires MERGED provider state, exact base, canonical locally available head and merge objects, merge containment on base, exact local/provider head equality, and closure evidence recorded on base."
    - "Pass: tests cover successful recovery plus multiple records, not-found, provider unavailable, OPEN, CLOSED, base mismatch, head mismatch, semantic local drift, missing closure evidence, and disagreement with an already recorded PR number."
    - "Operational follow-up: the four P02 branches still require live provider-backed dry-run qualification before any deletion; this evaluator packet intentionally has no network authority."
    - "Residual risk: Do not delete any P02 candidate until the updated CLI reports it as a dry-run cleanup candidate against current GitHub truth."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "repository"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "d15d591b882d3d0618121becbf2327047e64958f"
  message: "🚧 25R7W2 task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: deee9a3afda8. CLI accepted one state-bound external-agent semantic result."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: d15d591b882d. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-10T18:51:39.445Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-10T19:06:35.392Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: deee9a3afda8. CLI accepted one state-bound external-agent semantic result."
    commit: "deee9a3afda80cb7f4b532f96632dc2a6e43d4eb"
  -
    type: "verify"
    at: "2026-08-10T19:10:11.361Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
  -
    type: "status"
    at: "2026-08-10T19:40:53.990Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: d15d591b882d. CLI accepted one state-bound external-agent semantic result."
    commit: "d15d591b882d3d0618121becbf2327047e64958f"
  -
    type: "verify"
    at: "2026-08-10T19:46:19.394Z"
    author: "SUPERVISOR"
    state: "ok"
    note: "Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending."
doc_version: 3
doc_updated_at: "2026-08-10T19:46:25.778Z"
doc_updated_by: "SUPERVISOR"
description: "Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases."
sections:
  Summary: |-
    Recover legacy merged cleanup identity from the provider

    Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
  Scope: |-
    - In scope: Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
    - Out of scope: unrelated refactors not required for "Recover legacy merged cleanup identity from the provider".
  Plan: |-
    Goal: let an operator clean a legacy merged branch through the existing targeted AgentPlane cleanup command without weakening cleanup identity.

    1. Add a failing targeted-cleanup regression for a legacy task whose PR metadata has the exact task branch and pre-merge closure marker but no pr_number. Stub an exact provider lookup by branch and base that returns a merged PR whose head equals the local branch head and whose merge commit is on main.
    2. Change targetedCleanupProof to treat the exact branch-and-base provider observation as the missing PR identity when metadata has no number. Keep a recorded pr_number authoritative when it exists.
    3. Run the observed provider record through the same strict merged receipt, closure-on-base, commit-object, base-containment, and branch-head reconciliation checks used for modern metadata. Do not infer merge state from age, names, or local ancestry alone.
    4. Add negative regressions for multiple unsafe boundaries: provider not found or unavailable, open or closed PR, base mismatch, provider-head mismatch, local post-merge head drift, missing closure evidence, and a recorded PR number that disagrees with the provider.
    5. Verify the four known legacy cleanup candidates from the P02 inventory become dry-run candidates only when exact provider identity matches. No deletion is performed in this code task.
    6. Run focused cleanup proof suites, typecheck, lint, and critical CLI checks.

    Success: explicit cleanup by task id can recover old missing pr_number metadata from exact provider truth while every ambiguous or changed history remains blocked.
    Rollback: revert the isolated fallback and its tests; legacy cleanup returns to the current fail-closed behavior.
  Verify Steps: |-
    PLANNER fallback scaffold for "Recover legacy merged cleanup identity from the provider". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Recover legacy merged cleanup identity from the provider". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-10T19:10:11.361Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T19:06:35.392Z, excerpt_hash=sha256:c43c26e154b15bf38457790b4eea19f4ea45147d63426a96e590f7c88ea4dfeb

    Details:

    Command: bun test packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608101850-25R7W2 declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608101850-25R7W2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101850-25R7W2-recover-legacy-merged-cleanup-identity-from-the/.agentplane/tasks/202608101850-25R7W2/blueprint/resolved-snapshot.json
    - old_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
    - current_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101850-25R7W2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101850-25R7W2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T19:46:19.394Z — VERIFY — ok

    By: SUPERVISOR

    Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T19:40:53.990Z, excerpt_hash=sha256:c43c26e154b15bf38457790b4eea19f4ea45147d63426a96e590f7c88ea4dfeb

    Details:

    Command: bun test packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts
    Result: pass
    Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608101850-25R7W2 declared verification

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-2
    Scope: branch_pr task 202608101850-25R7W2 declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101850-25R7W2-recover-legacy-merged-cleanup-identity-from-the/.agentplane/tasks/202608101850-25R7W2/blueprint/resolved-snapshot.json
    - old_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
    - current_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101850-25R7W2

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101850-25R7W2
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "52cca0b0097a5ec4682b90a25b9ba98d7abaef0c"
    version: 1
id_source: "generated"
---
## Summary

Recover legacy merged cleanup identity from the provider

Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.

## Scope

- In scope: Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
- Out of scope: unrelated refactors not required for "Recover legacy merged cleanup identity from the provider".

## Plan

Goal: let an operator clean a legacy merged branch through the existing targeted AgentPlane cleanup command without weakening cleanup identity.

1. Add a failing targeted-cleanup regression for a legacy task whose PR metadata has the exact task branch and pre-merge closure marker but no pr_number. Stub an exact provider lookup by branch and base that returns a merged PR whose head equals the local branch head and whose merge commit is on main.
2. Change targetedCleanupProof to treat the exact branch-and-base provider observation as the missing PR identity when metadata has no number. Keep a recorded pr_number authoritative when it exists.
3. Run the observed provider record through the same strict merged receipt, closure-on-base, commit-object, base-containment, and branch-head reconciliation checks used for modern metadata. Do not infer merge state from age, names, or local ancestry alone.
4. Add negative regressions for multiple unsafe boundaries: provider not found or unavailable, open or closed PR, base mismatch, provider-head mismatch, local post-merge head drift, missing closure evidence, and a recorded PR number that disagrees with the provider.
5. Verify the four known legacy cleanup candidates from the P02 inventory become dry-run candidates only when exact provider identity matches. No deletion is performed in this code task.
6. Run focused cleanup proof suites, typecheck, lint, and critical CLI checks.

Success: explicit cleanup by task id can recover old missing pr_number metadata from exact provider truth while every ambiguous or changed history remains blocked.
Rollback: revert the isolated fallback and its tests; legacy cleanup returns to the current fail-closed behavior.

## Verify Steps

PLANNER fallback scaffold for "Recover legacy merged cleanup identity from the provider". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Recover legacy merged cleanup identity from the provider". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-10T19:10:11.361Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T19:06:35.392Z, excerpt_hash=sha256:c43c26e154b15bf38457790b4eea19f4ea45147d63426a96e590f7c88ea4dfeb

Details:

Command: bun test packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts
Result: pass
Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608101850-25R7W2 declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608101850-25R7W2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101850-25R7W2-recover-legacy-merged-cleanup-identity-from-the/.agentplane/tasks/202608101850-25R7W2/blueprint/resolved-snapshot.json
- old_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
- current_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101850-25R7W2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101850-25R7W2
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T19:46:19.394Z — VERIFY — ok

By: SUPERVISOR

Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T19:40:53.990Z, excerpt_hash=sha256:c43c26e154b15bf38457790b4eea19f4ea45147d63426a96e590f7c88ea4dfeb

Details:

Command: bun test packages/agentplane/src/commands/branch/cleanup-merged-provider-receipt.test.ts packages/agentplane/src/commands/branch/cleanup-merged-provider-rebase.test.ts packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts
Result: pass
Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608101850-25R7W2 declared verification

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608101850-25R7W2/supervision/declared-checks.json#check-2
Scope: branch_pr task 202608101850-25R7W2 declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101850-25R7W2-recover-legacy-merged-cleanup-identity-from-the/.agentplane/tasks/202608101850-25R7W2/blueprint/resolved-snapshot.json
- old_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
- current_digest: 4c6d7d1bd6cfd331e0afd25e7d4f5f805c1d4cd4c0223e935cb363f5a33e6f82
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101850-25R7W2

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101850-25R7W2
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
