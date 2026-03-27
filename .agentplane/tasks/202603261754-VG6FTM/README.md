---
id: "202603261754-VG6FTM"
title: "Make branch_pr task branches start from current remote base"
result_summary: "Merged on GitHub main via PR #15 after the stale-base guard landed."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
  - "branch_pr"
  - "git"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-26T17:58:10.670Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-26T18:02:27.951Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 10 tests passed, including the new stale-base rejection case and the existing happy-path work start coverage.
    Scope: branch_pr work-start integration flow.
    
    Command: bunx prettier --check packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts docs/user/branching-and-pr-artifacts.mdx && bunx eslint packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    Result: pass
    Evidence: formatting and lint both passed for the touched code/docs surfaces.
    Scope: touched guard implementation and docs.
commit:
  hash: "ef8bacdbde11a1fee971d4d1eb4932a91092b85c"
  message: "✨ VG6FTM workflow: guard stale base before work start (#15)"
comments:
  -
    author: "CODER"
    body: "Start: add a stale-base guard to branch_pr work start so task branches fail fast when the pinned base branch lags its upstream tracking ref, then cover it with integration tests and update workflow guidance."
  -
    author: "INTEGRATOR"
    body: "Verified: Merged on GitHub main via PR #15 after the stale-base guard landed."
events:
  -
    type: "status"
    at: "2026-03-26T17:59:07.271Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add a stale-base guard to branch_pr work start so task branches fail fast when the pinned base branch lags its upstream tracking ref, then cover it with integration tests and update workflow guidance."
  -
    type: "verify"
    at: "2026-03-26T18:02:27.951Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --testTimeout 60000 --hookTimeout 60000
      Result: pass
      Evidence: 10 tests passed, including the new stale-base rejection case and the existing happy-path work start coverage.
      Scope: branch_pr work-start integration flow.
      
      Command: bunx prettier --check packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts docs/user/branching-and-pr-artifacts.mdx && bunx eslint packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
      Result: pass
      Evidence: formatting and lint both passed for the touched code/docs surfaces.
      Scope: touched guard implementation and docs.
  -
    type: "status"
    at: "2026-03-27T19:07:14.730Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Merged on GitHub main via PR #15 after the stale-base guard landed."
doc_version: 3
doc_updated_at: "2026-03-27T19:07:14.730Z"
doc_updated_by: "INTEGRATOR"
description: "Fix the branch_pr bootstrap flow so task branches and hosted PRs do not inherit stale local main history. The workflow should make the base branch explicit and current before branch/worktree execution, or fail with a precise actionable diagnostic instead of producing DIRTY PRs."
sections:
  Summary: |-
    Make branch_pr task branches start from current remote base
    
    Fix the branch_pr bootstrap flow so task branches and hosted PRs do not inherit stale local main history. The workflow should make the base branch explicit and current before branch/worktree execution, or fail with a precise actionable diagnostic instead of producing DIRTY PRs.
  Scope: |-
    - In scope: Fix the branch_pr bootstrap flow so task branches and hosted PRs do not inherit stale local main history. The workflow should make the base branch explicit and current before branch/worktree execution, or fail with a precise actionable diagnostic instead of producing DIRTY PRs.
    - Out of scope: unrelated refactors not required for "Make branch_pr task branches start from current remote base".
  Plan: |-
    1. Detect whether the current branch_pr base branch is behind its configured upstream tracking ref before worktree/branch creation.
    2. Make work start fail with a precise actionable diagnostic when the base branch is stale, and keep the existing success path unchanged when the base is current or has no upstream.
    3. Add regression coverage for stale-base rejection and document the guard in the branch_pr user flow.
  Verify Steps: |-
    1. Reproduce the stale-base guard in the targeted `work start` integration test. Expected: `branch_pr` work start refuses to create a task branch/worktree when the pinned base branch is behind its upstream tracking ref, and the error explains how to refresh the base.
    2. Re-run the affected `work start` integration coverage after the fix. Expected: stale-base rejection passes and the existing happy-path branch/worktree creation coverage still passes.
    3. Review the updated branch_pr workflow guidance. Expected: it explains that `work start` requires a current base branch and that stale-base failure is intentional to prevent DIRTY hosted PRs.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-26T18:02:27.951Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 10 tests passed, including the new stale-base rejection case and the existing happy-path work start coverage.
    Scope: branch_pr work-start integration flow.
    
    Command: bunx prettier --check packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts docs/user/branching-and-pr-artifacts.mdx && bunx eslint packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
    Result: pass
    Evidence: formatting and lint both passed for the touched code/docs surfaces.
    Scope: touched guard implementation and docs.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T18:02:23.422Z, excerpt_hash=sha256:7d1c7c61403af33ffb433e8092205842683a6fc079817de0d08fb855198367fd
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- The guard relies on the pinned base branch having a configured upstream tracking ref. If the base branch has no upstream, `work start` still proceeds. That is intentional for now because the command does not perform implicit network fetches."
id_source: "generated"
---
## Summary

Make branch_pr task branches start from current remote base

Fix the branch_pr bootstrap flow so task branches and hosted PRs do not inherit stale local main history. The workflow should make the base branch explicit and current before branch/worktree execution, or fail with a precise actionable diagnostic instead of producing DIRTY PRs.

## Scope

- In scope: Fix the branch_pr bootstrap flow so task branches and hosted PRs do not inherit stale local main history. The workflow should make the base branch explicit and current before branch/worktree execution, or fail with a precise actionable diagnostic instead of producing DIRTY PRs.
- Out of scope: unrelated refactors not required for "Make branch_pr task branches start from current remote base".

## Plan

1. Detect whether the current branch_pr base branch is behind its configured upstream tracking ref before worktree/branch creation.
2. Make work start fail with a precise actionable diagnostic when the base branch is stale, and keep the existing success path unchanged when the base is current or has no upstream.
3. Add regression coverage for stale-base rejection and document the guard in the branch_pr user flow.

## Verify Steps

1. Reproduce the stale-base guard in the targeted `work start` integration test. Expected: `branch_pr` work start refuses to create a task branch/worktree when the pinned base branch is behind its upstream tracking ref, and the error explains how to refresh the base.
2. Re-run the affected `work start` integration coverage after the fix. Expected: stale-base rejection passes and the existing happy-path branch/worktree creation coverage still passes.
3. Review the updated branch_pr workflow guidance. Expected: it explains that `work start` requires a current base branch and that stale-base failure is intentional to prevent DIRTY hosted PRs.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-26T18:02:27.951Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 10 tests passed, including the new stale-base rejection case and the existing happy-path work start coverage.
Scope: branch_pr work-start integration flow.

Command: bunx prettier --check packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts docs/user/branching-and-pr-artifacts.mdx && bunx eslint packages/agentplane/src/commands/shared/git-ops.ts packages/agentplane/src/commands/branch/work-start.ts packages/agentplane/src/cli/run-cli.core.pr-flow.test.ts
Result: pass
Evidence: formatting and lint both passed for the touched code/docs surfaces.
Scope: touched guard implementation and docs.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-26T18:02:23.422Z, excerpt_hash=sha256:7d1c7c61403af33ffb433e8092205842683a6fc079817de0d08fb855198367fd

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- The guard relies on the pinned base branch having a configured upstream tracking ref. If the base branch has no upstream, `work start` still proceeds. That is intentional for now because the command does not perform implicit network fetches.
