---
id: "202605260907-2F52BD"
title: "Prepare v0.6.10 patch release"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "publish"
  - "release"
task_kind: "release"
mutation_scope: "release"
risk_flags:
  - "external_system"
  - "merge"
  - "publish"
blueprint_request: "release.strict"
verify:
  - "ap doctor"
  - "bun run release:parity"
  - "bun run release:prepublish"
  - "gh release view v0.6.10"
  - "git fetch --tags --prune origin"
  - "git ls-remote --tags origin v0.6.10"
  - "node .agentplane/policy/check-routing.mjs"
  - "npm view agentplane version && npm view @agentplaneorg/core version && npm view @agentplaneorg/recipes version"
plan_approval:
  state: "approved"
  updated_at: "2026-05-26T09:07:13.303Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Preparing v0.6.10 patch release from a dedicated branch_pr worktree after approved plan; first step is resolving local-only stale v0.3.8 tag drift, then preparing the release candidate and hosted publish path."
events:
  -
    type: "status"
    at: "2026-05-26T09:07:45.654Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Preparing v0.6.10 patch release from a dedicated branch_pr worktree after approved plan; first step is resolving local-only stale v0.3.8 tag drift, then preparing the release candidate and hosted publish path."
doc_version: 3
doc_updated_at: "2026-05-26T09:09:46.705Z"
doc_updated_by: "CODER"
description: "Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence."
sections:
  Summary: |-
    Prepare v0.6.10 patch release

    Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
  Scope: |-
    - In scope: Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.10 patch release".
  Plan: "Release plan: version=v0.6.10, tag=v0.6.10, route=branch_pr release candidate. Scope: first resolve the local-only stale v0.3.8 tag conflict by deleting the local tag ref and fetching origin/v0.3.8 without modifying the remote; then generate a patch release plan, prepare and push the v0.6.10 release candidate branch, open/update the task PR, wait for hosted checks, merge through the protected GitHub PR route, dispatch the hosted Publish release workflow for the merged release commit SHA, verify npm/GitHub tag/GitHub Release evidence, and finish the task with close-tail evidence. Checks: release prepublish/parity, policy routing, doctor, npm version readback, origin tag readback, GitHub release readback."
  Verify Steps: |-
    1. Resolve the stale local tag preflight drift. Expected: local refs/tags/v0.3.8 matches origin/v0.3.8 and git fetch --tags --prune origin exits 0.
    2. Generate a patch release plan for v0.6.10. Expected: version.json records prevTag=v0.6.9, nextTag=v0.6.10, bump=patch, baseSha at the current release base.
    3. Write docs/releases/v0.6.10.md from the release plan. Expected: English release notes follow docs/releases/TEMPLATE.md, contain no Cyrillic, and include at least one concrete bullet for every listed change.
    4. Prepare and push the branch_pr release candidate. Expected: package versions and release artifacts are bumped to 0.6.10, candidate branch is pushed, and no release tag is created locally as the publication tag.
    5. Run release checks. Expected: release prepublish/parity, policy routing, doctor, and registry availability checks pass or any blocker is recorded with exact failure evidence.
    6. Open/update the task PR and merge through the protected branch_pr route. Expected: hosted checks are stable green, the task PR merges to main, and the merge commit SHA is recorded.
    7. Dispatch hosted Publish release for the merged release commit SHA. Expected: npm publishes agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.10; origin has tag v0.6.10; GitHub Release v0.6.10 exists.
    8. Record verification and finish evidence. Expected: ap verify and ap finish capture command evidence, release result, residual risks, and close-tail state.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prepare v0.6.10 patch release

Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.

## Scope

- In scope: Resolve local stale tag preflight drift, prepare the next patch release candidate for v0.6.10, publish it through the branch_pr release route, and record release evidence.
- Out of scope: unrelated refactors not required for "Prepare v0.6.10 patch release".

## Plan

Release plan: version=v0.6.10, tag=v0.6.10, route=branch_pr release candidate. Scope: first resolve the local-only stale v0.3.8 tag conflict by deleting the local tag ref and fetching origin/v0.3.8 without modifying the remote; then generate a patch release plan, prepare and push the v0.6.10 release candidate branch, open/update the task PR, wait for hosted checks, merge through the protected GitHub PR route, dispatch the hosted Publish release workflow for the merged release commit SHA, verify npm/GitHub tag/GitHub Release evidence, and finish the task with close-tail evidence. Checks: release prepublish/parity, policy routing, doctor, npm version readback, origin tag readback, GitHub release readback.

## Verify Steps

1. Resolve the stale local tag preflight drift. Expected: local refs/tags/v0.3.8 matches origin/v0.3.8 and git fetch --tags --prune origin exits 0.
2. Generate a patch release plan for v0.6.10. Expected: version.json records prevTag=v0.6.9, nextTag=v0.6.10, bump=patch, baseSha at the current release base.
3. Write docs/releases/v0.6.10.md from the release plan. Expected: English release notes follow docs/releases/TEMPLATE.md, contain no Cyrillic, and include at least one concrete bullet for every listed change.
4. Prepare and push the branch_pr release candidate. Expected: package versions and release artifacts are bumped to 0.6.10, candidate branch is pushed, and no release tag is created locally as the publication tag.
5. Run release checks. Expected: release prepublish/parity, policy routing, doctor, and registry availability checks pass or any blocker is recorded with exact failure evidence.
6. Open/update the task PR and merge through the protected branch_pr route. Expected: hosted checks are stable green, the task PR merges to main, and the merge commit SHA is recorded.
7. Dispatch hosted Publish release for the merged release commit SHA. Expected: npm publishes agentplane, @agentplaneorg/core, and @agentplaneorg/recipes at 0.6.10; origin has tag v0.6.10; GitHub Release v0.6.10 exists.
8. Record verification and finish evidence. Expected: ap verify and ap finish capture command evidence, release result, residual risks, and close-tail state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
