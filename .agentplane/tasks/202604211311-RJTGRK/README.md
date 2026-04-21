---
id: "202604211311-RJTGRK"
title: "Inventory core subpath import mapping"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-21T15:49:12.243Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck passed; rg \"@agentplaneorg/core\" packages scripts -n passed and confirmed remaining root import surface. Findings now record the symbol-to-subpath migration map and intentional root gaps for config/project/commit-policy."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: inventory root @agentplaneorg/core imports and classify each symbol to existing subpath exports before any callsite migration."
events:
  -
    type: "status"
    at: "2026-04-21T15:46:39.932Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: inventory root @agentplaneorg/core imports and classify each symbol to existing subpath exports before any callsite migration."
  -
    type: "verify"
    at: "2026-04-21T15:49:12.243Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck passed; rg \"@agentplaneorg/core\" packages scripts -n passed and confirmed remaining root import surface. Findings now record the symbol-to-subpath migration map and intentional root gaps for config/project/commit-policy."
doc_version: 3
doc_updated_at: "2026-04-21T15:49:12.255Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T15:49:12.243Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck passed; rg "@agentplaneorg/core" packages scripts -n passed and confirmed remaining root import surface. Findings now record the symbol-to-subpath migration map and intentional root gaps for config/project/commit-policy.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T15:48:54.242Z, excerpt_hash=sha256:9f2f1053f6100e45099793ba59c32f55a055799c3fd857f3687a17f5ba96b19c
    
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
### 2026-04-21T15:49:12.243Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck passed; rg "@agentplaneorg/core" packages scripts -n passed and confirmed remaining root import surface. Findings now record the symbol-to-subpath migration map and intentional root gaps for config/project/commit-policy.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T15:48:54.242Z, excerpt_hash=sha256:9f2f1053f6100e45099793ba59c32f55a055799c3fd857f3687a17f5ba96b19c

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
