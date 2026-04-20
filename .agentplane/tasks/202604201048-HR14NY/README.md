---
id: "202604201048-HR14NY"
title: "Finish core GitClient shared helper migration"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-04-20T10:49:00.881Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
