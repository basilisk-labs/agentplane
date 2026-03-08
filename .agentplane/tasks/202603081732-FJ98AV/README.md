---
id: "202603081732-FJ98AV"
title: "Apply and publish release v0.3.4"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202603081731-DYC4GW"
  - "202603081732-301XC8"
  - "202603081732-XM882Y"
tags:
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T18:06:28.492Z"
  updated_by: "ORCHESTRATOR"
  note: "Release execution approved after install-first fixes and release notes landed on main."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: running the 0.3.4 release path from clean main, beginning with release:prepublish before release apply and publication checks."
events:
  -
    type: "status"
    at: "2026-03-08T18:06:31.892Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: running the 0.3.4 release path from clean main, beginning with release:prepublish before release apply and publication checks."
doc_version: 3
doc_updated_at: "2026-03-08T18:06:31.892Z"
doc_updated_by: "CODER"
description: "Run the 0.3.4 release flow after the install-first runtime fixes and release notes land, then publish the patch release and close the release evidence path."
id_source: "generated"
---
## Summary

Apply and publish release v0.3.4

Run the 0.3.4 release flow after the install-first runtime fixes and release notes land, then publish the patch release and close the release evidence path.

## Scope

- In scope: Run the 0.3.4 release flow after the install-first runtime fixes and release notes land, then publish the patch release and close the release evidence path.
- Out of scope: unrelated refactors not required for "Apply and publish release v0.3.4".

## Plan

1. Re-run release preflight and confirm the v0.3.4 notes plus install-first stabilization changes are release-ready on a clean main branch.
2. Execute `agentplane release apply --push --yes` to bump versions, tag v0.3.4, and publish the release artifacts.
3. Verify npm, GitHub Release, and repository state, then close the release task with the released commit hash.

## Verify Steps

1. Run `bun run release:prepublish`. Expected: release preflight passes on a clean tree before any version mutation.
2. Run `agentplane release apply --push --yes`. Expected: the release commit, tag, and remote publication flow complete without manual repository surgery.
3. Confirm npm, GitHub Release, and `agentplane task list` reflect a published v0.3.4 state. Expected: the release artifacts are visible and the repository returns to a clean tracked state after task closure.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
