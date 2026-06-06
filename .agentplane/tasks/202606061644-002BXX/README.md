---
id: "202606061644-002BXX"
title: "Refresh README headers for latest release"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-06T16:44:47.494Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-06T16:49:13.922Z"
  updated_by: "DOCS"
  note: "Command: bun run docs:readme-header:check; Result: pass; Evidence: README header artifacts are fresh for v0.6.18. Command: bun run docs:scripts:check; Result: pass; Evidence: scripts/README.md is up to date. Command: bun run release:check; Result: pass; Evidence: release gate ran docs:readme-header:check, social image check, package builds, tarball policy, and blueprint release gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with two unrelated historical DONE-task warnings."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-06T16:52:33.619Z"
  updated_by: "EVALUATOR"
  note: "README header assets now match v0.6.18 and the release gate runs docs:readme-header:check."
  evaluated_sha: "0097b705fed3c68d23bf6201bca967dcfd82d6eb"
  blueprint_digest: "8a97f69f9e5e157a8e7b7a6680e677ec3e74ae50d006ab34f6cf361f5f60dc18"
  evidence_refs:
    - ".agentplane/tasks/202606061644-002BXX/README.md"
    - ".agentplane/tasks/202606061644-002BXX/quality/20260606-165233619-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606061644-002BXX/quality/20260606-165233619-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606061644-002BXX/quality/20260606-165233619-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606061644-002BXX/blueprint/resolved-snapshot.json"
    - "bun run release:check"
  findings:
    - "docs:readme-header:check passed; full release:check passed with the new header gate before social image and build checks."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Refresh README header assets to the latest release and add a release check gate so future releases fail when those generated assets drift."
events:
  -
    type: "status"
    at: "2026-06-06T16:44:54.964Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Refresh README header assets to the latest release and add a release check gate so future releases fail when those generated assets drift."
  -
    type: "verify"
    at: "2026-06-06T16:49:13.922Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun run docs:readme-header:check; Result: pass; Evidence: README header artifacts are fresh for v0.6.18. Command: bun run docs:scripts:check; Result: pass; Evidence: scripts/README.md is up to date. Command: bun run release:check; Result: pass; Evidence: release gate ran docs:readme-header:check, social image check, package builds, tarball policy, and blueprint release gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with two unrelated historical DONE-task warnings."
doc_version: 3
doc_updated_at: "2026-06-06T16:49:15.175Z"
doc_updated_by: "DOCS"
description: "Regenerate README header assets to the current release and make release checks fail when README header assets drift from the latest release tag."
sections:
  Summary: |-
    Refresh README headers for latest release

    Regenerate README header assets to the current release and make release checks fail when README header assets drift from the latest release tag.
  Scope: |-
    - In scope: Regenerate README header assets to the current release and make release checks fail when README header assets drift from the latest release tag.
    - Out of scope: unrelated refactors not required for "Refresh README headers for latest release".
  Plan: |-
    1. Confirm current release/version truth and existing README header drift.
    2. Start a branch_pr worktree for DOCS ownership.
    3. Regenerate README header assets so visible/header metadata matches latest release v0.6.18.
    4. Add docs:readme-header:check to release gate so future releases fail on stale header assets.
    5. Verify with docs:readme-header:check, targeted release check surface, agentplane doctor, policy routing check, and final git status.
  Verify Steps: |-
    1. Run `bun run docs:readme-header:check`. Expected: README header artifacts are fresh for v0.6.18.
    2. Run `bun run docs:scripts:check`. Expected: scripts/README.md matches package.json scripts.
    3. Run `bun run release:check`. Expected: release gate includes and passes docs:readme-header:check before the rest of release checks.
    4. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and doctor has no task-local failures.
    5. Run `git status --short --untracked-files=all`. Expected: only intentional task-scope files are changed.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-06T16:49:13.922Z — VERIFY — ok

    By: DOCS

    Note: Command: bun run docs:readme-header:check; Result: pass; Evidence: README header artifacts are fresh for v0.6.18. Command: bun run docs:scripts:check; Result: pass; Evidence: scripts/README.md is up to date. Command: bun run release:check; Result: pass; Evidence: release gate ran docs:readme-header:check, social image check, package builds, tarball policy, and blueprint release gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with two unrelated historical DONE-task warnings.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T16:48:54.892Z, excerpt_hash=sha256:9ecd92723f17d46ed81c7df5f6dac9cc57278b0cbb2520497513c90ef0b63919

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061644-002BXX-refresh-readme-headers-for-latest-release/.agentplane/tasks/202606061644-002BXX/blueprint/resolved-snapshot.json
    - old_digest: 8a97f69f9e5e157a8e7b7a6680e677ec3e74ae50d006ab34f6cf361f5f60dc18
    - current_digest: 8a97f69f9e5e157a8e7b7a6680e677ec3e74ae50d006ab34f6cf361f5f60dc18
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606061644-002BXX

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606061644-002BXX --agent DOCS --slug refresh-readme-headers-for-latest-release --worktree
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Refresh README headers for latest release

Regenerate README header assets to the current release and make release checks fail when README header assets drift from the latest release tag.

## Scope

- In scope: Regenerate README header assets to the current release and make release checks fail when README header assets drift from the latest release tag.
- Out of scope: unrelated refactors not required for "Refresh README headers for latest release".

## Plan

1. Confirm current release/version truth and existing README header drift.
2. Start a branch_pr worktree for DOCS ownership.
3. Regenerate README header assets so visible/header metadata matches latest release v0.6.18.
4. Add docs:readme-header:check to release gate so future releases fail on stale header assets.
5. Verify with docs:readme-header:check, targeted release check surface, agentplane doctor, policy routing check, and final git status.

## Verify Steps

1. Run `bun run docs:readme-header:check`. Expected: README header artifacts are fresh for v0.6.18.
2. Run `bun run docs:scripts:check`. Expected: scripts/README.md matches package.json scripts.
3. Run `bun run release:check`. Expected: release gate includes and passes docs:readme-header:check before the rest of release checks.
4. Run `node .agentplane/policy/check-routing.mjs` and `ap doctor`. Expected: policy routing passes and doctor has no task-local failures.
5. Run `git status --short --untracked-files=all`. Expected: only intentional task-scope files are changed.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-06T16:49:13.922Z — VERIFY — ok

By: DOCS

Note: Command: bun run docs:readme-header:check; Result: pass; Evidence: README header artifacts are fresh for v0.6.18. Command: bun run docs:scripts:check; Result: pass; Evidence: scripts/README.md is up to date. Command: bun run release:check; Result: pass; Evidence: release gate ran docs:readme-header:check, social image check, package builds, tarball policy, and blueprint release gate. Command: node .agentplane/policy/check-routing.mjs; Result: pass; Evidence: policy routing OK. Command: ap doctor; Result: pass; Evidence: doctor OK with two unrelated historical DONE-task warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-06T16:48:54.892Z, excerpt_hash=sha256:9ecd92723f17d46ed81c7df5f6dac9cc57278b0cbb2520497513c90ef0b63919

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606061644-002BXX-refresh-readme-headers-for-latest-release/.agentplane/tasks/202606061644-002BXX/blueprint/resolved-snapshot.json
- old_digest: 8a97f69f9e5e157a8e7b7a6680e677ec3e74ae50d006ab34f6cf361f5f60dc18
- current_digest: 8a97f69f9e5e157a8e7b7a6680e677ec3e74ae50d006ab34f6cf361f5f60dc18
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606061644-002BXX

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606061644-002BXX --agent DOCS --slug refresh-readme-headers-for-latest-release --worktree
- diagnostic_command: none
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
