---
id: "202605031255-XM1W31"
title: "Resolve project config from WORKFLOW.md v2"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031255-H9WWA0"
tags:
  - "code"
  - "config"
  - "workflow"
verify:
  - "agentplane config show"
  - "agentplane doctor"
  - "bun test packages/core/src/config packages/agentplane/src/workflow-runtime"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:57:48.861Z"
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
doc_updated_at: "2026-05-03T12:56:57.211Z"
doc_updated_by: "PLANNER"
description: "Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state."
sections:
  Summary: |-
    Resolve project config from WORKFLOW.md v2
    
    Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.
  Scope: |-
    - In scope: Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.
    - Out of scope: unrelated refactors not required for "Resolve project config from WORKFLOW.md v2".
  Plan: "Build internal ResolvedConfig from WORKFLOW.md v2 and make config.json non-canonical. Keep a legacy import path only for old repositories. Acceptance: runtime commands consume resolved workflow-backed config, conflicts fail loudly, and tests cover missing/legacy/config-conflict cases."
  Verify Steps: |-
    1. Run `bun test packages/core/src/config packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `agentplane config show`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
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

Resolve project config from WORKFLOW.md v2

Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.

## Scope

- In scope: Replace config.json as the canonical config source by building internal ResolvedConfig from WORKFLOW.md v2. Keep only temporary compatibility reads for legacy repositories during migration, and fail on conflicting generated or legacy config state.
- Out of scope: unrelated refactors not required for "Resolve project config from WORKFLOW.md v2".

## Plan

Build internal ResolvedConfig from WORKFLOW.md v2 and make config.json non-canonical. Keep a legacy import path only for old repositories. Acceptance: runtime commands consume resolved workflow-backed config, conflicts fail loudly, and tests cover missing/legacy/config-conflict cases.

## Verify Steps

1. Run `bun test packages/core/src/config packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `agentplane config show`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `agentplane doctor`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
