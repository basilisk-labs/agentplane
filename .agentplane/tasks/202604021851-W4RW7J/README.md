---
id: "202604021851-W4RW7J"
title: "Unify branch_pr PR artifact sync and render model"
result_summary: "integrate: squash task/202604021851-W4RW7J/pr-sync-core"
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
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-02T18:53:36.434Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from user audit implementation request on 2026-04-03."
verification:
  state: "ok"
  updated_at: "2026-04-02T19:06:49.078Z"
  updated_by: "CODER"
  note: |-
    Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
    Result: pass
    Evidence: no TypeScript errors after introducing the shared PR sync path and metadata timestamp stabilization.
    Scope: packages/agentplane/src/commands/pr/**, shared PR metadata, and touched PR-flow tests.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 44 tests passed; the new pr update idempotence regression passed and existing integrate/PR-flow coverage stayed green.
    Scope: branch_pr PR artifact open/update and integrate regression surface.
commit:
  hash: "67788a1a22d9f0784dead6d0dc775ab13efff7a0"
  message: "📝 W4RW7J workflow: refresh PR artifact render"
comments:
  -
    author: "CODER"
    body: "Start: replace split branch_pr PR artifact writes with one deterministic sync/render path and keep the first implementation package tightly scoped."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604021851-W4RW7J/pr."
events:
  -
    type: "status"
    at: "2026-04-02T18:55:12.370Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replace split branch_pr PR artifact writes with one deterministic sync/render path and keep the first implementation package tightly scoped."
  -
    type: "verify"
    at: "2026-04-02T19:06:49.078Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
      Result: pass
      Evidence: no TypeScript errors after introducing the shared PR sync path and metadata timestamp stabilization.
      Scope: packages/agentplane/src/commands/pr/**, shared PR metadata, and touched PR-flow tests.
      
      Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
      Result: pass
      Evidence: 44 tests passed; the new pr update idempotence regression passed and existing integrate/PR-flow coverage stayed green.
      Scope: branch_pr PR artifact open/update and integrate regression surface.
  -
    type: "status"
    at: "2026-04-02T19:11:14.389Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604021851-W4RW7J/pr."
doc_version: 3
doc_updated_at: "2026-04-02T19:11:14.394Z"
doc_updated_by: "INTEGRATOR"
description: "Create one idempotent sync/render center for branch_pr PR artifacts so review.md, diffstat, and meta updates stop living in separate commands and can drive both local and GitHub-facing output without duplicated logic."
sections:
  Summary: |-
    Unify branch_pr PR artifact sync and render model
    
    Create one idempotent sync/render center for branch_pr PR artifacts so review.md, diffstat, and meta updates stop living in separate commands and can drive both local and GitHub-facing output without duplicated logic.
  Scope: |-
    - In scope: Create one idempotent sync/render center for branch_pr PR artifacts so review.md, diffstat, and meta updates stop living in separate commands and can drive both local and GitHub-facing output without duplicated logic.
    - Out of scope: unrelated refactors not required for "Unify branch_pr PR artifact sync and render model".
  Plan: |-
    1. Extract shared branch_pr PR artifact state gathering and deterministic render helpers.
    2. Replace per-command diffstat/review/meta write logic with one idempotent sync entrypoint.
    3. Lock behavior with targeted PR-flow tests and confirm repeated sync is no-op.
  Verify Steps: |-
    1. Run branch_pr PR artifact creation and refresh through the shared sync path. Expected: meta, diffstat, and review outputs are produced from one entrypoint with no per-command bespoke render logic left in touched scope.
    2. Re-run the same sync without repository changes. Expected: artifacts are byte-stable and no follow-up write is needed.
    3. Run targeted PR-flow regressions for touched commands. Expected: updated tests pass and cover the new shared path.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-02T19:06:49.078Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
    Result: pass
    Evidence: no TypeScript errors after introducing the shared PR sync path and metadata timestamp stabilization.
    Scope: packages/agentplane/src/commands/pr/**, shared PR metadata, and touched PR-flow tests.
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
    Result: pass
    Evidence: 44 tests passed; the new pr update idempotence regression passed and existing integrate/PR-flow coverage stayed green.
    Scope: branch_pr PR artifact open/update and integrate regression surface.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T18:55:12.396Z, excerpt_hash=sha256:02e0a987378f3f31b1ad59a57a1e0dfc4283673351272b547cb5313f33391d71
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Unify branch_pr PR artifact sync and render model

Create one idempotent sync/render center for branch_pr PR artifacts so review.md, diffstat, and meta updates stop living in separate commands and can drive both local and GitHub-facing output without duplicated logic.

## Scope

- In scope: Create one idempotent sync/render center for branch_pr PR artifacts so review.md, diffstat, and meta updates stop living in separate commands and can drive both local and GitHub-facing output without duplicated logic.
- Out of scope: unrelated refactors not required for "Unify branch_pr PR artifact sync and render model".

## Plan

1. Extract shared branch_pr PR artifact state gathering and deterministic render helpers.
2. Replace per-command diffstat/review/meta write logic with one idempotent sync entrypoint.
3. Lock behavior with targeted PR-flow tests and confirm repeated sync is no-op.

## Verify Steps

1. Run branch_pr PR artifact creation and refresh through the shared sync path. Expected: meta, diffstat, and review outputs are produced from one entrypoint with no per-command bespoke render logic left in touched scope.
2. Re-run the same sync without repository changes. Expected: artifacts are byte-stable and no follow-up write is needed.
3. Run targeted PR-flow regressions for touched commands. Expected: updated tests pass and cover the new shared path.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-02T19:06:49.078Z — VERIFY — ok

By: CODER

Note: Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
Result: pass
Evidence: no TypeScript errors after introducing the shared PR sync path and metadata timestamp stabilization.
Scope: packages/agentplane/src/commands/pr/**, shared PR metadata, and touched PR-flow tests.

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.pr-flow.pr.test.ts packages/agentplane/src/cli/run-cli.core.pr-flow.integrate.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 44 tests passed; the new pr update idempotence regression passed and existing integrate/PR-flow coverage stayed green.
Scope: branch_pr PR artifact open/update and integrate regression surface.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-02T18:55:12.396Z, excerpt_hash=sha256:02e0a987378f3f31b1ad59a57a1e0dfc4283673351272b547cb5313f33391d71

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
