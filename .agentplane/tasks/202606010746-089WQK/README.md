---
id: "202606010746-089WQK"
title: "Refresh Hermes docs social images for patch release"
status: "DOING"
priority: "med"
owner: "DOCS"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T07:46:47.117Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-01T07:59:34.879Z"
  updated_by: "EVALUATOR"
  note: "PR artifact freshness recheck: hosted checks passed on PR #4354 after final evaluator evidence commit; refreshing verification so last_verified_diffstat_sha256 can match the current PR diffstat digest before integration."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-01T08:16:19.881Z"
  updated_by: "EVALUATOR"
  note: "Final PR artifact freshness and hosted checks are current for PR #4354."
  evaluated_sha: "69adceb350111daad3cece67e834d0123de7f1c0"
  blueprint_digest: "4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16"
  evidence_refs:
    - ".agentplane/tasks/202606010746-089WQK/README.md"
    - ".agentplane/tasks/202606010746-089WQK/quality/20260601-081619881-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606010746-089WQK/quality/20260601-081619881-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606010746-089WQK/quality/20260601-081619881-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606010746-089WQK/blueprint/resolved-snapshot.json"
    - ".agentplane/tasks/202606010746-089WQK/pr/meta.json"
  findings:
    - "After refreshing verification metadata, pr/meta.json records matching diffstat_sha256 and last_verified_diffstat_sha256; PR #4354 head afd84468e has Docs CI, Core CI plan/PR verification, and CodeQL checks passing, and the review thread was resolved."
commit: null
comments:
  -
    author: "DOCS"
    body: "Start: Regenerate the checked-in Hermes docs social preview images and manifest, then rerun the release gates needed before patch target 0.6.14."
events:
  -
    type: "status"
    at: "2026-06-01T07:47:42.967Z"
    author: "DOCS"
    from: "TODO"
    to: "DOING"
    note: "Start: Regenerate the checked-in Hermes docs social preview images and manifest, then rerun the release gates needed before patch target 0.6.14."
  -
    type: "verify"
    at: "2026-06-01T07:51:16.255Z"
    author: "DOCS"
    state: "ok"
    note: "Command: bun run docs:social:generate -> pass, generated 2 docs social images and left 204 unchanged. Command: bun run docs:social:check -> pass, checked 206 docs social images. Command: bun run release:check -> pass, release incident, ACR example, social image, package build, tarball policy, and blueprint release gates passed. Command: bun run release:parity -> pass, package versions remain 0.6.13. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap doctor -> pass with two pre-existing warnings for old DONE tasks missing implementation hashes. Command: bun run release:tasks:check -> expected pre-finish blocker because this task is DOING; rerun after integration/finish before release candidate."
  -
    type: "verify"
    at: "2026-06-01T07:59:34.879Z"
    author: "EVALUATOR"
    state: "ok"
    note: "PR artifact freshness recheck: hosted checks passed on PR #4354 after final evaluator evidence commit; refreshing verification so last_verified_diffstat_sha256 can match the current PR diffstat digest before integration."
doc_version: 3
doc_updated_at: "2026-06-01T07:59:34.910Z"
doc_updated_by: "DOCS"
description: "Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release."
sections:
  Summary: |-
    Refresh Hermes docs social images for patch release

    Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release.
  Scope: |-
    - In scope: Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release.
    - Out of scope: unrelated refactors not required for "Refresh Hermes docs social images for patch release".
  Plan: "Release-blocker plan: scope=regenerate checked-in docs social images and manifest for Hermes docs before patch target 0.6.14; files=website/static/img/social/** plus task artifacts only; verification=bun run docs:social:generate, bun run docs:social:check, bun run release:check, bun run release:tasks:check, bun run release:parity, node .agentplane/policy/check-routing.mjs, ap doctor, git status --short --untracked-files=all; out_of_scope=version bump, release candidate push, npm publish, unrelated docs/script refactors."
  Verify Steps: |-
    PLANNER fallback scaffold for "Refresh Hermes docs social images for patch release". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Refresh Hermes docs social images for patch release". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-01T07:51:16.255Z — VERIFY — ok

    By: DOCS

    Note: Command: bun run docs:social:generate -> pass, generated 2 docs social images and left 204 unchanged. Command: bun run docs:social:check -> pass, checked 206 docs social images. Command: bun run release:check -> pass, release incident, ACR example, social image, package build, tarball policy, and blueprint release gates passed. Command: bun run release:parity -> pass, package versions remain 0.6.13. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap doctor -> pass with two pre-existing warnings for old DONE tasks missing implementation hashes. Command: bun run release:tasks:check -> expected pre-finish blocker because this task is DOING; rerun after integration/finish before release candidate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T07:47:42.967Z, excerpt_hash=sha256:d1769d94b0d8251393ddc7137f81da6bd59a39618803664e1b10cedf231f8730

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010746-089WQK-refresh-hermes-docs-social-images-for-patch-rele/.agentplane/tasks/202606010746-089WQK/blueprint/resolved-snapshot.json
    - old_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
    - current_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010746-089WQK

    ### 2026-06-01T07:59:34.879Z — VERIFY — ok

    By: EVALUATOR

    Note: PR artifact freshness recheck: hosted checks passed on PR #4354 after final evaluator evidence commit; refreshing verification so last_verified_diffstat_sha256 can match the current PR diffstat digest before integration.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T07:51:16.298Z, excerpt_hash=sha256:d1769d94b0d8251393ddc7137f81da6bd59a39618803664e1b10cedf231f8730

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010746-089WQK-refresh-hermes-docs-social-images-for-patch-rele/.agentplane/tasks/202606010746-089WQK/blueprint/resolved-snapshot.json
    - old_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
    - current_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606010746-089WQK

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: release:check was blocked by stale docs social artifacts for /docs/recipes/hermes-agentplane and /docs/workflow-guides/hermes-kanban.
      Impact: Patch release preparation could not proceed while generated social image assets and manifest were stale.
      Resolution: Regenerated website/static/img/social/manifest.json plus the two missing Hermes social PNG assets; full release:check now passes in the task worktree.
id_source: "generated"
---
## Summary

Refresh Hermes docs social images for patch release

Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release.

## Scope

- In scope: Regenerate checked-in docs social images and manifest so release:check passes before preparing the next patch release.
- Out of scope: unrelated refactors not required for "Refresh Hermes docs social images for patch release".

## Plan

Release-blocker plan: scope=regenerate checked-in docs social images and manifest for Hermes docs before patch target 0.6.14; files=website/static/img/social/** plus task artifacts only; verification=bun run docs:social:generate, bun run docs:social:check, bun run release:check, bun run release:tasks:check, bun run release:parity, node .agentplane/policy/check-routing.mjs, ap doctor, git status --short --untracked-files=all; out_of_scope=version bump, release candidate push, npm publish, unrelated docs/script refactors.

## Verify Steps

PLANNER fallback scaffold for "Refresh Hermes docs social images for patch release". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Refresh Hermes docs social images for patch release". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-01T07:51:16.255Z — VERIFY — ok

By: DOCS

Note: Command: bun run docs:social:generate -> pass, generated 2 docs social images and left 204 unchanged. Command: bun run docs:social:check -> pass, checked 206 docs social images. Command: bun run release:check -> pass, release incident, ACR example, social image, package build, tarball policy, and blueprint release gates passed. Command: bun run release:parity -> pass, package versions remain 0.6.13. Command: node .agentplane/policy/check-routing.mjs -> pass. Command: ap doctor -> pass with two pre-existing warnings for old DONE tasks missing implementation hashes. Command: bun run release:tasks:check -> expected pre-finish blocker because this task is DOING; rerun after integration/finish before release candidate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T07:47:42.967Z, excerpt_hash=sha256:d1769d94b0d8251393ddc7137f81da6bd59a39618803664e1b10cedf231f8730

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010746-089WQK-refresh-hermes-docs-social-images-for-patch-rele/.agentplane/tasks/202606010746-089WQK/blueprint/resolved-snapshot.json
- old_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
- current_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010746-089WQK

### 2026-06-01T07:59:34.879Z — VERIFY — ok

By: EVALUATOR

Note: PR artifact freshness recheck: hosted checks passed on PR #4354 after final evaluator evidence commit; refreshing verification so last_verified_diffstat_sha256 can match the current PR diffstat digest before integration.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-01T07:51:16.298Z, excerpt_hash=sha256:d1769d94b0d8251393ddc7137f81da6bd59a39618803664e1b10cedf231f8730

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606010746-089WQK-refresh-hermes-docs-social-images-for-patch-rele/.agentplane/tasks/202606010746-089WQK/blueprint/resolved-snapshot.json
- old_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
- current_digest: 4a6bf7c22bd64f26a418b0c6e4118aa5d1244d0a23aade3872b8f51194d22b16
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606010746-089WQK

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: release:check was blocked by stale docs social artifacts for /docs/recipes/hermes-agentplane and /docs/workflow-guides/hermes-kanban.
  Impact: Patch release preparation could not proceed while generated social image assets and manifest were stale.
  Resolution: Regenerated website/static/img/social/manifest.json plus the two missing Hermes social PNG assets; full release:check now passes in the task worktree.
