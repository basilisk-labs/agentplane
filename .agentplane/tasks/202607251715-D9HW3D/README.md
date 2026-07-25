---
id: "202607251715-D9HW3D"
title: "Preserve compact incident registry formatting"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "incidents"
  - "reliability"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run agents:check"
  - "bun run format:check"
  - "bun test packages/agentplane/src/runtime/incidents/resolve.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T17:15:18.004Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: approved narrow repair for compact incident registry rendering and regression coverage; it unblocks the verified hosted formatting failure without altering the active incident content manually."
events:
  -
    type: "status"
    at: "2026-07-25T17:15:18.391Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: approved narrow repair for compact incident registry rendering and regression coverage; it unblocks the verified hosted formatting failure without altering the active incident content manually."
doc_version: 3
doc_updated_at: "2026-07-25T17:15:18.391Z"
doc_updated_by: "ORCHESTRATOR"
description: "Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task."
sections:
  Summary: |-
    Preserve compact incident registry formatting

    Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task.
  Scope: |-
    - In scope: Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task.
    - Out of scope: unrelated refactors not required for "Preserve compact incident registry formatting".
  Plan: "1. Trace compact incident rendering and preserve the Markdown blank line after the heading without changing registry semantics. 2. Add focused regression coverage for compact append output and canonical/asset mirror compatibility. 3. Run focused incident tests, format, agents sync validation, and targeted type/lint checks; publish a branch PR and integrate only after hosted checks pass."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Preserve compact incident registry formatting

Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task.

## Scope

- In scope: Repair the incident-registry renderer so compact rewrites retain the required blank line after the heading, keep the canonical and asset mirrors byte-identical, and add regression coverage. This unblocks the hosted format check for task 202607251433-75Q4J6 without manually editing a policy log in that task.
- Out of scope: unrelated refactors not required for "Preserve compact incident registry formatting".

## Plan

1. Trace compact incident rendering and preserve the Markdown blank line after the heading without changing registry semantics. 2. Add focused regression coverage for compact append output and canonical/asset mirror compatibility. 3. Run focused incident tests, format, agents sync validation, and targeted type/lint checks; publish a branch PR and integrate only after hosted checks pass.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/runtime/incidents/resolve.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run format:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
