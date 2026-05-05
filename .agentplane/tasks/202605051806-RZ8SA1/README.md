---
id: "202605051806-RZ8SA1"
title: "Add cloud backend init contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "cloud"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T18:06:54.732Z"
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
    body: "Start: Implement cloud as an init/config backend option in the primary batch worktree, including parser/model and generated backend config coverage."
events:
  -
    type: "status"
    at: "2026-05-05T18:07:34.300Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement cloud as an init/config backend option in the primary batch worktree, including parser/model and generated backend config coverage."
doc_version: 3
doc_updated_at: "2026-05-05T18:07:34.300Z"
doc_updated_by: "CODER"
description: "Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider."
sections:
  Summary: |-
    Add cloud backend init contract
    
    Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider.
  Scope: |-
    - In scope: Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider.
    - Out of scope: unrelated refactors not required for "Add cloud backend init contract".
  Plan: "Epic E1: Cloud backend init contract. Scope: add cloud to init parser/model/prompts, generate .agentplane/backends/cloud/backend.json, add cloud environment template guidance if the init writer supports it, and cover the path with focused init tests. Verify: targeted init tests plus typecheck."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Add cloud backend init contract

Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider.

## Scope

- In scope: Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider.
- Out of scope: unrelated refactors not required for "Add cloud backend init contract".

## Plan

Epic E1: Cloud backend init contract. Scope: add cloud to init parser/model/prompts, generate .agentplane/backends/cloud/backend.json, add cloud environment template guidance if the init writer supports it, and cover the path with focused init tests. Verify: targeted init tests plus typecheck.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
