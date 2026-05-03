---
id: "202605031256-758Q7Z"
title: "Remove config.json from managed repository state"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031255-E1YFBV"
tags:
  - "code"
  - "config"
verify:
  - "agentplane doctor"
  - "bun test packages/core/src/config packages/agentplane/src/cli packages/agentplane/src/workflow-runtime"
  - "rg 'config.json' docs packages/spec packages/core packages/agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T12:58:16.626Z"
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
doc_updated_at: "2026-05-03T12:57:21.269Z"
doc_updated_by: "PLANNER"
description: "Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed."
sections:
  Summary: |-
    Remove config.json from managed repository state
    
    Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.
  Scope: |-
    - In scope: Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.
    - Out of scope: unrelated refactors not required for "Remove config.json from managed repository state".
  Plan: "Remove config.json from managed current repository state. Migrate docs, examples, schemas, setup output, tests, and generated artifacts to WORKFLOW.md v2. Keep only explicit legacy import/upgrade support. Acceptance: fresh init does not create .agentplane/config.json and repository docs no longer present it as canonical."
  Verify Steps: |-
    1. Run `rg 'config.json' docs packages/spec packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun test packages/core/src/config packages/agentplane/src/cli packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
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

Remove config.json from managed repository state

Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.

## Scope

- In scope: Delete .agentplane/config.json as a generated/managed artifact for current repositories, migrate examples and docs to WORKFLOW.md v2, remove config.json schema expectations from setup output, and keep only legacy import/upgrade support where needed.
- Out of scope: unrelated refactors not required for "Remove config.json from managed repository state".

## Plan

Remove config.json from managed current repository state. Migrate docs, examples, schemas, setup output, tests, and generated artifacts to WORKFLOW.md v2. Keep only explicit legacy import/upgrade support. Acceptance: fresh init does not create .agentplane/config.json and repository docs no longer present it as canonical.

## Verify Steps

1. Run `rg 'config.json' docs packages/spec packages/core packages/agentplane`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun test packages/core/src/config packages/agentplane/src/cli packages/agentplane/src/workflow-runtime`. Expected: it succeeds and confirms the requested outcome for this task.
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
