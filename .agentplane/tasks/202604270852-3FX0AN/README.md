---
id: "202604270852-3FX0AN"
title: "Type branch_pr PR artifact state"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604270852-PR9VMK"
tags:
  - "branch-pr"
  - "code"
  - "workflow"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/pr/internal packages/agentplane/src/commands/pr-flow*"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:24.623Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-28T05:09:15.133Z"
  updated_by: "CODER"
  note: "Typed branch_pr PR artifact state model implemented and validated with focused PR flow tests, schema check, typecheck, and diff check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement typed branch_pr PR artifact state on a dedicated task worktree and verify with focused PR artifact tests plus typecheck."
events:
  -
    type: "status"
    at: "2026-04-28T05:02:02.592Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement typed branch_pr PR artifact state on a dedicated task worktree and verify with focused PR artifact tests plus typecheck."
  -
    type: "verify"
    at: "2026-04-28T05:09:15.133Z"
    author: "CODER"
    state: "ok"
    note: "Typed branch_pr PR artifact state model implemented and validated with focused PR flow tests, schema check, typecheck, and diff check."
doc_version: 3
doc_updated_at: "2026-04-28T05:09:15.138Z"
doc_updated_by: "CODER"
description: "Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths."
sections:
  Summary: |-
    Type branch_pr PR artifact state
    
    Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths.
  Scope: |-
    - In scope: Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths.
    - Out of scope: unrelated refactors not required for "Type branch_pr PR artifact state".
  Plan: "1. Inventory current pr/meta.json readers and writers. 2. Define a typed PR artifact state model and parser/renderer around existing persisted fields. 3. Migrate lifecycle-critical code paths away from loose Record-shaped access where safe. 4. Add compatibility tests for existing artifacts and new explicit states. 5. Verify focused PR artifact and typecheck coverage."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/pr/internal packages/agentplane/src/commands/pr-flow*`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-28T05:09:15.133Z — VERIFY — ok
    
    By: CODER
    
    Note: Typed branch_pr PR artifact state model implemented and validated with focused PR flow tests, schema check, typecheck, and diff check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T05:09:11.714Z, excerpt_hash=sha256:c102605c175f7ddf77fa97b60460bc020ff4bd52914b03d428077d5b1f3e9456
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    Verification evidence:
    - Implemented explicit typed PR artifact lifecycle helpers for open, merged, handoff, remote_staged, and remote_failed states.
    - Added schema-backed artifact_state fields to pr/meta.json and synced rendered schemas.
    - Preserved existing pr open idempotency by deriving ordinary open state without forcing a persisted timestamp churn.
    - Checks passed: bun test packages/agentplane/src/commands/pr/internal packages/agentplane/src/commands/pr-flow*; focused PR flow suite covering packages/agentplane/src/commands/pr/internal, shared/pr-meta.test.ts, and run-cli.core.pr-flow*.test.ts; bun run schemas:check; bun run typecheck; git diff --check.
id_source: "generated"
---
## Summary

Type branch_pr PR artifact state

Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths.

## Scope

- In scope: Define and validate a typed PR artifact state model for branch_pr meta artifacts, covering open, merged, handoff, staged remote, and remote failure states without Record<string, unknown> drift on lifecycle-critical paths.
- Out of scope: unrelated refactors not required for "Type branch_pr PR artifact state".

## Plan

1. Inventory current pr/meta.json readers and writers. 2. Define a typed PR artifact state model and parser/renderer around existing persisted fields. 3. Migrate lifecycle-critical code paths away from loose Record-shaped access where safe. 4. Add compatibility tests for existing artifacts and new explicit states. 5. Verify focused PR artifact and typecheck coverage.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/pr/internal packages/agentplane/src/commands/pr-flow*`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-28T05:09:15.133Z — VERIFY — ok

By: CODER

Note: Typed branch_pr PR artifact state model implemented and validated with focused PR flow tests, schema check, typecheck, and diff check.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-28T05:09:11.714Z, excerpt_hash=sha256:c102605c175f7ddf77fa97b60460bc020ff4bd52914b03d428077d5b1f3e9456

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Verification evidence:
- Implemented explicit typed PR artifact lifecycle helpers for open, merged, handoff, remote_staged, and remote_failed states.
- Added schema-backed artifact_state fields to pr/meta.json and synced rendered schemas.
- Preserved existing pr open idempotency by deriving ordinary open state without forcing a persisted timestamp churn.
- Checks passed: bun test packages/agentplane/src/commands/pr/internal packages/agentplane/src/commands/pr-flow*; focused PR flow suite covering packages/agentplane/src/commands/pr/internal, shared/pr-meta.test.ts, and run-cli.core.pr-flow*.test.ts; bun run schemas:check; bun run typecheck; git diff --check.
