---
id: "202604131545-S5T1VV"
title: "Skip unsafe worktrees in post-merge cleanup"
result_summary: "Merged via PR #284."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T15:45:50.297Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-13T15:48:44.379Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts. Result: pass. Evidence: automated post-merge cleanup now skips unsafe outside-root/current worktrees, still prunes safe merged task tails, and manual cleanup merged outside-repo semantics remain strict."
commit:
  hash: "da3c9773871c21ba8bcffbee51339e7b3f0b6ca5"
  message: "workflow: Skip unsafe worktrees in post-merge cleanup (S5T1VV)"
comments:
  -
    author: "CODER"
    body: "Start: make automated post-merge cleanup skip unsafe worktrees instead of warning-aborting the whole prune pass."
events:
  -
    type: "status"
    at: "2026-04-13T15:45:57.577Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: make automated post-merge cleanup skip unsafe worktrees instead of warning-aborting the whole prune pass."
  -
    type: "verify"
    at: "2026-04-13T15:48:44.379Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts. Result: pass. Evidence: automated post-merge cleanup now skips unsafe outside-root/current worktrees, still prunes safe merged task tails, and manual cleanup merged outside-repo semantics remain strict."
  -
    type: "status"
    at: "2026-04-13T15:52:13Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Hosted PR #284 merged on GitHub main; task projection reconciled from hosted PR artifacts."
doc_version: 3
doc_updated_at: "2026-04-13T15:52:13Z"
doc_updated_by: "INTEGRATOR"
description: "Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout."
sections:
  Summary: |-
    Skip unsafe worktrees in post-merge cleanup
    
    Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout.
  Scope: |-
    - In scope: Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout.
    - Out of scope: unrelated refactors not required for "Skip unsafe worktrees in post-merge cleanup".
  Plan: "1. Reproduce the post-merge warning path from a framework checkout where a merged task branch is checked out in an outside-root worktree. 2. Make automated cleanup best-effort for unsafe candidates (outside current repo root or current worktree) while preserving strict manual cleanup semantics. 3. Add regression coverage for the automated hook path and verify that safe merged task tails are still pruned."
  Verify Steps: |-
    1. Review the requested outcome for "Skip unsafe worktrees in post-merge cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-13T15:48:44.379Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts. Result: pass. Evidence: automated post-merge cleanup now skips unsafe outside-root/current worktrees, still prunes safe merged task tails, and manual cleanup merged outside-repo semantics remain strict.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T15:45:57.588Z, excerpt_hash=sha256:8b9a702c453204bb4dd4a8f9762f81711d5d59ff7c4e821b9660e41704826e72
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Skip unsafe worktrees in post-merge cleanup

Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout.

## Scope

- In scope: Make automated post-merge cleanup skip outside-repo/current worktrees instead of warning-aborting, so merged task tails are pruned without trying to remove the user root checkout.
- Out of scope: unrelated refactors not required for "Skip unsafe worktrees in post-merge cleanup".

## Plan

1. Reproduce the post-merge warning path from a framework checkout where a merged task branch is checked out in an outside-root worktree. 2. Make automated cleanup best-effort for unsafe candidates (outside current repo root or current worktree) while preserving strict manual cleanup semantics. 3. Add regression coverage for the automated hook path and verify that safe merged task tails are still pruned.

## Verify Steps

1. Review the requested outcome for "Skip unsafe worktrees in post-merge cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-13T15:48:44.379Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.hooks.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.cleanup-merged.test.ts --hookTimeout 60000 --testTimeout 120000; bunx eslint packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts; bunx prettier --check packages/agentplane/src/commands/branch/cleanup-merged.ts packages/agentplane/src/commands/hooks/index.ts packages/agentplane/src/cli/run-cli.core.hooks.test.ts. Result: pass. Evidence: automated post-merge cleanup now skips unsafe outside-root/current worktrees, still prunes safe merged task tails, and manual cleanup merged outside-repo semantics remain strict.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-13T15:45:57.588Z, excerpt_hash=sha256:8b9a702c453204bb4dd4a8f9762f81711d5d59ff7c4e821b9660e41704826e72

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
