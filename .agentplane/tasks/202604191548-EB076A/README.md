---
id: "202604191548-EB076A"
title: "Inline task and release helpers into @agentplane/testkit"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "testkit"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-19T15:48:48.471Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-19T15:56:44.122Z"
  updated_by: "CODER"
  note: "Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0 after inlining task and release helper implementations. Scope: canonical helper package. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 16 files and 99 tests passed after removing agentplane-local task/release helper files. Scope: task and release helper migration."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inline task and release helper implementations into @agentplane/testkit and remove the superseded local copies from agentplane/src."
events:
  -
    type: "status"
    at: "2026-04-19T15:48:49.225Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inline task and release helper implementations into @agentplane/testkit and remove the superseded local copies from agentplane/src."
  -
    type: "verify"
    at: "2026-04-19T15:56:44.122Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0 after inlining task and release helper implementations. Scope: canonical helper package. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 16 files and 99 tests passed after removing agentplane-local task/release helper files. Scope: task and release helper migration."
doc_version: 3
doc_updated_at: "2026-04-19T15:56:44.135Z"
doc_updated_by: "CODER"
description: "Move the task and release helper implementations out of agentplane/src into packages/testkit/src, then remove the superseded agentplane-local helper files once no direct consumers remain."
sections:
  Summary: |-
    Inline task and release helpers into @agentplane/testkit
    
    Move the task and release helper implementations out of agentplane/src into packages/testkit/src, then remove the superseded agentplane-local helper files once no direct consumers remain.
  Scope: |-
    - In scope: Move the task and release helper implementations out of agentplane/src into packages/testkit/src, then remove the superseded agentplane-local helper files once no direct consumers remain.
    - Out of scope: unrelated refactors not required for "Inline task and release helpers into @agentplane/testkit".
  Plan: |-
    1. Inline the current task and release helper implementations into packages/testkit/src so those helper modules no longer depend on agentplane-local source files.
    2. Remove the superseded agentplane-local task and release helper files once no direct consumers remain.
    3. Verify the affected task and release tests plus testkit typecheck before committing.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-19T15:56:44.122Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0 after inlining task and release helper implementations. Scope: canonical helper package. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 16 files and 99 tests passed after removing agentplane-local task/release helper files. Scope: task and release helper migration.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:48:49.246Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Inline task and release helpers into @agentplane/testkit

Move the task and release helper implementations out of agentplane/src into packages/testkit/src, then remove the superseded agentplane-local helper files once no direct consumers remain.

## Scope

- In scope: Move the task and release helper implementations out of agentplane/src into packages/testkit/src, then remove the superseded agentplane-local helper files once no direct consumers remain.
- Out of scope: unrelated refactors not required for "Inline task and release helpers into @agentplane/testkit".

## Plan

1. Inline the current task and release helper implementations into packages/testkit/src so those helper modules no longer depend on agentplane-local source files.
2. Remove the superseded agentplane-local task and release helper files once no direct consumers remain.
3. Verify the affected task and release tests plus testkit typecheck before committing.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-19T15:56:44.122Z — VERIFY — ok

By: CODER

Note: Command: bun run --filter=@agentplane/testkit typecheck; Result: pass; Evidence: @agentplane/testkit typecheck exited with code 0 after inlining task and release helper implementations. Scope: canonical helper package. Command: bunx vitest run packages/agentplane/src/commands/shared/task-mutation.test.ts packages/agentplane/src/commands/task/close-shared.unit.test.ts packages/agentplane/src/commands/task/comment.unit.test.ts packages/agentplane/src/commands/task/doc.unit.test.ts packages/agentplane/src/commands/task/mutation-parity.unit.test.ts packages/agentplane/src/commands/task/plan.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/update.unit.test.ts packages/agentplane/src/commands/task/verify-record.unit.test.ts packages/agentplane/src/commands/task/workflow-transition-service.unit.test.ts packages/agentplane/src/commands/release/apply.test.ts packages/agentplane/src/commands/release/check-release-version-script.test.ts packages/agentplane/src/commands/release/local-release-e2e-script.test.ts packages/agentplane/src/commands/release/plan.test.ts packages/agentplane/src/commands/release/write-release-ready-manifest-script.test.ts; Result: pass; Evidence: 16 files and 99 tests passed after removing agentplane-local task/release helper files. Scope: task and release helper migration.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-19T15:48:49.246Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
