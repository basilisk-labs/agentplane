---
id: "202606011006-MTT6E8"
title: "Prepare v0.6.14 release candidate"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-01T10:06:36.114Z"
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
    author: "INTEGRATOR"
    body: "Start: prepare v0.6.14 release candidate from the dedicated branch_pr worktree without publishing npm packages or pushing release tags."
events:
  -
    type: "status"
    at: "2026-06-01T10:06:49.319Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: prepare v0.6.14 release candidate from the dedicated branch_pr worktree without publishing npm packages or pushing release tags."
doc_version: 3
doc_updated_at: "2026-06-01T10:44:35.626Z"
doc_updated_by: "INTEGRATOR"
description: "Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication."
sections:
  Summary: |-
    Prepare v0.6.14 release candidate

    Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
  Scope: |-
    - In scope: Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
    - Out of scope: unrelated refactors not required for "Prepare v0.6.14 release candidate".
  Plan: "Release candidate plan: version=0.6.14, tag=v0.6.14, plan=.agentplane/.release/plan/2026-06-01T10-05-51-604Z. Run ap release candidate from dedicated branch_pr worktree with --push --yes. Verify release:tasks:check, release:parity, release:check, release:state, release:next-action, and GitHub PR checks. Do not publish npm packages or push release tag in this task."
  Verify Steps: |-
    1. ap release candidate --plan .agentplane/.release/plan/2026-06-01T10-07-08-939Z --push --yes
    2. bun run release:prepublish:fast
    3. bun run release:ci-check
    4. bun run release:tasks:check
    5. bun run release:parity
    6. bun run release:check
    7. bun run release:state
    8. bun run release:next-action
    9. gh pr checks <release-pr> --watch=false
    10. git status --short --untracked-files=all
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Close the release candidate PR without merge or revert the release candidate branch. Do not publish npm packages or tags from this task."
  Findings: ""
id_source: "generated"
---
## Summary

Prepare v0.6.14 release candidate

Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.

## Scope

- In scope: Prepare the v0.6.14 branch_pr release candidate from the approved patch plan. Scope: version bump, release candidate commit/PR, release gate evidence. Out of scope: npm publish, tag push, GitHub release publication.
- Out of scope: unrelated refactors not required for "Prepare v0.6.14 release candidate".

## Plan

Release candidate plan: version=0.6.14, tag=v0.6.14, plan=.agentplane/.release/plan/2026-06-01T10-05-51-604Z. Run ap release candidate from dedicated branch_pr worktree with --push --yes. Verify release:tasks:check, release:parity, release:check, release:state, release:next-action, and GitHub PR checks. Do not publish npm packages or push release tag in this task.

## Verify Steps

1. ap release candidate --plan .agentplane/.release/plan/2026-06-01T10-07-08-939Z --push --yes
2. bun run release:prepublish:fast
3. bun run release:ci-check
4. bun run release:tasks:check
5. bun run release:parity
6. bun run release:check
7. bun run release:state
8. bun run release:next-action
9. gh pr checks <release-pr> --watch=false
10. git status --short --untracked-files=all

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Close the release candidate PR without merge or revert the release candidate branch. Do not publish npm packages or tags from this task.

## Findings
