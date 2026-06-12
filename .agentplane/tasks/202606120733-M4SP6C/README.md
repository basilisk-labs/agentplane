---
id: "202606120733-M4SP6C"
title: "Fix task artifact lifecycle issue regressions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T07:34:30.235Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T07:42:48.757Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts; Result: pass; Evidence: 18 tests passed. Scope: close commit message builder. Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass; Evidence: 11 tests passed, including dangling task dir issue dry-run. Scope: insights issue/report diagnostics. Command: bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 34 tests passed. Scope: close wrapper and commit policy. Command: bun run typecheck; Result: pass. Evidence: TypeScript build exited 0. Scope: workspace typecheck. Command: bunx prettier --check touched files; Result: pass. Evidence: all matched files use Prettier code style. Scope: touched files. Command: git diff --check; Result: pass. Evidence: no whitespace errors. Scope: final diff. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass. Evidence: doctor OK, errors=0; two pre-existing DONE task missing commit hash warnings. Scope: AgentPlane workspace health."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-12T07:46:49.748Z"
  updated_by: "EVALUATOR"
  note: "Fixes task artifact lifecycle regressions for close commit subject generation and insights issue reporting."
  evaluated_sha: "b2718886b6423cf134c9baefb3a24432b9073d0b"
  blueprint_digest: "4c79ec405ccc5aa8aaf12a54822f1a0f7e97e854a2c19b6a9ada24f78c0b6e5e"
  evidence_refs:
    - ".agentplane/tasks/202606120733-M4SP6C/README.md"
    - ".agentplane/tasks/202606120733-M4SP6C/quality/20260612-074649748-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606120733-M4SP6C/quality/20260612-074649748-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606120733-M4SP6C/quality/20260612-074649748-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606120733-M4SP6C/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts"
    - "bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts"
    - "bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts"
    - "bun run typecheck"
    - "node .agentplane/policy/check-routing.mjs"
    - "https://github.com/basilisk-labs/agentplane/pull/4507"
  findings:
    - "Close commit messages now fall back to a strict checkmark task subject when the implementation commit is not task-formatted; insights issue/report generation tolerates dangling task directories without blocking feedback issue creation. Local focused tests, typecheck, formatting, routing, and doctor passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing focused fixes for GitHub issues #4505 and #4506 in the dedicated branch_pr worktree; scope is lifecycle/task artifact handling and regression tests only."
events:
  -
    type: "status"
    at: "2026-06-12T07:36:43.005Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing focused fixes for GitHub issues #4505 and #4506 in the dedicated branch_pr worktree; scope is lifecycle/task artifact handling and regression tests only."
  -
    type: "verify"
    at: "2026-06-12T07:42:48.757Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts; Result: pass; Evidence: 18 tests passed. Scope: close commit message builder. Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass; Evidence: 11 tests passed, including dangling task dir issue dry-run. Scope: insights issue/report diagnostics. Command: bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 34 tests passed. Scope: close wrapper and commit policy. Command: bun run typecheck; Result: pass. Evidence: TypeScript build exited 0. Scope: workspace typecheck. Command: bunx prettier --check touched files; Result: pass. Evidence: all matched files use Prettier code style. Scope: touched files. Command: git diff --check; Result: pass. Evidence: no whitespace errors. Scope: final diff. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass. Evidence: doctor OK, errors=0; two pre-existing DONE task missing commit hash warnings. Scope: AgentPlane workspace health."
doc_version: 3
doc_updated_at: "2026-06-12T07:42:50.192Z"
doc_updated_by: "CODER"
description: "Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing."
sections:
  Summary: |-
    Fix task artifact lifecycle issue regressions

    Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing.
  Scope: |-
    - In scope: Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing.
    - Out of scope: unrelated refactors not required for "Fix task artifact lifecycle issue regressions".
  Plan: |-
    1. Reproduce/locate #4505 close-flow commit subject validation path and #4506 strict task scan / insights issue creation path.
    2. Add focused regression coverage for direct close artifact commit subject handling and dangling task artifact tolerance or deterministic pruning.
    3. Implement the smallest lifecycle fix in source code without changing release/publish behavior.
    4. Run targeted tests plus routing/build checks, record verification, open/update PR artifacts, and integrate through branch_pr if checks pass.

    Verify Steps:
    1. Run the focused lifecycle/task-store regression tests covering #4505 and #4506. Expected: both fail before fix or directly assert the new behavior and pass after fix.
    2. Run npm/bun package checks relevant to touched source paths. Expected: no regression in touched CLI lifecycle/task scan behavior.
    3. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy passes.
    4. Run agentplane doctor or record any pre-existing non-blocking warnings. Expected: no new task artifact lifecycle failure.
  Verify Steps: |-
    1. Run bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts. Expected: close commit message builder emits strict task subjects for non-task-formatted implementation commits.
    2. Run bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Expected: insights issue dry-run still builds a privacy-bounded issue payload when a dangling task directory has no README.
    3. Run bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts. Expected: close wrapper and commit policy regressions pass.
    4. Run bun run typecheck, bunx prettier --check touched files, git diff --check, node .agentplane/policy/check-routing.mjs, and ap doctor. Expected: all pass, or any pre-existing doctor warning is recorded.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T07:42:48.757Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts; Result: pass; Evidence: 18 tests passed. Scope: close commit message builder. Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass; Evidence: 11 tests passed, including dangling task dir issue dry-run. Scope: insights issue/report diagnostics. Command: bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 34 tests passed. Scope: close wrapper and commit policy. Command: bun run typecheck; Result: pass. Evidence: TypeScript build exited 0. Scope: workspace typecheck. Command: bunx prettier --check touched files; Result: pass. Evidence: all matched files use Prettier code style. Scope: touched files. Command: git diff --check; Result: pass. Evidence: no whitespace errors. Scope: final diff. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass. Evidence: doctor OK, errors=0; two pre-existing DONE task missing commit hash warnings. Scope: AgentPlane workspace health.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:42:13.765Z, excerpt_hash=sha256:4f7f25a79dfa61a780266fca84091eaa060e21d867b5fddc734131f6fecf2b3b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120733-M4SP6C-fix-task-artifact-lifecycle-issue-regressions/.agentplane/tasks/202606120733-M4SP6C/blueprint/resolved-snapshot.json
    - old_digest: 4c79ec405ccc5aa8aaf12a54822f1a0f7e97e854a2c19b6a9ada24f78c0b6e5e
    - current_digest: 4c79ec405ccc5aa8aaf12a54822f1a0f7e97e854a2c19b6a9ada24f78c0b6e5e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120733-M4SP6C

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120733-M4SP6C
    - diagnostic_command: agentplane pr check 202606120733-M4SP6C
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix task artifact lifecycle issue regressions

Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing.

## Scope

- In scope: Fix GitHub issues #4505 and #4506: direct close-flow commit subject validation around task artifact cleanup, and insights issue creation blocking on dangling task artifacts. Scope is implementation/tests only; no release publishing.
- Out of scope: unrelated refactors not required for "Fix task artifact lifecycle issue regressions".

## Plan

1. Reproduce/locate #4505 close-flow commit subject validation path and #4506 strict task scan / insights issue creation path.
2. Add focused regression coverage for direct close artifact commit subject handling and dangling task artifact tolerance or deterministic pruning.
3. Implement the smallest lifecycle fix in source code without changing release/publish behavior.
4. Run targeted tests plus routing/build checks, record verification, open/update PR artifacts, and integrate through branch_pr if checks pass.

Verify Steps:
1. Run the focused lifecycle/task-store regression tests covering #4505 and #4506. Expected: both fail before fix or directly assert the new behavior and pass after fix.
2. Run npm/bun package checks relevant to touched source paths. Expected: no regression in touched CLI lifecycle/task scan behavior.
3. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy passes.
4. Run agentplane doctor or record any pre-existing non-blocking warnings. Expected: no new task artifact lifecycle failure.

## Verify Steps

1. Run bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts. Expected: close commit message builder emits strict task subjects for non-task-formatted implementation commits.
2. Run bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts. Expected: insights issue dry-run still builds a privacy-bounded issue payload when a dangling task directory has no README.
3. Run bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts. Expected: close wrapper and commit policy regressions pass.
4. Run bun run typecheck, bunx prettier --check touched files, git diff --check, node .agentplane/policy/check-routing.mjs, and ap doctor. Expected: all pass, or any pre-existing doctor warning is recorded.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T07:42:48.757Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/commands/guard/impl/close-message.test.ts; Result: pass; Evidence: 18 tests passed. Scope: close commit message builder. Command: bun test packages/agentplane/src/cli/run-cli.core.insights-report.test.ts; Result: pass; Evidence: 11 tests passed, including dangling task dir issue dry-run. Scope: insights issue/report diagnostics. Command: bun test packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.close.test.ts packages/core/src/commit/commit-policy.test.ts; Result: pass; Evidence: 34 tests passed. Scope: close wrapper and commit policy. Command: bun run typecheck; Result: pass. Evidence: TypeScript build exited 0. Scope: workspace typecheck. Command: bunx prettier --check touched files; Result: pass. Evidence: all matched files use Prettier code style. Scope: touched files. Command: git diff --check; Result: pass. Evidence: no whitespace errors. Scope: final diff. Command: node .agentplane/policy/check-routing.mjs; Result: pass. Evidence: policy routing OK. Scope: policy routing. Command: ap doctor; Result: pass. Evidence: doctor OK, errors=0; two pre-existing DONE task missing commit hash warnings. Scope: AgentPlane workspace health.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T07:42:13.765Z, excerpt_hash=sha256:4f7f25a79dfa61a780266fca84091eaa060e21d867b5fddc734131f6fecf2b3b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120733-M4SP6C-fix-task-artifact-lifecycle-issue-regressions/.agentplane/tasks/202606120733-M4SP6C/blueprint/resolved-snapshot.json
- old_digest: 4c79ec405ccc5aa8aaf12a54822f1a0f7e97e854a2c19b6a9ada24f78c0b6e5e
- current_digest: 4c79ec405ccc5aa8aaf12a54822f1a0f7e97e854a2c19b6a9ada24f78c0b6e5e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120733-M4SP6C

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120733-M4SP6C
- diagnostic_command: agentplane pr check 202606120733-M4SP6C
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
