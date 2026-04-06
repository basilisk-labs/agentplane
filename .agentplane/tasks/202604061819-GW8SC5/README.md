---
id: "202604061819-GW8SC5"
title: "Fix framework bootstrap package-local install layout reuse"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-06T18:23:42.138Z"
doc_updated_by: "CODER"
description: "When framework:dev:bootstrap reuses common-root node_modules in a fresh worktree, also restore package-local node_modules links needed for @agentplaneorg/core and agentplane builds so the bootstrap finishes successfully."
sections:
  Summary: |-
    Fix framework bootstrap package-local install layout reuse
    
    When framework:dev:bootstrap reuses common-root node_modules in a fresh worktree, also restore package-local node_modules links needed for @agentplaneorg/core and agentplane builds so the bootstrap finishes successfully.
  Scope: |-
    - In scope: When framework:dev:bootstrap reuses common-root node_modules in a fresh worktree, also restore package-local node_modules links needed for @agentplaneorg/core and agentplane builds so the bootstrap finishes successfully.
    - Out of scope: unrelated refactors not required for "Fix framework bootstrap package-local install layout reuse".
  Plan: "1. Reproduce why framework:dev:bootstrap still fails in a fresh worktree after common-root node_modules reuse. 2. Update bootstrap so it restores the package-local install layout required for core and agentplane builds when reusing shared dependencies. 3. Add regression coverage for the fresh-worktree install layout case. 4. Verify the script in a real worktree and with targeted tests before resuming the blocked hosted-merge-sync task."
  Verify Steps: |-
    1. Run bootstrap script tests. Expected: fresh-worktree reuse covers package-local install layout and existing bootstrap paths stay green.
    2. Run bun x eslint on the touched bootstrap files. Expected: no new lint violations.
    3. Run bun run framework:dev:bootstrap in the blocker task worktree. Expected: @agentplaneorg/core and agentplane build successfully and agentplane runtime explain works repo-locally.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: fresh worktrees reused the common-root top-level node_modules, but bootstrap did not restore package-local install links under packages/core/node_modules and packages/agentplane/node_modules.
    - Impact: bun run framework:dev:bootstrap still failed on @agentplaneorg/core build in a fresh worktree even after the previous shared-node_modules optimization.
    - Fix: bootstrap now restores the build-critical install layout from the common repo root and falls back to bun install only when that layout is still incomplete.
id_source: "generated"
---
## Summary

Fix framework bootstrap package-local install layout reuse

When framework:dev:bootstrap reuses common-root node_modules in a fresh worktree, also restore package-local node_modules links needed for @agentplaneorg/core and agentplane builds so the bootstrap finishes successfully.

## Scope

- In scope: When framework:dev:bootstrap reuses common-root node_modules in a fresh worktree, also restore package-local node_modules links needed for @agentplaneorg/core and agentplane builds so the bootstrap finishes successfully.
- Out of scope: unrelated refactors not required for "Fix framework bootstrap package-local install layout reuse".

## Plan

1. Reproduce why framework:dev:bootstrap still fails in a fresh worktree after common-root node_modules reuse. 2. Update bootstrap so it restores the package-local install layout required for core and agentplane builds when reusing shared dependencies. 3. Add regression coverage for the fresh-worktree install layout case. 4. Verify the script in a real worktree and with targeted tests before resuming the blocked hosted-merge-sync task.

## Verify Steps

1. Run bootstrap script tests. Expected: fresh-worktree reuse covers package-local install layout and existing bootstrap paths stay green.
2. Run bun x eslint on the touched bootstrap files. Expected: no new lint violations.
3. Run bun run framework:dev:bootstrap in the blocker task worktree. Expected: @agentplaneorg/core and agentplane build successfully and agentplane runtime explain works repo-locally.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: fresh worktrees reused the common-root top-level node_modules, but bootstrap did not restore package-local install links under packages/core/node_modules and packages/agentplane/node_modules.
- Impact: bun run framework:dev:bootstrap still failed on @agentplaneorg/core build in a fresh worktree even after the previous shared-node_modules optimization.
- Fix: bootstrap now restores the build-critical install layout from the common repo root and falls back to bun install only when that layout is still incomplete.
