---
id: "202604300726-7FFNYW"
title: "Verify patch release readiness after prompt fragmentation"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604300725-T0M8X3"
tags:
  - "code"
  - "release"
  - "testing"
verify:
  - "agentplane doctor"
  - "bun run agents:check"
  - "bun run docs:cli:check"
  - "bun run docs:recipes:check"
  - "bun run format:check"
  - "bun run framework:dev:bootstrap"
  - "bun run policy:routing:check"
  - "bun run release:check"
  - "bun run release:parity"
  - "bun run schemas:check"
  - "bun run task-state:check"
  - "bun run test:release:critical"
  - "bun run typecheck"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-30T07:27:18.579Z"
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
doc_updated_at: "2026-04-30T07:27:14.171Z"
doc_updated_by: "ORCHESTRATOR"
description: "Run and record the release-readiness gate after parity, formatting, fragment correctness, and release-smoke blockers are fixed. This task should not introduce feature changes; it records whether the checkout is ready for the next patch-release task."
sections:
  Summary: |-
    Verify patch release readiness after prompt fragmentation
    
    Run and record the release-readiness gate after parity, formatting, fragment correctness, and release-smoke blockers are fixed. This task should not introduce feature changes; it records whether the checkout is ready for the next patch-release task.
  Scope: |-
    - In scope: Run and record the release-readiness gate after parity, formatting, fragment correctness, and release-smoke blockers are fixed. This task should not introduce feature changes; it records whether the checkout is ready for the next patch-release task.
    - Out of scope: unrelated refactors not required for "Verify patch release readiness after prompt fragmentation".
  Plan: |-
    1. Start only after the blocker tasks have landed on main.
    2. Run the explicit release-readiness command list recorded in Verify Steps.
    3. Record pass/fail evidence and identify any remaining blocker without making feature changes.
    4. If all checks pass, mark the checkout ready for a separate patch-release publication task.
    5. Publish through branch_pr only if task artifacts need to be recorded beyond local evidence; otherwise close with recorded verification evidence.
  Verify Steps: |-
    1. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run release:parity`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Run `bun run policy:routing:check`. Expected: it succeeds and confirms the requested outcome for this task.
    6. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
    7. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    8. Run `bun run task-state:check`. Expected: it succeeds and confirms the requested outcome for this task.
    9. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    10. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
    11. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    12. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
    13. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
    14. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
    15. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    16. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Verify patch release readiness after prompt fragmentation

Run and record the release-readiness gate after parity, formatting, fragment correctness, and release-smoke blockers are fixed. This task should not introduce feature changes; it records whether the checkout is ready for the next patch-release task.

## Scope

- In scope: Run and record the release-readiness gate after parity, formatting, fragment correctness, and release-smoke blockers are fixed. This task should not introduce feature changes; it records whether the checkout is ready for the next patch-release task.
- Out of scope: unrelated refactors not required for "Verify patch release readiness after prompt fragmentation".

## Plan

1. Start only after the blocker tasks have landed on main.
2. Run the explicit release-readiness command list recorded in Verify Steps.
3. Record pass/fail evidence and identify any remaining blocker without making feature changes.
4. If all checks pass, mark the checkout ready for a separate patch-release publication task.
5. Publish through branch_pr only if task artifacts need to be recorded beyond local evidence; otherwise close with recorded verification evidence.

## Verify Steps

1. Run `bun run release:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run release:parity`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
5. Run `bun run policy:routing:check`. Expected: it succeeds and confirms the requested outcome for this task.
6. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
7. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
8. Run `bun run task-state:check`. Expected: it succeeds and confirms the requested outcome for this task.
9. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
10. Run `bun run test:release:critical`. Expected: it succeeds and confirms the requested outcome for this task.
11. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
12. Run `git diff --check`. Expected: it succeeds and confirms the requested outcome for this task.
13. Run `bun run framework:dev:bootstrap`. Expected: it succeeds and confirms the requested outcome for this task.
14. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
15. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
16. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
