---
id: "202604062101-XYXG7Y"
title: "Retry hosted merge sync gh fallback on transient transport errors"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T21:02:48.599Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T21:06:56.715Z"
  updated_by: "CODER"
  note: "Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed."
commit: null
comments: []
events:
  -
    type: "verify"
    at: "2026-04-06T21:06:56.715Z"
    author: "CODER"
    state: "ok"
    note: "Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed."
doc_version: 3
doc_updated_at: "2026-04-06T21:06:56.719Z"
doc_updated_by: "CODER"
description: "Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops."
sections:
  Summary: |-
    Retry hosted merge sync gh fallback on transient transport errors
    
    Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.
  Scope: |-
    - In scope: Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.
    - Out of scope: unrelated refactors not required for "Retry hosted merge sync gh fallback on transient transport errors".
  Plan: "1. Isolate the gh fallback used by hosted merge sync and identify transient transport failures worth retrying. 2. Add bounded retry/backoff around transient EOF/TLS failures without masking permanent auth/usage errors. 3. Verify with focused unit/command tests."
  Verify Steps: |-
    - Run focused vitest coverage for hosted merge sync fallback retry behavior.
    - Run eslint on the touched hosted-merge-sync source/tests.
    - Confirm permanent auth/usage failures still surface immediately while transient EOF/TLS failures retry within bounded limits.
  Verification: |-
    - Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: 6 tests passed; transient EOF retry path succeeded after a delayed gh lookup; permanent auth failure stayed immediate.
      Scope: hosted merge sync fallback retry behavior.
    - Command: bunx eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
      Result: pass
      Evidence: no lint errors.
      Scope: hosted merge sync source and tests.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T21:06:56.715Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:06:49.469Z, excerpt_hash=sha256:e62571ef15b172b204b7c11f0228c801c9eb650da29d4484a41a8ede1be397e3
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - The gh fallback path in hosted merge sync must stay narrow: retry transient transport failures only, and keep auth/usage failures immediate.
    - Fresh task worktrees may still need bun run framework:dev:bootstrap before targeted tests can resolve the repo-local runtime.
id_source: "generated"
---
## Summary

Retry hosted merge sync gh fallback on transient transport errors

Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.

## Scope

- In scope: Harden the gh-based hosted merge sync fallback by retrying transient EOF/TLS failures so reconcile paths survive flaky GitHub transport without manual loops.
- Out of scope: unrelated refactors not required for "Retry hosted merge sync gh fallback on transient transport errors".

## Plan

1. Isolate the gh fallback used by hosted merge sync and identify transient transport failures worth retrying. 2. Add bounded retry/backoff around transient EOF/TLS failures without masking permanent auth/usage errors. 3. Verify with focused unit/command tests.

## Verify Steps

- Run focused vitest coverage for hosted merge sync fallback retry behavior.
- Run eslint on the touched hosted-merge-sync source/tests.
- Confirm permanent auth/usage failures still surface immediately while transient EOF/TLS failures retry within bounded limits.

## Verification

- Command: bunx vitest run packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
  Result: pass
  Evidence: 6 tests passed; transient EOF retry path succeeded after a delayed gh lookup; permanent auth failure stayed immediate.
  Scope: hosted merge sync fallback retry behavior.
- Command: bunx eslint packages/agentplane/src/commands/task/hosted-merge-sync.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts
  Result: pass
  Evidence: no lint errors.
  Scope: hosted merge sync source and tests.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T21:06:56.715Z — VERIFY — ok

By: CODER

Note: Verified: hosted merge sync now retries transient gh transport failures while preserving immediate auth/usage failures; focused vitest and eslint passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T21:06:49.469Z, excerpt_hash=sha256:e62571ef15b172b204b7c11f0228c801c9eb650da29d4484a41a8ede1be397e3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The gh fallback path in hosted merge sync must stay narrow: retry transient transport failures only, and keep auth/usage failures immediate.
- Fresh task worktrees may still need ==> Framework repo: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry
==> Bootstrap install layout already present; skipping bun install
==> Recipes submodule already available in common repo root; skipping local git submodule update: /Users/densmirnov/Github/agentplane
==> Building @agentplaneorg/core
@agentplaneorg/core build: Exited with code 0
==> Building agentplane
agentplane build: Exited with code 0
==> Verifying repo-local runtime
Mode: repo-local (repo-local framework binary)
Active binary: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry/packages/agentplane/bin/agentplane.js
Current cwd: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry
Framework checkout: yes
Framework repo root: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry
Framework agentplane root: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry/packages/agentplane
Framework core root: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry/packages/core
Resolved agentplane: 0.3.10 @ /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202604062101-XYXG7Y-hosted-merge-retry/packages/agentplane
Resolved @agentplaneorg/core: 0.3.10 @ /Users/densmirnov/Github/agentplane/packages/core
Repository expected agentplane CLI: 0.3.10
Repository CLI status: Active runtime 0.3.10 matches the repository expectation 0.3.10.

Framework dev workflow:
1. Canonical bootstrap:
   - bun run framework:dev:bootstrap
2. Manual fallback:
   - bun install
   - git submodule update --init --recursive agentplane-recipes
   - bun run --filter=@agentplaneorg/core build
   - bun run --filter=agentplane build
3. Verify the repo-local runtime directly:
   - node packages/agentplane/bin/agentplane.js runtime explain
4. If the global PATH install should resolve this checkout:
   - scripts/reinstall-global-agentplane.sh
5. Re-verify the global wrapper:
   - agentplane runtime explain
6. Optional: force the global installed CLI inside this checkout:
   - AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane <command>
Recommendation: Run the framework bootstrap after fresh clones or dependency drift; use the reinstall helper only when the global PATH command itself should resolve this checkout.

Framework dev runtime is ready.
Repo-local verify: node packages/agentplane/bin/agentplane.js runtime explain
Global verify: agentplane runtime explain
If PATH should resolve this checkout: scripts/reinstall-global-agentplane.sh
Optional force-global override: AGENTPLANE_USE_GLOBAL_IN_FRAMEWORK=1 agentplane <command> before targeted tests can resolve the repo-local runtime.
