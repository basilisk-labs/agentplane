---
id: "202604061819-GW8SC5"
title: "Fix framework bootstrap package-local install layout reuse"
result_summary: "integrate: squash task/202604061819-GW8SC5/bootstrap-package-layout-reuse"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-04-06T18:25:02.584Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: bootstrap now restores package-local install layout, targeted tests passed 6/6, eslint passed, and a fresh blocker worktree built core+agentplane and completed runtime explain. Scope: scripts/bootstrap-framework-dev.mjs, packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts, blocker task README."
commit:
  hash: "978357df7e928b162d2bc9f01f22a79de4756256"
  message: "🧩 GW8SC5 integrate: Fix framework bootstrap package-local install layout reuse"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604061819-GW8SC5/pr."
events:
  -
    type: "verify"
    at: "2026-04-06T18:25:02.584Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: bootstrap now restores package-local install layout, targeted tests passed 6/6, eslint passed, and a fresh blocker worktree built core+agentplane and completed runtime explain. Scope: scripts/bootstrap-framework-dev.mjs, packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts, blocker task README."
  -
    type: "status"
    at: "2026-04-06T18:52:58.983Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604061819-GW8SC5/pr."
doc_version: 3
doc_updated_at: "2026-04-06T18:52:58.987Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-04-06T18:25:02.584Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: bootstrap now restores package-local install layout, targeted tests passed 6/6, eslint passed, and a fresh blocker worktree built core+agentplane and completed runtime explain. Scope: scripts/bootstrap-framework-dev.mjs, packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts, blocker task README.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:23:42.138Z, excerpt_hash=sha256:fca03506d02a5d631bfe07e29b8aa381b42558d28b60d2e9b2dd4971d157d341
    
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
### 2026-04-06T18:25:02.584Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts; bun run framework:dev:bootstrap. Result: pass. Evidence: bootstrap now restores package-local install layout, targeted tests passed 6/6, eslint passed, and a fresh blocker worktree built core+agentplane and completed runtime explain. Scope: scripts/bootstrap-framework-dev.mjs, packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts, blocker task README.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T18:23:42.138Z, excerpt_hash=sha256:fca03506d02a5d631bfe07e29b8aa381b42558d28b60d2e9b2dd4971d157d341

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: fresh worktrees reused the common-root top-level node_modules, but bootstrap did not restore package-local install links under packages/core/node_modules and packages/agentplane/node_modules.
- Impact: bun run framework:dev:bootstrap still failed on @agentplaneorg/core build in a fresh worktree even after the previous shared-node_modules optimization.
- Fix: bootstrap now restores the build-critical install layout from the common repo root and falls back to bun install only when that layout is still incomplete.
