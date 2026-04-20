---
id: "202604201048-HR14NY"
title: "Finish core GitClient shared helper migration"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "git"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T10:49:00.432Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-20T10:53:21.731Z"
  updated_by: "CODER"
  note: "Command: find packages/agentplane/src/commands/shared -maxdepth 1 -name 'git*.ts' -print | xargs wc -l -> 143 total. Command: bunx vitest run packages/core/src/git/git-client.test.ts packages/core/src/git/git-utils.test.ts packages/core/src/git/base-branch.test.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts -> 44 passed. Command: bun run typecheck -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: bun run framework:dev:bootstrap -> pass after runtime path changes."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: complete B′.1 by moving remaining shared git helpers into core and leaving compatibility shims in the command layer."
events:
  -
    type: "status"
    at: "2026-04-20T10:49:00.870Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: complete B′.1 by moving remaining shared git helpers into core and leaving compatibility shims in the command layer."
  -
    type: "verify"
    at: "2026-04-20T10:53:21.731Z"
    author: "CODER"
    state: "ok"
    note: "Command: find packages/agentplane/src/commands/shared -maxdepth 1 -name 'git*.ts' -print | xargs wc -l -> 143 total. Command: bunx vitest run packages/core/src/git/git-client.test.ts packages/core/src/git/git-utils.test.ts packages/core/src/git/base-branch.test.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts -> 44 passed. Command: bun run typecheck -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: bun run framework:dev:bootstrap -> pass after runtime path changes."
doc_version: 3
doc_updated_at: "2026-04-20T10:53:21.744Z"
doc_updated_by: "CODER"
description: "Move remaining command-layer git diff/worktree/basic operations into @agentplaneorg/core and reduce commands/shared/git*.ts to thin compatibility/CLI-only helpers."
sections:
  Summary: |-
    Finish core GitClient shared helper migration
    
    Move remaining command-layer git diff/worktree/basic operations into @agentplaneorg/core and reduce commands/shared/git*.ts to thin compatibility/CLI-only helpers.
  Scope: |-
    - In scope: Move remaining command-layer git diff/worktree/basic operations into @agentplaneorg/core and reduce commands/shared/git*.ts to thin compatibility/CLI-only helpers.
    - Out of scope: unrelated refactors not required for "Finish core GitClient shared helper migration".
  Plan: |-
    1. Add core git diff/worktree/basic operation exports for helpers currently owned by commands/shared/git*.
    2. Convert command-layer git-diff and git-worktree to thin re-export shims; trim git-ops to CLI-only init helpers plus core re-exports.
    3. Preserve existing import paths for consumers while reducing commands/shared/git*.ts below 150 LoC.
    4. Run focused git/branch/PR tests plus typecheck or lint gates, commit, verify, and finish.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-20T10:53:21.731Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: find packages/agentplane/src/commands/shared -maxdepth 1 -name 'git*.ts' -print | xargs wc -l -> 143 total. Command: bunx vitest run packages/core/src/git/git-client.test.ts packages/core/src/git/git-utils.test.ts packages/core/src/git/base-branch.test.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts -> 44 passed. Command: bun run typecheck -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: bun run framework:dev:bootstrap -> pass after runtime path changes.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T10:49:00.881Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Finish core GitClient shared helper migration

Move remaining command-layer git diff/worktree/basic operations into @agentplaneorg/core and reduce commands/shared/git*.ts to thin compatibility/CLI-only helpers.

## Scope

- In scope: Move remaining command-layer git diff/worktree/basic operations into @agentplaneorg/core and reduce commands/shared/git*.ts to thin compatibility/CLI-only helpers.
- Out of scope: unrelated refactors not required for "Finish core GitClient shared helper migration".

## Plan

1. Add core git diff/worktree/basic operation exports for helpers currently owned by commands/shared/git*.
2. Convert command-layer git-diff and git-worktree to thin re-export shims; trim git-ops to CLI-only init helpers plus core re-exports.
3. Preserve existing import paths for consumers while reducing commands/shared/git*.ts below 150 LoC.
4. Run focused git/branch/PR tests plus typecheck or lint gates, commit, verify, and finish.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-20T10:53:21.731Z — VERIFY — ok

By: CODER

Note: Command: find packages/agentplane/src/commands/shared -maxdepth 1 -name 'git*.ts' -print | xargs wc -l -> 143 total. Command: bunx vitest run packages/core/src/git/git-client.test.ts packages/core/src/git/git-utils.test.ts packages/core/src/git/base-branch.test.ts packages/agentplane/src/commands/shared/git-context.test.ts packages/agentplane/src/commands/pr/integrate/internal/prepare.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts -> 44 passed. Command: bun run typecheck -> pass. Command: bun run format:check -> pass. Command: bun run lint:core -> pass. Command: bun run framework:dev:bootstrap -> pass after runtime path changes.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-20T10:49:00.881Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
