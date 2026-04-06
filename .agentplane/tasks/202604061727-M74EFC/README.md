---
id: "202604061727-M74EFC"
title: "Fix stale repo-local build drift after base sync"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "framework"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T17:28:31.780Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T17:40:28.982Z"
  updated_by: "CODER"
  note: "Post-commit verification synced to current head"
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T17:37:13.762Z"
    author: "CODER"
    state: "ok"
    note: "Bootstrap recovery works in git worktrees"
  -
    type: "verify"
    at: "2026-04-06T17:40:28.982Z"
    author: "CODER"
    state: "ok"
    note: "Post-commit verification synced to current head"
doc_version: 3
doc_updated_at: "2026-04-06T17:40:29.017Z"
doc_updated_by: "CODER"
description: "Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates."
sections:
  Summary: |-
    Fix stale repo-local build drift after base sync
    
    Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates.
  Scope: |-
    - In scope: Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates.
    - Out of scope: unrelated refactors not required for "Fix stale repo-local build drift after base sync".
  Plan: "1. Reproduce the stale-dist warning path after a normal base update and identify which files cause repo-local runtime invalidation. 2. Inspect the framework bootstrap, runtime freshness checks, and worktree/main sync flow to find the smallest place to keep dist/build state coherent after normal base sync. 3. Implement the minimal fix and add or adjust regression coverage so the stale-build drift does not silently return. 4. Run the targeted verification plus framework bootstrap/runtime checks, then publish the task branch and PR."
  Verify Steps: |-
    1. Run `bun run framework:dev:bootstrap` from a synced framework checkout and from a fresh task worktree that shares the same git common root. Expected: bootstrap completes without requiring a network submodule fetch when the common root already has `agentplane-recipes` and reusable workspace dependencies.
    2. Run `agentplane runtime explain` and `agentplane task list` in the bootstrapped worktree. Expected: both commands use the repo-local runtime without stale-build warnings.
    3. Run targeted checks for the touched bootstrap path. Expected: `bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` and `bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T17:37:13.762Z — VERIFY — ok
    
    By: CODER
    
    Note: Bootstrap recovery works in git worktrees
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:36:45.929Z, excerpt_hash=sha256:7e54e328db8ac635b3fe0f0f0b360b1c8b434fa26b657f1ea66a23695cf06d21
    
    Details:
    
    Checks run:
    - bun run framework:dev:bootstrap
    - agentplane runtime explain
    - agentplane task list | tail -n 5
    - bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    - bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    
    Observed behavior:
    - bootstrap reused common-root recipes instead of running a network submodule fetch in the fresh task worktree
    - repo-local runtime commands executed without stale-build warnings after bootstrap
    
    ### 2026-04-06T17:40:28.982Z — VERIFY — ok
    
    By: CODER
    
    Note: Post-commit verification synced to current head
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:37:13.780Z, excerpt_hash=sha256:7e54e328db8ac635b3fe0f0f0b360b1c8b434fa26b657f1ea66a23695cf06d21
    
    Details:
    
    Checks run on current HEAD:
    - agentplane runtime explain
    - agentplane task list | tail -n 5
    - bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    - bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
    
    Observed behavior:
    - repo-local runtime remains healthy after the code commit
    - targeted bootstrap regression coverage passes on the current branch head
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Fact: after base sync, stale-dist detection was behaving as designed, but the documented recovery path degraded in fresh task worktrees because bootstrap expected local `agentplane-recipes` and local `node_modules`.
    - Fact: `bun run framework:dev:bootstrap` in a fresh worktree attempted `git submodule update --init --recursive agentplane-recipes` and failed on network/TLS even though the shared repo root already had a valid recipes checkout.
    - Fix: bootstrap now reuses `node_modules` from the git common root when the worktree lacks local dependencies, and it treats `agentplane-recipes/index.json` in the common root as sufficient to skip local submodule initialization.
    - Risk: the fix relies on git-worktree common-root semantics; non-git synthetic checkouts still fall back to the previous local install/init behavior.
id_source: "generated"
---
## Summary

Fix stale repo-local build drift after base sync

Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates.

## Scope

- In scope: Investigate why a framework checkout becomes stale immediately after syncing main, run the required bootstrap, and implement the smallest reliable fix so repo-local runtime/bootstrap remains usable without repeated manual recovery after normal base updates.
- Out of scope: unrelated refactors not required for "Fix stale repo-local build drift after base sync".

## Plan

1. Reproduce the stale-dist warning path after a normal base update and identify which files cause repo-local runtime invalidation. 2. Inspect the framework bootstrap, runtime freshness checks, and worktree/main sync flow to find the smallest place to keep dist/build state coherent after normal base sync. 3. Implement the minimal fix and add or adjust regression coverage so the stale-build drift does not silently return. 4. Run the targeted verification plus framework bootstrap/runtime checks, then publish the task branch and PR.

## Verify Steps

1. Run `bun run framework:dev:bootstrap` from a synced framework checkout and from a fresh task worktree that shares the same git common root. Expected: bootstrap completes without requiring a network submodule fetch when the common root already has `agentplane-recipes` and reusable workspace dependencies.
2. Run `agentplane runtime explain` and `agentplane task list` in the bootstrapped worktree. Expected: both commands use the repo-local runtime without stale-build warnings.
3. Run targeted checks for the touched bootstrap path. Expected: `bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` and `bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts` pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T17:37:13.762Z — VERIFY — ok

By: CODER

Note: Bootstrap recovery works in git worktrees

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:36:45.929Z, excerpt_hash=sha256:7e54e328db8ac635b3fe0f0f0b360b1c8b434fa26b657f1ea66a23695cf06d21

Details:

Checks run:
- bun run framework:dev:bootstrap
- agentplane runtime explain
- agentplane task list | tail -n 5
- bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
- bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts

Observed behavior:
- bootstrap reused common-root recipes instead of running a network submodule fetch in the fresh task worktree
- repo-local runtime commands executed without stale-build warnings after bootstrap

### 2026-04-06T17:40:28.982Z — VERIFY — ok

By: CODER

Note: Post-commit verification synced to current head

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T17:37:13.780Z, excerpt_hash=sha256:7e54e328db8ac635b3fe0f0f0b360b1c8b434fa26b657f1ea66a23695cf06d21

Details:

Checks run on current HEAD:
- agentplane runtime explain
- agentplane task list | tail -n 5
- bun test packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts
- bun x eslint scripts/bootstrap-framework-dev.mjs packages/agentplane/src/cli/bootstrap-framework-dev-script.test.ts

Observed behavior:
- repo-local runtime remains healthy after the code commit
- targeted bootstrap regression coverage passes on the current branch head

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Fact: after base sync, stale-dist detection was behaving as designed, but the documented recovery path degraded in fresh task worktrees because bootstrap expected local `agentplane-recipes` and local `node_modules`.
- Fact: `bun run framework:dev:bootstrap` in a fresh worktree attempted `git submodule update --init --recursive agentplane-recipes` and failed on network/TLS even though the shared repo root already had a valid recipes checkout.
- Fix: bootstrap now reuses `node_modules` from the git common root when the worktree lacks local dependencies, and it treats `agentplane-recipes/index.json` in the common root as sufficient to skip local submodule initialization.
- Risk: the fix relies on git-worktree common-root semantics; non-git synthetic checkouts still fall back to the previous local install/init behavior.
