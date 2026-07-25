---
id: "202607250036-DFWJM6"
title: "Publish rebased PR branches with an explicit force-with-lease"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 22
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "publication"
  - "v0.7/reliability"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "network"
  - "publish"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run hotspots:check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T00:36:53.216Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-25T01:17:09.694Z"
  updated_by: "REVIEWER"
  note: "GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-25T01:07:41.002Z"
  updated_by: "HUMAN"
  note: "Independent review confirms guarded force-with-lease publication is repository-bound, ref-scoped, race-safe, and fail-closed."
  evaluated_sha: "8d06aecb7afa3fdfa272288e0a4bab6ae49ee133"
  blueprint_digest: "a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43"
  evidence_refs:
    - ".agentplane/tasks/202607250036-DFWJM6/README.md"
    - ".agentplane/tasks/202607250036-DFWJM6/quality/20260725-010741002-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607250036-DFWJM6/quality/20260725-010741002-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607250036-DFWJM6/quality/20260725-010741002-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/pr/branch-publication.ts"
    - "packages/agentplane/src/commands/pr/branch-publication.test.ts"
    - "20/20 focused tests plus typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor PASS at 8d06aecb7afa3fdfa272288e0a4bab6ae49ee133"
  findings:
    - "The force path is available only for an existing open PR whose provider repository, origin fetch repository, origin push repository, branch, and observed remote head all agree."
    - "Publication uses only the exact ref-scoped lease and refuses mismatched repository/head, wrong upstream/current branch, closed or missing PR, and a remote race; first publication remains unchanged."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement a narrow explicit force-with-lease publication path for existing matching open PRs, with regression coverage for mismatches and remote races."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-25T00:37:21.033Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a narrow explicit force-with-lease publication path for existing matching open PRs, with regression coverage for mismatches and remote races."
  -
    type: "verify"
    at: "2026-07-25T01:06:30.385Z"
    author: "TESTER"
    state: "ok"
    note: "Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline remains outside scope."
  -
    type: "status"
    at: "2026-07-25T01:08:17.205Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T01:09:01.464Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-25T01:10:57.839Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T01:17:09.694Z"
    author: "REVIEWER"
    state: "needs_rework"
    note: "GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD."
doc_version: 3
doc_updated_at: "2026-07-25T01:23:38.264Z"
doc_updated_by: "CODER"
description: "Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety."
sections:
  Summary: |-
    Publish rebased PR branches with an explicit force-with-lease

    Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
  Scope: |-
    - In scope: Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
    - Out of scope: unrelated refactors not required for "Publish rebased PR branches with an explicit force-with-lease".
  Plan: |-
    1. Reproduce the existing-open-PR non-fast-forward publication route without touching RF08.
    2. Add a narrow decision that authorizes only ref-scoped --force-with-lease=<remote-ref>:<observed-head> when the open PR head exactly matches the local task branch and the observed upstream is stale.
    3. Preserve fail-closed behavior for missing/mismatched PR metadata, wrong upstream/branch, and remote races.
    4. Add focused regression tests for success and all safety refusals; run focused tests, typecheck, lint, lifecycle guards, and task verification.
    5. Commit with DCO and leave the task branch unintegrated for parent review.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts`. Expected: the exact observed local object is the force-push source, and repository, lease, refusal, destination-race, and source-race regressions pass.
    2. Run `bun run typecheck`. Expected: all TypeScript packages compile without errors.
    3. Run `bun run lint:core`. Expected: repository core lint passes without new findings; the unrelated website lint baseline is reported separately.
    4. Run `bun run hotspots:check`. Expected: the extracted publication module and focused regression suite stay within repository size budgets.
    5. Run `agentplane task lint --verify-steps-changed`. Expected: task documentation and acceptance coverage pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T01:06:30.385Z — VERIFY — ok

    By: TESTER

    Note: Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline remains outside scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:00:05.994Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607250036-DFWJM6
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T01:17:09.694Z — VERIFY — needs_rework

    By: REVIEWER

    Note: GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:10:57.839Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
    - old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The fallback runs only after a normal task-branch push fails and requires the current branch plus exact `origin/<branch>` upstream.
    - Force publication is authorized only when origin fetch/push URLs resolve to one identical canonical GitHub repository, the linked PR number is OPEN for the exact branch/base, and the provider head equals the observed remote head. The push uses only `--force-with-lease=refs/heads/<branch>:<observed-head>`.
    - Wrong upstream/current branch, mismatched repository/head, closed or missing PR, and a remote race are covered by explicit fail-closed regression tests.
    - Independent safety re-review verdict: PASS with no remaining findings.
    - Full `bun run lint` remains red on unchanged `website/scripts/generate-social-images.mjs:207` (`unicorn/prefer-string-replace-all`); `bun run lint:core` and targeted ESLint pass. This task does not widen into website cleanup.

    - Observation: The lease protected only the destination ref while the source refspec remained HEAD.
      Impact: A concurrent checkout or amend after observation could publish an unobserved source commit under a valid destination lease.
      Resolution: Use the observed local object ID as the source refspec and add a deterministic source-race regression.
      Promotion: incident-candidate
      Fixability: repo-fixable

    - Observation: GitHub review P1 source-side race is resolved and independently re-reviewed PASS.
      Impact: Force publication can no longer substitute a concurrent worktree HEAD for the commit that passed local/provider/remote observation.
      Resolution: The refspec source is the validated observed local object ID; a nondestructive fake-git `update-ref HEAD` immediately before push proves the remote still receives that object rather than the changed HEAD.
extensions:
  implementation_commit:
    hash: "8d06aecb7afa3fdfa272288e0a4bab6ae49ee133"
    message: "🛡️ DFWJM6 task: guard rebased PR publication"
id_source: "generated"
---
## Summary

Publish rebased PR branches with an explicit force-with-lease

Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.

## Scope

- In scope: Harden ap pr open so an existing matching open PR can publish a locally rebased task branch only with an explicit ref-scoped force-with-lease bound to the observed remote head, while preserving wrong-branch, wrong-upstream, and remote-race safety.
- Out of scope: unrelated refactors not required for "Publish rebased PR branches with an explicit force-with-lease".

## Plan

1. Reproduce the existing-open-PR non-fast-forward publication route without touching RF08.
2. Add a narrow decision that authorizes only ref-scoped --force-with-lease=<remote-ref>:<observed-head> when the open PR head exactly matches the local task branch and the observed upstream is stale.
3. Preserve fail-closed behavior for missing/mismatched PR metadata, wrong upstream/branch, and remote races.
4. Add focused regression tests for success and all safety refusals; run focused tests, typecheck, lint, lifecycle guards, and task verification.
5. Commit with DCO and leave the task branch unintegrated for parent review.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/branch-publication.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.pr-open.git.test.ts packages/agentplane/src/commands/pr/internal/sync-github.test.ts`. Expected: the exact observed local object is the force-push source, and repository, lease, refusal, destination-race, and source-race regressions pass.
2. Run `bun run typecheck`. Expected: all TypeScript packages compile without errors.
3. Run `bun run lint:core`. Expected: repository core lint passes without new findings; the unrelated website lint baseline is reported separately.
4. Run `bun run hotspots:check`. Expected: the extracted publication module and focused regression suite stay within repository size budgets.
5. Run `agentplane task lint --verify-steps-changed`. Expected: task documentation and acceptance coverage pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T01:06:30.385Z — VERIFY — ok

By: TESTER

Note: Independent review PASS at 8d06aecb: 20/20 focused publication tests passed; exact repo-bound force-with-lease and all fail-closed cases verified; typecheck, lint:core, hotspots, architecture, task-state, task lint, routing, diff-check, and doctor passed. Unchanged website lint baseline remains outside scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:00:05.994Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607250036-DFWJM6
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T01:17:09.694Z — VERIFY — needs_rework

By: REVIEWER

Note: GitHub review P1: force publication must push the exact observed local commit, not mutable HEAD.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T01:10:57.839Z, excerpt_hash=sha256:451cb09864f23f28a6a06d7c13507c4a133d450286d8d0de27a8cf39e904a6ce

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607250036-DFWJM6-force-with-lease-pr-publish/.agentplane/tasks/202607250036-DFWJM6/blueprint/resolved-snapshot.json
- old_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- current_digest: a255b5654fa8c385f8d0caf83ac4d4b7f92c5d9389483db96ba4d4989c20dc43
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607250036-DFWJM6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- diagnostic_command: agentplane task next-action 202607250036-DFWJM6 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The fallback runs only after a normal task-branch push fails and requires the current branch plus exact `origin/<branch>` upstream.
- Force publication is authorized only when origin fetch/push URLs resolve to one identical canonical GitHub repository, the linked PR number is OPEN for the exact branch/base, and the provider head equals the observed remote head. The push uses only `--force-with-lease=refs/heads/<branch>:<observed-head>`.
- Wrong upstream/current branch, mismatched repository/head, closed or missing PR, and a remote race are covered by explicit fail-closed regression tests.
- Independent safety re-review verdict: PASS with no remaining findings.
- Full `bun run lint` remains red on unchanged `website/scripts/generate-social-images.mjs:207` (`unicorn/prefer-string-replace-all`); `bun run lint:core` and targeted ESLint pass. This task does not widen into website cleanup.

- Observation: The lease protected only the destination ref while the source refspec remained HEAD.
  Impact: A concurrent checkout or amend after observation could publish an unobserved source commit under a valid destination lease.
  Resolution: Use the observed local object ID as the source refspec and add a deterministic source-race regression.
  Promotion: incident-candidate
  Fixability: repo-fixable

- Observation: GitHub review P1 source-side race is resolved and independently re-reviewed PASS.
  Impact: Force publication can no longer substitute a concurrent worktree HEAD for the commit that passed local/provider/remote observation.
  Resolution: The refspec source is the validated observed local object ID; a nondestructive fake-git `update-ref HEAD` immediately before push proves the remote still receives that object rather than the changed HEAD.
