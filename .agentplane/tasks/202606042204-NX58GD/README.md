---
id: "202606042204-NX58GD"
title: "Make commit hook failures action-specific"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "cli"
  - "code"
  - "diagnostics"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T22:04:24.876Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-04T22:06:48.886Z"
  updated_by: "CODER"
  note: "Verified: commit hook diagnostics now classify subject policy and DCO failures with action-specific reason codes and next actions."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: improving commit hook diagnostics discovered while committing task 202606042157-020DWK, within the same PR batch."
events:
  -
    type: "status"
    at: "2026-06-04T22:04:30.914Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: improving commit hook diagnostics discovered while committing task 202606042157-020DWK, within the same PR batch."
  -
    type: "verify"
    at: "2026-06-04T22:06:48.886Z"
    author: "CODER"
    state: "ok"
    note: "Verified: commit hook diagnostics now classify subject policy and DCO failures with action-specific reason codes and next actions."
doc_version: 3
doc_updated_at: "2026-06-04T22:06:49.050Z"
doc_updated_by: "CODER"
description: "Refactor commit hook diagnostics so commit subject and DCO failures return action-specific reason codes and next actions instead of generic git_context guidance."
sections:
  Summary: |-
    Make commit hook failures action-specific

    Refactor commit hook diagnostics so commit subject and DCO failures return action-specific reason codes and next actions instead of generic git_context guidance.
  Scope: |-
    - In scope: Refactor commit hook diagnostics so commit subject and DCO failures return action-specific reason codes and next actions instead of generic git_context guidance.
    - Out of scope: unrelated refactors not required for "Make commit hook failures action-specific".
  Plan: |-
    Scope: improve commit hook failure diagnostics encountered during task 202606042157-020DWK.

    Plan:
    1. Locate commit hook diagnostic classification for commit subject format and DCO sign-off failures.
    2. Replace generic git_context reason metadata with action-specific reason_code/reason_action/next_action guidance where possible.
    3. Add focused tests for invalid subject and missing DCO outputs.
    4. Verify with focused commit diagnostic tests, typecheck, and live/fixture output checks if available.
    5. Include this task in PR #4442 batch before release work continues.
  Verify Steps: |-
    1. Run focused commit diagnostics tests. Expected: invalid commit subject and missing DCO failures emit action-specific reason_code, reason_action, and next_action instead of generic git_context guidance.
    2. Run agentplane typecheck. Expected: no TypeScript regressions in commit diagnostics code.
    3. Inspect the diff for hook-output ambiguity. Expected: every changed diagnostic tells the agent exactly what to fix before retrying commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-04T22:06:48.886Z — VERIFY — ok

    By: CODER

    Note: Verified: commit hook diagnostics now classify subject policy and DCO failures with action-specific reason codes and next actions.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:04:30.914Z, excerpt_hash=sha256:649aa191f7ec3188d9b00f6278d26996c150b4beff25c5d68250bbaedc053225

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042204-NX58GD/blueprint/resolved-snapshot.json
    - old_digest: c703fe7387f8198f662d1257e31867ba97cb07e4170b7beea385ab1c7fd7dca1
    - current_digest: c703fe7387f8198f662d1257e31867ba97cb07e4170b7beea385ab1c7fd7dca1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606042204-NX58GD

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606042204-NX58GD --agent CODER --slug make-commit-hook-failures-action-specific --worktree
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
  Findings: |-
    - Observation: Command: bunx vitest run packages/agentplane/src/commands/guard/impl/commit-diagnostics.unit.test.ts packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts. Result: pass. Evidence: 3 files, 27 tests passed. Scope: commit diagnostic classification and error rendering compatibility.\nCommand: npm run typecheck in packages/agentplane. Result: pass. Evidence: tsc -b completed. Scope: agentplane TypeScript.\nCommand: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: changed diagnostics diff.
      Impact: Agents no longer get generic git_context guidance for subject-format or DCO failures and can retry the exact corrected commit path.
      Resolution: Added commit_subject and dco signals, mapped them to git_commit_subject_policy and git_commit_dco_missing reason codes, and covered both with focused unit tests.
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
    primary_task_id: "202606042157-020DWK"
    role: "included"
    updated_at: "2026-06-04T22:38:19.116Z"
id_source: "generated"
---
## Summary

Make commit hook failures action-specific

Refactor commit hook diagnostics so commit subject and DCO failures return action-specific reason codes and next actions instead of generic git_context guidance.

## Scope

- In scope: Refactor commit hook diagnostics so commit subject and DCO failures return action-specific reason codes and next actions instead of generic git_context guidance.
- Out of scope: unrelated refactors not required for "Make commit hook failures action-specific".

## Plan

Scope: improve commit hook failure diagnostics encountered during task 202606042157-020DWK.

Plan:
1. Locate commit hook diagnostic classification for commit subject format and DCO sign-off failures.
2. Replace generic git_context reason metadata with action-specific reason_code/reason_action/next_action guidance where possible.
3. Add focused tests for invalid subject and missing DCO outputs.
4. Verify with focused commit diagnostic tests, typecheck, and live/fixture output checks if available.
5. Include this task in PR #4442 batch before release work continues.

## Verify Steps

1. Run focused commit diagnostics tests. Expected: invalid commit subject and missing DCO failures emit action-specific reason_code, reason_action, and next_action instead of generic git_context guidance.
2. Run agentplane typecheck. Expected: no TypeScript regressions in commit diagnostics code.
3. Inspect the diff for hook-output ambiguity. Expected: every changed diagnostic tells the agent exactly what to fix before retrying commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-04T22:06:48.886Z — VERIFY — ok

By: CODER

Note: Verified: commit hook diagnostics now classify subject policy and DCO failures with action-specific reason codes and next actions.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-04T22:04:30.914Z, excerpt_hash=sha256:649aa191f7ec3188d9b00f6278d26996c150b4beff25c5d68250bbaedc053225

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042157-020DWK-reduce-agent-cognitive-load-and-publish-next-pat/.agentplane/tasks/202606042204-NX58GD/blueprint/resolved-snapshot.json
- old_digest: c703fe7387f8198f662d1257e31867ba97cb07e4170b7beea385ab1c7fd7dca1
- current_digest: c703fe7387f8198f662d1257e31867ba97cb07e4170b7beea385ab1c7fd7dca1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606042204-NX58GD

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606042204-NX58GD --agent CODER --slug make-commit-hook-failures-action-specific --worktree
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

- Observation: Command: bunx vitest run packages/agentplane/src/commands/guard/impl/commit-diagnostics.unit.test.ts packages/agentplane/src/cli/error-map.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.finish-validation.test.ts. Result: pass. Evidence: 3 files, 27 tests passed. Scope: commit diagnostic classification and error rendering compatibility.\nCommand: npm run typecheck in packages/agentplane. Result: pass. Evidence: tsc -b completed. Scope: agentplane TypeScript.\nCommand: git diff --check. Result: pass. Evidence: no whitespace errors. Scope: changed diagnostics diff.
  Impact: Agents no longer get generic git_context guidance for subject-format or DCO failures and can retry the exact corrected commit path.
  Resolution: Added commit_subject and dco signals, mapped them to git_commit_subject_policy and git_commit_dco_missing reason codes, and covered both with focused unit tests.
