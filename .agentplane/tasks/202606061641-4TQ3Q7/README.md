---
id: "202606061641-4TQ3Q7"
title: "Fix release lifecycle reliability issues"
result_summary: "Merged via PR #4467."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-06T16:42:58.573Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-06T17:13:35.901Z"
  updated_by: "CODER"
  note: "Verified review-thread fixes. Added stdin preservation test for background hook shim and configured workflow_dir release snapshot test. Checks passed: focused vitest suite 15 tests; bun run lint:core; bun run knip:check; bun run --filter=agentplane typecheck; bun run --filter=agentplane build; bun run format:changed; node .agentplane/policy/check-routing.mjs; git diff --check."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-06T17:31:32.894Z"
  updated_by: "EVALUATOR"
  note: "Release lifecycle reliability fixes are implemented and verified locally and on GitHub PR #4467."
  evaluated_sha: "d56dd68ee79a1d856de053b36ea50ffd8fb2599f"
  blueprint_digest: "19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d"
  evidence_refs:
    - ".agentplane/tasks/202606061641-4TQ3Q7/README.md"
    - ".agentplane/tasks/202606061641-4TQ3Q7/quality/20260606-173132894-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606061641-4TQ3Q7/quality/20260606-173132894-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606061641-4TQ3Q7/quality/20260606-173132894-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json"
    - "https://github.com/basilisk-labs/agentplane/pull/4467"
  findings:
    - "Hook shim timeout now preserves stdin and exits promptly; release-candidate snapshot staging uses configured workflow_dir; release evidence workflow dispatch waits for PR creation so app-owned PR verification materializes."
commit:
  hash: "7a941f25b58bb9fef17c65e1df19072ed13f8063"
  message: "🛠 4TQ3Q7 release: fix lifecycle reliability issues"
comments:
  -
    author: "CODER"
    body: "Start: implementing approved fixes for #4461, #4462, and #4463 in the dedicated branch_pr worktree with focused tests and release/lifecycle verification."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4467 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-06T16:44:02.282Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing approved fixes for #4461, #4462, and #4463 in the dedicated branch_pr worktree with focused tests and release/lifecycle verification."
  -
    type: "verify"
    at: "2026-06-06T16:50:38.864Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 3 files / 14 tests passed. Scope: raw hook shim timeout diagnostics, release candidate blueprint snapshot staging, publish workflow release evidence PR verification contract. Command: bun run format:changed. Result: pass; 7 changed files match Prettier. Scope: changed code/workflow files. Command: bun run --filter=agentplane typecheck. Result: pass. Scope: agentplane TypeScript. Command: bun run --filter=agentplane build. Result: pass. Scope: runtime build freshness. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: routing policy. Command: git diff --check. Result: pass. Scope: whitespace."
  -
    type: "verify"
    at: "2026-06-06T17:02:39.859Z"
    author: "CODER"
    state: "ok"
    note: "Verified release lifecycle fixes after CI-static follow-up. Checks: focused vitest suite for hook shim/release candidate/publish workflow passed 14 tests; bun run lint:core passed; bun run knip:check passed; bun run --filter=agentplane typecheck passed; bun run --filter=agentplane build passed; bun run format:changed passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed. Local arch:check was not rerun here because dependency-cruiser requires Node 24 and local runtime reports Node v26; CI uses Node 24."
  -
    type: "verify"
    at: "2026-06-06T17:13:35.901Z"
    author: "CODER"
    state: "ok"
    note: "Verified review-thread fixes. Added stdin preservation test for background hook shim and configured workflow_dir release snapshot test. Checks passed: focused vitest suite 15 tests; bun run lint:core; bun run knip:check; bun run --filter=agentplane typecheck; bun run --filter=agentplane build; bun run format:changed; node .agentplane/policy/check-routing.mjs; git diff --check."
  -
    type: "status"
    at: "2026-06-06T17:51:07.472Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4467 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-06T17:51:07.478Z"
doc_updated_by: "INTEGRATOR"
description: "Fix GitHub issues #4461, #4462, and #4463 covering hook shim timeout diagnostics, release candidate generated snapshot staging, and release evidence PR verification materialization."
sections:
  Summary: |-
    Fix release lifecycle reliability issues

    Batch fix for GitHub issues #4461, #4462, and #4463: hook shim timeout diagnostics, release candidate generated blueprint snapshot staging, and release evidence PR verification materialization.
  Scope: |-
    - In scope: code and focused test changes for #4461, #4462, and #4463.
    - In scope: release/lifecycle workflow code and GitHub workflow diagnostics needed for evidence PR verification behavior.
    - Out of scope: actual npm publish, release dispatch, unrelated lifecycle refactors, or modifying issues outside #4461-#4463.
  Plan: "Plan: (1) inspect hook shim, release candidate, and release evidence PR code paths for #4461-#4463; (2) implement bounded raw hook/shim diagnostics, generated blueprint snapshot staging or specific pre-commit diagnostic, and evidence PR verification materialization/diagnostic behavior; (3) add focused regressions for each issue; (4) run targeted tests plus typecheck/build for touched packages, routing policy check, and diff check; (5) publish one branch_pr PR, verify hosted checks, merge through integration route, then close #4461-#4463 with commit/PR evidence."
  Verify Steps: |-
    1. Run focused tests for changed hook/commit shim behavior. Expected: a simulated hanging raw hook/shim path produces bounded actionable diagnostics and distinguishes infrastructure timeout from source/test failure.
    2. Run focused release candidate tests. Expected: generated task blueprint snapshots are staged before candidate commit, or expected generated-artifact drift fails before commit with a specific non-generic diagnostic.
    3. Run focused release evidence/PR verification tests or workflow checks. Expected: the evidence PR path either materializes required PR verification on the initial head or emits an explicit next step that distinguishes GitHub Actions app-owned checks from manual statuses.
    4. Run package checks for touched packages, including typecheck/build where runtime output is affected. Expected: no TypeScript/build regressions.
    5. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy remains valid.
    6. Run git diff --check. Expected: no whitespace errors.
    7. Close #4461, #4462, and #4463 only after merged PR or verified final commit evidence exists.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-06T16:50:38.864Z — VERIFY — ok

    By: CODER

    Note: Command: bunx vitest run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 3 files / 14 tests passed. Scope: raw hook shim timeout diagnostics, release candidate blueprint snapshot staging, publish workflow release evidence PR verification contract. Command: bun run format:changed. Result: pass; 7 changed files match Prettier. Scope: changed code/workflow files. Command: bun run --filter=agentplane typecheck. Result: pass. Scope: agentplane TypeScript. Command: bun run --filter=agentplane build. Result: pass. Scope: runtime build freshness. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: routing policy. Command: git diff --check. Result: pass. Scope: whitespace.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T16:44:02.282Z, excerpt_hash=sha256:8222bb22ebfcffddfde2778a8121c23d65c49047429f43a4ca43ee036e6fa938

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061641-4TQ3Q7-fix-release-lifecycle-reliability-issues/.agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json
    - old_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
    - current_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606061641-4TQ3Q7

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606061641-4TQ3Q7
    - diagnostic_command: agentplane pr check 202606061641-4TQ3Q7
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-06T17:02:39.859Z — VERIFY — ok

    By: CODER

    Note: Verified release lifecycle fixes after CI-static follow-up. Checks: focused vitest suite for hook shim/release candidate/publish workflow passed 14 tests; bun run lint:core passed; bun run knip:check passed; bun run --filter=agentplane typecheck passed; bun run --filter=agentplane build passed; bun run format:changed passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed. Local arch:check was not rerun here because dependency-cruiser requires Node 24 and local runtime reports Node v26; CI uses Node 24.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T16:50:39.037Z, excerpt_hash=sha256:8222bb22ebfcffddfde2778a8121c23d65c49047429f43a4ca43ee036e6fa938

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061641-4TQ3Q7-fix-release-lifecycle-reliability-issues/.agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json
    - old_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
    - current_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606061641-4TQ3Q7

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606061641-4TQ3Q7
    - diagnostic_command: agentplane pr check 202606061641-4TQ3Q7
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-06T17:13:35.901Z — VERIFY — ok

    By: CODER

    Note: Verified review-thread fixes. Added stdin preservation test for background hook shim and configured workflow_dir release snapshot test. Checks passed: focused vitest suite 15 tests; bun run lint:core; bun run knip:check; bun run --filter=agentplane typecheck; bun run --filter=agentplane build; bun run format:changed; node .agentplane/policy/check-routing.mjs; git diff --check.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T17:02:40.152Z, excerpt_hash=sha256:8222bb22ebfcffddfde2778a8121c23d65c49047429f43a4ca43ee036e6fa938

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061641-4TQ3Q7-fix-release-lifecycle-reliability-issues/.agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json
    - old_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
    - current_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606061641-4TQ3Q7

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606061641-4TQ3Q7
    - diagnostic_command: agentplane pr check 202606061641-4TQ3Q7
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the implementation commit(s) and task artifact updates for 202606061641-4TQ3Q7, rerun focused release/lifecycle tests plus routing checks, and leave #4461-#4463 open with the failed evidence if verification does not pass."
  Findings: ""
id_source: "generated"
---
## Summary

Fix release lifecycle reliability issues

Batch fix for GitHub issues #4461, #4462, and #4463: hook shim timeout diagnostics, release candidate generated blueprint snapshot staging, and release evidence PR verification materialization.

## Scope

- In scope: code and focused test changes for #4461, #4462, and #4463.
- In scope: release/lifecycle workflow code and GitHub workflow diagnostics needed for evidence PR verification behavior.
- Out of scope: actual npm publish, release dispatch, unrelated lifecycle refactors, or modifying issues outside #4461-#4463.

## Plan

Plan: (1) inspect hook shim, release candidate, and release evidence PR code paths for #4461-#4463; (2) implement bounded raw hook/shim diagnostics, generated blueprint snapshot staging or specific pre-commit diagnostic, and evidence PR verification materialization/diagnostic behavior; (3) add focused regressions for each issue; (4) run targeted tests plus typecheck/build for touched packages, routing policy check, and diff check; (5) publish one branch_pr PR, verify hosted checks, merge through integration route, then close #4461-#4463 with commit/PR evidence.

## Verify Steps

1. Run focused tests for changed hook/commit shim behavior. Expected: a simulated hanging raw hook/shim path produces bounded actionable diagnostics and distinguishes infrastructure timeout from source/test failure.
2. Run focused release candidate tests. Expected: generated task blueprint snapshots are staged before candidate commit, or expected generated-artifact drift fails before commit with a specific non-generic diagnostic.
3. Run focused release evidence/PR verification tests or workflow checks. Expected: the evidence PR path either materializes required PR verification on the initial head or emits an explicit next step that distinguishes GitHub Actions app-owned checks from manual statuses.
4. Run package checks for touched packages, including typecheck/build where runtime output is affected. Expected: no TypeScript/build regressions.
5. Run node .agentplane/policy/check-routing.mjs. Expected: routing policy remains valid.
6. Run git diff --check. Expected: no whitespace errors.
7. Close #4461, #4462, and #4463 only after merged PR or verified final commit evidence exists.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-06T16:50:38.864Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/release/apply.apply-flow.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts --config vitest.workspace.ts --project agentplane --pool=forks --maxWorkers 1 --testTimeout 60000 --hookTimeout 60000. Result: pass; 3 files / 14 tests passed. Scope: raw hook shim timeout diagnostics, release candidate blueprint snapshot staging, publish workflow release evidence PR verification contract. Command: bun run format:changed. Result: pass; 7 changed files match Prettier. Scope: changed code/workflow files. Command: bun run --filter=agentplane typecheck. Result: pass. Scope: agentplane TypeScript. Command: bun run --filter=agentplane build. Result: pass. Scope: runtime build freshness. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Scope: routing policy. Command: git diff --check. Result: pass. Scope: whitespace.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T16:44:02.282Z, excerpt_hash=sha256:8222bb22ebfcffddfde2778a8121c23d65c49047429f43a4ca43ee036e6fa938

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061641-4TQ3Q7-fix-release-lifecycle-reliability-issues/.agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json
- old_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
- current_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606061641-4TQ3Q7

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606061641-4TQ3Q7
- diagnostic_command: agentplane pr check 202606061641-4TQ3Q7
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-06T17:02:39.859Z — VERIFY — ok

By: CODER

Note: Verified release lifecycle fixes after CI-static follow-up. Checks: focused vitest suite for hook shim/release candidate/publish workflow passed 14 tests; bun run lint:core passed; bun run knip:check passed; bun run --filter=agentplane typecheck passed; bun run --filter=agentplane build passed; bun run format:changed passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed. Local arch:check was not rerun here because dependency-cruiser requires Node 24 and local runtime reports Node v26; CI uses Node 24.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T16:50:39.037Z, excerpt_hash=sha256:8222bb22ebfcffddfde2778a8121c23d65c49047429f43a4ca43ee036e6fa938

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061641-4TQ3Q7-fix-release-lifecycle-reliability-issues/.agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json
- old_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
- current_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606061641-4TQ3Q7

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606061641-4TQ3Q7
- diagnostic_command: agentplane pr check 202606061641-4TQ3Q7
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-06T17:13:35.901Z — VERIFY — ok

By: CODER

Note: Verified review-thread fixes. Added stdin preservation test for background hook shim and configured workflow_dir release snapshot test. Checks passed: focused vitest suite 15 tests; bun run lint:core; bun run knip:check; bun run --filter=agentplane typecheck; bun run --filter=agentplane build; bun run format:changed; node .agentplane/policy/check-routing.mjs; git diff --check.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T17:02:40.152Z, excerpt_hash=sha256:8222bb22ebfcffddfde2778a8121c23d65c49047429f43a4ca43ee036e6fa938

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061641-4TQ3Q7-fix-release-lifecycle-reliability-issues/.agentplane/tasks/202606061641-4TQ3Q7/blueprint/resolved-snapshot.json
- old_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
- current_digest: 19144eb59e74613d1059bc4355969ed915e9fb05f3d3f484ebf38b4ca69bf85d
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606061641-4TQ3Q7

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606061641-4TQ3Q7
- diagnostic_command: agentplane pr check 202606061641-4TQ3Q7
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit(s) and task artifact updates for 202606061641-4TQ3Q7, rerun focused release/lifecycle tests plus routing checks, and leave #4461-#4463 open with the failed evidence if verification does not pass.

## Findings
