---
id: "202607252051-ZMVZRZ"
title: "Make merged worktree cleanup resilient to partial removal"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "cleanup"
  - "correctness"
  - "v0.7"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:12:38.307Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-25T23:24:12.276Z"
  updated_by: "TESTER"
  note: "Independent verification passed at 651d161277df67291a15e0e01f2cbff0e8053d8b: 31 focused cleanup tests across split CLI and shared cleanup suites; hotspot baseline now passes without expansion; typecheck, lint:core, guards, lifecycle invariants, routing, format, and diff checks pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T23:28:03.096Z"
  updated_by: "EVALUATOR"
  note: "Pass at 651d161277df67291a15e0e01f2cbff0e8053d8b: the bounded test split removes the hotspot violation without changing cleanup semantics or broadening the baseline."
  evaluated_sha: "651d161277df67291a15e0e01f2cbff0e8053d8b"
  blueprint_digest: "92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced"
  evidence_refs:
    - ".agentplane/tasks/202607252051-ZMVZRZ/README.md"
    - ".agentplane/tasks/202607252051-ZMVZRZ/quality/20260725-232803096-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607252051-ZMVZRZ/quality/20260725-232803096-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607252051-ZMVZRZ/quality/20260725-232803096-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.remote.test.ts"
    - "packages/agentplane/src/commands/shared/merged-branch-cleanup.ts"
    - "packages/agentplane/src/commands/branch/cleanup-merged.ts"
    - ".agentplane/tasks/202607252051-ZMVZRZ/README.md (fresh TESTER verification at 651d161277df67291a15e0e01f2cbff0e8053d8b)"
    - "bun test cleanup-merged.test.ts cleanup-merged.remote.test.ts merged-branch-cleanup.test.ts: 31 pass, 0 fail"
    - "bun run hotspots:check: baseline OK (10 entries, 11370 lines)"
    - "node .agentplane/policy/check-routing.mjs: policy routing OK"
    - "agentplane doctor: OK; only 3 pre-existing historical archive warnings"
  findings:
    - "Scope is bounded: the correction restores the original CLI cleanup test to 901 lines and relocates only the remote-absent regression to a 171-line companion file; no cleanup implementation changed in this corrective commit."
    - "The cleanup implementation retains proof guards: orphan directory removal happens only after a failed git removal leaves the worktree unregistered, the path resolves inside the repo and is not the current worktree, and an expected-head recheck passes; failures preserve the branch for recovery."
    - "Remote handling is idempotent: cleanup checks refs/heads/<branch> with ls-remote before delete, and a delete race is accepted only after a confirming missing-ref observation."
    - "Independent replay passed 31 focused tests across the original CLI suite, the extracted remote-absent suite, and shared cleanup guards; the wrapper regression proves no delete push is attempted when the remote branch is already absent."
    - "hotspots:check passes with the existing 10-entry baseline and 11370 total oversized-test lines, so the hosted baseline failure is addressed without budget expansion."
commit:
  hash: "651d161277df67291a15e0e01f2cbff0e8053d8b"
  message: "🧪 ZMVZRZ cleanup: split remote cleanup regression"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-25T22:13:26.524Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-25T22:45:07.482Z"
    author: "TESTER"
    state: "ok"
    note: "Independent TESTER verification passed for PR #4622 at 6c19d647."
  -
    type: "status"
    at: "2026-07-25T22:48:33.868Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T23:13:40.113Z"
    author: "EVALUATOR"
    state: "needs_rework"
    note: "Hosted Core CI #30178341063 failed verify-contract at the hotspot baseline; task requires a bounded test split before re-verification."
  -
    type: "verify"
    at: "2026-07-25T23:24:12.276Z"
    author: "TESTER"
    state: "ok"
    note: "Independent verification passed at 651d161277df67291a15e0e01f2cbff0e8053d8b: 31 focused cleanup tests across split CLI and shared cleanup suites; hotspot baseline now passes without expansion; typecheck, lint:core, guards, lifecycle invariants, routing, format, and diff checks pass."
  -
    type: "status"
    at: "2026-07-25T23:29:41.939Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T23:29:41.940Z"
doc_updated_by: "CODER"
description: "Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases."
sections:
  Summary: |-
    Make merged worktree cleanup resilient to partial removal

    Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.
  Scope: "In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories."
  Plan: "1. Reproduce cleanup against a clean merged worktree and inspect Git removal behavior when a path becomes unregistered before directory deletion. 2. Make cleanup remove only a proven clean task worktree atomically or report a recoverable state without orphaning it. 3. Treat a remote task branch already absent after provider merge as idempotent success. 4. Retain all dirty, current, outside-root, and expected-head race guards. 5. Add focused cleanup regressions and run cleanup, type, lint, policy, and lifecycle checks."
  Verify Steps: "1. Focused cleanup regression proves a clean proven worktree is fully removed or leaves a diagnosed recoverable state without silently dropping branch proof. 2. A remote branch missing before delete is accepted as idempotent success. 3. Dirty, outside-root, current-worktree, and expected-head race fixtures remain refused. 4. bun test packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts pass. 5. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-25T22:45:07.482Z — VERIFY — ok

    By: TESTER

    Note: Independent TESTER verification passed for PR #4622 at 6c19d647.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:13:26.524Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
    - old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607252051-ZMVZRZ
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T23:13:40.113Z — VERIFY — needs_rework

    By: EVALUATOR

    Note: Hosted Core CI #30178341063 failed verify-contract at the hotspot baseline; task requires a bounded test split before re-verification.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:48:33.868Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

    Details:

    Authoritative hosted evidence: PR #4622 at head d42cbe1945e77c76766274a0ef63da754032a6df; Core CI run 30178341063. Only verify-contract failed. hotspot baseline reports packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts at 1039 lines as a new oversized test, oversized entry count 11 > 10, and oversized total 12409 > 11424. Package runtime, static, unit, critical CLI, workflow, coverage, Windows, Docs CI, and CodeQL passed. Required rework: split the cleanup-flow regression test within approved task scope without widening the oversized-test baseline, then rerun local and hosted verification on a new head.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
    - old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607252051-ZMVZRZ --remote --explain
    - diagnostic_command: agentplane task next-action 202607252051-ZMVZRZ --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T23:24:12.276Z — VERIFY — ok

    By: TESTER

    Note: Independent verification passed at 651d161277df67291a15e0e01f2cbff0e8053d8b: 31 focused cleanup tests across split CLI and shared cleanup suites; hotspot baseline now passes without expansion; typecheck, lint:core, guards, lifecycle invariants, routing, format, and diff checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:13:41.182Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
    - old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit. This restores the previous cleanup behavior; no task branch, worktree, or remote ref is removed without its existing proof guards."
  Findings: |-
    - Observation: 31 focused cleanup tests passed, including partial worktree recovery and an already-absent remote branch; typecheck, lint:core, guards:check, lifecycle:invariants, and policy routing all passed.
      Impact: Cleanup now has independently verified recovery and idempotence coverage while preserving dirty, outside-root, current-worktree, and expected-head race refusals.
      Resolution: No rework required; the task may proceed to its PR closure route.

    - Observation: The remote-absent regression confirms no delete push is attempted; partial-unregistered worktree recovery, dirty/outside/current-worktree refusal, and expected-head race protections pass.
      Impact: The former hosted hotspot gate failure is resolved locally by splitting the 1039-line regression file into a 901-line original plus a 171-line remote case, preserving the 10-entry baseline.
      Resolution: Record TESTER pass; require fresh EVALUATOR and hosted CI on the published head before integration.
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Make merged worktree cleanup resilient to partial removal

Harden branch_pr cleanup after a verified merged task: remove a clean worktree without leaving an unregistered directory if Git removal partially succeeds, and treat an already-deleted remote task branch as a successful terminal state. Preserve strict protections for dirty, outside-repo, and current worktrees. Add focused regression coverage for the partial-removal and absent-remote cases.

## Scope

In scope: harden merged branch_pr worktree removal after a clean verified task, including partial Git removal recovery and idempotent absent-remote branch deletion. Preserve dirty, outside-repo, current-worktree, and expected-head protections. Out of scope: broad cleanup redesign or deletion of unproven directories.

## Plan

1. Reproduce cleanup against a clean merged worktree and inspect Git removal behavior when a path becomes unregistered before directory deletion. 2. Make cleanup remove only a proven clean task worktree atomically or report a recoverable state without orphaning it. 3. Treat a remote task branch already absent after provider merge as idempotent success. 4. Retain all dirty, current, outside-root, and expected-head race guards. 5. Add focused cleanup regressions and run cleanup, type, lint, policy, and lifecycle checks.

## Verify Steps

1. Focused cleanup regression proves a clean proven worktree is fully removed or leaves a diagnosed recoverable state without silently dropping branch proof. 2. A remote branch missing before delete is accepted as idempotent success. 3. Dirty, outside-root, current-worktree, and expected-head race fixtures remain refused. 4. bun test packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts packages/agentplane/src/commands/shared/merged-branch-cleanup.test.ts pass. 5. bun run typecheck, bun run lint:core, bun run guards:check, bun run lifecycle:invariants, and node .agentplane/policy/check-routing.mjs pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-25T22:45:07.482Z — VERIFY — ok

By: TESTER

Note: Independent TESTER verification passed for PR #4622 at 6c19d647.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:13:26.524Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
- old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607252051-ZMVZRZ
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T23:13:40.113Z — VERIFY — needs_rework

By: EVALUATOR

Note: Hosted Core CI #30178341063 failed verify-contract at the hotspot baseline; task requires a bounded test split before re-verification.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T22:48:33.868Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

Details:

Authoritative hosted evidence: PR #4622 at head d42cbe1945e77c76766274a0ef63da754032a6df; Core CI run 30178341063. Only verify-contract failed. hotspot baseline reports packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts at 1039 lines as a new oversized test, oversized entry count 11 > 10, and oversized total 12409 > 11424. Package runtime, static, unit, critical CLI, workflow, coverage, Windows, Docs CI, and CodeQL passed. Required rework: split the cleanup-flow regression test within approved task scope without widening the oversized-test baseline, then rerun local and hosted verification on a new head.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
- old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607252051-ZMVZRZ --remote --explain
- diagnostic_command: agentplane task next-action 202607252051-ZMVZRZ --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T23:24:12.276Z — VERIFY — ok

By: TESTER

Note: Independent verification passed at 651d161277df67291a15e0e01f2cbff0e8053d8b: 31 focused cleanup tests across split CLI and shared cleanup suites; hotspot baseline now passes without expansion; typecheck, lint:core, guards, lifecycle invariants, routing, format, and diff checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T23:13:41.182Z, excerpt_hash=sha256:981d4aea803e94843e61c8a0adac0e6e56006c7b865f834021bf89cf7d83557a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607252051-ZMVZRZ-make-merged-worktree-cleanup-resilient/.agentplane/tasks/202607252051-ZMVZRZ/blueprint/resolved-snapshot.json
- old_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- current_digest: 92178a1454bd824173b1a681f483f352b53626d4dbf572d6759785967e897ced
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607252051-ZMVZRZ

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit. This restores the previous cleanup behavior; no task branch, worktree, or remote ref is removed without its existing proof guards.

## Findings

- Observation: 31 focused cleanup tests passed, including partial worktree recovery and an already-absent remote branch; typecheck, lint:core, guards:check, lifecycle:invariants, and policy routing all passed.
  Impact: Cleanup now has independently verified recovery and idempotence coverage while preserving dirty, outside-root, current-worktree, and expected-head race refusals.
  Resolution: No rework required; the task may proceed to its PR closure route.

- Observation: The remote-absent regression confirms no delete push is attempted; partial-unregistered worktree recovery, dirty/outside/current-worktree refusal, and expected-head race protections pass.
  Impact: The former hosted hotspot gate failure is resolved locally by splitting the 1039-line regression file into a 901-line original plus a 171-line remote case, preserving the 10-entry baseline.
  Resolution: Record TESTER pass; require fresh EVALUATOR and hosted CI on the published head before integration.
