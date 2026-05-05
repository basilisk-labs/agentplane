---
id: "202605051806-RZ8SA1"
title: "Add cloud backend init contract"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-05-05T18:20:52.471Z"
  updated_by: "CODER"
  note: "Verified: init accepts cloud backend and writes cloud config/env templates; targeted init cloud test, typecheck, arch check, policy routing, git diff check, and repo-local doctor passed."
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
  -
    type: "verify"
    at: "2026-05-05T18:20:52.471Z"
    author: "CODER"
    state: "ok"
    note: "Verified: init accepts cloud backend and writes cloud config/env templates; targeted init cloud test, typecheck, arch check, policy routing, git diff check, and repo-local doctor passed."
doc_version: 3
doc_updated_at: "2026-05-05T18:20:52.482Z"
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
    ### 2026-05-05T18:20:52.471Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: init accepts cloud backend and writes cloud config/env templates; targeted init cloud test, typecheck, arch check, policy routing, git diff check, and repo-local doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:34.300Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --test-name-pattern 'backend cloud'; Result: pass; Evidence: 1 pass, 0 fail. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with repo-local runtime.
      Impact: Cloud init path is covered without changing local/redmine behavior.
      Resolution: Keep provider-specific project selection in the cloud service and store only non-secret metadata locally.
      Promotion: incident-candidate
      Fixability: external
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
### 2026-05-05T18:20:52.471Z — VERIFY — ok

By: CODER

Note: Verified: init accepts cloud backend and writes cloud config/env templates; targeted init cloud test, typecheck, arch check, policy routing, git diff check, and repo-local doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T18:07:34.300Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bun test packages/agentplane/src/cli/run-cli.core.init.test.ts --test-name-pattern 'backend cloud'; Result: pass; Evidence: 1 pass, 0 fail. Command: bun run typecheck; Result: pass; Evidence: tsc -b exited 0. Command: node packages/agentplane/bin/agentplane.js doctor; Result: pass; Evidence: doctor OK with repo-local runtime.
  Impact: Cloud init path is covered without changing local/redmine behavior.
  Resolution: Keep provider-specific project selection in the cloud service and store only non-secret metadata locally.
  Promotion: incident-candidate
  Fixability: external
