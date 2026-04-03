---
id: "202604030442-C0JQDY"
title: "F-006 Introduce approval runtime"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604030442-C3HR7C"
tags:
  - "code"
  - "framework"
  - "approvals"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:03.898Z"
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
doc_updated_at: "2026-04-03T04:42:03.655Z"
doc_updated_by: "PLANNER"
description: "Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations."
sections:
  Summary: |-
    F-006 Introduce approval runtime
    
    Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations.
  Scope: |-
    - In scope: Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations.
    - Out of scope: unrelated refactors not required for "F-006 Introduce approval runtime".
  Plan: |-
    1. Define centralized approval request, decision, and evidence contracts.
    2. Connect policy taxonomy and execution context so risky operations go through one approval runtime.
    3. Lock gateway behavior with focused tests for network, filesystem, git, and config mutations.
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

F-006 Introduce approval runtime

Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations.

## Scope

- In scope: Make approvals a first-class runtime gateway for network, filesystem, git, and config mutations.
- Out of scope: unrelated refactors not required for "F-006 Introduce approval runtime".

## Plan

1. Define centralized approval request, decision, and evidence contracts.
2. Connect policy taxonomy and execution context so risky operations go through one approval runtime.
3. Lock gateway behavior with focused tests for network, filesystem, git, and config mutations.

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
