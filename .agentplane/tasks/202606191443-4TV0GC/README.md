---
id: "202606191443-4TV0GC"
title: "Prepare v0.6.21 patch release"
result_summary: "Merged via PR #4526."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-19T14:44:36.727Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-19T14:59:28.154Z"
  updated_by: "CODER"
  note: "Remote PR publication attempted after local release candidate verification. ap pr open failed on SSH host key verification; HTTPS pushes via gh credential helper hung and were interrupted without creating the remote branch. Local candidate remains clean and verified at HEAD 2322d3db77775f59e6da8e9423fd33653bf64a9b."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-19T14:53:35.464Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed for v0.6.21 release candidate."
  evaluated_sha: "464e050fc9ea0ed510ac3c6bd1b402049031f431"
  blueprint_digest: "6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432"
  evidence_refs:
    - ".agentplane/tasks/202606191443-4TV0GC/README.md"
    - ".agentplane/tasks/202606191443-4TV0GC/quality/20260619-145335464-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606191443-4TV0GC/quality/20260619-145335464-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606191443-4TV0GC/quality/20260619-145335464-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606191443-4TV0GC/blueprint/resolved-snapshot.json"
    - ".agentplane/.release/apply/2026-06-19T14-50-42-458Z.json"
  findings:
    - "No blocking findings. Runner execution remains hidden from ordinary help/docs; release candidate report shows no tag or push publication."
commit:
  hash: "af543f4f3cd495efdadfc53de14d74d4506d2703"
  message: "Prepare v0.6.21 patch release"
comments:
  -
    author: "CODER"
    body: "Start: Preparing v0.6.21 patch release candidate from the dedicated task worktree, with ordinary agent routes kept on current-agent execution and runner usage limited to explicit exceptions."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4526 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-06-19T14:45:09.585Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Preparing v0.6.21 patch release candidate from the dedicated task worktree, with ordinary agent routes kept on current-agent execution and runner usage limited to explicit exceptions."
  -
    type: "verify"
    at: "2026-06-19T14:53:04.244Z"
    author: "CODER"
    state: "ok"
    note: "Release candidate v0.6.21 prepared on task branch without tag/npm publication. Checks passed: ap task next-action kept executor=current_agent; bun scripts/release/check-release-notes.mjs --tag v0.6.21 --min-bullets 65; node .agentplane/policy/check-routing.mjs; ap doctor (OK with two pre-existing DONE-task warnings); targeted route/help bun tests 22 pass; bun run release:parity; bun run release:acr-example:check; bun run docs:cli:check; bun run test:release:critical (16 pass)."
  -
    type: "verify"
    at: "2026-06-19T14:59:28.154Z"
    author: "CODER"
    state: "ok"
    note: "Remote PR publication attempted after local release candidate verification. ap pr open failed on SSH host key verification; HTTPS pushes via gh credential helper hung and were interrupted without creating the remote branch. Local candidate remains clean and verified at HEAD 2322d3db77775f59e6da8e9423fd33653bf64a9b."
  -
    type: "status"
    at: "2026-06-19T15:42:58.716Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4526 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-06-19T15:42:58.723Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized."
sections:
  Summary: |-
    Prepare v0.6.21 patch release

    Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized.
  Scope: |-
    - In scope: Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.21 patch release".
  Plan: |-
    Release plan: version=0.6.21, tag=v0.6.21, scope=patch candidate from main commit 19c5d6ec21b6c719760360651aa4de7f449d8c65.

    1. Start a dedicated branch_pr worktree from main for task 202606191443-4TV0GC.
    2. Audit ordinary agent-facing route/docs/help surfaces for runner guidance. Keep ordinary routes on current-agent execution; runner usage must remain explicit/exceptional, with parallel-codex as the explicit opt-in path.
    3. Generate or update release notes for v0.6.21 from the release plan, including the runner-hidden behavior and all plan changes.
    4. Run the branch_pr release candidate flow for patch version v0.6.21 without publishing npm or pushing a release tag.
    5. Verify route guidance, release checks, policy routing, doctor, and final git state; record evidence before PR/integration.
  Verify Steps: |-
    1. Run `ap task next-action 202606191443-4TV0GC --explain` after plan approval and worktree start. Expected: branch_pr route points to the task worktree and does not instruct ordinary agents to use a runner.
    2. Run targeted runner-surface checks against changed docs/help/source. Expected: ordinary agent guidance remains current-agent/local-work oriented; runner execution is not presented as a default path, and any runner references are explicit/admin/parallel-codex exceptions.
    3. Run `ap release candidate --plan .agentplane/.release/plan/2026-06-19T14-43-07-325Z` or the route-emitted equivalent from the task worktree. Expected: versions and docs for `v0.6.21` are prepared without creating or pushing a release tag/npm publication.
    4. Run `node .agentplane/policy/check-routing.mjs`, `ap doctor`, and the relevant package/docs checks emitted by the release flow. Expected: all pass or any failure is recorded with impact and resolution.
    5. Run `git status --short --untracked-files=all` and inspect the release diff. Expected: only intentional task/release files are changed, with no unrelated worktree drift.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-19T14:53:04.244Z — VERIFY — ok

    By: CODER

    Note: Release candidate v0.6.21 prepared on task branch without tag/npm publication. Checks passed: ap task next-action kept executor=current_agent; bun scripts/release/check-release-notes.mjs --tag v0.6.21 --min-bullets 65; node .agentplane/policy/check-routing.mjs; ap doctor (OK with two pre-existing DONE-task warnings); targeted route/help bun tests 22 pass; bun run release:parity; bun run release:acr-example:check; bun run docs:cli:check; bun run test:release:critical (16 pass).
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-19T14:45:09.585Z, excerpt_hash=sha256:0b2bcfee58e0d35544aecb99b3fe26ef471d5e8a452f807d685a1d57dd8d08ad

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606191443-4TV0GC-prepare-v0-6-21-patch-release/.agentplane/tasks/202606191443-4TV0GC/blueprint/resolved-snapshot.json
    - old_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
    - current_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606191443-4TV0GC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606191443-4TV0GC
    - diagnostic_command: agentplane pr check 202606191443-4TV0GC
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-06-19T14:59:28.154Z — VERIFY — ok

    By: CODER

    Note: Remote PR publication attempted after local release candidate verification. ap pr open failed on SSH host key verification; HTTPS pushes via gh credential helper hung and were interrupted without creating the remote branch. Local candidate remains clean and verified at HEAD 2322d3db77775f59e6da8e9423fd33653bf64a9b.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-19T14:53:04.421Z, excerpt_hash=sha256:0b2bcfee58e0d35544aecb99b3fe26ef471d5e8a452f807d685a1d57dd8d08ad

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606191443-4TV0GC-prepare-v0-6-21-patch-release/.agentplane/tasks/202606191443-4TV0GC/blueprint/resolved-snapshot.json
    - old_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
    - current_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606191443-4TV0GC

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606191443-4TV0GC
    - diagnostic_command: agentplane pr check 202606191443-4TV0GC
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
    - Observation: Release report .agentplane/.release/apply/2026-06-19T14-50-42-458Z.json records tag.created=false, tag.pushed=false, push.performed=false, npm_version_available_checked=false.
      Impact: The branch is a release candidate only; final v0.6.21 publication still requires merge to main and explicit publish from the merged release commit SHA.
      Resolution: Keep runner commands hidden from ordinary docs/help, use current-agent route guidance by default, and publish only after protected-base integration.

    - Observation: Remote branch refs/heads/task/202606191443-4TV0GC/prepare-v0-6-21-patch-release was not present after the interrupted push attempts.
      Impact: The release candidate is prepared locally but not yet visible as a GitHub PR; merge/publish cannot proceed until git transport is repaired or the branch is pushed from an environment with working GitHub push transport.
      Resolution: Use the local candidate branch as the source of truth for the patch release; retry push/PR after fixing SSH known_hosts or HTTPS git transport.
id_source: "generated"
---
## Summary

Prepare v0.6.21 patch release

Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized.

## Scope

- In scope: Prepare the v0.6.21 patch release candidate from main and keep runner guidance hidden from ordinary agent routes until explicitly stabilized.
- Out of scope: unrelated refactors not required for "Prepare v0.6.21 patch release".

## Plan

Release plan: version=0.6.21, tag=v0.6.21, scope=patch candidate from main commit 19c5d6ec21b6c719760360651aa4de7f449d8c65.

1. Start a dedicated branch_pr worktree from main for task 202606191443-4TV0GC.
2. Audit ordinary agent-facing route/docs/help surfaces for runner guidance. Keep ordinary routes on current-agent execution; runner usage must remain explicit/exceptional, with parallel-codex as the explicit opt-in path.
3. Generate or update release notes for v0.6.21 from the release plan, including the runner-hidden behavior and all plan changes.
4. Run the branch_pr release candidate flow for patch version v0.6.21 without publishing npm or pushing a release tag.
5. Verify route guidance, release checks, policy routing, doctor, and final git state; record evidence before PR/integration.

## Verify Steps

1. Run `ap task next-action 202606191443-4TV0GC --explain` after plan approval and worktree start. Expected: branch_pr route points to the task worktree and does not instruct ordinary agents to use a runner.
2. Run targeted runner-surface checks against changed docs/help/source. Expected: ordinary agent guidance remains current-agent/local-work oriented; runner execution is not presented as a default path, and any runner references are explicit/admin/parallel-codex exceptions.
3. Run `ap release candidate --plan .agentplane/.release/plan/2026-06-19T14-43-07-325Z` or the route-emitted equivalent from the task worktree. Expected: versions and docs for `v0.6.21` are prepared without creating or pushing a release tag/npm publication.
4. Run `node .agentplane/policy/check-routing.mjs`, `ap doctor`, and the relevant package/docs checks emitted by the release flow. Expected: all pass or any failure is recorded with impact and resolution.
5. Run `git status --short --untracked-files=all` and inspect the release diff. Expected: only intentional task/release files are changed, with no unrelated worktree drift.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-19T14:53:04.244Z — VERIFY — ok

By: CODER

Note: Release candidate v0.6.21 prepared on task branch without tag/npm publication. Checks passed: ap task next-action kept executor=current_agent; bun scripts/release/check-release-notes.mjs --tag v0.6.21 --min-bullets 65; node .agentplane/policy/check-routing.mjs; ap doctor (OK with two pre-existing DONE-task warnings); targeted route/help bun tests 22 pass; bun run release:parity; bun run release:acr-example:check; bun run docs:cli:check; bun run test:release:critical (16 pass).
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-19T14:45:09.585Z, excerpt_hash=sha256:0b2bcfee58e0d35544aecb99b3fe26ef471d5e8a452f807d685a1d57dd8d08ad

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606191443-4TV0GC-prepare-v0-6-21-patch-release/.agentplane/tasks/202606191443-4TV0GC/blueprint/resolved-snapshot.json
- old_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
- current_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606191443-4TV0GC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606191443-4TV0GC
- diagnostic_command: agentplane pr check 202606191443-4TV0GC
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-06-19T14:59:28.154Z — VERIFY — ok

By: CODER

Note: Remote PR publication attempted after local release candidate verification. ap pr open failed on SSH host key verification; HTTPS pushes via gh credential helper hung and were interrupted without creating the remote branch. Local candidate remains clean and verified at HEAD 2322d3db77775f59e6da8e9423fd33653bf64a9b.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-19T14:53:04.421Z, excerpt_hash=sha256:0b2bcfee58e0d35544aecb99b3fe26ef471d5e8a452f807d685a1d57dd8d08ad

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606191443-4TV0GC-prepare-v0-6-21-patch-release/.agentplane/tasks/202606191443-4TV0GC/blueprint/resolved-snapshot.json
- old_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
- current_digest: 6729c1e669e7dab2dcfcbec93308d34b20a1383fb4957caee1c9a4a2e0d85432
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606191443-4TV0GC

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606191443-4TV0GC
- diagnostic_command: agentplane pr check 202606191443-4TV0GC
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

- Observation: Release report .agentplane/.release/apply/2026-06-19T14-50-42-458Z.json records tag.created=false, tag.pushed=false, push.performed=false, npm_version_available_checked=false.
  Impact: The branch is a release candidate only; final v0.6.21 publication still requires merge to main and explicit publish from the merged release commit SHA.
  Resolution: Keep runner commands hidden from ordinary docs/help, use current-agent route guidance by default, and publish only after protected-base integration.

- Observation: Remote branch refs/heads/task/202606191443-4TV0GC/prepare-v0-6-21-patch-release was not present after the interrupted push attempts.
  Impact: The release candidate is prepared locally but not yet visible as a GitHub PR; merge/publish cannot proceed until git transport is repaired or the branch is pushed from an environment with working GitHub push transport.
  Resolution: Use the local candidate branch as the source of truth for the patch release; retry push/PR after fixing SSH known_hosts or HTTPS git transport.
