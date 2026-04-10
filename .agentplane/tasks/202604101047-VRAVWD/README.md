---
id: "202604101047-VRAVWD"
title: "Fix protected-main release flow and PR artifact self-drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-10T10:48:18.665Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-10T14:10:47.149Z"
  updated_by: "CODER"
  note: "Verified pr open diffstat rendering, remote-link stability, and protected-main local release apply."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing two release-surface defects in one pass: generated pr/* artifact self-drift after commit/open and the direct-push-only release apply path that does not fit protected-main publication."
events:
  -
    type: "status"
    at: "2026-04-10T10:49:00.904Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing two release-surface defects in one pass: generated pr/* artifact self-drift after commit/open and the direct-push-only release apply path that does not fit protected-main publication."
  -
    type: "verify"
    at: "2026-04-10T11:00:11.343Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun x tsc --noEmit -p packages/agentplane/tsconfig.json"
  -
    type: "verify"
    at: "2026-04-10T14:10:47.149Z"
    author: "CODER"
    state: "ok"
    note: "Verified pr open diffstat rendering, remote-link stability, and protected-main local release apply."
doc_version: 3
doc_updated_at: "2026-04-10T14:10:47.151Z"
doc_updated_by: "CODER"
description: "Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics."
sections:
  Summary: |-
    Fix protected-main release flow and PR artifact self-drift
    
    Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.
  Scope: |-
    - In scope: Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.
    - Out of scope: unrelated refactors not required for "Fix protected-main release flow and PR artifact self-drift".
  Plan: "Fix plan: (1) stop generated pr/* projections from self-mutating after task commit and PR publication so branch_pr worktrees can stay clean, (2) make release publication support protected-main repositories without requiring direct release apply pushes into main, (3) validate with targeted CLI tests plus release/PR artifact smoke flows in a task worktree."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-10T11:00:11.343Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun x tsc --noEmit -p packages/agentplane/tsconfig.json
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T10:49:00.916Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    ### 2026-04-10T14:10:47.149Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified pr open diffstat rendering, remote-link stability, and protected-main local release apply.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T11:00:11.347Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix protected-main release flow and PR artifact self-drift

Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.

## Scope

- In scope: Eliminate branch_pr pr/* self-drift after commit/open/update and make the release publish path compatible with protected-main repositories without requiring direct push semantics.
- Out of scope: unrelated refactors not required for "Fix protected-main release flow and PR artifact self-drift".

## Plan

Fix plan: (1) stop generated pr/* projections from self-mutating after task commit and PR publication so branch_pr worktrees can stay clean, (2) make release publication support protected-main repositories without requiring direct release apply pushes into main, (3) validate with targeted CLI tests plus release/PR artifact smoke flows in a task worktree.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-10T11:00:11.343Z — VERIFY — ok

By: CODER

Note: Verified: bun x vitest run packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/guard/impl/commands.unit.test.ts packages/agentplane/src/commands/release/publish-workflow-contract.test.ts; bun x tsc --noEmit -p packages/agentplane/tsconfig.json

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T10:49:00.916Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-04-10T14:10:47.149Z — VERIFY — ok

By: CODER

Note: Verified pr open diffstat rendering, remote-link stability, and protected-main local release apply.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-10T11:00:11.347Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
