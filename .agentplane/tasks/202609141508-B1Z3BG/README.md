---
id: "202609141508-B1Z3BG"
title: "Release AgentPlane v0.6.29"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
task_kind: "release"
mutation_scope: "release"
blueprint_request: "release.strict"
verify:
  - "bun run release:prepublish"
  - "git diff --check"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-09-14T15:08:01.013Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-09-14T16:28:18.001Z"
  updated_by: "CODER"
  note: "Verified: release.strict blueprint snapshot e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122 is current; prior release gate 82/82, local ci:local:fast 371/371 files and 2190/2190 tests, and hosted CI on implementation/projection head remain passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-09-14T16:28:42.092Z"
  updated_by: "EVALUATOR"
  note: "Release v0.6.29 candidate and current release.strict blueprint snapshot satisfy the approved maintenance release contract."
  evaluated_sha: "e4a04bdbc9e2e623304acb004c576f0577770739"
  blueprint_digest: "e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122"
  evidence_refs:
    - ".agentplane/tasks/202609141508-B1Z3BG/README.md"
    - ".agentplane/tasks/202609141508-B1Z3BG/quality/20260914-162842092-recovery-context/quality-report.json"
    - ".agentplane/tasks/202609141508-B1Z3BG/quality/20260914-162842092-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202609141508-B1Z3BG/quality/20260914-162842092-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202609141508-B1Z3BG/blueprint/resolved-snapshot.json"
    - "docs/releases/v0.6.29.md"
    - "GitHub Core CI run 34868107221 and late release checks passed on PR #5957"
    - "Local release candidate gate passed 82/82 groups and follow-up full-fast passed 371/371 test files, 2190/2190 tests"
  findings:
    - "No unresolved findings remain after reviewing the release diff, version parity, release notes, verification records, hosted checks, and resolved blueprint snapshot."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-09-14T16:26:03.049Z"
    author: "CODER"
    state: "ok"
    note: "Verified release v0.6.29 candidate: local release gate 82/82 groups, local ci:local:fast 371/371 files and 2190/2190 tests, release parity and routing checks passed; hosted Core CI, Docs CI, Dependency Review, Windows, Release-ready manifest, and PR verification passed on 9f39c055484843c71225f157cbdfdf177a9e8339."
  -
    type: "verify"
    at: "2026-09-14T16:28:18.001Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release.strict blueprint snapshot e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122 is current; prior release gate 82/82, local ci:local:fast 371/371 files and 2190/2190 tests, and hosted CI on implementation/projection head remain passed."
doc_version: 3
doc_updated_at: "2026-09-14T16:28:18.087Z"
doc_updated_by: "CODER"
description: "Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification."
sections:
  Summary: |-
    Release AgentPlane v0.6.29

    Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
  Scope: |-
    - In scope: Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
    - Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.29".
  Plan: |-
    1. Generate the v0.6.29 patch release plan from v0.6.28.
    2. Write complete release notes for the audited 0.6 fixes.
    3. Prepare and push the branch_pr release candidate.
    4. Require local prepublish and hosted CI on the exact candidate head.
    5. Merge to the pinned 0.6 maintenance branch and dispatch Publish to npm for the exact merged SHA.
    6. Verify GitHub release, tag, npm packages, installed CLI, and maintenance branch convergence.
  Verify Steps: |-
    1. Run bun run release:prepublish. Expected: all fast and heavy release checks pass for v0.6.29.
    2. Run bun run release:parity and node .agentplane/policy/check-routing.mjs. Expected: package versions and policy routing are consistent.
    3. Run git diff --check and confirm docs/releases/v0.6.29.md covers every entry from the frozen release plan. Expected: no whitespace errors or omitted changes.
    4. Confirm the release candidate PR targets codex/release-v0.6.27-reclaim-fix and all hosted checks pass on the exact candidate head.
    5. After merge, dispatch Publish to npm for the exact merged release SHA. Expected: workflow succeeds without tag or SHA drift.
    6. Verify tag v0.6.29, the GitHub release, npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, both CLI entrypoints, and origin/codex/release-v0.6.27-reclaim-fix convergence.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-09-14T16:26:03.049Z — VERIFY — ok

    By: CODER

    Note: Verified release v0.6.29 candidate: local release gate 82/82 groups, local ci:local:fast 371/371 files and 2190/2190 tests, release parity and routing checks passed; hosted Core CI, Docs CI, Dependency Review, Windows, Release-ready manifest, and PR verification passed on 9f39c055484843c71225f157cbdfdf177a9e8339.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T15:09:02.126Z, excerpt_hash=sha256:7a8f7b7b21d26d19bb37e236038a9fa4f3d7ea4b09522c1fdc32ff46a7694198

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141508-B1Z3BG-release-v0-6-29/.agentplane/tasks/202609141508-B1Z3BG/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202609141508-B1Z3BG

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202609141508-B1Z3BG --branch task/202609141508-B1Z3BG/release-v0-6-29
    - diagnostic_command: agentplane pr check 202609141508-B1Z3BG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-09-14T16:28:18.001Z — VERIFY — ok

    By: CODER

    Note: Verified: release.strict blueprint snapshot e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122 is current; prior release gate 82/82, local ci:local:fast 371/371 files and 2190/2190 tests, and hosted CI on implementation/projection head remain passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T16:26:03.134Z, excerpt_hash=sha256:7a8f7b7b21d26d19bb37e236038a9fa4f3d7ea4b09522c1fdc32ff46a7694198

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141508-B1Z3BG-release-v0-6-29/.agentplane/tasks/202609141508-B1Z3BG/blueprint/resolved-snapshot.json
    - old_digest: e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122
    - current_digest: e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202609141508-B1Z3BG

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202609141508-B1Z3BG --branch task/202609141508-B1Z3BG/release-v0-6-29
    - diagnostic_command: agentplane pr check 202609141508-B1Z3BG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Release AgentPlane v0.6.29

Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.

## Scope

- In scope: Prepare, review, merge, and publish the next 0.6 patch release from the merged maintenance fixes, with exact-SHA release evidence and post-publish install verification.
- Out of scope: unrelated refactors not required for "Release AgentPlane v0.6.29".

## Plan

1. Generate the v0.6.29 patch release plan from v0.6.28.
2. Write complete release notes for the audited 0.6 fixes.
3. Prepare and push the branch_pr release candidate.
4. Require local prepublish and hosted CI on the exact candidate head.
5. Merge to the pinned 0.6 maintenance branch and dispatch Publish to npm for the exact merged SHA.
6. Verify GitHub release, tag, npm packages, installed CLI, and maintenance branch convergence.

## Verify Steps

1. Run bun run release:prepublish. Expected: all fast and heavy release checks pass for v0.6.29.
2. Run bun run release:parity and node .agentplane/policy/check-routing.mjs. Expected: package versions and policy routing are consistent.
3. Run git diff --check and confirm docs/releases/v0.6.29.md covers every entry from the frozen release plan. Expected: no whitespace errors or omitted changes.
4. Confirm the release candidate PR targets codex/release-v0.6.27-reclaim-fix and all hosted checks pass on the exact candidate head.
5. After merge, dispatch Publish to npm for the exact merged release SHA. Expected: workflow succeeds without tag or SHA drift.
6. Verify tag v0.6.29, the GitHub release, npm versions for agentplane, @agentplaneorg/core, and @agentplaneorg/recipes, both CLI entrypoints, and origin/codex/release-v0.6.27-reclaim-fix convergence.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-09-14T16:26:03.049Z — VERIFY — ok

By: CODER

Note: Verified release v0.6.29 candidate: local release gate 82/82 groups, local ci:local:fast 371/371 files and 2190/2190 tests, release parity and routing checks passed; hosted Core CI, Docs CI, Dependency Review, Windows, Release-ready manifest, and PR verification passed on 9f39c055484843c71225f157cbdfdf177a9e8339.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T15:09:02.126Z, excerpt_hash=sha256:7a8f7b7b21d26d19bb37e236038a9fa4f3d7ea4b09522c1fdc32ff46a7694198

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141508-B1Z3BG-release-v0-6-29/.agentplane/tasks/202609141508-B1Z3BG/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202609141508-B1Z3BG

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202609141508-B1Z3BG --branch task/202609141508-B1Z3BG/release-v0-6-29
- diagnostic_command: agentplane pr check 202609141508-B1Z3BG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-09-14T16:28:18.001Z — VERIFY — ok

By: CODER

Note: Verified: release.strict blueprint snapshot e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122 is current; prior release gate 82/82, local ci:local:fast 371/371 files and 2190/2190 tests, and hosted CI on implementation/projection head remain passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-09-14T16:26:03.134Z, excerpt_hash=sha256:7a8f7b7b21d26d19bb37e236038a9fa4f3d7ea4b09522c1fdc32ff46a7694198

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Projects/agentplane/.agentplane/worktrees/v0-6-issues-base/.agentplane/worktrees/202609141508-B1Z3BG-release-v0-6-29/.agentplane/tasks/202609141508-B1Z3BG/blueprint/resolved-snapshot.json
- old_digest: e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122
- current_digest: e4beed472f52ff7eacb96653f841fd6989d2bf0019ec20a9312f059008846122
- route_changed: no
- safe_command: agentplane blueprint snapshot 202609141508-B1Z3BG

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202609141508-B1Z3BG --branch task/202609141508-B1Z3BG/release-v0-6-29
- diagnostic_command: agentplane pr check 202609141508-B1Z3BG
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
