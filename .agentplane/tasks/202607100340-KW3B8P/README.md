---
id: "202607100340-KW3B8P"
title: "Keep pre-merge DONE tasks in the integration queue"
result_summary: "Made queue recovery, normalization, doctor, and lifecycle enforcement provider-aware for pre-merge closure."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "integration-queue"
  - "release-0.6.22"
verify:
  - "bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T03:47:05.755Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T03:52:21.632Z"
  updated_by: "CODER"
  note: "Pass: focused integration-queue tests 10/10; typecheck; lint:core; ci:contract; full fast suite; policy routing; doctor; diff validation. Pre-merge DONE entries now remain queued until provider merge and Hosted Close evidence."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T03:53:17.861Z"
  updated_by: "EVALUATOR"
  note: "Integration queue terminalization now follows provider PR and Hosted Close truth across recovery, normalization, and doctor paths."
  evaluated_sha: "79e4606eaf86abbb7727fd0671d4febc560acf7f"
  blueprint_digest: "4f38b9959c9c68fa544916dcd95fa5479cf8b5793c9b594bb3d9132d59245615"
  evidence_refs:
    - ".agentplane/tasks/202607100340-KW3B8P/README.md"
    - ".agentplane/tasks/202607100340-KW3B8P/quality/20260710-035317861-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100340-KW3B8P/quality/20260710-035317861-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100340-KW3B8P/quality/20260710-035317861-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100340-KW3B8P/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/integrate-queue-lane.test.ts"
    - "packages/agentplane/src/commands/integrate-queue-recovery.test.ts"
    - "scripts/checks/check-lifecycle-invariants.mjs"
  findings:
    - "No blocking findings; focused tests cover pre-merge DONE with an open PR and completion after close-tail evidence, while typecheck, lint, contract, full fast, routing, and doctor checks pass."
commit:
  hash: "79e4606eaf86abbb7727fd0671d4febc560acf7f"
  message: "🐛 KW3B8P integration-queue: retain premerge DONE entries"
comments:
  -
    author: "CODER"
    body: "Start: make integration queue terminalization depend on provider PR and Hosted Close state instead of local pre-merge DONE status."
  -
    author: "CODER"
    body: "Verified: integration queue retains pre-merge DONE tasks until provider merge and Hosted Close evidence, with focused and full regression coverage."
events:
  -
    type: "status"
    at: "2026-07-10T03:40:27.395Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make integration queue terminalization depend on provider PR and Hosted Close state instead of local pre-merge DONE status."
  -
    type: "verify"
    at: "2026-07-10T03:52:21.632Z"
    author: "CODER"
    state: "ok"
    note: "Pass: focused integration-queue tests 10/10; typecheck; lint:core; ci:contract; full fast suite; policy routing; doctor; diff validation. Pre-merge DONE entries now remain queued until provider merge and Hosted Close evidence."
  -
    type: "status"
    at: "2026-07-10T03:53:28.878Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: integration queue retains pre-merge DONE tasks until provider merge and Hosted Close evidence, with focused and full regression coverage."
doc_version: 3
doc_updated_at: "2026-07-10T03:53:28.878Z"
doc_updated_by: "CODER"
description: "For v0.6.22, keep branch_pr tasks that are locally DONE by pre-merge closure queued while their GitHub PR is still open, and retain merged lanes until Hosted Close evidence is complete."
sections:
  Summary: |-
    Keep pre-merge DONE tasks in the integration queue

    For v0.6.22, keep branch_pr tasks that are locally DONE by pre-merge closure queued while their GitHub PR is still open, and retain merged lanes until Hosted Close evidence is complete.
  Scope: |-
    - In scope: For v0.6.22, keep branch_pr tasks that are locally DONE by pre-merge closure queued while their GitHub PR is still open, and retain merged lanes until Hosted Close evidence is complete.
    - Out of scope: unrelated refactors not required for "Keep pre-merge DONE tasks in the integration queue".
  Plan: |-
    1. Add regression coverage for queued and handoff entries whose task is DONE by pre-merge closure while the provider PR remains OPEN.
    2. Make provider PR and close-tail evidence authoritative for queue terminalization across recovery, normalization, doctor, and the lifecycle invariant enforcement check.
    3. Keep merged lanes occupied until Hosted Close evidence is recorded, while preserving rework handling for closed or missing PRs.
    4. Replace the matching follow-up placeholder in docs/internal/v0.6.22-refactor-plan.md with this task id and keep the release task dependent on it.
    5. Run focused queue tests, typecheck, lint:core, ci:contract, and the full fast suite.
  Verify Steps: |-
    1. `bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts`
    2. `bun run typecheck`
    3. `bun run lint:core`
    4. `bun run ci:contract`
    5. `bun run test:fast`
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T03:52:21.632Z — VERIFY — ok

    By: CODER

    Note: Pass: focused integration-queue tests 10/10; typecheck; lint:core; ci:contract; full fast suite; policy routing; doctor; diff validation. Pre-merge DONE entries now remain queued until provider merge and Hosted Close evidence.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T03:47:05.419Z, excerpt_hash=sha256:cd66342590a2cdcd35fc53f92dccba8cdfd90b440ea42dc7bfeaabc4fa0307c0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100340-KW3B8P-keep-premerge-done-in-integration-queue/.agentplane/tasks/202607100340-KW3B8P/blueprint/resolved-snapshot.json
    - old_digest: 4f38b9959c9c68fa544916dcd95fa5479cf8b5793c9b594bb3d9132d59245615
    - current_digest: 4f38b9959c9c68fa544916dcd95fa5479cf8b5793c9b594bb3d9132d59245615
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100340-KW3B8P

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100340-KW3B8P
    - diagnostic_command: agentplane pr check 202607100340-KW3B8P
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Queue normalization and doctor previously treated local DONE as terminal before consulting the GitHub PR and close-tail state.
      Impact: Pre-merge closure could silently remove a still-open PR from the serialized integration lane and force direct integration fallback.
      Resolution: All terminalization paths now reuse provider-aware recovery decisions; regression tests cover queue normalization and doctor before and after Hosted Close.
extensions:
  implementation_commit:
    hash: "79e4606eaf86abbb7727fd0671d4febc560acf7f"
    message: "🐛 KW3B8P integration-queue: retain premerge DONE entries"
id_source: "generated"
---
## Summary

Keep pre-merge DONE tasks in the integration queue

For v0.6.22, keep branch_pr tasks that are locally DONE by pre-merge closure queued while their GitHub PR is still open, and retain merged lanes until Hosted Close evidence is complete.

## Scope

- In scope: For v0.6.22, keep branch_pr tasks that are locally DONE by pre-merge closure queued while their GitHub PR is still open, and retain merged lanes until Hosted Close evidence is complete.
- Out of scope: unrelated refactors not required for "Keep pre-merge DONE tasks in the integration queue".

## Plan

1. Add regression coverage for queued and handoff entries whose task is DONE by pre-merge closure while the provider PR remains OPEN.
2. Make provider PR and close-tail evidence authoritative for queue terminalization across recovery, normalization, doctor, and the lifecycle invariant enforcement check.
3. Keep merged lanes occupied until Hosted Close evidence is recorded, while preserving rework handling for closed or missing PRs.
4. Replace the matching follow-up placeholder in docs/internal/v0.6.22-refactor-plan.md with this task id and keep the release task dependent on it.
5. Run focused queue tests, typecheck, lint:core, ci:contract, and the full fast suite.

## Verify Steps

1. `bunx vitest run packages/agentplane/src/commands/integrate-queue-recovery.test.ts packages/agentplane/src/commands/integrate-queue-lane.test.ts`
2. `bun run typecheck`
3. `bun run lint:core`
4. `bun run ci:contract`
5. `bun run test:fast`

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T03:52:21.632Z — VERIFY — ok

By: CODER

Note: Pass: focused integration-queue tests 10/10; typecheck; lint:core; ci:contract; full fast suite; policy routing; doctor; diff validation. Pre-merge DONE entries now remain queued until provider merge and Hosted Close evidence.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T03:47:05.419Z, excerpt_hash=sha256:cd66342590a2cdcd35fc53f92dccba8cdfd90b440ea42dc7bfeaabc4fa0307c0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100340-KW3B8P-keep-premerge-done-in-integration-queue/.agentplane/tasks/202607100340-KW3B8P/blueprint/resolved-snapshot.json
- old_digest: 4f38b9959c9c68fa544916dcd95fa5479cf8b5793c9b594bb3d9132d59245615
- current_digest: 4f38b9959c9c68fa544916dcd95fa5479cf8b5793c9b594bb3d9132d59245615
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100340-KW3B8P

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100340-KW3B8P
- diagnostic_command: agentplane pr check 202607100340-KW3B8P
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Queue normalization and doctor previously treated local DONE as terminal before consulting the GitHub PR and close-tail state.
  Impact: Pre-merge closure could silently remove a still-open PR from the serialized integration lane and force direct integration fallback.
  Resolution: All terminalization paths now reuse provider-aware recovery decisions; regression tests cover queue normalization and doctor before and after Hosted Close.
