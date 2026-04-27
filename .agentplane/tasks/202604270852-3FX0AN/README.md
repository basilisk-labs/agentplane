---
id: "202604270852-3FX0AN"
title: "Type branch_pr PR artifact state"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-27T08:56:20.653Z"
doc_updated_by: "PLANNER"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
