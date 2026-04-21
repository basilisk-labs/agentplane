---
id: "202604211311-WZCXTF"
title: "Migrate git and process imports to core subpaths"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604211311-RJTGRK"
tags:
  - "architecture"
  - "build"
  - "code"
verify:
  - "bun run arch:check"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:50.597Z"
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
    body: "Start: migrate git and process symbols from root @agentplaneorg/core imports to the published core subpath exports using the completed inventory map."
events:
  -
    type: "status"
    at: "2026-04-21T15:49:56.744Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: migrate git and process symbols from root @agentplaneorg/core imports to the published core subpath exports using the completed inventory map."
doc_version: 3
doc_updated_at: "2026-04-21T15:49:56.780Z"
doc_updated_by: "CODER"
description: "Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process."
sections:
  Summary: |-
    Migrate git and process imports to core subpaths
    
    Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.
  Scope: |-
    - In scope: Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.
    - Out of scope: unrelated refactors not required for "Migrate git and process imports to core subpaths".
  Plan: "Scope: migrate the lowest-risk subpath import families first. Steps: 1. Update git helper imports to @agentplaneorg/core/git. 2. Update runProcess/exec-related imports to @agentplaneorg/core/process. 3. Remove obsolete command-layer git shim imports where the replacement is direct. 4. Keep public root exports intact for external consumers. Acceptance: root core import count decreases materially; typecheck and relevant CLI unit tests pass."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
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

Migrate git and process imports to core subpaths

Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.

## Scope

- In scope: Switch git and process-related callsites from @agentplaneorg/core root imports to @agentplaneorg/core/git and @agentplaneorg/core/process.
- Out of scope: unrelated refactors not required for "Migrate git and process imports to core subpaths".

## Plan

Scope: migrate the lowest-risk subpath import families first. Steps: 1. Update git helper imports to @agentplaneorg/core/git. 2. Update runProcess/exec-related imports to @agentplaneorg/core/process. 3. Remove obsolete command-layer git shim imports where the replacement is direct. 4. Keep public root exports intact for external consumers. Acceptance: root core import count decreases materially; typecheck and relevant CLI unit tests pass.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run arch:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
