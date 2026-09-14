---
id: "202609141255-VABJX3"
title: "Backport applicable open issue fixes to the 0.6 maintenance branch"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 19
origin:
  system: "manual"
depends_on: []
tags:
  - "backport"
  - "bug"
  - "code"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun test packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts packages/agentplane/src/commands/task/run-render.test.ts packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
  - "bun run typecheck"
  - "bun run test:platform-critical"
  - "bun test packages/agentplane/src/commands/branch/work-start.hook-shim.test.ts packages/agentplane/src/commands/release/release-ci-contract.test.ts packages/agentplane/src/cli/verify-global-install-script.test.ts"
  - "bun run workflows:command-check"
  - "bun run release:bun:smoke"
  - "bun test packages/agentplane/src/commands/doctor.command.runtime.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T14:08:29.844Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from the user instruction to proceed in a separate branch and the explicit Bun 1.4.2 question; scope remains local to the existing v0.6 maintenance task branch with no publication lifecycle."
verification:
  state: "ok"
  updated_at: "2026-09-14T14:42:55.145Z"
  updated_by: "CODER"
  note: "Verified: 57 focused tests and 92 platform-critical tests passed; typecheck, focused ESLint and Prettier, workflow command contracts, Bun compiled CLI smoke, local tarball install smoke, release:check, policy routing, doctor, and git diff checks passed on Bun 1.4.2; bun.lock is unchanged."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-09-14T14:43:05.691Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed for the v0.6 maintenance backport."
  evaluated_sha: "e2ae35364abb7d9b1948737d6149b37b00f05ed2"
  blueprint_digest: "40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96"
  evidence_refs:
    - ".agentplane/tasks/202609141255-VABJX3/README.md"
    - ".agentplane/tasks/202609141255-VABJX3/quality/20260914-144305691-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609141255-VABJX3/quality/20260914-144305691-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202609141255-VABJX3/quality/20260914-144305691-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609141255-VABJX3/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; the changes remain limited to issues applicable to 0.6 and preserve Node, Vitest, tsup, and bun.lock."
commit:
  hash: "e2ae35364abb7d9b1948737d6149b37b00f05ed2"
  message: "🐛 VABJX3 code: harden hooks and global installs"
comments:
  -
    author: "CODER"
    body: "Start: backport confirmed fixes for issues #5892, #5887, and #4893 to the dedicated v0.6 maintenance task branch."
  -
    author: "CODER"
    body: "Start: extend the approved local v0.6 maintenance branch with hook runner readiness, materialized developer installs, and Bun 1.4.2 pin qualification; no push, PR, merge, or release."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-09-14T12:57:53.355Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: backport confirmed fixes for issues #5892, #5887, and #4893 to the dedicated v0.6 maintenance task branch."
  -
    type: "status"
    at: "2026-09-14T14:10:21.638Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: extend the approved local v0.6 maintenance branch with hook runner readiness, materialized developer installs, and Bun 1.4.2 pin qualification; no push, PR, merge, or release."
  -
    type: "verify"
    at: "2026-09-14T14:27:53.959Z"
    author: "CODER"
    state: "ok"
    note: "Bun 1.4.2 qualification and v0.6 runtime hardening pass: 57 focused tests, 92 platform-critical tests, typecheck, focused ESLint and Prettier, workflow command contracts, compiled Bun CLI smoke, local tarball install smoke, release:check, doctor, policy routing, git diff --check, and unchanged bun.lock. The isolated developer reinstall installed materialized tarballs successfully; its in-checkout temporary prefix was then rejected by the new source-coupling guard as designed."
  -
    type: "verify"
    at: "2026-09-14T14:42:55.145Z"
    author: "CODER"
    state: "ok"
    note: "Verified: 57 focused tests and 92 platform-critical tests passed; typecheck, focused ESLint and Prettier, workflow command contracts, Bun compiled CLI smoke, local tarball install smoke, release:check, policy routing, doctor, and git diff checks passed on Bun 1.4.2; bun.lock is unchanged."
  -
    type: "status"
    at: "2026-09-14T14:43:24.569Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-09-14T14:43:24.570Z"
doc_updated_by: "CODER"
description: "Backport confirmed 0.6-relevant fixes onto the dedicated maintenance branch. Preserve the existing #5892, #5887, and #4893 work; add v0.6-native hook runner readiness and deterministic fallback for #5941; replace mutable source-linked developer global installs with materialized package installs for the applicable #5942 failure mode; update Bun pins from 1.3.6 to 1.4.2 without changing Node, Vitest, tsup, dependencies, or lockfile resolution. Do not push, open a PR, merge, or release."
sections:
  Summary: |-
    Backport applicable open issue fixes to the 0.6 maintenance branch

    Audit all open GitHub issues against AgentPlane 0.6.28 and backport only confirmed 0.6-relevant fixes for issues #5892, #5887, and #4893. Preserve the v0.6 lifecycle and avoid 0.7 task-kernel or release architecture. Implement and verify the fixes on one dedicated local branch from codex/release-v0.6.27-reclaim-fix. Do not push, open a PR, merge, or release.
  Scope: |-
    - In scope: preserve the existing #5892 and #5887 backports and #4893 regression coverage; add v0.6-native hook runner startup readiness and deterministic fallback for #5941; replace source-linked developer global installs with materialized package tarballs for the applicable #5942 failure mode; update repository and workflow Bun pins to 1.4.2 without changing runtime architecture or dependency resolution.
    - Out of scope: push, PR creation, merge, release, v0.7 task-runtime identity architecture, Node removal, bun:test migration, Bun.build migration, dependency upgrades, and unrelated refactors.
  Plan: |-
    1. Preserve the verified #5892 and #5887 backports and the #4893 regression coverage already committed on the dedicated v0.6 task branch.
    2. Harden the generated hook shim for #5941: honor the explicit AGENTPLANE_HOOK_RUNNER override, probe each Node runner with --version before selection, fall through only when a candidate cannot start, and return a genuine hook command failure without fallback. Add clean fixture coverage for incomplete local runners, missing installed runners, explicit env recovery, and no fallback after a real hook rejection.
    3. Address the v0.6-applicable #5942 source-link failure by changing the developer global reinstall path from npm link to materialized local package tarballs and by making the verification script reject global agentplane or core installs whose real paths remain inside the mutable source checkout. Add contract and fixture coverage. Do not attempt the v0.7 task-runtime identity architecture.
    4. Update only the repository and workflow Bun pins from 1.3.6 to 1.4.2. Preserve Node as the supported runtime, Vitest as the test runner, tsup as the bundler, the current dependency graph, and bun.lock resolution.
    5. Run the original focused tests, new hook and install tests, workflow command checks, Bun compiled CLI smoke, typecheck, platform-critical tests, git diff --check, and final branch/status review against v0.6.28.
    6. Commit the verified changes on the existing dedicated task branch. Do not push, open a PR, merge, or release.
  Verify Steps: |-
    1. Run focused Vitest coverage for evaluator target identity, runner activity status, direct verification rework routing, hook runner fallback, Doctor stale-shim diagnostics, and detached global install verification. Expected: all regressions pass.
    2. Run bun run typecheck and focused ESLint and Prettier checks. Expected: TypeScript, lint, and formatting pass.
    3. Run bun run test:platform-critical. Expected: platform-critical behavior passes.
    4. Run bun run workflows:command-check, bun run release:bun:smoke, bun run package:install-smoke, and bun run release:check under Bun 1.4.2. Expected: workflow, compiled CLI, package installation, and release contracts pass without bun.lock changes.
    5. Run git diff --check and inspect the final diff against 188b165e4f741a6166540f82eaf5c96fdd08d520. Expected: only approved backports, runtime readiness, developer install hardening, Bun pins, tests, and task evidence are changed.
    6. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: required repository gates pass.
    7. Run git status --short --untracked-files=all. Expected: no unintended tracked or untracked artifacts.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-14T14:27:53.959Z — VERIFY — ok

    By: CODER

    Note: Bun 1.4.2 qualification and v0.6 runtime hardening pass: 57 focused tests, 92 platform-critical tests, typecheck, focused ESLint and Prettier, workflow command contracts, compiled Bun CLI smoke, local tarball install smoke, release:check, doctor, policy routing, git diff --check, and unchanged bun.lock. The isolated developer reinstall installed materialized tarballs successfully; its in-checkout temporary prefix was then rejected by the new source-coupling guard as designed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T14:26:58.635Z, excerpt_hash=sha256:6a833fc3d8ed67155fb0e8b722dc7eebe4b0f8116c7db40b7da94296d77ef1de

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141255-VABJX3-backport-applicable-open-issue-fixes-to-the-0-6/.agentplane/tasks/202609141255-VABJX3/blueprint/resolved-snapshot.json
    - old_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
    - current_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609141255-VABJX3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202609141255-VABJX3 --author CODER
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-09-14T14:42:55.145Z — VERIFY — ok

    By: CODER

    Note: Verified: 57 focused tests and 92 platform-critical tests passed; typecheck, focused ESLint and Prettier, workflow command contracts, Bun compiled CLI smoke, local tarball install smoke, release:check, policy routing, doctor, and git diff checks passed on Bun 1.4.2; bun.lock is unchanged.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T14:27:54.071Z, excerpt_hash=sha256:6a833fc3d8ed67155fb0e8b722dc7eebe4b0f8116c7db40b7da94296d77ef1de

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141255-VABJX3-backport-applicable-open-issue-fixes-to-the-0-6/.agentplane/tasks/202609141255-VABJX3/blueprint/resolved-snapshot.json
    - old_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
    - current_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609141255-VABJX3

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane evaluator run 202609141255-VABJX3 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202609141255-VABJX3/README.md
    - diagnostic_command: agentplane evaluator run 202609141255-VABJX3 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202609141255-VABJX3/README.md
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
    - #5892: applies to 0.6.28. Passing evaluator reviews could record a null or drifted evaluated SHA after unrelated task-artifact commits. Backported a fail-closed target check and stable prior-target traversal.
    - #5887: applies to 0.6.28. Runner status relied on heartbeat and PID only. Backported trace and stderr activity diagnostics with active, idle, exited, and unknown health.
    - #4893: already resolved in 0.6.28. Added regression coverage for the existing continue_direct route.
    - #5941: the v0.6 shim had the same candidate-selection defect. Added bounded startup readiness probes, explicit env override precedence, fallback only before command execution, and stale-shim Doctor guidance.
    - #5942: the v0.6 developer reinstall helper used npm link. Replaced it with local package tarball installation and made verification reject installed package real paths inside the mutable source checkout. The v0.7 task-pinned lifecycle identity architecture remains out of scope.
    - Bun 1.4.2: suitable as a pin-only 0.6 backport. Node, Vitest, tsup, package dependencies, and bun.lock resolution remain unchanged.
    - #5921, #4848, and #4835 remain excluded because they depend on v0.7 architecture.
id_source: "generated"
---
## Summary

Backport applicable open issue fixes to the 0.6 maintenance branch

Audit all open GitHub issues against AgentPlane 0.6.28 and backport only confirmed 0.6-relevant fixes for issues #5892, #5887, and #4893. Preserve the v0.6 lifecycle and avoid 0.7 task-kernel or release architecture. Implement and verify the fixes on one dedicated local branch from codex/release-v0.6.27-reclaim-fix. Do not push, open a PR, merge, or release.

## Scope

- In scope: preserve the existing #5892 and #5887 backports and #4893 regression coverage; add v0.6-native hook runner startup readiness and deterministic fallback for #5941; replace source-linked developer global installs with materialized package tarballs for the applicable #5942 failure mode; update repository and workflow Bun pins to 1.4.2 without changing runtime architecture or dependency resolution.
- Out of scope: push, PR creation, merge, release, v0.7 task-runtime identity architecture, Node removal, bun:test migration, Bun.build migration, dependency upgrades, and unrelated refactors.

## Plan

1. Preserve the verified #5892 and #5887 backports and the #4893 regression coverage already committed on the dedicated v0.6 task branch.
2. Harden the generated hook shim for #5941: honor the explicit AGENTPLANE_HOOK_RUNNER override, probe each Node runner with --version before selection, fall through only when a candidate cannot start, and return a genuine hook command failure without fallback. Add clean fixture coverage for incomplete local runners, missing installed runners, explicit env recovery, and no fallback after a real hook rejection.
3. Address the v0.6-applicable #5942 source-link failure by changing the developer global reinstall path from npm link to materialized local package tarballs and by making the verification script reject global agentplane or core installs whose real paths remain inside the mutable source checkout. Add contract and fixture coverage. Do not attempt the v0.7 task-runtime identity architecture.
4. Update only the repository and workflow Bun pins from 1.3.6 to 1.4.2. Preserve Node as the supported runtime, Vitest as the test runner, tsup as the bundler, the current dependency graph, and bun.lock resolution.
5. Run the original focused tests, new hook and install tests, workflow command checks, Bun compiled CLI smoke, typecheck, platform-critical tests, git diff --check, and final branch/status review against v0.6.28.
6. Commit the verified changes on the existing dedicated task branch. Do not push, open a PR, merge, or release.

## Verify Steps

1. Run focused Vitest coverage for evaluator target identity, runner activity status, direct verification rework routing, hook runner fallback, Doctor stale-shim diagnostics, and detached global install verification. Expected: all regressions pass.
2. Run bun run typecheck and focused ESLint and Prettier checks. Expected: TypeScript, lint, and formatting pass.
3. Run bun run test:platform-critical. Expected: platform-critical behavior passes.
4. Run bun run workflows:command-check, bun run release:bun:smoke, bun run package:install-smoke, and bun run release:check under Bun 1.4.2. Expected: workflow, compiled CLI, package installation, and release contracts pass without bun.lock changes.
5. Run git diff --check and inspect the final diff against 188b165e4f741a6166540f82eaf5c96fdd08d520. Expected: only approved backports, runtime readiness, developer install hardening, Bun pins, tests, and task evidence are changed.
6. Run agentplane doctor and node .agentplane/policy/check-routing.mjs. Expected: required repository gates pass.
7. Run git status --short --untracked-files=all. Expected: no unintended tracked or untracked artifacts.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-14T14:27:53.959Z — VERIFY — ok

By: CODER

Note: Bun 1.4.2 qualification and v0.6 runtime hardening pass: 57 focused tests, 92 platform-critical tests, typecheck, focused ESLint and Prettier, workflow command contracts, compiled Bun CLI smoke, local tarball install smoke, release:check, doctor, policy routing, git diff --check, and unchanged bun.lock. The isolated developer reinstall installed materialized tarballs successfully; its in-checkout temporary prefix was then rejected by the new source-coupling guard as designed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T14:26:58.635Z, excerpt_hash=sha256:6a833fc3d8ed67155fb0e8b722dc7eebe4b0f8116c7db40b7da94296d77ef1de

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141255-VABJX3-backport-applicable-open-issue-fixes-to-the-0-6/.agentplane/tasks/202609141255-VABJX3/blueprint/resolved-snapshot.json
- old_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
- current_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609141255-VABJX3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202609141255-VABJX3 --author CODER
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-09-14T14:42:55.145Z — VERIFY — ok

By: CODER

Note: Verified: 57 focused tests and 92 platform-critical tests passed; typecheck, focused ESLint and Prettier, workflow command contracts, Bun compiled CLI smoke, local tarball install smoke, release:check, policy routing, doctor, and git diff checks passed on Bun 1.4.2; bun.lock is unchanged.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T14:27:54.071Z, excerpt_hash=sha256:6a833fc3d8ed67155fb0e8b722dc7eebe4b0f8116c7db40b7da94296d77ef1de

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141255-VABJX3-backport-applicable-open-issue-fixes-to-the-0-6/.agentplane/tasks/202609141255-VABJX3/blueprint/resolved-snapshot.json
- old_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
- current_digest: 40202f09d413e42875c6948dabee1280ec84db755295162aad21c96c07153b96
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609141255-VABJX3

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane evaluator run 202609141255-VABJX3 --verdict pass --summary Quality review passed. --finding No blocking findings. --evidence .agentplane/tasks/202609141255-VABJX3/README.md
- diagnostic_command: agentplane evaluator run 202609141255-VABJX3 --verdict pass --summary "Quality review passed." --finding "No blocking findings." --evidence .agentplane/tasks/202609141255-VABJX3/README.md
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

- #5892: applies to 0.6.28. Passing evaluator reviews could record a null or drifted evaluated SHA after unrelated task-artifact commits. Backported a fail-closed target check and stable prior-target traversal.
- #5887: applies to 0.6.28. Runner status relied on heartbeat and PID only. Backported trace and stderr activity diagnostics with active, idle, exited, and unknown health.
- #4893: already resolved in 0.6.28. Added regression coverage for the existing continue_direct route.
- #5941: the v0.6 shim had the same candidate-selection defect. Added bounded startup readiness probes, explicit env override precedence, fallback only before command execution, and stale-shim Doctor guidance.
- #5942: the v0.6 developer reinstall helper used npm link. Replaced it with local package tarball installation and made verification reject installed package real paths inside the mutable source checkout. The v0.7 task-pinned lifecycle identity architecture remains out of scope.
- Bun 1.4.2: suitable as a pin-only 0.6 backport. Node, Vitest, tsup, package dependencies, and bun.lock resolution remain unchanged.
- #5921, #4848, and #4835 remain excluded because they depend on v0.7 architecture.
