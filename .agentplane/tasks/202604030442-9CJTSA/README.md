---
id: "202604030442-9CJTSA"
title: "F-003 Introduce capability registry"
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
  - "capabilities"
verify:
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-03T04:42:01.538Z"
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
doc_updated_at: "2026-04-03T04:42:01.295Z"
doc_updated_by: "PLANNER"
description: "Define a reusable capability model and registry for commands, skills, tools, agents, and runners."
sections:
  Summary: |-
    F-003 Introduce capability registry
    
    Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
  Scope: |-
    - In scope: Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
    - Out of scope: unrelated refactors not required for "F-003 Introduce capability registry".
  Plan: |-
    1. Define capability descriptors, availability states, and source metadata in a dedicated runtime module.
    2. Build a registry/resolver that can enumerate capabilities from existing framework surfaces.
    3. Cover blocked and unavailable semantics with targeted tests.
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

F-003 Introduce capability registry

Define a reusable capability model and registry for commands, skills, tools, agents, and runners.

## Scope

- In scope: Define a reusable capability model and registry for commands, skills, tools, agents, and runners.
- Out of scope: unrelated refactors not required for "F-003 Introduce capability registry".

## Plan

1. Define capability descriptors, availability states, and source metadata in a dedicated runtime module.
2. Build a registry/resolver that can enumerate capabilities from existing framework surfaces.
3. Cover blocked and unavailable semantics with targeted tests.

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
