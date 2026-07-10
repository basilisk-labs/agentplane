---
id: "202607100436-D7QB76"
title: "Anchor evaluator reviews for metadata-only tasks"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "evaluator"
  - "quality"
  - "release-0.6.22"
verify:
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
  - "node .agentplane/policy/check-routing.mjs"
  - "ap doctor"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T04:36:16.223Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T12:46:22.248Z"
  updated_by: "REVIEWER"
  note: "Evaluator reruns now preserve an ancestral reviewed SHA across managed quality, PR, blueprint, and README advances while still selecting new task-local or code work. Focused 2/12, targeted 10/133, typecheck, lint, ci:contract, test:fast 364/2157, policy routing, and doctor passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T12:46:28.705Z"
  updated_by: "EVALUATOR"
  note: "Metadata-only evaluator targets remain stable across committed review and PR artifacts after rebase."
  evaluated_sha: "0b817152a8da33505a18974d6a3c069141345e21"
  blueprint_digest: "4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f"
  evidence_refs:
    - ".agentplane/tasks/202607100436-D7QB76/README.md"
    - ".agentplane/tasks/202607100436-D7QB76/quality/20260710-124628705-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100436-D7QB76/quality/20260710-124628705-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100436-D7QB76/quality/20260710-124628705-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100436-D7QB76/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
  findings:
    - "Two-pass regression proves a repeated review remains anchored to the original metadata work unit; explicit new work still supersedes the prior target."
commit:
  hash: "6b28d0fc5273bd6f22e6b502ebc393fb463dbfca"
  message: "🧪 D7QB76 task: verify stable evaluator reruns"
comments:
  -
    author: "CODER"
    body: "Start: implement and verify a strict evaluator target for metadata-only task and documentation commits."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure after rebase and review fix."
events:
  -
    type: "status"
    at: "2026-07-10T10:34:39.295Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement and verify a strict evaluator target for metadata-only task and documentation commits."
  -
    type: "verify"
    at: "2026-07-10T10:47:38.387Z"
    author: "REVIEWER"
    state: "ok"
    note: "Focused evaluator/finish regressions pass (2 files, 11 tests); typecheck, lint:core, ci:contract, test:fast (364 files/2153 tests), policy routing, and doctor pass. The evaluator keeps code targets, anchors the current pure metadata work unit, and rejects unrelated task artifacts."
  -
    type: "status"
    at: "2026-07-10T10:53:10.994Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-10T12:46:22.248Z"
    author: "REVIEWER"
    state: "ok"
    note: "Evaluator reruns now preserve an ancestral reviewed SHA across managed quality, PR, blueprint, and README advances while still selecting new task-local or code work. Focused 2/12, targeted 10/133, typecheck, lint, ci:contract, test:fast 364/2157, policy routing, and doctor passed."
  -
    type: "status"
    at: "2026-07-10T12:47:50.847Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure after rebase and review fix."
doc_version: 3
doc_updated_at: "2026-07-10T12:47:50.848Z"
doc_updated_by: "CODER"
description: "For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit."
sections:
  Summary: |-
    Anchor evaluator reviews for metadata-only tasks

    For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
  Scope: |-
    - In scope: For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
    - Out of scope: unrelated refactors not required for "Anchor evaluator reviews for metadata-only tasks".
  Plan: |-
    1. Add a metadata-only evaluator regression that changes task/docs artifacts without an implementation-code commit.
    2. Define an auditable evaluated SHA rule that remains strict for implementation tasks but does not skip the current metadata-only work unit.
    3. Preserve finish freshness and unrelated-artifact rejection.
    4. Replace the matching evaluator follow-up placeholder in the v0.6.22 plan and keep the release task dependent on it.
    5. Run focused evaluator/finish tests, typecheck, lint:core, ci:contract, and full fast.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts`. Expected: code tasks still target their implementation commit, pure current-task metadata work targets its own latest committed work unit, unrelated workflow artifacts are rejected, and later evaluator artifacts preserve the reviewed metadata SHA.
    2. Run `bun run typecheck`. Expected: TypeScript contracts remain valid.
    3. Run `bun run lint:core`. Expected: core lint passes.
    4. Run `bun run ci:contract`. Expected: public CLI, architecture, Knip, clone, and coverage contracts remain unchanged.
    5. Run `bun run test:fast`. Expected: the full fast regression suite passes.
    6. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.
    7. Merge through the integration queue, complete Hosted Close, pull `main`, and inspect `ap integrate queue list --json`. Expected: task `202607100435-A932SP` is automatically released from `handoff` by its valid merged pre-merge closure evidence before this task is claimed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T10:47:38.387Z — VERIFY — ok

    By: REVIEWER

    Note: Focused evaluator/finish regressions pass (2 files, 11 tests); typecheck, lint:core, ci:contract, test:fast (364 files/2153 tests), policy routing, and doctor pass. The evaluator keeps code targets, anchors the current pure metadata work unit, and rejects unrelated task artifacts.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T10:42:25.725Z, excerpt_hash=sha256:229aa2370d990d8dc394c6783bbe065b2f3598019ed3ef2a58d73d0b7af5c382

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100436-D7QB76-anchor-evaluator-reviews-for-metadata-only-tasks/.agentplane/tasks/202607100436-D7QB76/blueprint/resolved-snapshot.json
    - old_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
    - current_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100436-D7QB76

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607100436-D7QB76
    - diagnostic_command: agentplane pr check 202607100436-D7QB76
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-10T12:46:22.248Z — VERIFY — ok

    By: REVIEWER

    Note: Evaluator reruns now preserve an ancestral reviewed SHA across managed quality, PR, blueprint, and README advances while still selecting new task-local or code work. Focused 2/12, targeted 10/133, typecheck, lint, ci:contract, test:fast 364/2157, policy routing, and doctor passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T12:40:28.157Z, excerpt_hash=sha256:229aa2370d990d8dc394c6783bbe065b2f3598019ed3ef2a58d73d0b7af5c382

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100436-D7QB76-anchor-evaluator-reviews-for-metadata-only-tasks/.agentplane/tasks/202607100436-D7QB76/blueprint/resolved-snapshot.json
    - old_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
    - current_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100436-D7QB76

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607100436-D7QB76 --branch task/202607100436-D7QB76/anchor-evaluator-reviews-for-metadata-only-tasks
    - diagnostic_command: agentplane pr check 202607100436-D7QB76
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Root cause: metadata-only evaluator resolution skipped all task artifacts and could fall through to unrelated workflow history. The first fix retained the latest current-task artifact commit, but a repeated evaluator run could then mistake its own committed quality artifacts or refreshed PR metadata for newly reviewed work.

    Implementation: retain the previous evaluated SHA when it is still an ancestor of HEAD and intervening current-task commits contain only managed quality, PR, blueprint, or README artifacts. A new task-local work unit outside those managed derived paths still supersedes the previous target, and code commits continue to target their implementation SHA.

    Review follow-up: added a two-pass evaluator regression that commits the first quality report and a later PR metadata refresh, then proves the second report remains anchored to the original metadata work unit. Focused suites pass 2 files / 12 tests; typecheck and lint pass.
extensions:
  implementation_commit:
    hash: "0b817152a8da33505a18974d6a3c069141345e21"
    message: "🐛 D7QB76 task: preserve evaluator rerun targets"
id_source: "generated"
---
## Summary

Anchor evaluator reviews for metadata-only tasks

For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.

## Scope

- In scope: For v0.6.22, give metadata-only docs and task-closure changes a fresh auditable evaluator target instead of walking past all workflow artifacts to an unrelated older code commit.
- Out of scope: unrelated refactors not required for "Anchor evaluator reviews for metadata-only tasks".

## Plan

1. Add a metadata-only evaluator regression that changes task/docs artifacts without an implementation-code commit.
2. Define an auditable evaluated SHA rule that remains strict for implementation tasks but does not skip the current metadata-only work unit.
3. Preserve finish freshness and unrelated-artifact rejection.
4. Replace the matching evaluator follow-up placeholder in the v0.6.22 plan and keep the release task dependent on it.
5. Run focused evaluator/finish tests, typecheck, lint:core, ci:contract, and full fast.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts`. Expected: code tasks still target their implementation commit, pure current-task metadata work targets its own latest committed work unit, unrelated workflow artifacts are rejected, and later evaluator artifacts preserve the reviewed metadata SHA.
2. Run `bun run typecheck`. Expected: TypeScript contracts remain valid.
3. Run `bun run lint:core`. Expected: core lint passes.
4. Run `bun run ci:contract`. Expected: public CLI, architecture, Knip, clone, and coverage contracts remain unchanged.
5. Run `bun run test:fast`. Expected: the full fast regression suite passes.
6. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and no new release-blocking diagnostics appear.
7. Merge through the integration queue, complete Hosted Close, pull `main`, and inspect `ap integrate queue list --json`. Expected: task `202607100435-A932SP` is automatically released from `handoff` by its valid merged pre-merge closure evidence before this task is claimed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T10:47:38.387Z — VERIFY — ok

By: REVIEWER

Note: Focused evaluator/finish regressions pass (2 files, 11 tests); typecheck, lint:core, ci:contract, test:fast (364 files/2153 tests), policy routing, and doctor pass. The evaluator keeps code targets, anchors the current pure metadata work unit, and rejects unrelated task artifacts.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T10:42:25.725Z, excerpt_hash=sha256:229aa2370d990d8dc394c6783bbe065b2f3598019ed3ef2a58d73d0b7af5c382

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100436-D7QB76-anchor-evaluator-reviews-for-metadata-only-tasks/.agentplane/tasks/202607100436-D7QB76/blueprint/resolved-snapshot.json
- old_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
- current_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100436-D7QB76

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607100436-D7QB76
- diagnostic_command: agentplane pr check 202607100436-D7QB76
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-10T12:46:22.248Z — VERIFY — ok

By: REVIEWER

Note: Evaluator reruns now preserve an ancestral reviewed SHA across managed quality, PR, blueprint, and README advances while still selecting new task-local or code work. Focused 2/12, targeted 10/133, typecheck, lint, ci:contract, test:fast 364/2157, policy routing, and doctor passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T12:40:28.157Z, excerpt_hash=sha256:229aa2370d990d8dc394c6783bbe065b2f3598019ed3ef2a58d73d0b7af5c382

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100436-D7QB76-anchor-evaluator-reviews-for-metadata-only-tasks/.agentplane/tasks/202607100436-D7QB76/blueprint/resolved-snapshot.json
- old_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
- current_digest: 4723f7ad08c4985149e8fc1af430e49b65e5909aed7ca3d13ff9a45b7d5a656f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100436-D7QB76

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607100436-D7QB76 --branch task/202607100436-D7QB76/anchor-evaluator-reviews-for-metadata-only-tasks
- diagnostic_command: agentplane pr check 202607100436-D7QB76
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Root cause: metadata-only evaluator resolution skipped all task artifacts and could fall through to unrelated workflow history. The first fix retained the latest current-task artifact commit, but a repeated evaluator run could then mistake its own committed quality artifacts or refreshed PR metadata for newly reviewed work.

Implementation: retain the previous evaluated SHA when it is still an ancestor of HEAD and intervening current-task commits contain only managed quality, PR, blueprint, or README artifacts. A new task-local work unit outside those managed derived paths still supersedes the previous target, and code commits continue to target their implementation SHA.

Review follow-up: added a two-pass evaluator regression that commits the first quality report and a later PR metadata refresh, then proves the second report remains anchored to the original metadata work unit. Focused suites pass 2 files / 12 tests; typecheck and lint pass.
