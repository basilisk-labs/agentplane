---
id: "202604030442-C3HR7C"
title: "F-005 Expand policy taxonomy"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030442-Y53F5X"
tags:
  - "code"
  - "framework"
  - "policy"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:03.109Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved from framework roadmap and explicit user execution request"
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-03T04:42:02.869Z"
doc_updated_by: "PLANNER"
description: "Broaden policy action taxonomy so risky and mutating framework actions are classified centrally."
sections:
  Summary: |-
    F-005 Expand policy taxonomy
    
    Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
  Scope: |-
    - In scope: Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
    - Out of scope: unrelated refactors not required for "F-005 Expand policy taxonomy".
  Plan: |-
    1. Extend policy action taxonomy beyond the current commit-hook surface.
    2. Route task, runner, recipe, and framework mutation classes through the shared policy engine.
    3. Add coverage for the new classifications and deny/warn semantics.
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

F-005 Expand policy taxonomy

Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.

## Scope

- In scope: Broaden policy action taxonomy so risky and mutating framework actions are classified centrally.
- Out of scope: unrelated refactors not required for "F-005 Expand policy taxonomy".

## Plan

1. Extend policy action taxonomy beyond the current commit-hook surface.
2. Route task, runner, recipe, and framework mutation classes through the shared policy engine.
3. Add coverage for the new classifications and deny/warn semantics.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
