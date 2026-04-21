---
id: "202604211311-RJTGRK"
title: "Inventory core subpath import mapping"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211311-R3RFB9"
tags:
  - "architecture"
  - "build"
  - "code"
verify:
  - "bun run typecheck"
  - "rg \"@agentplaneorg/core\" packages scripts -n"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:11:45.905Z"
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
doc_updated_at: "2026-04-21T13:11:43.164Z"
doc_updated_by: "PLANNER"
description: "Build a concrete import migration map from @agentplaneorg/core root imports to existing subpath exports before changing callsites."
sections:
  Summary: |-
    Inventory core subpath import mapping
    
    Build a concrete import migration map from @agentplaneorg/core root imports to existing subpath exports before changing callsites.
  Scope: |-
    - In scope: Build a concrete import migration map from @agentplaneorg/core root imports to existing subpath exports before changing callsites.
    - Out of scope: unrelated refactors not required for "Inventory core subpath import mapping".
  Plan: "Scope: create the mechanical map for I-prime.apply. Steps: 1. List all root @agentplaneorg/core imports in packages/** and scripts if relevant. 2. Classify each imported symbol into ./git, ./process, ./logger, ./schemas, ./tasks, ./fs, or intentional root aggregate. 3. Identify missing subpath exports before callsite edits. 4. Record the mapping in task Findings or implementation notes. Acceptance: every current root import has an explicit target or an explicit intentional-root reason; no code behavior changes except optional missing export additions."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `rg "@agentplaneorg/core" packages scripts -n`. Expected: it succeeds and confirms the requested outcome for this task.
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

Inventory core subpath import mapping

Build a concrete import migration map from @agentplaneorg/core root imports to existing subpath exports before changing callsites.

## Scope

- In scope: Build a concrete import migration map from @agentplaneorg/core root imports to existing subpath exports before changing callsites.
- Out of scope: unrelated refactors not required for "Inventory core subpath import mapping".

## Plan

Scope: create the mechanical map for I-prime.apply. Steps: 1. List all root @agentplaneorg/core imports in packages/** and scripts if relevant. 2. Classify each imported symbol into ./git, ./process, ./logger, ./schemas, ./tasks, ./fs, or intentional root aggregate. 3. Identify missing subpath exports before callsite edits. 4. Record the mapping in task Findings or implementation notes. Acceptance: every current root import has an explicit target or an explicit intentional-root reason; no code behavior changes except optional missing export additions.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `rg "@agentplaneorg/core" packages scripts -n`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
